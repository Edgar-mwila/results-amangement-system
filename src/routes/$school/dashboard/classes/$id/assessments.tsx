

import { createFileRoute } from "@tanstack/react-router"
import { useNavigate, useParams } from "@tanstack/react-router"
import { useState } from "react"
import {
  BarChart3,
  Users,
  Calendar,
  Home,
  Plus,
  Search,
  CheckCircle2,
  ClipboardList,
  Award,
  ArrowUpDown,
  Edit,
  FileText,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// Mock class data
const classData = {
  id: "class-a",
  name: "Class A",
  grade: "9th Grade",
  subjects: ["Mathematics", "Physics"],
  room: "B-103",
  studentsCount: 28,
  schedule: "Mon, Wed, Fri - 9:00 AM to 10:30 AM",
}

// Mock assessment data for a specific class
const classAssessmentsData = [
  {
    id: "assess-1",
    title: "Midterm Exam",
    subject: "Mathematics",
    type: "Exam",
    dueDate: "2025-04-15",
    totalPoints: 100,
    status: "Upcoming",
    studentsCompleted: 0,
    studentsTotal: 28,
    averageScore: null,
    createdDate: "2025-04-01",
    description: "Comprehensive exam covering chapters 1-5",
  },
  {
    id: "assess-4",
    title: "Newton's Laws Problem Set",
    subject: "Physics",
    type: "Assignment",
    dueDate: "2025-03-25",
    totalPoints: 40,
    status: "Completed",
    studentsCompleted: 26,
    studentsTotal: 28,
    averageScore: 87,
    createdDate: "2025-03-18",
    description: "Problem set on Newton's three laws of motion",
  },
  {
    id: "assess-9",
    title: "Algebra Quiz",
    subject: "Mathematics",
    type: "Quiz",
    dueDate: "2025-03-12",
    totalPoints: 25,
    status: "Completed",
    studentsCompleted: 28,
    studentsTotal: 28,
    averageScore: 92,
    createdDate: "2025-03-05",
    description: "Short quiz on algebraic expressions and equations",
  },
  {
    id: "assess-10",
    title: "Physics Lab Report",
    subject: "Physics",
    type: "Lab",
    dueDate: "2025-04-08",
    totalPoints: 50,
    status: "Active",
    studentsCompleted: 15,
    studentsTotal: 28,
    averageScore: null,
    createdDate: "2025-03-25",
    description: "Report on the lab experiment about velocity and acceleration",
  },
  {
    id: "assess-11",
    title: "Mathematics Weekly Test",
    subject: "Mathematics",
    type: "Quiz",
    dueDate: "2025-04-05",
    totalPoints: 20,
    status: "Grading",
    studentsCompleted: 28,
    studentsTotal: 28,
    averageScore: null,
    createdDate: "2025-03-29",
    description: "Weekly assessment covering recent topics",
  },
]

// Mock data for class performance statistics
const classStatistics = {
  overallAverage: 88,
  subjectAverages: {
    Mathematics: 91,
    Physics: 85,
  },
  completionRate: 93,
  assessmentTypeBreakdown: [
    { type: "Quiz", count: 4, averageScore: 89 },
    { type: "Exam", count: 1, averageScore: null },
    { type: "Assignment", count: 2, averageScore: 83 },
    { type: "Lab", count: 1, averageScore: null },
  ],
  topPerformingStudents: [
    { id: 5, name: "Emma Wilson", average: 97 },
    { id: 12, name: "Michael Chen", average: 95 },
    { id: 8, name: "Sarah Johnson", average: 94 },
  ],
  needsAttention: [
    { id: 22, name: "David Brown", average: 68 },
    { id: 17, name: "Lisa Garcia", average: 72 },
  ],
}

const ClassAssessment = () => {
  const navigate = useNavigate()
  const { id } = useParams({ from: "/$school/dashboard/classes/$id/assessments" })
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("dueDate")
  const [sortDirection, setSortDirection] = useState("desc")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("table") // 'table' or 'grid'

  // Filter assessments based on active tab and search term
  const filteredAssessments = classAssessmentsData
    .filter((assessment) => {
      const matchesSearch =
        assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assessment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assessment.description.toLowerCase().includes(searchTerm.toLowerCase())

      if (activeTab === "all") return matchesSearch
      if (activeTab === "upcoming") return assessment.status === "Upcoming" && matchesSearch
      if (activeTab === "active") return assessment.status === "Active" && matchesSearch
      if (activeTab === "grading") return assessment.status === "Grading" && matchesSearch
      if (activeTab === "completed") return assessment.status === "Completed" && matchesSearch
      return matchesSearch
    })
    .sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "title":
          comparison = a.title.localeCompare(b.title)
          break
        case "dueDate":
          comparison = Number(new Date(a.dueDate)) - Number(new Date(b.dueDate))
          break
        case "type":
          comparison = a.type.localeCompare(b.type)
          break
        case "subject":
          comparison = a.subject.localeCompare(b.subject)
          break
        case "status":
          comparison = a.status.localeCompare(b.status)
          break
        case "completion":
          comparison = a.studentsCompleted / a.studentsTotal - b.studentsCompleted / b.studentsTotal
          break
        case "score":
          comparison = (a.averageScore || 0) - (b.averageScore || 0)
          break
        default:
          comparison = 0
      }

      return sortDirection === "asc" ? comparison : -comparison
    })

  // Helper function for status styling
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-800 border border-blue-200"
      case "Active":
        return "bg-green-100 text-green-800 border border-green-200"
      case "Grading":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200"
      case "Completed":
        return "bg-gray-100 text-gray-800 border border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200"
    }
  }

  // Helper function for status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-400"
      case "Active":
        return "bg-green-400"
      case "Grading":
        return "bg-yellow-400"
      case "Completed":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  // Format date in a more readable way
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Calculate days remaining
  const getDaysRemaining = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = Number(due) - Number(today)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Count assessments by status
  const statusCounts = {
    upcoming: classAssessmentsData.filter((a) => a.status === "Upcoming").length,
    active: classAssessmentsData.filter((a) => a.status === "Active").length,
    grading: classAssessmentsData.filter((a) => a.status === "Grading").length,
    completed: classAssessmentsData.filter((a) => a.status === "Completed").length,
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Class Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate({ to: `/$school/dashboard/classes/${id}` })}
                className="p-1.5 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-3xl font-bold text-gray-800">{classData.name} - Assessments</h1>
            </div>
            <p className="text-gray-600 mt-1">
              {classData.grade} • Room {classData.room} • {classData.studentsCount} students
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
              onClick={() => navigate({ to: `/$school/dashboard/classes/${id}` })}
            >
              <Home className="w-4 h-4" />
              Class Overview
            </button>
            <button
              className="bg-green-400 hover:bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
              onClick={() => alert("Create new assessment")}
            >
              <Plus className="w-4 h-4" />
              New Assessment
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Overall Average Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-400"></div>
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Overall Average</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{classStatistics.overallAverage}%</p>
            </div>
            <div className="p-2.5 bg-blue-100 rounded-lg text-blue-600">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {Object.entries(classStatistics.subjectAverages).map(([subject, avg]) => (
              <div key={subject} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{subject}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-100 rounded-full h-1.5">
                    <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: `${avg}%` }}></div>
                  </div>
                  <span className="text-sm font-medium">{avg}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completion Rate Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-green-400"></div>
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Completion Rate</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{classStatistics.completionRate}%</p>
            </div>
            <div className="p-2.5 bg-green-100 rounded-lg text-green-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-6">
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div
                className="bg-green-400 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${classStatistics.completionRate}%` }}
              ></div>
            </div>
            <div className="mt-3 text-sm text-gray-600 flex justify-between">
              <span>{classAssessmentsData.reduce((sum, curr) => sum + curr.studentsCompleted, 0)} submissions</span>
              <span>{classAssessmentsData.reduce((sum, curr) => sum + curr.studentsTotal, 0)} total</span>
            </div>
          </div>
        </div>

        {/* Assessments Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-400"></div>
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Assessments</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{classAssessmentsData.length}</p>
            </div>
            <div className="p-2.5 bg-blue-100 rounded-lg text-blue-600">
              <ClipboardList className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {classStatistics.assessmentTypeBreakdown.map((item) => (
              <div key={item.type} className="bg-gray-50 p-2 rounded-lg">
                <div className="font-medium text-sm">{item.type}</div>
                <div className="text-gray-600 text-xs flex justify-between mt-1">
                  <span>{item.count} total</span>
                  {item.averageScore && <span>{item.averageScore}%</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Performance Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-green-400"></div>
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Student Performance</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {classStatistics.topPerformingStudents.length + classStatistics.needsAttention.length}/
                {classData.studentsCount}
              </p>
            </div>
            <div className="p-2.5 bg-green-100 rounded-lg text-green-600">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-xs font-medium text-green-600 mb-2 uppercase tracking-wider">Top Performing</div>
            <div className="space-y-2">
              {classStatistics.topPerformingStudents.slice(0, 2).map((student) => (
                <div key={student.id} className="flex justify-between items-center bg-green-50 p-2 rounded-lg">
                  <span className="text-sm">{student.name}</span>
                  <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded">
                    {student.average}%
                  </span>
                </div>
              ))}
            </div>

            <div className="text-xs font-medium text-red-600 mb-2 mt-4 uppercase tracking-wider">Needs Attention</div>
            <div className="space-y-2">
              {classStatistics.needsAttention.map((student) => (
                <div key={student.id} className="flex justify-between items-center bg-red-50 p-2 rounded-lg">
                  <span className="text-sm">{student.name}</span>
                  <span className="text-sm font-medium bg-red-100 text-red-800 px-2 py-0.5 rounded">
                    {student.average}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                placeholder="Search assessments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchTerm("")}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">View:</label>
                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className={`p-2 ${viewMode === "table" ? "bg-blue-400 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                    onClick={() => setViewMode("table")}
                    title="Table view"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                  </button>
                  <button
                    className={`p-2 ${viewMode === "grid" ? "bg-blue-400 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                    onClick={() => setViewMode("grid")}
                    title="Grid view"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Sort:</label>
                <select
                  className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg block w-40 p-2.5 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="dueDate">Due Date</option>
                  <option value="title">Title</option>
                  <option value="type">Type</option>
                  <option value="subject">Subject</option>
                  <option value="status">Status</option>
                  <option value="completion">Completion</option>
                  <option value="score">Score</option>
                </select>
                <button
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                  title={sortDirection === "asc" ? "Sort descending" : "Sort ascending"}
                >
                  <ArrowUpDown className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="px-2 sm:px-6 border-b border-gray-100">
          <div className="flex overflow-x-auto">
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "all"
                  ? "border-blue-400 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Assessments
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "upcoming"
                  ? "border-blue-400 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming{" "}
              <span className="ml-1 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                {statusCounts.upcoming}
              </span>
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "active"
                  ? "border-blue-400 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200"
              }`}
              onClick={() => setActiveTab("active")}
            >
              Active{" "}
              <span className="ml-1 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                {statusCounts.active}
              </span>
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "grading"
                  ? "border-blue-400 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200"
              }`}
              onClick={() => setActiveTab("grading")}
            >
              Needs Grading{" "}
              <span className="ml-1 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                {statusCounts.grading}
              </span>
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "completed"
                  ? "border-blue-400 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200"
              }`}
              onClick={() => setActiveTab("completed")}
            >
              Completed{" "}
              <span className="ml-1 bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                {statusCounts.completed}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Assessment List */}
      {filteredAssessments.length > 0 ? (
        viewMode === "table" ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assessment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type/Points
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Completion
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Average Score
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredAssessments.map((assessment) => {
                    const daysRemaining = getDaysRemaining(assessment.dueDate)

                    return (
                      <tr
                        key={assessment.id}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() =>
                          navigate({
                            to: `/$school/dashboard/assessments/${assessment.id}`,
                          })
                        }
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{assessment.title}</div>
                          <div className="text-xs text-gray-500 truncate max-w-xs">{assessment.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                            {assessment.subject}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{assessment.type}</div>
                          <div className="text-xs text-gray-500">{assessment.totalPoints} pts</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{formatDate(assessment.dueDate)}</div>
                          {(assessment.status === "Upcoming" || assessment.status === "Active") && (
                            <div
                              className={`text-xs ${daysRemaining <= 3 ? "text-red-600 font-medium" : "text-gray-500"}`}
                            >
                              {daysRemaining > 0 ? `${daysRemaining} days left` : "Due today"}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusStyle(assessment.status)}`}
                          >
                            {assessment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-20 bg-gray-100 rounded-full h-1.5 mr-2">
                              <div
                                className="bg-blue-400 h-1.5 rounded-full transition-all duration-500"
                                style={{
                                  width: `${(assessment.studentsCompleted / assessment.studentsTotal) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-900">
                              {assessment.studentsCompleted}/{assessment.studentsTotal}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {assessment.averageScore ? (
                            <span className="font-medium">{assessment.averageScore}%</span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation()
                                // Navigate to edit page
                                navigate({
                                  to: `/$school/dashboard/assessments/${assessment.id}/edit`,
                                })
                              }}
                              title="Edit assessment"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            {assessment.status === "Grading" && (
                              <button
                                className="p-1.5 rounded-lg text-yellow-600 hover:bg-yellow-50 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  // Navigate to grading page
                                  navigate({
                                    to: `/$school/dashboard/assessments/${assessment.id}/grade`,
                                  })
                                }}
                                title="Grade assessment"
                              >
                                <FileText className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation()
                                if (window.confirm(`Are you sure you want to delete "${assessment.title}"?`)) {
                                  // Delete logic would go here
                                  alert(`Deleted assessment: ${assessment.title}`)
                                }
                              }}
                              title="Delete assessment"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // Grid view
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssessments.map((assessment) => {
              const daysRemaining = getDaysRemaining(assessment.dueDate)

              return (
                <div
                  key={assessment.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate({ to: `/$school/dashboard/assessments/${assessment.id}` })}
                >
                  <div className={`h-2 ${getStatusColor(assessment.status)}`}></div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{assessment.title}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{assessment.description}</p>
                      </div>
                      <span
                        className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusStyle(assessment.status)}`}
                      >
                        {assessment.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                        {assessment.subject}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-100">
                        {assessment.type}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-100">
                        {assessment.totalPoints} pts
                      </span>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center text-gray-700">
                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                        <span>{formatDate(assessment.dueDate)}</span>
                        {(assessment.status === "Upcoming" || assessment.status === "Active") && (
                          <span
                            className={`ml-2 text-xs ${daysRemaining <= 3 ? "text-red-600 font-medium" : "text-gray-500"}`}
                          >
                            ({daysRemaining > 0 ? `${daysRemaining} days left` : "Due today"})
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Completion</span>
                          <span>
                            {assessment.studentsCompleted}/{assessment.studentsTotal} students
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div
                            className="bg-blue-400 h-1.5 rounded-full transition-all duration-500"
                            style={{
                              width: `${(assessment.studentsCompleted / assessment.studentsTotal) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      {assessment.averageScore !== null && (
                        <div className="flex items-center text-gray-700">
                          <Award className="w-4 h-4 mr-2 text-gray-500" />
                          <span>
                            Average Score: <span className="font-medium">{assessment.averageScore}%</span>
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end space-x-2">
                      <button
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate({ to: `/$school/dashboard/assessments/${assessment.id}/edit` })
                        }}
                        title="Edit assessment"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {assessment.status === "Grading" && (
                        <button
                          className="p-1.5 rounded-lg text-yellow-600 hover:bg-yellow-50 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate({ to: `/$school/dashboard/assessments/${assessment.id}/grade` })
                          }}
                          title="Grade assessment"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (window.confirm(`Are you sure you want to delete "${assessment.title}"?`)) {
                            alert(`Deleted assessment: ${assessment.title}`)
                          }
                        }}
                        title="Delete assessment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 text-center py-16">
          <svg
            className="mx-auto h-16 w-16 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No assessments found</h3>
          <p className="mt-2 text-base text-gray-500 max-w-md mx-auto">
            {searchTerm
              ? "Try adjusting your search term or filters to find what you're looking for."
              : "Create your first assessment to start tracking student progress."}
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition-colors"
              onClick={() => alert("Create new assessment")}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Assessment
            </button>
          </div>
        </div>
      )}

      {/* Pagination */}
      {filteredAssessments.length > 0 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border border-gray-100 rounded-xl shadow-sm sm:px-6 mt-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-200 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-200 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{filteredAssessments.length}</span> of{" "}
                <span className="font-medium">{filteredAssessments.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-lg border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  aria-current="page"
                  className="z-10 bg-blue-50 border-blue-400 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-lg border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export const Route = createFileRoute("/$school/dashboard/classes/$id/assessments")({
  component: ClassAssessment,
})
