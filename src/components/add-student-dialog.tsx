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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, Upload } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { themeColors } from "./ui/theme-config"

export default function AddStudentDialog() {
  const [open, setOpen] = useState(false)
  const [dob, setDob] = useState<Date | undefined>()
  const [enrollmentDate, setEnrollmentDate] = useState<Date | undefined>(new Date())

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className={`w-full sm:w-auto flex items-center justify-center gap-2 ${themeColors.accentBg} ${themeColors.accentHover} text-white rounded-xl px-5 py-3 min-h-[44px]`}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Student
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-[95vw] sm:max-w-[500px] p-4 sm:p-6 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold">Add New Student</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">Enter student information to add them to the system.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" placeholder="John" className="h-12 rounded-xl px-4" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" placeholder="Doe" className="h-12 rounded-xl px-4" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="student-id">Student ID</Label>
              <Input id="student-id" placeholder="ST12345" className="h-12 rounded-xl px-4" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="dob"
                    variant={"outline"}
                    className={cn("justify-start text-left font-normal h-12 rounded-xl px-4", !dob && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dob ? format(dob, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dob} onSelect={setDob} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="grade">Grade Level</Label>
              <Select>
                <SelectTrigger id="grade" className="h-12 rounded-xl px-4">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9">9th Grade</SelectItem>
                  <SelectItem value="10">10th Grade</SelectItem>
                  <SelectItem value="11">11th Grade</SelectItem>
                  <SelectItem value="12">12th Grade</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="enrollment-date">Enrollment Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="enrollment-date"
                    variant={"outline"}
                    className={cn("justify-start text-left font-normal h-12 rounded-xl px-4", !enrollmentDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {enrollmentDate ? format(enrollmentDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={enrollmentDate} onSelect={setEnrollmentDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="student@example.com" className="h-12 rounded-xl px-4" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="(555) 123-4567" className="h-12 rounded-xl px-4" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="123 Main St, City, State, ZIP" className="rounded-xl px-4 min-h-[60px]" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Parent/Guardian</Label>
              <div className="flex flex-col gap-2">
                <Input id="parent-name" placeholder="Name" className="h-12 rounded-xl px-4" />
                <Input id="parent-email" type="email" placeholder="parent@example.com" className="h-12 rounded-xl px-4" />
                <Input id="parent-phone" placeholder="(555) 987-6543" className="h-12 rounded-xl px-4" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="photo">Student Photo</Label>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2 h-12 rounded-xl px-4">
                <Upload size={16} />
                Upload Photo
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea id="notes" placeholder="Any additional information about the student" className="rounded-xl px-4 min-h-[60px]" />
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
              Add Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
