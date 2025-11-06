import { useState, useMemo } from 'react';

export interface Invoice {
  id: string;
  client: string;
  project: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'paid' | 'sent' | 'draft' | 'overdue';
  includeInFinance: boolean;
}

export const invoicesData: Invoice[] = [
  {
    id: 'INV-001',
    client: 'Acme Corp',
    project: 'Project Alpha',
    amount: 15000,
    date: '2024-01-15',
    dueDate: '2024-02-15',
    status: 'sent',
    includeInFinance: true,
  },
  {
    id: 'INV-002',
    client: 'TechStart Inc',
    project: 'Project Beta',
    amount: 8500,
    date: '2024-01-20',
    dueDate: '2024-02-20',
    status: 'paid',
    includeInFinance: true,
  },
  {
    id: 'INV-003',
    client: 'Design Studio',
    project: 'Project Gamma',
    amount: 12000,
    date: '2024-01-25',
    dueDate: '2024-02-25',
    status: 'draft',
    includeInFinance: false, // Example: not included in finance yet
  },
  {
    id: 'INV-004',
    client: 'StartupXYZ',
    project: 'Project Delta',
    amount: 5000,
    date: '2023-12-10',
    dueDate: '2024-01-10',
    status: 'overdue',
    includeInFinance: true,
  },
];

export function useInvoicesViewModel() {
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

  const filteredInvoices = useMemo(() => {
    return invoicesData.filter((invoice) => {
      const matchesSearch =
        invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
  }, [searchQuery, activeFilters, dateRange]);

  const filterConfigs = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { label: 'Paid', value: 'paid' },
        { label: 'Sent', value: 'sent' },
        { label: 'Draft', value: 'draft' },
        { label: 'Overdue', value: 'overdue' },
      ],
    },
    {
      key: 'client',
      label: 'Client',
      options: [
        { label: 'Acme Corp', value: 'Acme Corp' },
        { label: 'TechStart Inc', value: 'TechStart Inc' },
        { label: 'Design Studio', value: 'Design Studio' },
        { label: 'StartupXYZ', value: 'StartupXYZ' },
      ],
    },
  ];

  return {
    invoices: filteredInvoices,
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
  };
}
