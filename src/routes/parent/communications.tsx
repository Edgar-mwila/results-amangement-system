import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Search, Mail, Send, Inbox, User } from 'lucide-react';

export const Route = createFileRoute('/parent/communications')({
  component: () => <ParentCommunicationPage />,
});

type teacher = {
  id: number,
  subject: string,
  name: string,
  childId: number
}

const ParentCommunicationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<teacher | null>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  const [selectedChild, setSelectedChild] = useState<number | null>(null);
  
  // Mock data for children
  const children = [
    { id: 1, name: 'Emma Johnson', grade: '3rd Grade' },
    { id: 2, name: 'Noah Johnson', grade: '5th Grade' },
  ];
  
  // Mock data for teachers
  const teachers = [
    { id: 1, name: 'Ms. Peterson', subject: 'Homeroom Teacher', childId: 1 },
    { id: 2, name: 'Mr. Roberts', subject: 'Math Teacher', childId: 1 },
    { id: 3, name: 'Mrs. Garcia', subject: 'English Teacher', childId: 1 },
    { id: 4, name: 'Mr. Thompson', subject: 'Homeroom Teacher', childId: 2 },
    { id: 5, name: 'Ms. Williams', subject: 'Science Teacher', childId: 2 },
  ];
  
  // Mock data for emails
  const sentEmails = [
    { id: 1, to: 'Ms. Peterson', subject: 'Homework Question', date: '2025-04-08', child: 'Emma Johnson', read: true },
    { id: 2, to: 'Mr. Thompson', subject: 'Field Trip Permission', date: '2025-04-05', child: 'Noah Johnson', read: true },
  ];
  
  const receivedEmails = [
    { id: 1, from: 'Ms. Peterson', subject: 'Weekly Class Update', date: '2025-04-09', child: 'Emma Johnson', read: false },
    { id: 2, from: 'Mrs. Garcia', subject: 'Reading Assignment', date: '2025-04-07', child: 'Emma Johnson', read: true },
    { id: 3, from: 'Mr. Thompson', subject: 'Science Fair Information', date: '2025-04-06', child: 'Noah Johnson', read: true },
  ];
  
  const handleChildSelect = (childId: number) => {
    setSelectedChild(childId);
    setSelectedTeacher(null);
    setSearchTerm('');
  };
  
  const filteredTeachers = selectedChild 
    ? teachers.filter(teacher => 
        teacher.childId === selectedChild && 
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };
  
  const handleSelectTeacher = (teacher: teacher) => {
    setSelectedTeacher(teacher);
    setShowCompose(true);
    setSearchTerm('');
  };
  
  const handleSendEmail = () => {
    if (!selectedTeacher || !subject || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    const childName = children.find(child => child.id === selectedChild)?.name;
    alert(`Email sent to ${selectedTeacher.name} regarding ${childName}`);
    setShowCompose(false);
    setSubject('');
    setMessage('');
  };
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Parent Communication</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Sent Emails */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center mb-4">
            <Send size={20} className="text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold">Sent Emails</h2>
          </div>
          
          {sentEmails.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {sentEmails.map(email => (
                <li key={email.id} className="py-3 hover:bg-gray-50 cursor-pointer rounded px-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{email.to}</span>
                    <span className="text-sm text-gray-500">{email.date}</span>
                  </div>
                  <div className="text-sm">{email.subject}</div>
                  <div className="text-xs text-gray-500 mt-1">Re: {email.child}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">No sent emails</p>
          )}
        </div>
        
        {/* Received Emails */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center mb-4">
            <Inbox size={20} className="text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold">Received Emails</h2>
          </div>
          
          {receivedEmails.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {receivedEmails.map(email => (
                <li key={email.id} className="py-3 hover:bg-gray-50 cursor-pointer rounded px-2">
                  <div className="flex justify-between">
                    <span className={`font-medium ${!email.read ? 'text-blue-600' : ''}`}>
                      {email.from}
                      {!email.read && <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">New</span>}
                    </span>
                    <span className="text-sm text-gray-500">{email.date}</span>
                  </div>
                  <div className="text-sm">{email.subject}</div>
                  <div className="text-xs text-gray-500 mt-1">Re: {email.child}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">No received emails</p>
          )}
        </div>
      </div>
      
      {/* Send New Email Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <Mail size={20} className="text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold">Contact a Teacher</h2>
        </div>
        
        {!showCompose ? (
          <>
            {/* Child Selection */}
            {children.length > 1 && !selectedChild && (
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Select your child:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {children.map(child => (
                    <div 
                      key={child.id} 
                      className="border rounded-lg p-3 hover:bg-blue-50 cursor-pointer flex items-center"
                      onClick={() => handleChildSelect(child.id)}
                    >
                      <User size={20} className="text-blue-600 mr-2" />
                      <div>
                        <div className="font-medium">{child.name}</div>
                        <div className="text-sm text-gray-500">{child.grade}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Single child auto-select */}
            {children.length === 1 && !selectedChild && (
              <div className="mb-4">
                {(() => {
                  handleChildSelect(children[0].id);
                  return null;
                })()}
              </div>
            )}
            
            {/* Teacher Search */}
            {selectedChild && (
              <div>
                <div className="flex items-center mb-4">
                  <span className="text-lg font-medium">
                    For: {children.find(child => child.id === selectedChild)?.name}
                  </span>
                  <button 
                    className="ml-2 text-sm text-blue-600 hover:underline"
                    onClick={() => setSelectedChild(null)}
                  >
                    Change
                  </button>
                </div>
                
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    className="pl-10 block w-full rounded-lg border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search for teacher by name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                
                <div className="border rounded-lg max-h-48 overflow-y-auto">
                  {filteredTeachers.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {filteredTeachers.map(teacher => (
                        <li 
                          key={teacher.id} 
                          className="p-3 hover:bg-blue-50 cursor-pointer"
                          onClick={() => handleSelectTeacher(teacher)}
                        >
                          <div className="font-medium">{teacher.name}</div>
                          <div className="text-sm text-gray-500">{teacher.subject}</div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="p-3 text-gray-500">
                      {searchTerm ? "No matching teachers found" : "Select a teacher from the list"}
                    </p>
                  )}
                </div>
              </div>
            )}
          </>
        ) : selectedTeacher && (
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="w-24 font-medium">To:</span>
              <div className="flex-1">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {selectedTeacher.name} ({selectedTeacher.subject})
                </span>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="w-24 font-medium">Regarding:</span>
              <div className="flex-1">
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {children.find(child => child.id === selectedChild)?.name}
                </span>
              </div>
            </div>
            
            <div className="flex items-center">
              <span className="w-24 font-medium">Subject:</span>
              <input
                type="text"
                className="flex-1 rounded-lg border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            
            <div>
              <textarea
                className="w-full rounded-lg border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-32"
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                onClick={() => {
                  setShowCompose(false);
                  setSelectedTeacher(null);
                  setSubject('');
                  setMessage('');
                }}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleSendEmail}
              >
                Send Email
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};