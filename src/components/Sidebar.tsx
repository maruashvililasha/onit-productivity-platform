import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboardIcon, FolderKanbanIcon, UsersIcon, ClockIcon, DollarSignIcon, FileTextIcon, PlugIcon, SettingsIcon, UserIcon, LogOutIcon, ChevronLeftIcon, ChevronRightIcon, BarChart3Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onLogout?: () => void;
}

const navigationItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboardIcon },
  { path: '/insights', label: 'Insights', icon: BarChart3Icon },
  { path: '/projects', label: 'Projects', icon: FolderKanbanIcon },
  { path: '/team', label: 'Team', icon: UsersIcon },
  { path: '/time-tracking', label: 'Time Tracking', icon: ClockIcon },
  { path: '/finance', label: 'Finance', icon: DollarSignIcon },
  { path: '/clients', label: 'Clients', icon: UsersIcon },
  { path: '/invoices', label: 'Invoices', icon: FileTextIcon },
  { path: '/integrations', label: 'Integrations', icon: PlugIcon },
];

const utilityItems = [
  { path: '/settings', label: 'Settings', icon: SettingsIcon },
  { path: '/profile', label: 'Profile', icon: UserIcon },
];

export function Sidebar({ isOpen, onToggle, onLogout }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      <aside
        className={`fixed left-0 top-0 z-40 h-screen border-r border-border bg-background transition-all duration-300 ease-in-out lg:relative ${
          isOpen ? 'w-64' : 'w-0 lg:w-20'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center justify-between px-6">
            {isOpen && (
              <h1 className="font-fuji-bold text-2xl text-foreground">Onit</h1>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="hidden text-muted-foreground hover:bg-secondary lg:flex"
              aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {isOpen ? <ChevronLeftIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
            </Button>
          </div>

          <Separator className="bg-border" />

          <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-6">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-4 rounded-md px-3 py-3 text-sm font-pp-machina-plain-regular font-semibold transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {isOpen && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          <Separator className="bg-border" />

          <div className="space-y-2 px-3 py-6">
            {utilityItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-4 rounded-md px-3 py-3 text-sm font-pp-machina-plain-regular font-semibold transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {isOpen && <span>{item.label}</span>}
                </Link>
              );
            })}
            
            <button
              onClick={onLogout}
              className="flex w-full items-center gap-4 rounded-md px-3 py-3 text-sm font-pp-machina-plain-regular font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <LogOutIcon className="h-5 w-5 flex-shrink-0" />
              {isOpen && <span>Log out</span>}
            </button>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}
