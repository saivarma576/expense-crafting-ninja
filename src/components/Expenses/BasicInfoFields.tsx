
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
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-4">
        {/* Amount */}
        <div>
          <label htmlFor="amount" className="text-sm font-medium text-gray-700 block mb-1.5">Amount</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <DollarSign className="h-4 w-4" />
            </div>
            <input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => onAmountChange(parseFloat(e.target.value) || 0)}
              className="pl-9 w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="text-sm font-medium text-gray-700 block mb-1.5">Date</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Calendar className="h-4 w-4" />
            </div>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
              className="pl-9 w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* GL Account */}
        <div>
          <label htmlFor="account" className="text-sm font-medium text-gray-700 block mb-1.5">GL Account</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Building className="h-4 w-4" />
            </div>
            <select
              id="account"
              value={account}
              onChange={(e) => onAccountChange(e.target.value)}
              className="pl-9 w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
          <label htmlFor="costCenter" className="text-sm font-medium text-gray-700 block mb-1.5">Cost Center</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <BriefcaseBusiness className="h-4 w-4" />
            </div>
            <select
              id="costCenter"
              value={costCenter}
              onChange={(e) => onCostCenterChange(e.target.value)}
              className="pl-9 w-full h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
      <div className="mb-4">
        <label htmlFor="description" className="text-sm font-medium text-gray-700 block mb-1.5">Description</label>
        <div className="relative">
          <div className="absolute left-3 top-3 text-gray-500">
            <FileText className="h-4 w-4" />
          </div>
          <textarea
            id="description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="pl-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-h-[60px] max-h-[100px] resize-none"
            placeholder="Enter description"
          />
        </div>
      </div>
    </>
  );
};

export default BasicInfoFields;
