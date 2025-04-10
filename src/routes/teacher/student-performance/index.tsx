import { createFileRoute } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

// Enhanced mock data with performance metrics
interface Grade {
    score: number;
    attendance: string;
    assignments: string;
}

interface Student {
    id: number;
    name: string;
    grades: Record<string, Grade>;
}

interface Subject {
    name: string;
    averageScore: number;
    completionRate: number;
}

interface ClassData {
    class: string;
    subjects: Subject[];
    students: Student[];
}

const mockData: ClassData[] = [
    {
        class: 'Class A',
        subjects: [
            { 
                name: 'Math', 
                averageScore: 78,
                completionRate: 92
            }, 
            { 
                name: 'Science', 
                averageScore: 81,
                completionRate: 88
            }
        ],
        students: [
            { 
                id: 1, 
                name: 'John Doe',
                grades: {
                    'Math': { score: 85, attendance: '95%', assignments: '12/15' },
                    'Science': { score: 78, attendance: '90%', assignments: '8/10' }
                }
            },
            { 
                id: 2, 
                name: 'Jane Smith',
                grades: {
                    'Math': { score: 92, attendance: '98%', assignments: '15/15' },
                    'Science': { score: 88, attendance: '92%', assignments: '9/10' }
                }
            },
        ],
    },
    {
        class: 'Class B',
        subjects: [
            { 
                name: 'History', 
                averageScore: 75,
                completionRate: 85
            }, 
            { 
                name: 'English', 
                averageScore: 83,
                completionRate: 90
            }
        ],
        students: [
            { 
                id: 3, 
                name: 'Alice Brown',
                grades: {
                    'History': { score: 79, attendance: '85%', assignments: '9/12' },
                    'English': { score: 88, attendance: '92%', assignments: '14/15' }
                }
            },
            { 
                id: 4, 
                name: 'Bob Johnson',
                grades: {
                    'History': { score: 71, attendance: '78%', assignments: '8/12' },
                    'English': { score: 75, attendance: '82%', assignments: '12/15' }
                }
            },
        ],
    },
]

const StudentPerformance = () => {
    const navigate = useNavigate()
    const [expandedClass, setExpandedClass] = useState<number | null>(null)

    // Helper function to calculate class average
    const calculateClassAverage = (classData: ClassData) => {
        let totalScore = 0;
        let count = 0;
        
        classData.students.forEach(student => {
            Object.values(student.grades).forEach(grade => {
                totalScore += grade.score;
                count++;
            });
        });
        
        return count > 0 ? (totalScore / count).toFixed(1) : 'N/A';
    }

    // Toggle expanded class view
    const toggleClassExpand = (index: number) => {
        if (expandedClass === index) {
            setExpandedClass(null);
        } else {
            setExpandedClass(index);
        }
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Student Performance Dashboard</h1>
            
            <div className="grid grid-cols-1 gap-6 mb-8">
                {mockData.map((classData, index) => {
                    const classAverage = calculateClassAverage(classData);
                    const isExpanded = expandedClass === index;
                    
                    return (
                        <div 
                            key={index} 
                            className="border rounded-lg shadow bg-white overflow-hidden"
                        >
                            <div 
                                className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                                onClick={() => toggleClassExpand(index)}
                            >
                                <div>
                                    <h2 className="text-xl font-semibold">{classData.class}</h2>
                                    <p className="text-sm text-gray-600">
                                        {classData.subjects.length} subjects • {classData.students.length} students
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-medium">{classAverage}</div>
                                    <div className="text-sm text-gray-600">Class Average</div>
                                </div>
                            </div>
                            
                            {isExpanded && (
                                <div className="p-4">
                                    <div className="mb-6">
                                        <h3 className="text-lg font-medium mb-3">Subject Performance</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {classData.subjects.map((subject, idx) => (
                                                <div key={idx} className="bg-gray-50 p-4 rounded-md">
                                                    <h4 className="font-medium">{subject.name}</h4>
                                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                                        <div>
                                                            <div className="text-sm text-gray-600">Average Score</div>
                                                            <div className="font-medium">{subject.averageScore}%</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-sm text-gray-600">Completion Rate</div>
                                                            <div className="font-medium">{subject.completionRate}%</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-lg font-medium mb-3">Student Details</h3>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full border-collapse">
                                                <thead>
                                                    <tr className="bg-gray-100">
                                                        <th className="py-2 px-4 text-left">Student</th>
                                                        {classData.subjects.map((subject, idx) => (
                                                            <th key={idx} className="py-2 px-4 text-left">{subject.name}</th>
                                                        ))}
                                                        <th className="py-2 px-4 text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {classData.students.map((student) => (
                                                        <tr key={student.id} className="border-t hover:bg-gray-50">
                                                            <td className="py-3 px-4">{student.name}</td>
                                                            {classData.subjects.map((subject, idx) => {
                                                                const grade = student.grades[subject.name as keyof typeof student.grades];
                                                                return (
                                                                    <td key={idx} className="py-3 px-4">
                                                                        <div className="font-medium">{grade.score}%</div>
                                                                        <div className="text-xs text-gray-600">
                                                                            Attendance: {grade.attendance} • 
                                                                            Assignments: {grade.assignments}
                                                                        </div>
                                                                    </td>
                                                                );
                                                            })}
                                                            <td className="py-3 px-4 text-right">
                                                                <button
                                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                                                                    onClick={() =>
                                                                        navigate({
                                                                            to: `/teacher/student-performance/student/${student.id}`,
                                                                        })
                                                                    }
                                                                >
                                                                    View Details
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export const Route = createFileRoute('/teacher/student-performance/')({
    component: StudentPerformance,
})