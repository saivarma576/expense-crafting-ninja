
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  FileText, 
  CheckCircle, 
  BarChart4,
  TrendingUp
} from 'lucide-react';
import { motion } from "framer-motion";

interface StatsCardsProps {
  totalExpenses: number;
  totalReports: number;
  approvedReports: number;
  averageExpenseAmount: number;
}

const ReportStatsCards: React.FC<StatsCardsProps> = ({ 
  totalExpenses, 
  totalReports, 
  approvedReports, 
  averageExpenseAmount 
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <motion.div 
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="border-0 shadow-lg overflow-hidden relative bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-300/20 to-transparent" />
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 border border-blue-200">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span>12.5%</span>
              </Badge>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-blue-900">₹{totalExpenses.toLocaleString()}</h3>
              <p className="text-sm text-blue-700 mt-1 flex items-center">
                <BarChart4 className="h-3 w-3 mr-1" />
                Total Expenses (Q2)
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div 
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="border-0 shadow-lg overflow-hidden relative bg-gradient-to-br from-indigo-50 to-indigo-100">
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-indigo-300/20 to-transparent" />
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100 border border-indigo-200">
                <FileText className="h-5 w-5 text-indigo-600" />
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span>8.3%</span>
              </Badge>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-indigo-900">{totalReports}</h3>
              <p className="text-sm text-indigo-700 mt-1">Expense Reports</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div 
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="border-0 shadow-lg overflow-hidden relative bg-gradient-to-br from-emerald-50 to-emerald-100">
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-emerald-300/20 to-transparent" />
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-100 border border-emerald-200">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                82%
              </Badge>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-emerald-900">{approvedReports}</h3>
              <p className="text-sm text-emerald-700 mt-1">Approved Reports</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div 
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="border-0 shadow-lg overflow-hidden relative bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-purple-300/20 to-transparent" />
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 border border-purple-200">
                <BarChart4 className="h-5 w-5 text-purple-600" />
              </div>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                Avg
              </Badge>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-purple-900">₹{averageExpenseAmount.toLocaleString()}</h3>
              <p className="text-sm text-purple-700 mt-1">Avg. Expense Amount</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ReportStatsCards;
