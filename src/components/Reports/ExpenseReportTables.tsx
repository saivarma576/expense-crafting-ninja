
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
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
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
  Gas, 
  Home, 
  MapPin, 
  Pizza, 
  Route, 
  Download, 
  Flag, 
  AlertTriangle,
  Check
} from 'lucide-react';

// Mock expense summary data
const expenseSummaryData = [
  { type: 'Lodging', amount: 8702.00, claims: 10, avgAmount: 870.20, icon: <Home className="h-4 w-4" /> },
  { type: 'Gasoline', amount: 2580.00, claims: 12, avgAmount: 215.00, icon: <Gas className="h-4 w-4" /> },
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
  const [activeFilter, setActiveFilter] = useState('all');
  const [dateRange, setDateRange] = useState('current-month');
  const [department, setDepartment] = useState('all');

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold">Expense Reports</CardTitle>
              <CardDescription>
                Comprehensive expense analytics and compliance reports
              </CardDescription>
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
          
          <Tabs defaultValue="expense-summary" className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="expense-summary">Expense Summary</TabsTrigger>
              <TabsTrigger value="lodging-report">Lodging Report</TabsTrigger>
              <TabsTrigger value="gasoline-expenses">Gasoline Expenses</TabsTrigger>
              <TabsTrigger value="meals-per-diem">Meals Per Diem</TabsTrigger>
              <TabsTrigger value="mileage-reimbursement">Mileage Report</TabsTrigger>
            </TabsList>
            
            <TabsContent value="expense-summary">
              <Table>
                <TableCaption>Expense Summary by Type and Amount</TableCaption>
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
            </TabsContent>
            
            <TabsContent value="lodging-report">
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
            </TabsContent>
            
            <TabsContent value="gasoline-expenses">
              <Table>
                <TableCaption>Gasoline Expenses with Explanation</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-center">Explanation Provided?</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gasolineExpensesData.map((item) => (
                    <TableRow key={`${item.employee}-${item.date}`} className={!item.explanation ? "bg-amber-50" : ""}>
                      <TableCell className="font-medium">{item.employee}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell className="text-right">${item.amount}</TableCell>
                      <TableCell className="text-center">
                        {item.explanation ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <div className="flex items-center justify-center gap-1 text-amber-600">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-xs">Needs review</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Flag className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="meals-per-diem">
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
            </TabsContent>
            
            <TabsContent value="mileage-reimbursement">
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
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <div className="text-sm text-gray-500">
              Showing data for October 2023
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

export default ExpenseReportTables;
