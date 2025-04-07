
import React from 'react';
import StatCard from '../ui/StatCard';
import ExpenseCard from '../ui/ExpenseCard';
import { ArrowUpRight, ArrowDownRight, DollarSign, Receipt, Clock, Plane, Hotel, UtensilsCrossed, Car, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const Dashboard: React.FC = () => {
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

  // Total value calculation for the center of the chart
  const totalValue = categoryData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold mb-1">Good morning, John</h1>
        <p className="text-muted-foreground">
          Here's an overview of your expense activity
        </p>
      </div>

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
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Expenses</h2>
            <a 
              href="/expenses" 
              className="text-sm text-primary font-medium animated-underline"
            >
              View all
            </a>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {recentExpenses.map((expense) => (
              <ExpenseCard
                key={expense.id}
                id={expense.id}
                title={expense.title}
                date={expense.date}
                amount={expense.amount}
                status={expense.status as any}
                expenseTypes={expense.expenseTypes as any}
                description={expense.description}
                onClick={() => console.log(`View expense ${expense.id}`)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Expense Categories</h2>
          <div className="glass-card rounded-xl p-6 flex flex-col items-center">
            <div className="relative w-full max-w-[220px] aspect-square flex flex-col items-center justify-center mb-6">
              {/* Year Selection */}
              <div className="absolute top-0 left-0 right-0 flex justify-between items-center mb-4 px-6">
                <button className="text-gray-400 hover:text-gray-600">
                  <ArrowUpRight className="h-4 w-4 rotate-180" />
                </button>
                <div className="font-medium">2023</div>
                <button className="text-gray-400 hover:text-gray-600">
                  <ArrowUpRight className="h-4 w-4 rotate-90" />
                </button>
              </div>
              
              {/* Circular Chart */}
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
                  ${(totalValue / 1000).toFixed(3)}
                </div>
                <div className="text-sm text-gray-500">Expenses this year</div>
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
                  <span className="ml-auto text-sm font-medium">{category.formattedValue}</span>
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
