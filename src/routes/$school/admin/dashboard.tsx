import { createFileRoute } from '@tanstack/react-router'
import { Route as AdminRoute } from './index'

const Dashboard = () => {
  return (
    <div>
      Dashboard here
    </div>
  )
}

export const Route = createFileRoute('/$school/admin/dashboard')({
  component: Dashboard,
  parentRoute: AdminRoute,
})
