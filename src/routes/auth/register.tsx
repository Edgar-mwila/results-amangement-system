import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react';
import { z } from 'zod'; // For validation
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Dummy data for schools
const SCHOOLS = [
  { id: 'ABC1', name: "St. Mary's High School", location: 'New York' },
  { id: 'XYZ2', name: 'Riverside Academy', location: 'Los Angeles' },
  { id: 'DEF3', name: 'Global International School', location: 'Chicago' },
];

// Dummy valid student IDs for testing
const VALID_STUDENTS = [
  { id: 'ABC1-12345A', name: 'John Doe', grade: '10' },
  { id: 'ABC1-67890B', name: 'Jane Smith', grade: '11' },
  { id: 'XYZ2-11111C', name: 'Mike Johnson', grade: '9' },
];

const relationshipTypes = [
  'Parent',
  'Guardian',
  'Grandparent',
  'Sibling',
  'Other',
];

const formSchema = z.object({
  schoolId: z.string().min(1, 'Please select a school'),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  students: z.array(z.object({
    studentId: z.string().regex(/^[A-Z0-9]{4}-[A-Z0-9]{6}$/, 'Invalid student ID format'),
    relationship: z.string().min(1, 'Please select relationship')
  })).min(1, 'Add at least one student')
});

const Register = () => {
  const navigate = useRouter();
  const [selectedSchool, setSelectedSchool] = useState('');
  const [students, setStudents] = useState([{ studentId: '', relationship: '' }]);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(formSchema)
  });

  const handleSchoolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSchool(e.target.value);
    // Auto-fill school code in student IDs
    setStudents(students.map(student => ({
      ...student,
      studentId: `${e.target.value}-`
    })));
  };

  const addStudent = () => {
    setStudents([...students, { studentId: `${selectedSchool}-`, relationship: '' }]);
  };

  const removeStudent = (index: number) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  interface Student {
    studentId: string;
    relationship: string;
  }

  interface RegisterFormData {
    schoolId: string;
    fullName: string;
    email: string;
    phone: string;
    students: Student[];
  }

  const onSubmit = (data: RegisterFormData): void => {
    console.log(data);
    // Validate student IDs against dummy data
    const allStudentsValid = data.students.every((student: Student) =>
      VALID_STUDENTS.some(validStudent => validStudent.id === student.studentId)
    );

    if (allStudentsValid) {
      navigate.navigate({ to: '/parent/dashboard'});
    } else {
      alert('One or more student IDs are invalid');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">Parent Registration</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Select School</label>
            <select
              {...register('schoolId')}
              onChange={handleSchoolChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select a school...</option>
              {SCHOOLS.map(school => (
                <option key={school.id} value={school.id}>
                  {school.name} - {school.location}
                </option>
              ))}
            </select>
            {errors.schoolId && (
              <p className="text-red-500 text-sm">{errors.schoolId.message as string}</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  {...register('fullName')}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName.message as string}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message as string}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message as string}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Students</h2>
            {students.map((student, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Student ID</label>
                    <input
                      {...register(`students.${index}.studentId`)}
                      type="text"
                      placeholder="XXXX-XXXXXX"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Relationship</label>
                    <select
                      {...register(`students.${index}.relationship`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Select relationship...</option>
                      {relationshipTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeStudent(index)}
                    className="text-red-600 text-sm"
                  >
                    Remove Student
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addStudent}
              className="text-blue-600 text-sm"
            >
              + Add Another Student
            </button>
          </div>

          <button 
            type="submit" 
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/auth/register')({
  component: Register
})
