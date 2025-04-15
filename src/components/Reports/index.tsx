import React, { useState } from 'react';
import ReportsHeader from './ReportsHeader';
import ExpenseTrendChart from './ExpenseTrendChart';
import ExpenseCategoryPieChart from './ExpenseCategoryPieChart';
import DepartmentExpenseChart from './DepartmentExpenseChart';
import RecentReportsList from './RecentReportsList';
import ExpenseReportTables from './ExpenseReportTables';
import { monthlyData, categoryData, categoryGroups, deptData, recentReports } from './data';
import { ChevronLeft, ChevronRight, BarChart, Table as TableIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const typedRecentReports = recentReports.map(report => {
  return {
    ...report,
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
      
      <Tabs defaultValue="charts" className="w-full">
        <TabsList className="grid w-[400px] grid-cols-2 mx-auto mb-6">
          <TabsTrigger value="charts" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Visual Reports
          </TabsTrigger>
          <TabsTrigger value="tables" className="flex items-center gap-2">
            Tabular Reports
            <ChevronRight className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ExpenseTrendChart monthlyData={monthlyData} />
            
            <div className="glass-card rounded-xl p-6 col-span-2 h-[400px]">
              <div className="flex justify-between items-center mb-4">
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
              
              <div className="h-[calc(100%-40px)]">
                <ExpenseCategoryPieChart 
                  categoryData={categoryData} 
                  categoryGroups={categoryGroups} 
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <DepartmentExpenseChart deptData={deptData} />
            <RecentReportsList recentReports={typedRecentReports} />
          </div>
        </TabsContent>
        
        <TabsContent value="tables">
          <ExpenseReportTables />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
