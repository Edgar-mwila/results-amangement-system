import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

const studentDetails = {
    personal: {
      name: "John Doe",
      dob: "2010-05-15",
      gender: "Male",
      bloodGroup: "A+",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 School Street, Cityville, State 12345"
    },
    guardians: {
      father: {
        name: "Michael Doe",
        occupation: "Engineer"
      },
      mother: {
        name: "Sarah Doe",
        occupation: "Teacher"
      },
      contact: "+1 (555) 987-6543"
    },
    emergencyContacts: [
      {
        name: "Emma Doe",
        relationship: "Aunt",
        phone: "+1 (555) 246-8101"
      },
      {
        name: "Robert Smith",
        relationship: "Uncle",
        phone: "+1 (555) 135-7920"
      }
    ],
    school: {
      studentID: "SD12345",
      grade: "8th Grade",
      classTeacher: "Ms. Johnson",
      overallGrade: "A",
      attendance: "95%"
    },
    extracurricular: ["Basketball", "Debate Club", "Music Club"]
  };

const StudentInfoModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="rounded-full bg-[#264653] w-16 h-16 flex items-center justify-center hover:bg-[#F4F4F4]"
          onClick={() => setIsOpen(true)}
        >
          <User className="text-[#F4A261] w-8 h-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#264653] text-2xl">Student Information</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Personal Details */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-[#264653]">Personal Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-[#F2CC8F]">Full Name</p>
                  <p>{studentDetails.personal.name}</p>
                </div>
                <div>
                  <p className="font-semibold text-[#F2CC8F]">Date of Birth</p>
                  <p>{studentDetails.personal.dob}</p>
                </div>
                <div>
                  <p className="font-semibold text-[#F2CC8F]">Gender</p>
                  <p>{studentDetails.personal.gender}</p>
                </div>
                <div>
                  <p className="font-semibold text-[#F2CC8F]">Blood Group</p>
                  <p>{studentDetails.personal.bloodGroup}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-[#264653]">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-[#F2CC8F]">Email</p>
                  <p>{studentDetails.personal.email}</p>
                </div>
                <div>
                  <p className="font-semibold text-[#F2CC8F]">Phone</p>
                  <p>{studentDetails.personal.phone}</p>
                </div>
                <div>
                  <p className="font-semibold text-[#F2CC8F]">Address</p>
                  <p>{studentDetails.personal.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guardian Details */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-[#264653]">Guardian Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-[#F2CC8F]">Father's Name</p>
                  <p>{studentDetails.guardians.father.name}</p>
                </div>
                <div>
                  <p className="font-semibold text-[#F2CC8F]">Father's Occupation</p>
                  <p>{studentDetails.guardians.father.occupation}</p>
                </div>
                <div>
                  <p className="font-semibold text-[#F2CC8F]">Mother's Name</p>
                  <p>{studentDetails.guardians.mother.name}</p>
                </div>
                <div>
                  <p className="font-semibold text-[#F2CC8F]">Mother's Occupation</p>
                  <p>{studentDetails.guardians.mother.occupation}</p>
                </div>
                <div className="col-span-2">
                  <p className="font-semibold text-[#F2CC8F]">Guardian Contact</p>
                  <p>Phone: {studentDetails.guardians.contact}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-[#264653]">Emergency Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              {studentDetails.emergencyContacts.map((contact, index) => (
                <div key={index} className="mb-4 pb-4 border-b last:border-b-0">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-[#F2CC8F]">Name</p>
                      <p>{contact.name}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#F2CC8F]">Relationship</p>
                      <p>{contact.relationship}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-semibold text-[#F2CC8F]">Contact Number</p>
                      <p>{contact.phone}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* School Information */}
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-[#264653]">School Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-[#F2CC8F]">Student ID</p>
                  <p>{studentDetails.school.studentID}</p>
                </div>
                <div>
                  <p className="font-semibold text-[#F2CC8F]">Grade</p>
                  <p>{studentDetails.school.grade}</p>
                </div>
                <div>
                  <p className="font-semibold text-[#F2CC8F]">Class Teacher</p>
                  <p>{studentDetails.school.classTeacher}</p>
                </div>
                <div>
                  <p className="font-semibold text-[#F2CC8F]">Overall Grade</p>
                  <p>{studentDetails.school.overallGrade}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentInfoModal;