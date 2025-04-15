
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ExpenseItem {
  id: string;
  expenseNumber: string;
  employee: string;
  date: string;
  type: string;
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
  // Filter expenses based on status and search query
  const filteredExpenses = allExpensesData.filter(expense => {
    const matchesStatus = statusFilter === 'all' || expense.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = 
      expense.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.expenseNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
  
  // Format status for display
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-700 border-0">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-700 border-0">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-700 border-0">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>All Expenses</CardTitle>
            <CardDescription>
              Complete list of expense entries for the selected period
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search expense..."
                className="pl-8 w-[200px] md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID#</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Expense Number</TableHead>
              <TableHead>Creation Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
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
                  <TableCell className="text-right">${expense.amount.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(expense.status)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No matching expenses found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AllExpensesTab;
