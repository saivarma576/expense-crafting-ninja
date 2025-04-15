
import React from 'react';
import { ChevronLeft, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const ReportFooter: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-end mt-6">
      <Button onClick={() => navigate('/reports')} variant="outline" className="mr-2">
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back to Reports
      </Button>
      <Button>
        <Download className="w-4 h-4 mr-2" />
        Export Dashboard
      </Button>
    </div>
  );
};

export default ReportFooter;
