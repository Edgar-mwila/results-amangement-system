"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
type StudentScore = {
  student: string
  score: number
}

type EditTestDialogProps = {
  test: {
    duration: string
    totalMarks: number
    name: string
    date: string
    subject: string
    mean: number
    median: number
    mode: number
    bestStudent: string
    highestScore: number
    worstStudent: string
    lowestScore: number
    studentScores: StudentScore[]
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditTestDialog({ test, open, onOpenChange }: EditTestDialogProps) {
  const [testName, setTestName] = useState("")
  const [subject, setSubject] = useState("")
  const [date, setDate] = useState("")
  const [duration, setDuration] = useState("")
  const [totalMarks, setTotalMarks] = useState("")

  useEffect(() => {
    if (test) {
      setTestName(test.name)
      setSubject(test.subject)
      setDate(test.date)
      setDuration(test.duration)
      setTotalMarks(test.totalMarks.toString())
    }
  }, [test])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    onOpenChange(false)
  }

  if (!test) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Test</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="testName">Test Name</Label>
            <Input id="testName" value={testName} onChange={(e) => setTestName(e.target.value)} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Select value={subject} onValueChange={setSubject} required>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="Biology">Biology</SelectItem>
                <SelectItem value="English Language">English Language</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 2 hours"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="totalMarks">Total Marks</Label>
            <Input
              id="totalMarks"
              type="number"
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-500 hover:bg-green-600">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

