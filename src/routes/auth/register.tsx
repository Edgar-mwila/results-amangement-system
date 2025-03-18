import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/register')({
  component: () => <div>Hello /auth/register!</div>,
})
//parent and teacher registration page