import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie,
} from "recharts";
import {
  Home, Menu, X, Bell, Settings, Shield, DollarSign,
  Building2, Building, GitBranch, Users, CalendarCheck,
  Calendar, UserCheck,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const [dashboardData, setDashboardData] = useState({
    companies: 0,
    branches: 0,
    employees: 0,
    presentToday: 0,
    attendanceChart: null,
  });

  const navigation = [
    { name: "Dashboard", key: "dashboard", path: "/admin", icon: Home },
    { name: "Companies", key: "companies", path: "/admin/companies", icon: Building2 },
    { name: "Branches", key: "branches", path: "/admin/branches", icon: Building },
    { name: "Departments", key: "departments", path: "/admin/departments", icon: Building },
    { name: "Employees", key: "employees", path: "/admin/employees", icon: UserCheck },
    { name: "Attendance", key: "attendance", path: "/admin/attendance", icon: Calendar },
    { name: "Payroll", key: "payroll", path: "/admin/payroll", icon: DollarSign },
    { name: "Roles", key: "roles", path: "/admin/roles", icon: Shield },
    { name: "Pricing Plans", key: "pricing-plans", path: "/admin/pricing-plans", icon: DollarSign },
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

  const isDashboardMain = location.pathname === "/admin";

  return (
    <div className="flex h-screen bg-[#F9FAFB] font-[Segoe UI]">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-[#FFFFFF] border-r border-gray-200 shadow-sm transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 bg-[#C28E0E] text-white">
            <span className="font-bold text-xl">Admin Panel</span>
            <button className="md:hidden" onClick={() => setSidebarOpen(false)}><X /></button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.key}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-medium rounded-md transition-all
                    ${isActive ? "bg-[#C28E0E] text-white" : "text-gray-700 hover:bg-[#F4E2B6] hover:text-[#C28E0E]"}`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button onClick={handleLogout} className="text-xs text-red-600 hover:underline">Logout</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:pl-64">
        <header className="flex items-center justify-between h-16 bg-white px-6 border-b border-gray-200">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-gray-500">
            {sidebarOpen ? <X /> : <Menu />}
          </button>
          <h2 className="text-lg font-semibold">Welcome, {user?.firstName || "Admin"}</h2>

          <div className="flex items-center space-x-4">
            <button className="relative">
              <Bell className="h-5 w-5 text-gray-600 hover:text-[#C28E0E]" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">3</span>
            </button>
            <Settings className="h-5 w-5 text-gray-600 hover:text-[#C28E0E]" />
            <button onClick={() => navigate("/admin/profile")} className="flex items-center gap-2">
              <img src={user?.profileImage || "/default-avatar.png"} alt="Profile" className="h-8 w-8 rounded-full object-cover" />
              <span className="text-sm font-medium text-gray-700">{user?.firstName}</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {isDashboardMain && (
            <>
              {/* Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Companies", value: dashboardData.companies, icon: Building2 },
                  { label: "Branches", value: dashboardData.branches, icon: GitBranch },
                  { label: "Employees", value: dashboardData.employees, icon: Users },
                  { label: "Present Today", value: dashboardData.presentToday, icon: CalendarCheck },
                ].map((tile, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:shadow-md hover:border-[#C28E0E] transition"
                    onClick={() => navigate(`/admin/${tile.label.toLowerCase().replace(" ", "")}`)}
                  >
                    <tile.icon className="h-8 w-8 mx-auto text-[#C28E0E] mb-2" />
                    <h3 className="text-sm text-gray-500">{tile.label}</h3>
                    <p className="text-2xl font-bold text-gray-800">{tile.value}</p>
                  </div>
                ))}
              </div>

              {/* Attendance Analytics */}
              {dashboardData.attendanceChart && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Monthly Attendance</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={dashboardData.attendanceChart.monthlyAttendance}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="month" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="present" fill="#C28E0E" name="Present" />
                        <Bar dataKey="absent" fill="#E63946" name="Absent" />
                        <Bar dataKey="late" fill="#A78BFA" name="Late" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Today's Attendance</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Present", value: dashboardData.presentToday, fill: "#C28E0E" },
                            { name: "Absent", value: dashboardData.attendanceChart.absentToday, fill: "#E63946" },
                            { name: "Late", value: dashboardData.attendanceChart.lateToday, fill: "#A78BFA" },
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
            </>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
