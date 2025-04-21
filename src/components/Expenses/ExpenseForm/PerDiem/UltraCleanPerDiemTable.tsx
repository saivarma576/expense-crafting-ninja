
import React, { useState } from "react";
import { format, isToday } from "date-fns";
import { CircleCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Type for a single day's per diem data
type PerDiemDay = {
  date: Date;
  percent: number; // 0-1 fraction (e.g., 0.5 for 50%)
  mealsProvided: ("breakfast" | "lunch" | "dinner")[];
};

interface UltraCleanPerDiemTableProps {
  days: PerDiemDay[];
  rates: { breakfast: number; lunch: number; dinner: number; incidentals: number };
  baseRate: number;
}

const MEAL_LABELS = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  incidentals: "Incidentals",
};

const MealIcons: Record<string, JSX.Element> = {
  breakfast: (
    <span className="inline-flex items-center justify-center rounded-full bg-amber-100 p-1">
      <span className="text-amber-500 text-md">🍳</span>
    </span>
  ),
  lunch: (
    <span className="inline-flex items-center justify-center rounded-full bg-green-100 p-1">
      <span className="text-green-600 text-md">🥗</span>
    </span>
  ),
  dinner: (
    <span className="inline-flex items-center justify-center rounded-full bg-pink-100 p-1">
      <span className="text-pink-500 text-md">🍽️</span>
    </span>
  ),
  incidentals: (
    <span className="inline-flex items-center justify-center rounded-full bg-sky-100 p-1">
      <span className="text-blue-500 text-md">💡</span>
    </span>
  ),
};

// Just for visual pills in summary
const ProvidedMealPill: React.FC<{ meal: string }> = ({ meal }) => (
  <span className="inline-flex px-2 py-0.5 rounded-full bg-gray-100 text-xs font-medium mr-1 border border-gray-200">{meal}</span>
);

function getDurationHoursAndPercent(percent: number): { hours: string; label: string } {
  if (percent === 1) return { hours: "24", label: "100%" };
  if (percent === 0.5) return { hours: "12", label: "50%" };
  if (percent === 0.25) return { hours: "6", label: "25%" };
  return { hours: "?", label: `${Math.round(percent * 100)}%` };
}

// Show/hide per-day columns if all meals are provided and incidentals is zero
function allMealsProvidedExceptIncidentals(day: PerDiemDay) {
  return (
    (["breakfast", "lunch", "dinner"] as (keyof typeof MEAL_LABELS)[]).every((m) => day.mealsProvided.includes(m))
  );
}

// Helper for meal cell calculation
function getMealValue(day: PerDiemDay, meal: keyof typeof MEAL_LABELS, rates: UltraCleanPerDiemTableProps["rates"]) {
  const value =
    meal === "incidentals"
      ? rates.incidentals * day.percent
      : day.mealsProvided.includes(meal)
      ? 0
      : rates[meal] * day.percent;
  return value;
}

const UltraCleanPerDiemTable: React.FC<UltraCleanPerDiemTableProps> = ({ days, rates, baseRate }) => {
  // Row expansion state: days that are expanded
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const mealTypes: (keyof typeof MEAL_LABELS)[] = ["breakfast", "lunch", "dinner", "incidentals"];

  // Calculate day totals
  const dayTotals = days.map((day) => mealTypes.reduce((sum, meal) => sum + getMealValue(day, meal, rates), 0));
  const grandTotal = dayTotals.reduce((a, b) => a + b, 0);

  // Provided summary chips and percent
  function ProvidedSummaryChips() {
    return (
      <div className="flex flex-wrap gap-1 flex-row">
        {days.map((day, idx) =>
          day.mealsProvided.length > 0 ? (
            <Badge key={idx} className="bg-white text-purple-700 border border-purple-200 px-2 py-1 font-medium">
              {format(day.date, "MMM d") + ": "}
              {day.mealsProvided.map((meal) => (
                <ProvidedMealPill key={meal} meal={MEAL_LABELS[meal]} />
              ))}
            </Badge>
          ) : null
        )}
      </div>
    );
  }

  function getPercentTag(percent: number) {
    const { label } = getDurationHoursAndPercent(percent);
    return (
      <Badge className="bg-purple-50 text-purple-700 border border-purple-200 px-2 py-1 font-semibold">
        {label} of daily
      </Badge>
    );
  }

  // Hover/click tooltip for each date (instead of per cell)
  function DateHeaderTooltip({ day, idx }: { day: PerDiemDay; idx: number }) {
    const percent = day.percent;
    const { label, hours } = getDurationHoursAndPercent(percent);
    // Compose a floating summary per day instead of one-per-cell
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center justify-center gap-1 cursor-help relative">
              <span
                className={
                  "px-1.5 py-1 rounded font-semibold " +
                  (isToday(day.date)
                    ? "border-2 border-blue-400 bg-blue-50 text-blue-700"
                    : "bg-white text-gray-800")
                }
              >
                {format(day.date, "MMM d")}
              </span>
              <span className="ml-1 text-gray-400 font-normal text-xs select-none">(i)</span>
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs rounded-lg bg-white border border-purple-200 shadow-lg p-3 font-semibold text-sm text-left animate-fade-in">
            <div>
              <span className="font-bold text-purple-700">{format(day.date, "eeee, MMM d y")}</span>
            </div>
            <div className="mt-1 text-gray-700">
              Duration: <span className="font-mono">{hours} hrs</span> (<span className="font-bold">{label}</span>)
            </div>
            <div className="mt-1">
              {day.mealsProvided.length > 0 ? (
                <>
                  <span className="text-purple-600">Meals Provided:</span>
                  {day.mealsProvided.map((m) => (
                    <ProvidedMealPill key={m} meal={MEAL_LABELS[m]} />
                  ))}
                </>
              ) : (
                <span className="text-green-500">No meals provided</span>
              )}
            </div>
            <div className="mt-1 text-gray-700 font-semibold">
              Reimbursable %: <span className="font-mono">{label}</span>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Enhanced collapsible for days with all meals provided (except incidentals)
  function isCollapsed(idx: number) {
    return !expanded[idx] && allMealsProvidedExceptIncidentals(days[idx]);
  }

  return (
    <div>
      <div className="rounded-xl border shadow bg-white/90 overflow-x-auto max-w-full pb-2">
        <Table>
          <TableHeader>
            <TableRow className="sticky top-0 z-10 bg-white border-b border-gray-300 shadow-sm">
              <TableHead className="w-20"></TableHead>
              {/* Move "Total" to left */}
              <TableHead className="text-right font-semibold text-purple-800 uppercase bg-purple-50 border-r border-purple-200">
                Total
              </TableHead>
              {days.map((day, idx) => (
                <TableHead
                  key={idx}
                  className="text-center font-bold text-gray-800 px-2 py-2"
                  style={{
                    minWidth: 90,
                    background: isToday(day.date) ? "#f0f9ff" : undefined,
                  }}
                >
                  {/* Only one hover tooltip (group cell) */}
                  <div
                    onClick={() =>
                      allMealsProvidedExceptIncidentals(day)
                        ? setExpanded((s) => ({ ...s, [idx]: !s[idx] }))
                        : null
                    }
                    className={
                      allMealsProvidedExceptIncidentals(day)
                        ? "cursor-pointer"
                        : ""
                    }
                  >
                    <DateHeaderTooltip day={day} idx={idx} />
                    {isCollapsed(idx) && (
                      <div className="mt-1 text-xs text-gray-400 italic">Collapsed</div>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {mealTypes.map((meal) => (
              <TableRow className="group" key={meal}>
                <TableCell className="py-2 font-bold whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {MealIcons[meal]}
                    <span>{MEAL_LABELS[meal]}</span>
                  </div>
                </TableCell>
                {/* Day total per meal */}
                <TableCell className="font-semibold text-right text-purple-800 bg-purple-50 border-r border-purple-200">
                  {days
                    .reduce(
                      (acc, day, idx) =>
                        isCollapsed(idx)
                          ? acc
                          : acc + getMealValue(day, meal, rates),
                      0
                    )
                    .toLocaleString(undefined, {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    })}
                </TableCell>
                {days.map((day, idx) => {
                  // Hide details for collapsed days (all meals provided)
                  if (isCollapsed(idx)) {
                    return (
                      <TableCell
                        key={idx}
                        className="bg-gray-50 text-gray-300 text-right italic"
                      >
                        —
                      </TableCell>
                    );
                  }
                  const value = getMealValue(day, meal, rates);
                  return (
                    <TableCell
                      key={idx}
                      className="text-right font-mono font-semibold py-2 px-2"
                    >
                      {value.toLocaleString(undefined, {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="font-extrabold bg-purple-100 text-right border-l-4 border-purple-300 rounded-l-lg">
                <div className="flex items-center gap-2 text-purple-900">
                  <CircleCheck className="text-emerald-600 w-5 h-5" />
                  Final Total
                </div>
              </TableCell>
              <TableCell
                className="font-extrabold text-purple-900 bg-purple-100 text-right border-r-2 border-purple-200"
                colSpan={1}
              >
                {grandTotal.toLocaleString(undefined, {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                })}
              </TableCell>
              {days.map((day, idx) =>
                isCollapsed(idx) ? (
                  <TableCell key={idx} className="bg-gray-50 text-gray-300 text-right">
                    —
                  </TableCell>
                ) : (
                  <TableCell key={idx} className="bg-purple-50 font-bold text-purple-900 text-right">
                    {dayTotals[idx].toLocaleString(undefined, {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {/* Enhanced Summary Card */}
      <div className="mt-5 flex flex-col md:flex-row gap-5 items-start justify-between">
        <div className="bg-white border border-purple-100 rounded-2xl shadow-lg p-4 min-w-[300px] flex-1">
          <div className="flex items-center gap-2 mb-2">
            <CircleCheck className="text-emerald-600 w-6 h-6" />
            <span className="text-xl font-extrabold text-gray-800">Final Reimbursable Total</span>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-mono font-extrabold text-purple-800">
              {grandTotal.toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
              })}
            </span>
            <Badge className="bg-purple-100 text-purple-800 font-medium border border-purple-200">Success</Badge>
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 min-w-[280px] flex-1 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-purple-800">Base Rate:</span>
            <span className="font-mono">{baseRate.toLocaleString(undefined, { style: "currency", currency: "USD" })}/day</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-purple-800">Duration %: </span>
            {days.map((d, idx) => (
              <span key={idx}>{getPercentTag(d.percent)}</span>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-purple-800">Meals Provided:</span>
            <ProvidedSummaryChips />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UltraCleanPerDiemTable;
