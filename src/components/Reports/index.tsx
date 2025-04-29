
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportsHeader from './ReportsHeader';
import { Button } from '@/components/ui/button';
import { Plus, ArrowRight, ChevronLeft } from 'lucide-react';
import ReportV2Apple from './ReportV2Apple';
import ReportV2 from './ReportV2';
import ReportV3 from './ReportV3';
import ReportVersionSelector from './ReportVersionSelector';

// Sample reports data
const recentReports = [
  { id: '1', name: 'Q1 Financial Report', type: 'quarterly' as const, date: '2025-04-15T00:00:00Z' },
  { id: '2', name: 'Marketing Department Expenses', type: 'department' as const, date: '2025-04-10T00:00:00Z' },
  { id: '3', name: 'Travel Expense Breakdown', type: 'category' as const, date: '2025-04-05T00:00:00Z' },
  { id: '4', name: 'Revenue Forecast', type: 'forecast' as const, date: '2025-04-01T00:00:00Z' }
];

const Reports: React.FC = () => {
  const navigate = useNavigate();
  const [showReport, setShowReport] = useState(false);
  const [viewMode, setViewMode] = useState<'standard' | 'apple' | 'modern'>('standard');
  
  if (showReport) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 text-sm font-medium" 
            onClick={() => setShowReport(false)}
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Reports
          </Button>
          
          <ReportVersionSelector 
            activeVersion={viewMode} 
            onChange={(version) => setViewMode(version)} 
          />
        </div>
        
        {viewMode === 'apple' && <ReportV2Apple />}
        {viewMode === 'modern' && <ReportV3 onBack={() => setShowReport(false)} />}
        {viewMode === 'standard' && <ReportV2 />}
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <ReportsHeader />
      
      <div className="grid grid-cols-1 gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Recent Reports</h2>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 rounded-full px-4"
            onClick={() => {
              setViewMode('modern');
              setShowReport(true);
            }}
          >
            <Plus className="h-4 w-4" /> New Report
          </Button>
        </div>
        
        <div className="grid gap-4">
          {recentReports.map(report => (
            <div 
              key={report.id}
              className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex justify-between items-center"
              onClick={() => {
                setViewMode('standard');
                setShowReport(true);
              }}
            >
              <div>
                <h3 className="font-medium">{report.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(report.date).toLocaleDateString('en-US', { 
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-600">
                View <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
