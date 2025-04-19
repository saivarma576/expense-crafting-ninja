
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';

interface TotalSummaryCardProps {
  total: number;
  startDate: Date;
  endDate: Date;
  location: string;
  zipCode: string;
}

const TotalSummaryCard: React.FC<TotalSummaryCardProps> = ({
  total,
  startDate,
  endDate,
  location,
  zipCode
}) => {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Total Reimbursement</p>
            <p className="text-3xl font-semibold text-gray-900">${total.toFixed(2)}</p>
          </div>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <span>📅</span>
            {format(startDate, 'MMM dd, yyyy')} – {format(endDate, 'MMM dd, yyyy')}
          </p>
          <p className="flex items-center gap-2">
            <span>📍</span>
            {location} (ZIP {zipCode})
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalSummaryCard;
