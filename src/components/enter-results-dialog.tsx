"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
type StudentScore = {
  student: string
  score: number
}
type EnterResultsDialogProps = {
  test: {
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

export function EnterResultsDialog({ test, open, onOpenChange }: EnterResultsDialogProps) {
  // Sample students - in a real app, this would come from your data source
  const students = [
    { id: 1, name: "Alex Johnson" },
    { id: 2, name: "Sarah Martinez" },
    { id: 3, name: "Emily Chen" },
    { id: 4, name: "Michael Brown" },
    { id: 5, name: "Sophia Patel" },
  ]

  const [scores, setScores] = useState<Record<number, string>>({})

  const handleScoreChange = (studentId: number, score: string) => {
    setScores((prev) => ({
      ...prev,
      [studentId]: score,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    onOpenChange(false)
  }

  if (!test) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Enter Results: {test.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <p>
                <strong>Subject:</strong> {test.subject}
              </p>
              <p>
                <strong>Total Marks:</strong> {test.totalMarks}
              </p>
            </div>
            <p>
              <strong>Date:</strong> {test.date}
            </p>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      max={test.totalMarks}
                      value={scores[student.id] || ""}
                      onChange={(e) => handleScoreChange(student.id, e.target.value)}
                      placeholder="Enter score"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-500 hover:bg-green-600">
              Save Results
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

