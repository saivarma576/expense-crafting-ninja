
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: number;
  className?: string;
  children?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
  children
}) => {
  return (
    <motion.div 
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "glass-card p-6 rounded-xl flex flex-col space-y-2 border-b-4 border-primary/10 shadow-lg",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && (
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-semibold">{value}</div>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {typeof trend !== 'undefined' && (
          <div className={cn(
            "text-sm font-medium flex items-center p-1.5 rounded-full",
            trend > 0 ? "bg-green-50 text-green-600" : 
            trend < 0 ? "bg-red-50 text-red-600" : 
            "bg-gray-50 text-muted-foreground"
          )}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      {children}
    </motion.div>
  );
};

export default StatCard;
