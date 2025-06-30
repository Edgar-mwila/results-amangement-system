import { createFileRoute, Link, Outlet, useNavigate, useParams } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import {
  UsersIcon,
  BookOpenIcon,
  UserIcon,
  // BarChartIcon as ChartBarIcon,
  // CogIcon,
  BuildingIcon,
  BookmarkIcon,
  ClipboardCheckIcon,
  // MessageSquareIcon,
} from "lucide-react"
import { User } from "@/types"
import { Button } from "@/components/ui/button"

// Define user roles as a union type
type UserRole = "administrator" | "teacher" | "Parent"

// Define route types with role access
type RouteConfig = {
  path: string
  icon: React.ComponentType
  label: string
  roles: UserRole[]
}

const Layout = () => {
  const [activeOption, setActiveOption] = useState("dashboard")
  const { school } = useParams({ from: "/$school/dashboard/" })

  const navigate = useNavigate()
  const userString = localStorage.getItem('user')
  const student = localStorage.getItem('studentId')
  useEffect(() => {
    if (!userString && !student) {
      navigate({ to: "/$school/auth/login" })
    }
  }, [userString, student, navigate])
  const user: User = userString ? JSON.parse(userString) : null

  // Define all possible routes with role-based access
  const allRoutes: RouteConfig[] = [
    { path: "school", icon: BuildingIcon, label: "School Management", roles: ["administrator"] },
    { path: "staff-management", icon: UsersIcon, label: "Staff Management", roles: ["administrator"] },
    { path: "class-management", icon: BookOpenIcon, label: "Class Management", roles: ["administrator"] },
    { path: "student-management", icon: UserIcon, label: "Student Management", roles: ["administrator"] },
    { path: "subject-management", icon: UserIcon, label: "Subject Management", roles: ["administrator"] },
    { path: "classes", icon: BookmarkIcon, label: "My Classes", roles: ["administrator", "teacher"] },
    { path: "assessments", icon: ClipboardCheckIcon, label: "Assessments", roles: ["administrator", "teacher"] },
    { path: "student", icon: UserIcon, label: "My Children", roles: ["Parent"] },
    // { path: "reports", icon: ChartBarIcon, label: "Reports", roles: ["Administrator", "Teacher"] },
    // { path: "settings", icon: CogIcon, label: "Settings", roles: ["Administrator", "Teacher", "Parent"] },
    // { path: "communication", icon: MessageSquareIcon, label: "Communication", roles: ["Administrator", "Teacher", "Parent"] },
  ]

  // Filter routes based on user role
  const filteredRoutes = allRoutes.filter((route) => (user?.role ? route.roles.includes((user.role.name) as UserRole) : false))

  useEffect(() => {
    if (!school) {
      navigate({ to: "/" })
      return
    }

    const path = window.location.pathname
    const pathSegments = path.split("/")
    const currentOption = pathSegments[pathSegments.length - 1] || ""
    setActiveOption(currentOption)
  }, [school, navigate])

  return (
    <div className="flex h-[88vh]">
      {/* Sidebar */}
      <div className="w-64 shadow-md">
        {/* User info */}
        <div className="px-6 py-3 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-semibold">
              {user?.firstName.charAt(0)} {user?.lastName.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role.name}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-2 py-4">
          <ul className="space-y-1">
            {filteredRoutes.map(({ path, icon: Icon, label }) => (
              <li key={path}>
                <Link
                  to={`/$school/dashboard/${path}`}
                  params={{ school }}
                  className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                    activeOption === path
                      ? "bg-green-100 text-green-600 font-medium"
                      : "text-gray-700 hover:bg-green-50"
                  }`}
                  onClick={() => setActiveOption(path)}
                >
                  <Icon />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            className="w-full mt-6 px-4 py-3 text-sm rounded-md bg-red-100 text-red-600 font-medium hover:bg-red-200 transition-colors"
            onClick={() => {
              localStorage.removeItem('user');
              navigate({ to: `/${school}` });
            }}
          >
            Logout
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  )
}

export const Route = createFileRoute('/$school/dashboard/')({
  component: Layout
})
