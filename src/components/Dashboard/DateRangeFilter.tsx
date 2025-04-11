
import React from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateRangeFilterProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  currency: string;
  onCurrencyChange: (currency: string) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  currency,
  onCurrencyChange,
}) => {
  const presetRanges = [
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 90 days', value: '90d' },
    { label: 'Last 6 months', value: '6m' },
    { label: 'Last year', value: '1y' },
    { label: 'Year to date', value: 'ytd' },
  ];

  const handlePresetChange = (value: string) => {
    const now = new Date();
    let start: Date | undefined;
    
    switch(value) {
      case '30d':
        start = new Date(now);
        start.setDate(now.getDate() - 30);
        break;
      case '90d':
        start = new Date(now);
        start.setDate(now.getDate() - 90);
        break;
      case '6m':
        start = new Date(now);
        start.setMonth(now.getMonth() - 6);
        break;
      case '1y':
        start = new Date(now);
        start.setFullYear(now.getFullYear() - 1);
        break;
      case 'ytd':
        start = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        start = undefined;
    }
    
    onStartDateChange(start);
    onEndDateChange(now);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full justify-between items-center mb-6">
      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <Select value={currency} onValueChange={onCurrencyChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">US Dollar</SelectItem>
            <SelectItem value="EUR">Euro</SelectItem>
            <SelectItem value="GBP">British Pound</SelectItem>
            <SelectItem value="INR">India Rupee</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[140px] justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "MMM d, yyyy") : <span>Start date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={onStartDateChange}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          <span className="text-muted-foreground">-</span>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[140px] justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "MMM d, yyyy") : <span>End date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={onEndDateChange}
                initialFocus
                className="pointer-events-auto"
                disabled={(date) => date > new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex gap-2">
        <Select onValueChange={handlePresetChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            {presetRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DateRangeFilter;
