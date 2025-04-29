
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  ChevronLeft, Download, Filter, 
  Calendar, FileText, DollarSign, 
  AlertTriangle, User 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Import components
import ModernExpenseTypeChart from './Modern/ModernExpenseTypeChart';
import ModernMonthlyExpenseChart from './Modern/ModernMonthlyExpenseChart';
import ModernTravelSummary from './Modern/ModernTravelSummary';
import ModernPolicyViolations from './Modern/ModernPolicyViolations';
import ModernExpenseTypeList from './Modern/ModernExpenseTypeList';

// Import data
import {
  monthlyExpenseData,
  expenseTypeData,
  complianceInsightsData,
  allExpensesData,
  summaryStats,
  getFilteredData
} from './ReportData';

interface ReportV3Props {
  onBack: () => void;
}

const ReportV3: React.FC<ReportV3Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeFilter, setTimeFilter] = useState('current');
  
  // Filtered data based on date range
  const [filteredData, setFilteredData] = useState({
    monthlyExpenseData,
    expenseTypeData,
    complianceInsightsData,
    allExpensesData,
    summaryStats
  });

  // Calculate violation percentage
  const violationPercentage = Math.round(
    (complianceInsightsData.reduce((sum, item) => sum + item.count, 0) / 
     summaryStats.totalReports) * 100
  );

  // Update filtered data when time filter or custom date range changes
  useEffect(() => {
    const newFilteredData = getFilteredData(timeFilter);
    setFilteredData(newFilteredData);
  }, [timeFilter]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full" 
            onClick={onBack}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Expense Report</h1>
            <p className="text-sm text-gray-500">Q2 2025 Financial Summary</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-full gap-1">
            <Calendar className="h-4 w-4" />
            <span>Current Quarter</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Filter className="h-4 w-4" />
          </Button>
          <Button className="rounded-full gap-1 bg-blue-500 hover:bg-blue-600">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-gray-50 to-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600 font-medium">Total Reports</p>
                  </div>
                  <h3 className="text-2xl font-semibold">{filteredData.summaryStats.totalReports}</h3>
                  <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100">
                  +12%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-gray-50 to-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <DollarSign className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600 font-medium">Total Amount</p>
                  </div>
                  <h3 className="text-2xl font-semibold">${filteredData.summaryStats.totalExpenses.toLocaleString()}</h3>
                  <p className="text-xs text-gray-500 mt-1">Approved expenses</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-100">
                  +8.5%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-gray-50 to-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                    </div>
                    <p className="text-sm text-gray-600 font-medium">Policy Violations</p>
                  </div>
                  <h3 className="text-2xl font-semibold">{violationPercentage}%</h3>
                  <p className="text-xs text-gray-500 mt-1">Of total reports</p>
                </div>
                <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-100">
                  -2.3%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-gray-50 to-white rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <User className="h-4 w-4 text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-600 font-medium">Top Spender</p>
                  </div>
                  <h3 className="text-2xl font-semibold">John Smith</h3>
                  <p className="text-xs text-gray-500 mt-1">$1,675 in expenses</p>
                </div>
                <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-100">
                  +16%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Main Content Tabs */}
      <Tabs 
        defaultValue={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList className="bg-gray-50 p-1 rounded-full w-fit mb-6">
          <TabsTrigger 
            value="overview" 
            className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm px-4"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="details" 
            className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm px-4"
          >
            Details
          </TabsTrigger>
          <TabsTrigger 
            value="travel" 
            className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm px-4"
          >
            Travel
          </TabsTrigger>
          <TabsTrigger 
            value="compliance" 
            className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm px-4"
          >
            Compliance
          </TabsTrigger>
        </TabsList>
        
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-2">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Expense Type Distribution */}
              <Card className="overflow-hidden border-0 shadow-sm bg-white rounded-2xl lg:col-span-2">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Expense Type Distribution</h3>
                  <div className="h-[300px]">
                    <ModernExpenseTypeChart expenseTypeData={filteredData.expenseTypeData} />
                  </div>
                </CardContent>
              </Card>
              
              {/* Monthly Spend */}
              <Card className="overflow-hidden border-0 shadow-sm bg-white rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Monthly Spend</h3>
                  <div className="h-[250px]">
                    <ModernMonthlyExpenseChart monthlyData={filteredData.monthlyExpenseData} />
                  </div>
                </CardContent>
              </Card>
              
              {/* Expense Types */}
              <Card className="overflow-hidden border-0 shadow-sm bg-white rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Expense Types</h3>
                  <ModernExpenseTypeList expenseTypeData={filteredData.expenseTypeData} />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6 mt-2">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden border-0 shadow-sm bg-white rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Expense Details</h3>
                  <p className="text-gray-500">Detailed expense breakdown will appear here.</p>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* Travel Tab */}
          <TabsContent value="travel" className="space-y-6 mt-2">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden border-0 shadow-sm bg-white rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Travel Summary</h3>
                  <ModernTravelSummary />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6 mt-2">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden border-0 shadow-sm bg-white rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Policy Violations</h3>
                  <ModernPolicyViolations complianceData={filteredData.complianceInsightsData} />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
};

export default ReportV3;
