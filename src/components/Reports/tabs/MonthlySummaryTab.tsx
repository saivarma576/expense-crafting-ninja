
import React from 'react';
import { BarChart3 } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
} from 'recharts';

interface MonthlyExpenseData {
  month: string;
  totalExpenses: number;
  reports: number;
  avgAmount: number;
}

interface MonthlySummaryTabProps {
  timeFilter: string;
  setTimeFilter: (filter: string) => void;
  monthlyExpenseData: MonthlyExpenseData[];
}

// Custom chart component
const MonthlyExpenseChart = ({ data }: { data: MonthlyExpenseData[] }) => (
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

const MonthlySummaryTab: React.FC<MonthlySummaryTabProps> = ({ 
  timeFilter, 
  setTimeFilter, 
  monthlyExpenseData 
}) => {
  // Filter monthly data based on time filter
  const filteredMonthlyData = timeFilter === 'current' 
    ? monthlyExpenseData.slice(3, 6) 
    : monthlyExpenseData.slice(0, 3);
    
  return (
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
  );
};

export default MonthlySummaryTab;
