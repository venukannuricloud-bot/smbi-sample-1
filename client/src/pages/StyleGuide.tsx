import { Check, X, AlertTriangle, Info, Mail, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import StatusBadge from '@/components/StatusBadge';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function StyleGuide() {
  return (
    <div className="p-6 space-y-8">
      <Breadcrumbs items={[{ label: 'Style Guide' }]} />
      
      <div>
        <h1 className="text-4xl font-bold mb-2">SBMI Style Guide</h1>
        <p className="text-lg text-muted-foreground">
          Design system and component library for SBMI Membership Management
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="h-24 bg-primary rounded-md mb-2" />
            <p className="font-medium">Primary</p>
            <p className="text-sm text-muted-foreground">#1836b2</p>
          </div>
          <div>
            <div className="h-24 rounded-md mb-2" style={{ backgroundColor: '#a066cb' }} />
            <p className="font-medium">Accent</p>
            <p className="text-sm text-muted-foreground">#a066cb</p>
          </div>
          <div>
            <div className="h-24 rounded-md mb-2" style={{ backgroundColor: '#86c7ed' }} />
            <p className="font-medium">Info</p>
            <p className="text-sm text-muted-foreground">#86c7ed</p>
          </div>
          <div>
            <div className="h-24 bg-destructive rounded-md mb-2" />
            <p className="font-medium">Destructive</p>
            <p className="text-sm text-muted-foreground">Error/Overdue</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Typography</h2>
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold">Heading 1</h1>
            <p className="text-sm text-muted-foreground">32px / 2rem / font-bold</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Heading 2</h2>
            <p className="text-sm text-muted-foreground">24px / 1.5rem / font-semibold</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Heading 3</h3>
            <p className="text-sm text-muted-foreground">20px / 1.25rem / font-semibold</p>
          </div>
          <div>
            <p className="text-base">Body text - Regular</p>
            <p className="text-sm text-muted-foreground">16px / 1rem / font-normal</p>
          </div>
          <div>
            <p className="text-sm">Small text</p>
            <p className="text-xs text-muted-foreground">14px / 0.875rem / font-normal</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        <div className="space-y-6">
          <div>
            <p className="font-medium mb-3">Variants</p>
            <div className="flex flex-wrap gap-3">
              <Button data-testid="button-default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>
          <div>
            <p className="font-medium mb-3">Sizes</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <p className="font-medium mb-3">With Icons</p>
            <div className="flex flex-wrap gap-3">
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Form Elements</h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="example-input">Text Input</Label>
              <Input id="example-input" placeholder="Enter text..." data-testid="input-example" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="example-textarea">Textarea</Label>
              <Textarea id="example-textarea" placeholder="Enter longer text..." data-testid="textarea-example" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="example-checkbox" data-testid="checkbox-example" />
              <Label htmlFor="example-checkbox">Checkbox option</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="example-switch" data-testid="switch-example" />
              <Label htmlFor="example-switch">Switch toggle</Label>
            </div>
            <div className="space-y-2">
              <Label>Input with Error</Label>
              <Input className="border-destructive" placeholder="Invalid input" />
              <p className="text-sm text-destructive">This field is required</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description or subtitle</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Card content goes here</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">KPI Card</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,345</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Badges & Status</h2>
        <div className="space-y-4">
          <div>
            <p className="font-medium mb-3">Standard Badges</p>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </div>
          <div>
            <p className="font-medium mb-3">Status Badges</p>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status="paid" />
              <StatusBadge status="pending" />
              <StatusBadge status="overdue" />
              <StatusBadge status="active" />
              <StatusBadge status="inactive" />
              <StatusBadge status="approved" />
              <StatusBadge status="rejected" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Alerts</h2>
        <div className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Info Alert</AlertTitle>
            <AlertDescription>
              This is an informational message to provide context.
            </AlertDescription>
          </Alert>
          <Alert className="border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-900">
            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertTitle className="text-green-900 dark:text-green-100">Success Alert</AlertTitle>
            <AlertDescription className="text-green-800 dark:text-green-200">
              Operation completed successfully.
            </AlertDescription>
          </Alert>
          <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/30 dark:border-yellow-900">
            <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            <AlertTitle className="text-yellow-900 dark:text-yellow-100">Warning Alert</AlertTitle>
            <AlertDescription className="text-yellow-800 dark:text-yellow-200">
              Please review this important information.
            </AlertDescription>
          </Alert>
          <Alert className="border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-900">
            <X className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertTitle className="text-red-900 dark:text-red-100">Error Alert</AlertTitle>
            <AlertDescription className="text-red-800 dark:text-red-200">
              An error occurred. Please try again.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Navigation</h2>
        <Card>
          <CardHeader>
            <CardTitle>Breadcrumbs Example</CardTitle>
          </CardHeader>
          <CardContent>
            <Breadcrumbs
              items={[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Members', href: '/members' },
                { label: 'John Doe' },
              ]}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
