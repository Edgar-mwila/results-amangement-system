import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teacher/auth/reset-password')({
  component: () => <div>Hello /teacher/auth/reset-password!</div>,
})
