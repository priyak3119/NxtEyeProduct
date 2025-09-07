import React, { useState, useEffect } from 'react';
import { Users, FileText, DollarSign, TrendingUp, Activity, UserCheck, Building, Calendar } from 'lucide-react';
import { companyAPI, employeeAPI, attendanceAPI, invoiceAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import AttendanceChart from '../../components/charts/AttendanceChart';

const Dashboard = () => {
  const { addNotification } = useAuth();
  const [stats, setStats] = useState({
    companies: 0,
    employees: 0,
    attendance: 0,
    invoices: 0,
    revenue: 0
  });
  const [attendanceData, setAttendanceData] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all stats in parallel
      const [
        companyStats,
        employeeStats,
        attendanceStats,
        invoiceStats
      ] = await Promise.all([
        companyAPI.getCompanyStats(),
        employeeAPI.getEmployeeStats(),
        attendanceAPI.getAttendanceStats(),
        invoiceAPI.getInvoiceStats()
      ]);

      setStats({
        companies: companyStats.data.companies?.total || 0,
        employees: employeeStats.data.active_employees || 0,
        attendance: attendanceStats.data.present_today || 0,
        invoices: invoiceStats.data.total_invoices || 0,
        revenue: invoiceStats.data.total_revenue || 0
      });

      setAttendanceData(attendanceStats.data);

      // Mock recent activity - in real app, this would come from an activity log
      setRecentActivity([
        { action: 'New employee added', user: 'Sarah Wilson', time: '2 minutes ago', type: 'employee' },
        { action: 'Invoice generated', user: 'ABC Corp', time: '5 minutes ago', type: 'invoice' },
        { action: 'Attendance marked', user: 'John Doe', time: '10 minutes ago', type: 'attendance' },
        { action: 'Company updated', user: 'Tech Solutions', time: '15 minutes ago', type: 'company' },
        { action: 'Branch created', user: 'West Coast Office', time: '20 minutes ago', type: 'branch' }
      ]);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to load dashboard data'
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Companies',
      value: stats.companies,
      change: '+12%',
      icon: <Building className="h-6 w-6" />,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600'
    },
    {
      title: 'Active Employees',
      value: stats.employees,
      change: '+5%',
      icon: <UserCheck className="h-6 w-6" />,
      color: 'bg-gradient-to-r from-green-500 to-green-600'
    },
    {
      title: 'Present Today',
      value: stats.attendance,
      change: '+8%',
      icon: <Calendar className="h-6 w-6" />,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      change: '+18%',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600'
    }
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-green-500">{stat.change}</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-xl text-white shadow-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      {attendanceData && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Attendance Analytics</h2>
          <AttendanceChart data={attendanceData} />
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center mb-6">
            <Activity className="h-6 w-6 text-gray-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'employee' ? 'bg-green-100 text-green-600' :
                    activity.type === 'invoice' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'attendance' ? 'bg-purple-100 text-purple-600' :
                    activity.type === 'company' ? 'bg-orange-100 text-orange-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {activity.type === 'employee' ? <UserCheck className="h-5 w-5" /> :
                     activity.type === 'invoice' ? <FileText className="h-5 w-5" /> :
                     activity.type === 'attendance' ? <Calendar className="h-5 w-5" /> :
                     activity.type === 'company' ? <Building className="h-5 w-5" /> :
                     <Activity className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.user}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              Add New Company
            </button>
            <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              Create Employee
            </button>
            <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              Mark Attendance
            </button>
            <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              Generate Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;