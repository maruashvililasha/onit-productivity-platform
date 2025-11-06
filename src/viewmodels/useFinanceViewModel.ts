import { useState, useMemo } from 'react';
import { invoicesData, Invoice } from './useInvoicesViewModel'; // Import invoices
import { projectsData, Project } from './useProjectsViewModel'; // Import projects
import { teamData, TeamMember } from './useTeamViewModel'; // Import team members

interface FinancialData {
  month: string;
  income: number;
  expenses: number;
  salaries: number;
}

interface Salary {
  name: string;
  role: string;
  amount: number;
  status: string;
}

interface Expense {
  category: string;
  amount: number;
  date: string;
  project?: string; // Added project to expense
  client?: string; // Added client to expense
  member?: string; // Added member to expense
}

interface Income {
  client: string;
  project: string;
  amount: number;
  date: string;
  member?: string; // Added member to income
}

export interface RecurringInvoice {
  id: string;
  client: string;
  project: string;
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'yearly';
  nextDueDate: string;
  status: 'active' | 'paused';
}

export interface RecurringExpense {
  id: string;
  category: string;
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'yearly';
  nextDueDate: string;
  status: 'active' | 'paused';
}

const financialData: FinancialData[] = [
  { month: 'Jan', income: 45000, expenses: 32000, salaries: 28000 },
  { month: 'Feb', income: 52000, expenses: 35000, salaries: 30000 },
  { month: 'Mar', income: 48000, expenses: 33000, salaries: 29000 },
  { month: 'Apr', income: 61000, expenses: 38000, salaries: 31000 },
  { month: 'May', income: 55000, expenses: 36000, salaries: 30000 },
  { month: 'Jun', income: 67000, expenses: 40000, salaries: 32000 },
];

const salariesData: Salary[] = [
  { name: 'John Doe', role: 'Senior Developer', amount: 13600, status: 'Paid' },
  { name: 'Jane Smith', role: 'UI/UX Designer', amount: 11400, status: 'Paid' },
  { name: 'Mike Johnson', role: 'Project Manager', amount: 6000, status: 'Pending' },
  { name: 'Sarah Williams', role: 'Frontend Developer', amount: 10080, status: 'Paid' },
];

const expensesData: Expense[] = [
  { category: 'Software Licenses', amount: 2500, date: '2024-01-15', project: 'Project Alpha' },
  { category: 'Office Rent', amount: 3000, date: '2024-01-01' },
  { category: 'Equipment', amount: 1200, date: '2024-01-10', member: 'John Doe' },
  { category: 'Marketing', amount: 800, date: '2024-01-20', client: 'Acme Corp' },
];

const incomeData: Income[] = [
  { client: 'Acme Corp', project: 'Project Alpha', amount: 15000, date: '2024-01-15', member: 'John Doe' },
  { client: 'TechStart Inc', project: 'Project Beta', amount: 10000, date: '2024-01-20' },
  { client: 'Design Studio', project: 'Project Gamma', amount: 25000, date: '2024-01-25', member: 'Mike Johnson' },
];

const recurringInvoicesData: RecurringInvoice[] = [
  {
    id: 'REC-INV-001',
    client: 'Acme Corp',
    project: 'Maintenance Plan',
    amount: 2000,
    frequency: 'monthly',
    nextDueDate: '2024-02-01',
    status: 'active',
  },
  {
    id: 'REC-INV-002',
    client: 'TechStart Inc',
    project: 'Support Package',
    amount: 5000,
    frequency: 'quarterly',
    nextDueDate: '2024-03-15',
    status: 'active',
  },
];

const recurringExpensesData: RecurringExpense[] = [
  {
    id: 'REC-EXP-001',
    category: 'Office Rent',
    amount: 3000,
    frequency: 'monthly',
    nextDueDate: '2024-02-01',
    status: 'active',
  },
  {
    id: 'REC-EXP-002',
    category: 'Software Subscriptions',
    amount: 500,
    frequency: 'monthly',
    nextDueDate: '2024-02-05',
    status: 'active',
  },
];

export function useFinanceViewModel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({
    status: 'all',
    category: 'all',
    project: 'all',
    client: 'all',
    member: 'all',
  });
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [isRecurringInvoiceDialogOpen, setIsRecurringInvoiceDialogOpen] = useState(false);
  const [isRecurringExpenseDialogOpen, setIsRecurringExpenseDialogOpen] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setActiveFilters({ status: 'all', category: 'all', project: 'all', client: 'all', member: 'all' });
    setSearchQuery('');
    setDateRange({});
  };

  const filterDataByDate = (data: (Income | Expense | Invoice | Salary)[]) => {
    if (!dateRange.from && !dateRange.to) return data;

    return data.filter((item) => {
      const itemDate = new Date('date' in item ? item.date : new Date()); // Fallback for salaries/recurring
      let matchesDate = true;
      if (dateRange.from && itemDate < dateRange.from) matchesDate = false;
      if (dateRange.to && itemDate > dateRange.to) matchesDate = false;
      return matchesDate;
    });
  };

  const filterDataByProject = (data: (Income | Expense | Invoice | RecurringInvoice)[]) => {
    if (activeFilters.project === 'all') return data;
    return data.filter((item) => 'project' in item && item.project === activeFilters.project);
  };

  const filterDataByClient = (data: (Income | Expense | Invoice | RecurringInvoice)[]) => {
    if (activeFilters.client === 'all') return data;
    return data.filter((item) => 'client' in item && item.client === activeFilters.client);
  };

  const filterDataByMember = (data: (Income | Expense | Salary)[]) => {
    if (activeFilters.member === 'all') return data;
    return data.filter((item) => 'member' in item && item.member === activeFilters.member || ('name' in item && item.name === activeFilters.member));
  };

  const filteredSalaries = useMemo(() => {
    const filtered = filterDataByDate(salariesData);
    return filterDataByMember(filtered) as Salary[];
  }, [salariesData, dateRange, activeFilters.member]);

  const filteredExpenses = useMemo(() => {
    let filtered = filterDataByDate(expensesData);
    filtered = filterDataByProject(filtered);
    filtered = filterDataByClient(filtered);
    filtered = filterDataByMember(filtered);
    if (activeFilters.category !== 'all') {
      filtered = filtered.filter((expense) => 'category' in expense && expense.category === activeFilters.category);
    }
    return filtered as Expense[];
  }, [expensesData, dateRange, activeFilters.project, activeFilters.client, activeFilters.member, activeFilters.category]);

  const filteredIncome = useMemo(() => {
    let filtered = filterDataByDate(incomeData);
    filtered = filterDataByProject(filtered);
    filtered = filterDataByClient(filtered);
    filtered = filterDataByMember(filtered);
    return filtered as Income[];
  }, [incomeData, dateRange, activeFilters.project, activeFilters.client, activeFilters.member]);

  const filteredInvoices = useMemo(() => {
    let filtered = filterDataByDate(invoicesData);
    filtered = filterDataByProject(filtered);
    filtered = filterDataByClient(filtered);
    if (activeFilters.status !== 'all') {
      filtered = filtered.filter((invoice) => 'status' in invoice && invoice.status === activeFilters.status);
    }
    return filtered as Invoice[];
  }, [invoicesData, dateRange, activeFilters.project, activeFilters.client, activeFilters.status]);

  const filteredRecurringInvoices = useMemo(() => {
    let filtered = filterDataByProject(recurringInvoicesData);
    filtered = filterDataByClient(filtered);
    return filtered as RecurringInvoice[];
  }, [recurringInvoicesData, activeFilters.project, activeFilters.client]);

  const filteredRecurringExpenses = useMemo(() => {
    let filtered = recurringExpensesData;
    if (activeFilters.category !== 'all') {
      filtered = filtered.filter((expense) => expense.category === activeFilters.category);
    }
    return filtered as RecurringExpense[];
  }, [recurringExpensesData, activeFilters.category]);


  const totalIncome = useMemo(() => {
    const regularIncome = filteredIncome.reduce((sum, item) => sum + item.amount, 0);
    const paidInvoices = filteredInvoices
      .filter((invoice) => invoice.status === 'paid' && invoice.includeInFinance)
      .reduce((sum, invoice) => sum + invoice.amount, 0);
    return regularIncome + paidInvoices;
  }, [filteredIncome, filteredInvoices]);

  const totalExpenses = useMemo(() => filteredExpenses.reduce((sum, item) => sum + item.amount, 0), [filteredExpenses]);
  const totalSalaries = useMemo(() => filteredSalaries.reduce((sum, item) => sum + item.amount, 0), [filteredSalaries]);
  const profit = useMemo(() => totalIncome - totalExpenses - totalSalaries, [totalIncome, totalExpenses, totalSalaries]);

  const amountWaiting = useMemo(() => {
    return filteredInvoices
      .filter((invoice) => (invoice.status === 'sent' || invoice.status === 'overdue') && invoice.includeInFinance)
      .reduce((sum, invoice) => sum + invoice.amount, 0);
  }, [filteredInvoices]);

  const projectOptions = useMemo(() => projectsData.map(p => ({ label: p.name, value: p.name })), [projectsData]);
  const clientOptions = useMemo(() => Array.from(new Set(projectsData.map(p => p.client))).map(c => ({ label: c, value: c })), [projectsData]);
  const memberOptions = useMemo(() => teamData.map(m => ({ label: m.name, value: m.name })), [teamData]);
  const categoryOptions = useMemo(() => Array.from(new Set(expensesData.map(e => e.category))).map(c => ({ label: c, value: c })), [expensesData]);


  const filterConfigs = [
    {
      key: 'project',
      label: 'Project',
      options: projectOptions,
    },
    {
      key: 'client',
      label: 'Client',
      options: clientOptions,
    },
    {
      key: 'member',
      label: 'Member',
      options: memberOptions,
    },
    {
      key: 'category',
      label: 'Category',
      options: categoryOptions,
    },
    {
      key: 'status',
      label: 'Status',
      options: [
        { label: 'Paid', value: 'paid' },
        { label: 'Sent', value: 'sent' },
        { label: 'Draft', value: 'draft' },
        { label: 'Overdue', value: 'overdue' },
        { label: 'Active', value: 'active' },
        { label: 'Paused', value: 'paused' },
      ],
    },
  ];

  return {
    financialData,
    salaries: salariesData,
    expenses: expensesData,
    income: incomeData,
    invoices: invoicesData, // Expose all invoices
    recurringInvoices: recurringInvoicesData,
    recurringExpenses: recurringExpensesData,
    totalIncome,
    totalExpenses,
    totalSalaries,
    profit,
    amountWaiting,
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    handleClearFilters,
    dateRange,
    setDateRange,
    filterConfigs,
    isRecurringInvoiceDialogOpen,
    setIsRecurringInvoiceDialogOpen,
    isRecurringExpenseDialogOpen,
    setIsRecurringExpenseDialogOpen,
  };
}
