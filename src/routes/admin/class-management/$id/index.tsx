import { AnyRoute, createRoute } from '@tanstack/react-router'
import ClassView from '@/components/class'
import { Route as AdminRoute } from '../../index'

export const Route = createRoute({
  path: '/admin/class-management/$id/',
  component: ClassView,
  getParentRoute: () => AdminRoute as AnyRoute,
})
