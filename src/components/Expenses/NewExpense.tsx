
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
    <div className="max-w-6xl mx-auto mt-3">
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/expenses')}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-medium">New Expense Report</h1>
          </div>
        </div>

        {/* Main content */}
        <div className="p-6">
          {/* Title section with inline editing */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-start gap-4">
              {isEditingTitle ? (
                <div className="flex items-center gap-2">
                  <Input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-xl font-medium h-9 min-w-[300px]"
                    autoFocus
                  />
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => setIsEditingTitle(false)}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-medium">{title}</h2>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => setIsEditingTitle(true)}
                    className="h-7 w-7 opacity-0 group-hover:opacity-100 hover:opacity-100"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
              
              <div className="flex items-center mt-1">
                <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center text-xs">
                  OR
                </div>
                <div className="ml-2">
                  <div className="text-sm font-medium">{userName}</div>
                  <div className="text-xs text-muted-foreground">{userEmail}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <div className="text-muted-foreground text-right">Expense #</div>
              <div className="font-medium">{expenseNo}</div>
              
              <div className="text-muted-foreground text-right">Expense Date</div>
              <div className="font-medium">{expenseDate}</div>
              
              <div className="text-muted-foreground text-right">Amount</div>
              <div className="font-medium">{totalAmount.toFixed(2)} $</div>
            </div>
          </div>

          {/* Line items section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Line Items</h3>
              <Button 
                size="sm" 
                className="h-9"
                onClick={handleAddLineItem}
              >
                <PlusCircle className="h-4 w-4 mr-1.5" />
                Line Items
              </Button>
            </div>
            
            <div className="space-y-3">
              {lineItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center text-xl flex-shrink-0">
                        {item.category}
                      </div>
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-muted-foreground mt-0.5">{item.type}</div>
                        <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-1 text-xs">
                          <div className="text-muted-foreground">{item.accountName}</div>
                          <div>{item.account}</div>
                          <div className="text-muted-foreground">{item.costCenterName}</div>
                          <div>{item.costCenter}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start justify-end gap-5">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">{item.date}</div>
                        <div className="font-medium mt-1">{item.amount.toFixed(2)} $</div>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <FileText className="h-3.5 w-3.5" />
                          <span className="text-xs max-w-[140px] truncate">{item.receiptName}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-500"
                          onClick={() => handleEditLineItem(item.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => handleDeleteLineItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {lineItems.length === 0 && (
                <div className="border rounded-lg p-6 text-center">
                  <div className="text-muted-foreground mb-2">No expense items added yet</div>
                  <Button variant="outline" size="sm" onClick={handleAddLineItem}>
                    <PlusCircle className="h-4 w-4 mr-2" /> Add First Item
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex justify-end mt-4">
              <div className="w-64">
                <div className="flex justify-between py-2 border-t border-dashed">
                  <span className="font-medium">TOTAL AMOUNT</span>
                  <span className="font-bold">{totalAmount.toFixed(2)} $</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Documents & Notes Section */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Document upload section */}
            <div 
              className="border rounded-lg p-4"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="border border-dashed rounded-lg p-6 text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <Upload className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
                <p className="text-sm font-medium mb-1">Click to upload</p>
                <p className="text-xs text-muted-foreground mb-3">or drag and drop</p>
                <Button variant="outline" size="sm" className="text-xs h-8">
                  <Upload className="h-3.5 w-3.5 mr-1.5" />
                  Upload
                </Button>
              </div>
              
              {uploadedDocuments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {uploadedDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <div>
                          <div className="text-sm font-medium">{doc.name}</div>
                          <div className="text-xs text-muted-foreground">{doc.size}</div>
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
              <h3 className="font-medium mb-3">Notes:</h3>
              <Textarea
                placeholder="Enter notes or comments here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[150px]"
              />
            </div>
          </div>
          
          {/* Approval flow section */}
          <div className="mb-8">
            <h3 className="font-medium mb-4">Approval Flow</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 text-blue-500 font-medium">
                  1
                </div>
                <div className="flex-1 flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="font-medium">Manager Approval</div>
                    <div className="text-sm text-muted-foreground">Sarah Wright</div>
                  </div>
                  <div className="flex items-center text-amber-500">
                    <Clock className="h-4 w-4 mr-1.5" />
                    <span className="text-sm">Pending</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-400 font-medium">
                  2
                </div>
                <div className="flex-1 flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="font-medium">Finance Review</div>
                    <div className="text-sm text-muted-foreground">Michael Chen</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Waiting
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" className="h-4 w-4" />
              <label htmlFor="terms" className="text-sm">
                By clicking on this, we are submitting a legally binding invoice for SmartDocs to pay as per the purchase order released to us by SmartDocs.
              </label>
            </div>
          </div>
        </div>
        
        {/* Footer with action buttons */}
        <div className="bg-gray-50 p-4 flex items-center justify-end gap-3 border-t">
          <Button 
            variant="outline" 
            className="px-5"
            onClick={() => navigate('/expenses')}
          >
            Cancel
          </Button>
          <Button 
            variant="outline" 
            className="px-5 flex items-center gap-1.5"
            onClick={handleSaveAsDraft}
          >
            <Save className="h-4 w-4" />
            Save as draft
          </Button>
          <Button 
            className="px-5 flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600"
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
