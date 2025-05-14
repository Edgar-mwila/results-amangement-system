"use client"

import { createFileRoute } from "@tanstack/react-router"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { Calendar, Users, Home, Search, Clock, CheckCircle, FileText, ChevronDown, BookOpen } from "lucide-react"

// Mock data for teacher's classes
const teacherClasses = [
  {
    id: "class-a",
    name: "Class A",
    grade: "9th Grade",
    subjects: ["Mathematics", "Physics"],
    schedule: "Mon, Wed, Fri - 9:00 AM to 10:30 AM",
    students: 28,
    averagePerformance: 87,
    recentTopics: ["Algebra", "Newton's Laws", "Kinematics"],
    room: "B-103",
    upcomingAssignments: 2,
    pendingGrading: 3,
  },
  {
    id: "class-b",
    name: "Class B",
    grade: "10th Grade",
    subjects: ["Advanced Mathematics", "Chemistry"],
    schedule: "Tue, Thu - 11:00 AM to 1:00 PM",
    students: 24,
    averagePerformance: 82,
    recentTopics: ["Trigonometry", "Periodic Table", "Chemical Bonding"],
    room: "A-205",
    upcomingAssignments: 1,
    pendingGrading: 0,
  },
  {
    id: "class-c",
    name: "Class C",
    grade: "9th Grade",
    subjects: ["Biology", "Environmental Science"],
    schedule: "Mon, Wed - 1:30 PM to 3:00 PM",
    students: 30,
    averagePerformance: 91,
    recentTopics: ["Cell Structure", "Ecosystems", "Photosynthesis"],
    room: "Lab-2",
    upcomingAssignments: 0,
    pendingGrading: 5,
  },
  {
    id: "class-d",
    name: "Class D",
    grade: "11th Grade",
    subjects: ["Calculus", "Statistics"],
    schedule: "Mon, Tue, Fri - 2:00 PM to 3:30 PM",
    students: 22,
    averagePerformance: 79,
    recentTopics: ["Derivatives", "Probability", "Normal Distribution"],
    room: "C-110",
    upcomingAssignments: 3,
    pendingGrading: 1,
  },
]

const Classes = () => {
  const navigate = useNavigate()
  const [sortBy, setSortBy] = useState("name")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewType, setViewType] = useState<"grid" | "list">("grid")

  // Sort and filter classes
  const filteredClasses = [...teacherClasses]
    .filter(
      (cls) =>
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.subjects.some((subject) => subject.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "grade") return a.grade.localeCompare(b.grade)
      if (sortBy === "students") return b.students - a.students
      if (sortBy === "performance") return b.averagePerformance - a.averagePerformance
      return 0
    })

  // Performance badge helper function
  const getPerformanceBadge = (value: number) => {
    if (value >= 90) return "bg-green-100 text-green-400 border border-green-400"
    if (value >= 80) return "bg-blue-100 text-blue-400 border border-blue-400"
    if (value >= 70) return "bg-yellow-100 text-yellow-600 border border-yellow-400"
    return "bg-red-100 text-red-500 border border-red-400"
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white min-h-screen">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">My Classes</h1>
            <p className="text-gray-600">Manage and view details for all your classes</p>
          </div>

          <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => setViewType("grid")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewType === "grid" ? "bg-white text-blue-400 shadow-sm" : "text-gray-600 hover:text-blue-400"
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewType("list")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewType === "list" ? "bg-white text-blue-400 shadow-sm" : "text-gray-600 hover:text-blue-400"
              }`}
            >
              List View
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
          <div className="relative w-full md:w-1/2">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="text"
              className="bg-white border border-gray-200 text-gray-800 text-sm rounded-lg block w-full pl-10 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              placeholder="Search classes, subjects, or grades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Sort by:</label>
            <div className="relative">
              <select
                className="bg-white border border-gray-200 text-gray-800 text-sm rounded-lg block w-full p-2.5 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Class Name</option>
                <option value="grade">Grade Level</option>
                <option value="students">Number of Students</option>
                <option value="performance">Performance</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </header>

      {viewType === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden group"
              onClick={() => navigate({ to: `/$school/dashboard/classes/${classItem.id}` })}
            >
              <div className="h-2 bg-gradient-to-r from-blue-400 to-green-400"></div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-400 transition-colors">
                      {classItem.name}
                    </h2>
                    <p className="text-sm text-gray-600">{classItem.grade}</p>
                  </div>
                  <span
                    className={`text-sm px-3 py-1 rounded-full font-medium ${getPerformanceBadge(classItem.averagePerformance)}`}
                  >
                    {classItem.averagePerformance}%
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {classItem.subjects.map((subject, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-50 text-blue-400 text-xs px-2.5 py-1 rounded-md border border-blue-200 font-medium"
                    >
                      {subject}
                    </span>
                  ))}
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-gray-700">
                    <Users className="w-4 h-4 mr-2 text-blue-400" />
                    <span className="font-medium">{classItem.students}</span> Students
                  </div>

                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                    {classItem.schedule}
                  </div>

                  <div className="flex items-center text-gray-700">
                    <Home className="w-4 h-4 mr-2 text-blue-400" />
                    Room {classItem.room}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between">
                  {classItem.pendingGrading > 0 ? (
                    <span className="text-sm text-orange-500 flex items-center bg-orange-50 px-2.5 py-1 rounded-md">
                      <FileText className="w-4 h-4 mr-1.5" />
                      {classItem.pendingGrading} to grade
                    </span>
                  ) : (
                    <span className="text-sm text-green-400 flex items-center bg-green-50 px-2.5 py-1 rounded-md">
                      <CheckCircle className="w-4 h-4 mr-1.5" />
                      All graded
                    </span>
                  )}

                  {classItem.upcomingAssignments > 0 && (
                    <span className="text-sm text-blue-400 flex items-center bg-blue-50 px-2.5 py-1 rounded-md">
                      <Clock className="w-4 h-4 mr-1.5" />
                      {classItem.upcomingAssignments} upcoming
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredClasses.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden group"
              onClick={() => navigate({ to: `/$school/dashboard/classes/${classItem.id}` })}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1 md:h-auto w-full h-1 bg-gradient-to-r md:bg-gradient-to-b from-blue-400 to-green-400"></div>
                <div className="p-5 flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-400">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-400 transition-colors">
                          {classItem.name}
                        </h2>
                        <p className="text-sm text-gray-600">{classItem.grade}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {classItem.subjects.map((subject, idx) => (
                            <span
                              key={idx}
                              className="bg-blue-50 text-blue-400 text-xs px-2.5 py-1 rounded-md border border-blue-200 font-medium"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`text-sm px-3 py-1 rounded-full font-medium ${getPerformanceBadge(classItem.averagePerformance)}`}
                      >
                        {classItem.averagePerformance}% Performance
                      </span>

                      <div className="flex items-center text-gray-700 bg-gray-50 px-3 py-1 rounded-md">
                        <Users className="w-4 h-4 mr-1.5 text-blue-400" />
                        <span className="font-medium">{classItem.students}</span>
                      </div>

                      <div className="flex items-center text-gray-700 bg-gray-50 px-3 py-1 rounded-md">
                        <Home className="w-4 h-4 mr-1.5 text-blue-400" />
                        <span>Room {classItem.room}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-3">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                      {classItem.schedule}
                    </div>

                    <div className="flex gap-3 ml-auto">
                      {classItem.pendingGrading > 0 ? (
                        <span className="text-sm text-orange-500 flex items-center bg-orange-50 px-2.5 py-1 rounded-md">
                          <FileText className="w-4 h-4 mr-1.5" />
                          {classItem.pendingGrading} to grade
                        </span>
                      ) : (
                        <span className="text-sm text-green-400 flex items-center bg-green-50 px-2.5 py-1 rounded-md">
                          <CheckCircle className="w-4 h-4 mr-1.5" />
                          All graded
                        </span>
                      )}

                      {classItem.upcomingAssignments > 0 && (
                        <span className="text-sm text-blue-400 flex items-center bg-blue-50 px-2.5 py-1 rounded-md">
                          <Clock className="w-4 h-4 mr-1.5" />
                          {classItem.upcomingAssignments} upcoming
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredClasses.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-800">No classes found</h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            We couldn't find any classes matching your search criteria. Try adjusting your search or filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm("")
              setSortBy("name")
            }}
            className="mt-4 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}

export const Route = createFileRoute("/$school/dashboard/classes/")({
  component: Classes,
})
