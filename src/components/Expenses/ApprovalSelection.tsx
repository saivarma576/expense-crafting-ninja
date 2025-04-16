
import React, { useState, useMemo } from 'react';
import { X, UserPlus, Search, Check, Users, AlertCircle } from 'lucide-react';
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

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
  
  const getLevelBadgeVariant = (level: number) => {
    switch (level) {
      case 0: return "default";
      case 1: return "secondary";
      case 2: return "success";
      default: return "default";
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const getActiveApproverCount = () => approvers.filter(a => a !== null).length;
  
  const hasDuplicates = useMemo(() => {
    const activeApprovers = approvers.filter(Boolean) as Approver[];
    const uniqueIds = new Set(activeApprovers.map(a => a.id));
    return uniqueIds.size < activeApprovers.length;
  }, [approvers]);
  
  const findDuplicateApprover = useMemo(() => {
    const activeApprovers = approvers.filter(Boolean) as Approver[];
    const seen = new Set<string>();
    let duplicate: Approver | null = null;
    
    activeApprovers.forEach(approver => {
      if (seen.has(approver.id)) {
        duplicate = approver;
      } else {
        seen.add(approver.id);
      }
    });
    
    return duplicate;
  }, [approvers]);

  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-medium text-gray-800">Approvers</h3>
          <Badge variant="outline" className="bg-gray-50">
            {getActiveApproverCount()} / 3 Selected
          </Badge>
        </div>
        
        {hasDuplicates && (
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center text-amber-600 text-sm font-medium">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>Duplicate approver selected</span>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Warning: Duplicate approver</p>
                <p className="text-xs text-muted-foreground">
                  {findDuplicateApprover?.name} is selected multiple times. 
                  Each approver should only be selected once.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {approvers.map((approver, index) => {
          // Only show next level if previous level has an approver selected
          const shouldShow = index === 0 || approvers[index - 1] !== null;
          if (!shouldShow) return null;
          
          return (
            <div key={`approval-level-${index}`} className="relative">
              <div className="flex items-center mb-2">
                <Badge variant={getLevelBadgeVariant(index)} className="mr-2">
                  {index === 0 ? "1st" : index === 1 ? "2nd" : "Final"}
                </Badge>
                <Label className="text-xs font-medium text-gray-700">
                  {getLevelLabel(index)}
                </Label>
              </div>
              
              {approver ? (
                <Card className="overflow-hidden transition-all duration-200 hover:shadow-md border-[1.5px]">
                  <CardContent className="p-0">
                    <div className="flex items-center p-3 group">
                      <Avatar className="h-10 w-10 mr-3 bg-primary/10">
                        <AvatarFallback className="text-primary font-medium text-sm">
                          {getInitials(approver.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{approver.name}</p>
                        <p className="text-xs text-gray-500 truncate">{approver.email}</p>
                        {approver.role && (
                          <p className="text-xs text-gray-400 truncate mt-0.5">{approver.role}</p>
                        )}
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button 
                              onClick={() => handleRemoveApprover(index)}
                              className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
                              aria-label="Remove approver"
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
                  </CardContent>
                </Card>
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
                      className="w-full justify-start text-gray-500 font-normal h-12 hover:shadow-sm transition-all"
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
                              className="flex items-center py-2 px-4"
                            >
                              <div className="flex items-center w-full">
                                <Avatar className="h-8 w-8 mr-3 bg-primary/10">
                                  <AvatarFallback className="text-primary text-xs font-medium">
                                    {getInitials(option.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium">{option.name}</p>
                                  <div className="text-xs text-gray-500 truncate">
                                    {option.email}
                                  </div>
                                  {option.role && (
                                    <div className="text-xs text-gray-400">
                                      {option.role}
                                    </div>
                                  )}
                                </div>
                                <Check className="h-4 w-4 text-primary opacity-0 data-[selected=true]:opacity-100" />
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
