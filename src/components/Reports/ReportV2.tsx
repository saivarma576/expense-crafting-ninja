
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Filter,
  Download,
  FileSpreadsheet,
  FileText,
  CircleDollarSign,
  BookCheck,
  BarChart4,
  PieChart,
  LineChart,
  ArrowUpRight,
  AlertTriangle,
  DollarSign,
  Building2,
  CheckCircle,
  XCircle,
  Users
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Import the new chart components
import ExpenseTrendChart from './ExpenseTrendChart';
import DepartmentExpenseChart from './DepartmentExpenseChart';
import ExpenseCategoryPieChart from './ExpenseCategoryPieChart';
import ExpenseReportTables from './ExpenseReportTables';

// Mock data for charts
const monthlyData = [
  { name: 'Jan', value: 3200 },
  { name: 'Feb', value: 4500 },
  { name: 'Mar', value: 3800 },
  { name: 'Apr', value: 5100 },
  { name: 'May', value: 4200 },
  { name: 'Jun', value: 4800 },
  { name: 'Jul', value: 5500 },
  { name: 'Aug', value: 6200 },
  { name: 'Sep', value: 5300 },
  { name: 'Oct', value: 4900 },
  { name: 'Nov', value: 5700 },
  { name: 'Dec', value: 6500 },
];

const departmentData = [
  { name: 'Sales', value: 9500 },
  { name: 'Marketing', value: 7200 },
  { name: 'Engineering', value: 12500 },
  { name: 'Finance', value: 5300 },
  { name: 'Operations', value: 8100 },
  { name: 'Human Resources', value: 3200 },
];

const categoryData = [
  { name: 'Mileage', value: 4500, color: '#4f46e5' },
  { name: 'Meals', value: 3200, color: '#8b5cf6' },
  { name: 'Hotel/Lodging', value: 8700, color: '#3b82f6' },
  { name: 'Air/Taxi/Uber', value: 6300, color: '#0ea5e9' },
  { name: 'Parking/Tolls', value: 1200, color: '#06b6d4' },
  { name: 'Gasoline', value: 2500, color: '#14b8a6' },
];

const categoryGroups = [
  { 
    name: 'Travel',
    categories: [
      { name: 'Air/Taxi/Uber', value: 6300, color: '#0ea5e9' },
      { name: 'Hotel/Lodging', value: 8700, color: '#3b82f6' },
      { name: 'Rental Car', value: 1800, color: '#2563eb' },
    ]
  },
  { 
    name: 'Transportation',
    categories: [
      { name: 'Mileage', value: 4500, color: '#4f46e5' },
      { name: 'Parking/Tolls', value: 1200, color: '#06b6d4' },
      { name: 'Gasoline', value: 2500, color: '#14b8a6' },
    ]
  },
  { 
    name: 'Food',
    categories: [
      { name: 'Meals', value: 3200, color: '#8b5cf6' },
      { name: 'Business Meals', value: 2100, color: '#a855f7' },
    ]
  },
  { 
    name: 'Professional',
    categories: [
      { name: 'Registration Fees', value: 1500, color: '#ec4899' },
      { name: 'Professional Fees', value: 3200, color: '#d946ef' },
      { name: 'Dues Subscriptions', value: 900, color: '#f43f5e' },
    ]
  },
  { 
    name: 'Others',
    categories: [
      { name: 'Office Supplies', value: 800, color: '#f59e0b' },
      { name: 'Postage & Freight', value: 400, color: '#f97316' },
      { name: 'Others', value: 1200, color: '#84cc16' },
    ]
  },
];

// Top cards data
const topStatsData = [
  {
    title: 'Total Expenses',
    value: '$42,150.00',
    change: '+8.2%',
    trend: 'up',
    icon: <DollarSign className="h-5 w-5" />
  },
  {
    title: 'Expense Claims',
    value: '85',
    change: '+12.5%',
    trend: 'up',
    icon: <FileText className="h-5 w-5" />
  },
  {
    title: 'Policy Violations',
    value: '7',
    change: '-3.1%',
    trend: 'down',
    icon: <AlertTriangle className="h-5 w-5" />
  },
  {
    title: 'Departments',
    value: '6',
    change: '0%',
    trend: 'neutral',
    icon: <Building2 className="h-5 w-5" />
  }
];

const ReportV2: React.FC = () => {
  const navigate = useNavigate();
  const [timePeriod, setTimePeriod] = useState('this-month');
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold">Reports Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive analytics and expense insights
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="this-quarter">This Quarter</SelectItem>
              <SelectItem value="last-quarter">Last Quarter</SelectItem>
              <SelectItem value="year-to-date">Year to Date</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" className="flex items-center gap-1.5">
            <FileSpreadsheet className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topStatsData.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div className="bg-primary/10 p-2 rounded-full">
                  {stat.icon}
                </div>
                <Badge 
                  variant={stat.trend === 'up' ? 'success' : stat.trend === 'down' ? 'destructive' : 'outline'}
                  className="flex items-center gap-1"
                >
                  {stat.trend === 'up' && <ArrowUpRight className="h-3 w-3" />}
                  {stat.trend === 'down' && <ArrowUpRight className="h-3 w-3 rotate-180" />}
                  {stat.change}
                </Badge>
              </div>
              <div className="mt-3">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Main Content Tabs */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Expense Trend Chart */}
            <ExpenseTrendChart monthlyData={monthlyData} />
            
            {/* Expense Categories */}
            <div className="glass-card rounded-xl p-6">
              <div className="mb-4">
                <h2 className="text-lg font-medium">Expense Categories</h2>
                <p className="text-sm text-muted-foreground">Distribution by type</p>
              </div>
              <ExpenseCategoryPieChart 
                categoryData={categoryData}
                categoryGroups={categoryGroups}
              />
            </div>
          </div>
          
          {/* Monthly Expense Summary Table */}
          <Card className="mt-6">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <CircleDollarSign className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Monthly Expense Summary</CardTitle>
              </div>
              <CardDescription>
                Detailed breakdown of all expense types and their compliance status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExpenseReportTables />
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Compliance Tab Content */}
        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookCheck className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Policy Compliance Report</CardTitle>
              </div>
              <CardDescription>
                Summary of policy violations and expense compliance status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="text-xs text-muted-foreground">92% of total</span>
                    </div>
                    <h3 className="text-xl font-bold mt-2">78</h3>
                    <p className="text-sm text-muted-foreground">Compliant Expenses</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div className="bg-red-100 p-2 rounded-full">
                        <XCircle className="h-5 w-5 text-red-600" />
                      </div>
                      <span className="text-xs text-muted-foreground">8% of total</span>
                    </div>
                    <h3 className="text-xl font-bold mt-2">7</h3>
                    <p className="text-sm text-muted-foreground">Non-Compliant</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div className="bg-amber-100 p-2 rounded-full">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                      </div>
                      <span className="text-xs text-muted-foreground">Top violation</span>
                    </div>
                    <h3 className="text-xl font-bold mt-2">4</h3>
                    <p className="text-sm text-muted-foreground">Hotel Rate Violations</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <DollarSign className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mt-2">$1,240</h3>
                    <p className="text-sm text-muted-foreground">Violation Amount</p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Detail tables would go here - using a placeholder */}
              <div className="bg-muted/30 rounded-lg p-4 h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">
                  Detailed policy violation tables would be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Departments Tab Content */}
        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Department Expense Analysis</CardTitle>
              </div>
              <CardDescription>
                Track and analyze expenses across different departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DepartmentExpenseChart deptData={departmentData} />
                
                <div className="glass-card rounded-xl p-6">
                  <div className="mb-4">
                    <h2 className="text-lg font-medium">Department Expense Insights</h2>
                    <p className="text-sm text-muted-foreground">Quick department metrics</p>
                  </div>
                  
                  <div className="space-y-4">
                    {departmentData.map((dept, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-primary/80"></div>
                          <span className="font-medium">{dept.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">${dept.value.toLocaleString()}</span>
                          <Badge variant="outline" className="ml-2">
                            {Math.round((dept.value / departmentData.reduce((sum, d) => sum + d.value, 0)) * 100)}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Department expense details would go here */}
              <div className="mt-6 bg-muted/30 rounded-lg p-4 h-[200px] flex items-center justify-center">
                <p className="text-muted-foreground">
                  Detailed department expense analysis would be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex items-center justify-between mt-8 pt-4 border-t">
        <Button variant="outline" onClick={() => navigate('/reports')}>
          Go to Standard Reports
        </Button>
        <Button>
          Generate Custom Report
        </Button>
      </div>
    </div>
  );
};

export default ReportV2;
