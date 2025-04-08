
import React from 'react';
import ReportsHeader from './ReportsHeader';
import ExpenseTrendChart from './ExpenseTrendChart';
import ExpenseCategoryPieChart from './ExpenseCategoryPieChart';
import DepartmentExpenseChart from './DepartmentExpenseChart';
import RecentReportsList from './RecentReportsList';
import { monthlyData, categoryData, deptData, recentReports } from './data';

// Fix type casting by ensuring recentReports match the ReportItem type
const typedRecentReports = recentReports.map(report => {
  return {
    ...report,
    // Ensure the type is one of the allowed types in ReportItem
    type: report.type as "quarterly" | "department" | "category" | "forecast"
  };
});

const Reports: React.FC = () => {
  return (
    <div className="space-y-8">
      <ReportsHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ExpenseTrendChart monthlyData={monthlyData} />
        
        <div className="glass-card rounded-xl p-6">
          <div>
            <h2 className="text-lg font-medium">Expense by Category</h2>
            <p className="text-sm text-muted-foreground mb-4">Distribution across categories</p>
          </div>
          
          <ExpenseCategoryPieChart categoryData={categoryData} />
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
