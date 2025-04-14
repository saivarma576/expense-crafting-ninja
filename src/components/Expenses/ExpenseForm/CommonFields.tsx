
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, DollarSign } from 'lucide-react';
import { ExpenseType } from '@/types/expense';
import { FieldGroupProps } from './types';

interface CommonFieldsProps extends FieldGroupProps {
  type: ExpenseType;
  isAmountDisabled?: boolean;
  fieldErrors?: Record<string, string | null>;
}

const CommonFields: React.FC<CommonFieldsProps> = ({
  type,
  values,
  onChange,
  isAmountDisabled,
  fieldErrors = {}
}) => {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-4">
      <div>
        <Label htmlFor="costCenter" className="text-xs font-medium text-gray-700 flex items-center">
          Cost Center <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="costCenter"
          value={values.costCenter || ''}
          onChange={(e) => onChange('costCenter', e.target.value)}
          placeholder="Enter cost center"
          className={`h-8 px-2 py-1 text-sm ${fieldErrors.costCenter ? 'border-red-500' : ''}`}
          required
        />
        {fieldErrors.costCenter && (
          <p className="mt-1 text-xs text-red-500">{fieldErrors.costCenter}</p>
        )}
      </div>

      <div>
        <Label htmlFor="date" className="text-xs font-medium text-gray-700 flex items-center">
          Date <span className="text-red-500 ml-1">*</span>
        </Label>
        <div className="relative">
          <Input
            id="date"
            type="date"
            value={values.date || ''}
            onChange={(e) => onChange('date', e.target.value)}
            className={`h-8 px-2 py-1 text-sm ${fieldErrors.date ? 'border-red-500' : ''}`}
            required
          />
          <Calendar className="w-4 h-4 absolute right-2 top-2 text-gray-400 pointer-events-none" />
        </div>
        {fieldErrors.date && (
          <p className="mt-1 text-xs text-red-500">{fieldErrors.date}</p>
        )}
      </div>

      <div>
        <Label htmlFor="wbs" className="text-xs font-medium text-gray-700 flex items-center">
          WBS <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="wbs"
          value={values.wbs || ''}
          onChange={(e) => onChange('wbs', e.target.value)}
          placeholder="Enter WBS code"
          className={`h-8 px-2 py-1 text-sm ${fieldErrors.wbs ? 'border-red-500' : ''}`}
          required
        />
        {fieldErrors.wbs && (
          <p className="mt-1 text-xs text-red-500">{fieldErrors.wbs}</p>
        )}
      </div>

      <div>
        <Label htmlFor="amount" className="text-xs font-medium text-gray-700 flex items-center">
          Expense Amount <span className="text-red-500 ml-1">*</span>
        </Label>
        <div className="relative">
          <Input
            id="amount"
            type="number"
            value={values.amount || 0}
            onChange={(e) => onChange('amount', parseFloat(e.target.value) || 0)}
            placeholder="0.00"
            className={`h-8 pl-6 pr-2 py-1 text-sm ${fieldErrors.amount ? 'border-red-500' : ''}`}
            disabled={isAmountDisabled}
            required
          />
          <DollarSign className="w-4 h-4 absolute left-2 top-2 text-gray-400 pointer-events-none" />
        </div>
        {fieldErrors.amount && (
          <p className="mt-1 text-xs text-red-500">{fieldErrors.amount}</p>
        )}
      </div>

      <div className="col-span-2">
        <Label htmlFor="description" className="text-xs font-medium text-gray-700 flex items-center">
          Description <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="description"
          value={values.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Enter expense description"
          className={`h-8 px-2 py-1 text-sm ${fieldErrors.description ? 'border-red-500' : ''}`}
          required
        />
        {fieldErrors.description && (
          <p className="mt-1 text-xs text-red-500">{fieldErrors.description}</p>
        )}
      </div>

      <div className="col-span-2">
        <Label htmlFor="merchantName" className="text-xs font-medium text-gray-700 flex items-center">
          Merchant Name <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="merchantName"
          value={values.merchantName || ''}
          onChange={(e) => onChange('merchantName', e.target.value)}
          placeholder="Enter merchant name"
          className={`h-8 px-2 py-1 text-sm ${fieldErrors.merchantName ? 'border-red-500' : ''}`}
          required
        />
        {fieldErrors.merchantName && (
          <p className="mt-1 text-xs text-red-500">{fieldErrors.merchantName}</p>
        )}
      </div>
    </div>
  );
};

export default CommonFields;
