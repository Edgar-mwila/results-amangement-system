import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronRight,
  Edit,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Student } from "@/types"
import { useParams } from "@tanstack/react-router"
import React from "react"
import { Input } from "./ui/input"

// Updated interfaces to match backend structure
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
  type: string;
  value: string;
}

interface GuardianData {
  id: string;
  firstName: string;
  otherName?: string;
  lastName: string;
  contacts: GuardianContact[];
}

interface ClassSubjectData {
  subject: SubjectData;
  teacher: UserData;
}

interface Grade {
  level: string;
}

interface AcademicYear {
  year: string;
}

interface AssessmentData {
  id: number;
  name: string;
  totalMarks: string;
  dateOfAssessment: string;
  classSubjects: ClassSubjectData;
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
  comment?: string;
  marksObtained: string;
  assessment: AssessmentData;
}

interface StudentData {
  id: number;
  firstName: string;
  lastName: string;
  otherName?: string;
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
}

interface StudentDetailsProps {
  student: StudentData;
  classSubjects?: ClassSubjectData[];
}

interface SubjectRowProps {
  classSubject: ClassSubjectData;
  studentAssessments: StudentAssessmentData[];
}

// Theme colors fallback
const themeColors = {
  accentBg: "bg-blue-600",
  accentHover: "hover:bg-blue-700"
};

function EditStudentDialog({ student }: { student: Student }) {
  const { school } = useParams({ strict: false })
  const [open, setOpen] = React.useState(false)
  const [form, setForm] = React.useState({
    firstName: student?.firstName || "",
    otherName: student?.otherName || "",
    lastName: student?.lastName || "",
    dateOfBirth: student?.dateOfBirth || "",
    gender: student?.gender || "Male",
    status: student?.status || "Active",
    stateProvince: student?.stateProvince || "",
    city: student?.city || "",
    township: student?.township || "",
    address: student?.address || "",
    postalAddress: student?.postalAddress || "",
  })
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (open && student) {
      setForm({
        firstName: student.firstName || "",
        otherName: student.otherName || "",
        lastName: student.lastName || "",
        dateOfBirth: student.dateOfBirth || "",
        gender: student.gender || "Male",
        status: student.status || "Active",
        stateProvince: student.stateProvince || "",
        city: student.city || "",
        township: student.township || "",
        address: student.address || "",
        postalAddress: student.postalAddress || "",
      })
    }
  }, [open, student])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/${school}/student/${student.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Failed to update student")
      setOpen(false)
    } catch (err) {
      setError(
        err && typeof err === "object" && "message" in err
          ? String((err as { message?: unknown }).message)
          : "Error"
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
          <Edit size={16} />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Student Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
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
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="border rounded px-2 py-1"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
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
              name="stateProvince"
              placeholder="State/Province"
              value={form.stateProvince}
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
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const SubjectRow = ({ classSubject, studentAssessments }: SubjectRowProps) => {
  const [isOpen, setIsOpen] = useState(false)
  
  // Filter assessments for this subject
  const subjectAssessments = studentAssessments.filter(
    sa => sa.assessment.classSubjects.subject.name === classSubject.subject.name
  )
  
  // Calculate average grade for this subject
  const calculateAverage = () => {
    if (subjectAssessments.length === 0) return { percentage: '-', letter: 'N/A' }
    
    const totalPercentage = subjectAssessments.reduce((sum, sa) => {
      const marks = parseFloat(sa.marksObtained)
      const total = parseFloat(sa.assessment.totalMarks)
      return sum + (marks / total) * 100
    }, 0)
    
    const average = totalPercentage / subjectAssessments.length
    
    const getLetterGrade = (percentage: number) => {
      if (percentage >= 97) return 'A+'
      if (percentage >= 93) return 'A'
      if (percentage >= 90) return 'A-'
      if (percentage >= 87) return 'B+'
      if (percentage >= 83) return 'B'
      if (percentage >= 80) return 'B-'
      if (percentage >= 77) return 'C+'
      if (percentage >= 73) return 'C'
      if (percentage >= 70) return 'C-'
      if (percentage >= 67) return 'D+'
      if (percentage >= 65) return 'D'
      return 'F'
    }
    
    return {
      percentage: Math.round(average),
      letter: getLetterGrade(average)
    }
  }
  
  const average = calculateAverage()
  
  return (
    <>
      <TableRow className="cursor-pointer hover:bg-gray-50" onClick={() => setIsOpen(!isOpen)}>
        <TableCell className="font-medium">
          <div className="flex items-center">
            {isOpen ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronRight className="h-4 w-4 mr-2" />}
            <BookOpen className="h-4 w-4 mr-2 text-blue-600" />
            {classSubject.subject.name}
          </div>
        </TableCell>
        <TableCell>
          {classSubject.teacher.firstName} {classSubject.teacher.lastName}
        </TableCell>
        <TableCell>
          <span
            className={
              average.letter.startsWith('A') ? 'text-green-500' :
              average.letter.startsWith('B') ? 'text-blue-500' :
              average.letter.startsWith('C') ? 'text-yellow-500' :
              'text-red-500'
            }
          >
            {average.letter} ({average.percentage}%)
          </span>
        </TableCell>
        <TableCell className="text-right">
          <span>
            {subjectAssessments.length} assessment{subjectAssessments.length !== 1 ? 's' : ''}
          </span>
        </TableCell>
      </TableRow>
      
      {isOpen && (
        <TableRow>
          <TableCell colSpan={4} className="p-0">
            <div className="bg-gray-50 p-4 border-t">
              <h4 className="font-semibold mb-3 text-sm">Assessment Details:</h4>
              <div className="space-y-3">
                {subjectAssessments.length === 0 ? (
                  <div className="bg-white p-3 rounded border">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-medium text-sm">No Assessment</h5>
                        <p className="text-xs text-gray-500">N/A</p>
                      </div>
                        -/-
                    </div>
                    <p className="text-sm text-gray-600 italic">Comment: N/A</p>
                  </div>
                ) : (
                  subjectAssessments.map((sa, index) => {
                    const percentage = Math.round((parseFloat(sa.marksObtained) / parseFloat(sa.assessment.totalMarks)) * 100)
                    return (
                      <div key={index} className="bg-white p-3 rounded border">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium text-sm">{sa.assessment.name}</h5>
                            <p className="text-xs text-gray-500">
                              {new Date(sa.assessment.dateOfAssessment).toLocaleDateString()}
                            </p>
                          </div>
                            {sa.marksObtained}/{sa.assessment.totalMarks} ({percentage}%)
                        </div>
                        <p className="text-sm text-gray-600 italic">
                          Comment: {sa.comment ? `"${sa.comment}"` : "N/A"}
                        </p>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}

export default function StudentDetails({ student, classSubjects = [] }: StudentDetailsProps) {
  // Helper functions
  const getFullName = () => {
    const parts = [student.firstName, student.otherName, student.lastName].filter(Boolean)
    return parts.join(' ')
  }
  
  const getCurrentClass = () => {
    if (student.classStudents && student.classStudents.length > 0) {
      // Get the most recent class enrollment
      return student.classStudents[student.classStudents.length - 1].classModel
    }
    return null
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  const calculateAge = () => {
    const birthDate = new Date(student.dateOfBirth)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }

  const getContactValue = (contacts: GuardianContact[], type: string) => {
    if (type.toLowerCase() === "phone") {
      return contacts.find(c => c.value && /^\+?\d{7,}/.test(c.value))?.value || null
    }
    if (type.toLowerCase() === "email") {
      return contacts.find(c => c.value && /\S+@\S+\.\S+/.test(c.value))?.value || null
    }
    // fallback: return first value if exists
    return contacts[0]?.value || null
  }
  
  const currentClass = getCurrentClass()
  const fullName = getFullName()
  
  return (
    <div className="container mx-auto p-2 sm:p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
        <div className="flex items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{fullName}</h1>
            <p className="text-gray-500 text-sm">
              {currentClass ? `${currentClass.name}` : 'No Class Assigned'}
            </p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span
                className={
                  student.status === "Active" ? "text-green-500" :
                  student.status === "Inactive" ? "text-red-500" :
                  student.status === "Graduated" ? "text-blue-500" :
                  "text-black"
                }
              >
                {student.status}
              </span>
              <span className="text-gray-500 text-xs sm:text-sm">
                {student.gender}
              </span>
              <span className="text-gray-500 text-xs sm:text-sm">
                Age {calculateAge()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
          <EditStudentDialog student={student} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* Grades Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Academic Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {classSubjects.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No subjects or assessments found</p>
                <p className="text-sm text-gray-400">Student may not be enrolled in any classes yet</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Average Grade</TableHead>
                    <TableHead className="text-right">Assessments</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classSubjects.map((classSubject, index) => (
                    <SubjectRow
                      key={index}
                      classSubject={classSubject}
                      studentAssessments={student.assessments}
                    />
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Personal Details */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                <MapPin className="mr-3 h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium">Address</h3>
                  <p className="text-sm text-gray-600 break-words">{student.address}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {student.township}, {student.city}, {student.province}
                  </p>
                </div>
              </div>

              {/* Date of Birth */}
              <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                <Calendar className="mr-3 h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Date of Birth</h3>
                  <p className="text-sm text-gray-600">{formatDate(student.dateOfBirth)}</p>
                  <p className="text-sm text-gray-500">Age: {calculateAge()} years</p>
                </div>
              </div>

              {/* Class Information */}
              {currentClass && (
                <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                  <GraduationCap className="mr-3 h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-blue-900">Current Class</h3>
                    <p className="text-sm text-blue-700">{currentClass.grade.level} {currentClass.name}</p>
                    <p className="text-sm text-blue-500">
                      Academic Year: {currentClass.academicYear.year}
                    </p>
                  </div>
                </div>
              )}

              {/* Guardians */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Guardians/Parents</h3>
                {student.guardians && student.guardians.length > 0 ? (
                  student.guardians.map((guardianStudent, index) => {
                    const phoneNumber = getContactValue(guardianStudent.guardian.contacts, 'phone')
                    const email = getContactValue(guardianStudent.guardian.contacts, 'email')
                    const address = getContactValue(guardianStudent.guardian.contacts, 'address')
                    
                    return (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <User className="mr-3 h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium">
                                {guardianStudent.guardian.firstName} {guardianStudent.guardian.otherName} {guardianStudent.guardian.lastName}
                              </h4>
                              <p className="text-sm text-gray-500 capitalize">
                                {guardianStudent.relationship}
                              </p>
                            </div>
                          </div>

                          {phoneNumber && (
                            <div className="flex items-start">
                              <Phone className="mr-3 h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium">Phone</h4>
                                <p className="text-sm text-gray-600">{phoneNumber}</p>
                              </div>
                            </div>
                          )}

                          {email && (
                            <div className="flex items-start">
                              <Mail className="mr-3 h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium">Email</h4>
                                <p className="text-sm text-gray-600 break-all">{email}</p>
                              </div>
                            </div>
                          )}

                          {address && (
                            <div className="flex items-start">
                              <MapPin className="mr-3 h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="font-medium">Address</h4>
                                <p className="text-sm text-gray-600 break-words">{address}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <p className="text-sm text-gray-500">No guardian information available</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 sm:gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {classSubjects.length}
              </div>
              <div className="text-sm text-gray-500">Subjects</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {student.assessments?.length || 0}
              </div>
              <div className="text-sm text-gray-500">Total Assessments</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {student.guardians?.length || 0}
              </div>
              <div className="text-sm text-gray-500">Guardians</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {calculateAge()}
              </div>
              <div className="text-sm text-gray-500">Years Old</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}