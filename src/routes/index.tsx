// HomePage Component
import { Button } from '@/components/ui/button';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const schools = [
    { id: 1, name: 'Springfield Elementary' },
    { id: 2, name: 'Riverside High' },
    { id: 3, name: 'Mountain View School' },
  ];
  
  const filteredSchools = schools.filter(school => 
    school.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSchoolSelect = (school: { id: number, name: string }) => {
    navigate({ 
      to: '/$school',
      params: { school: school.name.toLowerCase().replace(/\s+/g, '-') }
    });
    setIsDialogOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="px-6 lg:px-20 py-16">
        {/* Background pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="currentColor" />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Hero Content */}
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 animate-fade-in">
            Transform Your
            <span className="block text-green-700">Results Management</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-800 leading-relaxed max-w-2xl">
            Empower your school with our comprehensive solution for managing
            <span className="font-medium"> academics</span>,
            <span className="font-medium"> staff</span>,
            <span className="font-medium"> students</span>, and
            <span className="font-medium"> communication</span>.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
            <Button 
          className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6 text-lg
            transform transition-all hover:scale-105 focus:ring-4 focus:ring-green-300"
          onClick={() => navigate({to: '/register-school'})}
            >
          Get Started
            </Button>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="border-2 border-gray-800 bg-transparent text-gray-800 hover:bg-gray-800 
            hover:text-white font-bold px-8 py-6 text-lg transition-colors"
            >
              Find Your School
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Find Your School</h2>
              <div className="relative">
            <Input 
              placeholder="Search by school name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 mb-4"
              aria-label="Search schools"
            />
            <svg className="w-5 h-5 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
              </div>
              <div className="max-h-60 overflow-y-auto rounded-lg border border-gray-100">
            <ul className="divide-y divide-gray-100">
              {filteredSchools.map(school => (
                <li 
              key={school.id}
              className="py-3 px-4 hover:bg-green-50 cursor-pointer transition-colors
                flex items-center justify-between group"
              onClick={() => handleSchoolSelect(school)}
                >
              <span>{school.name}</span>
              <svg className="w-5 h-5 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
                </li>
              ))}
            </ul>
              </div>
            </div>
          </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Decorative Image/Illustration */}
        <div className="flex-1 hidden lg:block">
          <div className="relative w-full h-96">
            <svg className="absolute inset-0 w-full h-full text-green-600 opacity-10" viewBox="0 0 200 200">
          <path fill="currentColor" d="M45,-76.9C58.5,-69.7,69.8,-56.6,77.7,-41.8C85.7,-27,90.3,-10.5,88.7,5.4C87.1,21.2,79.3,36.4,68.8,49.5C58.3,62.6,45.1,73.7,29.7,79.1C14.3,84.5,-3.3,84.3,-19.9,79.1C-36.5,74,-52.1,64,-63.5,50.6C-74.9,37.2,-82.1,20.4,-83.7,2.8C-85.4,-14.8,-81.4,-33.2,-71.3,-47.2C-61.2,-61.2,-45,-70.8,-29.8,-76.6C-14.6,-82.4,-0.3,-84.4,13.8,-82.5C27.9,-80.6,55.8,-75,45,-76.9Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Academic Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete solution for curriculum and assessment management.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Staff Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Efficient tools for managing teachers and staff.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Parent Portal</h3>
              <p className="text-gray-600 leading-relaxed">
                Keep parents informed and engaged in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gray-800">About My Edu-track</h1>
          <div className="w-24 h-1 bg-green-600 mx-auto"></div>
        </header>

        <section className="mb-20">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gradient-to-br from-green-200 to-green-400 p-12 text-white">
                <h2 className="text-3xl font-bold mb-6">Transforming School Results Management</h2>
                <p className="text-lg opacity-90 leading-relaxed">
                  Welcome to our comprehensive My Edu-track, designed specifically for schools 
                  seeking to modernize their academic record-keeping and reporting processes.
                </p>
              </div>
              <div className="md:w-1/2 p-12">
                <div className="mb-10">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Why Choose Us?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Easy-to-use interface</span>
                    </li>
                    <li className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Secure data management</span>
                    </li>
                    <li className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Real-time result processing</span>
                    </li>
                    <li className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Comprehensive reporting</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Benefits</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Time-saving automation</span>
                    </li>
                    <li className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Reduced errors</span>
                    </li>
                    <li className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Enhanced parent communication</span>
                    </li>
                    <li className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Data-driven insights</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Testimonials Section (New) */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">What Schools Say About Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xl">WH</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-800">Westfield High</h4>
                  <p className="text-gray-500">Principal Davis</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic">
                "This system has revolutionized how we track and report student progress. Parents love the transparency and our staff appreciates the time saved on administrative tasks."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-xl">OP</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-800">Oak Park Elementary</h4>
                  <p className="text-gray-500">Vice Principal Johnson</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Implementation was smooth and the support team was always available. We've seen improved communication with parents and better tracking of student performance since switching."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-xl">RS</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-800">Riverdale School</h4>
                  <p className="text-gray-500">IT Director Smith</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill={i < 4 ? "currentColor" : "none"} stroke={i < 4 ? "none" : "currentColor"} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic">
                "From a technical perspective, this system is both robust and user-friendly. Data security is excellent and the analytics tools help us make better decisions for our students."
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action (New) */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-300 to-emerald-800 text-[#F2CC8F]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to transform your school's management system?</h2>
          <p className="text-xl mb-10 opacity-90">
            Join hundreds of educational institutions already benefiting from our comprehensive solution.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button 
              size="lg"
              className="bg-[#F2CC8F] text-white hover:bg-green-100 transition-all font-semibold px-8 py-6"
              onClick={() => navigate({to: '/register-school'})}
            >
              Schedule a Demo
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-transparent border-2 border-[#F2CC8F] text-[#F2CC8F] hover:bg-white/10 transition-all font-semibold px-8 py-6"
              onClick={() => navigate({to: '/about'})}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}