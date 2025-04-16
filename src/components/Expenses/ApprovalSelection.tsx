
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

type Approver = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

type ApprovalLevelProps = {
  level: number;
  levelLabel: string;
  approver: Approver | null;
  onSelect: (approver: Approver) => void;
  onRemove: () => void;
  approverOptions: Approver[];
};

const ApprovalLevel: React.FC<ApprovalLevelProps> = ({
  level,
  levelLabel,
  approver,
  onSelect,
  onRemove,
  approverOptions,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div key={`level-${level}`} className="mb-3">
      <div className="flex flex-col">
        <label className="text-xs font-medium text-gray-700 mb-1">
          {levelLabel}
        </label>
        
        {approver ? (
          <div className="flex items-center bg-gray-50 hover:bg-gray-100 transition-colors rounded-md border p-2.5">
            <div className="flex-1">
              <p className="text-sm font-medium">{approver.name}</p>
              <p className="text-xs text-gray-500">{approver.email}</p>
              {approver.role && <p className="text-xs text-gray-500">{approver.role}</p>}
            </div>
            <button 
              onClick={onRemove}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition-colors"
              aria-label={`Remove ${approver.name}`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button 
                className="flex items-center gap-2 text-blue-600 rounded-md border border-gray-300 p-2.5 text-sm hover:bg-gray-50 transition-colors w-full"
              >
                <UserPlus className="h-4 w-4" />
                <span>Select {levelLabel}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-80" align="start">
              <Command>
                <div className="flex items-center border-b px-3">
                  <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                  <CommandInput 
                    placeholder={`Search for ${levelLabel.toLowerCase()}...`} 
                    className="h-9"
                  />
                </div>
                <CommandEmpty>No approver found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-auto">
                  {approverOptions.map((option) => (
                    <CommandItem
                      key={option.id}
                      onSelect={() => {
                        onSelect(option);
                        setOpen(false);
                      }}
                      className="flex flex-col items-start py-2.5"
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

export const ApprovalSelection: React.FC = () => {
  const [approvers, setApprovers] = useState<(Approver | null)[]>([null, null, null]);
  
  const MAX_APPROVERS = 3;
  
  const mockApproverOptions: Approver[] = [
    { id: '1', name: 'Sarah Wright', email: 'sarah.wright@example.com', role: 'Engineering Manager' },
    { id: '2', name: 'Michael Chen', email: 'michael.chen@example.com', role: 'Finance Director' },
    { id: '3', name: 'Emma Davis', email: 'emma.davis@example.com', role: 'HR Manager' },
    { id: '4', name: 'James Wilson', email: 'james.wilson@example.com', role: 'Project Manager' },
    { id: '5', name: 'Olivia Taylor', email: 'olivia.taylor@example.com', role: 'Department Head' },
    { id: '6', name: 'Benjamin Lee', email: 'benjamin.lee@example.com', role: 'VP Operations' },
    { id: '7', name: 'Sophia Martin', email: 'sophia.martin@example.com', role: 'Team Lead' },
    { id: '8', name: 'William Brown', email: 'william.brown@example.com', role: 'Finance Manager' },
  ];
  
  const handleSetApprover = (approver: Approver, level: number) => {
    const newApprovers = [...approvers];
    newApprovers[level] = approver;
    setApprovers(newApprovers);
  };
  
  const handleRemoveApprover = (level: number) => {
    const newApprovers = [...approvers];
    newApprovers[level] = null;
    setApprovers(newApprovers);
  };
  
  const getLevelLabel = (level: number) => {
    switch (level) {
      case 0: return "First Approver";
      case 1: return "Second Approver";
      case 2: return "Final Approver";
      default: return `Approver ${level + 1}`;
    }
  };
  
  const getActiveApproverCount = () => approvers.filter(a => a !== null).length;
  
  return (
    <div className="mb-8">
      <h3 className="text-base font-medium text-gray-800 mb-4">Select Approvers</h3>
      
      <div className="space-y-1">
        {approvers.map((approver, index) => {
          // Only show next level if previous level has an approver selected
          const shouldShow = index === 0 || approvers[index - 1] !== null;
          if (!shouldShow) return null;
          
          return (
            <ApprovalLevel
              key={`approval-level-${index}`}
              level={index}
              levelLabel={getLevelLabel(index)}
              approver={approver}
              onSelect={(selected) => handleSetApprover(selected, index)}
              onRemove={() => handleRemoveApprover(index)}
              approverOptions={mockApproverOptions}
            />
          );
        })}
      </div>
    </div>
  );
};
