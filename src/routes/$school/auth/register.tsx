import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Expanded dummy data for schools
const SCHOOLS = [
  { id: 'XYZ2', name: 'Riverside Academy', location: 'Los Angeles' },
]

// Expanded dummy valid student IDs for testing
const VALID_STUDENTS = [
  { id: 'ABC1-12345A', name: 'John Doe', grade: '10' },
  { id: 'XYZ2-67890B', name: 'Jane Smith', grade: '11' },
  { id: 'XYZ2-23456C', name: 'Emily Davis', grade: '9' },
  { id: 'XYZ2-11111C', name: 'Mike Johnson', grade: '9' },
  { id: 'XYZ2-22222D', name: 'Sarah Wilson', grade: '10' },
  { id: 'XYZ2-33333E', name: 'Robert Brown', grade: '12' },
  { id: 'DEF3-44444F', name: 'Lisa Garcia', grade: '8' },
  { id: 'DEF3-55555G', name: 'Kevin Martinez', grade: '7' },
  { id: 'GHI4-66666H', name: 'Amanda Taylor', grade: '6' },
  { id: 'JKL5-77777I', name: 'Daniel Lee', grade: '5' },
]

const relationshipTypes = [
  'Parent',
  'Guardian',
  'Grandparent',
  'Sibling',
  'Other',
]

const formSchema = z.object({
  schoolId: z.string().min(1, 'Please select a school'),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  students: z
    .array(
      z.object({
        studentId: z
          .string()
          .regex(/^[A-Z0-9]{4}-[A-Z0-9]{6}$/, 'Invalid student ID format'),
        relationship: z.string().min(1, 'Please select relationship'),
      }),
    )
    .min(1, 'Add at least one student'),
})

export const Route = createFileRoute('/$school/auth/register')({
  component: Register,
})

function Register() {
  const router = useRouter()
  
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const [selectedSchool, setSelectedSchool] = useState('')
  const [students, setStudents] = useState([
    { studentId: '', relationship: '' },
  ])
  const [availableStudents, setAvailableStudents] = useState<Array<{id: string, name: string}>>([])

  interface Student {
    studentId: string
    relationship: string
  }

  interface RegisterFormData {
    schoolId: string
    fullName: string
    email: string
    phone: string
    students: Student[]
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schoolId: selectedSchool,
      students: students,
    }
  })

  // Update form when selectedSchool changes
  useEffect(() => {
    if (selectedSchool) {
      setValue('schoolId', selectedSchool)
    }
  }, [selectedSchool, setValue])

  // Validate student ID as user types
  const validateStudentId = (id: string) => {
    if (!id) return false
    return VALID_STUDENTS.some(student => student.id === id)
  }

  const addStudent = () => {
    setStudents([
      ...students,
      { studentId: `${selectedSchool}-`, relationship: '' },
    ])
  }

  const removeStudent = (index: number) => {
    const updatedStudents = students.filter((_, i) => i !== index)
    setStudents(updatedStudents)
  }

  // Mock API call function
  // const submitToAPI = async (data: RegisterFormData): Promise<{ success: boolean, message?: string }> => {
  //   // Simulate API request
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       // Check if all student IDs are valid
  //       const allStudentsValid = data.students.every(student => 
  //         validateStudentId(student.studentId)
  //       )
        
  //       if (allStudentsValid) {
  //         resolve({ success: true })
  //       } else {
  //         resolve({ 
  //           success: false, 
  //           message: 'One or more student IDs are invalid'
  //         })
  //       }
  //     }, 1000)
  //   })
  // }

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setSubmitting(true)
      setServerError('')
      
      // const response = await submitToAPI(data)
      
      // if (response.success) {
        // Redirect to dashboard on success
        localStorage.setItem('userRole', 'parent');
        localStorage.setItem('user', data.fullName);
        localStorage.setItem('isAuthenticated', 'true');
        router.navigate({ to: '/$school/dashboard', params: { school: SCHOOLS[0].name }})
      // } else {
      //   setServerError(response.message || 'Registration failed')
      // }
    } catch (error) {
      setServerError('Network error. Please try again.')
      console.error('Registration error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  // Get current school name for display
  const currentSchoolName = SCHOOLS.find(s => s.id === selectedSchool)?.name || ''

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Parent Registration
        </h1>
        
        {currentSchoolName && (
          <p className="text-center mb-8 text-green-600 font-medium">
            {currentSchoolName}
          </p>
        )}

        {serverError && (
          <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Select School
            </label>
            <select
              {...register('schoolId')}
              value={selectedSchool}
              onChange={(e) => {
                const newSchoolId = e.target.value
                setSelectedSchool(newSchoolId)
                
                // Update student IDs with new school prefix
                setStudents(students.map(student => ({
                  ...student,
                  studentId: `${newSchoolId}-${student.studentId.split('-')[1] || ''}`
                })))
                
                // Filter available students for this school
                const schoolStudents = VALID_STUDENTS.filter(s => 
                  s.id.startsWith(newSchoolId)
                )
                setAvailableStudents(schoolStudents)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-400 focus:border-green-400"
            >
              <option value=" ">Select a school...</option>
              {SCHOOLS.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.name} - {school.location}
                </option>
              ))}
            </select>
            {errors.schoolId && (
              <p className="text-red-500 text-sm">
                {errors.schoolId.message}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  {...register('fullName')}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-400 focus:border-green-400"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-400 focus:border-green-400"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-400 focus:border-green-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Students</h2>
              <span className="text-sm text-gray-500">
                {availableStudents.length > 0 ? 
                  `${availableStudents.length} students available` : 
                  'Select a school to see available students'}
              </span>
            </div>
            
            {students.map((student, index) => (
              <div 
                key={index} 
                className="p-4 border rounded-lg space-y-4 border-gray-200 hover:border-green-300 transition-colors"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Student ID
                    </label>
                    <div className="relative">
                      <input
                        {...register(`students.${index}.studentId`)}
                        type="text"
                        placeholder={selectedSchool ? `${selectedSchool}-XXXXXX` : "XXXX-XXXXXX"}
                        className={`w-full px-3 py-2 border rounded-lg pr-8 ${
                          validateStudentId(watch(`students.${index}.studentId`)) 
                            ? 'border-green-400 bg-green-50'
                            : 'border-gray-300'
                        } focus:ring-green-400 focus:border-green-400`}
                        onChange={(e) => {
                          // Keep the same prefix when user types
                          const value = e.target.value
                          if (!value.startsWith(`${selectedSchool}-`) && selectedSchool) {
                            setValue(`students.${index}.studentId`, `${selectedSchool}-${value.replace(/^[^-]*-?/, '')}`)
                          }
                        }}
                      />
                      {validateStudentId(watch(`students.${index}.studentId`)) && (
                        <div className="absolute right-2 top-2 text-green-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {errors.students?.[index]?.studentId && (
                      <p className="text-red-500 text-sm">
                        {errors.students[index].studentId?.message}
                      </p>
                    )}
                    
                    {watch(`students.${index}.studentId`) && 
                     !validateStudentId(watch(`students.${index}.studentId`)) && (
                      <p className="text-amber-600 text-sm">ID not found in system</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Relationship
                    </label>
                    <select
                      {...register(`students.${index}.relationship`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-400 focus:border-green-400"
                    >
                      <option value=" ">Select relationship...</option>
                      {relationshipTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.students?.[index]?.relationship && (
                      <p className="text-red-500 text-sm">
                        {errors.students[index].relationship?.message}
                      </p>
                    )}
                  </div>
                </div>
                
                {validateStudentId(watch(`students.${index}.studentId`)) && (
                  <div className="text-sm bg-green-50 p-2 rounded border border-green-100">
                    {VALID_STUDENTS.find(s => s.id === watch(`students.${index}.studentId`))?.name || ''} 
                    {' - Grade '}
                    {VALID_STUDENTS.find(s => s.id === watch(`students.${index}.studentId`))?.grade || ''}
                  </div>
                )}
                
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeStudent(index)}
                    className="text-red-600 text-sm hover:text-red-800 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove Student
                  </button>
                )}
              </div>
            ))}
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={addStudent}
                disabled={!selectedSchool}
                className={`text-blue-400 flex items-center text-sm hover:text-blue-600 ${!selectedSchool ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Another Student
              </button>
              
              {availableStudents.length > 0 && (
                <button
                  type="button"
                  className="text-sm text-blue-400 hover:text-blue-600"
                  onClick={() => {
                    // Show a dropdown or modal with available students
                    alert(`Available Student IDs at ${currentSchoolName}:\n\n${
                      availableStudents.map(s => `${s.id} - ${s.name}`).join('\n')
                    }`)
                  }}
                >
                  View Available Students
                </button>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 px-4 bg-green-400 hover:bg-green-500 text-white font-medium rounded-lg transition-colors ${
              submitting ? 'opacity-70 cursor-wait' : ''
            }`}
          >
            {submitting ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  )
}