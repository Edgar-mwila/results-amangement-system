import SchoolProfile from '@/components/school-profile'
import { AnyRoute, createRoute } from '@tanstack/react-router'
import { Route as AdminRoute } from '../index'

const SchoolManagement = () => {
  return (
    <div className='flex flex-col'>
      <SchoolProfile />
    </div>
  )
}

export const Route = createRoute({
  path: '/$school/dashboard/school/',
  component: SchoolManagement,
  getParentRoute: () => AdminRoute as AnyRoute,
})
