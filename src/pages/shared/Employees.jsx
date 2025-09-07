import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Filter, Users } from 'lucide-react';
import EmployeeForm from '../../components/forms/EmployeeForm';

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Mock data
  const [companies] = useState([
    {
      id: '1',
      name: 'Tech Solutions Inc',
      region: 'North America',
      stateProvince: 'California',
      regNumber: 'REG001',
      contactPerson: 'John Smith',
      mobile: '+1234567890',
      email: 'info@techsolutions.com',
      username: 'tech_solutions',
      address: '123 Tech Street',
      city: 'San Francisco',
      street: 'Tech Street',
      poBox: '12345',
      phone: '+1234567890',
      createdAt: '2024-01-01',
      documents: [],
      additionalFields: []
    }
  ]);

  const [branches] = useState([
    {
      id: '1',
      companyId: '1',
      name: 'Main Office',
      region: 'North America',
      stateProvince: 'California',
      regNumber: 'BR001',
      contactPerson: 'Jane Doe',
      mobile: '+1234567891',
      email: 'main@techsolutions.com',
      username: 'main_office',
      address: '123 Tech Street',
      city: 'San Francisco',
      street: 'Tech Street',
      poBox: '12345',
      phone: '+1234567891',
      manager: 'Jane Doe',
      isActive: true,
      createdAt: '2024-01-01',
      documents: [],
      additionalFields: []
    }
  ]);

  const [departments] = useState([
    {
      id: '1',
      name: 'Engineering',
      companyId: '1',
      branchId: '1',
      description: 'Software development',
      headOfDepartment: 'Alice Johnson',
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Marketing',
      companyId: '1',
      branchId: '1',
      description: 'Marketing and communications',
      headOfDepartment: 'Bob Wilson',
      isActive: true,
      createdAt: '2024-01-02'
    }
  ]);

  const [shifts] = useState([
    {
      id: '1',
      name: 'Morning Shift',
      startTime: '09:00',
      endTime: '17:00',
      breakDuration: 60,
      isActive: true
    },
    {
      id: '2',
      name: 'Evening Shift',
      startTime: '14:00',
      endTime: '22:00',
      breakDuration: 60,
      isActive: true
    }
  ]);

  const [employees, setEmployees] = useState([
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah.wilson@company.com',
      mobile: '+1234567890',
      empCode: 'EMP001',
      empType: 'Full-time',
      position: 'Software Engineer',
      department: 'Engineering',
      departmentId: '1',
      shift: 'Morning Shift',
      salary: 75000,
      hireDate: '2023-03-15',
      isActive: true,
      primaryContact: {
        name: 'John Wilson',
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
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.brown@company.com',
      mobile: '+1234567892',
      empCode: 'EMP002',
      empType: 'Full-time',
      position: 'Marketing Manager',
      department: 'Marketing',
      departmentId: '2',
      shift: 'Morning Shift',
      salary: 68000,
      hireDate: '2023-01-10',
      isActive: true,
      primaryContact: {
        name: 'Lisa Brown',
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

  const departmentNames = departments.map(d => d.name);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch =
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.empCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = filterDepartment === 'all' || employee.department === filterDepartment;

    return matchesSearch && matchesDepartment;
  });

  const handleSubmit = (data) => {
    if (editingEmployee) {
      setEmployees(employees.map(emp =>
        emp.id === editingEmployee.id ? { ...emp, ...data } : emp
      ));
    } else {
      const newEmployee = {
        id: Date.now().toString(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: data.mobile,
        empCode: data.empCode || `EMP${Date.now()}`,
        empType: data.empType,
        position: data.position || '',
        department: departments.find(d => d.id === data.departmentId)?.name || '',
        departmentId: data.departmentId,
        shift: data.shift || '',
        salary: data.salary || 0,
        hireDate: data.hireDate || new Date().toISOString().split('T')[0],
        isActive: true,
        primaryContact: data.primaryContact,
        address: data.address,
        documents: data.documents || [],
        additionalFields: data.additionalFields || []
      };
      setEmployees([...employees, newEmployee]);
    }
    setShowModal(false);
    setEditingEmployee(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(employee => employee.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setEmployees(employees.map(employee =>
      employee.id === id ? { ...employee, isActive: !employee.isActive } : employee
    ));
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Employee Management</h1>
          <p className="text-gray-600">Manage your workforce and employee information</p>
        </div>
        <button
          onClick={() => { setEditingEmployee(null); setShowModal(true); }}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg"
        >
          <Plus className="h-5 w-5" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-800">{employees.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-800">{employees.filter(e => e.isActive).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-xl">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-gray-800">{departments.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Avg Salary</p>
              <p className="text-2xl font-bold text-gray-800">
                ${Math.round(employees.reduce((acc, e) => acc + e.salary, 0) / employees.length / 1000)}k
              </p>
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
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {departmentNames.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Employee</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Position</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Department</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Salary</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Hire Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {employee.firstName[0]}{employee.lastName[0]}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-800">{employee.firstName} {employee.lastName}</div>
                        <div className="text-sm text-gray-500">{employee.empCode}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{employee.position}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{employee.department}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">${employee.salary.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleStatus(employee.id)}
                      className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${employee.isActive ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'} transition-colors cursor-pointer`}
                    >
                      {employee.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{new Date(employee.hireDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors"><Eye className="h-4 w-4" /></button>
                      <button onClick={() => { setEditingEmployee(employee); setShowModal(true); }} className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg transition-colors"><Edit className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(employee.id)} className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No employees found</div>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
        </div>
      )}

      {showModal && (
        <EmployeeForm
          employee={editingEmployee}
          companies={companies}
          branches={branches}
          departments={departments}
          shifts={shifts}
          onSubmit={handleSubmit}
          onClose={() => { setShowModal(false); setEditingEmployee(null); }}
        />
      )}
    </div>
  );
};

export default Employees;
