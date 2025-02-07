import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/school/')({
  component: () => <div>Hello /admin/school/!</div>,
})
