import { AnyRoute, createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './index' 
export const Route = createRoute({
  path: '/teacher/dashboard',
  getParentRoute: () => RootRoute as AnyRoute,
  component: () => <div>Hello /teacher/!</div>,
})
