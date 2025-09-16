import { ReactElement, useState, useEffect } from "react"
import {
  BarChart,
  Users,
  Edit,
  Plus,
  X,
  PlusSquare,
} from "lucide-react"
import { useRef } from "react"

// Define theme colors inline since we don't have the theme config
const themeColors = {
  primaryBg: "bg-green-500",
  secondaryBg: "bg-green-500", 
  accentBg: "bg-purple-500",
  accent: "text-green-600",
  accentBorder: "border-green-500"
}

interface StudentData {
  id: number;
  firstName: string;
  otherName?: string;
  lastName: string;
  sex: string;
  gender: string;
}

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  role: { name: string };
}

interface SubjectData {
  id: string;
  name: string;
  code: string;
  url: string;
}

interface ClassStudentData {
  student: StudentData;
}

interface Term {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  createdAt: string;
}

interface AssessmentData {
  id: number;
  name: string;
  totalMarks: number;
  term: Term;
  createdAt: string;
}

interface ClassSubjectData {
  id: string;
  subject: SubjectData;
  assessments: AssessmentData[];
  teacher: UserData;
}

interface Grade {
  level: string;
}

interface AcademicYear {
  year: string;
}

interface ClassData {
  id: string;
  name: string;
  classTeacher: UserData;
  grade: Grade;
  academicYear: AcademicYear;
  classSubjects: ClassSubjectData[];
  classStudents: ClassStudentData[];
}

export interface ClassComponentProps {
  classData: ClassData;
  school: string;
}

// Custom Modal Component
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: ReactElement | null}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default function ClassComponent({ classData: initialClassData, school: school }: ClassComponentProps) {
  const [activeTab, setActiveTab] = useState("students")
  const [classData, setClassData] = useState(initialClassData)
  const [editingSubject, setEditingSubject] = useState<ClassSubjectData | null>(null)
  const [editingClassTeacher, setEditingClassTeacher] = useState(false)
  const [addingSubject, setAddingSubject] = useState(false)
  const [newSubject, setNewSubject] = useState({ subject: "", teacher: "" })
  const [teachers, setTeachers] = useState<UserData[]>([])
  const [subjects, setSubjects] = useState<SubjectData[]>([])
  const [showAssessmentModal, setShowAssessmentModal] = useState<{ open: boolean, subject: ClassSubjectData | null }>({ open: false, subject: null })
  const [assessmentForm, setAssessmentForm] = useState({ name: '', totalMarks: '', dateOfAssessment: '' })
  const assessmentModalRef = useRef<HTMLDivElement>(null)
  const [selectedClassTeacherId, setSelectedClassTeacherId] = useState<string>('')
  const [selectedSubjectTeacherId, setSelectedSubjectTeacherId] = useState<string>('')

  // Get current user and role
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : null
  const userRole = user?.role?.name?.toLowerCase() || ''
  const isAdmin = userRole === 'administrator'
  const isClassTeacher = classData.classTeacher?.id === user?.id
  const isSubjectTeacher = classData.classSubjects?.some(cs => cs.teacher?.id === user?.id)

  // Fetch teachers and subjects on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch teachers
        const teachersRes = await fetch(`/api/${school}/users/`)
        const teachersData = await teachersRes.json()
        setTeachers(teachersData.filter((u: UserData) => u.role?.name?.toLowerCase() === 'teacher' || 'administrator'))
        // Fetch subjects
        const subjectsRes = await fetch(`/api/${school}/subjects/`)
        const subjectsData = await subjectsRes.json()
        setSubjects(subjectsData)
      } catch (err) {
        console.error(`Failed to load teachers or subjects ${err}`)
      }
    }
    fetchData()
  }, [classData, school])

  // Initialize selected teacher values when modals open
  useEffect(() => {
    if (editingClassTeacher) {
      setSelectedClassTeacherId(classData.classTeacher?.id || '')
    }
  }, [editingClassTeacher, classData])

  useEffect(() => {
    if (editingSubject) {
      setSelectedSubjectTeacherId(editingSubject.teacher?.id || '')
    }
  }, [editingSubject])

  // Derive computed values from props
  const studentsCount = classData.classStudents?.length || 0;
  const subjectsCount = classData.classSubjects?.length || 0;

  // Admin: Add subject to class
  const handleAddSubject = async () => {
    try {
      const subjectObj = subjects.find(s => s.code === newSubject.subject)
      const teacherObj = teachers.find(t => t.id === newSubject.teacher)
      if (!subjectObj || !teacherObj) return
      const res = await fetch(`/api/${school}/class-subjects/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classId: classData.id,
          subjectId: subjectObj.id,
          teacherId: teacherObj.id
        })
      })
      if (!res.ok) throw new Error('Failed to add subject')
      // Refetch or update classData
      setAddingSubject(false)
      setNewSubject({ subject: '', teacher: '' })
      const refreshed = await fetch(`/api/${school}/classes/${classData.id}`)
      if (refreshed.ok) {
        const updatedClassData = await refreshed.json()
        setClassData(updatedClassData)
      }
    } catch (err) {
      console.error(`Failed to add subject ${err}`)
    }
  }

  // Admin: Change class teacher
  const handleUpdateClassTeacher = async (newTeacherId: string) => {
    try {
      const res = await fetch(`/api/${school}/classes/${classData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...classData, classTeacher: { id: newTeacherId } })
      })
      if (!res.ok) throw new Error('Failed to update class teacher')
      // Refetch class data since backend returns no body
      const refreshed = await fetch(`/api/${school}/classes/${classData.id}`)
      if (refreshed.ok) {
        const updatedClassData = await refreshed.json()
        setClassData(updatedClassData)
      }
      setEditingClassTeacher(false)
    } catch (err) {
      console.error(`Failed to update class teacher ${err}`)
    }
  }

  // Admin: Reassign subject teacher
  const handleUpdateSubjectTeacher = async (subjectCode: string, newTeacherId: string) => {
    try {
      const classSubject = classData.classSubjects.find(cs => cs.subject.code === subjectCode)
      if (!classSubject) return
      console.log('classSubject', classSubject);
      const res = await fetch(`/api/${school}/class-subjects/${classSubject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...classSubject, teacher: { id: newTeacherId } })
      })
      if (!res.ok) throw new Error('Failed to update subject teacher')
      // Refetch class data since backend returns no body
      const refreshed = await fetch(`/api/${school}/classes/${classData.id}`)
      if (refreshed.ok) {
        const updatedClassData = await refreshed.json()
        setClassData(updatedClassData)
      }
      setEditingSubject(null)
    } catch (err) {
      console.error(`Failed to update subject teacher ${err}`)
    }
  }

  // Admin: Remove subject from class
  // const handleRemoveSubject = async (subjectCode: string) => {
  //   try {
  //     const classSubject = classData.classSubjects.find(cs => cs.subject.code === subjectCode)
  //     if (!classSubject) return
  //     const res = await fetch(`/api/${school}/class-subjects/${classSubject.id}`, {
  //       method: 'DELETE' })
  //     if (!res.ok) throw new Error('Failed to remove subject')
  //     // Refetch class data since backend returns no body
  //     const refreshed = await fetch(`/api/${school}/classes/${classData.id}`)
  //     if (refreshed.ok) {
  //       const updatedClassData = await refreshed.json()
  //       setClassData(updatedClassData)
  //     }
  //   } catch (err) {
  //     console.error(`Failed to remove subject ${err}`)
  //   }
  // }
  // Only show subject row if admin, class teacher, or subject teacher for that subject
  const visibleSubjects = isAdmin || isClassTeacher
    ? classData.classSubjects
    : classData.classSubjects.filter(cs => cs.teacher?.id === user?.id)

  // Add handler for creating assessment
  const handleCreateAssessment = async () => {

    if (!showAssessmentModal.subject) return
    try {
      const res = await fetch(`/api/${school}/assessments/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: assessmentForm.name,
          classSubjectId: showAssessmentModal.subject.id,
          totalMarks: Number(assessmentForm.totalMarks),
          dateOfAssessment: assessmentForm.dateOfAssessment
        })
      })
      if (!res.ok) throw new Error('Failed to create assessment')
      // Refetch or update classData
      setAssessmentForm({ name: '', totalMarks: '', dateOfAssessment: '' })
      setShowAssessmentModal({ open: false, subject: null })
      location.reload();
    } catch (err) {
      console.error(`Failed to create assessment ${err}`);
    }
  }

  return (
    <div className="container mx-auto p-2 sm:p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            {classData?.grade?.level || "N/A"} - {classData?.name || "N/A"}
          </h1>
          <p className="text-gray-600 mt-1 text-sm">{classData?.academicYear?.year || "N/A"}</p>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
          <span className="text-sm sm:text-base">
            Class teacher: {classData?.classTeacher?.firstName || "N/A"} {classData?.classTeacher?.lastName || ""}
          </span>
          {isAdmin && <button
            onClick={() => setEditingClassTeacher(true)}
            className="bg-gray-100 hover:bg-gray-200 p-2 rounded"
          >
            <Edit className="h-4 w-4" />
          </button>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-6 mb-4 sm:mb-6">
        <div className={`bg-white rounded-lg shadow flex flex-col sm:flex-row items-start sm:items-center sm:justify-between p-2 sm:p-4 ${
            activeTab === "students" ? `border-b-2 ${themeColors.accentBorder} ${themeColors.accent}` : "text-gray-500"
          }`} onClick={() => setActiveTab("students")}>
          <div className="text-sm font-medium text-gray-500 mb-2">Students</div>
          <div className="flex flex-col sm:flex-row items-center">
            <div className={`mr-2 rounded-full p-2 ${themeColors.secondaryBg}`}>
              <Users className="h-4 w-4 text-white" />
            </div>
            <div className="text-2xl font-bold">{studentsCount}</div>
          </div>
        </div>

        <div className={`bg-white rounded-lg shadow  flex flex-col sm:flex-row items-start sm:items-center sm:justify-between p-2 sm:p-4 ${
            activeTab === "subjects" ? `border-b-2 ${themeColors.accentBorder} ${themeColors.accent}` : "text-gray-500"
          }`} onClick={() => setActiveTab("subjects")}>
          <div className="text-sm font-medium text-gray-500 mb-2">Subjects</div>
          <div className="flex flex-col sm:flex-row items-center">
            <div className={`mr-2 rounded-full p-2 ${themeColors.secondaryBg}`}>
              <BarChart className="h-4 w-4 text-white" />
            </div>
            <div className="text-2xl font-bold">{subjectsCount}</div>
          </div>
        </div>
      </div>

      {activeTab === "subjects" && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b flex justify-between items-center">
            <h3 className="text-lg font-semibold">Subjects List</h3>
            {isAdmin && (
              <button
                onClick={() => setAddingSubject(true)}
                className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-500 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Subject</th>
                    <th className="text-left py-2">Teacher</th>
                    <th className="text-left py-2">{isAdmin ? 'Actions' : 'Assessments'}</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleSubjects.map((subject, index) => (
                    <tr key={`${subject.subject?.code}-${index}`} className="border-b">
                      <td className="py-3 flex items-center gap-2">
                        <p>{subject.subject?.name || 'N/A'}</p>
                        <p>({subject.subject?.code || 'N/A'})</p>
                      </td>
                      <td className="py-3">{subject.teacher?.firstName || 'N/A'} {subject.teacher?.lastName || ''}</td>                      
                          {isAdmin ? 
                            <td className="py-3">
                        <div className="flex gap-2">
                              <button
                                onClick={() => setEditingSubject(subject)}
                                className="bg-gray-100 hover:bg-gray-200 p-2 rounded"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              {/* <button
                                onClick={() => handleRemoveSubject(subject.subject.code)}
                                className="bg-red-100 hover:bg-red-200 p-2 rounded text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button> */}
                              {isSubjectTeacher && subject.teacher?.id === user?.id && (
                          <button
                            onClick={() => setShowAssessmentModal({ open: true, subject })}
                            className="bg-green-400 text-white px-2 py-1 rounded text-xs hover:bg-green-500"
                          >
                            <PlusSquare />
                          </button>
                        )}
                        </div>
                      </td>
                      : <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span>{subject.assessments?.length || 0}</span>
                        {isSubjectTeacher && subject.teacher?.id === user?.id && (
                          <button
                            onClick={() => setShowAssessmentModal({ open: true, subject })}
                            className="bg-green-400 text-white px-2 py-1 rounded text-xs hover:bg-green-500"
                          >
                            <PlusSquare />
                          </button>
                        )}
                      </div>
                    </td>}
                    </tr>
                  )) || []}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "students" && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Student List</h3>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Student</th>
                    <th className="text-left py-2">Student ID</th>
                    <th className="text-left py-2">Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {classData.classStudents?.map((classStudent, index) => (
                    <tr key={`${classStudent.student?.id}-${index}`} className="border-b">
                      <td className="py-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                            {classStudent.student?.firstName?.[0] || 'N'}{classStudent.student?.lastName?.[0] || 'A'}
                          </div>
                          <div className="font-medium">
                            {classStudent.student?.firstName || 'N/A'} {classStudent.student?.otherName ? `${classStudent.student.otherName} ` : ''}{classStudent.student?.lastName || ''}
                          </div>
                        </div>
                      </td>
                      <td className="py-3">{classStudent.student?.id || 'N/A'}</td>
                      <td className="py-3">
                        <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {classStudent.student?.gender || classStudent.student?.sex || 'N/A'}
                        </span>
                      </td>
                    </tr>
                  )) || []}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Edit Class Teacher Modal */}
      <Modal
        isOpen={editingClassTeacher}
        onClose={() => setEditingClassTeacher(false)}
        title="Edit Class Teacher"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select New Class Teacher</label>
            <select
              className="w-full p-2 border rounded"
              value={selectedClassTeacherId}
              onChange={(e) => setSelectedClassTeacherId(e.target.value)}
            >
              <option value="">Choose a teacher</option>
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.firstName} {teacher.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setEditingClassTeacher(false)}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => selectedClassTeacherId && handleUpdateClassTeacher(selectedClassTeacherId)}
              disabled={!selectedClassTeacherId}
              className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      {/* Add Subject Modal */}
      <Modal
        isOpen={addingSubject}
        onClose={() => setAddingSubject(false)}
        title="Add New Subject"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <select
              className="w-full p-2 border rounded"
              value={newSubject.subject}
              onChange={(e) => setNewSubject(prev => ({ ...prev, subject: e.target.value }))}
            >
              <option value="">Choose a subject</option>
              {subjects.filter(subject => 
                !classData.classSubjects.some(cs => cs.subject.code === subject.code)
              ).map(subject => (
                <option key={subject.code} value={subject.code}>
                  {subject.name} ({subject.code})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Teacher</label>
            <select
              className="w-full p-2 border rounded"
              value={newSubject.teacher}
              onChange={(e) => setNewSubject(prev => ({ ...prev, teacher: e.target.value }))}
            >
              <option value="">Choose a teacher</option>
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.firstName} {teacher.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 pt-4">
            <button
              onClick={() => setAddingSubject(false)}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleAddSubject}
              disabled={!newSubject.subject || !newSubject.teacher}
              className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
            >
              Add Subject
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Subject Teacher Modal */}
      <Modal
        isOpen={!!editingSubject}
        onClose={() => setEditingSubject(null)}
        title="Edit Subject Teacher"
      >
        {editingSubject && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Subject: {editingSubject.subject.name}</label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Select New Teacher</label>
              <select
                className="w-full p-2 border rounded"
                value={selectedSubjectTeacherId}
                onChange={(e) => setSelectedSubjectTeacherId(e.target.value)}
              >
                <option value="">Choose a teacher</option>
                {teachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.firstName} {teacher.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setEditingSubject(null)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => selectedSubjectTeacherId && handleUpdateSubjectTeacher(editingSubject.subject.code, selectedSubjectTeacherId)}
                disabled={!selectedSubjectTeacherId}
                className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Assessment creation modal for subject teacher */}
      {showAssessmentModal.open && showAssessmentModal.subject && (
        <Modal
          isOpen={showAssessmentModal.open}
          onClose={() => setShowAssessmentModal({ open: false, subject: null })}
          title={`Create Assessment for ${showAssessmentModal.subject.subject.name}`}
        >
          <div ref={assessmentModalRef} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Assessment Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={assessmentForm.name}
                onChange={e => setAssessmentForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Enter assessment name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Total Marks</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={assessmentForm.totalMarks}
                onChange={e => setAssessmentForm(f => ({ ...f, totalMarks: e.target.value }))}
                placeholder="Enter total marks"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date of Assessment</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={assessmentForm.dateOfAssessment}
                onChange={e => setAssessmentForm(f => ({ ...f, dateOfAssessment: e.target.value }))}
              />
            </div>
            <div className="flex gap-2 pt-4">
              <button
                onClick={() => setShowAssessmentModal({ open: false, subject: null })}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAssessment}
                disabled={!assessmentForm.name || !assessmentForm.totalMarks || !assessmentForm.dateOfAssessment}
                className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:opacity-50"
              >
                Create Assessment
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}