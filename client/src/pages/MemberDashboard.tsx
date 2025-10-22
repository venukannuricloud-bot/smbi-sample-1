import { DollarSign, Calendar, TrendingUp, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Breadcrumbs from '@/components/Breadcrumbs';
import ChartCard from '@/components/ChartCard';
import StatusBadge from '@/components/StatusBadge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MemberDashboard() {
  const paymentData = [
    { month: 'Jan', amount: 50 },
    { month: 'Feb', amount: 50 },
    { month: 'Mar', amount: 50 },
    { month: 'Apr', amount: 50 },
    { month: 'May', amount: 50 },
    { month: 'Jun', amount: 50 },
    { month: 'Jul', amount: 50 },
    { month: 'Aug', amount: 50 },
    { month: 'Sep', amount: 50 },
    { month: 'Oct', amount: 50 },
    { month: 'Nov', amount: 0 },
    { month: 'Dec', amount: 0 },
  ];

  const recentPayments = [
    { date: '2024-10-15', amount: '$50.00', status: 'paid' as const, method: 'Stripe' },
    { date: '2024-09-15', amount: '$50.00', status: 'paid' as const, method: 'PayPal' },
    { date: '2024-08-15', amount: '$50.00', status: 'paid' as const, method: 'Stripe' },
  ];

  return (
    <div className="p-6 space-y-6">
      <Breadcrumbs items={[{ label: 'Dashboard' }]} />
      
      <h1 className="text-3xl font-bold">Member Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment Due</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Nov 15, 2024</div>
            <p className="text-xs text-muted-foreground">In 24 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              All paid up
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$500.00</div>
            <p className="text-xs text-muted-foreground">10 of 12 months paid</p>
          </CardContent>
        </Card>
      </div>

      <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-900">
        <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-900 dark:text-blue-100">Important Notice</AlertTitle>
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          Annual membership renewal is coming up in December. Please update your payment method if needed.
        </AlertDescription>
      </Alert>

      <ChartCard
        title="Payment History"
        subtitle="Your monthly payments over the last 12 months"
        timeframes={[
          { label: '12 Months', value: '12m' },
          { label: '6 Months', value: '6m' },
        ]}
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={paymentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
              }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPayments.map((payment, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                data-testid={`payment-${index}`}
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">{payment.date}</p>
                  <p className="text-xs text-muted-foreground">{payment.method}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold">{payment.amount}</p>
                  <StatusBadge status={payment.status} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
