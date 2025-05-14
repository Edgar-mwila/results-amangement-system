import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/$school/dashboard/settings/auth/reset-password',
)({
  component: () => <div>Hello /admin/auth/reset-password!</div>,
})
