import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie,
} from "recharts";
import {
  Menu, X, Bell, Settings, LayoutDashboard, Building2, GitBranch, Users, CalendarCheck, FileText,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const UserDashboard = () => {
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
    { name: "Dashboard", key: "dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Companies", key: "companies", path: "/dashboard/companies", icon: Building2 },
    { name: "Branches", key: "branches", path: "/dashboard/branches", icon: GitBranch },
    { name: "Departments", key: "departments", path: "/dashboard/departments", icon: Building2 },
    { name: "Employees", key: "employees", path: "/dashboard/employees", icon: Users },
    { name: "Attendance", key: "attendance", path: "/dashboard/attendance", icon: CalendarCheck },
    { name: "Invoices", key: "invoices", path: "/dashboard/invoices", icon: FileText },
  ];

  useEffect(() => {
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

  const isDashboardMain = location.pathname === "/dashboard";

  return (
    <div className="flex h-screen bg-[#F9F9F9]" style={{ fontFamily: "'Segoe UI', 'Segoe UI Variable', sans-serif" }}>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-[#FDFDFD] border-r border-gray-200 shadow-md transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 bg-[#D4AF37] text-white">
            <span className="font-bold text-lg">User Panel</span>
            <button className="md:hidden" onClick={() => setSidebarOpen(false)}><X /></button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <button
                key={item.key}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all 
                  ${location.pathname === item.path 
                    ? "bg-[#D4AF37] text-white" 
                    : "text-gray-700 hover:bg-[#D4AF37] hover:text-white"}`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button onClick={handleLogout} className="text-xs text-red-600 hover:underline">Logout</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:pl-64">
        <header className="flex items-center justify-between h-16 bg-[#FDFDFD] px-6 border-b border-gray-200 shadow-sm">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-gray-500">
            {sidebarOpen ? <X /> : <Menu />}
          </button>
          <h2 className="text-lg font-semibold text-gray-800">Welcome, {user?.firstName || "User"}</h2>

          <div className="flex items-center space-x-4">
            <button className="relative">
              <Bell className="h-5 w-5 text-gray-500 hover:text-[#D4AF37] cursor-pointer" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">3</span>
            </button>
            <Settings className="h-5 w-5 text-gray-500 hover:text-[#D4AF37] cursor-pointer" />
            <button onClick={() => navigate("/dashboard/profile")} className="flex items-center gap-2">
              <img src={user?.profileImage || "/default-avatar.png"} alt="Profile" className="h-8 w-8 rounded-full object-cover border border-gray-300" />
              <span className="text-sm font-medium text-gray-800">{user?.firstName}</span>
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
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => navigate(`/dashboard/${item.label.toLowerCase().replace(" ", "")}`)}
                    className="bg-[#FDFDFD] shadow-md border border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:bg-[#FFF8E7] transition"
                  >
                    <item.icon className="h-8 w-8 mx-auto text-[#D4AF37] mb-2" />
                    <h3 className="text-sm text-gray-600">{item.label}</h3>
                    <p className="text-2xl font-bold text-gray-800">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Attendance Analytics */}
              {dashboardData.attendanceChart && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-[#FDFDFD] rounded-xl shadow-md border border-gray-200 p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Monthly Attendance</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={dashboardData.attendanceChart.monthlyAttendance}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="month" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="present" fill="#D4AF37" name="Present" />
                        <Bar dataKey="absent" fill="#E57373" name="Absent" />
                        <Bar dataKey="late" fill="#A0AEC0" name="Late" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-[#FDFDFD] rounded-xl shadow-md border border-gray-200 p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Today's Attendance</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Present", value: dashboardData.presentToday, fill: "#D4AF37" },
                            { name: "Absent", value: dashboardData.attendanceChart.absentToday, fill: "#E57373" },
                            { name: "Late", value: dashboardData.attendanceChart.lateToday, fill: "#A0AEC0" },
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
              <div className="bg-[#FDFDFD] rounded-xl shadow-md border border-gray-200 p-4 mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Manage Companies", path: "/dashboard/companies" },
                    { label: "Manage Employees", path: "/dashboard/employees" },
                    { label: "Track Attendance", path: "/dashboard/attendance" },
                    { label: "Manage Invoices", path: "/dashboard/invoices" },
                  ].map((item, idx) => (
                    <button 
                      key={idx}
                      onClick={() => navigate(item.path)}
                      className="bg-[#D4AF37] text-white py-2 px-4 rounded-lg hover:bg-[#C19A36] transition-all"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
