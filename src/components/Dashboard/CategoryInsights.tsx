
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="col-span-full bg-gray-50/70 border border-primary/5 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-1">
            <p className="text-xs uppercase font-medium text-gray-500">HIGHEST CLAIMED CATEGORY</p>
            <p className="text-base font-medium text-gray-900">{highestCategory}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase font-medium text-gray-500">AMOUNT CLAIMED</p>
            <p className="text-base font-medium text-gray-900">{currency} {highestAmount.toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase font-medium text-gray-500">LOWEST CLAIMED CATEGORY</p>
            <p className="text-base font-medium text-gray-900">{lowestCategory}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase font-medium text-gray-500">AMOUNT CLAIMED</p>
            <p className="text-base font-medium text-gray-900">{currency} {lowestAmount.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryInsights;
