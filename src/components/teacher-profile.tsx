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
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  FileText,
  LayoutDashboard,
  UserCog,
  Edit,
  Plus,
  Trash2,
  BookOpen,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { EmailDialog } from "./email-dialog"
import { generateTeacherReport } from "./teacher-report"

// Define types
type TeacherRole = "admin" | "teacher" | "hod" | "it"
type TeacherStatus = "active" | "on-leave" | "inactive"

type ClassInfo = {
  id: number
  name: string
  students: number
  avgPerformance: number
  subject: string
  lastTest: string
}

type Activity = {
  id: number
  type: "task" | "alert" | "success"
  message: string
  date: string
}

type TeacherData = {
  id: number
  role: TeacherRole
  name: string
  subjects: string[]
  primarySubject: string
  status: TeacherStatus
  classes: ClassInfo[]
  qualifications: string
  yearsOfExperience: number
  contactInfo: {
    email: string
    phone: string
  }
  performance: {
    classes: number
    averageScore: number
    students: number
    bestClass: string
  }
  recentActivities: Activity[]
}

// Extended mock data
const teacherData: TeacherData = {
  id: 1,
  role: "teacher",
  name: "John Doe",
  primarySubject: "Mathematics",
  subjects: ["Mathematics", "Physics"],
  status: "active",
  classes: [
    {
      id: 1,
      name: "10A",
      students: 30,
      avgPerformance: 85,
      subject: "Mathematics",
      lastTest: "2024-03-21",
    },
    {
      id: 2,
      name: "11B",
      students: 28,
      avgPerformance: 82,
      subject: "Mathematics",
      lastTest: "2024-03-21",
    },
    {
      id: 3,
      name: "12C",
      students: 25,
      avgPerformance: 88,
      subject: "Physics",
      lastTest: "2024-03-20",
    },
  ],
  qualifications: "M.Sc. Mathematics, B.Ed.",
  yearsOfExperience: 8,
  contactInfo: {
    email: "john.doe@ph-EduTrack.com",
    phone: "+1234567890",
  },
  performance: {
    classes: 3,
    averageScore: 75,
    students: 88,
    bestClass: "12C",
  },
  recentActivities: [
    {
      id: 1,
      type: "task",
      message: "Scheduled test 3 for 12C",
      date: "2024-03-21",
    },
    {
      id: 2,
      type: "alert",
      message: "Postponed test 2 for 11C",
      date: "2024-03-19",
    },
    {
      id: 3,
      type: "success",
      message: "Submitted test scores for 10A",
      date: "2024-03-15",
    },
  ],
}

// Available subjects for assignment
const availableSubjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Geography",
  "Computer Science",
  "Art",
  "Music",
  "Physical Education",
]

// Available classes for assignment
const availableClasses = [
  { id: 1, name: "10A", subject: "Mathematics" },
  { id: 2, name: "10B", subject: "Mathematics" },
  { id: 3, name: "10C", subject: "Physics" },
  { id: 4, name: "11A", subject: "Mathematics" },
  { id: 5, name: "11B", subject: "Mathematics" },
  { id: 6, name: "11C", subject: "Physics" },
  { id: 7, name: "12A", subject: "Mathematics" },
  { id: 8, name: "12B", subject: "Physics" },
  { id: 9, name: "12C", subject: "Physics" },
]

export function TeacherDetailView() {
  const [teacher, setTeacher] = useState<TeacherData>(teacherData)
  const [roleDialogOpen, setRoleDialogOpen] = useState(false)
  const [personalInfoDialogOpen, setPersonalInfoDialogOpen] = useState(false)
  const [subjectDialogOpen, setSubjectDialogOpen] = useState(false)
  const [classDialogOpen, setClassDialogOpen] = useState(false)
  const [removeClassDialogOpen, setRemoveClassDialogOpen] = useState(false)
  const [role, setRole] = useState<TeacherRole>(teacher.role)
  const [status, setStatus] = useState<TeacherStatus>(teacher.status)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newSubject, setNewSubject] = useState("")
  const [primarySubject, setPrimarySubject] = useState(teacher.primarySubject)
  const [selectedClassToRemove, setSelectedClassToRemove] = useState<number | null>(null)
  const [newClassInfo, setNewClassInfo] = useState({
    classId: "",
    subject: "",
  })

  // Personal info form state
  const [personalInfo, setPersonalInfo] = useState({
    name: teacher.name,
    email: teacher.contactInfo.email,
    phone: teacher.contactInfo.phone,
    qualifications: teacher.qualifications,
    yearsOfExperience: teacher.yearsOfExperience.toString(),
  })

  const { toast } = useToast()

  const handleRoleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // In a real application, you would make an API call here
      // For now, we'll simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update the teacher data with new role and status
      setTeacher((prev) => ({
        ...prev,
        role,
        status,
      }))

      // Show success toast
      toast({
        title: "Role updated",
        description: `${teacher.name}'s role has been updated successfully.`,
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

      // Update teacher data
      setTeacher((prev) => ({
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

  const handleAddSubject = async () => {
    if (!newSubject) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if subject already exists
      if (teacher.subjects.includes(newSubject)) {
        toast({
          title: "Subject already exists",
          description: `${newSubject} is already assigned to this teacher.`,
          variant: "destructive",
        })
        return
      }

      // Update teacher data
      setTeacher((prev) => ({
        ...prev,
        subjects: [...prev.subjects, newSubject],
        primarySubject: primarySubject || prev.primarySubject,
      }))

      toast({
        title: "Subject added",
        description: `${newSubject} has been added to ${teacher.name}'s subjects.`,
      })

      setNewSubject("")
      setSubjectDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add subject. Please try again.",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRemoveSubject = async (subjectToRemove: string) => {
    // Don't allow removing the primary subject
    if (subjectToRemove === teacher.primarySubject) {
      toast({
        title: "Cannot remove primary subject",
        description: "You cannot remove a teacher's primary subject. Change the primary subject first.",
        variant: "destructive",
      })
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update teacher data
      setTeacher((prev) => ({
        ...prev,
        subjects: prev.subjects.filter((subject) => subject !== subjectToRemove),
      }))

      toast({
        title: "Subject removed",
        description: `${subjectToRemove} has been removed from ${teacher.name}'s subjects.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove subject. Please try again.",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  const handleSetPrimarySubject = async (subject: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update teacher data
      setTeacher((prev) => ({
        ...prev,
        primarySubject: subject,
      }))

      toast({
        title: "Primary subject updated",
        description: `${subject} is now ${teacher.name}'s primary subject.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update primary subject. Please try again.",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  const handleAddClass = async () => {
    if (!newClassInfo.classId || !newClassInfo.subject) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find the class from available classes
      const classToAdd = availableClasses.find((c) => c.id.toString() === newClassInfo.classId)

      if (!classToAdd) {
        toast({
          title: "Class not found",
          description: "The selected class could not be found.",
          variant: "destructive",
        })
        return
      }

      // Check if class is already assigned
      if (teacher.classes.some((c) => c.id === classToAdd.id)) {
        toast({
          title: "Class already assigned",
          description: `${classToAdd.name} is already assigned to this teacher.`,
          variant: "destructive",
        })
        return
      }

      // Check if teacher teaches the subject
      if (!teacher.subjects.includes(newClassInfo.subject)) {
        toast({
          title: "Subject not taught",
          description: `This teacher does not teach ${newClassInfo.subject}. Add the subject first.`,
          variant: "destructive",
        })
        return
      }

      // Create new class info
      const newClass: ClassInfo = {
        id: classToAdd.id,
        name: classToAdd.name,
        students: Math.floor(Math.random() * 10) + 25, // Random number between 25-34
        avgPerformance: Math.floor(Math.random() * 15) + 75, // Random number between 75-89
        subject: newClassInfo.subject,
        lastTest: "Not yet conducted",
      }

      // Update teacher data
      setTeacher((prev) => ({
        ...prev,
        classes: [...prev.classes, newClass],
        performance: {
          ...prev.performance,
          classes: prev.performance.classes + 1,
          students: prev.performance.students + newClass.students,
        },
      }))

      toast({
        title: "Class assigned",
        description: `${classToAdd.name} has been assigned to ${teacher.name}.`,
      })

      setNewClassInfo({ classId: "", subject: "" })
      setClassDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign class. Please try again.",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRemoveClass = async () => {
    if (selectedClassToRemove === null) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find the class to remove
      const classToRemove = teacher.classes.find((c) => c.id === selectedClassToRemove)

      if (!classToRemove) {
        toast({
          title: "Class not found",
          description: "The selected class could not be found.",
          variant: "destructive",
        })
        return
      }

      // Update teacher data
      setTeacher((prev) => ({
        ...prev,
        classes: prev.classes.filter((c) => c.id !== selectedClassToRemove),
        performance: {
          ...prev.performance,
          classes: prev.performance.classes - 1,
          students: prev.performance.students - classToRemove.students,
          bestClass:
            prev.performance.bestClass === classToRemove.name
              ? prev.classes.length > 1
                ? prev.classes.sort((a, b) => b.avgPerformance - a.avgPerformance)[0].name
                : "None"
              : prev.performance.bestClass,
        },
      }))

      toast({
        title: "Class removed",
        description: `${classToRemove.name} has been removed from ${teacher.name}'s assignments.`,
      })

      setSelectedClassToRemove(null)
      setRemoveClassDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove class. Please try again.",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusBadge = (status: TeacherStatus) => {
    const styles = {
      active: "bg-green-500 text-white",
      "on-leave": "bg-amber-500 text-white",
      inactive: "bg-red-500 text-white",
    }
    return <Badge className={styles[status]}>{status}</Badge>
  }

  const getRoleBadge = (role: TeacherRole) => {
    const roleLabels = {
      admin: "Administrator",
      teacher: "Teacher",
      hod: "Head of Department",
      it: "IT Staff",
    }
    return <Badge className="bg-[#3D405B]">{roleLabels[role]}</Badge>
  }

  const getPerformanceColor = (value: number) => {
    if (value >= 85) return "text-green-500"
    if (value >= 70) return "text-amber-500"
    return "text-red-500"
  }

  // Filter out classes that are already assigned
  const unassignedClasses = availableClasses.filter(
    (availableClass) => !teacher.classes.some((teacherClass) => teacherClass.id === availableClass.id),
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
            <h1 className="text-3xl font-bold text-[#264653]">{teacher.name}</h1>
            {getStatusBadge(teacher.status)}
            {getRoleBadge(teacher.role)}
          </div>
          <p className="text-[#A8A8A8]">{teacher.primarySubject} Teacher</p>
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
                <DialogTitle className="text-[#3D405B]">Change Teacher Role</DialogTitle>
                <DialogDescription>Update the role and status for {teacher.name}.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select value={role} onValueChange={(value: string) => setRole(value as TeacherRole)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="hod">Head of Department</SelectItem>
                      <SelectItem value="it">IT Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select value={status} onValueChange={(value: string) => setStatus(value as TeacherStatus)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on-leave">On Leave</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
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
          <EmailDialog teacherEmail={teacher.contactInfo.email} teacherName={teacher.name} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-5">
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
                    <DialogDescription>Update {teacher.name}'s personal information.</DialogDescription>
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
                    {teacher.contactInfo.email}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#A8A8A8]">Phone</Label>
                  <div className="flex items-center text-[#264653]">
                    <Phone className="w-4 h-4 mr-2" />
                    {teacher.contactInfo.phone}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#A8A8A8]">Qualifications</Label>
                  <div className="flex items-center text-[#264653]">
                    <Award className="w-4 h-4 mr-2" />
                    {teacher.qualifications}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#A8A8A8]">Experience</Label>
                  <div className="flex items-center text-[#264653]">
                    <Clock className="w-4 h-4 mr-2" />
                    {teacher.yearsOfExperience} years
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[#264653] flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Subjects
              </CardTitle>
              <Dialog open={subjectDialogOpen} onOpenChange={setSubjectDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Subject</DialogTitle>
                    <DialogDescription>Add a new subject for {teacher.name} to teach.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="subject" className="text-right">
                        Subject
                      </Label>
                      <Select value={newSubject} onValueChange={setNewSubject}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableSubjects
                            .filter((subject) => !teacher.subjects.includes(subject))
                            .map((subject) => (
                              <SelectItem key={subject} value={subject}>
                                {subject}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="primarySubject" className="text-right">
                        Set as Primary
                      </Label>
                      <Select value={primarySubject} onValueChange={setPrimarySubject}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select primary subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={teacher.primarySubject}>{teacher.primarySubject} (Current)</SelectItem>
                          {newSubject && !teacher.subjects.includes(newSubject) && (
                            <SelectItem value={newSubject}>{newSubject} (New)</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setSubjectDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddSubject}
                      className="bg-green-500 hover:bg-green-600"
                      disabled={isSubmitting || !newSubject}
                    >
                      {isSubmitting ? "Adding..." : "Add Subject"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {teacher.subjects.map((subject) => (
                  <div key={subject} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-2 text-[#264653]" />
                      <span className="text-[#264653]">{subject}</span>
                      {subject === teacher.primarySubject && <Badge className="ml-2 bg-green-500">Primary</Badge>}
                    </div>
                    <div className="flex items-center space-x-2">
                      {subject !== teacher.primarySubject && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSetPrimarySubject(subject)}
                          className="h-8 text-xs"
                        >
                          Set Primary
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveSubject(subject)}
                        className="h-8 w-8 text-red-500"
                        disabled={subject === teacher.primarySubject}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle and Right Columns - Classes and Performance */}
        <div className="col-span-2 space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[#264653] flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Classes Overview
              </CardTitle>
              <div className="flex space-x-2">
                <Dialog open={classDialogOpen} onOpenChange={setClassDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                      <Plus className="h-4 w-4 mr-1" /> Assign Class
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Assign New Class</DialogTitle>
                      <DialogDescription>Assign a new class to {teacher.name}.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="class" className="text-right">
                          Class
                        </Label>
                        <Select
                          value={newClassInfo.classId}
                          onValueChange={(value) => setNewClassInfo({ ...newClassInfo, classId: value })}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            {unassignedClasses.map((cls) => (
                              <SelectItem key={cls.id} value={cls.id.toString()}>
                                {cls.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="subject" className="text-right">
                          Subject
                        </Label>
                        <Select
                          value={newClassInfo.subject}
                          onValueChange={(value) => setNewClassInfo({ ...newClassInfo, subject: value })}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {teacher.subjects.map((subject) => (
                              <SelectItem key={subject} value={subject}>
                                {subject}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setClassDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={handleAddClass}
                        className="bg-green-500 hover:bg-green-600"
                        disabled={isSubmitting || !newClassInfo.classId || !newClassInfo.subject}
                      >
                        {isSubmitting ? "Assigning..." : "Assign Class"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog open={removeClassDialogOpen} onOpenChange={setRemoveClassDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500 text-red-500 hover:bg-red-50"
                      disabled={teacher.classes.length === 0}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Remove Class
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Remove Class</DialogTitle>
                      <DialogDescription>Remove a class from {teacher.name}'s assignments.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="classToRemove" className="text-right">
                          Class
                        </Label>
                        <Select
                          value={selectedClassToRemove?.toString() || ""}
                          onValueChange={(value) => setSelectedClassToRemove(Number.parseInt(value))}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select class to remove" />
                          </SelectTrigger>
                          <SelectContent>
                            {teacher.classes.map((cls) => (
                              <SelectItem key={cls.id} value={cls.id.toString()}>
                                {cls.name} - {cls.subject}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setRemoveClassDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={handleRemoveClass}
                        variant="destructive"
                        disabled={isSubmitting || selectedClassToRemove === null}
                      >
                        {isSubmitting ? "Removing..." : "Remove Class"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Last Test</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teacher.classes.length > 0 ? (
                    teacher.classes.map((cls) => (
                      <TableRow key={cls.id}>
                        <TableCell className="font-medium">{cls.name}</TableCell>
                        <TableCell>{cls.students}</TableCell>
                        <TableCell className={getPerformanceColor(cls.avgPerformance)}>{cls.avgPerformance}%</TableCell>
                        <TableCell>{cls.subject}</TableCell>
                        <TableCell>{cls.lastTest}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-gray-500 py-4">
                        No classes assigned yet
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
                <TrendingUp className="w-5 h-5 mr-2" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 p-4 rounded-lg">
                  <Label className="text-[#A8A8A8]">Classes</Label>
                  <p className="text-2xl font-bold text-[#264653] mt-2">{teacher.performance.classes}</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <Label className="text-[#A8A8A8]">Average Score</Label>
                  <p className={`text-2xl font-bold mt-2 ${getPerformanceColor(teacher.performance.averageScore)}`}>
                    {teacher.performance.averageScore}%
                  </p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <Label className="text-[#A8A8A8]">No. of Students</Label>
                  <p className="text-2xl font-bold text-[#264653] mt-2">{teacher.performance.students}</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <Label className="text-[#A8A8A8]">Best Class</Label>
                  <p className="text-2xl font-bold text-[#264653] mt-2">{teacher.performance.bestClass}</p>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className="bg-[#F2CC8F] hover:bg-[#F2CC8F]/80 text-[#264653]"
                  onClick={() => generateTeacherReport(teacher)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Print Evaluation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#264653] flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teacher.recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                {activity.type === "alert" && <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />}
                {activity.type === "success" && <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />}
                {activity.type === "task" && <FileText className="w-4 h-4 text-[#264653] flex-shrink-0" />}
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
  )
}
