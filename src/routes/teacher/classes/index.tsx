import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

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
    pendingGrading: 3
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
    pendingGrading: 0
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
    pendingGrading: 5
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
    pendingGrading: 1
  }
];

const Classes = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');

  // Sort and filter classes
  const filteredClasses = [...teacherClasses]
    .filter(cls => 
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'grade') return a.grade.localeCompare(b.grade);
      if (sortBy === 'students') return b.students - a.students;
      if (sortBy === 'performance') return b.averagePerformance - a.averagePerformance;
      return 0;
    });

  // Status badge helper function
  const getStatusBadge = (value: number) => {
    if (value >= 90) return "bg-green-100 text-green-800";
    if (value >= 80) return "bg-blue-100 text-blue-800";
    if (value >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Classes</h1>
        <p className="text-gray-600">Manage and view details for all your classes</p>

        <div className="mt-6 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-1/2">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
              placeholder="Search classes, subjects, or grades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Class Name</option>
              <option value="grade">Grade Level</option>
              <option value="students">Number of Students</option>
              <option value="performance">Performance</option>
            </select>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((classItem) => (
          <div
            key={classItem.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate({ to: `/teacher/classes/${classItem.id}` })}
          >
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{classItem.name}</h2>
                  <p className="text-sm text-gray-600">{classItem.grade}</p>
                </div>
                <span 
                  className={`text-sm px-2.5 py-0.5 rounded-full ${getStatusBadge(classItem.averagePerformance)}`}
                >
                  {classItem.averagePerformance}%
                </span>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {classItem.subjects.map((subject, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                    {subject}
                  </span>
                ))}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-700">
                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  {classItem.students} Students
                </div>
                
                <div className="flex items-center text-gray-700">
                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {classItem.schedule}
                </div>
                
                <div className="flex items-center text-gray-700">
                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Room {classItem.room}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                {classItem.pendingGrading > 0 ? (
                  <span className="text-sm text-orange-700 flex items-center">
                    <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {classItem.pendingGrading} to grade
                  </span>
                ) : (
                  <span className="text-sm text-green-700 flex items-center">
                    <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    All graded
                  </span>
                )}
                
                {classItem.upcomingAssignments > 0 && (
                  <span className="text-sm text-blue-700 flex items-center">
                    <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {classItem.upcomingAssignments} upcoming
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredClasses.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No classes found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

export const Route = createFileRoute('/teacher/classes/')({
  component: Classes,
});