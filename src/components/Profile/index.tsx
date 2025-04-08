
import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Building, 
  Phone, 
  MapPin, 
  CreditCard, 
  Shield, 
  Upload,
  Edit2,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Form states with sample data
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    department: 'Sales',
    position: 'Regional Manager',
    office: 'San Francisco',
    employeeId: 'EMP-12345',
    notifications: {
      email: true,
      app: true,
      expenses: true,
      reports: false
    }
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setFormData({
      ...formData,
      notifications: {
        ...formData.notifications,
        [field]: value
      }
    });
  };

  const handleSave = () => {
    // In a real app, save the profile data to the server
    setIsEditing(false);
    // Show success toast
    console.log('Profile updated:', formData);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold">My Profile</h1>
        <Button 
          variant={isEditing ? "default" : "outline"}
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 relative">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                  <User className="h-12 w-12 text-primary" />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary text-white">
                    <Upload className="h-4 w-4" />
                  </button>
                )}
              </div>
              <CardTitle>{formData.name}</CardTitle>
              <CardDescription>{formData.position}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{formData.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{formData.phone}</span>
              </div>
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{formData.department}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{formData.office}</span>
              </div>
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{formData.employeeId}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  <Input 
                    id="name" 
                    value={formData.name} 
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                  <Input 
                    id="phone" 
                    value={formData.phone} 
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="department" className="text-sm font-medium">Department</label>
                  <Input 
                    id="department" 
                    value={formData.department} 
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="position" className="text-sm font-medium">Position</label>
                  <Input 
                    id="position" 
                    value={formData.position} 
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="office" className="text-sm font-medium">Office</label>
                  <Input 
                    id="office" 
                    value={formData.office} 
                    onChange={(e) => handleInputChange('office', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                  Notification Preferences
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="email-notif" className="text-sm">Email Notifications</label>
                    <Switch 
                      id="email-notif" 
                      checked={formData.notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="app-notif" className="text-sm">App Notifications</label>
                    <Switch 
                      id="app-notif" 
                      checked={formData.notifications.app}
                      onCheckedChange={(checked) => handleNotificationChange('app', checked)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="expense-notif" className="text-sm">Expense Approvals</label>
                    <Switch 
                      id="expense-notif" 
                      checked={formData.notifications.expenses}
                      onCheckedChange={(checked) => handleNotificationChange('expenses', checked)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="report-notif" className="text-sm">Report Generation</label>
                    <Switch 
                      id="report-notif" 
                      checked={formData.notifications.reports}
                      onCheckedChange={(checked) => handleNotificationChange('reports', checked)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className={isEditing ? "justify-end" : "hidden"}>
              <Button 
                variant="outline" 
                className="mr-2"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
