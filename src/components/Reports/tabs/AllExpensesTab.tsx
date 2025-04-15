
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter expenses based on status and search query
  const filteredExpenses = allExpensesData.filter(expense => {
    const matchesStatus = statusFilter === 'all' || expense.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = 
      expense.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.expenseNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // Format date to "26 Apr, 2025" pattern
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).replace(/\s/g, ' ');
  };
  
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
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">ID#</TableHead>
                <TableHead className="font-semibold">Employee</TableHead>
                <TableHead className="font-semibold">Expense Number</TableHead>
                <TableHead className="font-semibold">Creation Date</TableHead>
                <TableHead className="font-semibold text-right">Amount</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedExpenses.length > 0 ? (
                paginatedExpenses.map((expense) => (
                  <TableRow key={expense.id} className="hover:bg-muted/20">
                    <TableCell className="font-medium">{expense.id}</TableCell>
                    <TableCell>{expense.employee}</TableCell>
                    <TableCell>{expense.expenseNumber}</TableCell>
                    <TableCell>{formatDate(expense.date)}</TableCell>
                    <TableCell className="text-right">${expense.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}</TableCell>
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
        </div>
        
        {filteredExpenses.length > itemsPerPage && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {/* Show first page */}
                <PaginationItem>
                  <PaginationLink 
                    isActive={currentPage === 1} 
                    onClick={() => setCurrentPage(1)}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                
                {/* Show ellipsis if needed */}
                {currentPage > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                
                {/* Show current page neighborhood */}
                {currentPage > 2 && (
                  <PaginationItem>
                    <PaginationLink onClick={() => setCurrentPage(currentPage - 1)}>
                      {currentPage - 1}
                    </PaginationLink>
                  </PaginationItem>
                )}
                
                {currentPage !== 1 && currentPage !== totalPages && (
                  <PaginationItem>
                    <PaginationLink isActive={true}>
                      {currentPage}
                    </PaginationLink>
                  </PaginationItem>
                )}
                
                {currentPage < totalPages - 1 && (
                  <PaginationItem>
                    <PaginationLink onClick={() => setCurrentPage(currentPage + 1)}>
                      {currentPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}
                
                {/* Show ellipsis if needed */}
                {currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                
                {/* Show last page if not already shown */}
                {totalPages > 1 && (
                  <PaginationItem>
                    <PaginationLink 
                      isActive={currentPage === totalPages} 
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AllExpensesTab;
