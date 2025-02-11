import SchoolCalendar from '@/components/manage-calendar'
import SchoolProfile from '@/components/school-profile'
import { createFileRoute } from '@tanstack/react-router'

const SchoolManagement = () => {
  return (
    <div className='flex flex-col'>
      <SchoolProfile />
      <SchoolCalendar />
    </div>
  )
}

export const Route = createFileRoute('/admin/school/')({
  component: SchoolManagement,
})
