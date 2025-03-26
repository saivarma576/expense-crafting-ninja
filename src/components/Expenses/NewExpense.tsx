
import React, { useState } from 'react';
import { 
  ArrowLeft, Pencil, PlusCircle, Clock, 
  FileText, Upload, Save, ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
    },
    {
      id: '3',
      title: 'City Cab',
      type: 'Inter City Cab',
      category: '🚕',
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
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/expenses')}
          className="mr-3 p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-semibold">New Expense Report</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-3">
              <h2 className="text-xl font-medium">{title}</h2>
              <button className="text-primary mt-1">
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-3">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Expense #</div>
              </div>
              <div className="text-right">
                <div>{expenseNo}</div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Expense Date</div>
              </div>
              <div className="text-right">
                <div>{expenseDate}</div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Amount</div>
              </div>
              <div className="text-right">
                <div className="font-medium">{totalAmount.toFixed(2)} $</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center mt-4 gap-3">
            <Avatar className="h-8 w-8 bg-amber-100">
              <AvatarFallback className="text-amber-500">OR</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium">Olivia Rhye</div>
              <div className="text-xs text-muted-foreground">oliviarhye@example.com</div>
            </div>
            <button className="text-primary">
              <Pencil className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-medium">Line Items</h3>
            <Button className="h-9 gap-1.5">
              <PlusCircle className="h-4 w-4" />
              Line Items
            </Button>
          </div>
          
          <div className="space-y-4">
            {lineItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.category}</span>
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="inline-block text-xs px-2 py-0.5 bg-muted rounded-full">
                        {item.type}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{item.amount.toFixed(2)} $</div>
                    <div className="text-xs text-muted-foreground">{item.date}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-xs text-muted-foreground">{item.accountName}</div>
                    <div className="text-sm">{item.account}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{item.costCenterName}</div>
                    <div className="text-sm">{item.costCenter}</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{item.receiptName}</span>
                    {item.id === '3' && (
                      <span className="text-xs text-blue-500">+More</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition-colors">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H5M5 6H21M5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-4 border-t pt-4">
            <div className="font-medium">TOTAL AMOUNT</div>
            <div className="font-semibold">{totalAmount.toFixed(2)} $</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <div className="border border-dashed rounded-lg p-6 flex items-center justify-center flex-col">
                <Upload className="h-5 w-5 text-muted-foreground mb-2" />
                <div className="text-sm text-primary mb-1">Click to upload or drag and drop</div>
                <div className="text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4 text-orange-500" />
                    <span>Document Name goes here</span>
                  </div>
                  <div className="text-xs text-muted-foreground ml-5">256.32 Kb</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-base font-medium mb-3">Notes:</h4>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter notes or comments here."
                className="min-h-[120px] resize-none"
              />
              <div className="mt-4 flex items-center">
                <input type="checkbox" id="legal-agreement" className="mr-2" />
                <label htmlFor="legal-agreement" className="text-xs text-muted-foreground">
                  By clicking on this, we are submitting a legally binding invoice for SmartDocs to pay as per the purchase order released to us by SmartDocs.
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Approval Flow</h3>
              
              <div className="space-y-6">
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
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => navigate('/expenses')}>
            Cancel
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleSaveAsDraft}
          >
            <Save className="h-4 w-4" />
            Save as draft
          </Button>
          <Button 
            className="flex items-center gap-2"
            onClick={handleSubmit}
          >
            Submit
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewExpense;
