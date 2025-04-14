import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from "react"
import { School, FileText, MapPin, Phone, Mail, Globe, Building } from "lucide-react"
import { FieldConfig } from '@/components/school-profile'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

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

const RegisterSchoolPage = () => {
  const navigate = useNavigate();
  const [schoolData, setSchoolData] = useState<Record<string, unknown>>({})
  const readOnlyFields: string[] = []

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
        {!isReadOnly ? (
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
            {String(value || "N/A")}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-gray-800">Register School</h1>
      <p className="text-gray-600">Please fill in the details below to register a new school.</p>
      <form className="space-y-4">
        {schoolInfoFields.map(renderField)}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          onClick={() => navigate({ to: '/admin/dashboard'})}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export const Route = createFileRoute('/auth/register-school')({
  component: RegisterSchoolPage,
})
