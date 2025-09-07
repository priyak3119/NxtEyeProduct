// Auth API
export const authAPI = {
  login: (credentials) => api.post("/auth/login/", credentials),
  adminLogin: (credentials) => api.post("/auth/admin-login/", credentials),
  superAdminLogin: (credentials) => api.post("/auth/super-admin-login/", credentials),
  register: (userData) => api.post("/auth/register/", userData),
  logout: () => api.post("/auth/logout/"),
  refreshToken: (refresh) => api.post("/auth/token/refresh/", { refresh }),
  getProfile: () => api.get("/auth/profile/"),
  updateProfile: (data) => api.patch("/auth/profile/", data),
  changePassword: (data) => api.post("/auth/change-password/", data),
  resetPassword: (data) => api.post("/auth/reset-password/", data),
};
// export const authAPI = {
//   login: (credentials) => api.post('/auth/login/', credentials),
//   adminLogin: (credentials) => api.post('/auth/admin-login/', credentials),
//   superAdminLogin: (credentials) => api.post('/super-admin/login/', credentials),
//   register: (userData) => api.post('/auth/register/', userData),
//   logout: () => api.post('/auth/logout/'),
//   refreshToken: (refresh) => api.post('/auth/token/refresh/', { refresh }),
//   getProfile: () => api.get('/auth/profile/'),
//   updateProfile: (data) => api.patch('/auth/profile/', data),
//   changePassword: (data) => api.post('/auth/change-password/', data),
//   resetPassword: (data) => api.post('/auth/reset-password/', data),
// };
// Company API
export const companyAPI = {
  getCompanies: (params) => api.get('/companies/', { params }),
  createCompany: (data) => api.post('/companies/', data),
  getCompany: (id) => api.get(`/companies/${id}/`),
  updateCompany: (id, data) => api.patch(`/companies/${id}/`, data),
  deleteCompany: (id) => api.delete(`/companies/${id}/`),
  getRegions: () => api.get('/companies/regions/'),
  getCompanyStats: () => api.get('/companies/stats/'),
};

// Department API
export const departmentAPI = {
  getDepartments: (params) => api.get('/companies/departments/', { params }),
  createDepartment: (data) => api.post('/companies/departments/', data),
  getDepartment: (id) => api.get(`/companies/departments/${id}/`),
  updateDepartment: (id, data) => api.patch(`/companies/departments/${id}/`, data),
  deleteDepartment: (id) => api.delete(`/companies/departments/${id}/`),
};

// Attendance API
export const attendanceAPI = {
  getAttendance: (params) => api.get('/attendance/', { params }),
  createAttendance: (data) => api.post('/attendance/', data),
  updateAttendance: (id, data) => api.patch(`/attendance/${id}/`, data),
  deleteAttendance: (id) => api.delete(`/attendance/${id}/`),
  getAttendanceStats: (params) => api.get('/attendance/stats/', { params }),
  bulkUpdateAttendance: (data) => api.post('/attendance/bulk-update/', data),
  getAttendanceCharts: (params) => api.get('/attendance/charts/', { params }),
};
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
          refresh: refreshToken,
        });
        
        const { access } = response.data;
        localStorage.setItem('access_token', access);
        
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export const superAdminAPI = {
  getProfile: () => api.get('/auth/profile/'),
  getClients: () => api.get('/super-admin/clients/'),
  createClient: (data) => api.post('/super-admin/clients/', data),
  updateClient: (id, data) => api.patch(`/super-admin/clients/${id}/`, data),
  deleteClient: (id) => api.delete(`/super-admin/clients/${id}/`),
  activateClient: (id) => api.post(`/super-admin/clients/${id}/activate/`),
  deactivateClient: (id) => api.post(`/super-admin/clients/${id}/deactivate/`),
  setClientPermissions: (clientId, permissions) => 
    api.post(`/super-admin/clients/${clientId}/set-permissions/`, { permissions }),
  // Pricing Plans
  getPricingPlans: () => api.get('/super-admin/pricing-plans/'),
  createPricingPlan: (data) => api.post('/super-admin/pricing-plans/', data),
  updatePricingPlan: (id, data) => api.patch(`/super-admin/pricing-plans/${id}/`, data),
  deletePricingPlan: (id) => api.delete(`/super-admin/pricing-plans/${id}/`),
  // Invoices
  getInvoices: () => api.get('/super-admin/invoices/'),
  createInvoice: (data) => api.post('/super-admin/invoices/', data),
  updateInvoice: (id, data) => api.patch(`/super-admin/invoices/${id}/`, data),
  deleteInvoice: (id) => api.delete(`/super-admin/invoices/${id}/`),
  updateCompany: (id, data) => api.patch(`/companies/${id}/`, data),
  deleteCompany: (id) => api.delete(`/companies/${id}/`),
  getRegions: () => api.get('/companies/regions/'),
  getCompanyStats: () => api.get('/companies/stats/'),
};

// Branch API
export const branchAPI = {
  getBranches: (params) => api.get('/companies/branches/', { params }),
  createBranch: (data) => api.post('/companies/branches/', data),
  getBranch: (id) => api.get(`/companies/branches/${id}/`),
  updateBranch: (id, data) => api.patch(`/companies/branches/${id}/`, data),
  deleteBranch: (id) => api.delete(`/companies/branches/${id}/`),
};

export const employeeAPI = {
  getEmployees: (params) => api.get('/employees/', { params }),
  createEmployee: (data) => api.post('/employees/', data),
  getEmployee: (id) => api.get(`/employees/${id}/`),
  updateEmployee: (id, data) => api.patch(`/employees/${id}/`, data),
  deleteEmployee: (id) => api.delete(`/employees/${id}/`),
  transferEmployees: (data) => api.post('/employees/transfer/', data),
  getTransferHistory: (employeeId) => api.get(`/employees/${employeeId}/transfer-history/`),
  getEmployeeStats: () => api.get('/employees/stats/'),
};

// Roles API
export const rolesAPI = {
  getRoles: (params) => api.get('/roles/', { params }),
  createRole: (data) => api.post('/roles/', data),
  getRole: (id) => api.get(`/roles/${id}/`),
  updateRole: (id, data) => api.patch(`/roles/${id}/`, data),
  deleteRole: (id) => api.delete(`/roles/${id}/`),
  getPermissions: () => api.get('/roles/permissions/'),
  assignRole: (data) => api.post('/roles/assign/', data),
};

// Payroll API
export const payrollAPI = {
  getPayrolls: (params) => api.get('/payroll/', { params }),
  createPayroll: (data) => api.post('/payroll/', data),
  updatePayroll: (id, data) => api.patch(`/payroll/${id}/`, data),
  deletePayroll: (id) => api.delete(`/payroll/${id}/`),
  processPayroll: (data) => api.post('/payroll/process/', data),
  getPayrollStats: (params) => api.get('/payroll/stats/', { params }),
};

// Invoice API
export const invoiceAPI = {
  getInvoices: (params) => api.get('/invoices/', { params }),
  createInvoice: (data) => api.post('/invoices/', data),
  getInvoice: (id) => api.get(`/invoices/${id}/`),
  updateInvoice: (id, data) => api.patch(`/invoices/${id}/`, data),
  deleteInvoice: (id) => api.delete(`/invoices/${id}/`),
  generateInvoice: (data) => api.post('/invoices/generate/', data),
};

// Notifications API
export const notificationAPI = {
  getNotifications: () => api.get('/notifications/'),
  markAsRead: (id) => api.patch(`/notifications/${id}/mark-read/`),
  markAllAsRead: () => api.post('/notifications/mark-all-read/'),
  deleteNotification: (id) => api.delete(`/notifications/${id}/`),
};

// Reports API
export const reportsAPI = {
  getAttendanceReport: (params) => api.get('/reports/attendance/', { params }),
  getPayrollReport: (params) => api.get('/reports/payroll/', { params }),
  getEmployeeReport: (params) => api.get('/reports/employee/', { params }),
  exportReport: (type, params) => api.get(`/reports/${type}/export/`, { params, responseType: 'blob' }),
};




export default api;