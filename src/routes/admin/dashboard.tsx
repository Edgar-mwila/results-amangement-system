import { AnyRoute, createRoute } from '@tanstack/react-router'
import { Route as AdminRoute } from './index'

const Dashboard = () => {
  return (
    <div className="grid grid-cols-4 min-h-screen">
      hello admin
    </div>
  )
}

export const Route = createRoute({
  path: '/admin/dashboard',
  component: Dashboard,
  getParentRoute: () => AdminRoute as AnyRoute,
})
