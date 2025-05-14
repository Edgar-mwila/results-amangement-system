import StudentDetails from '@/components/student-details'
import { createFileRoute } from '@tanstack/react-router'

const TeacherStudentView = () => {
  return (
    <StudentDetails
    />
  )
}

export const Route = createFileRoute(
  '/$school/dashboard/classes/$id/student/$id',
)({
  component: TeacherStudentView,
})
