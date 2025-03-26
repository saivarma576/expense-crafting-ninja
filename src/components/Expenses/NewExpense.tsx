
import React, { useState } from 'react';
import { 
  ArrowLeft, Pencil, PlusCircle, Clock, 
  FileText, Upload, Save, ArrowRight,
  Trash2, Edit, X, Info, Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import LineItemSlider from '@/components/ui/LineItemSlider';
import ExpenseLineItem, { ExpenseLineItemType } from '@/components/Expenses/ExpenseLineItem';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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

  const handleDeleteDocument = (index: number) => {
    setUploadedDocuments(prevDocs => prevDocs.filter((_, i) => i !== index));
    toast.success("Document removed");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    // This would normally handle file uploads
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      toast.success(`Uploading ${e.dataTransfer.files.length} file(s)`);
      // Mock file upload
      const newDocs = Array.from(e.dataTransfer.files).map(file => ({
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} Kb`
      }));
      setUploadedDocuments(prev => [...prev, ...newDocs]);
    }
  };
  
  return (
    <div className="max-w-[1000px] mx-auto py-0 px-0">
      {/* Header */}
      <div className="bg-gray-50 border-b py-3 px-4 flex items-center">
        <button 
          onClick={() => navigate('/expenses')}
          className="rounded-full hover:bg-gray-200 p-1.5 mr-2 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h1 className="text-base font-medium text-gray-700">New Expense Report</h1>
      </div>

      {/* Main content card */}
      <div className="bg-white border rounded-none shadow-sm mx-auto my-4">
        {/* Title section with inline editing */}
        <div className="p-5 border-b">
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
                  <h2 className="text-lg font-medium text-gray-800">{title}</h2>
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
                <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center text-xs">
                  OR
                </div>
                <div className="ml-2">
                  <div className="text-sm font-medium">{userName}</div>
                  <div className="text-xs text-gray-500">{userEmail}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm self-start">
              <div className="text-gray-500">Expense #</div>
              <div className="font-medium text-right">{expenseNo}</div>
              
              <div className="text-gray-500">Expense Date</div>
              <div className="font-medium text-right">{expenseDate}</div>
              
              <div className="text-gray-500">Amount</div>
              <div className="font-medium text-right">{totalAmount} $</div>
            </div>
          </div>
        </div>

        {/* Line items section */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700">Line Items</h3>
            <Button 
              variant="default"
              size="sm" 
              className="bg-blue-500 hover:bg-blue-600 h-9 px-3 py-2 text-sm"
              onClick={handleAddLineItem}
            >
              <PlusCircle className="h-4 w-4 mr-1.5" />
              Line Items
            </Button>
          </div>
          
          <div className="space-y-4">
            {lineItems.map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden">
                <div className="flex items-start p-4">
                  <div className="mr-3">
                    <div className="h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center text-lg">
                      {item.category}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{item.type}</div>
                    
                    <div className="mt-3 grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <div className="text-gray-500">{item.accountName}</div>
                        <div>{item.account}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">{item.costCenterName}</div>
                        <div>{item.costCenter}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1 ml-4">
                    <div className="text-xs text-gray-500">{item.date}</div>
                    <div className="font-medium">{item.amount.toFixed(2)} $</div>
                    
                    <div className="flex items-center mt-2 gap-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <FileText className="h-3.5 w-3.5" />
                        <span className="max-w-[120px] truncate">{item.receiptName}</span>
                        <Button variant="ghost" size="icon" className="h-5 w-5 text-gray-400">
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-blue-500"
                          onClick={() => handleEditLineItem(item.id)}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-red-500"
                          onClick={() => handleDeleteLineItem(item.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {lineItems.length === 0 && (
              <div className="border rounded-lg p-6 text-center">
                <div className="text-gray-500 mb-2">No expense items added yet</div>
                <Button variant="outline" size="sm" onClick={handleAddLineItem}>
                  <PlusCircle className="h-4 w-4 mr-2" /> Add First Item
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex justify-end mt-4">
            <div className="w-48">
              <div className="flex justify-between py-2 text-sm font-medium">
                <span>TOTAL AMOUNT</span>
                <span>{totalAmount} $</span>
              </div>
            </div>
          </div>
        </div>
          
        {/* Documents & Notes Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-5">
          {/* Document upload section */}
          <div 
            className="border rounded-lg"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="border-dashed border rounded-lg p-5 m-3 text-center">
              <div className="flex justify-center mb-3">
                <div className="p-2 bg-blue-50 rounded-full">
                  <Upload className="h-5 w-5 text-blue-500" />
                </div>
              </div>
              <p className="text-sm font-medium mb-1">Click to upload</p>
              <p className="text-xs text-gray-500 mb-3">or drag and drop</p>
              <Button variant="outline" size="sm" className="text-xs h-8">
                <Upload className="h-3.5 w-3.5 mr-1.5" />
                Upload
              </Button>
            </div>
            
            {uploadedDocuments.length > 0 && (
              <div className="m-3 space-y-2">
                {uploadedDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <div>
                        <div className="text-sm font-medium">{doc.name}</div>
                        <div className="text-xs text-gray-500">{doc.size}</div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 text-red-500"
                        onClick={() => handleDeleteDocument(index)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Notes section */}
          <div>
            <h3 className="text-sm font-medium mb-3 text-gray-700">Notes:</h3>
            <Textarea
              placeholder="Enter notes or comments here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[150px] text-sm"
            />
          </div>
        </div>
        
        {/* Approval flow section */}
        <div className="p-5">
          <h3 className="text-sm font-medium mb-4 text-gray-700">Approval Flow</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-700 font-medium text-sm">
                1
              </div>
              <div className="flex-1 flex items-center justify-between border-b pb-4">
                <div>
                  <div className="text-sm font-medium">Manager Approval</div>
                  <div className="text-xs text-gray-500">Sarah Wright</div>
                </div>
                <div className="flex items-center text-amber-500">
                  <Clock className="h-4 w-4 mr-1.5" />
                  <span className="text-sm">Pending</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-400 font-medium text-sm">
                2
              </div>
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-500">Finance Review</div>
                  <div className="text-xs text-gray-500">Michael Chen</div>
                </div>
                <div className="text-sm text-gray-400">
                  Waiting
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t p-4">
          <div className="flex items-center gap-2 mb-2">
            <input type="checkbox" id="terms" className="h-4 w-4" />
            <label htmlFor="terms" className="text-xs text-gray-600">
              By clicking on this, we are submitting a legally binding invoice for SmartDocs to pay as per the purchase order released to us by SmartDocs.
            </label>
          </div>
          
          {/* Footer with action buttons */}
          <div className="flex items-center justify-end gap-3 mt-4">
            <Button 
              variant="outline" 
              className="px-5 text-sm h-9"
              onClick={() => navigate('/expenses')}
            >
              Cancel
            </Button>
            <Button 
              variant="outline" 
              className="px-5 flex items-center gap-1.5 text-sm h-9"
              onClick={handleSaveAsDraft}
            >
              <Save className="h-4 w-4" />
              Save as draft
            </Button>
            <Button 
              className="px-5 flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-sm h-9"
              onClick={handleSubmit}
            >
              Submit
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
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
