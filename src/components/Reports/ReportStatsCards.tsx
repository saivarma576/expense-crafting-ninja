
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Clock, 
  FileText, 
  TrendingUp,
  TrendingDown,
  ArrowDownRight
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
      {/* Total Expenses Card */}
      <motion.div 
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="h-full">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <h3 className="text-gray-600 text-sm font-medium">Total Expenses</h3>
                <p className="text-2xl font-bold mt-2">${totalExpenses.toLocaleString()}</p>
                <p className="text-gray-600 text-xs mt-1">+8.2% from last month</p>
              </div>
              <div className="bg-blue-100 h-10 w-10 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-2">
              <Badge className="bg-green-100 text-green-700 border-0 font-medium text-xs">
                +8.2%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Pending Approval Card */}
      <motion.div 
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="h-full">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <h3 className="text-gray-600 text-sm font-medium">Pending Approval</h3>
                <p className="text-2xl font-bold mt-2">${averageExpenseAmount.toLocaleString()}</p>
                <p className="text-gray-600 text-xs mt-1">4 expenses</p>
              </div>
              <div className="bg-amber-100 h-10 w-10 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Receipts to Process Card */}
      <motion.div 
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="h-full">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <h3 className="text-gray-600 text-sm font-medium">Receipts to Process</h3>
                <p className="text-2xl font-bold mt-2">{totalReports}</p>
                <p className="text-gray-600 text-xs mt-1">Last updated 2h ago</p>
              </div>
              <div className="bg-indigo-100 h-10 w-10 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Reimbursed Card */}
      <motion.div 
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="h-full">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <h3 className="text-gray-600 text-sm font-medium">Reimbursed</h3>
                <p className="text-2xl font-bold mt-2">${approvedReports.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 h-10 w-10 rounded-lg flex items-center justify-center">
                <ArrowDownRight className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-2">
              <Badge className="bg-red-100 text-red-700 border-0 font-medium text-xs">
                -3.6%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ReportStatsCards;
