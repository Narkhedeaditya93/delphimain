
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, X, SlidersHorizontal, Filter } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FilterPanelProps {
  onFilterChange: (filters: {
    platform: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
  }) => void;
}

export function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [platform, setPlatform] = useState("amazon");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 10))
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const handleApply = () => {
    if (startDate && endDate && startDate > endDate) {
      toast.error("Start date cannot be after end date");
      return;
    }
    
    onFilterChange({
      platform,
      startDate,
      endDate,
    });
    
    toast.success("Filters applied successfully");
    
    if (window.innerWidth < 768) {
      setIsExpanded(false);
    }
  };

  const handleReset = () => {
    setPlatform("amazon");
    setStartDate(new Date());
    setEndDate(new Date(new Date().setDate(new Date().getDate() + 10)));
    
    toast.info("Filters reset to default");
  };

  return (
    <div className="bg-white rounded-lg border border-border shadow-sm animate-fade-up transition-all duration-300">
      <div 
        className="md:hidden flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          <span>Filters</span>
        </div>
        <SlidersHorizontal className="w-4 h-4" />
      </div>
      
      <div className={cn(
        "flex flex-col space-y-4 md:flex-row md:items-end md:space-y-0 md:space-x-4 p-4",
        isExpanded ? "block" : "hidden md:flex"
      )}>
        <div className="space-y-1">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Platform
          </label>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="amazon">Amazon</SelectItem>
              <SelectItem value="flipkart">Flipkart</SelectItem>
              <SelectItem value="myntra">Myntra</SelectItem>
              <SelectItem value="ajio">Ajio</SelectItem>
              <SelectItem value="shopify">Shopify</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Start Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full md:w-[200px] justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-50" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            End Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full md:w-[200px] justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-50" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex space-x-2">
          <Button className="flex-1 md:flex-none" onClick={handleApply}>
            Apply
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
            className="h-10 w-10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
