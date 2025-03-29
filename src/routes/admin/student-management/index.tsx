import { Input } from "@/components/ui/input"
import { TableRow, TableCell, TableBody, Table } from "@/components/ui/table"
import { AnyRoute, createRoute, Link } from "@tanstack/react-router"
import { Search, UserPlus } from "lucide-react"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Route as AdminRoute } from '../index'

const exampleStudents = [
  { id: 1, firstname: "Emma", lastname: "Johnson", grade: "9", email: "emma.johnson@school.com", status: "Enrolled" },
  { id: 2, firstname: "Liam", lastname: "Smith", grade: "10", email: "liam.smith@school.com", status: "Enrolled" },
  {
    id: 3,
    firstname: "Olivia",
    lastname: "Williams",
    grade: "11",
    email: "olivia.williams@school.com",
    status: "Suspended",
  },
  { id: 4, firstname: "Noah", lastname: "Brown", grade: "12", email: "noah.brown@school.com", status: "Enrolled" },
  { id: 5, firstname: "Ava", lastname: "Jones", grade: "9", email: "ava.jones@school.com", status: "Transferred" },
]

const StudentManagement = () => {
  const [search, setSearch] = useState("")

  const filteredStudents = useMemo(() => {
    return exampleStudents.filter(
      (student) =>
        student.firstname.toLowerCase().includes(search.toLowerCase()) ||
        student.lastname.toLowerCase().includes(search.toLowerCase()) ||
        student.grade.includes(search) ||
        student.email.toLowerCase().includes(search.toLowerCase()),
    )
  }, [search])

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex flex-row justify-between items-center">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search Students"
            className="pl-8 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Student
        </Button>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Student List</h2>
        <Table>
            <TableRow className="bg-[#F2CC8F]">
              <TableCell className="font-bold text-base">Name</TableCell>
              <TableCell className="font-bold text-base">Grade</TableCell>
              <TableCell className="font-bold text-base">Email</TableCell>
              <TableCell className="font-bold text-base">Status</TableCell>
            </TableRow>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id} className="hover:bg-gray-50">
                <TableCell className="text-left">
                  <Link to="/admin/student-management/student/$id" params={{ id: student.id.toString() }}>
                    {student.firstname} {student.lastname}
                  </Link>
                </TableCell>
                <TableCell className="text-left">{student.grade}</TableCell>
                <TableCell className="text-left">{student.email}</TableCell>
                <TableCell className="text-left">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      student.status === "Enrolled"
                        ? "bg-green-200 text-green-800"
                        : student.status === "Suspended"
                          ? "bg-red-200 text-red-800"
                          : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {student.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


export const Route = createRoute({
  path: '/admin/student-management/',
  component: StudentManagement,
  getParentRoute: () => AdminRoute as AnyRoute,
})
