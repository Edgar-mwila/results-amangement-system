import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/staff-management/')({
  component: () => <div>Hello /admin/staff-management/!</div>,
})
