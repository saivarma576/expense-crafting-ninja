import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import LineItemSlider from '@/components/ui/LineItemSlider';
import ExpenseLineItem, { ExpenseLineItemType } from '@/components/Expenses/ExpenseLineItem';
import { ExpenseApproval } from '@/components/Expenses/ExpenseApproval';
import ExpenseHeader from '@/components/Expenses/ExpenseHeader';
import LineItemsSection from '@/components/Expenses/LineItemsSection';
import DocumentsNotesSection from '@/components/Expenses/DocumentsNotesSection';
import ExpenseFooter from '@/components/Expenses/ExpenseFooter';

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
        <ExpenseHeader 
          title={title}
          setTitle={setTitle}
          expenseNo={expenseNo}
          expenseDate={expenseDate}
          totalAmount={totalAmount}
          userName={userName}
          userEmail={userEmail}
        />

        {/* Line items section */}
        <LineItemsSection 
          lineItems={lineItems}
          handleAddLineItem={handleAddLineItem}
          handleEditLineItem={handleEditLineItem}
          handleDeleteLineItem={handleDeleteLineItem}
          totalAmount={totalAmount}
        />
          
        {/* Documents & Notes Section */}
        <DocumentsNotesSection 
          uploadedDocuments={uploadedDocuments}
          setUploadedDocuments={setUploadedDocuments}
          notes={notes}
          setNotes={setNotes}
        />
        
        {/* Approval flow section */}
        <ExpenseApproval />
      </div>
      
      {/* Footer with action buttons */}
      <ExpenseFooter 
        onCancel={() => navigate('/expenses')}
        onSaveAsDraft={handleSaveAsDraft}
        onSubmit={handleSubmit}
      />

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
