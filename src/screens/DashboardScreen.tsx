import { DashboardCard } from '../components/DashboardCard';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUpIcon, ClockIcon, DollarSignIcon, UsersIcon, TrendingDownIcon, CalendarIcon } from 'lucide-react';
import { useDashboardViewModel } from '@/viewmodels/useDashboardViewModel';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function DashboardScreen() {
  const {
    stats,
    weeklyHours,
    projectHours,
    teamPerformance,
    earnings,
    expenses,
    dateFilter,
    setDateFilter,
    customDateRange,
    setCustomDateRange,
    selectedMember,
    setSelectedMember,
    getDateRangeLabel,
    allTeamMembers,
    workTypeDistribution,
  } = useDashboardViewModel();

  return (
    <div className="space-y-8">
      {/* Date Filter Bar */}
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium text-card-foreground">Period:</span>
          <span className="text-sm text-muted-foreground">{getDateRangeLabel()}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant={dateFilter === 'today' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateFilter('today')}
            className={dateFilter === 'today' ? 'bg-black text-white' : ''}
          >
            Today
          </Button>
          <Button
            variant={dateFilter === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateFilter('week')}
            className={dateFilter === 'week' ? 'bg-black text-white' : ''}
          >
            This Week
          </Button>
          <Button
            variant={dateFilter === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateFilter('month')}
            className={dateFilter === 'month' ? 'bg-black text-white' : ''}
          >
            This Month
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={dateFilter === 'custom' ? 'default' : 'outline'}
                size="sm"
                className={dateFilter === 'custom' ? 'bg-tertiary text-tertiary-foreground' : ''}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                Custom Range
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto bg-popover p-4 text-popover-foreground">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date-from" className="text-popover-foreground">
                    From
                  </Label>
                  <Input
                    id="date-from"
                    type="date"
                    value={customDateRange?.from?.toISOString().split('T')[0] || ''}
                    onChange={(e) => {
                      setCustomDateRange({
                        ...customDateRange,
                        from: e.target.value ? new Date(e.target.value) : undefined,
                      });
                      setDateFilter('custom');
                    }}
                    className="bg-background text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-to" className="text-popover-foreground">
                    To
                  </Label>
                  <Input
                    id="date-to"
                    type="date"
                    value={customDateRange?.to?.toISOString().split('T')[0] || ''}
                    onChange={(e) => {
                      setCustomDateRange({
                        ...customDateRange,
                        to: e.target.value ? new Date(e.target.value) : undefined,
                      });
                      setDateFilter('custom');
                    }}
                    className="bg-background text-foreground"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Select value={selectedMember?.toString() || 'all'} onValueChange={(value) => setSelectedMember(value === 'all' ? null : parseInt(value))}>
            <SelectTrigger className="w-48 bg-background text-foreground">
              <SelectValue placeholder="All Team Members" />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground">
              <SelectItem value="all" className="text-popover-foreground">
                All Team Members
              </SelectItem>
              {allTeamMembers.map((member) => (
                <SelectItem key={member.id} value={member.id.toString()} className="text-popover-foreground">
                  {member.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-border bg-card shadow-card">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <ClockIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Hours</p>
              <p className="text-2xl font-bold text-card-foreground">{stats.totalHours}h</p>
              <p className="text-xs text-muted-foreground">{stats.avgHoursPerDay}h/day avg</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-card">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success">
              <TrendingUpIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Earnings</p>
              <p className="text-2xl font-bold text-card-foreground">${stats.totalEarnings.toLocaleString()}</p>
              <p className="text-xs text-success">+12% from last period</p>
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
              <p className="text-2xl font-bold text-card-foreground">${stats.totalExpenses.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Salaries, software, office</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-card">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <UsersIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Projects</p>
              <p className="text-2xl font-bold text-card-foreground">{stats.activeProjects}</p>
              <p className="text-xs text-muted-foreground">{stats.teamMembers} team members</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardCard title="Hours Logged">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="day" stroke="hsl(240, 3.8%, 46.1%)" />
              <YAxis stroke="hsl(240, 3.8%, 46.1%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: '1px solid hsl(220, 13%, 91%)',
                  borderRadius: '8px',
                  color: 'hsl(240, 5.3%, 26.1%)',
                }}
              />
              <Bar dataKey="hours" fill="hsl(217.2, 91.2%, 59.8%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard title="Hours by Project">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={projectHours}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="hours"
              >
                {projectHours.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(0, 0%, 100%)',
                  border: '1px solid hsl(220, 13%, 91%)',
                  borderRadius: '8px',
                  color: 'hsl(240, 5.3%, 26.1%)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </DashboardCard>
      </div>

      {/* New: Work Type Distribution */}
      <DashboardCard title="Work Type Distribution">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={workTypeDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, hours }) => `${name}: ${hours}h`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="hours"
            >
              {workTypeDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(220, 13%, 91%)',
                borderRadius: '8px',
                color: 'hsl(240, 5.3%, 26.1%)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </DashboardCard>

      {/* Team Performance */}
      <DashboardCard title="Team Performance">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">
                  Member
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">
                  Hours
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">
                  Projects
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">
                  Efficiency
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">
                  Earnings
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {teamPerformance.map((member) => (
                <tr key={member.id} className="transition-colors hover:bg-secondary">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-card-foreground">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-card-foreground">{member.hours}h</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-card-foreground">{member.projects}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full bg-success transition-all"
                          style={{ width: `${member.efficiency}%` }}
                        />
                      </div>
                      <span className="text-sm text-card-foreground">{member.efficiency}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold text-card-foreground">
                      ${member.earnings?.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {/* Earnings & Expenses Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border border-border bg-card shadow-card">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-card-foreground">Earnings Breakdown</h3>
              <DollarSignIcon className="h-5 w-5 text-success" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Base Earnings</span>
                <span className="text-sm font-semibold text-card-foreground">
                  ${(earnings.hourlyRate * earnings.hoursWorked).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Hourly Rate</span>
                <span className="text-sm font-semibold text-card-foreground">
                  ${earnings.hourlyRate}/hr
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Hours Worked</span>
                <span className="text-sm font-semibold text-card-foreground">
                  {earnings.hoursWorked}h
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Bonus</span>
                <span className="text-sm font-semibold text-success">
                  +${earnings.bonus.toLocaleString()}
                </span>
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-card-foreground">Total</span>
                  <span className="text-xl font-bold text-success">
                    ${earnings.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-card">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-card-foreground">Expenses Breakdown</h3>
              <TrendingDownIcon className="h-5 w-5 text-warning" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Salaries</span>
                <span className="text-sm font-semibold text-card-foreground">
                  ${expenses.salaries.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Software & Tools</span>
                <span className="text-sm font-semibold text-card-foreground">
                  ${expenses.software.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Office & Rent</span>
                <span className="text-sm font-semibold text-card-foreground">
                  ${expenses.office.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Other</span>
                <span className="text-sm font-semibold text-card-foreground">
                  ${expenses.other.toLocaleString()}
                </span>
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-card-foreground">Total</span>
                  <span className="text-xl font-bold text-warning">
                    ${expenses.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
