import { Input } from "@/components/ui/input"
import { TableRow, TableCell, TableBody, Table } from "@/components/ui/table"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { Search, BookPlus, X, School, AlertCircle, Loader2 } from 'lucide-react'
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { ClassModel, User, Grade, AcademicYear, CreateClassRequest } from "@/types"

// API functions
const classApi = {
  getClasses: async (schoolId: string): Promise<ClassModel[]> => {
    const response = await fetch(`/api/${schoolId}/classes/`);
    if (!response.ok) {
      throw new Error('Failed to fetch classes');
    }
    return response.json();
  },

  getTeachers: async (schoolId: string): Promise<User[]> => {
    const response = await fetch(`/api/${schoolId}/users/`);
    if (!response.ok) {
      throw new Error('Failed to fetch teachers');
    }
    return response.json();
  },

  getGrades: async (schoolId: string): Promise<Grade[]> => {
    const response = await fetch(`/api/${schoolId}/grades/`);
    if (!response.ok) {
      throw new Error('Failed to fetch grades');
    }
    return response.json();
  },

  getAcademicYears: async (schoolId: string): Promise<AcademicYear[]> => {
    const response = await fetch(`/api/${schoolId}/academic-years/`);
    if (!response.ok) {
      throw new Error('Failed to fetch academic years');
    }
    return response.json();
  },

  createClass: async (schoolId: string, classData: CreateClassRequest): Promise<ClassModel> => {
    const response = await fetch(`/api/${schoolId}/classes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(classData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create class');
    }
    
    return response.json();
  },
};

// Loading skeleton component
const ClassTableSkeleton = () => (
  <div className="rounded-xl border border-gray-200 overflow-hidden">
    <Table>
      <thead>
        <TableRow className="bg-gray-50 hover:bg-gray-50">
          <TableCell className="font-semibold text-gray-700">Class Name</TableCell>
          <TableCell className="font-semibold text-gray-700">Teacher</TableCell>
          <TableCell className="font-semibold text-gray-700">Grade</TableCell>
          <TableCell className="font-semibold text-gray-700">Students</TableCell>
        </TableRow>
      </thead>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index} className="border-t border-gray-100">
            <TableCell><Skeleton className="h-4 w-16" /></TableCell>
            <TableCell><Skeleton className="h-4 w-32" /></TableCell>
            <TableCell><Skeleton className="h-4 w-8" /></TableCell>
            <TableCell><Skeleton className="h-6 w-8 rounded-full" /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

// Create Class Dialog Component
// Create Class Dialog Component - FIXED VERSION
const CreateClassDialog = ({ schoolId }: { schoolId: string }) => {
  const [open, setOpen] = useState(false);
  
  // FIXED: Simplified form state - removed unnecessary object properties and 0 defaults
  const [formData, setFormData] = useState<{
    name: string;
    gradeId?: number;
    academicYearId?: number;
    classTeacherId?: string;
  }>({
    name: '',
    gradeId: undefined,
    academicYearId: undefined,
    classTeacherId: undefined,
  });

  const queryClient = useQueryClient();

  const { data: teachers, isLoading: teachersLoading } = useQuery({
    queryKey: ['teachers', schoolId],
    queryFn: () => classApi.getTeachers(schoolId),
    enabled: open,
  });

  const { data: grades, isLoading: gradesLoading } = useQuery({
    queryKey: ['grades', schoolId],
    queryFn: () => classApi.getGrades(schoolId),
    enabled: open,
  });

  const { data: academicYears, isLoading: academicYearsLoading } = useQuery({
    queryKey: ['academic-years', schoolId],
    queryFn: () => classApi.getAcademicYears(schoolId),
    enabled: open,
  });

  const createClassMutation = useMutation({
    mutationFn: (data: CreateClassRequest) => classApi.createClass(schoolId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes', schoolId] });
      toast.success('Class created successfully!');
      setOpen(false);
      resetForm();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create class');
    },
  });

  // FIXED: Simplified handleSubmit - no more trying to set objects on formData
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation with proper checks
    if (!formData.name.trim()) {
      toast.error('Please enter the class name');
      return;
    }
    if (!formData.gradeId) {
      toast.error('Please select a grade');
      return;
    }
    if (!formData.academicYearId) {
      toast.error('Please select an academic year');
      return;
    }
    if (!formData.classTeacherId) {
      toast.error('Please select a class teacher');
      return;
    }

    // Submit with the actual IDs
    createClassMutation.mutate({
      name: formData.name.trim(),
      grade: grades!.find(grade => grade.id === formData.gradeId)!,
      academicYear: academicYears!.find(year => year.id === formData.academicYearId)!,
      classTeacher: teachers!.find(teacher => teacher.id === formData.classTeacherId)!,
    });
  };

  // FIXED: Simplified reset form
  const resetForm = () => {
    setFormData({
      name: '',
      gradeId: undefined,
      academicYearId: undefined,
      classTeacherId: undefined,
    });
  };

  const activeAcademicYear = academicYears?.find(year => year.isActive);

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button className="bg-green-400 hover:bg-green-500 text-white">
          <BookPlus className="mr-2 h-4 w-4" />
          Add New Class
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Class</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new class in the system.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-5 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right font-medium">
                Class Name
              </Label>
              <Input
                id="name"
                className="col-span-3 focus:ring-green-400 focus:border-green-400"
                placeholder="e.g. 11A"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            {/* FIXED: Grade Select */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="grade" className="text-right font-medium">
                Grade
              </Label>
              <Select
                value={formData.gradeId?.toString() || ""}
                onValueChange={(value) => {
                  const numericValue = Number(value);
                  setFormData(prev => ({
                    ...prev,
                    gradeId: numericValue,
                  }));
                }}
              >
                <SelectTrigger className="col-span-3 focus:ring-green-400 focus:border-green-400">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {gradesLoading ? (
                    <div className="p-2">
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ) : (
                    grades?.map((grade) => (
                      <SelectItem key={grade.id} value={grade.id.toString()}>
                        Grade {grade.level}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* FIXED: Teacher Select */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="teacher" className="text-right font-medium">
                Class Teacher
              </Label>
              <Select
                value={formData.classTeacherId || ""}
                onValueChange={(value) => {
                  setFormData(prev => ({
                    ...prev,
                    classTeacherId: value,
                  }));
                }}
              >
                <SelectTrigger className="col-span-3 focus:ring-green-400 focus:border-green-400">
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachersLoading ? (
                    <div className="p-2">
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ) : (
                    teachers?.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id}>
                        {teacher.firstName} {teacher.lastName}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* FIXED: Academic Year Select */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="academicYear" className="text-right font-medium">
                Academic Year
              </Label>
              <Select
                value={formData.academicYearId?.toString() || ""}
                onValueChange={(value) => {
                  const numericValue = Number(value);
                  setFormData(prev => ({
                    ...prev,
                    academicYearId: numericValue,
                  }));
                }}
              >
                <SelectTrigger className="col-span-3 focus:ring-green-400 focus:border-green-400">
                  <SelectValue placeholder="Select academic year" />
                </SelectTrigger>
                <SelectContent>
                  {academicYearsLoading ? (
                    <div className="p-2">
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ) : (
                    academicYears?.map((year) => (
                      <SelectItem key={year.id} value={year.id.toString()}>
                        {year.year}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {activeAcademicYear && (
              <div className="col-span-4 text-sm text-gray-600">
                Active Academic Year: {activeAcademicYear.year}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="border-gray-200"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-400 hover:bg-green-500 text-white"
              disabled={createClassMutation.isPending}
            >
              {createClassMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Class'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const ClassManagement = () => {
  const navigate = useNavigate();
  const { school } = Route.useParams();
  const [search, setSearch] = useState("");

  const { 
    data: classes = [], 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['classes', school],
    queryFn: () => classApi.getClasses(school),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });

  const filteredClasses = useMemo(() => {
    const filtered = classes.filter(
      (cls) =>
        cls.name.toLowerCase().includes(search.toLowerCase()) ||
        cls.grade.level.toString().includes(search.toLowerCase()) ||
        `${cls.classTeacher.firstName} ${cls.classTeacher.lastName}`.toLowerCase().includes(search.toLowerCase())
    );

    return filtered.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }, [classes, search]);

  const clearSearch = () => {
    setSearch("");
  };

  if (error) {
    return (
      <div className="flex flex-col space-y-6 p-6 bg-white">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">Class Management</h1>
          <p className="text-gray-500">Manage all classes, assign teachers, and monitor student enrollment</p>
        </div>
        
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load classes: {error.message}
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-2"
              onClick={() => refetch()}
            >
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 p-6 bg-white">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">Class Management</h1>
        </div>
        
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <CreateClassDialog schoolId={school} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div className="relative w-full md:w-auto flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search by class, teacher, or grade..."
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
      </div>

      {isLoading ? (
        <ClassTableSkeleton />
      ) : filteredClasses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl">
          <School className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            {search ? 'No classes found' : 'No classes yet'}
          </h3>
          <p className="text-gray-500 mb-4 text-center max-w-md">
            {search 
              ? "We couldn't find any classes matching your search criteria. Try adjusting your search or create a new class."
              : "Get started by creating your first class."
            }
          </p>
          <CreateClassDialog schoolId={school} />
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          <Table>
            <thead>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableCell className="font-semibold text-gray-700">Class Name</TableCell>
                <TableCell className="font-semibold text-gray-700">Teacher</TableCell>
                <TableCell className="font-semibold text-gray-700">Grade</TableCell>
                <TableCell className="font-semibold text-gray-700">Students</TableCell>
              </TableRow>
            </thead>
            <TableBody>
              {filteredClasses.map((cls) => (
                <TableRow
                  key={cls.id}
                  className="hover:bg-gray-50 border-t border-gray-100 cursor-pointer"
                  onClick={() => navigate({ 
                    to: "/$school/dashboard/class-management/$id", 
                    params: { school: school, id: cls.id } 
                  })}
                >
                  <TableCell className="font-medium">
                    <span className="text-gray-800 hover:text-green-500 transition-colors">
                      {cls.name}
                    </span>
                  </TableCell>
                  <TableCell>
                    {cls.classTeacher && cls.classTeacher.firstName && cls.classTeacher.lastName
                      ? `${cls.classTeacher.firstName} ${cls.classTeacher.lastName}`
                      : ""}
                  </TableCell>
                  <TableCell>{cls.grade && cls.grade.level != null ? cls.grade.level : ""}</TableCell>
                  <TableCell>
                      {cls.classStudents && cls.classStudents.length > 0 ? cls.classStudents.length : 0}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export const Route = createFileRoute('/$school/dashboard/class-management/')({
  component: ClassManagement,
});