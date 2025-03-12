"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clipboard, BarChart2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TestStatisticsDialog } from "./test-statistics-dialog"
import { CreateTestDialog } from "./create-test-dialog"
import { EditTestDialog } from "./edit-test-dialog"
import { EnterResultsDialog } from "./enter-results-dialog"
type StudentScore = {
  student: string
  score: number
}

type UpcomingTest = { id: number; name: string; subject: string; date: string; duration: string; totalMarks: number; }
type PastTest = { id: number; name: string; subject: string; date: string; averageScore: number; highestScore: number; lowestScore: number; mean: number; median: number; mode: number; bestStudent: string; worstStudent: string; studentScores: StudentScore[]; }

type ClassData = {
  upcomingTests: UpcomingTest[]
  pastTests: PastTest[]
}

type AssessmentsTabProps = {
  classData: ClassData
  isAdminPath: boolean
}

export function AssessmentsTab({ classData, isAdminPath }: AssessmentsTabProps) {
  const [createTestOpen, setCreateTestOpen] = useState(false)
  const [editTestId, setEditTestId] = useState<number | null>(null)
  const [enterResultsId, setEnterResultsId] = useState<number | null>(null)
  const [selectedTestId, setSelectedTestId] = useState<number | null>(null)

  return (
    <div className="space-y-6 mt-6">
      {/* Quick Action Buttons */}
      <div className="flex space-x-4 mt-6">
        {!isAdminPath && <Button className="w-full bg-green-500 hover:bg-green-600 text-white">Enter Grades</Button>}
      </div>
      {/* Upcoming Tests Section */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center text-[#3D405B]">
            <Calendar className="mr-2 text-[#3D405B]" />
            Upcoming Tests
          </CardTitle>
          <div className="flex justify-end">
            {!isAdminPath && (
              <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={() => setCreateTestOpen(true)}>
                Create New Test
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                {!isAdminPath && (<TableHead>Actions</TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {classData.upcomingTests.map((test: UpcomingTest) => (
                <TableRow key={test.id}>
                  <TableCell>{test.name}</TableCell>
                  <TableCell>{test.subject}</TableCell>
                  <TableCell>{test.date}</TableCell>
                  <TableCell>{test.duration}</TableCell>
                  <TableCell className="space-x-2">
                    {!isAdminPath && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#3D405B] text-[#3D405B]"
                        onClick={() => setEditTestId(test.id)}
                      >
                        Edit
                      </Button>
                    )}
                    {!isAdminPath && (
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => setEnterResultsId(test.id)}
                      >
                        Enter Results
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Past Tests Section */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center text-[#3D405B]">
            <Clipboard className="mr-2 text-[#3D405B]" />
            Past Tests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Average Score</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classData.pastTests.map((test: PastTest) => (
                <TableRow key={test.id}>
                  <TableCell>{test.name}</TableCell>
                  <TableCell>{test.subject}</TableCell>
                  <TableCell>{test.date}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        test.averageScore! >= 90
                          ? "bg-green-500"
                          : test.averageScore! >= 80
                            ? "bg-[#3D405B]"
                            : test.averageScore! >= 70
                              ? "bg-amber-500"
                              : "bg-red-500"
                      }
                    >
                      {test.averageScore}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#3D405B] text-[#3D405B]"
                      onClick={() => setSelectedTestId(test.id)}
                    >
                      <BarChart2 className="h-4 w-4 mr-1" /> Statistics
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialogs */}
      {selectedTestId && (
        <TestStatisticsDialog
          test={classData.pastTests.find((t: PastTest) => t.id === selectedTestId)!}
          open={!!selectedTestId}
          onOpenChange={() => setSelectedTestId(null)}
        />
      )}

      {!isAdminPath && (
        <>
          <CreateTestDialog open={createTestOpen} onOpenChange={setCreateTestOpen} />

          {editTestId && (
            <EditTestDialog
              test={classData.upcomingTests.find((t: UpcomingTest) => t.id === editTestId)!}
              open={!!editTestId}
              onOpenChange={() => setEditTestId(null)}
            />
          )}

          {enterResultsId && (
            <EnterResultsDialog
              test={classData.upcomingTests.find((t: UpcomingTest) => t.id === enterResultsId)!}
              open={!!enterResultsId}
              onOpenChange={() => setEnterResultsId(null)}
            />
          )}
        </>
      )}
    </div>
  )
}

