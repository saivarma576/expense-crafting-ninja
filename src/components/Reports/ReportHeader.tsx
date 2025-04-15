
import React, { useState } from 'react';
import { Calendar, Filter, Download, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface ReportHeaderProps {
  timeFilter: string;
  setTimeFilter: (filter: string) => void;
  startDate?: Date;
  endDate?: Date;
  onStartDateChange?: (date: Date | undefined) => void;
  onEndDateChange?: (date: Date | undefined) => void;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ 
  timeFilter, 
  setTimeFilter,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}) => {
  const [showCustomRange, setShowCustomRange] = useState(false);

  const handleTimeFilterChange = (value: string) => {
    setTimeFilter(value);
    if (value === 'custom') {
      setShowCustomRange(true);
    } else {
      setShowCustomRange(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">Expense Reports Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive analysis and insights for expense management
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Select value={timeFilter} onValueChange={handleTimeFilterChange}>
          <SelectTrigger className="w-[180px]">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">Current Quarter</SelectItem>
            <SelectItem value="previous">Previous Quarter</SelectItem>
            <SelectItem value="ytd">Year to Date</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
        
        {showCustomRange && (
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "MMM d, yyyy") : <span>Start date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={startDate}
                  onSelect={onStartDateChange}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            <span className="text-muted-foreground">to</span>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "MMM d, yyyy") : <span>End date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={endDate}
                  onSelect={onEndDateChange}
                  initialFocus
                  className="pointer-events-auto"
                  disabled={(date) => date > new Date() || (startDate ? date < startDate : false)}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
        
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        
        <Button variant="outline" className="flex items-center gap-1.5">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export</span>
        </Button>
      </div>
    </div>
  );
};

export default ReportHeader;
