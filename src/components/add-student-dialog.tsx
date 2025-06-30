

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
  const [dob, setDob] = useState<Date>()
  const [enrollmentDate, setEnrollmentDate] = useState<Date>(new Date())

  return (
    <>
      <Button onClick={() => setOpen(true)} className={`${themeColors.accentBg} ${themeColors.accentHover} text-white`}>
        <Plus className="mr-2 h-4 w-4" />
        Add Student
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>Enter student information to add them to the system.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="first-name" className="text-right">
                First Name
              </Label>
              <Input id="first-name" placeholder="John" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="last-name" className="text-right">
                Last Name
              </Label>
              <Input id="last-name" placeholder="Doe" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="student-id" className="text-right">
                Student ID
              </Label>
              <Input id="student-id" placeholder="ST12345" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dob" className="text-right">
                Date of Birth
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="dob"
                    variant={"outline"}
                    className={cn("col-span-3 justify-start text-left font-normal", !dob && "text-muted-foreground")}
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

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="grade" className="text-right">
                Grade Level
              </Label>
              <Select>
                <SelectTrigger id="grade" className="col-span-3">
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

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="enrollment-date" className="text-right">
                Enrollment Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="enrollment-date"
                    variant={"outline"}
                    className={cn("col-span-3 justify-start text-left font-normal")}
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

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="email" placeholder="student@example.com" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input id="phone" placeholder="(555) 123-4567" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Textarea id="address" placeholder="123 Main St, City, State, ZIP" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Parent/Guardian</Label>
              <div className="col-span-3 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="parent-name">Name</Label>
                  <Input id="parent-name" placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent-email">Email</Label>
                  <Input id="parent-email" type="email" placeholder="parent@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent-phone">Phone</Label>
                  <Input id="parent-phone" placeholder="(555) 987-6543" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="photo" className="text-right">
                Student Photo
              </Label>
              <div className="col-span-3">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Upload size={16} />
                  Upload Photo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Additional Notes
              </Label>
              <Textarea id="notes" placeholder="Any additional information about the student" className="col-span-3" />
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
              Add Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
