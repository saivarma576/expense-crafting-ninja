
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart4, Calendar, Download, FileText, Filter, Receipt } from 'lucide-react';
import StatCard from '../ui/StatCard';
import ExpenseTrendsChartV2 from './ExpenseTrendsChartV2';
import ExpenseTypeBreakdown from './ExpenseTypeBreakdown';
import ExpenseStatusChart from './ExpenseStatusChart';
import OverdueExpenses from './OverdueExpenses';
import { dashboardData } from './dashboardV2Data';
import { toast } from "sonner";

const DashboardV2: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('ALL');

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast.success("Dashboard loaded successfully");
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StatCard
            title="SUBMITTED EXPENSES"
            value={`$${dashboardData.submittedExpenses.toLocaleString()}`}
            icon={<FileText className="h-5 w-5" />}
            className="h-full"
          >
            <a href="#" className="text-sm text-primary hover:underline mt-2 inline-block">
              See details
            </a>
          </StatCard>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <StatCard
            title="IN REVIEW EXPENSES"
            value={`$${dashboardData.inReviewExpenses.toLocaleString()}`}
            icon={<Receipt className="h-5 w-5" />}
            className="h-full"
          >
            <a href="#" className="text-sm text-primary hover:underline mt-2 inline-block">
              See details
            </a>
          </StatCard>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="glass-card rounded-xl p-6 shadow-lg border border-primary/5 h-full">
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-medium text-muted-foreground uppercase">REIMBURSED EXPENSES</h3>
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-green-100/50 text-green-600">
                  <Calendar className="h-5 w-5" />
                </div>
              </div>
              <div className="font-semibold text-2xl my-2">${dashboardData.reimbursedExpenses.toLocaleString()}</div>
              <a href="#" className="text-sm text-primary hover:underline mt-1 inline-block">
                See details
              </a>
              <div className="mt-auto">
                <div className="flex flex-col gap-2 mt-4">
                  <h4 className="text-sm font-medium">EXPENSE REPORTING</h4>
                  <button className="flex items-center justify-center w-full gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                    Create Expense Report
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="text-xs text-muted-foreground">
                    Quickly create expense reports for travel, meals & supplies
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Middle Section - Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expense Trends Chart - 2/3 width */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card rounded-xl p-6 shadow-lg border border-primary/5"
          >
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">Expense Trends</h2>
                <div className="flex items-center gap-1 text-xs">
                  <button 
                    className={`px-3 py-1 rounded-md ${selectedPeriod === 'ALL' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted/50'}`}
                    onClick={() => setSelectedPeriod('ALL')}
                  >
                    ALL
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-md ${selectedPeriod === '1M' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted/50'}`}
                    onClick={() => setSelectedPeriod('1M')}
                  >
                    1M
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-md ${selectedPeriod === '6M' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted/50'}`}
                    onClick={() => setSelectedPeriod('6M')}
                  >
                    6M
                  </button>
                  <button 
                    className={`px-3 py-1 rounded-md ${selectedPeriod === '1Y' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted/50'}`}
                    onClick={() => setSelectedPeriod('1Y')}
                  >
                    1Y
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold">{dashboardData.stats.totalExpenses.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">Total Expenses</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold">{dashboardData.stats.travelExpenses.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">Travel Expenses</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold">{dashboardData.stats.mealExpenses.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">Meal Expenses</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold">{dashboardData.stats.suppliesExpenses.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">Office Supplies</span>
                </div>
              </div>

              <ExpenseTrendsChartV2 data={dashboardData.monthlyTrends} height={300} />
            </div>
          </motion.div>
        </div>

        {/* Expense Types Breakdown - 1/3 width */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card rounded-xl p-6 shadow-lg border border-primary/5"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Expenses Across Types</h2>
            <button className="text-xs text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <ExpenseTypeBreakdown data={dashboardData.expenseTypes} />
        </motion.div>
      </div>

      {/* Bottom Section - Tables and Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Expenses Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card rounded-xl p-6 shadow-lg border border-primary/5"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Latest Expenses</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">SORT BY:</span>
              <select className="text-xs border border-input rounded-md px-2 py-1">
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {dashboardData.latestExpenses.map((expense, index) => (
                  <tr key={index} className="border-b border-border/30 last:border-none">
                    <td className="py-4 pr-4 w-10 text-center">{expense.id}</td>
                    <td className="py-4 pr-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{expense.vendor}</span>
                        <span className="text-xs text-muted-foreground">Vendor</span>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{expense.reportNumber}</span>
                        <span className="text-xs text-muted-foreground">Report Number</span>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{expense.date}</span>
                        <span className="text-xs text-muted-foreground">Expense Date</span>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex flex-col">
                        <span className="font-medium">${expense.amount.toLocaleString()}</span>
                        <span className="text-xs text-muted-foreground">Amount</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="px-3 py-1 text-xs font-medium rounded-full text-green-700 bg-green-100 inline-block">
                        {expense.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-muted-foreground">Showing 5 of 25 Results</span>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 flex items-center justify-center border border-border rounded-md">
                &lt;
              </button>
              <button className="w-7 h-7 flex items-center justify-center border border-border rounded-md bg-muted">
                1
              </button>
              <button className="w-7 h-7 flex items-center justify-center border border-border rounded-md">
                2
              </button>
              <button className="w-7 h-7 flex items-center justify-center border border-border rounded-md">
                3
              </button>
              <button className="w-7 h-7 flex items-center justify-center border border-border rounded-md">
                &gt;
              </button>
            </div>
          </div>
        </motion.div>

        {/* Latest Reimbursements Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card rounded-xl p-6 shadow-lg border border-primary/5"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Latest Reimbursements</h2>
            <button className="flex items-center gap-1 px-3 py-1 border border-input rounded-md text-xs">
              Report <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {dashboardData.latestReimbursements.map((reimbursement, index) => (
                  <tr key={index} className="border-b border-border/30 last:border-none">
                    <td className="py-4 pr-4 w-10 text-center">{reimbursement.id}</td>
                    <td className="py-4 pr-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{reimbursement.employee}</span>
                        <span className="text-xs text-muted-foreground">Employee</span>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{reimbursement.paymentMethod}</span>
                        <span className="text-xs text-muted-foreground">Payment Method</span>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{reimbursement.referenceNumber}</span>
                        <span className="text-xs text-muted-foreground">Reference Number</span>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{reimbursement.date}</span>
                        <span className="text-xs text-muted-foreground">Payment Date</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex flex-col">
                        <span className="font-medium">${reimbursement.amount.toLocaleString()}</span>
                        <span className="text-xs text-muted-foreground">Amount</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-muted-foreground">Showing 5 of 25 Results</span>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 flex items-center justify-center border border-border rounded-md">
                &lt;
              </button>
              <button className="w-7 h-7 flex items-center justify-center border border-border rounded-md bg-muted">
                1
              </button>
              <button className="w-7 h-7 flex items-center justify-center border border-border rounded-md">
                2
              </button>
              <button className="w-7 h-7 flex items-center justify-center border border-border rounded-md">
                3
              </button>
              <button className="w-7 h-7 flex items-center justify-center border border-border rounded-md">
                &gt;
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Row - Status and Overdue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Status chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="glass-card rounded-xl p-6 shadow-lg border border-primary/5"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Expense Status</h2>
            <button className="flex items-center gap-1 px-3 py-1 border border-input rounded-md text-xs">
              Report <ArrowRight className="h-3 w-3" />
            </button>
          </div>
          <ExpenseStatusChart data={dashboardData.expenseStatusData} />
        </motion.div>

        {/* Overdue Expenses */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="glass-card rounded-xl p-6 shadow-lg border border-primary/5"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Pending Review Expenses</h2>
            <button className="flex items-center gap-1 text-xs text-orange-500">
              Review All <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <OverdueExpenses data={dashboardData.pendingReviewExpenses} />
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardV2;
