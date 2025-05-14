import { Input } from '@/components/ui/input'
import { TableRow, TableCell, TableBody, Table } from '@/components/ui/table'
import { createFileRoute } from '@tanstack/react-router'
import { Search, BookPlus, Filter, Grid, List, X, BookOpen } from 'lucide-react'
import { useState, useMemo, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogTrigger,
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
  CardFooter,
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
const SubjectDetailsDialog = ({ open, onOpenChange, subject }: { open: boolean; onOpenChange: (open: boolean) => void; subject: Subject | null }) => {
  if (!subject) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="h-2 bg-gradient-to-r from-green-400 to-blue-400 -mx-6 -mt-6 rounded-t-lg" />
        <DialogHeader className="pt-2">
          <DialogTitle className="text-2xl font-bold text-gray-800">{subject.name} ({subject.code})</DialogTitle>
          <DialogDescription className="text-gray-500">
            Detailed information about this subject and its performance
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4 bg-gray-50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm">Overview</TabsTrigger>
            <TabsTrigger value="students" className="data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm">Students</TabsTrigger>
            <TabsTrigger value="teachers" className="data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm">Teachers</TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className="border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-gray-800">Subject Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium text-gray-800">{subject.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Subject Code</p>
                  <p className="font-medium text-gray-800">{subject.code}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Students</p>
                  <p className="font-medium text-gray-800">{subject.students}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Classes</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {subject.classes.map((cls: string, i: number) => (
                      <Badge key={i} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50">{cls}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-gray-800">Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Average Grade</span>
                      <span className="font-medium text-gray-800">{subject.averageGrade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Pass Rate</span>
                      <span className="font-medium text-gray-800">{subject.passRate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-gray-800">Teaching Staff</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {subject.teachers.map((teacher: string, i: number) => (
                      <li key={i} className="text-sm font-medium text-gray-800">{teacher}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students">
            <Card className="border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-gray-800">Enrolled Students</CardTitle>
                <CardDescription className="text-gray-500">
                  Showing {exampleStudents.length} of {subject.students} students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <Table>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-700">Name</TableCell>
                      <TableCell className="font-medium text-gray-700">Class</TableCell>
                      <TableCell className="font-medium text-gray-700">Grade</TableCell>
                      <TableCell className="font-medium text-gray-700">Attendance</TableCell>
                    </TableRow>
                    <TableBody>
                      {exampleStudents.map((student) => (
                        <TableRow key={student.id} className="hover:bg-gray-50 border-t border-gray-100">
                          <TableCell className="font-medium text-gray-800">{student.name}</TableCell>
                          <TableCell>{student.class}</TableCell>
                          <TableCell>
                            <Badge className={`
                              ${student.grade.startsWith('A') ? 'bg-green-100 text-green-700' : ''}
                              ${student.grade.startsWith('B') ? 'bg-blue-100 text-blue-700' : ''}
                              ${student.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-700' : ''}
                              ${student.grade.startsWith('D') || student.grade.startsWith('F') ? 'bg-red-100 text-red-700' : ''}
                              hover:bg-opacity-90
                            `}>
                              {student.grade}
                            </Badge>
                          </TableCell>
                          <TableCell>{student.attendance}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teachers">
            <Card className="border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-gray-800">Teaching Staff</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <Table>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-700">Name</TableCell>
                      <TableCell className="font-medium text-gray-700">Classes Taught</TableCell>
                      <TableCell className="font-medium text-gray-700">Experience</TableCell>
                    </TableRow>
                    <TableBody>
                      {exampleTeachers.map((teacher) => (
                        <TableRow key={teacher.id} className="hover:bg-gray-50 border-t border-gray-100">
                          <TableCell className="font-medium text-gray-800">{teacher.name}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {teacher.classes.map((cls, i) => (
                                <Badge key={i} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50">{cls}</Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{teacher.experience}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-gray-800">Exam Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">Midterm Exam</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-600">Average Score: <span className="font-medium text-gray-800">{examplePerformanceData.examScores.midterm.average}%</span></div>
                        <div className="text-gray-600">Pass Rate: <span className="font-medium text-gray-800">{examplePerformanceData.examScores.midterm.passRate}</span></div>
                        <div className="text-gray-600">Highest: <span className="font-medium text-gray-800">{examplePerformanceData.examScores.midterm.highest}%</span></div>
                        <div className="text-gray-600">Lowest: <span className="font-medium text-gray-800">{examplePerformanceData.examScores.midterm.lowest}%</span></div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">Final Exam</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-600">Average Score: <span className="font-medium text-gray-800">{examplePerformanceData.examScores.final.average}%</span></div>
                        <div className="text-gray-600">Pass Rate: <span className="font-medium text-gray-800">{examplePerformanceData.examScores.final.passRate}</span></div>
                        <div className="text-gray-600">Highest: <span className="font-medium text-gray-800">{examplePerformanceData.examScores.final.highest}%</span></div>
                        <div className="text-gray-600">Lowest: <span className="font-medium text-gray-800">{examplePerformanceData.examScores.final.lowest}%</span></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-gray-800">Grade Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800">A</span>
                      <div className="w-3/4 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-400 h-2.5 rounded-full" style={{ width: `${(examplePerformanceData.gradeDistribution.A / subject.students) * 100}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-600">{examplePerformanceData.gradeDistribution.A}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800">B</span>
                      <div className="w-3/4 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-400 h-2.5 rounded-full" style={{ width: `${(examplePerformanceData.gradeDistribution.B / subject.students) * 100}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-600">{examplePerformanceData.gradeDistribution.B}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800">C</span>
                      <div className="w-3/4 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${(examplePerformanceData.gradeDistribution.C / subject.students) * 100}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-600">{examplePerformanceData.gradeDistribution.C}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800">D</span>
                      <div className="w-3/4 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-orange-400 h-2.5 rounded-full" style={{ width: `${(examplePerformanceData.gradeDistribution.D / subject.students) * 100}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-600">{examplePerformanceData.gradeDistribution.D}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800">F</span>
                      <div className="w-3/4 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-400 h-2.5 rounded-full" style={{ width: `${(examplePerformanceData.gradeDistribution.F / subject.students) * 100}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-600">{examplePerformanceData.gradeDistribution.F}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-4 border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-gray-800">Performance by Class</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <Table>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-700">Class</TableCell>
                      <TableCell className="font-medium text-gray-700">Students</TableCell>
                      <TableCell className="font-medium text-gray-700">Average Grade</TableCell>
                    </TableRow>
                    <TableBody>
                      {examplePerformanceData.classDistribution.map((cls, i) => (
                        <TableRow key={i} className="hover:bg-gray-50 border-t border-gray-100">
                          <TableCell className="font-medium text-gray-800">{cls.class}</TableCell>
                          <TableCell>{cls.students}</TableCell>
                          <TableCell>
                            <Badge className={`
                              ${cls.average.startsWith('A') ? 'bg-green-100 text-green-700' : ''}
                              ${cls.average.startsWith('B') ? 'bg-blue-100 text-blue-700' : ''}
                              ${cls.average.startsWith('C') ? 'bg-yellow-100 text-yellow-700' : ''}
                              ${cls.average.startsWith('D') || cls.average.startsWith('F') ? 'bg-red-100 text-red-700' : ''}
                              hover:bg-opacity-90
                            `}>
                              {cls.average}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-gray-200">
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
        <div className="h-2 bg-gradient-to-r from-green-400 to-blue-400 -mx-6 -mt-6 rounded-t-lg" />
        <DialogHeader className="pt-2">
          <DialogTitle className="text-xl font-bold text-gray-800">Add New Subject</DialogTitle>
          <DialogDescription className="text-gray-500">
            Fill in the details to create a new subject in the system.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name" className="font-medium text-gray-700">Subject Name</Label>
              <Input
                id="name"
                value={newSubject.name}
                onChange={(e) =>
                  setNewSubject({ ...newSubject, name: e.target.value })
                }
                className="border-gray-200 focus:border-green-400 focus:ring-green-400"
                placeholder="e.g. Chemistry"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="code" className="font-medium text-gray-700">Subject Code</Label>
              <Input
                id="code"
                value={newSubject.code}
                onChange={(e) =>
                  setNewSubject({ ...newSubject, code: e.target.value })
                }
                className="border-gray-200 focus:border-green-400 focus:ring-green-400"
                placeholder="e.g. CHEM201"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="department" className="font-medium text-gray-700">Department</Label>
              <Select
                value={newSubject.department}
                onValueChange={(value) =>
                  setNewSubject({ ...newSubject, department: value })
                }
                required
              >
                <SelectTrigger className="border-gray-200 focus:ring-green-400">
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
          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-400 hover:bg-green-500 text-white"
            >
              Add Subject
            </Button>
          </DialogFooter>
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
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');

  // Clear search functionality
  const clearSearch = () => {
    setSearch('');
  };

  // Filter subjects based on search and department filter
  const filteredSubjects = useMemo(() => {
    const filtered = exampleSubjects.filter(
      (subject) => {
        const matchesSearch = 
          subject.name.toLowerCase().includes(search.toLowerCase()) ||
          subject.code.toLowerCase().includes(search.toLowerCase()) ||
          subject.department.toLowerCase().includes(search.toLowerCase());
        
        const matchesDepartment = filterDepartment === '' || subject.department === filterDepartment;
        
        return matchesSearch && matchesDepartment;
      }
    );

    // Sort the filtered subjects
    return filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'code') return a.code.localeCompare(b.code);
      if (sortBy === 'department') return a.department.localeCompare(b.department);
      if (sortBy === 'students') return b.students - a.students;
      return 0;
    });
  }, [search, filterDepartment, sortBy]);

  // Get unique departments for filter
  const departments = useMemo(() => {
    return ['', ...new Set(exampleSubjects.map(subject => subject.department))];
  }, []);

  const handleSubjectClick = (subject: Subject): void => {
    setSelectedSubject(subject);
    setDetailsDialogOpen(true);
  };

  // Function to determine badge color based on grade
  const getGradeBadgeClass = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-700 hover:bg-green-100';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
    return 'bg-red-100 text-red-700 hover:bg-red-100';
  };

  return (
    <div className="flex flex-col space-y-6 p-6 bg-white">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">Subject Management</h1>
        <p className="text-gray-500">Manage all subjects, assign teachers, and monitor student performance</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div className="relative w-full md:w-auto flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search by subject name, code or department..."
            className="pl-10 pr-10 border-gray-200 focus:border-green-400 focus:ring-green-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <div className="flex items-center bg-gray-50 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${
                viewMode === 'grid' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded ${
                viewMode === 'list' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          <Select value={filterDepartment} onValueChange={setFilterDepartment}>
            <SelectTrigger className="w-full md:w-[180px] border-gray-200 focus:ring-green-400">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.filter(d => d !== '').map((department) => (
                <SelectItem key={department} value={department}>{department}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[160px] border-gray-200 focus:ring-green-400">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="code">Code</SelectItem>
              <SelectItem value="department">Department</SelectItem>
              <SelectItem value="students">Students</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-400 hover:bg-green-500 text-white ml-auto">
                <BookPlus className="mr-2 h-4 w-4" />
                Add Subject
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      {/* Show results count and filters */}
      <div className="flex flex-wrap items-center justify-between text-sm text-gray-500">
        <div>
          Showing <span className="font-medium text-gray-700">{filteredSubjects.length}</span> subjects
          {filterDepartment && (
            <>
              {' '}in <span className="font-medium text-gray-700">{filterDepartment}</span> department
            </>
          )}
          {search && (
            <>
              {' '}matching <span className="font-medium text-gray-700">"{search}"</span>
            </>
          )}
        </div>
        <div className="flex items-center space-x-1">
          <Filter className="h-4 w-4 text-gray-400" />
          <span>Filters:</span>
          {filterDepartment && (
            <Badge 
              variant="outline" 
              className="ml-1 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50"
            >
              {filterDepartment}
              <button 
                className="ml-1 hover:text-blue-900" 
                onClick={() => setFilterDepartment('')}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {!filterDepartment && (
            <span className="text-gray-400">None</span>
          )}
        </div>
      </div>

      {/* Display subjects in either grid or list view */}
      {filteredSubjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-gray-100 rounded-full p-3 mb-4">
            <BookOpen className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-1">No subjects found</h3>
          <p className="text-gray-500 max-w-sm">
            Try adjusting your search or filters to find what you're looking for, or add a new subject.
          </p>
          <Button 
            onClick={() => setAddDialogOpen(true)} 
            className="mt-4 bg-green-400 hover:bg-green-500 text-white"
          >
            <BookPlus className="mr-2 h-4 w-4" />
            Add New Subject
          </Button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSubjects.map((subject) => (
            <Card 
              key={subject.id} 
              className="border border-gray-200 hover:border-green-300 hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleSubjectClick(subject)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-bold text-gray-800">{subject.name}</CardTitle>
                    <CardDescription className="text-gray-500">{subject.code}</CardDescription>
                  </div>
                  <Badge className={getGradeBadgeClass(subject.averageGrade)}>
                    {subject.averageGrade}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div>
                    <p className="text-gray-500">Department</p>
                    <p className="font-medium text-gray-800">{subject.department}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Students</p>
                    <p className="font-medium text-gray-800">{subject.students}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Classes</p>
                    <p className="font-medium text-gray-800">{subject.classes.length}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Pass Rate</p>
                    <p className="font-medium text-gray-800">{subject.passRate}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0 pb-4">
                <div className="flex -space-x-2">
                  {subject.teachers.slice(0, 3).map((teacher, i) => (
                    <div 
                      key={i} 
                      className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center text-white text-xs font-medium border-2 border-white"
                      title={teacher}
                    >
                      {teacher.split(' ').map(n => n[0]).join('')}
                    </div>
                  ))}
                  {subject.teachers.length > 3 && (
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-medium border-2 border-white">
                      +{subject.teachers.length - 3}
                    </div>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden border-gray-200">
          <Table>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableCell className="font-medium text-gray-700">Subject</TableCell>
              <TableCell className="font-medium text-gray-700">Code</TableCell>
              <TableCell className="font-medium text-gray-700">Department</TableCell>
              <TableCell className="font-medium text-gray-700">Teachers</TableCell>
              <TableCell className="font-medium text-gray-700">Students</TableCell>
              <TableCell className="font-medium text-gray-700">Avg. Grade</TableCell>
              <TableCell className="font-medium text-gray-700">Pass Rate</TableCell>
            </TableRow>
            <TableBody>
              {filteredSubjects.map((subject) => (
                <TableRow 
                  key={subject.id} 
                  className="hover:bg-gray-50 border-t border-gray-100 cursor-pointer"
                  onClick={() => handleSubjectClick(subject)}
                >
                  <TableCell className="font-medium text-gray-800">{subject.name}</TableCell>
                  <TableCell>{subject.code}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50">
                      {subject.department}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex -space-x-2">
                      {subject.teachers.slice(0, 2).map((teacher, i) => (
                        <div 
                          key={i} 
                          className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center text-white text-xs font-medium border-2 border-white"
                          title={teacher}
                        >
                          {teacher.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                      {subject.teachers.length > 2 && (
                        <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-medium border-2 border-white">
                          +{subject.teachers.length - 2}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{subject.students}</TableCell>
                  <TableCell>
                    <Badge className={getGradeBadgeClass(subject.averageGrade)}>
                      {subject.averageGrade}
                    </Badge>
                  </TableCell>
                  <TableCell>{subject.passRate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Detail and Add dialogs */}
      <SubjectDetailsDialog 
        open={detailsDialogOpen} 
        onOpenChange={setDetailsDialogOpen} 
        subject={selectedSubject} 
      />
      
      <AddSubjectDialog 
        open={addDialogOpen} 
        onOpenChange={setAddDialogOpen} 
      />
    </div>
  );
};

export const Route = createFileRoute('/$school/dashboard/subject-management/')({
  component: SubjectManagement
});

export default SubjectManagement;