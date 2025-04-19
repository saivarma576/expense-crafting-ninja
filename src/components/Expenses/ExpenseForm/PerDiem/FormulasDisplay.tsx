
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator, Percent, CircleDollarSign } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface FormulasDisplayProps {
  perDiemRate: number;
  breakfastRate: number;
  lunchRate: number;
  dinnerRate: number;
}

const FormulasDisplay: React.FC<FormulasDisplayProps> = ({
  perDiemRate,
  breakfastRate,
  lunchRate,
  dinnerRate,
}) => {
  return (
    <Card className="border-dashed border-gray-300 bg-gray-50/50">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-start gap-2">
          <Calculator className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-sm">Per Diem Rate Calculation</h4>
            <p className="text-sm text-gray-600 mt-1">
              Daily Rate = Base Rate × Time Percentage
              <br />
              <span className="text-blue-600 font-medium">${perDiemRate}</span> = Base Rate × Time %
            </p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex items-start gap-2">
          <Percent className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-sm">Meal Deduction Breakdown</h4>
            <div className="grid grid-cols-2 gap-2 mt-1 text-sm text-gray-600">
              <div>• Breakfast: ${breakfastRate}</div>
              <div>• Lunch: ${lunchRate}</div>
              <div>• Dinner: ${dinnerRate}</div>
              <div>• Total: ${breakfastRate + lunchRate + dinnerRate}</div>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex items-start gap-2">
          <CircleDollarSign className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-sm">Final Calculation</h4>
            <p className="text-sm text-gray-600 mt-1">
              Final Amount = (Daily Rate × Time %) - Meal Deductions
              <br />
              Example: ${perDiemRate} × 100% - $0 = ${perDiemRate}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormulasDisplay;
