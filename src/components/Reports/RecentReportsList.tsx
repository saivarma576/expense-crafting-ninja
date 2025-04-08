
import React from 'react';
import { ArrowRight, BarChart, PieChart, ListFilter, TrendingUp, Download } from 'lucide-react';

interface ReportItem {
  id: string;
  name: string;
  type: 'quarterly' | 'department' | 'category' | 'forecast';
  date: string;
}

interface RecentReportsListProps {
  recentReports: ReportItem[];
}

const RecentReportsList: React.FC<RecentReportsListProps> = ({ recentReports }) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="glass-card rounded-xl p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-medium">Recent Reports</h2>
          <button className="text-sm text-primary font-medium hover:text-primary/80 transition-colors animated-underline">
            View all reports
          </button>
        </div>
        
        <div className="space-y-3">
          {recentReports.map((report) => {
            const icon = (() => {
              switch (report.type) {
                case 'quarterly':
                  return <BarChart className="h-5 w-5 text-blue-500" />;
                case 'department':
                  return <PieChart className="h-5 w-5 text-purple-500" />;
                case 'category':
                  return <ListFilter className="h-5 w-5 text-red-500" />;
                case 'forecast':
                  return <TrendingUp className="h-5 w-5 text-green-500" />;
                default:
                  return <BarChart className="h-5 w-5 text-blue-500" />;
              }
            })();
            
            return (
              <div 
                key={report.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-muted mr-3">
                    {icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{report.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(report.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                <button className="p-2 rounded-md text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            );
          })}
        </div>
        
        <div className="mt-5 pt-5 border-t">
          <button className="w-full py-2.5 flex items-center justify-center text-primary font-medium hover:bg-primary/5 rounded-md transition-colors">
            <span>Generate Custom Report</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentReportsList;
