
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
  const [valueType, setValueType] = useState<'amount' | 'count'>('amount');
  
  // Format expense type data for pie chart
  const pieChartData = expenseTypeData.map(item => ({
    name: item.type,
    value: valueType === 'amount' ? item.amount : item.count,
    color: EXPENSE_COLORS[item.type as keyof typeof EXPENSE_COLORS] || '#999',
    amount: item.amount,
    count: item.count
  }));

  // Format monthly data for bar chart
  const monthData = monthlyData.map(item => ({
    name: item.month,
    amount: item.amount
  }));

  const getTotal = () => {
    return valueType === 'amount' 
      ? expenseTypeData.reduce((sum, item) => sum + (item.amount || 0), 0)
      : expenseTypeData.reduce((sum, item) => sum + (item.count || 0), 0);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-6">
          <TabsTrigger 
            value="distribution" 
            className="text-sm rounded-full data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900"
          >
            Distribution
          </TabsTrigger>
          <TabsTrigger 
            value="monthly" 
            className="text-sm rounded-full data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900"
          >
            Monthly Trend
          </TabsTrigger>
          <TabsTrigger 
            value="detail" 
            className="text-sm rounded-full data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900"
          >
            Detail View
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="distribution">
          <Card className="overflow-hidden border-none rounded-2xl shadow-sm bg-[#F9FAFB]">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-gray-500">Expense Type Distribution</h3>
                <div className="flex space-x-1 bg-gray-100 p-0.5 rounded-full text-xs">
                  <button 
                    className={`px-3 py-1 rounded-full transition-all ${valueType === 'amount' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}
                    onClick={() => setValueType('amount')}
                  >
                    By Amount
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-full transition-all ${valueType === 'count' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500'}`}
                    onClick={() => setValueType('count')}
                  >
                    By Count
                  </button>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color} 
                          fillOpacity={0.8}
                          stroke="white"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name, props) => {
                        const entry = props?.payload;
                        const totalValue = getTotal();
                        const percentage = totalValue > 0 ? Math.round((Number(value) / totalValue) * 100) : 0;
                        return [
                          <div key="tooltip" className="text-sm py-1">
                            <div className="font-medium">{entry?.name}</div>
                            <div className="text-gray-600">
                              {valueType === 'amount' ? formatCurrency(entry?.amount || 0) : `${entry?.count || 0} items`}
                            </div>
                            <div className="text-gray-500 text-xs">{percentage}% of total</div>
                          </div>
                        ];
                      }} 
                      contentStyle={{ 
                        borderRadius: '12px', 
                        border: 'none', 
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                        backgroundColor: 'white',
                        padding: '8px 12px'
                      }}
                    />
                    <Legend 
                      layout="horizontal" 
                      verticalAlign="bottom" 
                      align="center"
                      formatter={(value, entry, index) => {
                        const item = pieChartData[index];
                        const totalValue = getTotal();
                        const percentage = totalValue > 0 ? Math.round((item.value / totalValue) * 100) : 0;
                        return (
                          <span className="text-xs text-gray-600">
                            {value} <span className="font-medium">{percentage}%</span>
                          </span>
                        );
                      }}
                      iconSize={8}
                      iconType="circle"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Center content for the donut chart */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="text-3xl font-semibold">
                    {valueType === 'amount' 
                      ? formatCurrency(getTotal()) 
                      : getTotal()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {valueType === 'amount' ? 'Total' : 'Items'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="monthly">
          <Card className="overflow-hidden border-none rounded-2xl shadow-sm bg-[#F9FAFB]">
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
                        borderRadius: '12px', 
                        border: 'none', 
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                        backgroundColor: 'white',
                        padding: '8px 12px'
                      }}
                      cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
                    />
                    <Bar 
                      dataKey="amount" 
                      fill="#007AFF"
                      fillOpacity={0.7} 
                      radius={[6, 6, 0, 0]}
                      name="Amount"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="detail">
          <Card className="overflow-hidden border-none rounded-2xl shadow-sm bg-[#F9FAFB]">
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
                  <tbody className="divide-y divide-gray-100">
                    {expenseTypeData.map((item, index) => {
                      const total = expenseTypeData.reduce((sum, i) => sum + (i.amount || 0), 0);
                      const percentage = total > 0 ? (item.amount || 0) / total * 100 : 0;
                      
                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-4 px-4 text-sm">
                            <div className="flex items-center">
                              <span 
                                className="w-2.5 h-2.5 rounded-full mr-2" 
                                style={{ 
                                  backgroundColor: EXPENSE_COLORS[item.type as keyof typeof EXPENSE_COLORS] || '#999' 
                                }}
                              />
                              {item.type}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm">{item.count || 0}</td>
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
                                    width: `${percentage.toFixed(1)}%`, 
                                    backgroundColor: EXPENSE_COLORS[item.type as keyof typeof EXPENSE_COLORS] || '#999'
                                  }}
                                />
                              </div>
                              {percentage.toFixed(1)}%
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
