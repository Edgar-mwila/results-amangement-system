import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$school/teacher/auth/reset-password')({
  component: () => <div>Hello /teacher/auth/reset-password!</div>,
})
