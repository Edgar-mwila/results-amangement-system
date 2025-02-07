import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/help-desk')({
  component: () => <div>Hello /help-desk!</div>,
})
