import { useState, useMemo } from 'react';

export interface WorkType {
  id: string;
  name: string;
  color: string;
  hours: number;
}

export interface Issue {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done' | 'blocked';
  assignee: string;
  estimate: number; // in hours
  actualTime: number; // in hours
  workType: string;
  linearId?: string;
  createdAt: string;
}

export interface Project {
  id: number;
  name: string;
  client: string;
  progress: number;
  hours: number;
  budget: number;
  spent: number;
  status: 'active' | 'archived';
  workTypes: WorkType[];
  issues: Issue[];
}

export const projectsData: Project[] = [
  {
    id: 1,
    name: 'Project Alpha',
    client: 'Acme Corp',
    progress: 75,
    hours: 120,
    budget: 15000,
    spent: 10200,
    status: 'active',
    workTypes: [
      { id: 'coding', name: 'Coding', color: '#3B82F6', hours: 60 },
      { id: 'design', name: 'Design', color: '#EF4444', hours: 20 },
      { id: 'meetings', name: 'Meetings', color: '#F59E0B', hours: 25 },
      { id: 'managing', name: 'Managing', color: '#10B981', hours: 15 },
    ],
    issues: [
      {
        id: 'ISS-001',
        title: 'Implement user authentication',
        status: 'done',
        assignee: 'John Doe',
        estimate: 8,
        actualTime: 10,
        workType: 'coding',
        linearId: 'LIN-123',
        createdAt: '2024-01-10',
      },
      {
        id: 'ISS-002',
        title: 'Design dashboard mockups',
        status: 'done',
        assignee: 'Jane Smith',
        estimate: 12,
        actualTime: 11,
        workType: 'design',
        linearId: 'LIN-124',
        createdAt: '2024-01-12',
      },
      {
        id: 'ISS-003',
        title: 'API integration for payments',
        status: 'in-progress',
        assignee: 'John Doe',
        estimate: 16,
        actualTime: 8,
        workType: 'coding',
        linearId: 'LIN-125',
        createdAt: '2024-01-15',
      },
      {
        id: 'ISS-004',
        title: 'Sprint planning meeting',
        status: 'done',
        assignee: 'Mike Johnson',
        estimate: 2,
        actualTime: 2.5,
        workType: 'meetings',
        createdAt: '2024-01-16',
      },
    ],
  },
  {
    id: 2,
    name: 'Project Beta',
    client: 'TechStart Inc',
    progress: 45,
    hours: 80,
    budget: 10000,
    spent: 6000,
    status: 'active',
    workTypes: [
      { id: 'coding', name: 'Coding', color: '#3B82F6', hours: 40 },
      { id: 'design', name: 'Design', color: '#EF4444', hours: 15 },
      { id: 'meetings', name: 'Meetings', color: '#F59E0B', hours: 15 },
      { id: 'managing', name: 'Managing', color: '#10B981', hours: 10 },
    ],
    issues: [
      {
        id: 'ISS-005',
        title: 'Setup CI/CD pipeline',
        status: 'in-progress',
        assignee: 'Sarah Williams',
        estimate: 6,
        actualTime: 4,
        workType: 'coding',
        linearId: 'LIN-126',
        createdAt: '2024-01-18',
      },
      {
        id: 'ISS-006',
        title: 'Create brand guidelines',
        status: 'todo',
        assignee: 'Jane Smith',
        estimate: 8,
        actualTime: 0,
        workType: 'design',
        createdAt: '2024-01-20',
      },
    ],
  },
  {
    id: 3,
    name: 'Project Gamma',
    client: 'Design Studio',
    progress: 90,
    hours: 200,
    budget: 25000,
    spent: 16000,
    status: 'active',
    workTypes: [
      { id: 'coding', name: 'Coding', color: '#3B82F6', hours: 100 },
      { id: 'design', name: 'Design', color: '#EF4444', hours: 40 },
      { id: 'meetings', name: 'Meetings', color: '#F59E0B', hours: 35 },
      { id: 'managing', name: 'Managing', color: '#10B981', hours: 25 },
    ],
    issues: [
      {
        id: 'ISS-007',
        title: 'Refactor legacy code',
        status: 'done',
        assignee: 'John Doe',
        estimate: 20,
        actualTime: 22,
        workType: 'coding',
        linearId: 'LIN-127',
        createdAt: '2024-01-05',
      },
      {
        id: 'ISS-008',
        title: 'Client feedback review',
        status: 'done',
        assignee: 'Mike Johnson',
        estimate: 3,
        actualTime: 3,
        workType: 'meetings',
        createdAt: '2024-01-22',
      },
    ],
  },
  {
    id: 4,
    name: 'Project Delta',
    client: 'StartupXYZ',
    progress: 100,
    hours: 150,
    budget: 18000,
    spent: 18000,
    status: 'archived',
    workTypes: [
      { id: 'coding', name: 'Coding', color: '#3B82F6', hours: 80 },
      { id: 'design', name: 'Design', color: '#EF4444', hours: 30 },
      { id: 'meetings', name: 'Meetings', color: '#F59E0B', hours: 25 },
      { id: 'managing', name: 'Managing', color: '#10B981', hours: 15 },
    ],
    issues: [],
  },
];

export interface TimeEntry {
  id: number;
  date: string;
  projectId: number;
  projectName: string;
  memberId: number;
  memberName: string;
  duration: number; // in hours
  description: string;
  issues: string[]; // Array of issue IDs
}

const timeEntriesData: TimeEntry[] = [
  {
    id: 1,
    date: '2024-01-15',
    projectId: 1,
    projectName: 'Project Alpha',
    memberId: 1,
    memberName: 'John Doe',
    duration: 8.5,
    description: 'Implemented user authentication',
    issues: ['ISS-001'],
  },
  {
    id: 2,
    date: '2024-01-15',
    projectId: 1,
    projectName: 'Project Alpha',
    memberId: 1,
    memberName: 'John Doe',
    duration: 2,
    description: 'Code review and bug fixes',
    issues: ['ISS-003'],
  },
  {
    id: 3,
    date: '2024-01-15',
    projectId: 1,
    projectName: 'Project Alpha',
    memberId: 2,
    memberName: 'Jane Smith',
    duration: 7.5,
    description: 'Dashboard mockups design',
    issues: ['ISS-002'],
  },
  {
    id: 4,
    date: '2024-01-14',
    projectId: 2,
    projectName: 'Project Beta',
    memberId: 4,
    memberName: 'Sarah Williams',
    duration: 6,
    description: 'CI/CD pipeline setup',
    issues: ['ISS-005'],
  },
  {
    id: 5,
    date: '2024-01-14',
    projectId: 3,
    projectName: 'Project Gamma',
    memberId: 1,
    memberName: 'John Doe',
    duration: 8,
    description: 'Legacy code refactoring',
    issues: ['ISS-007'],
  },
  {
    id: 6,
    date: '2024-01-16',
    projectId: 1,
    projectName: 'Project Alpha',
    memberId: 3,
    memberName: 'Mike Johnson',
    duration: 2.5,
    description: 'Sprint planning meeting',
    issues: ['ISS-004'],
  },
  {
    id: 7,
    date: '2024-01-13',
    projectId: 2,
    projectName: 'Project Beta',
    memberId: 2,
    memberName: 'Jane Smith',
    duration: 4,
    description: 'Brand guidelines research',
    issues: ['ISS-006'],
  },
  {
    id: 8,
    date: '2024-01-12',
    projectId: 3,
    projectName: 'Project Gamma',
    memberId: 3,
    memberName: 'Mike Johnson',
    duration: 3,
    description: 'Client feedback review',
    issues: ['ISS-008'],
  },
];

export function useProjectsViewModel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    status: 'all',
    client: 'all',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [issuesPerPage] = useState(10);
  
  // Time entries filters
  const [timeEntriesSearchQuery, setTimeEntriesSearchQuery] = useState('');
  const [timeEntriesFilters, setTimeEntriesFilters] = useState<Record<string, string>>({
    project: 'all',
    member: 'all',
  });
  const [timeEntriesDateRange, setTimeEntriesDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [timeEntriesPage, setTimeEntriesPage] = useState(1);
  const [timeEntriesPerPage] = useState(10);

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setActiveFilters({ status: 'all', client: 'all' });
    setSearchQuery('');
  };

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = activeFilters.status === 'all' || project.status === activeFilters.status;
      const matchesClient = activeFilters.client === 'all' || project.client === activeFilters.client;

      return matchesSearch && matchesStatus && matchesClient;
    });
  }, [searchQuery, activeFilters]);

  const filterConfigs = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Archived', value: 'archived' },
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

  // Get all issues from all projects
  const allIssues = useMemo(() => {
    return projectsData.flatMap((project) =>
      project.issues.map((issue) => ({
        ...issue,
        projectName: project.name,
        projectId: project.id,
        client: project.client,
        projectWorkTypes: project.workTypes, // Pass project work types for issue context
      }))
    );
  }, []);

  // Paginate issues
  const paginatedIssues = useMemo(() => {
    const startIndex = (currentPage - 1) * issuesPerPage;
    const endIndex = startIndex + issuesPerPage;
    return allIssues.slice(startIndex, endIndex);
  }, [allIssues, currentPage, issuesPerPage]);

  const totalPages = Math.ceil(allIssues.length / issuesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTimeEntriesFilterChange = (key: string, value: string) => {
    setTimeEntriesFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleTimeEntriesClearFilters = () => {
    setTimeEntriesFilters({ project: 'all', member: 'all' });
    setTimeEntriesSearchQuery('');
    setTimeEntriesDateRange({});
  };

  // Filter and paginate time entries
  const filteredTimeEntries = useMemo(() => {
    return timeEntriesData.filter((entry) => {
      const matchesSearch =
        entry.projectName.toLowerCase().includes(timeEntriesSearchQuery.toLowerCase()) ||
        entry.memberName.toLowerCase().includes(timeEntriesSearchQuery.toLowerCase()) ||
        entry.description.toLowerCase().includes(timeEntriesSearchQuery.toLowerCase()) ||
        entry.issues.some((issue) => issue.toLowerCase().includes(timeEntriesSearchQuery.toLowerCase()));
      
      const matchesProject = timeEntriesFilters.project === 'all' || entry.projectId.toString() === timeEntriesFilters.project;
      const matchesMember = timeEntriesFilters.member === 'all' || entry.memberId.toString() === timeEntriesFilters.member;

      let matchesDate = true;
      if (timeEntriesDateRange.from || timeEntriesDateRange.to) {
        const entryDate = new Date(entry.date);
        if (timeEntriesDateRange.from && entryDate < timeEntriesDateRange.from) matchesDate = false;
        if (timeEntriesDateRange.to && entryDate > timeEntriesDateRange.to) matchesDate = false;
      }

      return matchesSearch && matchesProject && matchesMember && matchesDate;
    });
  }, [timeEntriesSearchQuery, timeEntriesFilters, timeEntriesDateRange]);

  const paginatedTimeEntries = useMemo(() => {
    const startIndex = (timeEntriesPage - 1) * timeEntriesPerPage;
    const endIndex = startIndex + timeEntriesPerPage;
    return filteredTimeEntries.slice(startIndex, endIndex);
  }, [filteredTimeEntries, timeEntriesPage, timeEntriesPerPage]);

  const timeEntriesTotalPages = Math.ceil(filteredTimeEntries.length / timeEntriesPerPage);

  const handleTimeEntriesPageChange = (page: number) => {
    setTimeEntriesPage(page);
  };

  const timeEntriesFilterConfigs = [
    {
      key: 'project',
      label: 'Project',
      options: projectsData.map((project) => ({
        label: project.name,
        value: project.id.toString(),
      })),
    },
    {
      key: 'member',
      label: 'Member',
      options: [
        { label: 'John Doe', value: '1' },
        { label: 'Jane Smith', value: '2' },
        { label: 'Mike Johnson', value: '3' },
        { label: 'Sarah Williams', value: '4' },
      ],
    },
  ];

  return {
    projects: filteredProjects,
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    handleClearFilters,
    filterConfigs,
    isDialogOpen,
    setIsDialogOpen,
    selectedProject,
    setSelectedProject,
    allIssues: paginatedIssues,
    currentPage,
    totalPages,
    handlePageChange,
    // Time entries
    timeEntries: paginatedTimeEntries,
    timeEntriesSearchQuery,
    setTimeEntriesSearchQuery,
    timeEntriesFilters,
    handleTimeEntriesFilterChange,
    handleTimeEntriesClearFilters,
    timeEntriesDateRange,
    setTimeEntriesDateRange,
    timeEntriesFilterConfigs,
    timeEntriesPage,
    timeEntriesTotalPages,
    handleTimeEntriesPageChange,
  };
}
