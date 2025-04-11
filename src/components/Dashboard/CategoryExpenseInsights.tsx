
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';

interface CategoryInsight {
  category: string;
  amount: number;
  trend: number; // percentage change
  color?: string;
}

interface CategoryExpenseInsightsProps {
  topCategories: CategoryInsight[];
  fastestGrowing: CategoryInsight[];
  currency?: string;
}

const CategoryExpenseInsights: React.FC<CategoryExpenseInsightsProps> = ({
  topCategories,
  fastestGrowing,
  currency = "$"
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Top Expense Categories */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-xl p-6 shadow-lg border border-primary/5"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Top Expense Categories</h2>
          <button className="flex items-center gap-1 text-xs text-primary">
            View All <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        <div className="space-y-4">
          {topCategories.map((category, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-sm" 
                  style={{ backgroundColor: category.color || '#3b82f6' }}
                ></div>
                <span className="font-medium">{category.category}</span>
              </div>
              <div className="text-right">
                <div className="font-medium">{currency} {category.amount.toLocaleString()}</div>
                <div className={`text-xs flex items-center ${
                  category.trend > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {category.trend > 0 ? (
                    <ArrowUp className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(category.trend)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Fastest Growing Categories */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card rounded-xl p-6 shadow-lg border border-primary/5"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Fastest Growing Categories</h2>
          <button className="flex items-center gap-1 text-xs text-primary">
            View All <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        <div className="space-y-4">
          {fastestGrowing.map((category, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-sm" 
                  style={{ backgroundColor: category.color || '#3b82f6' }}
                ></div>
                <span className="font-medium">{category.category}</span>
              </div>
              <div className="text-right">
                <div className="font-medium">{currency} {category.amount.toLocaleString()}</div>
                <div className="text-xs flex items-center text-green-600">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  {category.trend}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CategoryExpenseInsights;
