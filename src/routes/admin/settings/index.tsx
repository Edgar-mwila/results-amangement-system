import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/settings/')({
  component: () => <div>Hello /admin/settings/!</div>,
})
