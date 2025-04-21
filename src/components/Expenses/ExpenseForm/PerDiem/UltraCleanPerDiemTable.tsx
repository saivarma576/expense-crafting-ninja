
import React from "react";
import { format } from "date-fns";
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

// Utility for getting the nice label for each meal
const MEAL_LABELS = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  incidentals: "Incidentals"
};
const MEAL_ICONS = {
  breakfast: "🍳",
  lunch: "🥗",
  dinner: "🍽️",
  incidentals: "💼"
};

function getDurationHoursAndPercent(percent: number): { hours: string; label: string } {
  // This is a stub. Real duration-hour mapping must be injected from business logic.
  // For best accuracy, pass actual hours from parent later if needed.
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
    const mealIcon = MEAL_ICONS[meal];
    const rate = rates[meal];
    const percent = day.percent;
    const finalValue = meal === "incidentals" ? rates.incidentals * percent :
      day.mealsProvided.includes(meal as any) ? 0 : rates[meal] * percent;

    // Meals Provided: Yes/No
    const provided = meal === "incidentals"
      ? "No"
      : (day.mealsProvided.includes(meal as any) ? "Yes" : "No");

    // Tooltip message per spec
    let tooltipLines: string[] = [];

    tooltipLines.push(`Meals Provided: ${provided}`);

    if (meal === "incidentals") {
      tooltipLines.push(
        `GSA Meal Rate for Incidentals: $${rates.incidentals.toFixed(2)}`,
        hours !== "?" ? `Duration: ${hours} hrs → Eligible for ${percentLabel} of daily allowance` : `Eligible: ${percentLabel}`,
        `Calculation: $${rates.incidentals.toFixed(2)} × ${percentLabel} = $${finalValue.toFixed(2)}`,
        `Final Amount: $${finalValue.toFixed(2)}`
      );
    } else if (provided === "Yes") {
      tooltipLines.push(
        `GSA Meal Rate for ${mealLabel}: $${rate.toFixed(2)}`,
        "Provided by meeting organizer",
        "Not eligible for reimbursement",
        "Final Amount: $0.00"
      );
    } else {
      tooltipLines.push(
        `GSA Meal Rate for ${mealLabel}: $${rate.toFixed(2)}`,
        hours !== "?" ? `Duration: ${hours} hrs → Eligible for ${percentLabel} of daily allowance` : `Eligible: ${percentLabel}`,
        `Calculation: $${rate.toFixed(2)} × ${percentLabel} = $${finalValue.toFixed(2)}`,
        `Final Amount: $${finalValue.toFixed(2)}`
      );
    }

    return {
      value: finalValue,
      tooltip: tooltipLines.join("\n")
    };
  }

  // All rows: breakfast, lunch, dinner, incidentals — for each day
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
        return `Day ${idx + 1}: ${day.mealsProvided.map(m => MEAL_LABELS[m]).join(" & ")}`;
      })
      .filter(Boolean)
      .join("; ");
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead />
            {days.map((day, idx) =>
              <TableHead key={idx}>Day {idx + 1}</TableHead>
            )}
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mealTypes.map(meal => (
            <TableRow key={meal}>
              <TableCell className="font-medium">
                <span className="flex items-center gap-1">{MEAL_ICONS[meal]} {MEAL_LABELS[meal]}</span>
              </TableCell>
              {days.map((day, idx) => {
                const { value, tooltip } = getMealCell(day, meal, idx);
                return (
                  <TableCell key={idx} className="relative">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="flex items-center gap-1 cursor-help select-none">
                            ${value.toFixed(2)} <span className="text-gray-400 text-xs ml-1" aria-label="info">🛈</span>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent className="whitespace-pre-line max-w-xs">{tooltip}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                );
              })}
              {/* Row total */}
              <TableCell className="font-semibold">
                ${days.reduce((acc, day, idx) => acc + getMealCell(day, meal, idx).value, 0).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
          {/* Final total row per day */}
          <TableRow>
            <TableCell className="font-semibold bg-green-50">🟩 Final Total Per Day</TableCell>
            {dayTotals.map((dt, idx) => (
              <TableCell key={idx} className="bg-green-50 font-semibold">
                ${dt.toFixed(2)}
              </TableCell>
            ))}
            <TableCell className="bg-green-100 font-bold">
              ${grandTotal.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Summary below table */}
      <div className="px-3 py-2 bg-blue-50 border rounded mt-2 space-y-1 text-sm">
        <div>• <span className="font-medium">Base Per Diem Rate:</span> <span className="font-mono">${baseRate.toFixed(2)}/day</span></div>
        <div>• <span className="font-medium">Duration-Based % Applied:</span> <span className="text-gray-400">(hidden, see cell tooltips)</span></div>
        {providedSummary() && (
          <div>• <span className="font-medium">Meals Provided:</span> {providedSummary()}</div>
        )}
        <div>✅ <span className="font-medium">Final Reimbursable Total:</span> <span className="font-bold text-green-700">${grandTotal.toFixed(2)}</span></div>
      </div>
    </div>
  );
};

export default UltraCleanPerDiemTable;

