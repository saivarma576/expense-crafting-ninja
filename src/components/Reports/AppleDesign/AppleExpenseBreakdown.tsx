
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
import { 
  Tooltip as UITooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { ChevronRight, Info } from 'lucide-react';

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
  
  // Format expense type data for pie chart with safety checks
  const pieChartData = expenseTypeData.map(item => ({
    name: item.type || 'Unknown',
    value: valueType === 'amount' ? (item.amount || 0) : (item.count || 0),
    color: EXPENSE_COLORS[item.type as keyof typeof EXPENSE_COLORS] || '#999',
    amount: item.amount || 0,
    count: item.count || 0
  }));

  // Format monthly data for bar chart with safety checks
  const monthData = monthlyData.map(item => ({
    name: item.month || '',
    amount: item.amount || 0
  }));

  const getTotal = () => {
    return valueType === 'amount' 
      ? expenseTypeData.reduce((sum, item) => sum + (item.amount || 0), 0)
      : expenseTypeData.reduce((sum, item) => sum + (item.count || 0), 0);
  };

  // Calculate safe percentage
  const calculatePercentage = (value: number, total: number) => {
    if (!total || total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-6 bg-gray-100 p-1 rounded-full">
          <TabsTrigger 
            value="distribution" 
            className="text-sm rounded-full data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
          >
            Distribution
          </TabsTrigger>
          <TabsTrigger 
            value="monthly" 
            className="text-sm rounded-full data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
          >
            Monthly Trend
          </TabsTrigger>
          <TabsTrigger 
            value="detail" 
            className="text-sm rounded-full data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
          >
            Detail View
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="distribution" className="animate-in fade-in duration-300">
          <Card className="overflow-hidden border-none rounded-2xl shadow-sm bg-[#F9FAFB]">
            <CardContent className="p-6 relative">
              <div className="flex justify-between items-center mb-6">
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

              <div className="relative" style={{ height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={2}
                      dataKey="value"
                      strokeWidth={2}
                      stroke="#FFFFFF"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color} 
                          fillOpacity={0.85}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any, name: any, props: any) => {
                        const entry = props?.payload;
                        if (!entry) return [0, ''];
                        
                        const totalValue = getTotal();
                        const percentage = calculatePercentage(Number(value), totalValue);
                        
                        return [
                          <div key="tooltip" className="text-sm py-1">
                            <div className="font-medium">{entry.name}</div>
                            <div className="text-gray-600">
                              {valueType === 'amount' 
                                ? formatCurrency(entry.amount) 
                                : `${entry.count || 0} items`
                              }
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
                        if (index === undefined || !pieChartData[index]) return value;
                        
                        const item = pieChartData[index];
                        const totalValue = getTotal();
                        const percentage = calculatePercentage(item.value, totalValue);
                        
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="monthly" className="animate-in fade-in duration-300">
          <Card className="overflow-hidden border-none rounded-2xl shadow-sm bg-[#F9FAFB]">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-6">Monthly Expense Trend</h3>
              <div style={{ height: '320px', width: '100%' }}>
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
                      tickFormatter={(value) => {
                        if (value === 0) return '0';
                        return `$${value / 1000}k`;
                      }}
                    />
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value || 0)} 
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
        
        <TabsContent value="detail" className="animate-in fade-in duration-300">
          <Card className="overflow-hidden border-none rounded-2xl shadow-sm bg-[#F9FAFB]">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-6">Expense Details</h3>
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
                      const percentage = calculatePercentage(item.amount || 0, total);
                      const avgAmount = item.count && item.amount 
                        ? (item.amount / item.count) 
                        : 0;
                      
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
                              {item.type || 'Unknown'}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm">{item.count || 0}</td>
                          <td className="py-4 px-4 text-sm font-medium">
                            {formatCurrency(item.amount || 0)}
                          </td>
                          <td className="py-4 px-4 text-sm">
                            {formatCurrency(avgAmount)}
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
                    
                    {/* Add a total row */}
                    {expenseTypeData.length > 0 && (
                      <tr className="bg-gray-50 font-medium">
                        <td className="py-4 px-4 text-sm">Total</td>
                        <td className="py-4 px-4 text-sm">
                          {expenseTypeData.reduce((sum, item) => sum + (item.count || 0), 0)}
                        </td>
                        <td className="py-4 px-4 text-sm">
                          {formatCurrency(expenseTypeData.reduce((sum, item) => sum + (item.amount || 0), 0))}
                        </td>
                        <td className="py-4 px-4 text-sm">-</td>
                        <td className="py-4 px-4 text-sm">100%</td>
                      </tr>
                    )}
                    
                    {/* Empty state */}
                    {expenseTypeData.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-500">
                          No expense data available
                        </td>
                      </tr>
                    )}
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
