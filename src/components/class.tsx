"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  BookOpen,
  Calendar,
  Clock,
  Download,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  User,
  Users,
} from "lucide-react"
import { themeColors } from "./ui/theme-config"

export default function ClassComponent() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Mathematics 101</h1>
          <p className="text-gray-500">Advanced Algebra - Grade 10</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2">
            <Mail size={16} />
            Email Class
          </Button>
          <Button className={`flex items-center gap-2 ${themeColors.secondaryBg} ${themeColors.secondaryHover}`}>
            <Download size={16} />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Class Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.accentBg}`}>
                <BarChart className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">78.5%</div>
                <p className="text-xs text-gray-500">+2.5% from last semester</p>
              </div>
            </div>
          </CardContent>
        </Card>

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
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-gray-500">18 boys, 14 girls</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Next Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.accentBg}`}>
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">May 15</div>
                <p className="text-xs text-gray-500">Final Exam - 10:00 AM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "overview" ? `border-b-2 ${themeColors.accentBorder} ${themeColors.accent}` : "text-gray-500"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
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
            activeTab === "assessments"
              ? `border-b-2 ${themeColors.accentBorder} ${themeColors.accent}`
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("assessments")}
        >
          Assessments
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "resources" ? `border-b-2 ${themeColors.accentBorder} ${themeColors.accent}` : "text-gray-500"
          }`}
          onClick={() => setActiveTab("resources")}
        >
          Resources
        </button>
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Class Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                  <BarChart className={`h-16 w-16 ${themeColors.accent}`} />
                  <span className="ml-2 text-gray-500">Performance Chart</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Class Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <GraduationCap className="mr-2 h-5 w-5 text-gray-500" />
                    <div>
                      <h3 className="font-medium">Teacher</h3>
                      <p className="text-sm text-gray-500">Ms. Sarah Johnson</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="mr-2 h-5 w-5 text-gray-500" />
                    <div>
                      <h3 className="font-medium">Schedule</h3>
                      <p className="text-sm text-gray-500">Mon, Wed, Fri - 9:00 AM to 10:30 AM</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="mr-2 h-5 w-5 text-gray-500" />
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p className="text-sm text-gray-500">Room 203, Science Building</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <BookOpen className="mr-2 h-5 w-5 text-gray-500" />
                    <div>
                      <h3 className="font-medium">Textbook</h3>
                      <p className="text-sm text-gray-500">Advanced Algebra: Concepts and Applications</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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
                  <TableHead>ID</TableHead>
                  <TableHead>Average</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { name: "Emma Thompson", id: "ST10023", avg: "92%", attendance: "98%", status: "Excellent" },
                  { name: "James Wilson", id: "ST10045", avg: "78%", attendance: "85%", status: "Good" },
                  { name: "Sophia Garcia", id: "ST10067", avg: "65%", attendance: "75%", status: "Needs Improvement" },
                  { name: "Liam Johnson", id: "ST10089", avg: "88%", attendance: "92%", status: "Very Good" },
                  { name: "Olivia Martinez", id: "ST10012", avg: "72%", attendance: "80%", status: "Good" },
                ].map((student, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {student.name}
                      </div>
                    </TableCell>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.avg}</TableCell>
                    <TableCell>{student.attendance}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          student.status === "Excellent"
                            ? `${themeColors.accentBg} text-white`
                            : student.status === "Very Good"
                              ? `${themeColors.secondaryBg} text-white`
                              : student.status === "Good"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <User size={16} className="mr-2" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
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
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Average Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { title: "Midterm Exam", type: "Exam", date: "Mar 15, 2023", avg: "76%", status: "Completed" },
                  { title: "Quadratic Equations", type: "Quiz", date: "Apr 5, 2023", avg: "82%", status: "Completed" },
                  {
                    title: "Polynomial Functions",
                    type: "Assignment",
                    date: "Apr 20, 2023",
                    avg: "88%",
                    status: "Completed",
                  },
                  { title: "Linear Algebra", type: "Project", date: "May 1, 2023", avg: "N/A", status: "In Progress" },
                  { title: "Final Exam", type: "Exam", date: "May 15, 2023", avg: "N/A", status: "Scheduled" },
                ].map((assessment, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{assessment.title}</TableCell>
                    <TableCell>{assessment.type}</TableCell>
                    <TableCell>{assessment.date}</TableCell>
                    <TableCell>{assessment.avg}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          assessment.status === "Completed"
                            ? `${themeColors.accentBg} text-white`
                            : assessment.status === "In Progress"
                              ? `${themeColors.secondaryBg} text-white`
                              : "bg-gray-100 text-gray-800"
                        }
                      >
                        {assessment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <FileText size={16} className="mr-2" />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === "resources" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Textbook: Advanced Algebra - Concepts and Applications",
                  "Course Syllabus",
                  "Formula Sheet",
                  "Practice Problem Sets",
                  "Midterm Study Guide",
                ].map((resource, i) => (
                  <li key={i} className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-gray-500" />
                    <span>{resource}</span>
                  </li>
                ))}
              </ul>
              <Button className={`mt-4 w-full ${themeColors.accentBg} ${themeColors.accentHover} text-white`}>
                <Download size={16} className="mr-2" />
                Download All Materials
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Online Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Khan Academy - Algebra II",
                  "Math is Fun - Quadratic Equations",
                  "Desmos Graphing Calculator",
                  "Wolfram Alpha",
                  "Virtual Math Lab",
                ].map((resource, i) => (
                  <li key={i} className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-gray-500" />
                    <span>{resource}</span>
                  </li>
                ))}
              </ul>
              <Button className={`mt-4 w-full ${themeColors.secondaryBg} ${themeColors.secondaryHover} text-white`}>
                View All Resources
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
