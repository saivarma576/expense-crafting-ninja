
import React from "react";
import UltraCleanPerDiemTable from "./UltraCleanPerDiemTable";

// Example prop set. In real code, receive these from above!
const mockDays = [
  // Example for 4 days
  {
    date: new Date(2024, 6, 1),
    percent: 0.5,
    mealsProvided: [] as ("breakfast" | "lunch" | "dinner")[],
  },
  {
    date: new Date(2024, 6, 2),
    percent: 1,
    mealsProvided: [] as ("breakfast" | "lunch" | "dinner")[],
  },
  {
    date: new Date(2024, 6, 3),
    percent: 0.25,
    mealsProvided: ["lunch", "dinner"] as ("breakfast" | "lunch" | "dinner")[],
  },
  {
    date: new Date(2024, 6, 4),
    percent: 0.5,
    mealsProvided: [] as ("breakfast" | "lunch" | "dinner")[],
  },
];

const mealRates = {
  breakfast: 18,
  lunch: 20,
  dinner: 31,
  incidentals: 5,
};
const baseRate = 74;

const CalculationDetailsTable: React.FC = () => {
  // In production, get days/meals/rates as props or from a context/store
  return (
    <UltraCleanPerDiemTable
      days={mockDays}
      rates={mealRates}
      baseRate={baseRate}
    />
  );
};

export default CalculationDetailsTable;
