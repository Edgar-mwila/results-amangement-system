import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

const Dashboard = () => {
  return (
    <div className="grid grid-cols-4 p-0 m-0">
      <div className="bg-[#F2CC8F] min-h-screen">
        <ul>
          <li>
            <Link to='/teacher/dashboard'>
              item 1
            </Link>
          </li>
          <li>item 2</li>
          <li>item 3</li>
        </ul>
      </div>
      <div className="col-span-3 h-full">
        <Outlet />
      </div>
    </div>
  )
}

export const Route = createFileRoute('/teacher/')({
  component: Dashboard,
})
