import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/auth/reset-password')({
  component: () => <div>Hello /admin/auth/reset-password!</div>,
})
