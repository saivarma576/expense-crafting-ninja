
import React from "react";
import { format } from "date-fns";
import { Info, Calendar, CircleHelp, Coffee, Plus, Minus } from "lucide-react";
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
  rates: { breakfast: number; lunch: number; dinner: number; incidentals: number };
  // Base per diem rate used for headlines
  baseRate: number;
}

// Modern Lucide meal icons with updated hover & colors
const MealLucideIcons: Record<keyof typeof MEAL_LABELS, JSX.Element> = {
  breakfast: <Coffee size={20} className="text-amber-500" />,
  lunch: <Plus size={20} className="text-green-500" />,
  dinner: <Minus size={20} className="text-pink-500" />,
  incidentals: <CircleHelp size={20} className="text-blue-500" />,
};

// Utility for getting the nice label for each meal
const MEAL_LABELS = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  incidentals: "Incidentals",
};

// Utility for nice colors/rows for better visuals
const MEAL_BG: Record<keyof typeof MEAL_LABELS, string> = {
  breakfast: "bg-yellow-50",
  lunch: "bg-green-50",
  dinner: "bg-pink-50",
  incidentals: "bg-blue-50",
};

function getDurationHoursAndPercent(percent: number): { hours: string; label: string } {
  if (percent === 1) return { hours: "24", label: "100%" };
  if (percent === 0.5) return { hours: "12", label: "50%" };
  if (percent === 0.25) return { hours: "6", label: "25%" };
  return { hours: "?", label: `${Math.round(percent * 100)}%` };
}

const UltraCleanPerDiemTable: React.FC<UltraCleanPerDiemTableProps> = ({ days, rates, baseRate }) => {
  // Helper: compute reimbursed value & explanation for cell, based on meal+day
  function getMealCell(day: PerDiemDay, meal: keyof typeof MEAL_LABELS, idx: number) {
    const { hours, label: percentLabel } = getDurationHoursAndPercent(day.percent);
    const mealLabel = MEAL_LABELS[meal];
    const rate = rates[meal];
    const percent = day.percent;
    const provided = meal === "incidentals" ? "No" : day.mealsProvided.includes(meal) ? "Yes" : "No";
    const finalValue =
      meal === "incidentals"
        ? rates.incidentals * percent
        : day.mealsProvided.includes(meal)
        ? 0
        : rates[meal] * percent;

    // Compose tooltip with line breaks and formatting for readability
    let tooltip = "";
    if (provided === "Yes" && meal !== "incidentals") {
      tooltip = 
        `Meals Provided: Yes\n` +
        `GSA Meal Rate for ${mealLabel}: $${rate.toFixed(2)}\n` +
        `Provided by meeting organizer\n` + 
        `Not eligible for reimbursement\n` +
        `Final Amount: $0.00`;
    } else {
      tooltip = 
        `Meals Provided: No\n` +
        `GSA Meal Rate for ${mealLabel}: $${rate.toFixed(2)}\n` +
        `Duration: ${hours} hrs → Eligible for ${percentLabel} of daily allowance\n` +
        `Calculation: $${rate.toFixed(2)} × ${percentLabel} = $${finalValue.toFixed(2)}\n` +
        `Final Amount: $${finalValue.toFixed(2)}`;
    }

    return {
      value: finalValue,
      tooltip,
    };
  }

  // Meal rows: breakfast, lunch, dinner, incidentals
  const mealTypes: (keyof typeof MEAL_LABELS)[] = ["breakfast", "lunch", "dinner", "incidentals"];

  // Compute per-day totals and final total
  const dayTotals = days.map((day, idx) =>
    mealTypes.reduce((sum, meal) => sum + getMealCell(day, meal, idx).value, 0)
  );
  const grandTotal = dayTotals.reduce((a, b) => a + b, 0);

  // Build meal provided summary
  function providedSummary() {
    return days
      .map((day) => {
        if (day.mealsProvided.length === 0) return null;
        return `${format(day.date, "MMM d")}: ${day.mealsProvided.map((m) => MEAL_LABELS[m]).join(" & ")}`;
      })
      .filter(Boolean)
      .join("; ");
  }

  return (
    <div className="rounded-2xl bg-white/90 dark:bg-dark/90 shadow-lg border border-gray-200 py-3 px-3 max-w-full">
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
              <TableHead className="text-gray-700 font-semibold" />
              {days.map((day, idx) => (
                <TableHead key={idx} className="text-lg font-semibold text-purple-700 text-center">
                  <span className="flex items-center justify-center gap-1 select-none">
                    <Calendar size={16} className="text-indigo-500" />
                    {format(day.date, "MMM d")}
                  </span>
                </TableHead>
              ))}
              <TableHead className="text-lg font-semibold text-white bg-purple-600 rounded-r-lg text-center">
                Total
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mealTypes.map((meal) => (
              <TableRow key={meal} className={MEAL_BG[meal]}>
                <TableCell className="font-bold text-gray-800 text-base">
                  <span className="flex items-center gap-2">
                    <span className="rounded-full bg-white border border-gray-300 p-1 drop-shadow-sm">
                      {MealLucideIcons[meal]}
                    </span>
                    {MEAL_LABELS[meal]}
                  </span>
                </TableCell>
                {days.map((day, idx) => {
                  const { value, tooltip } = getMealCell(day, meal, idx);
                  return (
                    <TableCell
                      key={idx}
                      className="relative cursor-pointer select-none text-right pr-4 font-mono font-semibold text-gray-900 dark:text-white hover:bg-purple-100 transition"
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center justify-end gap-1">
                              <span>${value.toFixed(2)}</span>
                              <span className="rounded-full bg-purple-100 p-1">
                                <Info size={14} className="text-purple-600" />
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="whitespace-pre-line max-w-xs bg-white text-gray-900 rounded-lg border border-purple-300 shadow-md p-4 font-semibold text-sm">
                            {tooltip.split("\n").map((line, i) => (
                              <div key={i} className={line.startsWith("Meals Provided") ? "text-purple-700" : undefined}>
                                {line}
                              </div>
                            ))}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  );
                })}
                <TableCell className="font-extrabold text-purple-700 bg-purple-100 text-right pr-6">
                  ${days.reduce((acc, day, idx) => acc + getMealCell(day, meal, idx).value, 0).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            {/* Final total row per day */}
            <TableRow>
              <TableCell className="font-bold bg-purple-200 text-purple-900 rounded-l-lg">
                <span className="flex items-center gap-2">🟩 Final Total Per Day</span>
              </TableCell>
              {dayTotals.map((dt, idx) => (
                <TableCell
                  key={idx}
                  className="bg-purple-50 font-bold text-purple-900 text-right pr-6"
                >
                  ${dt.toFixed(2)}
                </TableCell>
              ))}
              <TableCell className="bg-purple-600 font-extrabold rounded-r-lg text-white text-lg text-right pr-6">
                ${grandTotal.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Summary below table */}
      <div className="px-4 py-3 bg-purple-50 border border-purple-200 rounded mt-5 space-y-1 text-sm text-left text-purple-800 font-semibold">
        <div>
          • Base Per Diem Rate: <span className="font-mono">${baseRate.toFixed(2)}/day</span>
        </div>
        <div>• Duration-Based % Applied: <span className="text-purple-400">(see tooltips for details)</span></div>
        {providedSummary() && (
          <div>
            • Meals Provided: <span className="font-normal">{providedSummary()}</span>
          </div>
        )}
        <div>
          ✅ Final Reimbursable Total:{" "}
          <span className="font-bold">${grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default UltraCleanPerDiemTable;

