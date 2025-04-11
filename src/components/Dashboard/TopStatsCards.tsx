
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
          className="rounded-xl overflow-hidden shadow-lg relative bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full z-0"></div>
          <div className="p-6 relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-blue-600/80 uppercase tracking-wider mb-2">Expense Received</p>
                <h3 className="text-2xl font-bold mb-1 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">{currency} {totalExpense.amount.toLocaleString()}</h3>
                <div className="flex items-center mt-2">
                  <p className="text-sm text-gray-600">{totalExpense.count} Expenses</p>
                  <div className="ml-2 flex items-center px-2 py-0.5 rounded-full bg-blue-50 border border-blue-100">
                    <ArrowUp className="h-3 w-3 text-blue-600 mr-1" />
                    <span className="text-xs font-medium text-blue-600">{receivedTrend}%</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-500 text-white shadow-md">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
        </motion.div>

        {/* Expense Processed Tile */}
        <motion.div 
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="rounded-xl overflow-hidden shadow-lg relative bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full z-0"></div>
          <div className="p-6 relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-emerald-600/80 uppercase tracking-wider mb-2">Expense Processed</p>
                <h3 className="text-2xl font-bold mb-1 bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">{currency} {processedExpense.amount.toLocaleString()}</h3>
                <div className="flex items-center mt-2">
                  <p className="text-sm text-gray-600">{processedExpense.count} Expenses</p>
                  <div className="ml-2 flex items-center px-2 py-0.5 rounded-full bg-red-50 border border-red-100">
                    <ArrowDown className="h-3 w-3 text-red-600 mr-1" />
                    <span className="text-xs font-medium text-red-600">{Math.abs(processedTrend)}%</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-500 text-white shadow-md">
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-teal-500"></div>
        </motion.div>

        {/* Expense Posted Tile */}
        <motion.div 
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="rounded-xl overflow-hidden shadow-lg relative bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full z-0"></div>
          <div className="p-6 relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-purple-600/80 uppercase tracking-wider mb-2">Expense Posted</p>
                <h3 className="text-2xl font-bold mb-1 bg-gradient-to-r from-purple-700 to-purple-500 bg-clip-text text-transparent">{currency} {postedExpense.amount.toLocaleString()}</h3>
                <div className="flex items-center mt-2">
                  <p className="text-sm text-gray-600">{postedExpense.count} Expenses</p>
                  <div className="ml-2 flex items-center px-2 py-0.5 rounded-full bg-purple-50 border border-purple-100">
                    <ArrowUp className="h-3 w-3 text-purple-600 mr-1" />
                    <span className="text-xs font-medium text-purple-600">{postedTrend}%</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-violet-500 text-white shadow-md">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-purple-400 to-violet-500"></div>
        </motion.div>

        {/* Quick Create Tile */}
        <motion.div 
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="rounded-xl overflow-hidden shadow-lg relative bg-gradient-to-br from-white to-slate-50 border border-slate-200"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full z-0"></div>
          <div className="p-6 relative z-10">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">QUICK CREATE</h3>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-md">
                  <PlusCircle className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-3 mt-2">
                <Button 
                  className="w-full justify-start bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg border border-blue-700/20"
                  onClick={() => window.location.href="/expenses/new"}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Expense
                </Button>
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TopStatsCards;
