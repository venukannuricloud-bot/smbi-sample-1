import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/Logo';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'member' | 'admin'>('member');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, role });
    
    toast({
      title: 'Login Successful',
      description: `Logged in as ${role}`,
    });

    if (role === 'admin') {
      setLocation('/admin/dashboard');
    } else {
      setLocation('/member/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your SBMI account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-testid="input-password"
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <div className="flex gap-2">
                <Badge
                  variant={role === 'member' ? 'default' : 'outline'}
                  className="cursor-pointer px-4 py-2"
                  onClick={() => setRole('member')}
                  data-testid="badge-member"
                >
                  Member
                </Badge>
                <Badge
                  variant={role === 'admin' ? 'default' : 'outline'}
                  className="cursor-pointer px-4 py-2"
                  onClick={() => setRole('admin')}
                  data-testid="badge-admin"
                >
                  Admin
                </Badge>
              </div>
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
  );
}
