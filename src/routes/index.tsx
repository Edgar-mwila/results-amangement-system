// HomePage Component
import { Button } from '@/components/ui/button';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { School } from '@/types';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [schools, setSchools] = useState<School[]>([]);

  const navigation = useNavigate();

  useEffect(() => {
    const checkStoredData = async () => {
      try {
        // Get stored data from localStorage (replacing AsyncStorage)
        const storedData = [
          ['user', localStorage.getItem('user')],
          ['studentId', localStorage.getItem('studentId')],
          ['systemAdminUser', localStorage.getItem('systemAdminUser')]
        ] as const;

        // Get school subdomain
        const school = localStorage.getItem('school');
        
        // Check if we have any stored data
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const hasStoredData = storedData.some(([_, value]) => value !== null);
        
        if (!hasStoredData) {
          // No stored data present, do nothing
          return;
        }

        if (!school) {
          // Error handling: stored data exists but no school subdomain
          console.error('Navigation error: User data found but no school subdomain available');
          // Optionally, you could redirect to a school selection page or show an error
          return;
        }

        // Navigate based on stored data
        storedData.forEach(([key, value]) => {
          if (value !== null) {
            switch (key) {
              case 'user':
                navigation({ to: `/${school}/dashboard/` });
                break;
              case 'studentId':
                navigation({ to: `/${school}/dashboard/student` });
                break;
              case 'systemAdminUser':
                navigation({ to: `/system-admin` });
                break;
              default:
                break;
            }
          }
        });
      } catch (error) {
        console.error('Error checking stored data:', error);
      }
    };

    checkStoredData();
  }, [navigation]);

  useEffect(() => {
    fetch('/api/schools/')
      .then(response => response.json())
      .then(data => setSchools(data))
      .catch(error => console.error('Error fetching schools:', error));
  }, []);

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSchoolSelect = (school: School) => {
    localStorage.setItem('school', school.subdomain);
    navigate({ 
      to: '/$school',
      params: { school: school.subdomain }
    });
    setIsDialogOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative">
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
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
        {/* Hero Content */}
        <div className="flex-1 space-y-6 sm:space-y-8 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold block text-green-700 animate-fade-in">
            Transform Your
            <span className="block text-green-700">Results Management</span>
          </h1>
          <p className="text-base sm:text-xl lg:text-2xl text-gray-800 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Empower your school with our comprehensive solution for managing
            <span className="font-medium"> academics</span>,
            <span className="font-medium"> staff</span>,
            <span className="font-medium"> students</span>, and
            <span className="font-medium"> communication</span>.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mt-6 sm:mt-8">
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-xl min-h-[48px]"
              onClick={() => navigate({to: '/register-school'})}
            >
              Get Started
            </Button>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="border-2 border-gray-800 bg-transparent text-gray-800 hover:bg-green-700 hover:text-white font-bold px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-xl min-h-[48px]"
            >
              Find Your School
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-[95vw] sm:max-w-md p-4 sm:p-6 rounded-2xl">
            <div className="p-0 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Find Your School</h2>
              <div className="relative">
            <Input 
              placeholder="Search by school name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 mb-4 h-12 rounded-xl"
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
          <div className="relative w-full h-64 sm:h-96">
            <svg className="absolute inset-0 w-full h-full text-green-600 opacity-10" viewBox="0 0 200 200">
          <path fill="currentColor" d="M45,-76.9C58.5,-69.7,69.8,-56.6,77.7,-41.8C85.7,-27,90.3,-10.5,88.7,5.4C87.1,21.2,79.3,36.4,68.8,49.5C58.3,62.6,45.1,73.7,29.7,79.1C14.3,84.5,-3.3,84.3,-19.9,79.1C-36.5,74,-52.1,64,-63.5,50.6C-74.9,37.2,-82.1,20.4,-83.7,2.8C-85.4,-14.8,-81.4,-33.2,-71.3,-47.2C-61.2,-61.2,-45,-70.8,-29.8,-76.6C-14.6,-82.4,-0.3,-84.4,13.8,-82.5C27.9,-80.6,55.8,-75,45,-76.9Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-100 rounded-full">
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
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-100 rounded-full">
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
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-100 rounded-full">
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-20">
        <header className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 text-gray-800">About My Edu-track</h1>
          <div className="w-16 sm:w-24 h-1 bg-green-600 mx-auto"></div>
        </header>

        <section className="mb-10 sm:mb-20">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 bg-gradient-to-br from-green-200 to-green-400 p-6 sm:p-12 text-white">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Transforming School Results Management</h2>
                <p className="text-base sm:text-lg opacity-90 leading-relaxed">
                  Welcome to our comprehensive My Edu-track, designed specifically for schools 
                  seeking to modernize their academic record-keeping and reporting processes.
                </p>
              </div>
              <div className="md:w-1/2 p-6 sm:p-12">
                <div className="mb-6 sm:mb-10">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Why Choose Us?</h3>
                  <ul className="space-y-3 sm:space-y-4">
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
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Benefits</h3>
                  <ul className="space-y-3 sm:space-y-4">
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
    </div>
  );
}