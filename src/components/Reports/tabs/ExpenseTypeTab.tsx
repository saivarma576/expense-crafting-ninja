
import React from 'react';
import { PieChart, FileText, DollarSign, FileBarChart, Percent } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

export interface ExpenseTypeData {
  name: string;
  value: number;
  percentage: number;
  avgClaim: number;
  color: string;
}

interface ExpenseTypeTabProps {
  expenseTypeData: ExpenseTypeData[];
}

// Custom Tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 shadow-md border border-gray-100 rounded-lg">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-sm text-gray-600">${payload[0].value.toLocaleString()}</p>
        <p className="text-xs text-gray-500">{payload[0].payload.percentage}%</p>
      </div>
    );
  }
  return null;
};

// Custom chart component
const ExpenseTypePieChart = ({ data }: { data: ExpenseTypeData[] }) => {
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
        textAnchor="middle"
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={140}
          innerRadius={70}
          fill="#8884d8"
          dataKey="value"
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          layout="horizontal" 
          verticalAlign="bottom" 
          align="center"
          formatter={(value, entry, index) => (
            <span className="text-sm">{value}</span>
          )}
          iconType="circle"
          iconSize={10}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

const ExpenseTypeTab: React.FC<ExpenseTypeTabProps> = ({ expenseTypeData }) => {
  const hasData = expenseTypeData && expenseTypeData.length > 0;
  
  // Calculate totals safely
  const totalAmount = hasData ? 
    expenseTypeData.reduce((sum, item) => sum + item.value, 0) : 0;
  
  // Calculate total reports count (using avgClaim to estimate)
  const totalReports = hasData ?
    expenseTypeData.reduce((sum, item) => sum + Math.round(item.value / item.avgClaim), 0) : 0;
  
  // Update data to include report counts and percentages
  const enhancedData = hasData ? 
    expenseTypeData.map(item => {
      const reportCount = Math.round(item.value / item.avgClaim);
      return {
        ...item,
        reportCount,
        amountPercentage: ((item.value / totalAmount) * 100).toFixed(1),
        countPercentage: ((reportCount / totalReports) * 100).toFixed(1)
      };
    }) : [];
  
  return (
    <Card className="overflow-hidden border border-gray-100 shadow-sm">
      <CardHeader className="bg-white border-b border-gray-100 pb-2">
        <div className="flex items-center gap-2">
          <PieChart className="h-5 w-5 text-gray-600" />
          <CardTitle className="text-xl">Expense Type Analysis</CardTitle>
        </div>
        <CardDescription className="text-gray-500">
          Breakdown of expenses by category for the current period
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        {hasData ? (
          <>
            <div className="mb-4">
              <ExpenseTypePieChart data={expenseTypeData} />
            </div>
            
            <div className="overflow-hidden rounded-lg border border-gray-100">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="py-2 text-gray-600 font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        Expense Type
                      </div>
                    </TableHead>
                    <TableHead className="text-right py-2 text-gray-600 font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        Total Amount
                      </div>
                    </TableHead>
                    <TableHead className="text-right py-2 text-gray-600 font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <FileBarChart className="h-4 w-4 text-gray-500" />
                        No. of Reports
                      </div>
                    </TableHead>
                    <TableHead className="text-right py-2 text-gray-600 font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Percent className="h-4 w-4 text-gray-500" />
                        % of Amount
                      </div>
                    </TableHead>
                    <TableHead className="text-right py-2 text-gray-600 font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Percent className="h-4 w-4 text-gray-500" />
                        % of Count
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enhancedData.map((type) => (
                    <TableRow key={type.name} className="hover:bg-gray-50">
                      <TableCell className="py-2 font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }}></div>
                          {type.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-2">${type.value.toLocaleString()}</TableCell>
                      <TableCell className="text-right py-2">{type.reportCount}</TableCell>
                      <TableCell className="text-right py-2">{type.amountPercentage}%</TableCell>
                      <TableCell className="text-right py-2">{type.countPercentage}%</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-gray-50 border-t border-gray-200">
                    <TableCell className="py-2 font-bold">Total</TableCell>
                    <TableCell className="text-right py-2 font-bold">
                      ${totalAmount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right py-2 font-bold">
                      {totalReports}
                    </TableCell>
                    <TableCell className="text-right py-2 font-bold">
                      100%
                    </TableCell>
                    <TableCell className="text-right py-2 font-bold">
                      100%
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </>
        ) : (
          <div className="py-4 text-center text-gray-500">
            No expense type data available for the selected period.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseTypeTab;
