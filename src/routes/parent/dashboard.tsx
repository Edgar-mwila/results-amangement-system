import { createFileRoute } from '@tanstack/react-router';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import SchoolCalendar from '@/components/school-calendar';
import { useState } from 'react';
import { Bell, BookOpen, Calendar, CheckCircle } from 'lucide-react';

export const Route = createFileRoute('/parent/dashboard')({
  component: () => <ParentDashboard />,
});

const ParentDashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const children = [
    {
      id: 1,
      name: 'Emma Johnson',
      grade: '3rd Grade',
      teacher: 'Ms. Peterson',
      attendance: '95%',
      nextAssessment: '2025-04-15',
      recentGrade: 'A-'
    },
    {
      id: 2,
      name: 'Noah Johnson',
      grade: '5th Grade',
      teacher: 'Mr. Thompson',
      attendance: '98%',
      nextAssessment: '2025-04-12',
      recentGrade: 'B+'
    }
  ];

  const totals = {
    upcomingAssessments: 5,
    notifications: 8,
    pendingPermissions: 2,
  };

  const stats = {
    attendanceAverage: '96.5%',
    nextParentTeacherMeeting: '2025-04-20',
    homeworkCompletion: '92%',
  };

  const activityLogs = [
    {
      child: 'Emma Johnson',
      time: '2025-04-09 09:30 AM',
      action: 'Grade Posted',
      remarks: 'Math Quiz: A-',
    },
    {
      child: 'Noah Johnson',
      time: '2025-04-08 03:15 PM',
      action: 'Homework Assigned',
      remarks: 'Science project due on April 15',
    },
    {
      child: 'Emma Johnson',
      time: '2025-04-08 10:45 AM',
      action: 'Attendance Marked',
      remarks: 'Present',
    },
    {
      child: 'Noah Johnson',
      time: '2025-04-07 02:00 PM',
      action: 'Permission Slip',
      remarks: 'Field trip to Science Museum needs approval',
    },
  ];

  const upcomingEvents = [
    {
      date: '2025-04-15',
      title: 'Science Fair',
      child: 'Noah Johnson',
      details: 'Students will present their science projects'
    },
    {
      date: '2025-04-20',
      title: 'Parent-Teacher Conference',
      child: 'Both Children',
      details: 'Scheduled for 4:00 PM - 6:00 PM'
    },
    {
      date: '2025-04-25',
      title: 'School Play',
      child: 'Emma Johnson',
      details: 'Emma has a role as a supporting character'
    },
  ];

  return (
    <div className="flex flex-col justify-center min-w-full p-4 space-y-8">
      {/* Children Summary Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-3 text-blue-800">Your Children</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children.map(child => (
            <div key={child.id} className="border border-custom-text rounded-lg p-4 bg-white shadow">
              <h3 className="text-lg font-medium mb-2">{child.name}</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Grade</p>
                  <p className="font-medium">{child.grade}</p>
                </div>
                <div>
                  <p className="text-gray-500">Teacher</p>
                  <p className="font-medium">{child.teacher}</p>
                </div>
                <div>
                  <p className="text-gray-500">Attendance</p>
                  <p className="font-medium">{child.attendance}</p>
                </div>
                <div>
                  <p className="text-gray-500">Recent Grade</p>
                  <p className="font-medium">{child.recentGrade}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between">
                <span className="text-sm text-gray-500">Next Assessment: {child.nextAssessment}</span>
                <button className="text-blue-600 text-sm hover:underline">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col border border-custom-text text-custom-text p-4 space-y-2 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <BookOpen size={20} className="text-blue-600 mr-2" />
            <p>Upcoming Assessments</p>
          </div>
          <p className="text-2xl font-semibold">{totals.upcomingAssessments}</p>
        </div>
        <div className="flex flex-col border border-custom-text text-custom-text p-4 space-y-2 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <Bell size={20} className="text-blue-600 mr-2" />
            <p>New Notifications</p>
          </div>
          <p className="text-2xl font-semibold">{totals.notifications}</p>
        </div>
        <div className="flex flex-col border border-custom-text text-custom-text p-4 space-y-2 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle size={20} className="text-blue-600 mr-2" />
            <p>Pending Permissions</p>
          </div>
          <p className="text-2xl font-semibold">{totals.pendingPermissions}</p>
        </div>
      </div>
      
      {/* Notifications Panel */}
      <div className="col-span-2 flex flex-col border border-custom-text text-custom-text p-4 space-y-4 bg-blue-50 rounded-md shadow">
        <p className="font-semibold text-lg">Notifications</p>
        <ul className="space-y-2">
          {activityLogs.slice(0, 3).map((log, index) => (
            <li key={index} className="text-sm text-gray-700">
              <span className="font-medium">{log.child}:</span> {log.action} - {log.remarks}
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

      {/* Activity Log */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xl font-semibold text-blue-800">Recent Activity</span>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button 
              className={`px-3 py-1 text-sm ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            {children.map(child => (
              <button 
                key={child.id}
                className={`px-3 py-1 text-sm ${activeTab === child.id.toString() ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setActiveTab(child.id.toString())}
              >
                {child.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
        <Table className="w-full border border-custom-text rounded-md bg-white shadow">
          <TableRow className="bg-[#F2CC8F] hover:bg-[#F2CC8F]">
            <TableCell className="font-bold text-base">Child</TableCell>
            <TableCell className="font-bold text-base">Time</TableCell>
            <TableCell className="font-bold text-base">Action</TableCell>
            <TableCell className="font-bold text-base">Details</TableCell>
          </TableRow>
          <TableBody>
            {activityLogs
              .filter(log => activeTab === 'all' || log.child === children.find(c => c.id.toString() === activeTab)?.name)
              .map((log, index) => (
                <TableRow key={index + 1} className="hover:bg-gray-50">
                  <TableCell className="text-left">{log.child}</TableCell>
                  <TableCell className="text-left">{log.time}</TableCell>
                  <TableCell className="text-left">{log.action}</TableCell>
                  <TableCell className="text-left">{log.remarks}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Upcoming Events */}
      <div>
        <h2 className="text-xl font-semibold mb-3 text-blue-800 flex items-center">
          <Calendar size={20} className="mr-2" />
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="border border-custom-text rounded-lg p-4 bg-white shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.child}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{event.date}</span>
              </div>
              <p className="text-sm text-gray-700">{event.details}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Additional Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col border border-custom-text text-custom-text p-4 space-y-4 bg-white rounded-lg shadow">
          <p>Attendance Average</p>
          <p className="text-2xl font-semibold">{stats.attendanceAverage}</p>
        </div>
        <div className="flex flex-col border border-custom-text text-custom-text p-4 space-y-4 bg-white rounded-lg shadow">
          <p>Next Parent-Teacher Meeting</p>
          <p className="text-2xl font-semibold">{stats.nextParentTeacherMeeting}</p>
        </div>
        <div className="flex flex-col border border-custom-text text-custom-text p-4 space-y-4 bg-white rounded-lg shadow">
          <p>Homework Completion</p>
          <p className="text-2xl font-semibold">{stats.homeworkCompletion}</p>
        </div>
      </div>
      
      {/* School Calendar */}
      <SchoolCalendar edit={false} />
    </div>
  );
};