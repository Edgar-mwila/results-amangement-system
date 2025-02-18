import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertCircle,
  Star,
  TrendingUp 
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
  DialogTrigger 
} from '@/components/ui/dialog';

const classData = {
  id: 1,
  name: 'Class 10A',
  classTeacher: 'Ms. Emily Richards',
  subject: 'Mathematics',
  totalStudents: 30,
  averagePerformance: 82,
  upcomingTests: [
    { id: 1, name: 'Mid-term Exam', date: '2023-05-15' },
    { id: 2, name: 'Chapter 5 Quiz', date: '2023-05-22' },
    { id: 3, name: 'Geometry Assessment', date: '2023-06-01' },
    { id: 4, name: 'Algebra Review Test', date: '2023-06-08' },
    { id: 5, name: 'Final Project Submission', date: '2023-06-15' },
  ],
  pastTests: [
    { id: 6, name: 'Chapter 4 Quiz', date: '2023-04-30', averageScore: 78 },
    { id: 7, name: 'Pop Quiz', date: '2023-04-15', averageScore: 85 },
    { id: 8, name: 'Trigonometry Mid-Chapter Test', date: '2023-03-25', averageScore: 80 },
    { id: 9, name: 'Math Olympiad Practice Test', date: '2023-03-18', averageScore: 90 },
    { id: 10, name: 'Chapter 3 Review Test', date: '2023-02-25', averageScore: 75 },
  ],
  studentPerformance: [
    { 
      name: 'Alex Johnson', 
      overallGrade: 'A', 
      improvementAreas: ['Algebra', 'Geometry'],
      behaviorRating: 'Excellent'
    },
    { 
      name: 'Sarah Martinez', 
      overallGrade: 'B+', 
      improvementAreas: ['Trigonometry'],
      behaviorRating: 'Good'
    },
    { 
      name: 'Emily Chen', 
      overallGrade: 'A-', 
      improvementAreas: ['Word Problems'],
      behaviorRating: 'Very Good'
    },
    { 
      name: 'Michael Brown', 
      overallGrade: 'B', 
      improvementAreas: ['Graphing'],
      behaviorRating: 'Satisfactory'
    },
    { 
      name: 'Sophia Patel', 
      overallGrade: 'C+', 
      improvementAreas: ['Equations', 'Inequalities'],
      behaviorRating: 'Needs Improvement'
    },
    { 
      name: 'Olivia Lee', 
      overallGrade: 'B-', 
      improvementAreas: ['Functions'],
      behaviorRating: 'Good'
    },
    { 
      name: 'Jackson Hall', 
      overallGrade: 'A', 
      improvementAreas: [],
      behaviorRating: 'Excellent'
    },
    { 
      name: 'Ava Kim', 
      overallGrade: 'C', 
      improvementAreas: ['Ratios', 'Proportions'],
      behaviorRating: 'Fair'
    },
    { 
      name: 'Ethan Hall', 
      overallGrade: 'B+', 
      improvementAreas: ['Statistics'],
      behaviorRating: 'Very Good'
    },
    { 
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
      style={{ backgroundColor: '#F4F4F4' }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 
            className="text-4xl font-bold"
            style={{ color: '#264653' }}
          >
            {classData.name}
          </h1>
          <p 
            className="text-lg mt-2"
            style={{ color: '#A8A8A8' }}
          >
            Class Teacher: {classData.classTeacher}
          </p>
        </div>
        <div className="flex space-x-4">
          <Button 
            style={{ 
              backgroundColor: '#2A9D8F', 
              color: 'white' 
            }}
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
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList 
            className="inline-flex w-full justify-start"
            style={{ 
              backgroundColor: 'transparent',
              borderBottom: `1px solid #A8A8A8` 
            }}
          >
            <TabsTrigger 
              value="overview"
              className="
                data-[state=active]:text-[#2A9D8F]
                data-[state=active]:border-b-2 
                data-[state=active]:border-[#2A9D8F]
                mr-4 pb-2
              "
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="performance"
              className="
                data-[state=active]:text-[#2A9D8F]
                data-[state=active]:border-b-2 
                data-[state=active]:border-[#2A9D8F]
                mr-4 pb-2
              "
            >
              Student Performance
            </TabsTrigger>
            <TabsTrigger 
              value="activities"
              className="
                data-[state=active]:text-[#2A9D8F]
                data-[state=active]:border-b-2 
                data-[state=active]:border-[#2A9D8F]
                mr-4 pb-2
              "
            >
              Assesments
            </TabsTrigger>
          </TabsList>
        </ScrollArea>

        {/* Overview Tab */}
        <TabsContent value="subjects">
          <h1>Subjects</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card 
              className="shadow-md" 
              style={{ 
                backgroundColor: '#FFFFFF', 
                borderColor: '#A8A8A8' 
              }}
            >
              <CardHeader>
                <CardTitle 
                  className="text-lg"
                  style={{ color: '#264653' }}
                >
                  Subject
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p 
                  className="text-2xl font-semibold"
                  style={{ color: '#2A9D8F' }}
                >
                  {classData.subject}
                </p>
              </CardContent>
            </Card>
            
            {/* Additional overview cards similar to previous implementation */}
            {/* ... */}
          </div>
        </TabsContent>

        {/* Student Performance Tab */}
        <TabsContent value="performance">
          <Card 
            className="mt-6"
            style={{ 
              backgroundColor: '#FFFFFF', 
              borderColor: '#A8A8A8' 
            }}
          >
            <CardHeader>
              <CardTitle 
                className="text-lg flex items-center"
                style={{ color: '#264653' }}
              >
                <TrendingUp className="mr-2" style={{ color: '#2A9D8F' }} />
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
                    <TableRow key={student.name}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>
                        <Badge 
                          style={{ 
                            backgroundColor: student.overallGrade === 'A' ? '#4CAF50' : '#2A9D8F' 
                          }}
                        >
                          {student.overallGrade}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {student.improvementAreas.join(', ')}
                      </TableCell>
                      <TableCell>{student.behaviorRating}</TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          style={{ borderColor: '#2A9D8F', color: '#2A9D8F' }}
                        >
                          Detailed Report
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Class Activities Tab */}
        <TabsContent value="activities">
          <Card 
            className="mt-6"
            style={{ 
              backgroundColor: '#FFFFFF', 
              borderColor: '#A8A8A8' 
            }}
          >
            <CardHeader>
              <CardTitle 
                className="text-lg flex items-center"
                style={{ color: '#264653' }}
              >
                <Star className="mr-2" style={{ color: '#F4A261' }} />
                Class Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Activity Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classData.classActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.name}</TableCell>
                      <TableCell>
                        <Badge 
                          style={{ 
                            backgroundColor: '#2A9D8F', 
                            color: 'white' 
                          }}
                        >
                          {activity.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{activity.participants}</TableCell>
                      <TableCell>{activity.date}</TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          style={{ 
                            borderColor: '#2A9D8F', 
                            color: '#2A9D8F' 
                          }}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Action Buttons */}
      <div className="flex space-x-4 mt-6">
          <Button 
            variant="outline" 
            className="w-full"
            style={{ 
              borderColor: '#2A9D8F', 
              color: '#2A9D8F' 
            }}
          >
            Review Grades
          </Button>
          <Button 
            className="w-full"
            style={{ 
              backgroundColor: '#2A9D8F', 
              color: 'white' 
            }}
          >
            Enter Grades
          </Button>
      </div>
    </div>
  );
}
