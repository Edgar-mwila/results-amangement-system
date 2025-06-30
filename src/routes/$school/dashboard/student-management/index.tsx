import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import StudentPage from '@/components/student-page'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StudentData } from '@/components/student-page'

// API function to fetch students
const fetchStudents = async (schoolId: string): Promise<StudentData[]> => {
  const response = await fetch(`/api/${schoolId}/students/`)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch students: ${response.status} ${response.statusText}`)
  }
  
  return response.json()
}

// Loading skeleton component
const StudentPageSkeleton = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <Skeleton className="h-9 w-64 mb-2" />
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Main card skeleton */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-24" />
        </CardHeader>
        <CardContent>
          {/* Search and filters skeleton */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>

          {/* Table skeleton */}
          <div className="rounded-md border">
            <div className="p-4">
              {/* Table header */}
              <div className="flex justify-between mb-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-4" />
              </div>
              
              {/* Table rows */}
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-t">
                  <div className="flex items-center">
                    <Skeleton className="h-8 w-8 rounded-full mr-2" />
                    <div>
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-6 w-12 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-2 w-2 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-5 w-8 rounded-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Error component
interface ErrorDisplayProps {
  error: Error
  onRetry: () => void
}

const ErrorDisplay = ({ error, onRetry }: ErrorDisplayProps) => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Student Management</h1>
        </div>
      </div>

      <Alert className="mb-6 border-red-200 bg-red-50">
        <AlertCircle className="h-4 w-4 text-red-600" />
        <div className="ml-2">
          <h4 className="text-red-800 font-semibold mb-2">Failed to load students</h4>
          <AlertDescription className="text-red-700 mb-4">
            {error.message || 'An unexpected error occurred while fetching student data.'}
          </AlertDescription>
          <Button 
            onClick={onRetry}
            variant="outline"
            size="sm"
            className="border-red-300 text-red-700 hover:bg-red-100"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </Alert>

      {/* Empty state cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="opacity-50">
            <CardHeader>
              <div className="h-5 bg-gray-200 rounded w-32 mb-1" />
              <div className="h-4 bg-gray-200 rounded w-24" />
            </CardHeader>
            <CardContent>
              <div className="text-center text-gray-500">
                <div className="text-2xl font-bold">--</div>
                <div className="text-sm">Data unavailable</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

const StudentManagement = () => {
  const { school } = Route.useParams()
  
  const {
    data: students,
    isLoading,
    error,
    refetch,
    isError
  } = useQuery({
    queryKey: ['students', school],
    queryFn: () => fetchStudents(school),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })

  if (isLoading) {
    return <StudentPageSkeleton />
  }

  if (isError) {
    return <ErrorDisplay error={error as Error} onRetry={() => refetch()} />
  }

  return <StudentPage students={students || []} />
}

export const Route = createFileRoute('/$school/dashboard/student-management/')({
  component: StudentManagement,
})