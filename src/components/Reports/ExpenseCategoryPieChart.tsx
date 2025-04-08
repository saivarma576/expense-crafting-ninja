
import React from 'react';
import PieChartWithTotal from '../Charts/PieChartWithTotal';

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface CategoryGroup {
  name: string;
  categories: CategoryData[];
}

interface ExpenseCategoryPieChartProps {
  categoryData: CategoryData[];
  categoryGroups: CategoryGroup[];
}

const ExpenseCategoryPieChart: React.FC<ExpenseCategoryPieChartProps> = ({ 
  categoryData,
  categoryGroups 
}) => {
  // Create top-level category data for the pie chart
  const pieData = categoryGroups.map(group => ({
    name: group.name,
    value: group.categories.reduce((sum, cat) => sum + cat.value, 0),
    color: group.categories[0]?.color || '#ccc'
  }));

  return (
    <div className="h-full flex flex-col">
      <PieChartWithTotal 
        data={pieData} 
        title="Total" 
        subtitle="expense"
        className="flex-1 flex items-center justify-center"
      />
    </div>
  );
};

export default ExpenseCategoryPieChart;
