

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  Download,
  FileText,
  Filter,
  LineChart,
  PieChart,
  RefreshCw,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
import { themeColors } from "./ui/theme-config"

export default function ClassPerformance() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Class Performance</h1>
          <p className="text-gray-500">Mathematics 101 - Advanced Algebra</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw size={16} />
            Refresh
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
            <CardTitle className="text-sm font-medium text-gray-500">Class Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.accentBg}`}>
                <BarChart className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">78.5%</div>
                <div className="flex items-center text-xs text-green-500">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  <span>+2.5% from last semester</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Highest Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.secondaryBg}`}>
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">96%</div>
                <p className="text-xs text-gray-500">Emma Thompson</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Lowest Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-2 rounded-full p-2 bg-red-500">
                <TrendingDown className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">52%</div>
                <p className="text-xs text-gray-500">Alex Rodriguez</p>
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
                <div className="text-2xl font-bold">85%</div>
                <div className="flex items-center text-xs text-green-500">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  <span>+5% from last semester</span>
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
            value="assessments"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Assessments
          </TabsTrigger>
          <TabsTrigger
            value="students"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Students
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
                <CardTitle>Performance Distribution</CardTitle>
                <CardDescription>Overall class performance distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                  <BarChart className={`h-16 w-16 ${themeColors.accent}`} />
                  <span className="ml-2 text-gray-500">Performance Distribution Chart</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Number of students per grade</CardDescription>
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
                    <span className="font-medium">6 students</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${themeColors.secondaryBg} mr-2`}></div>
                      <span>B (80-89%)</span>
                    </div>
                    <span className="font-medium">10 students</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-300 mr-2"></div>
                      <span>C (70-79%)</span>
                    </div>
                    <span className="font-medium">8 students</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                      <span>D (60-69%)</span>
                    </div>
                    <span className="font-medium">5 students</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span>F (Below 60%)</span>
                    </div>
                    <span className="font-medium">3 students</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assessments">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Performance</CardTitle>
              <CardDescription>Performance across different assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assessment</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Average</TableHead>
                    <TableHead>Highest</TableHead>
                    <TableHead>Lowest</TableHead>
                    <TableHead>Pass Rate</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "Midterm Exam",
                      type: "Exam",
                      date: "Mar 15, 2023",
                      avg: "76%",
                      high: "94%",
                      low: "52%",
                      pass: "82%",
                    },
                    {
                      name: "Quadratic Equations",
                      type: "Quiz",
                      date: "Apr 5, 2023",
                      avg: "82%",
                      high: "100%",
                      low: "65%",
                      pass: "90%",
                    },
                    {
                      name: "Polynomial Functions",
                      type: "Assignment",
                      date: "Apr 20, 2023",
                      avg: "88%",
                      high: "98%",
                      low: "70%",
                      pass: "100%",
                    },
                    {
                      name: "Linear Algebra",
                      type: "Project",
                      date: "May 1, 2023",
                      avg: "79%",
                      high: "96%",
                      low: "60%",
                      pass: "85%",
                    },
                    {
                      name: "Final Exam",
                      type: "Exam",
                      date: "May 15, 2023",
                      avg: "N/A",
                      high: "N/A",
                      low: "N/A",
                      pass: "N/A",
                    },
                  ].map((assessment, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{assessment.name}</TableCell>
                      <TableCell>{assessment.type}</TableCell>
                      <TableCell>{assessment.date}</TableCell>
                      <TableCell>{assessment.avg}</TableCell>
                      <TableCell className="text-green-500">{assessment.high}</TableCell>
                      <TableCell className="text-red-500">{assessment.low}</TableCell>
                      <TableCell>{assessment.pass}</TableCell>
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

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Performance</CardTitle>
              <CardDescription>Individual student performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Overall Average</TableHead>
                    <TableHead>Midterm</TableHead>
                    <TableHead>Quizzes</TableHead>
                    <TableHead>Assignments</TableHead>
                    <TableHead>Projects</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "Emma Thompson",
                      id: "ST10023",
                      avg: "92%",
                      midterm: "94%",
                      quizzes: "95%",
                      assignments: "90%",
                      projects: "92%",
                      trend: "up",
                    },
                    {
                      name: "James Wilson",
                      id: "ST10045",
                      avg: "78%",
                      midterm: "75%",
                      quizzes: "80%",
                      assignments: "82%",
                      projects: "75%",
                      trend: "stable",
                    },
                    {
                      name: "Sophia Garcia",
                      id: "ST10067",
                      avg: "65%",
                      midterm: "62%",
                      quizzes: "68%",
                      assignments: "70%",
                      projects: "60%",
                      trend: "up",
                    },
                    {
                      name: "Liam Johnson",
                      id: "ST10089",
                      avg: "88%",
                      midterm: "85%",
                      quizzes: "90%",
                      assignments: "92%",
                      projects: "85%",
                      trend: "up",
                    },
                    {
                      name: "Olivia Martinez",
                      id: "ST10012",
                      avg: "72%",
                      midterm: "75%",
                      quizzes: "70%",
                      assignments: "75%",
                      projects: "68%",
                      trend: "down",
                    },
                  ].map((student, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.id}</TableCell>
                      <TableCell className="font-medium">{student.avg}</TableCell>
                      <TableCell>{student.midterm}</TableCell>
                      <TableCell>{student.quizzes}</TableCell>
                      <TableCell>{student.assignments}</TableCell>
                      <TableCell>{student.projects}</TableCell>
                      <TableCell>
                        {student.trend === "up" ? (
                          <TrendingUp className="h-5 w-5 text-green-500" />
                        ) : student.trend === "down" ? (
                          <TrendingDown className="h-5 w-5 text-red-500" />
                        ) : (
                          <div className="h-0.5 w-5 bg-gray-400 my-3" />
                        )}
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
                <CardDescription>Class average over time</CardDescription>
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
                <li>Strong performance in Polynomial Functions (88% average)</li>
                <li>High pass rate across all assessments (85% overall)</li>
                <li>Six students consistently performing at A level (90%+)</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="font-medium mb-2 text-yellow-700">Areas for Improvement</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Lower performance on Midterm Exam (76% average)</li>
                <li>Three students at risk of failing (below 60%)</li>
                <li>Linear Algebra concepts need reinforcement</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className={`font-medium mb-2 ${themeColors.accent}`}>Recommendations</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Provide additional support for struggling students</li>
                <li>Review Midterm Exam topics before Final Exam</li>
                <li>Implement peer tutoring for Linear Algebra concepts</li>
                <li>Offer extra credit opportunities for at-risk students</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
