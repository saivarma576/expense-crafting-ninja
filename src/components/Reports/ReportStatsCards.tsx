
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Clock, 
  XCircle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import StatCard from '../ui/StatCard';

interface StatsCardsProps {
  totalExpenses: number;
  totalReports: number;
  approvedReports: number;
  averageExpenseAmount: number;
}

// Sample mini chart data - in a real app, this would come from the backend
const miniChartData = [
  { name: 'Jan', value: 10 },
  { name: 'Feb', value: 15 },
  { name: 'Mar', value: 13 },
  { name: 'Apr', value: 17 },
  { name: 'May', value: 20 },
  { name: 'Jun', value: 19 },
];

const pendingChartData = [
  { name: 'Jan', value: 7 },
  { name: 'Feb', value: 9 },
  { name: 'Mar', value: 12 },
  { name: 'Apr', value: 10 },
  { name: 'May', value: 8 },
  { name: 'Jun', value: 11 },
];

const rejectedChartData = [
  { name: 'Jan', value: 3 },
  { name: 'Feb', value: 5 },
  { name: 'Mar', value: 4 },
  { name: 'Apr', value: 2 },
  { name: 'May', value: 6 },
  { name: 'Jun', value: 4 },
];

const paidChartData = [
  { name: 'Jan', value: 8 },
  { name: 'Feb', value: 12 },
  { name: 'Mar', value: 15 },
  { name: 'Apr', value: 14 },
  { name: 'May', value: 17 },
  { name: 'Jun', value: 19 },
];

const ReportStatsCards: React.FC<StatsCardsProps> = ({ 
  totalExpenses, 
  totalReports, 
  approvedReports, 
  averageExpenseAmount 
}) => {
  // This would ideally come from the backend in a real app
  const pendingCount = 12;
  const rejectedCount = 8;
  const paidCount = approvedReports;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Expenses Card */}
      <motion.div 
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        <Card className="h-full relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div className="z-10">
                <h3 className="text-gray-600 text-sm font-medium">Total Expenses</h3>
                <p className="text-2xl font-bold mt-2">${totalExpenses.toLocaleString()}</p>
                <p className="text-gray-600 text-xs mt-1">{totalReports} expenses</p>
              </div>
              <div className="bg-blue-100 h-10 w-10 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            
            <div className="flex justify-between items-end mt-2">
              <Badge className="bg-green-100 text-green-700 border-0 font-medium text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2%
              </Badge>
              
              <div className="h-10 w-24 absolute bottom-0 right-0 opacity-50">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={miniChartData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      fillOpacity={1} 
                      fill="url(#colorTotal)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Pending Approval Card */}
      <motion.div 
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        <Card className="h-full relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div className="z-10">
                <h3 className="text-gray-600 text-sm font-medium">Pending Approval</h3>
                <p className="text-2xl font-bold mt-2">${averageExpenseAmount.toLocaleString()}</p>
                <p className="text-gray-600 text-xs mt-1">{pendingCount} expenses</p>
              </div>
              <div className="bg-amber-100 h-10 w-10 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            
            <div className="flex justify-between items-end mt-2">
              <Badge className="bg-red-100 text-red-700 border-0 font-medium text-xs">
                <TrendingDown className="h-3 w-3 mr-1" />
                -3.5%
              </Badge>
              
              <div className="h-10 w-24 absolute bottom-0 right-0 opacity-50">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={pendingChartData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#f59e0b" 
                      fillOpacity={1} 
                      fill="url(#colorPending)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Rejected Expenses Card */}
      <motion.div 
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        <Card className="h-full relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div className="z-10">
                <h3 className="text-gray-600 text-sm font-medium">Rejected Expenses</h3>
                <p className="text-2xl font-bold mt-2">${(totalExpenses * 0.06).toLocaleString()}</p>
                <p className="text-gray-600 text-xs mt-1">{rejectedCount} expenses</p>
              </div>
              <div className="bg-red-100 h-10 w-10 rounded-lg flex items-center justify-center">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
            
            <div className="flex justify-between items-end mt-2">
              <Badge className="bg-green-100 text-green-700 border-0 font-medium text-xs">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2.8%
              </Badge>
              
              <div className="h-10 w-24 absolute bottom-0 right-0 opacity-50">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={rejectedChartData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRejected" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#ef4444" 
                      fillOpacity={1} 
                      fill="url(#colorRejected)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Paid Expenses Card */}
      <motion.div 
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        <Card className="h-full relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div className="z-10">
                <h3 className="text-gray-600 text-sm font-medium">Paid Expenses</h3>
                <p className="text-2xl font-bold mt-2">${approvedReports.toLocaleString()}</p>
                <p className="text-gray-600 text-xs mt-1">{paidCount} expenses</p>
              </div>
              <div className="bg-green-100 h-10 w-10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
            
            <div className="flex justify-between items-end mt-2">
              <Badge className="bg-green-100 text-green-700 border-0 font-medium text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5.6%
              </Badge>
              
              <div className="h-10 w-24 absolute bottom-0 right-0 opacity-50">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={paidChartData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#10b981" 
                      fillOpacity={1} 
                      fill="url(#colorPaid)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ReportStatsCards;
