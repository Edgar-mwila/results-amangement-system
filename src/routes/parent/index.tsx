import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

const Dashboard = () => {
  return (
    <div className="grid grid-cols-4 min-h-[90vh]">
      <div className="bg-[#F2CC8F] p-4 max-h-[90vh]">
        <nav>
          <ul className="space-y-2">
              <li>
                <Link to="/parent/dashboard">Dashboard</Link>
              </li>
                <li>
                <h1>Student Performance</h1>
                <ul className="ml-4">
                  <li>
                  <Link to="/parent/student/$id" params={{ id: '1' }}>Student 1</Link>
                  </li>
                  <li>
                  <Link to="/parent/student/$id" params={{ id: '2' }}>Student 2</Link>
                  </li>
                </ul>
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

export const Route = createFileRoute('/parent/')({
  component: Dashboard,
})
