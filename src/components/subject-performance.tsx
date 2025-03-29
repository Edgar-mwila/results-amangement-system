import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
} from "recharts"
import {
  BookOpen,
  TrendingUp,
  Users,
  Award,
  AlertTriangle,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react"
import { classData } from "@/data/class-data"

const GRADE_COLORS = {
  A: "#22c55e", // green-500
  "A-": "#4ade80", // green-400
  "B+": "#3b82f6", // blue-500
  B: "#60a5fa", // blue-400
  "B-": "#93c5fd", // blue-300
  "C+": "#f59e0b", // amber-500
  C: "#fbbf24", // amber-400
  D: "#ef4444", // red-500
  F: "#b91c1c", // red-700
}

export const SubjectPerformance: React.FC<{subjectId: string}> = ({subjectId}) => {
  // Default to first subject if none is specified
  const [selectedSubjectId, setSelectedSubjectId] = useState<number>(
    subjectId ? Number.parseInt(subjectId as string) : 1,
  )

  const [activeTab, setActiveTab] = useState("overview")

  // Get the selected subject
  const selectedSubject = useMemo(() => {
    return classData.subjects.find((subject) => subject.id === selectedSubjectId) || classData.subjects[0]
  }, [selectedSubjectId])

  // Get all tests for the selected subject
  const subjectTests = useMemo(() => {
    return classData.pastTests.filter((test) => test.subject === selectedSubject.name)
  }, [selectedSubject])

  // Calculate overall statistics for the subject
  const subjectStats = useMemo(() => {
    if (subjectTests.length === 0) return null

    const averageScores = subjectTests.map((test) => test.averageScore)
    const overallAverage = averageScores.reduce((sum, score) => sum + score, 0) / averageScores.length

    // Calculate trend (is the performance improving?)
    const sortedTests = [...subjectTests].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const firstTest = sortedTests[0]
    const lastTest = sortedTests[sortedTests.length - 1]
    const trend = lastTest.averageScore - firstTest.averageScore

    // Calculate student performance consistency
    const studentPerformance: Record<string, number[]> = {}

    subjectTests.forEach((test) => {
      test.studentScores.forEach((score) => {
        if (!studentPerformance[score.student]) {
          studentPerformance[score.student] = []
        }
        studentPerformance[score.student].push(score.score)
      })
    })

    // Calculate standard deviation for each student to measure consistency
    const studentConsistency = Object.entries(studentPerformance).map(([student, scores]) => {
      const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length
      const squaredDiffs = scores.map((score) => Math.pow(score - mean, 2))
      const variance = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / scores.length
      const stdDev = Math.sqrt(variance)

      return {
        student,
        mean,
        stdDev,
        scores,
      }
    })

    // Sort by mean score (descending)
    studentConsistency.sort((a, b) => b.mean - a.mean)

    // Get top and bottom performers
    const topPerformers = studentConsistency.slice(0, 3)
    const bottomPerformers = studentConsistency.slice(-3).reverse()

    // Calculate grade distribution
    const gradeDistribution = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      F: 0,
    }

    studentConsistency.forEach((student) => {
      const avgScore = student.mean
      if (avgScore >= 90) gradeDistribution["A"]++
      else if (avgScore >= 80) gradeDistribution["B"]++
      else if (avgScore >= 70) gradeDistribution["C"]++
      else if (avgScore >= 60) gradeDistribution["D"]++
      else gradeDistribution["F"]++
    })

    return {
      totalTests: subjectTests.length,
      overallAverage,
      trend,
      topPerformers,
      bottomPerformers,
      studentConsistency,
      gradeDistribution,
      sortedTests,
    }
  }, [subjectTests])

  // Calculate performance by topic (using improvement areas as proxy)
  const topicPerformance = useMemo(() => {
    const topics: Record<string, { count: number; students: string[] }> = {}

    classData.studentPerformance.forEach((student) => {
      student.improvementAreas.forEach((area) => {
        if (!topics[area]) {
          topics[area] = { count: 0, students: [] }
        }
        topics[area].count++
        topics[area].students.push(student.name)
      })
    })

    return Object.entries(topics)
      .map(([topic, data]) => ({
        topic,
        count: data.count,
        students: data.students,
      }))
      .sort((a, b) => b.count - a.count)
  }, [])

  // Handle subject change
  const handleSubjectChange = (value: string) => {
    setSelectedSubjectId(Number.parseInt(value))
  }

  if (!subjectStats) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Subject Performance Analysis</h1>
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <p className="text-lg text-gray-500">No test data available for this subject.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#3D405B]">Subject Performance Analysis</h1>
          <p className="text-gray-500 mt-1">Detailed analytics and insights for subject performance</p>
        </div>

        <div className="w-full md:w-64">
          <Select value={selectedSubjectId.toString()} onValueChange={handleSubjectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {classData.subjects.map((subject) => (
                <SelectItem key={subject.id} value={subject.id.toString()}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="bg-white shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-[#3D405B]">
            {selectedSubject.name}
            <Badge className="ml-2 bg-[#3D405B]">{selectedSubject.code}</Badge>
          </CardTitle>
          <CardDescription>
            Teacher: {selectedSubject.teacher} • {selectedSubject.examinationType}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">{selectedSubject.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <Card className="bg-gray-50">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Average Score</p>
                    <p className="text-2xl font-semibold text-[#3D405B]">{subjectStats.overallAverage.toFixed(1)}%</p>
                  </div>
                  <div className={`p-2 rounded-full ${subjectStats.trend >= 0 ? "bg-green-100" : "bg-red-100"}`}>
                    {subjectStats.trend >= 0 ? (
                      <ArrowUpRight className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {subjectStats.trend >= 0
                    ? `↑ ${subjectStats.trend.toFixed(1)}% improvement`
                    : `↓ ${Math.abs(subjectStats.trend).toFixed(1)}% decline`}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Total Tests</p>
                    <p className="text-2xl font-semibold text-[#3D405B]">{subjectStats.totalTests}</p>
                  </div>
                  <div className="p-2 rounded-full bg-blue-100">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{subjectTests[subjectTests.length - 1].date} (latest)</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Top Student</p>
                    <p className="text-2xl font-semibold text-[#3D405B]">
                      {subjectStats.topPerformers[0]?.student || "N/A"}
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-green-100">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {subjectStats.topPerformers[0]?.mean.toFixed(1)}% average score
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-50">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Hours per Week</p>
                    <p className="text-2xl font-semibold text-[#3D405B]">{selectedSubject.hoursPerWeek}</p>
                  </div>
                  <div className="p-2 rounded-full bg-purple-100">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {((selectedSubject.hoursPerWeek / 40) * 100).toFixed(0)}% of weekly schedule
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Student Analysis</TabsTrigger>
          <TabsTrigger value="tests">Test Analysis</TabsTrigger>
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
                <CardDescription>Average scores over time for {selectedSubject.name}</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={subjectStats.sortedTests.map((test) => ({
                      name: test.name,
                      date: test.date,
                      average: test.averageScore,
                      highest: test.highestScore,
                      lowest: test.lowestScore,
                    }))}
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
                    <Line
                      type="monotone"
                      dataKey="highest"
                      stroke="#22c55e"
                      name="Highest Score"
                      strokeDasharray="5 5"
                    />
                    <Line type="monotone" dataKey="lowest" stroke="#ef4444" name="Lowest Score" strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Grade Distribution Chart */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-[#3D405B] flex items-center">
                  <Award className="mr-2 text-[#3D405B]" />
                  Grade Distribution
                </CardTitle>
                <CardDescription>Distribution of grades across all tests</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={Object.entries(subjectStats.gradeDistribution).map(([grade, count]) => ({
                        name: grade,
                        value: count,
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }: {name: string, percent: number}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {Object.entries(subjectStats.gradeDistribution).map(([grade], index) => (
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
            {/* Top Performers */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-[#3D405B] flex items-center">
                  <Users className="mr-2 text-[#3D405B]" />
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
                      <TableHead>Consistency</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subjectStats.topPerformers.map((student, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{student.student}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500">{student.mean.toFixed(1)}%</Badge>
                        </TableCell>
                        <TableCell>
                          {student.stdDev < 5
                            ? "Very Consistent"
                            : student.stdDev < 10
                              ? "Consistent"
                              : student.stdDev < 15
                                ? "Somewhat Consistent"
                                : "Inconsistent"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Improvement Needed */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-[#3D405B] flex items-center">
                  <AlertTriangle className="mr-2 text-[#3D405B]" />
                  Improvement Needed
                </CardTitle>
                <CardDescription>Students who need additional support</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Average Score</TableHead>
                      <TableHead>Trend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subjectStats.bottomPerformers.map((student, index) => {
                      // Calculate trend for this student
                      const firstScore = student.scores[0] || 0
                      const lastScore = student.scores[student.scores.length - 1] || 0
                      const trend = lastScore - firstScore

                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{student.student}</TableCell>
                          <TableCell>
                            <Badge className="bg-amber-500">{student.mean.toFixed(1)}%</Badge>
                          </TableCell>
                          <TableCell>
                            <span className={trend >= 0 ? "text-green-500" : "text-red-500"}>
                              {trend >= 0 ? "↑" : "↓"} {Math.abs(trend).toFixed(1)}%
                            </span>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Topic Analysis */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-[#3D405B] flex items-center">
                <BookOpen className="mr-2 text-[#3D405B]" />
                Topic Analysis
              </CardTitle>
              <CardDescription>Areas where students need the most improvement</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topicPerformance.slice(0, 6).map((topic) => ({
                    name: topic.topic,
                    count: topic.count,
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Number of Students" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          {/* Student Performance Comparison */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-[#3D405B] flex items-center">
                <Users className="mr-2 text-[#3D405B]" />
                Student Performance Comparison
              </CardTitle>
              <CardDescription>Average scores for all students across tests</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subjectStats.studentConsistency.map((student) => ({
                    name: student.student,
                    average: student.mean,
                    stdDev: student.stdDev,
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

          {/* Student Consistency Analysis */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-[#3D405B] flex items-center">
                <TrendingUp className="mr-2 text-[#3D405B]" />
                Student Consistency Analysis
              </CardTitle>
              <CardDescription>Standard deviation of scores (lower is more consistent)</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subjectStats.studentConsistency.map((student) => ({
                    name: student.student,
                    stdDev: student.stdDev,
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="stdDev" name="Standard Deviation" fill="#f59e0b" />
                </BarChart>
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
              <CardDescription>Complete breakdown of all student scores</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Average</TableHead>
                    {subjectTests.map((test) => (
                      <TableHead key={test.id}>{test.name}</TableHead>
                    ))}
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjectStats.studentConsistency.map((student, index) => {
                    // Get all scores for this student across tests
                    const testScores: Record<number, number> = {}

                    subjectTests.forEach((test) => {
                      const scoreObj = test.studentScores.find((score) => score.student === student.student)
                      if (scoreObj) {
                        testScores[test.id] = scoreObj.score
                      }
                    })

                    // Calculate trend
                    const sortedTests = [...subjectTests].sort(
                      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
                    )

                    const firstTestId = sortedTests[0]?.id
                    const lastTestId = sortedTests[sortedTests.length - 1]?.id

                    const firstScore = testScores[firstTestId] || 0
                    const lastScore = testScores[lastTestId] || 0
                    const trend = lastScore - firstScore

                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{student.student}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              student.mean >= 90
                                ? "bg-green-500"
                                : student.mean >= 80
                                  ? "bg-blue-500"
                                  : student.mean >= 70
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                            }
                          >
                            {student.mean.toFixed(1)}%
                          </Badge>
                        </TableCell>

                        {subjectTests.map((test) => (
                          <TableCell key={test.id}>
                            {testScores[test.id] !== undefined ? (
                              <span
                                className={
                                  testScores[test.id] >= 90
                                    ? "text-green-500"
                                    : testScores[test.id] >= 80
                                      ? "text-blue-500"
                                      : testScores[test.id] >= 70
                                        ? "text-amber-500"
                                        : "text-red-500"
                                }
                              >
                                {testScores[test.id]}%
                              </span>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </TableCell>
                        ))}

                        <TableCell>
                          <span className={trend >= 0 ? "text-green-500" : "text-red-500"}>
                            {trend >= 0 ? "↑" : "↓"} {Math.abs(trend).toFixed(1)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tests" className="space-y-6">
          {/* Test Comparison */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-[#3D405B] flex items-center">
                <Calendar className="mr-2 text-[#3D405B]" />
                Test Comparison
              </CardTitle>
              <CardDescription>Comparison of average scores across all tests</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subjectTests.map((test) => ({
                    name: test.name,
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

          {/* Test Details */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-[#3D405B] flex items-center">
                <BookOpen className="mr-2 text-[#3D405B]" />
                Test Details
              </CardTitle>
              <CardDescription>Detailed statistics for each test</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Average</TableHead>
                    <TableHead>Median</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead>Best Student</TableHead>
                    <TableHead>Needs Improvement</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjectTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium">{test.name}</TableCell>
                      <TableCell>{test.date}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            test.averageScore >= 90
                              ? "bg-green-500"
                              : test.averageScore >= 80
                                ? "bg-blue-500"
                                : test.averageScore >= 70
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                          }
                        >
                          {test.averageScore}%
                        </Badge>
                      </TableCell>
                      <TableCell>{test.median}%</TableCell>
                      <TableCell>{test.mode}%</TableCell>
                      <TableCell>
                        {test.bestStudent} ({test.highestScore}%)
                      </TableCell>
                      <TableCell>
                        {test.worstStudent} ({test.lowestScore}%)
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Score Distribution */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-[#3D405B] flex items-center">
                <TrendingUp className="mr-2 text-[#3D405B]" />
                Score Distribution Analysis
              </CardTitle>
              <CardDescription>Distribution of scores across different ranges</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subjectTests.map((test) => {
                    // Calculate score distribution
                    const ranges = {
                      "90-100": 0,
                      "80-89": 0,
                      "70-79": 0,
                      "60-69": 0,
                      "Below 60": 0,
                    }

                    test.studentScores.forEach((score) => {
                      if (score.score >= 90) ranges["90-100"]++
                      else if (score.score >= 80) ranges["80-89"]++
                      else if (score.score >= 70) ranges["70-79"]++
                      else if (score.score >= 60) ranges["60-69"]++
                      else ranges["Below 60"]++
                    })

                    return {
                      name: test.name,
                      ...ranges,
                    }
                  })}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="90-100" name="90-100%" stackId="a" fill="#22c55e" />
                  <Bar dataKey="80-89" name="80-89%" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="70-79" name="70-79%" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="60-69" name="60-69%" stackId="a" fill="#f97316" />
                  <Bar dataKey="Below 60" name="Below 60%" stackId="a" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-[#3D405B] flex items-center">
            <BookOpen className="mr-2 text-[#3D405B]" />
            Key Insights and Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium text-[#3D405B] mb-1">Performance Summary</h3>
            <p className="text-gray-700">
              {subjectStats.overallAverage >= 85
                ? `Overall performance in ${selectedSubject.name} is excellent with an average of ${subjectStats.overallAverage.toFixed(1)}%.`
                : subjectStats.overallAverage >= 75
                  ? `Overall performance in ${selectedSubject.name} is good with an average of ${subjectStats.overallAverage.toFixed(1)}%.`
                  : `Overall performance in ${selectedSubject.name} needs improvement with an average of ${subjectStats.overallAverage.toFixed(1)}%.`}
              {subjectStats.trend >= 0
                ? ` There has been a positive trend with a ${subjectStats.trend.toFixed(1)}% improvement over time.`
                : ` There has been a negative trend with a ${Math.abs(subjectStats.trend).toFixed(1)}% decline over time.`}
            </p>
          </div>

          <div>
            <h3 className="font-medium text-[#3D405B] mb-1">Areas of Strength</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>
                {subjectStats.topPerformers[0]?.student || "N/A"} has shown exceptional performance with an average of{" "}
                {subjectStats.topPerformers[0]?.mean.toFixed(1) || "N/A"}%.
              </li>
              {subjectStats.gradeDistribution["A"] > 0 && (
                <li>{subjectStats.gradeDistribution["A"]} students consistently achieve A grades.</li>
              )}
              {subjectStats.trend >= 5 && (
                <li>
                  Strong improvement trend of {subjectStats.trend.toFixed(1)}% indicates effective teaching methods.
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-[#3D405B] mb-1">Areas for Improvement</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {topicPerformance.length > 0 && (
                <li>
                  Focus on {topicPerformance[0].topic} as {topicPerformance[0].count} students need improvement in this
                  area.
                </li>
              )}
              {subjectStats.bottomPerformers.length > 0 && (
                <li>
                  Provide additional support for {subjectStats.bottomPerformers.map((s) => s.student).join(", ")}.
                </li>
              )}
              {subjectStats.trend < 0 && (
                <li>
                  Address the declining trend of {Math.abs(subjectStats.trend).toFixed(1)}% by reviewing teaching
                  strategies.
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-[#3D405B] mb-1">Recommendations</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>
                {topicPerformance.length > 0
                  ? `Organize targeted review sessions for ${topicPerformance[0].topic}.`
                  : "Continue with the current teaching approach as it appears effective."}
              </li>
              <li>
                {subjectStats.bottomPerformers.length > 0
                  ? `Consider one-on-one tutoring for ${subjectStats.bottomPerformers[0].student}.`
                  : "Maintain the current support system for students."}
              </li>
              <li>
                {subjectStats.trend < 0
                  ? "Review recent curriculum changes or teaching methods to address the declining trend."
                  : "Share successful teaching strategies with other subject teachers."}
              </li>
              <li>Recognize and celebrate the achievements of top performers to motivate other students.</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="bg-green-500 hover:bg-green-600 text-white">Download Full Report</Button>
        </CardFooter>
      </Card>
    </div>
  )
}