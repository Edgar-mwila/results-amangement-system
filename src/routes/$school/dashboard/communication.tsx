import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  Search,
  Mail,
  Send,
  Inbox,
  User,
  Users,
  School,
  Calendar,
} from 'lucide-react'

export const Route = createFileRoute('/$school/dashboard/communication')({
  component: () => <CommunicationPage />,
})

type Teacher = {
  id: number
  subject: string
  name: string
  childId?: number
  email: string
}

type Child = {
  id: number
  name: string
  grade: string
  parentId?: number
  teacherId?: number
}

type Parent = {
  id: number
  name: string
  email: string
  children: number[]
}

type Admin = {
  id: number
  name: string
  email: string
  department: string
}

type Email = {
  id: number
  to: string
  from: string
  subject: string
  date: string
  message: string
  read: boolean
  childId?: number
  childName?: string
  role?: string
}

const CommunicationPage = () => {
  // Get user from localStorage
  const user = {
    name: localStorage.getItem('user') || 'Admin User',
    role:
      localStorage.getItem('userRole') ||
      ('admin' as 'admin' | 'teacher' | 'parent'),
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRecipient, setSelectedRecipient] = useState<
    Teacher | Parent | Admin | null
  >(null)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [showCompose, setShowCompose] = useState(false)
  const [selectedChild, setSelectedChild] = useState<number | null>(null)
  const [emails, setEmails] = useState<Email[]>([])
  const [sentEmails, setSentEmails] = useState<Email[]>([])
  const [receivedEmails, setReceivedEmails] = useState<Email[]>([])
  const [recipients, setRecipients] = useState<(Teacher | Parent | Admin)[]>([])
  const [activeTab, setActiveTab] = useState<'inbox' | 'sent' | 'compose'>(
    'inbox',
  )

  // Mock data for different user types
  const children: Child[] = [
    {
      id: 1,
      name: 'Emma Johnson',
      grade: '3rd Grade',
      parentId: 1,
      teacherId: 1,
    },
    {
      id: 2,
      name: 'Noah Johnson',
      grade: '5th Grade',
      parentId: 1,
      teacherId: 4,
    },
    {
      id: 3,
      name: 'Olivia Smith',
      grade: '2nd Grade',
      parentId: 2,
      teacherId: 2,
    },
    {
      id: 4,
      name: 'Liam Brown',
      grade: '4th Grade',
      parentId: 3,
      teacherId: 3,
    },
  ]

  const teachers: Teacher[] = [
    {
      id: 1,
      name: 'Ms. Peterson',
      subject: 'Homeroom Teacher',
      email: 'peterson@school.edu',
    },
    {
      id: 2,
      name: 'Mr. Roberts',
      subject: 'Math Teacher',
      email: 'roberts@school.edu',
    },
    {
      id: 3,
      name: 'Mrs. Garcia',
      subject: 'English Teacher',
      email: 'garcia@school.edu',
    },
    {
      id: 4,
      name: 'Mr. Thompson',
      subject: 'Homeroom Teacher',
      email: 'thompson@school.edu',
    },
    {
      id: 5,
      name: 'Ms. Williams',
      subject: 'Science Teacher',
      email: 'williams@school.edu',
    },
  ]

  const parents: Parent[] = [
    {
      id: 1,
      name: 'Jennifer Johnson',
      email: 'jjohnson@email.com',
      children: [1, 2],
    },
    { id: 2, name: 'Michael Smith', email: 'msmith@email.com', children: [3] },
    { id: 3, name: 'Sarah Brown', email: 'sbrown@email.com', children: [4] },
  ]

  const admins: Admin[] = [
    {
      id: 1,
      name: 'Principal Davies',
      email: 'principal@school.edu',
      department: 'Administration',
    },
    {
      id: 2,
      name: 'Dr. Martinez',
      email: 'martinez@school.edu',
      department: 'Curriculum',
    },
    {
      id: 3,
      name: 'Mrs. Chen',
      email: 'chen@school.edu',
      department: 'Student Affairs',
    },
  ]

  // Mock email data - to be filtered based on the user role
  const allEmails: Email[] = [
    {
      id: 1,
      from: 'Ms. Peterson',
      to: 'Jennifer Johnson',
      subject: 'Weekly Class Update',
      message: 'Emma has been doing great in class this week...',
      date: '2025-04-09',
      childName: 'Emma Johnson',
      childId: 1,
      read: false,
    },
    {
      id: 2,
      from: 'Jennifer Johnson',
      to: 'Ms. Peterson',
      subject: 'Homework Question',
      message: "I had a question about Emma's math homework...",
      date: '2025-04-08',
      childName: 'Emma Johnson',
      childId: 1,
      read: true,
    },
    {
      id: 3,
      from: 'Mrs. Garcia',
      to: 'Jennifer Johnson',
      subject: 'Reading Assignment',
      message: 'Emma needs to complete the reading assignment by Friday...',
      date: '2025-04-07',
      childName: 'Emma Johnson',
      childId: 1,
      read: true,
    },
    {
      id: 4,
      from: 'Jennifer Johnson',
      to: 'Mr. Thompson',
      subject: 'Field Trip Permission',
      message: 'I am giving permission for Noah to attend the field trip...',
      date: '2025-04-05',
      childName: 'Noah Johnson',
      childId: 2,
      read: true,
    },
    {
      id: 5,
      from: 'Mr. Thompson',
      to: 'Jennifer Johnson',
      subject: 'Science Fair Information',
      message: 'Here is the information about the upcoming science fair...',
      date: '2025-04-06',
      childName: 'Noah Johnson',
      childId: 2,
      read: true,
    },
    {
      id: 6,
      from: 'Principal Davies',
      to: 'All Parents',
      subject: 'School Closure Notification',
      message: 'The school will be closed on Monday due to maintenance...',
      date: '2025-04-10',
      read: false,
      role: 'admin',
    },
    {
      id: 7,
      from: 'Mrs. Chen',
      to: 'Ms. Peterson',
      subject: 'Student Behavior',
      message: "Can we discuss Emma Johnson's progress in your class?",
      date: '2025-04-09',
      childName: 'Emma Johnson',
      childId: 1,
      read: true,
      role: 'admin',
    },
    {
      id: 8,
      from: 'Ms. Peterson',
      to: 'Principal Davies',
      subject: 'Class Field Trip Request',
      message: 'I would like to request approval for a field trip...',
      date: '2025-04-07',
      read: true,
      role: 'teacher',
    },
  ]

  // Set up data based on user role
  useEffect(() => {
    // Filter emails based on user role
    let userEmails: Email[] = []
    let userRecipients: (Teacher | Parent | Admin)[] = []

    switch (user.role) {
      case 'parent':
        // Find the parent
        const parent = parents.find((p) => p.name === user.name) || parents[0]

        // Filter emails for this parent
        userEmails = allEmails.filter(
          (email) =>
            email.to === parent.name ||
            email.from === parent.name ||
            email.to === 'All Parents',
        )

        // Set available recipients - teachers of their children + admins
        const parentChildrenIds = parent.children || []
        const relevantTeacherIds = children
          .filter((child) => parentChildrenIds.includes(child.id))
          .map((child) => child.teacherId)
          .filter((id): id is number => id !== undefined)

        userRecipients = [
          ...teachers.filter((teacher) =>
            relevantTeacherIds.includes(teacher.id),
          ),
          ...admins,
        ]
        break

      case 'teacher':
        // Find the teacher
        const teacher =
          teachers.find((t) => t.name === user.name) || teachers[0]

        // Filter emails for this teacher
        userEmails = allEmails.filter(
          (email) =>
            email.to === teacher.name ||
            email.from === teacher.name ||
            email.to === 'All Teachers',
        )

        // Set available recipients - parents of their students + admins
        const teacherChildrenIds = children
          .filter((child) => child.teacherId === teacher.id)
          .map((child) => child.id)

        const relevantParentIds = children
          .filter((child) => teacherChildrenIds.includes(child.id))
          .map((child) => child.parentId)
          .filter((id): id is number => id !== undefined)

        userRecipients = [
          ...parents.filter((parent) => relevantParentIds.includes(parent.id)),
          ...admins,
        ]
        break

      case 'admin':
        // Admin can see all emails and contact anyone
        userEmails = allEmails
        userRecipients = [...teachers, ...parents]
        break
    }

    setEmails(userEmails)

    // Split emails into sent and received
    setSentEmails(userEmails.filter((email) => email.from === user.name))
    setReceivedEmails(
      userEmails.filter(
        (email) => email.to === user.name || email.to.includes('All'),
      ),
    )

    // Set available recipients
    setRecipients(userRecipients)
  }, [user.role, user.name])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value)
  }

  const handleChildSelect = (childId: number) => {
    setSelectedChild(childId)
    setSelectedRecipient(null)
    setSearchTerm('')
  }

  const handleSelectRecipient = (recipient: Teacher | Parent | Admin) => {
    setSelectedRecipient(recipient)
    setShowCompose(true)
    setSearchTerm('')
    setActiveTab('compose')
  }

  const handleSendEmail = () => {
    if (!selectedRecipient || !subject || !message) {
      alert('Please fill in all fields')
      return
    }

    // Create a new email object
    const newEmail: Email = {
      id: Math.max(...emails.map((e) => e.id), 0) + 1,
      from: user.name,
      to: selectedRecipient.name,
      subject: subject,
      message: message,
      date: new Date().toISOString().split('T')[0],
      read: false,
      childName: selectedChild
        ? children.find((c) => c.id === selectedChild)?.name
        : undefined,
      childId: selectedChild || undefined,
    }

    // Add the new email to the lists
    setSentEmails([newEmail, ...sentEmails])
    setEmails([newEmail, ...emails])

    // Reset form
    alert(
      `Email sent to ${selectedRecipient.name}${selectedChild ? ' regarding ' + children.find((c) => c.id === selectedChild)?.name : ''}`,
    )
    setShowCompose(false)
    setSubject('')
    setMessage('')
    setActiveTab('sent')
  }

  // Filter recipients based on search term and role
  const filteredRecipients = recipients.filter((recipient) =>
    recipient.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get children based on user role
  const getUserChildren = () => {
    if (user.role === 'parent') {
      const parent = parents.find((p) => p.name === user.name) || parents[0]
      return children.filter((child) => parent.children.includes(child.id))
    } else if (user.role === 'teacher') {
      const teacher = teachers.find((t) => t.name === user.name) || teachers[0]
      return children.filter((child) => child.teacherId === teacher.id)
    }
    return children // Admin can see all children
  }

  const userChildren = getUserChildren()

  // Role-specific title
  const getTitle = () => {
    switch (user.role) {
      case 'parent':
        return 'Parent Communication Portal'
      case 'teacher':
        return 'Teacher Communication Portal'
      case 'admin':
        return 'School Communication Management'
      default:
        return 'Communication Portal'
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-400">{getTitle()}</h1>

      {/* Navigation Tabs */}
      <div className="flex mb-6 border-b">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'inbox'
              ? 'border-b-2 border-green-400 text-green-400'
              : 'text-gray-500 hover:text-green-400'
          }`}
          onClick={() => setActiveTab('inbox')}
        >
          <div className="flex items-center">
            <Inbox size={18} className="mr-2" />
            Inbox
            {receivedEmails.some((e) => !e.read) && (
              <span className="ml-2 bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                New
              </span>
            )}
          </div>
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'sent'
              ? 'border-b-2 border-green-400 text-green-400'
              : 'text-gray-500 hover:text-green-400'
          }`}
          onClick={() => setActiveTab('sent')}
        >
          <div className="flex items-center">
            <Send size={18} className="mr-2" />
            Sent
          </div>
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'compose'
              ? 'border-b-2 border-green-400 text-green-400'
              : 'text-gray-500 hover:text-green-400'
          }`}
          onClick={() => {
            setActiveTab('compose')
            setShowCompose(false)
            setSelectedRecipient(null)
          }}
        >
          <div className="flex items-center">
            <Mail size={18} className="mr-2" />
            Compose
          </div>
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'inbox' && (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center mb-4">
            <Inbox size={20} className="text-green-400 mr-2" />
            <h2 className="text-xl font-semibold">Inbox</h2>
          </div>

          {receivedEmails.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {receivedEmails.map((email) => (
                <li
                  key={email.id}
                  className="py-3 hover:bg-gray-50 cursor-pointer rounded px-2"
                >
                  <div className="flex justify-between">
                    <span
                      className={`font-medium ${!email.read ? 'text-green-500' : ''}`}
                    >
                      {email.from}
                      {!email.read && (
                        <span className="ml-2 bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                          New
                        </span>
                      )}
                    </span>
                    <span className="text-sm text-gray-500">{email.date}</span>
                  </div>
                  <div className="text-sm">{email.subject}</div>
                  {email.childName && (
                    <div className="text-xs text-gray-500 mt-1">
                      Re: {email.childName}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">No received emails</p>
          )}
        </div>
      )}

      {activeTab === 'sent' && (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center mb-4">
            <Send size={20} className="text-green-400 mr-2" />
            <h2 className="text-xl font-semibold">Sent</h2>
          </div>

          {sentEmails.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {sentEmails.map((email) => (
                <li
                  key={email.id}
                  className="py-3 hover:bg-gray-50 cursor-pointer rounded px-2"
                >
                  <div className="flex justify-between">
                    <span className="font-medium">To: {email.to}</span>
                    <span className="text-sm text-gray-500">{email.date}</span>
                  </div>
                  <div className="text-sm">{email.subject}</div>
                  {email.childName && (
                    <div className="text-xs text-gray-500 mt-1">
                      Re: {email.childName}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">No sent emails</p>
          )}
        </div>
      )}

      {activeTab === 'compose' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Mail size={20} className="text-green-400 mr-2" />
            <h2 className="text-xl font-semibold">
              {showCompose ? 'Compose Message' : 'Contact Someone'}
            </h2>
          </div>

          {!showCompose ? (
            <>
              {/* Child Selection for Parents or Teachers */}
              {(user.role === 'parent' || user.role === 'teacher') &&
                userChildren.length > 0 &&
                !selectedChild && (
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-2">
                      {user.role === 'parent'
                        ? 'Select your child:'
                        : 'Select student:'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {userChildren.map((child) => (
                        <div
                          key={child.id}
                          className="border rounded-lg p-3 hover:bg-green-50 cursor-pointer flex items-center"
                          onClick={() => handleChildSelect(child.id)}
                        >
                          <User size={20} className="text-green-400 mr-2" />
                          <div>
                            <div className="font-medium">{child.name}</div>
                            <div className="text-sm text-gray-500">
                              {child.grade}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Skip child selection if not needed */}
              {(user.role === 'admin' ||
                userChildren.length === 0 ||
                selectedChild) && (
                <div>
                  {selectedChild && (
                    <div className="flex items-center mb-4">
                      <span className="text-lg font-medium">
                        Regarding:{' '}
                        {
                          children.find((child) => child.id === selectedChild)
                            ?.name
                        }
                      </span>
                      <button
                        className="ml-2 text-sm text-green-400 hover:underline"
                        onClick={() => setSelectedChild(null)}
                      >
                        Change
                      </button>
                    </div>
                  )}

                  <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      className="pl-10 block w-full rounded-lg border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                      placeholder={`Search for ${user.role === 'parent' ? 'teacher' : user.role === 'teacher' ? 'parent' : 'recipient'} by name`}
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>

                  <div className="border rounded-lg max-h-48 overflow-y-auto">
                    {filteredRecipients.length > 0 ? (
                      <ul className="divide-y divide-gray-200">
                        {filteredRecipients.map((recipient) => (
                          <li
                            key={
                              'id' in recipient ? recipient.id : Math.random()
                            }
                            className="p-3 hover:bg-green-50 cursor-pointer"
                            onClick={() => handleSelectRecipient(recipient)}
                          >
                            <div className="font-medium">{recipient.name}</div>
                            <div className="text-sm text-gray-500">
                              {'subject' in recipient
                                ? recipient.subject
                                : 'department' in recipient
                                  ? recipient.department
                                  : 'Parent'}
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="p-3 text-gray-500">
                        {searchTerm
                          ? 'No matching recipients found'
                          : 'Select a recipient from the list'}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            selectedRecipient && (
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="w-24 font-medium">To:</span>
                  <div className="flex-1">
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                      {selectedRecipient.name} (
                      {'subject' in selectedRecipient
                        ? selectedRecipient.subject
                        : 'department' in selectedRecipient
                          ? selectedRecipient.department
                          : 'Parent'}
                      )
                    </span>
                  </div>
                </div>

                {selectedChild && (
                  <div className="flex items-center">
                    <span className="w-24 font-medium">Regarding:</span>
                    <div className="flex-1">
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {
                          children.find((child) => child.id === selectedChild)
                            ?.name
                        }
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <span className="w-24 font-medium">Subject:</span>
                  <input
                    type="text"
                    className="flex-1 rounded-lg border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                    placeholder="Email subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div>
                  <textarea
                    className="w-full rounded-lg border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 min-h-32"
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    onClick={() => {
                      setShowCompose(false)
                      setSelectedRecipient(null)
                      setSubject('')
                      setMessage('')
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-500"
                    onClick={handleSendEmail}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* Role-specific information section */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
        <div className="flex items-center mb-2">
          {user.role === 'admin' ? (
            <School size={20} className="text-green-400 mr-2" />
          ) : user.role === 'teacher' ? (
            <Users size={20} className="text-green-400 mr-2" />
          ) : (
            <Calendar size={20} className="text-green-400 mr-2" />
          )}
          <h3 className="text-lg font-medium text-green-600">
            {user.role === 'admin'
              ? 'Administration Tools'
              : user.role === 'teacher'
                ? 'Teacher Resources'
                : 'Parent Resources'}
          </h3>
        </div>

        {user.role === 'admin' && (
          <p className="text-green-800">
            As an administrator, you can communicate with all teachers and
            parents. Use this system to send announcements, coordinate events,
            and address concerns.
          </p>
        )}

        {user.role === 'teacher' && (
          <p className="text-green-800">
            Keep parents informed about student progress, upcoming assignments,
            and classroom activities. Regular communication helps create a
            supportive learning environment.
          </p>
        )}

        {user.role === 'parent' && (
          <p className="text-green-800">
            Stay connected with your child's teachers. Don't hesitate to ask
            questions about assignments, schedule parent-teacher conferences, or
            discuss any concerns.
          </p>
        )}
      </div>
    </div>
  )
}
