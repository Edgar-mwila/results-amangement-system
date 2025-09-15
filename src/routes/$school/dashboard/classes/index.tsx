import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Users, Search, BookOpen, AlertCircle, RefreshCw } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { UserData } from "@/types" // optional: if you move types to a types file

const Classes = () => {
  const { school } = Route.useParams()
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate();
  const teacherId = JSON.parse(localStorage.getItem("user")!).id

  const {
    data: userData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["teacher-classes", school, teacherId],
    queryFn: async (): Promise<UserData> => {
      const response = await fetch(`/api/${school}/users/${teacherId}`)
      if (!response.ok) throw new Error("Failed to fetch user data")
      return response.json()
    },
    enabled: !!school && !!teacherId,
  })

  const myClasses = userData?.classesManaged.map((classItem) => ({
    id: classItem.id.toString(),
    name: classItem.name,
    grade: classItem.grade.level,
    subjects: userData.subjectsTeaching
      .filter((cs) => cs.classModel.id === classItem.id)
      .map((cs) => cs.subject.name),
    schedule: "Schedule TBD", // Replace if actual schedule is available
    students: classItem.classStudents.length,
    averagePerformance: 0, // You can calculate from assessments
    recentTopics: [],
    room: "Room TBD",
    upcomingAssignments: 0,
    pendingGrading: 0,
    teacher: `${userData.firstName} ${userData.lastName}`,
  })) || []

  const additionalClasses = userData?.subjectsTeaching.map((subject) => ({
      id: subject.classModel.id.toString(),
      name: subject.classModel.name,
      grade: subject.classModel.grade.level,
      subjects: subject ? [subject.subject.name] : [],
      schedule: "Schedule TBD", // Replace if actual schedule is available
      students: subject.classModel.classStudents.length,
      averagePerformance: 0, // You can calculate from assessments
      recentTopics: [],
      room: "Room TBD",
      upcomingAssignments: 0,
      pendingGrading: 0,
      teacher: `${userData.firstName} ${userData.lastName}`,
    }) 
  ) || [];

  const transformedClasses = myClasses.concat(additionalClasses);

  const filteredClasses = transformedClasses
    .filter(
      (cls) =>
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.subjects.some((subject) =>
          subject.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    )
    .sort((a, b) => a.name.localeCompare(b.name))

  const ClassSkeleton = () => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1 md:h-auto w-full h-1 bg-gray-200"></div>
        <div className="p-5 flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                <Skeleton className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-20 mb-3" />
                <div className="flex flex-wrap gap-1.5">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white min-h-screen">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">My Classes</h1>
            <p className="text-gray-600">
              {userData
                ? `${userData.firstName} ${userData.lastName}`
                : "Loading..."}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
          <div className="relative w-full md:w-1/2">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="text"
              className="bg-white border border-gray-200 text-gray-800 text-sm rounded-lg block w-full pl-10 p-2.5 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
              placeholder="Search classes, subjects, or grades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
      </header>

      {/* Error State */}
      {error && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load classes. Please try again.
            <button
              onClick={() => refetch()}
              className="ml-2 inline-flex items-center gap-1 text-green-600 hover:text-green-800"
            >
              <RefreshCw className="w-3 h-3" />
              Retry
            </button>
          </AlertDescription>
        </Alert>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <ClassSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Main List */}
      {!isLoading && !error && (
        <div className="space-y-4">
          {filteredClasses.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
              onClick={() => navigate({ 
                    to: "/$school/dashboard/class-management/$id",
                    params: { school: school, id: classItem.id }
                  })}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1 md:h-auto w-full h-1 bg-gradient-to-r md:bg-gradient-to-b from-green-400 to-green-400"></div>
                <div className="p-5 flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-green-50 text-green-400">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">
                          {classItem.name}
                        </h2>
                        <p className="text-sm text-gray-600">{classItem.grade}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {classItem.subjects.map((subject, idx) => (
                            <span
                              key={idx}
                              className="bg-green-50 text-green-400 text-xs px-2.5 py-1 rounded-md border border-green-200 font-medium"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center text-gray-700 bg-gray-50 px-3 py-1 rounded-md">
                        <Users className="w-4 h-4 mr-1.5 text-green-400" />
                        <span className="font-medium">{classItem.students}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Match */}
      {!isLoading && !error && filteredClasses.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-800">No classes found</h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            We couldn't find any classes matching your search criteria.
          </p>
          <button
            onClick={() => setSearchTerm("")}
            className="mt-4 px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-500 transition-colors"
          >
            Clear search
          </button>
        </div>
      )}

      {/* No Classes */}
      {!isLoading && !error && transformedClasses.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-800">No classes assigned</h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            You don't have any classes assigned yet.
          </p>
        </div>
      )}
    </div>
  )
}

export const Route = createFileRoute("/$school/dashboard/classes/")({
  component: Classes,
})
