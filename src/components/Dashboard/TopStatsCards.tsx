
import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Bell,
  Clock,
  CheckCircle,
  PlusCircle
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
      className="grid grid-cols-1 md:grid-cols-4 gap-4"
    >
      {/* Expense Received Card */}
      <Card className="rounded-lg border bg-gradient-to-br from-red-50 to-white border-red-100 shadow-sm">
        <div className="p-4 flex items-center gap-4">
          <div className="rounded-full bg-red-100 p-2 flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Expense Received</p>
            <p className="text-2xl font-semibold">{totalExpense.count}</p>
          </div>
        </div>
      </Card>

      {/* Expense Processed Card */}
      <Card className="rounded-lg border bg-gradient-to-br from-orange-50 to-white border-orange-100 shadow-sm">
        <div className="p-4 flex items-center gap-4">
          <div className="rounded-full bg-orange-100 p-2 flex-shrink-0">
            <Bell className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Expense Processed</p>
            <p className="text-2xl font-semibold">{processedExpense.count}</p>
          </div>
        </div>
      </Card>

      {/* Expense Posted Card */}
      <Card className="rounded-lg border bg-gradient-to-br from-yellow-50 to-white border-yellow-100 shadow-sm">
        <div className="p-4 flex items-center gap-4">
          <div className="rounded-full bg-yellow-100 p-2 flex-shrink-0">
            <Clock className="h-5 w-5 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Expense Posted</p>
            <p className="text-2xl font-semibold">{postedExpense.count}</p>
          </div>
        </div>
      </Card>

      {/* Quick Create Card */}
      <Card className="rounded-lg border bg-gradient-to-br from-green-50 to-white border-green-100 shadow-sm">
        <div className="p-4 flex items-center gap-4">
          <div className="rounded-full bg-green-100 p-2 flex-shrink-0">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Quick Create</p>
            <Button 
              className="mt-1 text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 h-auto text-sm"
              onClick={() => window.location.href="/expenses/new"}
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              Create Expense
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TopStatsCards;
