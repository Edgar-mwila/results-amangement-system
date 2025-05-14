import { createFileRoute } from '@tanstack/react-router'
import { TeacherDetailView } from '@/components/teacher-profile'
import { AdminDetailView } from '@/components/admin-profile'

// Define the search params interface
interface StafferSearchParams {
  role?: string
}

const Staffer = () => {
  // Use the typed Route.useSearch() to get the search params
  const search = Route.useSearch<StafferSearchParams>()
  const role = search.role

  if (role === 'teacher') {
    return <TeacherDetailView />
  }

  if (role !== '') {
    return <AdminDetailView />
  }

  return <div>Invalid role</div>
}

export const Route = createFileRoute(
  '/$school/dashboard/staff-management/staffer/$id',
)({
  component: Staffer,
  validateSearch: (search: Record<string, unknown>): StafferSearchParams => {
    return {
      role: search.role as string | undefined,
    }
  },
})
