
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

// Data for the table based on your requirements
const PER_DIEM_DATA = [
  {
    label: "Breakfast",
    values: [
      {
        amount: 9,
        tooltip:
          "🍳 Breakfast reimbursed\n50% of $18 = $9.00\n(Duration: 11 hrs → 50% applied)",
      },
      {
        amount: 18,
        tooltip: "🍳 Breakfast reimbursed\n100% of $18 = $18.00\n(Duration: 19 hrs → 100% applied)",
      },
      {
        amount: 0,
        tooltip: "🍳 Meal provided by host\nNot eligible for reimbursement",
      },
      {
        amount: 9,
        tooltip: "🍳 Breakfast reimbursed\n50% of $18 = $9.00",
      },
      {
        amount: 36, // Total for this row
        tooltip: "",
        isTotal: true,
      },
    ],
    base: 18,
  },
  {
    label: "Lunch",
    values: [
      {
        amount: 10,
        tooltip: "🥗 Lunch reimbursed\n50% of $20 = $10.00",
      },
      {
        amount: 20,
        tooltip: "🥗 Lunch reimbursed\n100% of $20 = $20.00",
      },
      {
        amount: 0,
        tooltip: "🍱 Meal provided by meeting organizer\nNot eligible for reimbursement",
      },
      {
        amount: 10,
        tooltip: "🥗 Lunch reimbursed\n50% of $20 = $10.00",
      },
      {
        amount: 40,
        tooltip: "",
        isTotal: true,
      },
    ],
    base: 20,
  },
  {
    label: "Dinner",
    values: [
      {
        amount: 15.5,
        tooltip: "🍽️ Dinner reimbursed\n50% of $31 = $15.50",
      },
      {
        amount: 31,
        tooltip: "🍽️ Dinner reimbursed\n100% of $31 = $31.00",
      },
      {
        amount: 0,
        tooltip: "🍱 Meal provided by meeting organizer\nNot eligible for reimbursement",
      },
      {
        amount: 15.5,
        tooltip: "🍽️ Dinner reimbursed\n50% of $31 = $15.50",
      },
      {
        amount: 62,
        tooltip: "",
        isTotal: true,
      },
    ],
    base: 31,
  },
  {
    label: "Incidentals",
    values: [
      {
        amount: 2.5,
        tooltip: "💼 Incidentals\n50% of $5 = $2.50",
      },
      {
        amount: 5,
        tooltip: "💼 Incidentals\n100% of $5 = $5.00",
      },
      {
        amount: 5,
        tooltip: "💼 Incidentals\n100% of $5 = $5.00",
      },
      {
        amount: 2.5,
        tooltip: "💼 Incidentals\n50% of $5 = $2.50",
      },
      {
        amount: 15,
        tooltip: "",
        isTotal: true,
      },
    ],
    base: 5,
  },
];

const FINAL_TOTALS = [37, 74, 23, 37, 171];

const dayHeaders = ["Day 1", "Day 2", "Day 3", "Day 4", "Total"];

const UltraCleanPerDiemTable: React.FC = () => (
  <TooltipProvider>
    <div className="overflow-x-auto border rounded-lg w-full max-w-full mb-6 bg-white">
      <Table className="min-w-[700px] border-collapse">
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold"></TableHead>
            {dayHeaders.map((day, idx) => (
              <TableHead key={day + idx} className="text-center font-semibold text-gray-700">
                {day}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {PER_DIEM_DATA.map((row, rowIdx) => (
            <TableRow key={row.label}>
              <TableCell className="font-medium whitespace-nowrap">{row.label}
                <span className="text-xs text-gray-500 ml-1">
                  (${row.base})
                </span>
              </TableCell>
              {row.values.map((cell, cellIdx) => (
                <TableCell key={row.label + "-cell-" + cellIdx} className="text-center relative">
                  <span>
                    {cell.amount?.toLocaleString(undefined, {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }) || ""}
                  </span>
                  {!cell.isTotal && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className="inline-flex items-center ml-1 text-blue-500 focus:outline-none hover:text-blue-700"
                          tabIndex={0}
                          aria-label={"info"}
                        >
                          <Info className="w-3.5 h-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs whitespace-pre-line text-xs">
                        {cell.tooltip}
                      </TooltipContent>
                    </Tooltip>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {/* Final total per day */}
          <TableRow className="bg-blue-50 font-semibold border-t-2 border-blue-200">
            <TableCell className="py-3 font-semibold">🟩 Final Total Per Day</TableCell>
            {FINAL_TOTALS.map((tot, idx) => (
              <TableCell key={"final-" + idx} className="text-center py-3 font-semibold">
                {tot.toLocaleString(undefined, {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
    {/* Table Summary Below */}
    <div className="bg-neutral-50 border rounded p-4 mt-2 text-sm max-w-2xl">
      <div className="font-semibold mb-1">🧾 Summary</div>
      <ul className="list-disc ml-6 space-y-1">
        <li>
          <span className="font-medium">Base Per Diem Rate:</span> <span className="tabular-nums">$74.00/day</span>
        </li>
        <li>
          <span className="font-medium">Duration-Based % Applied:</span> <span className="text-gray-500">Hidden (viewable via 🛈 tooltips)</span>
        </li>
        <li>
          <span className="font-medium">Meals Provided:</span> Lunch &amp; Dinner on Day 3
        </li>
        <li>
          <span className="font-medium">✅ Final Reimbursable Total:</span>{" "}
          <span className="font-bold text-green-700">$171.00</span>
        </li>
      </ul>
    </div>
  </TooltipProvider>
);

export default UltraCleanPerDiemTable;
