import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/class-management/id/student/$id')({
  component: () => <div>Hello /admin/class-management/id/student/$id!</div>,
})
