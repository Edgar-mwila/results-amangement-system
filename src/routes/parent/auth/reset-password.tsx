import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/parent/auth/reset-password')({
  component: () => <div>Hello /parent/auth/reset-password!</div>,
})
