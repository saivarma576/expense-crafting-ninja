
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, FileText, Receipt } from 'lucide-react';
import StatCard from '../ui/StatCard';

interface TopStatsCardsProps {
  submittedExpenses: number;
  inReviewExpenses: number;
  reimbursedExpenses: number;
  currency: string;
}

const TopStatsCards: React.FC<TopStatsCardsProps> = ({
  submittedExpenses,
  inReviewExpenses,
  reimbursedExpenses,
  currency
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StatCard
          title="SUBMITTED EXPENSES"
          value={`${currency}${submittedExpenses.toLocaleString()}`}
          icon={<FileText className="h-5 w-5" />}
          className="h-full"
        >
          <a href="#" className="text-sm text-primary hover:underline mt-2 inline-block">
            See details
          </a>
        </StatCard>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <StatCard
          title="IN REVIEW EXPENSES"
          value={`${currency}${inReviewExpenses.toLocaleString()}`}
          icon={<Receipt className="h-5 w-5" />}
          className="h-full"
        >
          <a href="#" className="text-sm text-primary hover:underline mt-2 inline-block">
            See details
          </a>
        </StatCard>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="glass-card rounded-xl p-6 shadow-lg border border-primary/5 h-full">
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-medium text-muted-foreground uppercase">REIMBURSED EXPENSES</h3>
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-green-100/50 text-green-600">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
            <div className="font-semibold text-2xl my-2">{currency}{reimbursedExpenses.toLocaleString()}</div>
            <a href="#" className="text-sm text-primary hover:underline mt-1 inline-block">
              See details
            </a>
            <div className="mt-auto">
              <div className="flex flex-col gap-2 mt-4">
                <h4 className="text-sm font-medium">EXPENSE REPORTING</h4>
                <button className="flex items-center justify-center w-full gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  Create Expense Report
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-xs text-muted-foreground">
                  Quickly create expense reports for travel, meals & supplies
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TopStatsCards;
