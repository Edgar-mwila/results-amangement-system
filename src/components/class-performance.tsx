"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts"
import {
  TrendingUp,
  Users,
  BookOpen,
  Award,
  Calendar,
  AlertTriangle,
  BarChart2,
  PieChartIcon,
  Activity,
} from "lucide-react"
import { classData } from "@/data/class-data"

const GRADE_COLORS = {
  A: "#22c55e",
  "A-": "#4ade80",
  "B+": "#3b82f6",
  B: "#60a5fa",
  "B-": "#93c5fd",
  "C+": "#f59e0b",
  C: "#fbbf24",
  D: "#ef4444",
  F: "#b91c1c",
}

const ClassPerformanceAnalytics: React.FC<{classData: typeof classData}> = ({classData}) => {
  const [activeTab, setActiveTab] = useState("overview")

  // Calculate overall class statistics
  const classStats = useMemo(() => {
    // Get all test scores across all subjects
    const allScores: number[] = []
    const subjectAverages: Record<string, number> = {}
    const subjectTestCounts: Record<string, number> = {}

    classData.pastTests.forEach((test) => {
      // Add all scores to the array
      test.studentScores.forEach((score) => {
        allScores.push(score.score)
      })

      // Track subject averages
      if (!subjectAverages[test.subject]) {
        subjectAverages[test.subject] = 0
        subjectTestCounts[test.subject] = 0
      }
      subjectAverages[test.subject] += test.averageScore
      subjectTestCounts[test.subject] += 1
    })

    // Calculate final subject averages
    Object.keys(subjectAverages).forEach((subject) => {
      subjectAverages[subject] = subjectAverages[subject] / subjectTestCounts[subject]
    })

    // Sort subjects by average score (descending)
    const sortedSubjects = Object.entries(subjectAverages)
      .map(([subject, average]) => ({ subject, average }))
      .sort((a, b) => b.average - a.average)

    // Calculate overall average
    const overallAverage = allScores.reduce((sum, score) => sum + score, 0) / allScores.length

    // Calculate grade distribution
    const gradeDistribution = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      F: 0,
    }

    allScores.forEach((score) => {
      if (score >= 90) gradeDistribution["A"]++
      else if (score >= 80) gradeDistribution["B"]++
      else if (score >= 70) gradeDistribution["C"]++
      else if (score >= 60) gradeDistribution["D"]++
      else gradeDistribution["F"]++
    })

    // Calculate student performance
    const studentPerformance: Record<string, { scores: number[]; average: number }> = {}

    classData.pastTests.forEach((test) => {
      test.studentScores.forEach((score) => {
        if (!studentPerformance[score.student]) {
          studentPerformance[score.student] = { scores: [], average: 0 }
        }
        studentPerformance[score.student].scores.push(score.score)
      })
    })

    // Calculate student averages
    Object.keys(studentPerformance).forEach((student) => {
      const scores = studentPerformance[student].scores
      studentPerformance[student].average = scores.reduce((sum, score) => sum + score, 0) / scores.length
    })

    // Sort students by average score (descending)
    const sortedStudents = Object.entries(studentPerformance)
      .map(([student, data]) => ({
        student,
        average: data.average,
        scores: data.scores,
      }))
      .sort((a, b) => b.average - a.average)

    // Get top and bottom performers
    const topPerformers = sortedStudents.slice(0, 3)
    const bottomPerformers = sortedStudents.slice(-3).reverse()

    // Calculate test performance over time
    const testPerformanceOverTime = classData.pastTests
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((test) => ({
        name: test.name,
        subject: test.subject,
        date: test.date,
        average: test.averageScore,
      }))

    return {
      overallAverage,
      gradeDistribution,
      sortedSubjects,
      sortedStudents,
      topPerformers,
      bottomPerformers,
      testPerformanceOverTime,
      totalTests: classData.pastTests.length,
      totalStudents: classData.totalStudents,
    }
  }, [classData.pastTests, classData.totalStudents])

  // Calculate improvement areas
  const improvementAreas = useMemo(() => {
    const areas: Record<string, number> = {}

    classData.studentPerformance.forEach((student) => {
      student.improvementAreas.forEach((area) => {
        if (!areas[area]) {
          areas[area] = 0
        }
        areas[area]++
      })
    })

    return Object.entries(areas)
      .map(([area, count]) => ({ area, count }))
      .sort((a, b) => b.count - a.count)
  }, [classData.studentPerformance])

  return (
    <div className="container max-w-3/5 space-y-6 mt-5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#3D405B]">Class Performance Analytics</h1>
          <p className="text-gray-500 mt-1">Comprehensive analysis of {classData.name} performance</p>
        </div>

        <Button className="bg-green-500 hover:bg-green-600">Download Report</Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white shadow-md">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Overall Average</p>
                <p className="text-2xl font-semibold text-[#3D405B]">{classStats.overallAverage.toFixed(1)}%</p>
              </div>
              <div className="p-2 rounded-full bg-blue-100">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Across all subjects and tests</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Top Subject</p>
                <p className="text-2xl font-semibold text-[#3D405B]">
                  {classStats.sortedSubjects[0]?.subject || "N/A"}
                </p>
              </div>
              <div className="p-2 rounded-full bg-green-100">
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {classStats.sortedSubjects[0]?.average.toFixed(1)}% average score
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Top Student</p>
                <p className="text-2xl font-semibold text-[#3D405B]">{classStats.topPerformers[0]?.student || "N/A"}</p>
              </div>
              <div className="p-2 rounded-full bg-amber-100">
                <Award className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {classStats.topPerformers[0]?.average.toFixed(1)}% average score
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Tests Completed</p>
                <p className="text-2xl font-semibold text-[#3D405B]">{classStats.totalTests}</p>
              </div>
              <div className="p-2 rounded-full bg-purple-100">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Across {classStats.sortedSubjects.length} subjects</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
          <TabsTrigger value="students">Student Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Performance Trend Chart */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-[#3D405B] flex items-center">
                  <TrendingUp className="mr-2 text-[#3D405B]" />
                  Performance Trend
                </CardTitle>
                <CardDescription>Average scores over time across all subjects</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={classStats.testPerformanceOverTime}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="average"
                      stroke="#3b82f6"
                      name="Average Score"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Grade Distribution Chart */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-[#3D405B] flex items-center">
                  <PieChartIcon className="mr-2 text-[#3D405B]" />
                  Grade Distribution
                </CardTitle>
                <CardDescription>Distribution of grades across all tests</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={Object.entries(classStats.gradeDistribution).map(([grade, count]) => ({
                        name: grade,
                        value: count,
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {Object.entries(classStats.gradeDistribution).map(([grade], index) => (
                        <Cell
                          key={`cell-${grade}`}
                          fill={Object.values(GRADE_COLORS)[index % Object.values(GRADE_COLORS).length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subject Performance Comparison */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-[#3D405B] flex items-center">
                  <BookOpen className="mr-2 text-[#3D405B]" />
                  Subject Performance
                </CardTitle>
                <CardDescription>Average scores by subject</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={classStats.sortedSubjects.map((subject) => ({
                      name: subject.subject,
                      average: subject.average,
                    }))}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="average" name="Average Score" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Improvement Areas */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-[#3D405B] flex items-center">
                  <AlertTriangle className="mr-2 text-[#3D405B]" />
                  Improvement Areas
                </CardTitle>
                <CardDescription>Topics where students need the most improvement</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={improvementAreas.slice(0, 8).map((area) => ({
                      name: area.area,
                      count: area.count,
                    }))}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={120} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Number of Students" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top and Bottom Performers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-[#3D405B] flex items-center">
                  <Award className="mr-2 text-[#3D405B]" />
                  Top Performers
                </CardTitle>
                <CardDescription>Students with the highest average scores</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Average Score</TableHead>
                      <TableHead>Tests Taken</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classStats.topPerformers.map((student, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{student.student}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">{student.average.toFixed(1)}%</Badge>
                        </TableCell>
                        <TableCell>{student.scores.length}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-[#3D405B] flex items-center">
                  <AlertTriangle className="mr-2 text-[#3D405B]" />
                  Needs Improvement
                </CardTitle>
                <CardDescription>Students who need additional support</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Average Score</TableHead>
                      <TableHead>Improvement Areas</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classStats.bottomPerformers.map((student, index) => {
                      // Find student in studentPerformance data
                      const studentData = classData.studentPerformance.find((s) => s.name === student.student)

                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{student.student}</TableCell>
                          <TableCell>
                            <Badge className="bg-amber-500">{student.average.toFixed(1)}%</Badge>
                          </TableCell>
                          <TableCell>{studentData?.improvementAreas.join(", ") || "N/A"}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Key Insights */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-[#3D405B] flex items-center">
                <BarChart2 className="mr-2 text-[#3D405B]" />
                Key Insights and Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-[#3D405B] mb-1">Performance Summary</h3>
                <p className="text-gray-700">
                  {classStats.overallAverage >= 85
                    ? `Overall class performance is excellent with an average of ${classStats.overallAverage.toFixed(1)}%.`
                    : classStats.overallAverage >= 75
                      ? `Overall class performance is good with an average of ${classStats.overallAverage.toFixed(1)}%.`
                      : `Overall class performance needs improvement with an average of ${classStats.overallAverage.toFixed(1)}%.`}
                  {classStats.sortedSubjects[0] &&
                    ` The strongest subject is ${classStats.sortedSubjects[0].subject} with an average of ${classStats.sortedSubjects[0].average.toFixed(1)}%.`}
                  {classStats.sortedSubjects[classStats.sortedSubjects.length - 1] &&
                    ` The weakest subject is ${classStats.sortedSubjects[classStats.sortedSubjects.length - 1].subject} with an average of ${classStats.sortedSubjects[classStats.sortedSubjects.length - 1].average.toFixed(1)}%.`}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-[#3D405B] mb-1">Areas of Strength</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>
                    {classStats.topPerformers[0]?.student || "N/A"} has shown exceptional performance with an average of{" "}
                    {classStats.topPerformers[0]?.average.toFixed(1) || "N/A"}%.
                  </li>
                  {classStats.gradeDistribution["A"] > 0 && (
                    <li>{classStats.gradeDistribution["A"]} test scores achieved A grade level performance.</li>
                  )}
                  {classStats.sortedSubjects[0] && (
                    <li>
                      {classStats.sortedSubjects[0].subject} is the strongest subject with an average of{" "}
                      {classStats.sortedSubjects[0].average.toFixed(1)}%.
                    </li>
                  )}
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-[#3D405B] mb-1">Areas for Improvement</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  {improvementAreas.length > 0 && (
                    <li>
                      Focus on {improvementAreas[0].area} as {improvementAreas[0].count} students need improvement in
                      this area.
                    </li>
                  )}
                  {classStats.bottomPerformers.length > 0 && (
                    <li>
                      Provide additional support for {classStats.bottomPerformers.map((s) => s.student).join(", ")}.
                    </li>
                  )}
                  {classStats.sortedSubjects.length > 1 && (
                    <li>
                      {classStats.sortedSubjects[classStats.sortedSubjects.length - 1].subject} needs additional focus
                      with an average of{" "}
                      {classStats.sortedSubjects[classStats.sortedSubjects.length - 1].average.toFixed(1)}%.
                    </li>
                  )}
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-[#3D405B] mb-1">Recommendations</h3>
                <ul className="list-disc pl-5 text-gray-700">
                  {improvementAreas.length > 0 && (
                    <li>Organize targeted review sessions for {improvementAreas[0].area}.</li>
                  )}
                  {classStats.bottomPerformers.length > 0 && (
                    <li>Consider one-on-one tutoring for {classStats.bottomPerformers[0].student}.</li>
                  )}
                  {classStats.sortedSubjects.length > 1 && (
                    <li>
                      Allocate additional teaching resources to{" "}
                      {classStats.sortedSubjects[classStats.sortedSubjects.length - 1].subject}.
                    </li>
                  )}
                  <li>Recognize and celebrate the achievements of top performers to motivate other students.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          {/* Subject Performance Radar Chart */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-[#3D405B] flex items-center">
                <BookOpen className="mr-2 text-[#3D405B]" />
                Subject Performance Overview
              </CardTitle>
              <CardDescription>Comparative analysis of all subjects</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  outerRadius={150}
                  width={730}
                  height={350}
                  data={classStats.sortedSubjects.map((subject) => ({
                    subject: subject.subject,
                    average: subject.average,
                  }))}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Average Score" dataKey="average" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Subject Details Table */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-[#3D405B] flex items-center">
                <BookOpen className="mr-2 text-[#3D405B]" />
                Subject Details
              </CardTitle>
              <CardDescription>Detailed performance metrics for each subject</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Average Score</TableHead>
                    <TableHead>Tests Conducted</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Hours per Week</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classStats.sortedSubjects.map((subjectStat, index) => {
                    // Find subject in subjects data
                    const subjectData = classData.subjects.find((s) => s.name === subjectStat.subject)

                    // Count tests for this subject
                    const testCount = classData.pastTests.filter((test) => test.subject === subjectStat.subject).length

                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{subjectStat.subject}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              subjectStat.average >= 90
                                ? "bg-green-500"
                                : subjectStat.average >= 80
                                  ? "bg-blue-500"
                                  : subjectStat.average >= 70
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                            }
                          >
                            {subjectStat.average.toFixed(1)}%
                          </Badge>
                        </TableCell>
                        <TableCell>{testCount}</TableCell>
                        <TableCell>{subjectData?.teacher || "N/A"}</TableCell>
                        <TableCell>{subjectData?.hoursPerWeek || "N/A"}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Subject Test Performance */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-[#3D405B] flex items-center">
                <BarChart2 className="mr-2 text-[#3D405B]" />
                Test Performance by Subject
              </CardTitle>
              <CardDescription>Performance in individual tests grouped by subject</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={classData.pastTests.map((test) => ({
                    name: test.name,
                    subject: test.subject,
                    average: test.averageScore,
                    highest: test.highestScore,
                    lowest: test.lowestScore,
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="average" name="Average Score" fill="#3b82f6" />
                  <Bar dataKey="highest" name="Highest Score" fill="#22c55e" />
                  <Bar dataKey="lowest" name="Lowest Score" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Subject Correlation Analysis */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-[#3D405B] flex items-center">
                <Activity className="mr-2 text-[#3D405B]" />
                Subject Correlation Analysis
              </CardTitle>
              <CardDescription>Relationship between hours per week and performance</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid />
                  <XAxis type="number" dataKey="hours" name="Hours per Week" domain={[0, 10]} />
                  <YAxis type="number" dataKey="average" name="Average Score" domain={[0, 100]} />
                  <ZAxis range={[100, 500]} />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Legend />
                  <Scatter
                    name="Subjects"
                    data={classStats.sortedSubjects.map((subject) => {
                      const subjectData = classData.subjects.find((s) => s.name === subject.subject)
                      return {
                        subject: subject.subject,
                        hours: subjectData?.hoursPerWeek || 0,
                        average: subject.average,
                      }
                    })}
                    fill="#8884d8"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          {/* Student Performance Distribution */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-[#3D405B] flex items-center">
                <Users className="mr-2 text-[#3D405B]" />
                Student Performance Distribution
              </CardTitle>
              <CardDescription>Distribution of student average scores</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={classStats.sortedStudents.map((student) => ({
                    name: student.student,
                    average: student.average,
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="average" name="Average Score" fill="#3b82f6">
                    {classStats.sortedStudents.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index < 3 ? "#22c55e" : index >= classStats.sortedStudents.length - 3 ? "#ef4444" : "#3b82f6"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Student Performance by Subject */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-[#3D405B] flex items-center">
                <BookOpen className="mr-2 text-[#3D405B]" />
                Student Performance by Subject
              </CardTitle>
              <CardDescription>Comparative analysis of top students across subjects</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  outerRadius={150}
                  width={730}
                  height={350}
                  data={classData.subjects.map((subject) => {
                    // Find all tests for this subject
                    const tests = classData.pastTests.filter((test) => test.subject === subject.name)

                    // Calculate average score for each student in this subject
                    const studentScores: Record<string, { total: number; count: number }> = {}

                    tests.forEach((test) => {
                      test.studentScores.forEach((score) => {
                        if (!studentScores[score.student]) {
                          studentScores[score.student] = { total: 0, count: 0 }
                        }
                        studentScores[score.student].total += score.score
                        studentScores[score.student].count += 1
                      })
                    })

                    // Get top 3 students for this subject
                    const topStudents = Object.entries(studentScores)
                      .map(([student, data]) => ({
                        student,
                        average: data.total / data.count,
                      }))
                      .sort((a, b) => b.average - a.average)
                      .slice(0, 3)

                    return {
                      subject: subject.name,
                      student1: topStudents[0]?.average || 0,
                      student2: topStudents[1]?.average || 0,
                      student3: topStudents[2]?.average || 0,
                      student1Name: topStudents[0]?.student || "",
                      student2Name: topStudents[1]?.student || "",
                      student3Name: topStudents[2]?.student || "",
                    }
                  })}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Top Student" dataKey="student1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="2nd Best" dataKey="student2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Radar name="3rd Best" dataKey="student3" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                  <Legend />
                  <Tooltip
                    formatter={(value, name, props) => {
                      const dataKey =
                        name === "Top Student" ? "student1Name" : name === "2nd Best" ? "student2Name" : "student3Name"
                      const studentName = props.payload[dataKey]
                      return [`${value}% - ${studentName}`, name]
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Student List */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-[#3D405B] flex items-center">
                <Users className="mr-2 text-[#3D405B]" />
                Detailed Student Performance
              </CardTitle>
              <CardDescription>Complete breakdown of all student performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Average Score</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Improvement Areas</TableHead>
                    <TableHead>Tests Taken</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classStats.sortedStudents.map((student, index) => {
                    // Find student in studentPerformance data
                    const studentData = classData.studentPerformance.find((s) => s.name === student.student)

                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{student.student}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              student.average >= 90
                                ? "bg-green-500"
                                : student.average >= 80
                                  ? "bg-blue-500"
                                  : student.average >= 70
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                            }
                          >
                            {student.average.toFixed(1)}%
                          </Badge>
                        </TableCell>
                        <TableCell>{studentData?.overallGrade || "N/A"}</TableCell>
                        <TableCell>{studentData?.improvementAreas.join(", ") || "None"}</TableCell>
                        <TableCell>{student.scores.length}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Student Improvement Areas */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-[#3D405B] flex items-center">
                <AlertTriangle className="mr-2 text-[#3D405B]" />
                Student Improvement Areas
              </CardTitle>
              <CardDescription>Detailed breakdown of improvement areas by student</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Improvement Area</TableHead>
                    <TableHead>Number of Students</TableHead>
                    <TableHead>Students</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {improvementAreas.map((area, index) => {
                    // Find students with this improvement area
                    const students = classData.studentPerformance
                      .filter((student) => student.improvementAreas.includes(area.area))
                      .map((student) => student.name)

                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{area.area}</TableCell>
                        <TableCell>{area.count}</TableCell>
                        <TableCell>{students.join(", ")}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-[#3D405B] flex items-center">
            <BarChart2 className="mr-2 text-[#3D405B]" />
            Class Performance Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium text-[#3D405B] mb-1">Overall Assessment</h3>
            <p className="text-gray-700">
              {classData.name} demonstrates{" "}
              {classStats.overallAverage >= 85
                ? "excellent"
                : classStats.overallAverage >= 75
                  ? "good"
                  : classStats.overallAverage >= 65
                    ? "satisfactory"
                    : "concerning"}{" "}
              overall performance with an average score of {classStats.overallAverage.toFixed(1)}% across all subjects
              and tests. The class shows particular strength in {classStats.sortedSubjects[0]?.subject || "N/A"} and has
              opportunities for improvement in
              {classStats.sortedSubjects[classStats.sortedSubjects.length - 1]?.subject || "N/A"}.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-[#3D405B] mb-1">Student Performance</h3>
            <p className="text-gray-700">
              There is a{" "}
              {Math.abs(classStats.topPerformers[0]?.average - classStats.bottomPerformers[0]?.average) > 30
                ? "significant"
                : Math.abs(classStats.topPerformers[0]?.average - classStats.bottomPerformers[0]?.average) > 20
                  ? "moderate"
                  : "small"}{" "}
              performance gap between the top and bottom performing students.
              {classStats.topPerformers[0]?.student || "N/A"} leads the class with an average of{" "}
              {classStats.topPerformers[0]?.average.toFixed(1) || "N/A"}%, while{" "}
              {classStats.bottomPerformers[0]?.student || "N/A"} would benefit from additional support with an average
              of {classStats.bottomPerformers[0]?.average.toFixed(1) || "N/A"}%.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-[#3D405B] mb-1">Action Plan</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>
                Implement targeted interventions for students scoring below 70%, with particular focus on{" "}
                {classStats.bottomPerformers[0]?.student || "N/A"}.
              </li>
              <li>
                Organize review sessions for {improvementAreas[0]?.area || "common weak areas"}, which affects{" "}
                {improvementAreas[0]?.count || "several"} students.
              </li>
              <li>
                Review teaching strategies for{" "}
                {classStats.sortedSubjects[classStats.sortedSubjects.length - 1]?.subject || "weaker subjects"} to
                improve overall performance.
              </li>
              <li>
                Leverage peer learning by pairing high-performing students with those who need additional support.
              </li>
              <li>Recognize and celebrate the achievements of top performers to motivate the entire class.</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="bg-green-500 hover:bg-green-600">Generate Detailed Report</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ClassPerformanceAnalytics;