import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Shield,
  Users,
} from "lucide-react";
import RoleForm from "../../components/forms/RoleForm";

const Roles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompany, setFilterCompany] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  // Mock data
  const [companies] = useState([
    {
      id: "1",
      name: "Tech Solutions Inc",
      region: "North America",
      stateProvince: "California",
      regNumber: "REG001",
      contactPerson: "John Smith",
      mobile: "+1234567890",
      email: "info@techsolutions.com",
      username: "tech_solutions",
      address: "123 Tech Street",
      city: "San Francisco",
      street: "Tech Street",
      poBox: "12345",
      phone: "+1234567890",
      createdAt: "2024-01-01",
      documents: [],
      additionalFields: [],
    },
  ]);

  const [branches] = useState([
    {
      id: "1",
      companyId: "1",
      name: "Main Office",
      region: "North America",
      stateProvince: "California",
      regNumber: "BR001",
      contactPerson: "Jane Doe",
      mobile: "+1234567891",
      email: "main@techsolutions.com",
      username: "main_office",
      address: "123 Tech Street",
      city: "San Francisco",
      street: "Tech Street",
      poBox: "12345",
      phone: "+1234567891",
      manager: "Jane Doe",
      isActive: true,
      createdAt: "2024-01-01",
      documents: [],
      additionalFields: [],
    },
  ]);

  const [roles, setRoles] = useState([
    {
      id: "1",
      name: "HR Manager",
      description: "Human Resources Management Role",
      companyId: "1",
      branchId: "1",
      permissions: [
        {
          id: "employee_create",
          name: "employee create",
          module: "employee",
          action: "create",
          enabled: true,
        },
        {
          id: "employee_read",
          name: "employee read",
          module: "employee",
          action: "read",
          enabled: true,
        },
        {
          id: "employee_update",
          name: "employee update",
          module: "employee",
          action: "update",
          enabled: true,
        },
        {
          id: "attendance_read",
          name: "attendance read",
          module: "attendance",
          action: "read",
          enabled: true,
        },
      ],
      isActive: true,
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      name: "Department Head",
      description: "Department Management Role",
      companyId: "1",
      permissions: [
        {
          id: "department_read",
          name: "department read",
          module: "department",
          action: "read",
          enabled: true,
        },
        {
          id: "department_update",
          name: "department update",
          module: "department",
          action: "update",
          enabled: true,
        },
        {
          id: "employee_read",
          name: "employee read",
          module: "employee",
          action: "read",
          enabled: true,
        },
      ],
      isActive: true,
      createdAt: "2024-01-02",
    },
  ]);

  const filteredRoles = roles.filter((role) => {
    const matchesSearch =
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCompany =
      filterCompany === "all" || role.companyId === filterCompany;

    return matchesSearch && matchesCompany;
  });

  const handleSubmit = (data) => {
    if (editingRole) {
      setRoles(
        roles.map((role) =>
          role.id === editingRole.id ? { ...role, ...data } : role
        )
      );
    } else {
      const newRole = {
        id: Date.now().toString(),
        name: data.name,
        description: data.description || "",
        companyId: data.companyId,
        branchId: data.branchId,
        permissions: data.permissions || [],
        isActive: data.isActive ?? true,
        createdAt: new Date().toISOString(),
      };
      setRoles([...roles, newRole]);
    }
    setShowModal(false);
    setEditingRole(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      setRoles(roles.filter((role) => role.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setRoles(
      roles.map((role) =>
        role.id === id ? { ...role, isActive: !role.isActive } : role
      )
    );
  };

  const getCompanyName = (companyId) => {
    return companies.find((c) => c.id === companyId)?.name || "Unknown";
  };

  const getBranchName = (branchId) => {
    if (!branchId) return "All Branches";
    return branches.find((b) => b.id === branchId)?.name || "Unknown";
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Role Management</h1>
          <p className="text-gray-600">
            Manage roles and permissions for your organization
          </p>
        </div>
        <button
          onClick={() => {
            setEditingRole(null);
            setShowModal(true);
          }}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg"
        >
          <Plus className="h-5 w-5" />
          <span>Add Role</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Roles</p>
              <p className="text-2xl font-bold text-gray-800">{roles.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Roles</p>
              <p className="text-2xl font-bold text-gray-800">
                {roles.filter((r) => r.isActive).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Companies</p>
              <p className="text-2xl font-bold text-gray-800">
                {companies.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Avg Permissions</p>
              <p className="text-2xl font-bold text-gray-800">
                {Math.round(
                  roles.reduce((acc, r) => acc + r.permissions.length, 0) /
                    roles.length || 0
                )}
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
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterCompany}
              onChange={(e) => setFilterCompany(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Companies</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Roles Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Company
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Branch
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Permissions
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Created
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRoles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {role.name[0]}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-800">
                          {role.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {role.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {getCompanyName(role.companyId)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {getBranchName(role.branchId)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {role.permissions.filter((p) => p.enabled).length} permissions
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleStatus(role.id)}
                      className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        role.isActive
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      } transition-colors cursor-pointer`}
                    >
                      {role.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(role.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingRole(role);
                          setShowModal(true);
                        }}
                        className="text-purple-600 hover:text-purple-800 p-2 hover:bg-purple-50 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(role.id)}
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

      {filteredRoles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No roles found</div>
          <p className="text-gray-500 mt-2">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Role Form Modal */}
      {showModal && (
        <RoleForm
          role={editingRole}
          companies={companies}
          branches={branches}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowModal(false);
            setEditingRole(null);
          }}
        />
      )}
    </div>
  );
};

export default Roles;
