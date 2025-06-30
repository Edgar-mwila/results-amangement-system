import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  BookOpen,
  CheckSquare,
  Users,
} from "lucide-react"
import { ClassComponentProps } from "@/routes/$school/dashboard/class-management/$id/index"

// Define theme colors inline since we don't have the theme config
const themeColors = {
  primaryBg: "bg-blue-500",
  secondaryBg: "bg-green-500", 
  accentBg: "bg-purple-500",
  accent: "text-blue-600",
  accentBorder: "border-blue-500"
}

export default function ClassComponent({ classData }: ClassComponentProps) {
  const [activeTab, setActiveTab] = useState("students")

  // Derive computed values from props
  const studentsCount = classData.classStudents?.length || 0;
  const subjectsCount = classData.classSubjects?.length || 0;
  const assessmentsCount = classData.classSubjects?.reduce(
    (total, subject) => total + (subject.assessments?.length || 0), 
    0
  ) || 0;

  // Get all assessments from all subjects
  const allAssessments = classData.classSubjects?.flatMap(subject => 
    subject.assessments?.map(assessment => ({
      ...assessment,
      subject: subject.subject?.name,
      subjectCode: subject.subject?.code,
    })) || []
  ) || [];

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            {classData?.grade?.level || "N/A"} - {classData?.name || "N/A"}
          </h1>
          <p className="text-gray-600 mt-1">{classData?.academicYear?.year || "N/A"}</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <span>
            Class teacher: {classData?.classTeacher?.firstName || "N/A"} {classData?.classTeacher?.lastName || ""}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.secondaryBg}`}>
                <Users className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">{studentsCount}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.secondaryBg}`}>
                <BarChart className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">{subjectsCount}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.secondaryBg}`}>
                <CheckSquare className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">{assessmentsCount}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-around border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "students" ? `border-b-2 ${themeColors.accentBorder} ${themeColors.accent}` : "text-gray-500"
          }`}
          onClick={() => setActiveTab("students")}
        >
          Students
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "subjects" ? `border-b-2 ${themeColors.accentBorder} ${themeColors.accent}` : "text-gray-500"
          }`}
          onClick={() => setActiveTab("subjects")}
        >
          Subjects
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "assessments"
              ? `border-b-2 ${themeColors.accentBorder} ${themeColors.accent}`
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("assessments")}
        >
          Assessments
        </button>
      </div>

      {activeTab === "subjects" && (
        <Card>
          <CardHeader>
            <CardTitle>Subjects List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Assessments</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classData.classSubjects?.map((subject, index) => (
                  <TableRow key={`${subject.subject?.code}-${index}`}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-gray-500" />
                      {subject.subject?.name || 'N/A'}
                    </TableCell>
                    <TableCell>{subject.subject?.code || 'N/A'}</TableCell>
                    <TableCell>{subject.teacher?.firstName || 'N/A'} {subject.teacher?.lastName || ''}</TableCell>
                    <TableCell>{subject.assessments?.length || 0}</TableCell>
                  </TableRow>
                )) || []}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === "students" && (
        <Card>
          <CardHeader>
            <CardTitle>Student List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Gender</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classData.classStudents?.map((classStudent, index) => (
                  <TableRow key={`${classStudent.student?.id}-${index}`}>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                          <AvatarFallback>
                            {classStudent.student?.firstName?.[0] || 'N'}{classStudent.student?.lastName?.[0] || 'A'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {classStudent.student?.firstName || 'N/A'} {classStudent.student?.otherName ? `${classStudent.student.otherName} ` : ''}{classStudent.student?.lastName || ''}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{classStudent.student?.id || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {classStudent.student?.gender || classStudent.student?.sex || 'N/A'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )) || []}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === "assessments" && (
        <Card>
          <CardHeader>
            <CardTitle>Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assessment Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Subject Code</TableHead>
                  <TableHead>Total Marks</TableHead>
                  <TableHead>Term</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allAssessments.map((assessment, index) => (
                  <TableRow key={`${assessment.id}-${index}`}>
                    <TableCell className="font-medium">{assessment.name || 'N/A'}</TableCell>
                    <TableCell>{assessment.subject || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {assessment.subjectCode || 'N/A'}
                      </Badge>
                    </TableCell>
                    <TableCell>{assessment.totalMarks || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge className={`${themeColors.accentBg} text-white`}>
                        {assessment.term.name || 'N/A'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {assessment.createdAt ? new Date(assessment.createdAt).toLocaleDateString() : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}