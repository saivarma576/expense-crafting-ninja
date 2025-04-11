
import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUp,
  ArrowDown,
  DollarSign,
  FileText,
  Receipt,
  PlusCircle,
  ChevronDown,
  FileText as FileText2,
  CreditCard
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
            <h3 className="text-sm font-medium text-muted-foreground uppercase">Total Expense</h3>
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-semibold">{formatCurrency(totalExpense.amount)}</div>
              <p className="text-sm text-muted-foreground">{totalExpense.count} expenses</p>
            </div>
            
            <div className={cn(
              "text-sm font-medium flex items-center p-1.5 rounded-full",
              totalTrend > 0 
                ? "bg-green-50 text-green-600" 
                : "bg-red-50 text-red-600"
            )}>
              {totalTrend > 0 ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
              {Math.abs(totalTrend)}% vs last month
            </div>
          </div>
        </div>

        {/* Processed Expense Card */}
        <div className="glass-card p-6 rounded-xl flex flex-col space-y-2 border-b-4 border-primary/10 shadow-lg">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-muted-foreground uppercase">Expense Processed</h3>
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-semibold">{formatCurrency(processedExpense.amount)}</div>
              <p className="text-sm text-muted-foreground">{processedExpense.count} expenses</p>
            </div>
            
            <div className={cn(
              "text-sm font-medium flex items-center p-1.5 rounded-full",
              processedTrend > 0 
                ? "bg-green-50 text-green-600" 
                : "bg-red-50 text-red-600"
            )}>
              {processedTrend > 0 ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
              {Math.abs(processedTrend)}% vs last month
            </div>
          </div>
        </div>

        {/* Posted Expense Card */}
        <div className="glass-card p-6 rounded-xl flex flex-col space-y-2 border-b-4 border-primary/10 shadow-lg">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-muted-foreground uppercase">Expense Posted</h3>
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <Receipt className="h-5 w-5" />
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-semibold">{formatCurrency(postedExpense.amount)}</div>
              <p className="text-sm text-muted-foreground">{postedExpense.count} expenses</p>
            </div>
            
            <div className={cn(
              "text-sm font-medium flex items-center p-1.5 rounded-full",
              postedTrend > 0 
                ? "bg-green-50 text-green-600" 
                : "bg-red-50 text-red-600"
            )}>
              {postedTrend > 0 ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
              {Math.abs(postedTrend)}% vs last month
            </div>
          </div>
        </div>

        {/* New Expense Card - Modern Design */}
        <div className="glass-card p-6 rounded-xl flex flex-col justify-between border border-gray-100 shadow-sm bg-white">
          <div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase">EXPENSE</h3>
          </div>
          
          <div className="mt-2">
            <DropdownMenu>
              <div className="flex">
                <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-none">
                  <Link to="/expenses/new" className="flex items-center">
                    Create Invoice
                  </Link>
                </Button>
                <DropdownMenuTrigger asChild>
                  <Button className="rounded-l-none px-2 bg-blue-500 hover:bg-blue-600 border-l border-blue-400">
                    <ChevronDown className="h-4 w-4 text-white" />
                  </Button>
                </DropdownMenuTrigger>
              </div>
              <DropdownMenuContent className="w-56 bg-white border shadow-lg">
                <DropdownMenuItem asChild>
                  <Link to="/expenses/new?type=po" className="flex items-center cursor-pointer">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>PO Invoice</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/expenses/new?type=npo" className="flex items-center cursor-pointer">
                    <FileText2 className="mr-2 h-4 w-4" />
                    <span>NPO Invoice</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/expenses/new?type=credit" className="flex items-center cursor-pointer">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Credit Memo</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <p className="mt-2 text-xs text-gray-500">
            Quickly create PO Invoice, NPO Invoice & Credit Memos.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TopStatsCards;
