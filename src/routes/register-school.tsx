import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import {
  School,
  FileText,
  MapPin,
  Phone,
  Mail,
  Globe,
  Building,
  BookOpen,
  MapPinned,
  Flag,
  Building2,
  Save,
} from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { toast } from '@/hooks/use-toast'

// Schema for form validation
const schoolFormSchema = z.object({
  // Basic Info
  name: z.string().min(3, { message: "School name must be at least 3 characters" }),
  registration_number: z.string().min(1, { message: "Registration number is required" }),
  motto: z.string().min(3, { message: "School motto must be at least 3 characters" }),
  about: z.string().min(10, { message: "Please provide a brief description of the school" }).max(500, { message: "Description must be less than 500 characters" }),
  
  // Contact Info
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  subdomain: z.string()
    .regex(/^[a-zA-Z0-9-]+$/, { message: "Subdomain can only contain letters, numbers, and hyphens" })
    .min(3, { message: "Subdomain must be at least 3 characters" })
    .optional()
    .or(z.literal('')),
  
  // Address
  street_address: z.string().min(3, { message: "Street address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  province: z.string().min(2, { message: "Province is required" }),
  postal_code: z.string().optional(),
  country: z.string().default("Zambia"),
  
  // School Details
  school_type: z.enum(["primary", "secondary", "combined"], {
    required_error: "Please select a school type",
  }),
  ownership: z.enum(["public", "private", "international"], {
    required_error: "Please select an ownership type",
  }),
  curriculum: z.enum(["ECZ", "Cambridge", "Both"], {
    required_error: "Please select a curriculum",
  }),
  logoUrl: z.string().url({ message: "Please enter a valid URL" }).optional(),
  township: z.string().min(2, { message: "Township is required" }).optional(),
  address: z.string().min(10, { message: "Address must be at least 10 characters" }).optional(),
  postalAddress: z.string().min(5, { message: "Postal address must be at least 5 characters" }).optional(),
  contacts: z.array(z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  })).min(1, { message: "At least one contact is required" }).optional(),
})

type SchoolFormValues = z.infer<typeof schoolFormSchema>

// Default values for the form
const defaultValues: Partial<SchoolFormValues> = {
  name: "",
  registration_number: "",
  motto: "",
  about: "",
  email: "",
  phone: "",
  subdomain: "",
  street_address: "",
  city: "",
  province: "",
  postal_code: "",
  country: "Zambia",
  school_type: undefined,
  ownership: undefined,
  curriculum: undefined,
  logoUrl: "",
  township: "",
  address: "",
  postalAddress: "",
  contacts: [],
}

// API function to submit school data
// const submitSchoolData = async (data: SchoolFormValues): Promise<{ success: boolean; message: string }> => {
//   try {
//     // Replace with your actual API endpoint
//     const response = await fetch('/api/schools/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
    
//     const result = await response.json()
    
//     if (!response.ok) {
//       throw new Error(result.message || 'Failed to register school')
//     }
    
//     return { success: true, message: 'School registered successfully' }
//   } catch (error) {
//     console.error('Error registering school:', error)
//     return { 
//       success: false, 
//       message: error instanceof Error ? error.message : 'Failed to register school' 
//     }
//   }
// }

const RegisterSchoolPage = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Initialize form with react-hook-form and zod validation
  const form = useForm<SchoolFormValues>({
    resolver: zodResolver(schoolFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'contacts',
  })

  const onSubmit = async (data: SchoolFormValues) => {
    setIsSubmitting(true)
    toast({ title: 'Registering...', description: 'Submitting school details', duration: 2000 })
    
    try {
      // Map frontend fields to backend fields
      const payload = {
        name: data.name,
        about: data.about,
        motto: data.motto,
        registrationNumber: data.registration_number,
        logoUrl: data.logoUrl,
        category: data.school_type,
        ownership: data.ownership,
        curriculum: data.curriculum === 'Both' ? 'mixed' : data.curriculum === 'ECZ' ? 'national' : data.curriculum === 'Cambridge' ? 'international' : data.curriculum,
        stateProvince: data.province,
        city: data.city,
        township: data.township,
        address: data.address,
        postalAddress: data.postalAddress,
        postalCode: data.postal_code,
        subdomain: data.subdomain,
        contacts: data.contacts && data.contacts.length > 0 ? data.contacts : [],
      }
      const response = await fetch('/api/schools/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.message || 'Failed to register school')
      }
      toast({ title: 'Success', description: 'School registered successfully' })
      const schoolSlug = data.subdomain || data.name.toLowerCase().replace(/\s+/g, '-')
        navigate({ to: '/$school', params: { school: schoolSlug } })
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-blue-50 rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-blue-800">Register New School</CardTitle>
          <CardDescription>
            Please complete all required fields to register your school in our system.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs defaultValue="basic" className="w-full" onValueChange={(value) => console.log(value)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Information</TabsTrigger>
                  <TabsTrigger value="contact">Contact & Address</TabsTrigger>
                  <TabsTrigger value="details">School Details</TabsTrigger>
                </TabsList>
                
                {/* Basic Information Tab */}
                <TabsContent value="basic" className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <School className="h-4 w-4 text-blue-600" />
                            School Name
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter school name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="registration_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-blue-600" />
                            Registration Number
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter official registration number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="motto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          School Motto
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter school motto" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          About the School
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter a brief description of the school" 
                            {...field} 
                            className="resize-none"
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="logoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <School className="h-4 w-4 text-blue-600" />
                          Logo URL
                        </FormLabel>
                        <FormControl>
                          <Input type="url" placeholder="Enter logo URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                {/* Contact & Address Tab */}
                <TabsContent value="contact" className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-blue-600" />
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="school@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-blue-600" />
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+260 XXX XXX XXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subdomain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-blue-600" />
                          Subdomain
                        </FormLabel>
                        <FormControl>
                          <Input type="url" placeholder="school-name-without-space" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4 border p-4 rounded-md bg-slate-50">
                    <h3 className="text-md font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      Physical Address
                    </h3>
                    
                    <FormField
                      control={form.control}
                      name="street_address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <MapPinned className="h-4 w-4 text-blue-600" />
                            Street Address
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter street address" 
                              {...field} 
                              className="resize-none"
                              rows={2}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-blue-600" />
                              City/Town
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="City or town name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="province"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Province</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select province" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Central">Central</SelectItem>
                                <SelectItem value="Copperbelt">Copperbelt</SelectItem>
                                <SelectItem value="Eastern">Eastern</SelectItem>
                                <SelectItem value="Luapula">Luapula</SelectItem>
                                <SelectItem value="Lusaka">Lusaka</SelectItem>
                                <SelectItem value="Muchinga">Muchinga</SelectItem>
                                <SelectItem value="Northern">Northern</SelectItem>
                                <SelectItem value="North-Western">North-Western</SelectItem>
                                <SelectItem value="Southern">Southern</SelectItem>
                                <SelectItem value="Western">Western</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="postal_code"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="10101" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Flag className="h-4 w-4 text-blue-600" />
                              Country
                            </FormLabel>
                            <FormControl>
                              <Input {...field} readOnly className="bg-gray-50" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="township"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-blue-600" />
                          Township
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter township" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MapPinned className="h-4 w-4 text-blue-600" />
                          Address
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter address" 
                            {...field} 
                            className="resize-none"
                            rows={2}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="postalAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MapPinned className="h-4 w-4 text-blue-600" />
                          Postal Address
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter postal address" 
                            {...field} 
                            className="resize-none"
                            rows={2}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Contacts Array */}
                  <div className="space-y-4">
                    <label className="block text-md font-medium mb-2">Contacts</label>
                    {fields.map((item, index) => (
                      <div key={item.id} className="flex flex-col sm:flex-row gap-2 items-center mb-2">
                        <FormField
                          control={form.control}
                          name={`contacts.${index}.email`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Contact email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`contacts.${index}.phone`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="Contact phone" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="button" variant="destructive" className="h-10 mt-6" onClick={() => remove(index)} disabled={fields.length === 1}>
                          Remove
                    </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={() => append({ email: '', phone: '' })}>
                      Add Contact
                    </Button>
                  </div>
                </TabsContent>
                
                {/* School Details Tab */}
                <TabsContent value="details" className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="school_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <School className="h-4 w-4 text-blue-600" />
                            School Category
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="primary">Primary</SelectItem>
                              <SelectItem value="secondary">Secondary</SelectItem>
                              <SelectItem value="combined">Combined</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="ownership"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-blue-600" />
                            Ownership
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select ownership" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="public">Public</SelectItem>
                              <SelectItem value="private">Private</SelectItem>
                              <SelectItem value="international">International</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="curriculum"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-blue-600" />
                            Curriculum
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select curriculum" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ECZ">ECZ</SelectItem>
                              <SelectItem value="Cambridge">Cambridge</SelectItem>
                              <SelectItem value="Both">Both</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      {isSubmitting ? "Registering..." : "Register School"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="bg-gray-50 border-t py-4 text-sm text-gray-500 flex justify-center">
          All fields are required
        </CardFooter>
      </Card>
    </div>
  )
}

export const Route = createFileRoute('/register-school')({
  component: RegisterSchoolPage,
})