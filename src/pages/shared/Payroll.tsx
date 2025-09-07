import React, { useState } from 'react';
import { Search, Filter, DollarSign, Plus, Edit, Eye, Download } from 'lucide-react';
import { Payroll, Employee, PayrollItem } from '../../types';

const PayrollPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

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

  const [payrolls, setPayrolls] = useState<Payroll[]>([
    {
      id: '1',
      employeeId: '1',
      month: 'January',
      year: 2024,
      basicSalary: 75000,
      allowances: [
        { id: '1', name: 'Transport Allowance', amount: 2000, type: 'allowance' },
        { id: '2', name: 'Medical Allowance', amount: 1500, type: 'allowance' }
      ],
      deductions: [
        { id: '3', name: 'Tax', amount: 7500, type: 'deduction' },
        { id: '4', name: 'Insurance', amount: 1000, type: 'deduction' }
      ],
      overtime: 500,
      totalEarnings: 79000,
      totalDeductions: 8500,
      netSalary: 70500,
      status: 'paid',
      processedAt: '2024-01-31T10:00:00Z'
    },
    {
      id: '2',
      employeeId: '2',
      month: 'January',
      year: 2024,
      basicSalary: 68000,
      allowances: [
        { id: '5', name: 'Transport Allowance', amount: 2000, type: 'allowance' }
      ],
      deductions: [
        { id: '6', name: 'Tax', amount: 6800, type: 'deduction' }
      ],
      overtime: 0,
      totalEarnings: 70000,
      totalDeductions: 6800,
      netSalary: 63200,
      status: 'processed',
      processedAt: '2024-01-30T15:30:00Z'
    }
  ]);

  const filteredPayrolls = payrolls.filter(payroll => {
    const employee = employees.find(emp => emp.id === payroll.employeeId);
    if (!employee) return false;

    const matchesSearch = 
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.empCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || payroll.status === filterStatus;
    const matchesMonth = payroll.month === getMonthName(selectedMonth);
    const matchesYear = payroll.year === selectedYear;
    
    return matchesSearch && matchesStatus && matchesMonth && matchesYear;
  });

  function getMonthName(monthNumber: number): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNumber - 1];
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'processed':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const updatePayrollStatus = (id: string, newStatus: 'draft' | 'processed' | 'paid') => {
    setPayrolls(payrolls.map(payroll => 
      payroll.id === id ? { 
        ...payroll, 
        status: newStatus,
        processedAt: newStatus === 'paid' ? new Date().toISOString() : payroll.processedAt
      } : payroll
    ));
  };

  const stats = {
    totalPayroll: filteredPayrolls.reduce((sum, p) => sum + p.netSalary, 0),
    processed: filteredPayrolls.filter(p => p.status === 'processed').length,
    paid: filteredPayrolls.filter(p => p.status === 'paid').length,
    draft: filteredPayrolls.filter(p => p.status === 'draft').length
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Payroll Management</h1>
          <p className="text-gray-600">Manage employee salaries and payroll processing</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {getMonthName(i + 1)}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
          </select>
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Generate Payroll</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Payroll</p>
              <p className="text-2xl font-bold text-gray-800">${stats.totalPayroll.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Processed</p>
              <p className="text-2xl font-bold text-gray-800">{stats.processed}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-3 rounded-xl">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Paid</p>
              <p className="text-2xl font-bold text-gray-800">{stats.paid}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 rounded-xl">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Draft</p>
              <p className="text-2xl font-bold text-gray-800">{stats.draft}</p>
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
              <option value="draft">Draft</option>
              <option value="processed">Processed</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Employee</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Basic Salary</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Allowances</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Deductions</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Net Salary</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayrolls.map((payroll) => {
                const employee = employees.find(emp => emp.id === payroll.employeeId);
                if (!employee) return null;

                const totalAllowances = payroll.allowances.reduce((sum, item) => sum + item.amount, 0);
                const totalDeductions = payroll.deductions.reduce((sum, item) => sum + item.amount, 0);

                return (
                  <tr key={payroll.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
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
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      ${payroll.basicSalary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-green-600 font-medium">
                      +${totalAllowances.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-red-600 font-medium">
                      -${totalDeductions.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-800">
                      ${payroll.netSalary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={payroll.status}
                        onChange={(e) => updatePayrollStatus(payroll.id, e.target.value as any)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full border-0 focus:ring-2 focus:ring-blue-500 ${getStatusColor(payroll.status)}`}
                      >
                        <option value="draft">Draft</option>
                        <option value="processed">Processed</option>
                        <option value="paid">Paid</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-800 p-2 hover:bg-purple-50 rounded-lg transition-colors">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredPayrolls.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No payroll records found</div>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default PayrollPage;