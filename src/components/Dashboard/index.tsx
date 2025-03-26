
import React from 'react';
import StatCard from '../ui/StatCard';
import ExpenseCard from '../ui/ExpenseCard';
import { ArrowUpRight, ArrowDownRight, DollarSign, Receipt, Clock, Plane, Hotel, UtensilsCrossed, Car, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

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
          <div className="glass-card rounded-xl p-6 space-y-5">
            {[
              { name: 'Airfare', value: 3450.65, icon: <Plane className="h-5 w-5" />, color: 'text-expense-airfare' },
              { name: 'Hotels', value: 2890.15, icon: <Hotel className="h-5 w-5" />, color: 'text-expense-hotel' },
              { name: 'Meals', value: 1245.82, icon: <UtensilsCrossed className="h-5 w-5" />, color: 'text-expense-meals' },
              { name: 'Car Rental', value: 876.25, icon: <Car className="h-5 w-5" />, color: 'text-expense-rental' },
              { name: 'Transport', value: 562.18, icon: <Truck className="h-5 w-5" />, color: 'text-expense-transport' } // Changed from Taxi to Truck
            ].map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={cn(
                    "p-2 rounded-full mr-3",
                    `bg-muted ${category.color}`
                  )}>
                    {category.icon}
                  </div>
                  <span className="font-medium">{category.name}</span>
                </div>
                <span className="font-semibold">${category.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
