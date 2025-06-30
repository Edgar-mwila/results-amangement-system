import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/$school/dashboard/class-management/$id/subject/$id',
)({
  component: () => (
    <div>Hello /$school/dashboard/class-management/$id/subject/$id!</div>
  ),
})
