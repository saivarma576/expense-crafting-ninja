
import React, { useState } from 'react';
import { 
  ArrowLeft, Pencil, PlusCircle, Clock, 
  FileText, Upload, Save, ArrowRight,
  LightbulbIcon, InfoIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ExpenseLineItem {
  id: string;
  title: string;
  type: string;
  category: string;
  date: string;
  amount: number;
  account: string;
  accountName: string;
  costCenter: string;
  costCenterName: string;
  receiptName?: string;
}

const NewExpense: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('Trip to Europe');
  const [expenseNo] = useState('Ref-154264');
  const [expenseDate] = useState('Dec 14, 2021');
  const [notes, setNotes] = useState('');
  const [lineItems, setLineItems] = useState<ExpenseLineItem[]>([
    {
      id: '1',
      title: 'Burger King',
      type: 'Business Meals',
      category: '🍔',
      date: 'Nov 11, 2022',
      amount: 256.00,
      account: '1001- GL account Name',
      accountName: 'GL Account',
      costCenter: '1200- Cost Center Name',
      costCenterName: 'Cost Center',
      receiptName: 'IMG_10_11_200_DC.jpg'
    },
    {
      id: '2',
      title: 'Starbucks',
      type: 'Cafeteria',
      category: '☕',
      date: 'Nov 11, 2022',
      amount: 256.00,
      account: '1001- GL account Name',
      accountName: 'GL Account',
      costCenter: '1200- Cost Center Name',
      costCenterName: 'Cost Center',
      receiptName: 'IMG_10_11_200_DC.jpg'
    }
  ]);
  
  const totalAmount = lineItems.reduce((sum, item) => sum + item.amount, 0);
  
  const handleSaveAsDraft = () => {
    toast.success("Expense saved as draft");
    navigate('/expenses');
  };
  
  const handleSubmit = () => {
    toast.success("Expense submitted successfully");
    navigate('/expenses');
  };
  
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-6 pb-0">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => navigate('/expenses')}
              className="mr-3 p-2 rounded-full hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold">Review Purchase Request</h1>
            <div className="flex items-center ml-auto space-x-3">
              <Button variant="outline" size="sm" className="text-blue-600 gap-1.5">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 19.5V4.5C4 3.67157 4.67157 3 5.5 3H18.5C19.3284 3 20 3.67157 20 4.5V19.5C20 20.3284 19.3284 21 18.5 21H5.5C4.67157 21 4 20.3284 4 19.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 14L12 11L9 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 11L12 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 7H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Save as Template
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Pencil className="h-4 w-4" />
                Edit Request
              </Button>
              <span className="text-sm text-muted-foreground">Order #PR-1607</span>
            </div>
          </div>
          
          <div className="border-b pb-4">
            <h2 className="text-lg font-medium mb-4">Order Details</h2>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Requestor</div>
                <div className="font-medium">Alex Johnson</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Department</div>
                <div className="font-medium">Engineering</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Cost Center</div>
                <div className="font-medium">ENG-001</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Delivery Address</div>
                <div className="font-medium">123 Corporate Plaza, Suite 500</div>
                <div className="font-medium">San Francisco, CA 94105</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Date</div>
                <div className="font-medium">26/03/2023</div>
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm text-blue-600">
              <InfoIcon className="h-4 w-4 mr-2" />
              <span>All items will ship to this address unless specified differently for specific items</span>
            </div>
          </div>
          
          <div className="py-6 border-b">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Order Items</h2>
              <Button className="h-9 gap-1.5">
                <PlusCircle className="h-4 w-4" />
                Add Item
              </Button>
            </div>
            
            <div className="space-y-4">
              <table className="w-full">
                <thead>
                  <tr className="text-sm text-left border-b">
                    <th className="font-medium pb-2 w-1/2">Item</th>
                    <th className="font-medium pb-2 text-right">Price</th>
                    <th className="font-medium pb-2 text-right">Qty</th>
                    <th className="font-medium pb-2 text-right">Total</th>
                    <th className="w-8"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4">
                      <div className="flex items-start">
                        <div className="h-14 w-14 bg-gray-100 rounded flex-shrink-0 mr-3"></div>
                        <div>
                          <div className="font-medium">Dell XPS 15 Laptop</div>
                          <div className="text-sm text-muted-foreground">32GB RAM, 1TB SSD, Intel i9</div>
                          <div className="text-xs text-muted-foreground mt-1">SKU: IT-LAP-DEL-XPS15 • Supplier: Dell Inc.</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-right">$1899.99</td>
                    <td className="py-4 text-right">1</td>
                    <td className="py-4 text-right font-medium">$1899.99</td>
                    <td className="py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <InfoIcon className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start">
                <div className="text-green-500 mr-2 mt-0.5">
                  <LightbulbIcon className="h-4 w-4" />
                </div>
                <div className="text-sm text-green-700">
                  Recommended: Consider Dell XPS 15 Laptop with higher sustainability rating.
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium">$1899.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%):</span>
                    <span className="font-medium">$152.00</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold">$2051.99</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="py-6">
            <h2 className="text-lg font-medium mb-4">Approval Flow</h2>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex-none bg-white border border-primary/30 rounded-full w-8 h-8 flex items-center justify-center text-primary font-medium">
                  1
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Manager Approval</h4>
                      <p className="text-sm text-muted-foreground">Sarah Wright</p>
                    </div>
                    <div className="flex items-center text-amber-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">Pending</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-none bg-white border border-muted rounded-full w-8 h-8 flex items-center justify-center text-muted-foreground font-medium">
                  2
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Finance Review</h4>
                      <p className="text-sm text-muted-foreground">Michael Chen</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Waiting
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 flex justify-between">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => navigate('/expenses')}
          >
            Back to Shopping
          </Button>
          <Button 
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700"
            onClick={handleSubmit}
          >
            Submit Request
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewExpense;
