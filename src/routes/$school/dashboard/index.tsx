import { createFileRoute, Link, Outlet, useNavigate, useParams } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import {
  HomeIcon,
  UsersIcon,
  BookOpenIcon,
  UserIcon,
  BarChartIcon as ChartBarIcon,
  CogIcon,
  BuildingIcon,
  BookmarkIcon,
  ClipboardCheckIcon,
  MessageSquareIcon,
} from "lucide-react"

// Define user role types
type UserRole = "admin" | "teacher" | "parent"

// // Mock authentication service
// const authService = {
//   getCurrentUser: (): { role: UserRole; name: string } => {
//     // In a real app, this would check localStorage, cookies, or make an API call
//     // For demo purposes, we'll extract the role from the URL or default to admin
//     const path = window.location.pathname
//     if (path.includes("teacher")) return { role: "teacher", name: "John Teacher" }
//     if (path.includes("parent")) return { role: "parent", name: "Sarah Parent" }
//     return { role: "admin", name: "Admin User" }
//   },
// }

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

  const user = {
    name: localStorage.getItem('user') || 'Amin user',
    role: localStorage.getItem('userRole') || 'admin' as "admin" | "teacher" | "parent",
  }

  // Define all possible routes with role-based access
  const allRoutes: RouteConfig[] = [
    { path: "", icon: HomeIcon, label: "Dashboard", roles: ["admin", "teacher", "parent"] },
    { path: "school", icon: BuildingIcon, label: "School Management", roles: ["admin"] },
    { path: "staff-management", icon: UsersIcon, label: "Staff Management", roles: ["admin"] },
    { path: "class-management", icon: BookOpenIcon, label: "Class Management", roles: ["admin"] },
    { path: "student-management", icon: UserIcon, label: "Student Management", roles: ["admin"] },
    { path: "reports", icon: ChartBarIcon, label: "Reports", roles: ["admin", "teacher"] },
    { path: "settings", icon: CogIcon, label: "Settings", roles: ["admin", "teacher", "parent"] },
    { path: "communication", icon: MessageSquareIcon, label: "Communication", roles: ["admin", "teacher", "parent"] },
    { path: "classes", icon: BookmarkIcon, label: "My Classes", roles: ["teacher"] },
    { path: "assessments", icon: ClipboardCheckIcon, label: "Assessments", roles: ["teacher"] },
    { path: "my-children", icon: UserIcon, label: "My Children", roles: ["parent"] },
  ]

  // Filter routes based on user role
  const filteredRoutes = allRoutes.filter((route) => (user?.role ? route.roles.includes((user.role) as UserRole) : false))

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
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        {/* Logo/Header */}
        <div className="px-6 py-4 bg-green-400">
          <h1 className="text-xl font-bold text-white">
            {school
              .split("-")
              .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}{" "}
            {user?.role === "admin" ? "Admin" : user?.role === "teacher" ? "Teacher" : "Parent"} Portal
          </h1>
        </div>

        {/* User info */}
        <div className="px-6 py-3 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-semibold">
              {user?.name.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
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
                  <Icon className="w-5 h-5 mr-3" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
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
