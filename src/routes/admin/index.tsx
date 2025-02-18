import { AnyRoute, createRoute, Link, Outlet } from '@tanstack/react-router'
import { Route as RootRoute } from '../__root'

const Layout = () => {
  return (
    <div className="grid grid-cols-4 min-h-[90vh]">
      <div className="bg-[#F2CC8F] p-4 max-h-[90vh]">
        <nav>
          <ul className="space-y-2">
            <li className="hover:bg-[#E6B56C] p-2 rounded">
              <Link to="/admin/dashboard">Dashboard</Link>
            </li>
            <li className="hover:bg-[#E6B56C] p-2 rounded">
              <Link to="/admin/school">School Management</Link>
            </li>
            <li className="hover:bg-[#E6B56C] p-2 rounded">
              <Link to="/admin/staff-management">Staff Management</Link>
            </li>
            <li className="hover:bg-[#E6B56C] p-2 rounded">
              <Link to="/admin/class-management">Class Management</Link>
            </li>
            <li className="hover:bg-[#E6B56C] p-2 rounded">
              <Link to="/admin/student-management">Student Management</Link>
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
      <div className="col-span-3 p-4 bg-gray-50 max-h-[90vh] overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  )
}

export const Route = createRoute({
    path: '/admin',
    component: Layout,
    getParentRoute: () => RootRoute as AnyRoute,
})