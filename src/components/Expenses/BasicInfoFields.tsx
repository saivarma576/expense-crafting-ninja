
import React from 'react';
import { Calendar, DollarSign, Building, BriefcaseBusiness, FileText } from 'lucide-react';
import { GLAccount, CostCenter } from '@/types/expense';

interface BasicInfoFieldsProps {
  amount: number;
  date: string;
  description: string;
  account: string;
  costCenter: string;
  onAmountChange: (amount: number) => void;
  onDateChange: (date: string) => void;
  onDescriptionChange: (description: string) => void;
  onAccountChange: (account: string) => void;
  onCostCenterChange: (costCenter: string) => void;
  glAccounts: GLAccount[];
  costCenters: CostCenter[];
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({
  amount,
  date,
  description,
  account,
  costCenter,
  onAmountChange,
  onDateChange,
  onDescriptionChange,
  onAccountChange,
  onCostCenterChange,
  glAccounts,
  costCenters
}) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-x-3 gap-y-2">
        {/* Amount */}
        <div>
          <label htmlFor="amount" className="text-xs font-medium text-gray-700 block mb-1">Amount</label>
          <div className="relative">
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              <DollarSign className="h-3.5 w-3.5" />
            </div>
            <input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => onAmountChange(parseFloat(e.target.value) || 0)}
              className="pl-7 w-full h-8 rounded-md border border-gray-300 bg-transparent px-2 py-1 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="text-xs font-medium text-gray-700 block mb-1">Date</label>
          <div className="relative">
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Calendar className="h-3.5 w-3.5" />
            </div>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
              className="pl-7 w-full h-8 rounded-md border border-gray-300 bg-transparent px-2 py-1 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* GL Account */}
        <div>
          <label htmlFor="account" className="text-xs font-medium text-gray-700 block mb-1">GL Account</label>
          <div className="relative">
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Building className="h-3.5 w-3.5" />
            </div>
            <select
              id="account"
              value={account}
              onChange={(e) => onAccountChange(e.target.value)}
              className="pl-7 w-full h-8 rounded-md border border-gray-300 bg-transparent px-2 py-1 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
            >
              <option value="">Select GL Account</option>
              {glAccounts.map((acc) => (
                <option key={acc.id} value={acc.code}>
                  {acc.code} - {acc.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cost Center */}
        <div>
          <label htmlFor="costCenter" className="text-xs font-medium text-gray-700 block mb-1">Cost Center</label>
          <div className="relative">
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              <BriefcaseBusiness className="h-3.5 w-3.5" />
            </div>
            <select
              id="costCenter"
              value={costCenter}
              onChange={(e) => onCostCenterChange(e.target.value)}
              className="pl-7 w-full h-8 rounded-md border border-gray-300 bg-transparent px-2 py-1 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
            >
              <option value="">Select Cost Center</option>
              {costCenters.map((cc) => (
                <option key={cc.id} value={cc.code}>
                  {cc.code} - {cc.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-3 mt-2">
        <label htmlFor="description" className="text-xs font-medium text-gray-700 block mb-1">Description</label>
        <div className="relative">
          <div className="absolute left-2 top-2 text-gray-500">
            <FileText className="h-3.5 w-3.5" />
          </div>
          <textarea
            id="description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="pl-7 w-full rounded-md border border-gray-300 bg-transparent px-2 py-1 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-h-[50px] max-h-[50px] resize-none"
            placeholder="Enter description"
          />
        </div>
      </div>
    </>
  );
};

export default BasicInfoFields;
