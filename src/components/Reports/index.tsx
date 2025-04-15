
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar,
  Filter,
  Download,
  FileText,
  Receipt,
  CircleDollarSign,
  BookCheck,
  Clock,
  LineChart,
  FileSpreadsheet,
  BarChart4,
  BarChartHorizontal,
  Sparkles
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ExpenseSpendReports = [
  {
    id: 'monthly-summary',
    name: 'Monthly Expense Summary',
    description: 'Summary of all expenses by category',
    updated: '15 Apr 2025',
    icon: <FileText className="h-4 w-4" />
  },
  {
    id: 'category-analysis',
    name: 'Category Spend Analysis',
    description: 'Detailed breakdown by expense categories',
    updated: '10 Apr 2025',
    icon: <BarChartHorizontal className="h-4 w-4" />
  },
  {
    id: 'department-spend',
    name: 'Department Expense Report',
    description: 'Expense analysis by department/cost center',
    updated: '05 Apr 2025',
    icon: <CircleDollarSign className="h-4 w-4" />
  }
];

const ComplianceReports = [
  {
    id: 'policy-compliance',
    name: 'Policy Compliance Summary',
    description: 'Overview of policy violations and compliance status',
    updated: '13 Apr 2025',
    icon: <BookCheck className="h-4 w-4" />
  },
  {
    id: 'lodging-compliance',
    name: 'Lodging Compliance Report',
    description: 'Analysis of hotel rates vs. CONUS limits',
    updated: '11 Apr 2025',
    icon: <FileText className="h-4 w-4" />
  },
  {
    id: 'per-diem-compliance',
    name: 'Per Diem Compliance Status',
    description: 'Meals and incidentals rate compliance tracking',
    updated: '04 Apr 2025',
    icon: <FileText className="h-4 w-4" />
  }
];

const OperationalReports = [
  {
    id: 'approval-cycle',
    name: 'Approval Cycle Time Analysis',
    description: 'Track expense approval times and bottlenecks',
    updated: '12 Apr 2025',
    icon: <Clock className="h-4 w-4" />
  },
  {
    id: 'expense-volume',
    name: 'Expense Volume by Department',
    description: 'Track submission rates across departments',
    updated: '09 Apr 2025',
    icon: <BarChart4 className="h-4 w-4" />
  },
  {
    id: 'approval-metrics',
    name: 'Approval Workflow Metrics',
    description: 'Analyze approval patterns and rejection rates',
    updated: '06 Apr 2025',
    icon: <LineChart className="h-4 w-4" />
  }
];

const TravelReports = [
  {
    id: 'travel-spend',
    name: 'Travel Expense Analysis',
    description: 'Breakdown of airfare, lodging, and other travel costs',
    updated: '13 Apr 2025',
    icon: <FileText className="h-4 w-4" />
  },
  {
    id: 'mileage-report',
    name: 'Mileage Reimbursement Report',
    description: 'Summary of mileage claims and rate compliance',
    updated: '07 Apr 2025',
    icon: <FileText className="h-4 w-4" />
  },
  {
    id: 'per-diem-analysis',
    name: 'Per Diem Expense Analysis',
    description: 'Analysis of meal expenses against per diem rates',
    updated: '03 Apr 2025',
    icon: <FileText className="h-4 w-4" />
  }
];

const ScheduledReports = [
  {
    name: 'Weekly Expense Summary',
    frequency: 'Weekly',
    recipients: 'Finance Team',
    lastRun: '12 Apr 2025'
  },
  {
    name: 'Monthly Compliance Report',
    frequency: 'Monthly',
    recipients: 'Leadership Team',
    lastRun: '01 Apr 2025'
  },
  {
    name: 'Quarterly Expense Review',
    frequency: 'Quarterly',
    recipients: 'Executives',
    lastRun: '15 Mar 2025'
  },
  {
    name: 'Daily Approval Status',
    frequency: 'Daily',
    recipients: 'Expense Admins',
    lastRun: '15 Apr 2025'
  },
  {
    name: 'Department Budget Analysis',
    frequency: 'Monthly',
    recipients: 'Department Heads',
    lastRun: '01 Apr 2025'
  }
];

const ReportCard = ({ report, onDownload }: { report: any, onDownload: (id: string) => void }) => {
  return (
    <div className="flex items-start justify-between py-3 group">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-md bg-muted">
          {report.icon}
        </div>
        <div>
          <h3 className="font-medium text-sm">{report.name}</h3>
          <p className="text-xs text-muted-foreground">{report.description}</p>
          <p className="text-xs text-muted-foreground mt-1">Updated: {report.updated}</p>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        className="opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onDownload(report.id)}
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
};

const Reports: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState("this-month");
  
  const handleDownloadReport = (reportId: string) => {
    console.log(`Downloading report: ${reportId}`);
    // Implementation for downloading reports would go here
  };
  
  const handleRunReport = (reportName: string) => {
    console.log(`Running report: ${reportName}`);
    // Implementation for running scheduled reports would go here
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Reports</h1>
          <div className="flex items-center gap-2 mt-1">
            <Link to="/reports-v2">
              <Button 
                variant="outline" 
                className="flex items-center gap-1.5 border-dashed"
              >
                <Sparkles className="h-4 w-4 text-amber-500" />
                Try Modern Reports Dashboard
                <Badge variant="secondary" className="ml-2 text-xs">New</Badge>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="This Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="this-quarter">This Quarter</SelectItem>
              <SelectItem value="last-quarter">Last Quarter</SelectItem>
              <SelectItem value="year-to-date">Year to Date</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CircleDollarSign className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Expense Reports</CardTitle>
            </div>
            <CardDescription>
              Analyze expense spend across categories and departments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {ExpenseSpendReports.map((report) => (
                <React.Fragment key={report.id}>
                  <ReportCard report={report} onDownload={handleDownloadReport} />
                  <Separator className="my-2" />
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <BookCheck className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Compliance Reports</CardTitle>
            </div>
            <CardDescription>
              Monitor compliance with expense policies and regulations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {ComplianceReports.map((report) => (
                <React.Fragment key={report.id}>
                  <ReportCard report={report} onDownload={handleDownloadReport} />
                  <Separator className="my-2" />
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Operational Reports</CardTitle>
            </div>
            <CardDescription>
              Evaluate expense workflow performance and efficiency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {OperationalReports.map((report) => (
                <React.Fragment key={report.id}>
                  <ReportCard report={report} onDownload={handleDownloadReport} />
                  <Separator className="my-2" />
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Travel Reports</CardTitle>
            </div>
            <CardDescription>
              Analyze travel expenses, mileage, and per diem compliance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {TravelReports.map((report) => (
                <React.Fragment key={report.id}>
                  <ReportCard report={report} onDownload={handleDownloadReport} />
                  <Separator className="my-2" />
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Scheduled Reports</CardTitle>
          </div>
          <CardDescription>
            Reports that are automatically generated and sent
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Last Run</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ScheduledReports.map((report, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{report.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-muted">
                        {report.frequency}
                      </Badge>
                    </TableCell>
                    <TableCell>{report.recipients}</TableCell>
                    <TableCell>{report.lastRun}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-8 px-2 text-xs"
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          className="h-8 px-2 text-xs"
                          onClick={() => handleRunReport(report.name)}
                        >
                          Run Now
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
