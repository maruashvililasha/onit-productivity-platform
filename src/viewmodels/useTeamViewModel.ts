import { useState, useMemo } from 'react';

export interface TeamMember {
  id: number;
  name: string;
  initials: string;
  role: string;
  rate: number;
  rateType: 'hourly' | 'monthly';
  totalHours: number;
  salary: number;
}

export const teamData: TeamMember[] = [
  {
    id: 1,
    name: 'John Doe',
    initials: 'JD',
    role: 'Senior Developer',
    rate: 85,
    rateType: 'hourly',
    totalHours: 160,
    salary: 13600,
  },
  {
    id: 2,
    name: 'Jane Smith',
    initials: 'JS',
    role: 'UI/UX Designer',
    rate: 75,
    rateType: 'hourly',
    totalHours: 152,
    salary: 11400,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    initials: 'MJ',
    role: 'Project Manager',
    rate: 6000,
    rateType: 'monthly',
    totalHours: 168,
    salary: 6000,
  },
  {
    id: 4,
    name: 'Sarah Williams',
    initials: 'SW',
    role: 'Frontend Developer',
    rate: 70,
    rateType: 'hourly',
    totalHours: 144,
    salary: 10080,
  },
];

export function useTeamViewModel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    role: 'all',
    rateType: 'all',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setActiveFilters({ role: 'all', rateType: 'all' });
    setSearchQuery('');
  };

  const filteredTeam = useMemo(() => {
    return teamData.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = activeFilters.role === 'all' || member.role === activeFilters.role;
      const matchesRateType = activeFilters.rateType === 'all' || member.rateType === activeFilters.rateType;

      return matchesSearch && matchesRole && matchesRateType;
    });
  }, [searchQuery, activeFilters]);

  const filterConfigs = [
    {
      key: 'role',
      label: 'Role',
      options: [
        { label: 'Senior Developer', value: 'Senior Developer' },
        { label: 'UI/UX Designer', value: 'UI/UX Designer' },
        { label: 'Project Manager', value: 'Project Manager' },
        { label: 'Frontend Developer', value: 'Frontend Developer' },
      ],
    },
    {
      key: 'rateType',
      label: 'Rate Type',
      options: [
        { label: 'Hourly', value: 'hourly' },
        { label: 'Monthly', value: 'monthly' },
      ],
    },
  ];

  return {
    team: filteredTeam,
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
