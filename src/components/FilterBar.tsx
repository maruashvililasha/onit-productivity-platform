import { CalendarIcon, FilterIcon, SearchIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

interface FilterOption {
  label: string;
  value: string;
}

interface FilterConfig {
  key: string;
  label: string;
  options: FilterOption[];
}

interface FilterBarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filters?: FilterConfig[];
  activeFilters?: Record<string, string>;
  onFilterChange?: (key: string, value: string) => void;
  onClearFilters?: () => void;
  dateRange?: { from?: Date; to?: Date };
  onDateRangeChange?: (range: { from?: Date; to?: Date }) => void;
  showDateFilter?: boolean;
}

export function FilterBar({
  searchPlaceholder = 'Search...',
  searchValue = '',
  onSearchChange,
  filters = [],
  activeFilters = {},
  onFilterChange,
  onClearFilters,
  dateRange,
  onDateRangeChange,
  showDateFilter = false,
}: FilterBarProps) {
  const hasActiveFilters = Object.values(activeFilters).some((value) => value !== 'all');

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="bg-background pl-10 text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {filters.map((filter) => (
            <Select
              key={filter.key}
              value={activeFilters[filter.key] || 'all'}
              onValueChange={(value) => onFilterChange?.(filter.key, value)}
            >
              <SelectTrigger className="w-40 bg-background text-foreground">
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground">
                <SelectItem value="all" className="text-popover-foreground">
                  All {filter.label}
                </SelectItem>
                {filter.options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-popover-foreground"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}

          {showDateFilter && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-40 justify-start bg-background text-foreground"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {dateRange.from.toLocaleDateString()} -{' '}
                        {dateRange.to.toLocaleDateString()}
                      </>
                    ) : (
                      dateRange.from.toLocaleDateString()
                    )
                  ) : (
                    'Date Range'
                  )}
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
                      value={dateRange?.from?.toISOString().split('T')[0] || ''}
                      onChange={(e) =>
                        onDateRangeChange?.({
                          ...dateRange,
                          from: e.target.value ? new Date(e.target.value) : undefined,
                        })
                      }
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
                      value={dateRange?.to?.toISOString().split('T')[0] || ''}
                      onChange={(e) =>
                        onDateRangeChange?.({
                          ...dateRange,
                          to: e.target.value ? new Date(e.target.value) : undefined,
                        })
                      }
                      className="bg-background text-foreground"
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <XIcon className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, value]) => {
            if (value === 'all') return null;
            const filter = filters.find((f) => f.key === key);
            const option = filter?.options.find((o) => o.value === value);
            if (!option) return null;

            return (
              <div
                key={key}
                className="flex items-center gap-2 rounded-full bg-tertiary/20 px-3 py-1 text-sm text-tertiary"
              >
                <span>
                  {filter?.label}: {option.label}
                </span>
                <button
                  onClick={() => onFilterChange?.(key, 'all')}
                  className="hover:text-tertiary-foreground"
                >
                  <XIcon className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
