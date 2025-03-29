import { StudentPage } from '@/components/student-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/student-management/student/$id')({
  component: StudentPage,
})
