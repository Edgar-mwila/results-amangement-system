import { createFileRoute, Outlet } from '@tanstack/react-router'

const Dashboard = () => {
  return (
    <div className="grid grid-cols-4">
      <div className="bg-[#F2CC8F] h-full">
        <ul>
          <li>item 1</li>
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

export const Route = createFileRoute('/parent/')({
  component: Dashboard,
})
