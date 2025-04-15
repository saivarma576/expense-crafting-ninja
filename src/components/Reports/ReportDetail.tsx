
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  FileSpreadsheet, 
  FileText, 
  Filter, 
  Fuel,
  Home, 
  MapPin, 
  Pizza, 
  Route, 
  Download, 
  Flag, 
  AlertTriangle,
  Check,
  ChevronLeft,
  Building2,
  Hotel,
  Car,
  Utensils,
  Plane,
  Briefcase,
  PackageOpen,
  Book,
  Receipt,
  Building,
  FileCheck
} from 'lucide-react';

// Mock lodging report data
const lodgingReportData = [
  { employee: 'J. Beard', city: 'Chicago', hotelRate: 190, conusRate: 159, overLimit: true, explanation: true },
  { employee: 'R. Smith', city: 'Austin', hotelRate: 150, conusRate: 159, overLimit: false, explanation: false },
  { employee: 'T. Johnson', city: 'New York', hotelRate: 220, conusRate: 182, overLimit: true, explanation: true },
  { employee: 'A. Williams', city: 'San Francisco', hotelRate: 250, conusRate: 210, overLimit: true, explanation: false },
  { employee: 'S. Miller', city: 'Denver', hotelRate: 145, conusRate: 159, overLimit: false, explanation: false },
];

// Mock gasoline expenses data
const gasolineExpensesData = [
  { employee: 'J. Beard', date: '10/05/2023', amount: 120, explanation: true },
  { employee: 'A. Jones', date: '10/08/2023', amount: 75, explanation: false },
  { employee: 'M. Carter', date: '10/12/2023', amount: 105, explanation: true },
  { employee: 'S. Davis', date: '10/15/2023', amount: 90, explanation: false },
  { employee: 'T. Wilson', date: '10/20/2023', amount: 115, explanation: true },
];

// Mock meals per diem data
const mealsPerDiemData = [
  { employee: 'M. Carter', date: '10/10/2023', city: 'Denver', amount: 95, perDiemRate: 80, variance: 15, explanation: true },
  { employee: 'J. Lee', date: '10/12/2023', city: 'Dallas', amount: 80, perDiemRate: 80, variance: 0, explanation: false },
  { employee: 'R. Garcia', date: '10/15/2023', city: 'Seattle', amount: 100, perDiemRate: 85, variance: 15, explanation: true },
  { employee: 'K. Martinez', date: '10/18/2023', city: 'Boston', amount: 90, perDiemRate: 80, variance: 10, explanation: false },
  { employee: 'P. Johnson', date: '10/20/2023', city: 'Atlanta', amount: 75, perDiemRate: 80, variance: -5, explanation: false },
];

// Mock mileage reimbursement data
const mileageReimbursementData = [
  { employee: 'S. Varma', date: '10/03/2023', miles: 100, rateUsed: 0.7, total: 70, notes: 'OK' },
  { employee: 'L. Grant', date: '10/09/2023', miles: 150, rateUsed: 0.6, total: 90, notes: '⚠️ Different rate used' },
  { employee: 'B. Thomas', date: '10/14/2023', miles: 80, rateUsed: 0.7, total: 56, notes: 'OK' },
  { employee: 'D. White', date: '10/19/2023', miles: 200, rateUsed: 0.7, total: 140, notes: 'OK' },
  { employee: 'J. Brown', date: '10/25/2023', miles: 120, rateUsed: 0.65, total: 78, notes: '⚠️ Different rate used' },
];

// Category expense by department data
const departmentExpenseData = [
  { department: 'Sales', lodging: 2100, meals: 950, mileage: 1200, gasoline: 580, other: 750 },
  { department: 'Marketing', lodging: 1500, meals: 650, mileage: 800, gasoline: 320, other: 420 },
  { department: 'Engineering', lodging: 950, meals: 330, mileage: 450, gasoline: 180, other: 290 },
  { department: 'Finance', lodging: 1100, meals: 450, mileage: 550, gasoline: 220, other: 310 },
  { department: 'HR', lodging: 750, meals: 280, mileage: 400, gasoline: 150, other: 180 },
];

const reportTypes = {
  'monthly-summary': {
    title: 'Monthly Expense Summary',
    description: 'Summary of all expenses by category',
    content: 'expense-summary',
    icon: <FileText className="h-5 w-5" />
  },
  'category-analysis': {
    title: 'Category Spend Analysis',
    description: 'Detailed breakdown by expense categories',
    content: 'category-breakdown',
    icon: <FileCheck className="h-5 w-5" />
  },
  'department-spend': {
    title: 'Department Expense Report',
    description: 'Expense analysis by department/cost center',
    content: 'department-breakdown',
    icon: <Building className="h-5 w-5" />
  },
  'policy-compliance': {
    title: 'Policy Compliance Summary',
    description: 'Overview of policy violations and compliance status',
    content: 'policy-compliance',
    icon: <Book className="h-5 w-5" />
  },
  'lodging-compliance': {
    title: 'Lodging Compliance Report',
    description: 'Analysis of hotel rates vs. CONUS limits',
    content: 'lodging-report',
    icon: <Hotel className="h-5 w-5" />
  },
  'per-diem-compliance': {
    title: 'Per Diem Compliance Status',
    description: 'Meals and incidentals rate compliance tracking',
    content: 'meals-per-diem',
    icon: <Utensils className="h-5 w-5" />
  },
  'approval-cycle': {
    title: 'Approval Cycle Time Analysis',
    description: 'Track expense approval times and bottlenecks',
    content: 'approval-cycle',
    icon: <Calendar className="h-5 w-5" />
  },
  'expense-volume': {
    title: 'Expense Volume by Department',
    description: 'Track submission rates across departments',
    content: 'expense-volume',
    icon: <Building2 className="h-5 w-5" />
  },
  'approval-metrics': {
    title: 'Approval Workflow Metrics',
    description: 'Analyze approval patterns and rejection rates',
    content: 'approval-metrics',
    icon: <FileCheck className="h-5 w-5" />
  },
  'travel-spend': {
    title: 'Travel Expense Analysis',
    description: 'Breakdown of airfare, lodging, and other travel costs',
    content: 'travel-spend',
    icon: <Plane className="h-5 w-5" />
  },
  'mileage-report': {
    title: 'Mileage Reimbursement Report',
    description: 'Summary of mileage claims and rate compliance',
    content: 'mileage-reimbursement',
    icon: <Car className="h-5 w-5" />
  },
  'per-diem-analysis': {
    title: 'Per Diem Expense Analysis',
    description: 'Analysis of meal expenses against per diem rates',
    content: 'meals-per-diem',
    icon: <Utensils className="h-5 w-5" />
  }
};

// Generic components for expense summaries by categories
const expenseTypeIcons = {
  'Lodging': <Hotel className="h-4 w-4" />,
  'Gasoline': <Fuel className="h-4 w-4" />,
  'Meals': <Utensils className="h-4 w-4" />,
  'Mileage': <Car className="h-4 w-4" />,
  'Air/Taxi/Uber': <Plane className="h-4 w-4" />,
  'Professional Fees': <Briefcase className="h-4 w-4" />,
  'Office Supplies': <PackageOpen className="h-4 w-4" />,
  'Parking/Tolls': <Car className="h-4 w-4" />,
  'Business Meals': <Utensils className="h-4 w-4" />,
  'Registration Fees': <Receipt className="h-4 w-4" />,
  'Others': <FileText className="h-4 w-4" />
};

// Sample expense categories summary data
const allExpenseCategoriesData = [
  { type: 'Lodging', amount: 8702.00, claims: 10, avgAmount: 870.20 },
  { type: 'Gasoline', amount: 2580.00, claims: 12, avgAmount: 215.00 },
  { type: 'Meals', amount: 1930.00, claims: 15, avgAmount: 128.67 },
  { type: 'Mileage', amount: 3100.00, claims: 20, avgAmount: 155.00 },
  { type: 'Air/Taxi/Uber', amount: 5200.00, claims: 8, avgAmount: 650.00 },
  { type: 'Professional Fees', amount: 3800.00, claims: 5, avgAmount: 760.00 },
  { type: 'Office Supplies', amount: 950.00, claims: 25, avgAmount: 38.00 },
  { type: 'Parking/Tolls', amount: 480.00, claims: 18, avgAmount: 26.67 },
  { type: 'Business Meals', amount: 2100.00, claims: 12, avgAmount: 175.00 },
  { type: 'Registration Fees', amount: 1200.00, claims: 4, avgAmount: 300.00 },
  { type: 'Others', amount: 1750.00, claims: 14, avgAmount: 125.00 }
];

const ReportDetail: React.FC = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [dateRange, setDateRange] = useState('current-month');
  const [department, setDepartment] = useState('all');
  
  const report = reportId ? reportTypes[reportId as keyof typeof reportTypes] : null;
  
  if (!report) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Report not found</h2>
        <p className="mb-4">The requested report could not be found.</p>
        <Button onClick={() => navigate('/reports')}>
          Back to Reports
        </Button>
      </div>
    );
  }

  const handleBackToReports = () => {
    navigate('/reports');
  };

  const renderReportContent = () => {
    switch (report.content) {
      case 'expense-summary':
        return (
          <div className="space-y-4">
            <div className="font-medium text-lg mb-2">Expense Summary by Type and Amount</div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Expense Type</TableHead>
                  <TableHead className="text-right">Total Amount (USD)</TableHead>
                  <TableHead className="text-right">No. of Claims</TableHead>
                  <TableHead className="text-right">Avg Claim Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allExpenseCategoriesData.map((item) => (
                  <TableRow key={item.type}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-gray-100">
                        {expenseTypeIcons[item.type as keyof typeof expenseTypeIcons] || <FileText className="h-4 w-4" />}
                      </div>
                      {item.type}
                    </TableCell>
                    <TableCell className="text-right font-semibold">${item.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{item.claims}</TableCell>
                    <TableCell className="text-right">${item.avgAmount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50">
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">
                    ${allExpenseCategoriesData.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {allExpenseCategoriesData.reduce((sum, item) => sum + item.claims, 0)}
                  </TableCell>
                  <TableCell className="text-right"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        );
        
      case 'category-breakdown':
        return (
          <div className="space-y-4">
            <div className="font-medium text-lg mb-2">Category Expense Breakdown</div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Expense Type</TableHead>
                  <TableHead className="text-right">Total Amount (USD)</TableHead>
                  <TableHead className="text-right">% of Total</TableHead>
                  <TableHead className="text-right">YoY Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allExpenseCategoriesData.map((item) => {
                  const totalExpenses = allExpenseCategoriesData.reduce((sum, item) => sum + item.amount, 0);
                  const percentOfTotal = (item.amount / totalExpenses) * 100;
                  // Generate a random YoY change between -20% and +30%
                  const yoyChange = Math.floor(Math.random() * 50) - 20;
                  
                  return (
                    <TableRow key={item.type}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <div className="p-1.5 rounded-full bg-gray-100">
                          {expenseTypeIcons[item.type as keyof typeof expenseTypeIcons] || <FileText className="h-4 w-4" />}
                        </div>
                        {item.type}
                      </TableCell>
                      <TableCell className="text-right font-semibold">${item.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{percentOfTotal.toFixed(1)}%</TableCell>
                      <TableCell className={`text-right ${yoyChange > 0 ? 'text-green-600' : yoyChange < 0 ? 'text-red-600' : ''}`}>
                        {yoyChange > 0 ? '+' : ''}{yoyChange}%
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        );
        
      case 'department-breakdown':
        return (
          <div className="space-y-4">
            <div className="font-medium text-lg mb-2">Department Expense Breakdown</div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Lodging</TableHead>
                  <TableHead className="text-right">Meals</TableHead>
                  <TableHead className="text-right">Mileage</TableHead>
                  <TableHead className="text-right">Gasoline</TableHead>
                  <TableHead className="text-right">Other</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departmentExpenseData.map((dept) => {
                  const total = dept.lodging + dept.meals + dept.mileage + dept.gasoline + dept.other;
                  
                  return (
                    <TableRow key={dept.department}>
                      <TableCell className="font-medium">{dept.department}</TableCell>
                      <TableCell className="text-right">${dept.lodging.toFixed(0)}</TableCell>
                      <TableCell className="text-right">${dept.meals.toFixed(0)}</TableCell>
                      <TableCell className="text-right">${dept.mileage.toFixed(0)}</TableCell>
                      <TableCell className="text-right">${dept.gasoline.toFixed(0)}</TableCell>
                      <TableCell className="text-right">${dept.other.toFixed(0)}</TableCell>
                      <TableCell className="text-right font-semibold">${total.toFixed(0)}</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow className="bg-muted/50">
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-semibold">
                    ${departmentExpenseData.reduce((sum, dept) => sum + dept.lodging, 0).toFixed(0)}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${departmentExpenseData.reduce((sum, dept) => sum + dept.meals, 0).toFixed(0)}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${departmentExpenseData.reduce((sum, dept) => sum + dept.mileage, 0).toFixed(0)}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${departmentExpenseData.reduce((sum, dept) => sum + dept.gasoline, 0).toFixed(0)}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${departmentExpenseData.reduce((sum, dept) => sum + dept.other, 0).toFixed(0)}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    ${departmentExpenseData.reduce((sum, dept) => {
                      return sum + dept.lodging + dept.meals + dept.mileage + dept.gasoline + dept.other;
                    }, 0).toFixed(0)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        );
        
      case 'lodging-report':
        return (
          <div className="space-y-4">
            <div className="font-medium text-lg mb-2">Lodging Over CONUS Rate Report</div>
            <Table>
              <TableCaption>Lodging Over CONUS Rate Report</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee Name</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead className="text-right">Hotel Rate</TableHead>
                  <TableHead className="text-right">CONUS Rate</TableHead>
                  <TableHead className="text-center">Over Limit?</TableHead>
                  <TableHead className="text-center">Explanation Provided?</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lodgingReportData.map((item) => (
                  <TableRow key={item.employee} className={item.overLimit && !item.explanation ? "bg-red-50" : ""}>
                    <TableCell className="font-medium">{item.employee}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell className="text-right font-semibold">${item.hotelRate}</TableCell>
                    <TableCell className="text-right">${item.conusRate}</TableCell>
                    <TableCell className="text-center">
                      {item.overLimit ? (
                        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                          ✅
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                          ❌
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.explanation ? "Yes" : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
        
      case 'meals-per-diem':
        return (
          <div className="space-y-4">
            <div className="font-medium text-lg mb-2">Meals with Per Diem Variance</div>
            <Table>
              <TableCaption>Meals with Per Diem Variance</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Per Diem Rate</TableHead>
                  <TableHead className="text-right">Variance</TableHead>
                  <TableHead className="text-center">Explanation Provided?</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mealsPerDiemData.map((item) => (
                  <TableRow 
                    key={`${item.employee}-${item.date}`} 
                    className={item.variance > 0 && !item.explanation ? "bg-amber-50" : ""}
                  >
                    <TableCell className="font-medium">{item.employee}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell className="text-right">${item.amount}</TableCell>
                    <TableCell className="text-right">${item.perDiemRate}</TableCell>
                    <TableCell className={`text-right font-medium ${
                      item.variance > 0 ? "text-red-600" : 
                      item.variance < 0 ? "text-green-600" : "text-gray-600"
                    }`}>
                      {item.variance > 0 ? `+$${item.variance}` : 
                       item.variance < 0 ? `-$${Math.abs(item.variance)}` : "$0"}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.explanation ? "✅" : item.variance !== 0 ? "-" : ""}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      
      case 'mileage-reimbursement':
        return (
          <div className="space-y-4">
            <div className="font-medium text-lg mb-2">Mileage Reimbursement Report</div>
            <Table>
              <TableCaption>Mileage Reimbursement Report</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Miles</TableHead>
                  <TableHead className="text-right">Rate Used</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mileageReimbursementData.map((item) => (
                  <TableRow key={`${item.employee}-${item.date}`} 
                    className={item.notes.includes('Different') ? "bg-amber-50" : ""}
                  >
                    <TableCell className="font-medium">{item.employee}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className="text-right">{item.miles}</TableCell>
                    <TableCell className="text-right">${item.rateUsed.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                    <TableCell>
                      {item.notes.includes('Different') ? (
                        <div className="flex items-center text-amber-700">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          <span className="text-sm">{item.notes}</span>
                        </div>
                      ) : (
                        item.notes
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
        
      // For simplicity, show a placeholder for other report types
      default:
        return (
          <div className="p-8 text-center border rounded-md bg-muted/20">
            <h3 className="text-lg font-semibold mb-2">Report Content Coming Soon</h3>
            <p>The detailed report for {report.title} is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      <Button 
        variant="outline" 
        className="flex items-center gap-1.5 mb-4" 
        onClick={handleBackToReports}
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Reports
      </Button>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {report.icon}
              <div>
                <CardTitle className="text-2xl font-bold">{report.title}</CardTitle>
                <CardDescription>
                  {report.description}
                </CardDescription>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                <FileSpreadsheet className="h-4 w-4" />
                Export Excel
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1.5">
                <FileText className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-2">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px] h-9">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-month">Current Month</SelectItem>
                  <SelectItem value="previous-month">Previous Month</SelectItem>
                  <SelectItem value="current-quarter">Current Quarter</SelectItem>
                  <SelectItem value="year-to-date">Year to Date</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="w-[180px] h-9">
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Department/Cost Center" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={activeFilter} onValueChange={setActiveFilter}>
                <SelectTrigger className="w-[180px] h-9">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Expenses</SelectItem>
                  <SelectItem value="compliant">Compliant Only</SelectItem>
                  <SelectItem value="non-compliant">Non-Compliant Only</SelectItem>
                  <SelectItem value="needs-review">Needs Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" size="sm" className="h-9 flex items-center gap-1.5">
              <Flag className="h-4 w-4" />
              Flag Non-Compliant
            </Button>
          </div>
          
          {renderReportContent()}
          
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <div className="text-sm text-gray-500">
              Showing data for April 2025
            </div>
            <Button className="flex items-center gap-1.5">
              <Download className="h-4 w-4" />
              Download Full Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportDetail;
