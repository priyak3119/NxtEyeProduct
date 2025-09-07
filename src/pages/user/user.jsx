import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import {
  Menu,
  X,
  Bell,
  Settings,
  LayoutDashboard,
  Building2,
  GitBranch,
  Users,
  CalendarCheck,
  FileText,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [dashboardData, setDashboardData] = useState({
    companies: 0,
    branches: 0,
    employees: 0,
    presentToday: 0,
    attendanceChart: null,
  });

  const navigation = [
    { name: "Dashboard", key: "dashboard", path: "/", icon: LayoutDashboard },
    { name: "Companies", key: "companies", path: "/companies", icon: Building2 },
    { name: "Branches", key: "branches", path: "/branches", icon: GitBranch },
    { name: "Departments", key: "departments", path: "/departments", icon: Building2 },
    { name: "Employees", key: "employees", path: "/employees", icon: Users },
    { name: "Attendance", key: "attendance", path: "/attendance", icon: CalendarCheck },
    { name: "Invoices", key: "invoices", path: "/invoices", icon: FileText },
  ];

  useEffect(() => {
    // Mock API call
    setDashboardData({
      companies: 12,
      branches: 8,
      employees: 45,
      presentToday: 38,
      attendanceChart: {
        monthlyAttendance: [
          { month: "Jan", present: 42, absent: 3, late: 2 },
          { month: "Feb", present: 45, absent: 2, late: 1 },
          { month: "Mar", present: 43, absent: 4, late: 3 },
          { month: "Apr", present: 46, absent: 1, late: 2 },
          { month: "May", present: 44, absent: 3, late: 1 },
          { month: "Jun", present: 47, absent: 2, late: 1 },
        ],
        absentToday: 5,
        lateToday: 2,
      },
    });
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo / Title */}
          <div className="flex items-center justify-between h-16 px-6 bg-blue-600 text-white">
            <span className="font-bold text-xl">User Panel</span>
            <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
              <X />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <button
                key={item.key}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </button>
            ))}
          </nav>

          {/* User Info + Logout */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <img
                src={user?.profileImage || "/default-avatar.png"}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <div className="text-sm font-medium text-gray-800">
                  {user?.firstName} {user?.lastName}
                </div>
                <button
                  onClick={logout}
                  className="text-xs text-red-600 hover:underline"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:pl-64">
        {/* Header */}
        <header className="flex items-center justify-between h-16 bg-white px-6 shadow-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-gray-500"
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>

          <h2 className="text-lg font-semibold">
            Welcome, {user?.firstName || "User"}
          </h2>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative">
              <Bell className="h-5 w-5 text-gray-500 hover:text-blue-600 cursor-pointer" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                3
              </span>
            </button>

            {/* Settings */}
            <Settings className="h-5 w-5 text-gray-500 hover:text-blue-600 cursor-pointer" />

            {/* Profile */}
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2"
            >
              <img
                src={user?.profileImage || "/default-avatar.png"}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-700">
                {user?.firstName}
              </span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div
              className="bg-white shadow rounded-xl p-4 text-center cursor-pointer hover:bg-blue-50"
              onClick={() => navigate("/companies")}
            >
              <h3 className="text-sm text-gray-500">Companies</h3>
              <p className="text-2xl font-bold">{dashboardData.companies}</p>
            </div>
            <div
              className="bg-white shadow rounded-xl p-4 text-center cursor-pointer hover:bg-blue-50"
              onClick={() => navigate("/branches")}
            >
              <h3 className="text-sm text-gray-500">Branches</h3>
              <p className="text-2xl font-bold">{dashboardData.branches}</p>
            </div>
            <div
              className="bg-white shadow rounded-xl p-4 text-center cursor-pointer hover:bg-blue-50"
              onClick={() => navigate("/employees")}
            >
              <h3 className="text-sm text-gray-500">Employees</h3>
              <p className="text-2xl font-bold">{dashboardData.employees}</p>
            </div>
            <div
              className="bg-white shadow rounded-xl p-4 text-center cursor-pointer hover:bg-blue-50"
              onClick={() => navigate("/attendance")}
            >
              <h3 className="text-sm text-gray-500">Present Today</h3>
              <p className="text-2xl font-bold">{dashboardData.presentToday}</p>
            </div>
          </div>

          {/* Attendance Analytics */}
          {dashboardData.attendanceChart && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow p-4">
                <h3 className="text-lg font-semibold mb-4">
                  Monthly Attendance
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dashboardData.attendanceChart.monthlyAttendance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="present" fill="#10B981" name="Present" />
                    <Bar dataKey="absent" fill="#EF4444" name="Absent" />
                    <Bar dataKey="late" fill="#F59E0B" name="Late" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow p-4">
                <h3 className="text-lg font-semibold mb-4">
                  Today's Attendance
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={[
                        {
                          name: "Present",
                          value: dashboardData.presentToday,
                          fill: "#10B981",
                        },
                        {
                          name: "Absent",
                          value: dashboardData.attendanceChart.absentToday,
                          fill: "#EF4444",
                        },
                        {
                          name: "Late",
                          value: dashboardData.attendanceChart.lateToday,
                          fill: "#F59E0B",
                        },
                      ]}
                      dataKey="value"
                      outerRadius={80}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => navigate("/companies")}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
              >
                Manage Companies
              </button>
              <button
                onClick={() => navigate("/employees")}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
              >
                Manage Employees
              </button>
              <button
                onClick={() => navigate("/attendance")}
                className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-all"
              >
                Track Attendance
              </button>
              <button
                onClick={() => navigate("/invoices")}
                className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-all"
              >
                Manage Invoices
              </button>
            </div>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
