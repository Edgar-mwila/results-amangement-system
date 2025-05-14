"use client"

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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BarChart, Download, FileText, PieChart, TrendingDown, TrendingUp } from "lucide-react"
import { themeColors } from "./ui/theme-config"

export default function TestStatisticsDialog() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)} className="flex items-center gap-2">
        <BarChart size={16} />
        Statistics
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Test Statistics</DialogTitle>
            <DialogDescription>Midterm Exam - Mathematics 101 (March 15, 2023)</DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="text-sm text-gray-500">Class Average</div>
                <div className="text-2xl font-bold mt-1">76%</div>
                <div className="flex items-center justify-center text-xs text-green-500 mt-1">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  <span>+2% from last test</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="text-sm text-gray-500">Highest Score</div>
                <div className="text-2xl font-bold mt-1">94%</div>
                <div className="text-xs text-gray-500 mt-1">Emma Thompson</div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="text-sm text-gray-500">Lowest Score</div>
                <div className="text-2xl font-bold mt-1">52%</div>
                <div className="text-xs text-gray-500 mt-1">Benjamin Moore</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Score Distribution</h3>
                <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-md">
                  <BarChart className={`h-10 w-10 ${themeColors.accent}`} />
                  <span className="ml-2 text-gray-500">Score Distribution Chart</span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${themeColors.accentBg} mr-2`}></div>
                      <span>90-100% (A)</span>
                    </div>
                    <span className="font-medium">3 students</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${themeColors.secondaryBg} mr-2`}></div>
                      <span>80-89% (B)</span>
                    </div>
                    <span className="font-medium">7 students</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-300 mr-2"></div>
                      <span>70-79% (C)</span>
                    </div>
                    <span className="font-medium">12 students</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                      <span>60-69% (D)</span>
                    </div>
                    <span className="font-medium">5 students</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span>Below 60% (F)</span>
                    </div>
                    <span className="font-medium">3 students</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Question Analysis</h3>
                <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-md">
                  <PieChart className={`h-10 w-10 ${themeColors.secondary}`} />
                  <span className="ml-2 text-gray-500">Question Performance Chart</span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Most Difficult Question</span>
                    <span className="font-medium">Question 8 (42% correct)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Easiest Question</span>
                    <span className="font-medium">Question 2 (95% correct)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Average Time per Question</span>
                    <span className="font-medium">3.2 minutes</span>
                  </div>
                  <div className="flex justify-between items-center">\
                    <span>Questions with < 60% correct</span>
                    <span className="font-medium">3 questions</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Student Performance</h3>
              <div className="border rounded-md max-h-[250px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Compared to Average</TableHead>
                      <TableHead>Trend</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Emma Thompson", score: "94%", grade: "A", diff: "+18%", trend: "up", status: "Excellent" },
                      { name: "James Wilson", score: "75%", grade: "C", diff: "-1%", trend: "stable", status: "Average" },
                      { name: "Sophia Garcia", score: "62%", grade: "D", diff: "-14%", trend: "down", status: "At Risk" },
                      { name: "Liam Johnson", score: "85%", grade: "B", diff: "+9%", trend: "up", status: "Good" },
                      { name: "Olivia Martinez", score: "75%", grade: "C", diff: "-1%", trend: "stable", status: "Average" },
                      { name: "Noah Brown", score: "90%", grade: "A-", diff: "+14%", trend: "up", status: "Excellent" },
                      { name: "Ava Davis", score: "82%", grade: "B", diff: "+6%", trend: "up", status: "Good" },
                      { name: "William Miller", score: "68%", grade: "D+", diff: "-8%", trend: "down", status: "At Risk" },
                      { name: "Isabella Wilson", score: "79%", grade: "C+", diff: "+3%", trend: "stable", status: "Good" },
                      { name: "Benjamin Moore", score: "52%", grade: "F", diff: "-24%", trend: "down", status: "Critical" },
                    ].map((student, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.score}</TableCell>
                        <TableCell>{student.grade}</TableCell>
                        <TableCell className={student.diff.startsWith("+") ? "text-green-500" : student.diff === "-1%" ? "text-gray-500" : "text-red-500"}>
                          {student.diff}
                        </TableCell>
                        <TableCell>
                          {student.trend === "up" ? (
                            <TrendingUp className="h-5 w-5 text-green-500" />
                          ) : student.trend === "down" ? (
                            <TrendingDown className="h-5 w-5 text-red-500" />
                          ) : (
                            <div className="h-0.5 w-5 bg-gray-400 my-3" />
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              student.status === "Excellent"
                                ? `${themeColors.accentBg} text-white`
                                : student.status === "Good"
                                  ? `${themeColors.secondaryBg} text-white`
                                  : student.status === "Average"
                                    ? "bg-blue-100 text-blue-800"
                                    : student.status === "At Risk"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                            }
                          >
                            {student.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className={`font-medium mb-2 ${themeColors.secondary}`}>Insights</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Students performed well on basic algebra concepts (Questions 1-3)</li>
                  <li>Significant struggle with word problems (Questions 7-9)</li>
                  <li>30% of students scored below the passing threshold</li>
                  <li>Performance improved 2% compared to the previous assessment</li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className={`font-medium mb-2 ${themeColors.accent}`}>Recommendations</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Review word problem strategies in upcoming classes</li>
                  <li>Provide targeted support for students scoring below 60%</li>
                  <li>Consider peer tutoring for struggling students</li>
                  <li>Include more practice with application problems before final exam</li>
                </ul>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button className={`${themeColors.secondaryBg} ${themeColors.secondaryHover} text-white`}>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button className={`${themeColors.accentBg} ${themeColors.accentHover} text-white`}>
              <FileText className="mr-2 h-4 w-4" />
              Print Analysis
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
