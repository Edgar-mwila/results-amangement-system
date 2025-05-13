import { AnyRoute, createRoute } from '@tanstack/react-router'
import { Route as AdminRoute } from './index'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import SchoolCalendar from '@/components/school-calendar'

const Dashboard = () => {
  
  const totals = {
    students: 2047,
    staff: 109,
    classes: 17
  }

  const activityLogs = [
    {
      user: "Mr. Smith",
      time: "2024-02-10 10:15 AM",
      class: "Grade 10A",
      subject: "Mathematics",
      remarks: "Uploaded midterm results",
    },
    {
      user: "Ms. Johnson",
      time: "2024-02-09 03:45 PM",
      class: "Grade 9B",
      subject: "Science",
      remarks: "Corrected a grading error",
    },
    {
      user: "Mr. Adams",
      time: "2024-02-08 11:30 AM",
      class: "Grade 12C",
      subject: "History",
      remarks: "Finalized semester reports",
    },
    {
      user: "Mrs. Taylor",
      time: "2024-02-07 09:20 AM",
      class: "Grade 11A",
      subject: "English",
      remarks: "Removed an incorrect student entry",
    },
  ];

  return (
    <div className="flex flex-col justify-center min-w-full p-4 space-y-8">
      <div className='grid grid-cols-3 gap-4'>
        <div className='flex flex-col border border-custom-text text-custom-text  p-4 space-y-4' >
          <p className=''>Number of students</p>
          <p className='text-2xl font-semibold'>{totals.students}</p>
        </div>
        <div className='flex flex-col border border-custom-text text-custom-text  p-4 space-y-4' >
          <p className=''>Number of staff</p>
          <p className='text-2xl font-semibold'>{totals.staff}</p>
        </div>
        <div className='flex flex-col border border-custom-text text-custom-text  p-4 space-y-4' >
          <p className=''>Number of classes</p>
          <p className='text-2xl font-semibold'>{totals.classes}</p>
        </div>
      </div>
      <div>
        <span className='text-gray-400 font-semibold'>Recent system activity</span>
        <Table className="w-full border border-custom-text rounded-md">
          <TableRow className="bg-[#F2CC8F] hover:bg-[#F2CC8F]">
              <TableCell className="font-bold text-base">User</TableCell>
              <TableCell className="font-bold text-base">Time</TableCell>
              <TableCell className="font-bold text-base">Class</TableCell>
              <TableCell className="font-bold text-base">Subject</TableCell>
              <TableCell className="font-bold text-base">Remarks</TableCell>
          </TableRow>
          <TableBody>
            {activityLogs.map((log, index) => (
              <TableRow key={index+1} className="hover:bg-gray-50">
                <TableCell className="text-left">{log.user}</TableCell>
                <TableCell className="text-left">{log.time}</TableCell>
                <TableCell className="text-left">{log.class}</TableCell>
                <TableCell className="text-left">{log.subject}</TableCell>
                <TableCell className="text-left">{log.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <SchoolCalendar edit={false}/>
    </div>
  )
}

export const Route = createRoute({
  path: '/admin/dashboard',
  component: Dashboard,
  getParentRoute: () => AdminRoute as AnyRoute,
})
