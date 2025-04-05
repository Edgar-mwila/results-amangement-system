import { createFileRoute } from '@tanstack/react-router';

// Define the StudentProgress component with the requested structure
const StudentProgress = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.progressOverview}>Progress Overview - John Doe</h1>
      </div>

      {/* First Box (Empty for Input) */}
      <div style={styles.detailsBox}>
        <textarea placeholder="Enter details here..." style={styles.textarea}></textarea>
      </div>

      {/* Recent Assessments Section with a single border */}
      <h3 style={styles.boldText}>Recent Assessments</h3>
      <div style={styles.assessmentsBox}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.tableHeader, backgroundColor: '#F2CC8F' }}>Assessment</th>
              <th style={{ ...styles.tableHeader, backgroundColor: '#F2CC8F' }}>Date</th>
              <th style={{ ...styles.tableHeader, backgroundColor: '#F2CC8F' }}>Score</th>
              <th style={{ ...styles.tableHeader, backgroundColor: '#F2CC8F' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.tableCell}>Math Test</td>
              <td style={styles.tableCell}>2025-03-28</td>
              <td style={styles.tableCell}>85%</td>
              <td style={styles.tableCell}>
                <button style={styles.actionButton}>View</button>
                <button style={styles.actionButton}>Download</button>
              </td>
            </tr>
            <tr>
              <td style={styles.tableCell}>Physics Quiz</td>
              <td style={styles.tableCell}>2025-03-25</td>
              <td style={styles.tableCell}>92%</td>
              <td style={styles.tableCell}>
                <button style={styles.actionButton}>View</button>
                <button style={styles.actionButton}>Download</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div style={styles.buttonContainer}>
        <button style={styles.greenButton}>Generate Full Report</button>
        <button style={styles.purpleButton}>Contact Parent</button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    backgroundColor: '#F4F1DE', // Background color
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '20px',
  },
  progressOverview: {
    fontWeight: 'bold',
    fontSize: '28px', // Increased font size for "Progress Overview"
    marginBottom: '10px',
  },
  detailsBox: {
    border: '1px solid #ccc', // Single border around the first box
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    resize: 'none',
  },
  assessmentsBox: {
    border: '1px solid #ccc', // Single border around the assessments box
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  section: {
    marginBottom: '30px',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: '24px', // Increased font size for "Recent Assessments"
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse', // Ensures borders between cells are merged
  },
  tableHeader: {
    border: '1px solid #ccc',
    padding: '10px',
    textAlign: 'left',
  },
  tableCell: {
    border: '1px solid #ccc', // Adding borders to the table cells
    padding: '10px',
    textAlign: 'left',
  },
  actionButton: {
    padding: '5px 10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#9B59B6', // Purple button for actions
    color: '#fff',
    marginRight: '5px',
    transition: 'background-color 0.3s',
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
};

// Create the route using createFileRoute
export const Route = createFileRoute('/teacher/classes/Student_progress')({
  component: StudentProgress,
});
