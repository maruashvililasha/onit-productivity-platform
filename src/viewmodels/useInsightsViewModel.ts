import { useState, useMemo } from 'react';

export type DateFilter = 'today' | 'week' | 'month' | 'custom';

interface TeamMemberActivity {
  id: number;
  name: string;
  initials: string;
  activeHours: number;
  idleHours: number;
  productivity: number;
  topApps: string[];
  screenshots: number;
}

interface ProjectPerformance {
  id: number;
  name: string;
  totalHours: number;
  efficiency: number;
  workTypes: {
    coding: number;
    managing: number;
    meeting: number;
    designing: number;
    research: number; // Added research work type
  };
}

interface OverallWorkTypeDistribution {
  name: string;
  hours: number;
  color: string;
}

interface ProductiveHours {
  hour: string;
  productivity: number;
}

interface AppUsage {
  name: string;
  hours: number;
  percentage: number;
  category: string;
}

interface Screenshot {
  id: number;
  memberId: number;
  memberName: string;
  timestamp: string;
  activity: string;
  productivity: number;
}

const teamActivityData: TeamMemberActivity[] = [
  {
    id: 1,
    name: 'John Doe',
    initials: 'JD',
    activeHours: 38,
    idleHours: 2,
    productivity: 95,
    topApps: ['VS Code', 'Chrome', 'Slack'],
    screenshots: 152,
  },
  {
    id: 2,
    name: 'Jane Smith',
    initials: 'JS',
    activeHours: 35,
    idleHours: 3,
    productivity: 92,
    topApps: ['Figma', 'Chrome', 'Slack'],
    screenshots: 140,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    initials: 'MJ',
    activeHours: 36,
    idleHours: 4,
    productivity: 88,
    topApps: ['Linear', 'Slack', 'Chrome'],
    screenshots: 144,
  },
  {
    id: 4,
    name: 'Sarah Williams',
    initials: 'SW',
    activeHours: 33,
    idleHours: 2,
    productivity: 90,
    topApps: ['VS Code', 'Chrome', 'Postman'],
    screenshots: 132,
  },
];

const projectPerformanceData: ProjectPerformance[] = [
  {
    id: 1,
    name: 'Project Alpha',
    totalHours: 120,
    efficiency: 92,
    workTypes: {
      coding: 60,
      managing: 20,
      meeting: 25,
      designing: 15,
      research: 0,
    },
  },
  {
    id: 2,
    name: 'Project Beta',
    totalHours: 80,
    efficiency: 88,
    workTypes: {
      coding: 40,
      managing: 15,
      meeting: 15,
      designing: 10,
      research: 0,
    },
  },
  {
    id: 3,
    name: 'Project Gamma',
    totalHours: 200,
    efficiency: 95,
    workTypes: {
      coding: 100,
      managing: 30,
      meeting: 40,
      designing: 30,
      research: 0,
    },
  },
];

const overallWorkTypeDistributionData: OverallWorkTypeDistribution[] = [
  { name: 'Coding', hours: 200, color: '#3B82F6' },
  { name: 'Managing', hours: 65, color: '#10B981' },
  { name: 'Meeting', hours: 80, color: '#F59E0B' },
  { name: 'Designing', hours: 55, color: '#EF4444' },
  { name: 'Research', hours: 15, color: '#8B5CF6' },
];

const productiveHoursData: ProductiveHours[] = [
  { hour: '9 AM', productivity: 75 },
  { hour: '10 AM', productivity: 85 },
  { hour: '11 AM', productivity: 92 },
  { hour: '12 PM', productivity: 70 },
  { hour: '1 PM', productivity: 65 },
  { hour: '2 PM', productivity: 88 },
  { hour: '3 PM', productivity: 90 },
  { hour: '4 PM', productivity: 85 },
  { hour: '5 PM', productivity: 78 },
  { hour: '6 PM', productivity: 60 },
];

const appUsageData: AppUsage[] = [
  { name: 'VS Code', hours: 145, percentage: 35, category: 'Development' },
  { name: 'Chrome', hours: 98, percentage: 24, category: 'Browser' },
  { name: 'Figma', hours: 72, percentage: 17, category: 'Design' },
  { name: 'Slack', hours: 52, percentage: 13, category: 'Communication' },
  { name: 'Linear', hours: 28, percentage: 7, category: 'Project Management' },
  { name: 'Postman', hours: 16, percentage: 4, category: 'Development' },
];

const screenshotsData: Screenshot[] = [
  {
    id: 1,
    memberId: 1,
    memberName: 'John Doe',
    timestamp: '2024-01-15 10:30 AM',
    activity: 'Coding in VS Code',
    productivity: 95,
  },
  {
    id: 2,
    memberId: 2,
    memberName: 'Jane Smith',
    timestamp: '2024-01-15 11:15 AM',
    activity: 'Designing in Figma',
    productivity: 92,
  },
  {
    id: 3,
    memberId: 3,
    memberName: 'Mike Johnson',
    timestamp: '2024-01-15 02:45 PM',
    activity: 'Managing tasks in Linear',
    productivity: 88,
  },
  {
    id: 4,
    memberId: 4,
    memberName: 'Sarah Williams',
    timestamp: '2024-01-15 03:20 PM',
    activity: 'Code review in GitHub',
    productivity: 90,
  },
];

export function useInsightsViewModel() {
  const [dateFilter, setDateFilter] = useState<DateFilter>('week');
  const [customDateRange, setCustomDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

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

  const filteredTeamActivity = useMemo(() => {
    if (selectedMember === null) return teamActivityData;
    return teamActivityData.filter((member) => member.id === selectedMember);
  }, [selectedMember]);

  const filteredProjectPerformance = useMemo(() => {
    if (selectedProject === null) return projectPerformanceData;
    return projectPerformanceData.filter((project) => project.id === selectedProject);
  }, [selectedProject]);

  const filteredScreenshots = useMemo(() => {
    if (selectedMember === null) return screenshotsData;
    return screenshotsData.filter((screenshot) => screenshot.memberId === selectedMember);
  }, [selectedMember]);

  const overallStats = useMemo(() => {
    const totalActiveHours = teamActivityData.reduce((sum, member) => sum + member.activeHours, 0);
    const totalIdleHours = teamActivityData.reduce((sum, member) => sum + member.idleHours, 0);
    const avgProductivity = Math.round(
      teamActivityData.reduce((sum, member) => sum + member.productivity, 0) / teamActivityData.length
    );
    const totalScreenshots = teamActivityData.reduce((sum, member) => sum + member.screenshots, 0);

    return {
      totalActiveHours,
      totalIdleHours,
      avgProductivity,
      totalScreenshots,
    };
  }, []);

  return {
    teamActivity: filteredTeamActivity,
    projectPerformance: filteredProjectPerformance,
    productiveHours: productiveHoursData,
    appUsage: appUsageData,
    screenshots: filteredScreenshots,
    overallStats,
    dateFilter,
    setDateFilter: handleDateFilterChange,
    customDateRange,
    setCustomDateRange,
    selectedProject,
    setSelectedProject,
    selectedMember,
    setSelectedMember,
    getDateRangeLabel,
    allProjects: projectPerformanceData,
    allMembers: teamActivityData,
    overallWorkTypeDistribution: overallWorkTypeDistributionData,
  };
}
