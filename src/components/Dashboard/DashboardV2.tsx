import React from "react";
import WelcomeHeader from "./WelcomeHeader";
import TopStatsCards from "./StatCards/TopStatsCards";
import ExpenseActionsCard from "./StatCards/ExpenseActionsCard";
import RecentExpenses from "./RecentExpenses";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { ExpenseActionsCardV2 } from "./StatCards";

const DashboardV2 = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6 p-6">
      <WelcomeHeader />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <TopStatsCards />
        <ExpenseActionsCardV2 />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <RecentExpenses />
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full pl-3 text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                {date ? (
                  date?.toLocaleDateString()
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default DashboardV2;
