import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/parent/student/$id')({
  component: () => <div>Hello /parent/student/$id!</div>,
})
