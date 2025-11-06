import { useState } from 'react';
import { PlusIcon, FileTextIcon, DownloadIcon, SendIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

const clientsData = [
  { id: 1, name: 'Acme Corp', balance: 15000, projects: 2 },
  { id: 2, name: 'TechStart Inc', balance: 8500, projects: 1 },
  { id: 3, name: 'Design Studio', balance: 12000, projects: 1 },
  { id: 4, name: 'StartupXYZ', balance: 0, projects: 1 },
];

const invoicesData = [
  {
    id: 'INV-001',
    client: 'Acme Corp',
    project: 'Project Alpha',
    amount: 15000,
    date: '2024-01-15',
    status: 'sent',
  },
  {
    id: 'INV-002',
    client: 'TechStart Inc',
    project: 'Project Beta',
    amount: 8500,
    date: '2024-01-20',
    status: 'paid',
  },
  {
    id: 'INV-003',
    client: 'Design Studio',
    project: 'Project Gamma',
    amount: 12000,
    date: '2024-01-25',
    status: 'draft',
  },
];

export function ClientsInvoicesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    status: 'all',
    client: 'all',
  });
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setActiveFilters({ status: 'all', client: 'all' });
    setSearchQuery('');
    setDateRange({});
  };

  const filteredInvoices = invoicesData.filter((invoice) => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = activeFilters.status === 'all' || invoice.status === activeFilters.status;
    const matchesClient = activeFilters.client === 'all' || invoice.client === activeFilters.client;
    
    let matchesDate = true;
    if (dateRange.from || dateRange.to) {
      const invoiceDate = new Date(invoice.date);
      if (dateRange.from && invoiceDate < dateRange.from) matchesDate = false;
      if (dateRange.to && invoiceDate > dateRange.to) matchesDate = false;
    }
    
    return matchesSearch && matchesStatus && matchesClient && matchesDate;
  });

  const filterConfigs = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { label: 'Paid', value: 'paid' },
        { label: 'Sent', value: 'sent' },
        { label: 'Draft', value: 'draft' },
      ],
    },
    {
      key: 'client',
      label: 'Client',
      options: [
        { label: 'Acme Corp', value: 'Acme Corp' },
        { label: 'TechStart Inc', value: 'TechStart Inc' },
        { label: 'Design Studio', value: 'Design Studio' },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <FilterBar
        searchPlaceholder="Search invoices or clients..."
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

      <div className="flex items-center justify-end">
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
                <Label htmlFor="invoice-client" className="text-popover-foreground">Client</Label>
                <Select>
                  <SelectTrigger className="bg-background text-foreground">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover text-popover-foreground">
                    {clientsData.map((client) => (
                      <SelectItem key={client.id} value={client.id.toString()} className="text-popover-foreground">
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice-project" className="text-popover-foreground">Project</Label>
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
                <Label htmlFor="invoice-amount" className="text-popover-foreground">Amount</Label>
                <Input id="invoice-amount" type="number" placeholder="Enter amount" className="bg-background text-foreground" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice-date" className="text-popover-foreground">Invoice Date</Label>
                <Input id="invoice-date" type="date" className="bg-background text-foreground" />
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

      <div>
        <h4 className="mb-4 text-lg font-semibold text-foreground">Clients</h4>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {clientsData.map((client) => (
            <Card key={client.id} className="bg-card text-card-foreground">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <h5 className="text-lg font-semibold text-card-foreground">{client.name}</h5>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Balance</span>
                    <span className="text-lg font-bold text-card-foreground">
                      ${client.balance.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Projects</span>
                    <span className="text-sm font-medium text-card-foreground">{client.projects}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-4 text-lg font-semibold text-foreground">Invoices</h4>
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
                  Status
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-secondary-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredInvoices.map((invoice) => (
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
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        invoice.status === 'paid'
                          ? 'bg-success/20 text-success'
                          : invoice.status === 'sent'
                          ? 'bg-warning/20 text-warning'
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
    </div>
  );
}
