
import React, { useState } from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon, CalendarRange } from "lucide-react";
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface WelcomeHeaderProps {
  userName?: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({
  userName = 'Anna',
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}) => {
  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-1 border-b border-gray-100">
        <div className="flex-grow">
          <h4 className="text-xl font-semibold text-gray-800 mb-1">{getGreeting()}, {userName}!</h4>
          <p className="text-muted-foreground mb-0">Here's what's happening with your expenses today.</p>
        </div>
        
        <div className="mt-3 md:mt-0">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "pl-3 pr-2 py-2 h-10 border-gray-200",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <div className="flex w-full justify-between items-center">
                      <span>
                        {startDate && endDate
                          ? `${format(startDate, "dd MMM, yyyy")} to ${format(endDate, "dd MMM, yyyy")}`
                          : "Select date range"}
                      </span>
                      <CalendarRange className="ml-2 h-4 w-4 opacity-70" />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="range"
                    defaultMonth={startDate}
                    selected={{
                      from: startDate,
                      to: endDate,
                    }}
                    onSelect={(range) => {
                      onStartDateChange(range?.from);
                      onEndDateChange(range?.to);
                    }}
                    numberOfMonths={2}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeHeader;
