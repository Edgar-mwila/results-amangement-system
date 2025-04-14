import type React from "react"
import { useState, useRef } from "react"
import {
  Edit2,
  Save,
  X,
  CreditCard,
  Camera,
  MapPin,
  Mail,
  Phone,
  Calendar,
  School,
  User,
  Building,
  Globe,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export interface SchoolData {
  id: number
  name: string
  registration_number: string
  address: string
  phone: string
  email: string
  logo_url?: string
  website_url?: string
  type: "primary" | "secondary" | "mixed"
  category: "public" | "private" | "international"
  curriculum: "national" | "international" | "mixed"
  admin_name: string
  admin_email: string
  admin_phone: string
  country: string
  state_province: string
  city: string
  postal_code: string
  subdomain?: string
  database_name?: string
  subscription_plan: "basic" | "premium" | "enterprise"
  subscription_start_date?: string
  subscription_end_date: string
  subscription_status: "active" | "expired" | "cancelled"
  status: "pending" | "approved" | "rejected" | "suspended"
  approved_at?: string
  approved_by?: number
  created_at?: string
  updated_at?: string
  last_login?: string
  is_deleted?: boolean
  deleted_at?: string
  deleted_by?: number
}

export type FieldConfig = {
  label: string
  field: keyof SchoolData
  type?: "text" | "textarea" | "select" | "email" | "tel" | "url"
  icon?: React.ReactNode
  options?: Array<{ value: string; label: string }>
}

const SchoolProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("school-info")
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const [schoolData, setSchoolData] = useState<SchoolData>({
    id: 1,
    name: "Sample School",
    registration_number: "REG123456",
    address: "123 School Street",
    phone: "+260123456789",
    email: "admin@school.edu",
    logo_url: "/placeholder.svg?height=100&width=100",
    website_url: "https://sampleschool.edu",
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
    subscription_start_date: "2024-01-01",
    subscription_end_date: "2024-12-31",
    status: "approved",
    created_at: "2023-01-15",
    updated_at: "2024-03-20",
    last_login: "2024-03-25",
  })

  // Fields that cannot be edited
  const readOnlyFields: ReadonlyArray<keyof SchoolData> = [
    "id",
    "registration_number",
    "subdomain",
    "database_name",
    "subscription_status",
    "status",
    "approved_at",
    "approved_by",
    "created_at",
    "updated_at",
    "last_login",
    "is_deleted",
    "deleted_at",
    "deleted_by",
  ]

  // Subscription plans with their details
  const subscriptionPlans = {
    basic: {
      price: "500",
      features: ["Basic features", "Up to 500 students", "Email support", "Standard reports", "1 admin user"],
    },
    premium: {
      price: "1000",
      features: [
        "All basic features",
        "Up to 2000 students",
        "Priority support",
        "Advanced analytics",
        "5 admin users",
        "SMS notifications",
      ],
    },
    enterprise: {
      price: "2000",
      features: [
        "All premium features",
        "Unlimited students",
        "24/7 support",
        "Custom features",
        "Unlimited admin users",
        "API access",
        "White-label options",
      ],
    },
  } as const

  const handleSave = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Success notification
      toast({
        title: "Profile updated",
        description: "School profile has been updated successfully.",
      })

      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating the school profile.",
        variant: "destructive",
      })
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogoUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll just create a local URL
      const url = URL.createObjectURL(file)
      setSchoolData({ ...schoolData, logo_url: url })

      toast({
        title: "Logo uploaded",
        description: "School logo has been updated successfully.",
      })
    }
  }

  const getStatusColor = (status: string): string => {
    const colors = {
      active: "bg-green-500 hover:bg-green-600",
      expired: "bg-red-500 hover:bg-red-600",
      cancelled: "bg-gray-500 hover:bg-gray-600",
      pending: "bg-yellow-500 hover:bg-yellow-600",
      approved: "bg-[#81B29A] hover:bg-[#6B9A84]",
      rejected: "bg-red-500 hover:bg-red-600",
      suspended: "bg-orange-500 hover:bg-orange-600",
    } as const
    return colors[status as keyof typeof colors] || "bg-gray-500 hover:bg-gray-600"
  }

  const getStatusTextColor = (status: string): string => {
    const colors = {
      active: "text-white",
      expired: "text-white",
      cancelled: "text-white", 
      pending: "text-gray-900",
      approved: "text-white",
      rejected: "text-white",
      suspended: "text-white"
    } as const
    return colors[status as keyof typeof colors] || "text-white"
  }

  // Field configurations
  const schoolInfoFields: FieldConfig[] = [
    { label: "School Name", field: "name", icon: <School className="h-4 w-4" /> },
    { label: "Registration Number", field: "registration_number", icon: <FileText className="h-4 w-4" /> },
    { label: "Address", field: "address", type: "textarea", icon: <MapPin className="h-4 w-4" /> },
    { label: "Phone", field: "phone", type: "tel", icon: <Phone className="h-4 w-4" /> },
    { label: "Email", field: "email", type: "email", icon: <Mail className="h-4 w-4" /> },
    { label: "Website", field: "website_url", type: "url", icon: <Globe className="h-4 w-4" /> },
    {
      label: "Type",
      field: "type",
      type: "select",
      icon: <Building className="h-4 w-4" />,
      options: [
        { value: "primary", label: "Primary" },
        { value: "secondary", label: "Secondary" },
        { value: "mixed", label: "Mixed" },
      ],
    },
    {
      label: "Category",
      field: "category",
      type: "select",
      icon: <Building className="h-4 w-4" />,
      options: [
        { value: "public", label: "Public" },
        { value: "private", label: "Private" },
        { value: "international", label: "International" },
      ],
    },
    {
      label: "Curriculum",
      field: "curriculum",
      type: "select",
      icon: <FileText className="h-4 w-4" />,
      options: [
        { value: "national", label: "National" },
        { value: "international", label: "International" },
        { value: "mixed", label: "Mixed" },
      ],
    },
  ]

  const contactFields: FieldConfig[] = [
    { label: "Admin Name", field: "admin_name", icon: <User className="h-4 w-4" /> },
    { label: "Admin Email", field: "admin_email", type: "email", icon: <Mail className="h-4 w-4" /> },
    { label: "Admin Phone", field: "admin_phone", type: "tel", icon: <Phone className="h-4 w-4" /> },
    { label: "Country", field: "country", icon: <Globe className="h-4 w-4" /> },
    { label: "State/Province", field: "state_province", icon: <MapPin className="h-4 w-4" /> },
    { label: "City", field: "city", icon: <Building className="h-4 w-4" /> },
    { label: "Postal Code", field: "postal_code", icon: <MapPin className="h-4 w-4" /> },
  ]

  const subscriptionFields: FieldConfig[] = [
    { label: "Plan", field: "subscription_plan", icon: <CreditCard className="h-4 w-4" /> },
    { label: "Status", field: "subscription_status", icon: <FileText className="h-4 w-4" /> },
    { label: "Start Date", field: "subscription_start_date", icon: <Calendar className="h-4 w-4" /> },
    { label: "End Date", field: "subscription_end_date", icon: <Calendar className="h-4 w-4" /> },
  ]

  const systemFields: FieldConfig[] = [
    { label: "Status", field: "status", icon: <FileText className="h-4 w-4" /> },
    { label: "Created At", field: "created_at", icon: <Calendar className="h-4 w-4" /> },
    { label: "Last Updated", field: "updated_at", icon: <Calendar className="h-4 w-4" /> },
    { label: "Last Login", field: "last_login", icon: <Calendar className="h-4 w-4" /> },
  ]

  // Payment Dialog Component
  const PaymentDialog = () => {
    const [selectedPlan, setSelectedPlan] = useState<SchoolData["subscription_plan"]>(schoolData.subscription_plan)
    const [isProcessing, setIsProcessing] = useState(false)

    const handlePayment = async () => {
      setIsProcessing(true)

      try {
        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Update subscription plan
        setSchoolData({
          ...schoolData,
          subscription_plan: selectedPlan,
          subscription_start_date: new Date().toISOString().split("T")[0],
          subscription_end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            .toISOString()
            .split("T")[0],
        })

        toast({
          title: "Subscription updated",
          description: `Your subscription has been updated to ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}.`,
        })

        return true
      } catch (error) {
        toast({
          title: "Payment failed",
          description: "There was an error processing your payment.",
          variant: "destructive",
        })
        console.log(error)
        return false
      } finally {
        setIsProcessing(false)
      }
    }

    return (
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Update Subscription Plan</DialogTitle>
          <DialogDescription>Choose a plan that best suits your school's needs</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {(
            Object.entries(subscriptionPlans) as [
              SchoolData["subscription_plan"],
              (typeof subscriptionPlans)[keyof typeof subscriptionPlans],
            ][]
          ).map(([plan, details]) => (
            <Card
              key={plan}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedPlan === plan ? "border-[#3D405B] border-2 shadow-md" : ""
              }`}
              onClick={() => setSelectedPlan(plan)}
            >
              <CardHeader
                className={`${plan === "basic" ? "bg-[#F2CC8F]" : plan === "premium" ? "bg-[#81B29A]" : "bg-[#3D405B] text-white"} p-4 rounded-t-lg`}
              >
                <CardTitle className="capitalize text-center">{plan}</CardTitle>
                <p className="text-2xl font-bold text-center">
                  ${details.price}
                  <span className="text-sm font-normal">/year</span>
                </p>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="space-y-2">
                  {details.features.map((feature, index) => (
                    <li key={index} className="text-sm flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  className={`w-full ${
                    plan === "basic"
                      ? "bg-[#F2CC8F] hover:bg-[#E6B56C] text-[#3D405B]"
                      : plan === "premium"
                        ? "bg-[#81B29A] hover:bg-[#6B9A84] text-white"
                        : "bg-[#3D405B] hover:bg-[#2A2B3D] text-white"
                  }`}
                  disabled={plan === schoolData.subscription_plan}
                >
                  {plan === schoolData.subscription_plan ? "Current Plan" : "Select Plan"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => document.getElementById("close-dialog")?.click()}
            className="sm:order-1"
          >
            Cancel
          </Button>
          <Button
            className="bg-[#3D405B] hover:bg-[#2A2B3D] sm:order-2"
            onClick={handlePayment}
            disabled={selectedPlan === schoolData.subscription_plan || isProcessing}
          >
            {isProcessing ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Proceed to Payment
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    )
  }

  const renderField = (fieldConfig: FieldConfig) => {
    const { label, field, type, icon, options } = fieldConfig
    const value = schoolData[field]
    const isReadOnly = readOnlyFields.includes(field)

    return (
      <div key={field} className="space-y-2">
        <label className="flex items-center text-sm font-medium text-[#3D405B]">
          {icon && <span className="mr-2 text-gray-500">{icon}</span>}
          {label}
        </label>
        {isEditing && !isReadOnly ? (
          type === "textarea" ? (
            <Textarea
              value={value as string}
              onChange={(e) => setSchoolData({ ...schoolData, [field]: e.target.value })}
              className="resize-none"
              rows={3}
            />
          ) : type === "select" && options ? (
            <Select value={value as string} onValueChange={(value) => setSchoolData({ ...schoolData, [field]: value })}>
              <SelectTrigger>
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
              type={type || "text"}
              value={value as string}
              onChange={(e) => setSchoolData({ ...schoolData, [field]: e.target.value })}
            />
          )
        ) : (
          <div className="py-2 px-3 bg-gray-50 rounded-md text-gray-900 min-h-[40px] flex items-center">
            {field === "status" || field === "subscription_status" ? (
              <Badge className={`${getStatusColor(value as string)} ${getStatusTextColor(value as string)}`}>
                {value}
              </Badge>
            ) : (
              value || "N/A"
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-w-full mx-auto p-4 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="relative">
            <Avatar className="h-20 w-20 border-2 border-[#F2CC8F]">
              <AvatarImage src={schoolData.logo_url} alt={schoolData.name} />
              <AvatarFallback className="bg-[#3D405B] text-white text-xl">
                {schoolData.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <button
                onClick={handleLogoUpload}
                className="absolute bottom-0 right-0 bg-[#3D405B] text-white p-1 rounded-full hover:bg-[#2A2B3D] transition-colors"
              >
                <Camera className="h-4 w-4" />
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              </button>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#3D405B]">{schoolData.name}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge className={`${getStatusColor(schoolData.status)} ${getStatusTextColor(schoolData.status)}`}>
                {schoolData.status}
              </Badge>
              <Badge
                className={`${getStatusColor(schoolData.subscription_status)} ${getStatusTextColor(schoolData.subscription_status)}`}
              >
                {schoolData.subscription_status}
              </Badge>
              <Badge className="bg-[#3D405B] text-white">
                {schoolData.subscription_plan.charAt(0).toUpperCase() + schoolData.subscription_plan.slice(1)} Plan
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-[#F2CC8F] hover:bg-[#E6B56C] text-[#3D405B]">
                <CreditCard className="mr-2 h-4 w-4" />
                Manage Subscription
              </Button>
            </DialogTrigger>
            <PaymentDialog />
          </Dialog>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="bg-[#3D405B] hover:bg-[#2A2B3D] text-white">
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <>
              <Button onClick={handleSave} className="bg-[#81B29A] hover:bg-[#6B9A84] text-white" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </>
                )}
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger
            value="school-info"
            className="data-[state=active]:bg-[#F2CC8F] data-[state=active]:text-[#3D405B]"
          >
            <School className="mr-2 h-4 w-4" />
            School Information
          </TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-[#F2CC8F] data-[state=active]:text-[#3D405B]">
            <Mail className="mr-2 h-4 w-4" />
            Contact & Location
          </TabsTrigger>
          <TabsTrigger
            value="subscription"
            className="data-[state=active]:bg-[#F2CC8F] data-[state=active]:text-[#3D405B]"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Subscription
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-[#F2CC8F] data-[state=active]:text-[#3D405B]">
            <FileText className="mr-2 h-4 w-4" />
            System Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="school-info" className="mt-0">
          <Card className="bg-white shadow-sm">
            <CardHeader className="bg-[#F2CC8F] rounded-t-lg">
              <CardTitle className="flex items-center">
                <School className="mr-2 h-5 w-5" />
                School Information
              </CardTitle>
              <CardDescription>Basic information about your school</CardDescription>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {schoolInfoFields.map(renderField)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="mt-0">
          <Card className="bg-white shadow-sm">
            <CardHeader className="bg-[#F2CC8F] rounded-t-lg">
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Contact & Location
              </CardTitle>
              <CardDescription>Contact information and location details</CardDescription>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactFields.map(renderField)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription" className="mt-0">
          <Card className="bg-white shadow-sm">
            <CardHeader className="bg-[#F2CC8F] rounded-t-lg">
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Subscription Details
              </CardTitle>
              <CardDescription>Your current subscription plan and status</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">{subscriptionFields.map(renderField)}</div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="font-medium text-[#3D405B] flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Current Plan Features
                </h3>
                <ul className="space-y-2 pl-6">
                  {subscriptionPlans[schoolData.subscription_plan].features.map((feature, index) => (
                    <li key={index} className="text-sm flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex justify-end">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-[#3D405B] hover:bg-[#2A2B3D] text-white">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Upgrade Plan
                    </Button>
                  </DialogTrigger>
                  <PaymentDialog />
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="mt-0">
          <Card className="bg-white shadow-sm">
            <CardHeader className="bg-[#F2CC8F] rounded-t-lg">
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                System Details
              </CardTitle>
              <CardDescription>System information and status</CardDescription>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {systemFields.map(renderField)}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SchoolProfile