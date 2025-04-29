
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface ApplePolicyViolationsProps {
  complianceData: any[];
}

const ApplePolicyViolations: React.FC<ApplePolicyViolationsProps> = ({ complianceData }) => {
  // Calculate compliance stats
  const totalItems = complianceData.reduce((sum, item) => sum + item.count, 0);
  const compliantItems = complianceData.filter(item => item.status === 'compliant')
    .reduce((sum, item) => sum + item.count, 0);
  const nonCompliantItems = totalItems - compliantItems;
  const complianceRate = (compliantItems / totalItems) * 100;
  
  // Sample policy violations data
  const violations = [
    {
      id: 1,
      type: 'Hotel Rate',
      description: 'Rate exceeds maximum allowed for Chicago',
      amount: 289.00,
      employee: 'J. Beard',
      severity: 'high'
    },
    {
      id: 2,
      type: 'Meal Expense',
      description: 'Amount exceeds per diem for breakfast',
      amount: 45.00,
      employee: 'T. Johnson',
      severity: 'medium'
    },
    {
      id: 3,
      type: 'Missing Receipt',
      description: 'Receipt not provided for expense over $75',
      amount: 120.00,
      employee: 'R. Smith',
      severity: 'high'
    },
    {
      id: 4,
      type: 'Booking Window',
      description: 'Air travel booked less than 14 days in advance',
      amount: 750.00,
      employee: 'A. Williams',
      severity: 'medium'
    }
  ];
  
  // Severity badge style
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge className="bg-red-100 text-red-600 hover:bg-red-100 border-none">High</Badge>;
      case 'medium':
        return <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100 border-none">Medium</Badge>;
      case 'low':
        return <Badge className="bg-yellow-100 text-yellow-600 hover:bg-yellow-100 border-none">Low</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100 border-none">Other</Badge>;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Policy Compliance Rate</h3>
          <div className="flex flex-col items-center justify-center h-48">
            <div className="relative flex items-center justify-center">
              <svg className="w-36 h-36">
                <circle
                  cx="72"
                  cy="72"
                  r="60"
                  fill="none"
                  stroke="#f1f1f1"
                  strokeWidth="12"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="60"
                  fill="none"
                  stroke={complianceRate >= 90 ? '#34C759' : complianceRate >= 70 ? '#FF9500' : '#FF3B30'}
                  strokeWidth="12"
                  strokeDasharray={`${complianceRate * 3.77} ${(100 - complianceRate) * 3.77}`}
                  strokeDashoffset={94.25}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold">{complianceRate.toFixed(0)}%</span>
                <span className="text-xs text-gray-500">Compliance</span>
              </div>
            </div>
            
            <div className="mt-6 w-full grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-2 rounded-lg bg-green-50">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-xs font-medium">Compliant</span>
                </div>
                <span className="text-sm font-bold mt-1">{compliantItems}</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg bg-red-50">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-xs font-medium">Violations</span>
                </div>
                <span className="text-sm font-bold mt-1">{nonCompliantItems}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2 border-none shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Top Policy Violations</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {violations.map((violation) => (
                  <tr key={violation.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm font-medium">{violation.type}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{violation.description}</td>
                    <td className="py-4 px-4 text-sm">{violation.employee}</td>
                    <td className="py-4 px-4 text-sm text-right font-medium">${violation.amount.toFixed(2)}</td>
                    <td className="py-4 px-4">{getSeverityBadge(violation.severity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6">
            <h4 className="text-xs font-medium text-gray-500 mb-2">Violation Categories</h4>
            <div className="space-y-3">
              {[
                { category: 'Missing Receipts', count: 12, percentage: 36 },
                { category: 'Rate Violations', count: 8, percentage: 24 },
                { category: 'Meal Expense Violations', count: 7, percentage: 21 },
                { category: 'Other Violations', count: 6, percentage: 18 }
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{item.category}</span>
                    <span>{item.count} ({item.percentage}%)</span>
                  </div>
                  <Progress value={item.percentage} className="h-1.5" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplePolicyViolations;
