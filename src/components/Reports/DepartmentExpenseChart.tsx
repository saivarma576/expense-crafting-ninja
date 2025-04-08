
import React from 'react';
import BarChartComponent from '../Charts/BarChartComponent';

interface DepartmentData {
  name: string;
  value: number;
}

interface DepartmentExpenseChartProps {
  deptData: DepartmentData[];
}

const DepartmentExpenseChart: React.FC<DepartmentExpenseChartProps> = ({ deptData }) => {
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="mb-4">
        <h2 className="text-lg font-medium">Expenses by Department</h2>
        <p className="text-sm text-muted-foreground">Department breakdown</p>
      </div>
      
      <BarChartComponent 
        data={deptData}
        barColor="#3b82f6"
        height={300}
        barSize={24}
      />
    </div>
  );
};

export default DepartmentExpenseChart;
