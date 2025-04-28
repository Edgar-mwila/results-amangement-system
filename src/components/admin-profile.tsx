"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User,
  Mail,
  Phone,
  Award,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle,
  FileText,
  LayoutDashboard,
  UserCog,
  Edit,
  Plus,
  Trash2,
  Key,
  Lock,
  Settings,
  Calendar,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { EmailDialog } from "./email-dialog"

// Define types
type AdminRole = "super_admin" | "admin" | "system_admin" | "department_admin"
type AdminStatus = "active" | "inactive" | "suspended"
type AdminPermission = "full_access" | "view_only" | "edit" | "create" | "delete"

type Department = {
  id: number
  name: string
  teachers: number
  students: number
}

type Module = {
  id: number
  name: string
  access: AdminPermission
}

type Activity = {
  id: number
  type: "action" | "alert" | "success"
  message: string
  date: string
}

type AdminData = {
  id: number
  role: AdminRole
  name: string
  status: AdminStatus
  departments: Department[]
  permissions: AdminPermission
  modules: Module[]
  qualifications: string
  yearsOfExperience: number
  contactInfo: {
    email: string
    phone: string
  }
  lastLogin: string
  accountCreated: string
  recentActivities: Activity[]
}

// Mock data for admin
const adminData: AdminData = {
  id: 1,
  role: "admin",
  name: "Jane Smith",
  status: "active",
  departments: [
    {
      id: 1,
      name: "Science Department",
      teachers: 12,
      students: 350,
    },
    {
      id: 2,
      name: "Mathematics Department",
      teachers: 8,
      students: 280,
    },
  ],
  permissions: "full_access",
  modules: [
    {
      id: 1,
      name: "User Management",
      access: "full_access",
    },
    {
      id: 2,
      name: "Class Management",
      access: "full_access",
    },
    {
      id: 3,
      name: "Reports",
      access: "view_only",
    },
    {
      id: 4,
      name: "System Settings",
      access: "edit",
    },
  ],
  qualifications: "M.Ed. Educational Administration, B.Sc. Computer Science",
  yearsOfExperience: 10,
  contactInfo: {
    email: "jane.smith@ph-EduTrack.com",
    phone: "+1987654321",
  },
  lastLogin: "2024-03-25 09:15:22",
  accountCreated: "2022-08-15",
  recentActivities: [
    {
      id: 1,
      type: "action",
      message: "Updated system settings",
      date: "2024-03-25",
    },
    {
      id: 2,
      type: "alert",
      message: "Reset password for teacher John Doe",
      date: "2024-03-24",
    },
    {
      id: 3,
      type: "success",
      message: "Generated end-of-term reports",
      date: "2024-03-22",
    },
  ],
}

// Available modules for assignment
const availableModules = [
  { id: 1, name: "Staff Management" },
  { id: 2, name: "Class Management" },
  { id: 3, name: "Reports" },
  { id: 4, name: "System Settings" },
  { id: 5, name: "Student Management" },
  { id: 6, name: "School Administration" }
]

export function AdminDetailView() {
  const [admin, setAdmin] = useState<AdminData>(adminData)
  const [roleDialogOpen, setRoleDialogOpen] = useState(false)
  const [personalInfoDialogOpen, setPersonalInfoDialogOpen] = useState(false)
  const [moduleDialogOpen, setModuleDialogOpen] = useState(false)
  const [role, setRole] = useState<AdminRole>(admin.role)
  const [status, setStatus] = useState<AdminStatus>(admin.status)
  const [permissions, setPermissions] = useState<AdminPermission>(admin.permissions)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newModule, setNewModule] = useState("")
  const [newModuleAccess, setNewModuleAccess] = useState<AdminPermission>("view_only")

  // Personal info form state
  const [personalInfo, setPersonalInfo] = useState({
    name: admin.name,
    email: admin.contactInfo.email,
    phone: admin.contactInfo.phone,
    qualifications: admin.qualifications,
    yearsOfExperience: admin.yearsOfExperience.toString(),
  })

  const { toast } = useToast()

  const handleRoleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update the admin data with new role and status
      setAdmin((prev) => ({
        ...prev,
        role,
        status,
        permissions,
      }))

      // Show success toast
      toast({
        title: "Role updated",
        description: `${admin.name}'s role has been updated successfully.`,
      })

      // Close the dialog
      setRoleDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update role. Please try again.",
        variant: "destructive",
      })
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePersonalInfoSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update admin data
      setAdmin((prev) => ({
        ...prev,
        name: personalInfo.name,
        contactInfo: {
          email: personalInfo.email,
          phone: personalInfo.phone,
        },
        qualifications: personalInfo.qualifications,
        yearsOfExperience: Number.parseInt(personalInfo.yearsOfExperience) || 0,
      }))

      toast({
        title: "Information updated",
        description: "Personal information has been updated successfully.",
      })

      setPersonalInfoDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update information. Please try again.",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddModule = async () => {
    if (!newModule) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if module already exists
      if (admin.modules.some((module) => module.name === newModule)) {
        toast({
          title: "Module already exists",
          description: `${newModule} is already assigned to this admin.`,
          variant: "destructive",
        })
        return
      }

      // Find the module from available modules
      const moduleToAdd = availableModules.find((module) => module.name === newModule)

      if (!moduleToAdd) {
        toast({
          title: "Module not found",
          description: "The selected module could not be found.",
          variant: "destructive",
        })
        return
      }

      // Update admin data
      setAdmin((prev) => ({
        ...prev,
        modules: [
          ...prev.modules,
          {
            id: moduleToAdd.id,
            name: moduleToAdd.name,
            access: newModuleAccess,
          },
        ],
      }))

      toast({
        title: "Module added",
        description: `${newModule} has been added to ${admin.name}'s modules.`,
      })

      setNewModule("")
      setNewModuleAccess("view_only")
      setModuleDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add module. Please try again.",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRemoveModule = async (moduleId: number) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update admin data
      setAdmin((prev) => ({
        ...prev,
        modules: prev.modules.filter((module) => module.id !== moduleId),
      }))

      toast({
        title: "Module removed",
        description: "Module has been removed successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove module. Please try again.",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  const handleUpdateModuleAccess = async (moduleId: number, access: AdminPermission) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update admin data
      setAdmin((prev) => ({
        ...prev,
        modules: prev.modules.map((module) => (module.id === moduleId ? { ...module, access } : module)),
      }))

      toast({
        title: "Access updated",
        description: "Module access has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update module access. Please try again.",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  const getStatusBadge = (status: AdminStatus) => {
    const styles = {
      active: "bg-green-500 text-white",
      inactive: "bg-red-500 text-white",
      suspended: "bg-amber-500 text-white",
    }
    return <Badge className={styles[status]}>{status}</Badge>
  }

  const getRoleBadge = (role: AdminRole) => {
    const roleLabels = {
      super_admin: "Super Administrator",
      admin: "Administrator",
      system_admin: "System Administrator",
      department_admin: "Department Administrator",
    }
    return <Badge className="bg-[#3D405B]">{roleLabels[role]}</Badge>
  }

  const getPermissionBadge = (permission: AdminPermission) => {
    const styles = {
      full_access: "bg-green-500 text-white",
      view_only: "bg-blue-500 text-white",
      edit: "bg-amber-500 text-white",
      create: "bg-purple-500 text-white",
      delete: "bg-red-500 text-white",
    }
    return <Badge className={styles[permission]}>{permission.replace("_", " ")}</Badge>
  }

  // Filter out modules that are already assigned
  const unassignedModules = availableModules.filter(
    (availableModule) => !admin.modules.some((adminModule) => adminModule.id === availableModule.id),
  )

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <Button
        variant="outline"
        onClick={() => window.history.back()}
        className="flex items-center gap-2 border-[#F2CC8F] text-[#264653] hover:bg-[#F2CC8F]/10 mb-4"
      >
        <LayoutDashboard className="h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="flex justify-between items-start shadow-sm p-6 mb-6 bg-white rounded-lg">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-[#264653]">{admin.name}</h1>
            {getStatusBadge(admin.status)}
            {getRoleBadge(admin.role)}
          </div>
          <p className="text-[#A8A8A8] flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            {admin.permissions === "full_access" ? "Full System Access" : "Limited System Access"}
          </p>
        </div>
        <div className="flex gap-3">
          <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-[#3D405B] text-white hover:bg-[#3D405B]/80">
                <UserCog className="mr-2 h-4 w-4" />
                Alter Role
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-[#3D405B]">Change Admin Role</DialogTitle>
                <DialogDescription>Update the role, status, and permissions for {admin.name}.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select value={role} onValueChange={(value: string) => setRole(value as AdminRole)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super_admin">Super Administrator</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="system_admin">System Administrator</SelectItem>
                      <SelectItem value="department_admin">Department Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select value={status} onValueChange={(value: string) => setStatus(value as AdminStatus)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="permissions" className="text-right">
                    Permissions
                  </Label>
                  <Select
                    value={permissions}
                    onValueChange={(value: string) => setPermissions(value as AdminPermission)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select permissions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full_access">Full Access</SelectItem>
                      <SelectItem value="view_only">View Only</SelectItem>
                      <SelectItem value="edit">Edit</SelectItem>
                      <SelectItem value="create">Create</SelectItem>
                      <SelectItem value="delete">Delete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setRoleDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleRoleSubmit} className="bg-green-500 hover:bg-green-600" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save changes"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <EmailDialog teacherEmail={admin.contactInfo.email} teacherName={admin.name} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Personal Info */}
        <div className="space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[#264653] flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </CardTitle>
              <Dialog open={personalInfoDialogOpen} onOpenChange={setPersonalInfoDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Personal Information</DialogTitle>
                    <DialogDescription>Update {admin.name}'s personal information.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={personalInfo.name}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="qualifications" className="text-right">
                        Qualifications
                      </Label>
                      <Input
                        id="qualifications"
                        value={personalInfo.qualifications}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, qualifications: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="experience" className="text-right">
                        Years of Experience
                      </Label>
                      <Input
                        id="experience"
                        type="number"
                        value={personalInfo.yearsOfExperience}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, yearsOfExperience: e.target.value })}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setPersonalInfoDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handlePersonalInfoSubmit}
                      className="bg-green-500 hover:bg-green-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Saving..." : "Save changes"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[#A8A8A8]">Email</Label>
                  <div className="flex items-center text-[#264653]">
                    <Mail className="w-4 h-4 mr-2" />
                    {admin.contactInfo.email}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#A8A8A8]">Phone</Label>
                  <div className="flex items-center text-[#264653]">
                    <Phone className="w-4 h-4 mr-2" />
                    {admin.contactInfo.phone}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#A8A8A8]">Qualifications</Label>
                  <div className="flex items-center text-[#264653]">
                    <Award className="w-4 h-4 mr-2" />
                    {admin.qualifications}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#A8A8A8]">Experience</Label>
                  <div className="flex items-center text-[#264653]">
                    <Clock className="w-4 h-4 mr-2" />
                    {admin.yearsOfExperience} years
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#A8A8A8]">Account Created</Label>
                  <div className="flex items-center text-[#264653]">
                    <Calendar className="w-4 h-4 mr-2" />
                    {admin.accountCreated}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#A8A8A8]">Last Login</Label>
                  <div className="flex items-center text-[#264653]">
                    <Clock className="w-4 h-4 mr-2" />
                    {admin.lastLogin}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#264653] flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {admin.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    {activity.type === "alert" && <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />}
                    {activity.type === "success" && <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />}
                    {activity.type === "action" && <Settings className="w-4 h-4 text-[#264653] flex-shrink-0" />}
                    <div>
                      <p className="text-[#264653] text-sm">{activity.message}</p>
                      <p className="text-[#A8A8A8] text-xs">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle and Right Columns - Modules and Departments */}
        <div className="col-span-2 space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[#264653] flex items-center">
                <Key className="w-5 h-5 mr-2" />
                System Access & Modules
              </CardTitle>
              <Dialog open={moduleDialogOpen} onOpenChange={setModuleDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                    <Plus className="h-4 w-4 mr-1" /> Add Module
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Module Access</DialogTitle>
                    <DialogDescription>Add a new module access for {admin.name}.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="module" className="text-right">
                        Module
                      </Label>
                      <Select value={newModule} onValueChange={setNewModule}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select module" />
                        </SelectTrigger>
                        <SelectContent>
                          {unassignedModules.map((module) => (
                            <SelectItem key={module.id} value={module.name}>
                              {module.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="access" className="text-right">
                        Access Level
                      </Label>
                      <Select
                        value={newModuleAccess}
                        onValueChange={(value: string) => setNewModuleAccess(value as AdminPermission)}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select access level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full_access">Full Access</SelectItem>
                          <SelectItem value="view_only">View Only</SelectItem>
                          <SelectItem value="edit">Edit</SelectItem>
                          <SelectItem value="create">Create</SelectItem>
                          <SelectItem value="delete">Delete</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setModuleDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddModule}
                      className="bg-green-500 hover:bg-green-600"
                      disabled={isSubmitting || !newModule}
                    >
                      {isSubmitting ? "Adding..." : "Add Module"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Module</TableHead>
                    <TableHead>Access Level</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admin.modules.length > 0 ? (
                    admin.modules.map((module) => (
                      <TableRow key={module.id}>
                        <TableCell className="font-medium">{module.name}</TableCell>
                        <TableCell>{getPermissionBadge(module.access)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Select
                              value={module.access}
                              onValueChange={(value: string) =>
                                handleUpdateModuleAccess(module.id, value as AdminPermission)
                              }
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Change access" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="full_access">Full Access</SelectItem>
                                <SelectItem value="view_only">View Only</SelectItem>
                                <SelectItem value="edit">Edit</SelectItem>
                                <SelectItem value="create">Create</SelectItem>
                                <SelectItem value="delete">Delete</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveModule(module.id)}
                              className="h-8 w-8 text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-gray-500 py-4">
                        No modules assigned yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#264653] flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <h3 className="font-medium text-[#264653]">Reset Password</h3>
                    <p className="text-sm text-gray-500">Send a password reset link to the admin's email</p>
                  </div>
                  <Button variant="outline" className="border-[#3D405B] text-[#3D405B]">
                    Reset Password
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <h3 className="font-medium text-[#264653]">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">Enable additional security for login</p>
                  </div>
                  <Button variant="outline" className="border-[#3D405B] text-[#3D405B]">
                    {admin.role === "super_admin" ? "Enabled" : "Enable 2FA"}
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <h3 className="font-medium text-[#264653]">Login History</h3>
                    <p className="text-sm text-gray-500">View recent login attempts and locations</p>
                  </div>
                  <Button variant="outline" className="border-[#3D405B] text-[#3D405B]">
                    View History
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}