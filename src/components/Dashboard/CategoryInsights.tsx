
import React from 'react';
import StatCard from '../ui/StatCard';

interface CategoryInsightsProps {
  highestCategory: string;
  highestAmount: number;
  lowestCategory: string;
  lowestAmount: number;
  currency: string;
}

const CategoryInsights: React.FC<CategoryInsightsProps> = ({
  highestCategory,
  highestAmount,
  lowestCategory,
  lowestAmount,
  currency
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatCard
        title="HIGHEST CLAIMED CATEGORY"
        value={highestCategory}
        description={`${currency} ${highestAmount.toLocaleString()}`}
        className="h-full"
      />
      <StatCard
        title="LOWEST CLAIMED CATEGORY"
        value={lowestCategory}
        description={`${currency} ${lowestAmount.toLocaleString()}`}
        className="h-full"
      />
    </div>
  );
};

export default CategoryInsights;
