import {
  LayoutDashboard,
  Users,
  CreditCard,
  FileText,
  Settings,
  User,
  Wallet,
  CheckSquare,
  BarChart3,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useLocation } from 'wouter';

interface AppSidebarProps {
  role?: 'admin' | 'member';
}

export default function AppSidebar({ role = 'member' }: AppSidebarProps) {
  const [location, setLocation] = useLocation();

  const memberItems = [
    { title: 'Dashboard', url: '/member/dashboard', icon: LayoutDashboard },
    { title: 'Profile', url: '/member/profile', icon: User },
    { title: 'Payments', url: '/member/payments', icon: Wallet },
  ];

  const adminItems = [
    { title: 'Dashboard', url: '/admin/dashboard', icon: LayoutDashboard },
    { title: 'Members', url: '/admin/members', icon: Users },
    { title: 'Payments', url: '/admin/payments', icon: CreditCard },
    { title: 'Workflows', url: '/admin/workflows', icon: CheckSquare },
    { title: 'Reports', url: '/admin/reports', icon: BarChart3 },
    { title: 'Settings', url: '/admin/settings', icon: Settings },
  ];

  const items = role === 'admin' ? adminItems : memberItems;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{role === 'admin' ? 'Administration' : 'Member Portal'}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    onClick={() => setLocation(item.url)}
                    data-testid={`link-${item.title.toLowerCase().replace(' ', '-')}`}
                  >
                    <button className="w-full">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
