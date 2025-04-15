
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, FileText, FileCheck, Clock } from 'lucide-react';

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
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div className="p-2 rounded-full bg-white/80 shadow-sm">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">+12.5%</Badge>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-blue-900">₹{totalExpenses.toLocaleString()}</h3>
            <p className="text-sm text-blue-700 mt-1">Total Expenses (Q2)</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-indigo-100">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div className="p-2 rounded-full bg-white/80 shadow-sm">
              <FileText className="h-5 w-5 text-indigo-600" />
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">+8.3%</Badge>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-indigo-900">{totalReports}</h3>
            <p className="text-sm text-indigo-700 mt-1">Expense Reports</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div className="p-2 rounded-full bg-white/80 shadow-sm">
              <FileCheck className="h-5 w-5 text-emerald-600" />
            </div>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">82%</Badge>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-emerald-900">{approvedReports}</h3>
            <p className="text-sm text-emerald-700 mt-1">Approved Reports</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div className="p-2 rounded-full bg-white/80 shadow-sm">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">18 hrs</Badge>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-purple-900">₹{averageExpenseAmount.toLocaleString()}</h3>
            <p className="text-sm text-purple-700 mt-1">Avg. Expense Amount</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportStatsCards;
