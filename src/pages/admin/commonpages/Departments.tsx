import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Filter, Building } from 'lucide-react';
import { Department, Company, Branch } from '../../types';
import DepartmentForm from '../../components/forms/DepartmentForm';

const Departments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompany, setFilterCompany] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

  // Mock data
  const [companies] = useState<Company[]>([
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

  const [branches] = useState<Branch[]>([
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

  const [departments, setDepartments] = useState<Department[]>([
    {
      id: '1',
      name: 'Engineering',
      companyId: '1',
      branchId: '1',
      description: 'Software development and engineering',
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
    },
    {
      id: '3',
      name: 'Human Resources',
      companyId: '1',
      branchId: '1',
      description: 'HR and employee management',
      headOfDepartment: 'Carol Davis',
      isActive: false,
      createdAt: '2024-01-03'
    }
  ]);

  const filteredDepartments = departments.filter(department => {
    const matchesSearch = 
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.headOfDepartment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCompany = filterCompany === 'all' || department.companyId === filterCompany;
    
    return matchesSearch && matchesCompany;
  });

  const handleSubmit = (data: Partial<Department>) => {
    if (editingDepartment) {
      setDepartments(departments.map(dept => 
        dept.id === editingDepartment.id ? { ...dept, ...data } : dept
      ));
    } else {
      const newDepartment: Department = {
        id: Date.now().toString(),
        name: data.name!,
        companyId: data.companyId!,
        branchId: data.branchId!,
        description: data.description,
        headOfDepartment: data.headOfDepartment || '',
        isActive: data.isActive ?? true,
        createdAt: new Date().toISOString()
      };
      setDepartments([...departments, newDepartment]);
    }
    setShowModal(false);
    setEditingDepartment(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(dept => dept.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setDepartments(departments.map(dept => 
      dept.id === id ? { ...dept, isActive: !dept.isActive } : dept
    ));
  };

  const getCompanyName = (companyId: string) => {
    return companies.find(c => c.id === companyId)?.name || 'Unknown';
  };

  const getBranchName = (branchId: string) => {
    return branches.find(b => b.id === branchId)?.name || 'Unknown';
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Department Management</h1>
          <p className="text-gray-600">Manage departments across companies and branches</p>
        </div>
        <button
          onClick={() => {
            setEditingDepartment(null);
            setShowModal(true);
          }}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg"
        >
          <Plus className="h-5 w-5" />
          <span>Add Department</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-3 rounded-xl">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Departments</p>
              <p className="text-2xl font-bold text-gray-800">{departments.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-800">
                {departments.filter(d => d.isActive).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-xl">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Inactive</p>
              <p className="text-2xl font-bold text-gray-800">
                {departments.filter(d => !d.isActive).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Companies</p>
              <p className="text-2xl font-bold text-gray-800">{companies.length}</p>
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
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterCompany}
              onChange={(e) => setFilterCompany(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Companies</option>
              {companies.map(company => (
                <option key={company.id} value={company.id}>{company.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Departments Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Department</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Company</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Branch</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Head</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Created</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDepartments.map((department) => (
                <tr key={department.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {department.name[0]}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-800">
                          {department.name}
                        </div>
                        {department.description && (
                          <div className="text-sm text-gray-500">{department.description}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {getCompanyName(department.companyId)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {getBranchName(department.branchId)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {department.headOfDepartment || 'Not assigned'}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleStatus(department.id)}
                      className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        department.isActive
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      } transition-colors cursor-pointer`}
                    >
                      {department.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(department.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingDepartment(department);
                          setShowModal(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-800 p-2 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(department.id)}
                        className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredDepartments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No departments found</div>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Department Form Modal */}
      {showModal && (
        <DepartmentForm
          department={editingDepartment}
          companies={companies}
          branches={branches}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowModal(false);
            setEditingDepartment(null);
          }}
        />
      )}
    </div>
  );
};

export default Departments;