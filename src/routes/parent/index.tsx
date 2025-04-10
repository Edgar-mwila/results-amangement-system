import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

const Dashboard = () => {
  return (
    <div className="grid grid-cols-5 p-0 m-0">
          <div className="bg-[#F2CC8F] h-[85vh] p-4">
            <ul>
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
          </div>
          <div className="col-span-4 max-h-[85vh] overflow-y-auto">
            <Outlet />
          </div>
        </div>
  )
}

export const Route = createFileRoute('/parent/')({
  component: Dashboard,
})
