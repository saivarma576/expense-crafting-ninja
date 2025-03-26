
import { useState } from 'react';
import { toast } from 'sonner';
import { ExpenseLineItem } from '@/types/expense';
import { ExpenseLineItemType } from '@/components/Expenses/ExpenseLineItem';

export const useExpenseLineItems = (initialItems: ExpenseLineItem[] = []) => {
  const [lineItems, setLineItems] = useState<ExpenseLineItem[]>(initialItems);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<ExpenseLineItemType | undefined>(undefined);

  const handleAddLineItem = () => {
    setEditingItem(undefined);
    setIsAddingItem(true);
  };

  const handleEditLineItem = (id: string) => {
    const item = lineItems.find(item => item.id === id);
    if (item) {
      // Map ExpenseLineItem to ExpenseLineItemType for editing
      setEditingItem({
        id: item.id,
        type: item.type.toLowerCase().replace(' ', '') as any,
        amount: item.amount,
        date: item.date,
        description: item.title,
        receiptUrl: item.receiptName,
        account: item.account,
        accountName: item.accountName,
        costCenter: item.costCenter,
        costCenterName: item.costCenterName,
        // Add any other fields that might have been added
        merchantName: item.title
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
                account: lineItem.account || item.account,
                accountName: lineItem.accountName || item.accountName,
                costCenter: lineItem.costCenter || item.costCenter,
                costCenterName: lineItem.costCenterName || item.costCenterName,
                receiptName: lineItem.receiptName || item.receiptName
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
          type: getCategoryTypeLabel(lineItem.type),
          category: getEmojiForType(lineItem.type),
          date: lineItem.date,
          amount: lineItem.amount,
          account: lineItem.account || '1001- GL account Name',
          accountName: lineItem.accountName || 'GL Account',
          costCenter: lineItem.costCenter || '1200- Cost Center Name',
          costCenterName: lineItem.costCenterName || 'Cost Center',
          receiptName: lineItem.receiptName || 'Receipt Pending'
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

  const getCategoryTypeLabel = (type: string) => {
    const labelMap: Record<string, string> = {
      'airfare': 'Airfare',
      'hotel': 'Hotel/Lodging',
      'meals': 'Business Meals',
      'rental': 'Car Rental',
      'transport': 'Transport',
      'other': 'Other Expense'
    };
    return labelMap[type.toLowerCase()] || 'Other Expense';
  };

  const getTotalAmount = () => {
    return lineItems.reduce((sum, item) => sum + item.amount, 0).toFixed(2);
  };

  return {
    lineItems,
    isAddingItem,
    editingItem,
    totalAmount: getTotalAmount(),
    handleAddLineItem,
    handleEditLineItem,
    handleDeleteLineItem,
    handleLineItemSave,
    setIsAddingItem
  };
};
