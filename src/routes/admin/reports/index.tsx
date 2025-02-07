import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/reports/')({
  component: () => <div>Hello /admin/reports/!</div>,
})
