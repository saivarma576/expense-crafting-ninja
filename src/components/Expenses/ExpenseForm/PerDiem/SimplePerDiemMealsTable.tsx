
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DAYS = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Total"];

const SAFE_DATA = {
  duration: ["11.0 hrs", "19.0 hrs", "6.0 hrs", "—", "—", "—", "—"],
  percent: ["50%", "87.50%", "25%", "—", "—", "—", "—"],
  perDiem: ["$74.00", "$74.00", "$74.00", "—", "—", "—", "$222.00"],
  afterPercent: ["$37.00", "$64.75", "$18.50", "—", "—", "—", "$120.25"],
  breakfast: ["Provided", "$18.00", "Provided", "", "", "", "$36.00"],
  lunch: ["$20.00", "$20.00", "Provided", "", "", "", "$40.00"],
  dinner: ["", "", "", "", "", "", ""],
  incidentals: ["", "", "", "", "", "", ""],
  dailyTotal: ["$1.00", "$26.75", "$18.50", "$0.00", "$0.00", "$0.00", "$46.25"],
};

const SimplePerDiemMealsTable: React.FC = () => (
  <div className="overflow-x-auto w-full border rounded-lg">
    <Table className="min-w-[700px] border-collapse">
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          {DAYS.map((day, idx) => (
            <TableHead key={day + idx} className="text-center">{day}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Duration</TableCell>
          {SAFE_DATA.duration.map((v, i) => <TableCell key={"dur-"+i} className="text-center">{v}</TableCell>)}
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">% Applied</TableCell>
          {SAFE_DATA.percent.map((v, i) => <TableCell key={"per-"+i} className="text-center">{v}</TableCell>)}
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Per Diem Rate <span className="text-xs">($74)</span></TableCell>
          {SAFE_DATA.perDiem.map((v, i) => <TableCell key={"pd-"+i} className="text-center">{v}</TableCell>)}
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">After % Applied</TableCell>
          {SAFE_DATA.afterPercent.map((v, i) => <TableCell key={"after-"+i} className="text-center">{v}</TableCell>)}
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Breakfast <span className="text-xs">($18)</span></TableCell>
          {SAFE_DATA.breakfast.map((v, i) => <TableCell key={"bf-"+i} className="text-center">{v}</TableCell>)}
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Lunch <span className="text-xs">($20)</span></TableCell>
          {SAFE_DATA.lunch.map((v, i) => <TableCell key={"lunch-"+i} className="text-center">{v}</TableCell>)}
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Dinner <span className="text-xs">($31)</span></TableCell>
          {SAFE_DATA.dinner.map((v, i) => <TableCell key={"dinner-"+i} className="text-center">{v}</TableCell>)}
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Incidentals <span className="text-xs">($5)</span></TableCell>
          {SAFE_DATA.incidentals.map((v, i) => <TableCell key={"inc-"+i} className="text-center">{v}</TableCell>)}
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Daily Total</TableCell>
          {SAFE_DATA.dailyTotal.map((v, i) => <TableCell key={"dtot-"+i} className="text-center font-semibold">{v}</TableCell>)}
        </TableRow>
      </TableBody>
    </Table>
  </div>
);

export default SimplePerDiemMealsTable;
