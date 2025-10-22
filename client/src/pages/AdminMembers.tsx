import { useState } from 'react';
import { Plus, Mail, UserX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Breadcrumbs from '@/components/Breadcrumbs';
import DataTable, { Column } from '@/components/DataTable';
import StatusBadge from '@/components/StatusBadge';
import ModalConfirm from '@/components/ModalConfirm';
import { useToast } from '@/hooks/use-toast';

export default function AdminMembers() {
  const { toast } = useToast();
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set());
  const [bulkActionModalOpen, setBulkActionModalOpen] = useState(false);
  const [bulkAction, setBulkAction] = useState<'remind' | 'deactivate' | null>(null);

  const columns: Column[] = [
    { key: 'checkbox', label: '', sortable: false },
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'joinDate', label: 'Join Date', sortable: true },
    { key: 'balance', label: 'Balance', sortable: true },
  ];

  const membersData = [
    {
      checkbox: <Checkbox onCheckedChange={(checked) => handleCheckbox('M001', checked)} data-testid="checkbox-M001" />,
      id: 'M001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      status: <StatusBadge status="active" />,
      joinDate: '2023-01-15',
      balance: '$0.00',
    },
    {
      checkbox: <Checkbox onCheckedChange={(checked) => handleCheckbox('M002', checked)} data-testid="checkbox-M002" />,
      id: 'M002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      status: <StatusBadge status="active" />,
      joinDate: '2023-02-20',
      balance: '$0.00',
    },
    {
      checkbox: <Checkbox onCheckedChange={(checked) => handleCheckbox('M003', checked)} data-testid="checkbox-M003" />,
      id: 'M003',
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      status: <StatusBadge status="inactive" />,
      joinDate: '2023-03-10',
      balance: '$50.00',
    },
    {
      checkbox: <Checkbox onCheckedChange={(checked) => handleCheckbox('M004', checked)} data-testid="checkbox-M004" />,
      id: 'M004',
      name: 'Alice Williams',
      email: 'alice.williams@example.com',
      status: <StatusBadge status="active" />,
      joinDate: '2023-04-05',
      balance: '$0.00',
    },
  ];

  const handleCheckbox = (id: string, checked: boolean | 'indeterminate') => {
    const newSelected = new Set(selectedMembers);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedMembers(newSelected);
  };

  const handleBulkAction = (action: 'remind' | 'deactivate') => {
    setBulkAction(action);
    setBulkActionModalOpen(true);
  };

  const confirmBulkAction = () => {
    console.log(`Bulk action ${bulkAction} on:`, Array.from(selectedMembers));
    toast({
      title: 'Action Completed',
      description: `${bulkAction === 'remind' ? 'Reminders sent' : 'Members deactivated'} successfully.`,
    });
    setSelectedMembers(new Set());
    setBulkActionModalOpen(false);
    setBulkAction(null);
  };

  const handleRowAction = (action: string, row: any) => {
    console.log(`Action ${action} on member:`, row);
    toast({
      title: 'Action Completed',
      description: `Member ${action}ed successfully.`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <Breadcrumbs items={[{ label: 'Members' }]} />
      
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Member Management</h1>
        <Button data-testid="button-add-member">
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      {selectedMembers.size > 0 && (
        <Card className="border-primary">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                {selectedMembers.size} member(s) selected
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('remind')}
                  data-testid="button-bulk-remind"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Reminder
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleBulkAction('deactivate')}
                  data-testid="button-bulk-deactivate"
                >
                  <UserX className="h-4 w-4 mr-2" />
                  Deactivate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Members</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={membersData}
            searchPlaceholder="Search members..."
            exportFilename="members.csv"
            actions={[
              { label: 'View Details', value: 'view' },
              { label: 'Edit', value: 'edit' },
              { label: 'Send Email', value: 'email' },
              { label: 'Deactivate', value: 'deactivate' },
            ]}
            onRowAction={handleRowAction}
          />
        </CardContent>
      </Card>

      <ModalConfirm
        open={bulkActionModalOpen}
        onOpenChange={setBulkActionModalOpen}
        title={bulkAction === 'remind' ? 'Send Reminders' : 'Deactivate Members'}
        description={
          bulkAction === 'remind'
            ? `Are you sure you want to send payment reminders to ${selectedMembers.size} member(s)?`
            : `Are you sure you want to deactivate ${selectedMembers.size} member(s)? This action can be reversed later.`
        }
        confirmLabel={bulkAction === 'remind' ? 'Send Reminders' : 'Deactivate'}
        onConfirm={confirmBulkAction}
        variant={bulkAction === 'deactivate' ? 'destructive' : 'default'}
      />
    </div>
  );
}
