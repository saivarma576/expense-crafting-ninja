
import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUp,
  ArrowDown,
  DollarSign,
  FileText,
  CheckCircle,
  PlusCircle,
  User,
  CreditCard
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
    <div className={cn(
      "inline-flex items-center text-xs font-medium",
      isPositive ? "text-green-500" : "text-red-500"
    )}>
      {isPositive ? (
        <ArrowUp className="h-3.5 w-3.5 mr-1" />
      ) : (
        <ArrowDown className="h-3.5 w-3.5 mr-1" />
      )}
      {isPositive ? "+" : ""}{value}%
    </div>
  );
};

const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
};

const TopStatsCards: React.FC<TopStatsCardsProps> = ({
  totalExpense,
  processedExpense,
  postedExpense,
  currency
}) => {
  // Sample trend percentages
  const receivedTrend = 16.24;
  const processedTrend = -3.57;
  const postedTrend = 29.08;
  const balanceTrend = 0.00;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-4 gap-4"
    >
      {/* Total Expenses Card */}
      <Card className="border bg-white shadow-sm">
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-medium text-gray-500 uppercase">TOTAL EARNINGS</p>
            <Trend value={receivedTrend} />
          </div>
          <p className="text-2xl font-bold mb-3">${(totalExpense.amount / 1000).toFixed(2)}K</p>
          <div className="flex justify-between items-center">
            <a href="#" className="text-sm text-blue-500 hover:underline">View net earnings</a>
            <div className="bg-green-100 p-2 rounded-md">
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>
      </Card>

      {/* Orders Card */}
      <Card className="border bg-white shadow-sm">
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-medium text-gray-500 uppercase">ORDERS</p>
            <Trend value={processedTrend} />
          </div>
          <p className="text-2xl font-bold mb-3">{processedExpense.count.toLocaleString()}</p>
          <div className="flex justify-between items-center">
            <a href="#" className="text-sm text-blue-500 hover:underline">View all orders</a>
            <div className="bg-blue-100 p-2 rounded-md">
              <FileText className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </div>
      </Card>

      {/* Customers Card */}
      <Card className="border bg-white shadow-sm">
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-medium text-gray-500 uppercase">CUSTOMERS</p>
            <Trend value={postedTrend} />
          </div>
          <p className="text-2xl font-bold mb-3">{(postedExpense.count * 1.5).toFixed(2)}M</p>
          <div className="flex justify-between items-center">
            <a href="#" className="text-sm text-blue-500 hover:underline">See details</a>
            <div className="bg-amber-100 p-2 rounded-md">
              <User className="h-5 w-5 text-amber-500" />
            </div>
          </div>
        </div>
      </Card>

      {/* My Balance Card */}
      <Card className="border bg-white shadow-sm">
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-medium text-gray-500 uppercase">MY BALANCE</p>
            <span className="text-xs font-medium text-gray-500">+{balanceTrend.toFixed(2)}%</span>
          </div>
          <p className="text-2xl font-bold mb-3">${(totalExpense.amount * 0.3).toFixed(2)}K</p>
          <div className="flex justify-between items-center">
            <a href="#" className="text-sm text-blue-500 hover:underline">Withdraw money</a>
            <div className="bg-blue-100 p-2 rounded-md">
              <CreditCard className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TopStatsCards;
