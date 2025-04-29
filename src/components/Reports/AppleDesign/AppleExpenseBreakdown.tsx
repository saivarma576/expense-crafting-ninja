
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { formatCurrency } from '@/components/Charts/chartUtils';

interface AppleExpenseBreakdownProps {
  expenseTypeData: any[];
  monthlyData: any[];
}

const EXPENSE_COLORS = {
  'Meals': '#FF9500',
  'Travel': '#007AFF',
  'Hotel': '#5856D6',
  'Mileage': '#34C759',
  'Office Supplies': '#FF2D55',
  'Misc': '#AF52DE'
};

const AppleExpenseBreakdown: React.FC<AppleExpenseBreakdownProps> = ({ 
  expenseTypeData,
  monthlyData 
}) => {
  const [activeView, setActiveView] = useState('distribution');

  // Format expense type data for pie chart
  const pieChartData = expenseTypeData.map(item => ({
    name: item.type,
    value: item.amount,
    color: EXPENSE_COLORS[item.type as keyof typeof EXPENSE_COLORS] || '#999'
  }));

  // Format monthly data for bar chart
  const monthData = monthlyData.map(item => ({
    name: item.month,
    amount: item.amount
  }));

  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-6">
          <TabsTrigger value="distribution" className="text-sm">Distribution</TabsTrigger>
          <TabsTrigger value="monthly" className="text-sm">Monthly Trend</TabsTrigger>
          <TabsTrigger value="detail" className="text-sm">Detail View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="distribution">
          <Card className="overflow-hidden border-none shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Expense Type Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)} 
                      contentStyle={{ 
                        borderRadius: '8px', 
                        border: 'none', 
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                      }}
                    />
                    <Legend 
                      layout="horizontal" 
                      verticalAlign="bottom" 
                      align="center"
                      formatter={(value) => <span style={{ color: '#666', fontSize: '14px' }}>{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="monthly">
          <Card className="overflow-hidden border-none shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Monthly Expense Trend</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#666' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#666' }}
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)} 
                      contentStyle={{ 
                        borderRadius: '8px', 
                        border: 'none', 
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                      }}
                    />
                    <Bar 
                      dataKey="amount" 
                      fill="#007AFF" 
                      radius={[4, 4, 0, 0]}
                      name="Amount"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="detail">
          <Card className="overflow-hidden border-none shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Expense Details</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% of Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {expenseTypeData.map((item, index) => {
                      const total = expenseTypeData.reduce((sum, i) => sum + i.amount, 0);
                      const percentage = (item.amount / total * 100).toFixed(1);
                      
                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-4 px-4 text-sm">
                            <div className="flex items-center">
                              <span 
                                className="w-3 h-3 rounded-full mr-2" 
                                style={{ 
                                  backgroundColor: EXPENSE_COLORS[item.type as keyof typeof EXPENSE_COLORS] || '#999' 
                                }}
                              />
                              {item.type}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm">{item.count}</td>
                          <td className="py-4 px-4 text-sm font-medium">
                            ${item.amount ? item.amount.toLocaleString() : '0'}
                          </td>
                          <td className="py-4 px-4 text-sm">
                            ${item.count && item.amount ? (item.amount / item.count).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '0'}
                          </td>
                          <td className="py-4 px-4 text-sm">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-100 rounded-full h-1.5 mr-2">
                                <div 
                                  className="h-1.5 rounded-full" 
                                  style={{ 
                                    width: `${percentage}%`, 
                                    backgroundColor: EXPENSE_COLORS[item.type as keyof typeof EXPENSE_COLORS] || '#999'
                                  }}
                                />
                              </div>
                              {percentage}%
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppleExpenseBreakdown;
