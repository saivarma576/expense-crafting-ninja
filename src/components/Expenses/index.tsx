
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Search, Filter, ArrowDownUp, MoreVertical, ChevronDown } from 'lucide-react';
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

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest';

// Mock data for the table
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
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [activeTab, setActiveTab] = useState('my-expenses');
  
  // Filter expenses based on search term
  const filteredExpenses = expenseData.filter(expense => 
    expense.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.expenseNumber.includes(searchTerm)
  );
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => navigate('/expenses/new')}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            Create New Request
          </Button>
        </div>
        
        <div className="flex gap-4 border-b">
          <button
            onClick={() => setActiveTab('my-expenses')}
            className={`px-4 py-2 font-medium ${activeTab === 'my-expenses' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'}`}
          >
            My Expenses <span className="ml-1 px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">26</span>
          </button>
          <button
            onClick={() => setActiveTab('drafts')}
            className={`px-4 py-2 font-medium ${activeTab === 'drafts' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'}`}
          >
            Drafts <span className="ml-1 px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs">12</span>
          </button>
          <button
            onClick={() => setActiveTab('receipts')}
            className={`px-4 py-2 font-medium ${activeTab === 'receipts' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'}`}
          >
            Receipts <span className="ml-1 px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">54</span>
          </button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search Invoice number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
          />
        </div>
        
        <div className="flex gap-2 items-center">
          <div className="text-sm text-gray-600">Applied Filters:</div>
          
          <Button
            variant="outline"
            className="h-10 flex items-center gap-2 border-gray-300"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md overflow-hidden">
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
                    // Handle menu click
                  }}>
                    <MoreVertical className="h-5 w-5 text-gray-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Expenses;
