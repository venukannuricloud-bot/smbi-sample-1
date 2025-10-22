import { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useToast } from '@/hooks/use-toast';
import ModalConfirm from '@/components/ModalConfirm';

interface HouseholdMember {
  id: string;
  name: string;
  relationship: string;
  dateOfBirth: string;
}

export default function MemberProfile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);
  
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    zip: '62701',
  });

  const [householdMembers, setHouseholdMembers] = useState<HouseholdMember[]>([
    { id: '1', name: 'Jane Doe', relationship: 'Spouse', dateOfBirth: '1985-05-20' },
    { id: '2', name: 'Jimmy Doe', relationship: 'Child', dateOfBirth: '2010-08-15' },
  ]);

  const handleSave = () => {
    setIsEditing(false);
    toast({ title: 'Profile Updated', description: 'Your profile has been saved successfully.' });
    console.log('Profile saved:', profileData);
  };

  const handleAddMember = () => {
    const newMember: HouseholdMember = {
      id: String(Date.now()),
      name: '',
      relationship: '',
      dateOfBirth: '',
    };
    setHouseholdMembers([...householdMembers, newMember]);
    console.log('Member added');
  };

  const handleDeleteMember = (id: string) => {
    setMemberToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (memberToDelete) {
      setHouseholdMembers(householdMembers.filter((m) => m.id !== memberToDelete));
      toast({ title: 'Member Removed', description: 'Household member has been removed.' });
      console.log('Member deleted:', memberToDelete);
    }
    setDeleteModalOpen(false);
    setMemberToDelete(null);
  };

  return (
    <div className="p-6 space-y-6">
      <Breadcrumbs items={[{ label: 'Profile' }]} />
      
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Profile</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} data-testid="button-edit-profile">
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)} data-testid="button-cancel">
              Cancel
            </Button>
            <Button onClick={handleSave} data-testid="button-save">
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={profileData.firstName}
                onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                disabled={!isEditing}
                data-testid="input-first-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={profileData.lastName}
                onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                disabled={!isEditing}
                data-testid="input-last-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                disabled={!isEditing}
                data-testid="input-email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                disabled={!isEditing}
                data-testid="input-phone"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={profileData.address}
                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                disabled={!isEditing}
                data-testid="input-address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={profileData.city}
                onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                disabled={!isEditing}
                data-testid="input-city"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={profileData.state}
                onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                disabled={!isEditing}
                data-testid="input-state"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code</Label>
              <Input
                id="zip"
                value={profileData.zip}
                onChange={(e) => setProfileData({ ...profileData, zip: e.target.value })}
                disabled={!isEditing}
                data-testid="input-zip"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <CardTitle>Household Members</CardTitle>
          <Button size="sm" onClick={handleAddMember} data-testid="button-add-member">
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {householdMembers.map((member, index) => (
              <div key={member.id} className="border border-border rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={member.name}
                      onChange={(e) => {
                        const updated = [...householdMembers];
                        updated[index].name = e.target.value;
                        setHouseholdMembers(updated);
                      }}
                      data-testid={`input-member-name-${index}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Relationship</Label>
                    <Input
                      value={member.relationship}
                      onChange={(e) => {
                        const updated = [...householdMembers];
                        updated[index].relationship = e.target.value;
                        setHouseholdMembers(updated);
                      }}
                      data-testid={`input-member-relationship-${index}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Input
                      type="date"
                      value={member.dateOfBirth}
                      onChange={(e) => {
                        const updated = [...householdMembers];
                        updated[index].dateOfBirth = e.target.value;
                        setHouseholdMembers(updated);
                      }}
                      data-testid={`input-member-dob-${index}`}
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeleteMember(member.id)}
                    data-testid={`button-delete-member-${index}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ModalConfirm
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Remove Household Member"
        description="Are you sure you want to remove this household member? This action cannot be undone."
        confirmLabel="Remove"
        onConfirm={confirmDelete}
        variant="destructive"
      />
    </div>
  );
}
