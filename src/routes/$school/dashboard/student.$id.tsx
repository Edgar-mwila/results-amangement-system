import StudentDetails from '@/components/student-details'
import { createFileRoute } from '@tanstack/react-router'

const ParentStudentView = () => {
  return (
    <StudentDetails />
  )
}

export const Route = createFileRoute('/$school/dashboard/student/$id')({
  component: ParentStudentView,
})
