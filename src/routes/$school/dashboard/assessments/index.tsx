import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useCallback, ReactNode } from 'react'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AcademicYear, Role } from '@/types'
import { Edit } from 'lucide-react'

// Updated Types based on your new backend interface
type Assessment = {
  id: number
  name: string
  classSubjects: {
    id: number
    classModel: {
      grade: {
        name: string
      }
      academicYear: AcademicYear
      name: string
      classStudents: {
        student: {
          id: number
          firstName: string
          otherName?: string
          lastName: string
          sex: string
          gender: string
        }
      }[]
    }
    subject: {
      name: string
      code: string
      url: string
    }
    teacher: {
      id: string
      firstName: string
      lastName: string
      email: string
      phone: string
      status: string
      role: Role
    }
  }
  totalMarks: number
  term: {
    id: string
    name: string
    startDate: string
    endDate: string
  }
  studentAssessments: StudentAssessment[]
  createdAt: string
}

type StudentAssessment = {
  id: number
  student: {
    id: number
    firstName: string
    lastName: string
    otherName?: string
    sex: string
    gender: string
  }
  marksObtained?: number
  comment?: string
}

// type CreateAssessmentData = {
//   name: string
//   classSubjectId: string
//   termId: string
//   totalMarks: number
//   dateOfAssessment: string
// }

// type ClassSubject = {
//   id: string
//   classModel: {
//     id: string
//     name: string
//     grade: {
//       name: string
//     }
//   }
//   subject: {
//     name: string
//   }
// }

// type Term = {
//   id: string
//   name: string
//   startDate: string
//   endDate: string
// }

type User = {
  id: string
  role: {
    name: string
  }
  firstName: string
  lastName: string
}

// Enhanced Student Grade Type for tracking changes
type StudentGradeState = {
  marks: number
  comment: string
  hasValidMarks: boolean
  isModified: boolean
  originalMarks?: number
  originalComment?: string
}

// Skeleton Components
const TableSkeleton = () => (
  <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Class
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[...Array(5)].map((_, i) => (
            <tr key={i}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

// API Functions
const apiCall = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`)
  }
  
  return response.json()
}

const fetchAssessments = async (school: string): Promise<Assessment[]> => {
  return apiCall(`/api/${school}/assessments/`)
}

// const fetchClassSubjects = async (school: string): Promise<ClassSubject[]> => {
//   return apiCall(`/api/${school}/assessments/class-subjects`)
// }

// const fetchTerms = async (school: string): Promise<Term[]> => {
//   return apiCall(`/api/${school}/assessments/terms`)
// }

// const createAssessment = async (school: string, data: CreateAssessmentData): Promise<Assessment> => {
//   return apiCall(`/api/${school}/assessments/`, {
//     method: 'POST',
//     body: JSON.stringify(data),
//   })
// }

const updateStudentAssessment = async (
  school: string, 
  assessmentId: string, 
  studentId: string, 
  data: { marksObtained: number; comment?: string }
): Promise<StudentAssessment> => {
  return apiCall(`/api/${school}/assessments/${assessmentId}/students/${studentId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

const getCurrentUser = async (): Promise<User> => {
  return JSON.parse(localStorage.getItem('user') || '{}')
}

// Helper function to calculate completion based on class students vs assessed students
const calculateCompletion = (assessment: Assessment) => {
  const totalClassStudents = assessment.classSubjects.classModel.classStudents.length
  const studentsWithValidMarks = assessment.studentAssessments.filter(sa => 
    sa.marksObtained !== null && sa.marksObtained !== undefined && sa.marksObtained >= 0
  ).length
  
  return {
    completed: studentsWithValidMarks,
    total: totalClassStudents,
    percentage: totalClassStudents > 0 ? (studentsWithValidMarks / totalClassStudents) * 100 : 0
  }
}

// Helper function to check if user can grade assessment
const canUserGradeAssessment = (user: User | null, assessment: Assessment): boolean => {
  if (!user) return false
  // Only the assigned teacher (creator) can edit/grade this assessment
  if (user.role.name === 'teacher' && user.id === assessment.classSubjects.teacher.id) return true
  return false
}

//   onAssessmentCreated 
// }: { 
//   school: string
//   onAssessmentCreated: () => void
// }) => {
//   const [open, setOpen] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [classSubjects, setClassSubjects] = useState<ClassSubject[]>([])
//   const [terms, setTerms] = useState<Term[]>([])
//   const [formData, setFormData] = useState<CreateAssessmentData>({
//     name: '',
//     classSubjectId: '',
//     termId: '',
//     totalMarks: 0,
//     dateOfAssessment: ''
//   })

//   useEffect(() => {
//     if (open) {
//       Promise.all([
//         fetchClassSubjects(school),
//         fetchTerms(school)
//       ]).then(([classSubjectsData, termsData]) => {
//         setClassSubjects(classSubjectsData)
//         setTerms(termsData)
//       }).catch(console.error)
//     }
//   }, [open, school])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     try {
//       await createAssessment(school, formData)
//       setOpen(false)
//       setFormData({
//         name: '',
//         classSubjectId: '',
//         termId: '',
//         totalMarks: 0,
//         dateOfAssessment: ''
//       })
//       onAssessmentCreated()
//     } catch (error) {
//       console.error('Error creating assessment:', error)
//       alert('Failed to create assessment. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center">
//           <Plus />
//         </button>
//       </DialogTrigger>
//       <DialogContent className="max-w-md">
//         <DialogHeader>
//           <DialogTitle>Create New Assessment</DialogTitle>
//           <DialogDescription>
//             Fill in the details to create a new assessment for your class.
//           </DialogDescription>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Assessment Name
//             </label>
//             <input
//               type="text"
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               value={formData.name}
//               onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
//               placeholder="Enter assessment name"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Class & Subject
//             </label>
//             <select
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               value={formData.classSubjectId}
//               onChange={(e) => setFormData(prev => ({ ...prev, classSubjectId: e.target.value }))}
//             >
//               <option value="">Select class and subject</option>
//               {classSubjects.map((cs) => (
//                 <option key={cs.id} value={cs.id}>
//                   {cs.classModel.name} - {cs.subject.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Term
//             </label>
//             <select
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               value={formData.termId}
//               onChange={(e) => setFormData(prev => ({ ...prev, termId: e.target.value }))}
//             >
//               <option value="">Select term</option>
//               {terms.map((term) => (
//                 <option key={term.id} value={term.id}>
//                   {term.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Total Marks
//             </label>
//             <input
//               type="number"
//               required
//               min="1"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               value={formData.totalMarks || ''}
//               onChange={(e) => setFormData(prev => ({ ...prev, totalMarks: parseInt(e.target.value) || 0 }))}
//               placeholder="Enter total marks"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Assessment Date
//             </label>
//             <input
//               type="date"
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               value={formData.dateOfAssessment}
//               onChange={(e) => setFormData(prev => ({ ...prev, dateOfAssessment: e.target.value }))}
//             />
//           </div>

//           <DialogFooter>
//             <Button type="button" disabled={loading}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={loading}>
//               {loading ? 'Creating...' : 'Create Assessment'}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

// Enhanced Student Grading Dialog
const StudentGradingDialog = ({ 
  assessment, 
  school,
  user,
  onGradingComplete,
  triggerContent
}: { 
  assessment: Assessment
  school: string
  user: User | null
  onGradingComplete: () => void 
  triggerContent?: ReactNode
}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [studentGrades, setStudentGrades] = useState<Record<string, StudentGradeState>>({})

  const canGrade = canUserGradeAssessment(user, assessment)

  useEffect(() => {
    if (open && assessment) {
      const initialGrades: Record<string, StudentGradeState> = {}
      
      // Get all students in the class
      assessment.classSubjects.classModel.classStudents.forEach(classStudent => {
        const student = classStudent.student
        const existingAssessment = assessment.studentAssessments.find(sa => sa.student.id === student.id)
        
        if (existingAssessment) {
          // Student has an existing assessment
          const hasValidMarks = existingAssessment.marksObtained !== null && 
                               existingAssessment.marksObtained !== undefined && 
                               existingAssessment.marksObtained >= 0
          
          initialGrades[student.id.toString()] = {
            marks: existingAssessment.marksObtained || 0,
            comment: existingAssessment.comment || '',
            hasValidMarks,
            isModified: false,
            originalMarks: existingAssessment.marksObtained || undefined,
            originalComment: existingAssessment.comment || ''
          }
        } else {
          // Student doesn't have an assessment yet
          initialGrades[student.id.toString()] = {
            marks: 0,
            comment: 'No assessment recorded',
            hasValidMarks: false,
            isModified: false,
            originalMarks: undefined,
            originalComment: ''
          }
        }
      })
      
      setStudentGrades(initialGrades)
    }
  }, [open, assessment])

  const handleGradeChange = (studentId: string, field: 'marks' | 'comment', value: string | number) => {
    setStudentGrades(prev => {
      const current = prev[studentId]
      const newGrade = {
        ...current,
        [field]: value
      }
      
      // Check if this grade has been modified from original
      const marksChanged = newGrade.marks !== (current.originalMarks || 0)
      const commentChanged = newGrade.comment !== (current.originalComment || '')
      
      newGrade.isModified = marksChanged || commentChanged
      newGrade.hasValidMarks = newGrade.marks >= 0 && newGrade.marks <= assessment.totalMarks
      
      return {
        ...prev,
        [studentId]: newGrade
      }
    })
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      // Only save assessments that have been modified
      const modifiedGrades = Object.entries(studentGrades)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, grade]) => grade.isModified && grade.hasValidMarks)
      
      const promises = modifiedGrades.map(([studentId, grade]) =>
        updateStudentAssessment(school, assessment.id.toString(), studentId, {
          marksObtained: grade.marks,
          comment: grade.comment
        })
      )
      
      await Promise.all(promises)
      setOpen(false)
      onGradingComplete()
    } catch (error) {
      console.error('Error updating grades:', error)
      alert('Failed to save grades. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!assessment) return null

  const completion = calculateCompletion(assessment)
  const avgPct = assessment.studentAssessments.length > 0
    ? Math.round((assessment.studentAssessments.reduce((sum, sa) => sum + (sa.marksObtained ?? 0), 0) / (assessment.studentAssessments.length * assessment.totalMarks)) * 100)
    : 0

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerContent ? triggerContent : <Edit />}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Grade Students - {assessment.name}
          </DialogTitle>
          <DialogDescription>
            {assessment.classSubjects.classModel.name} - {assessment.classSubjects.subject.name} (Total: {assessment.totalMarks} marks)
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span>Completion: {completion.completed}/{completion.total} ({Math.round(completion.percentage)}%)</span>
              <span>Average: {avgPct}%</span>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        {canGrade ? (
          <div className="space-y-4">
            {assessment.classSubjects.classModel.classStudents.map((classStudent) => {
              const student = classStudent.student
              const studentId = student.id.toString()
              const fullName = `${student.firstName} ${student.otherName ? student.otherName + ' ' : ''}${student.lastName}`
              const currentGrade = studentGrades[studentId] || { 
                marks: 0, 
                comment: '', 
                hasValidMarks: false, 
                isModified: false 
              }
              
              return (
                <div key={student.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-gray-900">{fullName}</div>
                    {currentGrade.isModified && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Modified
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Marks (out of {assessment.totalMarks})
                      </label>
                      <input
                        type="number"
                        min="0"
                        max={assessment.totalMarks}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={currentGrade.marks || ''}
                        onChange={(e) => handleGradeChange(studentId, 'marks', parseInt(e.target.value) || 0)}
                        placeholder="Enter marks"
                      />
                      {currentGrade.marks > assessment.totalMarks && (
                        <p className="text-red-500 text-xs mt-1">
                          Marks cannot exceed {assessment.totalMarks}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Comment
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={currentGrade.comment}
                        onChange={(e) => handleGradeChange(studentId, 'comment', e.target.value)}
                        placeholder="Add a comment"
                      />
                    </div>
                  </div>
                  
                  {currentGrade.hasValidMarks && currentGrade.marks >= 0 && (
                    <div className="text-sm text-gray-600">
                      Percentage: {Math.round((currentGrade.marks / assessment.totalMarks) * 100)}%
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              You can view scores but cannot edit this assessment.
            </div>
            {assessment.classSubjects.classModel.classStudents.map((classStudent) => {
              const student = classStudent.student
              const fullName = `${student.firstName} ${student.otherName ? student.otherName + ' ' : ''}${student.lastName}`
              const existing = assessment.studentAssessments.find(sa => sa.student.id === student.id)
              const marks = existing?.marksObtained
              const comment = existing?.comment
              return (
                <div key={student.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-gray-900">{fullName}</div>
                    <div className="text-sm text-gray-600">
                      {typeof marks === 'number' ? `Marks: ${marks}/${assessment.totalMarks}` : 'Not recorded'}
                    </div>
                  </div>
                  {comment && (
                    <div className="text-sm text-gray-600 mt-1">Comment: {comment}</div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        <DialogFooter>
          <Button disabled={loading}>
            Cancel
          </Button>
          {canGrade && (
            <Button onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : 'Save Grades'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Main Assessments Component
const Assessments = () => {
  const { school } = Route.useParams()
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [filters, setFilters] = useState({
    class: 'all',
    subject: 'all',
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const [assessmentsData, userData] = await Promise.all([
        fetchAssessments(school),
        getCurrentUser()
      ])
      setAssessments(assessmentsData)
      console.log("Fetched AssessmentData: ", assessmentsData);
      setUser(userData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [school])
  
  useEffect(() => {
    loadData()
  }, [loadData])

  // Determine user role and ID
  const userId = user?.id
  const userRole = user?.role.name
  const isAdmin = userRole === 'administrator'
  const isTeacher = userRole === 'teacher'

  // Helper: is this assessment created by the current user?
  const isAssessmentOwner = (assessment: Assessment) => {
    return assessment.classSubjects.teacher.id === userId
  }

  // Helper: is this assessment for a class the user manages (class teacher)?
  const isClassTeacherAssessment = (assessment: Assessment) => {
    // If user is class teacher for this class
    return assessment.classSubjects.teacher.id === userId
  }

  // Helper: is this assessment for a subject the user teaches?
  const isSubjectTeacherAssessment = (assessment: Assessment) => {
    return assessment.classSubjects.teacher.id === userId
  }

  // Filter assessments for display
  let visibleAssessments: Assessment[] = []
  if (isAdmin) {
    visibleAssessments = assessments
  } else if (isTeacher) {
    // Class teacher: all for their class, subject teacher: only their subjects
    visibleAssessments = assessments.filter(a =>
      isClassTeacherAssessment(a) || isSubjectTeacherAssessment(a)
    )
  }

  // Extract unique filter options
  const classes = [...new Set(visibleAssessments.map((a) => a.classSubjects.classModel.name))]
  const subjects = [...new Set(visibleAssessments.map((a) => a.classSubjects.subject.name))]

  // Apply filters and sorting
  const filteredAssessments = visibleAssessments
    .filter((assessment) => {
      return (
        (filters.class === 'all' || assessment.classSubjects.classModel.name === filters.class) &&
        (filters.subject === 'all' || assessment.classSubjects.subject.name === filters.subject) &&
        (searchTerm === '' ||
          assessment.name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    })
    .sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'class':
          comparison = a.classSubjects.classModel.name.localeCompare(b.classSubjects.classModel.name)
          break
        case 'subject':
          comparison = a.classSubjects.subject.name.localeCompare(b.classSubjects.subject.name)
          break
        case 'completion': {
          const aCompletion = calculateCompletion(a).percentage
          const bCompletion = calculateCompletion(b).percentage
          comparison = aCompletion - bCompletion
          break
        }
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
        default:
          comparison = 0
      }

      return sortDirection === 'asc' ? comparison : -comparison
    })

  const handleSortChange = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortDirection('asc')
    }
  }

  // const averageScore: number = 0.0;

  if (error) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                {error}
              </div>
              <div className="mt-4">
                <button
                  onClick={loadData}
                  className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Assessments</h1>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                placeholder="Search assessments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <select
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                value={filters.class}
                onChange={(e) =>
                  setFilters({ ...filters, class: e.target.value })
                }
              >
                <option value="all">All Classes</option>
                {classes.map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>

              <select
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                value={filters.subject}
                onChange={(e) =>
                  setFilters({ ...filters, subject: e.target.value })
                }
              >
                <option value="all">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {loading ? (
        <TableSkeleton />
      ) : (
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortChange('name')}
                  >
                    <div className="flex items-center">
                      Title
                      {sortBy === 'name' && (
                        <svg
                          className="w-3 h-3 ml-1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={
                              sortDirection === 'asc'
                                ? 'M5 15l7-7 7 7'
                                : 'M19 9l-7 7-7-7'
                            }
                          />
                        </svg>
                      )}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortChange('class')}
                  >
                    <div className="flex items-center">
                      Class
                      {sortBy === 'class' && (
                        <svg
                          className="w-3 h-3 ml-1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={
                              sortDirection === 'asc'
                                ? 'M5 15l7-7 7 7'
                                : 'M19 9l-7 7-7-7'
                            }
                          />
                        </svg>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAssessments.map((assessment) => {
                  const completion = calculateCompletion(assessment)
                  const incomplete = completion.percentage < 100
                  const owner = isAssessmentOwner(assessment)
                  const row = (
                    <tr key={assessment.id} className="cursor-pointer hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {assessment.name}
                          {owner && <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">You created this</span>}
                        </div>
                        <div className="text-sm text-gray-500">
                          {assessment.classSubjects.subject.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {assessment.classSubjects.classModel.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-2 text-sm ${incomplete ? 'text-amber-700' : 'text-green-700'}`}>
                          <span className={`inline-block w-2 h-2 rounded-full ${incomplete ? 'bg-amber-500' : 'bg-green-500'}`}></span>
                          {incomplete ? 'Not fully recorded' : 'Complete'}
                        </span>
                      </td>
                    </tr>
                  )
                  return (
                    <StudentGradingDialog
                      key={`dlg-${assessment.id}`}
                      user={user}
                      assessment={assessment}
                      school={school}
                      onGradingComplete={loadData}
                      triggerContent={row}
                    />
                  )
                })}
              </tbody>
            </table>
          </div>

          {filteredAssessments.length === 0 && !loading && (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No assessments found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-700">
          <span className="font-medium">{filteredAssessments.length}</span>{' '}
          results found
        </div>

        <div className="flex space-x-2">
          <button 
            onClick={() => {
              const csvContent = generateCSVContent(filteredAssessments)
              downloadCSV(csvContent, 'assessments.csv')
            }}
            className="bg-white border border-gray-300 text-gray-700 py-1 px-3 rounded-md text-sm hover:bg-gray-50"
          >
            Export Data
          </button>
        </div>
      </div>
    </div>
  )
}

// Helper functions for CSV export
const generateCSVContent = (assessments: Assessment[]): string => {
  const headers = [
    'Assessment Name',
    'Class',
    'Subject', 
    'Total Marks',
    'Assessment Date',
    'Students Completed',
    'Total Students',
    'Completion %',
    'Average Score',
    'Average %'
  ]
  
  const rows = assessments.map(assessment => {
    const completedCount = assessment.studentAssessments.filter(sa =>
      sa.marksObtained !== null && sa.marksObtained !== undefined
    ).length
    const totalStudents = assessment.studentAssessments.length
    const averageScore = completedCount > 0
      ? assessment.studentAssessments
          .filter(sa => sa.marksObtained !== null && sa.marksObtained !== undefined)
          .reduce((sum, sa) => sum + (sa.marksObtained || 0), 0) / completedCount
      : 0
    
    return [
      assessment.name,
      assessment.classSubjects.classModel.name,
      assessment.classSubjects.subject.name,
      assessment.totalMarks,
      completedCount,
      totalStudents,
      totalStudents > 0 ? Math.round((completedCount / totalStudents) * 100) : 0,
      Math.round(averageScore * 100) / 100,
      assessment.totalMarks > 0 ? Math.round((averageScore / assessment.totalMarks) * 100) : 0
    ]
  })
  
  const csvRows = [headers, ...rows]
  return csvRows.map(row => 
    row.map(field => 
      typeof field === 'string' && field.includes(',') 
        ? `"${field}"` 
        : field
    ).join(',')
  ).join('\n')
}

const downloadCSV = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const Route = createFileRoute('/$school/dashboard/assessments/')({
  component: Assessments,
})