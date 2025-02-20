import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  User,
  Mail,
  Phone,
  Award,
  Clock,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  FileText,
  LayoutDashboardIcon,
} from 'lucide-react'
import { TeacherData, generateTeacherReport } from './teacher-report'
import { EmailDialog } from './emailDialog'

// Extended mock data
const teacherData: TeacherData = {
  id: 1,
  name: 'John Doe',
  subject: 'Mathematics',
  status: 'active',
  classes: [
    {
      id: 1,
      name: '10A',
      students: 30,
      avgPerformance: 85,
      subject: 'Mathematics',
      lastTest: '2024-03-21',
    },
    {
      id: 2,
      name: '11B',
      students: 28,
      avgPerformance: 82,
      subject: 'Mathematics',
      lastTest: '2024-03-21',
    },
    {
      id: 3,
      name: '12C',
      students: 25,
      avgPerformance: 88,
      subject: 'Physics',
      lastTest: '2024-03-20',
    },
  ],
  qualifications: 'M.Sc. Mathematics, B.Ed.',
  yearsOfExperience: 8,
  contactInfo: {
    email: 'john.doe@ph-EduTrack.com',
    phone: '+1234567890',
  },
  performance: {
    classes: 3,
    averageScore: 75,
    students: 88,
    bestClass: '12C',
  },
  recentActivities: [
    {
      id: 1,
      type: 'task',
      message: 'Schedules test 3 for 12C',
      date: '2024-03-21',
    },
    {
      id: 2,
      type: 'alert',
      message: 'Postponed test 2 for 11C',
      date: '2024-03-19',
    },
    {
      id: 3,
      type: 'success',
      message: 'Submitted test scoresfor 10A',
      date: '2024-03-15',
    },
  ],
}

export function TeacherDetailView() {

  const getStatusBadge = (status: 'active' | 'on-leave' | 'inactive') => {
    const styles = {
      active: 'bg-[#4CAF50] text-white',
      'on-leave': 'bg-[#F4A261] text-white',
      inactive: 'bg-[#D62828] text-white',
    }
    return <Badge className={styles[status]}>{status}</Badge>
  }

  const getPerformanceColor = (value: number) => {
    if (value >= 85) return 'text-[#4CAF50]'
    if (value >= 70) return 'text-green-500'
    return 'text-[#D62828]'
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 border-[#F2CC8F] text-custom-text hover:bg-[#F2CC8F]/10"
          >
            <LayoutDashboardIcon className="h-4 w-4" />
            Back to DashBoard
          </Button>
        <div className="flex justify-between items-start shadow-sm p-6 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-[#264653]">
                {teacherData.name}
              </h1>
              {getStatusBadge(teacherData.status as "active" | "on-leave" | "inactive")}
            </div>
            <p className="text-[#A8A8A8]">{teacherData.subject} Teacher</p>
          </div>
          <div className="flex gap-3">
            <EmailDialog teacherEmail={teacherData.contactInfo.email} teacherName={teacherData.name} />
          </div>
        </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Personal Info */}
        <div className="space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#264653] flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[#A8A8A8]">Email</Label>
                  <div className="flex items-center text-[#264653]">
                    <Mail className="w-4 h-4 mr-2" />
                    {teacherData.contactInfo.email}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#A8A8A8]">Phone</Label>
                  <div className="flex items-center text-[#264653]">
                    <Phone className="w-4 h-4 mr-2" />
                    {teacherData.contactInfo.phone}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#A8A8A8]">Qualifications</Label>
                  <div className="flex items-center text-[#264653]">
                    <Award className="w-4 h-4 mr-2" />
                    {teacherData.qualifications}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#A8A8A8]">Experience</Label>
                  <div className="flex items-center text-[#264653]">
                    <Clock className="w-4 h-4 mr-2" />
                    {teacherData.yearsOfExperience} years
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#264653] flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacherData.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    {activity.type === 'alert' && (
                      <AlertTriangle className="w-4 h-4 text-[#E76F51] flex-shrink-0" />
                    )}
                    {activity.type === 'success' && (
                      <CheckCircle className="w-4 h-4 text-[#4CAF50] flex-shrink-0" />
                    )}
                    {activity.type === 'task' && (
                      <FileText className="w-4 h-4 text-custom-text flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-[#264653] text-sm">
                        {activity.message}
                      </p>
                      <p className="text-[#A8A8A8] text-xs">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column - Classes and Performance */}
        <div className="col-span-2 space-y-6">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#264653] flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Classes Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Last Test</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teacherData.classes.map((cls) => (
                    <TableRow key={cls.id}>
                      <TableCell className="font-medium">{cls.name}</TableCell>
                      <TableCell>{cls.students}</TableCell>
                      <TableCell
                        className={getPerformanceColor(cls.avgPerformance)}
                      >
                        {cls.avgPerformance}%
                      </TableCell>
                      <TableCell >
                        {cls.subject}
                      </TableCell>
                      <TableCell>{cls.lastTest}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#264653] flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2 mb-6">
                <div className='border border-custom-text space-y-4 p-2 rounded-lg'>
                  <Label className="text-[#A8A8A8]">
                    Classes
                  </Label>
                  <p
                    className={`text-2xl font-bold ${getPerformanceColor(100)}`}
                  >
                    {teacherData.performance.classes}
                  </p>
                </div>
                <div className='border border-custom-text space-y-4 p-2 rounded-lg'>
                  <Label className="text-[#A8A8A8]">Avgerage Score</Label>
                  <p
                    className={`text-2xl font-bold ${getPerformanceColor(teacherData.performance.averageScore)}`}
                  >
                    {teacherData.performance.averageScore}
                  </p>
                </div>
                <div className='border border-custom-text space-y-4 p-2 rounded-lg'>
                  <Label className="text-[#A8A8A8]">No. of Students</Label>
                  <p
                    className={`text-2xl font-bold ${getPerformanceColor(teacherData.performance.students)}`}
                  >
                    {teacherData.performance.students}
                  </p>
                </div>
                <div className='border border-custom-text space-y-4 p-2 rounded-lg'>
                  <Label className="text-[#A8A8A8]">Best Class</Label>
                  <p
                    className={`text-2xl font-bold ${getPerformanceColor(100)}`}
                  >
                    {teacherData.performance.bestClass}
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className="bg-[#F2CC8F] hover:bg-[#F2CC8F]"
                  onClick={() => generateTeacherReport(teacherData)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Print Evaluation.
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
