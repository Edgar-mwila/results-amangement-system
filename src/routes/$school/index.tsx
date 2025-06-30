// SchoolPage Component (with API fetch, skeleton, error, and real data)
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import {
  Mail,
  Phone,
  Clock,
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { School } from '@/types'

export const Route = createFileRoute('/$school/')({
  component: SchoolPage,
})

async function fetchSchool(subdomain: string): Promise<School> {
  const res = await fetch(`/api/schools/${subdomain}/subdomain`)
  if (!res.ok) throw new Error('Failed to fetch school')
  return res.json()
}

function SchoolPage() {
  const navigate = useNavigate()
  const { school: subdomain } = Route.useParams()

  const {
    data: school,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['school', subdomain],
    queryFn: () => fetchSchool(subdomain),
    enabled: !!subdomain,
  })

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-6">
        <Skeleton className="h-12 w-2/3 mb-6" />
        <Skeleton className="h-6 w-1/2 mb-4" />
        <Skeleton className="h-40 w-full mb-8" />
        <div className="grid md:grid-cols-3 gap-8">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    )
  }

  if (isError || !school) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-6 text-center">
        <div className="text-red-500 font-bold text-xl mb-4">Error loading school</div>
        <div className="text-gray-600">{(error as Error).message}</div>
      </div>
    )
  }

  // School data loaded
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-blue-400 to-green-400 text-white shadow-lg">
        <div className="max-w-5xl mx-auto">
          {school.logoUrl && (
            <img
              src={school.logoUrl}
              alt={school.name}
              className="mx-auto mb-6 h-24 w-24 object-contain rounded-full bg-white shadow"
            />
          )}
          <h1 className="text-5xl font-bold mb-4">{school.name}</h1>
          {school.motto && (
            <p className="text-xl mb-4 italic opacity-90">"{school.motto}"</p>
          )}
          <p className="text-lg mb-10 opacity-90">
            {school.about ||
              'Empowering education through innovative management solutions.'}
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <Button
              size="lg"
              className="font-semibold px-8 py-6 bg-white text-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all shadow-md"
              onClick={() =>
                navigate({
                  to: '/$school/auth/login',
                  params: { school: subdomain },
                })
              }
            >
              Login
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="font-semibold px-8 py-6 bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all"
              onClick={() =>
                navigate({
                  to: '/$school/auth/register',
                  params: { school: subdomain },
                })
              }
            >
              Check Student Results
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      {(school.about || school.category || school.ownership || school.curriculum) && (
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3 text-gray-800 inline-block relative">
                About Us
                <span className="absolute bottom-0 left-0 w-full h-1 bg-green-400 rounded-full"></span>
              </h2>
            </div>
            {school.about && (
              <p className="text-lg text-gray-700 leading-relaxed text-center mb-6">
                {school.about}
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-6 text-gray-600 text-center">
              {school.category && (
                <div>
                  <span className="font-semibold">Category:</span> {school.category}
                </div>
              )}
              {school.ownership && (
                <div>
                  <span className="font-semibold">Ownership:</span> {school.ownership}
                </div>
              )}
              {school.curriculum && (
                <div>
                  <span className="font-semibold">Curriculum:</span> {school.curriculum}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Help Desk Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 text-gray-800 inline-block relative">
              Help Desk
              <span className="absolute bottom-0 left-0 w-full h-1 bg-green-400 rounded-full"></span>
            </h2>
            <p className="text-gray-600 mt-4">We're here to help you with any questions</p>
          </div>
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 hover:bg-blue-50 rounded-lg transition-all">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Mail className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600 break-all">
                {school.contacts?.find(c => c.email)?.email ||
                `support@${school.subdomain}school.com`}
              </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 hover:bg-green-50 rounded-lg transition-all">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Phone className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600">
                {school.contacts?.find(c => c.phone)?.phone || '(N/A)'}
              </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 hover:bg-blue-50 rounded-lg transition-all">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Clock className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Hours</h3>
              <p className="text-gray-600">
                Monday - Friday<br />8:00 AM - 4:00 PM
              </p>
              </div>
            </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} {school.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}