
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
  FileText
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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

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

// Policy violation data
const policyViolationData = [
  { 
    date: '12-Mar-25', 
    employee: 'Rajesh Kumar', 
    reason: 'Exceeded lodging limit', 
    expenseType: 'Lodging', 
    amount: 12000, 
    action: 'Warning' 
  },
  { 
    date: '25-Feb-25', 
    employee: 'Meena Sharma', 
    reason: 'Missing Receipt', 
    expenseType: 'Meals', 
    amount: 800, 
    action: 'Resubmitted' 
  },
  { 
    date: '08-Mar-25', 
    employee: 'Ajay Singh', 
    reason: 'Non-compliant vendor', 
    expenseType: 'Travel', 
    amount: 5500, 
    action: 'Approved with note' 
  },
  { 
    date: '22-Feb-25', 
    employee: 'Priya Patel', 
    reason: 'Excessive meal expense', 
    expenseType: 'Meals', 
    amount: 3200, 
    action: 'Partial approval' 
  },
];

// Violation trend data
const violationTrendData = [
  { month: 'Jan', violations: 5 },
  { month: 'Feb', violations: 7 },
  { month: 'Mar', violations: 4 },
  { month: 'Apr', violations: 6 },
  { month: 'May', violations: 3 },
  { month: 'Jun', violations: 5 },
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

const ViolationTrendChart = ({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={200}>
    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis 
        dataKey="month" 
        axisLine={false}
        tickLine={false}
      />
      <YAxis 
        axisLine={false}
        tickLine={false}
        domain={[0, 'dataMax + 2']}
      />
      <RechartsTooltip />
      <Line 
        type="monotone" 
        dataKey="violations" 
        stroke="#ef4444" 
        strokeWidth={2}
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
      />
    </LineChart>
  </ResponsiveContainer>
);

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

const ReportV2: React.FC = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('current');
  const [activeTab, setActiveTab] = useState('summary');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  // Filter monthly data based on time filter
  const filteredMonthlyData = timeFilter === 'current' 
    ? monthlyExpenseData.slice(3, 6) 
    : monthlyExpenseData.slice(0, 3);

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
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div className="bg-blue-100 p-2 rounded-full">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700">+12.5%</Badge>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-bold">₹352,500</h3>
              <p className="text-sm text-muted-foreground">Total Expenses (Q2)</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div className="bg-indigo-100 p-2 rounded-full">
                <FileText className="h-5 w-5 text-indigo-600" />
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700">+8.3%</Badge>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-bold">143</h3>
              <p className="text-sm text-muted-foreground">Expense Reports</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <Badge variant="destructive">14 Issues</Badge>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-bold">9.8%</h3>
              <p className="text-sm text-muted-foreground">Policy Violations</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div className="bg-emerald-100 p-2 rounded-full">
                <Building2 className="h-5 w-5 text-emerald-600" />
              </div>
              <Badge variant="outline">All Depts</Badge>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-bold">₹2,466</h3>
              <p className="text-sm text-muted-foreground">Avg. Expense Amount</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content Tabs */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-md mb-6">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="types">Expense Types</TabsTrigger>
          <TabsTrigger value="violations">Violations</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
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
        
        {/* Policy Violations Tab */}
        <TabsContent value="violations" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <CardTitle>Policy Violation Report</CardTitle>
              </div>
              <CardDescription>
                Monthly violation trends and detailed breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Monthly Violation Trends</h3>
                <ViolationTrendChart data={violationTrendData} />
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Violation Reason</TableHead>
                    <TableHead>Expense Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Action Taken</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {policyViolationData.map((violation, index) => (
                    <TableRow key={index}>
                      <TableCell>{violation.date}</TableCell>
                      <TableCell className="font-medium">{violation.employee}</TableCell>
                      <TableCell>{violation.reason}</TableCell>
                      <TableCell>{violation.expenseType}</TableCell>
                      <TableCell className="text-right">₹{violation.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={
                          violation.action === 'Warning' ? 'destructive' : 
                          violation.action === 'Resubmitted' ? 'outline' : 
                          'secondary'
                        }>
                          {violation.action}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
