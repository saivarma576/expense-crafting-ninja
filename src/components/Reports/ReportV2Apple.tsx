
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Download, FileType, RotateCw } from "lucide-react";
import { useNavigate } from 'react-router-dom';

// Import refactored components
import ReportHeader from './ReportHeader';
import ReportStatsCards from './ReportStatsCards';
import ReportFooter from './ReportFooter';
import MonthlySummaryTab from './tabs/MonthlySummaryTab';
import ExpenseTypeTab from './tabs/ExpenseTypeTab';
import ComplianceInsightsTab from './tabs/ComplianceInsightsTab';
import DepartmentWiseTab from './tabs/DepartmentWiseTab';
import AllExpensesTab from './tabs/AllExpensesTab';

// Apple Design Elements
import AppleExpenseOverview from './AppleDesign/AppleExpenseOverview';
import AppleExpenseBreakdown from './AppleDesign/AppleExpenseBreakdown';
import AppleTravelDetails from './AppleDesign/AppleTravelDetails';
import ApplePolicyViolations from './AppleDesign/ApplePolicyViolations';

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

const ReportV2Apple: React.FC = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('current');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [activeTab, setActiveTab] = useState('overview');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  
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

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const backToReports = () => {
    navigate('/reports');
  };

  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 text-sm font-medium" 
          onClick={backToReports}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Reports
        </Button>
        
        <Button 
          onClick={handleFlip} 
          variant="outline" 
          className="flex items-center gap-2 text-sm"
          aria-label="Switch view"
        >
          <RotateCw className="h-4 w-4" />
          {isFlipped ? "Switch to Standard View" : "Switch to Apple View"}
        </Button>
      </div>
      
      <motion.div 
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 50 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Standard View (Back of card) */}
        <motion.div 
          style={{ 
            backfaceVisibility: "hidden", 
            position: isFlipped ? "absolute" : "relative",
            width: "100%",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
          }} 
          className={isFlipped ? "hidden" : ""}
        >
          {/* Header Section */}
          <ReportHeader 
            timeFilter={timeFilter} 
            setTimeFilter={setTimeFilter}
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
          
          {/* Stats Cards Section */}
          <ReportStatsCards 
            totalExpenses={filteredData.summaryStats.totalExpenses}
            totalReports={filteredData.summaryStats.totalReports}
            approvedReports={filteredData.summaryStats.approvedReports}
            averageExpenseAmount={filteredData.summaryStats.averageExpenseAmount}
          />
          
          {/* Main Content Tabs */}
          <Tabs 
            defaultValue={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <TabsList className="grid grid-cols-5 w-full mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="all-expenses">All Expenses</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="types">Expense Types</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* We'll add overview content here */}
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
          
          {/* Footer Section */}
          <ReportFooter />
        </motion.div>
        
        {/* Apple Design View (Front of card) */}
        <motion.div 
          style={{ 
            backfaceVisibility: "hidden", 
            transform: isFlipped ? "rotateY(0deg)" : "rotateY(180deg)",
            position: !isFlipped ? "absolute" : "relative", 
            width: "100%"
          }}
          className={!isFlipped ? "hidden" : ""}
        >
          <div className="space-y-6">
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b">
                <h1 className="text-2xl font-semibold text-gray-900">Expense Report</h1>
                <p className="text-gray-500 text-sm">April 2025</p>
              </div>
              
              <div className="p-6">
                {/* Apple-style overview section */}
                <AppleExpenseOverview 
                  totalExpenses={filteredData.summaryStats.totalExpenses}
                  totalReports={filteredData.summaryStats.totalReports}
                  approvedReports={filteredData.summaryStats.approvedReports}
                  averageAmount={filteredData.summaryStats.averageExpenseAmount}
                />
                
                <Separator className="my-8" />
                
                <h2 className="text-xl font-medium mb-6">Expense Breakdown</h2>
                <AppleExpenseBreakdown 
                  expenseTypeData={filteredData.expenseTypeData}
                  monthlyData={filteredData.monthlyExpenseData}
                />
                
                <Separator className="my-8" />
                
                <h2 className="text-xl font-medium mb-6">Travel Details</h2>
                <AppleTravelDetails />
                
                <Separator className="my-8" />
                
                <h2 className="text-xl font-medium mb-6">Policy Compliance</h2>
                <ApplePolicyViolations 
                  complianceData={filteredData.complianceInsightsData}
                />
                
                <div className="mt-8 flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Export Full Report
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ReportV2Apple;
