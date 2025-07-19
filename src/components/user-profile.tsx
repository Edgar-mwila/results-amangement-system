import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Book,
  Edit,
  Lock,
  Mail,
  Phone,
  Shield,
  User,
  X,
  Save,
  Crown,
  GraduationCap
} from "lucide-react";
import { Role } from "@/types";

interface Grade {
  id: number;
  name: string;
}

interface AcademicYear {
  id: number;
  year: string;
}

interface StudentData {
  id: number;
  firstName: string;
  otherName?: string;
  lastName: string;
  sex: string;
  gender: string;
}

interface SubjectData {
  name: string;
  code: string;
  url?: string;
}

interface Term {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

interface AssessmentData {
  id: number;
  name: string;
  totalMarks: number;
  term: Term; // Term enum/object
  createdAt: string;
}

interface ClassSubjectData {
  subject: SubjectData;
  classModel: ClassData;
  assessments: AssessmentData[];
}

interface ClassStudentData {
  student: StudentData;
}

interface ClassData {
  id: string;
  grade: Grade;
  name: string;
  academicYear: AcademicYear;
  classStudents: ClassStudentData[];
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passwordHash?: string;
  profilePhotoUrl?: string;
  status: string;
  classesManaged: ClassData[];
  subjectsTeaching: ClassSubjectData[];
  role: Role;
}

interface PersonalDetailsForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ApiInterface {
  updatePersonalDetails: (userId: string, data: PersonalDetailsForm) => Promise<void>;
  updatePassword: (userId: string, data: PasswordForm) => Promise<void>;
  updateRole: (userId: string, roleId: string) => Promise<void>;
  getRoles: () => Promise<Role[]>;
}

interface UserProfileProps {
  user: UserData;
  api: ApiInterface;
  canEditRole?: boolean;
}

export default function UserProfile({ user, api, canEditRole = false }: UserProfileProps) {
  const [editingSection, setEditingSection] = useState<'personal' | 'password' | 'role' | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Form states
  const [personalForm, setPersonalForm] = useState<PersonalDetailsForm>({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone
  });
  
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [selectedRoleId, setSelectedRoleId] = useState(user.role.id || 1);
  const [availableRoles, setAvailableRoles] = useState<Role[]>([]);

  const handlePersonalDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await api.updatePersonalDetails(user.id, personalForm);
      setSuccess('Personal details updated successfully');
      setEditingSection(null);
    } catch (err) {
      setError('Failed to update personal details');
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      await api.updatePassword(user.id, passwordForm);
      setSuccess('Password updated successfully');
      setEditingSection(null);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError('Failed to update password');
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await api.updateRole(user.id, selectedRoleId.toString());
      setSuccess('Role updated successfully');
      setEditingSection(null);
    } catch (err) {
      setError('Failed to update role');
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const loadRoles = async () => {
    try {
      const roles = await api.getRoles();
      setAvailableRoles(roles);
    } catch (err) {
      setError('Failed to load available roles');
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const handleEditRole = () => {
    setEditingSection('role');
    loadRoles();
  };

  const cancelEdit = () => {
    setEditingSection(null);
    setError(null);
    setSuccess(null);
    // Reset forms
    setPersonalForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone
    });
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setSelectedRoleId(user.role.id || 1);
  };

  // Get user initials for avatar
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Calculate total classes and subjects
  const totalClasses = user.classesManaged.length;
  const totalSubjects = [...new Set(user.subjectsTeaching.map(s => s.subject.name))].length;

  return (
    <div className="container mx-auto p-2 sm:p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
        <div className="flex items-center gap-4">
          {user.profilePhotoUrl && (
            <img
              src={user.profilePhotoUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
            />
          )}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{user.firstName} {user.lastName}</h1>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
        </div>
        {/* ... any action buttons ... */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* ... profile forms and details ... */}
      </div>

      {/* ... other sections ... */}
    </div>
  );
}