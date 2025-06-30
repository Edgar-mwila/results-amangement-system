

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
      <Button onClick={() => setOpen(true)} variant="outline" className="flex items-center gap-2">
        <Mail size={16} />
        Email
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Send Email</DialogTitle>
            <DialogDescription>Compose and send an email to students or parents.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="recipient-type" className="text-right">
                Send To
              </Label>
              <Select>
                <SelectTrigger id="recipient-type" className="col-span-3">
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

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="class" className="text-right">
                Class
              </Label>
              <Select>
                <SelectTrigger id="class" className="col-span-3">
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

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input id="subject" placeholder="Email subject" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="message" className="text-right pt-2">
                Message
              </Label>
              <Textarea id="message" placeholder="Type your message here" className="col-span-3 min-h-[150px]" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right">
                <Label>Options</Label>
              </div>
              <div className="col-span-3 space-y-2">
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

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="attachments" className="text-right">
                Attachments
              </Label>
              <div className="col-span-3">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Paperclip size={16} />
                  Add Attachments
                </Button>
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
              <Send className="mr-2 h-4 w-4" />
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
