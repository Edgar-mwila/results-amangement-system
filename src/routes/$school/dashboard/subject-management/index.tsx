import { Input } from '@/components/ui/input'
import { TableRow, TableCell, TableBody, Table } from '@/components/ui/table'
import { createFileRoute, useParams } from '@tanstack/react-router'
import { Search, Filter, X, BookOpen, AlertCircle } from 'lucide-react'
import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useQuery } from '@tanstack/react-query'

// Type definitions based on your API interface
interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passwordHash: string;
  profilePhotoUrl: string;
  status: string;
  role: Role;
}

interface Role {
  name: string;
}

interface Grade {
  level: number;
  name: string;
}

interface AcademicYear {
  year: string;
  name: string;
}

interface StudentData {
  id: number;
  firstName: string;
  otherName: string;
  lastName: string;
  sex: string;
  gender: string;
}

interface ClassStudentData {
  student: StudentData;
}

interface ClassData {
  id: string;
  grade: Grade;
  name: string;
  academicYear: AcademicYear;
  classStudents: ClassStudentData[];
}

interface ClassSubjectData {
  classModel: ClassData;
  teacher: UserData;
}

interface SubjectData {
  name: string;
  code: string;
  url: string;
  classSubjects: ClassSubjectData[];
}

// Display interface for transformed data
interface SubjectDisplay {
  name: string;
  code: string;
  url: string;
  classes: string[];
  teachers: string[];
  students: number;
  departments: string[];
  academicYears: string[];
}

// API function to fetch subjects
const fetchSubjects = async (school: string): Promise<SubjectData[]> => {
  const response = await fetch(`/api/${school}/subjects/`);
  if (!response.ok) {
    throw new Error('Failed to fetch subjects');
  }
  return response.json();
};

// Transform subjects for display
const transformSubjectsForDisplay = (subjects: SubjectData[]): SubjectDisplay[] => {
  return subjects.map(subject => {
    const uniqueClasses = new Set<string>();
    const uniqueTeachers = new Set<string>();
    const uniqueDepartments = new Set<string>();
    const uniqueAcademicYears = new Set<string>();
    let totalStudents = 0;

    subject.classSubjects?.forEach(cs => {
      if (cs.classModel) {
        const className = `Grade ${cs.classModel.grade?.level || ''} ${cs.classModel.name}`.trim();
        uniqueClasses.add(className);
        
        // Count students
        totalStudents += cs.classModel.classStudents?.length || 0;
        
        // Add academic year
        if (cs.classModel.academicYear?.name) {
          uniqueAcademicYears.add(cs.classModel.academicYear.name);
        }
        
        // Determine department based on grade level
        if (cs.classModel.grade) {
          const level = cs.classModel.grade.level;
          if (level <= 6) {
            uniqueDepartments.add('Primary');
          } else if (level <= 9) {
            uniqueDepartments.add('Middle School');
          } else {
            uniqueDepartments.add('High School');
          }
        }
      }
      
      if (cs.teacher) {
        const teacherName = `${cs.teacher.firstName} ${cs.teacher.lastName}`.trim();
        uniqueTeachers.add(teacherName);
      }
    });

    return {
      name: subject.name,
      code: subject.code,
      url: subject.url,
      classes: Array.from(uniqueClasses),
      teachers: Array.from(uniqueTeachers),
      students: totalStudents,
      departments: Array.from(uniqueDepartments),
      academicYears: Array.from(uniqueAcademicYears),
    };
  });
};

// Loading skeleton component
const SubjectsTableSkeleton = () => (
  <div className="border rounded-lg overflow-hidden border-gray-200">
    <Table>
      <TableRow className="bg-gray-50">
        <TableCell className="font-medium text-gray-700">Subject</TableCell>
        <TableCell className="font-medium text-gray-700">Code</TableCell>
        <TableCell className="font-medium text-gray-700">Classes</TableCell>
        <TableCell className="font-medium text-gray-700">Teachers</TableCell>
      </TableRow>
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index} className="border-t border-gray-100">
            <TableCell>
              <Skeleton className="h-4 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-20" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-16" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

// Component for displaying subject details
const SubjectDetailsDialog = ({ 
  open, 
  onOpenChange, 
  subject 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  subject: SubjectDisplay | null;
}) => {
  if (!subject) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="h-2 bg-gradient-to-r from-green-400 to-blue-400 -mx-6 -mt-6 rounded-t-lg" />
        <DialogHeader className="pt-2">
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {subject.name} ({subject.code})
          </DialogTitle>
          {subject.url && (
            <p className="text-sm text-gray-500">
              URL: <a href={subject.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{subject.url}</a>
            </p>
          )}
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-gray-800">Classes & Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Classes ({subject.classes.length})</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {subject.classes.map((cls, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {cls}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Students</p>
                  <p className="font-medium text-gray-800">{subject.students}</p>
                </div>
                {subject.academicYears.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500">Academic Years</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {subject.academicYears.map((year, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                          {year}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-gray-800">Teachers ({subject.teachers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 max-h-40 overflow-y-auto">
                {subject.teachers.length > 0 ? (
                  subject.teachers.map((teacher, i) => (
                    <li key={i} className="text-sm font-medium text-gray-800 flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 flex-shrink-0"></div>
                      {teacher}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-500 italic">No teachers assigned</li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-gray-200">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const SubjectManagement = () => {
  const { school } = useParams({ from: "/$school/dashboard/subject-management/" });
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<SubjectDisplay | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [filterDepartment, setFilterDepartment] = useState('');

  // Fetch subjects using TanStack Query
  const {
    data: subjects,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['subjects'],
    queryFn: () => fetchSubjects(school),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  // Transform subjects for display
  const displaySubjects = useMemo(() => {
    if (!subjects) return [];
    return transformSubjectsForDisplay(subjects);
  }, [subjects]);

  // Get unique departments for filtering
  const availableDepartments = useMemo(() => {
    const departments = new Set<string>();
    displaySubjects.forEach(subject => {
      subject.departments.forEach(dept => departments.add(dept));
    });
    return Array.from(departments).sort();
  }, [displaySubjects]);

  // Clear search functionality
  const clearSearch = () => {
    setSearch('');
  };

  // Filter subjects based on search and department filter
  const filteredSubjects = useMemo(() => {
    const filtered = displaySubjects.filter((subject) => {
      const matchesSearch = 
        subject.name.toLowerCase().includes(search.toLowerCase()) ||
        subject.code.toLowerCase().includes(search.toLowerCase()) ||
        subject.departments.some(dept => dept.toLowerCase().includes(search.toLowerCase())) ||
        subject.teachers.some(teacher => teacher.toLowerCase().includes(search.toLowerCase()));
      
      const matchesDepartment = filterDepartment === '' || subject.departments.includes(filterDepartment);
      
      return matchesSearch && matchesDepartment;
    });

    // Sort the filtered subjects
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [displaySubjects, search, filterDepartment]);

  const handleSubjectClick = (subject: SubjectDisplay): void => {
    setSelectedSubject(subject);
    setDetailsDialogOpen(true);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col space-y-6 p-6 bg-white">
        <div className="flex flex-row justify-between items-center">
          <Skeleton className="h-8 w-48" />
        </div>
        
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <Skeleton className="h-10 w-full md:w-96" />
          <Skeleton className="h-10 w-32" />
        </div>
        
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
        
        <SubjectsTableSkeleton />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col space-y-6 p-6 bg-white">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Subject Management</h1>
        </div>
        
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load subjects. {error instanceof Error ? error.message : 'Please try again later.'}
          </AlertDescription>
        </Alert>
        
        <div className="flex justify-center">
          <Button onClick={() => refetch()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 p-6 bg-white">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Subject Management</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div className="relative w-full md:w-auto flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search by name, code, department, or teacher..."
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
        
        {/* Department filter */}
        <div className="flex items-center gap-2">
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:border-green-400 focus:ring-green-400"
          >
            <option value="">All Departments</option>
            {availableDepartments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Show results count and filters */}
      <div className="flex flex-wrap items-center justify-between text-sm text-gray-500">
        <div>
          Showing <span className="font-medium text-gray-700">{filteredSubjects.length}</span> of <span className="font-medium text-gray-700">{displaySubjects.length}</span> subjects
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

      {/* Display subjects */}
      {filteredSubjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-gray-100 rounded-full p-3 mb-4">
            <BookOpen className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-1">No subjects found</h3>
          <p className="text-gray-500 max-w-sm">
            {displaySubjects.length === 0 
              ? "No subjects have been created yet."
              : "Try adjusting your search or filters to find what you're looking for."
            }
          </p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden border-gray-200">
          <Table>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableCell className="font-medium text-gray-700">Subject</TableCell>
              <TableCell className="font-medium text-gray-700">Code</TableCell>
              <TableCell className="font-medium text-gray-700">Classes</TableCell>
              <TableCell className="font-medium text-gray-700">Teachers</TableCell>
              <TableCell className="font-medium text-gray-700">Students</TableCell>
            </TableRow>
            <TableBody>
              {filteredSubjects.map((subject, index) => (
                <TableRow 
                  key={`${subject.code}-${index}`}
                  className="hover:bg-gray-50 border-t border-gray-100 cursor-pointer"
                  onClick={() => handleSubjectClick(subject)}
                >
                  <TableCell className="font-medium text-gray-800">{subject.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-xs">
                      {subject.code}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {subject.classes.slice(0, 2).map((cls, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {cls}
                        </Badge>
                      ))}
                      {subject.classes.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{subject.classes.length - 2} more
                        </Badge>
                      )}
                      {subject.classes.length === 0 && (
                        <span className="text-xs text-gray-400">No classes</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600">
                      {subject.teachers.length > 0 
                        ? `${subject.teachers.length} teacher${subject.teachers.length > 1 ? 's' : ''}`
                        : 'No teachers'
                      }
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium text-gray-800">
                      {subject.students}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Detail dialog */}
      <SubjectDetailsDialog 
        open={detailsDialogOpen} 
        onOpenChange={setDetailsDialogOpen} 
        subject={selectedSubject} 
      />
    </div>
  );
};

export const Route = createFileRoute('/$school/dashboard/subject-management/')({
  component: SubjectManagement
});

export default SubjectManagement;