
import React, { useState } from 'react';
import { Pencil, X, Calendar, Hash, DollarSign, User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ExpenseHeaderProps {
  title: string;
  setTitle: (title: string) => void;
  expenseNo: string;
  expenseDate: string;
  totalAmount: string;
  userName: string;
  userEmail: string;
}

const ExpenseHeader: React.FC<ExpenseHeaderProps> = ({
  title,
  setTitle,
  expenseNo,
  expenseDate,
  totalAmount,
  userName,
  userEmail
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingExpenseNo, setIsEditingExpenseNo] = useState(false);
  const [isEditingExpenseDate, setIsEditingExpenseDate] = useState(false);
  const [isEditingAmount, setIsEditingAmount] = useState(false);
  
  const [localExpenseNo, setLocalExpenseNo] = useState(expenseNo);
  const [localExpenseDate, setLocalExpenseDate] = useState(expenseDate);
  const [localAmount, setLocalAmount] = useState(totalAmount);
  
  return (
    <div className="mb-8 border-b pb-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex items-start gap-4">
          {isEditingTitle ? (
            <div className="flex items-center gap-2">
              <Input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-9 min-w-[300px] font-medium"
                autoFocus
              />
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => setIsEditingTitle(false)}
                className="h-8 w-8 text-gray-500"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 group">
              <h2 className="text-xl font-medium text-gray-800">{title}</h2>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => setIsEditingTitle(true)}
                className="h-7 w-7 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-500"
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
          
          <div className="flex items-center">
            <div className="h-9 w-9 bg-amber-100 rounded-full flex items-center justify-center text-xs font-medium">
              {userName.split(' ').map(name => name[0]).join('')}
            </div>
            <div className="ml-2">
              <div className="flex items-center text-sm font-medium">
                <User className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                {userName}
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Mail className="h-3 w-3 mr-1.5 text-gray-400" />
                {userEmail}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm self-start">
          <div className="flex items-center text-gray-500">
            <Hash className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
            Expense #
          </div>
          {isEditingExpenseNo ? (
            <div className="flex items-center">
              <Input 
                value={localExpenseNo}
                onChange={(e) => setLocalExpenseNo(e.target.value)}
                className="h-7 text-right text-sm"
                autoFocus
              />
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => setIsEditingExpenseNo(false)}
                className="h-7 w-7 text-gray-500 ml-1"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <div className="font-medium text-right group flex items-center justify-end">
              {localExpenseNo}
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => setIsEditingExpenseNo(true)}
                className="h-6 w-6 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-500 ml-1"
              >
                <Pencil className="h-3 w-3" />
              </Button>
            </div>
          )}
          
          <div className="flex items-center text-gray-500">
            <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
            Expense Date
          </div>
          {isEditingExpenseDate ? (
            <div className="flex items-center">
              <Input 
                value={localExpenseDate}
                onChange={(e) => setLocalExpenseDate(e.target.value)}
                className="h-7 text-right text-sm"
                autoFocus
              />
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => setIsEditingExpenseDate(false)}
                className="h-7 w-7 text-gray-500 ml-1"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <div className="font-medium text-right group flex items-center justify-end">
              {localExpenseDate}
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => setIsEditingExpenseDate(true)}
                className="h-6 w-6 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-500 ml-1"
              >
                <Pencil className="h-3 w-3" />
              </Button>
            </div>
          )}
          
          <div className="flex items-center text-gray-500">
            <DollarSign className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
            Amount
          </div>
          {isEditingAmount ? (
            <div className="flex items-center">
              <Input 
                value={localAmount}
                onChange={(e) => setLocalAmount(e.target.value)}
                className="h-7 text-right text-sm"
                autoFocus
              />
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => setIsEditingAmount(false)}
                className="h-7 w-7 text-gray-500 ml-1"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <div className="font-medium text-right group flex items-center justify-end">
              ${localAmount}
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => setIsEditingAmount(true)}
                className="h-6 w-6 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-500 ml-1"
              >
                <Pencil className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseHeader;
