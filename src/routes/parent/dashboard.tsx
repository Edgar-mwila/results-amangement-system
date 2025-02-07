import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/parent/dashboard')({
  component: () => <div>Hello /parent/!</div>,
})
