import React from 'react';
import { Users, FileText, DollarSign, TrendingUp, Activity, UserCheck } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600'
    },
    {
      title: 'Active Employees',
      value: '89',
      change: '+5%',
      icon: <UserCheck className="h-6 w-6" />,
      color: 'bg-gradient-to-r from-green-500 to-green-600'
    },
    {
      title: 'Total Invoices',
      value: '456',
      change: '+23%',
      icon: <FileText className="h-6 w-6" />,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600'
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: '+18%',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600'
    }
  ];

  const recentActivity = [
    { action: 'New user registered', user: 'John Doe', time: '2 minutes ago' },
    { action: 'Invoice paid', user: 'ABC Corp', time: '5 minutes ago' },
    { action: 'Employee added', user: 'Sarah Wilson', time: '10 minutes ago' },
    { action: 'User updated profile', user: 'Mike Johnson', time: '15 minutes ago' },
    { action: 'New invoice created', user: 'XYZ Ltd', time: '20 minutes ago' }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center mb-6">
            <Activity className="h-6 w-6 text-gray-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.user}</p>
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
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
              Add New User
            </button>
            <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105">
              Create Employee
            </button>
            <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
              Generate Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
