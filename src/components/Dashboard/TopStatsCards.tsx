
import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, FileText, CheckCircle, Plus, Upload } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Total Expense Tile */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">TOTAL EXPENSE</p>
                <h3 className="text-2xl font-bold mt-2">{currency} {totalExpense.amount.toLocaleString()}</h3>
                <p className="text-sm text-gray-600 mt-1">{totalExpense.count} Expenses</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Expense Processed Tile */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">EXPENSE PROCESSED</p>
                <h3 className="text-2xl font-bold mt-2">{currency} {processedExpense.amount.toLocaleString()}</h3>
                <p className="text-sm text-gray-600 mt-1">{processedExpense.count} Expenses</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600">
                <FileText className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Expense Posted Tile */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">EXPENSE POSTED</p>
                <h3 className="text-2xl font-bold mt-2">{currency} {postedExpense.amount.toLocaleString()}</h3>
                <p className="text-sm text-gray-600 mt-1">{postedExpense.count} Expenses</p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-600">
                <CheckCircle className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Create Tile */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col h-full">
              <p className="text-sm font-medium text-gray-500 mb-3">QUICK CREATE</p>
              <div className="flex flex-col gap-3 mt-2">
                <Button 
                  variant="default" 
                  className="w-full justify-start gap-2 bg-blue-500 hover:bg-blue-600"
                  onClick={() => window.location.href="/expenses/new"}
                >
                  <Plus className="h-4 w-4" />
                  Create Expense
                </Button>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Receipt to Buffer
                    </Button>
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
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TopStatsCards;
