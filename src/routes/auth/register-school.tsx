import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/register-school')({
  component: () => <div>Hello /auth/register-school!</div>,
})
