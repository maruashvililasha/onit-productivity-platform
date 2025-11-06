import { useState, useMemo } from 'react';

export interface TimeEntry {
  id: number;
  date: string;
  project: string;
  member: string;
  duration: string;
  description: string;
}

const timeEntriesData: TimeEntry[] = [
  {
    id: 1,
    date: '2024-01-15',
    project: 'Project Alpha',
    member: 'John Doe',
    duration: '8h 30m',
    description: 'Frontend development',
  },
  {
    id: 2,
    date: '2024-01-15',
    project: 'Project Beta',
    member: 'Jane Smith',
    duration: '7h 15m',
    description: 'UI design mockups',
  },
  {
    id: 3,
    date: '2024-01-14',
    project: 'Project Gamma',
    member: 'Mike Johnson',
    duration: '6h 45m',
    description: 'Project planning',
  },
  {
    id: 4,
    date: '2024-01-14',
    project: 'Project Alpha',
    member: 'Sarah Williams',
    duration: '8h 00m',
    description: 'Component development',
  },
];

export function useTimeTrackingViewModel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    project: 'all',
    member: 'all',
  });
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [screenshotsEnabled, setScreenshotsEnabled] = useState(true);
  const [manualEditingEnabled, setManualEditingEnabled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setActiveFilters({ project: 'all', member: 'all' });
    setSearchQuery('');
    setDateRange({});
  };

  const filteredEntries = useMemo(() => {
    return timeEntriesData.filter((entry) => {
      const matchesSearch =
        entry.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.member.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesProject = activeFilters.project === 'all' || entry.project === activeFilters.project;
      const matchesMember = activeFilters.member === 'all' || entry.member === activeFilters.member;

      let matchesDate = true;
      if (dateRange.from || dateRange.to) {
        const entryDate = new Date(entry.date);
        if (dateRange.from && entryDate < dateRange.from) matchesDate = false;
        if (dateRange.to && entryDate > dateRange.to) matchesDate = false;
      }

      return matchesSearch && matchesProject && matchesMember && matchesDate;
    });
  }, [searchQuery, activeFilters, dateRange]);

  const filterConfigs = [
    {
      key: 'project',
      label: 'Project',
      options: [
        { label: 'Project Alpha', value: 'Project Alpha' },
        { label: 'Project Beta', value: 'Project Beta' },
        { label: 'Project Gamma', value: 'Project Gamma' },
      ],
    },
    {
      key: 'member',
      label: 'Member',
      options: [
        { label: 'John Doe', value: 'John Doe' },
        { label: 'Jane Smith', value: 'Jane Smith' },
        { label: 'Mike Johnson', value: 'Mike Johnson' },
        { label: 'Sarah Williams', value: 'Sarah Williams' },
      ],
    },
  ];

  const totalTimeThisWeek = '42h 30m';

  return {
    entries: filteredEntries,
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
  };
}
