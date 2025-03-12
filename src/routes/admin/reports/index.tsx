import type React from "react"
import { useState } from "react"
import { type AnyRoute, createRoute, Link } from "@tanstack/react-router"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Printer,
  BarChart2,
  PieChart,
  TrendingUp,
  Users,
  BookOpen,
  Award,
  School,
  Download,
  Filter,
  ChevronRight,
  AlertTriangle,
  Clock,
  User,
  UserCheck,
  Layers,
} from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart as RechartsChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Route as AdminRoute } from "../index"

// Define types for overall metrics
type OverallMetrics = {
  totalStudents: number
  totalTeachers: number
  totalClasses: number
  averageAttendance: string
  graduationRate: string
  averageGPA: number
}

const overallMetrics: OverallMetrics = {
  totalStudents: 1200,
  totalTeachers: 80,
  totalClasses: 60,
  averageAttendance: "95%",
  graduationRate: "98%",
  averageGPA: 3.7,
}

// Sample data for reports
const topStudents = [
  {
    id: 101,
    name: "Emma Johnson",
    grade: "10A",
    gpa: 4.0,
    attendance: "99%",
    subjects: ["Mathematics", "Physics", "Chemistry"],
  },
  {
    id: 102,
    name: "James Wilson",
    grade: "11B",
    gpa: 3.95,
    attendance: "98%",
    subjects: ["Biology", "Chemistry", "English"],
  },
  {
    id: 103,
    name: "Sophia Martinez",
    grade: "12A",
    gpa: 3.9,
    attendance: "97%",
    subjects: ["Physics", "Mathematics", "Computer Science"],
  },
  {
    id: 104,
    name: "Ethan Brown",
    grade: "10A",
    gpa: 3.85,
    attendance: "99%",
    subjects: ["History", "English", "Economics"],
  },
  {
    id: 105,
    name: "Olivia Davis",
    grade: "11A",
    gpa: 3.8,
    attendance: "96%",
    subjects: ["Chemistry", "Biology", "Mathematics"],
  },
]

const topTeachers = [
  {
    id: 201,
    name: "Mr. Smith",
    department: "Science",
    rating: 4.9,
    classes: ["10A Physics", "11B Chemistry", "12A Advanced Physics"],
  },
  {
    id: 202,
    name: "Ms. Johnson",
    department: "Mathematics",
    rating: 4.8,
    classes: ["10B Mathematics", "11A Calculus", "12B Statistics"],
  },
  {
    id: 203,
    name: "Dr. Williams",
    department: "English",
    rating: 4.7,
    classes: ["10A Literature", "11C Creative Writing", "12A Advanced Literature"],
  },
  {
    id: 204,
    name: "Mrs. Brown",
    department: "History",
    rating: 4.7,
    classes: ["10C World History", "11A National History", "12B Political Science"],
  },
  {
    id: 205,
    name: "Mr. Davis",
    department: "Computer Science",
    rating: 4.6,
    classes: ["10A Programming", "11B Data Structures", "12A AI Fundamentals"],
  },
]

const topClasses = [
  {
    id: 301,
    name: "10A",
    averageGPA: 3.8,
    attendance: "97%",
    subjects: ["Mathematics", "Physics", "Chemistry", "English", "History"],
  },
  {
    id: 302,
    name: "11B",
    averageGPA: 3.75,
    attendance: "96%",
    subjects: ["Biology", "Chemistry", "Mathematics", "Literature", "Economics"],
  },
  {
    id: 303,
    name: "12A",
    averageGPA: 3.7,
    attendance: "95%",
    subjects: ["Physics", "Calculus", "Computer Science", "Advanced English", "Statistics"],
  },
  {
    id: 304,
    name: "9C",
    averageGPA: 3.65,
    attendance: "94%",
    subjects: ["Algebra", "Biology", "Geography", "Language Arts", "Physical Education"],
  },
  {
    id: 305,
    name: "11A",
    averageGPA: 3.6,
    attendance: "93%",
    subjects: ["Chemistry", "Trigonometry", "World History", "Literature", "Physics"],
  },
]

const subjectPerformance = [
  { subject: "Mathematics", averageScore: 87, passRate: "95%", topClass: "10A", topTeacher: "Ms. Johnson" },
  { subject: "Physics", averageScore: 85, passRate: "93%", topClass: "12A", topTeacher: "Mr. Smith" },
  { subject: "Chemistry", averageScore: 83, passRate: "91%", topClass: "11B", topTeacher: "Mr. Smith" },
  { subject: "Biology", averageScore: 82, passRate: "90%", topClass: "11A", topTeacher: "Dr. Martinez" },
  { subject: "English", averageScore: 88, passRate: "96%", topClass: "10A", topTeacher: "Dr. Williams" },
  { subject: "History", averageScore: 84, passRate: "92%", topClass: "11A", topTeacher: "Mrs. Brown" },
  { subject: "Computer Science", averageScore: 86, passRate: "94%", topClass: "12A", topTeacher: "Mr. Davis" },
  { subject: "Economics", averageScore: 81, passRate: "89%", topClass: "12B", topTeacher: "Ms. Thompson" },
]

const attendanceTrend = [
  { month: "Sep", attendance: 97 },
  { month: "Oct", attendance: 96 },
  { month: "Nov", attendance: 95 },
  { month: "Dec", attendance: 93 },
  { month: "Jan", attendance: 94 },
  { month: "Feb", attendance: 95 },
]

const gradeDistribution = [
  { grade: "A", count: 450 },
  { grade: "B", count: 350 },
  { grade: "C", count: 250 },
  { grade: "D", count: 100 },
  { grade: "F", count: 50 },
]

const GRADE_COLORS = {
  A: "#22c55e",
  B: "#3b82f6",
  C: "#f59e0b",
  D: "#f97316",
  F: "#ef4444",
}

// Define prop types for ReportCard
type ReportCardProps = {
  title: string
  icon: React.ReactNode
  description: string
  color: string
  onClick: () => void
}

const ReportCard: React.FC<ReportCardProps> = ({ title, icon, description, color, onClick }) => (
  <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer" onClick={onClick}>
    <div className={`h-2 ${color}`}></div>
    <CardHeader className="pb-2">
      <div className="flex justify-between items-center">
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className={`p-2 rounded-full ${color.replace("bg-", "bg-opacity-20 text-")}`}>{icon}</div>
      </div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardFooter className="pt-2 pb-4">
      <Button variant="ghost" size="sm" className="ml-auto">
        Generate <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </CardFooter>
  </Card>
)

// Define prop types for DetailedReportDialog
type DetailedReportDialogProps = {
  title: string
  type: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DetailedReportDialog: React.FC<DetailedReportDialogProps> = ({ title, type, open, onOpenChange }) => {
  const [reportPeriod, setReportPeriod] = useState("current-semester")
  const [filterOption, setFilterOption] = useState("all")

  let content

  switch (type) {
    case "school":
      content = (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <PieChart className="mr-2 h-5 w-5" />
                  Grade Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="grade"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {gradeDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${entry}`}
                          fill={Object.values(GRADE_COLORS)[index % Object.values(GRADE_COLORS).length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Attendance Trend
                </CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[90, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="attendance"
                      stroke="#3b82f6"
                      name="Attendance (%)"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Subject Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subjectPerformance}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="subject" width={120} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="averageScore" name="Average Score" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Top Performing Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>GPA</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topStudents.slice(0, 3).map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.grade}</TableCell>
                        <TableCell>{student.gpa}</TableCell>
                        <TableCell>
                          <Link to="/admin/student-management/student/$id" params={{ id: student.id.toString() }}>
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Top Performing Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class</TableHead>
                      <TableHead>Avg. GPA</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topClasses.slice(0, 3).map((cls) => (
                      <TableRow key={cls.id}>
                        <TableCell className="font-medium">{cls.name}</TableCell>
                        <TableCell>{cls.averageGPA}</TableCell>
                        <TableCell>{cls.attendance}</TableCell>
                        <TableCell>
                          <Link to="/admin/class-management/$id" params={{ id: cls.id.toString() }}>
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Areas Needing Attention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md bg-amber-50">
                  <h3 className="font-medium flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                    Economics Performance
                  </h3>
                  <p className="text-sm mt-1">
                    Economics has the lowest average score (81%) and pass rate (89%). Consider reviewing teaching
                    methods and providing additional resources.
                  </p>
                </div>

                <div className="p-4 border rounded-md bg-amber-50">
                  <h3 className="font-medium flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                    December Attendance Drop
                  </h3>
                  <p className="text-sm mt-1">
                    Attendance dropped to 93% in December, which is below the target of 95%. This may be related to the
                    holiday season.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
      break

    case "student":
      content = (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Student Performance Report</h3>
              <p className="text-sm text-gray-500">Generate detailed reports on student performance</p>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={filterOption} onValueChange={setFilterOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Students</SelectItem>
                  <SelectItem value="top">Top Performers</SelectItem>
                  <SelectItem value="bottom">Needs Improvement</SelectItem>
                  <SelectItem value="attendance">Attendance Issues</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>GPA</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Top Subjects</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.gpa}</TableCell>
                  <TableCell>{student.attendance}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {student.subjects.map((subject, index) => (
                        <Badge key={index} variant="outline">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link to="/admin/student-management/student/$id" params={{ id: student.id.toString() }}>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </Link>
                      <Button size="sm">Generate Report</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
      break

    case "teacher":
      content = (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Teacher Performance Report</h3>
              <p className="text-sm text-gray-500">Generate detailed reports on teacher performance</p>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={filterOption} onValueChange={setFilterOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teachers</SelectItem>
                  <SelectItem value="rating">By Rating</SelectItem>
                  <SelectItem value="department">By Department</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Classes</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell>{teacher.department}</TableCell>
                  <TableCell>
                    <Badge className={teacher.rating >= 4.8 ? "bg-green-500" : "bg-blue-500"}>{teacher.rating}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {teacher.classes.map((cls, index) => (
                        <Badge key={index} variant="outline">
                          {cls}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link to="/admin/staff-management/staffer/$id" params={{ id: teacher.id.toString() }}>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </Link>
                      <Button size="sm">Generate Report</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
      break

    case "class":
      content = (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Class Performance Report</h3>
              <p className="text-sm text-gray-500">Generate detailed reports on class performance</p>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={filterOption} onValueChange={setFilterOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="gpa">By GPA</SelectItem>
                  <SelectItem value="attendance">By Attendance</SelectItem>
                  <SelectItem value="grade">By Grade Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Average GPA</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topClasses.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell className="font-medium">{cls.name}</TableCell>
                  <TableCell>{cls.averageGPA}</TableCell>
                  <TableCell>{cls.attendance}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {cls.subjects.slice(0, 3).map((subject, index) => (
                        <Badge key={index} variant="outline">
                          {subject}
                        </Badge>
                      ))}
                      {cls.subjects.length > 3 && <Badge variant="outline">+{cls.subjects.length - 3}</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link to="/admin/class-management/$id" params={{ id: cls.id.toString() }}>
                        <Button variant="outline" size="sm">
                          View Class
                        </Button>
                      </Link>
                      <Button size="sm">Generate Report</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
      break

    case "subject":
      content = (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Subject Performance Report</h3>
              <p className="text-sm text-gray-500">Generate detailed reports on subject performance</p>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={filterOption} onValueChange={setFilterOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="score">By Score</SelectItem>
                  <SelectItem value="passRate">By Pass Rate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Subject Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectPerformance} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="averageScore" name="Average Score" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Average Score</TableHead>
                <TableHead>Pass Rate</TableHead>
                <TableHead>Top Class</TableHead>
                <TableHead>Top Teacher</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjectPerformance.map((subject, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{subject.subject}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        subject.averageScore >= 85
                          ? "bg-green-500"
                          : subject.averageScore >= 80
                            ? "bg-blue-500"
                            : "bg-amber-500"
                      }
                    >
                      {subject.averageScore}%
                    </Badge>
                  </TableCell>
                  <TableCell>{subject.passRate}</TableCell>
                  <TableCell>{subject.topClass}</TableCell>
                  <TableCell>{subject.topTeacher}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
      break

    default:
      content = <div>Select a report type to generate</div>
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Select value={reportPeriod} onValueChange={setReportPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-semester">Current Semester</SelectItem>
                <SelectItem value="last-semester">Last Semester</SelectItem>
                <SelectItem value="academic-year">Academic Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </div>

          <Button>
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>

        {content}

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button>
            <Printer className="mr-2 h-4 w-4" /> Print Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [generatedReport, setGeneratedReport] = useState<string | null>(null)
  const [selectedReportType, setSelectedReportType] = useState<string | null>(null)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)

  const handleGenerateReport = (type: string) => {
    setSelectedReportType(type)
    setReportDialogOpen(true)
    setGeneratedReport(`Generated ${type} report`)
  }

  const handlePrintOverallMetrics = () => {
    console.log("Printing overall metrics...")
    setGeneratedReport("Printing overall metrics...")
    setTimeout(() => setGeneratedReport(null), 3000)
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">School Reports & Analytics</h1>
        <p className="text-gray-500">Generate comprehensive reports and analytics for your school</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Report Types</TabsTrigger>
          <TabsTrigger value="insights">Key Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Users className="mr-2 h-5 w-5 text-blue-500" />
                  Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold">{overallMetrics.totalStudents}</p>
                    <p className="text-sm text-gray-500">Total Students</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge className="bg-green-500">+5% YoY</Badge>
                    <p className="text-xs text-gray-500 mt-1">vs. Last Year</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <UserCheck className="mr-2 h-5 w-5 text-green-500" />
                  Teachers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold">{overallMetrics.totalTeachers}</p>
                    <p className="text-sm text-gray-500">Total Teachers</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge className="bg-green-500">+3% YoY</Badge>
                    <p className="text-xs text-gray-500 mt-1">vs. Last Year</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Layers className="mr-2 h-5 w-5 text-amber-500" />
                  Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold">{overallMetrics.totalClasses}</p>
                    <p className="text-sm text-gray-500">Total Classes</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge className="bg-amber-500">+2% YoY</Badge>
                    <p className="text-xs text-gray-500 mt-1">vs. Last Year</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <BarChart2 className="mr-2 h-5 w-5" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectPerformance} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="averageScore" name="Average Score" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Attendance Trend
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[90, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="attendance"
                      stroke="#3b82f6"
                      name="Attendance (%)"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Key Performance Indicators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Average Attendance</p>
                  <p className="text-2xl font-semibold">{overallMetrics.averageAttendance}</p>
                  <Badge className="mt-1 bg-green-500">Above Target</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Graduation Rate</p>
                  <p className="text-2xl font-semibold">{overallMetrics.graduationRate}</p>
                  <Badge className="mt-1 bg-green-500">Above Target</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Average GPA</p>
                  <p className="text-2xl font-semibold">{overallMetrics.averageGPA}</p>
                  <Badge className="mt-1 bg-blue-500">On Target</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handlePrintOverallMetrics} className="ml-auto">
                <Printer className="mr-2 h-4 w-4" /> Print Metrics
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ReportCard
              title="School Performance"
              icon={<School className="h-5 w-5" />}
              description="Comprehensive school-wide performance analytics"
              color="bg-blue-500"
              onClick={() => handleGenerateReport("school")}
            />

            <ReportCard
              title="Student Reports"
              icon={<User className="h-5 w-5" />}
              description="Individual and group student performance reports"
              color="bg-green-500"
              onClick={() => handleGenerateReport("student")}
            />

            <ReportCard
              title="Teacher Reports"
              icon={<UserCheck className="h-5 w-5" />}
              description="Teacher performance and effectiveness analysis"
              color="bg-amber-500"
              onClick={() => handleGenerateReport("teacher")}
            />

            <ReportCard
              title="Class Reports"
              icon={<Users className="h-5 w-5" />}
              description="Class performance and comparative analysis"
              color="bg-purple-500"
              onClick={() => handleGenerateReport("class")}
            />

            <ReportCard
              title="Subject Reports"
              icon={<BookOpen className="h-5 w-5" />}
              description="Subject-wise performance and trend analysis"
              color="bg-red-500"
              onClick={() => handleGenerateReport("subject")}
            />

            <ReportCard
              title="Attendance Reports"
              icon={<Clock className="h-5 w-5" />}
              description="Attendance patterns and trend analysis"
              color="bg-cyan-500"
              onClick={() => handleGenerateReport("attendance")}
            />
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md bg-green-50">
                    <h3 className="font-medium">Top Performing Class</h3>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <p className="text-xl font-semibold">Class 10A</p>
                        <p className="text-sm text-gray-500">Average GPA: 3.8</p>
                      </div>
                      <Link to="/admin/class-management/$id" params={{id: '2'}}>
                        <Button variant="outline" size="sm">
                          View Class
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md bg-green-50">
                    <h3 className="font-medium">Top Performing Teacher</h3>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <p className="text-xl font-semibold">Mr. Smith</p>
                        <p className="text-sm text-gray-500">Science Department, Rating: 4.9</p>
                      </div>
                      <Link to="/admin/staff-management/staffer/$id" params={{ id: '3'}}>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md bg-green-50">
                    <h3 className="font-medium">Top Performing Subject</h3>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <p className="text-xl font-semibold">English</p>
                        <p className="text-sm text-gray-500">Average Score: 88%, Pass Rate: 96%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                  Areas Needing Attention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md bg-amber-50">
                    <h3 className="font-medium">Lowest Performing Subject</h3>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <p className="text-xl font-semibold">Economics</p>
                        <p className="text-sm text-gray-500">Average Score: 81%, Pass Rate: 89%</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md bg-amber-50">
                    <h3 className="font-medium">Attendance Concern</h3>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <p className="text-xl font-semibold">December Drop</p>
                        <p className="text-sm text-gray-500">Attendance dropped to 93% in December</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleGenerateReport("attendance")}>
                        Generate Report
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md bg-amber-50">
                    <h3 className="font-medium">Students Needing Support</h3>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <p className="text-xl font-semibold">5 Students</p>
                        <p className="text-sm text-gray-500">GPA below 2.5, attendance below 90%</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleGenerateReport("student")}>
                        View Students
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <BarChart2 className="mr-2 h-5 w-5" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium">Economics Curriculum Review</h3>
                  <p className="text-sm mt-1">
                    Economics has the lowest average score (81%) and pass rate (89%). Consider reviewing teaching
                    methods and providing additional resources.
                  </p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      Schedule Review
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium">Attendance Improvement Plan</h3>
                  <p className="text-sm mt-1">
                    Implement an attendance improvement plan for December, which historically shows a drop in attendance
                    rates.
                  </p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      Create Plan
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium">Teacher Best Practices Sharing</h3>
                  <p className="text-sm mt-1">
                    Organize sessions where top-performing teachers like Mr. Smith can share their teaching methods with
                    other faculty members.
                  </p>
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      Schedule Session
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedReportType && (
        <DetailedReportDialog
          title={`${selectedReportType.charAt(0).toUpperCase() + selectedReportType.slice(1)} Report`}
          type={selectedReportType}
          open={reportDialogOpen}
          onOpenChange={setReportDialogOpen}
        />
      )}

      {generatedReport && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg z-50 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            {generatedReport}
          </div>
        </div>
      )}
    </div>
  )
}

export const Route = createRoute({
  path: "/admin/reports/",
  component: Reports,
  getParentRoute: () => AdminRoute as AnyRoute,
})

