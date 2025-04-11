
import React from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  FileText,
  CheckCircle,
  PlusCircle
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
          className="rounded-xl overflow-hidden bg-gradient-to-br from-white/90 to-white/70 shadow-lg border border-gray-100"
        >
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Expense Received</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-800">{currency} {totalExpense.amount.toLocaleString()}</h3>
                <p className="text-sm text-gray-600 mt-1">{totalExpense.count} Expenses</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 shadow-sm">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Expense Processed Tile */}
        <motion.div 
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="rounded-xl overflow-hidden bg-gradient-to-br from-white/90 to-white/70 shadow-lg border border-gray-100"
        >
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Expense Processed</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-800">{currency} {processedExpense.amount.toLocaleString()}</h3>
                <p className="text-sm text-gray-600 mt-1">{processedExpense.count} Expenses</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50 text-green-600 shadow-sm">
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Expense Posted Tile */}
        <motion.div 
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="rounded-xl overflow-hidden bg-gradient-to-br from-white/90 to-white/70 shadow-lg border border-gray-100"
        >
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Expense Posted</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-800">{currency} {postedExpense.amount.toLocaleString()}</h3>
                <p className="text-sm text-gray-600 mt-1">{postedExpense.count} Expenses</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-50 text-purple-600 shadow-sm">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Create Tile */}
        <motion.div 
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="rounded-xl overflow-hidden bg-gradient-to-br from-white/90 to-white/70 shadow-lg border border-gray-100"
        >
          <div className="p-6">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">QUICK CREATE</h3>
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <PlusCircle className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div className="space-y-3 mt-2">
                <Button 
                  className="w-full justify-start bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow"
                  onClick={() => window.location.href="/expenses/new"}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Expense
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TopStatsCards;
