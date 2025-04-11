
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { DollarSign, FileText, Receipt } from 'lucide-react';

interface StatCardProps {
  title: string;
  icon: string;
  amount: number;
  count: number;
  trend: number;
  currency?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  icon,
  amount,
  count,
  trend,
  currency = '$',
  className,
}) => {
  // Convert title to Title Case (capitalize first letter of each word)
  const formattedTitle = title
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  // Format the amount with a dollar sign
  const formattedAmount = `${currency}${amount.toLocaleString()}`;

  // Render the appropriate icon
  const renderIcon = () => {
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
    <motion.div 
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "glass-card p-6 rounded-xl flex flex-col space-y-4 border-b-4 border-primary/10 shadow-lg",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-muted-foreground">{formattedTitle}</h3>
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
          {renderIcon()}
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        <div className="text-2xl font-semibold">{formattedAmount}</div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{count} expenses</p>
          <div className={cn(
            "text-xs font-medium flex items-center px-2 py-1 rounded-full",
            trend > 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
          )}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
