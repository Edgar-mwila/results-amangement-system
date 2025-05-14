"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  Bell,
  Building,
  Calendar,
  Clock,
  Download,
  Edit,
  FileText,
  GraduationCap,
  Key,
  Lock,
  Mail,
  MapPin,
  Phone,
  Settings,
  Shield,
  User,
  Users,
} from "lucide-react"
import { themeColors } from "./ui/theme-config"

export default function AdminProfile() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center">
          <Avatar className="h-16 w-16 mr-4">
            <AvatarImage src="/placeholder.svg?height=64&width=64" />
            <AvatarFallback>RW</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Robert Williams</h1>
            <p className="text-gray-500">School Administrator • ID: A10012</p>
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
            <CardTitle className="text-sm font-medium text-gray-500">Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.accentBg}`}>
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">Principal</div>
                <p className="text-xs text-gray-500">School Administration</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.secondaryBg}`}>
                <Clock className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">15 Years</div>
                <p className="text-xs text-gray-500">In education administration</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Next Meeting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`mr-2 rounded-full p-2 ${themeColors.accentBg}`}>
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">2:00 PM</div>
                <p className="text-xs text-gray-500">School Board Meeting</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Administrator Information</CardTitle>
            <CardDescription>Personal and professional details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <User className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Full Name</h3>
                    <p className="text-sm text-gray-500">Robert James Williams</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <GraduationCap className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Education</h3>
                    <p className="text-sm text-gray-500">Ed.D. Educational Leadership, Harvard University</p>
                    <p className="text-sm text-gray-500">M.Ed. School Administration, Columbia University</p>
                    <p className="text-sm text-gray-500">B.A. Education, University of Michigan</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-sm text-gray-500">1234 Maple Avenue, Springfield, IL 62701</p>
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
                    <p className="text-sm text-gray-500">robert.williams@westviewhigh.edu</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Building className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">School</h3>
                    <p className="text-sm text-gray-500">Westview High School</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Start Date</h3>
                    <p className="text-sm text-gray-500">August 1, 2015</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <GraduationCap className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Certifications</h3>
                    <p className="text-sm text-gray-500">State Principal Certification</p>
                    <p className="text-sm text-gray-500">Educational Leadership Certification</p>
                    <p className="text-sm text-gray-500">School Management and Leadership</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Reports To</h3>
                    <p className="text-sm text-gray-500">Dr. Elizabeth Carter, Superintendent</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Key className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">System Access</h3>
                    <p className="text-sm text-gray-500">Full Administrative Access</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Recent alerts and messages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <div className={`rounded-full p-1.5 ${themeColors.accentBg} text-white mr-2 mt-0.5`}>
                    <Bell size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Budget Approval Required</h3>
                    <p className="text-xs text-gray-500 mt-1">Science department budget needs approval</p>
                    <p className="text-xs text-gray-400 mt-1">Today, 9:30 AM</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <div className={`rounded-full p-1.5 ${themeColors.secondaryBg} text-white mr-2 mt-0.5`}>
                    <Users size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">New Teacher Onboarding</h3>
                    <p className="text-xs text-gray-500 mt-1">3 new teachers need onboarding approval</p>
                    <p className="text-xs text-gray-400 mt-1">Yesterday, 2:15 PM</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <div className={`rounded-full p-1.5 ${themeColors.accentBg} text-white mr-2 mt-0.5`}>
                    <Calendar size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">School Board Meeting</h3>
                    <p className="text-xs text-gray-500 mt-1">Agenda and materials are ready for review</p>
                    <p className="text-xs text-gray-400 mt-1">May 10, 4:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <div className={`rounded-full p-1.5 bg-red-500 text-white mr-2 mt-0.5`}>
                    <Bell size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Facility Maintenance Alert</h3>
                    <p className="text-xs text-gray-500 mt-1">Gym roof repair needs immediate attention</p>
                    <p className="text-xs text-gray-400 mt-1">May 9, 11:20 AM</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <div className={`rounded-full p-1.5 ${themeColors.secondaryBg} text-white mr-2 mt-0.5`}>
                    <FileText size={14} />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Annual Report Draft</h3>
                    <p className="text-xs text-gray-500 mt-1">Annual report is ready for your review</p>
                    <p className="text-xs text-gray-400 mt-1">May 8, 9:45 AM</p>
                  </div>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4">
              View All Notifications
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="responsibilities" className="mb-6">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger
            value="responsibilities"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Responsibilities
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
            value="settings"
            className={`data-[state=active]:${themeColors.accentBg} data-[state=active]:text-white`}
          >
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="responsibilities">
          <Card>
            <CardHeader>
              <CardTitle>Administrative Responsibilities</CardTitle>
              <CardDescription>Key areas of oversight and management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">School Leadership</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">Strategic Planning</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Develop and implement the school's strategic plan, including setting goals, objectives, and
                        performance metrics.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">Policy Development</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Create, review, and update school policies and procedures to ensure compliance with district,
                        state, and federal regulations.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">Budget Management</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Oversee the school's budget, including allocation of resources, financial planning, and fiscal
                        responsibility.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Staff & Student Management</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">Staff Supervision</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Recruit, hire, evaluate, and support teaching and administrative staff. Provide professional
                        development opportunities.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">Student Affairs</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Oversee student discipline, attendance, and academic progress. Implement programs to support
                        student achievement and well-being.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">Curriculum & Instruction</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Guide curriculum development and instructional practices. Monitor and evaluate educational
                        programs for effectiveness.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="font-medium mb-3 mt-6">External Relations</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">Community Engagement</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Build relationships with parents, community members, and local organizations. Represent the school
                    at community events.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">District Coordination</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Collaborate with district administration and other school principals. Implement district initiatives
                    at the school level.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">Public Relations</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage the school's public image and communications. Address media inquiries and promote school
                    achievements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>School performance under leadership</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                  <BarChart className={`h-16 w-16 ${themeColors.accent}`} />
                  <span className="ml-2 text-gray-500">School Performance Chart</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="font-medium mb-3">Academic Performance</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Graduation Rate</span>
                          <span className="font-medium">94%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "94%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm">
                          <span>College Acceptance</span>
                          <span className="font-medium">88%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "88%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Standardized Test Scores</span>
                          <span className="font-medium">+12% above state average</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "85%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Operational Metrics</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Teacher Retention</span>
                          <span className="font-medium">92%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "92%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Budget Compliance</span>
                          <span className="font-medium">99.5%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "99.5%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Parent Satisfaction</span>
                          <span className="font-medium">4.7/5.0</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "94%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Annual Evaluation</CardTitle>
                <CardDescription>Most recent performance review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Leadership</h4>
                      <span className="font-medium">4.8/5.0</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "96%" }}></div>
                    </div>
                    <p className="text-sm mt-2 text-gray-500">
                      "Exceptional leadership skills with clear vision and direction for the school."
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Staff Management</h4>
                      <span className="font-medium">4.7/5.0</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "94%" }}></div>
                    </div>
                    <p className="text-sm mt-2 text-gray-500">
                      "Effectively manages staff, promotes professional development, and maintains high morale."
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Budget Management</h4>
                      <span className="font-medium">4.9/5.0</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "98%" }}></div>
                    </div>
                    <p className="text-sm mt-2 text-gray-500">
                      "Excellent fiscal management with strategic allocation of resources."
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Overall Rating</h4>
                      <span className="font-medium">4.8/5.0</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className={`${themeColors.accentBg} h-2 rounded-full`} style={{ width: "96%" }}></div>
                    </div>
                    <p className="text-sm mt-2 text-gray-500">
                      "An outstanding administrator who consistently exceeds expectations in all areas."
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
              <CardTitle>Professional Activities</CardTitle>
              <CardDescription>Committees, boards, and professional development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Committees & Boards</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <h4 className="font-medium">District Leadership Council</h4>
                        <Badge className={`${themeColors.secondaryBg} text-white`}>Chair</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Since 2018</p>
                      <p className="text-sm mt-2">
                        Leads monthly meetings of all district principals to coordinate initiatives, share best
                        practices, and address district-wide challenges.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <h4 className="font-medium">State Education Advisory Board</h4>
                        <Badge className={`${themeColors.secondaryBg} text-white`}>Member</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Since 2020</p>
                      <p className="text-sm mt-2">
                        Appointed to advise the State Department of Education on policy matters, curriculum standards,
                        and educational initiatives.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <h4 className="font-medium">School Safety Committee</h4>
                        <Badge className={`${themeColors.secondaryBg} text-white`}>Chair</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Since 2016</p>
                      <p className="text-sm mt-2">
                        Oversees the development and implementation of school safety protocols, emergency response
                        plans, and security measures.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Professional Development</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <h4 className="font-medium">National Association of Secondary School Principals</h4>
                        <Badge className={`${themeColors.accentBg} text-white`}>Member</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Since 2010</p>
                      <p className="text-sm mt-2">
                        Active member attending annual conferences and leadership workshops. Presented on "Building a
                        Positive School Culture" at the 2022 conference.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Harvard Principal Leadership Institute</h4>
                        <Badge className={`${themeColors.accentBg} text-white`}>Participant</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Summer 2021</p>
                      <p className="text-sm mt-2">
                        Completed intensive leadership training focused on instructional leadership, organizational
                        management, and school improvement strategies.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Educational Technology Leadership</h4>
                        <Badge className={`${themeColors.accentBg} text-white`}>Certificate</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Completed 2022</p>
                      <p className="text-sm mt-2">
                        Earned certification in educational technology leadership. Implemented comprehensive technology
                        plan for the school, including 1:1 device program.
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
                      achievement: "Administrator of the Year",
                      org: "State Education Association",
                      desc: "Recognized for excellence in school leadership and student outcomes",
                    },
                    {
                      date: "March 2022",
                      achievement: "School of Excellence Award",
                      org: "National Blue Ribbon Schools Program",
                      desc: "School recognized for academic excellence under leadership",
                    },
                    {
                      date: "January 2022",
                      achievement: "Innovation in Education Grant",
                      org: "National Education Foundation",
                      desc: "Secured $250,000 grant for STEM education initiatives",
                    },
                    {
                      date: "November 2021",
                      achievement: "Published Article",
                      org: "Educational Leadership Journal",
                      desc: "Article on building effective school-community partnerships",
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

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences and access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Profile Settings</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <User className="h-5 w-5 text-gray-500 mr-2" />
                          <h4 className="font-medium">Personal Information</h4>
                        </div>
                        <Button variant="outline" size="sm">
                          <Edit size={14} className="mr-2" />
                          Edit
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Update your name, contact information, and personal details
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Lock className="h-5 w-5 text-gray-500 mr-2" />
                          <h4 className="font-medium">Password & Security</h4>
                        </div>
                        <Button variant="outline" size="sm">
                          <Edit size={14} className="mr-2" />
                          Change
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Update your password and configure two-factor authentication
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Bell className="h-5 w-5 text-gray-500 mr-2" />
                          <h4 className="font-medium">Notification Preferences</h4>
                        </div>
                        <Button variant="outline" size="sm">
                          <Settings size={14} className="mr-2" />
                          Configure
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Manage how and when you receive notifications from the system
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">System Access</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-gray-500 mr-2" />
                          <h4 className="font-medium">Access Permissions</h4>
                        </div>
                        <Badge className={`${themeColors.accentBg} text-white`}>Administrator</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        You have full administrative access to all system features and data
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 text-gray-500 mr-2" />
                          <h4 className="font-medium">Delegate Access</h4>
                        </div>
                        <Button variant="outline" size="sm">
                          <Settings size={14} className="mr-2" />
                          Manage
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Configure temporary access for assistant principals or administrative staff
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-500 mr-2" />
                          <h4 className="font-medium">Activity Log</h4>
                        </div>
                        <Button variant="outline" size="sm">
                          <FileText size={14} className="mr-2" />
                          View
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Review your account activity and system access history
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Preferences</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Settings className="h-5 w-5 text-gray-500 mr-2" />
                          <h4 className="font-medium">Display Settings</h4>
                        </div>
                        <Button variant="outline" size="sm">
                          <Settings size={14} className="mr-2" />
                          Customize
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">Adjust theme, layout, and dashboard preferences</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                          <h4 className="font-medium">Calendar Integration</h4>
                        </div>
                        <Button variant="outline" size="sm">
                          <Settings size={14} className="mr-2" />
                          Configure
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Manage calendar synchronization with external applications
                      </p>
                    </div>
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
