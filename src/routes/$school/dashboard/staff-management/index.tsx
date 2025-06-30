import type React from "react"
import { Input } from "@/components/ui/input"
import { TableRow, TableCell, TableBody, Table, TableHead, TableHeader } from "@/components/ui/table"
import { createFileRoute, useParams, useRouter } from "@tanstack/react-router"
import { Search, UserPlus, Filter } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { themeColors } from "@/components/ui/theme-config"
import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"



const StaffManagement = () => {
  const { school } = useParams({ strict: false })
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)

  type Role = {
    id: number
    name: string
  }

  const fetchRoles = async (): Promise<Role[]> => {
    const res = await fetch(`/api/${school}/roles/`)
    if (!res.ok) throw new Error("Failed to fetch roles")
    return res.json()
  }

  const { data: roles = [], isLoading: rolesLoading } = useQuery<Role[]>({
    queryKey: ["roles", school],
    queryFn: fetchRoles,
  })

  const AddStaffDialog: React.FC<{
    open: boolean
    onOpenChange: (boolean: boolean) => void
  }> = ({ open, onOpenChange }) => {
    const [newStaff, setNewStaff] = useState({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      role: undefined as Role | undefined,
      status: "Active",
    })

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      try {
        const res = await fetch(`/api/${school}/users/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: newStaff.firstname,
            lastName: newStaff.lastname,
            email: newStaff.email,
            phone: newStaff.phone,
            role: newStaff.role,
            status: newStaff.status,
          }),
        })
        if (!res.ok) throw new Error("Failed to create staff member")
        onOpenChange(false)
        setNewStaff({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          role: undefined,
          status: "Active",
        })
      } catch (err) {
        console.error(err)
      }
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
              <div className="flex flex-col space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={newStaff.role ? String(newStaff.role.id) : ""}
                    onValueChange={(value) => {
                      const selectedRole = roles.find((r) => String(r.id) === value)
                      setNewStaff({ ...newStaff, role: selectedRole })
                    }}
                    required
                    disabled={rolesLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={rolesLoading ? "Loading roles..." : "Select role"} />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={String(role.id)}>
                          {role.name}
                        </SelectItem>
                      ))}
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

  type Staff = {
    id: string
    firstName: string
    lastName: string
    email: string
    role: Role
    status: string
  }

  const fetchStaff = async (): Promise<Staff[]> => {
    const res = await fetch(`/api/${school}/users/`)
    if (!res.ok) throw new Error("Failed to fetch staff")
    return res.json()
  }

  const { data: staff = [], isLoading, isError, error } = useQuery<Staff[]>({
    queryKey: ["staff"],
    queryFn: fetchStaff,
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <Skeleton className="h-20 w-1/4" />
          <Skeleton className="h-20 w-1/4" />
          <Skeleton className="h-20 w-1/4" />
          <Skeleton className="h-20 w-1/4" />
        </div>
        <Skeleton className="h-12 w-full" />
        <div className="rounded-md border mt-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center px-4 py-4 border-b last:border-b-0 gap-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-600 font-semibold">
        Failed to load staff members. {error instanceof Error ? error.message : ""}
      </div>
    )
  }

  const filteredStaff = staff.filter((staff) => {
    const firstName = staff.firstName ?? ""
    const lastName = staff.lastName ?? ""
    const email = staff.email ?? ""
    const role = staff.role ?? ""
    const status = staff.status ?? ""

    const nameMatch =
      firstName.toLowerCase().includes(search.toLowerCase()) ||
      lastName.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase())

    const roleMatch = roleFilter === "all" || role.name === roleFilter
    const statusMatch = statusFilter === "all" || status === statusFilter

    return nameMatch && roleMatch && statusMatch
  })

  const staffCounts = {
    total: staff.length,
    active: staff.filter((staff) => staff.status === "Active").length,
    teachers: staff.filter((staff) => staff.role.name === "Teacher").length,
    admins: staff.filter((staff) => staff.role.name === "Admin").length,
  }

  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Staff Management</h1>
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
                <TableRow className={`text-gray-900 bg-gray-100`}>
                  <TableHead className="font-bold">Name</TableHead>
                  <TableHead className="font-bold">Role</TableHead>
                  <TableHead className="font-bold">Email</TableHead>
                  <TableHead className="font-bold"></TableHead>
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
                          to: `/$school/dashboard/staff-management/staffer/${staff.id}`
                        })
                      }
                    >
                      <TableCell className="font-medium">
                        {staff.firstName} {staff.lastName}
                      </TableCell>
                      <TableCell>{staff.role.name}</TableCell>
                      <TableCell>{staff.email}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span
                            className={
                              "inline-block w-2 h-2 rounded-full " +
                              (staff.status === "Active"
                                ? "bg-green-500"
                                : staff.status === "Inactive"
                                ? "bg-red-500"
                                : "bg-yellow-400")
                            }
                            title={staff.status}
                          />
                        </div>
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
