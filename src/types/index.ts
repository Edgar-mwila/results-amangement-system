export interface Contact {
  id: string;
  email?: string;
  phone?: string;
}

// Enums for better type safety
export enum SchoolCategory {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  COMBINED = 'combined'
}

export enum SchoolOwnership {
  PUBLIC = 'public',
  PRIVATE = 'private',
  INTERNATIONAL = 'international',
  OTHER = 'other'
}

export enum SchoolCurriculum {
  NATIONAL = 'national',
  INTERNATIONAL = 'international',
  MIXED = 'mixed'
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  CANCELLED = 'cancelled'
}

export enum SchoolStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended'
}

// Main School interface
export interface School {
  id: string; // UUID as string in TypeScript
  name: string; // @NotBlank - required
  about?: string; // TEXT - optional
  motto?: string; // TEXT - optional
  registrationNumber: string; // @NotBlank, unique - required
  logoUrl?: string; // optional
  category?: SchoolCategory | string; // 'primary, secondary, combined'
  ownership?: SchoolOwnership | string; // 'public, private, international, other'
  curriculum?: SchoolCurriculum | string; // 'national, international, mixed'
  stateProvince?: string; // optional
  city?: string; // optional
  township?: string; // optional
  address?: string; // TEXT - optional
  postalAddress?: string; // optional
  subdomain: string; // @NotBlank, unique - required
  subscriptionStartDate?: string; // ISO date string
  subscriptionEndDate?: string; // ISO date string
  subscriptionStatus?: SubscriptionStatus | string; // 'active, cancelled'
  status?: SchoolStatus | string; // 'pending, approved, rejected, suspended'
  approvedAt?: string; // ISO date string
  approvedBy?: number; // Long as number
  createdAt: string; // @CreationTimestamp - ISO date string, required
  updatedAt?: string; // @UpdateTimestamp - ISO date string
  isDeleted?: boolean; // Default false
  contacts?: Contact[]; // Array of contacts
  deletedAt?: string; // ISO date string
  deletedBy?: number; // Long as number
}

// Utility type for creating a new school (omitting auto-generated fields)
export type CreateSchoolRequest = Omit<
  School,
  'id' | 'createdAt' | 'updatedAt' | 'approvedAt' | 'deletedAt'
> & {
  // Make optional fields explicitly optional for creation
  about?: string;
  motto?: string;
  logoUrl?: string;
  category?: SchoolCategory | string;
  ownership?: SchoolOwnership | string;
  curriculum?: SchoolCurriculum | string;
  stateProvince?: string;
  city?: string;
  township?: string;
  address?: string;
  postalAddress?: string;
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
  subscriptionStatus?: SubscriptionStatus | string;
  status?: SchoolStatus | string;
  approvedBy?: number;
  isDeleted?: boolean;
  contacts?: Contact[];
  deletedBy?: number;
};

// Utility type for updating a school (all fields optional except id)
export type UpdateSchoolRequest = Partial<Omit<School, 'id' | 'createdAt'>> & {
  id: string;
};

// Type for school profile display (with computed fields)
export type SchoolProfile = School & {
  // Add any computed properties you might need for display
  daysUntilSubscriptionExpiry?: number;
  isSubscriptionActive?: boolean;
  contactCount?: number;
};

// API response types
export interface SchoolApiResponse {
  success: boolean;
  data?: School;
  message?: string;
  errors?: string[];
}

export interface SchoolListApiResponse {
  success: boolean;
  data?: School[];
  message?: string;
  errors?: string[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form validation types
export interface SchoolFormErrors {
  name?: string;
  registrationNumber?: string;
  subdomain?: string;
  category?: string;
  ownership?: string;
  curriculum?: string;
  // Add other validation error fields as needed
}

// Search/Filter types
export interface SchoolSearchFilters {
  name?: string;
  category?: SchoolCategory | string;
  ownership?: SchoolOwnership | string;
  curriculum?: SchoolCurriculum | string;
  status?: SchoolStatus | string;
  subscriptionStatus?: SubscriptionStatus | string;
  city?: string;
  stateProvince?: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
}

export interface ClassModel {
  id: string;
  name: string;
  studentCount: number;
  academicYear: AcademicYear;
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePhotoUrl?: string;
  status: 'active' | 'inactive';
  role: Role;
  lastLogin?: string;
  createdAt: string;
  classesManaged: ClassModel[];
  subjectsTeaching: ClassSubject[];
}

export interface ApiEndpoints {
  updatePersonalDetails: (userId: string, data: PersonalDetailsForm) => Promise<void>;
  updatePassword: (userId: string, data: PasswordForm) => Promise<void>;
  updateRole: (userId: string, roleId: string) => Promise<void>;
  getRoles: () => Promise<Role[]>;
}

export interface UserProfileProps {
  user: UserData;
  api: ApiEndpoints;
  canEditRole?: boolean;
}

export interface PersonalDetailsForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Type definitions based on your Java model
export interface Grade {
  id: number;
  level: number;
}

export interface AcademicYear {
  id: number;
  year: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

export interface ClassModel {
  id: string;
  name: string;
  grade: Grade;
  academicYear: AcademicYear;
  classTeacher: User;
  createdAt: string;
  studentCount: number; // Derived field for display
}

export interface CreateClassRequest {
  name: string;
  gradeId: number;
  academicYearId: number;
  classTeacherId: string;
}

interface Assessment {
  id: number;
  title: string;
  type: string;
  date: string;
  averageScore?: number;
  status: 'Completed' | 'In Progress' | 'Scheduled';
}


interface ClassStudent {
  id: number;
  student: Student;
  createdAt: string;
}

export interface ClassModel {
  id: string;
  name: string;
  grade: Grade;
  academicYear: AcademicYear;
  classTeacher: User;
  createdAt: string;
  classSubjects: ClassSubject[];
  classStudents: ClassStudent[];
}

export interface ClassComponentProps {
  classData: ClassModel;
}


interface ClassStudent {
  id: number
  classModel: ClassModel
  createdAt: string
}

export interface Student {
  id: number
  firstName: string
  otherName?: string
  lastName: string
  dateOfBirth: string
  gender: string
  status: string
  province: string
  city: string
  township: string
  address: string
  postalAddress: string
  createdAt: string
  classStudents: ClassStudent[]
}

export interface StudentPageProps {
  students: Student[]
}


interface ClassStudent {
  id: number
  classModel: ClassModel
  createdAt: string
}

export interface ClassSubject {
  id: number
  classModel: ClassModel
  teacher: User
  createdAt: string
  assessments: Assessment[]
  subject: Subject // This might be populated via a separate call or join
}

interface Term {
  id: number
  name: string
  startDate: string
  endDate: string
}

interface Assessment {
  id: number
  classSubjects: ClassSubject
  term: Term
  name: string
  totalMarks: string // BigDecimal from backend
  dateOfAssessment: string
  createdAt: string
  studentAssessments: StudentAssessment[]
}

interface StudentAssessment {
  id: number
  assessment: Assessment
  marksObtained: string // BigDecimal from backend
  comment: string
  createdAt: string
}

interface GuardianStudent {
  id: number
  guardian: Guardian
  student: Student
  relationship: string
  createdAt: string
}

interface Guardian {
  id: number
  firstName: string
  lastName: string
  email?: string
  phoneNumber?: string
  address?: string
  createdAt: string
}

export interface Student {
  id: number
  firstName: string
  otherName?: string
  lastName: string
  dateOfBirth: string
  gender: string
  status: string
  stateProvince: string
  city: string
  township: string
  address: string
  postalAddress: string
  createdAt: string
  classStudents: ClassStudent[]
  assessments: StudentAssessment[]
  guardians: GuardianStudent[]
}

export interface StudentDetailsProps {
  student: Student
  classSubjects?: ClassSubject[] // Additional prop for class subjects with assessments
}

// Component for expandable subject row
export interface SubjectRowProps {
  classSubject: ClassSubject
  studentAssessments: StudentAssessment[]
}

// Type definitions based on your backend models
export interface Subject {
  id: number;
  name: string;
  code: string;
  url?: string;
  createdAt: string;
  classSubjects: ClassSubject[];
}

export interface ClassSubject {
  id: number;
  classModel: ClassModel;
  subject: Subject;
  teacher: User;
  createdAt: string;
}


// Derived interface for display purposes
export interface SubjectDisplay {
  id: number;
  name: string;
  code: string;
  url?: string;
  classes: string[];
  teachers: string[];
  students: number;
  departments: string[];
}