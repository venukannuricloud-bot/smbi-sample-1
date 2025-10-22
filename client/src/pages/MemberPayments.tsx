import { useState } from 'react';
import { CreditCard, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Breadcrumbs from '@/components/Breadcrumbs';
import DataTable, { Column } from '@/components/DataTable';
import StatusBadge from '@/components/StatusBadge';
import { useToast } from '@/hooks/use-toast';

export default function MemberPayments() {
  const { toast } = useToast();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const columns: Column[] = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true },
    { key: 'method', label: 'Method', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'transactionId', label: 'Transaction ID' },
  ];

  const paymentHistory = [
    {
      date: '2024-10-15',
      amount: '$50.00',
      method: 'Stripe',
      status: <StatusBadge status="paid" />,
      transactionId: 'TXN-123456',
    },
    {
      date: '2024-09-15',
      amount: '$50.00',
      method: 'PayPal',
      status: <StatusBadge status="paid" />,
      transactionId: 'TXN-123455',
    },
    {
      date: '2024-08-15',
      amount: '$50.00',
      method: 'Stripe',
      status: <StatusBadge status="paid" />,
      transactionId: 'TXN-123454',
    },
    {
      date: '2024-07-15',
      amount: '$50.00',
      method: 'Stripe',
      status: <StatusBadge status="paid" />,
      transactionId: 'TXN-123453',
    },
  ];

  const handlePayment = (method: 'stripe' | 'paypal') => {
    console.log(`Payment initiated with ${method}`);
    toast({
      title: 'Payment Initiated',
      description: `Processing payment with ${method}...`,
    });
    setTimeout(() => {
      setPaymentModalOpen(false);
      toast({
        title: 'Payment Successful',
        description: 'Your payment has been processed successfully.',
      });
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <Breadcrumbs items={[{ label: 'Payments' }]} />
      
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Payment Management</h1>
        <Button onClick={() => setPaymentModalOpen(true)} data-testid="button-pay-now">
          <CreditCard className="h-4 w-4 mr-2" />
          Pay Now
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Paid (2024)</p>
              <p className="text-2xl font-bold">$500.00</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Outstanding Balance</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">$0.00</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Next Payment Due</p>
              <p className="text-2xl font-bold">Nov 15, 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={paymentHistory}
            searchPlaceholder="Search payments..."
            exportFilename="payment-history.csv"
          />
        </CardContent>
      </Card>

      <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Make a Payment</DialogTitle>
            <DialogDescription>
              Choose your preferred payment method to complete your transaction.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="stripe" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="stripe" data-testid="tab-stripe">Stripe</TabsTrigger>
              <TabsTrigger value="paypal" data-testid="tab-paypal">PayPal</TabsTrigger>
            </TabsList>
            <TabsContent value="stripe" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm font-medium mb-2">Payment Amount</p>
                  <p className="text-2xl font-bold">$50.00</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  You will be redirected to Stripe's secure payment page to complete your transaction.
                </p>
                <Button
                  className="w-full"
                  onClick={() => handlePayment('stripe')}
                  data-testid="button-stripe-pay"
                >
                  Pay with Stripe
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="paypal" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm font-medium mb-2">Payment Amount</p>
                  <p className="text-2xl font-bold">$50.00</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  You will be redirected to PayPal's secure payment page to complete your transaction.
                </p>
                <Button
                  className="w-full"
                  onClick={() => handlePayment('paypal')}
                  data-testid="button-paypal-pay"
                >
                  Pay with PayPal
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
