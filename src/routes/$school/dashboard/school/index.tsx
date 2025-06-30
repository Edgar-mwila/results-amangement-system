import SchoolProfile from '@/components/school-profile'
import { AnyRoute, createRoute } from '@tanstack/react-router'
import { Route as AdminRoute } from '../index'
import { useEffect, useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { School } from '@/types'

const SchoolManagement = () => {
  const { school } = useParams({ strict: false })
  const [schoolData, setSchoolData] = useState<School | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/schools/${school}/subdomain`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch school')
        return res.json()
      })
      .then(data => {
        setSchoolData(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [school])

  const updateSchool = async (updatedData: Partial<School>) => {
    setError(null)
    try {
      const res = await fetch(`/api/schools/${schoolData?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      })
      if (!res.ok) throw new Error('Failed to update school')
      const data = await res.json()
      setSchoolData(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
          <div className="flex-1">
            <div className="h-6 w-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-2" />
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          </div>
        </div>
        <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mt-4" />
        <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        <div className="h-32 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse mt-4" />
      </div>
    )
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-red-600 bg-red-50 border border-red-200 rounded p-4">
        <span className="font-semibold text-lg mb-2">Something went wrong</span>
        <span>{error}</span>
        <button
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    )
  }
  if (!schoolData) return <div>No school data available</div>;

  return (
    <div className='flex flex-col'>
      <SchoolProfile school={schoolData} onUpdateSchool={updateSchool} />
    </div>
  )
}

export const Route = createRoute({
  path: '/$school/dashboard/school/',
  component: SchoolManagement,
  getParentRoute: () => AdminRoute as AnyRoute,
})
