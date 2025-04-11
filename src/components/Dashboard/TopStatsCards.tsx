
import React from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  FileText,
  CheckCircle,
  PlusCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatCard from '@/components/ui/StatCard';

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
  // Sample trend percentages (replace with actual data in production)
  const receivedTrend = 8.2;
  const processedTrend = -2.5;
  const postedTrend = 12.7;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Expense Received Tile */}
        <motion.div 
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="rounded-xl overflow-hidden shadow-md relative bg-white border border-slate-200/80"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full z-0"></div>
          <div className="p-6 relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Expense Received</p>
                <h3 className="text-2xl font-bold mb-1 text-slate-800">{currency} {totalExpense.amount.toLocaleString()}</h3>
                <div className="flex items-center mt-2">
                  <p className="text-sm text-slate-500">{totalExpense.count} Expenses</p>
                  <div className="ml-2 flex items-center px-2 py-0.5 rounded-full bg-blue-50 border border-blue-100">
                    <ArrowUp className="h-3 w-3 text-blue-600 mr-1" />
                    <span className="text-xs font-medium text-blue-600">{receivedTrend}%</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-slate-100 text-blue-600 shadow-sm">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-blue-500/40"></div>
        </motion.div>

        {/* Expense Processed Tile */}
        <motion.div 
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="rounded-xl overflow-hidden shadow-md relative bg-white border border-slate-200/80"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full z-0"></div>
          <div className="p-6 relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Expense Processed</p>
                <h3 className="text-2xl font-bold mb-1 text-slate-800">{currency} {processedExpense.amount.toLocaleString()}</h3>
                <div className="flex items-center mt-2">
                  <p className="text-sm text-slate-500">{processedExpense.count} Expenses</p>
                  <div className="ml-2 flex items-center px-2 py-0.5 rounded-full bg-red-50 border border-red-100">
                    <ArrowDown className="h-3 w-3 text-red-600 mr-1" />
                    <span className="text-xs font-medium text-red-600">{Math.abs(processedTrend)}%</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-slate-100 text-emerald-600 shadow-sm">
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-emerald-500/40"></div>
        </motion.div>

        {/* Expense Posted Tile */}
        <motion.div 
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="rounded-xl overflow-hidden shadow-md relative bg-white border border-slate-200/80"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full z-0"></div>
          <div className="p-6 relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Expense Posted</p>
                <h3 className="text-2xl font-bold mb-1 text-slate-800">{currency} {postedExpense.amount.toLocaleString()}</h3>
                <div className="flex items-center mt-2">
                  <p className="text-sm text-slate-500">{postedExpense.count} Expenses</p>
                  <div className="ml-2 flex items-center px-2 py-0.5 rounded-full bg-purple-50 border border-purple-100">
                    <ArrowUp className="h-3 w-3 text-purple-600 mr-1" />
                    <span className="text-xs font-medium text-purple-600">{postedTrend}%</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-slate-100 text-purple-600 shadow-sm">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-purple-500/40"></div>
        </motion.div>

        {/* Quick Create Tile */}
        <motion.div 
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="rounded-xl overflow-hidden shadow-md relative bg-white border border-slate-200/80"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-slate-500/5 rounded-bl-full z-0"></div>
          <div className="p-6 relative z-10">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-600">QUICK CREATE</h3>
                <div className="w-10 h-10 rounded-lg bg-slate-100 text-blue-600 flex items-center justify-center shadow-sm">
                  <PlusCircle className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-3 mt-2">
                <Button 
                  className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  onClick={() => window.location.href="/expenses/new"}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Expense
                </Button>
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-blue-500/40"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TopStatsCards;
