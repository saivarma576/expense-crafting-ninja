
import React from 'react';
import { Calendar, Filter, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReportHeaderProps {
  timeFilter: string;
  setTimeFilter: (filter: string) => void;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ timeFilter, setTimeFilter }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold">Expense Reports Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive analysis and insights for expense management
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Select value={timeFilter} onValueChange={setTimeFilter}>
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
