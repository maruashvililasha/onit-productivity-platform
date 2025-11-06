import { useState, useMemo } from 'react';

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  balance: number;
  projects: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

const clientsData: Client[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@acmecorp.com',
    phone: '+1 (555) 123-4567',
    company: 'Acme Corp',
    balance: 15000,
    projects: 2,
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@techstart.com',
    phone: '+1 (555) 234-5678',
    company: 'TechStart Inc',
    balance: 8500,
    projects: 1,
    status: 'active',
    createdAt: '2024-02-20',
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@designstudio.com',
    phone: '+1 (555) 345-6789',
    company: 'Design Studio',
    balance: 12000,
    projects: 1,
    status: 'active',
    createdAt: '2024-03-10',
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily@startupxyz.com',
    phone: '+1 (555) 456-7890',
    company: 'StartupXYZ',
    balance: 0,
    projects: 1,
    status: 'inactive',
    createdAt: '2023-12-05',
  },
];

export function useClientsViewModel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    status: 'all',
    company: 'all',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setActiveFilters({ status: 'all', company: 'all' });
    setSearchQuery('');
  };

  const filteredClients = useMemo(() => {
    return clientsData.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = activeFilters.status === 'all' || client.status === activeFilters.status;
      const matchesCompany = activeFilters.company === 'all' || client.company === activeFilters.company;

      return matchesSearch && matchesStatus && matchesCompany;
    });
  }, [searchQuery, activeFilters]);

  const filterConfigs = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
    {
      key: 'company',
      label: 'Company',
      options: [
        { label: 'Acme Corp', value: 'Acme Corp' },
        { label: 'TechStart Inc', value: 'TechStart Inc' },
        { label: 'Design Studio', value: 'Design Studio' },
        { label: 'StartupXYZ', value: 'StartupXYZ' },
      ],
    },
  ];

  return {
    clients: filteredClients,
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    handleClearFilters,
    filterConfigs,
    isDialogOpen,
    setIsDialogOpen,
  };
}
