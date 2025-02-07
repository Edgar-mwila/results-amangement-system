import { AnyRoute, createRoute, Link, Outlet } from '@tanstack/react-router'
import { Route as RootRoute } from '../__root'

const Layout = () => {
  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="bg-[#F2CC8F] p-4">
        <nav>
          <ul className="space-y-2">
            <li className="hover:bg-[#E6B56C] p-2 rounded">
              <Link to="/admin/dashboard">Dashboard</Link>
            </li>
            <li className="hover:bg-[#E6B56C] p-2 rounded">
              <Link to="/admin/reports">Reports</Link>
            </li>
            <li className="hover:bg-[#E6B56C] p-2 rounded">
              <Link to="/admin/settings">Settings</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="col-span-3 p-4 bg-gray-50">
        <Outlet />
      </div>
    </div>
  )
}

export const AdminRoute = createRoute({
    path: '/admin',
    component: Layout,
    getParentRoute: () => RootRoute as AnyRoute,
})