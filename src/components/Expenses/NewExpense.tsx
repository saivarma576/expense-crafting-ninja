import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Plane } from 'lucide-react';
import LineItemSlider from '@/components/ui/LineItemSlider';
import ExpenseLineItem from '@/components/Expenses/ExpenseLineItem';
import { ExpenseApproval } from '@/components/Expenses/ExpenseApproval';
import ExpenseHeader from '@/components/Expenses/ExpenseHeader';
import LineItemsSection from '@/components/Expenses/LineItemsSection';
import DocumentsNotesSection from '@/components/Expenses/DocumentsNotesSection';
import { ExpenseActions } from '@/components/Expenses/ExpenseActions';
import { useExpenseLineItems } from '@/hooks/useExpenseLineItems';
import { ExpenseDocument } from '@/types/expense';
import { FormValues } from './CreateExpense/types';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import TravelExpenseDetails from './TravelExpenseDetails';

const initialLineItems = [
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
];

const NewExpense: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const expenseData = location.state?.expenseData as FormValues | undefined;
  
  const [isTravelExpense, setIsTravelExpense] = useState<boolean>(expenseData?.isBusinessTravel === 'yes');
  
  const [fromDate, setFromDate] = useState<Date | undefined>(expenseData?.fromDate);
  const [toDate, setToDate] = useState<Date | undefined>(expenseData?.toDate);
  const [mealsProvided, setMealsProvided] = useState<string>(expenseData?.mealsProvided || 'no');
  const [meals, setMeals] = useState<string[]>(expenseData?.meals || []);
  
  useEffect(() => {
    console.log("Expense data received:", expenseData);
    if (expenseData) {
      toast.success("Form data successfully transferred to expense screen");
      setIsTravelExpense(expenseData.isBusinessTravel === 'yes');
      setFromDate(expenseData.fromDate);
      setToDate(expenseData.toDate);
      setMealsProvided(expenseData.mealsProvided || 'no');
      setMeals(expenseData.meals || []);
    }
  }, [expenseData]);
  
  const [title, setTitle] = useState(expenseData?.travelPurpose ? 
    `${expenseData.travelPurpose.charAt(0).toUpperCase() + expenseData.travelPurpose.slice(1)} Trip` : 
    'Trip to Europe');
    
  const [dateRange, setDateRange] = useState(formatDateInfo(expenseData));
  const [expenseNo] = useState('Ref-154264');
  const [notes, setNotes] = useState('');
  const [userEmail] = useState('oliviarhye@example.com');
  const [userName] = useState('Olivia Rhye');
  const [uploadedDocuments, setUploadedDocuments] = useState<ExpenseDocument[]>([
    {name: 'Document Name goes here', size: '256.32 Kb'}
  ]);
  
  const {
    lineItems,
    isAddingItem,
    editingItem,
    totalAmount,
    handleAddLineItem,
    handleEditLineItem,
    handleDeleteLineItem,
    handleLineItemSave,
    setIsAddingItem
  } = useExpenseLineItems(initialLineItems);

  function formatDateInfo(data?: FormValues): string {
    if (data?.fromDate && data?.toDate) {
      const fromDateStr = format(data.fromDate, 'MMM dd, yyyy');
      const toDateStr = format(data.toDate, 'MMM dd, yyyy');
      return `${fromDateStr} - ${toDateStr}`;
    }
    return 'Dec 14, 2021';
  }
  
  useEffect(() => {
    if (expenseData) {
      let expenseNotes = '';
      
      if (expenseData.travelPurpose) {
        setTitle(`${expenseData.travelPurpose.charAt(0).toUpperCase() + expenseData.travelPurpose.slice(1)} Trip`);
        expenseNotes += `Purpose: ${expenseData.travelPurpose.charAt(0).toUpperCase() + expenseData.travelPurpose.slice(1)}\n`;
      }
      
      if (expenseData.fromDate && expenseData.toDate) {
        setDateRange(formatDateInfo(expenseData));
        expenseNotes += `Date range: ${formatDateInfo(expenseData)}\n`;
      }
      
      if (expenseData.mealsProvided === 'yes' && expenseData.meals?.length > 0) {
        const mealsProvided = expenseData.meals.map(meal => 
          meal.charAt(0).toUpperCase() + meal.slice(1)
        ).join(', ');
        expenseNotes += `Business travel with ${mealsProvided} provided.`;
      }
      
      setNotes(expenseNotes);
    }
  }, [expenseData]);

  const handleTravelToggleChange = (checked: boolean) => {
    setIsTravelExpense(checked);
  };

  const formattedDateRange = () => {
    if (fromDate && toDate) {
      const fromDateStr = format(fromDate, 'MMM dd, yyyy');
      const toDateStr = format(toDate, 'MMM dd, yyyy');
      return `${fromDateStr} - ${toDateStr}`;
    }
    return dateRange;
  };

  const renderTravelExpenseHeader = () => {
    if (!isTravelExpense) return null;
    
    return (
      <div className="mb-4 bg-blue-50 rounded-lg p-4 border border-blue-100">
        <div className="flex items-center gap-2 text-blue-800 font-medium mb-2">
          <Plane className="h-4 w-4" />
          <span>Travel Expense Information</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div>
            <p className="text-gray-500">Travel Expense</p>
            <p className="font-medium">Yes</p>
          </div>
          <div>
            <p className="text-gray-500">Duration</p>
            <p className="font-medium">{formattedDateRange()}</p>
          </div>
          {mealsProvided === 'yes' && meals && meals.length > 0 && (
            <div>
              <p className="text-gray-500">Meals Provided</p>
              <div className="flex gap-1 flex-wrap mt-1">
                {meals.map((meal) => (
                  <Badge key={meal} variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                    {meal.charAt(0).toUpperCase() + meal.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-sm">
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

      <div className="px-6 py-5">
        <div className="mb-4 flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-blue-500" />
            <Label htmlFor="travel-toggle" className="font-medium">Travel Expense</Label>
          </div>
          <Switch
            id="travel-toggle"
            checked={isTravelExpense}
            onCheckedChange={handleTravelToggleChange}
          />
        </div>
        
        <TravelExpenseDetails 
          isTravelExpense={isTravelExpense}
          travelPurpose={expenseData?.travelPurpose}
          fromDate={fromDate}
          toDate={toDate}
          mealsProvided={mealsProvided}
          meals={meals}
        />
        
        <ExpenseHeader 
          title={title}
          setTitle={setTitle}
          expenseNo={expenseNo}
          expenseDate={dateRange}
          totalAmount={totalAmount}
          userName={userName}
          userEmail={userEmail}
          travelPurpose={expenseData?.travelPurpose}
        />

        <LineItemsSection 
          lineItems={lineItems}
          handleAddLineItem={handleAddLineItem}
          handleEditLineItem={handleEditLineItem}
          handleDeleteLineItem={handleDeleteLineItem}
          totalAmount={totalAmount}
        />
          
        <DocumentsNotesSection 
          uploadedDocuments={uploadedDocuments}
          setUploadedDocuments={setUploadedDocuments}
          notes={notes}
          setNotes={setNotes}
        />
        
        <ExpenseApproval />
      </div>
      
      <ExpenseActions totalAmount={totalAmount} />

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
