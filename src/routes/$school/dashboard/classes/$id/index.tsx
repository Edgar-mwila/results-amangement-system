import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import ClassView from '@/components/class'
import { ClassModel } from '@/types';

// API function to fetch class data
const fetchClassData = async (classId: string, school: string): Promise<ClassModel> => {
  const response = await fetch(`/api/${school}/classes/${classId}`, {
    headers: {
      'Content-Type': 'application/json',
      // Add authentication headers if needed
      // 'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch class data: ${response.statusText}`);
  }

  return response.json();
};

const TeacherClassView = () => {
  const { id, school } = Route.useParams();

  const {
    data: classData,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['class', school, id],
    queryFn: () => fetchClassData(id, school),
    enabled: !!id && !!school, // Only run query if both params exist
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading class data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Failed to load class data
            </h2>
            <p className="text-gray-600 mb-4">
              {error instanceof Error ? error.message : 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success state - render ClassView with data
  if (!classData) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Class not found
            </h2>
            <p className="text-gray-600">
              The requested class could not be found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <ClassView classData={classData} />;
};

export const Route = createFileRoute('/$school/dashboard/classes/$id/')({
  component: TeacherClassView,
})
