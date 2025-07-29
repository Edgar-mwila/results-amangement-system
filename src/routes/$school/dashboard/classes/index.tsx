import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Users, Search, BookOpen, AlertCircle, RefreshCw } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"

// TypeScript interfaces based on your Java models
interface Subject {
  id: number
  name: string
  code: string
  url?: string
  createdAt: string
}

interface ClassSubject {
  id: number
  subject: Subject
  teacher: User
  createdAt: string
}

interface Student {
  id: number
  firstName: string
  otherName?: string
  lastName: string
  sex: 'M' | 'F'
  dateOfBirth: string
  gender: string
  status: string
  stateProvince?: string
  city?: string
  township?: string
  address?: string
  postalAddress?: string
  photoUrl?: string
  createdAt: string
}

interface ClassStudent {
  id: number
  student: Student
  createdAt: string
}

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  profilePhotoUrl?: string
  status: string
  lastLogin?: string
  createdAt: string
}

interface ClassModel {
  id: number
  name: string
  grade: string
  room?: string
  schedule?: string
  classTeacher: User
  subjects: ClassSubject[]
  students: ClassStudent[]
  createdAt: string
}

// API response type
interface ClassesResponse {
  classes: ClassModel[]
}

const Classes = () => {
  const { school } = Route.useParams()
  const [searchTerm, setSearchTerm] = useState("")
  
  // You'll need to get the teacherId from your auth context or route params
  // For now, I'm using a placeholder - replace with actual teacher ID
  const teacherId = JSON.parse(localStorage.getItem('user')!).id

  // Fetch classes using TanStack Query
  const {
    data: classesData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['teacher-classes', school, teacherId],
    queryFn: async (): Promise<ClassModel[]> => {
      // Updated endpoint as per user instruction
      const response = await fetch(`/api/${school}/classes/teacher/${teacherId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch classes')
      }
      // Assume the new endpoint returns an array of ClassModel directly
      const data: ClassModel[] = await response.json()
      return data
    },
    enabled: !!school && !!teacherId,
  })

  // Transform API data to match the original mock structure
  const transformedClasses = classesData?.map((classItem: ClassModel) => ({
    id: classItem.id.toString(),
    name: classItem.name,
    grade: classItem.grade,
    subjects: classItem.subjects.map((cs: ClassSubject) => cs.subject.name),
    schedule: classItem.schedule || "Schedule TBD",
    students: classItem.students.length,
    averagePerformance: 0, // You might want to calculate this from assessments
    recentTopics: [], // You might want to fetch this from recent lessons/assessments
    room: classItem.room || "Room TBD",
    upcomingAssignments: 0, // You might want to fetch this from assessments
    pendingGrading: 0, // You might want to fetch this from assessments
    teacher: `${classItem.classTeacher.firstName} ${classItem.classTeacher.lastName}`
  })) || []

  // Filter classes based on search term
  const filteredClasses = transformedClasses.filter(
    (cls: any) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.subjects.some((subject: string) => subject.toLowerCase().includes(searchTerm.toLowerCase())),
  ).sort((a: any, b: any) => a.name.localeCompare(b.name))

  // Loading skeleton component
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
              {classesData && classesData.length > 0 
                ? `${classesData[0].classTeacher.firstName} ${classesData[0].classTeacher.lastName}`
                : "Loading..."
              }
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
              className="bg-white border border-gray-200 text-gray-800 text-sm rounded-lg block w-full pl-10 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
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
              className="ml-2 inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
            >
              <RefreshCw className="w-3 h-3" />
              Retry
            </button>
          </AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <ClassSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Classes List */}
      {!isLoading && !error && (
        <div className="space-y-4">
          {filteredClasses.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
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
                        <h2 className="text-xl font-bold text-gray-800">
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
                      <div className="flex items-center text-gray-700 bg-gray-50 px-3 py-1 rounded-md">
                        <Users className="w-4 h-4 mr-1.5 text-blue-400" />
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

      {/* No Results State */}
      {!isLoading && !error && filteredClasses.length === 0 && classesData && classesData.length > 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-800">No classes found</h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            We couldn't find any classes matching your search criteria. Try adjusting your search.
          </p>
          <button
            onClick={() => setSearchTerm("")}
            className="mt-4 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Clear search
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && (!classesData || classesData.length === 0) && (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-800">No classes assigned</h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            You don't have any classes assigned yet. Contact your administrator for more information.
          </p>
        </div>
      )}
    </div>
  )
}

export const Route = createFileRoute("/$school/dashboard/classes/")({
  component: Classes,
})