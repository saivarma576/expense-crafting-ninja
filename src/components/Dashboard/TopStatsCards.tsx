
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
  Upload,
  FilePlus
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
  const draftTrend = 3;

  // Format currency
  const formatCurrency = (amount: number) => {
    if (amount >= 1000) {
      return `$ ${(amount / 1000).toFixed(2)}K`;
    }
    return `$ ${amount.toFixed(2)}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Expense Card */}
        <div className="glass-card p-6 rounded-xl flex flex-col space-y-2 border-b-4 border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-muted-foreground uppercase">Total Expense</h3>
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-semibold">{formatCurrency(totalExpense.amount)}</div>
              <p className="text-sm text-muted-foreground truncate">{totalExpense.count} expenses</p>
            </div>
            
            <div className={cn(
              "text-xs font-medium flex items-center p-1.5 rounded-full",
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
        <div className="glass-card p-6 rounded-xl flex flex-col space-y-2 border-b-4 border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-muted-foreground uppercase">Expense Processed</h3>
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-semibold">{formatCurrency(processedExpense.amount)}</div>
              <p className="text-sm text-muted-foreground truncate">{processedExpense.count} expenses</p>
            </div>
            
            <div className={cn(
              "text-xs font-medium flex items-center p-1.5 rounded-full",
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
        <div className="glass-card p-6 rounded-xl flex flex-col space-y-2 border-b-4 border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-muted-foreground uppercase">Expense Posted</h3>
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <Receipt className="h-5 w-5" />
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              <div className="text-2xl font-semibold">{formatCurrency(postedExpense.amount)}</div>
              <p className="text-sm text-muted-foreground truncate">{postedExpense.count} expenses</p>
            </div>
            
            <div className={cn(
              "text-xs font-medium flex items-center p-1.5 rounded-full",
              postedTrend > 0 
                ? "bg-green-50 text-green-600" 
                : "bg-red-50 text-red-600"
            )}>
              {postedTrend > 0 ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
              {Math.abs(postedTrend)}% vs last month
            </div>
          </div>
        </div>

        {/* Expense Actions Card - Redesigned */}
        <div className="glass-card p-6 rounded-xl flex flex-col space-y-2 border-b-4 border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-muted-foreground uppercase">Expense Actions</h3>
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
              <FilePlus className="h-5 w-5" />
            </div>
          </div>
          
          <div className="flex flex-col space-y-3">
            <DropdownMenu>
              <div className="flex w-full">
                <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-none flex-grow text-sm">
                  <Link to="/expenses/new" className="flex items-center justify-center">
                    <PlusCircle className="mr-1.5 h-4 w-4" />
                    Create Expense
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
                  <Link to="/expenses/new" className="flex items-center cursor-pointer text-sm">
                    <FilePlus className="mr-2 h-4 w-4" />
                    <span>Create Expense</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/receipts/upload" className="flex items-center cursor-pointer text-sm">
                    <Upload className="mr-2 h-4 w-4" />
                    <span>Upload Receipt to Buffer</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Receipt className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm font-medium">12 Drafts</span>
              </div>
              <div className="text-xs font-medium flex items-center text-green-600">
                <ArrowUp className="mr-1 h-3 w-3" />
                <span>+{draftTrend} vs last month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopStatsCards;
