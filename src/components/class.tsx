import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp,
  BookOpen,
  Users,
  Clipboard,
  School,
  Calendar,
  ChevronRight,
  BarChart2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogDescription, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';

// Sample data
const classData = {
  id: 1,
  name: 'Class 10A',
  classTeacher: 'Ms. Emily Richards',
  occupancy: 30,
  optimumCapacity: 35,
  assignedClassroom: 'Room 201',
  description: 'Pure Sciences Stream with Specialization in Physics and Chemistry',
  subjects: [
    { 
      id: 1, 
      name: 'Mathematics', 
      code: 'ECZ-MTH-10',
      teacher: 'Mr. John Smith',
      description: 'Advanced Mathematics covering Algebra, Geometry, and Calculus',
      examinationType: 'Written and Practical',
      hoursPerWeek: 8
    },
    { 
      id: 2, 
      name: 'Physics', 
      code: 'ECZ-PHY-10',
      teacher: 'Dr. Patricia Scott',
      description: 'Comprehensive Physics covering Mechanics, Thermodynamics, and Electromagnetism',
      examinationType: 'Written, Practical, and Project-based',
      hoursPerWeek: 6
    },
    { 
      id: 3, 
      name: 'Chemistry', 
      code: 'ECZ-CHM-10',
      teacher: 'Dr. Robert Johnson',
      description: 'Organic, Inorganic, and Physical Chemistry with Lab Experiments',
      examinationType: 'Written and Laboratory Assessment',
      hoursPerWeek: 6
    },
    { 
      id: 4, 
      name: 'Biology', 
      code: 'ECZ-BIO-10',
      teacher: 'Ms. Laura Chen',
      description: 'Advanced Biology covering Genetics, Ecosystems, and Human Physiology',
      examinationType: 'Written, Practical, and Fieldwork',
      hoursPerWeek: 5
    },
    { 
      id: 5, 
      name: 'English Language', 
      code: 'ECZ-ENG-10',
      teacher: 'Mr. Brian Miller',
      description: 'Comprehensive English covering Literature, Grammar, and Composition',
      examinationType: 'Written and Oral',
      hoursPerWeek: 4
    },
  ],
  totalStudents: 30,
  averagePerformance: 82,
  upcomingTests: [
    { 
      id: 1, 
      name: 'Mid-term Exam', 
      subject: 'Mathematics',
      date: '2023-05-15',
      duration: '2 hours',
      totalMarks: 100
    },
    { 
      id: 2, 
      name: 'Chapter 5 Quiz', 
      subject: 'Physics',
      date: '2023-05-22',
      duration: '45 minutes',
      totalMarks: 30
    },
    { 
      id: 3, 
      name: 'Geometry Assessment', 
      subject: 'Mathematics',
      date: '2023-06-01',
      duration: '1 hour',
      totalMarks: 50
    },
    { 
      id: 4, 
      name: 'Algebra Review Test', 
      subject: 'Mathematics',
      date: '2023-06-08',
      duration: '1 hour',
      totalMarks: 50
    },
    { 
      id: 5, 
      name: 'Final Project Submission', 
      subject: 'Chemistry',
      date: '2023-06-15',
      duration: 'Semester-long',
      totalMarks: 100
    },
  ],
  pastTests: [
    { 
      id: 6, 
      name: 'Chapter 4 Quiz', 
      subject: 'Physics',
      date: '2023-04-30', 
      averageScore: 78,
      highestScore: 98,
      lowestScore: 55,
      mean: 78.3,
      median: 80,
      mode: 82,
      bestStudent: 'Alex Johnson',
      worstStudent: 'Ava Kim',
      studentScores: [
        { student: 'Alex Johnson', score: 98 },
        { student: 'Sarah Martinez', score: 85 },
        { student: 'Emily Chen', score: 92 },
        { student: 'Michael Brown', score: 76 },
        { student: 'Sophia Patel', score: 68 },
        { student: 'Olivia Lee', score: 72 },
        { student: 'Jackson Hall', score: 94 },
        { student: 'Ava Kim', score: 55 },
        { student: 'Ethan Hall', score: 82 },
        { student: 'Lily Tran', score: 82 },
      ]
    },
    { 
      id: 7, 
      name: 'Pop Quiz', 
      subject: 'Chemistry',
      date: '2023-04-15', 
      averageScore: 85,
      highestScore: 100,
      lowestScore: 70,
      mean: 85.2,
      median: 86,
      mode: 88,
      bestStudent: 'Jackson Hall',
      worstStudent: 'Sophia Patel',
      studentScores: [
        { student: 'Alex Johnson', score: 92 },
        { student: 'Sarah Martinez', score: 88 },
        { student: 'Emily Chen', score: 95 },
        { student: 'Michael Brown', score: 80 },
        { student: 'Sophia Patel', score: 70 },
        { student: 'Olivia Lee', score: 85 },
        { student: 'Jackson Hall', score: 100 },
        { student: 'Ava Kim', score: 75 },
        { student: 'Ethan Hall', score: 88 },
        { student: 'Lily Tran', score: 88 },
      ]
    },
    { 
      id: 8, 
      name: 'Trigonometry Mid-Chapter Test', 
      subject: 'Mathematics',
      date: '2023-03-25', 
      averageScore: 80,
      highestScore: 96,
      lowestScore: 65,
      mean: 80.1,
      median: 81,
      mode: 82,
      bestStudent: 'Emily Chen',
      worstStudent: 'Ava Kim',
      studentScores: [
        { student: 'Alex Johnson', score: 94 },
        { student: 'Sarah Martinez', score: 78 },
        { student: 'Emily Chen', score: 96 },
        { student: 'Michael Brown', score: 82 },
        { student: 'Sophia Patel', score: 70 },
        { student: 'Olivia Lee', score: 75 },
        { student: 'Jackson Hall', score: 92 },
        { student: 'Ava Kim', score: 65 },
        { student: 'Ethan Hall', score: 82 },
        { student: 'Lily Tran', score: 87 },
      ]
    },
    { 
      id: 9, 
      name: 'Math Olympiad Practice Test', 
      subject: 'Mathematics',
      date: '2023-03-18', 
      averageScore: 90,
      highestScore: 100,
      lowestScore: 78,
      mean: 90.3,
      median: 92,
      mode: 95,
      bestStudent: 'Alex Johnson',
      worstStudent: 'Sophia Patel',
      studentScores: [
        { student: 'Alex Johnson', score: 100 },
        { student: 'Sarah Martinez', score: 88 },
        { student: 'Emily Chen', score: 98 },
        { student: 'Michael Brown', score: 85 },
        { student: 'Sophia Patel', score: 78 },
        { student: 'Olivia Lee', score: 85 },
        { student: 'Jackson Hall', score: 95 },
        { student: 'Ava Kim', score: 82 },
        { student: 'Ethan Hall', score: 95 },
        { student: 'Lily Tran', score: 95 },
      ]
    },
    { 
      id: 10, 
      name: 'Chapter 3 Review Test', 
      subject: 'Biology',
      date: '2023-02-25', 
      averageScore: 75,
      highestScore: 92,
      lowestScore: 58,
      mean: 75.2,
      median: 76,
      mode: 78,
      bestStudent: 'Lily Tran',
      worstStudent: 'Ava Kim',
      studentScores: [
        { student: 'Alex Johnson', score: 85 },
        { student: 'Sarah Martinez', score: 78 },
        { student: 'Emily Chen', score: 88 },
        { student: 'Michael Brown', score: 72 },
        { student: 'Sophia Patel', score: 65 },
        { student: 'Olivia Lee', score: 70 },
        { student: 'Jackson Hall', score: 82 },
        { student: 'Ava Kim', score: 58 },
        { student: 'Ethan Hall', score: 78 },
        { student: 'Lily Tran', score: 92 },
      ]
    },
  ],
  studentPerformance: [
    { 
      id: 1,
      name: 'Alex Johnson', 
      overallGrade: 'A', 
      improvementAreas: ['Algebra', 'Geometry'],
      behaviorRating: 'Excellent'
    },
    { 
      id: 2,
      name: 'Sarah Martinez', 
      overallGrade: 'B+', 
      improvementAreas: ['Trigonometry'],
      behaviorRating: 'Good'
    },
    { 
      id: 3,
      name: 'Emily Chen', 
      overallGrade: 'A-', 
      improvementAreas: ['Word Problems'],
      behaviorRating: 'Very Good'
    },
    { 
      id: 4,
      name: 'Michael Brown', 
      overallGrade: 'B', 
      improvementAreas: ['Graphing'],
      behaviorRating: 'Satisfactory'
    },
    { 
      id: 5,
      name: 'Sophia Patel', 
      overallGrade: 'C+', 
      improvementAreas: ['Equations', 'Inequalities'],
      behaviorRating: 'Needs Improvement'
    },
    { 
      id: 6,
      name: 'Olivia Lee', 
      overallGrade: 'B-', 
      improvementAreas: ['Functions'],
      behaviorRating: 'Good'
    },
    { 
      id: 7,
      name: 'Jackson Hall', 
      overallGrade: 'A', 
      improvementAreas: [],
      behaviorRating: 'Excellent'
    },
    { 
      id: 8,
      name: 'Ava Kim', 
      overallGrade: 'C', 
      improvementAreas: ['Ratios', 'Proportions'],
      behaviorRating: 'Fair'
    },
    { 
      id: 9,
      name: 'Ethan Hall', 
      overallGrade: 'B+', 
      improvementAreas: ['Statistics'],
      behaviorRating: 'Very Good'
    },
    { 
      id: 10,
      name: 'Lily Tran', 
      overallGrade: 'A-', 
      improvementAreas: ['Probability'],
      behaviorRating: 'Excellent'
    },
  ]
};

export default function ClassView() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div 
      className="container mx-auto p-6 space-y-6"
    >
      {/* Header Section with Dialog for Class Details */}
      <div className="sticky flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-[#3D405B]">
            {classData.name}
          </h1>
          <p className="text-lg mt-2 text-gray-600">
            Class Teacher: {classData.classTeacher}
          </p>
        </div>
        <div className="flex space-x-4">
          <Dialog>
            <DialogTrigger>
              <Button 
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                View Class Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="text-2xl text-[#3D405B]">{classData.name} Details</DialogTitle>
                <DialogDescription>
                  Complete information about this class
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-[#3D405B]">Class Teacher</h3>
                    <p>{classData.classTeacher}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#3D405B]">Assigned Classroom</h3>
                    <p>{classData.assignedClassroom}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#3D405B]">Current Occupancy</h3>
                    <p>{classData.occupancy} students</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#3D405B]">Optimum Capacity</h3>
                    <p>{classData.optimumCapacity} students</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-[#3D405B]">Description</h3>
                  <p>{classData.description}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-[#3D405B] mb-2">Complete Student List</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Overall Grade</TableHead>
                        <TableHead>Behavior Rating</TableHead>
                        <TableHead>Profile</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {classData.studentPerformance.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                student.overallGrade.startsWith('A') 
                                  ? 'bg-green-500' 
                                  : student.overallGrade.startsWith('B') 
                                    ? 'bg-[#3D405B]' 
                                    : 'bg-amber-500'
                              }
                            >
                              {student.overallGrade}
                            </Badge>
                          </TableCell>
                          <TableCell>{student.behaviorRating}</TableCell>
                          <TableCell>
                            <a 
                              href={`/student/${student.id}`}
                              className="text-[#3D405B] hover:underline flex items-center"
                            >
                              View Profile <ChevronRight className="h-4 w-4 ml-1" />
                            </a>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Print Class Report
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button 
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Manage Class
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
          <TabsList 
            className="inline-flex w-full justify-start"
            style={{ 
              backgroundColor: 'transparent',
              borderBottom: '1px solid #A8A8A8' 
            }}
          >
            <TabsTrigger 
              value="overview"
              className="
                data-[state=active]:text-[#3D405B]
                data-[state=active]:border-b-2 
                data-[state=active]:border-[#3D405B]
                mr-4 pb-2
              "
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="subjects"
              className="
                data-[state=active]:text-[#3D405B]
                data-[state=active]:border-b-2 
                data-[state=active]:border-[#3D405B]
                mr-4 pb-2
              "
            >
              Subjects
            </TabsTrigger>
            <TabsTrigger 
              value="performance"
              className="
                data-[state=active]:text-[#3D405B]
                data-[state=active]:border-b-2 
                data-[state=active]:border-[#3D405B]
                mr-4 pb-2
              "
            >
              Student Performance
            </TabsTrigger>
            <TabsTrigger 
              value="assessments"
              className="
                data-[state=active]:text-[#3D405B]
                data-[state=active]:border-b-2 
                data-[state=active]:border-[#3D405B]
                mr-4 pb-2
              "
            >
              Assessments
            </TabsTrigger>
          </TabsList>

        <ScrollArea className="w-full whitespace-nowrap">
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg text-[#3D405B] flex items-center">
                    <Users className="mr-2 text-[#3D405B]" />
                    Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold text-[#3D405B]">
                    {classData.totalStudents}
                  </p>
                  <p className="text-sm text-gray-500">
                    Capacity: {classData.optimumCapacity}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg text-[#3D405B] flex items-center">
                    <BookOpen className="mr-2 text-[#3D405B]" />
                    Subjects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold text-[#3D405B]">
                    {classData.subjects.length}
                  </p>
                  <p className="text-sm text-gray-500">
                    Pure Sciences Curriculum
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg text-[#3D405B] flex items-center">
                    <TrendingUp className="mr-2 text-[#3D405B]" />
                    Avg. Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold text-[#3D405B]">
                    {classData.averagePerformance}%
                  </p>
                  <p className="text-sm text-gray-500">
                    Class Average Grade: B+
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="shadow-md mt-6">
              <CardHeader>
                <CardTitle className="text-lg text-[#3D405B] flex items-center">
                  <School className="mr-2 text-[#3D405B]" />
                  About {classData.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  {classData.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-[#3D405B] mb-1">Class Teacher</h3>
                    <p>{classData.classTeacher}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#3D405B] mb-1">Classroom</h3>
                    <p>{classData.assignedClassroom}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#3D405B] mb-1">Total Subjects</h3>
                    <p>{classData.subjects.length}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#3D405B] mb-1">Upcoming Tests</h3>
                    <p>{classData.upcomingTests.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subjects Tab */}
          <TabsContent value="subjects">
            <Card className="mt-6 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-[#3D405B] flex items-center">
                  <BookOpen className="mr-2 text-[#3D405B]" />
                  Subject List
                </CardTitle>
                <CardDescription>
                  All subjects offered in {classData.name} with ECZ codes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {classData.subjects.map((subject) => (
                    <div 
                      key={subject.id}
                      className="p-4 border rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-[#3D405B]">
                            {subject.name}
                            <Badge className="ml-2 bg-[#3D405B]">
                              {subject.code}
                            </Badge>
                          </h3>
                          <p className="text-sm text-gray-500">
                            Teacher: {subject.teacher}
                          </p>
                        </div>
                        <Dialog>
                          <DialogTrigger>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-[#3D405B] text-[#3D405B]"
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="text-xl text-[#3D405B]">
                                {subject.name} <span className="text-gray-500">({subject.code})</span>
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div>
                                <h3 className="font-medium text-[#3D405B]">Teacher</h3>
                                <p>{subject.teacher}</p>
                              </div>
                              <div>
                                <h3 className="font-medium text-[#3D405B]">Description</h3>
                                <p>{subject.description}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h3 className="font-medium text-[#3D405B]">Examination Type</h3>
                                  <p>{subject.examinationType}</p>
                                </div>
                                <div>
                                  <h3 className="font-medium text-[#3D405B]">Hours per Week</h3>
                                  <p>{subject.hoursPerWeek}</p>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-medium text-[#3D405B] mb-2">Upcoming Tests</h3>
                                <ul className="space-y-1">
                                  {classData.upcomingTests
                                    .filter(test => test.subject === subject.name)
                                    .map(test => (
                                      <li key={test.id} className="text-sm">
                                        • {test.name} - {test.date}
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                            <DialogFooter className="flex justify-between items-center">
                              <Button 
                                variant="outline"
                                className="border-[#3D405B] text-[#3D405B]"
                              >
                                View Syllabus
                              </Button>
                              <Button className="bg-green-500 hover:bg-green-600 text-white">
                                View Performance
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Student Performance Tab */}
          <TabsContent value="performance">
            <Card className="mt-6 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-[#3D405B]">
                  <TrendingUp className="mr-2 text-[#3D405B]" />
                  Student Performance Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Overall Grade</TableHead>
                      <TableHead>Improvement Areas</TableHead>
                      <TableHead>Behavior Rating</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classData.studentPerformance.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>
                          <Badge 
                            className={
                              student.overallGrade.startsWith('A') 
                                ? 'bg-green-500' 
                                : student.overallGrade.startsWith('B') 
                                  ? 'bg-[#3D405B]' 
                                  : 'bg-amber-500'
                            }
                          >
                            {student.overallGrade}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {student.improvementAreas.length > 0 
                            ? student.improvementAreas.join(', ') 
                            : 'None identified'}
                        </TableCell>
                        <TableCell>{student.behaviorRating}</TableCell>
                        <TableCell>
                          <a 
                            href={`/student/${student.id}`}
                            className="text-[#3D405B] hover:underline flex items-center"
                          >
                            Detailed Report <ChevronRight className="h-4 w-4 ml-1" />
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assessments Tab */}
          <TabsContent value="assessments">
            <div className="space-y-6 mt-6">
              {/* Quick Action Buttons */}
              <div className="flex space-x-4 mt-6">
                <Button 
                  variant="outline" 
                  className="w-full border-[#3D405B] text-[#3D405B]"
                >
                  Review Grades
                </Button>
                <Button 
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                >
                  Enter Grades
                </Button>
              </div>
              {/* Upcoming Tests Section */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center text-[#3D405B]">
                    <Calendar className="mr-2 text-[#3D405B]" />
                    Upcoming Tests
                  </CardTitle>
                  <div className="flex justify-end">
                    <Button className="bg-green-500 hover:bg-green-600 text-white">
                      Create New Test
                    </Button>
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
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {classData.upcomingTests.map((test) => (
                        <TableRow key={test.id}>
                          <TableCell>{test.name}</TableCell>
                          <TableCell>{test.subject}</TableCell>
                          <TableCell>{test.date}</TableCell>
                          <TableCell>{test.duration}</TableCell>
                          <TableCell className="space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-[#3D405B] text-[#3D405B]"
                            >
                              Edit
                            </Button>
                            <Button 
                              size="sm"
                              className="bg-green-500 hover:bg-green-600 text-white"
                            >
                              Enter Results
                            </Button>
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
                      {classData.pastTests.map((test) => (
                        <TableRow key={test.id}>
                          <TableCell>{test.name}</TableCell>
                          <TableCell>{test.subject}</TableCell>
                          <TableCell>{test.date}</TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                test.averageScore >= 90 
                                  ? 'bg-green-500' 
                                  : test.averageScore >= 80 
                                    ? 'bg-[#3D405B]' 
                                    : test.averageScore >= 70 
                                      ? 'bg-amber-500' 
                                      : 'bg-red-500'
                              }
                            >
                              {test.averageScore}%
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="border-[#3D405B] text-[#3D405B]"
                                >
                                  <BarChart2 className="h-4 w-4 mr-1" /> Statistics
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl">
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
                                      <p className="text-sm text-gray-500">
                                        Score: {test.highestScore}%
                                      </p>
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-[#3D405B] mb-2">Needs Improvement</h3>
                                      <p className="text-lg">{test.worstStudent}</p>
                                      <p className="text-sm text-gray-500">
                                        Score: {test.lowestScore}%
                                      </p>
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
                                                      ? 'bg-green-500' 
                                                      : result.score >= 80 
                                                        ? 'bg-[#3D405B]' 
                                                        : result.score >= 70 
                                                          ? 'bg-amber-500' 
                                                          : 'bg-red-500'
                                                  }
                                                >
                                                  {result.score >= 90 
                                                    ? 'Excellent' 
                                                    : result.score >= 80 
                                                      ? 'Good' 
                                                      : result.score >= 70 
                                                        ? 'Satisfactory' 
                                                        : 'Needs Improvement'}
                                                </Badge>
                                              </TableCell>
                                            </TableRow>
                                          ))}
                                      </TableBody>
                                    </Table>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button className="bg-green-500 hover:bg-green-600 text-white">
                                    Download Complete Report
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}