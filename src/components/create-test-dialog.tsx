

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
      <Button onClick={() => setOpen(true)} className={`${themeColors.accentBg} ${themeColors.accentHover} text-white`}>
        <Plus className="mr-2 h-4 w-4" />
        Create New Test
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Create New Test</DialogTitle>
            <DialogDescription>Fill in the details to create a new test for your class.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="test-name" className="text-right">
                Test Name
              </Label>
              <Input id="test-name" placeholder="Midterm Exam" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="test-type" className="text-right">
                Test Type
              </Label>
              <Select>
                <SelectTrigger id="test-type" className="col-span-3">
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

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="test-date" className="text-right">
                Test Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="test-date"
                    variant={"outline"}
                    className={cn("col-span-3 justify-start text-left font-normal", !date && "text-muted-foreground")}
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

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="total-points" className="text-right">
                Total Points
              </Label>
              <Input id="total-points" type="number" placeholder="100" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration (min)
              </Label>
              <Input id="duration" type="number" placeholder="60" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="class" className="text-right">
                Class
              </Label>
              <Select>
                <SelectTrigger id="class" className="col-span-3">
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

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea id="description" placeholder="Enter test description and instructions" className="col-span-3" />
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
              Create Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
