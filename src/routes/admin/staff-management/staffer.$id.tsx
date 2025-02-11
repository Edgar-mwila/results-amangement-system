import { createFileRoute, useParams, Link } from "@tanstack/react-router"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowLeft, Trash2 } from "lucide-react"

const exampleStaff = [
  {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    role: "Teacher",
    email: "john.doe@school.com",
    status: "Active",
    phone: "(555) 123-4567",
    department: "Science",
    hireDate: "2020-09-01",
    certifications: ["Teaching License", "First Aid"],
    education: "M.Ed in Education",
  },
  {
    id: 2,
    firstname: "Jane",
    lastname: "Smith",
    role: "Administrator",
    email: "jane.smith@school.com",
    status: "Active",
    phone: "(555) 234-5678",
    department: "Administration",
    hireDate: "2018-06-15",
    certifications: ["School Administration License"],
    education: "Ed.D in Educational Leadership",
  },
  {
    id: 3,
    firstname: "Bob",
    lastname: "Johnson",
    role: "Counselor",
    email: "bob.johnson@school.com",
    status: "On Leave",
    phone: "(555) 345-6789",
    department: "Student Services",
    hireDate: "2019-08-20",
    certifications: ["School Counseling License", "Mental Health First Aid"],
    education: "M.S. in School Counseling",
  },
  {
    id: 4,
    firstname: "Alice",
    lastname: "Williams",
    role: "Teacher",
    email: "alice.williams@school.com",
    status: "Active",
    phone: "(555) 456-7890",
    department: "English",
    hireDate: "2021-01-10",
    certifications: ["Teaching License", "ESL Certification"],
    education: "B.A. in English Literature",
  },
  {
    id: 5,
    firstname: "Charlie",
    lastname: "Brown",
    role: "Librarian",
    email: "charlie.brown@school.com",
    status: "Inactive",
    phone: "(555) 567-8901",
    department: "Library",
    hireDate: "2017-11-05",
    certifications: ["Library Science Degree"],
    education: "M.L.I.S in Library and Information Science",
  },
]

const Staffer = () => {
  const { id } = useParams({ from: "/admin/staff-management/staffer/$id" })
  const staff = exampleStaff.find((s) => s.id === Number.parseInt(id))
  const [status, setStatus] = useState(staff?.status || "")
  const [role, setRole] = useState(staff?.role || "")

  if (!staff) {
    return <div>Staff member not found</div>
  }

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
    // Here you would typically update the status in your backend
    console.log(`Status updated to ${newStatus}`)
  }

  const handleRoleChange = (newRole: string) => {
    setRole(newRole)
    // Here you would typically update the role in your backend
    console.log(`Role updated to ${newRole}`)
  }

  const handleDelete = () => {
    // Here you would typically delete the staff member in your backend
    console.log(`Staff member ${staff.id} deleted`)
    // Redirect to staff management page after deletion
    window.history.back()
  }

  return (
    <div className="p-4 space-y-4">
      <Link to="/admin/staff-management" className="flex items-center text-blue-500 hover:underline">
        <ArrowLeft className="mr-2" /> Back to Staff List
      </Link>
      <h1 className="text-2xl font-bold">
        {staff.firstname} {staff.lastname}
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold">Personal Information</h2>
          <p>
            <strong>Email:</strong> {staff.email}
          </p>
          <p>
            <strong>Phone:</strong> {staff.phone}
          </p>
          <p>
            <strong>Department:</strong> {staff.department}
          </p>
          <p>
            <strong>Hire Date:</strong> {staff.hireDate}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Professional Information</h2>
          <p>
            <strong>Education:</strong> {staff.education}
          </p>
          <p>
            <strong>Certifications:</strong> {staff.certifications.join(", ")}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <Select onValueChange={handleStatusChange} value={status}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="On Leave">On Leave</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <Select onValueChange={handleRoleChange} value={role}>
            <SelectTrigger className="w-[180px]">
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
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Staff Member
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the staff member's record from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export const Route = createFileRoute("/admin/staff-management/staffer/$id")({
  component: Staffer,
})

