import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Check } from "lucide-react";

const RoleForm = ({ role, companies, branches, onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: role || {},
  });

  const [permissions, setPermissions] = useState(role?.permissions || []);
  const selectedCompanyId = watch("companyId");
  const filteredBranches = branches.filter(
    (branch) => branch.companyId === selectedCompanyId
  );

  const modules = [
    { id: "company", name: "Company Management" },
    { id: "branch", name: "Branch Management" },
    { id: "department", name: "Department Management" },
    { id: "employee", name: "Employee Management" },
    { id: "attendance", name: "Attendance Management" },
    { id: "invoice", name: "Invoice Management" },
    { id: "roles", name: "Role Management" },
  ];

  const actions = [
    { id: "create", name: "Create" },
    { id: "read", name: "View" },
    { id: "update", name: "Edit" },
    { id: "delete", name: "Delete" },
  ];

  const handlePermissionChange = (moduleId, actionId, enabled) => {
    const permissionId = `${moduleId}_${actionId}`;
    const existingPermission = permissions.find((p) => p.id === permissionId);

    if (existingPermission) {
      setPermissions(
        permissions.map((p) =>
          p.id === permissionId ? { ...p, enabled } : p
        )
      );
    } else {
      const newPermission = {
        id: permissionId,
        name: `${moduleId} ${actionId}`,
        module: moduleId,
        action: actionId,
        enabled,
      };
      setPermissions([...permissions, newPermission]);
    }
  };

  const isPermissionEnabled = (moduleId, actionId) => {
    const permission = permissions.find(
      (p) => p.id === `${moduleId}_${actionId}`
    );
    return permission?.enabled || false;
  };

  const handleFormSubmit = (data) => {
    const formData = {
      ...data,
      permissions,
      isActive: true,
    };
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              {role ? "Edit Role" : "Add New Role"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Role Info */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Role Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Role Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role Name *
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Role name is required" })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter role name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Company *
                  </label>
                  <select
                    {...register("companyId", { required: "Company is required" })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Company</option>
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                  {errors.companyId && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.companyId.message}
                    </p>
                  )}
                </div>

                {/* Branch */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Branch (Optional)
                  </label>
                  <select
                    {...register("branchId")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!selectedCompanyId}
                  >
                    <option value="">All Branches</option>
                    {filteredBranches.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Enter role description"
                  />
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Permissions
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Module
                      </th>
                      {actions.map((action) => (
                        <th
                          key={action.id}
                          className="text-center py-3 px-4 font-semibold text-gray-700"
                        >
                          {action.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {modules.map((module) => (
                      <tr
                        key={module.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-4 px-4 font-medium text-gray-800">
                          {module.name}
                        </td>
                        {actions.map((action) => (
                          <td key={action.id} className="py-4 px-4 text-center">
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isPermissionEnabled(
                                  module.id,
                                  action.id
                                )}
                                onChange={(e) =>
                                  handlePermissionChange(
                                    module.id,
                                    action.id,
                                    e.target.checked
                                  )
                                }
                                className="sr-only"
                              />
                              <div
                                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                                  isPermissionEnabled(module.id, action.id)
                                    ? "bg-blue-600 border-blue-600"
                                    : "border-gray-300 hover:border-blue-400"
                                }`}
                              >
                                {isPermissionEnabled(module.id, action.id) && (
                                  <Check className="h-4 w-4 text-white" />
                                )}
                              </div>
                            </label>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors"
              >
                {role ? "Update Role" : "Create Role"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoleForm;
