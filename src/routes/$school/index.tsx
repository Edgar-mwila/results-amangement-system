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

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3 text-gray-800 inline-block relative">
              What We Offer
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 rounded-full"></span>
            </h2>
            <p className="text-gray-600 mt-4">Discover our comprehensive educational services</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all text-center border-t-4 border-blue-400">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full">
                <BookOpen className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Academic Excellence
              </h3>
              <p className="text-gray-600">
                Comprehensive curriculum and assessment management with cutting-edge learning tools
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all text-center border-t-4 border-green-400">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-100 rounded-full">
                <Users className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Student Support
              </h3>
              <p className="text-gray-600">
                Dedicated resources and personalized guidance for every student's success journey
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all text-center border-t-4 border-blue-400">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full">
                <Globe className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Community Engagement
              </h3>
              <p className="text-gray-600">
                Strong partnership between school and families through transparent communication
              </p>
            </div>
          </div>
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

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-green-400 to-blue-400 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Educational Community</h2>
          <p className="text-xl mb-8 opacity-90">
            Start your journey with {schoolName} today and discover the difference
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button
              size="lg"
              className="font-semibold px-8 py-6 bg-white text-blue-500 hover:bg-blue-50 transition-all shadow-md"
              onClick={() => navigate({ to: '/$school/auth/register', params: { school } })}
            >
              Get Started
            </Button>
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-semibold px-8 py-6 bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all"
                  >
                    Contact Us
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Contact Information</DialogTitle>
                    <DialogDescription>
                      Get in touch with {schoolName}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-gray-600">123 School Street<br/>City, State 12345</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-gray-600">(555) 123-4567</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-600">support@{schoolName.toLowerCase().replace(/\s+/g, '')}school.com</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold">Office Hours</h3>
                      <p className="text-gray-600">Monday - Friday<br/>8:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => window.location.href = `mailto:support@${schoolName.toLowerCase().replace(/\s+/g, '')}school.com`}>
                      Send Email
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 text-gray-800 inline-block relative">
              Our Achievements
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 rounded-full"></span>
            </h2>
            <p className="text-gray-600 mt-4">Excellence in education and beyond</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-full">
                <Award className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">95%</h3>
              <p className="text-gray-600">Graduation Rate</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-green-100 rounded-full">
                <Users className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">1200+</h3>
              <p className="text-gray-600">Students Enrolled</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-full">
                <BookOpen className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">48</h3>
              <p className="text-gray-600">Academic Programs</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-green-100 rounded-full">
                <Globe className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">25+</h3>
              <p className="text-gray-600">Years of Excellence</p>
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