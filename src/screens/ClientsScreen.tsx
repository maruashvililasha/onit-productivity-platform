import { PlusIcon, MailIcon, PhoneIcon, BuildingIcon, MoreVerticalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FilterBar } from '@/components/FilterBar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useClientsViewModel } from '@/viewmodels/useClientsViewModel';

export function ClientsScreen() {
  const {
    clients,
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    handleClearFilters,
    filterConfigs,
    isDialogOpen,
    setIsDialogOpen,
  } = useClientsViewModel();

  return (
    <div className="space-y-8">
      <FilterBar
        searchPlaceholder="Search clients..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filterConfigs}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Clients</h3>
          <p className="text-sm text-muted-foreground">Manage your client relationships</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-popover text-popover-foreground sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-popover-foreground">Add New Client</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Add a new client to your database.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="client-name" className="text-popover-foreground">
                  Full Name
                </Label>
                <Input
                  id="client-name"
                  placeholder="Enter full name"
                  className="bg-background text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-email" className="text-popover-foreground">
                  Email
                </Label>
                <Input
                  id="client-email"
                  type="email"
                  placeholder="Enter email"
                  className="bg-background text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-phone" className="text-popover-foreground">
                  Phone
                </Label>
                <Input
                  id="client-phone"
                  type="tel"
                  placeholder="Enter phone number"
                  className="bg-background text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-company" className="text-popover-foreground">
                  Company
                </Label>
                <Input
                  id="client-company"
                  placeholder="Enter company name"
                  className="bg-background text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-status" className="text-popover-foreground">
                  Status
                </Label>
                <Select>
                  <SelectTrigger className="bg-background text-foreground">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover text-popover-foreground">
                    <SelectItem value="active" className="text-popover-foreground">
                      Active
                    </SelectItem>
                    <SelectItem value="inactive" className="text-popover-foreground">
                      Inactive
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setIsDialogOpen(false)}
                className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"
              >
                Add Client
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <Card
            key={client.id}
            className="bg-card text-card-foreground transition-transform hover:scale-[1.02]"
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-tertiary text-tertiary-foreground">
                        {client.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-lg font-semibold text-card-foreground">{client.name}</h4>
                      <p className="text-sm text-muted-foreground">{client.company}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-transparent text-card-foreground hover:bg-secondary"
                      >
                        <MoreVerticalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-popover text-popover-foreground">
                      <DropdownMenuItem className="text-popover-foreground hover:bg-popover-foreground/10">
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-popover-foreground hover:bg-popover-foreground/10">
                        Edit Client
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive hover:bg-destructive/10">
                        Remove Client
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MailIcon className="h-4 w-4" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <PhoneIcon className="h-4 w-4" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BuildingIcon className="h-4 w-4" />
                    <span>{client.company}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Balance</p>
                    <p className="text-lg font-semibold text-card-foreground">
                      ${client.balance.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Projects</p>
                    <p className="text-lg font-semibold text-card-foreground">{client.projects}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      client.status === 'active'
                        ? 'bg-success/20 text-success'
                        : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    {client.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
