import React, { useState } from 'react';
import { Search, Filter, Calendar, Clock, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Attendance, Employee } from '../../types';

const AttendancePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data
  const [employees] = useState<Employee[]>([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@company.com',
      mobile: '+1234567890',
      empCode: 'EMP001',
      empType: 'Full-time',
      position: 'Software Engineer',
      department: 'Engineering',
      departmentId: '1',
      shift: 'Morning',
      salary: 75000,
      hireDate: '2023-01-15',
      isActive: true,
      primaryContact: {
        name: 'Jane Doe',
        relationship: 'Spouse',
        mobile: '+1234567891',
        address: {
          region: 'North America',
          stateProvince: 'California',
          city: 'San Francisco',
          street: '123 Main St',
          poBox: '12345'
        }
      },
      address: {
        region: 'North America',
        stateProvince: 'California',
        city: 'San Francisco',
        street: '123 Main St',
        poBox: '12345'
      },
      documents: [],
      additionalFields: []
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah@company.com',
      mobile: '+1234567892',
      empCode: 'EMP002',
      empType: 'Full-time',
      position: 'Marketing Manager',
      department: 'Marketing',
      departmentId: '2',
      shift: 'Morning',
      salary: 68000,
      hireDate: '2023-02-01',
      isActive: true,
      primaryContact: {
        name: 'Mike Wilson',
        relationship: 'Spouse',
        mobile: '+1234567893',
        address: {
          region: 'North America',
          stateProvince: 'California',
          city: 'San Francisco',
          street: '456 Oak St',
          poBox: '12346'
        }
      },
      address: {
        region: 'North America',
        stateProvince: 'California',
        city: 'San Francisco',
        street: '456 Oak St',
        poBox: '12346'
      },
      documents: [],
      additionalFields: []
    }
  ]);

  const [attendance, setAttendance] = useState<Attendance[]>([
    {
      id: '1',
      employeeId: '1',
      date: selectedDate,
      checkIn: '09:00',
      checkOut: '17:30',
      status: 'present',
      workingHours: 8.5,
      overtime: 0.5,
      notes: 'On time'
    },
    {
      id: '2',
      employeeId: '2',
      date: selectedDate,
      checkIn: '09:15',
      checkOut: '17:00',
      status: 'late',
      workingHours: 7.75,
      overtime: 0,
      notes: 'Late arrival'
    }
  ]);

  const filteredAttendance = attendance.filter(record => {
    const employee = employees.find(emp => emp.id === record.employeeId);
    if (!employee) return false;

    const matchesSearch = 
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.empCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    const matchesDate = record.date === selectedDate;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'absent':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'late':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'half-day':
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      case 'half-day':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const updateAttendanceStatus = (id: string, newStatus: 'present' | 'absent' | 'late' | 'half-day') => {
    setAttendance(attendance.map(record => 
      record.id === id ? { ...record, status: newStatus } : record
    ));
  };

  const stats = {
    present: attendance.filter(a => a.status === 'present' && a.date === selectedDate).length,
    absent: attendance.filter(a => a.status === 'absent' && a.date === selectedDate).length,
    late: attendance.filter(a => a.status === 'late' && a.date === selectedDate).length,
    halfDay: attendance.filter(a => a.status === 'half-day' && a.date === selectedDate).length
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Attendance Management</h1>
          <p className="text-gray-600">Track and manage employee attendance</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Present</p>
              <p className="text-2xl font-bold text-gray-800">{stats.present}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-xl">
              <XCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Absent</p>
              <p className="text-2xl font-bold text-gray-800">{stats.absent}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 rounded-xl">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Late</p>
              <p className="text-2xl font-bold text-gray-800">{stats.late}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Half Day</p>
              <p className="text-2xl font-bold text-gray-800">{stats.halfDay}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
              <option value="half-day">Half Day</option>
            </select>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Employee</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Check In</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Check Out</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Working Hours</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Overtime</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAttendance.map((record) => {
                const employee = employees.find(emp => emp.id === record.employeeId);
                if (!employee) return null;

                return (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {employee.firstName[0]}{employee.lastName[0]}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-800">
                            {employee.firstName} {employee.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{employee.empCode}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {record.checkIn || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {record.checkOut || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {record.workingHours ? `${record.workingHours}h` : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {record.overtime ? `${record.overtime}h` : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(record.status)}
                        <select
                          value={record.status}
                          onChange={(e) => updateAttendanceStatus(record.id, e.target.value as any)}
                          className={`px-3 py-1 text-xs font-semibold rounded-full border-0 focus:ring-2 focus:ring-blue-500 ${getStatusColor(record.status)}`}
                        >
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                          <option value="late">Late</option>
                          <option value="half-day">Half Day</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {record.notes || '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredAttendance.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No attendance records found</div>
          <p className="text-gray-500 mt-2">Try adjusting your search or date filter</p>
        </div>
      )}
    </div>
  );
};

export default AttendancePage;