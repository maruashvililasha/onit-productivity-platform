import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusIcon, TrendingUpIcon, TrendingDownIcon, FileTextIcon, RepeatIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FilterBar } from '@/components/FilterBar';
import { useFinanceViewModel } from '@/viewmodels/useFinanceViewModel';
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
import { Checkbox } from '@/components/ui/checkbox';

export function FinanceScreen() {
  const {
    financialData,
    salaries,
    expenses,
    income,
    invoices,
    recurringInvoices,
    recurringExpenses,
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
  } = useFinanceViewModel();

  const [isAddInvoiceDialogOpen, setIsAddInvoiceDialogOpen] = useState(false);
  const [isAddExpenseDialogOpen, setIsAddExpenseDialogOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-border bg-card shadow-card">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success">
              <TrendingUpIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Income</p>
              <p className="text-2xl font-bold text-card-foreground">${totalIncome.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-card">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning">
              <TrendingDownIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <p className="text-2xl font-bold text-card-foreground">${totalExpenses.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-card">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <FileTextIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Amount Waiting</p>
              <p className="text-2xl font-bold text-card-foreground">${amountWaiting.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-card">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <TrendingDownIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Salaries</p>
              <p className="text-2xl font-bold text-card-foreground">${totalSalaries.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-card">
          <CardContent className="flex items-center gap-4 p-6">
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${profit >= 0 ? 'bg-success' : 'bg-destructive'}`}>
              {profit >= 0 ? (
                <TrendingUpIcon className="h-6 w-6 text-white" />
              ) : (
                <TrendingDownIcon className="h-6 w-6 text-white" />
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Profit/Loss</p>
              <p className="text-2xl font-bold text-card-foreground">${profit.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-border bg-card shadow-card">
        <CardContent className="p-6">
          <h3 className="mb-6 text-lg font-semibold text-card-foreground">Financial Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="month" stroke="hsl(240, 3.8%, 46.1%)" />
              <YAxis stroke="hsl(240, 3.8%, 46.1%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: '1px solid hsl(220, 13%, 91%)',
                  borderRadius: '8px',
                  color: 'hsl(240, 5.3%, 26.1%)',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="hsl(142, 71%, 45%)" strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke="hsl(38, 92%, 50%)" strokeWidth={2} />
              <Line type="monotone" dataKey="salaries" stroke="hsl(217.2, 91.2%, 59.8%)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <FilterBar
        searchPlaceholder="Search transactions..."
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

      <Tabs defaultValue="salaries" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-secondary">
          <TabsTrigger value="salaries" className="text-secondary-foreground data-[state=active]:bg-tertiary data-[state=active]:text-tertiary-foreground">
            Salaries
          </TabsTrigger>
          <TabsTrigger value="expenses" className="text-secondary-foreground data-[state=active]:bg-tertiary data-[state=active]:text-tertiary-foreground">
            Expenses
          </TabsTrigger>
          <TabsTrigger value="income" className="text-secondary-foreground data-[state=active]:bg-tertiary data-[state=active]:text-tertiary-foreground">
            Income
          </TabsTrigger>
          <TabsTrigger value="invoices" className="text-secondary-foreground data-[state=active]:bg-tertiary data-[state=active]:text-tertiary-foreground">
            Invoices
          </TabsTrigger>
          <TabsTrigger value="recurring" className="text-secondary-foreground data-[state=active]:bg-tertiary data-[state=active]:text-tertiary-foreground">
            Recurring
          </TabsTrigger>
        </TabsList>

        <TabsContent value="salaries" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90">
                <PlusIcon className="mr-2 h-4 w-4" />
                Process Salaries
              </Button>
            </div>
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <table className="w-full">
                <thead className="border-b border-border bg-secondary">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {salaries.map((salary, index) => (
                    <tr key={index} className="transition-colors hover:bg-secondary/50">
                      <td className="px-6 py-4 text-sm font-medium text-card-foreground">{salary.name}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{salary.role}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-card-foreground">
                        ${salary.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            salary.status === 'Paid'
                              ? 'bg-success/20 text-success'
                              : 'bg-warning/20 text-warning'
                          }`}
                        >
                          {salary.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-end">
              <Dialog open={isAddExpenseDialogOpen} onOpenChange={setIsAddExpenseDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Expense
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-popover text-popover-foreground sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-popover-foreground">Add New Expense</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      Record a new expense.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="expense-category" className="text-popover-foreground">Category</Label>
                      <Input id="expense-category" placeholder="e.g., Software Licenses" className="bg-background text-foreground" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expense-amount" className="text-popover-foreground">Amount</Label>
                      <Input id="expense-amount" type="number" placeholder="Enter amount" className="bg-background text-foreground" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expense-date" className="text-popover-foreground">Date</Label>
                      <Input id="expense-date" type="date" className="bg-background text-foreground" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddExpenseDialogOpen(false)}
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => setIsAddExpenseDialogOpen(false)}
                      className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"
                    >
                      Add Expense
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <table className="w-full">
                <thead className="border-b border-border bg-secondary">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {expenses.map((expense, index) => (
                    <tr key={index} className="transition-colors hover:bg-secondary/50">
                      <td className="px-6 py-4 text-sm font-medium text-card-foreground">{expense.category}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-card-foreground">
                        ${expense.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{expense.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="income" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90">
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Income
              </Button>
            </div>
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <table className="w-full">
                <thead className="border-b border-border bg-secondary">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Client</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Project</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {income.map((incomeItem, index) => (
                    <tr key={index} className="transition-colors hover:bg-secondary/50">
                      <td className="px-6 py-4 text-sm font-medium text-card-foreground">{incomeItem.client}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{incomeItem.project}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-card-foreground">
                        ${incomeItem.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{incomeItem.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="mt-6">
          <div className="space-y-4">
            <div className="flex justify-end">
              <Dialog open={isAddInvoiceDialogOpen} onOpenChange={setIsAddInvoiceDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Create Invoice
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-popover text-popover-foreground sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-popover-foreground">Create New Invoice</DialogTitle>
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
                          <SelectItem value="acme" className="text-popover-foreground">Acme Corp</SelectItem>
                          <SelectItem value="techstart" className="text-popover-foreground">TechStart Inc</SelectItem>
                          <SelectItem value="design" className="text-popover-foreground">Design Studio</SelectItem>
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
                    <div className="space-y-2">
                      <Label htmlFor="invoice-due-date" className="text-popover-foreground">Due Date</Label>
                      <Input id="invoice-due-date" type="date" className="bg-background text-foreground" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-in-finance" defaultChecked />
                      <Label htmlFor="include-in-finance" className="text-popover-foreground">
                        Include in Finance Overview
                      </Label>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddInvoiceDialogOpen(false)}
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => setIsAddInvoiceDialogOpen(false)}
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
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Invoice ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Client</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Project</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Due Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">In Finance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {invoices.map((invoice, index) => (
                    <tr key={index} className="transition-colors hover:bg-secondary/50">
                      <td className="px-6 py-4 text-sm font-medium text-card-foreground">{invoice.id}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{invoice.client}</td>
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
                        {invoice.includeInFinance ? (
                          <span className="text-success">Yes</span>
                        ) : (
                          <span className="text-muted-foreground">No</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recurring" className="mt-6">
          <Tabs defaultValue="recurring-invoices" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-secondary">
              <TabsTrigger value="recurring-invoices" className="text-secondary-foreground data-[state=active]:bg-tertiary data-[state=active]:text-tertiary-foreground">
                Recurring Invoices
              </TabsTrigger>
              <TabsTrigger value="recurring-expenses" className="text-secondary-foreground data-[state=active]:bg-tertiary data-[state=active]:text-tertiary-foreground">
                Recurring Expenses
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recurring-invoices" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Dialog open={isRecurringInvoiceDialogOpen} onOpenChange={setIsRecurringInvoiceDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90">
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Add Recurring Invoice
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-popover text-popover-foreground sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-popover-foreground">Add Recurring Invoice</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                          Set up an invoice to be generated automatically.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="rec-inv-client" className="text-popover-foreground">Client</Label>
                          <Select>
                            <SelectTrigger className="bg-background text-foreground">
                              <SelectValue placeholder="Select client" />
                            </SelectTrigger>
                            <SelectContent className="bg-popover text-popover-foreground">
                              <SelectItem value="acme" className="text-popover-foreground">Acme Corp</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rec-inv-project" className="text-popover-foreground">Project</Label>
                          <Input id="rec-inv-project" placeholder="e.g., Monthly Retainer" className="bg-background text-foreground" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rec-inv-amount" className="text-popover-foreground">Amount</Label>
                          <Input id="rec-inv-amount" type="number" placeholder="Enter amount" className="bg-background text-foreground" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rec-inv-frequency" className="text-popover-foreground">Frequency</Label>
                          <Select>
                            <SelectTrigger className="bg-background text-foreground">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent className="bg-popover text-popover-foreground">
                              <SelectItem value="monthly" className="text-popover-foreground">Monthly</SelectItem>
                              <SelectItem value="quarterly" className="text-popover-foreground">Quarterly</SelectItem>
                              <SelectItem value="yearly" className="text-popover-foreground">Yearly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rec-inv-next-date" className="text-popover-foreground">Next Due Date</Label>
                          <Input id="rec-inv-next-date" type="date" className="bg-background text-foreground" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setIsRecurringInvoiceDialogOpen(false)}
                          className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => setIsRecurringInvoiceDialogOpen(false)}
                          className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"
                        >
                          Add Recurring Invoice
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="overflow-hidden rounded-lg border border-border bg-card">
                  <table className="w-full">
                    <thead className="border-b border-border bg-secondary">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">ID</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Client</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Project</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Amount</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Frequency</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Next Due</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {recurringInvoices.map((recInv, index) => (
                        <tr key={index} className="transition-colors hover:bg-secondary/50">
                          <td className="px-6 py-4 text-sm font-medium text-card-foreground">{recInv.id}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{recInv.client}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{recInv.project}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-card-foreground">
                            ${recInv.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{recInv.frequency}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{recInv.nextDueDate}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium ${
                                recInv.status === 'active'
                                  ? 'bg-success/20 text-success'
                                  : 'bg-gray-700 text-gray-300'
                              }`}
                            >
                              {recInv.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recurring-expenses" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Dialog open={isRecurringExpenseDialogOpen} onOpenChange={setIsRecurringExpenseDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90">
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Add Recurring Expense
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-popover text-popover-foreground sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-popover-foreground">Add Recurring Expense</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                          Set up an expense to be recorded automatically.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="rec-exp-category" className="text-popover-foreground">Category</Label>
                          <Input id="rec-exp-category" placeholder="e.g., Software Subscriptions" className="bg-background text-foreground" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rec-exp-amount" className="text-popover-foreground">Amount</Label>
                          <Input id="rec-exp-amount" type="number" placeholder="Enter amount" className="bg-background text-foreground" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rec-exp-frequency" className="text-popover-foreground">Frequency</Label>
                          <Select>
                            <SelectTrigger className="bg-background text-foreground">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent className="bg-popover text-popover-foreground">
                              <SelectItem value="monthly" className="text-popover-foreground">Monthly</SelectItem>
                              <SelectItem value="quarterly" className="text-popover-foreground">Quarterly</SelectItem>
                              <SelectItem value="yearly" className="text-popover-foreground">Yearly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rec-exp-next-date" className="text-popover-foreground">Next Due Date</Label>
                          <Input id="rec-exp-next-date" type="date" className="bg-background text-foreground" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setIsRecurringExpenseDialogOpen(false)}
                          className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => setIsRecurringExpenseDialogOpen(false)}
                          className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"
                        >
                          Add Recurring Expense
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="overflow-hidden rounded-lg border border-border bg-card">
                  <table className="w-full">
                    <thead className="border-b border-border bg-secondary">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">ID</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Category</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Amount</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Frequency</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Next Due</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {recurringExpenses.map((recExp, index) => (
                        <tr key={index} className="transition-colors hover:bg-secondary/50">
                          <td className="px-6 py-4 text-sm font-medium text-card-foreground">{recExp.id}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{recExp.category}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-card-foreground">
                            ${recExp.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{recExp.frequency}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{recExp.nextDueDate}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium ${
                                recExp.status === 'active'
                                  ? 'bg-success/20 text-success'
                                  : 'bg-gray-700 text-gray-300'
                              }`}
                            >
                              {recExp.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
