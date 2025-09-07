import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Filter, Building, RefreshCw } from 'lucide-react';
import BranchForm from '../../components/forms/BranchForm';

const Branches = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompany, setFilterCompany] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);

  const [companies] = useState([
    { id: '1', name: 'Tech Solutions Inc' },
  ]);

  const [branches, setBranches] = useState([
    { id: '1', companyId: '1', name: 'Main Office', manager: 'Jane Doe', email: 'main@techsolutions.com', mobile: '+1234567891', username: 'main_office', isActive: true, createdAt: '2024-01-01' },
    { id: '2', companyId: '1', name: 'West Coast Branch', manager: 'Mike Johnson', email: 'west@techsolutions.com', mobile: '+1234567892', username: 'west_coast', isActive: true, createdAt: '2024-01-02' }
  ]);

  const filteredBranches = branches.filter(branch => {
    const matchesSearch =
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCompany = filterCompany === 'all' || branch.companyId === filterCompany;
    return matchesSearch && matchesCompany;
  });

  const handleSubmit = (data) => {
    if (editingBranch) {
      setBranches(branches.map(branch => branch.id === editingBranch.id ? { ...branch, ...data } : branch));
    } else {
      const newBranch = {
        id: Date.now().toString(),
        ...data,
        isActive: true,
        createdAt: new Date().toISOString()
      };
      setBranches([...branches, newBranch]);
    }
    setShowModal(false);
    setEditingBranch(null);
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this branch?')) {
      setBranches(branches.filter(branch => branch.id !== id));
    }
  };

  const handleToggleStatus = id => {
    setBranches(branches.map(branch =>
      branch.id === id ? { ...branch, isActive: !branch.isActive } : branch
    ));
  };

  const getCompanyName = companyId => companies.find(c => c.id === companyId)?.name || 'Unknown';

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Branch Management</h1>
          <p className="text-gray-600">Manage company branches and locations</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
          <button onClick={() => { setEditingBranch(null); setShowModal(true); }}
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg">
            <Plus className="h-5 w-5" />
            <span>Add Branch</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input type="text" placeholder="Search branches..."
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select value={filterCompany} onChange={e => setFilterCompany(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent">
              <option value="all">All Companies</option>
              {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
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
              {filteredBranches.map(branch => (
                <tr key={branch.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{branch.name}</td>
                  <td className="px-6 py-4">{getCompanyName(branch.companyId)}</td>
                  <td className="px-6 py-4">{branch.manager}</td>
                  <td className="px-6 py-4">{branch.email}<br />{branch.mobile}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleToggleStatus(branch.id)}
                      className={`px-2 py-1 rounded-full text-white ${branch.isActive ? 'bg-green-500' : 'bg-gray-400'}`}>
                      {branch.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4">{new Date(branch.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button className="text-blue-600 p-2 rounded-lg"><Eye className="h-4 w-4" /></button>
                    <button onClick={() => { setEditingBranch(branch); setShowModal(true); }}
                      className="text-teal-600 p-2 rounded-lg"><Edit className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(branch.id)}
                      className="text-red-600 p-2 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <BranchForm branch={editingBranch} onSubmit={handleSubmit} onClose={() => { setShowModal(false); setEditingBranch(null); }} />
      )}
    </div>
  );
};

export default Branches;
