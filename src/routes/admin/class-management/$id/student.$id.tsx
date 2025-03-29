import { StudentPage } from '@/components/student-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/class-management/$id/student/$id')(
  {
    component: StudentPage,
  },
)
