import StudentDetails from '@/components/student-details'
import { createFileRoute } from '@tanstack/react-router'

const AdminStudentView = () => {
  return (
    <StudentDetails />
  )
}

export const Route = createFileRoute(
  '/$school/dashboard/class-management/$id/student/$id',
)({
  component: AdminStudentView,
})
