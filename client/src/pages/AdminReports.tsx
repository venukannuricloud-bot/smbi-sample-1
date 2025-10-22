import { Download, FileText, Users, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useToast } from '@/hooks/use-toast';

export default function AdminReports() {
  const { toast } = useToast();

  const reports = [
    {
      id: 'members',
      title: 'Members Report',
      description: 'Complete list of all members with contact information and status',
      icon: Users,
      format: 'CSV',
      filename: 'members.csv',
    },
    {
      id: 'payments',
      title: 'Payments Report',
      description: 'Detailed transaction history with payment methods and dates',
      icon: DollarSign,
      format: 'CSV',
      filename: 'payments.csv',
    },
    {
      id: 'arrears',
      title: 'Arrears Report',
      description: 'Members with outstanding balances and overdue payments',
      icon: FileText,
      format: 'PDF',
      filename: 'arrears.pdf',
    },
  ];

  const handleDownload = (report: typeof reports[0]) => {
    console.log(`Downloading ${report.filename}`);
    
    if (report.format === 'CSV') {
      const mockCSVData = 'ID,Name,Email,Status\n1,John Doe,john@example.com,Active\n2,Jane Smith,jane@example.com,Active';
      const blob = new Blob([mockCSVData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = report.filename;
      a.click();
    } else {
      toast({
        title: 'Download Started',
        description: `${report.title} is being generated and will download shortly.`,
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Breadcrumbs items={[{ label: 'Reports' }]} />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground mt-2">
            Download comprehensive reports for members, payments, and financials
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.id} className="hover-elevate">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                  </div>
                </div>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Format: {report.format}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => handleDownload(report)}
                    data-testid={`button-download-${report.id}`}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report History</CardTitle>
          <CardDescription>Recently generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Members Report', date: '2024-10-20', size: '245 KB', user: 'Admin User' },
              { name: 'Payments Report', date: '2024-10-18', size: '512 KB', user: 'Admin User' },
              { name: 'Arrears Report', date: '2024-10-15', size: '89 KB', user: 'Admin User' },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Generated on {item.date} by {item.user}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{item.size}</span>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
