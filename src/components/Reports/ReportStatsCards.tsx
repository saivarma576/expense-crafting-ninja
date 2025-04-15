
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
} from 'lucide-react';
import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { 
  Tooltip as UITooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface StatsCardsProps {
  totalExpenses: number;
  totalReports: number;
  approvedReports: number;
  averageExpenseAmount: number;
}

// Enhanced chart data with dates and expense counts
const miniChartData = [
  { name: 'Mon', value: 10, date: 'April 8', expenses: 12 },
  { name: 'Tue', value: 15, date: 'April 9', expenses: 15 },
  { name: 'Wed', value: 13, date: 'April 10', expenses: 13 },
  { name: 'Thu', value: 17, date: 'April 11', expenses: 18 },
  { name: 'Fri', value: 20, date: 'April 12', expenses: 22 },
  { name: 'Sat', value: 19, date: 'April 13', expenses: 20 },
  { name: 'Sun', value: 22, date: 'April 14', expenses: 24 },
];

const pendingChartData = [
  { name: 'Mon', value: 7, date: 'April 8', expenses: 8 },
  { name: 'Tue', value: 9, date: 'April 9', expenses: 10 },
  { name: 'Wed', value: 12, date: 'April 10', expenses: 13 },
  { name: 'Thu', value: 10, date: 'April 11', expenses: 11 },
  { name: 'Fri', value: 8, date: 'April 12', expenses: 9 },
  { name: 'Sat', value: 11, date: 'April 13', expenses: 12 },
  { name: 'Sun', value: 13, date: 'April 14', expenses: 14 },
];

const rejectedChartData = [
  { name: 'Mon', value: 3, date: 'April 8', expenses: 2 },
  { name: 'Tue', value: 5, date: 'April 9', expenses: 4 },
  { name: 'Wed', value: 4, date: 'April 10', expenses: 3 },
  { name: 'Thu', value: 2, date: 'April 11', expenses: 2 },
  { name: 'Fri', value: 6, date: 'April 12', expenses: 5 },
  { name: 'Sat', value: 4, date: 'April 13', expenses: 3 },
  { name: 'Sun', value: 5, date: 'April 14', expenses: 4 },
];

const paidChartData = [
  { name: 'Mon', value: 8, date: 'April 8', expenses: 9 },
  { name: 'Tue', value: 12, date: 'April 9', expenses: 13 },
  { name: 'Wed', value: 15, date: 'April 10', expenses: 16 },
  { name: 'Thu', value: 14, date: 'April 11', expenses: 15 },
  { name: 'Fri', value: 17, date: 'April 12', expenses: 18 },
  { name: 'Sat', value: 19, date: 'April 13', expenses: 20 },
  { name: 'Sun', value: 21, date: 'April 14', expenses: 22 },
];

// Custom tooltip component for the sparkline charts
const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded-md shadow-sm text-xs">
        <p className="font-medium">{payload[0].payload.date}</p>
        <p>{payload[0].payload.expenses} expenses</p>
      </div>
    );
  }
  return null;
};

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
              
              <div className="h-12 w-28 absolute bottom-0 right-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={miniChartData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      fillOpacity={1} 
                      fill="url(#colorTotal)"
                      isAnimationActive={true}
                      activeDot={{ r: 3, strokeWidth: 0 }}
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
              
              <div className="h-12 w-28 absolute bottom-0 right-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={pendingChartData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#f59e0b" 
                      fillOpacity={1} 
                      fill="url(#colorPending)" 
                      isAnimationActive={true}
                      activeDot={{ r: 3, strokeWidth: 0 }}
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
              
              <div className="h-12 w-28 absolute bottom-0 right-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={rejectedChartData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRejected" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#ef4444" 
                      fillOpacity={1} 
                      fill="url(#colorRejected)" 
                      isAnimationActive={true}
                      activeDot={{ r: 3, strokeWidth: 0 }}
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
              
              <div className="h-12 w-28 absolute bottom-0 right-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={paidChartData}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#10b981" 
                      fillOpacity={1} 
                      fill="url(#colorPaid)" 
                      isAnimationActive={true}
                      activeDot={{ r: 3, strokeWidth: 0 }}
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
