import { createRootRoute, Link, Outlet, useNavigate, useParams } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  HomeIcon,
  UsersIcon,
  BookOpenIcon,
  UserIcon,
  ChartBarIcon,
  CogIcon,
  BuildingIcon,
  BookmarkIcon,
  ClipboardCheckIcon,
  MessageSquareIcon,
} from 'lucide-react'

const Layout = () => {
  const [activeOption, setActiveOption] = useState('dashboard')
  const { school } = useParams({ from: '/$school/' })
  const navigate = useNavigate()
  const Routes = [
              { path: 'dashboard', icon: HomeIcon, label: 'Dashboard' },
              { path: 'school', icon: BuildingIcon, label: 'School Management' },
              { path: 'staff-management', icon: UsersIcon, label: 'Staff Management' },
              { path: 'class-management', icon: BookOpenIcon, label: 'Class Management' },
              { path: 'student-management', icon: UserIcon, label: 'Student Management' },
              { path: 'reports', icon: ChartBarIcon, label: 'Reports' },
              { path: 'settings', icon: CogIcon, label: 'Settings' },
              { path: 'subject-management', icon: BookOpenIcon, label: 'Subject Management' },
              { path: 'student-performance', icon: ChartBarIcon, label: 'Student Performance' },
              { path: 'communication', icon: MessageSquareIcon, label: 'Communication' },
              { path: 'my-classes', icon: BookmarkIcon, label: 'My Classes' },
              { path: 'assessments', icon: ClipboardCheckIcon, label: 'Assessments' },
              { path: 'students', icon: UsersIcon, label: 'Students' },
              { path: 'my-children', icon: UserIcon, label: 'My Children' }
            ]

  useEffect(() => {
    if (!school) {
      navigate({ to: '/' })
      return
    }
    
    const path = window.location.pathname
    const pathSegments = path.split('/')
    const currentOption = pathSegments[pathSegments.length - 1]
    setActiveOption(currentOption || 'dashboard')
  }, [school, navigate])

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        {/* Logo/Header */}
        <div className="px-6 py-4 bg-green-600">
            <h1 className="text-xl font-bold text-white">
            {school.split('-').map((word: string) => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')} Admin
            </h1>
        </div>

        {/* Navigation */}
        <nav className="px-2 py-4">
          <ul className="space-y-1">
            {Routes.map(({ path, icon: Icon, label }) => (
              <li key={path}>
                <Link
                  to={`/$school/admin/${path}`}
                  params={{ school, path }}
                  className={
                    `flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                      activeOption === path
                        ? 'bg-green-100 text-green-700 font-medium'
                        : 'text-gray-700 hover:bg-green-50'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  )
}

export const Route = createRootRoute({
  component: Layout
})
