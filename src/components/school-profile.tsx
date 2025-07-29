import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  AlertCircle,
  Award,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Download,
  Edit,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react"
import { themeColors } from "./ui/theme-config"
import { School } from "@/types";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

// School categories, ownership, curriculum options
const SCHOOL_CATEGORIES = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'combined', label: 'Combined' }
];

const OWNERSHIP_TYPES = [
  { value: 'public', label: 'Public' },
  { value: 'private', label: 'Private' },
  { value: 'international', label: 'International' },
  { value: 'other', label: 'Other' }
];

const CURRICULUM_TYPES = [
  { value: 'national', label: 'National' },
  { value: 'international', label: 'International' },
  { value: 'mixed', label: 'Mixed' }
];
// Make sure to import or define the School type above this component
export default function SchoolProfile({ school, onUpdateSchool }: { school: School, onUpdateSchool: (updatedSchool: School) => void }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
      name: school?.name || '',
      about: school?.about || '',
      motto: school?.motto || '',
      registrationNumber: school?.registrationNumber || '',
      logoUrl: school?.logoUrl || '',
      category: school?.category || '',
      ownership: school?.ownership || '',
      curriculum: school?.curriculum || '',
      stateProvince: school?.stateProvince || '',
      city: school?.city || '',
      township: school?.township || '',
      address: school?.address || '',
      postalAddress: school?.postalAddress || '',
      subdomain: school?.subdomain || ''
    });
  const [errors, setErrors] = useState<Errors>({});

  // Handle form input changes
  interface FormData {
    name: string;
    about: string;
    motto: string;
    registrationNumber: string;
    logoUrl: string;
    category: string;
    ownership: string;
    curriculum: string;
    stateProvince: string;
    city: string;
    township: string;
    address: string;
    postalAddress: string;
    subdomain: string;
  }

  interface Errors {
    [key: string]: string | undefined;
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev: FormData) => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: Errors) => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors: Errors = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = 'School name is required';
    }
    
    if (!formData.registrationNumber?.trim()) {
      newErrors.registrationNumber = 'Registration number is required';
    }
    
    if (!formData.subdomain?.trim()) {
      newErrors.subdomain = 'Subdomain is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.subdomain)) {
      newErrors.subdomain = 'Subdomain can only contain lowercase letters, numbers, and hyphens';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // API call to update school
      const response = await fetch(`/api/schools/${school.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update school');
      }

      const updatedSchool = await response.json();
      
      // Call the callback to update the parent component
      if (onUpdateSchool) {
        onUpdateSchool(updatedSchool);
      }
      
      setIsEditDialogOpen(false);
      
      // Show success message (you might want to use a toast notification)
      alert('School profile updated successfully!');
      
    } catch (error) {
      console.error('Error updating school:', error);
      if (error instanceof Error) {
        alert(`Error updating school: ${error.message}`);
      } else {
        alert('Error updating school: An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Print school overview function
  const handleExportProfile = () => {
    const printContent = `
      <html>
        <head>
          <title>${school?.name || 'School'} - Profile Export</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              max-width: 800px; 
              margin: 0 auto; 
              padding: 20px; 
            }
            .header { 
              text-align: center; 
              border-bottom: 2px solid #333; 
              padding-bottom: 20px; 
              margin-bottom: 30px; 
            }
            .logo { 
              max-width: 100px; 
              max-height: 100px; 
              margin-bottom: 10px; 
            }
            .section { 
              margin-bottom: 30px; 
            }
            .section-title { 
              font-size: 18px; 
              font-weight: bold; 
              margin-bottom: 15px; 
              color: #2563eb; 
              border-bottom: 1px solid #e5e7eb; 
              padding-bottom: 5px; 
            }
            .info-grid { 
              display: grid; 
              grid-template-columns: 1fr 1fr; 
              gap: 15px; 
              margin-bottom: 20px; 
            }
            .info-item { 
              margin-bottom: 10px; 
            }
            .info-label { 
              font-weight: bold; 
              color: #4b5563; 
            }
            .info-value { 
              margin-left: 10px; 
            }
            .status-badge { 
              display: inline-block; 
              padding: 4px 8px; 
              border-radius: 4px; 
              font-size: 12px; 
              font-weight: bold; 
              text-transform: capitalize; 
            }
            .status-approved { 
              background-color: #d1fae5; 
              color: #065f46; 
            }
            .status-pending { 
              background-color: #fef3c7; 
              color: #92400e; 
            }
            .about-section { 
              background-color: #f9fafb; 
              padding: 15px; 
              border-radius: 8px; 
              margin-top: 20px; 
            }
            @media print {
              body { margin: 0; padding: 15px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            ${school?.logoUrl ? `<img src="${school.logoUrl}" alt="School Logo" class="logo">` : ''}
            <h1>${school?.name || 'School Name'}</h1>
            ${school?.motto ? `<p style="font-style: italic; color: #6b7280;">"${school.motto}"</p>` : ''}
          </div>

          <div class="section">
            <h2 class="section-title">School Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">School Category:</span>
                <span class="info-value">${school?.category || 'Not specified'}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Ownership:</span>
                <span class="info-value">${school?.ownership || 'Not specified'}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Curriculum:</span>
                <span class="info-value">${school?.curriculum || 'Not specified'}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Registration Number:</span>
                <span class="info-value">${school?.registrationNumber || 'Not provided'}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Location:</span>
                <span class="info-value">${[school?.city, school?.township, school?.stateProvince].filter(Boolean).join(', ') || 'Not specified'}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Subdomain:</span>
                <span class="info-value">${school?.subdomain || 'Not assigned'}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Status:</span>
                <span class="status-badge status-${school?.status?.toLowerCase() || 'unknown'}">${school?.status || 'Unknown'}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Registration Date:</span>
                <span class="info-value">${formatDate(school?.createdAt)}</span>
              </div>
            </div>
            
            ${school?.address ? `
              <div class="info-item">
                <span class="info-label">Address:</span>
                <span class="info-value">${school.address}</span>
              </div>
            ` : ''}
            
            ${school?.postalAddress ? `
              <div class="info-item">
                <span class="info-label">Postal Address:</span>
                <span class="info-value">${school.postalAddress}</span>
              </div>
            ` : ''}
          </div>

          ${school?.about ? `
            <div class="section">
              <h2 class="section-title">About ${school.name}</h2>
              <div class="about-section">
                <p>${school.about}</p>
              </div>
            </div>
          ` : ''}

          <div class="section">
            <h2 class="section-title">Subscription Information</h2>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Subscription Status:</span>
                <span class="info-value">${school?.subscriptionStatus || 'Unknown'}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Start Date:</span>
                <span class="info-value">${formatDate(school?.subscriptionStartDate)}</span>
              </div>
              <div class="info-item">
                <span class="info-label">End Date:</span>
                <span class="info-value">${formatDate(school?.subscriptionEndDate)}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Contacts:</span>
                <span class="info-value">${school?.contacts?.length || 0} contact${school?.contacts?.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>

          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
            <p>Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </body>
      </html>
    `;

    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(printContent);
      newWindow.document.close();
      newWindow.print();
    } else {
      alert('Failed to open a new window for exporting the profile. Please check your popup blocker settings.');
    }
  };
  
  // Helper function to format dates
  const formatDate = (dateString: string | number | Date | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Helper function to get subscription status color and icon
  const getSubscriptionStatusInfo = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return { color: 'text-green-600', icon: CheckCircle, bgColor: 'bg-green-50' };
      case 'cancelled':
        return { color: 'text-red-600', icon: AlertCircle, bgColor: 'bg-red-50' };
      default:
        return { color: 'text-gray-600', icon: AlertCircle, bgColor: 'bg-gray-50' };
    }
  };

  // Helper function to get school status info
  const getSchoolStatusInfo = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return { color: 'text-green-600', bgColor: 'bg-green-50' };
      case 'pending':
        return { color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
      case 'rejected':
        return { color: 'text-red-600', bgColor: 'bg-red-50' };
      case 'suspended':
        return { color: 'text-orange-600', bgColor: 'bg-orange-50' };
      default:
        return { color: 'text-gray-600', bgColor: 'bg-gray-50' };
    }
  };

  const subscriptionStatusInfo = getSubscriptionStatusInfo(school?.subscriptionStatus);
  const schoolStatusInfo = getSchoolStatusInfo(school?.status);
  const StatusIcon = subscriptionStatusInfo.icon;

  return (
    <div className="container mx-auto p-2 sm:p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
        <div className="flex items-center gap-4">
          {school?.logoUrl && (
            <img 
              src={school.logoUrl} 
              alt={`${school.name} logo`}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
            />
          )}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{school?.name || 'School Name'}</h1>
            {school?.motto && (
              <p className="text-gray-600 italic mt-1 text-sm">"{school.motto}"</p>
            )}
          </div>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none items-center gap-2 min-h-[44px]" onClick={() => handleExportProfile()}>
            <Download size={16} />
            Export Profile
          </Button>
          <Button className={`flex-1 sm:flex-none items-center gap-2 min-h-[44px] ${themeColors.accentBg} ${themeColors.accentHover} text-white`} onClick={() => setIsEditDialogOpen(true)}>
            <Edit size={16} />
            Edit Profile
          </Button>
        </div>
      </div>

      {!isEditDialogOpen ? <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>School Overview</CardTitle>
            <CardDescription>General information about the school</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Building className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">School Category</h3>
                    <p className="text-sm text-gray-500 capitalize">{school?.category || 'Not specified'}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Award className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Ownership</h3>
                    <p className="text-sm text-gray-500 capitalize">{school?.ownership || 'Not specified'}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <GraduationCap className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Curriculum</h3>
                    <p className="text-sm text-gray-500 capitalize">{school?.curriculum || 'Not specified'}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-sm text-gray-500">
                      {[school?.city, school?.township, school?.stateProvince]
                        .filter(Boolean)
                        .join(', ') || 'Not specified'}
                    </p>
                    {school?.address && (
                      <p className="text-sm text-gray-500 mt-1">{school.address}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <Globe className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Subdomain</h3>
                    <p className="text-sm text-gray-500">{school?.subdomain || 'Not assigned'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Registration Number</h3>
                    <p className="text-sm text-gray-500">{school?.registrationNumber || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Postal Address</h3>
                    <p className="text-sm text-gray-500">{school?.postalAddress || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <CheckCircle className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">School Status</h3>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${schoolStatusInfo.color} ${schoolStatusInfo.bgColor} capitalize`}>
                      {school?.status || 'Unknown'}
                    </span>
                    {school?.approvedAt && (
                      <p className="text-xs text-gray-500 mt-1">
                        Approved on {formatDate(school.approvedAt)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Registration Date</h3>
                    <p className="text-sm text-gray-500">{formatDate(school?.createdAt)}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="mr-2 h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Last Updated</h3>
                    <p className="text-sm text-gray-500">{formatDate(school?.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {school?.about && (
              <div className="mt-6">
                <h3 className="font-medium mb-2">About {school.name}</h3>
                <p className="text-sm text-gray-500">{school.about}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Information</CardTitle>
            <CardDescription>Current subscription details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${subscriptionStatusInfo.bgColor}`}>
                <div className="flex items-center gap-2">
                  <StatusIcon size={16} className={subscriptionStatusInfo.color} />
                  <div className="text-sm text-gray-500">Subscription Status</div>
                </div>
                <div className={`text-2xl font-bold mt-1 capitalize ${subscriptionStatusInfo.color}`}>
                  {school?.subscriptionStatus || 'Unknown'}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar size={16} className="text-gray-500" />
                  <div className="text-sm text-gray-500">Start Date</div>
                </div>
                <div className="text-lg font-semibold">
                  {formatDate(school?.subscriptionStartDate)}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar size={16} className="text-gray-500" />
                  <div className="text-sm text-gray-500">End Date</div>
                </div>
                <div className="text-lg font-semibold">
                  {formatDate(school?.subscriptionEndDate)}
                </div>
                {school?.subscriptionEndDate && (
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(school.subscriptionEndDate) > new Date() 
                      ? `${Math.ceil((new Date(school.subscriptionEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining`
                      : 'Expired'
                    }
                  </div>
                )}
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard size={16} className="text-gray-500" />
                  <div className="text-sm text-gray-500">Subdomain</div>
                </div>
                <div className="text-lg font-semibold">
                  {school?.subdomain || 'Not assigned'}
                </div>
                {school?.subdomain && (
                  <div className="text-xs text-blue-600 mt-1">
                    {school.subdomain}.yourdomain.com
                  </div>
                )}
              </div>

              {school?.contacts && school.contacts.length > 0 && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Users size={16} className="text-gray-500" />
                    <div className="text-sm text-gray-500">Contacts</div>
                  </div>
                  <div className="text-lg font-semibold">
                    {school.contacts.length} contact{school.contacts.length !== 1 ? 's' : ''}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div> 
 :
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
  <div className="bg-white w-full max-w-[95vw] sm:max-w-[700px] p-4 sm:p-6 rounded-2xl max-h-[90vh] overflow-y-auto">
    {/* Header */}
    <div className="mb-6">
      <h2 className="text-xl sm:text-2xl font-bold">Edit School Profile</h2>
    </div>
    
    {/* Content */}
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 border-b pb-2">Basic Information</h4>
            <div>
              <Label htmlFor="name">School Name *</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="registrationNumber">Registration Number *</Label>
              <Input
                id="registrationNumber"
                value={formData.registrationNumber || ''}
                onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                className={errors.registrationNumber ? 'border-red-500' : ''}
              />
              {errors.registrationNumber && <p className="text-red-500 text-xs mt-1">{errors.registrationNumber}</p>}
            </div>
            <div>
              <Label htmlFor="subdomain">Subdomain *</Label>
              <Input
                id="subdomain"
                value={formData.subdomain || ''}
                onChange={(e) => handleInputChange('subdomain', e.target.value.toLowerCase())}
                className={errors.subdomain ? 'border-red-500' : ''}
                placeholder="yourschool"
              />
              {errors.subdomain && <p className="text-red-500 text-xs mt-1">{errors.subdomain}</p>}
              <p className="text-xs text-gray-500 mt-1">yourschool.yourdomain.com</p>
            </div>
            <div>
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input
                id="logoUrl"
                value={formData.logoUrl || ''}
                onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                placeholder="https://example.com/logo.png"
              />
            </div>
            <div>
              <Label htmlFor="motto">School Motto</Label>
              <Input
                id="motto"
                value={formData.motto || ''}
                onChange={(e) => handleInputChange('motto', e.target.value)}
                placeholder="Enter school motto"
              />
            </div>
            <div>
              <Label htmlFor="about">About</Label>
              <Textarea
                id="about"
                value={formData.about || ''}
                onChange={(e) => handleInputChange('about', e.target.value)}
                placeholder="Describe your school"
                rows={4}
              />
            </div>
          </div>
          
          {/* School Details */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 border-b pb-2">School Details</h4>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category || ''}
                onValueChange={(value) => handleInputChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {SCHOOL_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="ownership">Ownership</Label>
              <Select
                value={formData.ownership || ''}
                onValueChange={(value) => handleInputChange('ownership', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select ownership" />
                </SelectTrigger>
                <SelectContent>
                  {OWNERSHIP_TYPES.map((own) => (
                    <SelectItem key={own.value} value={own.value}>
                      {own.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="curriculum">Curriculum</Label>
              <Select
                value={formData.curriculum || ''}
                onValueChange={(value) => handleInputChange('curriculum', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select curriculum" />
                </SelectTrigger>
                <SelectContent>
                  {CURRICULUM_TYPES.map((cur) => (
                    <SelectItem key={cur.value} value={cur.value}>
                      {cur.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="stateProvince">State/Province</Label>
              <Input
                id="stateProvince"
                value={formData.stateProvince || ''}
                onChange={(e) => handleInputChange('stateProvince', e.target.value)}
                placeholder="Enter state or province"
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city || ''}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Enter city"
              />
            </div>
            <div>
              <Label htmlFor="township">Township</Label>
              <Input
                id="township"
                value={formData.township || ''}
                onChange={(e) => handleInputChange('township', e.target.value)}
                placeholder="Enter township"
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter address"
              />
            </div>
            <div>
              <Label htmlFor="postalAddress">Postal Address</Label>
              <Input
                id="postalAddress"
                value={formData.postalAddress || ''}
                onChange={(e) => handleInputChange('postalAddress', e.target.value)}
                placeholder="Enter postal address"
              />
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)} className="w-full sm:w-auto h-12 rounded-xl">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto h-12 rounded-xl">
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  </div>
</div> }
    </div>
  );
}
