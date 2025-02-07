import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teacher/classes/id/assesments')({
  component: () => <div>Hello /teacher/classes/id/assesments!</div>,
})
