
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
import { CircleHelp } from "lucide-react";

// Type for a single day's per diem data
type PerDiemDay = {
  date: Date;
  percent: number; // 0-1 fraction
  mealsProvided: ("breakfast" | "lunch" | "dinner")[];
};

interface UltraCleanPerDiemTableProps {
  days: PerDiemDay[];
  rates: { breakfast: number; lunch: number; dinner: number; incidentals: number };
  baseRate: number;
}

// Label and icon map
const ROWS: { key: "breakfast" | "lunch" | "dinner" | "incidentals", label: string, icon: React.ReactNode }[] = [
  {
    key: "breakfast",
    label: "Breakfast",
    icon: <CircleHelp className="text-purple-700 w-4 h-4 mr-1.5 inline-block align-middle" aria-label="Breakfast" />,
  },
  {
    key: "lunch",
    label: "Lunch",
    icon: <span role="img" aria-label="Lunch" className="mr-1.5 align-middle">🥗</span>,
  },
  {
    key: "dinner",
    label: "Dinner",
    icon: <span role="img" aria-label="Dinner" className="mr-1.5 align-middle">🍽️</span>,
  },
  {
    key: "incidentals",
    label: "Incidentals",
    icon: <span role="img" aria-label="Incidentals" className="mr-1.5 align-middle">💼</span>,
  }
];

// Utility to get meal value for a day
function getMealValue(day: PerDiemDay, meal: "breakfast" | "lunch" | "dinner" | "incidentals", rates: UltraCleanPerDiemTableProps["rates"]) {
  if (meal === "incidentals") return rates.incidentals * day.percent;
  // Type guard: only check for meal in ["breakfast", "lunch", "dinner"]
  return day.mealsProvided.includes(meal)
    ? 0
    : rates[meal] * day.percent;
}

const UltraCleanPerDiemTable: React.FC<UltraCleanPerDiemTableProps> = ({ days, rates, baseRate }) => {
  // Prepare 2D array of values
  const values = ROWS.map(row =>
    days.map(day => getMealValue(day, row.key, rates))
  );
  // Row totals
  const rowTotals = values.map(
    rowArr => rowArr.reduce((a, b) => a + b, 0)
  );
  // Per-day totals
  const dayTotals = days.map((_, dayIdx) =>
    ROWS.reduce((sum, row, rowIdx) => sum + values[rowIdx][dayIdx], 0)
  );
  // Grand total
  const grandTotal = dayTotals.reduce((a, b) => a + b, 0);

  return (
    <div className="border rounded-xl bg-white shadow p-0 overflow-x-auto max-w-full">
      <Table>
        <TableHeader>
          <TableRow className="sticky top-0 bg-white border-b z-10">
            <TableHead className="text-left w-36"> </TableHead>
            {days.map((day, idx) => (
              <TableHead className="text-center font-semibold text-gray-800" key={idx} style={{ minWidth: 90 }}>
                Day {idx + 1}
              </TableHead>
            ))}
            <TableHead className="text-center font-bold text-gray-800" style={{ minWidth: 90 }}>
              Total
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map((row, rowIdx) => (
            <TableRow key={row.key} className="border-b">
              <TableCell className="font-semibold whitespace-nowrap py-2 text-left flex items-center gap-1">
                {row.icon}
                {row.label}
              </TableCell>
              {values[rowIdx].map((v, idx) => (
                <TableCell
                  key={idx}
                  className="text-right font-mono py-2 px-2"
                  style={{ verticalAlign: 'middle' }}
                >
                  {v.toLocaleString(undefined, {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                  })}
                  {row.key !== "incidentals" && (
                    <span className="ml-1 text-gray-400" title="See if this meal was provided.">
                      <CircleHelp className="inline w-3.5 h-3.5 align-middle" />
                    </span>
                  )}
                </TableCell>
              ))}
              <TableCell className="text-right font-bold px-2 font-mono" style={{ verticalAlign: 'middle' }}>
                {rowTotals[rowIdx].toLocaleString(undefined, {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                })}
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-green-50 border-t-4 border-green-300 animate-fade-in">
            <TableCell className="font-extrabold text-md text-green-900 flex items-center gap-2 py-3">
              <span className="w-4 h-4 rounded bg-green-400 mr-2 inline-block" />
              Final Total Per Day
            </TableCell>
            {dayTotals.map((dTotal, idx) => (
              <TableCell
                key={idx}
                className="font-bold text-green-900 text-right font-mono bg-green-50 py-3"
              >
                {dTotal.toLocaleString(undefined, {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                })}
              </TableCell>
            ))}
            <TableCell className="font-extrabold text-xl text-right font-mono bg-green-200 border-l-2 border-green-400 py-3">
              {grandTotal.toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
              })}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default UltraCleanPerDiemTable;
