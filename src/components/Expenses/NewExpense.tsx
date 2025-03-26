
import React, { useState } from 'react';
import { 
  FileText, Receipt, Plus, ArrowLeft, Clock, Check, CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import LineItemSlider from '../ui/LineItemSlider';
import ExpenseLineItem, { ExpenseLineItemType } from './ExpenseLineItem';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const NewExpense: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAddingLineItem, setIsAddingLineItem] = useState(false);
  const [lineItems, setLineItems] = useState<ExpenseLineItemType[]>([]);
  const [editingItem, setEditingItem] = useState<ExpenseLineItemType | undefined>();
  
  // Calculate total amount
  const totalAmount = lineItems.reduce((sum, item) => sum + item.amount, 0);
  
  // Determine approval requirements based on total amount
  const getApprovalRequirements = () => {
    if (totalAmount < 500) {
      return {
        level: 'Manager',
        message: 'Requires manager approval only',
        icon: <CheckCircle2 className="h-4 w-4 text-green-500" />
      };
    } else if (totalAmount < 2000) {
      return {
        level: 'Director',
        message: 'Requires director approval',
        icon: <Clock className="h-4 w-4 text-amber-500" />
      };
    } else {
      return {
        level: 'Executive',
        message: 'Requires executive approval',
        icon: <Clock className="h-4 w-4 text-red-500" />
      };
    }
  };
  
  const approvalReq = getApprovalRequirements();
  
  const handleAddLineItem = () => {
    setEditingItem(undefined);
    setIsAddingLineItem(true);
  };

  const handleEditLineItem = (item: ExpenseLineItemType) => {
    setEditingItem(item);
    setIsAddingLineItem(true);
  };

  const handleSaveLineItem = (item: ExpenseLineItemType) => {
    if (editingItem) {
      // Update existing item
      setLineItems(lineItems.map(li => li.id === item.id ? item : li));
    } else {
      // Add new item
      setLineItems([...lineItems, item]);
    }
    setIsAddingLineItem(false);
    setEditingItem(undefined);
  };
  
  const handleDeleteLineItem = (id: string) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title) {
      toast.error("Please enter an expense title");
      return;
    }
    
    if (lineItems.length === 0) {
      toast.error("Please add at least one line item");
      return;
    }
    
    // Submit logic would go here
    toast.success("Expense submitted successfully");
    navigate('/expenses');
  };
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/expenses')}
          className="mr-3 p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-semibold">New Expense</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="glass-card rounded-xl p-6 space-y-5">
              <h2 className="text-lg font-medium mb-2">Basic Information</h2>
              
              <div className="space-y-3">
                <label htmlFor="title" className="text-sm font-medium">Expense Title</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    <FileText className="h-4 w-4" />
                  </div>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="pl-9 w-full h-11 rounded-md border border-input bg-transparent px-3 py-2 shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="E.g., Client Meeting, Business Trip, etc."
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label htmlFor="description" className="text-sm font-medium">Description (Optional)</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary min-h-[100px]"
                  placeholder="Additional details about this expense"
                />
              </div>
            </div>
            
            {/* Line Items */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-medium">Line Items</h2>
                <button
                  type="button"
                  onClick={handleAddLineItem}
                  className="flex items-center text-sm text-primary font-medium hover:text-primary/80 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </button>
              </div>
              
              {lineItems.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-muted rounded-lg">
                  <Receipt className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium mb-1">No items yet</h3>
                  <p className="text-muted-foreground mb-4">Add your first expense line item</p>
                  <button
                    type="button"
                    onClick={handleAddLineItem}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    <Plus className="h-4 w-4 inline mr-1" />
                    Add Line Item
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {lineItems.map((item) => {
                    const itemType = item.type;
                    const typeLabel = {
                      'airfare': 'Airfare',
                      'hotel': 'Hotel',
                      'meals': 'Meals',
                      'rental': 'Car Rental',
                      'transport': 'Taxi/Ride',
                      'other': 'Other'
                    }[itemType];
                    
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/30 group transition-all"
                      >
                        <div className="flex items-center">
                          <div className={cn(
                            "p-2 rounded-full mr-3 bg-muted",
                            `text-expense-${itemType}`
                          )}>
                            {/* The icons would be rendered here based on type */}
                            {React.createElement(
                              {
                                'airfare': Plane,
                                'hotel': Hotel,
                                'meals': UtensilsCrossed,
                                'rental': Car,
                                'transport': Taxi,
                                'other': FileQuestion
                              }[itemType] || FileQuestion, 
                              { className: "h-5 w-5" }
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{typeLabel}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {item.description || 'No description'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold">${item.amount.toFixed(2)}</span>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                            <button
                              type="button"
                              onClick={() => handleEditLineItem(item)}
                              className="p-1.5 rounded-md hover:bg-muted transition-colors"
                            >
                              <FileText className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteLineItem(item.id)}
                              className="p-1.5 rounded-md text-red-500 hover:bg-red-50 transition-colors"
                            >
                              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 6H5M5 6H21M5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  <button
                    type="button"
                    onClick={handleAddLineItem}
                    className="w-full py-3 border-2 border-dashed border-muted rounded-lg hover:border-primary/30 transition-colors flex items-center justify-center text-muted-foreground hover:text-primary"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Another Item
                  </button>
                </div>
              )}
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center"
              >
                <Check className="h-5 w-5 mr-2" />
                Submit Expense
              </button>
            </div>
          </form>
        </div>
        
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="glass-card rounded-xl p-6 sticky top-20">
            <h3 className="text-lg font-medium mb-4">Expense Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Items</span>
                <span className="font-medium">{lineItems.length}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="font-semibold text-lg">${totalAmount.toFixed(2)}</span>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center text-sm mb-1">
                  {approvalReq.icon}
                  <span className="ml-2 font-medium">Approval Required: {approvalReq.level}</span>
                </div>
                <p className="text-sm text-muted-foreground">{approvalReq.message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Line Item Slider */}
      <LineItemSlider
        isOpen={isAddingLineItem}
        onClose={() => {
          setIsAddingLineItem(false);
          setEditingItem(undefined);
        }}
        title={editingItem ? "Edit Line Item" : "Add Line Item"}
      >
        <ExpenseLineItem
          onSave={handleSaveLineItem}
          onCancel={() => {
            setIsAddingLineItem(false);
            setEditingItem(undefined);
          }}
          editingItem={editingItem}
        />
      </LineItemSlider>
    </div>
  );
};

export default NewExpense;
