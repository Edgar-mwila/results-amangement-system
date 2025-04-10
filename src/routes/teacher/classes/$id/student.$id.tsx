import { StudentPage } from '@/components/student-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teacher/classes/$id/student/$id')({
  component: StudentPage,
})
