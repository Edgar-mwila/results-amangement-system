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
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Paperclip, Send } from "lucide-react"
import { themeColors } from "./ui/theme-config"

export default function EmailDialog() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline" className="flex items-center gap-2 w-full sm:w-auto min-h-[44px] rounded-xl">
        <Mail size={16} />
        Email
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-[95vw] sm:max-w-[600px] p-4 sm:p-6 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold">Send Email</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">Compose and send an email to students or parents.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="recipient-type">Send To</Label>
              <Select>
                <SelectTrigger id="recipient-type" className="h-12 rounded-xl px-4">
                  <SelectValue placeholder="Select recipients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-students">All Students</SelectItem>
                  <SelectItem value="all-parents">All Parents</SelectItem>
                  <SelectItem value="both">Students and Parents</SelectItem>
                  <SelectItem value="selected-students">Selected Students</SelectItem>
                  <SelectItem value="selected-parents">Selected Parents</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="class">Class</Label>
              <Select>
                <SelectTrigger id="class" className="h-12 rounded-xl px-4">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="math101">Mathematics 101</SelectItem>
                  <SelectItem value="science202">Science 202</SelectItem>
                  <SelectItem value="history101">History 101</SelectItem>
                  <SelectItem value="english202">English 202</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Email subject" className="h-12 rounded-xl px-4" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Type your message here" className="rounded-xl px-4 min-h-[100px]" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Options</Label>
              <div className="flex flex-col gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-grades" />
                  <Label htmlFor="include-grades">Include current grades</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-attendance" />
                  <Label htmlFor="include-attendance">Include attendance summary</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="high-priority" />
                  <Label htmlFor="high-priority">Mark as high priority</Label>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="attachments">Attachments</Label>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2 h-12 rounded-xl px-4">
                <Paperclip size={16} />
                Add Attachments
              </Button>
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
              <Send className="mr-2 h-4 w-4" />
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
