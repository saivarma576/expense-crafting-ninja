import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportsHeader from './ReportsHeader';
import RecentReportsList from './RecentReportsList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ReportV2Apple from './ReportV2Apple';

const Reports: React.FC = () => {
  const navigate = useNavigate();
  const [showReport, setShowReport] = useState(false);
  
  if (showReport) {
    return <ReportV2Apple />;
  }
  
  return (
    <div className="space-y-8">
      <ReportsHeader />
      
      <div className="grid grid-cols-1 gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Recent Reports</h2>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-blue-600"
            onClick={() => setShowReport(true)}
          >
            <Plus className="h-4 w-4 mr-1" /> New Report
          </Button>
        </div>
        
        <div>
          <RecentReportsList onViewReport={() => setShowReport(true)} />
        </div>
      </div>
      
      {/* Additional content */}
    </div>
  );
};

export default Reports;
