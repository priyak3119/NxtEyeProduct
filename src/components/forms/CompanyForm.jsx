
import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { X, Plus, Trash2 } from 'lucide-react';
import { countries } from 'countries-list';


const CompanyForm = ({ company, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    region: "",
    state_province: "",
    reg_number: "",
    contact_person: "",
    mobile: "",
    email: "",
    username: "",
    address: "",
    city: "",
    street: "",
    po_box: "",
    website: "",
    phone: "",
    logo: null,
  });

  const [countries, setCountries] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: company || {}
  });
  const [countriesList, setCountriesList] = useState([]);
  const [documents, setDocuments] = useState(company?.documents || []);
  const [additionalFields, setAdditionalFields] = useState(company?.additionalFields || []);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState('text');
  const [regions, setRegions] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(company?.country || '');
  const [selectedRegion, setSelectedRegion] = useState(company?.region || '');
  const [selectedState, setSelectedState] = useState(company?.state_province || ''); // NEW for state





  // Fetch countries
  useEffect(() => {
    fetch("http://localhost:8000/api/companies/countries/")
      .then(res => res.json())
      .then(data => setCountriesList(data))
      .catch(err => console.error("Error fetching countries:", err));
  }, []);

  // Fetch regions when country changes
  useEffect(() => {
    if (!selectedCountry) {
      setRegions([]);
      setSelectedRegion('');
      setStates([]);
      return;
    }

    fetch(`http://localhost:8000/api/companies/regions/${selectedCountry}/`)
      .then(res => res.json())
      .then(data => setRegions(data))
      .catch(err => console.error("Error fetching regions:", err));
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedCountry) {
      setStates([]);
      return;
    }

    fetch(`http://localhost:8000/api/companies/states/${selectedCountry}/`)
      .then(res => res.json())
      .then(data => {
      
        if (Array.isArray(data)) {
          setStates(data);
        } else {
          setStates([]);
          console.error("States data is not an array:", data);
        }
      })
      .catch(err => {
        setStates([]);
        console.error("Error fetching states:", err);
      });
  }, [selectedCountry]);

const handleFormSubmit = async (data) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("reg_number", data.regNumber);        // <-- snake_case
  formData.append("contact_person", data.contactPerson); // <-- snake_case
  formData.append("mobile", data.mobile);
  formData.append("email", data.email);
  formData.append("website", data.website || "");
  formData.append("country", selectedCountry);
  formData.append("region", selectedRegion); // must be UUID
  formData.append("city", data.city || "");
  formData.append("street", data.street || "");
  formData.append("po_box", data.poBox || "");
  formData.append("address", data.address || "");
  formData.append("username", `${data.name?.toLowerCase().replace(/\s+/g, "_")}_${Date.now()}`);

  documents.forEach(doc => {
    if (doc.file) {
      formData.append("documents", doc.file); // Only append new files
    }
  });

  // Custom fields
  if (additionalFields.length > 0) {
    formData.append("custom_fields", JSON.stringify(additionalFields.map(f => ({
      field_name: f.name,
      field_type: f.type,
      field_value: f.value,
      field_options: f.options || []
    }))));
  }

  try {
    const token = localStorage.getItem("token"); // Your saved DRF token
    const headers = token ? { "Authorization": `Token ${token}` } : {};

    // let response;
    // if (company?.id) {
    //   response = await fetch(`http://localhost:8000/api/companies/${company.id}/`, {
    //     method: "PUT",
    //     headers: {
    //       "Authorization": `Token ${token}`,
    //       Accept: "application/json",
    //     },
    //     body: formData,
    //   });
    // } else {
    //   response = await fetch("http://localhost:8000/api/companies/", {
    //     method: "POST",
    //     headers: {
    //       "Authorization": `Token ${token}`,
    //       Accept: "application/json",
    //     },
    //     body: formData,
    //   });
    // }
    let response;
    if (company?.id) {
      response = await fetch(`http://localhost:8000/api/companies/${company.id}/`, {
        method: "PUT",
        headers: {
          "Authorization": `Token ${token}`
        },
        body: formData
      });
    } else {
      response = await fetch("http://localhost:8000/api/companies/", {
        method: "POST",
        headers: {
          "Authorization": `Token ${token}`  // Add token here
        },
        body: formData
      });
    }

    if (response.ok) {
      const result = await response.json();
      onSubmit(result);
      onClose();
    } else {
      const err = await response.json();
      console.error("Error saving company:", err);
      alert("Error saving company. Check console.");
    }
  } catch (error) {
    console.error("Request failed:", error);
    alert("Something went wrong!");
  }
};




  const addCustomField = () => {
    if (newFieldName.trim()) {
      const newField = {
        id: Date.now().toString(),
        name: newFieldName,
        type: newFieldType,
        value: '',
        options: newFieldType === 'select' ? ['Option 1', 'Option 2'] : undefined
      };
      setAdditionalFields([...additionalFields, newField]);
      setNewFieldName('');
    }
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
    if (files) {
      Array.from(files).forEach(file => {
        const newDoc = {
          id: Date.now().toString(),
          name: file.name,
          type: file.type,
          file: file, // <-- store the actual file for FormData
          url: URL.createObjectURL(file),
          uploadedAt: new Date().toISOString()
        };
        setDocuments(prev => [...prev, newDoc]);
      });
    }
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
              {company ? 'Edit Company' : 'Add New Company'}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                  <input
                    type="text"
                    {...register('name', { required: 'Company name is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter company name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Country *</label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Country</option>
                    {countriesList.map(c => (
                      <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                  </select>

                  {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>}
                </div>


                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select State/Province *</label>
                  <select
    value={selectedState}       // <-- correct state binding
    onChange={(e) => setSelectedState(e.target.value)} // <-- correct setter
    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
  >
    <option value="">Select State/Province</option>
    {Array.isArray(states) && states.map(s => (
      <option key={s.id} value={s.id}>{s.name}</option>
    ))}
  </select>
                  {/* <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select State/Province</option>
                    {Array.isArray(states) && states.map(s => (
                      console.log(s,"ddddd"),
                      <option key={s.id} value={s.id}>{s.name}</option>

                      // <option key={s.code} value={s.name}>{s.name}</option>
                    ))}
                  </select> */}
                  {errors.stateProvince && <p className="mt-1 text-sm text-red-600">{errors.stateProvince.message}</p>}
                </div>

                {/* Reg Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">REG Number *</label>
                  <input
                    type="text"
                    {...register('regNumber', { required: 'Registration number is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter registration number"
                  />
                  {errors.regNumber && <p className="mt-1 text-sm text-red-600">{errors.regNumber.message}</p>}
                </div>

                {/* Contact Person */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
                  <input
                    type="text"
                    {...register('contactPerson', { required: 'Contact person is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter contact person name"
                  />
                  {errors.contactPerson && <p className="mt-1 text-sm text-red-600">{errors.contactPerson.message}</p>}
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                  <input
                    type="tel"
                    {...register('mobile', { required: 'Mobile number is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter mobile number"
                  />
                  {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                {/* Website */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input
                    type="url"
                    {...register('website')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter website URL"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Address Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    {...register('city')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street</label>
                  <input
                    type="text"
                    {...register('street')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter street address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PO Box</label>
                  <input
                    type="text"
                    {...register('poBox')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter PO Box"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
                  <textarea
                    {...register('address')}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Enter complete address"
                  />
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Attach Documents</h4>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleDocumentUpload}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {documents.length > 0 && (
                <div className="mt-4 space-y-2">
                  {documents.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                      <span className="text-sm text-gray-600">{doc.name}</span>
                      <button type="button" onClick={() => removeDocument(doc.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Fields */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Additional Fields</h4>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newFieldName}
                  onChange={(e) => setNewFieldName(e.target.value)}
                  placeholder="Field name"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={newFieldType}
                  onChange={(e) => setNewFieldType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="select">Select</option>
                  <option value="textarea">Textarea</option>
                </select>
                <button
                  type="button"
                  onClick={addCustomField}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {additionalFields.length > 0 && (
                <div className="space-y-3">
                  {additionalFields.map(field => (
                    <div key={field.id} className="flex items-center gap-2">
                      <label className="w-32 text-sm font-medium text-gray-700">{field.name}:</label>
                      {field.type === 'textarea' ? (
                        <textarea
                          value={field.value}
                          onChange={(e) => updateCustomFieldValue(field.id, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={2}
                        />
                      ) : field.type === 'select' ? (
                        <select
                          value={field.value}
                          onChange={(e) => updateCustomFieldValue(field.id, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select option</option>
                          {field.options?.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          value={field.value}
                          onChange={(e) => updateCustomFieldValue(field.id, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => removeCustomField(field.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
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
                {company ? 'Update Company' : 'Create Company'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyForm;
