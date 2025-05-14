"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, BookOpen, Calendar, Download, GraduationCap, Plus, Search, TrendingUp, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { themeColors } from "./ui/theme-config"

export default function StudentPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter students based on search query
  const filteredStudents = [
    { id: "ST10023", name: "Emma Thompson", grade: "10", gpa: "3.92", attendance: "98%" },
    { id: "ST10045", name: "James Wilson", grade: "10", gpa: "3.45", attendance: "92%" },
    { id: "ST10067", name: "Sophia Garcia", grade: "10", gpa: "3.21", attendance: "95%" },
    { id: "ST10089", name: "Liam Johnson", grade: "10", gpa: "3.78", attendance: "97%" },
    { id: "ST10012", name: "Olivia Martinez", grade: "10", gpa: "3.56", attendance: "94%" },
    { id: "ST10034", name: "Noah Brown", grade: "10", gpa: "3.67", attendance: "96%" },
    { id: "ST10056", name: "Ava Davis", grade: "10", gpa: "3.89", attendance: "99%" },
    { id: "ST10078", name: "William Miller", grade: "10", gpa: "3.12", attendance: "91%" },
    { id: "ST10090", name: "Isabella Wilson", grade: "10", gpa: "3.34", attendance: "93%" },
    { id: "ST10101", name: "Benjamin Moore", grade: "10", gpa: "3.45", attendance: "95%" },
  ].filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-gray-500">Manage and view student information</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            Export
          </Button>
          <Button className={`flex items-center gap-2 ${themeColors.accentBg} ${themeColors.accentHover} text-white`}>
            <Plus size={16} />
            Add Student
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.accentBg}`}>
                <User className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">1,250</div>
                <p className="text-xs text-gray-500">+50 from last year</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.secondaryBg}`}>
                <GraduationCap className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">3.42</div>
                <div className="flex items-center text-xs text-green-500">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  <span>+0.08 from last year</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.accentBg}`}>
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">94.5%</div>
                <div className="flex items-center text-xs text-green-500">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  <span>+1.2% from last year</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Graduation Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.secondaryBg}`}>
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">96.8%</div>
                <div className="flex items-center text-xs text-green-500">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  <span>+0.5% from last year</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Student Directory</CardTitle>
          <CardDescription>Search and manage students</CardDescription>
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
              <Button variant="outline">Grade Level</Button>
              <Button variant="outline">GPA</Button>
              <Button variant="outline">Status</Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>GPA</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
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
                    <TableCell>{student.grade}</TableCell>
                    <TableCell>{student.gpa}</TableCell>
                    <TableCell>{student.attendance}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          Number.parseFloat(student.gpa) >= 3.7
                            ? `${themeColors.accentBg} text-white`
                            : Number.parseFloat(student.gpa) >= 3.3
                              ? `${themeColors.secondaryBg} text-white`
                              : Number.parseFloat(student.gpa) >= 3.0
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {Number.parseFloat(student.gpa) >= 3.7
                          ? "Excellent"
                          : Number.parseFloat(student.gpa) >= 3.3
                            ? "Very Good"
                            : Number.parseFloat(student.gpa) >= 3.0
                              ? "Good"
                              : "Needs Improvement"}
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
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger
            value="overview"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="academics"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Academics
          </TabsTrigger>
          <TabsTrigger
            value="attendance"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Attendance
          </TabsTrigger>
          <TabsTrigger
            value="demographics"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Demographics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Student Distribution by Grade</CardTitle>
                <CardDescription>Number of students per grade level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                  <BarChart className={`h-16 w-16 ${themeColors.accent}`} />
                  <span className="ml-2 text-gray-500">Grade Distribution Chart</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Statistics</CardTitle>
                <CardDescription>Key metrics and figures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Gender Distribution</div>
                    <div className="flex justify-between mt-1">
                      <span>Male: 48%</span>
                      <span>Female: 52%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "48%" }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Student-Teacher Ratio</div>
                    <div className="text-2xl font-bold mt-1">15:1</div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">College Acceptance Rate</div>
                    <div className="text-2xl font-bold mt-1">88%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "88%" }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Extracurricular Participation</div>
                    <div className="text-2xl font-bold mt-1">76%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "76%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="academics">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>GPA Distribution</CardTitle>
                <CardDescription>Student GPA breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                  <BarChart className={`h-16 w-16 ${themeColors.accent}`} />
                  <span className="ml-2 text-gray-500">GPA Distribution Chart</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Academic Metrics</CardTitle>
                <CardDescription>Performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Honor Roll Students</div>
                    <div className="text-2xl font-bold mt-1">32%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "32%" }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">AP Course Enrollment</div>
                    <div className="text-2xl font-bold mt-1">45%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "45%" }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Students Needing Support</div>
                    <div className="text-2xl font-bold mt-1">12%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "12%" }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">National Merit Scholars</div>
                    <div className="text-2xl font-bold mt-1">5%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "5%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Attendance Trends</CardTitle>
                <CardDescription>Monthly attendance rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                  <BarChart className={`h-16 w-16 ${themeColors.accent}`} />
                  <span className="ml-2 text-gray-500">Attendance Trends Chart</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Statistics</CardTitle>
                <CardDescription>Key attendance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Perfect Attendance</div>
                    <div className="text-2xl font-bold mt-1">18%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "18%" }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Chronic Absences</div>
                    <div className="text-2xl font-bold mt-1">5%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "5%" }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Tardy Rate</div>
                    <div className="text-2xl font-bold mt-1">7.2%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "7.2%" }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Average Absences Per Student</div>
                    <div className="text-2xl font-bold mt-1">4.3 days</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demographics">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Student Demographics</CardTitle>
                <CardDescription>Population breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Ethnicity Distribution</h3>
                    <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-md">
                      <BarChart className={`h-10 w-10 ${themeColors.accent}`} />
                      <span className="ml-2 text-gray-500">Ethnicity Chart</span>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${themeColors.accentBg} mr-2`}></div>
                          <span>White/Caucasian</span>
                        </div>
                        <span className="font-medium">45%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${themeColors.secondaryBg} mr-2`}></div>
                          <span>Hispanic/Latino</span>
                        </div>
                        <span className="font-medium">25%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-300 mr-2"></div>
                          <span>Black/African American</span>
                        </div>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                          <span>Asian</span>
                        </div>
                        <span className="font-medium">10%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
                          <span>Other</span>
                        </div>
                        <span className="font-medium">5%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Grade Level Distribution</h3>
                    <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-md">
                      <BarChart className={`h-10 w-10 ${themeColors.secondary}`} />
                      <span className="ml-2 text-gray-500">Grade Level Chart</span>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${themeColors.accentBg} mr-2`}></div>
                          <span>9th Grade</span>
                        </div>
                        <span className="font-medium">28%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${themeColors.secondaryBg} mr-2`}></div>
                          <span>10th Grade</span>
                        </div>
                        <span className="font-medium">26%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-300 mr-2"></div>
                          <span>11th Grade</span>
                        </div>
                        <span className="font-medium">24%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                          <span>12th Grade</span>
                        </div>
                        <span className="font-medium">22%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Demographics</CardTitle>
                <CardDescription>Other student characteristics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Special Education</div>
                    <div className="text-2xl font-bold mt-1">12%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "12%" }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">English Language Learners</div>
                    <div className="text-2xl font-bold mt-1">8%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "8%" }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Free/Reduced Lunch</div>
                    <div className="text-2xl font-bold mt-1">32%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "32%" }}></div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Gifted & Talented</div>
                    <div className="text-2xl font-bold mt-1">15%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "15%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
