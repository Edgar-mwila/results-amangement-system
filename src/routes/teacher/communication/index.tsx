import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

// Communication Page Component
const Communication = () => {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSendMessage = () => {
    // Logic to handle message sending (e.g., API call)
    console.log('Message sent:', { name, subject, body });
    // Reset the form fields after sending
    setMessage('');
    setName('');
    setSubject('');
    setBody('');
  };

  return (
    <div style={{ padding: '20px' , backgroundColor: '#F4F1DE'}}>
      {/* Message Header */}
      <div style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '20px' }}>Message</div>
      
      {/* Message Input */}
      <div style={{ marginBottom: '20px' }}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
          rows={5}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
      </div>

      {/* New Message Section */}
      <div style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '20px' }}>New Message</div>
      
      {/* Name Input with 'To:' label */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <div style={{ fontWeight: 'bold', marginRight: '10px' }}>To:</div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter the recipient's name"
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
      </div>

      {/* Subject Input with 'Subject:' label */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <div style={{ fontWeight: 'bold', marginRight: '10px' }}>Subject:</div>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter the subject"
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
      </div>

      {/* Message Body Input */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontWeight: 'bold', marginRight: '10px', fontSize:'24px' }}>Message</div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Type your message body"
          rows={5}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
      </div>

      {/* Send Message Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button
          onClick={handleSendMessage}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/teacher/communication/')({
  component: Communication,
});
