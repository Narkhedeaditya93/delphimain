
import { format } from "date-fns";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActiveFiltersProps {
  filters: {
    platform: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
  };
  onRemove: () => void;
  className?: string;
}

export function ActiveFilters({
  filters,
  onRemove,
  className,
}: ActiveFiltersProps) {
  const hasFilters =
    filters.platform || filters.startDate || filters.endDate;

  if (!hasFilters) return null;

  return (
    <div
      className={cn(
        "p-4 bg-white rounded-lg border border-border shadow-sm animate-fade-up",
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Selected Filters</h3>
        <button
          onClick={onRemove}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Clear all
        </button>
      </div>
      <div className="space-y-2">
        {filters.platform && (
          <div className="flex items-center">
            <span className="text-sm font-medium mr-2">Platform:</span>
            <span className="text-sm capitalize">{filters.platform}</span>
          </div>
        )}
        {filters.startDate && (
          <div className="flex items-center">
            <span className="text-sm font-medium mr-2">Start Date:</span>
            <span className="text-sm">
              {format(filters.startDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")}
            </span>
          </div>
        )}
        {filters.endDate && (
          <div className="flex items-center">
            <span className="text-sm font-medium mr-2">End Date:</span>
            <span className="text-sm">
              {format(filters.endDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
