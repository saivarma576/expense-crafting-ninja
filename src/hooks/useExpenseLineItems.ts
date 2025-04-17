
import { useState } from 'react';
import { toast } from 'sonner';
import { ExpenseLineItem } from '@/types/expense';
import { ExpenseLineItemType } from '@/components/Expenses/ExpenseLineItem';
import { EXPENSE_TYPE_DISPLAY } from '@/components/Expenses/ExpenseFieldUtils';

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
        type: item.type.toLowerCase().replace(' ', '_') as any,
        amount: item.amount,
        date: item.date,
        description: item.title,
        receiptUrl: item.receiptUrl || '',
        account: item.account,
        accountName: item.accountName,
        costCenter: item.costCenter,
        costCenterName: item.costCenterName,
        // Include other fields from the item
        merchantName: item.merchantName || '',
        wbs: item.wbs || '',
        notes: item.notes || '',
        glAccount: item.glAccount,
        zipCode: item.zipCode,
        city: item.city,
        mealsRate: item.mealsRate,
        hotelRate: item.hotelRate,
        throughDate: item.throughDate,
        perDiemExplanation: item.perDiemExplanation,
        departureTime: item.departureTime,
        returnTime: item.returnTime,
        miles: item.miles,
        mileageRate: item.mileageRate,
        receiptName: item.receiptName || ''
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
                type: EXPENSE_TYPE_DISPLAY[lineItem.type] || 'Other Expense',
                account: lineItem.account || item.account,
                accountName: lineItem.accountName || item.accountName,
                costCenter: lineItem.costCenter || item.costCenter,
                costCenterName: lineItem.costCenterName || item.costCenterName,
                receiptName: lineItem.receiptName || item.receiptName,
                receiptUrl: lineItem.receiptUrl || item.receiptUrl,
                merchantName: lineItem.merchantName,
                wbs: lineItem.wbs,
                notes: lineItem.notes,
                glAccount: lineItem.glAccount,
                zipCode: lineItem.zipCode,
                city: lineItem.city,
                mealsRate: lineItem.mealsRate,
                hotelRate: lineItem.hotelRate,
                throughDate: lineItem.throughDate,
                perDiemExplanation: lineItem.perDiemExplanation,
                departureTime: lineItem.departureTime,
                returnTime: lineItem.returnTime,
                miles: lineItem.miles,
                mileageRate: lineItem.mileageRate
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
          type: EXPENSE_TYPE_DISPLAY[lineItem.type] || 'Other Expense',
          category: getEmojiForType(lineItem.type),
          date: lineItem.date,
          amount: lineItem.amount,
          account: lineItem.account || '1001- GL account Name',
          accountName: lineItem.accountName || 'GL Account',
          costCenter: lineItem.costCenter || '1200- Cost Center Name',
          costCenterName: lineItem.costCenterName || 'Cost Center',
          receiptName: lineItem.receiptName || 'Receipt Pending',
          receiptUrl: lineItem.receiptUrl,
          merchantName: lineItem.merchantName,
          wbs: lineItem.wbs,
          notes: lineItem.notes,
          glAccount: lineItem.glAccount,
          zipCode: lineItem.zipCode,
          city: lineItem.city,
          mealsRate: lineItem.mealsRate,
          hotelRate: lineItem.hotelRate,
          throughDate: lineItem.throughDate,
          perDiemExplanation: lineItem.perDiemExplanation,
          departureTime: lineItem.departureTime,
          returnTime: lineItem.returnTime,
          miles: lineItem.miles,
          mileageRate: lineItem.mileageRate
        }
      ]);
    }
    
    setIsAddingItem(false);
    setEditingItem(undefined);
    toast.success(editingItem ? "Item updated successfully" : "New item added successfully");
  };

  const getEmojiForType = (type: string) => {
    const emojiMap: Record<string, string> = {
      'transport': '✈️',
      'hotel': '🏨',
      'meals': '🍔',
      'business_meals': '☕',
      'mileage': '🚗',
      'rental': '🚙',
      'parking': '🅿️',
      'gasoline': '⛽',
      'baggage': '🧳',
      'subscriptions': '📚',
      'registration': '📋',
      'professional_fees': '👔',
      'auditing': '📊',
      'office_supplies': '📎',
      'postage': '📦',
      'other': '📝'
    };
    return emojiMap[type.toLowerCase()] || '📝';
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
