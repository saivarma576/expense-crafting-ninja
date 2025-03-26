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
import LineItemSlider from '@/components/ui/LineItemSlider';
import ExpenseLineItem, { ExpenseLineItemType } from '@/components/Expenses/ExpenseLineItem';
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
  
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<ExpenseLineItemType | undefined>(undefined);
  
  const totalAmount = lineItems.reduce((sum, item) => sum + item.amount, 0);
  
  const handleSaveAsDraft = () => {
    toast.success("Expense saved as draft");
    navigate('/expenses');
  };
  
  const handleSubmit = () => {
    toast.success("Expense submitted successfully");
    navigate('/expenses');
  };

  const handleAddLineItem = () => {
    setEditingItem(undefined);
    setIsAddingItem(true);
  };

  const handleLineItemSave = (lineItem: ExpenseLineItemType) => {
    if (editingItem?.id) {
      setLineItems(prevItems => 
        prevItems.map(item => 
          item.id === editingItem.id 
            ? {
                ...item,
                title: lineItem.description,
                amount: lineItem.amount,
                date: lineItem.date,
                type: lineItem.type,
                // Keep other properties the same
              }
            : item
        )
      );
    } else {
      setLineItems(prevItems => [
        ...prevItems,
        {
          id: lineItem.id,
          title: lineItem.description,
          type: lineItem.type,
          category: getEmojiForType(lineItem.type),
          date: lineItem.date,
          amount: lineItem.amount,
          account: '1001- GL account Name',
          accountName: 'GL Account',
          costCenter: '1200- Cost Center Name',
          costCenterName: 'Cost Center',
          receiptName: 'Receipt Pending'
        }
      ]);
    }
    
    setIsAddingItem(false);
    setEditingItem(undefined);
    toast.success(editingItem ? "Item updated successfully" : "New item added successfully");
  };

  const getEmojiForType = (type: string) => {
    const emojiMap: Record<string, string> = {
      'airfare': '✈️',
      'hotel': '🏨',
      'meals': '🍔',
      'rental': '🚗',
      'transport': '🚕',
      'other': '📋'
    };
    return emojiMap[type] || '📋';
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
            <h1 className="text-xl font-semibold">New Expense</h1>
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
                Edit Expense
              </Button>
              <span className="text-sm text-muted-foreground">Ref #{expenseNo}</span>
            </div>
          </div>
          
          <div className="border-b pb-4">
            <h2 className="text-lg font-medium mb-4">Expense Details</h2>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Expense Title</div>
                <div className="font-medium">{title}</div>
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
                <div className="text-sm text-muted-foreground mb-1">Expense Owner</div>
                <div className="font-medium">Alex Johnson</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Date</div>
                <div className="font-medium">{expenseDate}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Status</div>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Draft
                </div>
              </div>
            </div>
          </div>
          
          <div className="py-6 border-b">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Expense Items</h2>
              <Button className="h-9 gap-1.5" onClick={handleAddLineItem}>
                <PlusCircle className="h-4 w-4" />
                Add Item
              </Button>
            </div>
            
            <div className="space-y-4">
              <table className="w-full">
                <thead>
                  <tr className="text-sm text-left border-b">
                    <th className="font-medium pb-2 w-1/2">Item</th>
                    <th className="font-medium pb-2 text-right">Date</th>
                    <th className="font-medium pb-2 text-right">Amount</th>
                    <th className="w-8"></th>
                  </tr>
                </thead>
                <tbody>
                  {lineItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-4">
                        <div className="flex items-start">
                          <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center text-xl flex-shrink-0 mr-3">
                            {item.category}
                          </div>
                          <div>
                            <div className="font-medium">{item.title}</div>
                            <div className="text-sm text-muted-foreground">{item.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-right">{item.date}</td>
                      <td className="py-4 text-right font-medium">${item.amount.toFixed(2)}</td>
                      <td className="py-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <InfoIcon className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {lineItems.length === 0 && (
                <div className="text-center py-8 border rounded-lg">
                  <div className="text-muted-foreground">No expense items added yet</div>
                  <Button variant="outline" size="sm" className="mt-4" onClick={handleAddLineItem}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add First Item
                  </Button>
                </div>
              )}
              
              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold">${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="py-6 border-b">
            <h2 className="text-lg font-medium mb-4">Notes & Attachments</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-5 border">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="bg-blue-100 rounded-full p-3 mb-3">
                    <Upload className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium mb-1">Upload Receipts</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Drag and drop files or click to browse
                  </p>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Upload className="h-4 w-4" />
                    Upload Receipts
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Notes
                </label>
                <Textarea 
                  placeholder="Add any additional notes about this expense..." 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
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
            onClick={handleSaveAsDraft}
          >
            <Save className="h-4 w-4" />
            Save as Draft
          </Button>
          <Button 
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700"
            onClick={handleSubmit}
          >
            Submit Expense
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <LineItemSlider
        isOpen={isAddingItem}
        onClose={() => setIsAddingItem(false)}
        title={editingItem ? "Edit Expense Item" : "Add Expense Item"}
      >
        <ExpenseLineItem
          onSave={handleLineItemSave}
          onCancel={() => setIsAddingItem(false)}
          editingItem={editingItem}
        />
      </LineItemSlider>
    </div>
  );
};

export default NewExpense;
