import { Card, CardContent } from '@/components/ui/card';
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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import {
  CalendarIcon,
  ActivityIcon,
  TrendingUpIcon,
  ClockIcon,
  CameraIcon,
  MonitorIcon,
} from 'lucide-react';
import { useInsightsViewModel } from '@/viewmodels/useInsightsViewModel';

const WORK_TYPE_COLORS = {
  coding: '#3B82F6',
  managing: '#10B981',
  meeting: '#F59E0B',
  designing: '#EF4444',
  research: '#8B5CF6', // Added research work type color
};

export function InsightsScreen() {
  const {
    teamActivity,
    projectPerformance,
    productiveHours,
    appUsage,
    screenshots,
    overallStats,
    dateFilter,
    setDateFilter,
    customDateRange,
    setCustomDateRange,
    selectedProject,
    setSelectedProject,
    selectedMember,
    setSelectedMember,
    getDateRangeLabel,
    allProjects,
    allMembers,
    overallWorkTypeDistribution,
  } = useInsightsViewModel();

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
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
            className={dateFilter != 'today' ? 'bg-tertiary text-tertiary-foreground' : 'bg-black text-white'}
          >
            Today
          </Button>
          <Button
            variant={dateFilter === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateFilter('week')}
            className={dateFilter != 'week' ? 'bg-tertiary text-tertiary-foreground' : 'bg-black text-white'}
          >
            This Week
          </Button>
          <Button
            variant={dateFilter === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateFilter('month')}
            className={dateFilter != 'month' ? 'bg-tertiary text-tertiary-foreground' : 'bg-black text-white'}
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
            <PopoverContent
  className="w-auto bg-white text-black dark:bg-neutral-900 dark:text-white border border-gray-200 dark:border-neutral-800 rounded-md shadow-xl p-4 backdrop-blur-sm"
>
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

          <Select
            value={selectedProject?.toString() || 'all'}
            onValueChange={(value) => setSelectedProject(value === 'all' ? null : parseInt(value))}
          >
            <SelectTrigger className="w-48 bg-background text-foreground">
              <SelectValue placeholder="All Projects" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black dark:bg-neutral-900 dark:text-white border border-gray-200 dark:border-neutral-800 shadow-md">
              <SelectItem
                value="all"
                className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                All Projects
              </SelectItem>
              {allProjects.map((project) => (<SelectItem
                  key={project.id}
                  value={project.id.toString()}
                  className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer data-[state=checked]:bg-black data-[state=checked]:text-white"
                >
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedMember?.toString() || 'all'}
            onValueChange={(value) => setSelectedMember(value === 'all' ? null : parseInt(value))}
          >
            <SelectTrigger className="w-48 bg-background text-foreground">
              <SelectValue placeholder="All Team Members" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black dark:bg-neutral-900 dark:text-white border border-gray-200 dark:border-neutral-800 shadow-md">
              <SelectItem
                value="all"
                className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer"
              >
                All Team Members
              </SelectItem>
              {allMembers.map((member) => (
                <SelectItem
                  key={member.id}
                  value={member.id.toString()}
                  className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer data-[state=checked]:bg-black data-[state=checked]:text-white"
                >
                  {member.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group overflow-hidden border-border/50 bg-card-gradient shadow-card transition-all hover:shadow-card-hover">
          <CardContent className="relative flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-tertiary to-blue-500 shadow-glow">
              <ClockIcon className="h-6 w-6 text-white" />
            </div>
            <div className="absolute right-0 top-0 h-24 w-24 bg-gradient-radial opacity-0 transition-opacity group-hover:opacity-100" />
            <div>
              <p className="text-sm text-muted-foreground">Active Hours</p>
              <p className="text-2xl font-bold text-card-foreground">{overallStats.totalActiveHours}h</p>
              <p className="text-xs text-muted-foreground">{overallStats.totalIdleHours}h idle</p>
            </div>
          </CardContent>
        </Card>

        <Card className="group overflow-hidden border-border/50 bg-card-gradient shadow-card transition-all hover:shadow-card-hover">
          <CardContent className="relative flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-success to-green-400 shadow-glow">
              <TrendingUpIcon className="h-6 w-6 text-white" />
            </div>
            <div className="absolute right-0 top-0 h-24 w-24 bg-gradient-radial opacity-0 transition-opacity group-hover:opacity-100" />
            <div>
              <p className="text-sm text-muted-foreground">Avg Productivity</p>
              <p className="text-2xl font-bold text-card-foreground">{overallStats.avgProductivity}%</p>
              <p className="text-xs text-success">+5% from last period</p>
            </div>
          </CardContent>
        </Card>

        <Card className="group overflow-hidden border-border/50 bg-card-gradient shadow-card transition-all hover:shadow-card-hover">
          <CardContent className="relative flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-warning to-orange-400 shadow-glow">
              <CameraIcon className="h-6 w-6 text-white" />
            </div>
            <div className="absolute right-0 top-0 h-24 w-24 bg-gradient-radial opacity-0 transition-opacity group-hover:opacity-100" />
            <div>
              <p className="text-sm text-muted-foreground">Screenshots</p>
              <p className="text-2xl font-bold text-card-foreground">{overallStats.totalScreenshots}</p>
              <p className="text-xs text-muted-foreground">Captured this period</p>
            </div>
          </CardContent>
        </Card>

        <Card className="group overflow-hidden border-border/50 bg-card-gradient shadow-card transition-all hover:shadow-card-hover">
          <CardContent className="relative flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-tertiary to-blue-500 shadow-glow">
              <ActivityIcon className="h-6 w-6 text-white" />
            </div>
            <div className="absolute right-0 top-0 h-24 w-24 bg-gradient-radial opacity-0 transition-opacity group-hover:opacity-100" />
            <div>
              <p className="text-sm text-muted-foreground">Active Members</p>
              <p className="text-2xl font-bold text-card-foreground">{teamActivity.length}</p>
              <p className="text-xs text-muted-foreground">Working this period</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden border-border/50 bg-card-gradient shadow-card">
          <CardContent className="p-6">
            <h3 className="mb-6 text-lg font-semibold text-card-foreground">Productive Hours</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={productiveHours}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0, 0%, 22%)" />
                <XAxis dataKey="hour" stroke="hsl(0, 0%, 74%)" />
                <YAxis stroke="hsl(0, 0%, 74%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(0, 0%, 14%)',
                    border: '1px solid hsl(0, 0%, 22%)',
                    borderRadius: '8px',
                    color: 'hsl(0, 0%, 100%)',
                  }}
                />
                <Line type="monotone" dataKey="productivity" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-border/50 bg-card-gradient shadow-card">
          <CardContent className="p-6">
            <h3 className="mb-6 text-lg font-semibold text-card-foreground">Most Used Apps</h3>
            <div className="space-y-4">
              {appUsage.map((app, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MonitorIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-card-foreground">{app.name}</span>
                      <span className="text-xs text-muted-foreground">({app.category})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-card-foreground">{app.hours}h</span>
                      <span className="text-xs text-muted-foreground">{app.percentage}%</span>
                    </div>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full bg-tertiary transition-all"
                      style={{ width: `${app.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New: Overall Work Type Distribution */}
      <Card className="overflow-hidden border-border/50 bg-card-gradient shadow-card">
        <CardContent className="p-6">
          <h3 className="mb-6 text-lg font-semibold text-card-foreground">Overall Work Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={overallWorkTypeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, hours }) => `${name}: ${hours}h`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="hours"
              >
                {overallWorkTypeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(0, 0%, 14%)',
                  border: '1px solid hsl(0, 0%, 22%)',
                  borderRadius: '8px',
                  color: 'hsl(0, 0%, 100%)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Project Performance */}
      <Card className="overflow-hidden border-border/50 bg-card-gradient shadow-card">
        <CardContent className="p-6">
          <h3 className="mb-6 text-lg font-semibold text-card-foreground">Project Performance & Work Types</h3>
          <div className="space-y-6">
            {projectPerformance.map((project) => {
              const workTypeData = [
                { name: 'Coding', value: project.workTypes.coding, color: WORK_TYPE_COLORS.coding },
                { name: 'Managing', value: project.workTypes.managing, color: WORK_TYPE_COLORS.managing },
                { name: 'Meeting', value: project.workTypes.meeting, color: WORK_TYPE_COLORS.meeting },
                { name: 'Designing', value: project.workTypes.designing, color: WORK_TYPE_COLORS.designing },
                { name: 'Research', value: project.workTypes.research, color: WORK_TYPE_COLORS.research },
              ].filter(type => type.value > 0); // Only show work types with hours

              return (
                <div key={project.id} className="rounded-lg border border-border bg-secondary/50 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-semibold text-card-foreground">{project.name}</h4>
                      <p className="text-sm text-muted-foreground">{project.totalHours}h total</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Efficiency</p>
                      <p className="text-xl font-bold text-success">{project.efficiency}%</p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      {workTypeData.map((type) => (
                        <div key={type.name} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-card-foreground">{type.name}</span>
                            <span className="text-sm font-medium text-card-foreground">{type.value}h</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-background">
                            <div
                              className="h-full transition-all"
                              style={{
                                width: `${(type.value / project.totalHours) * 100}%`,
                                backgroundColor: type.color,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-center">
                      <ResponsiveContainer width="100%" height={150}>
                        <PieChart>
                          <Pie
                            data={workTypeData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={60}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {workTypeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'hsl(0, 0%, 14%)',
                              border: '1px solid hsl(0, 0%, 22%)',
                              borderRadius: '8px',
                              color: 'hsl(0, 0%, 100%)',
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Team Activity */}
      <Card className="overflow-hidden border-border/50 bg-card-gradient shadow-card">
        <CardContent className="p-6">
          <h3 className="mb-6 text-lg font-semibold text-card-foreground">Team Member Activity</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Member</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Active Hours</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Idle Hours</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Productivity</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Top Apps</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Screenshots</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {teamActivity.map((member) => (
                  <tr key={member.id} className="transition-colors hover:bg-secondary/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-tertiary text-xs text-tertiary-foreground">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-card-foreground">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-card-foreground">{member.activeHours}h</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-muted-foreground">{member.idleHours}h</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full bg-success transition-all"
                            style={{ width: `${member.productivity}%` }}
                          />
                        </div>
                        <span className="text-sm text-card-foreground">{member.productivity}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {member.topApps.map((app, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-tertiary/20 px-2 py-1 text-xs text-tertiary"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-card-foreground">{member.screenshots}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Screenshots */}
      <Card className="overflow-hidden border-border/50 bg-card-gradient shadow-card">
        <CardContent className="p-6">
          <h3 className="mb-6 text-lg font-semibold text-card-foreground">Recent Screenshots</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {screenshots.map((screenshot) => (
              <div
                key={screenshot.id}
                className="group relative overflow-hidden rounded-lg border border-border bg-secondary/50 p-4 transition-all hover:shadow-card"
              >
                <div className="mb-3 flex items-center justify-center rounded-lg bg-background/50 p-8">
                  <CameraIcon className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-tertiary text-xs text-tertiary-foreground">
                        {screenshot.memberName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-card-foreground">{screenshot.memberName}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{screenshot.timestamp}</p>
                  <p className="text-sm text-card-foreground">{screenshot.activity}</p>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-background">
                      <div
                        className="h-full bg-success transition-all"
                        style={{ width: `${screenshot.productivity}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{screenshot.productivity}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
