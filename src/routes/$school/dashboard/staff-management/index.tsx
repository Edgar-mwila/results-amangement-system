import type React from "react"

import { Input } from "@/components/ui/input"
import { TableRow, TableCell, TableBody, Table, TableHead, TableHeader } from "@/components/ui/table"
import { createFileRoute, useRouter } from "@tanstack/react-router"
import { Search, UserPlus, Filter } from "lucide-react"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { themeColors } from "@/components/ui/theme-config"

const exampleStaff = [
  {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    role: "Teacher",
    email: "john.doe@school.com",
    status: "Active",
    department: "Mathematics",
    joinDate: "2020-08-15",
  },
  {
    id: 2,
    firstname: "Jane",
    lastname: "Smith",
    role: "Administrator",
    email: "jane.smith@school.com",
    status: "Active",
    department: "Administration",
    joinDate: "2018-05-10",
  },
  {
    id: 3,
    firstname: "Bob",
    lastname: "Johnson",
    role: "Administrator",
    email: "bob.johnson@school.com",
    status: "On Leave",
    department: "Administration",
    joinDate: "2019-03-22",
  },
  {
    id: 4,
    firstname: "Alice",
    lastname: "Williams",
    role: "Teacher",
    email: "alice.williams@school.com",
    status: "Active",
    department: "Science",
    joinDate: "2021-01-05",
  },
  {
    id: 5,
    firstname: "Charlie",
    lastname: "Brown",
    role: "Teacher",
    email: "charlie.brown@school.com",
    status: "Inactive",
    department: "English",
    joinDate: "2019-09-30",
  },
  {
    id: 6,
    firstname: "Emily",
    lastname: "Davis",
    role: "Teacher",
    email: "emily.davis@school.com",
    status: "Active",
    department: "History",
    joinDate: "2022-02-15",
  },
  {
    id: 7,
    firstname: "Michael",
    lastname: "Wilson",
    role: "Support Staff",
    email: "michael.wilson@school.com",
    status: "Active",
    department: "IT Support",
    joinDate: "2020-11-08",
  },
  {
    id: 8,
    firstname: "Sarah",
    lastname: "Martinez",
    role: "Teacher",
    email: "sarah.martinez@school.com",
    status: "Active",
    department: "Physical Education",
    joinDate: "2021-08-01",
  },
]

const AddStaffDialog: React.FC<{
  open: boolean
  onOpenChange: (boolean: boolean) => void
}> = ({ open, onOpenChange }) => {
  const [newStaff, setNewStaff] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    department: "",
    status: "Active",
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
      department: "",
      status: "Active",
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
            <div className="grid grid-cols-2 gap-4">
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
            <div className="grid grid-cols-2 gap-4">
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
                    <SelectItem value="Support Staff">Support Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={newStaff.department}
                  onValueChange={(value) => setNewStaff({ ...newStaff, department: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Physical Education">Physical Education</SelectItem>
                    <SelectItem value="Administration">Administration</SelectItem>
                    <SelectItem value="IT Support">IT Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={newStaff.status}
                onValueChange={(value) => setNewStaff({ ...newStaff, status: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className={`${themeColors.accentBg} ${themeColors.accentHover} text-white`}>
              Add Staff
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const StaffManagement = () => {
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)

  const filteredStaff = useMemo(() => {
    return exampleStaff.filter((staff) => {
      const nameMatch =
        staff.firstname.toLowerCase().includes(search.toLowerCase()) ||
        staff.lastname.toLowerCase().includes(search.toLowerCase()) ||
        staff.email.toLowerCase().includes(search.toLowerCase())

      const roleMatch = roleFilter === "all" || staff.role === roleFilter
      const statusMatch = statusFilter === "all" || staff.status === statusFilter

      return nameMatch && roleMatch && statusMatch
    })
  }, [search, roleFilter, statusFilter])

  const staffCounts = useMemo(() => {
    const total = exampleStaff.length
    const active = exampleStaff.filter((staff) => staff.status === "Active").length
    const teachers = exampleStaff.filter((staff) => staff.role === "Teacher").length
    const admins = exampleStaff.filter((staff) => staff.role === "Administrator").length

    return { total, active, teachers, admins }
  }, [])

  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Staff Management</h1>
          <p className="text-gray-500">Manage and view all staff members</p>
        </div>
        <Button
          className={`${themeColors.accentBg} ${themeColors.accentHover} text-white mt-4 md:mt-0`}
          onClick={() => setDialogOpen(true)}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Staff
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staffCounts.total}</div>
            <p className="text-xs text-gray-500">Staff members</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staffCounts.active}</div>
            <p className="text-xs text-gray-500">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staffCounts.teachers}</div>
            <p className="text-xs text-gray-500">Teaching staff</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Administrators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staffCounts.admins}</div>
            <p className="text-xs text-gray-500">Admin staff</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                type="text"
                placeholder="Search by name or email"
                className="pl-8 w-full md:w-80"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Teacher">Teachers</SelectItem>
                    <SelectItem value="Administrator">Administrators</SelectItem>
                    <SelectItem value="Support Staff">Support Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className={`${themeColors.accentBg} text-white`}>
                  <TableHead className="font-bold">Name</TableHead>
                  <TableHead className="font-bold">Role</TableHead>
                  <TableHead className="font-bold">Department</TableHead>
                  <TableHead className="font-bold">Email</TableHead>
                  <TableHead className="font-bold">Join Date</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((staff) => (
                    <TableRow
                      key={staff.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() =>
                        router.navigate({
                          to: `/$school/dashboard/staff-management/staffer/${staff.id}?role=${staff.role.toLowerCase()}`,
                        })
                      }
                    >
                      <TableCell className="font-medium">
                        {staff.firstname} {staff.lastname}
                      </TableCell>
                      <TableCell>{staff.role}</TableCell>
                      <TableCell>{staff.department}</TableCell>
                      <TableCell>{staff.email}</TableCell>
                      <TableCell>{staff.joinDate}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            staff.status === "Active"
                              ? `${themeColors.accentBg} text-white`
                              : staff.status === "Inactive"
                                ? "bg-red-500 text-white"
                                : `${themeColors.secondaryBg} text-white`
                          }
                        >
                          {staff.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      No staff members found matching your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddStaffDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}

export const Route = createFileRoute("/$school/dashboard/staff-management/")({
  component: StaffManagement,
})
