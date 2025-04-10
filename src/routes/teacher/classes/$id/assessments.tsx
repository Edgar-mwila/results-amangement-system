import { createFileRoute } from '@tanstack/react-router'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useState } from 'react'

// Mock class data
const classData = {
  id: "class-a",
  name: "Class A",
  grade: "9th Grade",
  subjects: ["Mathematics", "Physics"],
  room: "B-103",
  studentsCount: 28,
  schedule: "Mon, Wed, Fri - 9:00 AM to 10:30 AM",
};

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
    description: "Comprehensive exam covering chapters 1-5"
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
    description: "Problem set on Newton's three laws of motion"
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
    description: "Short quiz on algebraic expressions and equations"
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
    description: "Report on the lab experiment about velocity and acceleration"
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
    description: "Weekly assessment covering recent topics"
  }
];

// Mock data for class performance statistics
const classStatistics = {
  overallAverage: 88,
  subjectAverages: {
    "Mathematics": 91,
    "Physics": 85
  },
  completionRate: 93,
  assessmentTypeBreakdown: [
    { type: "Quiz", count: 4, averageScore: 89 },
    { type: "Exam", count: 1, averageScore: null },
    { type: "Assignment", count: 2, averageScore: 83 },
    { type: "Lab", count: 1, averageScore: null }
  ],
  topPerformingStudents: [
    { id: 5, name: "Emma Wilson", average: 97 },
    { id: 12, name: "Michael Chen", average: 95 },
    { id: 8, name: "Sarah Johnson", average: 94 }
  ],
  needsAttention: [
    { id: 22, name: "David Brown", average: 68 },
    { id: 17, name: "Lisa Garcia", average: 72 }
  ]
};

const ClassAssessment = () => {
  const navigate = useNavigate();
  const { id } = useParams({ from: '/teacher/classes/$id/assessments'});
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter assessments based on active tab and search term
  const filteredAssessments = classAssessmentsData
    .filter(assessment => {
      const matchesSearch = 
        assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assessment.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assessment.description.toLowerCase().includes(searchTerm.toLowerCase());

      if (activeTab === "all") return matchesSearch;
      if (activeTab === "upcoming") return assessment.status === "Upcoming" && matchesSearch;
      if (activeTab === "active") return assessment.status === "Active" && matchesSearch;
      if (activeTab === "grading") return assessment.status === "Grading" && matchesSearch;
      if (activeTab === "completed") return assessment.status === "Completed" && matchesSearch;
      return matchesSearch;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "dueDate":
          comparison = Number(new Date(a.dueDate)) - Number(new Date(b.dueDate));
          break;
        case "type":
          comparison = a.type.localeCompare(b.type);
          break;
        case "subject":
          comparison = a.subject.localeCompare(b.subject);
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        case "completion":
          comparison = a.studentsCompleted / a.studentsTotal - b.studentsCompleted / b.studentsTotal;
          break;
        case "score":
          comparison = (a.averageScore || 0) - (b.averageScore || 0);
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });

  // Helper function for status styling
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-800";
      case "Active":
        return "bg-green-100 text-green-800";
      case "Grading":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format date in a more readable way
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Calculate days remaining
  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = Number(due) - Number(today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Count assessments by status
  const statusCounts = {
    upcoming: classAssessmentsData.filter(a => a.status === "Upcoming").length,
    active: classAssessmentsData.filter(a => a.status === "Active").length,
    grading: classAssessmentsData.filter(a => a.status === "Grading").length,
    completed: classAssessmentsData.filter(a => a.status === "Completed").length
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Class Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{classData.name} - Assessments</h1>
            <p className="text-gray-600">{classData.grade} • Room {classData.room} • {classData.studentsCount} students</p>
          </div>
          <div className="flex space-x-2">
            <button 
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm"
              onClick={() => navigate({ to: `/teacher/classes/${id}` })}
            >
              Class Overview
            </button>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm flex items-center"
              onClick={() => alert("Create new assessment")}
            >
              <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Assessment
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Overall Average</p>
              <p className="text-2xl font-bold text-gray-800">{classStatistics.overallAverage}%</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            {Object.entries(classStatistics.subjectAverages).map(([subject, avg]) => (
              <div key={subject} className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-600">{subject}</span>
                <span className="text-sm font-medium">{avg}%</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-800">{classStatistics.completionRate}%</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${classStatistics.completionRate}%` }}></div>
            </div>
            <div className="mt-2 text-xs text-gray-600">
              {classAssessmentsData.reduce((sum, curr) => sum + curr.studentsCompleted, 0)} out of {classAssessmentsData.reduce((sum, curr) => sum + curr.studentsTotal, 0)} total submissions
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Assessments</p>
              <p className="text-2xl font-bold text-gray-800">{classAssessmentsData.length}</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {classStatistics.assessmentTypeBreakdown.map((item) => (
              <div key={item.type} className="text-xs">
                <div className="font-medium">{item.type}</div>
                <div className="text-gray-600">{item.count} assessments</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Student Performance</p>
              <p className="text-2xl font-bold text-gray-800">
                {classStatistics.topPerformingStudents.length + classStatistics.needsAttention.length}/{classData.studentsCount}
              </p>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="w-6 h-6 text-orange-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-xs font-medium text-green-700 mb-1">Top Performing</div>
            {classStatistics.topPerformingStudents.slice(0, 2).map((student) => (
              <div key={student.id} className="flex justify-between text-xs mb-1">
                <span>{student.name}</span>
                <span className="font-medium">{student.average}%</span>
              </div>
            ))}
            
            <div className="text-xs font-medium text-red-700 mt-2 mb-1">Needs Attention</div>
            {classStatistics.needsAttention.map((student) => (
              <div key={student.id} className="flex justify-between text-xs mb-1">
                <span>{student.name}</span>
                <span className="font-medium">{student.average}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Tabs */}
      <div className="bg-white rounded-lg shadow border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2"
                placeholder="Search assessments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Sort by:</label>
              <select
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-40 p-2"
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
                className="p-2 border border-gray-300 rounded-lg"
                onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
              >
                <svg className="w-4 h-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === "asc" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Status Tabs */}
        <div className="px-2 sm:px-6 border-b border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === "all" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Assessments
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === "upcoming" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming <span className="ml-1 bg-blue-100 text-blue-800 text-xs px-2 rounded-full">{statusCounts.upcoming}</span>
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === "active" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("active")}
            >
              Active <span className="ml-1 bg-green-100 text-green-800 text-xs px-2 rounded-full">{statusCounts.active}</span>
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === "grading" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("grading")}
            >
              Needs Grading <span className="ml-1 bg-yellow-100 text-yellow-800 text-xs px-2 rounded-full">{statusCounts.grading}</span>
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === "completed" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("completed")}
            >
              Completed <span className="ml-1 bg-gray-100 text-gray-800 text-xs px-2 rounded-full">{statusCounts.completed}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Assessment List */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        {filteredAssessments.length > 0 ? (
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
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAssessments.map((assessment) => {
                  const daysRemaining = getDaysRemaining(assessment.dueDate);
                  
                  return (
                    <tr 
                      key={assessment.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate({ to: `/teacher/assessments/${assessment.id}` })}
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{assessment.title}</div>
                        <div className="text-xs text-gray-500 truncate max-w-xs">{assessment.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{assessment.subject}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{assessment.type}</div>
                        <div className="text-xs text-gray-500">{assessment.totalPoints} pts</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(assessment.dueDate)}</div>
                        {(assessment.status === "Upcoming" || assessment.status === "Active") && (
                          <div className={`text-xs ${daysRemaining <= 3 ? "text-red-600 font-medium" : "text-gray-500"}`}>
                            {daysRemaining > 0 ? `${daysRemaining} days left` : "Due today"}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(assessment.status)}`}>
                          {assessment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(assessment.studentsCompleted / assessment.studentsTotal) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-900">
                            {assessment.studentsCompleted}/{assessment.studentsTotal}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {assessment.averageScore ? `${assessment.averageScore}%` : "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button 
                            className="text-blue-600 hover:text-blue-900"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Navigate to edit page
                              navigate({ to: `/teacher/assessments/${assessment.id}/edit` });
                            }}
                          >
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          {assessment.status === "Grading" && (
                            <button 
                              className="text-yellow-600 hover:text-yellow-900"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Navigate to grading page
                                navigate({ to: `/teacher/assessments/${assessment.id}/grade` });
                              }}
                            >
                              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </button>
                          )}
                          <button 
                            className="text-red-600 hover:text-red-900"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm(`Are you sure you want to delete "${assessment.title}"?`)) {
                                // Delete logic would go here
                                alert(`Deleted assessment: ${assessment.title}`);
                              }
                            }}
                          >
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No assessments found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? "Try adjusting your search term." : "Create a new assessment to get started."}
            </p>
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => alert("Create new assessment")}
              >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Assessment
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Pagination - Could add if needed */}
      {filteredAssessments.length > 0 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border border-gray-200 rounded-lg shadow sm:px-6 mt-4">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredAssessments.length}</span> of{" "}
                <span className="font-medium">{filteredAssessments.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button aria-current="page" className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const Route = createFileRoute('/teacher/classes/$id/assessments')({
  component: ClassAssessment,
});