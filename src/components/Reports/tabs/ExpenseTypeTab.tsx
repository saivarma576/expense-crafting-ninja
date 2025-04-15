
import React from 'react';
import { PieChart } from 'lucide-react';
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
  Legend
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

const ExpenseTypeTab: React.FC<ExpenseTypeTabProps> = ({ expenseTypeData }) => {
  const hasData = expenseTypeData && expenseTypeData.length > 0;
  
  // Calculate totals safely
  const totalAmount = hasData ? 
    expenseTypeData.reduce((sum, item) => sum + item.value, 0) : 0;
  
  const totalClaims = hasData ?
    expenseTypeData.reduce((sum, item) => sum + (item.value / item.avgClaim), 0) : 0;
  
  const overallAvgClaim = totalClaims > 0 ? Math.round(totalAmount / totalClaims) : 0;
  
  return (
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
        {hasData ? (
          <>
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
                    ₹{totalAmount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-bold">100%</TableCell>
                  <TableCell className="text-right font-bold">
                    ₹{overallAvgClaim.toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            No expense type data available for the selected period.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseTypeTab;
