
import React, { useState } from 'react';
import ReportsHeader from './ReportsHeader';
import ExpenseTrendChart from './ExpenseTrendChart';
import ExpenseCategoryPieChart from './ExpenseCategoryPieChart';
import DepartmentExpenseChart from './DepartmentExpenseChart';
import RecentReportsList from './RecentReportsList';
import { monthlyData, categoryData, categoryGroups, deptData, recentReports } from './data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Fix type casting by ensuring recentReports match the ReportItem type
const typedRecentReports = recentReports.map(report => {
  return {
    ...report,
    // Ensure the type is one of the allowed types in ReportItem
    type: report.type as "quarterly" | "department" | "category" | "forecast"
  };
});

const Reports: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(2023);

  const handleYearChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedYear(prev => prev - 1);
    } else {
      setSelectedYear(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-8">
      <ReportsHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ExpenseTrendChart monthlyData={monthlyData} />
        
        <div className="glass-card rounded-xl p-6 col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Expense Categories</h2>
            <div className="flex items-center gap-2">
              <button 
                className="p-1 rounded hover:bg-muted" 
                onClick={() => handleYearChange('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="text-sm font-medium">{selectedYear}</div>
              <button 
                className="p-1 rounded hover:bg-muted" 
                onClick={() => handleYearChange('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <ExpenseCategoryPieChart 
            categoryData={categoryData} 
            categoryGroups={categoryGroups} 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DepartmentExpenseChart deptData={deptData} />
        <RecentReportsList recentReports={typedRecentReports} />
      </div>
    </div>
  );
};

export default Reports;
