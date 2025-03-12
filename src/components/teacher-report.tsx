import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

type ClassInfo = {
    id: number;
    name: string;
    students: number;
    avgPerformance: number;
    subject: string;
    lastTest: string; // Assuming date is stored as a string (ISO format recommended)
  };
  
  type ContactInfo = {
    email: string;
    phone: string;
  };
  
  type PerformanceStats = {
    classes: number;
    averageScore: number;
    students: number;
    bestClass: string;
  };
  
  type RecentActivity = {
    id: number;
    type: 'task' | 'alert' | 'success'; // Restricting allowed values
    message: string;
    date: string; // Assuming date is stored as a string
  };
  
  export type TeacherData = {
    role: string | undefined;
    id: number;
    name: string;
    subject: string;
    status: 'active' | 'inactive' | 'on-leave'; // You can add more possible statuses if needed
    classes: ClassInfo[];
    qualifications: string;
    yearsOfExperience: number;
    contactInfo: ContactInfo;
    performance: PerformanceStats;
    recentActivities: RecentActivity[];
  };
  
// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#2B3674',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#707EAE',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 8,
    color: '#2B3674',
    backgroundColor: '#F4F7FE',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: '30%',
    fontSize: 12,
    color: '#707EAE',
  },
  value: {
    width: '70%',
    fontSize: 12,
    color: '#2B3674',
  },
  table: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E5F2',
    paddingVertical: 8,
  },
  tableHeader: {
    backgroundColor: '#F4F7FE',
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    textAlign: 'left',
  },
  activity: {
    marginBottom: 8,
    padding: 5,
    borderRadius: 4,
  },
});

// eslint-disable-next-line react-refresh/only-export-components
const TeacherReport: React.FC<{teacherData: TeacherData}> = ({ teacherData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Teacher Performance Report</Text>
        <Text style={styles.subtitle}>{teacherData.name} - {teacherData.subject}</Text>
      </View>

      {/* Basic Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{teacherData.status}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Qualifications:</Text>
          <Text style={styles.value}>{teacherData.qualifications}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Experience:</Text>
          <Text style={styles.value}>{teacherData.yearsOfExperience} years</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Contact:</Text>
          <Text style={styles.value}>{teacherData.contactInfo.email}</Text>
        </View>
      </View>

      {/* Performance Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Overview</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Total Classes:</Text>
          <Text style={styles.value}>{teacherData.performance.classes}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Average Score:</Text>
          <Text style={styles.value}>{teacherData.performance.averageScore}%</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total Students:</Text>
          <Text style={styles.value}>{teacherData.performance.students}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Best Performing Class:</Text>
          <Text style={styles.value}>{teacherData.performance.bestClass}</Text>
        </View>
      </View>

      {/* Class Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Class Details</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Class</Text>
            <Text style={styles.tableCell}>Students</Text>
            <Text style={styles.tableCell}>Avg. Performance</Text>
            <Text style={styles.tableCell}>Last Test</Text>
          </View>
          {teacherData.classes.map((classItem) => (
            <View key={classItem.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{classItem.name}</Text>
              <Text style={styles.tableCell}>{classItem.students}</Text>
              <Text style={styles.tableCell}>{classItem.avgPerformance}%</Text>
              <Text style={styles.tableCell}>{new Date(classItem.lastTest).toLocaleDateString()}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Activities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        {teacherData.recentActivities.map((activity) => (
          <View key={activity.id} style={[styles.activity, { backgroundColor: getActivityColor(activity.type) }]}>
            <Text style={{ fontSize: 10, color: '#2B3674' }}>
              {new Date(activity.date).toLocaleDateString()} - {activity.message}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

// Helper function to get activity background color
const getActivityColor = (type: string) => {
  switch (type) {
    case 'success':
      return '#E6F4EA';
    case 'alert':
      return '#FCE8E6';
    default:
      return '#F4F7FE';
  }
};

// Function to generate and download PDF
export const generateTeacherReport = async (teacherData: TeacherData) => {
  try {
    const blob = await pdf(<TeacherReport teacherData={teacherData} />).toBlob();
    saveAs(blob, `${teacherData.name.replace(/\s+/g, '_')}_performance_report.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF report');
  }
};