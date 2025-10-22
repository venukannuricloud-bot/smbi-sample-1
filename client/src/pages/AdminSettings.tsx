import { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useToast } from '@/hooks/use-toast';

export default function AdminSettings() {
  const { toast } = useToast();
  
  const [brandColors, setBrandColors] = useState({
    primary: '#1836b2',
    accent: '#a066cb',
    info: '#86c7ed',
  });

  const [emailTemplates, setEmailTemplates] = useState({
    welcome: 'Welcome to SBMI! Thank you for joining our community.',
    reminder: 'This is a friendly reminder that your payment is due soon.',
    confirmation: 'Your payment has been received. Thank you!',
  });

  const [permissions, setPermissions] = useState([
    { id: '1', role: 'Admin', viewMembers: true, editMembers: true, viewPayments: true, processPayments: true },
    { id: '2', role: 'Manager', viewMembers: true, editMembers: true, viewPayments: true, processPayments: false },
    { id: '3', role: 'Viewer', viewMembers: true, editMembers: false, viewPayments: true, processPayments: false },
  ]);

  const handleSave = () => {
    console.log('Settings saved:', { brandColors, emailTemplates, permissions });
    toast({
      title: 'Settings Saved',
      description: 'Your changes have been saved successfully.',
    });
  };

  return (
    <div className="p-6 space-y-6">
      <Breadcrumbs items={[{ label: 'Settings' }]} />
      
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">System Settings</h1>
        <Button onClick={handleSave} data-testid="button-save-settings">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="roles" className="space-y-6">
        <TabsList>
          <TabsTrigger value="roles" data-testid="tab-roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="email" data-testid="tab-email">Email Templates</TabsTrigger>
          <TabsTrigger value="sms" data-testid="tab-sms">SMS Templates</TabsTrigger>
          <TabsTrigger value="branding" data-testid="tab-branding">Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
              <CardDescription>Manage user roles and their access permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {permissions.map((perm, index) => (
                  <div key={perm.id} className="border border-border rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{perm.role}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => console.log('Delete role:', perm.id)}
                        data-testid={`button-delete-role-${index}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`view-members-${perm.id}`}>View Members</Label>
                        <Switch
                          id={`view-members-${perm.id}`}
                          checked={perm.viewMembers}
                          onCheckedChange={(checked) => {
                            const updated = [...permissions];
                            updated[index].viewMembers = checked;
                            setPermissions(updated);
                          }}
                          data-testid={`switch-view-members-${index}`}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`edit-members-${perm.id}`}>Edit Members</Label>
                        <Switch
                          id={`edit-members-${perm.id}`}
                          checked={perm.editMembers}
                          onCheckedChange={(checked) => {
                            const updated = [...permissions];
                            updated[index].editMembers = checked;
                            setPermissions(updated);
                          }}
                          data-testid={`switch-edit-members-${index}`}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`view-payments-${perm.id}`}>View Payments</Label>
                        <Switch
                          id={`view-payments-${perm.id}`}
                          checked={perm.viewPayments}
                          onCheckedChange={(checked) => {
                            const updated = [...permissions];
                            updated[index].viewPayments = checked;
                            setPermissions(updated);
                          }}
                          data-testid={`switch-view-payments-${index}`}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`process-payments-${perm.id}`}>Process Payments</Label>
                        <Switch
                          id={`process-payments-${perm.id}`}
                          checked={perm.processPayments}
                          onCheckedChange={(checked) => {
                            const updated = [...permissions];
                            updated[index].processPayments = checked;
                            setPermissions(updated);
                          }}
                          data-testid={`switch-process-payments-${index}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" data-testid="button-add-role">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Role
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Customize email notifications sent to members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="welcome-email">Welcome Email</Label>
                <Textarea
                  id="welcome-email"
                  value={emailTemplates.welcome}
                  onChange={(e) => setEmailTemplates({ ...emailTemplates, welcome: e.target.value })}
                  rows={4}
                  data-testid="textarea-welcome-email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reminder-email">Payment Reminder</Label>
                <Textarea
                  id="reminder-email"
                  value={emailTemplates.reminder}
                  onChange={(e) => setEmailTemplates({ ...emailTemplates, reminder: e.target.value })}
                  rows={4}
                  data-testid="textarea-reminder-email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmation-email">Payment Confirmation</Label>
                <Textarea
                  id="confirmation-email"
                  value={emailTemplates.confirmation}
                  onChange={(e) => setEmailTemplates({ ...emailTemplates, confirmation: e.target.value })}
                  rows={4}
                  data-testid="textarea-confirmation-email"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms">
          <Card>
            <CardHeader>
              <CardTitle>SMS Templates</CardTitle>
              <CardDescription>Customize SMS notifications sent to members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reminder-sms">Payment Reminder SMS</Label>
                <Textarea
                  id="reminder-sms"
                  placeholder="Your SBMI payment is due soon. Please visit our portal to complete payment."
                  rows={3}
                  data-testid="textarea-reminder-sms"
                />
                <p className="text-xs text-muted-foreground">Character limit: 160</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmation-sms">Payment Confirmation SMS</Label>
                <Textarea
                  id="confirmation-sms"
                  placeholder="Your payment has been received. Thank you for being a valued SBMI member!"
                  rows={3}
                  data-testid="textarea-confirmation-sms"
                />
                <p className="text-xs text-muted-foreground">Character limit: 160</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>Brand Colors</CardTitle>
              <CardDescription>Customize the application's color scheme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primary-color"
                      type="color"
                      value={brandColors.primary}
                      onChange={(e) => setBrandColors({ ...brandColors, primary: e.target.value })}
                      className="w-20 h-10"
                      data-testid="input-primary-color"
                    />
                    <Input
                      value={brandColors.primary}
                      onChange={(e) => setBrandColors({ ...brandColors, primary: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accent-color">Accent Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="accent-color"
                      type="color"
                      value={brandColors.accent}
                      onChange={(e) => setBrandColors({ ...brandColors, accent: e.target.value })}
                      className="w-20 h-10"
                      data-testid="input-accent-color"
                    />
                    <Input
                      value={brandColors.accent}
                      onChange={(e) => setBrandColors({ ...brandColors, accent: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="info-color">Info Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="info-color"
                      type="color"
                      value={brandColors.info}
                      onChange={(e) => setBrandColors({ ...brandColors, info: e.target.value })}
                      className="w-20 h-10"
                      data-testid="input-info-color"
                    />
                    <Input
                      value={brandColors.info}
                      onChange={(e) => setBrandColors({ ...brandColors, info: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
