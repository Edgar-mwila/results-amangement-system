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
import { CalendarIcon, Plus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { themeColors } from "./ui/theme-config"

export default function CreateTestDialog() {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date>()

  return (
    <>
      <Button onClick={() => setOpen(true)} className={`w-full sm:w-auto flex items-center justify-center gap-2 ${themeColors.accentBg} ${themeColors.accentHover} text-white rounded-xl px-5 py-3 min-h-[44px]`}>
        <Plus className="mr-2 h-4 w-4" />
        Create New Test
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-[95vw] sm:max-w-[525px] p-4 sm:p-6 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold">Create New Test</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">Fill in the details to create a new test for your class.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="test-name">Test Name</Label>
              <Input id="test-name" placeholder="Midterm Exam" className="h-12 rounded-xl px-4" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="test-type">Test Type</Label>
              <Select>
                <SelectTrigger id="test-type" className="h-12 rounded-xl px-4">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="assignment">Assignment</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="test-date">Test Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="test-date"
                    variant={"outline"}
                    className={cn("justify-start text-left font-normal h-12 rounded-xl px-4", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="total-points">Total Points</Label>
              <Input id="total-points" type="number" placeholder="100" className="h-12 rounded-xl px-4" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="duration">Duration (min)</Label>
              <Input id="duration" type="number" placeholder="60" className="h-12 rounded-xl px-4" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="class">Class</Label>
              <Select>
                <SelectTrigger id="class" className="h-12 rounded-xl px-4">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math101">Mathematics 101</SelectItem>
                  <SelectItem value="science202">Science 202</SelectItem>
                  <SelectItem value="history101">History 101</SelectItem>
                  <SelectItem value="english202">English 202</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter test description and instructions" className="rounded-xl px-4 min-h-[60px]" />
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
              Create Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
