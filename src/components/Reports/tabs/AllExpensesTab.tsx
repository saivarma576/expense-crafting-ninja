
import React, { useState } from 'react';
import { List, Search, X } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ExpenseItem {
  id: string;
  employee: string;
  date: string;
  expenseNumber: string;
  amount: number;
  status: string;
}

interface AllExpensesTabProps {
  allExpensesData: ExpenseItem[];
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AllExpensesTab: React.FC<AllExpensesTabProps> = ({ 
  allExpensesData, 
  statusFilter, 
  setStatusFilter,
  searchQuery,
  setSearchQuery
}) => {
  // Filter expenses
  const filteredExpenses = allExpensesData.filter(expense => {
    // Apply status filter
    if (statusFilter !== 'all' && expense.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return expense.id.toLowerCase().includes(query) || 
             expense.employee.toLowerCase().includes(query) ||
             expense.expenseNumber.toLowerCase().includes(query);
    }
    
    return true;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <List className="h-5 w-5 text-primary" />
          <CardTitle>All Expenses</CardTitle>
        </div>
        <CardDescription>
          Comprehensive view of all expense transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by ID, employee or expense number..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon" onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
            }}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID#</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Expense Number</TableHead>
              <TableHead>Creation Date</TableHead>
              <TableHead className="text-right">Amount (₹)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.employee}</TableCell>
                  <TableCell>{expense.expenseNumber}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell className="text-right">{expense.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={
                      expense.status === 'Approved' ? 'success' : 
                      expense.status === 'Rejected' ? 'destructive' : 
                      'outline'
                    }>
                      {expense.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No expenses found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        {filteredExpenses.length > 0 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Showing {filteredExpenses.length} of {allExpensesData.length} expenses
            </p>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AllExpensesTab;
