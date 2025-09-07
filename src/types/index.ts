export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  createdAt: string;
  isActive: boolean;
  profileImage?: string;
  permissions: Permission[];
  companyId?: string;
  branchId?: string;
  assignedRoles: Role[];
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  empCode: string;
  empType: string;
  position: string;
  department: string;
  departmentId: string;
  shift: string;
  salary: number;
  hireDate: string;
  isActive: boolean;
  profileImage?: string;
  primaryContact: ContactPerson;
  address: Address;
  documents: Document[];
  additionalFields: CustomField[];
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  items: InvoiceItem[];
  createdAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  userSubscription: UserSubscription | null;
  plans: PricingPlan[];
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  popular?: boolean;
  description: string;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  endDate: string;
  plan: PricingPlan;
}

export interface Company {
  id: string;
  name: string;
  region: string;
  stateProvince: string;
  regNumber: string;
  contactPerson: string;
  mobile: string;
  email: string;
  username: string;
  address: string;
  city: string;
  street: string;
  poBox: string;
  website?: string;
  phone: string;
  logo?: string;
  createdAt: string;
  documents: Document[];
  additionalFields: CustomField[];
}

export interface Branch {
  id: string;
  companyId: string;
  name: string;
  region: string;
  stateProvince: string;
  regNumber: string;
  contactPerson: string;
  mobile: string;
  email: string;
  username: string;
  address: string;
  city: string;
  street: string;
  poBox: string;
  website?: string;
  phone: string;
  manager: string;
  isActive: boolean;
  createdAt: string;
  documents: Document[];
  additionalFields: CustomField[];
}

export interface Department {
  id: string;
  name: string;
  companyId: string;
  branchId: string;
  description?: string;
  headOfDepartment: string;
  isActive: boolean;
  createdAt: string;
}

export interface Region {
  id: string;
  name: string;
  code: string;
}

export interface Address {
  region: string;
  stateProvince: string;
  city: string;
  street: string;
  poBox: string;
}

export interface ContactPerson {
  name: string;
  relationship: string;
  mobile: string;
  address: Address;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface CustomField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'select' | 'textarea';
  value: string;
  options?: string[];
}

export interface Permission {
  id: string;
  name: string;
  module: string;
  action: string;
  enabled: boolean;
}

export interface Attendance {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
  workingHours?: number;
  overtime?: number;
  notes?: string;
}

export interface Payroll {
  id: string;
  employeeId: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: PayrollItem[];
  deductions: PayrollItem[];
  overtime: number;
  totalEarnings: number;
  totalDeductions: number;
  netSalary: number;
  status: 'draft' | 'processed' | 'paid';
  processedAt?: string;
}

export interface PayrollItem {
  id: string;
  name: string;
  amount: number;
  type: 'allowance' | 'deduction';
}

export interface Role {
  id: string;
  name: string;
  description: string;
  companyId: string;
  branchId?: string;
  permissions: Permission[];
  isActive: boolean;
  createdAt: string;
}

export interface Permission {
  id: string;
  name: string;
  module: 'company' | 'branch' | 'department' | 'employee' | 'attendance' | 'invoice' | 'roles' | 'users';
  action: 'create' | 'read' | 'update' | 'delete';
  enabled: boolean;
}

export interface AttendanceStats {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  monthlyAttendance: {
    month: string;
    present: number;
    absent: number;
    late: number;
  }[];
  departmentWiseAttendance: {
    department: string;
    present: number;
    absent: number;
    total: number;
  }[];
}

export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  breakDuration: number;
  isActive: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'netbanking';
  cardNumber?: string;
  expiryDate?: string;
  cardholderName?: string;
  upiId?: string;
  isDefault: boolean;
}