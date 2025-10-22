import { useState } from 'react';
import { Download, FileText, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Breadcrumbs from '@/components/Breadcrumbs';
import DataTable, { Column } from '@/components/DataTable';
import StatusBadge from '@/components/StatusBadge';
import { useToast } from '@/hooks/use-toast';

export default function AdminPayments() {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const columns: Column[] = [
    { key: 'id', label: 'Transaction ID', sortable: true },
    { key: 'member', label: 'Member', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true },
    { key: 'method', label: 'Method', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ];

  const paymentsData = [
    {
      id: 'TXN-123456',
      member: 'John Doe',
      date: '2024-10-15',
      amount: '$50.00',
      method: 'Stripe',
      status: <StatusBadge status="paid" />,
    },
    {
      id: 'TXN-123455',
      member: 'Jane Smith',
      date: '2024-10-14',
      amount: '$50.00',
      method: 'PayPal',
      status: <StatusBadge status="paid" />,
    },
    {
      id: 'TXN-123454',
      member: 'Bob Johnson',
      date: '2024-10-13',
      amount: '$50.00',
      method: 'Stripe',
      status: <StatusBadge status="pending" />,
    },
    {
      id: 'TXN-123453',
      member: 'Alice Williams',
      date: '2024-10-10',
      amount: '$50.00',
      method: 'Check',
      status: <StatusBadge status="paid" />,
    },
    {
      id: 'TXN-123452',
      member: 'Charlie Brown',
      date: '2024-09-28',
      amount: '$50.00',
      method: 'Stripe',
      status: <StatusBadge status="overdue" />,
    },
  ];

  const handleExportPDF = () => {
    console.log('Exporting payments to PDF');
    toast({
      title: 'Export Initiated',
      description: 'Payments report will be downloaded as PDF shortly.',
    });
  };

  const handleRowAction = (action: string, row: any) => {
    console.log(`Action ${action} on payment:`, row);
    toast({
      title: 'Action Completed',
      description: `Payment ${action}ed successfully.`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <Breadcrumbs items={[{ label: 'Payments' }]} />
      
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Payment Tracking</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportPDF} data-testid="button-export-pdf">
            <FileText className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" data-testid="button-export-csv">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status-filter">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status-filter" data-testid="select-status-filter">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="method-filter">Payment Method</Label>
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger id="method-filter" data-testid="select-method-filter">
                  <SelectValue placeholder="All Methods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-from">From Date</Label>
              <Input
                id="date-from"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                data-testid="input-date-from"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-to">To Date</Label>
              <Input
                id="date-to"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                data-testid="input-date-to"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$14,750.00</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$850.00</div>
            <p className="text-xs text-muted-foreground">17 payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">$1,200.00</div>
            <p className="text-xs text-muted-foreground">24 payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.5%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={paymentsData}
            searchPlaceholder="Search payments..."
            exportFilename="payments.csv"
            actions={[
              { label: 'View Details', value: 'view' },
              { label: 'Send Receipt', value: 'receipt' },
              { label: 'Refund', value: 'refund' },
            ]}
            onRowAction={handleRowAction}
          />
        </CardContent>
      </Card>
    </div>
  );
}
