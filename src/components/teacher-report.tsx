import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Download, FileText, Mail, Printer, TrendingDown, TrendingUp } from "lucide-react"
import { themeColors } from "./ui/theme-config"

export default function TeacherReport() {
  return (
    <div className="container mx-auto p-2 sm:p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Teacher Performance Report</h1>
          <p className="text-gray-500 text-sm">Spring Semester 2023</p>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none items-center gap-2 min-h-[44px]">
            <Mail size={16} />
            Email
          </Button>
          <Button variant="outline" className="flex-1 sm:flex-none items-center gap-2 min-h-[44px]">
            <Printer size={16} />
            Print
          </Button>
          <Button
            className={`flex-1 sm:flex-none items-center gap-2 min-h-[44px] ${themeColors.secondaryBg} ${themeColors.secondaryHover} text-white`}
          >
            <Download size={16} />
            Download PDF
          </Button>
        </div>
      </div>

      <Card className="mb-4 sm:mb-6">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Department Overview</CardTitle>
          <CardDescription className="text-sm">Mathematics Department Performance Summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <div className="text-3xl font-bold mb-1">82.4%</div>
              <div className="text-sm text-gray-500">Department Average</div>
              <div className="flex items-center justify-center text-xs text-green-500 mt-1">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+1.8% from last semester</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <div className="text-3xl font-bold mb-1">88%</div>
              <div className="text-sm text-gray-500">Pass Rate</div>
              <div className="flex items-center justify-center text-xs text-green-500 mt-1">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+2% from last semester</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <div className="text-3xl font-bold mb-1">5</div>
              <div className="text-sm text-gray-500">Teachers</div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <div className="text-3xl font-bold mb-1">348</div>
              <div className="text-sm text-gray-500">Students</div>
            </div>
          </div>

          <div className="h-[200px] sm:h-[300px] flex items-center justify-center bg-gray-100 rounded-md mb-4 sm:mb-6">
            <BarChart className={`h-10 w-10 sm:h-16 sm:w-16 ${themeColors.accent}`} />
            <span className="ml-2 text-gray-500">Department Performance Chart</span>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Average</TableHead>
                <TableHead>Pass Rate</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  teacher: "Dr. James Wilson",
                  courses: "AP Calculus, Calculus I",
                  students: 58,
                  avg: "89.5%",
                  pass: "94%",
                  trend: "up",
                  status: "Excellent",
                },
                {
                  teacher: "Ms. Sarah Johnson",
                  courses: "Pre-Calculus, Algebra II",
                  students: 65,
                  avg: "84.2%",
                  pass: "90%",
                  trend: "up",
                  status: "Very Good",
                },
                {
                  teacher: "Mr. Robert Chen",
                  courses: "Algebra II, Statistics",
                  students: 70,
                  avg: "82.8%",
                  pass: "88%",
                  trend: "stable",
                  status: "Good",
                },
                {
                  teacher: "Ms. Emily Parker",
                  courses: "Geometry, Math Fundamentals",
                  students: 75,
                  avg: "80.1%",
                  pass: "86%",
                  trend: "stable",
                  status: "Good",
                },
                {
                  teacher: "Mr. Michael Rodriguez",
                  courses: "Algebra I, Pre-Algebra",
                  students: 80,
                  avg: "76.3%",
                  pass: "80%",
                  trend: "down",
                  status: "Good",
                },
              ].map((teacher, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                        <AvatarFallback>
                          {teacher.teacher
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {teacher.teacher}
                    </div>
                  </TableCell>
                  <TableCell>{teacher.courses}</TableCell>
                  <TableCell>{teacher.students}</TableCell>
                  <TableCell>{teacher.avg}</TableCell>
                  <TableCell>{teacher.pass}</TableCell>
                  <TableCell>
                    {teacher.trend === "up" ? (
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    ) : teacher.trend === "down" ? (
                      <TrendingDown className="h-5 w-5 text-red-500" />
                    ) : (
                      <div className="h-0.5 w-5 bg-gray-400 my-3" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        teacher.status === "Excellent"
                          ? `${themeColors.accentBg} text-white`
                          : teacher.status === "Very Good"
                            ? `${themeColors.secondaryBg} text-white`
                            : teacher.status === "Good"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {teacher.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Performance</CardTitle>
            <CardDescription>Performance metrics by course</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Average</TableHead>
                  <TableHead>Pass Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { course: "AP Calculus", teacher: "Dr. James Wilson", students: 28, avg: "91.2%", pass: "96%" },
                  { course: "Calculus I", teacher: "Dr. James Wilson", students: 30, avg: "87.8%", pass: "92%" },
                  { course: "Pre-Calculus A", teacher: "Ms. Sarah Johnson", students: 32, avg: "85.7%", pass: "92%" },
                  { course: "Pre-Calculus B", teacher: "Ms. Sarah Johnson", students: 30, avg: "83.2%", pass: "90%" },
                  { course: "Algebra II A", teacher: "Ms. Sarah Johnson", students: 35, avg: "82.3%", pass: "88%" },
                  { course: "Algebra II B", teacher: "Mr. Robert Chen", students: 33, avg: "81.5%", pass: "87%" },
                  { course: "Statistics", teacher: "Mr. Robert Chen", students: 37, avg: "84.2%", pass: "90%" },
                  { course: "Geometry A", teacher: "Ms. Emily Parker", students: 38, avg: "79.8%", pass: "85%" },
                  { course: "Geometry B", teacher: "Ms. Emily Parker", students: 37, avg: "80.4%", pass: "86%" },
                  { course: "Algebra I", teacher: "Mr. Michael Rodriguez", students: 42, avg: "74.5%", pass: "78%" },
                  { course: "Pre-Algebra", teacher: "Mr. Michael Rodriguez", students: 38, avg: "78.1%", pass: "82%" },
                ].map((course, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{course.course}</TableCell>
                    <TableCell>{course.teacher}</TableCell>
                    <TableCell>{course.students}</TableCell>
                    <TableCell>{course.avg}</TableCell>
                    <TableCell>{course.pass}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Teacher Evaluation Summary</CardTitle>
            <CardDescription>Based on student feedback and peer reviews</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Student Feedback</TableHead>
                  <TableHead>Peer Review</TableHead>
                  <TableHead>Admin Evaluation</TableHead>
                  <TableHead>Overall</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    teacher: "Dr. James Wilson",
                    student: "4.8/5.0",
                    peer: "4.7/5.0",
                    admin: "4.9/5.0",
                    overall: "4.8/5.0",
                  },
                  {
                    teacher: "Ms. Sarah Johnson",
                    student: "4.7/5.0",
                    peer: "4.5/5.0",
                    admin: "4.8/5.0",
                    overall: "4.7/5.0",
                  },
                  {
                    teacher: "Mr. Robert Chen",
                    student: "4.5/5.0",
                    peer: "4.6/5.0",
                    admin: "4.7/5.0",
                    overall: "4.6/5.0",
                  },
                  {
                    teacher: "Ms. Emily Parker",
                    student: "4.6/5.0",
                    peer: "4.4/5.0",
                    admin: "4.5/5.0",
                    overall: "4.5/5.0",
                  },
                  {
                    teacher: "Mr. Michael Rodriguez",
                    student: "4.2/5.0",
                    peer: "4.3/5.0",
                    admin: "4.4/5.0",
                    overall: "4.3/5.0",
                  },
                ].map((teacher, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                          <AvatarFallback>
                            {teacher.teacher
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {teacher.teacher}
                      </div>
                    </TableCell>
                    <TableCell>{teacher.student}</TableCell>
                    <TableCell>{teacher.peer}</TableCell>
                    <TableCell>{teacher.admin}</TableCell>
                    <TableCell className="font-medium">{teacher.overall}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Evaluation Criteria</h3>
                <ul className="space-y-1 text-sm text-gray-500 list-disc pl-5">
                  <li>Teaching effectiveness</li>
                  <li>Student engagement</li>
                  <li>Content knowledge</li>
                  <li>Classroom management</li>
                  <li>Assessment practices</li>
                  <li>Professional conduct</li>
                </ul>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Rating Scale</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>4.5 - 5.0</span>
                    <span className={`${themeColors.accent} font-medium`}>Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span>4.0 - 4.4</span>
                    <span className={`${themeColors.secondary} font-medium`}>Very Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span>3.5 - 3.9</span>
                    <span className="text-green-600 font-medium">Good</span>
                  </div>
                  <div className="flex justify-between">
                    <span>3.0 - 3.4</span>
                    <span className="text-yellow-600 font-medium">Satisfactory</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Below 3.0</span>
                    <span className="text-red-600 font-medium">Needs Improvement</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Individual Teacher Reports</CardTitle>
          <CardDescription className="text-sm">Detailed performance reports for each teacher</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 sm:space-y-6">
            {[
              {
                teacher: "Dr. James Wilson",
                position: "Mathematics Department Head",
                courses: "AP Calculus, Calculus I",
                strengths: [
                  "Exceptional content knowledge in advanced mathematics",
                  "Highly effective teaching methods for complex concepts",
                  "Strong student performance in standardized tests",
                  "Excellent mentorship of other mathematics teachers",
                ],
                improvements: [
                  "Consider developing more differentiated instruction for varying ability levels",
                  "Explore additional technology integration in advanced courses",
                ],
                comments:
                  "Dr. Wilson continues to be an outstanding leader in the mathematics department. His students consistently achieve excellent results, and he has been instrumental in curriculum development and teacher mentorship. His AP Calculus class achieved a 96% pass rate on the AP exam, well above the national average.",
              },
              {
                teacher: "Ms. Sarah Johnson",
                position: "Mathematics Teacher",
                courses: "Pre-Calculus, Algebra II",
                strengths: [
                  "Excellent student engagement and rapport",
                  "Strong growth in student performance metrics",
                  "Effective use of technology in instruction",
                  "Active participation in curriculum development",
                ],
                improvements: [
                  "Continue developing strategies for struggling students",
                  "Consider pursuing leadership opportunities within the department",
                ],
                comments:
                  "Ms. Johnson has demonstrated excellent teaching effectiveness this semester. Her student feedback scores are consistently high, and she has shown significant improvement in student outcomes. Her Pre-Calculus classes have shown a 3.5% increase in average scores compared to last semester. She is recommended for the teacher mentorship program next year.",
              },
            ].map((report, i) => (
              <div key={i} className="p-6 border rounded-lg">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                      <AvatarFallback>
                        {report.teacher
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-bold">{report.teacher}</h2>
                      <p className="text-gray-500">{report.position}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3 md:mt-0">
                    <FileText size={16} className="mr-2" />
                    View Full Report
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Courses</div>
                    <div className="font-medium">{report.courses}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Average Score</div>
                    <div className="font-medium">{report.teacher === "Dr. James Wilson" ? "89.5%" : "84.2%"}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Overall Evaluation</div>
                    <div className="font-medium">{report.teacher === "Dr. James Wilson" ? "4.8/5.0" : "4.7/5.0"}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h3 className={`font-medium mb-2 ${themeColors.accent}`}>Strengths</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {report.strengths.map((strength, j) => (
                        <li key={j}>{strength}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2 text-yellow-700">Areas for Improvement</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {report.improvements.map((improvement, j) => (
                        <li key={j}>{improvement}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className={`font-medium mb-2 ${themeColors.secondary}`}>Administrator Comments</h3>
                  <p className="text-sm">{report.comments}</p>
                </div>
              </div>
            ))}

            <div className="text-center">
              <Button variant="outline">View All Teacher Reports</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4 sm:mt-6">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Department Recommendations</CardTitle>
          <CardDescription className="text-sm">Insights and action items for improvement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 sm:space-y-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className={`font-medium mb-2 ${themeColors.secondary}`}>Strengths to Leverage</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Strong performance in advanced mathematics courses (AP Calculus, Calculus I)</li>
                <li>Experienced and highly-rated teaching staff with excellent student feedback</li>
                <li>Effective department leadership and mentorship programs</li>
                <li>Consistent improvement in overall department averages</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="font-medium mb-2 text-yellow-700">Areas for Improvement</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Performance gap between advanced and foundational courses</li>
                <li>Lower pass rates in Algebra I courses</li>
                <li>Need for additional support for struggling students</li>
                <li>Inconsistent technology integration across different courses</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className={`font-medium mb-2 ${themeColors.accent}`}>Recommended Actions</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>
                  Implement peer teaching program where advanced course teachers share best practices with foundational
                  course teachers
                </li>
                <li>Develop targeted intervention strategies for Algebra I students</li>
                <li>Expand mathematics tutoring program with focus on struggling students</li>
                <li>Provide additional professional development on technology integration</li>
                <li>Review and update curriculum for foundational courses</li>
                <li>Consider restructuring class sizes for more individualized attention in foundational courses</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-medium mb-2 text-purple-700">Long-term Goals</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Increase overall department average to 85% by next academic year</li>
                <li>Achieve 90% pass rate across all mathematics courses</li>
                <li>Develop comprehensive technology integration plan for all courses</li>
                <li>Establish cross-grade level collaboration to ensure student preparedness</li>
                <li>Implement data-driven decision making for curriculum adjustments</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
