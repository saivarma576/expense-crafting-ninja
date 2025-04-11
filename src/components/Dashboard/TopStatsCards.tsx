
import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUp,
  ArrowDown,
  DollarSign,
  FileText,
  Users,
  Wallet
} from 'lucide-react';
import { Card } from "@/components/ui/card";
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
      "flex items-center text-xs font-medium",
      isPositive ? "text-green-500" : "text-red-500"
    )}>
      {isPositive ? (
        <ArrowUp className="h-3.5 w-3.5 mr-1" />
      ) : (
        <ArrowDown className="h-3.5 w-3.5 mr-1" />
      )}
      <span>{isPositive ? "+" : "-"}{Math.abs(value).toFixed(2)}%</span>
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
      {/* Total Earnings Card */}
      <Card className="border bg-white shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-gray-500 uppercase">TOTAL EARNINGS</p>
            <Trend value={receivedTrend} />
          </div>
          
          <div className="flex items-end justify-between mt-4">
            <div>
              <h4 className="text-xl font-semibold mb-4">
                ${(totalExpense.amount / 1000).toFixed(2)}K
              </h4>
              <a href="#" className="text-sm text-blue-500 hover:underline">View net earnings</a>
            </div>
            <div className="flex-shrink-0">
              <div className="bg-green-100 p-3 rounded-md">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Orders Card */}
      <Card className="border bg-white shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-gray-500 uppercase">ORDERS</p>
            <Trend value={processedTrend} />
          </div>
          
          <div className="flex items-end justify-between mt-4">
            <div>
              <h4 className="text-xl font-semibold mb-4">
                {processedExpense.count.toLocaleString()}
              </h4>
              <a href="#" className="text-sm text-blue-500 hover:underline">View all orders</a>
            </div>
            <div className="flex-shrink-0">
              <div className="bg-blue-100 p-3 rounded-md">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Customers Card */}
      <Card className="border bg-white shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-gray-500 uppercase">CUSTOMERS</p>
            <Trend value={postedTrend} />
          </div>
          
          <div className="flex items-end justify-between mt-4">
            <div>
              <h4 className="text-xl font-semibold mb-4">
                {(postedExpense.count * 1.5).toFixed(2)}M
              </h4>
              <a href="#" className="text-sm text-blue-500 hover:underline">See details</a>
            </div>
            <div className="flex-shrink-0">
              <div className="bg-amber-100 p-3 rounded-md">
                <Users className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* My Balance Card */}
      <Card className="border bg-white shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-gray-500 uppercase">MY BALANCE</p>
            <div className="text-xs font-medium text-gray-500">
              +{balanceTrend.toFixed(2)}%
            </div>
          </div>
          
          <div className="flex items-end justify-between mt-4">
            <div>
              <h4 className="text-xl font-semibold mb-4">
                ${(totalExpense.amount * 0.3).toFixed(2)}K
              </h4>
              <a href="#" className="text-sm text-blue-500 hover:underline">Withdraw money</a>
            </div>
            <div className="flex-shrink-0">
              <div className="bg-blue-100 p-3 rounded-md">
                <Wallet className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TopStatsCards;
