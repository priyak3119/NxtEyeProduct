import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Demo from "./pages/Demo";
import Pricing from "./pages/Pricing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminLogin from "./pages/auth/AdminLogin";
import SuperAdminLogin from "./pages/auth/SuperAdminLogin";

// User Dashboard + Shared Pages
import UserDashboard from "./pages/user/UserDashboard";
import Companies from "./pages/shared/Companies";
import Branches from "./pages/shared/Branches";
import Departments from "./pages/shared/Departments";
import Employees from "./pages/shared/Employees";
import Attendance from "./pages/shared/Attendance";
import Payroll from "./pages/shared/Payroll";
import Roles from "./pages/shared/Roles";
import Invoices from "./pages/shared/Invoices";
import Profile from "./pages/shared/Profile";
import PricingPlans from "./pages/shared/PricingPlans";
import Dashboard from "./pages/shared/Dashboard";

// Admin / Super Admin Layouts
import AdminLayout from "./pages/admin/AdminLayout";
import SuperAdminLayout from "./pages/superadmin/SuperAdminLayout";
import SuperAdminDashboard from "./pages/superadmin/Dashboard";
import DemoRequests from "./pages/superadmin/DemoRequests";
import Clients from "./pages/superadmin/Clients";

import { useAuth } from "./contexts/AuthContext";

// Protected Route Component
const ProtectedRoute = ({ children, requireRole = null }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  const hasRole = (role) => user?.roles?.some((r) => r.name === role);

  if (requireRole && !hasRole(requireRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this area.</p>
        </div>
      </div>
    );
  }

  return children;
};

// App Content
const AppContent = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Super Admin */}
        <Route path="/super-admin-login" element={<SuperAdminLogin />} />
        <Route
          path="/super-admin/*"
          element={
            <ProtectedRoute requireRole="super_admin">
              <SuperAdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SuperAdminDashboard />} />
          <Route path="demo-requests" element={<DemoRequests />} />
          <Route path="clients" element={<Clients />} />
        </Route>

        {/* Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute requireRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="companies" element={<Companies />} />
          <Route path="branches" element={<Branches />} />
          <Route path="departments" element={<Departments />} />
          <Route path="employees" element={<Employees />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="roles" element={<Roles />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="pricing-plans" element={<PricingPlans />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* User Dashboard */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="companies" element={<Companies />} />
          <Route path="branches" element={<Branches />} />
          <Route path="departments" element={<Departments />} />
          <Route path="employees" element={<Employees />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="roles" element={<Roles />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="profile" element={<Profile />} />
          <Route path="pricing-plans" element={<PricingPlans />} />
          <Route index element={<Dashboard />} />
        </Route>

        {/* Public Pages */}
        <Route
          path="/*"
          element={
            <div className="flex flex-col min-h-screen">
              {!user?.roles?.includes("admin") && <Navbar />}
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/demo" element={<Demo />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Routes>
              </main>
              {!user?.roles?.includes("admin") && <Footer />}
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

// Main App
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
