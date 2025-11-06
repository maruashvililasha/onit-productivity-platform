import { PlusIcon, ExternalLinkIcon, ChevronRightIcon, AlertCircleIcon, CheckCircle2Icon, ClockIcon, ChevronLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FilterBar } from '@/components/FilterBar';
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
import { useProjectsViewModel, Project } from '@/viewmodels/useProjectsViewModel';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export function ProjectsScreen() {
  const {
    projects,
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
    allIssues,
    currentPage,
    totalPages,
    handlePageChange,
    timeEntries,
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
  } = useProjectsViewModel();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done':
        return 'bg-success/20 text-success';
      case 'in-progress':
        return 'bg-tertiary/20 text-tertiary';
      case 'todo':
        return 'bg-gray-700 text-gray-300';
      case 'blocked':
        return 'bg-destructive/20 text-destructive';
      default:
        return 'bg-gray-700 text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
        return <CheckCircle2Icon className="h-4 w-4" />;
      case 'in-progress':
        return <ClockIcon className="h-4 w-4" />;
      case 'blocked':
        return <AlertCircleIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <FilterBar
        searchPlaceholder="Search projects or clients..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filterConfigs}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
            <ExternalLinkIcon className="mr-2 h-4 w-4" />
            Sync with Linear
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90">
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-black dark:bg-neutral-900 dark:text-white border border-gray-200 dark:border-neutral-800 shadow-xl rounded-lg sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-popover-foreground">Add New Project</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Create a new project to track time and budget.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name" className="text-popover-foreground">
                    Project Name
                  </Label>
                  <Input id="project-name" placeholder="Enter project name" className="bg-background text-foreground" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-name" className="text-popover-foreground">
                    Client
                  </Label>
                  <Input id="client-name" placeholder="Enter client name" className="bg-background text-foreground" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-popover-foreground">
                    Budget
                  </Label>
                  <Input id="budget" type="number" placeholder="Enter budget" className="bg-background text-foreground" />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"
                >
                  Create Project
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="group cursor-pointer bg-card text-card-foreground transition-all hover:scale-[1.02] hover:shadow-card-hover"
            onClick={() => setSelectedProject(project)}
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-fuji-medium text-lg text-card-foreground">{project.name}</h3>
                    <p className="font-pp-machina-plain-regular text-sm text-muted-foreground">{project.client}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-pp-machina-plain-regular font-medium ${
                        project.status === 'active' ? 'bg-success/20 text-success' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {project.status}
                    </span>
                    <ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-pp-machina-plain-regular text-muted-foreground">Progress</span>
                    <span className="font-pp-machina-plain-regular font-semibold text-card-foreground">{project.progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full bg-tertiary" style={{ width: `${project.progress}%` }} /> {/* Accent blue for progress */}
                  </div>
                </div>

                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-pp-machina-plain-regular text-xs text-muted-foreground">Hours Logged</p>
                      <p className="font-pp-machina-plain-regular text-lg font-semibold text-card-foreground">{project.hours}h</p>
                    </div>
                    <div className="text-right">
                      <p className="font-pp-machina-plain-regular text-xs text-muted-foreground">Issues</p>
                      <p className="font-pp-machina-plain-regular text-lg font-semibold text-card-foreground">{project.issues.length}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-pp-machina-plain-regular text-muted-foreground">Budget</span>
                      <span className="font-pp-machina-plain-regular font-semibold text-card-foreground">
                        ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div 
                        className={`h-full ${
                          (project.spent / project.budget) * 100 > 90 
                            ? 'bg-destructive' 
                            : (project.spent / project.budget) * 100 > 75 
                            ? 'bg-warning' 
                            : 'bg-success'
                        }`}
                        style={{ width: `${Math.min((project.spent / project.budget) * 100, 100)}%` }} 
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-pp-machina-plain-regular text-muted-foreground">
                        {((project.spent / project.budget) * 100).toFixed(1)}% spent
                      </span>
                      <span className={`font-pp-machina-plain-regular font-semibold ${
                        project.budget - project.spent < 0 
                          ? 'text-destructive' 
                          : 'text-success'
                      }`}>
                        ${Math.abs(project.budget - project.spent).toLocaleString()} {project.budget - project.spent < 0 ? 'over' : 'remaining'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Time Entries Section */}
      <Card className="overflow-hidden border-border/50 bg-card-gradient shadow-card">
        <CardContent className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">Time Entries</h3>
              <p className="text-sm text-muted-foreground">All time entries across projects</p>
            </div>
          </div>

          <FilterBar
            searchPlaceholder="Search time entries, issues, or descriptions..."
            searchValue={timeEntriesSearchQuery}
            onSearchChange={setTimeEntriesSearchQuery}
            filters={timeEntriesFilterConfigs}
            activeFilters={timeEntriesFilters}
            onFilterChange={handleTimeEntriesFilterChange}
            onClearFilters={handleTimeEntriesClearFilters}
            dateRange={timeEntriesDateRange}
            onDateRangeChange={setTimeEntriesDateRange}
            showDateFilter={true}
          />

          <div className="mt-6 overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-secondary">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">
                    Project
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">
                    Member
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">
                    Issues
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-foreground">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {timeEntries.map((entry) => (
                  <tr key={entry.id} className="transition-colors hover:bg-secondary/50">
                    <td className="px-6 py-4 text-sm text-card-foreground">{entry.date}</td>
                    <td className="px-6 py-4 text-sm font-medium text-card-foreground">
                      {entry.projectName}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{entry.memberName}</td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-card-foreground">{entry.duration}h</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {entry.issues.map((issue, index) => (
                          <span
                            key={index}
                            className="rounded bg-tertiary/20 px-2 py-0.5 font-mono text-xs text-tertiary"
                          >
                            {issue}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{entry.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Time Entries Pagination */}
          {timeEntriesTotalPages > 1 && (
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <p className="text-sm text-muted-foreground">
                Page {timeEntriesPage} of {timeEntriesTotalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTimeEntriesPageChange(timeEntriesPage - 1)}
                  disabled={timeEntriesPage === 1}
                  className="bg-background text-foreground"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: timeEntriesTotalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={timeEntriesPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleTimeEntriesPageChange(page)}
                      className={
                        timeEntriesPage === page
                          ? 'bg-tertiary text-tertiary-foreground'
                          : 'bg-background text-foreground'
                      }
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTimeEntriesPageChange(timeEntriesPage + 1)}
                  disabled={timeEntriesPage === timeEntriesTotalPages}
                  className="bg-background text-foreground"
                >
                  Next
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Project Details Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto bg-popover text-popover-foreground sm:max-w-4xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-popover-foreground">{selectedProject.name}</DialogTitle>
                <DialogDescription className="text-muted-foreground">{selectedProject.client}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Project Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="bg-background">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Total Hours</p>
                      <p className="text-2xl font-bold text-foreground">{selectedProject.hours}h</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-background">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Budget</p>
                      <p className="text-2xl font-bold text-foreground">${selectedProject.budget.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-background">
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">Progress</p>
                      <p className="text-2xl font-bold text-foreground">{selectedProject.progress}%</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Work Types Distribution */}
                <Card className="bg-background">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-lg font-semibold text-foreground">Work Types Distribution</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-3">
                        {selectedProject.workTypes.map((workType) => (
                          <div key={workType.id} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div
                                  className="h-3 w-3 rounded-full"
                                  style={{ backgroundColor: workType.color }}
                                />
                                <span className="text-sm text-foreground">{workType.name}</span>
                              </div>
                              <span className="text-sm font-medium text-foreground">{workType.hours}h</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                              <div
                                className="h-full transition-all"
                                style={{
                                  width: `${(workType.hours / selectedProject.hours) * 100}%`,
                                  backgroundColor: workType.color,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-center">
                        <ResponsiveContainer width="100%" height={200}>
                          <PieChart>
                            <Pie
                              data={selectedProject.workTypes}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={80}
                              paddingAngle={2}
                              dataKey="hours"
                            >
                              {selectedProject.workTypes.map((entry, index) => (
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
                  </CardContent>
                </Card>

                {/* Issues List */}
                <Card className="bg-background">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">Issues</h3>
                      <Button size="sm" className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90">
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Add Issue
                      </Button>
                    </div>

                    {selectedProject.issues.length === 0 ? (
                      <p className="py-8 text-center text-sm text-muted-foreground">No issues yet</p>
                    ) : (
                      <div className="space-y-3">
                        {selectedProject.issues.map((issue) => {
                          const variance = issue.actualTime - issue.estimate;
                          const variancePercent = issue.estimate > 0 ? (variance / issue.estimate) * 100 : 0;

                          return (
                            <div
                              key={issue.id}
                              className="rounded-lg border border-border bg-secondary/50 p-4 transition-colors hover:bg-secondary"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="mb-2 flex items-center gap-2">
                                    <span className="font-mono text-xs text-muted-foreground">{issue.id}</span>
                                    {issue.linearId && (
                                      <span className="rounded bg-tertiary/20 px-2 py-0.5 font-mono text-xs text-tertiary">
                                        {issue.linearId}
                                      </span>
                                    )}
                                    <span
                                      className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(
                                        issue.status
                                      )}`}
                                    >
                                      {getStatusIcon(issue.status)}
                                      {issue.status}
                                    </span>
                                  </div>
                                  <h4 className="mb-2 font-medium text-foreground">{issue.title}</h4>
                                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    <span>Assignee: {issue.assignee}</span>
                                    <span>
                                      Work Type:{' '}
                                      <span
                                        className="font-medium"
                                        style={{
                                          color: selectedProject.workTypes.find((wt) => wt.id === issue.workType)
                                            ?.color,
                                        }}
                                      >
                                        {selectedProject.workTypes.find((wt) => wt.id === issue.workType)?.name}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4 grid grid-cols-3 gap-4 border-t border-border pt-4">
                                <div>
                                  <p className="text-xs text-muted-foreground">Estimate</p>
                                  <p className="text-lg font-semibold text-foreground">{issue.estimate}h</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Actual Time</p>
                                  <p className="text-lg font-semibold text-foreground">{issue.actualTime}h</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Variance</p>
                                  <p
                                    className={`text-lg font-semibold ${
                                      variance > 0
                                        ? 'text-destructive'
                                        : variance < 0
                                        ? 'text-success'
                                        : 'text-foreground'
                                    }`}
                                  >
                                    {variance > 0 ? '+' : ''}
                                    {variance.toFixed(1)}h
                                    {issue.estimate > 0 && (
                                      <span className="ml-1 text-xs">
                                        ({variancePercent > 0 ? '+' : ''}
                                        {variancePercent.toFixed(0)}%)
                                      </span>
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
