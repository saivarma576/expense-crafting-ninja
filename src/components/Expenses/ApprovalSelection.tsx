
import React, { useState } from 'react';
import { X, UserPlus, Search, Check } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Approver = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

type ApproverCardProps = {
  approver: Approver;
  onRemove: () => void;
};

const ApproverCard: React.FC<ApproverCardProps> = ({ approver, onRemove }) => {
  return (
    <div className="flex items-center bg-gray-50 hover:bg-gray-100 transition-colors rounded-md border p-2.5 mb-2">
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
  );
};

export const ApprovalSelection: React.FC = () => {
  const [approvers, setApprovers] = useState<(Approver | null)[]>([null, null, null]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLevel, setActiveLevel] = useState<number | null>(null);
  
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
    setActiveLevel(null);
    setSearchTerm('');
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
  
  const filteredApprovers = mockApproverOptions.filter(
    approver => 
      approver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (approver.role && approver.role.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const getActiveApproverCount = () => approvers.filter(a => a !== null).length;
  
  const openApproverSelection = (level: number) => {
    setActiveLevel(level);
    setSearchTerm('');
  };
  
  return (
    <div className="mb-8">
      <h3 className="text-base font-medium text-gray-800 mb-4">Select Approvers</h3>
      
      {approvers.map((approver, index) => {
        // Only show next level if previous level has an approver selected
        const shouldShow = index === 0 || approvers[index - 1] !== null;
        if (!shouldShow) return null;
        
        return (
          <div key={`approval-level-${index}`} className="mb-3">
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-700 mb-1">
                {getLevelLabel(index)}
              </label>
              
              {approver ? (
                <ApproverCard 
                  approver={approver} 
                  onRemove={() => handleRemoveApprover(index)} 
                />
              ) : (
                <div>
                  {activeLevel === index ? (
                    <div className="border rounded-md p-2 bg-white shadow-sm">
                      <div className="flex items-center border-b pb-2 mb-2">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <Input
                          placeholder={`Search for ${getLevelLabel(index).toLowerCase()}...`}
                          className="border-none shadow-none focus-visible:ring-0 h-8 p-0"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button 
                          onClick={() => setActiveLevel(null)}
                          className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="max-h-64 overflow-y-auto">
                        {filteredApprovers.length === 0 ? (
                          <div className="py-3 text-center text-sm text-gray-500">
                            No approver found.
                          </div>
                        ) : (
                          filteredApprovers.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => handleSetApprover(option, index)}
                              className="flex flex-col items-start py-2 px-2 w-full text-left rounded-md hover:bg-gray-100 transition-colors"
                            >
                              <p className="text-sm font-medium">{option.name}</p>
                              <div className="flex flex-col text-xs text-gray-500">
                                <span>{option.email}</span>
                                {option.role && <span>{option.role}</span>}
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  ) : (
                    <button 
                      className="flex items-center gap-2 text-blue-600 rounded-md border border-gray-300 p-2.5 text-sm hover:bg-gray-50 transition-colors w-full"
                      onClick={() => openApproverSelection(index)}
                    >
                      <UserPlus className="h-4 w-4" />
                      <span>Select {getLevelLabel(index)}</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
