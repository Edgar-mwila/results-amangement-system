import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Book, GraduationCap, Mail, Phone, TrendingUp, MessageSquare, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import StudentInfoModal from './student-details';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';

interface Subject {
  name: string;
  tests: { name: string; score: number }[] | [];
  finalExam: number | null;
  criteria: string;
  finalGrade: string;
  teacherComment: string;
  teacherName: string;
  teacherEmail: string;
  teacherPhone: string;
  attendance: number;
  participationScore: number;
  improvementAreas: string[];
}

interface Term {
  name: string;
  subjects: Subject[];
  overallComment: string;
  nextYearStatus: string;
  adviceToParents: string;
  overallAttendance: number;
  behaviorRating: number;
  extracurricularActivities: string[];
}

const terms: Term[] = [
  {
    name: 'Term 1',
    subjects: [
      {
        name: 'Mathematics',
        tests: [
          { name: 'Quiz 1', score: 85 },
          { name: 'Mid-term', score: 78 },
          { name: 'Quiz 2', score: 92 }
        ],
        finalExam: 88,
        criteria: 'Tests (40%), Final Exam (60%)',
        finalGrade: 'A',
        teacherComment: 'Excellent progress in problem-solving skills.',
        teacherName: 'Mr. John Doe',
        teacherEmail: 'john.doe@ph-EduTrack.com',
        teacherPhone: '+1234567890',
        attendance: 95,
        participationScore: 88,
        improvementAreas: ['Practice more word problems', 'Review geometry concepts']
      },
      {
        name: 'English Literature',
        tests: [
          { name: 'Poetry Analysis', score: 90 },
          { name: 'Novel Review', score: 85 }
        ],
        finalExam: 92,
        criteria: 'Tests (50%), Final Exam (50%)',
        finalGrade: 'A+',
        teacherComment: 'Outstanding analytical skills shown in assignments.',
        teacherName: 'Ms. Emily Chen',
        teacherEmail: 'emily.chen@ph-EduTrack.com',
        teacherPhone: '+9876543210',
        attendance: 98,
        participationScore: 95,
        improvementAreas: ['Engage more in class discussions']
      },
      {
        name: 'Biology',
        tests: [
          { name: 'Cell Biology Quiz', score: 80 },
          { name: 'Ecosystems Mid-term', score: 82 }
        ],
        finalExam: 85,
        criteria: 'Tests (45%), Final Exam (55%)',
        finalGrade: 'B+',
        teacherComment: 'Good understanding of biological concepts, but needs to work on lab reports.',
        teacherName: 'Dr. Liam Patel',
        teacherEmail: 'liam.patel@ph-EduTrack.com',
        teacherPhone: '+1112223333',
        attendance: 92,
        participationScore: 80,
        improvementAreas: ['Improve lab report writing skills']
      },
      {
        name: 'Physical Education',
        tests: [
          { name: 'Fitness Test', score: 95 },
          { name: 'Team Sports Assessment', score: 90 }
        ],
        finalExam: null,
        criteria: 'Participation (30%), Assessments (70%)',
        finalGrade: 'A',
        teacherComment: 'Excellent teamwork and leadership skills demonstrated.',
        teacherName: 'Coach Michael Lee',
        teacherEmail: 'ichael.lee@ph-EduTrack.com',
        teacherPhone: '+4445556666',
        attendance: 100,
        participationScore: 98,
        improvementAreas: []
      },
      {
        name: 'Computer Science',
        tests: [
          { name: 'Programming Quiz 1', score: 88 },
          { name: 'Project Mid-term', score: 90 }
        ],
        finalExam: 90,
        criteria: 'Tests (40%), Project (60%)',
        finalGrade: 'A',
        teacherComment: 'Very promising coding skills, keep exploring new languages.',
        teacherName: 'Ms. Sophia Kim',
        teacherEmail: 'ophia.kim@ph-EduTrack.com',
        teacherPhone: '+7778889999',
        attendance: 96,
        participationScore: 92,
        improvementAreas: ['Explore AI/ML basics']
      },
      {
        name: 'Geography',
        tests: [
          { name: 'Map Reading Quiz', score: 85 },
          { name: 'Cultural Geography Mid-term', score: 80 }
        ],
        finalExam: 82,
        criteria: 'Tests (50%), Final Exam (50%)',
        finalGrade: 'B',
        teacherComment: 'Good knowledge of geographical concepts, work on map skills.',
        teacherName: 'Mr. David Taylor',
        teacherEmail: 'david.taylor@ph-EduTrack.com',
        teacherPhone: '+1231231234',
        attendance: 90,
        participationScore: 85,
        improvementAreas: ['Improve map reading skills']
      },
      {
        name: 'French',
        tests: [
          { name: 'Grammar Quiz 1', score: 90 },
          { name: 'Conversation Mid-term', score: 88 }
        ],
        finalExam: 90,
        criteria: 'Tests (45%), Final Exam (55%)',
        finalGrade: 'A',
        teacherComment: 'Très bien! Excellent pronunciation and grammar understanding.',
        teacherName: 'Mme. Isabelle Dupont',
        teacherEmail: 'isabelle.dupont@ph-EduTrack.com',
        teacherPhone: '+5678901234',
        attendance: 97,
        participationScore: 94,
        improvementAreas: ['Engage more in conversations']
      },
      {
        name: 'Art & Design',
        tests: [],
        finalExam: null,
        criteria: 'Project Based (100%)',
        finalGrade: 'A+',
        teacherComment: 'Outstanding creativity and skill shown in all projects.',
        teacherName: 'Ms. Ava Moreno',
        teacherEmail: 'ava.moreno@ph-EduTrack.com',
        teacherPhone: '+9012345678',
        attendance: 99,
        participationScore: 99,
        improvementAreas: []
      }
    ],
    overallComment: 'Sarah has shown great improvement this term, especially in Mathematics and English Literature.',
    nextYearStatus: 'On track to proceed to the next grade',
    adviceToParents: 'Encourage more reading in literature to boost comprehension skills and explore extracurricular coding activities.',
    overallAttendance: 94.5,
    behaviorRating: 92,
    extracurricularActivities: ['Chess Club', 'Math Olympiad', 'School Play']
  },
];

function getGradeColor(grade: string) {
  const gradeColors = {
    'A': 'text-[#4CAF50]',
    'B': 'text-[#2A9D8F]',
    'C': 'text-[#F4A261]',
    'D': 'text-[#E76F51]',
    'F': 'text-[#D62828]'
  };
  return gradeColors[grade as keyof typeof gradeColors] || 'text-[#264653]';
}

function SubjectCard({ subject }: { subject: Subject }) {
  // Generate performance data for the chart
  const performanceData = [
    ...subject.tests.map((test) => ({
      name: test.name,
      score: test.score
    })),
    { name: 'Final Exam', score: subject.finalExam }
  ];

  return (
    <Card className="mb-6 bg-white">
      <CardHeader className="border-b border-[#F4F4F4]">
        <CardTitle className="text-[#264653] flex items-center">
          <Book className="w-5 h-5 mr-2 text-[#2A9D8F]" />
          {subject.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            {/* Performance Chart */}
            <div className="mb-6">
              <h4 className="text-[#264653] font-semibold mb-4">Performance Trend</h4>
              <LineChart width={400} height={200} data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#2A9D8F" strokeWidth={2} />
              </LineChart>
            </div>

            {/* Tests and Final Exam */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#F4F4F4] p-4 rounded-lg">
                <h4 className="text-[#264653] font-semibold mb-2">Tests</h4>
                <ul className="space-y-2">
                  {subject.tests.map((test) => (
                    <li key={test.name} className="flex justify-between">
                      <span className="text-[#A8A8A8]">{test.name}</span>
                      <span className="font-semibold text-[#264653]">{test.score}%</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#F4F4F4] p-4 rounded-lg">
                <h4 className="text-[#264653] font-semibold mb-2">Final Exam</h4>
                <div className="text-center">
                  <span className="text-3xl font-bold text-[#2A9D8F]">{subject.finalExam}%</span>
                </div>
              </div>
            </div>
            <div className="bg-[#F4F4F4] p-4 rounded-lg text-center w-full text-[#F4A261]">{subject.criteria}</div>
          </div>

          <div className="space-y-6">
            {/* Grade and Criteria */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-[#264653] font-semibold mb-2">Final Grade</h4>
                <span className={`text-4xl font-bold ${getGradeColor(subject.finalGrade)}`}>
                  {subject.finalGrade}
                </span>
              </div>
              <div className="text-right">
                <h4 className="text-[#264653] font-semibold mb-2">Attendance</h4>
                <span className="text-2xl font-semibold text-[#2A9D8F]">{subject.attendance}%</span>
              </div>
            </div>

            {/* Teacher's Comment */}
            <div>
              <h4 className="text-[#264653] font-semibold mb-2 flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-[#2A9D8F]" />
                Teacher's Comment
              </h4>
              <p className="text-[#264653]">{subject.teacherComment}</p>
            </div>

            {/* Areas for Improvement */}
            {subject.improvementAreas.length > 0 && (
              <div>
                <h4 className="text-[#264653] font-semibold mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-[#F4A261]" />
                  Areas for Improvement
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {subject.improvementAreas.map((area, index) => (
                    <li key={index} className="text-[#264653]">{area}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Teacher Contact */}
            <div className="bg-[#F4F4F4] p-4 rounded-lg">
              <h4 className="text-[#264653] font-semibold mb-3 flex items-center">
                <GraduationCap className="w-4 h-4 mr-2 text-[#2A9D8F]" />
                Teacher Contact
              </h4>
              <div className="space-y-2">
                <p className="flex items-center text-[#264653]">
                  {subject.teacherName}
                </p>
                <p className="flex items-center text-[#264653]">
                  <Mail className="w-4 h-4 mr-2 text-[#2A9D8F]" />
                  {subject.teacherEmail}
                </p>
                <p className="flex items-center text-[#264653]">
                  <Phone className="w-4 h-4 mr-2 text-[#2A9D8F]" />
                  {subject.teacherPhone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SubjectTabs({ subjects }: { subjects: Subject[] }) {
  const [activeTab, setActiveTab] = useState(subjects[0].name);

  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab} 
      className="w-full"
    >
      {/* Scrollable Tab List */}
      <ScrollArea className="w-full whitespace-nowrap">
        <TabsList className="inline-flex w-full justify-start bg-transparent">
          {subjects.map((subject) => (
            <TabsTrigger 
              key={subject.name} 
              value={subject.name}
              className="
                data-[state=active]:bg-[#2A9D8F]/10 
                data-[state=active]:text-[#2A9D8F] 
                text-[#A8A8A8] 
                mx-2 
                rounded-full
                transition-colors
                duration-300
              "
            >
              {subject.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </ScrollArea>

      {/* Subject Content */}
      {subjects.map((subject) => (
        <TabsContent 
          key={subject.name} 
          value={subject.name}
          className="mt-6"
        >
          <SubjectCard subject={subject} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

export function StudentPage() {
  const [selectedTerm, setSelectedTerm] = useState<Term>(terms[0]);

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <div className="container mx-auto py-8 px-4">
        <div className="flex mb-8 flex-row justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#264653] mb-2">Academic Report Card</h1>
            <p className="text-[#A8A8A8]">Track your academic progress and performance</p>
          </div>
          <StudentInfoModal />
        </div>

        {/* Term Selection and Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-[#264653]">Term Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Select 
                  defaultValue={selectedTerm.name}
                  onValueChange={(value) => {
                    const term = terms.find(t => t.name === value);
                    if (term) setSelectedTerm(term);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Term" />
                  </SelectTrigger>
                  <SelectContent>
                    {terms.map((term) => (
                      <SelectItem key={term.name} value={term.name}>
                        {term.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-[#F4F4F4] rounded-lg">
                  <p className="text-[#A8A8A8] mb-1">Attendance</p>
                  <p className="text-2xl font-bold text-[#2A9D8F]">
                    {selectedTerm.overallAttendance}%
                  </p>
                </div>
                <div className="text-center p-4 bg-[#F4F4F4] rounded-lg">
                  <p className="text-[#A8A8A8] mb-1">Behavior</p>
                  <p className="text-2xl font-bold text-[#2A9D8F]">
                    {selectedTerm.behaviorRating}%
                  </p>
                </div>
                <div className="text-center p-4 bg-[#F4F4F4] rounded-lg">
                  <p className="text-[#A8A8A8] mb-1">Activities</p>
                  <p className="text-2xl font-bold text-[#2A9D8F]">
                    {selectedTerm.extracurricularActivities.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[#264653]">Next Year Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription>{selectedTerm.nextYearStatus}</AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Subjects */}
        <SubjectTabs subjects={selectedTerm.subjects} />

        {/* Overall Evaluation */}
        <Card className="mt-8 bg-[#2A9D8F]/5">
          <CardHeader>
            <CardTitle className="text-[#264653]">Overall Evaluation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-[#264653] font-semibold mb-2">Class Teacher's Comment</h4>
              <p className="text-[#264653]">{selectedTerm.overallComment}</p>
            </div>
            <div>
              <h4 className="text-[#264653] font-semibold mb-2">Advice to Parents</h4>
              <p className="text-[#264653]">{selectedTerm.adviceToParents}</p>
            </div>
            
            {/* Extracurricular Activities */}
            <div>
              <h4 className="text-[#264653] font-semibold mb-2">Extracurricular Activities</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTerm.extracurricularActivities.map((activity, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-[#2A9D8F]/10 text-[#2A9D8F] rounded-full text-sm"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}