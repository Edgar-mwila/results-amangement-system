import StudentPage from '@/components/student-page'
import { createFileRoute } from '@tanstack/react-router'

const StudentPerformance = () => {
  return <StudentPage />
}

export const Route = createFileRoute('/$school/dashboard/student-management/')({
  component: StudentPerformance,
})
