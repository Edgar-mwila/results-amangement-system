import { Input } from "@/components/ui/input"
import { TableRow, TableCell, TableBody, Table } from "@/components/ui/table"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Search, BookPlus, Filter, Grid, List, X, ChevronRight, School, Users, Home } from 'lucide-react'
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const exampleClasses = [
  { id: 1, name: "11A", teacher: "Dr. Smith", grade: "11", students: 25, room: "101" },
  { id: 2, name: "10A", teacher: "Mrs. Johnson", grade: "10", students: 30, room: "202" },
  { id: 3, name: "9A", teacher: "Mr. Williams", grade: "9", students: 28, room: "Lab 1" },
  { id: 4, name: "12A", teacher: "Ms. Brown", grade: "12", students: 22, room: "303" },
  { id: 5, name: "Physical Education", teacher: "Coach Davis", grade: "All", students: 35, room: "Gym" },
]

const ClassManagement = () => {
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState("grid")

  const filteredClasses = useMemo(() => {
    const filtered = exampleClasses.filter(
      (cls) =>
        cls.name.toLowerCase().includes(search.toLowerCase()) ||
        cls.grade.toLowerCase().includes(search.toLowerCase()) ||
        cls.room.toLowerCase().includes(search.toLowerCase()) ||
        cls.teacher.toLowerCase().includes(search.toLowerCase())
    )

    return filtered.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "grade") return a.grade.localeCompare(b.grade)
      if (sortBy === "students") return b.students - a.students
      return 0
    })
  }, [search, sortBy])

  const clearSearch = () => {
    setSearch("")
  }

  return (
    <div className="flex flex-col space-y-6 p-6 bg-white">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">Class Management</h1>
        <p className="text-gray-500">Manage all classes, assign teachers, and monitor student enrollment</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div className="relative w-full md:w-auto flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search by class, teacher, grade or room..."
            className="pl-10 pr-10 border-gray-200 focus:border-green-400 focus:ring-green-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <div className="flex items-center bg-gray-50 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1 rounded ${
                viewMode === "grid" ? "bg-white shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1 rounded ${
                viewMode === "table" ? "bg-white shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] border-gray-200 focus:ring-green-400">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4 text-gray-400" />
                <SelectValue placeholder="Sort by" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Class Name</SelectItem>
              <SelectItem value="grade">Grade Level</SelectItem>
              <SelectItem value="students">Number of Students</SelectItem>
            </SelectContent>
          </Select>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-400 hover:bg-green-500 text-white">
                <BookPlus className="mr-2 h-4 w-4" />
                Add New Class
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl">Create New Class</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new class in the system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-5 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right font-medium">
                    Class Name
                  </Label>
                  <Input id="name" className="col-span-3 focus:ring-green-400 focus:border-green-400" placeholder="e.g. 11A" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="teacher" className="text-right font-medium">
                    Teacher
                  </Label>
                  <Input id="teacher" className="col-span-3 focus:ring-green-400 focus:border-green-400" placeholder="e.g. Dr. Smith" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="grade" className="text-right font-medium">
                    Grade
                  </Label>
                  <Input id="grade" className="col-span-3 focus:ring-green-400 focus:border-green-400" placeholder="e.g. 11" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="room" className="text-right font-medium">
                    Room
                  </Label>
                  <Input id="room" className="col-span-3 focus:ring-green-400 focus:border-green-400" placeholder="e.g. 101" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="students" className="text-right font-medium">
                    Max Students
                  </Label>
                  <Input id="students" type="number" className="col-span-3 focus:ring-green-400 focus:border-green-400" placeholder="e.g. 30" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="border-gray-200">Cancel</Button>
                <Button type="submit" className="bg-green-400 hover:bg-green-500 text-white">
                  Create Class
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {filteredClasses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl">
          <School className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No classes found</h3>
          <p className="text-gray-500 mb-4 text-center max-w-md">
            We couldn't find any classes matching your search criteria. Try adjusting your search or create a new class.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-400 hover:bg-green-500 text-white">
                <BookPlus className="mr-2 h-4 w-4" />
                Add New Class
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              {/* Dialog content same as above */}
            </DialogContent>
          </Dialog>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClasses.map((cls) => (
            <Card key={cls.id} className="overflow-hidden hover:shadow-md transition-shadow border-gray-200">
              <div className="h-2 bg-gradient-to-r from-green-400 to-blue-400" />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-bold">
                      <Link 
                        to="/$school/dashboard/class-management/$id" 
                        params={{ id: cls.id.toString() }}
                        className="text-gray-800 hover:text-blue-500 transition-colors"
                      >
                        {cls.name}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-gray-500">Grade {cls.grade}</CardDescription>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">{cls.students} students</Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">Teacher: </span>
                    <span className="ml-1 font-medium text-gray-800">{cls.teacher}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Home className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-gray-600">Room: </span>
                    <span className="ml-1 font-medium text-gray-800">{cls.room}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2 flex justify-end">
                <Link 
                  to="/$school/dashboard/class-management/$id" 
                  params={{ id: cls.id.toString() }}
                  className="text-sm text-blue-500 hover:text-blue-600 flex items-center"
                >
                  View details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <Table>
            <thead>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableCell className="font-semibold text-gray-700">Class Name</TableCell>
                <TableCell className="font-semibold text-gray-700">Teacher</TableCell>
                <TableCell className="font-semibold text-gray-700">Grade</TableCell>
                <TableCell className="font-semibold text-gray-700">Students</TableCell>
                <TableCell className="font-semibold text-gray-700">Room</TableCell>
                <TableCell className="font-semibold text-gray-700 text-right">Actions</TableCell>
              </TableRow>
            </thead>
            <TableBody>
              {filteredClasses.map((cls) => (
                <TableRow key={cls.id} className="hover:bg-gray-50 border-t border-gray-100">
                  <TableCell className="font-medium">
                    <Link 
                      to="/$school/dashboard/class-management/$id" 
                      params={{ id: cls.id.toString() }}
                      className="text-gray-800 hover:text-blue-500 transition-colors"
                    >
                      {cls.name}
                    </Link>
                  </TableCell>
                  <TableCell>{cls.teacher}</TableCell>
                  <TableCell>{cls.grade}</TableCell>
                  <TableCell>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">{cls.students}</Badge>
                  </TableCell>
                  <TableCell>{cls.room}</TableCell>
                  <TableCell className="text-right">
                    <Link 
                      to="/$school/dashboard/class-management/$id" 
                      params={{ id: cls.id.toString() }}
                      className="text-sm text-blue-500 hover:text-blue-600 inline-flex items-center"
                    >
                      View
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

export const Route = createFileRoute('/$school/dashboard/class-management/')({
  component: ClassManagement,
})
