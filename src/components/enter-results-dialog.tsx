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
        className={`w-full sm:w-auto flex items-center gap-2 ${themeColors.secondaryBg} ${themeColors.secondaryHover} text-white rounded-xl px-5 py-3 min-h-[44px]`}
      >
        <FileText className="mr-2 h-4 w-4" />
        Enter Results
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-[95vw] sm:max-w-[700px] p-4 sm:p-6 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold">Enter Test Results</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">Enter scores for the Midterm Exam - Mathematics 101</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <div className="flex-1">
                <Label htmlFor="test-date">Test Date</Label>
                <Input id="test-date" value="Mar 15, 2023" readOnly className="mt-1 h-12 rounded-xl px-4" />
              </div>
              <div className="flex-1">
                <Label htmlFor="total-points">Total Points</Label>
                <Input id="total-points" value="100" readOnly className="mt-1 h-12 rounded-xl px-4" />
              </div>
              <div className="flex-1">
                <Label htmlFor="passing-score">Passing Score</Label>
                <Input id="passing-score" value="60" className="mt-1 h-12 rounded-xl px-4" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Add any notes about this test" className="mt-1 rounded-xl px-4 min-h-[60px]" />
            </div>
            <div className="mt-2">
              <h3 className="font-medium mb-2">Student Scores</h3>
              <div className="border rounded-2xl max-h-[300px] overflow-y-auto">
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

          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)} className="w-full sm:w-auto h-12 rounded-xl">
              Cancel
            </Button>
            <Button
              className={`w-full sm:w-auto h-12 rounded-xl ${themeColors.accentBg} ${themeColors.accentHover} text-white`}
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
