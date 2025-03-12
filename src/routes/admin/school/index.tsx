import SchoolCalendar from '@/components/school-calendar'
import SchoolProfile from '@/components/school-profile'
import { AnyRoute, createRoute } from '@tanstack/react-router'
import { Route as AdminRoute } from '../index'

const SchoolManagement = () => {
  return (
    <div className='flex flex-col'>
      <SchoolProfile />
      <SchoolCalendar edit={true} />
    </div>
  )
}

export const Route = createRoute({
  path: '/admin/school/',
  component: SchoolManagement,
  getParentRoute: () => AdminRoute as AnyRoute,
})
