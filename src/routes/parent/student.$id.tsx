import { StudentPage } from '@/components/student-page'
import { createFileRoute } from '@tanstack/react-router'

const ParentStudentView = () => {
      const { id } = Route.useParams({})
      return (
            <StudentPage userRole='parent' studentId={id} studentName={'Edgar Mwila'} />
      )
}

export const Route = createFileRoute('/parent/student/$id')({
      component: ParentStudentView,
})
