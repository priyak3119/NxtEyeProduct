// Type definitions for the application
export const UserRoles = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  USER: 'user',
  EMPLOYEE: 'employee'
};

export const PermissionModules = {
  COMPANY: 'company',
  BRANCH: 'branch',
  DEPARTMENT: 'department',
  EMPLOYEE: 'employee',
  ATTENDANCE: 'attendance',
  ROLES: 'roles',
  PAYROLL: 'payroll',
  REPORT: 'report',
  INVOICE: 'invoice'
};

export const PermissionActions = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete'
};

export const AttendanceStatus = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
  HALF_DAY: 'half_day'
};

export const InvoiceStatus = {
  PENDING: 'pending',
  PAID: 'paid',
  OVERDUE: 'overdue',
  CANCELLED: 'cancelled'
};

export const NotificationTypes = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
};