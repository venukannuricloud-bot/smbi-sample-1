import { Switch, Route, Redirect } from 'wouter';
import { queryClient } from './lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from '@/components/ThemeProvider';
import AppSidebar from '@/components/AppSidebar';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import NotFound from '@/pages/not-found';

import Login from '@/pages/Login';
import MemberDashboard from '@/pages/MemberDashboard';
import MemberProfile from '@/pages/MemberProfile';
import MemberPayments from '@/pages/MemberPayments';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminMembers from '@/pages/AdminMembers';
import AdminPayments from '@/pages/AdminPayments';
import AdminWorkflows from '@/pages/AdminWorkflows';
import AdminReports from '@/pages/AdminReports';
import AdminSettings from '@/pages/AdminSettings';
import StyleGuide from '@/pages/StyleGuide';

function MemberLayout({ children, role }: { children: React.ReactNode; role: 'admin' | 'member' }) {
  const sidebarStyle = {
    '--sidebar-width': '16rem',
    '--sidebar-width-icon': '3rem',
  } as React.CSSProperties;

  return (
    <SidebarProvider style={sidebarStyle}>
      <div className="flex h-screen w-full">
        <AppSidebar role={role} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <TopBar userName="John Doe" userRole={role} />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Redirect to="/login" />} />
      <Route path="/login" component={Login} />
      
      <Route path="/member/dashboard">
        <MemberLayout role="member">
          <MemberDashboard />
        </MemberLayout>
      </Route>
      <Route path="/member/profile">
        <MemberLayout role="member">
          <MemberProfile />
        </MemberLayout>
      </Route>
      <Route path="/member/payments">
        <MemberLayout role="member">
          <MemberPayments />
        </MemberLayout>
      </Route>
      
      <Route path="/admin/dashboard">
        <MemberLayout role="admin">
          <AdminDashboard />
        </MemberLayout>
      </Route>
      <Route path="/admin/members">
        <MemberLayout role="admin">
          <AdminMembers />
        </MemberLayout>
      </Route>
      <Route path="/admin/payments">
        <MemberLayout role="admin">
          <AdminPayments />
        </MemberLayout>
      </Route>
      <Route path="/admin/workflows">
        <MemberLayout role="admin">
          <AdminWorkflows />
        </MemberLayout>
      </Route>
      <Route path="/admin/reports">
        <MemberLayout role="admin">
          <AdminReports />
        </MemberLayout>
      </Route>
      <Route path="/admin/settings">
        <MemberLayout role="admin">
          <AdminSettings />
        </MemberLayout>
      </Route>

      <Route path="/style-guide">
        <MemberLayout role="admin">
          <StyleGuide />
        </MemberLayout>
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
