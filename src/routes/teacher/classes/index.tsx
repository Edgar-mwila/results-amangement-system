import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teacher/classes/')({
  component: () => <div>Hello /teacher/classes/!</div>,
})
