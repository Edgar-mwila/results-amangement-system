import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/student-management/')({
  component: () => <div>Hello /admin/student-management/!</div>,
})
