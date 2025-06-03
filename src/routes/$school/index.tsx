// SchoolPage Component
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  Clock,
  Mail,
  Phone,
  Users,
  Award,
  Globe,
} from 'lucide-react'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from '@/components/ui/dialog'

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
    <div className="min-h-screen bg-white">
      {/* Logo space added here */}
      <div className="py-8 flex justify-center items-center">
        {/* Replace this div with your logo image or component */}
        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-xl font-bold select-none">
          LOGO
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-blue-400 to-green-400 text-white shadow-lg">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to {schoolName}
          </h1>
          <p className="text-xl mb-10 opacity-90">
            Empowering education through innovative management solutions
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <Button
              size="lg"
              className="font-semibold px-8 py-6 bg-white text-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all shadow-md"
              onClick={() => navigate({ to: '/$school/auth/login', params: { school } })}
            >
              Login
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="font-semibold px-8 py-6 bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all"
              onClick={() => navigate({ to: '/$school/auth/register', params: { school } })}
            >
              Register as Parent/Guardian
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 text-gray-800 inline-block relative">
              About Us
              <span className="absolute bottom-0 left-0 w-full h-1 bg-green-400 rounded-full"></span>
            </h2>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            At {schoolName}, we are committed to providing excellence in education through modern
            management practices and innovative learning solutions. Our platform
            ensures seamless communication between teachers, students, and
            parents, creating a collaborative environment for academic success.
          </p>
        </div>
      </section>

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
                <p className="text-gray-600">
                  support@{schoolName.toLowerCase().replace(/\s+/g, '')}school.com
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 hover:bg-green-50 rounded-lg transition-all">
                <div className="bg-green-100 p-4 rounded-full mb-4">
                  <Phone className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
                <p className="text-gray-600">(555) 123-4567</p>
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
            © {new Date().getFullYear()} {schoolName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
