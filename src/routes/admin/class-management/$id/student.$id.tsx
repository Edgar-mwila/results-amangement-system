import { StudentPage } from '@/components/student-page'
import { createFileRoute } from '@tanstack/react-router'

const AdminStudentView = () => {
  const { id } = Route.useParams({})
  return (
    <StudentPage userRole='admin' studentId={id} studentName={'Edgar Mwila'} />
  )
}

export const Route = createFileRoute('/admin/class-management/$id/student/$id')(
  {
    component: AdminStudentView,
  },
)
