import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { useNavigate, useParams } from "@tanstack/react-router"

// Updated type definitions to match your backend interface
interface SubjectData {
  name: string;
  code: string;
  url: string;
}

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
}

interface GuardianContact {
  id: string;
  type: string;
  value: string;
}

interface GuardianData {
  id: string;
  firstName: string;
  otherName: string;
  lastName: string;
  contacts: GuardianContact[];
}

interface ClassSubjectData {
  subject: SubjectData;
  teacher: UserData;
}

interface AssessmentData {
  id: number;
  name: string;
  totalMarks: number;
  dateOfAssessment: string;
  classSubjects: ClassSubjectData;
}

interface Grade {
  id: string;
  level: number;
  name: string;
}

interface AcademicYear {
  id: string;
  year: string;
  startDate: string;
  endDate: string;
}

interface ClassData {
  id: string;
  name: string;
  grade: Grade;
  academicYear: AcademicYear;
  classSubjects: ClassSubjectData[];
}

interface ClassStudentData {
  classModel: ClassData;
}

interface GuardianStudentData {
  guardian: GuardianData;
  relationship: string;
}

interface StudentAssessmentData {
  comment: string;
  marksObtained: number;
  assessment: AssessmentData;
}

export interface StudentData {
  id: string;
  firstName: string;
  lastName: string;
  otherName: string;
  sex: 'M' | 'F';
  gender: string;
  status: string;
  dateOfBirth: string;
  province: string;
  city: string;
  township: string;
  address: string;
  classStudents: ClassStudentData[];
  guardians: GuardianStudentData[];
  assessments: StudentAssessmentData[];
  createdAt: string;
}

interface StudentPageProps {
  students: StudentData[];
}

const themeColors = {
  accentBg: "bg-blue-600",
  accentHover: "hover:bg-blue-700"
};

function CreateStudentDialog() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    otherName: "",
    lastName: "",
    sex: "M",
    dateOfBirth: "",
    gender: "",
    status: "Active",
    province: "",
    city: "",
    township: "",
    address: "",
    postalAddress: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/students/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Failed to create student")
      setOpen(false)
      setForm({
        firstName: "",
        otherName: "",
        lastName: "",
        sex: "M",
        dateOfBirth: "",
        gender: "",
        status: "Active",
        province: "",
        city: "",
        township: "",
        address: "",
        postalAddress: "",
      })
      // Reload the page to refresh the student list
      window.location.reload()
    } catch (err) {
      setError(
        err && typeof err === "object" && "message" in err
          ? String((err as { message?: unknown }).message)
          : "Error creating student"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={`flex items-center gap-2 ${themeColors.accentBg} ${themeColors.accentHover} text-white`}
        >
          <Plus size={16} />
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <Input
              name="otherName"
              placeholder="Other Name"
              value={form.otherName}
              onChange={handleChange}
            />
            <Input
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-2">
            <select
              name="sex"
              value={form.sex}
              onChange={handleChange}
              className="border rounded px-2 py-1"
              required
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
            <Input
              name="gender"
              placeholder="Gender"
              value={form.gender}
              onChange={handleChange}
            />
            <Input
              name="dateOfBirth"
              type="date"
              value={form.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-2">
            <Input
              name="province"
              placeholder="Province"
              value={form.province}
              onChange={handleChange}
            />
            <Input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
            />
            <Input
              name="township"
              placeholder="Township"
              value={form.township}
              onChange={handleChange}
            />
          </div>
          <div>
            <textarea
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1"
              rows={2}
            />
          </div>
          <div className="flex gap-2">
            <Input
              name="postalAddress"
              placeholder="Postal Address"
              value={form.postalAddress}
              onChange={handleChange}
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border rounded px-2 py-1"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Graduated">Graduated</option>
            </select>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <DialogFooter>
            <Button type="submit" disabled={loading} onClick={handleSubmit}>
              {loading ? "Saving..." : "Save"}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
          </div>
      </DialogContent>
    </Dialog>
  )
}

export default function StudentPage({ students }: StudentPageProps) {
  const { school } = useParams({ strict: false });
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("")
  const [gradeFilter, setGradeFilter] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState<string>("")

  // Helper function to get full name
  const getFullName = (student: StudentData): string => {
    const parts = [student.firstName, student.otherName, student.lastName].filter(Boolean)
    return parts.join(' ')
  }

  // Helper function to get current grade from classStudents
  const getCurrentGrade = (student: StudentData): string => {
    if (student.classStudents && student.classStudents.length > 0) {
      // Get the most recent class enrollment
      const latestClass = student.classStudents[0]
      return latestClass.classModel.grade.level.toString()
    }
    return 'N/A'
  }

  // Helper function to generate student ID display
  const getStudentIdDisplay = (student: StudentData): string => {
    return `ST${student.id.toString().padStart(5, '0')}`
  }

  // Get unique grades and statuses for filter dropdowns
  const gradeOptions = Array.from(new Set(
    students
      .map(student => getCurrentGrade(student))
      .filter(grade => grade !== 'N/A')
  )).sort()
  
  const statusOptions = Array.from(new Set(
    students.map(student => student.status || "Active")
  ))

  // Filter students based on search query, grade, and status
  const filteredStudents = students.filter((student) => {
    const fullName = getFullName(student)
    const studentId = getStudentIdDisplay(student)
    const currentGrade = getCurrentGrade(student)
    
    const matchesQuery =
      fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studentId.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesGrade = gradeFilter ? currentGrade === gradeFilter : true
    const matchesStatus = statusFilter ? (student.status || "Active") === statusFilter : true
    
    return matchesQuery && matchesGrade && matchesStatus
  })

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Student Management</h1>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <CreateStudentDialog />
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Student Directory</CardTitle>
          <div className="text-sm text-gray-500">Total Students: {filteredStudents.length}</div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by name or ID..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="border rounded px-2 py-1"
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
              >
                <option value="">All Grades</option>
                {gradeOptions.map((grade) => (
                  <option key={grade} value={grade}>
                    Grade {grade}
                  </option>
                ))}
              </select>
              <select
                className="border rounded px-2 py-1"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-md border">
            <div className="bg-gray-50 border-b">
              <div className="grid grid-cols-6 gap-4 p-4 font-medium">
                <div>Student</div>
                <div>ID</div>
                <div>Grade</div>
                <div>Gender</div>
                <div>Status</div>
                <div>Guardians</div>
              </div>
            </div>
            <div className="divide-y">
              {filteredStudents.map((student) => {
                const fullName = getFullName(student)
                const studentId = getStudentIdDisplay(student)
                const currentGrade = getCurrentGrade(student)
                const guardianCount = student.guardians?.length || 0
                
                return (
                  <div 
                    key={student.id} 
                    onClick={() => navigate({ to: '/$school/dashboard/student-management/student/$id', params: { school: school, id: student.id } })}
                    className="cursor-pointer hover:bg-gray-50 p-4 grid grid-cols-6 gap-4 items-center"
                  >
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                        <AvatarFallback>
                          {student.firstName[0]}{student.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{fullName}</div>
                        <div className="text-sm text-gray-500">
                          {student.city && student.province ? `${student.city}, ${student.province}` : 'No location'}
                        </div>
                      </div>
                    </div>
                    <div className="font-mono">{studentId}</div>
                    <div>
                      {currentGrade !== 'N/A' ? `Grade ${currentGrade}` : 'Not Enrolled'}
                    </div>
                    <div>
                      <Badge variant="outline">
                        {student.sex === 'M' ? 'Male' : 'Female'}
                      </Badge>
                    </div>
                    <div>
                      <Badge
                        className={
                          student.status === "Active"
                            ? "bg-green-500 text-white"
                            : student.status === "Inactive"
                            ? "bg-red-500 text-white"
                            : student.status === "Graduated"
                            ? "bg-blue-500 text-white"
                            : "bg-yellow-400 text-black"
                        }
                      >
                        {student.status || 'Active'}
                      </Badge>
                    </div>
                    <div>
                      <Badge variant="secondary">
                        {guardianCount} Guardian{guardianCount !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                  </div>
                )
              })}
              {filteredStudents.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No students found matching your criteria
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Students per Grade */}
        <Card>
          <CardHeader>
            <CardTitle>Students per Grade</CardTitle>
            <CardDescription>Breakdown of students by grade</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array.from(
                students.reduce((acc, student) => {
                  const grade = getCurrentGrade(student)
                  if (grade !== 'N/A') {
                    acc.set(grade, (acc.get(grade) || 0) + 1)
                  }
                  return acc
                }, new Map<string, number>())
              )
              .sort(([a], [b]) => parseInt(a) - parseInt(b))
              .map(([grade, count]) => (
                <div key={grade} className="flex justify-between items-center py-1">
                  <span className="text-sm">Grade {grade}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
              {students.filter(s => getCurrentGrade(s) === 'N/A').length > 0 && (
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm">Not Enrolled</span>
                  <Badge variant="outline">
                    {students.filter(s => getCurrentGrade(s) === 'N/A').length}
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Students per Status */}
        <Card>
          <CardHeader>
            <CardTitle>Students per Status</CardTitle>
            <CardDescription>Breakdown of students by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array.from(
                students.reduce((acc, student) => {
                  const status = student.status || "Active"
                  acc.set(status, (acc.get(status) || 0) + 1)
                  return acc
                }, new Map<string, number>())
              ).map(([status, count]) => (
                <div key={status} className="flex justify-between items-center py-1">
                  <span className="text-sm">{status}</span>
                  <Badge
                    className={
                      status === "Active"
                        ? "bg-green-500 text-white"
                        : status === "Inactive"
                        ? "bg-red-500 text-white"
                        : status === "Graduated"
                        ? "bg-blue-500 text-white"
                        : "bg-yellow-400 text-black"
                    }
                  >
                    {count}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Students by Gender */}
        <Card>
          <CardHeader>
            <CardTitle>Students by Gender</CardTitle>
            <CardDescription>Gender distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array.from(
                students.reduce((acc, student) => {
                  const gender = student.sex === 'M' ? 'Male' : 'Female'
                  acc.set(gender, (acc.get(gender) || 0) + 1)
                  return acc
                }, new Map<string, number>())
              ).map(([gender, count]) => (
                <div key={gender} className="flex justify-between items-center py-1">
                  <span className="text-sm">{gender}</span>
                  <Badge variant="outline">{count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Guardian Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Guardian Statistics</CardTitle>
            <CardDescription>Student guardian information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-1">
                <span className="text-sm">Students with Guardians</span>
                <Badge variant="secondary">
                  {students.filter(s => s.guardians && s.guardians.length > 0).length}
                </Badge>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-sm">Without Guardians</span>
                <Badge variant="outline">
                  {students.filter(s => !s.guardians || s.guardians.length === 0).length}
                </Badge>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-sm">Total Guardians</span>
                <Badge variant="secondary">
                  {students.reduce((acc, student) => acc + (student.guardians?.length || 0), 0)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Assessment Statistics</CardTitle>
            <CardDescription>Student assessment data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-1">
                <span className="text-sm">Students with Assessments</span>
                <Badge variant="secondary">
                  {students.filter(s => s.assessments && s.assessments.length > 0).length}
                </Badge>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-sm">Total Assessments</span>
                <Badge variant="outline">
                  {students.reduce((acc, student) => acc + (student.assessments?.length || 0), 0)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Enrollments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Enrollments</CardTitle>
            <CardDescription>Students enrolled in the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            {(() => {
              const thirtyDaysAgo = new Date()
              thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
              
              const recentStudents = students.filter(student => {
                if (!student.createdAt) return false
                return new Date(student.createdAt) >= thirtyDaysAgo
              }).length
              
              return (
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{recentStudents}</div>
                  <div className="text-sm text-gray-500">New students</div>
                </div>
              )
            })()}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}