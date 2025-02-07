import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teacher/communication/')({
  component: () => <div>Hello /teacher/communication/!</div>,
})
