"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
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

export default function StudentDetails() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center">
          <Avatar className="h-16 w-16 mr-4">
            <AvatarImage src="/placeholder.svg?height=64&width=64" />
            <AvatarFallback>ET</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Emma Thompson</h1>
            <p className="text-gray-500">Student ID: ST10023 • Grade 10</p>
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
            <CardTitle className="text-sm font-medium text-gray-500">Overall GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.accentBg}`}>
                <GraduationCap className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">3.92</div>
                <p className="text-xs text-gray-500">Top 5% of class</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.secondaryBg}`}>
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">98%</div>
                <p className="text-xs text-gray-500">3 absences this year</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Next Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.accentBg}`}>
                <FileText className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">May 15</div>
                <p className="text-xs text-gray-500">Math Final Exam</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
            <CardDescription>Personal and contact details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <User className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Full Name</h3>
                    <p className="text-sm text-gray-500">Emma Rose Thompson</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Date of Birth</h3>
                    <p className="text-sm text-gray-500">March 15, 2007</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-sm text-gray-500">1234 Maple Street, Springfield, IL 62701</p>
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
                    <p className="text-sm text-gray-500">emma.thompson@student.westviewhigh.edu</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <User className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Parent/Guardian</h3>
                    <p className="text-sm text-gray-500">Robert & Sarah Thompson</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Parent Phone</h3>
                    <p className="text-sm text-gray-500">(555) 987-6543</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Parent Email</h3>
                    <p className="text-sm text-gray-500">rthompson@email.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <GraduationCap className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Academic Advisor</h3>
                    <p className="text-sm text-gray-500">Ms. Jennifer Davis</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Enrollment Date</h3>
                    <p className="text-sm text-gray-500">August 25, 2021</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Schedule</CardTitle>
            <CardDescription>Class schedule for Spring 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Period 1 (8:00 - 8:55)</h3>
                    <p className="text-sm text-gray-500">Advanced English</p>
                  </div>
                  <Badge className={`${themeColors.accentBg} text-white`}>A</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">Room 203 • Ms. Parker</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Period 2 (9:00 - 9:55)</h3>
                    <p className="text-sm text-gray-500">AP World History</p>
                  </div>
                  <Badge className={`${themeColors.accentBg} text-white`}>A-</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">Room 105 • Mr. Brown</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Period 3 (10:00 - 10:55)</h3>
                    <p className="text-sm text-gray-500">Advanced Algebra</p>
                  </div>
                  <Badge className={`${themeColors.accentBg} text-white`}>A+</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">Room 301 • Ms. Johnson</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Period 4 (11:00 - 11:55)</h3>
                    <p className="text-sm text-gray-500">Chemistry</p>
                  </div>
                  <Badge className={`${themeColors.secondaryBg} text-white`}>B+</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">Room 405 • Dr. Garcia</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Period 5 (12:30 - 1:25)</h3>
                    <p className="text-sm text-gray-500">Spanish III</p>
                  </div>
                  <Badge className={`${themeColors.accentBg} text-white`}>A</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">Room 204 • Sra. Rodriguez</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Period 6 (1:30 - 2:25)</h3>
                    <p className="text-sm text-gray-500">Computer Science</p>
                  </div>
                  <Badge className={`${themeColors.accentBg} text-white`}>A</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">Room 302 • Mr. Chen</p>
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
            value="attendance"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Attendance
          </TabsTrigger>
          <TabsTrigger
            value="activities"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Activities
          </TabsTrigger>
          <TabsTrigger
            value="notes"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Notes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="academics">
          <Card>
            <CardHeader>
              <CardTitle>Academic Performance</CardTitle>
              <CardDescription>Grades and assessment results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="font-medium mb-3">Current Grades</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead>Current Grade</TableHead>
                      <TableHead>Last Assessment</TableHead>
                      <TableHead>Assessment Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        subject: "Advanced English",
                        teacher: "Ms. Parker",
                        grade: "A (94%)",
                        assessment: "Essay: Modern Literature",
                        score: "92%",
                      },
                      {
                        subject: "AP World History",
                        teacher: "Mr. Brown",
                        grade: "A- (91%)",
                        assessment: "Midterm Exam",
                        score: "89%",
                      },
                      {
                        subject: "Advanced Algebra",
                        teacher: "Ms. Johnson",
                        grade: "A+ (98%)",
                        assessment: "Quadratic Equations Quiz",
                        score: "100%",
                      },
                      {
                        subject: "Chemistry",
                        teacher: "Dr. Garcia",
                        grade: "B+ (88%)",
                        assessment: "Lab Report: Titration",
                        score: "85%",
                      },
                      {
                        subject: "Spanish III",
                        teacher: "Sra. Rodriguez",
                        grade: "A (95%)",
                        assessment: "Oral Presentation",
                        score: "94%",
                      },
                      {
                        subject: "Computer Science",
                        teacher: "Mr. Chen",
                        grade: "A (96%)",
                        assessment: "Programming Project",
                        score: "98%",
                      },
                    ].map((subject, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{subject.subject}</TableCell>
                        <TableCell>{subject.teacher}</TableCell>
                        <TableCell>{subject.grade}</TableCell>
                        <TableCell>{subject.assessment}</TableCell>
                        <TableCell>{subject.score}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div>
                <h3 className="font-medium mb-3">Academic History</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">GPA History</h4>
                    <div className="h-[150px] flex items-center justify-center bg-gray-100 rounded-md">
                      <BarChart className={`h-10 w-10 ${themeColors.accent}`} />
                      <span className="ml-2 text-gray-500">GPA Chart</span>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Freshman Year</span>
                        <span className="font-medium">3.85</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Sophomore Year (Current)</span>
                        <span className="font-medium">3.92</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Standardized Tests</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">PSAT</span>
                          <span className="text-sm font-medium">1380/1520</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "91%" }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Taken October 2022</p>
                      </div>

                      <div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">AP World History</span>
                          <span className="text-sm font-medium">5/5</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "100%" }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Taken May 2022</p>
                      </div>

                      <div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">State Math Assessment</span>
                          <span className="text-sm font-medium">Advanced</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "95%" }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Taken April 2022</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Record</CardTitle>
              <CardDescription>Attendance history and details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <div className="text-3xl font-bold mb-1">98%</div>
                  <div className="text-sm text-gray-500">Overall Attendance</div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <div className="text-3xl font-bold mb-1">3</div>
                  <div className="text-sm text-gray-500">Absences</div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <div className="text-3xl font-bold mb-1">2</div>
                  <div className="text-sm text-gray-500">Tardies</div>
                </div>
              </div>

              <h3 className="font-medium mb-3">Absence Details</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Periods</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Excused</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { date: "Feb 15, 2023", type: "Full Day", periods: "All", reason: "Illness", excused: true },
                    {
                      date: "Mar 10, 2023",
                      type: "Full Day",
                      periods: "All",
                      reason: "Medical Appointment",
                      excused: true,
                    },
                    {
                      date: "Apr 5, 2023",
                      type: "Full Day",
                      periods: "All",
                      reason: "Family Emergency",
                      excused: true,
                    },
                  ].map((absence, i) => (
                    <TableRow key={i}>
                      <TableCell>{absence.date}</TableCell>
                      <TableCell>{absence.type}</TableCell>
                      <TableCell>{absence.periods}</TableCell>
                      <TableCell>{absence.reason}</TableCell>
                      <TableCell>
                        {absence.excused ? (
                          <Badge className={`${themeColors.accentBg} text-white`}>Excused</Badge>
                        ) : (
                          <Badge variant="destructive">Unexcused</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <h3 className="font-medium mb-3 mt-6">Tardy Details</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Minutes Late</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Excused</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { date: "Jan 25, 2023", period: "Period 1", minutes: "5", reason: "Traffic", excused: true },
                    { date: "Mar 22, 2023", period: "Period 1", minutes: "8", reason: "Bus Delay", excused: true },
                  ].map((tardy, i) => (
                    <TableRow key={i}>
                      <TableCell>{tardy.date}</TableCell>
                      <TableCell>{tardy.period}</TableCell>
                      <TableCell>{tardy.minutes}</TableCell>
                      <TableCell>{tardy.reason}</TableCell>
                      <TableCell>
                        {tardy.excused ? (
                          <Badge className={`${themeColors.accentBg} text-white`}>Excused</Badge>
                        ) : (
                          <Badge variant="destructive">Unexcused</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities">
          <Card>
            <CardHeader>
              <CardTitle>Extracurricular Activities</CardTitle>
              <CardDescription>Clubs, sports, and other activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Clubs & Organizations</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Math Club</h4>
                        <Badge className={`${themeColors.secondaryBg} text-white`}>Vice President</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Member since 2021</p>
                      <p className="text-sm mt-2">
                        Participates in regional math competitions and organizes peer tutoring sessions.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Debate Team</h4>
                        <Badge className={`${themeColors.secondaryBg} text-white`}>Member</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Member since 2022</p>
                      <p className="text-sm mt-2">
                        Competes in regional debate tournaments. Specializes in policy debate format.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Student Government</h4>
                        <Badge className={`${themeColors.secondaryBg} text-white`}>Class Representative</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Member since 2022</p>
                      <p className="text-sm mt-2">
                        Represents sophomore class in student council meetings and organizes class events.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Sports & Athletics</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Tennis Team</h4>
                        <Badge className={`${themeColors.accentBg} text-white`}>Varsity</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Member since 2021</p>
                      <p className="text-sm mt-2">
                        Plays singles and doubles. Ranked #3 on team. Regional finalist in 2022.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Cross Country</h4>
                        <Badge className={`${themeColors.accentBg} text-white`}>Junior Varsity</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Member since 2022</p>
                      <p className="text-sm mt-2">Fall season athlete. Personal best 5K time: 21:45.</p>
                    </div>
                  </div>

                  <h3 className="font-medium mb-3 mt-6">Volunteer & Community Service</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium">Community Service Hours</h4>
                    <div className="text-2xl font-bold mt-1">75 hours</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "75%" }}></div>
                    </div>
                    <p className="text-sm mt-3">Activities include:</p>
                    <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                      <li>Local library reading program (25 hours)</li>
                      <li>Food bank volunteer (30 hours)</li>
                      <li>Beach cleanup initiative (10 hours)</li>
                      <li>Peer tutoring program (10 hours)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="font-medium mb-3 mt-6">Awards & Achievements</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Award</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      date: "May 2022",
                      award: "Academic Excellence Award",
                      org: "Westview High School",
                      desc: "Top GPA in Freshman Class",
                    },
                    {
                      date: "April 2022",
                      award: "Regional Math Competition - 2nd Place",
                      org: "State Math Association",
                      desc: "Individual competition for algebra",
                    },
                    {
                      date: "March 2022",
                      award: "Tennis Tournament Finalist",
                      org: "Regional Athletics Association",
                      desc: "Girls Singles Division",
                    },
                    {
                      date: "December 2021",
                      award: "Outstanding Community Service",
                      org: "City Youth Council",
                      desc: "For volunteer work at the local library",
                    },
                  ].map((award, i) => (
                    <TableRow key={i}>
                      <TableCell>{award.date}</TableCell>
                      <TableCell className="font-medium">{award.award}</TableCell>
                      <TableCell>{award.org}</TableCell>
                      <TableCell>{award.desc}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Notes & Comments</CardTitle>
              <CardDescription>Academic and behavioral observations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Ms. Parker - Advanced English</h3>
                      <p className="text-sm text-gray-500">April 28, 2023</p>
                    </div>
                    <Badge className={`${themeColors.accentBg} text-white`}>Academic</Badge>
                  </div>
                  <p className="mt-2 text-sm">
                    Emma continues to excel in class discussions and written assignments. Her recent essay on modern
                    literature showed exceptional critical thinking and analysis. She consistently helps her peers
                    during group activities and demonstrates leadership qualities.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Ms. Johnson - Advanced Algebra</h3>
                      <p className="text-sm text-gray-500">April 15, 2023</p>
                    </div>
                    <Badge className={`${themeColors.accentBg} text-white`}>Academic</Badge>
                  </div>
                  <p className="mt-2 text-sm">
                    Emma has a natural aptitude for mathematics. She grasps complex concepts quickly and often asks
                    insightful questions that benefit the entire class. I've recommended that she consider participating
                    in the upcoming state math competition.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Mr. Chen - Computer Science</h3>
                      <p className="text-sm text-gray-500">March 30, 2023</p>
                    </div>
                    <Badge className={`${themeColors.accentBg} text-white`}>Academic</Badge>
                  </div>
                  <p className="mt-2 text-sm">
                    Emma's programming project was one of the best in the class. She demonstrated excellent
                    problem-solving skills and creativity. She has expressed interest in pursuing computer science in
                    college, and I believe she has the aptitude for it.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Ms. Davis - Academic Advisor</h3>
                      <p className="text-sm text-gray-500">March 15, 2023</p>
                    </div>
                    <Badge className={`${themeColors.secondaryBg} text-white`}>Guidance</Badge>
                  </div>
                  <p className="mt-2 text-sm">
                    Had a career counseling session with Emma today. She's interested in exploring STEM fields,
                    particularly mathematics and computer science. We discussed potential college programs and summer
                    internship opportunities. She's well on track for her academic goals.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Coach Wilson - Tennis Team</h3>
                      <p className="text-sm text-gray-500">February 28, 2023</p>
                    </div>
                    <Badge className="bg-purple-500 text-white">Athletics</Badge>
                  </div>
                  <p className="mt-2 text-sm">
                    Emma has shown significant improvement in her tennis skills this season. Her dedication to practice
                    and positive attitude make her a valuable team member. She's been helping newer players with
                    technique and demonstrates excellent sportsmanship.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Button className={`${themeColors.accentBg} ${themeColors.accentHover} text-white`}>
                  <FileText className="mr-2 h-4 w-4" />
                  Add New Note
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
