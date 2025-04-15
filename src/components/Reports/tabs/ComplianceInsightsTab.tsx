
import React from 'react';
import { FileCheck, AlertTriangle, Clock, CalendarRange } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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

// Risk indicator component
const RiskIndicator = ({ risk }: { risk: string }) => {
  const getColorClass = () => {
    switch (risk) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded-full ${getColorClass()}`}></span>
      <span className="capitalize">{risk}</span>
    </div>
  );
};

const ComplianceInsightsTab: React.FC<ComplianceInsightsTabProps> = ({ complianceInsightsData }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-primary" />
          <CardTitle>Compliance Insights</CardTitle>
        </div>
        <CardDescription>
          Analysis of compliance patterns and expense management efficiency
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="bg-gray-200 p-1.5 rounded-full">
                  <FileCheck className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-green-600">82%</span>
              </div>
              <h3 className="mt-3 text-base font-semibold">Compliance Rate</h3>
              <p className="text-xs text-gray-500">Overall expense policy adherence</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="bg-gray-200 p-1.5 rounded-full">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-blue-600">2.4 days</span>
              </div>
              <h3 className="mt-3 text-base font-semibold">Avg. Processing Time</h3>
              <p className="text-xs text-gray-500">From submission to approval</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="bg-gray-200 p-1.5 rounded-full">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                </div>
                <span className="text-sm font-medium text-amber-600">₹32,900</span>
              </div>
              <h3 className="mt-3 text-base font-semibold">At-Risk Amount</h3>
              <p className="text-xs text-gray-500">Total non-compliant expenses</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="bg-gray-200 p-1.5 rounded-full">
                  <CalendarRange className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-purple-600">-15%</span>
              </div>
              <h3 className="mt-3 text-base font-semibold">Issue Trend</h3>
              <p className="text-xs text-gray-500">Vs previous quarter</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-4">
          <h3 className="text-base font-medium mb-3">Compliance Issue Categories</h3>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Issue Category</TableHead>
              <TableHead className="text-right">Count</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead className="text-right">Financial Impact (₹)</TableHead>
              <TableHead className="text-right">Trend vs Last Quarter</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {complianceInsightsData.map((issue, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{issue.category}</TableCell>
                <TableCell className="text-right">{issue.count}</TableCell>
                <TableCell>
                  <RiskIndicator risk={issue.risk} />
                </TableCell>
                <TableCell className="text-right">₹{issue.impact.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={issue.trend < 0 ? "success" : issue.trend > 0 ? "destructive" : "outline"}>
                    {issue.trend > 0 ? '+' : ''}{issue.trend}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-muted/50">
              <TableCell className="font-bold">Total</TableCell>
              <TableCell className="text-right font-bold">
                {complianceInsightsData.reduce((sum, item) => sum + item.count, 0)}
              </TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right font-bold">
                ₹{complianceInsightsData.reduce((sum, item) => sum + item.impact, 0).toLocaleString()}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <FileCheck className="h-4 w-4 text-blue-700" />
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
