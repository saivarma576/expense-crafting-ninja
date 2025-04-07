
import React, { useState } from 'react';
import StatCard from '../ui/StatCard';
import { 
  ArrowUpRight, ArrowDownRight, DollarSign, Receipt, Clock, ChevronDown, ChevronUp,
  ChevronLeft, ChevronRight, CalendarIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const Dashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(2023);

  // Mock data
  const expenseStats = [
    { title: 'Total Expenses', value: '$12,450.65', trend: 8.2, icon: <DollarSign className="h-5 w-5" /> },
    { title: 'Pending Approval', value: '$2,340.00', description: '4 expenses', icon: <Clock className="h-5 w-5" /> },
    { title: 'Receipts to Process', value: '12', description: 'Last updated 2h ago', icon: <Receipt className="h-5 w-5" /> },
    { title: 'Reimbursed', value: '$9,120.45', trend: -3.6, icon: <ArrowDownRight className="h-5 w-5" /> }
  ];

  const recentExpenses = [
    {
      id: 'exp-001',
      title: 'NYC Client Visit',
      date: 'Oct 12-15, 2023',
      amount: 1245.89,
      status: 'approved',
      expenseTypes: ['airfare', 'hotel', 'meals', 'transport'],
      description: 'Client meetings with ABC Corp. in New York.'
    },
    {
      id: 'exp-002',
      title: 'Office Supplies',
      date: 'Oct 25, 2023',
      amount: 89.99,
      status: 'submitted',
      expenseTypes: ['other'],
      description: 'Quarterly office supplies and equipment.'
    },
    {
      id: 'exp-003',
      title: 'Chicago Conference',
      date: 'Nov 2-4, 2023',
      amount: 1876.50,
      status: 'draft',
      expenseTypes: ['airfare', 'hotel', 'meals'],
      description: 'Annual industry conference.'
    }
  ];

  // Category data with colors and values
  const categoryData = [
    { name: 'Airfare', value: 3450.65, color: '#0EA5E9', formattedValue: '3.4k' },
    { name: 'Hotel', value: 2890.15, color: '#8B5CF6', formattedValue: '2.9k' },
    { name: 'Meals', value: 1245.82, color: '#ea384c', formattedValue: '1.2k' },
    { name: 'Transport', value: 562.18, color: '#10b981', formattedValue: '0.5k' },
    { name: 'Car Rental', value: 876.25, color: '#F97316', formattedValue: '0.8k' },
    { name: 'Other', value: 425.75, color: '#94a3b8', formattedValue: '0.4k' }
  ];

  // Monthly expense trend data
  const monthlyExpenseData = [
    { month: 'Jan', amount: 4000 },
    { month: 'Feb', amount: 3500 },
    { month: 'Mar', amount: 5000 },
    { month: 'Apr', amount: 4500 },
    { month: 'May', amount: 6000 },
    { month: 'Jun', amount: 5500 },
    { month: 'Jul', amount: 7500 },
    { month: 'Aug', amount: 7000 },
    { month: 'Sep', amount: 7500 },
    { month: 'Oct', amount: 9000 },
    { month: 'Nov', amount: 9500 },
    { month: 'Dec', amount: 9000 },
  ];

  // Total value calculation for the center of the chart
  const totalValue = categoryData.reduce((sum, item) => sum + item.value, 0);

  const handleYearChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedYear(prev => prev - 1);
    } else {
      setSelectedYear(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {expenseStats.map((stat, index) => (
          <StatCard
            key={`stat-${index}`}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Trends Chart */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Expense Trends</h2>
            <div className="flex items-center gap-2">
              <button 
                className="p-1 rounded hover:bg-muted" 
                onClick={() => handleYearChange('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="text-sm font-medium">{selectedYear}</div>
              <button 
                className="p-1 rounded hover:bg-muted" 
                onClick={() => handleYearChange('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart 
                data={monthlyExpenseData} 
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
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
                  tickFormatter={(value) => `$${value}`}
                  domain={[0, 'dataMax + 500']}
                  tickCount={5}
                />
                <Tooltip 
                  content={
                    <ChartTooltipContent 
                      labelClassName="font-medium text-foreground" 
                      formatter={(value) => [`$${value}`, 'Amount']}
                    />
                  }
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorExpense)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Categories */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Expense Categories</h2>
            <div className="flex items-center gap-2">
              <button 
                className="p-1 rounded hover:bg-muted" 
                onClick={() => handleYearChange('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="text-sm font-medium">{selectedYear}</div>
              <button 
                className="p-1 rounded hover:bg-muted" 
                onClick={() => handleYearChange('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-[220px] aspect-square flex items-center justify-center mb-6 mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius="65%"
                    outerRadius="90%"
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold">
                  ${(totalValue / 1000).toFixed(1)}k
                </div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 w-full">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Expenses</h2>
          <a 
            href="/expenses" 
            className="text-sm text-primary font-medium animated-underline"
          >
            View all
          </a>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Expense</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentExpenses.map((expense) => (
              <TableRow 
                key={expense.id}
                className="cursor-pointer hover:bg-muted/30"
                onClick={() => console.log(`View expense ${expense.id}`)}
              >
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{expense.title}</span>
                    <span className="text-xs text-muted-foreground">{expense.description}</span>
                  </div>
                </TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>
                  <div className={cn(
                    "px-2 py-1 text-xs font-medium rounded-full capitalize inline-block",
                    {
                      'bg-green-100 text-green-700': expense.status === 'approved',
                      'bg-blue-100 text-blue-700': expense.status === 'submitted',
                      'bg-muted text-muted-foreground': expense.status === 'draft',
                      'bg-red-100 text-red-700': expense.status === 'rejected',
                    }
                  )}>
                    {expense.status}
                  </div>
                </TableCell>
                <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
