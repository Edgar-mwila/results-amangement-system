import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BarChart, CalendarIcon, Download, FileText, Filter, Plus, Search, SlidersHorizontal } from "lucide-react"
import { format } from "date-fns"
import { themeColors } from "./ui/theme-config"
import CreateTestDialog from "./create-test-dialog"
import EditTestDialog from "./edit-test-dialog"
import EnterResultsDialog from "./enter-results-dialog"
import TestStatisticsDialog from "./test-statistics-dialog"

export default function AssessmentsTab() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>()

  // Filter assessments based on search query
  const filteredAssessments = [
    {
      id: 1,
      title: "Midterm Exam",
      type: "Exam",
      date: "Mar 15, 2023",
      class: "Mathematics 101",
      avg: "76%",
      status: "Completed",
    },
    {
      id: 2,
      title: "Quadratic Equations",
      type: "Quiz",
      date: "Apr 5, 2023",
      class: "Mathematics 101",
      avg: "82%",
      status: "Completed",
    },
    {
      id: 3,
      title: "Polynomial Functions",
      type: "Assignment",
      date: "Apr 20, 2023",
      class: "Mathematics 101",
      avg: "88%",
      status: "Completed",
    },
    {
      id: 4,
      title: "Linear Algebra",
      type: "Project",
      date: "May 1, 2023",
      class: "Mathematics 101",
      avg: "79%",
      status: "In Progress",
    },
    {
      id: 5,
      title: "Final Exam",
      type: "Exam",
      date: "May 15, 2023",
      class: "Mathematics 101",
      avg: "N/A",
      status: "Scheduled",
    },
    {
      id: 6,
      title: "Cell Structure",
      type: "Quiz",
      date: "Mar 10, 2023",
      class: "Biology 101",
      avg: "81%",
      status: "Completed",
    },
    {
      id: 7,
      title: "Ecosystems",
      type: "Project",
      date: "Apr 12, 2023",
      class: "Biology 101",
      avg: "85%",
      status: "Completed",
    },
    {
      id: 8,
      title: "Photosynthesis",
      type: "Lab Report",
      date: "Apr 25, 2023",
      class: "Biology 101",
      avg: "83%",
      status: "Completed",
    },
    {
      id: 9,
      title: "Midterm Exam",
      type: "Exam",
      date: "Mar 18, 2023",
      class: "History 101",
      avg: "79%",
      status: "Completed",
    },
    {
      id: 10,
      title: "World War II Essay",
      type: "Assignment",
      date: "Apr 8, 2023",
      class: "History 101",
      avg: "84%",
      status: "Completed",
    },
  ].filter(
    (assessment) =>
      assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assessment.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assessment.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto p-2 sm:p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Assessments</h1>
          <p className="text-gray-500 text-sm">Manage and track student assessments</p>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none items-center gap-2 min-h-[44px]">
            <Download size={16} />
            Export
          </Button>
          <CreateTestDialog />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.accentBg}`}>
                <FileText className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-gray-500">This semester</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.secondaryBg}`}>
                <BarChart className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">81.3%</div>
                <p className="text-xs text-gray-500">+1.5% from last semester</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Upcoming</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.accentBg}`}>
                <CalendarIcon className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-gray-500">Next 7 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Needs Grading</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.secondaryBg}`}>
                <SlidersHorizontal className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-gray-500">Pending review</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="mb-4 sm:mb-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 mb-4 sm:mb-6">
          <TabsTrigger
            value="all"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="exams"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Exams
          </TabsTrigger>
          <TabsTrigger
            value="quizzes"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Quizzes
          </TabsTrigger>
          <TabsTrigger
            value="assignments"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Assignments
          </TabsTrigger>
          <TabsTrigger
            value="projects"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Projects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Assessment Management</CardTitle>
              <CardDescription className="text-sm">View and manage all assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search assessments..."
                    className="pl-8 h-12 rounded-xl"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Select>
                    <SelectTrigger className="w-full sm:w-[180px] h-12 rounded-xl">
                      <SelectValue placeholder="All Classes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="math">Mathematics 101</SelectItem>
                      <SelectItem value="biology">Biology 101</SelectItem>
                      <SelectItem value="history">History 101</SelectItem>
                      <SelectItem value="english">English 101</SelectItem>
                    </SelectContent>
                  </Select>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2 h-12 rounded-xl w-full sm:w-auto">
                        <CalendarIcon size={16} />
                        {selectedDate ? format(selectedDate, "PPP") : "Date Range"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <Button variant="outline" className="flex items-center gap-2 h-12 rounded-xl w-full sm:w-auto">
                    <Filter size={16} />
                    Filters
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assessment</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Average</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssessments.map((assessment) => (
                      <TableRow key={assessment.id}>
                        <TableCell className="font-medium">{assessment.title}</TableCell>
                        <TableCell>{assessment.type}</TableCell>
                        <TableCell>{assessment.date}</TableCell>
                        <TableCell>{assessment.class}</TableCell>
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
                          <div className="flex items-center gap-2">
                            {assessment.status === "Completed" && <TestStatisticsDialog />}
                            {assessment.status === "In Progress" && <EnterResultsDialog />}
                            <EditTestDialog />
                            <Button variant="ghost" size="sm">
                              <FileText size={16} className="mr-2" />
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exams">
          <Card>
            <CardHeader>
              <CardTitle>Exams</CardTitle>
              <CardDescription>Major assessments and examinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-500">Showing 3 exams</div>
                <Button className={`${themeColors.accentBg} ${themeColors.accentHover} text-white`}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Exam
                </Button>
              </div>

              <div className="space-y-4">
                {filteredAssessments
                  .filter((assessment) => assessment.type === "Exam")
                  .map((exam) => (
                    <div key={exam.id} className="p-4 border rounded-lg">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h3 className="font-medium text-lg">{exam.title}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-500">{exam.class}</span>
                            <span className="text-sm text-gray-500">{exam.date}</span>
                            <Badge
                              className={
                                exam.status === "Completed"
                                  ? `${themeColors.accentBg} text-white`
                                  : exam.status === "In Progress"
                                    ? `${themeColors.secondaryBg} text-white`
                                    : "bg-gray-100 text-gray-800"
                              }
                            >
                              {exam.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3 md:mt-0">
                          {exam.status === "Completed" && <TestStatisticsDialog />}
                          {exam.status === "In Progress" && <EnterResultsDialog />}
                          <EditTestDialog />
                          <Button variant="outline" size="sm">
                            <FileText size={16} className="mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                      {exam.status === "Completed" && (
                        <div className="mt-4">
                          <div className="text-sm font-medium">Class Average: {exam.avg}</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className={`${themeColors.accentBg} h-2 rounded-full`}
                              style={{ width: exam.avg !== "N/A" ? exam.avg : "0%" }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quizzes">
          <Card>
            <CardHeader>
              <CardTitle>Quizzes</CardTitle>
              <CardDescription>Short assessments and knowledge checks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-500">Showing 2 quizzes</div>
                <Button className={`${themeColors.accentBg} ${themeColors.accentHover} text-white`}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Quiz
                </Button>
              </div>

              <div className="space-y-4">
                {filteredAssessments
                  .filter((assessment) => assessment.type === "Quiz")
                  .map((quiz) => (
                    <div key={quiz.id} className="p-4 border rounded-lg">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h3 className="font-medium text-lg">{quiz.title}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-500">{quiz.class}</span>
                            <span className="text-sm text-gray-500">{quiz.date}</span>
                            <Badge
                              className={
                                quiz.status === "Completed"
                                  ? `${themeColors.accentBg} text-white`
                                  : quiz.status === "In Progress"
                                    ? `${themeColors.secondaryBg} text-white`
                                    : "bg-gray-100 text-gray-800"
                              }
                            >
                              {quiz.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3 md:mt-0">
                          {quiz.status === "Completed" && <TestStatisticsDialog />}
                          {quiz.status === "In Progress" && <EnterResultsDialog />}
                          <EditTestDialog />
                          <Button variant="outline" size="sm">
                            <FileText size={16} className="mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                      {quiz.status === "Completed" && (
                        <div className="mt-4">
                          <div className="text-sm font-medium">Class Average: {quiz.avg}</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className={`${themeColors.accentBg} h-2 rounded-full`}
                              style={{ width: quiz.avg !== "N/A" ? quiz.avg : "0%" }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments">
          <Card>
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
              <CardDescription>Homework and in-class assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-500">Showing 3 assignments</div>
                <Button className={`${themeColors.accentBg} ${themeColors.accentHover} text-white`}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Assignment
                </Button>
              </div>

              <div className="space-y-4">
                {filteredAssessments
                  .filter((assessment) => assessment.type === "Assignment")
                  .map((assignment) => (
                    <div key={assignment.id} className="p-4 border rounded-lg">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h3 className="font-medium text-lg">{assignment.title}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-500">{assignment.class}</span>
                            <span className="text-sm text-gray-500">{assignment.date}</span>
                            <Badge
                              className={
                                assignment.status === "Completed"
                                  ? `${themeColors.accentBg} text-white`
                                  : assignment.status === "In Progress"
                                    ? `${themeColors.secondaryBg} text-white`
                                    : "bg-gray-100 text-gray-800"
                              }
                            >
                              {assignment.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3 md:mt-0">
                          {assignment.status === "Completed" && <TestStatisticsDialog />}
                          {assignment.status === "In Progress" && <EnterResultsDialog />}
                          <EditTestDialog />
                          <Button variant="outline" size="sm">
                            <FileText size={16} className="mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                      {assignment.status === "Completed" && (
                        <div className="mt-4">
                          <div className="text-sm font-medium">Class Average: {assignment.avg}</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className={`${themeColors.accentBg} h-2 rounded-full`}
                              style={{ width: assignment.avg !== "N/A" ? assignment.avg : "0%" }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Long-term student projects and presentations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-500">Showing 2 projects</div>
                <Button className={`${themeColors.accentBg} ${themeColors.accentHover} text-white`}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </div>

              <div className="space-y-4">
                {filteredAssessments
                  .filter((assessment) => assessment.type === "Project")
                  .map((project) => (
                    <div key={project.id} className="p-4 border rounded-lg">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h3 className="font-medium text-lg">{project.title}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-500">{project.class}</span>
                            <span className="text-sm text-gray-500">{project.date}</span>
                            <Badge
                              className={
                                project.status === "Completed"
                                  ? `${themeColors.accentBg} text-white`
                                  : project.status === "In Progress"
                                    ? `${themeColors.secondaryBg} text-white`
                                    : "bg-gray-100 text-gray-800"
                              }
                            >
                              {project.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3 md:mt-0">
                          {project.status === "Completed" && <TestStatisticsDialog />}
                          {project.status === "In Progress" && <EnterResultsDialog />}
                          <EditTestDialog />
                          <Button variant="outline" size="sm">
                            <FileText size={16} className="mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                      {project.status === "Completed" && (
                        <div className="mt-4">
                          <div className="text-sm font-medium">Class Average: {project.avg}</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className={`${themeColors.accentBg} h-2 rounded-full`}
                              style={{ width: project.avg !== "N/A" ? project.avg : "0%" }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assessments</CardTitle>
            <CardDescription>Scheduled for the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAssessments
                .filter((assessment) => assessment.status === "Scheduled")
                .map((upcoming) => (
                  <div key={upcoming.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{upcoming.title}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-500">{upcoming.class}</span>
                          <span className="text-sm text-gray-500">{upcoming.date}</span>
                          <span className="text-sm text-gray-500">{upcoming.type}</span>
                        </div>
                      </div>
                      <Badge className="bg-gray-100 text-gray-800">{upcoming.status}</Badge>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <EditTestDialog />
                      <Button variant="outline" size="sm">
                        <FileText size={16} className="mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assessment Statistics</CardTitle>
            <CardDescription>Performance metrics by assessment type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-md mb-6">
              <BarChart className={`h-10 w-10 ${themeColors.accent}`} />
              <span className="ml-2 text-gray-500">Assessment Performance Chart</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Exams</span>
                  <span className="font-medium">77.5% Average</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "77.5%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span>Quizzes</span>
                  <span className="font-medium">81.5% Average</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "81.5%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span>Assignments</span>
                  <span className="font-medium">86% Average</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "86%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span>Projects</span>
                  <span className="font-medium">82% Average</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "82%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
