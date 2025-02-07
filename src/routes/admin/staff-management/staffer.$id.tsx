import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/staff-management/staffer/$id')({
  component: () => <div>Hello /admin/staff-management/staffer/$id!</div>,
})
