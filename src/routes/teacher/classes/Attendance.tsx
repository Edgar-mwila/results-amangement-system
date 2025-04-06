import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

const Attendance_management = () => {
  const [date, setDate] = useState('')
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', status: '', notes: '' },
    { id: 2, name: 'Jane Smith', status: '', notes: '' },
    { id: 3, name: 'Mark Johnson', status: '', notes: '' },
  ])

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value)
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>, studentId: number) => {
    const updatedStudents = students.map((student) =>
      student.id === studentId
        ? { ...student, status: e.target.value }
        : student,
    )
    setStudents(updatedStudents)
  }

  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>, studentId: number) => {
    const updatedStudents = students.map((student) =>
      student.id === studentId
        ? { ...student, notes: e.target.value }
        : student,
    )
    setStudents(updatedStudents)
  }

  const handleSaveAttendance = () => {
    // Logic to save attendance, for now, we just log the data
    console.log('Attendance saved for date:', date)
    console.log(students)
  }

  return (
    <div className="attendance-container">
      <h1>Class 5A Attendance</h1>
      <div className="date-picker">
        <label htmlFor="attendance-date">Select Date: </label>
        <input
          id="attendance-date"
          type="date"
          value={date}
          onChange={handleDateChange}
        />
      </div>
      <table className="attendance-table">
        <thead>
          <tr className="table-header">
            <th>Student Name</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>
                <select
                  value={student.status}
                  onChange={(e) => handleStatusChange(e, student.id)}
                >
                  <option value="">Select Status</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  value={student.notes}
                  onChange={(e) => handleNotesChange(e, student.id)}
                  placeholder="Add notes"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="save-btn" onClick={handleSaveAttendance}>
        Save Attendance
      </button>

      <style >{`
        .attendance-container {
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

        .date-picker {
          margin-bottom: 20px;
          display: flex;
          align-items: center; /* Align label and input on the same line */
          gap: 10px; /* Set a small gap between label and input */
        }

        .date-picker label {
          font-weight: bold;
        }

        .attendance-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          border: 1px solid #ccc; /* Border around the table */
        }

        .attendance-table th,
        .attendance-table td {
          padding: 10px;
          text-align: left;
          border: 1px solid #ccc; /* Border around each cell */
        }

        .table-header {
          background-color: #f2cc8f; /* Custom color for the header row */
        }

        .attendance-table td {
          background-color: #ffffff;
        }

        .attendance-table select,
        .attendance-table input {
          padding: 8px;
          width: 100%;
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .attendance-table input[type='text'] {
          height: 30px;
        }

        .save-btn {
          padding: 10px 20px;
          background-color: #008cba; /* Button color */
          color: white;
          border: 1px solid #008cba;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          margin-top: 20px;
        }

        .save-btn:hover {
          background-color: #007bb5; /* Darker blue on hover */
        }
      `}</style>
    </div>
  )
}

export const Route = createFileRoute('/teacher/classes/Attendance')({
  component: Attendance_management,
})
