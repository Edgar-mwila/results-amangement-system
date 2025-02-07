import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/class-management/')({
  component: () => <div>Hello /admin/class-management/!</div>,
})
