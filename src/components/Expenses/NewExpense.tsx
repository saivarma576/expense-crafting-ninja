import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Plane, HelpCircle } from 'lucide-react';
import { useForm, FormProvider } from 'react-hook-form';
import LineItemSlider from '@/components/ui/LineItemSlider';
import ExpenseLineItem from '@/components/Expenses/ExpenseLineItem';
import { ExpenseApproval } from '@/components/Expenses/ExpenseApproval';
import ExpenseHeader from '@/components/Expenses/ExpenseHeader';
import LineItemsSection from '@/components/Expenses/LineItemsSection';
import DocumentsNotesSection from '@/components/Expenses/DocumentsNotesSection';
import { ExpenseActions } from '@/components/Expenses/ExpenseActions';
import { useExpenseLineItems } from '@/hooks/useExpenseLineItems';
import { ExpenseDocument } from '@/types/expense';
import { FormValues, TravelPurpose, Meal } from './CreateExpense/types';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import TravelExpenseDetails from './TravelExpenseDetails';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import TravelPurposeSelector from './CreateExpense/TravelPurposeSelector';
import DateRangeSelection from './CreateExpense/DateRangeSelection';
import MealSelection from './CreateExpense/MealSelection';

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
  
  const [isTravelExpense, setIsTravelExpense] = useState<boolean>(true);
  const [showTravelDialog, setShowTravelDialog] = useState<boolean>(false);
  
  const [fromDate, setFromDate] = useState<Date | undefined>(expenseData?.fromDate);
  const [toDate, setToDate] = useState<Date | undefined>(expenseData?.toDate);
  const [mealsProvided, setMealsProvided] = useState<string>(expenseData?.mealsProvided || 'no');
  const [meals, setMeals] = useState<Meal[]>(expenseData?.meals || []);
  const [travelPurpose, setTravelPurpose] = useState<TravelPurpose | undefined>(expenseData?.travelPurpose);
  const [travelComments, setTravelComments] = useState<string>(expenseData?.travelComments || '');
  
  const form = useForm<FormValues>({
    defaultValues: {
      isBusinessTravel: isTravelExpense ? 'yes' : 'no',
      travelPurpose: expenseData?.travelPurpose,
      fromDate: expenseData?.fromDate,
      toDate: expenseData?.toDate,
      mealsProvided: expenseData?.mealsProvided || 'no',
      meals: expenseData?.meals || [],
      travelComments: expenseData?.travelComments || '',
      expenseTitle: ''
    }
  });
  
  useEffect(() => {
    console.log("Expense data received:", expenseData);
    if (expenseData) {
      toast.success("Form data successfully transferred to expense screen");
      setIsTravelExpense(expenseData.isBusinessTravel === 'yes');
      setFromDate(expenseData.fromDate);
      setToDate(expenseData.toDate);
      setMealsProvided(expenseData.mealsProvided || 'no');
      setMeals(expenseData.meals || []);
      setTravelPurpose(expenseData.travelPurpose);
      setTravelComments(expenseData.travelComments || '');
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

  const handleOpenTravelDialog = () => {
    form.reset({
      isBusinessTravel: isTravelExpense ? 'yes' : 'no',
      travelPurpose: travelPurpose,
      fromDate: fromDate,
      toDate: toDate,
      mealsProvided: mealsProvided,
      meals: meals,
      travelComments: travelComments,
      expenseTitle: ''
    });
    setShowTravelDialog(true);
  };

  const handleTravelDialogSave = (data: FormValues) => {
    setIsTravelExpense(true);
    setTravelPurpose(data.travelPurpose);
    setFromDate(data.fromDate);
    setToDate(data.toDate);
    setMealsProvided(data.mealsProvided);
    setMeals(data.meals || []);
    setTravelComments(data.travelComments || '');
    
    if (data.travelPurpose) {
      setTitle(`${data.travelPurpose.charAt(0).toUpperCase() + data.travelPurpose.slice(1)} Trip`);
    }
    
    if (data.fromDate && data.toDate) {
      const fromDateStr = format(data.fromDate, 'MMM dd, yyyy');
      const toDateStr = format(data.toDate, 'MMM dd, yyyy');
      setDateRange(`${fromDateStr} - ${toDateStr}`);
    }
    
    setShowTravelDialog(false);
    toast.success("Travel expense details updated");
  };

  const handleRemoveTravelExpense = () => {
    setIsTravelExpense(false);
    setTravelPurpose(undefined);
    setFromDate(undefined);
    setToDate(undefined);
    setMealsProvided('no');
    setMeals([]);
    toast.success("Travel expense details removed");
  };

  const formattedDateRange = () => {
    if (fromDate && toDate) {
      const fromDateStr = format(fromDate, 'MMM dd, yyyy');
      const toDateStr = format(toDate, 'MMM dd, yyyy');
      return `${fromDateStr} - ${toDateStr}`;
    }
    return dateRange;
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
        <TravelExpenseDetails 
          isTravelExpense={true}
          travelPurpose={travelPurpose}
          travelComments={travelComments}
          fromDate={fromDate}
          toDate={toDate}
          mealsProvided={mealsProvided}
          meals={meals}
          onEdit={handleOpenTravelDialog}
        />
        
        <ExpenseHeader 
          title={title}
          setTitle={setTitle}
          expenseNo={expenseNo}
          expenseDate={dateRange}
          totalAmount={totalAmount}
          userName={userName}
          userEmail={userEmail}
          travelPurpose={travelPurpose}
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
      
      <Dialog open={showTravelDialog} onOpenChange={setShowTravelDialog}>
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Plane className="h-5 w-5 text-blue-500" />
              Business Travel Details
            </DialogTitle>
            <DialogDescription>
              Please provide information about your business travel
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-6">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(handleTravelDialogSave)} className="space-y-5">
                <TravelPurposeSelector />
                <DateRangeSelection />
                <MealSelection />
                
                <div className="flex justify-end gap-2 pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowTravelDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Save Details
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewExpense;
