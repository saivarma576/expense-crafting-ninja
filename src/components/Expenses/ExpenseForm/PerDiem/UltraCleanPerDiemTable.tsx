
import React, { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Info, Plus } from "lucide-react";

// Restrict Meal type for rows that are not incidentals
type MealType = "breakfast" | "lunch" | "dinner";
type PerDiemDay = {
  date: Date;
  percent: number; // 0-1 fraction
  mealsProvided: MealType[];
};
interface UltraCleanPerDiemTableProps {
  days: PerDiemDay[];
  rates: { breakfast: number; lunch: number; dinner: number; incidentals: number };
  baseRate: number;
}

// Table rows meta
const ROWS: { key: MealType | "incidentals", label: string }[] = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
  { key: "incidentals", label: "Incidentals" },
];

function getMealValue(day: PerDiemDay, meal: MealType, rates: UltraCleanPerDiemTableProps["rates"]) {
  return day.mealsProvided.includes(meal) ? 0 : rates[meal] * day.percent;
}
function getIncidentals(day: PerDiemDay, rates: UltraCleanPerDiemTableProps["rates"]) {
  return rates.incidentals * day.percent;
}

// Tooltip content: add emoji as prefix
function createTooltip({
  mealLabel, provided, rate, percent, isIncidentals, value
}: { 
  mealLabel: string, provided: boolean, rate: number, percent: number, isIncidentals: boolean, value: number
}) {
  const percentText = percent === 1
    ? "Eligible for 100% of daily allowance"
    : percent >= 0.98
      ? "Eligible for full daily allowance"
      : `Eligible for ${(percent * 100).toFixed(0)}% of daily allowance`;
  // Compose human-friendly duration, e.g., "12 hrs → Eligible for 50%"
  let prorationPhrase = percent === 1
    ? "24 hrs → Eligible for 100%"
    : percent === 0.5
      ? "12 hrs → Eligible for 50%"
      : `${(percent * 24).toFixed(1)} hrs → Eligible for ${(percent * 100).toFixed(0)}%`;
  return (
    <div style={{ whiteSpace: "pre-line" }}>
      <div>🍽️ Meals Provided: {provided ? "Yes" : "No"}</div>
      <div>📊 GSA Rate: ${rate.toFixed(2)}</div>
      <div>⏱️ Duration: {prorationPhrase}</div>
      <div>🧮 Calculation: ${rate.toFixed(2)} × {(percent * 100).toFixed(0)}% = ${value.toFixed(2)}</div>
      <div>💵 Final Amount: ${value.toFixed(2)}</div>
    </div>
  );
}

const UltraCleanPerDiemTable: React.FC<UltraCleanPerDiemTableProps> = ({ days, rates, baseRate }) => {
  // Row data
  const rowResults = ROWS.map(row => {
    if (row.key === "incidentals") {
      const vals = days.map(day => getIncidentals(day, rates));
      return { type: row.key, values: vals };
    } else {
      const vals = days.map(day => getMealValue(day, row.key as MealType, rates));
      return { type: row.key, values: vals };
    }
  });
  // Row totals
  const rowTotals = rowResults.map(row => row.values.reduce((a, b) => a + b, 0));
  // Per-day totals
  const dayTotals = days.map((_, dayIdx) =>
    rowResults.reduce((sum, row) => sum + row.values[dayIdx], 0)
  );
  // Grand total
  const grandTotal = dayTotals.reduce((a, b) => a + b, 0);

  // Summary breakdown for hover
  const numFull = days.filter(day => day.percent >= 1).length;
  const fullPerDay = baseRate;
  const partials = days
    .map((day, idx) => (day.percent < 1 ? { date: day.date, val: dayTotals[idx] } : null))
    .filter(Boolean) as { date: Date, val: number }[];

  // State for optional "expand detail" (per date). Map of index to expand bool.
  const [expandedDays, setExpandedDays] = useState<{[key:number]: boolean}>({});

  // Helper for compact header
  const wrapHeader = (text: string) => (
    <span className="break-words whitespace-normal">{text}</span>
  );

  return (
    <div className="w-full max-w-4xl border rounded-xl bg-white shadow p-2 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead
              className="text-left font-semibold text-gray-700 px-1 py-2 min-w-[80px]"
              style={{ minWidth: 80 }}
            >
              {wrapHeader("Category")}
            </TableHead>
            <TableHead
              className="text-right font-bold text-gray-700 px-1 py-2 min-w-[65px]"
              style={{ minWidth: 65 }}
            >
              {wrapHeader("Total")}
            </TableHead>
            {days.map((day, idx) => (
              <TableHead className="text-right text-gray-700 px-1 py-2 font-normal min-w-[75px]" key={idx} style={{ minWidth: 75 }}>
                <div className="flex items-center justify-end gap-1">
                  {/* Optionally, add expand + for detail if needed */}
                  <button
                    type="button"
                    className="w-4 h-4 rounded flex items-center justify-center text-blue-400 hover:bg-blue-50 transition"
                    onClick={() =>
                      setExpandedDays(prev => ({ ...prev, [idx]: !prev[idx] }))
                    }
                    aria-label="Toggle Day Detail"
                  >
                    <Plus size={14} strokeWidth={2} />
                  </button>
                  <span className="break-words">{format(day.date, "MMM d")}</span>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((row, rowIdx) => (
            <TableRow key={row.key} className="border-b hover:bg-gray-50 last:border-b-0">
              <TableCell className="py-1 px-1 text-xs font-medium text-gray-900 whitespace-nowrap min-w-[90px]">
                <span className="inline-block w-4 h-4 text-blue-400 mr-1 align-middle">
                  {row.key === "incidentals" 
                    ? <Info className="w-4 h-4" />
                    : <span className="inline-block w-3 h-3 rounded-full bg-blue-100" />
                  }
                </span>
                {row.label}
              </TableCell>
              <TableCell className="text-right font-bold font-mono px-1 text-sm align-middle">
                {rowTotals[rowIdx].toLocaleString(undefined, {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                })}
              </TableCell>
              {rowResults[rowIdx].values.map((v, idx) => {
                const day = days[idx];
                const isIncidentals = row.key === "incidentals";
                const mealKey = row.key as MealType;
                const provided = !isIncidentals && day.mealsProvided.includes(mealKey);

                // Highlight if prorated (value nonzero, percent < 1)
                const highlight =
                  !isIncidentals && v !== 0 && day.percent < 1
                    ? "bg-[#FEF7CD]" // soft yellow
                    : isIncidentals && day.percent < 1 && v !== 0
                      ? "bg-[#D3E4FD]" // soft blue for partial incidentals
                      : "";

                return (
                  <TableCell
                    key={idx}
                    className={`text-right px-1 py-1 font-mono group align-middle ${highlight}`}
                    style={{ position: "relative" }}
                  >
                    <span className="flex justify-end items-center gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span
                              className={`flex items-center cursor-pointer underline decoration-dotted decoration-2 ${v === 0 ? 'text-gray-400' : ''}`}
                            >
                              {v.toLocaleString(undefined, {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 2,
                              })}
                              {" "}
                              <Info className="w-3 h-3 text-blue-400 ml-1" aria-label="More info" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="max-w-xs rounded shadow-lg bg-white border text-gray-900 p-3">
                            {createTooltip({
                              mealLabel: row.label,
                              provided: isIncidentals ? false : provided,
                              rate: isIncidentals ? rates.incidentals : rates[mealKey],
                              percent: day.percent,
                              isIncidentals,
                              value: v
                            })}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </span>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
          {/* Row for Final Total per Day */}
          <TableRow className="bg-green-50 border-t-2 border-green-300">
            <TableCell className="font-extrabold text-xs text-green-900 py-1 px-1 align-middle whitespace-normal">
              <span className="inline-block w-3 h-3 rounded bg-green-400 mr-1 align-middle" />
              <span className="break-words">Total Per Day</span>
            </TableCell>
            <TableCell className="font-extrabold text-base text-green-900 text-right px-1 font-mono align-middle">
              {grandTotal.toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
              })}
            </TableCell>
            {dayTotals.map((dTotal, idx) => (
              <TableCell
                key={idx}
                className="font-bold text-green-900 text-right font-mono bg-green-50 px-1 py-1 align-middle"
              >
                {dTotal.toLocaleString(undefined, {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                })}
              </TableCell>
            ))}
          </TableRow>
          {/* Expanded day details (optional, only if expanded) */}
          {days.map((day, idx) => expandedDays[idx] && (
            <TableRow key={`expando-${idx}`} className="bg-gray-50">
              <TableCell colSpan={2 + days.length} className="py-2 px-4">
                <div className="text-xs text-gray-700 font-mono">
                  <div>Date: <strong>{format(day.date, "PPP")}</strong></div>
                  <div>
                    Meals Provided: {day.mealsProvided.length ? day.mealsProvided.join(", ") : "None"}
                  </div>
                  <div>
                    Proration: {(day.percent * 100).toFixed(0)}%
                  </div>
                  <div>
                    Total for this day:{" "}
                    <span className="font-bold text-green-800">
                      {dayTotals[idx].toLocaleString(undefined, {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Simple summary below table */}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge className="cursor-pointer bg-green-100 text-green-700 border-green-400 border font-medium text-xs px-3 py-1.5 hover:shadow transition">
                Final Reimbursable Total: {grandTotal.toLocaleString(undefined, {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                })}
              </Badge>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs p-3 bg-white border">
              <div className="text-xs space-y-1">
                <div>
                  <span className="font-semibold">Total Full Days:</span> {numFull} × ${fullPerDay}
                </div>
                {partials.length > 0 && (
                  <div>
                    <span className="font-semibold">Partial Days:</span>{" "}
                    {partials.map(p =>
                      `${format(p.date, "MMM d")} ($${p.val.toFixed(2)})`
                    ).join(", ")}
                  </div>
                )}
                <div className="border-t border-gray-200 my-1" />
                <div>
                  <span className="font-semibold">Final Reimbursement:</span>{" "}
                  {grandTotal.toLocaleString(undefined, {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                  })}
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span className="text-xs text-gray-500">
          {days.some(d => d.percent < 1)
            ? <Badge variant="outline" className="text-blue-600 border-blue-200">Duration Proration Applied</Badge>
            : <Badge variant="outline" className="text-gray-500 border-gray-200">Full Per Diem</Badge>
          }
        </span>
      </div>
    </div>
  );
};

export default UltraCleanPerDiemTable;
