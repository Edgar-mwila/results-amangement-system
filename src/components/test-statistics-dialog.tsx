import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
type StudentScore = {
  student: string
  score: number
}

type TestStatisticsDialogProps = {
  test: {
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

export function TestStatisticsDialog({ test, open, onOpenChange }: TestStatisticsDialogProps) {
  if (!test) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-[#3D405B]">{test.name} Statistics</DialogTitle>
          <DialogDescription>
            Test conducted on {test.date} for {test.subject}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-3 gap-4">
            <Card className="shadow-sm">
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Mean Score</p>
                <p className="text-2xl font-semibold text-[#3D405B]">{test.mean}%</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Median Score</p>
                <p className="text-2xl font-semibold text-[#3D405B]">{test.median}%</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="pt-6">
                <p className="text-sm text-gray-500">Mode Score</p>
                <p className="text-2xl font-semibold text-[#3D405B]">{test.mode}%</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-[#3D405B] mb-2">Best Performance</h3>
              <p className="text-lg">{test.bestStudent}</p>
              <p className="text-sm text-gray-500">Score: {test.highestScore}%</p>
            </div>
            <div>
              <h3 className="font-medium text-[#3D405B] mb-2">Needs Improvement</h3>
              <p className="text-lg">{test.worstStudent}</p>
              <p className="text-sm text-gray-500">Score: {test.lowestScore}%</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-[#3D405B] mb-2">Score Distribution</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {test.studentScores
                  .sort((a, b) => b.score - a.score)
                  .map((result, index) => (
                    <TableRow key={index}>
                      <TableCell>{result.student}</TableCell>
                      <TableCell>{result.score}%</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            result.score >= 90
                              ? "bg-green-500"
                              : result.score >= 80
                                ? "bg-[#3D405B]"
                                : result.score >= 70
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                          }
                        >
                          {result.score >= 90
                            ? "Excellent"
                            : result.score >= 80
                              ? "Good"
                              : result.score >= 70
                                ? "Satisfactory"
                                : "Needs Improvement"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <DialogFooter>
          <Button className="bg-green-500 hover:bg-green-600 text-white">Download Complete Report</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

