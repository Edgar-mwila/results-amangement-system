import { Student } from '@/types'
import { createFileRoute, useParams, useRouter } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/$school/auth/register')({
  component: GuardianLogin,
})

function GuardianLogin() {
  const router = useRouter()
  const { school } = useParams({ strict: false })
  const [studentId, setStudentId] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Simulate API call
  async function fetchStudent(id: string): Promise<Student | null> {
    const response = await fetch(`/api/${school}/students/${id}`)
    if (response.ok) {
      return response.json()
    }
    return null
  }

  // async function fetchGuardianByEmail(email: string) {
  //   const response = await fetch(`/api/${school}/guardians/email/${encodeURIComponent(email)}`)
  //   if (response.ok) {
  //     return response.json()
  //   }
  //   return null
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    if (!studentId) {
      setError('Please enter a student ID.')
      setSubmitting(false)
      return
    }
    try {
      const student = await fetchStudent(studentId)
      if (!student) {
        setError('Student not found. Please check the ID and try again.')
        setSubmitting(false)
        return
      }
      // const guardian = await fetchGuardianByEmail(email)
      if (student) {
        localStorage.setItem('studentId', JSON.stringify(student.id))
        // localStorage.setItem('guardian', JSON.stringify(guardian))
        localStorage.setItem('isAuthenticated', 'true')
        router.navigate({
          to: '/$school/dashboard/student',
          params: { school: school },
        })
      } else {
        setError('Student not found for this school.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Check student results
        </h1>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student ID
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value.toUpperCase())}
              placeholder={'XXXXXX'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-400 focus:border-green-400"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 px-4 bg-green-400 hover:bg-green-500 text-white font-medium rounded-lg transition-colors ${
              submitting ? 'opacity-70 cursor-wait' : ''
            }`}
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
