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
  isCurrentUser?: boolean;
}

export default function UserProfile({ user, api, isCurrentUser = false }: UserProfileProps) {
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
    <div className="container mx-auto p-4">
      {/* Success/Error Messages */}
      {success && (
        <Alert className="mb-4 border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}
      
      {error && (
        <Alert className="mb-4 border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center">
          <Avatar className="h-16 w-16 mr-4">
            <AvatarImage src={user.profilePhotoUrl || "/placeholder.svg?height=64&width=64"} />
            <AvatarFallback>{getInitials(user.firstName, user.lastName)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{user.firstName} {user.lastName}</h1>
            <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className="mt-1">
              {user.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        <Card className='col-span-2 md:col-span-1'>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-2 rounded-full p-2 bg-blue-500">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">{user.role.name}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Classes Managed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-2 rounded-full p-2 bg-green-500">
                <Crown className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalClasses}</div>
                <p className="text-xs text-gray-500">As Class Teacher</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Subjects Teaching</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-2 rounded-full p-2 bg-purple-500">
                <Book className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalSubjects}</div>
                <p className="text-xs text-gray-500">Different Subjects</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Classes Information */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Teaching Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Classes Managed */}
            <div className="mb-6">
              <h3 className="font-medium mb-3 flex items-center">
                <Crown className="h-4 w-4 mr-2 text-yellow-600" />
                Classes Managed (Class Teacher)
              </h3>
              {user.classesManaged.length > 0 ? (
                <div className="space-y-2">
                  {user.classesManaged.map((cls) => (
                    <div key={cls.id} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div>
                        <span className="font-medium">{cls.name}</span>
                        <span className="text-sm text-gray-500 ml-2">({cls.academicYear.year})</span>
                        <span className="text-sm text-gray-500 ml-1">- Grade {cls.grade.name}</span>
                      </div>
                      <Badge variant="outline" className="bg-yellow-100">
                        {cls.classStudents.length} students
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No classes managed as class teacher</p>
              )}
            </div>

            {/* Subjects Teaching */}
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <GraduationCap className="h-4 w-4 mr-2 text-blue-600" />
                Subjects Teaching
              </h3>
              {user.subjectsTeaching.length > 0 ? (
                <div className="space-y-2">
                  {user.subjectsTeaching.map((subject, index) => (
                    <div key={`${subject.subject.code}-${index}`} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-medium">{subject.subject.name}</span>
                          <span className="text-sm text-gray-500 ml-2">({subject.subject.code})</span>
                        </div>
                        <Badge variant="outline" className="bg-blue-100">
                          {subject.assessments.length} assessments
                        </Badge>
                      </div>
                        <div className="flex items-center gap-2 mt-1">
                        <span className="font-semibold text-gray-700">{subject.classModel.name}</span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          {subject.classModel.classStudents.length} students
                        </span>
                        </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No subjects assigned for teaching</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <User className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Full Name</h3>
                    <p className="text-sm text-gray-500">{user.firstName} {user.lastName}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <Mail className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <Phone className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-sm text-gray-500">{user.phone}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <Shield className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Account Status</h3>
                    <p className="text-sm text-gray-500 capitalize">{user.status}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your account preferences and access</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Personal Information Edit */}
            {isCurrentUser && (<div>
              <h3 className="font-medium mb-3">Profile Settings</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  {editingSection === 'personal' ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Edit Personal Information</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={cancelEdit}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">First Name</label>
                          <input
                            type="text"
                            value={personalForm.firstName}
                            onChange={(e) => setPersonalForm({...personalForm, firstName: e.target.value})}
                            className="w-full p-2 border rounded-md"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Last Name</label>
                          <input
                            type="text"
                            value={personalForm.lastName}
                            onChange={(e) => setPersonalForm({...personalForm, lastName: e.target.value})}
                            className="w-full p-2 border rounded-md"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                          type="email"
                          value={personalForm.email}
                          onChange={(e) => setPersonalForm({...personalForm, email: e.target.value})}
                          className="w-full p-2 border rounded-md"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <input
                          type="tel"
                          value={personalForm.phone}
                          onChange={(e) => setPersonalForm({...personalForm, phone: e.target.value})}
                          className="w-full p-2 border rounded-md"
                          required
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={(e) => {
                            e.preventDefault();
                            handlePersonalDetailsSubmit(e);
                          }} 
                          disabled={loading}
                        >
                          <Save size={14} className="mr-2" />
                          {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button variant="outline" onClick={cancelEdit}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <User className="h-5 w-5 text-gray-500 mr-2" />
                          <h4 className="font-medium">Personal Information</h4>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingSection('personal')}
                        >
                          <Edit size={14} className="mr-2" />
                          Edit
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Update your name, contact information, and personal details
                      </p>
                    </>
                  )}
                </div>

                {/* Password Change */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  {editingSection === 'password' ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Change Password</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={cancelEdit}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Current Password</label>
                        <input
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                          className="w-full p-2 border rounded-md"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">New Password</label>
                        <input
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                          className="w-full p-2 border rounded-md"
                          required
                          minLength={8}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                          className="w-full p-2 border rounded-md"
                          required
                          minLength={8}
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={(e) => {
                            e.preventDefault();
                            handlePasswordSubmit(e);
                          }} 
                          disabled={loading}
                        >
                          <Save size={14} className="mr-2" />
                          {loading ? 'Updating...' : 'Update Password'}
                        </Button>
                        <Button variant="outline" onClick={cancelEdit}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Lock className="h-5 w-5 text-gray-500 mr-2" />
                          <h4 className="font-medium">Password & Security</h4>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingSection('password')}
                        >
                          <Edit size={14} className="mr-2" />
                          Change
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Update your password and security settings
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>)}

            {/* Role Management */}
            {!isCurrentUser && (
              <div>
                <h3 className="font-medium mb-3">System Access</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    {editingSection === 'role' ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Change Role</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={cancelEdit}
                          >
                            <X size={14} />
                          </Button>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Select Role</label>
                          <select
                            value={selectedRoleId}
                            onChange={(e) => setSelectedRoleId(Number(e.target.value))}
                            className="w-full p-2 border rounded-md"
                            required
                          >
                            {availableRoles.map((role) => (
                              <option key={role.id || 1} value={role.id || 1}>
                                {role.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            onClick={(e) => {
                              e.preventDefault();
                              handleRoleSubmit(e);
                            }} 
                            disabled={loading}
                          >
                            <Save size={14} className="mr-2" />
                            {loading ? 'Updating...' : 'Update Role'}
                          </Button>
                          <Button variant="outline" onClick={cancelEdit}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Shield className="h-5 w-5 text-gray-500 mr-2" />
                            <h4 className="font-medium">Access Permissions</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-blue-500 text-white">{user.role.name}</Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleEditRole}
                            >
                              <Edit size={14} className="mr-2" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Current role: {user.role.name} 
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}