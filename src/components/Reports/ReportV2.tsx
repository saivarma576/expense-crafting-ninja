
import React, { useState } from 'react';
import { 
  Calendar, 
  Filter, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle,
  BarChart3,
  PieChart,
  Building2,
  DollarSign,
  FileText,
  List,
  FileCheck,
  Clock,
  Search,
  CalendarRange,
  X
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
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
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

// Monthly expense summary data
const monthlyExpenseData = [
  { month: 'January 2025', totalExpenses: 120000, reports: 45, avgAmount: 2667 },
  { month: 'February 2025', totalExpenses: 98500, reports: 38, avgAmount: 2592 },
  { month: 'March 2025', totalExpenses: 134250, reports: 50, avgAmount: 2685 },
  { month: 'April 2025', totalExpenses: 115750, reports: 43, avgAmount: 2692 },
  { month: 'May 2025', totalExpenses: 142000, reports: 52, avgAmount: 2731 },
  { month: 'June 2025', totalExpenses: 128500, reports: 48, avgAmount: 2677 }
];

// Expense type analysis data
const expenseTypeData = [
  { name: 'Lodging', value: 45000, percentage: 33.5, avgClaim: 3750, color: '#4f46e5' },
  { name: 'Travel (Air/Uber)', value: 28000, percentage: 20.8, avgClaim: 1867, color: '#8b5cf6' },
  { name: 'Meals', value: 18000, percentage: 13.4, avgClaim: 900, color: '#3b82f6' },
  { name: 'Others', value: 43000, percentage: 32.3, avgClaim: 2389, color: '#06b6d4' },
];

// New compliance insights data (replacement for policy violations)
const complianceInsightsData = [
  { category: 'Missing Receipts', count: 12, trend: -2, risk: 'medium', impact: 8500 },
  { category: 'Exceeded Limits', count: 8, trend: 3, risk: 'high', impact: 12400 },
  { category: 'Late Submissions', count: 14, trend: -5, risk: 'low', impact: 5200 },
  { category: 'Duplicate Claims', count: 3, trend: 0, risk: 'high', impact: 6800 },
];

// Department data
const departmentData = [
  { 
    department: 'Finance', 
    totalExpense: 62000, 
    topExpenseType: 'Lodging', 
    violations: 3,
    expenses: {
      lodging: 28000,
      travel: 15000,
      meals: 8000,
      others: 11000
    }
  },
  { 
    department: 'Sales', 
    totalExpense: 85500, 
    topExpenseType: 'Travel', 
    violations: 2,
    expenses: {
      lodging: 25000,
      travel: 35500,
      meals: 15000,
      others: 10000
    }
  },
  { 
    department: 'Marketing', 
    totalExpense: 48000, 
    topExpenseType: 'Meals', 
    violations: 1,
    expenses: {
      lodging: 12000,
      travel: 10000,
      meals: 18000,
      others: 8000
    }
  },
  { 
    department: 'IT', 
    totalExpense: 67300, 
    topExpenseType: 'Office Supplies', 
    violations: 0,
    expenses: {
      lodging: 18000,
      travel: 14000,
      meals: 5300,
      others: 30000
    }
  },
];

// Department chart data
const departmentChartData = [
  {
    name: 'Finance',
    Lodging: 28000,
    Travel: 15000,
    Meals: 8000,
    Others: 11000,
  },
  {
    name: 'Sales',
    Lodging: 25000,
    Travel: 35500,
    Meals: 15000,
    Others: 10000,
  },
  {
    name: 'Marketing',
    Lodging: 12000,
    Travel: 10000,
    Meals: 18000,
    Others: 8000,
  },
  {
    name: 'IT',
    Lodging: 18000,
    Travel: 14000,
    Meals: 5300,
    Others: 30000,
  },
];

// All expenses data for the list view
const allExpensesData = [
  { id: 'EXP-2546', employee: 'Rajesh Kumar', date: '15-Jun-25', type: 'Lodging', amount: 9500, status: 'Approved' },
  { id: 'EXP-2545', employee: 'Meena Sharma', date: '14-Jun-25', type: 'Travel', amount: 12400, status: 'Pending' },
  { id: 'EXP-2544', employee: 'Ajay Singh', date: '12-Jun-25', type: 'Meals', amount: 1850, status: 'Approved' },
  { id: 'EXP-2543', employee: 'Priya Patel', date: '10-Jun-25', type: 'Equipment', amount: 24500, status: 'Rejected' },
  { id: 'EXP-2542', employee: 'Vikram Mehta', date: '08-Jun-25', type: 'Office Supplies', amount: 3200, status: 'Approved' },
  { id: 'EXP-2541', employee: 'Neha Gupta', date: '06-Jun-25', type: 'Travel', amount: 18700, status: 'Pending' },
  { id: 'EXP-2540', employee: 'Sanjay Verma', date: '05-Jun-25', type: 'Lodging', amount: 8900, status: 'Approved' },
  { id: 'EXP-2539', employee: 'Anita Desai', date: '03-Jun-25', type: 'Meals', amount: 2100, status: 'Approved' },
  { id: 'EXP-2538', employee: 'Rahul Joshi', date: '01-Jun-25', type: 'Travel', amount: 21300, status: 'Pending' },
  { id: 'EXP-2537', employee: 'Deepak Sharma', date: '30-May-25', type: 'Equipment', amount: 35000, status: 'Approved' },
];

// Custom chart components
const MonthlyExpenseChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis 
        dataKey="month" 
        axisLine={false}
        tickLine={false}
        tick={{ fontSize: 12 }}
      />
      <YAxis 
        axisLine={false}
        tickLine={false}
        tick={{ fontSize: 12 }}
        tickFormatter={(value) => `₹${value/1000}k`}
      />
      <RechartsTooltip 
        formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Total Expenses']}
        labelFormatter={(label) => `Month: ${label}`}
      />
      <Bar dataKey="totalExpenses" fill="#4f46e5" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

const ExpenseTypePieChart = ({ data }: { data: any[] }) => {
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={110}
          innerRadius={60}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend 
          layout="horizontal" 
          verticalAlign="bottom" 
          align="center"
          formatter={(value, entry, index) => <span className="text-xs">{value}</span>}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

const DepartmentStackedBarChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis 
        dataKey="name" 
        axisLine={false}
        tickLine={false}
      />
      <YAxis 
        axisLine={false}
        tickLine={false}
        tickFormatter={(value) => `₹${value/1000}k`}
      />
      <RechartsTooltip />
      <Legend />
      <Bar dataKey="Lodging" stackId="a" fill="#4f46e5" />
      <Bar dataKey="Travel" stackId="a" fill="#8b5cf6" />
      <Bar dataKey="Meals" stackId="a" fill="#3b82f6" />
      <Bar dataKey="Others" stackId="a" fill="#06b6d4" />
    </BarChart>
  </ResponsiveContainer>
);

// New component to display risk level with visual indicator
const RiskIndicator = ({ risk }: { risk: string }) => {
  const getColorClass = () => {
    switch (risk) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded-full ${getColorClass()}`}></span>
      <span className="capitalize">{risk}</span>
    </div>
  );
};

const ReportV2: React.FC = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('current');
  const [activeTab, setActiveTab] = useState('summary');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter monthly data based on time filter
  const filteredMonthlyData = timeFilter === 'current' 
    ? monthlyExpenseData.slice(3, 6) 
    : monthlyExpenseData.slice(0, 3);
    
  // Filter expenses for list view
  const filteredExpenses = allExpensesData.filter(expense => {
    // Apply status filter
    if (statusFilter !== 'all' && expense.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return expense.id.toLowerCase().includes(query) || 
             expense.employee.toLowerCase().includes(query) ||
             expense.type.toLowerCase().includes(query);
    }
    
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Expense Reports Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive analysis and insights for expense management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Quarter</SelectItem>
              <SelectItem value="previous">Previous Quarter</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" className="flex items-center gap-1.5">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>
      
      {/* Redesigned Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="p-2 rounded-full bg-white/80 shadow-sm">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">+12.5%</Badge>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-blue-900">₹352,500</h3>
              <p className="text-sm text-blue-700 mt-1">Total Expenses (Q2)</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-indigo-100">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="p-2 rounded-full bg-white/80 shadow-sm">
                <FileText className="h-5 w-5 text-indigo-600" />
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">+8.3%</Badge>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-indigo-900">143</h3>
              <p className="text-sm text-indigo-700 mt-1">Expense Reports</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="p-2 rounded-full bg-white/80 shadow-sm">
                <FileCheck className="h-5 w-5 text-emerald-600" />
              </div>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">82%</Badge>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-emerald-900">117</h3>
              <p className="text-sm text-emerald-700 mt-1">Approved Reports</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="p-2 rounded-full bg-white/80 shadow-sm">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">18 hrs</Badge>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-purple-900">₹2,466</h3>
              <p className="text-sm text-purple-700 mt-1">Avg. Expense Amount</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
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
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <CardTitle>Monthly Expense Summary</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setTimeFilter('previous')}
                    className={timeFilter === 'previous' ? 'bg-muted' : ''}
                  >
                    Previous Quarter
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setTimeFilter('current')}
                    className={timeFilter === 'current' ? 'bg-muted' : ''}
                  >
                    Current Quarter
                  </Button>
                </div>
              </div>
              <CardDescription>
                Monthly breakdown of expenses for {timeFilter === 'current' ? 'Apr-Jun 2025' : 'Jan-Mar 2025'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MonthlyExpenseChart data={filteredMonthlyData} />
              
              <div className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead className="text-right">Total Expenses</TableHead>
                      <TableHead className="text-right"># of Reports</TableHead>
                      <TableHead className="text-right">Avg. Amount per Report</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMonthlyData.map((month) => (
                      <TableRow key={month.month}>
                        <TableCell className="font-medium">{month.month}</TableCell>
                        <TableCell className="text-right">₹{month.totalExpenses.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{month.reports}</TableCell>
                        <TableCell className="text-right">₹{month.avgAmount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/50">
                      <TableCell className="font-bold">Total</TableCell>
                      <TableCell className="text-right font-bold">
                        ₹{filteredMonthlyData.reduce((sum, item) => sum + item.totalExpenses, 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {filteredMonthlyData.reduce((sum, item) => sum + item.reports, 0)}
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        ₹{Math.round(filteredMonthlyData.reduce((sum, item) => sum + item.totalExpenses, 0) / 
                          filteredMonthlyData.reduce((sum, item) => sum + item.reports, 0)).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Expense Type Analysis Tab */}
        <TabsContent value="types" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                <CardTitle>Expense Type Analysis</CardTitle>
              </div>
              <CardDescription>
                Breakdown of expenses by category for the current period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <ExpenseTypePieChart data={expenseTypeData} />
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Expense Type</TableHead>
                    <TableHead className="text-right">Total Amount</TableHead>
                    <TableHead className="text-right">% of Total</TableHead>
                    <TableHead className="text-right">Avg. Claim</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenseTypeData.map((type) => (
                    <TableRow key={type.name}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                          {type.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">₹{type.value.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{type.percentage}%</TableCell>
                      <TableCell className="text-right">₹{type.avgClaim.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/50">
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="text-right font-bold">
                      ₹{expenseTypeData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-bold">100%</TableCell>
                    <TableCell className="text-right font-bold">
                      ₹{Math.round(expenseTypeData.reduce((sum, item) => sum + item.value, 0) / 
                        expenseTypeData.reduce((sum, item) => sum + (item.value / item.avgClaim), 0)).toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* NEW: Compliance Insights Tab (replacing Policy Violations) */}
        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                <CardTitle>Compliance Insights</CardTitle>
              </div>
              <CardDescription>
                Analysis of compliance patterns and expense management efficiency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="bg-gray-200 p-1.5 rounded-full">
                        <FileCheck className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-sm font-medium text-green-600">82%</span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold">Compliance Rate</h3>
                    <p className="text-xs text-gray-500">Overall expense policy adherence</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="bg-gray-200 p-1.5 rounded-full">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-blue-600">2.4 days</span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold">Avg. Processing Time</h3>
                    <p className="text-xs text-gray-500">From submission to approval</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="bg-gray-200 p-1.5 rounded-full">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="text-sm font-medium text-amber-600">₹32,900</span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold">At-Risk Amount</h3>
                    <p className="text-xs text-gray-500">Total non-compliant expenses</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="bg-gray-200 p-1.5 rounded-full">
                        <CalendarRange className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="text-sm font-medium text-purple-600">-15%</span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold">Issue Trend</h3>
                    <p className="text-xs text-gray-500">Vs previous quarter</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mb-4">
                <h3 className="text-base font-medium mb-3">Compliance Issue Categories</h3>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Issue Category</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead className="text-right">Financial Impact (₹)</TableHead>
                    <TableHead className="text-right">Trend vs Last Quarter</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complianceInsightsData.map((issue, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{issue.category}</TableCell>
                      <TableCell className="text-right">{issue.count}</TableCell>
                      <TableCell>
                        <RiskIndicator risk={issue.risk} />
                      </TableCell>
                      <TableCell className="text-right">₹{issue.impact.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={issue.trend < 0 ? "success" : issue.trend > 0 ? "destructive" : "outline"}>
                          {issue.trend > 0 ? '+' : ''}{issue.trend}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/50">
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="text-right font-bold">
                      {complianceInsightsData.reduce((sum, item) => sum + item.count, 0)}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right font-bold">
                      ₹{complianceInsightsData.reduce((sum, item) => sum + item.impact, 0).toLocaleString()}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FileCheck className="h-4 w-4 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">Recommendation</h4>
                    <p className="text-xs text-blue-700">
                      Focus on reducing missing receipts and late submissions through automated reminders. 
                      Consider updating expense limits for travel categories based on current market rates.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Department-wise Summary Tab */}
        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <CardTitle>Department-wise Summary</CardTitle>
                </div>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="it">IT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardDescription>
                Expense distribution across departments and expense types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <DepartmentStackedBarChart data={departmentChartData} />
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-right">Total Expense</TableHead>
                    <TableHead>Top Expense Type</TableHead>
                    <TableHead className="text-right">Policy Violations</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departmentData
                    .filter(dept => departmentFilter === 'all' || departmentFilter === dept.department.toLowerCase())
                    .map((dept) => (
                    <TableRow key={dept.department}>
                      <TableCell className="font-medium">{dept.department}</TableCell>
                      <TableCell className="text-right">₹{dept.totalExpense.toLocaleString()}</TableCell>
                      <TableCell>{dept.topExpenseType}</TableCell>
                      <TableCell className="text-right">
                        {dept.violations > 0 ? (
                          <Badge variant="destructive">{dept.violations}</Badge>
                        ) : (
                          <Badge variant="success">0</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {departmentFilter === 'all' && (
                    <TableRow className="bg-muted/50">
                      <TableCell className="font-bold">Total</TableCell>
                      <TableCell className="text-right font-bold">
                        ₹{departmentData.reduce((sum, item) => sum + item.totalExpense, 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-bold">-</TableCell>
                      <TableCell className="text-right font-bold">
                        {departmentData.reduce((sum, item) => sum + item.violations, 0)}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* NEW: All Expenses Tab (List View) */}
        <TabsContent value="all-expenses" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <List className="h-5 w-5 text-primary" />
                <CardTitle>All Expenses</CardTitle>
              </div>
              <CardDescription>
                Comprehensive view of all expense transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters & Search */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by ID, employee or type..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="icon" onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                  }}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Expense ID</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount (₹)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.length > 0 ? (
                    filteredExpenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell className="font-medium">{expense.id}</TableCell>
                        <TableCell>{expense.employee}</TableCell>
                        <TableCell>{expense.date}</TableCell>
                        <TableCell>{expense.type}</TableCell>
                        <TableCell className="text-right">{expense.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={
                            expense.status === 'Approved' ? 'success' : 
                            expense.status === 'Rejected' ? 'destructive' : 
                            'outline'
                          }>
                            {expense.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 px-2">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No expenses found matching your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              
              {filteredExpenses.length > 0 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredExpenses.length} of {allExpensesData.length} expenses
                  </p>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm" disabled>Next</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end mt-6">
        <Button onClick={() => navigate('/reports')} variant="outline" className="mr-2">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Reports
        </Button>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Dashboard
        </Button>
      </div>
    </div>
  );
};

export default ReportV2;
