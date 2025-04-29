
import React, { useState } from 'react';
import { PieChart, FileText, DollarSign, FileBarChart, Percent, ArrowUp, ArrowDown } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip
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
    <ResponsiveContainer width="100%" height="100%">
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
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <RechartsTooltip content={<CustomTooltip />} />
        <Legend 
          layout="horizontal" 
          verticalAlign="bottom" 
          align="center"
          formatter={(value, entry, index) => (
            <span className="text-xs">{value}</span>
          )}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ paddingTop: 10, fontSize: 12 }}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

const ExpenseTypeTab: React.FC<ExpenseTypeTabProps> = ({ expenseTypeData }) => {
  const hasData = expenseTypeData && expenseTypeData.length > 0;
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
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
  
  // Sort data based on selected column
  const sortedData = [...enhancedData];
  if (sortColumn) {
    sortedData.sort((a, b) => {
      let valueA, valueB;
      
      if (sortColumn === 'name') {
        valueA = a.name;
        valueB = b.name;
        return sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else {
        valueA = sortColumn === 'value' ? a.value : 
                 sortColumn === 'reportCount' ? a.reportCount : 
                 sortColumn === 'amountPercentage' ? parseFloat(a.amountPercentage) : 
                 parseFloat(a.countPercentage);
        
        valueB = sortColumn === 'value' ? b.value : 
                 sortColumn === 'reportCount' ? b.reportCount : 
                 sortColumn === 'amountPercentage' ? parseFloat(b.amountPercentage) : 
                 parseFloat(b.countPercentage);
        
        return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }
    });
  }
  
  // Handle sort toggle
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };
  
  // Sort indicator component
  const SortIndicator = ({ column }: { column: string }) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />;
  };
  
  return (
    <Card className="overflow-hidden border border-gray-100 shadow-sm">
      <CardHeader className="bg-white border-b border-gray-100 py-3 px-4">
        <div className="flex items-center gap-2">
          <PieChart className="h-5 w-5 text-gray-600" />
          <CardTitle className="text-lg">Expense Type Analysis</CardTitle>
        </div>
        <CardDescription className="text-sm text-gray-500">
          Breakdown of expenses by category for the current period
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {hasData ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-gray-100 h-[280px] flex items-center justify-center py-2">
              <ExpenseTypePieChart data={expenseTypeData} />
            </div>
            
            <div className="md:col-span-2 overflow-auto max-h-[400px]">
              <Table>
                <TableHeader className="bg-gray-50 sticky top-0 z-10">
                  <TableRow>
                    <TableHead 
                      className="py-2 text-gray-600 font-medium cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center gap-1">
                        <FileText className="h-3.5 w-3.5 text-gray-500" />
                        <span className="text-xs">Expense Type</span>
                        <SortIndicator column="name" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="text-right py-2 text-gray-600 font-medium cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('value')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <DollarSign className="h-3.5 w-3.5 text-gray-500" />
                        <span className="text-xs">Amount</span>
                        <SortIndicator column="value" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="text-right py-2 text-gray-600 font-medium cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('reportCount')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <FileBarChart className="h-3.5 w-3.5 text-gray-500" />
                        <span className="text-xs"># Reports</span>
                        <SortIndicator column="reportCount" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="text-right py-2 text-gray-600 font-medium cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('amountPercentage')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <Percent className="h-3.5 w-3.5 text-gray-500" />
                        <span className="text-xs">% Amount</span>
                        <SortIndicator column="amountPercentage" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="text-right py-2 text-gray-600 font-medium cursor-pointer hover:bg-gray-100 pr-4"
                      onClick={() => handleSort('countPercentage')}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <Percent className="h-3.5 w-3.5 text-gray-500" />
                        <span className="text-xs">% Count</span>
                        <SortIndicator column="countPercentage" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedData.map((type) => (
                    <TableRow key={type.name} className="hover:bg-gray-50">
                      <TableCell className="py-1 font-medium pl-4">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: type.color }}></div>
                                <span className="text-xs truncate max-w-[120px]">{type.name}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{type.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                      <TableCell className="text-right py-1 text-xs">${type.value.toLocaleString()}</TableCell>
                      <TableCell className="text-right py-1 text-xs">{type.reportCount}</TableCell>
                      <TableCell className="text-right py-1 text-xs">{type.amountPercentage}%</TableCell>
                      <TableCell className="text-right py-1 text-xs pr-4">{type.countPercentage}%</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-gray-50 border-t border-gray-200">
                    <TableCell className="py-2 font-bold text-xs">Total</TableCell>
                    <TableCell className="text-right py-2 text-xs font-bold">
                      ${totalAmount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right py-2 text-xs font-bold">
                      {totalReports}
                    </TableCell>
                    <TableCell className="text-right py-2 text-xs font-bold">
                      100%
                    </TableCell>
                    <TableCell className="text-right py-2 text-xs font-bold pr-4">
                      100%
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <div className="py-3 px-4 text-center text-gray-500 text-sm">
            No expense type data available for the selected period.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseTypeTab;
