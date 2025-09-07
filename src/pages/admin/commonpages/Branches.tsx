import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Filter, Building, RefreshCw } from 'lucide-react';
import { Branch, Company } from '../../types';
import BranchForm from '../../components/forms/BranchForm';

const Branches: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompany, setFilterCompany] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

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

  const [branches, setBranches] = useState<Branch[]>([
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
      address: '123 Tech Street, San Francisco, CA',
      city: 'San Francisco',
      street: 'Tech Street',
      poBox: '12345',
      phone: '+1234567891',
      manager: 'Jane Doe',
      isActive: true,
      createdAt: '2024-01-01',
      documents: [],
      additionalFields: []
    },
    {
      id: '2',
      companyId: '1',
      name: 'West Coast Branch',
      region: 'North America',
      stateProvince: 'California',
      regNumber: 'BR002',
      contactPerson: 'Mike Johnson',
      mobile: '+1234567892',
      email: 'west@techsolutions.com',
      username: 'west_coast',
      address: '456 Innovation Ave, Los Angeles, CA',
      city: 'Los Angeles',
      street: 'Innovation Ave',
      poBox: '67890',
      phone: '+1234567892',
      manager: 'Mike Johnson',
      isActive: true,
      createdAt: '2024-01-02',
      documents: [],
      additionalFields: []
    }
  ]);

  const filteredBranches = branches.filter(branch => {
    const matchesSearch = 
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.manager.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCompany = filterCompany === 'all' || branch.companyId === filterCompany;
    
    return matchesSearch && matchesCompany;
  });

  const handleSubmit = (data: Partial<Branch>) => {
    if (editingBranch) {
      setBranches(branches.map(branch => 
        branch.id === editingBranch.id ? { ...branch, ...data } : branch
      ));
    } else {
      const newBranch: Branch = {
        id: Date.now().toString(),
        companyId: data.companyId!,
        name: data.name!,
        region: data.region!,
        stateProvince: data.stateProvince!,
        regNumber: data.regNumber!,
        contactPerson: data.contactPerson!,
        mobile: data.mobile!,
        email: data.email!,
        username: data.username!,
        address: data.address || '',
        city: data.city || '',
        street: data.street || '',
        poBox: data.poBox || '',
        website: data.website,
        phone: data.phone || data.mobile!,
        manager: data.manager || '',
        isActive: true,
        createdAt: new Date().toISOString(),
        documents: data.documents || [],
        additionalFields: data.additionalFields || []
      };
      setBranches([...branches, newBranch]);
    }
    setShowModal(false);
    setEditingBranch(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      setBranches(branches.filter(branch => branch.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setBranches(branches.map(branch => 
      branch.id === id ? { ...branch, isActive: !branch.isActive } : branch
    ));
  };

  const getCompanyName = (companyId: string) => {
    return companies.find(c => c.id === companyId)?.name || 'Unknown';
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Branch Management</h1>
          <p className="text-gray-600">Manage company branches and locations</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => {
              setEditingBranch(null);
              setShowModal(true);
            }}
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-teal-600 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span>Add Branch</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-3 rounded-xl">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Branches</p>
              <p className="text-2xl font-bold text-gray-800">{branches.length}</p>
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
                {branches.filter(b => b.isActive).length}
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
                {branches.filter(b => !b.isActive).length}
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
                placeholder="Search branches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterCompany}
              onChange={(e) => setFilterCompany(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Companies</option>
              {companies.map(company => (
                <option key={company.id} value={company.id}>{company.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Branches Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Branch</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Company</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Manager</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Contact Info</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Created</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBranches.map((branch) => (
                <tr key={branch.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                        {branch.name[0]}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-800">
                          {branch.name}
                        </div>
                        <div className="text-sm text-gray-500">{branch.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {getCompanyName(branch.companyId)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {branch.manager}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      <div>{branch.email}</div>
                      <div>{branch.mobile}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleStatus(branch.id)}
                      className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        branch.isActive
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      } transition-colors cursor-pointer`}
                    >
                      {branch.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(branch.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingBranch(branch);
                          setShowModal(true);
                        }}
                        className="text-teal-600 hover:text-teal-800 p-2 hover:bg-teal-50 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(branch.id)}
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

      {filteredBranches.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No branches found</div>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Branch Form Modal */}
      {showModal && (
        <BranchForm
          branch={editingBranch}
          companies={companies}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowModal(false);
            setEditingBranch(null);
          }}
        />
      )}
    </div>
  );
};

export default Branches;