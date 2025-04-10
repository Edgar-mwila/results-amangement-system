import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Search, Mail, Send, Inbox } from 'lucide-react';

export const Route = createFileRoute('/teacher/communication/')({
  component: () => <CommunicationPage />,
});

type pupil = {
  id: number,
  name: string,
  parent: string
}

const CommunicationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPupil, setSelectedPupil] = useState<pupil | null>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  
  // Mock data for pupils
  const pupils = [
    { id: 1, name: 'Alice Smith', parent: 'Mr. & Mrs. Smith' },
    { id: 2, name: 'Bob Johnson', parent: 'Ms. Johnson' },
    { id: 3, name: 'Charlie Davis', parent: 'Mr. Davis' },
    { id: 4, name: 'Diana Wilson', parent: 'Dr. Wilson' },
  ];
  
  // Mock data for emails
  const sentEmails = [
    { id: 1, to: 'Mr. & Mrs. Smith', subject: 'Homework Reminder', date: '2025-04-08', read: true },
    { id: 2, to: 'Ms. Johnson', subject: 'Upcoming Parent-Teacher Meeting', date: '2025-04-07', read: true },
    { id: 3, to: 'Mr. Davis', subject: 'Weekly Progress Update', date: '2025-04-05', read: true },
  ];
  
  const receivedEmails = [
    { id: 1, from: 'Dr. Wilson', subject: 'Question about grades', date: '2025-04-09', read: false },
    { id: 2, from: 'Ms. Johnson', subject: 'Absence Notification', date: '2025-04-08', read: true },
    { id: 3, from: 'Mr. Davis', subject: 'Field Trip Permission', date: '2025-04-06', read: true },
  ];
  
  const filteredPupils = pupils.filter(pupil => 
    pupil.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
    setSelectedPupil(null);
  };
  
  const handleSelectPupil = (pupil: pupil) => {
    setSelectedPupil(pupil);
    setShowCompose(true);
    setSearchTerm('');
  };
  
  const handleSendEmail = () => {
    if (!selectedPupil || !subject || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    alert(`Email sent to ${selectedPupil.parent} regarding ${selectedPupil.name}`);
    setSelectedPupil(null);
    setSubject('');
    setMessage('');
    setShowCompose(false);
  };
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Teacher Communication</h1>
      
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
          <h2 className="text-xl font-semibold">Send a New Email</h2>
        </div>
        
        {!showCompose ? (
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-500" />
              </div>
              <input
                type="text"
                className="pl-10 block w-full rounded-lg border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for pupil by name"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            {searchTerm && (
              <div className="mt-2 border rounded-lg max-h-48 overflow-y-auto">
                {filteredPupils.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {filteredPupils.map(pupil => (
                      <li 
                        key={pupil.id} 
                        className="p-2 hover:bg-blue-50 cursor-pointer"
                        onClick={() => handleSelectPupil(pupil)}
                      >
                        <div className="font-medium">{pupil.name}</div>
                        <div className="text-sm text-gray-500">Parent: {pupil.parent}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="p-2 text-gray-500">No matching pupils found</p>
                )}
              </div>
            )}
          </div>
        ) : selectedPupil && (
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="w-24 font-medium">To:</span>
              <div className="flex-1">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {selectedPupil.parent} (Parent of {selectedPupil.name})
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
                  setSelectedPupil(null);
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