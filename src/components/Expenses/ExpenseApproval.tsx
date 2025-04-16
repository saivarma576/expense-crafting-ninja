
import React, { useState } from 'react';
import { X, UserPlus, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type ApproverLevel = {
  id: string;
  name: string;
  email: string;
  role?: string;
  level: number;
};

const mockApproverOptions = [
  { id: '1', name: 'Sarah Wright', email: 'sarah.wright@example.com', role: 'Engineering Manager' },
  { id: '2', name: 'Michael Chen', email: 'michael.chen@example.com', role: 'Finance Director' },
  { id: '3', name: 'Emma Davis', email: 'emma.davis@example.com', role: 'HR Manager' },
  { id: '4', name: 'James Wilson', email: 'james.wilson@example.com', role: 'Project Manager' },
  { id: '5', name: 'Olivia Taylor', email: 'olivia.taylor@example.com', role: 'Department Head' },
  { id: '6', name: 'Benjamin Lee', email: 'benjamin.lee@example.com', role: 'VP Operations' },
  { id: '7', name: 'Sophia Martin', email: 'sophia.martin@example.com', role: 'Team Lead' },
  { id: '8', name: 'William Brown', email: 'william.brown@example.com', role: 'Finance Manager' },
];

export const ExpenseApproval: React.FC = () => {
  const [approvers, setApprovers] = useState<ApproverLevel[]>([]);
  const [open, setOpen] = useState<Record<number, boolean>>({});
  
  const MAX_APPROVERS = 3;
  
  const handleAddApprover = (option: typeof mockApproverOptions[0], level: number) => {
    const newApprover = { ...option, level };
    setApprovers(prev => [...prev.filter(a => a.level !== level), newApprover]);
    setOpen({ ...open, [level]: false });
  };
  
  const handleRemoveApprover = (level: number) => {
    setApprovers(prev => prev.filter(a => a.level !== level));
  };
  
  const getLevelLabel = (level: number) => {
    switch (level) {
      case 1: return "First Approver";
      case 2: return "Second Approver";
      case 3: return "Final Approver";
      default: return `Approver ${level}`;
    }
  };
  
  const getApproverForLevel = (level: number) => {
    return approvers.find(a => a.level === level);
  };
  
  const renderApproverLevel = (level: number) => {
    const approver = getApproverForLevel(level);
    
    return (
      <div key={`level-${level}`} className="mb-3">
        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-700 mb-1">
            {getLevelLabel(level)}
          </label>
          
          {approver ? (
            <div className="flex items-center bg-gray-50 rounded-md border p-2">
              <div className="flex-1">
                <p className="text-sm font-medium">{approver.name}</p>
                <p className="text-xs text-gray-500">{approver.email}</p>
                {approver.role && <p className="text-xs text-gray-500">{approver.role}</p>}
              </div>
              <button 
                onClick={() => handleRemoveApprover(level)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition-colors"
                aria-label={`Remove ${approver.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Popover open={open[level]} onOpenChange={(isOpen) => setOpen({ ...open, [level]: isOpen })}>
              <PopoverTrigger asChild>
                <button 
                  className="flex items-center gap-2 text-blue-600 rounded-md border border-gray-300 p-2 text-sm hover:bg-gray-50 transition-colors"
                >
                  <UserPlus className="h-4 w-4" />
                  Select {getLevelLabel(level)}
                </button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-72" align="start">
                <Command>
                  <CommandInput 
                    placeholder="Search for approver..." 
                    className="h-9"
                    startIcon={<Search className="h-4 w-4 text-gray-400" />}
                  />
                  <CommandEmpty>No approver found.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-auto">
                    {mockApproverOptions.map((option) => (
                      <CommandItem
                        key={option.id}
                        onSelect={() => handleAddApprover(option, level)}
                        className="flex flex-col items-start py-2"
                      >
                        <p className="text-sm font-medium">{option.name}</p>
                        <div className="flex flex-col text-xs text-gray-500">
                          <span>{option.email}</span>
                          {option.role && <span>{option.role}</span>}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="mb-8">
      <h3 className="text-base font-medium text-gray-800 mb-4">Select Approvers</h3>
      
      <div className="space-y-1">
        {Array.from({ length: Math.min(MAX_APPROVERS, approvers.length + 1) }, (_, i) => i + 1).map(level => 
          renderApproverLevel(level)
        )}
        
        {approvers.length > 0 && approvers.length < MAX_APPROVERS && (
          <button 
            onClick={() => setOpen({ ...open, [approvers.length + 1]: true })}
            className="mt-3 text-blue-600 flex items-center gap-1.5 text-sm hover:text-blue-700"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add another approver</span>
          </button>
        )}
      </div>
    </div>
  );
};
