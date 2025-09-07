import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Plus, Trash2 } from 'lucide-react';

const BranchForm = ({ branch = {}, companies = [], onSubmit, onClose }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: branch
  });

  const [documents, setDocuments] = useState(branch?.documents || []);
  const [additionalFields, setAdditionalFields] = useState(branch?.additionalFields || []);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState('text');

  const regions = [
    { id: '1', name: 'North America', code: 'NA' },
    { id: '2', name: 'Europe', code: 'EU' },
    { id: '3', name: 'Asia Pacific', code: 'AP' },
    { id: '4', name: 'Middle East', code: 'ME' },
    { id: '5', name: 'Africa', code: 'AF' }
  ];

  const selectedCompanyId = watch('companyId');

  const handleFormSubmit = (data) => {
    const formData = {
      ...data,
      documents,
      additionalFields,
      username: `${data.name?.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`,
    };
    onSubmit(formData);
  };

  const addCustomField = () => {
    if (!newFieldName.trim()) return;
    const newField = {
      id: Date.now().toString(),
      name: newFieldName,
      type: newFieldType,
      value: '',
      options: newFieldType === 'select' ? ['Option 1', 'Option 2'] : undefined
    };
    setAdditionalFields([...additionalFields, newField]);
    setNewFieldName('');
  };

  const removeCustomField = (id) => {
    setAdditionalFields(additionalFields.filter(field => field.id !== id));
  };

  const updateCustomFieldValue = (id, value) => {
    setAdditionalFields(additionalFields.map(field =>
      field.id === id ? { ...field, value } : field
    ));
  };

  const handleDocumentUpload = (event) => {
    const files = event.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
      const newDoc = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toISOString()
      };
      setDocuments(prev => [...prev, newDoc]);
    });
  };

  const removeDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              {branch?.id ? 'Edit Branch' : 'Add New Branch'}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">

            {/* Basic Info */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Company *</label>
                  <select
                    {...register('companyId', { required: 'Company is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Company</option>
                    {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  {errors.companyId && <p className="mt-1 text-sm text-red-600">{errors.companyId.message}</p>}
                </div>

                {/* Branch Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Branch Name *</label>
                  <input
                    type="text"
                    {...register('name', { required: 'Branch name is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter branch name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>

                {/* Region */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Region *</label>
                  <select
                    {...register('region', { required: 'Region is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Region</option>
                    {regions.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                  </select>
                  {errors.region && <p className="mt-1 text-sm text-red-600">{errors.region.message}</p>}
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State/Province *</label>
                  <input
                    type="text"
                    {...register('stateProvince', { required: 'State/Province is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter state or province"
                  />
                  {errors.stateProvince && <p className="mt-1 text-sm text-red-600">{errors.stateProvince.message}</p>}
                </div>
              </div>
            </div>

            {/* Document Upload */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Documents</h4>
              <input type="file" multiple onChange={handleDocumentUpload} className="mb-4" />
              {documents.length > 0 && (
                <ul className="space-y-2">
                  {documents.map(doc => (
                    <li key={doc.id} className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg">
                      <span>{doc.name}</span>
                      <button type="button" onClick={() => removeDocument(doc.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Additional Fields */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Additional Fields</h4>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Field Name"
                  value={newFieldName}
                  onChange={(e) => setNewFieldName(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg w-full"
                />
                <select
                  value={newFieldType}
                  onChange={(e) => setNewFieldType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="select">Select</option>
                </select>
                <button type="button" onClick={addCustomField} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-1">
                  <Plus className="h-4 w-4" /> Add
                </button>
              </div>

              {additionalFields.map(field => (
                <div key={field.id} className="flex items-center gap-2 mb-2">
                  {field.type === 'select' ? (
                    <select
                      value={field.value}
                      onChange={(e) => updateCustomFieldValue(field.id, e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg w-full"
                    >
                      {field.options?.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={field.value}
                      onChange={(e) => updateCustomFieldValue(field.id, e.target.value)}
                      placeholder={field.name}
                      className="px-4 py-2 border border-gray-300 rounded-lg w-full"
                    />
                  )}
                  <button type="button" onClick={() => removeCustomField(field.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button type="button" onClick={onClose} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {branch?.id ? 'Update Branch' : 'Create Branch'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default BranchForm;
