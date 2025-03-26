
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Search, Filter, ArrowDownUp } from 'lucide-react';
import ExpenseCard from '../ui/ExpenseCard';

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest';

const Expenses: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  
  // Mock data
  const allExpenses = [
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
    },
    {
      id: 'exp-004',
      title: 'Team Lunch',
      date: 'Nov 10, 2023',
      amount: 142.75,
      status: 'approved',
      expenseTypes: ['meals'],
      description: 'Monthly team lunch meeting.'
    },
    {
      id: 'exp-005',
      title: 'San Francisco Sales Trip',
      date: 'Nov 15-18, 2023',
      amount: 2150.32,
      status: 'rejected',
      expenseTypes: ['airfare', 'hotel', 'meals', 'transport'],
      description: 'Sales presentation to potential clients.'
    },
    {
      id: 'exp-006',
      title: 'Software Subscription',
      date: 'Nov 20, 2023',
      amount: 49.99,
      status: 'approved',
      expenseTypes: ['other'],
      description: 'Monthly subscription for design software.'
    }
  ];
  
  // Filter expenses based on search term
  const filteredExpenses = allExpenses.filter(expense => 
    expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort expenses based on sort option
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'highest':
        return b.amount - a.amount;
      case 'lowest':
        return a.amount - b.amount;
      default:
        return 0;
    }
  });
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Expenses</h1>
        <button
          onClick={() => navigate('/expenses/new')}
          className="inline-flex items-center py-2.5 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          New Expense
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full h-10 rounded-md border border-input bg-transparent px-3 py-2 shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <button className="h-10 px-3 inline-flex items-center justify-center rounded-md border border-input bg-transparent shadow-sm transition-colors hover:bg-accent">
              <Filter className="h-4 w-4 mr-2" />
              <span>Filter</span>
            </button>
          </div>
          
          <div className="relative">
            <button className="h-10 px-3 inline-flex items-center justify-center rounded-md border border-input bg-transparent shadow-sm transition-colors hover:bg-accent">
              <ArrowDownUp className="h-4 w-4 mr-2" />
              <span>Sort</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Amount</option>
                <option value="lowest">Lowest Amount</option>
              </select>
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedExpenses.length > 0 ? (
          sortedExpenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              id={expense.id}
              title={expense.title}
              date={expense.date}
              amount={expense.amount}
              status={expense.status as any}
              expenseTypes={expense.expenseTypes as any}
              description={expense.description}
              onClick={() => navigate(`/expenses/${expense.id}`)}
            />
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="text-muted-foreground mb-4">No expenses found. Try a different search term.</p>
            <button
              onClick={() => navigate('/expenses/new')}
              className="inline-flex items-center py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Create New Expense
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expenses;
