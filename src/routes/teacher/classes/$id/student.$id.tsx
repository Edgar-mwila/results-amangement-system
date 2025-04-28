import { StudentPage } from '@/components/student-page'
import { createFileRoute } from '@tanstack/react-router'


const TeacherStudentView = () => {
  const { id } = Route.useParams({})
  return (
    <StudentPage userRole='subjectTeacher' studentId={id} studentName={'Edgar Mwila'} teacherSubject='Mathematics'/>
  )
}

export const Route = createFileRoute('/teacher/classes/$id/student/$id')({
  component: TeacherStudentView,
})
