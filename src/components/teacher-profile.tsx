import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
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
  subject: string
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
  subject: "Mathematics",
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

export function TeacherDetailView() {
  const [teacher, setTeacher] = useState<TeacherData>(teacherData)
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState<TeacherRole>(teacher.role)
  const [status, setStatus] = useState<TeacherStatus>(teacher.status)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
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
      setOpen(false)
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
          <p className="text-[#A8A8A8]">{teacher.subject} Teacher</p>
        </div>
        <div className="flex gap-3">
          <Dialog open={open} onOpenChange={setOpen}>
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
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save changes"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <EmailDialog teacherEmail={teacher.contactInfo.email} teacherName={teacher.name} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Personal Info */}
        <div className="space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#264653] flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </CardTitle>
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

        {/* Middle and Right Columns - Classes and Performance */}
        <div className="col-span-2 space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#264653] flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Classes Overview
              </CardTitle>
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
                  {teacher.classes.map((cls) => (
                    <TableRow key={cls.id}>
                      <TableCell className="font-medium">{cls.name}</TableCell>
                      <TableCell>{cls.students}</TableCell>
                      <TableCell className={getPerformanceColor(cls.avgPerformance)}>{cls.avgPerformance}%</TableCell>
                      <TableCell>{cls.subject}</TableCell>
                      <TableCell>{cls.lastTest}</TableCell>
                    </TableRow>
                  ))}
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
    </div>
  )
}
