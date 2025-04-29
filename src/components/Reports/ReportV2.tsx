
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { 
  DollarSign, 
  Clock, 
  XCircle, 
  CheckCircle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Import refactored components
import ReportHeader from './ReportHeader';
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
  summaryStats,
  getFilteredData
} from './ReportData';

const ReportV2: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('current');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [activeTab, setActiveTab] = useState('overview');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filtered data based on date range
  const [filteredData, setFilteredData] = useState({
    monthlyExpenseData,
    expenseTypeData,
    complianceInsightsData,
    departmentData,
    departmentChartData,
    allExpensesData,
    summaryStats
  });

  // Update filtered data when time filter or custom date range changes
  useEffect(() => {
    // Generate filtered data based on timeFilter, startDate, and endDate
    const newFilteredData = getFilteredData(timeFilter, startDate, endDate);
    setFilteredData(newFilteredData);
  }, [timeFilter, startDate, endDate]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold">Expense Reports Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive analysis and insights for expense management
        </p>
      </div>
      
      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Expenses Card */}
        <Card className="p-6 relative overflow-hidden border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-600 text-sm font-medium">Total Expenses</h3>
              <p className="text-2xl font-bold mt-2">${filteredData.summaryStats.totalExpenses.toLocaleString()}</p>
              <p className="text-gray-600 text-xs mt-1">{filteredData.summaryStats.totalReports} expenses</p>
            </div>
            <div className="bg-blue-100 h-10 w-10 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          
          <div className="flex mt-3">
            <Badge className="bg-green-100 text-green-700 border-0 font-medium text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2%
            </Badge>
          </div>
        </Card>
        
        {/* Pending Approval Card */}
        <Card className="p-6 relative overflow-hidden border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-600 text-sm font-medium">Pending Approval</h3>
              <p className="text-2xl font-bold mt-2">$581</p>
              <p className="text-gray-600 text-xs mt-1">12 expenses</p>
            </div>
            <div className="bg-amber-100 h-10 w-10 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
          </div>
          
          <div className="flex mt-3">
            <Badge className="bg-red-100 text-red-700 border-0 font-medium text-xs">
              <TrendingDown className="h-3 w-3 mr-1" />
              -3.5%
            </Badge>
          </div>
        </Card>
        
        {/* Rejected Expenses Card */}
        <Card className="p-6 relative overflow-hidden border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-600 text-sm font-medium">Rejected Expenses</h3>
              <p className="text-2xl font-bold mt-2">$209.1</p>
              <p className="text-gray-600 text-xs mt-1">8 expenses</p>
            </div>
            <div className="bg-red-100 h-10 w-10 rounded-lg flex items-center justify-center">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
          </div>
          
          <div className="flex mt-3">
            <Badge className="bg-green-100 text-green-700 border-0 font-medium text-xs">
              <TrendingDown className="h-3 w-3 mr-1" />
              -2.8%
            </Badge>
          </div>
        </Card>
        
        {/* Paid Expenses Card */}
        <Card className="p-6 relative overflow-hidden border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-600 text-sm font-medium">Paid Expenses</h3>
              <p className="text-2xl font-bold mt-2">$3</p>
              <p className="text-gray-600 text-xs mt-1">3 expenses</p>
            </div>
            <div className="bg-green-100 h-10 w-10 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
          
          <div className="flex mt-3">
            <Badge className="bg-green-100 text-green-700 border-0 font-medium text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5.6%
            </Badge>
          </div>
        </Card>
      </div>
      
      {/* Main Content Tabs */}
      <Tabs 
        defaultValue={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full mt-6"
      >
        <TabsList className="bg-gray-50 border border-gray-100 rounded-lg p-1 mb-6">
          <TabsTrigger 
            value="overview" 
            className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="all-expenses" 
            className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            All Expenses
          </TabsTrigger>
          <TabsTrigger 
            value="summary" 
            className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Summary
          </TabsTrigger>
          <TabsTrigger 
            value="types" 
            className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Expense Types
          </TabsTrigger>
          <TabsTrigger 
            value="compliance" 
            className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Compliance
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="col-span-1 lg:col-span-2">
              <ExpenseTypeTab expenseTypeData={filteredData.expenseTypeData} />
            </div>
            
            <div className="col-span-1">
              <ComplianceInsightsTab complianceInsightsData={filteredData.complianceInsightsData} />
            </div>
            
            <div className="col-span-1">
              <DepartmentWiseTab 
                departmentData={filteredData.departmentData}
                departmentChartData={filteredData.departmentChartData}
                departmentFilter={departmentFilter}
                setDepartmentFilter={setDepartmentFilter}
              />
            </div>
          </div>
        </TabsContent>
        
        {/* All Expenses Tab */}
        <TabsContent value="all-expenses" className="space-y-6">
          <AllExpensesTab 
            allExpensesData={filteredData.allExpensesData}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </TabsContent>

        {/* Monthly Expense Summary Tab */}
        <TabsContent value="summary" className="space-y-6">
          <MonthlySummaryTab 
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            monthlyExpenseData={filteredData.monthlyExpenseData}
          />
        </TabsContent>
        
        {/* Expense Type Analysis Tab */}
        <TabsContent value="types" className="space-y-6">
          <ExpenseTypeTab expenseTypeData={filteredData.expenseTypeData} />
        </TabsContent>
        
        {/* Compliance Insights Tab */}
        <TabsContent value="compliance" className="space-y-6">
          <ComplianceInsightsTab complianceInsightsData={filteredData.complianceInsightsData} />
        </TabsContent>
      </Tabs>
      
      {/* Footer with export buttons */}
      <div className="flex justify-end mt-6 space-x-3">
        <Button variant="outline" className="rounded-full">
          Current Quarter
        </Button>
        <Button variant="outline" className="rounded-full px-3">
          <span className="sr-only">Filter</span>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
            <path d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.8601 8.28967 8 9.5 8C10.7103 8 11.7198 8.8601 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
          </svg>
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">Export</Button>
      </div>
    </div>
  );
};

export default ReportV2;
