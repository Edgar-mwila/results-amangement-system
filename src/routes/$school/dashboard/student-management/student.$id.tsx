import StudentDetails from '@/components/student-details'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'

function StudentDetailsSkeleton() {
  return (
    <div className="container mx-auto p-4 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center">
          <div className="h-16 w-16 mr-4 bg-gray-200 rounded-full" />
          <div>
            <div className="h-6 w-40 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-60 bg-gray-100 rounded mb-2" />
            <div className="flex gap-2 mt-1">
              <div className="h-5 w-16 bg-gray-200 rounded" />
              <div className="h-5 w-12 bg-gray-200 rounded" />
              <div className="h-5 w-16 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <div className="h-10 w-32 bg-gray-200 rounded" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Grades Skeleton */}
        <div className="lg:col-span-2">
          <div className="h-6 w-48 bg-gray-200 rounded mb-4" />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-5 w-32 bg-gray-100 rounded" />
                <div className="h-5 w-24 bg-gray-100 rounded" />
                <div className="h-5 w-20 bg-gray-100 rounded" />
                <div className="h-5 w-16 bg-gray-100 rounded ml-auto" />
              </div>
            ))}
          </div>
        </div>
        {/* Personal Details Skeleton */}
        <div>
          <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start p-3 bg-gray-50 rounded-lg">
                <div className="h-5 w-5 bg-gray-200 rounded-full mr-3 mt-0.5" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 bg-gray-100 rounded" />
                  <div className="h-4 w-40 bg-gray-100 rounded" />
                  <div className="h-3 w-32 bg-gray-100 rounded" />
                </div>
              </div>
            ))}
            {/* Guardians Skeleton */}
            <div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
              {[...Array(2)].map((_, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 bg-gray-200 rounded-full" />
                    <div className="h-4 w-24 bg-gray-100 rounded" />
                  </div>
                  <div className="h-3 w-20 bg-gray-100 rounded mt-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Summary Statistics Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 bg-gray-50 rounded">
            <div className="h-8 w-12 bg-gray-200 rounded mx-auto mb-2" />
            <div className="h-4 w-20 bg-gray-100 rounded mx-auto" />
          </div>
        ))}
      </div>
    </div>
  )
}

function StudentDetailsError({ message }: { message?: string }) {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="mb-4">
          <svg className="h-12 w-12 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-red-600 mb-2">Failed to load student details</h2>
        <p className="text-gray-500 mb-4">{message || "Something went wrong. Please try again later."}</p>
        <StudentDetailsSkeleton />
      </div>
    </div>
  )
}


const TeacherStudentPage = () => {
  const { school, id } = useParams({ strict: false })

  const { data: student, isLoading, error } = useQuery({
    queryKey: ['student', school, id],
    queryFn: async () => {
      const res = await fetch(`/api/${school}/students/${id}`)
      if (!res.ok) throw new Error('Failed to fetch student')
      return res.json()
    },
  })

  if (isLoading) return <StudentDetailsSkeleton />
  if (!student) return <StudentDetailsError message="No student data found." />
  if (error) return <StudentDetailsError message={error.message} />

  return <StudentDetails student={student} classSubjects={student.classStudents[0].classModel.classSubjects} isAdmin />
}

export const Route = createFileRoute(
  '/$school/dashboard/student-management/student/$id',
)({
  component: TeacherStudentPage,
})
