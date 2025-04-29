
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight } from 'lucide-react';
import PieChartWithTotal from '@/components/Charts/PieChartWithTotal';

interface AppleExpenseOverviewProps {
  totalExpenses: number;
  totalReports: number;
  approvedReports: number;
  averageAmount: number;
}

const AppleExpenseOverview: React.FC<AppleExpenseOverviewProps> = ({
  totalExpenses,
  totalReports,
  approvedReports,
  averageAmount
}) => {
  // Data for pie chart
  const statusData = [
    { name: 'Approved', value: approvedReports, color: '#34C759' },
    { name: 'Pending', value: totalReports - approvedReports, color: '#FF9500' }
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Expenses Card */}
        <Card className="overflow-hidden border-none shadow-sm hover:shadow transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
              <span className="rounded-full bg-blue-100 p-1">
                <ArrowUpRight className="h-3 w-3 text-blue-600" />
              </span>
            </div>
            <p className="text-3xl font-semibold text-gray-900">
              ${totalExpenses.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              This Month
            </p>
          </CardContent>
        </Card>

        {/* Total Reports Card */}
        <Card className="overflow-hidden border-none shadow-sm hover:shadow transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Total Reports</h3>
              <span className="rounded-full bg-purple-100 p-1">
                <ArrowUpRight className="h-3 w-3 text-purple-600" />
              </span>
            </div>
            <p className="text-3xl font-semibold text-gray-900">
              {totalReports}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Submitted
            </p>
          </CardContent>
        </Card>

        {/* Approved Reports Card */}
        <Card className="overflow-hidden border-none shadow-sm hover:shadow transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Approved</h3>
              <span className="rounded-full bg-green-100 p-1">
                <ArrowUpRight className="h-3 w-3 text-green-600" />
              </span>
            </div>
            <p className="text-3xl font-semibold text-gray-900">
              {approvedReports}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {((approvedReports / totalReports) * 100).toFixed(1)}% approval rate
            </p>
          </CardContent>
        </Card>

        {/* Average Amount Card */}
        <Card className="overflow-hidden border-none shadow-sm hover:shadow transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Average Amount</h3>
              <span className="rounded-full bg-orange-100 p-1">
                <ArrowUpRight className="h-3 w-3 text-orange-600" />
              </span>
            </div>
            <p className="text-3xl font-semibold text-gray-900">
              ${averageAmount.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Per expense report
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden border-none shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Approval Status</h3>
            <div className="h-64 flex items-center justify-center">
              <PieChartWithTotal 
                data={statusData} 
                title={`${((approvedReports / totalReports) * 100).toFixed(0)}%`}
                subtitle="approved"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-none shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Reports by Department</h3>
            <div className="h-64 flex flex-col justify-center">
              {/* Horizontal bar chart visualization with department data */}
              <div className="space-y-4">
                {[
                  { dept: 'Marketing', value: 35, color: '#34C759' },
                  { dept: 'Sales', value: 28, color: '#007AFF' },
                  { dept: 'Engineering', value: 20, color: '#5856D6' },
                  { dept: 'Finance', value: 12, color: '#FF9500' },
                  { dept: 'HR', value: 5, color: '#FF2D55' }
                ].map(item => (
                  <div key={item.dept}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.dept}</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ width: `${item.value}%`, backgroundColor: item.color }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppleExpenseOverview;
