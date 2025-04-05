import { createFileRoute } from '@tanstack/react-router';

const MyClasses = () => {
  return (
    <div style={{ padding: '10px', backgroundColor: '#F4F1DE' }} className='flex-1 h-screen'>
      {/* Class Title in Bold */}
      <h1 style={{ fontWeight: 'bold' }}>Class 5A - Mathematics</h1>

      {/* Three boxes in one row with space in between */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '20px', textAlign: 'center', backgroundColor: '#f9f9f9' }}>Total Students 
          <div>23</div>
          <span style={{ fontWeight: 'bold', display: 'block', fontSize: '24px', marginTop: '10px' }}></span>
        </div>
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '20px', textAlign: 'center', backgroundColor: '#f9f9f9' }}>Average Grade 
          <div>B+</div>
        </div>
        <div style={{ flex: 1, border: '1px solid #ccc', padding: '20px', textAlign: 'center', backgroundColor: '#f9f9f9' }}>Next Assessment 
          <div>May 23</div>
        </div>
      </div>

      {/* Students Section in Bold */}
      <div>
        <h2 style={{ fontWeight: 'bold' }}>Students</h2>

        {/* Table for Class Details and Student Information with borders */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #000' }}>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Class</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Current Grade</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Attendance</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>Class 5A - Mathematics</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>A</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>85%</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>Class 5A - Science</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>B+</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>90%</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
            {/* More rows can be added as needed */}
          </tbody>
        </table>
      </div>

      {/* Buttons Section */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
          Take Attendance
        </button>
        <button style={{ padding: '10px 20px', backgroundColor: '#008CBA', color: 'white', border: 'none', borderRadius: '5px' }}>
          Create Assessment
        </button>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/teacher/classes/')({
  component: MyClasses,
});
