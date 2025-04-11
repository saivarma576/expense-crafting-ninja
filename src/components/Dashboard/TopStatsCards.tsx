
import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Bell,
  Clock,
  CheckCircle,
  PlusCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
        {/* Expense Received Card */}
        <Card className="overflow-hidden bg-white border border-slate-100 relative">
          <div className="p-5">
            <div className="flex items-start mb-2">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </div>
              <div className="ml-2 flex-1">
                <h3 className="text-sm font-medium text-slate-500">Expense Received</h3>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-slate-800">{totalExpense.count}</span>
              <div className="flex items-center mt-1 text-xs text-slate-500">
                <span>{currency} {totalExpense.amount.toLocaleString()}</span>
                <div className="ml-2 flex items-center px-1.5 py-0.5 rounded bg-blue-50">
                  <ArrowUp className="h-3 w-3 text-blue-600 mr-1" />
                  <span className="text-xs font-medium text-blue-600">{receivedTrend}%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-red-400"></div>
        </Card>

        {/* Expense Processed Card */}
        <Card className="overflow-hidden bg-white border border-slate-100 relative">
          <div className="p-5">
            <div className="flex items-start mb-2">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-orange-50">
                <Bell className="h-4 w-4 text-orange-500" />
              </div>
              <div className="ml-2 flex-1">
                <h3 className="text-sm font-medium text-slate-500">Expense Processed</h3>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-slate-800">{processedExpense.count}</span>
              <div className="flex items-center mt-1 text-xs text-slate-500">
                <span>{currency} {processedExpense.amount.toLocaleString()}</span>
                <div className="ml-2 flex items-center px-1.5 py-0.5 rounded bg-red-50">
                  <ArrowDown className="h-3 w-3 text-red-600 mr-1" />
                  <span className="text-xs font-medium text-red-600">{Math.abs(processedTrend)}%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-orange-400"></div>
        </Card>

        {/* Expense Posted Card */}
        <Card className="overflow-hidden bg-white border border-slate-100 relative">
          <div className="p-5">
            <div className="flex items-start mb-2">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-yellow-50">
                <Clock className="h-4 w-4 text-yellow-500" />
              </div>
              <div className="ml-2 flex-1">
                <h3 className="text-sm font-medium text-slate-500">Expense Posted</h3>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-slate-800">{postedExpense.count}</span>
              <div className="flex items-center mt-1 text-xs text-slate-500">
                <span>{currency} {postedExpense.amount.toLocaleString()}</span>
                <div className="ml-2 flex items-center px-1.5 py-0.5 rounded bg-purple-50">
                  <ArrowUp className="h-3 w-3 text-purple-600 mr-1" />
                  <span className="text-xs font-medium text-purple-600">{postedTrend}%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-yellow-400"></div>
        </Card>

        {/* Quick Create Card */}
        <Card className="overflow-hidden bg-white border border-slate-100 relative">
          <div className="p-5">
            <div className="flex items-start mb-2">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div className="ml-2 flex-1">
                <h3 className="text-sm font-medium text-slate-500">Quick Create</h3>
              </div>
            </div>
            <div className="mt-2">
              <Button 
                className="w-full justify-start text-white bg-blue-600 hover:bg-blue-700"
                onClick={() => window.location.href="/expenses/new"}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Expense
              </Button>
            </div>
          </div>
          <div className="h-1 w-full bg-green-400"></div>
        </Card>
      </div>
    </motion.div>
  );
};

export default TopStatsCards;
