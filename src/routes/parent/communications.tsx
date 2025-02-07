import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/parent/communications')({
  component: () => <div>Hello /parent/communications!</div>,
})
