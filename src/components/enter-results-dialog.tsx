

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Save } from "lucide-react"
import { themeColors } from "./ui/theme-config"

export default function EnterResultsDialog() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className={`${themeColors.secondaryBg} ${themeColors.secondaryHover} text-white`}
      >
        <FileText className="mr-2 h-4 w-4" />
        Enter Results
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Enter Test Results</DialogTitle>
            <DialogDescription>Enter scores for the Midterm Exam - Mathematics 101</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="test-date">Test Date</Label>
                <Input id="test-date" value="Mar 15, 2023" readOnly className="mt-1" />
              </div>
              <div>
                <Label htmlFor="total-points">Total Points</Label>
                <Input id="total-points" value="100" readOnly className="mt-1" />
              </div>
              <div>
                <Label htmlFor="passing-score">Passing Score</Label>
                <Input id="passing-score" value="60" className="mt-1" />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Add any notes about this test" className="mt-1" />
            </div>

            <div className="mt-2">
              <h3 className="font-medium mb-2">Student Scores</h3>
              <div className="border rounded-md max-h-[300px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Comments</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Emma Thompson", id: "ST10023", score: "94", grade: "A" },
                      { name: "James Wilson", id: "ST10045", score: "75", grade: "C" },
                      { name: "Sophia Garcia", id: "ST10067", score: "62", grade: "D" },
                      { name: "Liam Johnson", id: "ST10089", score: "85", grade: "B" },
                      { name: "Olivia Martinez", id: "ST10012", score: "75", grade: "C" },
                      { name: "Noah Brown", id: "ST10034", score: "90", grade: "A-" },
                      { name: "Ava Davis", id: "ST10056", score: "82", grade: "B" },
                      { name: "William Miller", id: "ST10078", score: "68", grade: "D+" },
                      { name: "Isabella Wilson", id: "ST10090", score: "79", grade: "C+" },
                      { name: "Benjamin Moore", id: "ST10101", score: "52", grade: "F" },
                    ].map((student, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                              <AvatarFallback>
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {student.name}
                          </div>
                        </TableCell>
                        <TableCell>{student.id}</TableCell>
                        <TableCell>
                          <Input type="number" defaultValue={student.score} min="0" max="100" className="w-20" />
                        </TableCell>
                        <TableCell>
                          <Input defaultValue={student.grade} className="w-16" />
                        </TableCell>
                        <TableCell>
                          <Input placeholder="Add comments" className="w-full" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              className={`${themeColors.accentBg} ${themeColors.accentHover} text-white`}
              onClick={() => setOpen(false)}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Results
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
