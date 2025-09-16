import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart, Plus, Search } from "lucide-react"
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
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table"
import { ClassModel } from "@/types"

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
  accentBg: "bg-green-400",
  accentHover: "hover:bg-green-500"
};

function CreateStudentDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    otherName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "Male",
    status: "Active",
    province: "",
    city: "",
    township: "",
    address: "",
    postalAddress: "",
  });
  const [studentClassId, setStudentClassId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [classes, setClasses] = useState<ClassModel[]>([]);
  const { school } = useParams({strict: false});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getClasses = async () => {
    try {
      const res = await fetch(`/api/${school}/classes/`);
      if (!res.ok) throw new Error("Failed to fetch classes");
      const data: ClassModel[] = await res.json();
      setClasses(data);
      if (data.length > 0) setStudentClassId(data[0].id); // Default to first
    } catch (err) {
      console.error(err);
    }
  };

    if (open) getClasses();
  }, [open, school]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const sendData = {
      student: form,
      student_class_id: studentClassId,
    };

    try {
      const res = await fetch(`/api/${school}/students/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      });
      if (!res.ok) throw new Error("Failed to create student");

      setOpen(false);
      setForm({
        firstName: "",
        otherName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "Male",
        status: "Active",
        province: "",
        city: "",
        township: "",
        address: "",
        postalAddress: "",
      });
      setStudentClassId("");
      window.location.reload();
    } catch (err) {
      setError(
        err && typeof err === "object" && "message" in err
          ? String((err as { message?: unknown }).message)
          : "Error creating student"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={`flex items-center gap-2 ${themeColors.accentBg} ${themeColors.accentHover} text-white`}>
          <Plus size={16} />
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <Input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
            <Input name="otherName" placeholder="Other Name" value={form.otherName} onChange={handleChange} />
            <Input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
          </div>
          <div className="flex gap-2">
            <select name="gender" value={form.gender} onChange={handleChange} className="border rounded px-2 py-1" required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <Input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} required />
          </div>
          <div className="flex gap-2">
            <Input name="province" placeholder="Province" value={form.province} onChange={handleChange} />
            <Input name="city" placeholder="City" value={form.city} onChange={handleChange} />
            <Input name="township" placeholder="Township" value={form.township} onChange={handleChange} />
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
            <Input name="postalAddress" placeholder="Postal Address" value={form.postalAddress} onChange={handleChange} />
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
          <div>
            <label className="block mb-1 text-sm font-medium">Select Class</label>
            <select
              value={studentClassId}
              onChange={(e) => setStudentClassId(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              required
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
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
  );
}


export default function StudentPage({ students }: StudentPageProps) {
  const { school } = useParams({ strict: false });
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("")

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
      return latestClass.classModel.name.toString()
    }
    return 'N/A'
  }

  // Helper function to generate student ID display
  const getStudentIdDisplay = (student: StudentData): string => {
    return `ST${student.id.toString().padStart(5, '0')}`
  }


  // Filter students based on search query, grade, and status
  const filteredStudents = students.filter((student) => {
    const fullName = getFullName(student)
    const studentId = getStudentIdDisplay(student)
    
    const matchesQuery =
      fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studentId.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesQuery
  })

  const StudentStatisticsDialog = () => {
    // Precompute simple counts to keep JSX clean
    const gradeMap = students.reduce((acc, s) => {
      const g = getCurrentGrade(s)
      if (g !== 'N/A') acc.set(g, (acc.get(g) || 0) + 1)
      return acc
    }, new Map<string, number>())

    const genderMap = students.reduce((acc, s) => {
      const g = s.gender === 'Male' ? 'Male' : 'Female'
      acc.set(g, (acc.get(g) || 0) + 1)
      return acc
    }, new Map<string, number>())

    const total = students.length

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className={`flex items-center gap-2 ${themeColors.accentBg} ${themeColors.accentHover} text-white`}>
            <BarChart size={16} />
            Statistics
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Student Statistics</DialogTitle>
            <CardDescription>Overview at a glance</CardDescription>
          </DialogHeader>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Total', value: total },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white rounded-lg border p-3 flex flex-col items-center text-center">
                <div className="text-xs text-gray-500">{label}</div>
                <div className="text-xl font-semibold text-green-600">{value}</div>
              </div>
            ))}
          </div>

          {/* Breakdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {/* By Grade */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">By Grade</CardTitle>
                <CardDescription>Students per grade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from(gradeMap.entries())
                    .sort(([a],[b]) => parseInt(a) - parseInt(b))
                    .map(([g, c]) => (
                      <div key={g} className="flex items-center justify-between">
                        <span className="text-sm">Grade {g}</span>
                        <Badge className="bg-green-500 text-white">{c}</Badge>
                      </div>
                    ))}
                  {students.filter(s => getCurrentGrade(s) === 'N/A').length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Not Enrolled</span>
                      <Badge variant="outline">{students.filter(s => getCurrentGrade(s) === 'N/A').length}</Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* By Gender */}
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">By Gender</CardTitle>
                <CardDescription>Gender distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from(genderMap.entries()).map(([g, c]) => (
                    <div key={g} className="flex items-center justify-between">
                      <span className="text-sm">{g}</span>
                      <Badge variant="outline">{c}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="container mx-auto p-2 sm:p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Student Management</h1>
          <div className="text-sm text-gray-500">Total Students: {filteredStudents.length}</div>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
          <CreateStudentDialog />
          <StudentStatisticsDialog />
        </div>
      </div>


      <div className="flex flex-col md:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by name or ID..."
            className="pl-8 h-12 rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-50 border-b">
            <TableRow className="hover:bg-gray-50">
              <TableHead className="font-medium text-xs sm:text-base p-4">Student</TableHead>
              <TableHead className="font-medium text-xs sm:text-base p-4">ID</TableHead>
              <TableHead className="font-medium text-xs sm:text-base p-4">Class</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y">
            {filteredStudents.map((student) => {
              const fullName = getFullName(student)
              const studentId = getStudentIdDisplay(student)
              const currentGrade = getCurrentGrade(student)
              
              return (
                <TableRow
                  key={student.id}
                  onClick={() => navigate({ to: '/$school/dashboard/student-management/student/$id', params: { school: school, id: student.id } })}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <TableCell className="p-4">
                    <div className="font-medium">{fullName}</div>
                  </TableCell>
                  <TableCell className="p-4">
                    <div className="font-mono">{studentId}</div>
                  </TableCell>
                  <TableCell className="p-4">
                    <div>
                      {currentGrade}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
            {filteredStudents.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  No students found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}