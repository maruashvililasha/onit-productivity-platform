import { useState } from 'react';
import { SearchIcon, BellIcon, MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLocation } from 'react-router-dom';

interface TopBarProps {
  onMenuClick: () => void;
}

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/insights': 'Insights',
  '/projects': 'Projects',
  '/team': 'Team',
  '/time-tracking': 'Time Tracking',
  '/finance': 'Finance',
  '/clients': 'Clients',
  '/invoices': 'Invoices',
  '/integrations': 'Integrations',
  '/settings': 'Settings',
  '/profile': 'Profile',
};

export function TopBar({ onMenuClick }: TopBarProps) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const pageTitle = pageTitles[location.pathname] || 'Onit';

  return (
    <header className="flex h-20 items-center justify-between border-b border-border bg-background px-6 lg:px-8">
      <div className="flex items-center gap-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="text-muted-foreground hover:bg-secondary lg:hidden"
          aria-label="Toggle menu"
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
        <h2 className="font-fuji-medium font-bold text-3xl text-foreground lg:text-3xl">
          {pageTitle}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects, team, invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 bg-secondary pl-10 text-foreground placeholder:text-muted-foreground lg:w-80"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:bg-secondary"
          aria-label="Notifications"
        >
          <BellIcon className="h-5 w-5" />
          <span className="absolute right-1 top-1 flex h-2 w-2 items-center justify-center rounded-full bg-tertiary" /> {/* Accent blue for notification dot */}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full hover:bg-secondary"
            >
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  JD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-popover text-popover-foreground">
            <DropdownMenuLabel className="font-pp-machina-plain-regular text-popover-foreground">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="font-pp-machina-plain-regular text-popover-foreground hover:bg-secondary">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="font-pp-machina-plain-regular text-popover-foreground hover:bg-secondary">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="font-pp-machina-plain-regular text-popover-foreground hover:bg-secondary">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
