
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

interface TrendProps {
  value: number;
  label: string;
}

const Trend: React.FC<TrendProps> = ({ value, label }) => {
  const isPositive = value >= 0;
  return (
    <div className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full">
      <span className={cn(
        "flex items-center",
        isPositive ? "text-green-600" : "text-red-600"
      )}>
        {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
        {Math.abs(value)}% {label}
      </span>
    </div>
  );
};

const TopStatsCards: React.FC<TopStatsCardsProps> = ({
  totalExpense,
  processedExpense,
  postedExpense,
  currency
}) => {
  // Sample trend percentages
  const receivedTrend = 8.2;
  const processedTrend = -2.5;
  const postedTrend = 12.7;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-4 gap-5"
    >
      {/* High Severity Card */}
      <Card className="overflow-hidden bg-white border border-transparent shadow-sm relative">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-red-50">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <h3 className="text-gray-600 font-medium">Expense Received</h3>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold text-gray-900">{totalExpense.count}</span>
            <div className="flex items-center mt-1.5 text-sm text-gray-600">
              <span>{currency} {totalExpense.amount.toLocaleString()}</span>
              <div className="ml-3">
                <Trend value={receivedTrend} label="vs. last month" />
              </div>
            </div>
          </div>
        </div>
        <div className="h-1 w-full bg-red-500"></div>
      </Card>

      {/* Medium Severity Card */}
      <Card className="overflow-hidden bg-white border border-transparent shadow-sm relative">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-orange-50">
              <Bell className="h-5 w-5 text-orange-500" />
            </div>
            <h3 className="text-gray-600 font-medium">Expense Processed</h3>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold text-gray-900">{processedExpense.count}</span>
            <div className="flex items-center mt-1.5 text-sm text-gray-600">
              <span>{currency} {processedExpense.amount.toLocaleString()}</span>
              <div className="ml-3">
                <Trend value={processedTrend} label="vs. last month" />
              </div>
            </div>
          </div>
        </div>
        <div className="h-1 w-full bg-orange-500"></div>
      </Card>

      {/* Low Severity Card */}
      <Card className="overflow-hidden bg-white border border-transparent shadow-sm relative">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-yellow-50">
              <Clock className="h-5 w-5 text-yellow-500" />
            </div>
            <h3 className="text-gray-600 font-medium">Expense Posted</h3>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold text-gray-900">{postedExpense.count}</span>
            <div className="flex items-center mt-1.5 text-sm text-gray-600">
              <span>{currency} {postedExpense.amount.toLocaleString()}</span>
              <div className="ml-3">
                <Trend value={postedTrend} label="vs. last month" />
              </div>
            </div>
          </div>
        </div>
        <div className="h-1 w-full bg-yellow-500"></div>
      </Card>

      {/* Resolved Card */}
      <Card className="overflow-hidden bg-white border border-transparent shadow-sm relative">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-green-50">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 font-medium">Quick Create</h3>
          </div>
          <div className="mt-3">
            <Button 
              className="w-full justify-center text-white bg-blue-600 hover:bg-blue-700"
              onClick={() => window.location.href="/expenses/new"}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Expense
            </Button>
          </div>
        </div>
        <div className="h-1 w-full bg-green-500"></div>
      </Card>
    </motion.div>
  );
};

export default TopStatsCards;
