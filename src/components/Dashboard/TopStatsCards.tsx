
import React from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  FileText,
  CheckCircle,
  Upload,
  Receipt,
  PlusCircle,
  ChevronDown
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopStatsCardsProps {
  totalExpense: {
    amount: number;
    count: number;
  };
  processedExpense: {
    amount: number;
    count: number;
  };
  postedExpense: {
    amount: number;
    count: number;
  };
  currency: string;
}

const TopStatsCards: React.FC<TopStatsCardsProps> = ({
  totalExpense,
  processedExpense,
  postedExpense,
  currency
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Expense Tile */}
        <Card className="bg-white border-none shadow-none hover:bg-gray-50 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Expense</p>
                <h3 className="text-xl font-bold mt-1">{currency} {totalExpense.amount.toLocaleString()}</h3>
                <p className="text-xs text-gray-600 mt-1">{totalExpense.count} Expenses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expense Processed Tile */}
        <Card className="bg-white border-none shadow-none hover:bg-gray-50 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 text-green-600">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Expense Processed</p>
                <h3 className="text-xl font-bold mt-1">{currency} {processedExpense.amount.toLocaleString()}</h3>
                <p className="text-xs text-gray-600 mt-1">{processedExpense.count} Expenses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expense Posted Tile */}
        <Card className="bg-white border-none shadow-none hover:bg-gray-50 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 text-purple-600">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Expense Posted</p>
                <h3 className="text-xl font-bold mt-1">{currency} {postedExpense.amount.toLocaleString()}</h3>
                <p className="text-xs text-gray-600 mt-1">{postedExpense.count} Expenses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Create Tile - Redesigned based on reference */}
        <Card className="bg-white border-none shadow-none hover:bg-gray-50 transition-colors">
          <CardContent className="p-4">
            <div className="flex flex-col">
              <div className="mb-2">
                <h3 className="font-semibold text-gray-800">INVOICING</h3>
              </div>
              <div className="space-y-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      className="w-full justify-between bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md"
                    >
                      <span className="flex items-center gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Create Invoice
                      </span>
                      <ChevronDown className="h-4 w-4 opacity-70" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => window.location.href="/expenses/new"}>
                      Create Expense
                    </DropdownMenuItem>
                    <Sheet>
                      <SheetTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          Upload Receipt
                        </DropdownMenuItem>
                      </SheetTrigger>
                      <SheetContent>
                        <div className="p-4 space-y-4">
                          <h3 className="font-semibold text-lg">Upload Receipt</h3>
                          <p className="text-sm text-gray-600">
                            Upload your receipt to be processed later.
                          </p>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <Upload className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">
                              Drag and drop your receipt here, or click to browse
                            </p>
                            <Button variant="outline" className="mt-4">
                              Browse Files
                            </Button>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </DropdownMenuContent>
                </DropdownMenu>
                <p className="text-xs text-gray-500">Quickly create PO Invoice, NPO Invoice & Credit Memos.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default TopStatsCards;
