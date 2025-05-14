import { Input } from '@/components/ui/input'
import { TableRow, TableCell, TableBody, Table } from '@/components/ui/table'
import { createFileRoute } from '@tanstack/react-router'
import { Search, BookOpen } from 'lucide-react'
import { useState, useMemo, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

// Example data for subjects
const exampleSubjects = [
  {
    id: 1,
    name: 'Mathematics',
    code: 'MATH101',
    department: 'Mathematics',
    classes: ['Grade 9A', 'Grade 9B', 'Grade 10A'],
    teachers: ['John Doe', 'Alice Williams'],
    students: 78,
    averageGrade: 'B+',
    passRate: '92%',
  },
  {
    id: 2,
    name: 'English Literature',
    code: 'ENGL102',
    department: 'Languages',
    classes: ['Grade 9A', 'Grade 9B', 'Grade 10A', 'Grade 10B'],
    teachers: ['Jane Smith'],
    students: 96,
    averageGrade: 'A-',
    passRate: '97%',
  },
  {
    id: 3,
    name: 'Biology',
    code: 'BIO103',
    department: 'Science',
    classes: ['Grade 11A', 'Grade 11B'],
    teachers: ['Bob Johnson', 'Charlie Brown'],
    students: 54,
    averageGrade: 'B',
    passRate: '88%',
  },
  {
    id: 4,
    name: 'History',
    code: 'HIST104',
    department: 'Humanities',
    classes: ['Grade 10A', 'Grade 10B', 'Grade 11A'],
    teachers: ['Alice Williams'],
    students: 72,
    averageGrade: 'B+',
    passRate: '91%',
  },
  {
    id: 5,
    name: 'Physics',
    code: 'PHYS105',
    department: 'Science',
    classes: ['Grade 12A', 'Grade 12B'],
    teachers: ['Charlie Brown'],
    students: 45,
    averageGrade: 'B-',
    passRate: '84%',
  },
]


// Example data for subject details
const exampleStudents = [
  { id: 1, name: 'Emma Johnson', class: 'Grade 9A', grade: 'A', attendance: '95%' },
  { id: 2, name: 'James Wilson', class: 'Grade 9A', grade: 'B+', attendance: '92%' },
  { id: 3, name: 'Sophia Davis', class: 'Grade 9B', grade: 'A-', attendance: '97%' },
  { id: 4, name: 'Noah Miller', class: 'Grade 9B', grade: 'B-', attendance: '85%' },
  { id: 5, name: 'Olivia Taylor', class: 'Grade 10A', grade: 'A', attendance: '98%' },
]

const exampleTeachers = [
  { id: 1, name: 'John Doe', classes: ['Grade 9A', 'Grade 9B'], experience: '8 years' },
  { id: 2, name: 'Alice Williams', classes: ['Grade 10A'], experience: '12 years' },
]

const examplePerformanceData = {
  examScores: {
    midterm: { average: 78, highest: 98, lowest: 45, passRate: '88%' },
    final: { average: 82, highest: 100, lowest: 52, passRate: '92%' },
  },
  classDistribution: [
    { class: 'Grade 9A', average: 'B+', students: 25 },
    { class: 'Grade 9B', average: 'B', students: 27 },
    { class: 'Grade 10A', average: 'A-', students: 26 },
  ],
  gradeDistribution: {
    A: 28,
    B: 34,
    C: 12,
    D: 3,
    F: 1,
  },
}

interface Subject {
    id: number;
    name: string;
    code: string;
    department: string;
    classes: string[];
    teachers: string[];
    students: number;
    averageGrade: string;
    passRate: string;
}

// Component for displaying subject details
const SubjectDetailsDialog = ({ open, onOpenChange, subject }: { open: boolean; onOpenChange: (open: boolean) => void; subject: Subject }) => {
  if (!subject) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{subject.name} ({subject.code})</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subject Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium">{subject.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Subject Code</p>
                  <p className="font-medium">{subject.code}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Students</p>
                  <p className="font-medium">{subject.students}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Classes</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {subject.classes.map((cls: string, i: number) => (
                        <Badge key={i} variant="outline">{cls}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Average Grade</span>
                      <span className="font-medium">{subject.averageGrade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Pass Rate</span>
                      <span className="font-medium">{subject.passRate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Teaching Staff</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {subject.teachers.map((teacher: string, i: number) => (
                        <li key={i} className="text-sm font-medium">{teacher}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Enrolled Students</CardTitle>
                <CardDescription>
                  Showing {exampleStudents.length} of {subject.students} students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableRow className="bg-gray-50">
                    <TableCell className="font-medium">Name</TableCell>
                    <TableCell className="font-medium">Class</TableCell>
                    <TableCell className="font-medium">Grade</TableCell>
                    <TableCell className="font-medium">Attendance</TableCell>
                  </TableRow>
                  <TableBody>
                    {exampleStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>{student.grade}</TableCell>
                        <TableCell>{student.attendance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teachers">
            <Card>
              <CardHeader>
                <CardTitle>Teaching Staff</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableRow className="bg-gray-50">
                    <TableCell className="font-medium">Name</TableCell>
                    <TableCell className="font-medium">Classes Taught</TableCell>
                    <TableCell className="font-medium">Experience</TableCell>
                  </TableRow>
                  <TableBody>
                    {exampleTeachers.map((teacher) => (
                      <TableRow key={teacher.id}>
                        <TableCell>{teacher.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {teacher.classes.map((cls, i) => (
                              <Badge key={i} variant="outline">{cls}</Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{teacher.experience}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Exam Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Midterm Exam</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Average Score: <span className="font-medium">{examplePerformanceData.examScores.midterm.average}%</span></div>
                        <div>Pass Rate: <span className="font-medium">{examplePerformanceData.examScores.midterm.passRate}</span></div>
                        <div>Highest: <span className="font-medium">{examplePerformanceData.examScores.midterm.highest}%</span></div>
                        <div>Lowest: <span className="font-medium">{examplePerformanceData.examScores.midterm.lowest}%</span></div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Final Exam</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Average Score: <span className="font-medium">{examplePerformanceData.examScores.final.average}%</span></div>
                        <div>Pass Rate: <span className="font-medium">{examplePerformanceData.examScores.final.passRate}</span></div>
                        <div>Highest: <span className="font-medium">{examplePerformanceData.examScores.final.highest}%</span></div>
                        <div>Lowest: <span className="font-medium">{examplePerformanceData.examScores.final.lowest}%</span></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Grade Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>A</span>
                      <div className="w-3/4 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(examplePerformanceData.gradeDistribution.A / subject.students) * 100}%` }}></div>
                      </div>
                      <span className="text-sm">{examplePerformanceData.gradeDistribution.A}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>B</span>
                      <div className="w-3/4 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${(examplePerformanceData.gradeDistribution.B / subject.students) * 100}%` }}></div>
                      </div>
                      <span className="text-sm">{examplePerformanceData.gradeDistribution.B}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>C</span>
                      <div className="w-3/4 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${(examplePerformanceData.gradeDistribution.C / subject.students) * 100}%` }}></div>
                      </div>
                      <span className="text-sm">{examplePerformanceData.gradeDistribution.C}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>D</span>
                      <div className="w-3/4 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${(examplePerformanceData.gradeDistribution.D / subject.students) * 100}%` }}></div>
                      </div>
                      <span className="text-sm">{examplePerformanceData.gradeDistribution.D}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>F</span>
                      <div className="w-3/4 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${(examplePerformanceData.gradeDistribution.F / subject.students) * 100}%` }}></div>
                      </div>
                      <span className="text-sm">{examplePerformanceData.gradeDistribution.F}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Performance by Class</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableRow className="bg-gray-50">
                    <TableCell className="font-medium">Class</TableCell>
                    <TableCell className="font-medium">Students</TableCell>
                    <TableCell className="font-medium">Average Grade</TableCell>
                  </TableRow>
                  <TableBody>
                    {examplePerformanceData.classDistribution.map((cls, i) => (
                      <TableRow key={i}>
                        <TableCell>{cls.class}</TableCell>
                        <TableCell>{cls.students}</TableCell>
                        <TableCell>{cls.average}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Component for adding a new subject
const AddSubjectDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const [newSubject, setNewSubject] = useState({
    name: '',
    code: '',
    department: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to add the new subject
    console.log('New subject:', newSubject);
    onOpenChange(false);
    setNewSubject({
      name: '',
      code: '',
      department: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Subject</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Subject Name</Label>
              <Input
                id="name"
                value={newSubject.name}
                onChange={(e) =>
                  setNewSubject({ ...newSubject, name: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="code">Subject Code</Label>
              <Input
                id="code"
                value={newSubject.code}
                onChange={(e) =>
                  setNewSubject({ ...newSubject, code: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={newSubject.department}
                onValueChange={(value) =>
                  setNewSubject({ ...newSubject, department: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Languages">Languages</SelectItem>
                  <SelectItem value="Humanities">Humanities</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                  <SelectItem value="Physical Education">Physical Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#F2CC8F] hover:bg-green-600 text-custom-text"
            >
              Add Subject
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const SubjectManagement = () => {
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [filterDepartment, setFilterDepartment] = useState('');

  // Filter subjects based on search and department filter
  const filteredSubjects = useMemo(() => {
    return exampleSubjects.filter(
      (subject) => {
        const matchesSearch = subject.name.toLowerCase().includes(search.toLowerCase()) ||
          subject.code.toLowerCase().includes(search.toLowerCase());
        
        const matchesDepartment = filterDepartment === '' || subject.department === filterDepartment;
        
        return matchesSearch && matchesDepartment;
      }
    );
  }, [search, filterDepartment]);

  // Get unique departments for filter
  const departments = useMemo(() => {
    return ['', ...new Set(exampleSubjects.map(subject => subject.department))];
  }, []);

const handleSubjectClick = (subject: Subject): void => {
    setSelectedSubject(subject);
    setDetailsDialogOpen(true);
};

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex space-x-4 items-center">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-custom-text" />
            <Input
              type="text"
              placeholder="Search Subjects"
              className="pl-8 w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-48">
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Departments</SelectItem>
                {departments.filter(d => d !== '').map((department) => (
                  <SelectItem key={department} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          className="bg-[#F2CC8F] hover:bg-green-600 text-custom-text"
          onClick={() => setAddDialogOpen(true)}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Add New Subject
        </Button>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Subject List</h2>
        <Table>
          <TableRow className="bg-[#F2CC8F] hover:bg-[#F2CC8F]">
            <TableCell className="font-bold text-base">Subject Name</TableCell>
            <TableCell className="font-bold text-base">Code</TableCell>
            <TableCell className="font-bold text-base">Department</TableCell>
            <TableCell className="font-bold text-base">Classes</TableCell>
            <TableCell className="font-bold text-base">Teachers</TableCell>
            <TableCell className="font-bold text-base">Students</TableCell>
            <TableCell className="font-bold text-base">Avg. Grade</TableCell>
          </TableRow>
          <TableBody>
            {filteredSubjects.map((subject) => (
              <TableRow
                key={subject.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleSubjectClick(subject)}
              >
                <TableCell className="text-left font-medium">{subject.name}</TableCell>
                <TableCell className="text-left">{subject.code}</TableCell>
                <TableCell className="text-left">{subject.department}</TableCell>
                <TableCell className="text-left">{subject.classes.length}</TableCell>
                <TableCell className="text-left">{subject.teachers.length}</TableCell>
                <TableCell className="text-left">{subject.students}</TableCell>
                <TableCell className="text-left">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      subject.averageGrade.startsWith('A')
                        ? 'bg-green-200 text-green-800'
                        : subject.averageGrade.startsWith('B')
                          ? 'bg-blue-200 text-blue-800'
                          : subject.averageGrade.startsWith('C')
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {subject.averageGrade}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Dialogs */}
      {selectedSubject && <SubjectDetailsDialog 
        open={detailsDialogOpen} 
        onOpenChange={setDetailsDialogOpen} 
        subject={selectedSubject} 
      />}
      <AddSubjectDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen} 
      />
    </div>
  );
};

export const Route = createFileRoute('/$school/dashboard/subject-management/')({
  component: SubjectManagement,
});