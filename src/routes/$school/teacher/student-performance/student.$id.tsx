import { StudentPage } from '@/components/student-page'
import { createFileRoute } from '@tanstack/react-router'

const TeacherStudentPage = () => {
  const { id } = Route.useParams({})
  return (
    <StudentPage
      userRole="classTeacher"
      studentId={id}
      studentName={'Edgar Mwila'}
      classTeacherSubject="Mathematics"
    />
  )
}

export const Route = createFileRoute(
  '/$school/teacher/student-performance/student/$id',
)({
  component: TeacherStudentPage,
})
