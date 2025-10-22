import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import Logo from '@/components/Logo';
import { useToast } from '@/hooks/use-toast';

const DEMO_CREDENTIALS = {
  member: {
    email: 'member@sbmi.org',
    password: 'demo123',
  },
  admin: {
    email: 'admin@sbmi.org',
    password: 'demo123',
  },
};

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    console.log('Login attempt:', { email, password });
    
    // Check member credentials
    if (email === DEMO_CREDENTIALS.member.email && password === DEMO_CREDENTIALS.member.password) {
      toast({
        title: 'Login Successful',
        description: 'Logged in as Member',
      });
      setLocation('/member/dashboard');
      return;
    }
    
    // Check admin credentials
    if (email === DEMO_CREDENTIALS.admin.email && password === DEMO_CREDENTIALS.admin.password) {
      toast({
        title: 'Login Successful',
        description: 'Logged in as Admin',
      });
      setLocation('/admin/dashboard');
      return;
    }
    
    // Invalid credentials
    setError('Invalid email or password. Please use the demo credentials below.');
    toast({
      title: 'Login Failed',
      description: 'Invalid credentials. Please try again.',
      variant: 'destructive',
    });
  };

  const fillCredentials = (type: 'member' | 'admin') => {
    setEmail(DEMO_CREDENTIALS[type].email);
    setPassword(DEMO_CREDENTIALS[type].password);
    setError('');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-900">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-900 dark:text-blue-100">Demo Credentials</AlertTitle>
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            <div className="mt-2 space-y-3">
              <div className="flex items-center justify-between bg-white dark:bg-blue-900/30 p-3 rounded-md">
                <div>
                  <p className="font-semibold">Member Account</p>
                  <p className="text-sm">Email: {DEMO_CREDENTIALS.member.email}</p>
                  <p className="text-sm">Password: {DEMO_CREDENTIALS.member.password}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fillCredentials('member')}
                  data-testid="button-fill-member"
                >
                  Use These
                </Button>
              </div>
              <div className="flex items-center justify-between bg-white dark:bg-blue-900/30 p-3 rounded-md">
                <div>
                  <p className="font-semibold">Admin Account</p>
                  <p className="text-sm">Email: {DEMO_CREDENTIALS.admin.email}</p>
                  <p className="text-sm">Password: {DEMO_CREDENTIALS.admin.password}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fillCredentials('admin')}
                  data-testid="button-fill-admin"
                >
                  Use These
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>

        <Card className="w-full shadow-lg">
          <CardHeader className="space-y-4 text-center">
            <div className="flex justify-center">
              <Logo size="lg" />
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to your SBMI account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert className="border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-900">
                  <AlertDescription className="text-red-800 dark:text-red-200">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="input-email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  data-testid="input-password"
                />
              </div>
              <Button type="submit" className="w-full" data-testid="button-login">
                Sign In
              </Button>
              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                  onClick={() => {
                    console.log('Forgot password clicked');
                    toast({ title: 'Password Reset', description: 'Password reset link sent to your email.' });
                  }}
                  data-testid="button-forgot-password"
                >
                  Forgot your password?
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
