
import React, { useState } from 'react';
import StatCard from '../ui/StatCard';
import ExpenseCard from '../ui/ExpenseCard';
import { 
  ArrowUpRight, ArrowDownRight, DollarSign, Receipt, Clock, ChevronDown, ChevronUp,
  ChevronLeft, ChevronRight, CalendarIcon, ChartLine
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
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
    { name: 'Airfare', value: 3450.65, color: '#3b82f6', formattedValue: '3.4k' },
    { name: 'Hotels', value: 2890.15, color: '#f59e0b', formattedValue: '2.9k' },
    { name: 'Meals', value: 1245.82, color: '#10b981', formattedValue: '1.2k' },
    { name: 'Transport', value: 562.18, color: '#ef4444', formattedValue: '0.5k' },
    { name: 'Car Rental', value: 876.25, color: '#8b5cf6', formattedValue: '0.8k' }
  ];

  // Monthly expense trend data
  const monthlyExpenseData = [
    { month: 'Jan', amount: 1250 },
    { month: 'Feb', amount: 980 },
    { month: 'Mar', amount: 1420 },
    { month: 'Apr', amount: 890 },
    { month: 'May', amount: 1670 },
    { month: 'Jun', amount: 1320 },
    { month: 'Jul', amount: 2100 },
    { month: 'Aug', amount: 1890 },
    { month: 'Sep', amount: 1450 },
    { month: 'Oct', amount: 1780 },
    { month: 'Nov', amount: 2050 },
    { month: 'Dec', amount: 1620 },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expense Trends Chart - First column span 2 */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Expense Trends</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center text-sm bg-muted rounded-md px-3 py-1">
                <CalendarIcon className="h-4 w-4 mr-2" />
                <span>{selectedYear}</span>
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-4 h-[320px]">
            <ChartContainer
              className="h-full"
              config={{
                expenses: {
                  label: "Monthly Expenses",
                  theme: {
                    light: "#3b82f6",
                    dark: "#60a5fa",
                  },
                },
              }}
            >
              <LineChart data={monthlyExpenseData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  content={
                    <ChartTooltipContent
                      labelClassName="font-medium text-foreground"
                    />
                  }
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  name="expenses"
                  stroke="var(--color-expenses)" 
                  strokeWidth={2} 
                  dot={{ stroke: 'var(--color-expenses)', strokeWidth: 2, r: 4 }}
                  activeDot={{ stroke: 'var(--color-expenses)', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
          
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Expenses</h2>
            <a 
              href="/expenses" 
              className="text-sm text-primary font-medium animated-underline"
            >
              View all
            </a>
          </div>
          
          <div className="glass-card rounded-xl p-4">
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

        {/* Categories - Third column */}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
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
          
          <div className="glass-card rounded-xl p-5 flex flex-col items-center">
            {/* Circular Chart */}
            <div className="relative w-full max-w-[220px] aspect-square flex flex-col items-center justify-center mb-6 mx-auto">
              <ResponsiveContainer width="100%" height="100%" className="flex items-center justify-center">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="90%"
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold">
                  ${(totalValue / 1000).toFixed(1)}k
                </div>
                <div className="text-sm text-gray-500">Total expenses</div>
              </div>
            </div>
            
            {/* Category Legend */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 w-full">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="ml-auto text-sm font-medium">${category.formattedValue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
