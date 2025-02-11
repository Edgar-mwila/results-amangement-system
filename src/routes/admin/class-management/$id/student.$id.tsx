import { StudentPage } from '@/components/studentPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/class-management/$id/student/$id')(
  {
    component: StudentPage,
  },
)
