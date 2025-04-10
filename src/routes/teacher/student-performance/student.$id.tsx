import { StudentPage } from '@/components/student-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/teacher/student-performance/student/$id',
)({
    component: StudentPage,
})
