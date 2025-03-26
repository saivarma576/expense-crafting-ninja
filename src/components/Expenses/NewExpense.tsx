import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  ArrowLeft, Pencil, PlusCircle, Clock, 
  FileText, Upload, Save, ArrowRight,
  Trash2, Edit, X, Info, Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import LineItemSlider from '@/components/ui/LineItemSlider';
import ExpenseLineItem, { ExpenseLineItemType } from '@/components/Expenses/ExpenseLineItem';
import ExpenseCard from '@/components/Expenses/ExpenseCard';
import { ExpenseApproval } from '@/components/Expenses/ExpenseApproval';
import { DocumentUpload } from '@/components/Expenses/DocumentUpload';

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
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [expenseNo] = useState('Ref-154264');
  const [expenseDate] = useState('Dec 14, 2021');
  const [notes, setNotes] = useState('');
  const [userEmail] = useState('oliviarhye@example.com');
  const [userName] = useState('Olivia Rhye');
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
  
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<ExpenseLineItemType | undefined>(undefined);
  const [uploadedDocuments, setUploadedDocuments] = useState<{name: string, size: string}[]>([
    {name: 'Document Name goes here', size: '256.32 Kb'}
  ]);
  
  const totalAmount = lineItems.reduce((sum, item) => sum + item.amount, 0).toFixed(2);
  
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

  const handleEditLineItem = (id: string) => {
    const item = lineItems.find(item => item.id === id);
    if (item) {
      setEditingItem({
        id: item.id,
        type: item.type.toLowerCase().replace(' ', '') as any,
        amount: item.amount,
        date: item.date,
        description: item.title,
        receiptUrl: item.receiptName
      });
      setIsAddingItem(true);
    }
  };

  const handleDeleteLineItem = (id: string) => {
    setLineItems(prevItems => prevItems.filter(item => item.id !== id));
    toast.success("Item removed successfully");
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
    return emojiMap[type.toLowerCase()] || '📋';
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-sm">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 px-6 py-4 flex items-center">
        <button 
          onClick={() => navigate('/expenses')}
          className="rounded-full hover:bg-gray-100 p-1.5 mr-3 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-medium text-gray-800">New Expense Report</h1>
      </div>

      {/* Main content */}
      <div className="px-6 py-5">
        {/* Title section with inline editing */}
        <div className="mb-8 border-b pb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex items-start gap-4">
              {isEditingTitle ? (
                <div className="flex items-center gap-2">
                  <Input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-9 min-w-[300px] font-medium"
                    autoFocus
                  />
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => setIsEditingTitle(false)}
                    className="h-8 w-8 text-gray-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 group">
                  <h2 className="text-xl font-medium text-gray-800">{title}</h2>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => setIsEditingTitle(true)}
                    className="h-7 w-7 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-500"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
              
              <div className="flex items-center">
                <div className="h-9 w-9 bg-amber-100 rounded-full flex items-center justify-center text-xs font-medium">
                  OR
                </div>
                <div className="ml-2">
                  <div className="text-sm font-medium">{userName}</div>
                  <div className="text-xs text-gray-500">{userEmail}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm self-start">
              <div className="text-gray-500">Expense #</div>
              <div className="font-medium text-right">{expenseNo}</div>
              
              <div className="text-gray-500">Expense Date</div>
              <div className="font-medium text-right">{expenseDate}</div>
              
              <div className="text-gray-500">Amount</div>
              <div className="font-medium text-right">${totalAmount}</div>
            </div>
          </div>
        </div>

        {/* Line items section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-medium text-gray-800">Line Items</h3>
            <Button 
              variant="default"
              size="sm" 
              onClick={handleAddLineItem}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <PlusCircle className="h-4 w-4 mr-1.5" />
              Add Line Item
            </Button>
          </div>
          
          <div className="space-y-4">
            {lineItems.map((item) => (
              <ExpenseCard
                key={item.id}
                item={item}
                onEdit={() => handleEditLineItem(item.id)}
                onDelete={() => handleDeleteLineItem(item.id)}
              />
            ))}
            
            {lineItems.length === 0 && (
              <div className="border rounded-lg p-8 text-center bg-gray-50">
                <div className="text-gray-500 mb-3">No expense items added yet</div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddLineItem}
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <PlusCircle className="h-4 w-4 mr-2" /> 
                  Add First Item
                </Button>
              </div>
            )}
          </div>
          
          {lineItems.length > 0 && (
            <div className="flex justify-end mt-6">
              <div className="w-48">
                <div className="flex justify-between py-2 text-sm font-medium">
                  <span>TOTAL AMOUNT</span>
                  <span>${totalAmount}</span>
                </div>
              </div>
            </div>
          )}
        </div>
          
        {/* Documents & Notes Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Document upload section */}
          <DocumentUpload 
            uploadedDocuments={uploadedDocuments}
            setUploadedDocuments={setUploadedDocuments}
          />
          
          {/* Notes section */}
          <div>
            <h3 className="text-base font-medium text-gray-800 mb-3">Notes</h3>
            <Textarea
              placeholder="Add any additional information about this expense report..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[180px] text-sm resize-none"
            />
          </div>
        </div>
        
        {/* Approval flow section */}
        <ExpenseApproval />
      </div>
      
      {/* Footer with action buttons */}
      <div className="border-t bg-white sticky bottom-0 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input type="checkbox" id="terms" className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
          <label htmlFor="terms" className="text-xs text-gray-600">
            By submitting, I confirm this is a valid business expense in accordance with company policy.
          </label>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="text-sm h-9"
            onClick={() => navigate('/expenses')}
          >
            Cancel
          </Button>
          <Button 
            variant="outline" 
            className="text-sm h-9 flex items-center gap-1.5"
            onClick={handleSaveAsDraft}
          >
            <Save className="h-4 w-4" />
            Save as draft
          </Button>
          <Button 
            className="bg-blue-500 hover:bg-blue-600 text-sm h-9 flex items-center gap-1.5"
            onClick={handleSubmit}
          >
            Submit
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
