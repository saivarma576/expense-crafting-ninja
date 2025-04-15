
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import refactored components
import ReportHeader from './ReportHeader';
import ReportStatsCards from './ReportStatsCards';
import ReportFooter from './ReportFooter';
import MonthlySummaryTab from './tabs/MonthlySummaryTab';
import ExpenseTypeTab from './tabs/ExpenseTypeTab';
import ComplianceInsightsTab from './tabs/ComplianceInsightsTab';
import DepartmentWiseTab from './tabs/DepartmentWiseTab';
import AllExpensesTab from './tabs/AllExpensesTab';

// Import data
import {
  monthlyExpenseData,
  expenseTypeData,
  complianceInsightsData,
  departmentData,
  departmentChartData,
  allExpensesData,
  summaryStats
} from './ReportData';

const ReportV2: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('current');
  const [activeTab, setActiveTab] = useState('summary');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <ReportHeader timeFilter={timeFilter} setTimeFilter={setTimeFilter} />
      
      {/* Stats Cards Section */}
      <ReportStatsCards 
        totalExpenses={summaryStats.totalExpenses}
        totalReports={summaryStats.totalReports}
        approvedReports={summaryStats.approvedReports}
        averageExpenseAmount={summaryStats.averageExpenseAmount}
      />
      
      {/* Main Content Tabs */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full mb-6">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="types">Expense Types</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="all-expenses">All Expenses</TabsTrigger>
        </TabsList>
        
        {/* Monthly Expense Summary Tab */}
        <TabsContent value="summary" className="space-y-6">
          <MonthlySummaryTab 
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            monthlyExpenseData={monthlyExpenseData}
          />
        </TabsContent>
        
        {/* Expense Type Analysis Tab */}
        <TabsContent value="types" className="space-y-6">
          <ExpenseTypeTab expenseTypeData={expenseTypeData} />
        </TabsContent>
        
        {/* Compliance Insights Tab */}
        <TabsContent value="compliance" className="space-y-6">
          <ComplianceInsightsTab complianceInsightsData={complianceInsightsData} />
        </TabsContent>
        
        {/* Department-wise Summary Tab */}
        <TabsContent value="departments" className="space-y-6">
          <DepartmentWiseTab 
            departmentData={departmentData}
            departmentChartData={departmentChartData}
            departmentFilter={departmentFilter}
            setDepartmentFilter={setDepartmentFilter}
          />
        </TabsContent>
        
        {/* All Expenses Tab */}
        <TabsContent value="all-expenses" className="space-y-6">
          <AllExpensesTab 
            allExpensesData={allExpensesData}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </TabsContent>
      </Tabs>
      
      {/* Footer Section */}
      <ReportFooter />
    </div>
  );
};

export default ReportV2;
