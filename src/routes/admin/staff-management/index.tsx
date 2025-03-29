import { Input } from "@/components/ui/input"
import { TableRow, TableCell, TableBody, Table } from "@/components/ui/table"
import { AnyRoute, createRoute, Link } from "@tanstack/react-router"
import { Search, UserPlus } from "lucide-react"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Route as AdminRoute } from '../index'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const exampleStaff = [
  { id: 1, firstname: "John", lastname: "Doe", role: "Teacher", email: "john.doe@school.com", status: "Active" },
  { id: 2, firstname: "Jane", lastname: "Smith", role: "Administrator", email: "jane.smith@school.com", status: "Active" },
  { id: 3, firstname: "Bob", lastname: "Johnson", role: "Counselor", email: "bob.johnson@school.com", status: "On Leave" },
  { id: 4, firstname: "Alice", lastname: "Williams", role: "Teacher", email: "alice.williams@school.com", status: "Active" },
  { id: 5, firstname: "Charlie", lastname: "Brown", role: "Librarian", email: "charlie.brown@school.com", status: "Inactive" },
]

const AddStaffDialog: React.FC<{open: boolean, onOpenChange: (boolean:boolean) =>void}> = ({ open, onOpenChange }) => {
  const [newStaff, setNewStaff] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    status: "Active"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically make an API call to add the new staff member
    console.log("New staff member:", newStaff)
    onOpenChange(false)
    setNewStaff({
      firstname: "",
      lastname: "",
      email: "",
      role: "",
      status: "Active"
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Staff Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="firstname">First Name</Label>
              <Input
                id="firstname"
                value={newStaff.firstname}
                onChange={(e) => setNewStaff({ ...newStaff, firstname: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                id="lastname"
                value={newStaff.lastname}
                onChange={(e) => setNewStaff({ ...newStaff, lastname: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newStaff.email}
                onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={newStaff.role}
                onValueChange={(value) => setNewStaff({ ...newStaff, role: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Teacher">Teacher</SelectItem>
                  <SelectItem value="Administrator">Administrator</SelectItem>
                  <SelectItem value="Counselor">Counselor</SelectItem>
                  <SelectItem value="Librarian">Librarian</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#F2CC8F] hover:bg-green-600 text-custom-text">
              Add Staff
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const StaffManagement = () => {
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const filteredStaff = useMemo(() => {
    return exampleStaff.filter(
      (staff) =>
        staff.firstname.toLowerCase().includes(search.toLowerCase()) ||
        staff.lastname.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex flex-row justify-between items-center">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-custom-text" />
          <Input
            type="text"
            placeholder="Search Staff"
            className="pl-8 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button 
          className="bg-[#F2CC8F] hover:bg-green-600 text-custom-text"
          onClick={() => setDialogOpen(true)}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Staff
        </Button>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Staff List</h2>
        <Table>
          <TableRow className="bg-[#F2CC8F] hover:bg-[#F2CC8F]">
            <TableCell className="font-bold text-base">Name</TableCell>
            <TableCell className="font-bold text-base">Role</TableCell>
            <TableCell className="font-bold text-base">Email</TableCell>
            <TableCell className="font-bold text-base">Status</TableCell>
          </TableRow>
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
      <AddStaffDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}

export const Route = createRoute({
  path: '/admin/staff-management/',
  component: StaffManagement,
  getParentRoute: () => AdminRoute as AnyRoute,
})