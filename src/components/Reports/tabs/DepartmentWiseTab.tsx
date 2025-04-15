
import React from 'react';
import { Building2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export interface DepartmentData {
  department: string;
  totalExpense: number;
  topExpenseType: string;
  violations: number;
  expenses: {
    lodging: number;
    travel: number;
    meals: number;
    others: number;
  }
}

export interface DepartmentChartData {
  name: string;
  Lodging: number;
  Travel: number;
  Meals: number;
  Others: number;
}

interface DepartmentWiseTabProps {
  departmentData: DepartmentData[];
  departmentChartData: DepartmentChartData[];
  departmentFilter: string;
  setDepartmentFilter: (filter: string) => void;
}

// Custom chart component
const DepartmentStackedBarChart = ({ data }: { data: DepartmentChartData[] }) => (
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
        tickFormatter={(value) => `$${value/1000}k`}
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

const DepartmentWiseTab: React.FC<DepartmentWiseTabProps> = ({ 
  departmentData, 
  departmentChartData, 
  departmentFilter, 
  setDepartmentFilter 
}) => {
  // Calculate avg expense per report for each department
  const departmentsWithAvg = departmentData.map(dept => {
    // Assuming each department has approximately the same number of reports
    // In a real app, you'd have actual report counts per department
    const reportsCount = Math.round(dept.totalExpense / 500); // Simplified calculation
    const avgExpense = reportsCount > 0 ? Math.round(dept.totalExpense / reportsCount) : 0;
    
    return {
      ...dept,
      reportsCount,
      avgExpense
    };
  });
  
  return (
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
          Expense distribution across departments
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
              <TableHead className="text-right">Total Expense ($)</TableHead>
              <TableHead className="text-right">Reports</TableHead>
              <TableHead className="text-right">Avg. Expense per Report ($)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departmentsWithAvg
              .filter(dept => departmentFilter === 'all' || departmentFilter === dept.department.toLowerCase())
              .map((dept) => (
              <TableRow key={dept.department}>
                <TableCell className="font-medium">{dept.department}</TableCell>
                <TableCell className="text-right">{dept.totalExpense.toLocaleString()}</TableCell>
                <TableCell className="text-right">{dept.reportsCount}</TableCell>
                <TableCell className="text-right">${dept.avgExpense.toLocaleString()}</TableCell>
              </TableRow>
            ))}
            {departmentFilter === 'all' && (
              <TableRow className="bg-muted/50">
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">
                  ${departmentsWithAvg.reduce((sum, item) => sum + item.totalExpense, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-bold">
                  {departmentsWithAvg.reduce((sum, item) => sum + item.reportsCount, 0)}
                </TableCell>
                <TableCell className="text-right font-bold">
                  ${Math.round(
                    departmentsWithAvg.reduce((sum, item) => sum + (item.totalExpense), 0) / 
                    departmentsWithAvg.reduce((sum, item) => sum + item.reportsCount, 0)
                  ).toLocaleString()}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DepartmentWiseTab;
