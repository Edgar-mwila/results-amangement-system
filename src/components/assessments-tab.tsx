import { useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart2 } from "lucide-react"
import type { UpcomingTest, PastTest } from "@/data/class-data"
import { CreateTestDialog } from "./create-test-dialog"
import { EditTestDialog } from "./edit-test-dialog"
import { EnterResultsDialog } from "./enter-results-dialog"
import { TestStatisticsDialog } from "./test-statistics-dialog"

type AssessmentsTabProps = {
  classData: { upcomingTests: UpcomingTest[], pastTests: PastTest[] }
  isAdminPath: boolean
  isAdmin?: boolean
  teacherSubject?: string
}

export function AssessmentsTab({ classData, isAdminPath, isAdmin = false, teacherSubject }: AssessmentsTabProps) {
  const [createTestOpen, setCreateTestOpen] = useState(false) 
  const [editTestId, setEditTestId] = useState<number | null>(null) 
  const [enterResultsId, setEnterResultsId] = useState<number | null>(null)
  const [selectedTestId, setSelectedTestId] = useState<number | null>(null)

  return (
    <div className="w-full space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Upcoming Tests</h2>
        <Table>
          <TableCaption>A list of your upcoming tests.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classData.upcomingTests
              .filter((test) => isAdmin || test.subject === teacherSubject)
              .map((test: UpcomingTest) => (
                <TableRow key={test.id}>
                  <TableCell>{test.name}</TableCell>
                  <TableCell>{test.subject}</TableCell>
                  <TableCell>{test.date}</TableCell>
                  <TableCell>{test.duration}</TableCell>
                  <TableCell className="space-x-2">
                    {!isAdminPath && (isAdmin || test.subject === teacherSubject) && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#3D405B] text-[#3D405B]"
                        onClick={() => setEditTestId(test.id)}
                      >
                        Edit
                      </Button>
                    )}
                    {!isAdminPath && (isAdmin || test.subject === teacherSubject) && (
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
      </div>

      <div>
        <h2 className="text-lg font-semibold">Past Tests</h2>
        <Table>
          <TableCaption>A list of past tests and their average scores.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Average Score</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classData.pastTests
              .filter((test) => isAdmin || test.subject === teacherSubject)
              .map((test: PastTest) => (
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
      </div>
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
