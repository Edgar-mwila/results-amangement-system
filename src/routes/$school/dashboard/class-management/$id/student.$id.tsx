import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/$school/dashboard/class-management/$id/student/$id',
)({
  component: () => (
    <div>Hello /$school/dashboard/class-management/$id/studen/$id!</div>
  ),
})
