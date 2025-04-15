
import React from 'react';
import { ChevronLeft, Download, FileType } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const ReportFooter: React.FC = () => {
  const navigate = useNavigate();
  
  const handleDownload = (format: 'pdf' | 'excel') => {
    toast.success(`Report downloaded as ${format.toUpperCase()} successfully`);
    // In a real app, this would initiate the actual download
    // window.location.href = `/api/reports/download?format=${format}`;
  };
  
  return (
    <div className="flex justify-end mt-6">
      <Button onClick={() => navigate('/reports')} variant="outline" className="mr-2">
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back to Reports
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Dashboard
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleDownload('pdf')}>
            <FileType className="mr-2 h-4 w-4" />
            <span>Download as PDF</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDownload('excel')}>
            <FileType className="mr-2 h-4 w-4" />
            <span>Download as Excel</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ReportFooter;
