import { ClockIcon, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { FilterBar } from '@/components/FilterBar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTimeTrackingViewModel } from '@/viewmodels/useTimeTrackingViewModel';

export function TimeTrackingScreen() {
  const {
    entries,
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    handleClearFilters,
    dateRange,
    setDateRange,
    filterConfigs,
    screenshotsEnabled,
    setScreenshotsEnabled,
    manualEditingEnabled,
    setManualEditingEnabled,
    isDialogOpen,
    setIsDialogOpen,
    totalTimeThisWeek,
  } = useTimeTrackingViewModel();

  return (
    <div className="space-y-8">
      <FilterBar
        searchPlaceholder="Search time entries..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filterConfigs}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        showDateFilter={true}
      />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-6">
          <Card className="bg-card text-card-foreground">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-tertiary">
                <ClockIcon className="h-6 w-6 text-tertiary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Time This Week</p>
                <p className="text-2xl font-bold text-card-foreground">{totalTimeThisWeek}</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4 rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-card-foreground">Settings</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="screenshots" className="text-card-foreground">
                Enable Screenshots
              </Label>
              <Switch
                id="screenshots"
                checked={screenshotsEnabled}
                onCheckedChange={setScreenshotsEnabled}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="manual-editing" className="text-card-foreground">
                Allow Manual Time Editing
              </Label>
              <Switch
                id="manual-editing"
                checked={manualEditingEnabled}
                onCheckedChange={setManualEditingEnabled}
              />
            </div>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Time Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-popover text-popover-foreground sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-popover-foreground">Add Time Entry</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Manually add a time entry for a project.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="entry-date" className="text-popover-foreground">Date</Label>
                <Input id="entry-date" type="date" className="bg-background text-foreground" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="entry-project" className="text-popover-foreground">Project</Label>
                <Select>
                  <SelectTrigger className="bg-background text-foreground">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover text-popover-foreground">
                    <SelectItem value="alpha" className="text-popover-foreground">Project Alpha</SelectItem>
                    <SelectItem value="beta" className="text-popover-foreground">Project Beta</SelectItem>
                    <SelectItem value="gamma" className="text-popover-foreground">Project Gamma</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="entry-duration" className="text-popover-foreground">Duration (hours)</Label>
                <Input id="entry-duration" type="number" step="0.5" placeholder="8.5" className="bg-background text-foreground" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="entry-description" className="text-popover-foreground">Description</Label>
                <Input id="entry-description" placeholder="What did you work on?" className="bg-background text-foreground" />
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
                Add Entry
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
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">
                  Project
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">
                  Member
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {entries.map((entry) => (
                <tr key={entry.id} className="transition-colors hover:bg-secondary/50">
                  <td className="px-6 py-4 text-sm text-card-foreground">{entry.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-card-foreground">
                    {entry.project}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{entry.member}</td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-card-foreground">{entry.duration}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{entry.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
