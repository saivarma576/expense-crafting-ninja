
import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUp, 
  ArrowDown, 
  DollarSign, 
  FileText, 
  Receipt,
  LucideIcon 
} from 'lucide-react';
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  icon: string;
  amount: number;
  count: number;
  trend: number;
  currency: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  icon,
  amount,
  count,
  trend,
  currency
}) => {
  // Format currency
  const formatCurrency = (amount: number) => {
    if (amount >= 1000) {
      return `$ ${(amount / 1000).toFixed(2)}K`;
    }
    return `$ ${amount.toFixed(2)}`;
  };

  // Get the appropriate icon
  const getIcon = () => {
    switch (icon) {
      case 'dollar-sign':
        return <DollarSign className="h-5 w-5" />;
      case 'file-text':
        return <FileText className="h-5 w-5" />;
      case 'receipt':
        return <Receipt className="h-5 w-5" />;
      default:
        return <DollarSign className="h-5 w-5" />;
    }
  };

  return (
    <div className="glass-card p-6 rounded-xl flex flex-col space-y-2 border-b-4 border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-muted-foreground uppercase">{title}</h3>
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
          {getIcon()}
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-semibold">{formatCurrency(amount)}</div>
          <p className="text-sm text-muted-foreground truncate">{count} expenses</p>
        </div>
        
        <div className={cn(
          "text-xs font-medium flex items-center p-1.5 rounded-full",
          trend > 0 
            ? "bg-green-50 text-green-600" 
            : "bg-red-50 text-red-600"
        )}>
          {trend > 0 ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
          {Math.abs(trend)}% vs last month
        </div>
      </div>
    </div>
  );
};

export default StatCard;
