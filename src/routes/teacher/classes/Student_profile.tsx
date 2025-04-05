import { createFileRoute } from '@tanstack/react-router'

// Define the StudentProgress component with the structure you requested
const Student_profile = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>{/* Empty header for now */}</div>

      {/* Student Details Box */}
      <h2 style={styles.studentName}>John Doe</h2>
      <div style={styles.detailsBox}>
        <p>
          <strong>Age:</strong> 20
        </p>
        <p>
          <strong>Grade:</strong> Sophomore
        </p>
        <p>
          <strong>Major:</strong> Computer Science
        </p>
      </div>

      {/* Academic Performance */}
      <div style={styles.section}>
        <h3 style={styles.academicHeading}>Academic Performance</h3>
        <div style={styles.detailsBox}>
          <p>
            <strong>GPA:</strong> 3.8
          </p>
          <p>
            <strong>Subjects:</strong> Math, Physics, Programming
          </p>
          <p>
            <strong>Academic Awards:</strong> Dean's List
          </p>
        </div>
      </div>

      {/* Attendance */}
      <div style={styles.section}>
        <h3 style={styles.attendanceHeading}>Attendance</h3>
        <div style={styles.detailsBox}>
          <p>
            <strong>Overall Attendance:</strong> 95%
          </p>
          <p>
            <strong>Missed Classes:</strong> 2
          </p>
          <p>
            <strong>Recent Absences:</strong> None
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div style={styles.buttonContainer}>
        <button style={styles.greenButton}>Edit Profile</button>
        <button style={styles.purpleButton}>Generate Profile</button>
      </div>
    </div>
  )
}

// Styles
const styles = {
  container: {
    backgroundColor: '#F4F1DE',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '20px',
  },
  detailsBox: {
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  section: {
    marginBottom: '30px',
  },
  studentName: {
    fontWeight: 'bold',
    fontSize: '28px', // Increased font size for the student's name
    marginBottom: '10px',
  },
  academicHeading: {
    fontWeight: 'bold',
    fontSize: '24px', // Increased font size for "Academic Performance" heading
  },
  attendanceHeading: {
    fontWeight: 'bold',
    fontSize: '24px', // Increased font size for "Attendance" heading
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center', // Center the buttons horizontally
    gap: '20px', // Space between buttons
    marginTop: '30px',
  },
  greenButton: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#4CAF50', // Green button
    color: '#fff',
    transition: 'background-color 0.3s',
  },
  purpleButton: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#9B59B6', // Purple button
    color: '#fff',
    transition: 'background-color 0.3s',
  },
}

export const Route = createFileRoute('/teacher/classes/Student_profile')({
  component: Student_profile,
})
