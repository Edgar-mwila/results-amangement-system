import { useState } from 'react'
import { Edit2, Save, X, CreditCard } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SchoolData {
    id: number;
    name: string;
    registration_number: string;
    address: string;
    phone: string;
    email: string;
    logo_url?: string;
    website_url?: string;
    type: 'primary' | 'secondary' | 'mixed';
    category: 'public' | 'private' | 'international';
    curriculum: 'national' | 'international' | 'mixed';
    admin_name: string;
    admin_email: string;
    admin_phone: string;
    country: string;
    state_province: string;
    city: string;
    postal_code: string;
    subdomain?: string;
    database_name?: string;
    subscription_plan: 'basic' | 'premium' | 'enterprise';
    subscription_start_date?: string;
    subscription_end_date: string;
    subscription_status: 'active' | 'expired' | 'cancelled';
    status: 'pending' | 'approved' | 'rejected' | 'suspended';
    approved_at?: string;
    approved_by?: number;
    created_at?: string;
    updated_at?: string;
    last_login?: string;
    is_deleted?: boolean;
    deleted_at?: string;
    deleted_by?: number;
}

type FieldConfig = {
  label: string;
  field: keyof SchoolData;
  type?: 'text' | 'textarea' | 'select';
  options?: Array<{ value: string; label: string }>;
}

const SchoolProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [schoolData, setSchoolData] = useState<SchoolData>({
    id: 1,
    name: "Sample School",
    registration_number: "REG123456",
    address: "123 School Street",
    phone: "+260123456789",
    email: "admin@school.edu",
    type: "mixed",
    category: "private",
    curriculum: "national",
    admin_name: "John Doe",
    admin_email: "admin@school.edu",
    admin_phone: "+260123456789",
    country: "Zambia",
    state_province: "Lusaka",
    city: "Lusaka",
    postal_code: "10101",
    subscription_plan: "basic",
    subscription_status: "active",
    subscription_end_date: "2024-12-31",
    status: "approved"
  })

  // Fields that cannot be edited
  const readOnlyFields: ReadonlyArray<keyof SchoolData> = [
    'id', 'registration_number', 'subdomain', 'database_name',
    'subscription_status', 'status', 'approved_at', 'approved_by',
    'created_at', 'updated_at', 'last_login', 'is_deleted',
    'deleted_at', 'deleted_by'
  ];

  // Subscription plans with their details
  const subscriptionPlans = {
    basic: {
      price: "500",
      features: ["Basic features", "Up to 500 students", "Email support"]
    },
    premium: {
      price: "1000",
      features: ["All basic features", "Up to 2000 students", "Priority support", "Advanced analytics"]
    },
    enterprise: {
      price: "2000",
      features: ["All premium features", "Unlimited students", "24/7 support", "Custom features"]
    }
  } as const;

  const handleSave = () => {
    setIsEditing(false)
  }

  const getStatusColor = (status: string): string => {
    const colors = {
      active: "bg-[#F2CC8F]",
      expired: "bg-red-500",
      cancelled: "bg-gray-500",
      pending: "bg-yellow-500",
      approved: "bg-[#81B29A]",
      rejected: "bg-red-500",
      suspended: "bg-orange-500"
    } as const;
    return colors[status as keyof typeof colors] || "bg-gray-500"
  }

  // Field configurations
  const schoolInfoFields: FieldConfig[] = [
    { label: "School Name", field: "name" },
    { label: "Registration Number", field: "registration_number" },
    { label: "Address", field: "address", type: "textarea" },
    { label: "Phone", field: "phone" },
    { label: "Email", field: "email" },
    { 
      label: "Type", 
      field: "type", 
      type: "select",
      options: [
        { value: "primary", label: "Primary" },
        { value: "secondary", label: "Secondary" },
        { value: "mixed", label: "Mixed" }
      ]
    },
    { 
      label: "Category", 
      field: "category", 
      type: "select",
      options: [
        { value: "public", label: "Public" },
        { value: "private", label: "Private" },
        { value: "international", label: "International" }
      ]
    },
    { 
      label: "Curriculum", 
      field: "curriculum", 
      type: "select",
      options: [
        { value: "national", label: "National" },
        { value: "international", label: "International" },
        { value: "mixed", label: "Mixed" }
      ]
    }
  ];

  const contactFields: FieldConfig[] = [
    { label: "Admin Name", field: "admin_name" },
    { label: "Admin Email", field: "admin_email" },
    { label: "Admin Phone", field: "admin_phone" },
    { label: "Country", field: "country" },
    { label: "State/Province", field: "state_province" },
    { label: "City", field: "city" },
    { label: "Postal Code", field: "postal_code" }
  ];

  const subscriptionFields: FieldConfig[] = [
    { label: "Plan", field: "subscription_plan" },
    { label: "Status", field: "subscription_status" },
    { label: "End Date", field: "subscription_end_date" }
  ];

  const systemFields: FieldConfig[] = [
    { label: "Status", field: "status" },
    { label: "Created At", field: "created_at" },
    { label: "Last Login", field: "last_login" }
  ];

  // Payment Dialog Component
  const PaymentDialog = () => {
    const [selectedPlan, setSelectedPlan] = useState<SchoolData['subscription_plan']>(schoolData.subscription_plan)
    
    return (
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Update Subscription Plan</DialogTitle>
          <DialogDescription>
            Choose a plan that best suits your school's needs
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {(Object.entries(subscriptionPlans) as [SchoolData['subscription_plan'], typeof subscriptionPlans[keyof typeof subscriptionPlans]][]).map(([plan, details]) => (
            <Card 
              key={plan}
              className={`cursor-pointer transition-all ${
                selectedPlan === plan ? 'border-[#3D405B] border-2' : ''
              }`}
              onClick={() => setSelectedPlan(plan)}
            >
              <CardHeader className="bg-[#F2CC8F] p-4">
                <CardTitle className="capitalize">{plan}</CardTitle>
                <div className="text-2xl font-bold">${details.price}/yr</div>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="space-y-2">
                  {details.features.map((feature, index) => (
                    <li key={index} className="text-sm">• {feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <Button className="w-full bg-[#3D405B]">
            <CreditCard className="mr-2 h-4 w-4" />
            Proceed to Payment
          </Button>
        </div>
      </DialogContent>
    )
  }

  const renderField = (fieldConfig: FieldConfig) => {
    const { label, field, type, options } = fieldConfig;
    const value = schoolData[field];
    const isReadOnly = readOnlyFields.includes(field);

    return (
      <div key={field}>
        <label className="block text-sm font-medium text-[#3D405B]">
          {label}
        </label>
        {isEditing && !isReadOnly ? (
          type === "textarea" ? (
            <textarea
              value={value}
              onChange={(e) => setSchoolData({...schoolData, [field]: e.target.value})}
              className="mt-1"
            />
          ) : type === "select" && options ? (
            <Select
              value={value as string}
              onValueChange={(value) => setSchoolData({...schoolData, [field]: value})}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {options.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              value={value as string}
              onChange={(e) => setSchoolData({...schoolData, [field]: e.target.value})}
              className="mt-1"
            />
          )
        ) : (
          <div className="mt-1 text-gray-900">
            {field === "status" || field === "subscription_status" ? (
              <Badge className={getStatusColor(value as string)}>
                {value}
              </Badge>
            ) : (
              value || "N/A"
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-w-full mx-auto p-4 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#3D405B]">{schoolData.name}</h1>
          <div className="flex gap-2 mt-2">
            <Badge className={getStatusColor(schoolData.status)}>
              {schoolData.status}
            </Badge>
            <Badge className={getStatusColor(schoolData.subscription_status)}>
              {schoolData.subscription_status}
            </Badge>
          </div>
        </div>
        <div className="space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-[#F2CC8F] hover:bg-[#E6B56C]">
                <CreditCard className="mr-2 h-4 w-4" />
                Manage Subscription
              </Button>
            </DialogTrigger>
            <PaymentDialog />
          </Dialog>
          {!isEditing ? (
            <Button 
              onClick={() => setIsEditing(true)}
              className="bg-[#3D405B] hover:bg-[#2A2B3D]"
            >
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <>
              <Button 
                onClick={handleSave}
                className="bg-[#81B29A] hover:bg-[#6B9A84]"
              >
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button 
                onClick={() => setIsEditing(false)}
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* School Information */}
        <Card>
          <CardHeader className="bg-[#F2CC8F]">
            <CardTitle>School Information</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {schoolInfoFields.map(renderField)}
          </CardContent>
        </Card>

        {/* Contact & Location */}
        <Card>
          <CardHeader className="bg-[#F2CC8F]">
            <CardTitle>Contact & Location</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {contactFields.map(renderField)}
          </CardContent>
        </Card>

        {/* Subscription Details */}
        <Card>
          <CardHeader className="bg-[#F2CC8F]">
            <CardTitle>Subscription Details</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {subscriptionFields.map(renderField)}
          </CardContent>
        </Card>

        {/* System Details */}
        <Card>
          <CardHeader className="bg-[#F2CC8F]">
            <CardTitle>System Details</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {systemFields.map(renderField)}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SchoolProfile