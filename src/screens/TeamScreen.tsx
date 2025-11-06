import { PlusIcon, MoreVerticalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FilterBar } from '@/components/FilterBar';
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
import { useTeamViewModel } from '@/viewmodels/useTeamViewModel';

export function TeamScreen() {
  const {
    team,
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    handleClearFilters,
    filterConfigs,
    isDialogOpen,
    setIsDialogOpen,
  } = useTeamViewModel();

  return (
    <div className="space-y-8">
      <FilterBar
        searchPlaceholder="Search team members..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filterConfigs}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <div className="flex items-center justify-between">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-popover text-popover-foreground sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-popover-foreground">Add Team Member</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Add a new team member with their role and rate information.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="member-name" className="text-popover-foreground">Full Name</Label>
                <Input id="member-name" placeholder="Enter full name" className="bg-background text-foreground" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="member-role" className="text-popover-foreground">Role</Label>
                <Input id="member-role" placeholder="Enter role" className="bg-background text-foreground" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate-type" className="text-popover-foreground">Rate Type</Label>
                <Select>
                  <SelectTrigger className="bg-background text-foreground">
                    <SelectValue placeholder="Select rate type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover text-popover-foreground">
                    <SelectItem value="hourly" className="text-popover-foreground">Hourly</SelectItem>
                    <SelectItem value="monthly" className="text-popover-foreground">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate-amount" className="text-popover-foreground">Rate Amount</Label>
                <Input id="rate-amount" type="number" placeholder="Enter rate" className="bg-background text-foreground" />
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
                Add Member
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-secondary">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">
                  Member
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">
                  Rate
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">
                  Total Hours
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">
                  Salary to Date
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-secondary-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {team.map((member) => (
                <tr key={member.id} className="transition-colors hover:bg-secondary/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-tertiary text-tertiary-foreground">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-card-foreground">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{member.role}</td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-card-foreground">
                      ${member.rate}
                      {member.rateType === 'hourly' ? '/hr' : '/mo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-card-foreground">{member.totalHours}h</td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-card-foreground">
                      ${member.salary.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="bg-transparent text-card-foreground hover:bg-secondary">
                          <MoreVerticalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover text-popover-foreground">
                        <DropdownMenuItem className="text-popover-foreground hover:bg-popover-foreground/10">
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-popover-foreground hover:bg-popover-foreground/10">
                          Edit Member
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive hover:bg-destructive/10">
                          Remove Member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
