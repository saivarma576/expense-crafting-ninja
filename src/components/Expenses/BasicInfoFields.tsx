
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
      <div className="mb-5">
        <h3 className="text-sm font-medium text-gray-700 block mb-3">Expense Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
          {/* Date */}
          <div>
            <label htmlFor="date" className="text-sm font-medium text-gray-700 block mb-1.5">Date <span className="text-red-500">*</span></label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Calendar className="h-4 w-4" />
              </div>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => onDateChange(e.target.value)}
                className="pl-9 w-full h-11 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="text-sm font-medium text-gray-700 block mb-1.5">Amount <span className="text-red-500">*</span></label>
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
                className="pl-9 w-full h-11 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Merchant Name */}
          <div>
            <label htmlFor="merchantName" className="text-sm font-medium text-gray-700 block mb-1.5">Merchant Name <span className="text-red-500">*</span></label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Building className="h-4 w-4" />
              </div>
              <input
                id="merchantName"
                type="text"
                placeholder="E.g., Office Depot"
                className="pl-9 w-full h-11 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="text-sm font-medium text-gray-700 block mb-1.5">Description <span className="text-red-500">*</span></label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <FileText className="h-4 w-4" />
              </div>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                className="pl-9 w-full h-11 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief description"
              />
            </div>
          </div>

          {/* GL Account */}
          <div>
            <label htmlFor="account" className="text-sm font-medium text-gray-700 block mb-1.5">GL Account <span className="text-red-500">*</span></label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Building className="h-4 w-4" />
              </div>
              <input
                id="account"
                type="text"
                placeholder="E.g., 50600140"
                className="pl-9 w-full h-11 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="mb-5">
        <label htmlFor="notes" className="text-sm font-medium text-gray-700 block mb-1.5">Additional Notes</label>
        <textarea
          id="notes"
          className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-h-[100px] resize-none"
          placeholder="Additional information or context for this expense..."
        />
        <p className="text-xs text-gray-500 mt-1">Comments section should be used for documenting any differences between receipts and amounts requested.</p>
      </div>
    </>
  );
};

export default BasicInfoFields;
