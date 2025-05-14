"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  BookOpen,
  Calendar,
  Clock,
  Download,
  Edit,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react"
import { themeColors } from "./ui/theme-config"

export default function TeacherProfile() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center">
          <Avatar className="h-16 w-16 mr-4">
            <AvatarImage src="/placeholder.svg?height=64&width=64" />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Sarah Johnson</h1>
            <p className="text-gray-500">Mathematics Teacher • ID: T10045</p>
          </div>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            Export
          </Button>
          <Button className={`flex items-center gap-2 ${themeColors.accentBg} ${themeColors.accentHover} text-white`}>
            <Edit size={16} />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Class Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.accentBg}`}>
                <BarChart className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">84.2%</div>
                <p className="text-xs text-gray-500">+2.1% from last semester</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.secondaryBg}`}>
                <User className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">65</div>
                <p className="text-xs text-gray-500">Across 2 courses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Next Class</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.accentBg}`}>
                <Clock className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">10:00 AM</div>
                <p className="text-xs text-gray-500">Pre-Calculus • Room 301</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Teacher Information</CardTitle>
            <CardDescription>Personal and professional details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <User className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Full Name</h3>
                    <p className="text-sm text-gray-500">Sarah Elizabeth Johnson</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <GraduationCap className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Education</h3>
                    <p className="text-sm text-gray-500">M.S. Mathematics, Stanford University</p>
                    <p className="text-sm text-gray-500">B.S. Mathematics, UCLA</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-sm text-gray-500">1234 Oak Street, Springfield, IL 62701</p>
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
                    <p className="text-sm text-gray-500">sarah.johnson@westviewhigh.edu</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <BookOpen className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Department</h3>
                    <p className="text-sm text-gray-500">Mathematics</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Start Date</h3>
                    <p className="text-sm text-gray-500">August 15, 2018</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <GraduationCap className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Certifications</h3>
                    <p className="text-sm text-gray-500">State Teaching License</p>
                    <p className="text-sm text-gray-500">Advanced Placement Certification</p>
                    <p className="text-sm text-gray-500">STEM Education Specialist</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <User className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Reporting To</h3>
                    <p className="text-sm text-gray-500">Dr. James Wilson, Mathematics Department Head</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Schedule</CardTitle>
            <CardDescription>Teaching schedule for Spring 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Period 1 (8:00 - 8:55)</h3>
                    <p className="text-sm text-gray-500">Pre-Calculus</p>
                  </div>
                  <Badge className={`${themeColors.accentBg} text-white`}>Room 301</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">32 students • 85.7% avg</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Period 2 (9:00 - 9:55)</h3>
                    <p className="text-sm text-gray-500">Planning Period</p>
                  </div>
                  <Badge className={`${themeColors.secondaryBg} text-white`}>Office</Badge>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Period 3 (10:00 - 10:55)</h3>
                    <p className="text-sm text-gray-500">Pre-Calculus</p>
                  </div>
                  <Badge className={`${themeColors.accentBg} text-white`}>Room 301</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">30 students • 83.2% avg</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Period 4 (11:00 - 11:55)</h3>
                    <p className="text-sm text-gray-500">Lunch</p>
                  </div>
                  <Badge className="bg-gray-200 text-gray-800">Cafeteria</Badge>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Period 5 (12:00 - 12:55)</h3>
                    <p className="text-sm text-gray-500">Algebra II</p>
                  </div>
                  <Badge className={`${themeColors.accentBg} text-white`}>Room 302</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">35 students • 82.3% avg</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Period 6 (1:00 - 1:55)</h3>
                    <p className="text-sm text-gray-500">Math Club (Advisor)</p>
                  </div>
                  <Badge className={`${themeColors.secondaryBg} text-white`}>Room 301</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="classes" className="mb-6">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger
            value="classes"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Classes
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Performance
          </TabsTrigger>
          <TabsTrigger
            value="activities"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Activities
          </TabsTrigger>
          <TabsTrigger
            value="development"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Development
          </TabsTrigger>
        </TabsList>

        <TabsContent value="classes">
          <Card>
            <CardHeader>
              <CardTitle>Current Classes</CardTitle>
              <CardDescription>Classes taught this semester</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Average</TableHead>
                    <TableHead>Pass Rate</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { class: "Pre-Calculus A", period: "1", room: "301", students: "32", avg: "85.7%", pass: "92%" },
                    { class: "Pre-Calculus B", period: "3", room: "301", students: "30", avg: "83.2%", pass: "90%" },
                    { class: "Algebra II", period: "5", room: "302", students: "35", avg: "82.3%", pass: "88%" },
                  ].map((cls, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{cls.class}</TableCell>
                      <TableCell>{cls.period}</TableCell>
                      <TableCell>{cls.room}</TableCell>
                      <TableCell>{cls.students}</TableCell>
                      <TableCell>{cls.avg}</TableCell>
                      <TableCell>{cls.pass}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <FileText size={16} className="mr-2" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <h3 className="font-medium mt-6 mb-3">Previous Semesters</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Semester</TableHead>
                    <TableHead>Classes</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Average</TableHead>
                    <TableHead>Pass Rate</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { semester: "Fall 2022", classes: "3", students: "68", avg: "82.1%", pass: "89%" },
                    { semester: "Spring 2022", classes: "3", students: "70", avg: "81.5%", pass: "87%" },
                    { semester: "Fall 2021", classes: "3", students: "65", avg: "80.8%", pass: "86%" },
                  ].map((sem, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{sem.semester}</TableCell>
                      <TableCell>{sem.classes}</TableCell>
                      <TableCell>{sem.students}</TableCell>
                      <TableCell>{sem.avg}</TableCell>
                      <TableCell>{sem.pass}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <FileText size={16} className="mr-2" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Teaching effectiveness and student outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                  <BarChart className={`h-16 w-16 ${themeColors.accent}`} />
                  <span className="ml-2 text-gray-500">Performance Metrics Chart</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="font-medium mb-3">Student Achievement</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Class Average</span>
                          <span className="font-medium">84.2%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "84.2%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Pass Rate</span>
                          <span className="font-medium">90%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "90%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Student Growth</span>
                          <span className="font-medium">+8.5%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "85%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Teaching Evaluation</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Student Feedback</span>
                          <span className="font-medium">4.7/5.0</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "94%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Peer Review</span>
                          <span className="font-medium">4.5/5.0</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "90%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Admin Evaluation</span>
                          <span className="font-medium">4.8/5.0</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "96%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Feedback</CardTitle>
                <CardDescription>Recent student evaluations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Teaching Quality</h4>
                      <span className="font-medium">4.8/5.0</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "96%" }}></div>
                    </div>
                    <p className="text-sm mt-2 text-gray-500">
                      "Ms. Johnson explains complex concepts clearly and makes math interesting."
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Availability & Support</h4>
                      <span className="font-medium">4.7/5.0</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "94%" }}></div>
                    </div>
                    <p className="text-sm mt-2 text-gray-500">
                      "Always available during office hours and responds quickly to questions."
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Course Materials</h4>
                      <span className="font-medium">4.5/5.0</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "90%" }}></div>
                    </div>
                    <p className="text-sm mt-2 text-gray-500">
                      "Well-organized materials and helpful practice problems."
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Overall Satisfaction</h4>
                      <span className="font-medium">4.7/5.0</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "94%" }}></div>
                    </div>
                    <p className="text-sm mt-2 text-gray-500">
                      "One of the best math teachers I've had. Makes learning enjoyable."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activities">
          <Card>
            <CardHeader>
              <CardTitle>Extracurricular & Professional Activities</CardTitle>
              <CardDescription>Additional roles and responsibilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">School Activities</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Math Club</h4>
                        <Badge className={`${themeColors.secondaryBg} text-white`}>Advisor</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Since 2019</p>
                      <p className="text-sm mt-2">
                        Leads weekly meetings and prepares students for regional and state math competitions. The club
                        has won 3 regional championships under her guidance.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Curriculum Committee</h4>
                        <Badge className={`${themeColors.secondaryBg} text-white`}>Member</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Since 2020</p>
                      <p className="text-sm mt-2">
                        Participates in curriculum development and review for the mathematics department. Helped
                        implement new Pre-Calculus curriculum.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <h4 className="font-medium">New Teacher Mentorship</h4>
                        <Badge className={`${themeColors.secondaryBg} text-white`}>Mentor</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Since 2021</p>
                      <p className="text-sm mt-2">
                        Mentors new mathematics teachers, providing guidance on classroom management, curriculum
                        implementation, and teaching strategies.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Professional Development</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <h4 className="font-medium">State Mathematics Teachers Association</h4>
                        <Badge className={`${themeColors.accentBg} text-white`}>Member</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Since 2018</p>
                      <p className="text-sm mt-2">
                        Active member attending annual conferences and workshops. Presented on "Engaging Teaching
                        Methods for Advanced Mathematics" in 2022.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Advanced Placement Workshop</h4>
                        <Badge className={`${themeColors.accentBg} text-white`}>Participant</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Summer 2022</p>
                      <p className="text-sm mt-2">
                        Completed intensive training for AP Calculus instruction. Received certification to teach AP
                        Calculus AB and BC.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Educational Technology Integration</h4>
                        <Badge className={`${themeColors.accentBg} text-white`}>Certificate</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Completed 2021</p>
                      <p className="text-sm mt-2">
                        Earned certification in integrating technology into mathematics instruction. Implemented digital
                        tools and resources in classroom teaching.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="font-medium mb-3 mt-6">Recent Achievements</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Achievement</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      date: "May 2022",
                      achievement: "Teacher of the Year Finalist",
                      org: "Westview High School",
                      desc: "Recognized for excellence in teaching and student outcomes",
                    },
                    {
                      date: "April 2022",
                      achievement: "Math Team Regional Champions",
                      org: "State Mathematics Association",
                      desc: "Led school math team to first place in regional competition",
                    },
                    {
                      date: "January 2022",
                      achievement: "Educational Innovation Grant",
                      org: "District Education Foundation",
                      desc: "Received $5,000 grant for mathematics learning lab",
                    },
                    {
                      date: "November 2021",
                      achievement: "Published Article",
                      org: "Mathematics Teaching Journal",
                      desc: "Article on effective strategies for teaching algebra",
                    },
                  ].map((achievement, i) => (
                    <TableRow key={i}>
                      <TableCell>{achievement.date}</TableCell>
                      <TableCell className="font-medium">{achievement.achievement}</TableCell>
                      <TableCell>{achievement.org}</TableCell>
                      <TableCell>{achievement.desc}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="development">
          <Card>
            <CardHeader>
              <CardTitle>Professional Development Plan</CardTitle>
              <CardDescription>Growth objectives and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Current Goals</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">AP Calculus Certification</h4>
                        <Badge className={`${themeColors.accentBg} text-white`}>Completed</Badge>
                      </div>
                      <p className="text-sm mt-2">
                        Complete Advanced Placement certification to teach AP Calculus courses starting next academic
                        year.
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "100%" }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Completed Summer 2022</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">Master's Thesis Publication</h4>
                        <Badge className={`${themeColors.secondaryBg} text-white`}>In Progress</Badge>
                      </div>
                      <p className="text-sm mt-2">
                        Adapt master's thesis on mathematics education for publication in an educational journal.
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div className={`${themeColors.secondaryBg} h-2 rounded-full`} style={{ width: "75%" }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Target completion: June 2023</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">Technology Integration</h4>
                        <Badge className={`${themeColors.secondaryBg} text-white`}>In Progress</Badge>
                      </div>
                      <p className="text-sm mt-2">
                        Implement advanced digital tools and resources in mathematics instruction to enhance student
                        engagement and understanding.
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div className={`${themeColors.secondaryBg} h-2 rounded-full`} style={{ width: "60%" }}></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Ongoing throughout 2023</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Upcoming Training</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Training</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          date: "June 12-16, 2023",
                          training: "Advanced Mathematics Teaching Symposium",
                          provider: "National Math Teachers Association",
                          status: "Registered",
                        },
                        {
                          date: "July 8-9, 2023",
                          training: "Educational Technology Conference",
                          provider: "EdTech Solutions",
                          status: "Registered",
                        },
                        {
                          date: "August 15, 2023",
                          training: "Differentiated Instruction Workshop",
                          provider: "District Professional Development",
                          status: "Pending",
                        },
                      ].map((training, i) => (
                        <TableRow key={i}>
                          <TableCell>{training.date}</TableCell>
                          <TableCell className="font-medium">{training.training}</TableCell>
                          <TableCell>{training.provider}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                training.status === "Completed"
                                  ? `${themeColors.accentBg} text-white`
                                  : training.status === "Registered"
                                    ? `${themeColors.secondaryBg} text-white`
                                    : "bg-gray-200 text-gray-800"
                              }
                            >
                              {training.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Career Development</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Five-Year Plan</h4>
                    <ul className="space-y-2 list-disc pl-5">
                      <li className="text-sm">Complete Ph.D. in Mathematics Education (Starting Fall 2023)</li>
                      <li className="text-sm">Develop and implement innovative mathematics curriculum</li>
                      <li className="text-sm">Pursue department head position</li>
                      <li className="text-sm">Present at national mathematics education conferences</li>
                      <li className="text-sm">Publish research on effective mathematics teaching methods</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Administrator Notes</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Dr. Jennifer Williams, Principal</h4>
                        <p className="text-sm text-gray-500">May 1, 2023</p>
                      </div>
                      <Badge className={`${themeColors.accentBg} text-white`}>Annual Review</Badge>
                    </div>
                    <p className="mt-2 text-sm">
                      Ms. Johnson continues to be an exceptional asset to our mathematics department. Her teaching
                      effectiveness is evident in her students' consistently strong performance. She demonstrates
                      leadership in curriculum development and mentoring new teachers. Her professional growth plan is
                      ambitious and well-aligned with both personal and school goals. Highly recommend for future
                      leadership positions within the department.
                    </p>
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
