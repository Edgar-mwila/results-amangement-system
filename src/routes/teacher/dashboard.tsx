import { AnyRoute, createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './index' 
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

const Dashboard = () => {
  const Schedule = [
    {
      class: '11A',
      room: 'room 3',
      subject: 'Mathematics',
      time: '11:00'
    },
    {
      class: '12C',
      room: 'room 3',
      subject: 'Mathematics',
      time: '13:00'
    },
    {
      class: '10A',
      room: 'room 3',
      subject: 'Mathematics',
      time: '15:00'
    }
  ]
  return (
    <div>
      <div className='p-5 m-2 text-2xl'>
        WELCOME, TEACHER!  
      </div>
      <div className='grid grid-cols-3 gap-3 p-5'>
        <div className='border border-custom-text p-2'>
          <h1 className='font-bold text-xl text-custom-text'>Todays classes</h1>
          <p className='text-custom-tex'>3 classes</p>
        </div>
        <div className='border border-custom-text p-2'>
          <h1 className='font-bold text-xl text-custom-text'>Pending assessments</h1>
          <p className='text-custom-tex'>2 assessments</p>
        </div>
        <div className='border border-custom-text p-2'>
          <h1 className='font-bold text-xl text-custom-text'>Messages</h1>
          <p className='text-custom-text'>5 new messages</p>
        </div>
      </div>
      
      <div >Todays Schedule</div>
      <div className='mb-5'>
        <Table className='border border-custom-text p-2'>
          <TableRow className='bg-[#F2CC8F] hover:bg-[#F2CC8F] font-bold text-xl'>
            <TableCell>Class</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>room</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
          <TableBody>
            {Schedule.map((item) => (
              <TableRow>
                <TableCell>{item.class}</TableCell>
                <TableCell>{item.subject}</TableCell>
                <TableCell>{item.room}</TableCell>
                <TableCell>{item.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div >Recent Activities</div>
      <div className=''></div>


    </div>
  )
}

export const Route = createRoute({
  path: '/teacher/dashboard',
  getParentRoute: () => RootRoute as AnyRoute,
  component: Dashboard,
})
