import React, { useState, useEffect } from "react";

const RoleForm = ({ role, companies, branches, onSubmit, onClose }) => {
  const [roleName, setRoleName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [branchId, setBranchId] = useState("");

  useEffect(() => {
    if (role) {
      setRoleName(role.name || "");
      setCompanyId(role.companyId || "");
      setBranchId(role.branchId || "");
    }
  }, [role]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: roleName, companyId, branchId });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold mb-4">{role ? "Edit Role" : "Add Role"}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Role Name</label>
            <input type="text" value={roleName} onChange={(e) => setRoleName(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm mb-1">Company</label>
            <select value={companyId} onChange={(e) => setCompanyId(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">Select Company</option>
              {companies?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Branch</label>
            <select value={branchId} onChange={(e) => setBranchId(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">Select Branch</option>
              {branches?.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-100">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleForm;
