
import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Bell,
  Clock,
  CheckCircle,
  PlusCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  CircleCheck
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
  label?: string;
}

const Trend: React.FC<TrendProps> = ({ value, label }) => {
  const isPositive = value >= 0;
  return (
    <div className="inline-flex items-center text-xs font-medium">
      <span className={cn(
        "flex items-center gap-1",
        isPositive ? "text-green-600" : "text-red-600"
      )}>
        {isPositive ? (
          <TrendingUp className="h-3.5 w-3.5" />
        ) : (
          <TrendingDown className="h-3.5 w-3.5" />
        )}
        {Math.abs(value)}%
      </span>
    </div>
  );
};

const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
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
      className="grid grid-cols-1 md:grid-cols-4 gap-4"
    >
      {/* Expense Received Card */}
      <Card className="rounded-lg border bg-gradient-to-br from-blue-50 to-white border-blue-100 shadow-sm relative overflow-hidden">
        <div className="p-4">
          <div className="absolute top-4 right-4 rounded-full bg-blue-500 p-3">
            <DollarSign className="h-5 w-5 text-white" />
          </div>
          <div className="pr-14">
            <p className="text-sm font-medium text-blue-600 uppercase mb-1">Expense Received</p>
            <div className="flex flex-col">
              <p className="text-2xl font-bold text-blue-700">
                {currency} {totalExpense.amount.toLocaleString()}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-600">{totalExpense.count} Expenses</p>
                <Trend value={receivedTrend} />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Expense Processed Card */}
      <Card className="rounded-lg border bg-gradient-to-br from-green-50 to-white border-green-100 shadow-sm relative overflow-hidden">
        <div className="p-4">
          <div className="absolute top-4 right-4 rounded-full bg-green-500 p-3">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div className="pr-14">
            <p className="text-sm font-medium text-green-600 uppercase mb-1">Expense Processed</p>
            <div className="flex flex-col">
              <p className="text-2xl font-bold text-green-700">
                {currency} {processedExpense.amount.toLocaleString()}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-600">{processedExpense.count} Expenses</p>
                <Trend value={processedTrend} />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Expense Posted Card */}
      <Card className="rounded-lg border bg-gradient-to-br from-purple-50 to-white border-purple-100 shadow-sm relative overflow-hidden">
        <div className="p-4">
          <div className="absolute top-4 right-4 rounded-full bg-purple-500 p-3">
            <CheckCircle className="h-5 w-5 text-white" />
          </div>
          <div className="pr-14">
            <p className="text-sm font-medium text-purple-600 uppercase mb-1">Expense Posted</p>
            <div className="flex flex-col">
              <p className="text-2xl font-bold text-purple-700">
                {currency} {postedExpense.amount.toLocaleString()}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-600">{postedExpense.count} Expenses</p>
                <Trend value={postedTrend} />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Create Card */}
      <Card className="rounded-lg border bg-white shadow-sm relative overflow-hidden">
        <div className="p-4">
          <div className="absolute top-4 right-4 rounded-full bg-blue-500 p-3">
            <PlusCircle className="h-5 w-5 text-white" />
          </div>
          <div className="pr-14">
            <p className="text-lg font-medium text-gray-800 mb-2">Quick Create</p>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2"
              onClick={() => window.location.href="/expenses/new"}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Expense
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TopStatsCards;
