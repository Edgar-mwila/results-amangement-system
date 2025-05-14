import { AnyRoute, createRoute } from '@tanstack/react-router'
import ClassView from '@/components/class'
import { Route as AdminRoute } from '../../index'

const AdminClassView = () => {
  return <ClassView />
}

export const Route = createRoute({
  path: '/$school/dashboard/class-management/$id/',
  component: AdminClassView,
  getParentRoute: () => AdminRoute as AnyRoute,
})
