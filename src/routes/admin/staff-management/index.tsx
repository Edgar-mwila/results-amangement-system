import { Input } from "@/components/ui/input"
import { TableRow, TableCell, TableBody, TableHead, Table } from "@/components/ui/table"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Search, UserPlus } from "lucide-react"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"

const exampleStaff = [
  { id: 1, firstname: "John", lastname: "Doe", role: "Teacher", email: "john.doe@school.com", status: "Active" },
  {
    id: 2,
    firstname: "Jane",
    lastname: "Smith",
    role: "Administrator",
    email: "jane.smith@school.com",
    status: "Active",
  },
  {
    id: 3,
    firstname: "Bob",
    lastname: "Johnson",
    role: "Counselor",
    email: "bob.johnson@school.com",
    status: "On Leave",
  },
  {
    id: 4,
    firstname: "Alice",
    lastname: "Williams",
    role: "Teacher",
    email: "alice.williams@school.com",
    status: "Active",
  },
  {
    id: 5,
    firstname: "Charlie",
    lastname: "Brown",
    role: "Librarian",
    email: "charlie.brown@school.com",
    status: "Inactive",
  },
]

const StaffManagement = () => {
  const [search, setSearch] = useState("")

  const filteredStaff = useMemo(() => {
    return exampleStaff.filter(
      (staff) =>
        staff.firstname.toLowerCase().includes(search.toLowerCase()) ||
        staff.lastname.toLowerCase().includes(search.toLowerCase()) ||
        staff.role.toLowerCase().includes(search.toLowerCase()) ||
        staff.email.toLowerCase().includes(search.toLowerCase()),
    )
  }, [search])

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex flex-row justify-between items-center">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search Staff"
            className="pl-8 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button className="bg-green-500 hover:bg-green-600">
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Staff
        </Button>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Staff List</h2>
        <Table>
          <TableHead>
            <TableRow className="bg-[#F2CC8F]">
              <TableCell className="font-bold text-base">Name</TableCell>
              <TableCell className="font-bold text-base">Role</TableCell>
              <TableCell className="font-bold text-base">Email</TableCell>
              <TableCell className="font-bold text-base">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStaff.map((staff) => (
              <TableRow key={staff.id} className="hover:bg-gray-50">
                <TableCell className="text-left">
                  <Link to="/admin/staff-management/staffer/$id" params={{ id: staff.id.toString() }}>
                    {staff.firstname} {staff.lastname}
                  </Link>
                </TableCell>
                <TableCell className="text-left">{staff.role}</TableCell>
                <TableCell className="text-left">{staff.email}</TableCell>
                <TableCell className="text-left">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      staff.status === "Active"
                        ? "bg-green-200 text-green-800"
                        : staff.status === "Inactive"
                          ? "bg-red-200 text-red-800"
                          : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {staff.status}
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

export const Route = createFileRoute("/admin/staff-management/")({
  component: StaffManagement,
})