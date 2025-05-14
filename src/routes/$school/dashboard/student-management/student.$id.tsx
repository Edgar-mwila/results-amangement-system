import { StudentPage } from '@/components/student-page'
import { createFileRoute } from '@tanstack/react-router'

const AdminStudentView = () => {
  const { id } = Route.useParams({})
  return (
    <StudentPage userRole="admin" studentId={id} studentName={'Edgar Mwila'} />
  )
}

export const Route = createFileRoute(
  '/$school/dashboard/student-management/student/$id',
)({
  component: AdminStudentView,
})
