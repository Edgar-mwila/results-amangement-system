import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/$school/dashboard/settings/auth/reset-password',
)({
  component: () => <div>Hello /$school/dashboard/auth/reset-password!</div>,
})
