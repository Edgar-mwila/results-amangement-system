import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

type assessment = {
  id: string,
  title: string,
  class: {
    id: string,
    name: string,
    grade: string
  },
  subject: string,
  type: string,
  dueDate: string,
  totalPoints: number,
  status: string,
  studentsCompleted: number,
  studentsTotal: number,
  averageScore: number | null,
  createdDate: string
}
// Mock data for assessments across all classes
const assessmentsData: assessment[] = [
  {
    id: "assess-1",
    title: "Midterm Exam",
    class: {
      id: "class-a",
      name: "Class A",
      grade: "9th Grade"
    },
    subject: "Mathematics",
    type: "Exam",
    dueDate: "2025-04-15",
    totalPoints: 100,
    status: "Upcoming",
    studentsCompleted: 0,
    studentsTotal: 28,
    averageScore: null,
    createdDate: "2025-04-01"
  },
  {
    id: "assess-2",
    title: "Lab Report: Photosynthesis",
    class: {
      id: "class-c",
      name: "Class C",
      grade: "9th Grade"
    },
    subject: "Biology",
    type: "Assignment",
    dueDate: "2025-04-10",
    totalPoints: 50,
    status: "Active",
    studentsCompleted: 12,
    studentsTotal: 30,
    averageScore: null,
    createdDate: "2025-04-03"
  },
  {
    id: "assess-3",
    title: "Chemical Bonding Quiz",
    class: {
      id: "class-b",
      name: "Class B",
      grade: "10th Grade"
    },
    subject: "Chemistry",
    type: "Quiz",
    dueDate: "2025-04-05",
    totalPoints: 25,
    status: "Grading",
    studentsCompleted: 24,
    studentsTotal: 24,
    averageScore: null,
    createdDate: "2025-04-02"
  },
  {
    id: "assess-4",
    title: "Newton's Laws Problem Set",
    class: {
      id: "class-a",
      name: "Class A",
      grade: "9th Grade"
    },
    subject: "Physics",
    type: "Assignment",
    dueDate: "2025-03-25",
    totalPoints: 40,
    status: "Completed",
    studentsCompleted: 26,
    studentsTotal: 28,
    averageScore: 87,
    createdDate: "2025-03-18"
  },
  {
    id: "assess-5",
    title: "Statistics Project",
    class: {
      id: "class-d",
      name: "Class D",
      grade: "11th Grade"
    },
    subject: "Statistics",
    type: "Project",
    dueDate: "2025-04-20",
    totalPoints: 150,
    status: "Upcoming",
    studentsCompleted: 0,
    studentsTotal: 22,
    averageScore: null,
    createdDate: "2025-03-30"
  },
  {
    id: "assess-6",
    title: "Calculus Quiz #2",
    class: {
      id: "class-d",
      name: "Class D",
      grade: "11th Grade"
    },
    subject: "Calculus",
    type: "Quiz",
    dueDate: "2025-03-22",
    totalPoints: 30,
    status: "Completed",
    studentsCompleted: 20,
    studentsTotal: 22,
    averageScore: 76,
    createdDate: "2025-03-15"
  },
  {
    id: "assess-7",
    title: "Ecosystem Analysis Report",
    class: {
      id: "class-c",
      name: "Class C",
      grade: "9th Grade"
    },
    subject: "Environmental Science",
    type: "Assignment",
    dueDate: "2025-03-18",
    totalPoints: 65,
    status: "Completed",
    studentsCompleted: 28,
    studentsTotal: 30,
    averageScore: 92,
    createdDate: "2025-03-11"
  },
  {
    id: "assess-8",
    title: "Periodic Table Quiz",
    class: {
      id: "class-b",
      name: "Class B",
      grade: "10th Grade"
    },
    subject: "Chemistry",
    type: "Quiz",
    dueDate: "2025-03-28",
    totalPoints: 20,
    status: "Completed",
    studentsCompleted: 23,
    studentsTotal: 24,
    averageScore: 85,
    createdDate: "2025-03-21"
  }
];

const Assessments = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
      status: "all",
      type: "all",
      class: "all",
      subject: "all"
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("dueDate");
    const [sortDirection, setSortDirection] = useState("asc");

    // Extract unique filter options
    const classes = [...new Set(assessmentsData.map(a => a.class.name))];
    const subjects = [...new Set(assessmentsData.map(a => a.subject))];
    const types = [...new Set(assessmentsData.map(a => a.type))];
    const statuses = [...new Set(assessmentsData.map(a => a.status))];

    // Apply filters and sorting
    const filteredAssessments = assessmentsData
      .filter(assessment => {
        return (
          (filters.status === "all" || assessment.status === filters.status) &&
          (filters.type === "all" || assessment.type === filters.type) &&
          (filters.class === "all" || assessment.class.name === filters.class) &&
          (filters.subject === "all" || assessment.subject === filters.subject) &&
          (
            searchTerm === "" || 
            assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            assessment.subject.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
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
          case "class":
            comparison = a.class.name.localeCompare(b.class.name);
            break;
          case "status":
            comparison = a.status.localeCompare(b.status);
            break;
          case "type":
            comparison = a.type.localeCompare(b.type);
            break;
          case "completion":
            comparison = (a.studentsCompleted / a.studentsTotal) - (b.studentsCompleted / b.studentsTotal);
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

    // Toggle sort direction when clicking the same column
    const handleSortChange = (column: string) => {
      if (sortBy === column) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortBy(column);
        setSortDirection("asc");
      }
    };

    return (
      <div className="p-6 max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">All Assessments</h1>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center"
              onClick={() => alert("Create new assessment")}  // Replace with actual navigation
            >
              <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Assessment
            </button>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                  placeholder="Search assessments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <select
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  value={filters.class}
                  onChange={(e) => setFilters({...filters, class: e.target.value})}
                >
                  <option value="all">All Classes</option>
                  {classes.map(className => (
                    <option key={className} value={className}>{className}</option>
                  ))}
                </select>

                <select
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  value={filters.subject}
                  onChange={(e) => setFilters({...filters, subject: e.target.value})}
                >
                  <option value="all">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>

                <select
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                >
                  <option value="all">All Types</option>
                  {types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>

                <select
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                  <option value="all">All Statuses</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </header>

        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortChange("title")}
                  >
                    <div className="flex items-center">
                      Title
                      {sortBy === "title" && (
                        <svg className="w-3 h-3 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === "asc" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                        </svg>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortChange("class")}
                  >
                    <div className="flex items-center">
                      Class
                      {sortBy === "class" && (
                        <svg className="w-3 h-3 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === "asc" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                        </svg>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortChange("type")}
                  >
                    <div className="flex items-center">
                      Type
                      {sortBy === "type" && (
                        <svg className="w-3 h-3 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === "asc" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                        </svg>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortChange("dueDate")}
                  >
                    <div className="flex items-center">
                      Due Date
                      {sortBy === "dueDate" && (
                        <svg className="w-3 h-3 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === "asc" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                        </svg>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortChange("status")}
                  >
                    <div className="flex items-center">
                      Status
                      {sortBy === "status" && (
                        <svg className="w-3 h-3 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === "asc" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                        </svg>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortChange("completion")}
                  >
                    <div className="flex items-center">
                      Completion
                      {sortBy === "completion" && (
                        <svg className="w-3 h-3 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === "asc" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                        </svg>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortChange("score")}
                  >
                    <div className="flex items-center">
                      Score
                      {sortBy === "score" && (
                        <svg className="w-3 h-3 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDirection === "asc" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                        </svg>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{assessment.title}</div>
                        <div className="text-sm text-gray-500">{assessment.subject}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{assessment.class.name}</div>
                        <div className="text-sm text-gray-500">{assessment.class.grade}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{assessment.type}</div>
                        <div className="text-sm text-gray-500">{assessment.totalPoints} pts</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(assessment.dueDate)}</div>
                        {assessment.status === "Upcoming" || assessment.status === "Active" ? (
                          <div className={`text-sm ${daysRemaining <= 3 ? "text-red-600 font-medium" : "text-gray-500"}`}>
                            {daysRemaining > 0 ? `${daysRemaining} days left` : "Due today"}
                          </div>
                        ) : null}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(assessment.status)}`}>
                          {assessment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${(assessment.studentsCompleted / assessment.studentsTotal) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900 ml-2">
                            {assessment.studentsCompleted}/{assessment.studentsTotal}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {assessment.averageScore ? `${assessment.averageScore}%` : "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Navigate to edit page
                            navigate({ to: `/teacher/assessments/${assessment.id}/edit` });
                          }}
                        >
                          Edit
                        </button>
                        <button 
                          className={`${
                            assessment.status === "Grading" ? "text-yellow-600 hover:text-yellow-900" : "text-gray-400"
                          }`}
                          disabled={assessment.status !== "Grading"}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (assessment.status === "Grading") {
                              // Navigate to grading page
                              navigate({ to: `/teacher/assessments/${assessment.id}/grade` });
                            }
                          }}
                        >
                          Grade
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredAssessments.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No assessments found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            <span className="font-medium">{filteredAssessments.length}</span> results found
          </div>
          
          <div className="flex space-x-2">
            <button className="bg-white border border-gray-300 text-gray-700 py-1 px-3 rounded-md text-sm">
              Export Data
            </button>
          </div>
        </div>
      </div>
    );
  }

export const Route = createFileRoute('/teacher/assessments/')({
  component: Assessments,
});