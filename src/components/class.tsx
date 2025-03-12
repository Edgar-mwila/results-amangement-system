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
  School,
  ChevronRight,
  List
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
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Link } from '@tanstack/react-router';
import AddStudentDialog from './add-student-dialog';
import { AssessmentsTab } from './assessments-tab';
import { classData } from '@/data/class-data';
import ClassPerformanceAnalytics from './class-performance';

export default function ClassView() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div 
      className="flex flex-col mx-auto p-2 space-y-6"
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
          <AddStudentDialog />
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
              value="student-list"
              className="
                data-[state=active]:text-[#3D405B]
                data-[state=active]:border-b-2 
                data-[state=active]:border-[#3D405B]
                mr-4 pb-2
              "
            >
              Student List
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

        <ScrollArea className="whitespace-nowrap">
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
                <hr />
                <hr />
                <hr />
                <hr />
                <ClassPerformanceAnalytics classData={classData} />
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
                              <Link to='/admin/class-management/$id/subject/$id' params={{id: subject.id.toString()}}>
                                <Button className="bg-green-500 hover:bg-green-600 text-white">
                                  View Performance
                                </Button>
                              </Link>
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
          <TabsContent value="student-list">
            <Card className="mt-6 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-[#3D405B]">
                  <List className="mr-2 text-[#3D405B]" />
                  Student List
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Overall Grade</TableHead>
                      <TableHead>Improvement Areas</TableHead>
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
                        <TableCell>
                          <Link 
                            to='/admin/class-management/$id/student/$id'
                            params={{ id: student.id.toString()}}
                            className="text-[#3D405B] hover:underline flex items-center"
                          >
                            Detailed Report <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
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
            <AssessmentsTab classData={{
              upcomingTests: classData.upcomingTests,
              pastTests: classData.pastTests
            }} isAdminPath={true} />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}