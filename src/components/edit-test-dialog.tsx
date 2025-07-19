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
import { CalendarIcon, Pencil } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { themeColors } from "./ui/theme-config"

export default function EditTestDialog() {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date>(new Date("2023-05-15"))

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)} className="flex items-center gap-2 w-full sm:w-auto min-h-[44px] rounded-xl">
        <Pencil size={16} />
        Edit
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-[95vw] sm:max-w-[525px] p-4 sm:p-6 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold">Edit Test</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">Update the details of your test.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="test-name">Test Name</Label>
              <Input id="test-name" defaultValue="Final Exam" className="h-12 rounded-xl px-4" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="test-type">Test Type</Label>
              <Select defaultValue="exam">
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
              <Input id="total-points" type="number" defaultValue="100" className="h-12 rounded-xl px-4" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="duration">Duration (min)</Label>
              <Input id="duration" type="number" defaultValue="120" className="h-12 rounded-xl px-4" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="class">Class</Label>
              <Select defaultValue="math101">
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
              <Textarea
                id="description"
                defaultValue="Comprehensive final exam covering all topics from the semester. Calculators allowed but no notes."
                className="rounded-xl px-4 min-h-[60px]"
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)} className="w-full sm:w-auto h-12 rounded-xl">
              Cancel
            </Button>
            <Button
              className={`w-full sm:w-auto h-12 rounded-xl ${themeColors.secondaryBg} ${themeColors.secondaryHover} text-white`}
              onClick={() => setOpen(false)}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
