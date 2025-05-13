import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import {
  Book,
  GraduationCap,
  Mail,
  Phone,
  TrendingUp,
  MessageSquare,
  AlertCircle,
  UserX,
  ArrowRightCircle,
  AlertTriangle,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import StudentInfoModal from "./student-details"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs"

interface Subject {
  name: string
  tests: { name: string; score: number }[] | []
  finalExam: number | null
  criteria: string
  finalGrade: string
  teacherComment: string
  teacherName: string
  teacherEmail: string
  teacherPhone: string
  attendance: number
  participationScore: number
  improvementAreas: string[]
}

interface Term {
  name: string
  subjects: Subject[]
  overallComment: string
  nextYearStatus: string
  adviceToParents: string
  overallAttendance: number
  behaviorRating: number
  extracurricularActivities: string[]
}

// User roles
type UserRole = "admin" | "classTeacher" | "subjectTeacher" | "parent"

interface StudentPageProps {
  userRole: UserRole
  teacherSubject?: string // Required for subject teachers
  classTeacherSubject?: string // Required for class teachers
  studentId: string
  studentName: string
}

const terms: Term[] = [
  {
    name: "Term 1",
    subjects: [
      {
        name: "Mathematics",
        tests: [
          { name: "Quiz 1", score: 85 },
          { name: "Mid-term", score: 78 },
          { name: "Quiz 2", score: 92 },
        ],
        finalExam: 88,
        criteria: "Tests (40%), Final Exam (60%)",
        finalGrade: "A",
        teacherComment: "Excellent progress in problem-solving skills.",
        teacherName: "Mr. John Doe",
        teacherEmail: "john.doe@ph-EduTrack.com",
        teacherPhone: "+1234567890",
        attendance: 95,
        participationScore: 88,
        improvementAreas: ["Practice more word problems", "Review geometry concepts"],
      },
      {
        name: "English Literature",
        tests: [
          { name: "Poetry Analysis", score: 90 },
          { name: "Novel Review", score: 85 },
        ],
        finalExam: 92,
        criteria: "Tests (50%), Final Exam (50%)",
        finalGrade: "A+",
        teacherComment: "Outstanding analytical skills shown in assignments.",
        teacherName: "Ms. Emily Chen",
        teacherEmail: "emily.chen@ph-EduTrack.com",
        teacherPhone: "+9876543210",
        attendance: 98,
        participationScore: 95,
        improvementAreas: ["Engage more in class discussions"],
      },
      {
        name: "Biology",
        tests: [
          { name: "Cell Biology Quiz", score: 80 },
          { name: "Ecosystems Mid-term", score: 82 },
        ],
        finalExam: 85,
        criteria: "Tests (45%), Final Exam (55%)",
        finalGrade: "B+",
        teacherComment: "Good understanding of biological concepts, but needs to work on lab reports.",
        teacherName: "Dr. Liam Patel",
        teacherEmail: "liam.patel@ph-EduTrack.com",
        teacherPhone: "+1112223333",
        attendance: 92,
        participationScore: 80,
        improvementAreas: ["Improve lab report writing skills"],
      },
      {
        name: "Physical Education",
        tests: [
          { name: "Fitness Test", score: 95 },
          { name: "Team Sports Assessment", score: 90 },
        ],
        finalExam: null,
        criteria: "Participation (30%), Assessments (70%)",
        finalGrade: "A",
        teacherComment: "Excellent teamwork and leadership skills demonstrated.",
        teacherName: "Coach Michael Lee",
        teacherEmail: "michael.lee@ph-EduTrack.com",
        teacherPhone: "+4445556666",
        attendance: 100,
        participationScore: 98,
        improvementAreas: [],
      },
      {
        name: "Computer Science",
        tests: [
          { name: "Programming Quiz 1", score: 88 },
          { name: "Project Mid-term", score: 90 },
        ],
        finalExam: 90,
        criteria: "Tests (40%), Project (60%)",
        finalGrade: "A",
        teacherComment: "Very promising coding skills, keep exploring new languages.",
        teacherName: "Ms. Sophia Kim",
        teacherEmail: "sophia.kim@ph-EduTrack.com",
        teacherPhone: "+7778889999",
        attendance: 96,
        participationScore: 92,
        improvementAreas: ["Explore AI/ML basics"],
      },
      {
        name: "Geography",
        tests: [
          { name: "Map Reading Quiz", score: 85 },
          { name: "Cultural Geography Mid-term", score: 80 },
        ],
        finalExam: 82,
        criteria: "Tests (50%), Final Exam (50%)",
        finalGrade: "B",
        teacherComment: "Good knowledge of geographical concepts, work on map skills.",
        teacherName: "Mr. David Taylor",
        teacherEmail: "david.taylor@ph-EduTrack.com",
        teacherPhone: "+1231231234",
        attendance: 90,
        participationScore: 85,
        improvementAreas: ["Improve map reading skills"],
      },
      // {
      //   name: "French",
      //   tests: [
      //     { name: "Grammar Quiz 1", score: 90 },
      //     { name: "Conversation Mid-term", score: 88 },
      //   ],
      //   finalExam: 90,
      //   criteria: "Tests (45%), Final Exam (55%)",
      //   finalGrade: "A",
      //   teacherComment: "Très bien! Excellent pronunciation and grammar understanding.",
      //   teacherName: "Mme. Isabelle Dupont",
      //   teacherEmail: "isabelle.dupont@ph-EduTrack.com",
      //   teacherPhone: "+5678901234",
      //   attendance: 97,
      //   participationScore: 94,
      //   improvementAreas: ["Engage more in conversations"],
      // },
      // {
      //   name: "Art & Design",
      //   tests: [],
      //   finalExam: null,
      //   criteria: "Project Based (100%)",
      //   finalGrade: "A+",
      //   teacherComment: "Outstanding creativity and skill shown in all projects.",
      //   teacherName: "Ms. Ava Moreno",
      //   teacherEmail: "ava.moreno@ph-EduTrack.com",
      //   teacherPhone: "+9012345678",
      //   attendance: 99,
      //   participationScore: 99,
      //   improvementAreas: [],
      // },
    ],
    overallComment: "Sarah has shown great improvement this term, especially in Mathematics and English Literature.",
    nextYearStatus: "On track to proceed to the next grade",
    adviceToParents:
      "Encourage more reading in literature to boost comprehension skills and explore extracurricular coding activities.",
    overallAttendance: 94.5,
    behaviorRating: 92,
    extracurricularActivities: ["Chess Club", "Math Olympiad", "School Play"],
  },
]

function getGradeColor(grade: string) {
  const gradeColors = {
    "A+": "text-[#4CAF50]",
    A: "text-[#4CAF50]",
    "A-": "text-[#4CAF50]",
    "B+": "text-green-600",
    B: "text-green-600",
    "B-": "text-green-600",
    "C+": "text-[#F4A261]",
    C: "text-[#F4A261]",
    "C-": "text-[#F4A261]",
    "D+": "text-[#E76F51]",
    D: "text-[#E76F51]",
    "D-": "text-[#E76F51]",
    F: "text-[#D62828]",
  }
  return gradeColors[grade as keyof typeof gradeColors] || "text-[#264653]"
}

function SubjectCard({ subject, isTeacherSubject = false }: { subject: Subject; isTeacherSubject?: boolean }) {
  // Generate performance data for the chart
  const performanceData = [
    ...subject.tests.map((test) => ({
      name: test.name,
      score: test.score,
    })),
    ...(subject.finalExam !== null ? [{ name: "Final Exam", score: subject.finalExam }] : []),
  ]

  return (
    <Card className={`mb-6 ${isTeacherSubject ? "border-2 border-green-600" : "bg-white"}`}>
      <CardHeader className="border-b border-[#F4F4F4]">
        <CardTitle className="text-[#264653] flex items-center">
          <Book className={`w-5 h-5 mr-2 ${isTeacherSubject ? "text-green-600" : "text-green-600"}`} />
          {subject.name}
          {isTeacherSubject && (
            <span className="ml-2 text-sm text-green-600 font-normal">(You teach this subject)</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            {/* Performance Chart */}
            <div className="mb-6">
              <h4 className="text-[#264653] font-semibold mb-4">Performance Trend</h4>
              {performanceData.length > 0 ? (
                <LineChart width={400} height={200} data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#2A9D8F" strokeWidth={2} />
                </LineChart>
              ) : (
                <div className="flex items-center justify-center h-[200px] bg-gray-100 rounded-lg">
                  <p className="text-gray-500">No performance data available</p>
                </div>
              )}
            </div>

            {/* Tests and Final Exam */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#F4F4F4] p-4 rounded-lg">
                <h4 className="text-[#264653] font-semibold mb-2">Tests</h4>
                {subject.tests.length > 0 ? (
                  <ul className="space-y-2">
                    {subject.tests.map((test) => (
                      <li key={test.name} className="flex justify-between">
                        <span className="text-[#A8A8A8]">{test.name}</span>
                        <span className="font-semibold text-[#264653]">{test.score}%</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[#A8A8A8]">No tests recorded</p>
                )}
              </div>
              <div className="bg-[#F4F4F4] p-4 rounded-lg">
                <h4 className="text-[#264653] font-semibold mb-2">Final Exam</h4>
                <div className="text-center">
                  {subject.finalExam !== null ? (
                    <span className="text-3xl font-bold text-green-600">{subject.finalExam}%</span>
                  ) : (
                    <span className="text-[#A8A8A8]">N/A</span>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-[#F4F4F4] p-4 rounded-lg text-center w-full text-[#F4A261]">{subject.criteria}</div>
          </div>

          <div className="space-y-6">
            {/* Grade and Criteria */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-[#264653] font-semibold mb-2">Final Grade</h4>
                <span className={`text-4xl font-bold ${getGradeColor(subject.finalGrade)}`}>{subject.finalGrade}</span>
              </div>
              <div className="text-right">
                <h4 className="text-[#264653] font-semibold mb-2">Attendance</h4>
                <span className="text-2xl font-semibold text-green-600">{subject.attendance}%</span>
              </div>
            </div>

            {/* Teacher's Comment */}
            <div>
              <h4 className="text-[#264653] font-semibold mb-2 flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-green-600" />
                Teacher's Comment
              </h4>
              <p className="text-[#264653]">{subject.teacherComment}</p>
            </div>

            {/* Areas for Improvement */}
            {subject.improvementAreas.length > 0 && (
              <div>
                <h4 className="text-[#264653] font-semibold mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-[#F4A261]" />
                  Areas for Improvement
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {subject.improvementAreas.map((area, index) => (
                    <li key={index} className="text-[#264653]">
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Teacher Contact */}
            <div className="bg-[#F4F4F4] p-4 rounded-lg">
              <h4 className="text-[#264653] font-semibold mb-3 flex items-center">
                <GraduationCap className="w-4 h-4 mr-2 text-green-600" />
                Teacher Contact
              </h4>
              <div className="space-y-2">
                <p className="flex items-center text-[#264653]">{subject.teacherName}</p>
                <p className="flex items-center text-[#264653]">
                  <Mail className="w-4 h-4 mr-2 text-green-600" />
                  {subject.teacherEmail}
                </p>
                <p className="flex items-center text-[#264653]">
                  <Phone className="w-4 h-4 mr-2 text-green-600" />
                  {subject.teacherPhone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SubjectTabs({
  subjects,
  userRole,
  teacherSubject,
  classTeacherSubject,
}: {
  subjects: Subject[]
  userRole: UserRole
  teacherSubject?: string
  classTeacherSubject?: string
}) {
  // Filter subjects based on user role
  const filteredSubjects =
    userRole === "subjectTeacher" && teacherSubject
      ? subjects.filter((subject) => subject.name === teacherSubject)
      : subjects

  const [activeTab, setActiveTab] = useState(filteredSubjects[0]?.name || "")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      {/* Scrollable Tab List */}
      <div className="relative">
        <TabsList
          className="
          inline-flex 
          w-full 
          pb-2 
          mb-2 
          border-b 
          border-gray-200
        "
        >
          {filteredSubjects.map((subject) => (
            <TabsTrigger
              key={subject.name}
              value={subject.name}
              className={`
                flex-shrink-0
                px-4
                py-2
                mx-1
                rounded-lg
                font-medium
                transition-all
                duration-200
                data-[state=active]:bg-green-600
                data-[state=active]:text-white
                data-[state=inactive]:bg-gray-100
                data-[state=inactive]:text-gray-600
                hover:bg-green-50
                hover:text-green-600
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
                focus:ring-opacity-50
                ${userRole === "classTeacher" && subject.name === classTeacherSubject ? "border-2 border-green-600" : ""}
              `}
            >
              {subject.name}
              {userRole === "classTeacher" && subject.name === classTeacherSubject && (
                <span className="ml-1 text-xs">👨‍🏫</span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* Subject Content */}
      {filteredSubjects.map((subject) => (
        <TabsContent key={subject.name} value={subject.name} className="mt-6">
          <SubjectCard
            subject={subject}
            isTeacherSubject={
              (userRole === "subjectTeacher" && subject.name === teacherSubject) ||
              (userRole === "classTeacher" && subject.name === classTeacherSubject)
            }
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}

// Admin action dialogs
function SuspendStudentDialog({ studentName, studentId }: { studentName: string; studentId: string }) {
  const [reason, setReason] = useState("")
  const [duration, setDuration] = useState("1 week")

  const handleSubmit = () => {
    console.log(`Suspending student ${studentId} (${studentName}) for ${duration}. Reason: ${reason}`)
    // Here you would call your API to suspend the student
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="bg-amber-500 hover:bg-amber-600">
          <UserX className="mr-2 h-4 w-4" />
          Suspend
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Suspend Student</DialogTitle>
          <DialogDescription>
            You are about to suspend {studentName}. This action will temporarily remove the student from all classes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="duration" className="text-right">
              Duration
            </label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger id="duration" className="col-span-3">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 day">1 day</SelectItem>
                <SelectItem value="3 days">3 days</SelectItem>
                <SelectItem value="1 week">1 week</SelectItem>
                <SelectItem value="2 weeks">2 weeks</SelectItem>
                <SelectItem value="1 month">1 month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="reason" className="text-right">
              Reason
            </label>
            <Textarea
              id="reason"
              className="col-span-3"
              placeholder="Provide a reason for the suspension"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!reason.trim()}
            className="bg-amber-500 hover:bg-amber-600"
          >
            Suspend Student
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function TransferStudentDialog({ studentName, studentId }: { studentName: string; studentId: string }) {
  const [targetClass, setTargetClass] = useState("")
  const [reason, setReason] = useState("")

  const handleSubmit = () => {
    console.log(`Transferring student ${studentId} (${studentName}) to ${targetClass}. Reason: ${reason}`)
    // Here you would call your API to transfer the student
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
          <ArrowRightCircle className="mr-2 h-4 w-4" />
          Transfer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer Student</DialogTitle>
          <DialogDescription>You are about to transfer {studentName} to another class.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="targetClass" className="text-right">
              Target Class
            </label>
            <Select value={targetClass} onValueChange={setTargetClass}>
              <SelectTrigger id="targetClass" className="col-span-3">
                <SelectValue placeholder="Select target class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Class 10A">Class 10A</SelectItem>
                <SelectItem value="Class 10B">Class 10B</SelectItem>
                <SelectItem value="Class 10C">Class 10C</SelectItem>
                <SelectItem value="Class 11A">Class 11A</SelectItem>
                <SelectItem value="Class 11B">Class 11B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="transferReason" className="text-right">
              Reason
            </label>
            <Textarea
              id="transferReason"
              className="col-span-3"
              placeholder="Provide a reason for the transfer"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!targetClass || !reason.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Transfer Student
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ExpelStudentDialog({ studentName, studentId }: { studentName: string; studentId: string }) {
  const [reason, setReason] = useState("")
  const [confirmation, setConfirmation] = useState("")

  const handleSubmit = () => {
    console.log(`Expelling student ${studentId} (${studentName}). Reason: ${reason}`)
    // Here you would call your API to expel the student
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <AlertTriangle className="mr-2 h-4 w-4" />
          Expel
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-600">Expel Student</DialogTitle>
          <DialogDescription>
            <Alert className="bg-red-50 border-red-200 text-red-800 my-2">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                This is a permanent action and cannot be undone. The student will be removed from the school.
              </AlertDescription>
            </Alert>
            You are about to expel {studentName} from the school.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="expelReason" className="text-right">
              Reason
            </label>
            <Textarea
              id="expelReason"
              className="col-span-3"
              placeholder="Provide a detailed reason for expulsion"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="confirmation" className="text-right">
              Confirmation
            </label>
            <div className="col-span-3">
              <input
                id="confirmation"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Type 'EXPEL' to confirm"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Type 'EXPEL' to confirm this irreversible action</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button
            variant="destructive"
            type="button"
            onClick={handleSubmit}
            disabled={!reason.trim() || confirmation !== "EXPEL"}
          >
            Expel Student
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function StudentPage({
  userRole,
  teacherSubject,
  classTeacherSubject,
  studentId,
  studentName,
}: StudentPageProps) {
  const [selectedTerm, setSelectedTerm] = useState<Term>(terms[0])

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <div className="container mx-auto py-8 px-4">
        <div className="flex mb-8 flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#264653] mb-2">Academic Report Card</h1>
            <p className="text-[#A8A8A8]">Track your academic progress and performance</p>
          </div>
          <div className="flex gap-2">
            {userRole === "admin" && (
              <div className="flex gap-2">
                <SuspendStudentDialog studentName={studentName} studentId={studentId} />
                <TransferStudentDialog studentName={studentName} studentId={studentId} />
                <ExpelStudentDialog studentName={studentName} studentId={studentId} />
              </div>
            )}
            <StudentInfoModal />
          </div>
        </div>

        {/* Term Selection and Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-[#264653]">Term Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Select
                  defaultValue={selectedTerm.name}
                  onValueChange={(value) => {
                    const term = terms.find((t) => t.name === value)
                    if (term) setSelectedTerm(term)
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Term" />
                  </SelectTrigger>
                  <SelectContent>
                    {terms.map((term) => (
                      <SelectItem key={term.name} value={term.name}>
                        {term.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-[#F4F4F4] rounded-lg">
                  <p className="text-[#A8A8A8] mb-1">Attendance</p>
                  <p className="text-2xl font-bold text-green-600">{selectedTerm.overallAttendance}%</p>
                </div>
                <div className="text-center p-4 bg-[#F4F4F4] rounded-lg">
                  <p className="text-[#A8A8A8] mb-1">Behavior</p>
                  <p className="text-2xl font-bold text-green-600">{selectedTerm.behaviorRating}%</p>
                </div>
                <div className="text-center p-4 bg-[#F4F4F4] rounded-lg">
                  <p className="text-[#A8A8A8] mb-1">Activities</p>
                  <p className="text-2xl font-bold text-green-600">{selectedTerm.extracurricularActivities.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[#264653]">Next Year Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription>{selectedTerm.nextYearStatus}</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Subjects */}
        <SubjectTabs
          subjects={selectedTerm.subjects}
          userRole={userRole}
          teacherSubject={teacherSubject}
          classTeacherSubject={classTeacherSubject}
        />

        {/* Overall Evaluation - Only visible to admin, parent, and class teacher */}
        {userRole !== "subjectTeacher" && (
          <Card className="mt-8 bg-[#F2CC8F]/5">
            <CardHeader>
              <CardTitle className="text-[#264653]">Overall Evaluation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-[#264653] font-semibold mb-2">Class Teacher's Comment</h4>
                <p className="text-[#264653]">{selectedTerm.overallComment}</p>
              </div>
              <div>
                <h4 className="text-[#264653] font-semibold mb-2">Advice to Parents</h4>
                <p className="text-[#264653]">{selectedTerm.adviceToParents}</p>
              </div>

              {/* Extracurricular Activities */}
              <div>
                <h4 className="text-[#264653] font-semibold mb-2">Extracurricular Activities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTerm.extracurricularActivities.map((activity, index) => (
                    <span key={index} className="px-3 py-1 bg-[#F2CC8F]/10 text-custom-text rounded-full text-sm">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}