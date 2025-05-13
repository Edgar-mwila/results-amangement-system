// SchoolPage Component
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/$school/')({
  component: SchoolPage,
})

function SchoolPage() {
  const navigate = useNavigate()
  const { school } = Route.useParams()

  const schoolName = school
    ? school
        .replace(/-/g, ' ')
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'School'

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2CC8F]/20 to-white">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-[#F2CC8F] to-[#DDB892] text-gray-900 shadow-xl">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">
            Welcome to {schoolName}
          </h1>
          <p className="text-xl mb-10 opacity-90">
            Empowering education through innovative management solutions
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button
              variant="secondary"
              size="lg"
              className="font-semibold px-8 py-6 bg-white text-[#F2CC8F] hover:bg-[#F2CC8F]/10 transition-all"
              onClick={() => navigate({ to: '/$school/auth/login', params: { school } })}
            >
              Login
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="font-semibold px-8 py-6 bg-transparent border-2 border-white text-gray-900 hover:bg-white/10 transition-all"
              onClick={() => navigate({ to: '/$school/auth/register', params: { school } })}
            >
              Register as Parent/Guardian
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">About Us</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We are committed to providing excellence in education through modern
            management practices and innovative learning solutions. Our platform
            ensures seamless communication between teachers, students, and
            parents.
          </p>
        </div>
      </section>

      {/* Help Desk Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Help Desk</h2>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="flex flex-col gap-4 text-left">
              <div className="flex items-center gap-3">
                <div className="bg-[#F2CC8F]/20 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#F2CC8F]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Email</p>
                  <p className="text-gray-600">
                    support@{schoolName.toLowerCase().replace(/\s+/g, '')}
                    school.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#F2CC8F]/20 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#F2CC8F]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Phone</p>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#F2CC8F]/20 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#F2CC8F]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Hours</p>
                  <p className="text-gray-600">
                    Monday - Friday, 8:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-[#F2CC8F]/20 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#F2CC8F]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Academic Excellence
              </h3>
              <p className="text-gray-600">
                Comprehensive curriculum and assessment management
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-[#F2CC8F]/20 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#F2CC8F]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Student Support
              </h3>
              <p className="text-gray-600">
                Dedicated resources and guidance for student success
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-[#F2CC8F]/20 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#F2CC8F]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Community Engagement
              </h3>
              <p className="text-gray-600">
                Strong partnership between school and families
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
