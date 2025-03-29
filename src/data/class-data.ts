// Sample data
export const classData = {
    id: 1,
    name: 'Class 10A',
    classTeacher: 'Ms. Emily Richards',
    occupancy: 30,
    optimumCapacity: 35,
    assignedClassroom: 'Room 201',
    description: 'Pure Sciences Stream with Specialization in Physics and Chemistry',
    subjects: [
      { 
        id: 1, 
        name: 'Mathematics', 
        code: 'ECZ-MTH-10',
        teacher: 'Mr. John Smith',
        description: 'Advanced Mathematics covering Algebra, Geometry, and Calculus',
        examinationType: 'Written and Practical',
        hoursPerWeek: 8
      },
      { 
        id: 2, 
        name: 'Physics', 
        code: 'ECZ-PHY-10',
        teacher: 'Dr. Patricia Scott',
        description: 'Comprehensive Physics covering Mechanics, Thermodynamics, and Electromagnetism',
        examinationType: 'Written, Practical, and Project-based',
        hoursPerWeek: 6
      },
      { 
        id: 3, 
        name: 'Chemistry', 
        code: 'ECZ-CHM-10',
        teacher: 'Dr. Robert Johnson',
        description: 'Organic, Inorganic, and Physical Chemistry with Lab Experiments',
        examinationType: 'Written and Laboratory Assessment',
        hoursPerWeek: 6
      },
      { 
        id: 4, 
        name: 'Biology', 
        code: 'ECZ-BIO-10',
        teacher: 'Ms. Laura Chen',
        description: 'Advanced Biology covering Genetics, Ecosystems, and Human Physiology',
        examinationType: 'Written, Practical, and Fieldwork',
        hoursPerWeek: 5
      },
      { 
        id: 5, 
        name: 'English Language', 
        code: 'ECZ-ENG-10',
        teacher: 'Mr. Brian Miller',
        description: 'Comprehensive English covering Literature, Grammar, and Composition',
        examinationType: 'Written and Oral',
        hoursPerWeek: 4
      },
    ],
    totalStudents: 30,
    averagePerformance: 82,
    upcomingTests: [
      { 
        id: 1, 
        name: 'Mid-term Exam', 
        subject: 'Mathematics',
        date: '2023-05-15',
        duration: '2 hours',
        totalMarks: 100
      },
      { 
        id: 2, 
        name: 'Chapter 5 Quiz', 
        subject: 'Physics',
        date: '2023-05-22',
        duration: '45 minutes',
        totalMarks: 30
      },
      { 
        id: 3, 
        name: 'Geometry Assessment', 
        subject: 'Mathematics',
        date: '2023-06-01',
        duration: '1 hour',
        totalMarks: 50
      },
      { 
        id: 4, 
        name: 'Algebra Review Test', 
        subject: 'Mathematics',
        date: '2023-06-08',
        duration: '1 hour',
        totalMarks: 50
      },
      { 
        id: 5, 
        name: 'Final Project Submission', 
        subject: 'Chemistry',
        date: '2023-06-15',
        duration: 'Semester-long',
        totalMarks: 100
      },
    ],
    pastTests: [
      { 
        id: 6, 
        name: 'Chapter 4 Quiz', 
        subject: 'Physics',
        date: '2023-04-30', 
        averageScore: 78,
        highestScore: 98,
        lowestScore: 55,
        mean: 78.3,
        median: 80,
        mode: 82,
        bestStudent: 'Alex Johnson',
        worstStudent: 'Ava Kim',
        studentScores: [
          { student: 'Alex Johnson', score: 98 },
          { student: 'Sarah Martinez', score: 85 },
          { student: 'Emily Chen', score: 92 },
          { student: 'Michael Brown', score: 76 },
          { student: 'Sophia Patel', score: 68 },
          { student: 'Olivia Lee', score: 72 },
          { student: 'Jackson Hall', score: 94 },
          { student: 'Ava Kim', score: 55 },
          { student: 'Ethan Hall', score: 82 },
          { student: 'Lily Tran', score: 82 },
        ]
      },
      { 
        id: 7, 
        name: 'Pop Quiz', 
        subject: 'Chemistry',
        date: '2023-04-15', 
        averageScore: 85,
        highestScore: 100,
        lowestScore: 70,
        mean: 85.2,
        median: 86,
        mode: 88,
        bestStudent: 'Jackson Hall',
        worstStudent: 'Sophia Patel',
        studentScores: [
          { student: 'Alex Johnson', score: 92 },
          { student: 'Sarah Martinez', score: 88 },
          { student: 'Emily Chen', score: 95 },
          { student: 'Michael Brown', score: 80 },
          { student: 'Sophia Patel', score: 70 },
          { student: 'Olivia Lee', score: 85 },
          { student: 'Jackson Hall', score: 100 },
          { student: 'Ava Kim', score: 75 },
          { student: 'Ethan Hall', score: 88 },
          { student: 'Lily Tran', score: 88 },
        ]
      },
      { 
        id: 8, 
        name: 'Trigonometry Mid-Chapter Test', 
        subject: 'Mathematics',
        date: '2023-03-25', 
        averageScore: 80,
        highestScore: 96,
        lowestScore: 65,
        mean: 80.1,
        median: 81,
        mode: 82,
        bestStudent: 'Emily Chen',
        worstStudent: 'Ava Kim',
        studentScores: [
          { student: 'Alex Johnson', score: 94 },
          { student: 'Sarah Martinez', score: 78 },
          { student: 'Emily Chen', score: 96 },
          { student: 'Michael Brown', score: 82 },
          { student: 'Sophia Patel', score: 70 },
          { student: 'Olivia Lee', score: 75 },
          { student: 'Jackson Hall', score: 92 },
          { student: 'Ava Kim', score: 65 },
          { student: 'Ethan Hall', score: 82 },
          { student: 'Lily Tran', score: 87 },
        ]
      },
      { 
        id: 9, 
        name: 'Math Olympiad Practice Test', 
        subject: 'Mathematics',
        date: '2023-03-18', 
        averageScore: 90,
        highestScore: 100,
        lowestScore: 78,
        mean: 90.3,
        median: 92,
        mode: 95,
        bestStudent: 'Alex Johnson',
        worstStudent: 'Sophia Patel',
        studentScores: [
          { student: 'Alex Johnson', score: 100 },
          { student: 'Sarah Martinez', score: 88 },
          { student: 'Emily Chen', score: 98 },
          { student: 'Michael Brown', score: 85 },
          { student: 'Sophia Patel', score: 78 },
          { student: 'Olivia Lee', score: 85 },
          { student: 'Jackson Hall', score: 95 },
          { student: 'Ava Kim', score: 82 },
          { student: 'Ethan Hall', score: 95 },
          { student: 'Lily Tran', score: 95 },
        ]
      },
      { 
        id: 10, 
        name: 'Chapter 3 Review Test', 
        subject: 'Biology',
        date: '2023-02-25', 
        averageScore: 75,
        highestScore: 92,
        lowestScore: 58,
        mean: 75.2,
        median: 76,
        mode: 78,
        bestStudent: 'Lily Tran',
        worstStudent: 'Ava Kim',
        studentScores: [
          { student: 'Alex Johnson', score: 85 },
          { student: 'Sarah Martinez', score: 78 },
          { student: 'Emily Chen', score: 88 },
          { student: 'Michael Brown', score: 72 },
          { student: 'Sophia Patel', score: 65 },
          { student: 'Olivia Lee', score: 70 },
          { student: 'Jackson Hall', score: 82 },
          { student: 'Ava Kim', score: 58 },
          { student: 'Ethan Hall', score: 78 },
          { student: 'Lily Tran', score: 92 },
        ]
      },
    ],
    studentPerformance: [
      { 
        id: 1,
        name: 'Alex Johnson', 
        overallGrade: 'A', 
        improvementAreas: ['Algebra', 'Geometry'],
        behaviorRating: 'Excellent'
      },
      { 
        id: 2,
        name: 'Sarah Martinez', 
        overallGrade: 'B+', 
        improvementAreas: ['Trigonometry'],
        behaviorRating: 'Good'
      },
      { 
        id: 3,
        name: 'Emily Chen', 
        overallGrade: 'A-', 
        improvementAreas: ['Word Problems'],
        behaviorRating: 'Very Good'
      },
      { 
        id: 4,
        name: 'Michael Brown', 
        overallGrade: 'B', 
        improvementAreas: ['Graphing'],
        behaviorRating: 'Satisfactory'
      },
      { 
        id: 5,
        name: 'Sophia Patel', 
        overallGrade: 'C+', 
        improvementAreas: ['Equations', 'Inequalities'],
        behaviorRating: 'Needs Improvement'
      },
      { 
        id: 6,
        name: 'Olivia Lee', 
        overallGrade: 'B-', 
        improvementAreas: ['Functions'],
        behaviorRating: 'Good'
      },
      { 
        id: 7,
        name: 'Jackson Hall', 
        overallGrade: 'A', 
        improvementAreas: [],
        behaviorRating: 'Excellent'
      },
      { 
        id: 8,
        name: 'Ava Kim', 
        overallGrade: 'C', 
        improvementAreas: ['Ratios', 'Proportions'],
        behaviorRating: 'Fair'
      },
      { 
        id: 9,
        name: 'Ethan Hall', 
        overallGrade: 'B+', 
        improvementAreas: ['Statistics'],
        behaviorRating: 'Very Good'
      },
      { 
        id: 10,
        name: 'Lily Tran', 
        overallGrade: 'A-', 
        improvementAreas: ['Probability'],
        behaviorRating: 'Excellent'
      },
    ]
  };