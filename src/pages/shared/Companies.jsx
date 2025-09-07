import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Filter, Building2, RefreshCw } from 'lucide-react';
import CompanyForm from '../../components/forms/CompanyForm';

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const regions = [
    { id: '1', name: 'North America', code: 'NA' },
    { id: '2', name: 'Europe', code: 'EU' },
    { id: '3', name: 'Asia Pacific', code: 'AP' },
    { id: '4', name: 'Middle East', code: 'ME' },
    { id: '5', name: 'Africa', code: 'AF' }
  ];

  const [companies, setCompanies] = useState([
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
      address: '123 Tech Street, San Francisco, CA 94105',
      city: 'San Francisco',
      street: 'Tech Street',
      poBox: '12345',
      website: 'www.techsolutions.com',
      phone: '+1234567890',
      createdAt: '2024-01-01',
      documents: [],
      additionalFields: []
    },
    {
      id: '2',
      name: 'Global Marketing Ltd',
      region: 'Europe',
      stateProvince: 'London',
      regNumber: 'REG002',
      contactPerson: 'Sarah Johnson',
      mobile: '+44123456789',
      email: 'info@globalmarketing.com',
      username: 'global_marketing',
      address: '456 Business Ave, London, UK',
      city: 'London',
      street: 'Business Ave',
      poBox: '67890',
      website: 'www.globalmarketing.com',
      phone: '+44123456789',
      createdAt: '2024-01-02',
      documents: [],
      additionalFields: []
    }
  ]);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.regNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRegion = filterRegion === 'all' || company.region === filterRegion;
    return matchesSearch && matchesRegion;
  });

  const handleSubmit = (data) => {
    if (editingCompany) {
      setCompanies(companies.map(c => c.id === editingCompany.id ? { ...c, ...data } : c));
    } else {
      const newCompany = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
        documents: [],
        additionalFields: []
      };
      setCompanies([...companies, newCompany]);
    }
    setShowModal(false);
    setEditingCompany(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      setCompanies(companies.filter(c => c.id !== id));
    }
  };

  const handleRefresh = () => console.log('Refreshing companies...');

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Company Management</h1>
          <p className="text-gray-600">Manage companies and their information</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          {/* <button
            onClick={handleRefresh}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button> */}
          <button
            onClick={() => { setEditingCompany(null); setShowModal(true); }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 flex items-center space-x-2 shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span>Add Company</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Companies</p>
              <p className="text-2xl font-bold text-gray-800">{companies.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-800">{companies.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Regions</p>
              <p className="text-2xl font-bold text-gray-800">{regions.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-xl">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-800">2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterRegion}
              onChange={e => setFilterRegion(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Regions</option>
              {regions.map(region => (
                <option key={region.id} value={region.name}>{region.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Company</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Region</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Contact Person</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Contact Info</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">REG Number</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Created</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCompanies.map(company => (
                <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {company.name[0]}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-800">{company.name}</div>
                      <div className="text-sm text-gray-500">{company.username}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {company.region}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{company.contactPerson}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{company.email}<br />{company.mobile}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{company.regNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{new Date(company.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 p-2 rounded-lg"><Eye className="h-4 w-4" /></button>
                    <button onClick={() => { setEditingCompany(company); setShowModal(true); }} className="text-green-600 hover:text-green-800 p-2 rounded-lg"><Edit className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(company.id)} className="text-red-600 hover:text-red-800 p-2 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No companies found. Try adjusting your search or filters.
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <CompanyForm
          company={editingCompany}
          onSubmit={handleSubmit}
          onClose={() => { setShowModal(false); setEditingCompany(null); }}
        />
      )}
    </div>
  );
};

export default Companies;
