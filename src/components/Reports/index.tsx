
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportsHeader from './ReportsHeader';
import RecentReportsList from './RecentReportsList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ReportV2Apple from './ReportV2Apple';

// Sample reports data
const recentReports = [
  { id: '1', name: 'Q1 Financial Report', type: 'quarterly', date: '2025-04-15T00:00:00Z' },
  { id: '2', name: 'Marketing Department Expenses', type: 'department', date: '2025-04-10T00:00:00Z' },
  { id: '3', name: 'Travel Expense Breakdown', type: 'category', date: '2025-04-05T00:00:00Z' },
  { id: '4', name: 'Revenue Forecast', type: 'forecast', date: '2025-04-01T00:00:00Z' }
];

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
          <RecentReportsList 
            recentReports={recentReports}
            onViewReport={() => setShowReport(true)} 
          />
        </div>
      </div>
      
      {/* Additional content */}
    </div>
  );
};

export default Reports;
