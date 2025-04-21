
import React from "react";
import { format } from "date-fns";
import { Info, Calendar, Help, Coffee, Plus, Minus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter } from "@/components/ui/table";

// Type for a single day's per diem data
type PerDiemDay = {
  date: Date;
  percent: number; // 0-1 fraction (e.g., 0.5 for 50%)
  mealsProvided: ("breakfast" | "lunch" | "dinner")[];
};

interface UltraCleanPerDiemTableProps {
  // Array of days, in order
  days: PerDiemDay[];
  // Rates for each meal and incidentals
  rates: { breakfast: number; lunch: number; dinner: number; incidentals: number; };
  // Base per diem rate used for headlines
  baseRate: number;
}

// Modern Lucide meal icons
const MealLucideIcons: Record<keyof typeof MEAL_LABELS, JSX.Element> = {
  breakfast: <Coffee size={18} className="text-primary" />,
  lunch: <Plus size={18} className="text-primary" />,
  dinner: <Minus size={18} className="text-primary" />,
  incidentals: <Help size={18} className="text-primary" />,
};

// Utility for getting the nice label for each meal
const MEAL_LABELS = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  incidentals: "Incidentals"
};

// Utility for nice colors/rows
const MEAL_BG: Record<keyof typeof MEAL_LABELS, string> = {
  breakfast: "bg-[#F1F0FB]",
  lunch: "",
  dinner: "bg-[#F1F0FB]",
  incidentals: ""
};

function getDurationHoursAndPercent(percent: number): { hours: string; label: string } {
  if (percent === 1) return { hours: "24", label: "100%" };
  if (percent === 0.5) return { hours: "11", label: "50%" };
  if (percent === 0.25) return { hours: "6", label: "25%" };
  return { hours: "?", label: `${Math.round(percent * 100)}%` };
}

const UltraCleanPerDiemTable: React.FC<UltraCleanPerDiemTableProps> = ({
  days,
  rates,
  baseRate,
}) => {
  // Helper: compute reimbursed value & explanation for cell, based on meal+day
  function getMealCell(day: PerDiemDay, meal: keyof typeof MEAL_LABELS, idx: number) {
    const { hours, label: percentLabel } = getDurationHoursAndPercent(day.percent);
    const mealLabel = MEAL_LABELS[meal];
    const rate = rates[meal];
    const percent = day.percent;
    const provided = meal === "incidentals"
      ? "No"
      : (day.mealsProvided.includes(meal as any) ? "Yes" : "No");
    const finalValue = meal === "incidentals" ? rates.incidentals * percent :
      day.mealsProvided.includes(meal as any) ? 0 : rates[meal] * percent;

    // Compose tooltip as user suggests
    let tooltip = "";
    tooltip += `**Meals Provided:** ${provided === "Yes" ? "Yes" : "No"}\n`;
    tooltip += `**GSA Meal Rate for ${mealLabel}:** $${rate.toFixed(2)}\n`;
    tooltip += hours !== "?"
      ? `**Duration:** ${hours} hrs → Eligible for ${percentLabel} of daily allowance\n`
      : `**Eligible:** ${percentLabel}\n`;
    tooltip += `**Calculation:** $${rate.toFixed(2)} × ${percentLabel} = $${finalValue.toFixed(2)}\n`;
    tooltip += `**Final Amount:** $${finalValue.toFixed(2)}`;

    // If provided, override tooltip
    if (provided === "Yes" && meal !== "incidentals") {
      tooltip = `**Meals Provided:** Yes\n**GSA Meal Rate for ${mealLabel}:** $${rate.toFixed(2)}\nProvided by meeting organizer\nNot eligible for reimbursement\n**Final Amount:** $0.00`;
    }
    // Incidentals = never provided, so always classic flow

    return {
      value: finalValue,
      tooltip,
    };
  }

  // Meal rows: breakfast, lunch, dinner, incidentals
  const mealTypes: (keyof typeof MEAL_LABELS)[] = ["breakfast", "lunch", "dinner", "incidentals"];

  // Compute per-day totals and final total
  const dayTotals = days.map((day, idx) => {
    let sum = 0;
    mealTypes.forEach(meal => {
      const { value } = getMealCell(day, meal, idx);
      sum += value;
    });
    return sum;
  });
  const grandTotal = dayTotals.reduce((a, b) => a + b, 0);

  // Build meal provided summary
  function providedSummary() {
    return days
      .map((day, idx) => {
        if (day.mealsProvided.length === 0) return null;
        return `${format(day.date, "MMM d")}: ${day.mealsProvided.map(m => MEAL_LABELS[m]).join(" & ")}`;
      })
      .filter(Boolean)
      .join("; ");
  }

  return (
    <div className="rounded-2xl bg-white/70 dark:bg-dark/80 shadow-glass border border-[#e7e4fa] py-2 px-2 max-w-full">
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#9b87f5]/10">
              <TableHead className="text-dark font-semibold" />
              {days.map((day, idx) => (
                <TableHead key={idx} className="text-lg font-semibold text-[#7E69AB]">
                  <span className="flex items-center gap-1">
                      <Calendar size={16} className="text-[#1EAEDB]" />
                      {format(day.date, "MMM d")}
                  </span>
                </TableHead>
              ))}
              <TableHead className="text-lg font-semibold text-[#1A1F2C] bg-[#D6BCFA]/60 rounded-r-lg">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mealTypes.map(meal => (
              <TableRow key={meal} className={MEAL_BG[meal]}>
                <TableCell className="font-bold text-[#7E69AB] text-base">
                  <span className="flex items-center gap-2">
                    <span className="rounded-full bg-[#D6BCFA]/60 p-1">
                      {MealLucideIcons[meal]}
                    </span>
                    {MEAL_LABELS[meal]}
                  </span>
                </TableCell>
                {days.map((day, idx) => {
                  const { value, tooltip } = getMealCell(day, meal, idx);
                  return (
                    <TableCell key={idx} className="relative">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="flex items-center gap-1 cursor-pointer select-none">
                              <span className="font-mono font-medium text-md text-[#222] dark:text-white">${value.toFixed(2)}</span>
                              <span className="rounded-full bg-[#1EAEDB]/10 ml-1 p-1">
                                <Info size={14} className="text-[#1EAEDB]" />
                              </span>
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="whitespace-pre-line max-w-xs text-sm font-medium">
                            {tooltip.split("\n").map((line, i) =>
                              line.startsWith("**")
                                ? <div key={i}><span className="font-semibold">{line.replace(/\*\*(.+?)\*\*/, "$1")}</span></div>
                                : <div key={i}>{line}</div>
                            )}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  );
                })}
                <TableCell className="font-semibold text-[#9b87f5] bg-[#F1F0FB]">
                  ${days.reduce((acc, day, idx) => acc + getMealCell(day, meal, idx).value, 0).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            {/* Final total row per day */}
            <TableRow>
              <TableCell className="font-bold bg-[#D6BCFA]/60 text-[#1A1F2C] rounded-l-lg">
                <span className="flex items-center gap-2">🟩 Final Total Per Day</span>
              </TableCell>
              {dayTotals.map((dt, idx) => (
                <TableCell key={idx} className="bg-[#D6BCFA]/40 font-bold text-[#222]">
                  ${dt.toFixed(2)}
                </TableCell>
              ))}
              <TableCell className="bg-[#1EAEDB] font-extrabold rounded-r-lg text-white text-lg">
                ${grandTotal.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Summary below table */}
      <div className="px-3 py-2 bg-[#F1F0FB] border border-[#e7e4fa] rounded mt-4 space-y-1 text-sm text-left">
        <div>• <span className="font-semibold text-[#7E69AB]">Base Per Diem Rate:</span> <span className="font-mono">${baseRate.toFixed(2)}/day</span></div>
        <div>• <span className="font-semibold text-[#7E69AB]">Duration-Based % Applied:</span> <span className="text-gray-400">(hidden, see cell tooltips)</span></div>
        {providedSummary() && (
          <div>• <span className="font-semibold text-[#7E69AB]">Meals Provided:</span> {providedSummary()}</div>
        )}
        <div>✅ <span className="font-semibold text-[#1EAEDB]">Final Reimbursable Total:</span> <span className="font-bold text-[#1A1F2C]">${grandTotal.toFixed(2)}</span></div>
      </div>
    </div>
  );
};

export default UltraCleanPerDiemTable;
