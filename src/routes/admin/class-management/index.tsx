"use client"

import { Input } from "@/components/ui/input"
import { TableRow, TableCell, TableBody, TableHead, Table } from "@/components/ui/table"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Search, BookPlus } from "lucide-react"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"

const exampleClasses = [
  { id: 1, name: "Advanced Mathematics", teacher: "Dr. Smith", grade: "11", students: 25, room: "101" },
  { id: 2, name: "World History", teacher: "Mrs. Johnson", grade: "10", students: 30, room: "202" },
  { id: 3, name: "Biology", teacher: "Mr. Williams", grade: "9", students: 28, room: "Lab 1" },
  { id: 4, name: "English Literature", teacher: "Ms. Brown", grade: "12", students: 22, room: "303" },
  { id: 5, name: "Physical Education", teacher: "Coach Davis", grade: "All", students: 35, room: "Gym" },
]

const ClassManagement = () => {
  const [search, setSearch] = useState("")

  const filteredClasses = useMemo(() => {
    return exampleClasses.filter(
      (cls) =>
        cls.name.toLowerCase().includes(search.toLowerCase()) ||
        cls.teacher.toLowerCase().includes(search.toLowerCase()) ||
        cls.grade.toLowerCase().includes(search.toLowerCase()) ||
        cls.room.toLowerCase().includes(search.toLowerCase()),
    )
  }, [search])

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex flex-row justify-between items-center">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search Classes"
            className="pl-8 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button className="bg-purple-500 hover:bg-purple-600">
          <BookPlus className="mr-2 h-4 w-4" />
          Add New Class
        </Button>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Class List</h2>
        <Table>
          <TableHead>
            <TableRow className="bg-[#F2CC8F]">
              <TableCell className="font-bold text-base">Class Name</TableCell>
              <TableCell className="font-bold text-base">Teacher</TableCell>
              <TableCell className="font-bold text-base">Grade</TableCell>
              <TableCell className="font-bold text-base">Students</TableCell>
              <TableCell className="font-bold text-base">Room</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClasses.map((cls) => (
              <TableRow key={cls.id} className="hover:bg-gray-50">
                <TableCell className="text-left">
                  <Link to="/admin/class-management/$id" params={{ id: cls.id.toString() }}>
                    {cls.name}
                  </Link>
                </TableCell>
                <TableCell className="text-left">{cls.teacher}</TableCell>
                <TableCell className="text-left">{cls.grade}</TableCell>
                <TableCell className="text-left">{cls.students}</TableCell>
                <TableCell className="text-left">{cls.room}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export const Route = createFileRoute("/admin/class-management/")({
  component: ClassManagement,
})

