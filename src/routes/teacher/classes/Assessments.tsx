import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

const Assessments = () => {
  const [title, setTitle] = useState('');
  const [classInput, setClassInput] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState('');

  const handleCreateAssessment = () => {
    // Logic to create an assessment, for now, we'll just log the data
    console.log({
      title,
      classInput,
      subject,
      date,
      duration,
      description,
      questions,
    });
  };

  return (
    <div className="assessment-container">
      <h1>New Assessment</h1>

      <div className="form-group">
        <div className="label">Assessment Title</div>
        <input
          type="text"
          placeholder="Enter Assessment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <div className="label">Class </div>
        <div className="split-fields">
          <input
            type="text"
            placeholder="Enter Class"
            value={classInput}
            onChange={(e) => setClassInput(e.target.value)}
          />
          <div className="label">Subject</div>
          <input
            type="text"
            placeholder="Enter Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <div className="label">Date</div>
        <div className="split-fields">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <div className="label">Duration</div>
          <input
            type="text"
            placeholder="Enter Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <div className="label">Description</div>
        <textarea
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <div className="label">Questions</div>
        <textarea
          placeholder="Enter Questions"
          value={questions}
          onChange={(e) => setQuestions(e.target.value)}
        />
      </div>

      <button className="create-btn" onClick={handleCreateAssessment}>
        Create Assessment
      </button>

      <style jsx>{`
        .assessment-container {
          font-family: Arial, sans-serif;
          padding: 20px;
          background-color: #f4f1de; /* Background color */
          height: 100vh; /* Full screen height */
        }

        h1 {
          text-align: center;
          color: #333;
          font-weight: bold;
          font-size: 28px; /* Larger and bold */
        }

        .form-group {
          margin-bottom: 20px;
        }

        .label {
          font-weight: bold;
          margin-bottom: 5px;
        }

        input,
        textarea {
          padding: 10px;
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .split-fields {
          display: flex;
          justify-content: space-between;
          gap: 10px;
        }

        .split-fields input {
          width: 48%; /* Ensures Class and Subject are side by side */
        }

        textarea {
          height: 100px;
          resize: vertical;
          width: 100%; /* Makes the textarea fill its container */
        }

        .create-btn {
          padding: 10px 20px;
          background-color: #008cba; /* Button color */
          color: white;
          border: 1px solid #008cba;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          margin-top: 20px;
        }

        .create-btn:hover {
          background-color: #007bb5; /* Darker blue on hover */
        }
      `}</style>
    </div>
  );
};

export const Route = createFileRoute('/teacher/classes/Assessments')({
  component: Assessments,
});
