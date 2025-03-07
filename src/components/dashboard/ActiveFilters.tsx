
import { format } from "date-fns";
import { X, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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

  const handleClearFilters = () => {
    onRemove();
    toast.info("All filters cleared");
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return format(date, "MMM d, yyyy");
  };

  return (
    <div
      className={cn(
        "p-4 bg-white rounded-lg border border-border shadow-sm animate-fade-up",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Tag className="w-4 h-4 mr-2 text-primary" />
          <h3 className="text-sm font-medium">Selected Filters</h3>
        </div>
        <button
          onClick={handleClearFilters}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center"
        >
          <span>Clear all</span>
          <X className="w-3 h-3 ml-1" />
        </button>
      </div>
      
      <div className="space-y-2">
        {filters.platform && (
          <div className="inline-flex items-center bg-primary/10 text-primary rounded-full px-3 py-1 text-xs mr-2 mb-2">
            <span className="capitalize mr-1">{filters.platform}</span>
            <button className="text-primary/70 hover:text-primary">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
        
        {filters.startDate && (
          <div className="inline-flex items-center bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-xs mr-2 mb-2">
            <span className="mr-1">From: {formatDate(filters.startDate)}</span>
            <button className="text-blue-500/70 hover:text-blue-700">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
        
        {filters.endDate && (
          <div className="inline-flex items-center bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-xs mr-2">
            <span className="mr-1">To: {formatDate(filters.endDate)}</span>
            <button className="text-blue-500/70 hover:text-blue-700">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
