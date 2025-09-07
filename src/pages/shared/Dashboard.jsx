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
     

     

    </div>
  );
};

export default Dashboard;
