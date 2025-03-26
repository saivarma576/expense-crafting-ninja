import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, Search, Filter, Download, MoreVertical, ChevronDown, ChevronRight,
  ClipboardList, Clock, CheckCircle, Plus
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest';

const expenseData = [
  {
    id: 'exp-001',
    employee: {
      name: 'Cameron Williamson',
      email: 'cwilliamson@paturnpike.com',
      avatar: ''
    },
    expenseNumber: '4100067922',
    reference: '#75-598 - Rob\'s - PLYM - 12-21-20..',
    expenseDate: 'Jan 08, 2022',
    createdDate: 'Jan 12, 2022',
    amount: 64120.00,
    status: 'in-process'
  },
  {
    id: 'exp-002',
    employee: {
      name: 'Annette Black',
      email: 'ablack@paturnpike.com',
      avatar: ''
    },
    expenseNumber: '4100067922',
    reference: '#75-598 - Rob\'s - PLYM - 12-21-20..',
    expenseDate: 'Nov 27, 2021',
    createdDate: 'Jan 12, 2022',
    amount: 24120.00,
    status: 'in-process'
  },
  {
    id: 'exp-003',
    employee: {
      name: 'Kathryn Murphy',
      email: 'kmurphy@paturnpike.com',
      avatar: ''
    },
    expenseNumber: '4100067922',
    reference: '#75-598 - Rob\'s - PLYM - 12-21-20..',
    expenseDate: 'Nov 27, 2021',
    createdDate: 'Jan 12, 2022',
    amount: 14120.00,
    status: 'approved'
  },
  {
    id: 'exp-004',
    employee: {
      name: 'Brooklyn Simmons',
      email: 'bsimmons@paturnpike.com',
      avatar: ''
    },
    expenseNumber: '4100067922',
    reference: '#75-598 - Rob\'s - PLYM - 12-21-20..',
    expenseDate: 'Nov 27, 2021',
    createdDate: 'Jan 12, 2022',
    amount: 25020.00,
    status: 'rejected'
  },
  {
    id: 'exp-005',
    employee: {
      name: 'Kristin Watson',
      email: 'kwatson@paturnpike.com',
      avatar: ''
    },
    expenseNumber: '4100067922',
    reference: '#75-598 - Rob\'s - PLYM - 12-21-20..',
    expenseDate: 'Nov 27, 2021',
    createdDate: 'Jan 12, 2022',
    amount: 34100.00,
    status: 'approved'
  },
  {
    id: 'exp-006',
    employee: {
      name: 'Ronald Richards',
      email: 'rrichards@paturnpike.com',
      avatar: ''
    },
    expenseNumber: '4100067922',
    reference: '#75-598 - Rob\'s - PLYM - 12-21-20..',
    expenseDate: 'Nov 20, 2021',
    createdDate: 'Jan 12, 2022',
    amount: 42620.00,
    status: 'rejected'
  },
  {
    id: 'exp-007',
    employee: {
      name: 'Theresa Webb',
      email: 'twebb@paturnpike.com',
      avatar: ''
    },
    expenseNumber: '4100067922',
    reference: '#75-598 - Rob\'s - PLYM - 12-21-20..',
    expenseDate: 'Nov 20, 2021',
    createdDate: 'Jan 12, 2022',
    amount: 42620.00,
    status: 'collaborated'
  },
  {
    id: 'exp-008',
    employee: {
      name: 'Leslie Alexander',
      email: 'lalexander@paturnpike.com',
      avatar: ''
    },
    expenseNumber: '4100067922',
    reference: '#75-598 - Rob\'s - PLYM - 12-21-20..',
    expenseDate: 'Nov 20, 2021',
    createdDate: 'Jan 12, 2022',
    amount: 42620.00,
    status: 'approved'
  },
  {
    id: 'exp-009',
    employee: {
      name: 'Ralph Edwards',
      email: 'redwards@paturnpike.com',
      avatar: ''
    },
    expenseNumber: '4100067922',
    reference: '#75-598 - Rob\'s - PLYM - 12-21-20..',
    expenseDate: 'Nov 20, 2021',
    createdDate: 'Jan 12, 2022',
    amount: 42620.00,
    status: 'approved'
  }
];

const getStatusBadge = (status: string) => {
  const statusConfig = {
    'approved': { color: 'text-green-600', bg: 'bg-green-100', label: 'Approved' },
    'rejected': { color: 'text-red-600', bg: 'bg-red-100', label: 'Rejected' },
    'in-process': { color: 'text-amber-600', bg: 'bg-amber-100', label: 'In-Process' },
    'collaborated': { color: 'text-blue-600', bg: 'bg-blue-100', label: 'Collaborated' }
  };
  
  const config = statusConfig[status as keyof typeof statusConfig];
  
  return (
    <Badge 
      className={`font-medium rounded-md ${config.bg} ${config.color} border-none px-3`}
    >
      {config.label}
    </Badge>
  );
};

const getInitials = (name: string) => {
  const parts = name.split(' ');
  return parts.length > 1 
    ? `${parts[0][0]}${parts[1][0]}`
    : parts[0].substring(0, 2);
};

const Expenses: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchEmployee, setSearchEmployee] = useState('');
  const [expenseNumber, setExpenseNumber] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [activeTab, setActiveTab] = useState('my-expenses');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const filteredExpenses = expenseData.filter(expense => {
    const matchesEmployee = expense.employee.name.toLowerCase().includes(searchEmployee.toLowerCase()) || 
                           expense.employee.email.toLowerCase().includes(searchEmployee.toLowerCase());
    const matchesNumber = expense.expenseNumber.includes(expenseNumber);
    const matchesDate = expenseDate ? expense.expenseDate.includes(expenseDate) : true;
    const matchesStatus = statusFilter === 'all' ? true : expense.status === statusFilter;
    
    return matchesEmployee && matchesNumber && matchesDate && matchesStatus;
  });
  
  const resetFilters = () => {
    setSearchEmployee('');
    setExpenseNumber('');
    setExpenseDate('');
    setStatusFilter('all');
  };

  const handleExport = () => {
    console.log('Exporting expenses data...');
  };
  
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm border">
        <Tabs defaultValue="my-expenses" className="w-full">
          <div className="flex items-center justify-between border-b">
            <TabsList className="rounded-none border-b-0 p-0 h-auto bg-transparent">
              <TabsTrigger 
                value="my-expenses" 
                className="flex items-center gap-2 py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent rounded-none justify-start"
              >
                <FileText className="h-4 w-4" />
                <span>My Expenses</span>
              </TabsTrigger>
              <TabsTrigger 
                value="in-process" 
                className="flex items-center gap-2 py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent rounded-none justify-start"
              >
                <ClipboardList className="h-4 w-4" />
                <span>In Process</span>
              </TabsTrigger>
              <TabsTrigger 
                value="completed" 
                className="flex items-center gap-2 py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent rounded-none justify-start"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Completed</span>
              </TabsTrigger>
              <TabsTrigger 
                value="draft" 
                className="flex items-center gap-2 py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent rounded-none justify-start"
              >
                <Clock className="h-4 w-4" />
                <span>Draft</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-2 px-4">
              <Button
                onClick={() => navigate('/expenses/new')}
                variant="outline"
                size="sm"
                className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
              >
                <Plus className="h-4 w-4 mr-1" />
                New Expense
              </Button>
              
              <Button
                onClick={handleExport}
                variant="outline"
                size="sm"
                className="border-gray-200 text-gray-700 hover:bg-gray-100"
              >
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              
              <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-200 text-gray-700 hover:bg-gray-100"
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                    <ChevronRight className={`h-4 w-4 ml-1 transition-transform duration-200 ${isFilterOpen ? 'rotate-90' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
              </Collapsible>
            </div>
          </div>
          
          <TabsContent value="my-expenses" className="p-4">
            <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <CollapsibleContent>
                <div className="border rounded-md mb-4 bg-gray-50 overflow-hidden">
                  <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="searchEmployee">Search Employee</Label>
                        <div className="relative">
                          <Input
                            id="searchEmployee"
                            placeholder="Search Employee"
                            value={searchEmployee}
                            onChange={(e) => setSearchEmployee(e.target.value)}
                            className="pl-9 bg-white"
                          />
                          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="expenseNumber">Expense Number</Label>
                        <Input
                          id="expenseNumber"
                          placeholder="Expense Number"
                          value={expenseNumber}
                          onChange={(e) => setExpenseNumber(e.target.value)}
                          className="bg-white"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="expenseDate">Expense Date</Label>
                        <div className="relative">
                          <Input
                            id="expenseDate"
                            placeholder="Expense Date"
                            type="text" 
                            value={expenseDate}
                            onChange={(e) => setExpenseDate(e.target.value)}
                            className="bg-white"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="statusFilter">Select status</Label>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger id="statusFilter" className="bg-white">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                            <SelectItem value="in-process">In Process</SelectItem>
                            <SelectItem value="collaborated">Collaborated</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" onClick={resetFilters} className="bg-white">
                        Reset
                      </Button>
                      <Button className="bg-blue-700 text-white">
                        Search
                      </Button>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            {filteredExpenses.length > 0 ? (
              <div className="border rounded-md overflow-hidden bg-white">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="text-gray-600 font-medium">Employee</TableHead>
                      <TableHead className="text-gray-600 font-medium">Expense Number</TableHead>
                      <TableHead className="text-gray-600 font-medium">Expense Date</TableHead>
                      <TableHead className="text-gray-600 font-medium">
                        <div className="flex items-center">
                          Created Date <ChevronDown className="ml-1 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead className="text-gray-600 font-medium text-right">Amount</TableHead>
                      <TableHead className="text-gray-600 font-medium">Status</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExpenses.map((expense) => (
                      <TableRow 
                        key={expense.id}
                        className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
                        onClick={() => navigate(`/expenses/${expense.id}`)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="bg-gray-200 text-gray-600">
                                {getInitials(expense.employee.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{expense.employee.name}</div>
                              <div className="text-sm text-gray-500">{expense.employee.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-blue-600">{expense.expenseNumber}</div>
                          <div className="text-sm text-gray-500">{expense.reference}</div>
                        </TableCell>
                        <TableCell>{expense.expenseDate}</TableCell>
                        <TableCell>{expense.createdDate}</TableCell>
                        <TableCell className="text-right font-medium">
                          {expense.amount.toLocaleString('en-US', {
                            style: 'decimal',
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1
                          })} USD
                        </TableCell>
                        <TableCell>{getStatusBadge(expense.status)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={(e) => {
                            e.stopPropagation();
                          }}>
                            <MoreVertical className="h-5 w-5 text-gray-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 bg-white border rounded-md">
                <p className="text-gray-500">No Records Found!</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="in-process" className="p-4">
            <div className="text-center py-8 bg-white border rounded-md">
              <p className="text-gray-500">No Records Found!</p>
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="p-4">
            <div className="text-center py-8 bg-white border rounded-md">
              <p className="text-gray-500">No Records Found!</p>
            </div>
          </TabsContent>
          
          <TabsContent value="draft" className="p-4">
            <div className="text-center py-8 bg-white border rounded-md">
              <p className="text-gray-500">No Records Found!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Expenses;

