import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

const Dashboard = () => {
  return (
    <div className="grid grid-cols-4 min-h-[90vh]">
      <div className="bg-[#F2CC8F] p-4 max-h-[90vh]">
        <nav>
          <ul className="space-y-2">
          <li>
            <Link to="/teacher/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/teacher/classes">My Classes</Link>
          </li>
          <li>
            <Link to="/teacher/assessments">Assessments</Link>
          </li>
          <li>
            <Link to="/teacher/student-performance">Student Performance</Link>
          </li>
          <li>
            <Link to="/teacher/communication">Communications</Link>
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

export const Route = createFileRoute('/teacher/')({
  component: Dashboard,
})
