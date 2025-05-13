import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

const Dashboard = () => {
  return (
    <div className="grid grid-cols-4 min-h-[90vh]">
      <div className="bg-[#F2CC8F] p-4 max-h-[90vh]">
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/$school/teacher/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/$school/teacher/classes" params={{ school: 'school-name' }}>My Classes</Link>
            </li>
            <li>
              <Link to="/$school/teacher/assessments" params={{ school: 'school-name' }}>Assessments</Link>
            </li>
            <li>
              <Link to="/$school/teacher/student-performance" params={{ school: 'school-name' }}>Student Performance</Link>
            </li>
            <li>
              <Link to="/$school/teacher/communication" params={{ school: 'school-name' }}>Communications</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="col-span-3 p-4 bg-gray-50 max-h-[90vh] overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/$school/teacher/')({
  component: Dashboard,
})
