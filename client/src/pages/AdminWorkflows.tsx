import { useState } from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Breadcrumbs from '@/components/Breadcrumbs';
import StatusBadge from '@/components/StatusBadge';
import { useToast } from '@/hooks/use-toast';

interface WorkflowItem {
  id: string;
  type: 'application' | 'dispute';
  memberName: string;
  description: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function AdminWorkflows() {
  const { toast } = useToast();
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowItem | null>(null);
  const [action, setAction] = useState<'approve' | 'deny' | null>(null);
  const [notes, setNotes] = useState('');

  const [workflows, setWorkflows] = useState<WorkflowItem[]>([
    {
      id: 'WF-001',
      type: 'application',
      memberName: 'Sarah Connor',
      description: 'New membership application',
      date: '2024-10-20',
      status: 'pending',
    },
    {
      id: 'WF-002',
      type: 'dispute',
      memberName: 'John Doe',
      description: 'Payment dispute for October invoice',
      date: '2024-10-19',
      status: 'pending',
    },
    {
      id: 'WF-003',
      type: 'application',
      memberName: 'Mike Johnson',
      description: 'Family membership upgrade request',
      date: '2024-10-18',
      status: 'pending',
    },
  ]);

  const handleAction = (workflow: WorkflowItem, actionType: 'approve' | 'deny') => {
    setSelectedWorkflow(workflow);
    setAction(actionType);
    setActionModalOpen(true);
  };

  const confirmAction = () => {
    if (selectedWorkflow && action) {
      const updatedWorkflows = workflows.map((w) =>
        w.id === selectedWorkflow.id
          ? { ...w, status: action === 'approve' ? 'approved' as const : 'rejected' as const }
          : w
      );
      setWorkflows(updatedWorkflows);

      console.log(`${action}ed workflow ${selectedWorkflow.id} with notes:`, notes);
      toast({
        title: `Workflow ${action === 'approve' ? 'Approved' : 'Denied'}`,
        description: `${selectedWorkflow.memberName}'s ${selectedWorkflow.type} has been ${action}d.`,
      });
    }
    setActionModalOpen(false);
    setSelectedWorkflow(null);
    setAction(null);
    setNotes('');
  };

  const pendingWorkflows = workflows.filter((w) => w.status === 'pending');
  const processedWorkflows = workflows.filter((w) => w.status !== 'pending');

  return (
    <div className="p-6 space-y-6">
      <Breadcrumbs items={[{ label: 'Workflows' }]} />
      
      <h1 className="text-3xl font-bold">Workflow Approvals</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingWorkflows.length}</div>
            <p className="text-xs text-muted-foreground">Require action</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workflows.filter((w) => w.status === 'approved').length}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Denied</CardTitle>
            <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workflows.filter((w) => w.status === 'rejected').length}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Approval Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingWorkflows.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No pending workflows
              </p>
            ) : (
              pendingWorkflows.map((workflow) => (
                <div
                  key={workflow.id}
                  className="border border-border rounded-md p-4 flex items-center justify-between gap-4"
                  data-testid={`workflow-${workflow.id}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{workflow.memberName}</h3>
                      <StatusBadge status={workflow.status} />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {workflow.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{workflow.type === 'application' ? 'Application' : 'Dispute'}</span>
                      <span>•</span>
                      <span>{workflow.date}</span>
                      <span>•</span>
                      <span>{workflow.id}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAction(workflow, 'deny')}
                      data-testid={`button-deny-${workflow.id}`}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Deny
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleAction(workflow, 'approve')}
                      data-testid={`button-approve-${workflow.id}`}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {processedWorkflows.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recently Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {processedWorkflows.map((workflow) => (
                <div
                  key={workflow.id}
                  className="border border-border rounded-md p-3 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">{workflow.memberName}</span>
                      <span className="text-xs text-muted-foreground">
                        {workflow.description}
                      </span>
                    </div>
                  </div>
                  <StatusBadge status={workflow.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={actionModalOpen} onOpenChange={setActionModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {action === 'approve' ? 'Approve' : 'Deny'} Workflow
            </DialogTitle>
            <DialogDescription>
              {action === 'approve'
                ? `You are about to approve ${selectedWorkflow?.memberName}'s ${selectedWorkflow?.type}.`
                : `You are about to deny ${selectedWorkflow?.memberName}'s ${selectedWorkflow?.type}.`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes or comments..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                data-testid="textarea-notes"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionModalOpen(false)} data-testid="button-cancel">
              Cancel
            </Button>
            <Button
              onClick={confirmAction}
              variant={action === 'deny' ? 'destructive' : 'default'}
              data-testid="button-confirm-action"
            >
              {action === 'approve' ? 'Approve' : 'Deny'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
