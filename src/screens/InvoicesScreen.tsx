import { PlusIcon, FileTextIcon, DownloadIcon, SendIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useInvoicesViewModel } from '@/viewmodels/useInvoicesViewModel';

export function InvoicesScreen() {
  const {
    invoices,
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    handleClearFilters,
    dateRange,
    setDateRange,
    filterConfigs,
    isDialogOpen,
    setIsDialogOpen,
  } = useInvoicesViewModel();

  return (
    <div className="space-y-8">
      <FilterBar
        searchPlaceholder="Search invoices..."
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

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Invoices</h3>
          <p className="text-sm text-muted-foreground">Generate and manage invoices</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90">
              <PlusIcon className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-popover text-popover-foreground sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-popover-foreground">Create Invoice</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Generate a new invoice for a client and project.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="invoice-client" className="text-popover-foreground">
                  Client
                </Label>
                <Select>
                  <SelectTrigger className="bg-background text-foreground">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover text-popover-foreground">
                    <SelectItem value="acme" className="text-popover-foreground">
                      Acme Corp
                    </SelectItem>
                    <SelectItem value="techstart" className="text-popover-foreground">
                      TechStart Inc
                    </SelectItem>
                    <SelectItem value="design" className="text-popover-foreground">
                      Design Studio
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice-project" className="text-popover-foreground">
                  Project
                </Label>
                <Select>
                  <SelectTrigger className="bg-background text-foreground">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover text-popover-foreground">
                    <SelectItem value="alpha" className="text-popover-foreground">
                      Project Alpha
                    </SelectItem>
                    <SelectItem value="beta" className="text-popover-foreground">
                      Project Beta
                    </SelectItem>
                    <SelectItem value="gamma" className="text-popover-foreground">
                      Project Gamma
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice-amount" className="text-popover-foreground">
                  Amount
                </Label>
                <Input
                  id="invoice-amount"
                  type="number"
                  placeholder="Enter amount"
                  className="bg-background text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice-date" className="text-popover-foreground">
                  Invoice Date
                </Label>
                <Input
                  id="invoice-date"
                  type="date"
                  className="bg-background text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice-due-date" className="text-popover-foreground">
                  Due Date
                </Label>
                <Input
                  id="invoice-due-date"
                  type="date"
                  className="bg-background text-foreground"
                />
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
                Create Invoice
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <table className="w-full">
          <thead className="border-b border-border bg-secondary">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">
                Invoice ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">
                Client
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">
                Project
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">
                Due Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">
                Status
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-secondary-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="transition-colors hover:bg-secondary/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <FileTextIcon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-mono text-sm text-card-foreground">{invoice.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-card-foreground">
                  {invoice.client}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{invoice.project}</td>
                <td className="px-6 py-4 text-sm font-semibold text-card-foreground">
                  ${invoice.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{invoice.date}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{invoice.dueDate}</td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      invoice.status === 'paid'
                        ? 'bg-success/20 text-success'
                        : invoice.status === 'sent'
                        ? 'bg-warning/20 text-warning'
                        : invoice.status === 'overdue'
                        ? 'bg-destructive/20 text-destructive'
                        : 'bg-gray-700 text-gray-300'
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-transparent text-card-foreground hover:bg-secondary"
                    >
                      <DownloadIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-transparent text-card-foreground hover:bg-secondary"
                    >
                      <SendIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
