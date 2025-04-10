import { AnyRoute, createRoute } from '@tanstack/react-router';
import { Route as RootRoute } from './index';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import SchoolCalendar from '@/components/school-calendar';

const Dashboard = () => {
  const totals = {
    assessments: 45,
    notifications: 12,
    resultsCompleted: 30,
  };

  const stats = {
    totalAssessments: 120,
    resultsPublicationDate: '2024-03-15',
    studentPerformanceAverage: '85%',
  };

  const activityLogs = [
    {
      user: 'Mr. Smith',
      time: '2024-02-10 10:15 AM',
      action: 'Reviewed pending assessments',
      remarks: 'Completed review for Grade 10A',
    },
    {
      user: 'Ms. Johnson',
      time: '2024-02-09 03:45 PM',
      action: 'Published results',
      remarks: 'Published midterm results for Grade 9B',
    },
    {
      user: 'Mr. Adams',
      time: '2024-02-08 11:30 AM',
      action: 'Sent notifications',
      remarks: 'Notified students about upcoming exams',
    },
    {
      user: 'Mrs. Taylor',
      time: '2024-02-07 09:20 AM',
      action: 'Updated assessment details',
      remarks: 'Corrected errors in Grade 11A assessments',
    },
  ];

  return (
    <div className="flex flex-col justify-center min-w-full p-4 space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col border border-custom-text text-custom-text p-4 space-y-4">
          <p>Pending Assessments</p>
          <p className="text-2xl font-semibold">{totals.assessments}</p>
        </div>
        <div className="flex flex-col border border-custom-text text-custom-text p-4 space-y-4">
          <p>Results Completed</p>
          <p className="text-2xl font-semibold">{totals.resultsCompleted}</p>
        </div>
        <div className="col-span-2 flex flex-col border border-custom-text text-custom-text p-4 space-y-4 bg-blue-50 rounded-md">
          <p className="font-semibold text-lg">Notifications</p>
          <ul className="space-y-2">
        {activityLogs.slice(0, 3).map((log, index) => (
          <li key={index} className="text-sm text-gray-700">
            {log.action} - {log.remarks}
          </li>
        ))}
          </ul>
          <button
        onClick={() => alert('Show all notifications in a modal')}
        className="self-end mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
        View All
          </button>
        </div>
      </div>
      <div>
        <span className="text-gray-400 font-semibold">Recent Activity</span>
        <Table className="w-full border border-custom-text rounded-md">
          <TableRow className="bg-[#F2CC8F] hover:bg-[#F2CC8F]">
            <TableCell className="font-bold text-base">User</TableCell>
            <TableCell className="font-bold text-base">Time</TableCell>
            <TableCell className="font-bold text-base">Action</TableCell>
            <TableCell className="font-bold text-base">Remarks</TableCell>
          </TableRow>
          <TableBody>
            {activityLogs.map((log, index) => (
              <TableRow key={index + 1} className="hover:bg-gray-50">
                <TableCell className="text-left">{log.user}</TableCell>
                <TableCell className="text-left">{log.time}</TableCell>
                <TableCell className="text-left">{log.action}</TableCell>
                <TableCell className="text-left">{log.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col border border-custom-text text-custom-text p-4 space-y-4">
          <p>Total Assessments</p>
          <p className="text-2xl font-semibold">{stats.totalAssessments}</p>
        </div>
        <div className="flex flex-col border border-custom-text text-custom-text p-4 space-y-4">
          <p>Results Publication Date</p>
          <p className="text-2xl font-semibold">{stats.resultsPublicationDate}</p>
        </div>
        <div className="flex flex-col border border-custom-text text-custom-text p-4 space-y-4">
          <p>Student Performance Average</p>
          <p className="text-2xl font-semibold">{stats.studentPerformanceAverage}</p>
        </div>
      </div>
      <SchoolCalendar edit={false} />
    </div>
  );
};

export const Route = createRoute({
  path: '/teacher/dashboard',
  component: Dashboard,
  getParentRoute: () => RootRoute as AnyRoute,
});
