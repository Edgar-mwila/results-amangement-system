

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BarChart, Download, FileText, Filter, LineChart, PieChart, TrendingDown, TrendingUp } from "lucide-react"
import { themeColors } from "./ui/theme-config"

export default function SubjectPerformance() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Subject Performance</h1>
          <p className="text-gray-500">Mathematics Department</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            Filter
          </Button>
          <Button
            className={`flex items-center gap-2 ${themeColors.secondaryBg} ${themeColors.secondaryHover} text-white`}
          >
            <Download size={16} />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Department Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.accentBg}`}>
                <BarChart className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">82.4%</div>
                <div className="flex items-center text-xs text-green-500">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  <span>+1.8% from last semester</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Highest Performing Course</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.secondaryBg}`}>
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">AP Calculus</div>
                <p className="text-xs text-gray-500">91.2% Average</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Lowest Performing Course</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-2 rounded-full p-2 bg-red-500">
                <TrendingDown className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">Algebra I</div>
                <p className="text-xs text-gray-500">74.5% Average</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pass Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.accentBg}`}>
                <PieChart className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">88%</div>
                <div className="flex items-center text-xs text-green-500">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  <span>+2% from last semester</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger
            value="overview"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="courses"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Courses
          </TabsTrigger>
          <TabsTrigger
            value="teachers"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Teachers
          </TabsTrigger>
          <TabsTrigger
            value="trends"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Performance by Course</CardTitle>
                <CardDescription>Average scores across different courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                  <BarChart className={`h-16 w-16 ${themeColors.accent}`} />
                  <span className="ml-2 text-gray-500">Course Performance Chart</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Overall grade distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                  <PieChart className={`h-16 w-16 ${themeColors.secondary}`} />
                  <span className="ml-2 text-gray-500">Grade Distribution Chart</span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${themeColors.accentBg} mr-2`}></div>
                      <span>A (90-100%)</span>
                    </div>
                    <span className="font-medium">22%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${themeColors.secondaryBg} mr-2`}></div>
                      <span>B (80-89%)</span>
                    </div>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-300 mr-2"></div>
                      <span>C (70-79%)</span>
                    </div>
                    <span className="font-medium">28%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                      <span>D (60-69%)</span>
                    </div>
                    <span className="font-medium">10%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span>F (Below 60%)</span>
                    </div>
                    <span className="font-medium">5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses">
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
                    <TableHead>Trend</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      course: "AP Calculus",
                      teacher: "Dr. James Wilson",
                      students: 28,
                      avg: "91.2%",
                      pass: "96%",
                      trend: "up",
                      status: "Excellent",
                    },
                    {
                      course: "Pre-Calculus",
                      teacher: "Ms. Sarah Johnson",
                      students: 32,
                      avg: "85.7%",
                      pass: "92%",
                      trend: "up",
                      status: "Very Good",
                    },
                    {
                      course: "Algebra II",
                      teacher: "Mr. Robert Chen",
                      students: 35,
                      avg: "82.3%",
                      pass: "88%",
                      trend: "stable",
                      status: "Good",
                    },
                    {
                      course: "Geometry",
                      teacher: "Ms. Emily Parker",
                      students: 38,
                      avg: "79.8%",
                      pass: "85%",
                      trend: "stable",
                      status: "Good",
                    },
                    {
                      course: "Algebra I",
                      teacher: "Mr. Michael Rodriguez",
                      students: 42,
                      avg: "74.5%",
                      pass: "78%",
                      trend: "down",
                      status: "Needs Improvement",
                    },
                  ].map((course, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{course.course}</TableCell>
                      <TableCell>{course.teacher}</TableCell>
                      <TableCell>{course.students}</TableCell>
                      <TableCell>{course.avg}</TableCell>
                      <TableCell>{course.pass}</TableCell>
                      <TableCell>
                        {course.trend === "up" ? (
                          <TrendingUp className="h-5 w-5 text-green-500" />
                        ) : course.trend === "down" ? (
                          <TrendingDown className="h-5 w-5 text-red-500" />
                        ) : (
                          <div className="h-0.5 w-5 bg-gray-400 my-3" />
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            course.status === "Excellent"
                              ? `${themeColors.accentBg} text-white`
                              : course.status === "Very Good"
                                ? `${themeColors.secondaryBg} text-white`
                                : course.status === "Good"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {course.status}
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
        </TabsContent>

        <TabsContent value="teachers">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Performance</CardTitle>
              <CardDescription>Performance metrics by teacher</CardDescription>
            </CardHeader>
            <CardContent>
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
                    <TableHead></TableHead>
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
                      <TableCell className="font-medium">{teacher.teacher}</TableCell>
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
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {teacher.status}
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
        </TabsContent>

        <TabsContent value="trends">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trend</CardTitle>
                <CardDescription>Department average over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                  <LineChart className={`h-16 w-16 ${themeColors.accent}`} />
                  <span className="ml-2 text-gray-500">Performance Trend Chart</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Topic Performance</CardTitle>
                <CardDescription>Performance by topic area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                  <BarChart className={`h-16 w-16 ${themeColors.secondary}`} />
                  <span className="ml-2 text-gray-500">Topic Performance Chart</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>Key observations and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className={`font-medium mb-2 ${themeColors.secondary}`}>Strengths</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>AP Calculus continues to be the highest performing course with a 91.2% average</li>
                <li>Overall department pass rate has increased by 2% from last semester</li>
                <li>Pre-Calculus has shown significant improvement with a 3.5% increase in average scores</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="font-medium mb-2 text-yellow-700">Areas for Improvement</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Algebra I continues to be the lowest performing course with a 74.5% average</li>
                <li>Significant gap between advanced and foundational courses</li>
                <li>Students struggle most with word problems and applications across all courses</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className={`font-medium mb-2 ${themeColors.accent}`}>Recommendations</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Implement additional support for Algebra I students through peer tutoring</li>
                <li>Develop targeted interventions for struggling students in foundational courses</li>
                <li>Share best practices from AP Calculus and Pre-Calculus teachers with department</li>
                <li>Increase focus on real-world applications and word problems across all courses</li>
                <li>Consider curriculum review for Algebra I to identify potential improvements</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
