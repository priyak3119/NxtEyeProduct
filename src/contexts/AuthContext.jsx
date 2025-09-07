import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  // Plans (unchanged)
  const plans = [
    {
      id: "ontime",
      name: "OnTime",
      slug: "ontime",
      price: 19,
      interval: "monthly",
      description: "Monitor foot traffic in real-time to optimize operations.",
      features: [
        "Real-time monitoring",
        "Basic analytics",
        "Email support",
        "Up to 100 users",
      ],
    },
    {
      id: "trackr",
      name: "Trackr",
      slug: "trackr",
      price: 29,
      interval: "monthly",
      description: "Analyze how long individuals stay in certain areas.",
      popular: true,
      features: [
        "Advanced analytics",
        "Dwell time analysis",
        "Priority support",
        "Up to 500 users",
      ],
    },
    {
      id: "pulse",
      name: "Pulse",
      slug: "pulse",
      price: 39,
      interval: "monthly",
      description: "Detect unauthorized access with smart alerts.",
      features: [
        "Smart alerts",
        "Unauthorized access detection",
        "Real-time notifications",
        "Unlimited users",
      ],
    },
    {
      id: "parknpay",
      name: "ParkNpay",
      slug: "parknpay",
      price: 49,
      interval: "monthly",
      description: "Identify and verify individuals with AI accuracy.",
      features: [
        "AI-powered identification",
        "Face recognition",
        "Advanced security",
        "Enterprise support",
      ],
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);
  // useEffect(() => {
  //   checkAuthStatus();
  // }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const savedUser = localStorage.getItem("user");

      if (token && savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Auth check error:", error);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };
  

  // ---- API HELPERS ----
  const apiUrl = "/api"; 
  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem("refresh_token");
      if (!refresh) return false;

      const res = await fetch(`${apiUrl}/auth/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });

      if (!res.ok) throw new Error("Refresh failed");
      const data = await res.json();

      localStorage.setItem("access_token", data.access);
      return true;
    } catch (error) {
      console.error("Refresh error:", error);
      logout();
      return false;
    }
  };

  const apiFetch = async (url, options = {}) => {
    let token = localStorage.getItem("access_token");

    let res = await fetch(`${apiUrl}${url}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (res.status === 401) {
      const refreshed = await refreshToken();
      if (refreshed) {
        token = localStorage.getItem("access_token");
        res = await fetch(`${apiUrl}${url}`, {
          ...options,
          headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }
    return res;
  };

  const handleLogin = async (email, password, type = "user") => {
    try {
      let response;
      if (type === "admin") response = await authAPI.adminLogin({ email, password });
      else if (type === "super") response = await authAPI.superAdminLogin({ email, password });
      else response = await authAPI.login({ email, password });

      const loggedInUser = response.data.user;
      localStorage.setItem("access_token", response.data.tokens.access);
      localStorage.setItem("refresh_token", response.data.tokens.refresh);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setUser(loggedInUser);

      addNotification({ type: "success", title: "Success", message: "Login successful!" });
      return true;
    } catch (error) {
      console.error(error.response?.data || error.message);
      addNotification({ type: "error", title: "Login Failed", message: "Invalid credentials" });
      return false;
    }
  };
  // const handleLogin = async (email, password, type = "user") => {
  //   try {
  //     let response;
  //     if (type === "admin") response = await authAPI.adminLogin({ email, password });
  //     else if (type === "super") response = await authAPI.superAdminLogin({ email, password });
  //     else response = await authAPI.login({ email, password });

  //     const loggedInUser = response.data.user;
  //     const accessToken = response.data.tokens.access;
  //     const refreshToken = response.data.tokens.refresh;

  //     localStorage.setItem("access_token", accessToken);
  //     localStorage.setItem("refresh_token", refreshToken);
  //     localStorage.setItem("user", JSON.stringify(loggedInUser));
  //     setUser(loggedInUser);

  //     addNotification({ type: "success", title: "Success", message: "Login successful!" });
  //     return true;
  //   } catch (error) {
  //     console.error(error.response?.data || error.message);
  //     addNotification({ type: "error", title: "Login Failed", message: "Invalid credentials" });
  //     return false;
  //   }
  // };
  const login = (email, password) => handleLogin(email, password, "user");
  const adminLogin = (email, password) => handleLogin(email, password, "admin");
  const superAdminLogin = (email, password) => handleLogin(email, password, "super");

  

  const register = async (userData) => {
    try {
      const res = await fetch(`${apiUrl}/auth/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) throw new Error("Registration failed");
      const data = await res.json();

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);

      addNotification({
        type: "success",
        title: "Success",
        message: "Registration successful!",
      });

      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser(null);
    addNotification({ type: "info", title: "Logged Out", message: "You have been logged out." });
  };

  const resetPassword = async (email) => {
    try {
      const res = await fetch(`${apiUrl}/auth/reset-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Reset failed");

      addNotification({
        type: "success",
        title: "Password Reset",
        message: "Password reset email sent successfully!",
      });
      return true;
    } catch (error) {
      console.error("Reset password error:", error);
      return false;
    }
  };

  // ---- NOTIFICATIONS ----
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      ...notification,
    };
    setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // ---- CONTEXT VALUE ----
  const value = {
    user,
    loading,
    notifications,
    plans,
    isAuthenticated: !!user,
    isSuperAdmin: user?.role === "super_admin",
    isAdmin: user?.role === "admin",
    isUser: user?.role === "user",
    login,
    adminLogin,
    superAdminLogin,
    register,
    logout,
    resetPassword,
    apiFetch,
    addNotification,
    removeNotification,
    markNotificationAsRead,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
