import { useState, useMemo } from 'react';

export type DateFilter = 'today' | 'week' | 'month' | 'custom';

interface WeeklyHours {
  day: string;
  hours: number;
  date: string;
}

interface ProjectHours {
  name: string;
  hours: number;
  percentage: number;
  color: string;
}

interface WorkTypeDistribution {
  name: string;
  hours: number;
  color: string;
}

interface TeamPerformance {
  id: number;
  name: string;
  initials: string;
  hours: number;
  projects: number;
  efficiency: number;
  earnings?: number;
}

interface Earnings {
  total: number;
  hourlyRate: number;
  hoursWorked: number;
  bonus: number;
}

interface Expenses {
  salaries: number;
  software: number;
  office: number;
  other: number;
  total: number;
}

interface Stats {
  totalHours: number;
  activeProjects: number;
  teamMembers: number;
  avgHoursPerDay: number;
  totalEarnings: number;
  totalExpenses: number;
}

const generateWeeklyHours = (): WeeklyHours[] => [
  { day: 'Mon', hours: 42, date: '2024-01-15' },
  { day: 'Tue', hours: 38, date: '2024-01-16' },
  { day: 'Wed', hours: 45, date: '2024-01-17' },
  { day: 'Thu', hours: 40, date: '2024-01-18' },
  { day: 'Fri', hours: 35, date: '2024-01-19' },
  { day: 'Sat', hours: 8, date: '2024-01-20' },
  { day: 'Sun', hours: 0, date: '2024-01-21' },
];

const projectHoursData: ProjectHours[] = [
  { name: 'Project Alpha', hours: 85, percentage: 40, color: '#3B82F6' },
  { name: 'Project Beta', hours: 52, percentage: 25, color: '#10B981' },
  { name: 'Project Gamma', hours: 45, percentage: 21, color: '#F59E0B' },
  { name: 'Project Delta', hours: 26, percentage: 14, color: '#EF4444' },
];

const WORK_TYPE_COLORS = {
  coding: '#3B82F6',
  managing: '#10B981',
  meeting: '#F59E0B',
  designing: '#EF4444',
  research: '#8B5CF6', // Example new work type
};

const allProjectsWorkTypes = [
  { name: 'Coding', hours: 180, color: WORK_TYPE_COLORS.coding },
  { name: 'Managing', hours: 70, color: WORK_TYPE_COLORS.managing },
  { name: 'Meeting', hours: 75, color: WORK_TYPE_COLORS.meeting },
  { name: 'Designing', hours: 50, color: WORK_TYPE_COLORS.designing },
  { name: 'Research', hours: 20, color: WORK_TYPE_COLORS.research },
];

const teamPerformanceData: TeamPerformance[] = [
  {
    id: 1,
    name: 'John Doe',
    initials: 'JD',
    hours: 42,
    projects: 3,
    efficiency: 95,
    earnings: 3570,
  },
  {
    id: 2,
    name: 'Jane Smith',
    initials: 'JS',
    hours: 38,
    projects: 2,
    efficiency: 92,
    earnings: 2850,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    initials: 'MJ',
    hours: 40,
    projects: 4,
    efficiency: 88,
    earnings: 6000,
  },
  {
    id: 4,
    name: 'Sarah Williams',
    initials: 'SW',
    hours: 35,
    projects: 2,
    efficiency: 90,
    earnings: 2450,
  },
];

const earningsData: Earnings = {
  total: 14870,
  hourlyRate: 85,
  hoursWorked: 155,
  bonus: 1000,
};

const expensesData: Expenses = {
  salaries: 41080,
  software: 2500,
  office: 3000,
  other: 1200,
  total: 47780,
};

export function useDashboardViewModel() {
  const [dateFilter, setDateFilter] = useState<DateFilter>('week');
  const [customDateRange, setCustomDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const stats: Stats = useMemo(() => {
    const totalHours = teamPerformanceData.reduce((sum, member) => sum + member.hours, 0);
    const avgHoursPerDay = totalHours / 7;
    const totalEarnings = teamPerformanceData.reduce((sum, member) => sum + (member.earnings || 0), 0);

    return {
      totalHours,
      activeProjects: 12,
      teamMembers: teamPerformanceData.length,
      avgHoursPerDay: Math.round(avgHoursPerDay * 10) / 10,
      totalEarnings,
      totalExpenses: expensesData.total,
    };
  }, []);

  const filteredTeamPerformance = useMemo(() => {
    if (selectedMember === null) return teamPerformanceData;
    return teamPerformanceData.filter((member) => member.id === selectedMember);
  }, [selectedMember]);

  const handleDateFilterChange = (filter: DateFilter) => {
    setDateFilter(filter);
    if (filter !== 'custom') {
      setCustomDateRange({});
    }
  };

  const getDateRangeLabel = () => {
    switch (dateFilter) {
      case 'today':
        return 'Today';
      case 'week':
        return 'This Week';
      case 'month':
        return 'This Month';
      case 'custom':
        if (customDateRange.from && customDateRange.to) {
          return `${customDateRange.from.toLocaleDateString()} - ${customDateRange.to.toLocaleDateString()}`;
        }
        return 'Custom Range';
      default:
        return 'This Week';
    }
  };

  return {
    stats,
    weeklyHours: generateWeeklyHours(),
    projectHours: projectHoursData,
    teamPerformance: filteredTeamPerformance,
    earnings: earningsData,
    expenses: expensesData,
    dateFilter,
    setDateFilter: handleDateFilterChange,
    customDateRange,
    setCustomDateRange,
    selectedMember,
    setSelectedMember,
    getDateRangeLabel,
    allTeamMembers: teamPerformanceData,
    workTypeDistribution: allProjectsWorkTypes,
  };
}
