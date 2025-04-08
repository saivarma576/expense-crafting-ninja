
import React from 'react';
import { ListFilter } from 'lucide-react';
import AreaChartComponent from '../Charts/AreaChartComponent';

interface MonthData {
  name: string;
  value: number;
}

interface ExpenseTrendChartProps {
  monthlyData: MonthData[];
}

const ExpenseTrendChart: React.FC<ExpenseTrendChartProps> = ({ monthlyData }) => {
  return (
    <div className="lg:col-span-2 glass-card rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-medium">Expense Trend</h2>
          <p className="text-sm text-muted-foreground">Monthly expense distribution</p>
        </div>
        <button className="p-2 rounded-md hover:bg-muted transition-colors">
          <ListFilter className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
      
      <AreaChartComponent 
        data={monthlyData}
        gradientColor="#3b82f6"
        strokeColor="#3b82f6"
        height={300}
      />
    </div>
  );
};

export default ExpenseTrendChart;
