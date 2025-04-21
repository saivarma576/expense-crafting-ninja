
import React from "react";
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
// Only use Lucide icon once for meals
import { CircleHelp } from "lucide-react";

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

// For minimal look, one icon per row, or just text
const ROWS: { key: MealType | "incidentals", label: string, icon?: React.ReactNode }[] = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
  { key: "incidentals", label: "Incidentals" },
];

// Utility to get meal value for a day, now typed
function getMealValue(day: PerDiemDay, meal: MealType, rates: UltraCleanPerDiemTableProps["rates"]) {
  // If meal provided, value is 0, else it's rate * percent.
  return day.mealsProvided.includes(meal) ? 0 : rates[meal] * day.percent;
}
function getIncidentals(day: PerDiemDay, rates: UltraCleanPerDiemTableProps["rates"]) {
  return rates.incidentals * day.percent;
}

// Generate tooltip text for a cell
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
  const calculationLine = `$${rate.toFixed(2)} × ${(percent * 100).toFixed(0)}% = $${value.toFixed(2)}`;
  return (
    <div>
      <div className="mb-1">
        <span className="font-semibold">Meals Provided:</span> {provided ? "Yes" : "No"}
      </div>
      <div className="mb-1">
        <span className="font-semibold">GSA {mealLabel} Rate:</span> ${rate.toFixed(2)}
      </div>
      <div className="mb-1">
        <span className="font-semibold">Duration:</span> {percentText}
      </div>
      <div className="mb-1">
        <span className="font-semibold">Calculation:</span> {calculationLine}
      </div>
      <div>
        <span className="font-semibold">Final Amount:</span> ${value.toFixed(2)}
      </div>
    </div>
  );
}

const UltraCleanPerDiemTable: React.FC<UltraCleanPerDiemTableProps> = ({ days, rates, baseRate }) => {
  // Calculate values and totals per row
  // Move "Total" to left for each row
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

  return (
    <div className="w-full max-w-4xl border rounded-xl bg-white shadow p-4 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-left font-semibold text-gray-700 px-2" style={{ minWidth: 110 }}>
              Category
            </TableHead>
            <TableHead className="text-right font-bold text-gray-700 px-2" style={{ minWidth: 80 }}>
              Total
            </TableHead>
            {days.map((day, idx) => (
              <TableHead className="text-right text-gray-700 px-2 font-normal" key={idx} style={{ minWidth: 90 }}>
                {format(day.date, "MMM d")}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((row, rowIdx) => (
            <TableRow key={row.key} className="border-b hover:bg-gray-50 last:border-b-0">
              <TableCell className="py-2 px-2 text-sm font-medium text-gray-900 whitespace-nowrap">
                {/* Only 1 subtle icon if you want, or just text */}
                <span className="inline-block w-5 h-5 text-blue-400 mr-2 align-middle">
                  {row.key === "incidentals" 
                    ? <CircleHelp className="w-4 h-4" />
                    : <span className="inline-block w-3 h-3 rounded-full bg-blue-100" />
                  }
                </span>
                {row.label}
              </TableCell>
              <TableCell className="text-right font-bold font-mono px-2 text-base align-middle">
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
                return (
                  <TableCell key={idx} className="text-right px-2 py-1.5 font-mono">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className={`cursor-pointer underline decoration-dotted decoration-2 ${v === 0 ? 'text-gray-400' : ''}`}>
                            {v.toLocaleString(undefined, {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 2,
                            })}
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
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
          {/* Row for Final Total per Day (highlighted, compact!) */}
          <TableRow className="bg-green-50 border-t-2 border-green-300">
            <TableCell className="font-extrabold text-sm text-green-900 py-2 px-2 align-middle">
              <span className="inline-block w-4 h-4 rounded bg-green-400 mr-2 align-middle" />
              Total Per Day
            </TableCell>
            <TableCell className="font-extrabold text-lg text-green-900 text-right px-2 font-mono align-middle">
              {grandTotal.toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
              })}
            </TableCell>
            {dayTotals.map((dTotal, idx) => (
              <TableCell
                key={idx}
                className="font-bold text-green-900 text-right font-mono bg-green-50 px-2 py-2 align-middle"
              >
                {dTotal.toLocaleString(undefined, {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                })}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
      {/* Simple summary below table */}
      <div className="mt-4 flex items-center gap-4">
        <Badge className="bg-green-100 text-green-700 border-green-400 border font-medium text-sm px-4 py-2">
          Final Reimbursable Total: {grandTotal.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          })}
        </Badge>
        <span className="text-xs text-gray-500">
          {/* Simple pill about: meals provided, duration-based % */}
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

