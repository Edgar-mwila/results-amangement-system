import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

const Dashboard = () => {
  return (
    <div className="grid grid-cols-5 p-0 m-0">
      <div className="bg-[#F2CC8F] h-[85vh] p-4">
        <ul>
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
      </div>
      <div className="col-span-4 max-h-[85vh] overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/teacher/')({
  component: Dashboard,
})
