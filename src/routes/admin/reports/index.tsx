import { useState } from "react"
import { AnyRoute, createRoute } from "@tanstack/react-router"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FileText, Printer, Search } from "lucide-react"
import { Route as AdminRoute } from '../index'

// Define types for overall metrics
type OverallMetrics = {
  totalStudents: number
  totalTeachers: number
  totalClasses: number
  averageAttendance: string
  graduationRate: string
}

const overallMetrics: OverallMetrics = {
  totalStudents: 1200,
  totalTeachers: 80,
  totalClasses: 60,
  averageAttendance: "95%",
  graduationRate: "98%",
}

// Define types for report history entries
type ReportEntry = {
  id: number
  type: string
  name: string
  generatedBy: string
  date: string
}

const reportHistory: ReportEntry[] = [
  { id: 1, type: "Student", name: "Emma Johnson", generatedBy: "Admin User", date: "2025-02-10 14:30" },
  { id: 2, type: "Teacher", name: "Mr. Smith", generatedBy: "Principal", date: "2025-02-09 11:15" },
  { id: 3, type: "Class", name: "Grade 10 Science", generatedBy: "Department Head", date: "2025-02-08 09:45" },
]

// Define prop types for ReportDialog
type ReportDialogProps = {
  title: string
  onGenerate: (type: string) => void
}

const ReportDialog: React.FC<ReportDialogProps> = ({ title, onGenerate }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button className="w-full h-full text-left p-4 flex flex-col items-start justify-between">
        <span>{title}</span>
        <FileText className="mt-4" size={24} />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="flex items-center space-x-2">
        <Input placeholder={`Search ${title.toLowerCase()}...`} />
        <Button onClick={() => onGenerate(title.split(" ")[0].toLowerCase())}>
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>
    </DialogContent>
  </Dialog>
)

const Reports: React.FC = () => {
  const [generatedReport, setGeneratedReport] = useState<string | null>(null)

  const handleGenerateReport = (type: string) => {
    setGeneratedReport(`Generated ${type} report`)
    console.log(`Generating ${type} report...`)
  }

  const handlePrintOverallMetrics = () => {
    console.log("Printing overall metrics...")
  }

  return (
    <div className="flex flex-col justify-center min-w-full p-4 space-y-8">
      <div className="grid grid-cols-3 gap-4">
        <ReportDialog title="Student Report" onGenerate={handleGenerateReport} />
        <ReportDialog title="Teacher Report" onGenerate={handleGenerateReport} />
        <ReportDialog title="Class Report" onGenerate={handleGenerateReport} />
      </div>

      <div className="border border-custom-text p-4 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Overall School Metrics</h2>
          <Button onClick={handlePrintOverallMetrics}>
            <Printer className="mr-2 h-4 w-4" /> Print Metrics
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(overallMetrics).map(([key, value]) => (
            <div key={key}>
              <p className="text-gray-600">{key.replace(/([A-Z])/g, " $1")}</p>
              <p className="text-2xl font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Report Generation History</h2>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F2CC8F]">
              <TableHead className="font-bold">Report Type</TableHead>
              <TableHead className="font-bold">Name</TableHead>
              <TableHead className="font-bold">Generated By</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportHistory.map((report) => (
              <TableRow key={report.id} className="hover:bg-gray-50">
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.name}</TableCell>
                <TableCell>{report.generatedBy}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" /> View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {generatedReport && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg">{generatedReport}</div>
      )}
    </div>
  )
}
export const Route = createRoute({
  path: '/admin/reports/',
  component: Reports,
  getParentRoute: () => AdminRoute as AnyRoute,
})