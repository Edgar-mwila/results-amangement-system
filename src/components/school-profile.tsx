"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Award,
  BookOpen,
  Building,
  Calendar,
  Clock,
  Download,
  Edit,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react"
import { themeColors } from "./ui/theme-config"

export default function SchoolProfile() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Westview High School</h1>
          <p className="text-gray-500">School Profile</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            Export Profile
          </Button>
          <Button className={`flex items-center gap-2 ${themeColors.accentBg} ${themeColors.accentHover} text-white`}>
            <Edit size={16} />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>School Overview</CardTitle>
            <CardDescription>General information about the school</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Building className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">School Type</h3>
                    <p className="text-sm text-gray-500">Public High School</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-sm text-gray-500">1234 Education Ave, Springfield, IL 62701</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-sm text-gray-500">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-gray-500">info@westviewhigh.edu</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Globe className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Website</h3>
                    <p className="text-sm text-gray-500">www.westviewhigh.edu</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Users className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Student Population</h3>
                    <p className="text-sm text-gray-500">1,250 students</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <GraduationCap className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Faculty</h3>
                    <p className="text-sm text-gray-500">85 teachers and staff</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Award className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Accreditation</h3>
                    <p className="text-sm text-gray-500">National Association of Secondary Schools</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">School Year</h3>
                    <p className="text-sm text-gray-500">August to June</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">School Hours</h3>
                    <p className="text-sm text-gray-500">8:00 AM - 3:30 PM, Monday to Friday</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-2">About Westview High School</h3>
              <p className="text-sm text-gray-500">
                Westview High School is a comprehensive public high school serving grades 9-12. Established in 1985, our
                school is committed to academic excellence, character development, and preparing students for success in
                college and careers. We offer a diverse curriculum with advanced placement courses, career and technical
                education, and a wide range of extracurricular activities.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Statistics</CardTitle>
            <CardDescription>School performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">Graduation Rate</div>
                <div className="text-2xl font-bold mt-1">94%</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "94%" }}></div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">College Acceptance</div>
                <div className="text-2xl font-bold mt-1">88%</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "88%" }}></div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">Student-Teacher Ratio</div>
                <div className="text-2xl font-bold mt-1">15:1</div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">AP Pass Rate</div>
                <div className="text-2xl font-bold mt-1">82%</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "82%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="academics" className="mb-6">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger
            value="academics"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Academics
          </TabsTrigger>
          <TabsTrigger
            value="facilities"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Facilities
          </TabsTrigger>
          <TabsTrigger
            value="extracurricular"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Extracurricular
          </TabsTrigger>
          <TabsTrigger
            value="staff"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Staff
          </TabsTrigger>
        </TabsList>

        <TabsContent value="academics">
          <Card>
            <CardHeader>
              <CardTitle>Academic Programs</CardTitle>
              <CardDescription>Courses and educational offerings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-gray-500" />
                    Core Subjects
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-500 list-disc pl-5">
                    <li>English Language Arts</li>
                    <li>Mathematics (Algebra, Geometry, Calculus)</li>
                    <li>Science (Biology, Chemistry, Physics)</li>
                    <li>Social Studies (History, Government, Economics)</li>
                    <li>Foreign Languages (Spanish, French, German)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <Award className="mr-2 h-5 w-5 text-gray-500" />
                    Advanced Placement Courses
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-500 list-disc pl-5">
                    <li>AP English Literature</li>
                    <li>AP Calculus AB & BC</li>
                    <li>AP Biology, Chemistry, Physics</li>
                    <li>AP U.S. History</li>
                    <li>AP Computer Science</li>
                    <li>AP Psychology</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5 text-gray-500" />
                    Career & Technical Education
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-500 list-disc pl-5">
                    <li>Business & Entrepreneurship</li>
                    <li>Computer Science & Programming</li>
                    <li>Health Sciences</li>
                    <li>Culinary Arts</li>
                    <li>Engineering & Robotics</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <Users className="mr-2 h-5 w-5 text-gray-500" />
                    Special Programs
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-500 list-disc pl-5">
                    <li>Honors Program</li>
                    <li>Dual Enrollment with Local College</li>
                    <li>STEM Academy</li>
                    <li>Arts Conservatory</li>
                    <li>Special Education Services</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facilities">
          <Card>
            <CardHeader>
              <CardTitle>School Facilities</CardTitle>
              <CardDescription>Campus and learning environments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-3">Academic Facilities</h3>
                  <ul className="space-y-2 text-sm text-gray-500 list-disc pl-5">
                    <li>35 Modern Classrooms</li>
                    <li>5 Science Laboratories</li>
                    <li>2 Computer Labs</li>
                    <li>Library & Media Center</li>
                    <li>Career Center</li>
                    <li>Study Halls</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-3">Athletic Facilities</h3>
                  <ul className="space-y-2 text-sm text-gray-500 list-disc pl-5">
                    <li>Gymnasium</li>
                    <li>Football Field</li>
                    <li>Track & Field</li>
                    <li>Baseball & Softball Fields</li>
                    <li>Tennis Courts</li>
                    <li>Fitness Center</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-3">Arts & Performance</h3>
                  <ul className="space-y-2 text-sm text-gray-500 list-disc pl-5">
                    <li>Auditorium (500 seats)</li>
                    <li>Music Rooms</li>
                    <li>Art Studios</li>
                    <li>Drama Workshop</li>
                    <li>Dance Studio</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-3">Student Services</h3>
                  <ul className="space-y-2 text-sm text-gray-500 list-disc pl-5">
                    <li>Cafeteria</li>
                    <li>Student Lounge</li>
                    <li>Counseling Center</li>
                    <li>Health Office</li>
                    <li>College & Career Center</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-3">Technology</h3>
                  <ul className="space-y-2 text-sm text-gray-500 list-disc pl-5">
                    <li>School-wide Wi-Fi</li>
                    <li>1:1 Chromebook Program</li>
                    <li>Smart Boards in Classrooms</li>
                    <li>Digital Media Lab</li>
                    <li>Robotics Workshop</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-3">Outdoor Spaces</h3>
                  <ul className="space-y-2 text-sm text-gray-500 list-disc pl-5">
                    <li>Courtyard</li>
                    <li>Outdoor Classroom</li>
                    <li>School Garden</li>
                    <li>Picnic Area</li>
                    <li>Parking Lots</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="extracurricular">
          <Card>
            <CardHeader>
              <CardTitle>Extracurricular Activities</CardTitle>
              <CardDescription>Sports, clubs, and student organizations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Sports Teams</h3>
                  <ul className="space-y-2 text-sm text-gray-500 list-disc pl-5">
                    <li>Football</li>
                    <li>Basketball (Boys & Girls)</li>
                    <li>Baseball & Softball</li>
                    <li>Soccer (Boys & Girls)</li>
                    <li>Track & Field</li>
                    <li>Cross Country</li>
                    <li>Volleyball</li>
                    <li>Tennis</li>
                    <li>Swimming</li>
                    <li>Golf</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Academic Clubs</h3>
                  <ul className="space-y-2 text-sm text-gray-500 list-disc pl-5">
                    <li>Debate Team</li>
                    <li>Math Club</li>
                    <li>Science Olympiad</li>
                    <li>Robotics Club</li>
                    <li>Chess Club</li>
                    <li>Model United Nations</li>
                    <li>National Honor Society</li>
                    <li>Student Government</li>
                    <li>Yearbook Committee</li>
                    <li>School Newspaper</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Arts & Performance</h3>
                  <ul className="space-y-2 text-sm text-gray-500 list-disc pl-5">
                    <li>Concert Band</li>
                    <li>Jazz Ensemble</li>
                    <li>Orchestra</li>
                    <li>Choir</li>
                    <li>Drama Club</li>
                    <li>Art Club</li>
                    <li>Photography Club</li>
                    <li>Dance Team</li>
                    <li>Film Club</li>
                    <li>Creative Writing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff">
          <Card>
            <CardHeader>
              <CardTitle>School Staff</CardTitle>
              <CardDescription>Administration and faculty</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Administration</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <GraduationCap className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Dr. Jennifer Williams</h4>
                        <p className="text-sm text-gray-500">Principal</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <GraduationCap className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Michael Rodriguez</h4>
                        <p className="text-sm text-gray-500">Vice Principal, Academics</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <GraduationCap className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Sarah Johnson</h4>
                        <p className="text-sm text-gray-500">Vice Principal, Student Affairs</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <GraduationCap className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Robert Chen</h4>
                        <p className="text-sm text-gray-500">Dean of Students</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Department Heads</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <BookOpen className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Dr. Emily Parker</h4>
                        <p className="text-sm text-gray-500">English Department</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <BookOpen className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Dr. James Wilson</h4>
                        <p className="text-sm text-gray-500">Mathematics Department</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <BookOpen className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Dr. Maria Garcia</h4>
                        <p className="text-sm text-gray-500">Science Department</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <BookOpen className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Dr. Thomas Brown</h4>
                        <p className="text-sm text-gray-500">Social Studies Department</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-3">Staff Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <div className="text-3xl font-bold mb-1">85</div>
                    <div className="text-sm text-gray-500">Total Staff</div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <div className="text-3xl font-bold mb-1">65</div>
                    <div className="text-sm text-gray-500">Teachers</div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <div className="text-3xl font-bold mb-1">92%</div>
                    <div className="text-sm text-gray-500">Advanced Degrees</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
