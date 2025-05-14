import StudentDetails from '@/components/student-details'
import { createFileRoute } from '@tanstack/react-router'

const TeacherStudentPage = () => {
  return <StudentDetails />
}

export const Route = createFileRoute(
  '/$school/dashboard/student-management/student/$id',
)({
  component: TeacherStudentPage,
})
