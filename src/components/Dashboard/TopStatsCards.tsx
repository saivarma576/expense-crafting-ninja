
import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUp,
  ArrowDown,
  DollarSign,
  FileText,
  Receipt,
  PlusCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

interface TopStatsCardsProps {
  totalExpense: {
    amount: number;
    count: number;
  };
  processedExpense: {
    amount: number;
    count: number;
  };
  postedExpense: {
    amount: number;
    count: number;
  };
  currency: string;
}

const TopStatsCards: React.FC<TopStatsCardsProps> = ({
  totalExpense,
  processedExpense,
  postedExpense,
  currency
}) => {
  // Trend percentages
  const totalTrend = 10;
  const processedTrend = 10;
  const postedTrend = 10;

  // Format currency
  const formatCurrency = (amount: number) => {
    if (amount >= 1000) {
      return `${currency}${(amount / 1000).toFixed(2)}K`;
    }
    return `${currency}${amount.toFixed(2)}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Expense Card */}
        <div className="glass-card p-6 rounded-xl flex flex-col space-y-2 border-b-4 border-primary/10 shadow-lg">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-muted-foreground">TOTAL EXPENSE</h3>
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-semibold">{formatCurrency(totalExpense.amount)}</div>
              <p className="text-sm text-muted-foreground">{totalExpense.count} expenses</p>
            </div>
            
            <div className="text-sm font-medium flex items-center p-1.5 rounded-full bg-green-50 text-green-600">
              <ArrowUp className="mr-1 h-3 w-3" /> {totalTrend}% vs last month
            </div>
          </div>
        </div>

        {/* Processed Expense Card */}
        <div className="glass-card p-6 rounded-xl flex flex-col space-y-2 border-b-4 border-primary/10 shadow-lg">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-muted-foreground">EXPENSE PROCESSED</h3>
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-semibold">{formatCurrency(processedExpense.amount)}</div>
              <p className="text-sm text-muted-foreground">{processedExpense.count} expenses</p>
            </div>
            
            <div className="text-sm font-medium flex items-center p-1.5 rounded-full bg-green-50 text-green-600">
              <ArrowUp className="mr-1 h-3 w-3" /> {processedTrend}% vs last month
            </div>
          </div>
        </div>

        {/* Posted Expense Card */}
        <div className="glass-card p-6 rounded-xl flex flex-col space-y-2 border-b-4 border-primary/10 shadow-lg">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-muted-foreground">EXPENSE POSTED</h3>
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <Receipt className="h-5 w-5" />
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-semibold">{formatCurrency(postedExpense.amount)}</div>
              <p className="text-sm text-muted-foreground">{postedExpense.count} expenses</p>
            </div>
            
            <div className="text-sm font-medium flex items-center p-1.5 rounded-full bg-green-50 text-green-600">
              <ArrowUp className="mr-1 h-3 w-3" /> {postedTrend}% vs last month
            </div>
          </div>
        </div>

        {/* Quick Create Button Card */}
        <Link to="/expenses/new" className="block">
          <motion.div 
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="glass-card p-6 rounded-xl flex flex-col justify-center items-center h-full border-b-4 border-primary/10 shadow-lg bg-blue-500 text-white cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="rounded-full bg-white/20 p-3">
                <PlusCircle className="h-8 w-8" />
              </div>
              <h3 className="text-base font-medium">Create Expense</h3>
            </div>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default TopStatsCards;
