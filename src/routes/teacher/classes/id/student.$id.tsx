import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teacher/classes/id/student/$id')({
  component: () => <div>Hello /teacher/classes/id/student/$id!</div>,
})
