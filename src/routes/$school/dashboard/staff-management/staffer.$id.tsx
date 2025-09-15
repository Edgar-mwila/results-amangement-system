import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import UserProfile from '@/components/user-profile'
import { PersonalDetailsForm, PasswordForm, Role } from '@/types';
import { UserData } from '@/components/user-profile';
export interface ApiEndpoints {
  school: string;
  updatePersonalDetails: (school: string, userId: string, data: PersonalDetailsForm) => Promise<void>;
  updatePassword: (school: string, userId: string, data: PasswordForm) => Promise<void>;
  updateRole: (school: string, userId: string, roleId: string) => Promise<void>;
  getRoles: () => Promise<Role[]>;
}

// API Functions
const fetchUserData = async (userId: string, school: string): Promise<UserData> => {
  const response = await fetch(`/api/${school}/users/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
};

const updatePersonalDetails = async (school: string,userId: string, data: PersonalDetailsForm): Promise<void> => {
  const response = await fetch(`/api/${school}/users/${userId}/personal-details`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update personal details');
  }
};

const updatePassword = async (school: string,userId: string, data: PasswordForm): Promise<void> => {
  const response = await fetch(`/api/${school}/users/${userId}/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update password');
  }
};

const updateRole = async (school: string,userId: string, roleId: string): Promise<void> => {
  const response = await fetch(`/api/${school}/users/${userId}/role`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ roleId }),
  });
  if (!response.ok) {
    throw new Error('Failed to update role');
  }
};

// Loading Skeleton Component
const UserProfileSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow">
        <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="h-8 bg-gray-300 rounded w-1/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="h-8 bg-gray-300 rounded w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Error Component
const ErrorMessage = ({ error, onRetry }: { error: Error; onRetry: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200">
      <div className="text-red-600 mb-4">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.982 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading User Data</h3>
      <p className="text-red-600 text-center mb-4">{error.message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};

const Staffer = () => {
  const { school, id } = Route.useParams();

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  // Fetch user data
  const {
    data: userData,
    isLoading: isLoadingUser,
    error: userError,
    refetch: refetchUser
  } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUserData(id, school),
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const roles: Role[] = [{ id: '1', name: 'Administrator' }, { id: '2', name: 'Teacher' }];

  // Handle loading states
  if (isLoadingUser) {
    return <UserProfileSkeleton />;
  }

  // Handle error states
  if (userError) {
    return <ErrorMessage error={userError as Error} onRetry={() => refetchUser()} />;
  }

  // Handle missing data
  if (!userData) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">User Not Found</h3>
          <p className="text-gray-600">The requested user could not be found.</p>
        </div>
      </div>
    );
  }

  // Create API endpoints object
  const apiEndpoints: ApiEndpoints = {
    school,
    updatePersonalDetails,
    updatePassword,
    updateRole,
    getRoles: () => Promise.resolve(roles || []),
  };


  return (
    <UserProfile 
      user={userData} 
      api={apiEndpoints} 
      isCurrentUser={userData.id == currentUser.id}
    />
  );
};

export const Route = createFileRoute(
  '/$school/dashboard/staff-management/staffer/$id',
)({
  component: Staffer,
});