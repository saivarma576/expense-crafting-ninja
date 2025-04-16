
import React, { useState } from 'react';
import { X, UserPlus, Search, Check, Users } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

type Approver = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

export const ApprovalSelection: React.FC = () => {
  const [approvers, setApprovers] = useState<(Approver | null)[]>([null, null, null]);
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  
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
    setOpenPopoverIndex(null);
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
    <div className="mb-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-gray-800">Approvers</h3>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-gray-50">
            {getActiveApproverCount()} / 3 Selected
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {approvers.map((approver, index) => {
          // Only show next level if previous level has an approver selected
          const shouldShow = index === 0 || approvers[index - 1] !== null;
          if (!shouldShow) return null;
          
          return (
            <div key={`approval-level-${index}`} className="relative">
              <Label className="text-xs font-medium text-gray-700 mb-1.5 block">
                {getLevelLabel(index)}
              </Label>
              
              {approver ? (
                <div className="flex items-center p-2 bg-gray-50 border rounded-md hover:bg-gray-100 transition-colors group">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{approver.name}</p>
                    <p className="text-xs text-gray-500 truncate">{approver.email}</p>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button 
                          onClick={() => handleRemoveApprover(index)}
                          className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remove approver</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ) : (
                <Popover open={openPopoverIndex === index} onOpenChange={(open) => {
                  if (open) {
                    setOpenPopoverIndex(index);
                  } else {
                    setOpenPopoverIndex(null);
                  }
                }}>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-gray-500 font-normal h-10"
                      onClick={() => setOpenPopoverIndex(index)}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      <span className="truncate">Select {getLevelLabel(index)}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder={`Search for ${getLevelLabel(index).toLowerCase()}...`} />
                      <CommandList>
                        <CommandEmpty>No approver found.</CommandEmpty>
                        <CommandGroup>
                          {mockApproverOptions.map((option) => (
                            <CommandItem
                              key={option.id}
                              value={option.name}
                              onSelect={() => handleSetApprover(option, index)}
                              className="flex flex-col items-start py-2 px-4"
                            >
                              <div className="flex items-center w-full">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium">{option.name}</p>
                                  <div className="text-xs text-gray-500 truncate">
                                    {option.email}
                                  </div>
                                  {option.role && (
                                    <div className="text-xs text-gray-500">
                                      {option.role}
                                    </div>
                                  )}
                                </div>
                                <Check className="h-4 w-4 text-blue-500 opacity-0 data-[selected=true]:opacity-100" />
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
