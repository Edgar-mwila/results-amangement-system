import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogTrigger} from "./ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { Plus, X, Loader2, UserPlus } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const AddStudentDialog = () => {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    
    const [formData, setFormData] = useState({
      firstname: "",
      lastname: "",
      grade: "",
      status: "Enrolled",
      guardians: [
        {
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          relationship: ""
        }
      ]
    })
  
    const handleGuardianChange = (index: number, field: string, value: string) => {
      const newGuardians = [...formData.guardians]
      newGuardians[index] = {
        ...newGuardians[index],
        [field]: value
      }
      setFormData({ ...formData, guardians: newGuardians })
    }
  
    const addGuardian = () => {
      setFormData({
        ...formData,
        guardians: [
          ...formData.guardians,
          {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            relationship: ""
          }
        ]
      })
    }
  
    const removeGuardian = (index: number) => {
      const newGuardians = formData.guardians.filter((_, i) => i !== index)
      setFormData({ ...formData, guardians: newGuardians })
    }
  
    const handleSubmit = async (e: { preventDefault: () => void }) => {
      e.preventDefault()
      setIsLoading(true)
  
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
  
      toast({
        title: "Success",
        description: "Student has been added successfully",
      })
  
      setFormData({
        firstname: "",
        lastname: "",
        grade: "",
        status: "Enrolled",
        guardians: [
          {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            relationship: ""
          }
        ]
      })
      setIsLoading(false)
    }
  
    return (
      <Dialog  open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            className="bg-green-500 hover:bg-blue-600"
            onClick={() => setIsOpen(true)}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Student
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  id="firstname"
                  value={formData.firstname}
                  onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  id="lastname"
                  value={formData.lastname}
                  onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                  required
                />
              </div>
            </div>
  
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Select
                  value={formData.grade}
                  onValueChange={(value) => setFormData({ ...formData, grade: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {[9, 10, 11, 12].map((grade) => (
                      <SelectItem key={grade} value={grade.toString()}>
                        Grade {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Enrolled">Enrolled</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                    <SelectItem value="Transferred">Transferred</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
  
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Guardians</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addGuardian}
                  disabled={formData.guardians.length >= 3}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Guardian
                </Button>
              </div>
  
              {formData.guardians.map((guardian, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Guardian {index + 1}</h4>
                    {formData.guardians.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeGuardian(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input
                        value={guardian.firstname}
                        onChange={(e) => handleGuardianChange(index, "firstname", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input
                        value={guardian.lastname}
                        onChange={(e) => handleGuardianChange(index, "lastname", e.target.value)}
                        required
                      />
                    </div>
                  </div>
  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={guardian.email}
                        onChange={(e) => handleGuardianChange(index, "email", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        type="tel"
                        value={guardian.phone}
                        onChange={(e) => handleGuardianChange(index, "phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>
  
                  <div className="space-y-2">
                    <Label>Relationship</Label>
                    <Select
                      value={guardian.relationship}
                      onValueChange={(value) => handleGuardianChange(index, "relationship", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Parent">Parent</SelectItem>
                        <SelectItem value="Guardian">Legal Guardian</SelectItem>
                        <SelectItem value="Grandparent">Grandparent</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
  
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Student'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    )
}

export default AddStudentDialog;