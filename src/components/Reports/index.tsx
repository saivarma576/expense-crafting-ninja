
import React from 'react';
import { 
  BarChart, Calendar, Download, PieChart, TrendingUp,
  ArrowRight, ListFilter
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart as RechartsBarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart as RechartsPieChart, Pie, Cell 
} from 'recharts';
import { cn } from '@/lib/utils';

const Reports: React.FC = () => {
  // Mock data for chart
  const monthlyData = [
    { name: 'Jan', value: 4200 },
    { name: 'Feb', value: 3800 },
    { name: 'Mar', value: 5100 },
    { name: 'Apr', value: 4700 },
    { name: 'May', value: 6200 },
    { name: 'Jun', value: 5800 },
    { name: 'Jul', value: 6900 },
    { name: 'Aug', value: 8100 },
    { name: 'Sep', value: 7400 },
    { name: 'Oct', value: 8700 },
    { name: 'Nov', value: 9400 },
    { name: 'Dec', value: 8900 }
  ];
  
  const categoryData = [
    { name: 'Airfare', value: 9850, color: '#3498db' },
    { name: 'Hotel', value: 7600, color: '#9b59b6' },
    { name: 'Meals', value: 4200, color: '#e74c3c' },
    { name: 'Transport', value: 2300, color: '#2ecc71' },
    { name: 'Car Rental', value: 1750, color: '#f39c12' },
    { name: 'Other', value: 1100, color: '#7f8c8d' }
  ];
  
  const deptData = [
    { name: 'Sales', value: 12500 },
    { name: 'Marketing', value: 8700 },
    { name: 'Engineering', value: 6200 },
    { name: 'HR', value: 2800 },
    { name: 'Operations', value: 5100 }
  ];
  
  const recentReports = [
    { id: 'rep-001', name: 'Q3 Expense Summary', type: 'quarterly', date: '2023-10-01' },
    { id: 'rep-002', name: 'Marketing Department Expenses', type: 'department', date: '2023-10-15' },
    { id: 'rep-003', name: 'Travel Expenses YTD', type: 'category', date: '2023-11-01' },
    { id: 'rep-004', name: 'Yearly Forecast', type: 'forecast', date: '2023-11-10' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Reports</h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-md border border-input hover:bg-accent transition-colors">
            <Calendar className="h-4 w-4" />
            <span>Q4 2023</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-medium">Expense Trend</h2>
              <p className="text-sm text-muted-foreground">Monthly expense distribution</p>
            </div>
            <button className="p-2 rounded-md hover:bg-muted transition-colors">
              <ListFilter className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  stroke="#94a3b8"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#94a3b8"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    border: 'none'
                  }}
                  formatter={(value) => [`$${value}`, 'Amount']}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="glass-card rounded-xl p-6">
          <div>
            <h2 className="text-lg font-medium">Expense by Category</h2>
            <p className="text-sm text-muted-foreground mb-4">Distribution across categories</p>
          </div>
          
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    border: 'none'
                  }}
                  formatter={(value) => [`$${value}`, 'Amount']}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-4">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center text-xs">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: category.color }}
                />
                <span className="truncate">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card rounded-xl p-6">
          <div className="mb-4">
            <h2 className="text-lg font-medium">Expenses by Department</h2>
            <p className="text-sm text-muted-foreground">Department breakdown</p>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={deptData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                barSize={24}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  stroke="#94a3b8"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#94a3b8"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    border: 'none'
                  }}
                  formatter={(value) => [`$${value}`, 'Amount']}
                />
                <Bar 
                  dataKey="value" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]} 
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
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
      </div>
    </div>
  );
};

export default Reports;
