
import React from 'react';
import { FileCheck, AlertTriangle, Clock, CalendarRange, Info, TrendingDown, ArrowUp, ArrowDown } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface ComplianceInsight {
  category: string;
  count: number;
  trend: number;
  risk: string;
  impact: number;
  status?: string;
}

interface ComplianceInsightsTabProps {
  complianceInsightsData: ComplianceInsight[];
}

// Risk indicator component with softer colors
const RiskIndicator = ({ risk }: { risk: string }) => {
  const getClasses = () => {
    switch (risk) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  
  return (
    <Badge variant="outline" className={`${getClasses()} border`}>
      <span className="capitalize">{risk}</span>
    </Badge>
  );
};

// Trend indicator with softer colors and icons
const TrendIndicator = ({ trend }: { trend: number }) => {
  if (trend === 0) return <span className="text-gray-500">0%</span>;
  
  const isPositive = trend > 0;
  return (
    <div className="flex items-center gap-1">
      {isPositive ? (
        <ArrowUp className="h-4 w-4 text-red-500" />
      ) : (
        <ArrowDown className="h-4 w-4 text-green-500" />
      )}
      <span className={isPositive ? 'text-red-600' : 'text-green-600'}>
        {isPositive ? '+' : ''}{trend}%
      </span>
    </div>
  );
};

const ComplianceInsightsTab: React.FC<ComplianceInsightsTabProps> = ({ complianceInsightsData }) => {
  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-primary" />
          <CardTitle>Compliance Insights</CardTitle>
        </div>
        <CardDescription>
          Analysis of compliance patterns and expense management efficiency
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-5 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-gray-50 to-white border shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="bg-green-50 p-1.5 rounded-full">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-green-600">82%</span>
                        <Info className="h-3 w-3 text-gray-400" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Percentage of expenses that comply with company policy</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <h3 className="mt-2 text-base font-semibold">Compliance Rate</h3>
              <p className="text-xs text-gray-500">Overall expense policy adherence</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-50 to-white border shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="bg-blue-50 p-1.5 rounded-full">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-blue-600">2.4 days</span>
                        <Info className="h-3 w-3 text-gray-400" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Average time from expense submission to approval</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <h3 className="mt-2 text-base font-semibold">Avg. Processing Time</h3>
              <p className="text-xs text-gray-500">From submission to approval</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-50 to-white border shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="bg-amber-50 p-1.5 rounded-full">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-amber-600">₹32,900</span>
                        <Info className="h-3 w-3 text-gray-400" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Total amount of expenses flagged as non-compliant</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <h3 className="mt-2 text-base font-semibold">At-Risk Amount</h3>
              <p className="text-xs text-gray-500">Total non-compliant expenses</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-50 to-white border shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="bg-purple-50 p-1.5 rounded-full">
                  <TrendingDown className="h-4 w-4 text-purple-600" />
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-green-600">-15%</span>
                        <Info className="h-3 w-3 text-gray-400" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Change in compliance issues compared to previous quarter</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <h3 className="mt-2 text-base font-semibold">Issue Trend</h3>
              <p className="text-xs text-gray-500">Vs previous quarter</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-3">
          <h3 className="text-base font-medium mb-2">Compliance Issue Categories</h3>
        </div>
        
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50 sticky top-0 z-10">
              <TableRow>
                <TableHead className="font-medium">Issue Category</TableHead>
                <TableHead className="text-right font-medium">Count</TableHead>
                <TableHead className="font-medium">Risk Level</TableHead>
                <TableHead className="text-right font-medium">Financial Impact (₹)</TableHead>
                <TableHead className="text-right font-medium">Trend vs Last Quarter</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complianceInsightsData.map((issue, index) => (
                <TableRow key={index} className={index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}>
                  <TableCell className="font-medium py-2.5">{issue.category}</TableCell>
                  <TableCell className="text-right py-2.5">{issue.count}</TableCell>
                  <TableCell className="py-2.5">
                    <RiskIndicator risk={issue.risk} />
                  </TableCell>
                  <TableCell className="text-right py-2.5">₹{issue.impact.toLocaleString()}</TableCell>
                  <TableCell className="text-right py-2.5">
                    <TrendIndicator trend={issue.trend} />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-100 border-t border-gray-200">
                <TableCell className="font-bold py-2.5">Total</TableCell>
                <TableCell className="text-right font-bold py-2.5">
                  {complianceInsightsData.reduce((sum, item) => sum + item.count, 0)}
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right font-bold py-2.5">
                  ₹{complianceInsightsData.reduce((sum, item) => sum + item.impact, 0).toLocaleString()}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-5 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
              <Info className="h-4 w-4 text-blue-700" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">Recommendation</h4>
              <p className="text-xs text-blue-700">
                Focus on reducing missing receipts and late submissions through automated reminders. 
                Consider updating expense limits for travel categories based on current market rates.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplianceInsightsTab;
