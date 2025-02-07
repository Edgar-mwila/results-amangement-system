import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/student-management/student/$id')({
  component: () => <div>Hello /admin/student-management/student/$id!</div>,
})
