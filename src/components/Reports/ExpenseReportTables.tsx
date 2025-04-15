
import React, { useState } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  ChevronLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock expense summary data
const expenseSummaryData = [
  { type: 'Lodging', amount: 8702.00, claims: 10, avgAmount: 870.20, icon: <Home className="h-4 w-4" /> },
  { type: 'Gasoline', amount: 2580.00, claims: 12, avgAmount: 215.00, icon: <Fuel className="h-4 w-4" /> },
  { type: 'Meals', amount: 1930.00, claims: 15, avgAmount: 128.67, icon: <Pizza className="h-4 w-4" /> },
  { type: 'Mileage', amount: 3100.00, claims: 20, avgAmount: 155.00, icon: <Route className="h-4 w-4" /> },
];

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

const ExpenseReportTables: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [dateRange, setDateRange] = useState('current-month');
  const [department, setDepartment] = useState('all');
  const [activeTab, setActiveTab] = useState('expense-summary');

  const handleBackToReports = () => {
    navigate('/reports');
  };

  return (
    <div className="space-y-6">
      {/* Only show back button on the report detail page, not on the v2 dashboard */}
      {window.location.pathname.includes('/reports/') && (
        <Button 
          variant="outline" 
          className="flex items-center gap-1.5 mb-4" 
          onClick={handleBackToReports}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Reports
        </Button>
      )}
      
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
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-md mb-6">
          <TabsTrigger value="expense-summary">Summary</TabsTrigger>
          <TabsTrigger value="lodging">Lodging</TabsTrigger>
          <TabsTrigger value="meals">Meals</TabsTrigger>
          <TabsTrigger value="transportation">Transportation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="expense-summary">
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
                {expenseSummaryData.map((item) => (
                  <TableRow key={item.type}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-gray-100">
                        {item.icon}
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
                    ${expenseSummaryData.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {expenseSummaryData.reduce((sum, item) => sum + item.claims, 0)}
                  </TableCell>
                  <TableCell className="text-right"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="lodging">
          <div className="space-y-4">
            <div className="font-medium text-lg mb-2">Hotel/Lodging Compliance Report</div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead className="text-right">Hotel Rate ($)</TableHead>
                  <TableHead className="text-right">CONUS Rate ($)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Explanation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lodgingReportData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.employee}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell className="text-right">${item.hotelRate}</TableCell>
                    <TableCell className="text-right">${item.conusRate}</TableCell>
                    <TableCell>
                      {item.overLimit ? (
                        <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                          <AlertTriangle className="h-3 w-3" />
                          Over Limit
                        </Badge>
                      ) : (
                        <Badge variant="success" className="flex items-center gap-1 w-fit">
                          <Check className="h-3 w-3" />
                          Compliant
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.explanation && item.overLimit ? (
                        <Badge variant="outline">Provided</Badge>
                      ) : item.overLimit ? (
                        <Badge variant="destructive">Missing</Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="meals">
          <div className="space-y-4">
            <div className="font-medium text-lg mb-2">Meals Per Diem Compliance</div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead className="text-right">Amount ($)</TableHead>
                  <TableHead className="text-right">Per Diem ($)</TableHead>
                  <TableHead className="text-right">Variance ($)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mealsPerDiemData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.employee}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.city}</TableCell>
                    <TableCell className="text-right">${item.amount}</TableCell>
                    <TableCell className="text-right">${item.perDiemRate}</TableCell>
                    <TableCell className="text-right">
                      {item.variance > 0 ? `+$${item.variance}` : `$${item.variance}`}
                    </TableCell>
                    <TableCell>
                      {item.variance > 0 ? (
                        <Badge variant={item.explanation ? "warning" : "destructive"} className="flex items-center gap-1 w-fit">
                          {item.explanation ? "Explained" : "Over Limit"}
                        </Badge>
                      ) : (
                        <Badge variant="success" className="flex items-center gap-1 w-fit">
                          <Check className="h-3 w-3" />
                          Compliant
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="transportation">
          <div className="space-y-4">
            <div className="font-medium text-lg mb-2">Mileage Reimbursement Analysis</div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Miles</TableHead>
                  <TableHead className="text-right">Rate ($/mile)</TableHead>
                  <TableHead className="text-right">Total ($)</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mileageReimbursementData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.employee}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className="text-right">{item.miles}</TableCell>
                    <TableCell className="text-right">${item.rateUsed.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                    <TableCell>
                      {item.notes === 'OK' ? (
                        <Badge variant="success" className="flex items-center gap-1 w-fit">
                          <Check className="h-3 w-3" />
                          Compliant
                        </Badge>
                      ) : (
                        <Badge variant="warning" className="w-fit">{item.notes}</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between items-center mt-6 pt-4 border-t">
        <div className="text-sm text-gray-500">
          Showing data for April 2025
        </div>
        <Button className="flex items-center gap-1.5">
          <Download className="h-4 w-4" />
          Download Full Report
        </Button>
      </div>
    </div>
  );
};

export default ExpenseReportTables;
