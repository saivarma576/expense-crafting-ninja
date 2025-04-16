
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useForm, FormProvider } from 'react-hook-form';
import LineItemSlider from '@/components/ui/LineItemSlider';
import ExpenseLineItem from '@/components/Expenses/ExpenseLineItem';
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
import TravelExpenseDetails from './TravelExpenseDetails';
import { Button } from '@/components/ui/button';
import TravelExpenseDialog from './TravelExpenseDialog';
import ValidationWarningsModal from './ValidationWarningsModal';
import AIChatDrawer from './AIChatDrawer';
import { getAllValidations } from '@/utils/validationUtils';
import { ValidationProvider, useValidation } from '@/contexts/ValidationContext';
import { TravelInfoProvider, useTravelInfo } from '@/contexts/TravelInfoContext';

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

const NewExpenseContent: React.FC = () => {
  const navigate = useNavigate();
  const { 
    title, setTitle, 
    expenseNo, 
    dateRange,
    travelPurpose,
    isTravelExpense,
    travelComments,
    fromDate,
    toDate,
    mealsProvided,
    meals,
    handleOpenTravelDialog,
    handleRemoveTravelExpense
  } = useTravelInfo();
  
  const {
    setShowValidationWarnings,
    setActiveField,
    setProgrammaticErrors,
    setLlmWarnings,
    activeField
  } = useValidation();

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAIChat, setShowAIChat] = useState<boolean>(false);

  const handleRevalidate = () => {
    toast.info("Validating expense report...");
    
    setTimeout(() => {
      const randomErrors = [
        {field: 'Amount', error: 'Amount exceeds the $500 limit for meals without approval'},
        {field: 'Merchant Name', error: 'Merchant name is required'},
        {field: 'Date', error: 'Date is more than 60 days in the past'},
        {field: 'Receipt', error: 'Receipt is missing or invalid'},
        {field: 'GL Account', error: 'Invalid GL account number'}
      ];
      
      const randomWarnings = [
        'Receipt image appears to be for a personal expense, not a business expense',
        'This meal expense occurs on a weekend - please confirm it was for business purposes',
        'Consider using a corporate card for this expense type',
        'The hotel rate exceeds company policy for this location',
        'Multiple meal expenses on the same day may require additional approval'
      ];
      
      setProgrammaticErrors(randomErrors.slice(0, Math.floor(Math.random() * 3) + 1));
      setLlmWarnings(randomWarnings.slice(0, Math.floor(Math.random() * 4) + 1));
      
      toast.success("Validation complete");
    }, 1500);
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowValidationWarnings(true);
    }, 2000);
  };

  const handleAskAI = () => {
    setShowAIChat(!showAIChat);
  };

  const handleReviewItem = (violationId: string) => {
    const errorMatch = violationId.match(/error-(\d+)/);
    const warningMatch = violationId.match(/warning-(\d+)/);
    
    if (errorMatch) {
      setActiveField('Amount');
    } else if (warningMatch) {
      const warning = warningMatch[1];
      if (parseInt(warning) % 2 === 0) {
        setActiveField('Receipt');
      } else {
        setActiveField('Amount');
      }
    }
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
          isTravelExpense={isTravelExpense}
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
          activeField={activeField === 'Receipt' ? 'receipt' : undefined}
        />
        
        {/* ExpenseApproval component has been removed */}
      </div>
      
      <ExpenseActions 
        totalAmount={totalAmount} 
        onSubmit={handleSubmit}
        onAskAI={handleAskAI}
        onSaveAsDraft={() => toast.info("Expense saved as draft")}
        onDiscard={() => navigate('/expenses')}
        submitting={isSubmitting}
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
          activeField={activeField}
        />
      </LineItemSlider>
      
      <TravelExpenseDialog />
      
      <ValidationWarningsModal onReviewItem={handleReviewItem} />
      
      <AIChatDrawer
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
        context="Expense report for business travel with meal expenses and hotel stays."
      />
    </div>
  );
};

const NewExpense: React.FC = () => {
  const location = useLocation();
  const expenseData = location.state?.expenseData as FormValues | undefined;
  
  useEffect(() => {
    if (expenseData) {
      toast.success("Form data successfully transferred to expense screen");
    }
  }, [expenseData]);

  return (
    <ValidationProvider>
      <TravelInfoProvider initialData={expenseData}>
        <NewExpenseContent />
      </TravelInfoProvider>
    </ValidationProvider>
  );
};

export default NewExpense;
