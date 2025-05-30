import React, { useState, useEffect } from 'react';
import { PolicyViolation, validateExpensePolicy, PolicyComment } from '@/utils/policyValidations';
import { ExpenseLineItemFormData, ExpenseLineItem as ExpenseLineItemType } from '@/types/expense';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Plane, HelpCircle } from 'lucide-react';
import { useForm, FormProvider } from 'react-hook-form';
import LineItemSlider from '@/components/ui/LineItemSlider';
import ExpenseLineItem from '@/components/Expenses/ExpenseLineItem';
import { ExpenseApproval } from '@/components/Expenses/ExpenseApproval';
import ExpenseHeader from '@/components/Expenses/ExpenseHeader/index';
import LineItemsSection from '@/components/Expenses/LineItemsSection';
import DocumentsNotesSection from '@/components/Expenses/DocumentsNotesSection';
import { ExpenseActions } from '@/components/Expenses/ExpenseActions';
import { useExpenseLineItems } from '@/hooks/useExpenseLineItems';
import { ExpenseDocument } from '@/types/expense';
import { FormValues, TravelPurpose, MealData, MealType } from './CreateExpense/types';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import TravelExpenseDetails from './TravelExpenseDetails';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import TravelPurposeSelector from './CreateExpense/TravelPurposeSelector';
import DateRangeSelection from './CreateExpense/DateRangeSelection';
import MealSelection from './CreateExpense/MealSelection';
import ValidationWarnings from './ExpenseForm/ValidationWarnings';
import PolicyViolationsModal from './ExpenseForm/PolicyViolationsModal';
import ExpenseAIDrawer from './ExpenseAIDrawer';
import { getAllValidations } from '@/utils/validationUtils';
import PolicyTooltip from './ExpenseForm/PolicyTooltip';
import CompactPolicyHeader from './ExpenseForm/CompactPolicyHeader';
import { useTravelInfo } from '@/contexts/TravelInfoContext';
import TravelExpenseDialog from './TravelExpenseDialog';

interface EnhancedExpenseLineItem extends ExpenseLineItemType {
  policyViolations?: PolicyViolation[];
}

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
  
  const { 
    isTravelExpense, 
    setIsTravelExpense,
    travelPurpose,
    setTravelPurpose,
    fromDate, 
    setFromDate,
    toDate, 
    setToDate,
    mealsProvided, 
    setMealsProvided,
    meals, 
    setMeals,
    travelComments, 
    setTravelComments,
    title, 
    setTitle,
    dateRange, 
    setDateRange,
    showTravelDialog, 
    setShowTravelDialog,
    expenseNo,
    handleOpenTravelDialog,
    handleTravelDialogSave,
    handleRemoveTravelExpense,
    formattedDateRange,
    isSameDayTravel,
    setIsSameDayTravel
  } = useTravelInfo();

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
  const [showValidationWarnings, setShowValidationWarnings] = useState<boolean>(false);
  const [showAIChat, setShowAIChat] = useState<boolean>(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      isBusinessTravel: isTravelExpense ? 'yes' : 'no',
      travelPurpose: travelPurpose,
      fromDate: fromDate,
      toDate: toDate,
      mealsProvided: mealsProvided || 'no',
      meals: meals || [],
      travelComments: travelComments || '',
      expenseTitle: '',
      isSameDayTravel: isSameDayTravel || false
    }
  });
  
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
      console.log("Expense data received:", expenseData);
      toast.success("Form data successfully transferred to expense screen");
      setIsTravelExpense(expenseData.isBusinessTravel === 'yes');
      setFromDate(expenseData.fromDate);
      setToDate(expenseData.toDate);
      setMealsProvided(expenseData.mealsProvided || 'no');
      setMeals(expenseData.meals || []);
      setTravelPurpose(expenseData.travelPurpose);
      setTravelComments(expenseData.travelComments || '');
      setIsSameDayTravel(expenseData.isSameDayTravel || false);
      
      if (expenseData.travelPurpose) {
        setTitle(`${expenseData.travelPurpose.charAt(0).toUpperCase() + expenseData.travelPurpose.slice(1)} Trip`);
      }
      
      if (expenseData.fromDate && expenseData.toDate) {
        setDateRange(formatDateInfo(expenseData));
      }
      
      let expenseNotes = '';
      
      if (expenseData.travelPurpose) {
        expenseNotes += `Purpose: ${expenseData.travelPurpose.charAt(0).toUpperCase() + expenseData.travelPurpose.slice(1)}\n`;
      }
      
      if (expenseData.fromDate && expenseData.toDate) {
        expenseNotes += `Date range: ${formatDateInfo(expenseData)}\n`;
      }
      
      if (expenseData.mealsProvided === 'yes' && expenseData.meals?.length > 0) {
        const providedMealTypes = [];
        if (expenseData.meals.some(meal => meal.breakfast)) providedMealTypes.push('Breakfast');
        if (expenseData.meals.some(meal => meal.lunch)) providedMealTypes.push('Lunch');
        if (expenseData.meals.some(meal => meal.dinner)) providedMealTypes.push('Dinner');
        
        if (providedMealTypes.length > 0) {
          expenseNotes += `Business travel with ${providedMealTypes.join(', ')} provided.`;
        }
      }
      
      setNotes(expenseNotes);
    }
  }, [expenseData, setIsTravelExpense, setFromDate, setToDate, setMealsProvided, setMeals, setTravelPurpose, setTravelComments, setTitle, setDateRange, setIsSameDayTravel]);

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
      
      if (programmaticErrors.length > 0 || llmWarnings.length > 0) {
        setShowValidationWarnings(true);
      } else {
        toast.success("Expense report submitted successfully!");
        navigate('/expenses');
      }
    }, 2000);
  };
  
  const handleContinueAnyway = () => {
    setShowValidationWarnings(false);
    toast.success("Expense report submitted with warnings");
    navigate('/expenses');
  };

  const handleAskAI = () => {
    setShowAIChat(!showAIChat);
  };

  const handleReviewItem = (violationId: string) => {
    const errorMatch = violationId.match(/error-(\d+)/);
    const warningMatch = violationId.match(/warning-(\d+)/);
    
    if (errorMatch && programmaticErrors[parseInt(errorMatch[1])]) {
      const error = programmaticErrors[parseInt(errorMatch[1])];
      setActiveField(error.field);
    } else if (warningMatch && llmWarnings[parseInt(warningMatch[1])]) {
      const warning = llmWarnings[parseInt(warningMatch[1])];
      if (warning.toLowerCase().includes('receipt')) {
        setActiveField('Receipt');
      } else if (warning.toLowerCase().includes('meal')) {
        setActiveField('Amount');
      }
    }
  };

  const handleAddViolationComment = (itemId: string, violationId: string, comment: string) => {
    const updatedItems = lineItems.map(item => {
      if (item.id === itemId) {
        const currentViolations = (item as EnhancedExpenseLineItem).policyViolations || getLineItemPolicyViolations(item);
        
        const updatedViolations = currentViolations.map(violation => {
          if (violation.id === violationId) {
            return {
              ...violation,
              comments: [
                ...(violation.comments || []),
                {
                  id: `comment-${Date.now()}`,
                  comment,
                  user: userName,
                  timestamp: new Date()
                }
              ]
            };
          }
          return violation;
        });

        return {
          ...item,
          policyViolations: updatedViolations
        } as EnhancedExpenseLineItem;
      }
      return item;
    });

    const updatedItem = updatedItems.find(item => item.id === itemId);
    
    if (updatedItem) {
      const formData: ExpenseLineItemFormData = {
        id: updatedItem.id,
        type: updatedItem.type.toLowerCase().replace(/\s+/g, '_') as any,
        amount: updatedItem.amount,
        date: updatedItem.date,
        description: updatedItem.title,
        receiptUrl: updatedItem.receiptUrl || '',
        receiptName: updatedItem.receiptName || '',
        merchantName: updatedItem.merchantName || '',
        account: updatedItem.account,
        accountName: updatedItem.accountName,
        costCenter: updatedItem.costCenter,
        costCenterName: updatedItem.costCenterName,
        notes: updatedItem.notes || '',
        wbs: updatedItem.wbs || ''
      };
      
      handleLineItemSave(formData);
    }
  };

  const [programmaticErrors, setProgrammaticErrors] = useState<{field: string, error: string}[]>([
    {field: 'Amount', error: 'Amount exceeds the $500 limit for meals without approval'},
    {field: 'Merchant Name', error: 'Merchant name is required'}
  ]);
  
  const [llmWarnings, setLlmWarnings] = useState<string[]>([
    'Receipt image appears to be for a personal expense, not a business expense',
    'This meal expense occurs on a weekend - please confirm it was for business purposes',
    'Consider using a corporate card for this expense type'
  ]);

  const policyViolations: PolicyViolation[] = [
    ...programmaticErrors.map((error, index) => ({
      id: `error-${index}`,
      lineNumber: index + 1,
      lineTitle: `Error in ${error.field}`,
      expenseType: 'Business Meal',
      field: error.field,
      message: error.error,
      severity: 'error' as const,
      status: 'violation' as const,
      category: 'Validation',
      violationType: 'error' as const
    })),
    ...llmWarnings.map((warning, index) => ({
      id: `warning-${index}`,
      lineNumber: index + 1,
      lineTitle: `Policy Warning`,
      expenseType: 'Business Expense',
      field: warning.toLowerCase().includes('receipt') ? 'Receipt' : 
             warning.toLowerCase().includes('meal') ? 'Meal' : 'General',
      message: warning,
      severity: 'warning' as const,
      status: 'violation' as const,
      category: 'Policy',
      violationType: 'warning' as const
    }))
  ];

  const getLineItemPolicyViolations = (item: ExpenseLineItemType): PolicyViolation[] => {
    const formData: ExpenseLineItemFormData = {
      id: item.id,
      type: item.type.toLowerCase().replace(/\s+/g, '_') as any,
      amount: item.amount,
      date: item.date,
      description: item.title,
      notes: item.notes || '',
      receiptUrl: item.receiptName || '',
      receiptName: item.receiptName || '',
      merchantName: item.merchantName || '',
      account: item.account,
      accountName: item.accountName,
      costCenter: item.costCenter,
      costCenterName: item.costCenterName,
      wbs: item.wbs || ''
    };
    
    return validateExpensePolicy(formData);
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
        {policyViolations.length > 0 && (
          <CompactPolicyHeader
            violations={policyViolations}
            onAddComment={(violationId, comment, type) => {
              handleAddViolationComment('header', violationId, comment);
            }}
          />
        )}
        
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
          policyViolations={policyViolations}
          onAddViolationComment={(violationId, comment, type) => {
            handleAddViolationComment('header', violationId, comment);
          }}
        />

        <LineItemsSection 
          lineItems={lineItems.map(item => ({
            ...item,
            policyViolations: (item as EnhancedExpenseLineItem).policyViolations || getLineItemPolicyViolations(item)
          }))}
          handleAddLineItem={handleAddLineItem}
          handleEditLineItem={handleEditLineItem}
          handleDeleteLineItem={handleDeleteLineItem}
          totalAmount={totalAmount}
          onAddViolationComment={handleAddViolationComment}
        />
          
        <DocumentsNotesSection 
          uploadedDocuments={uploadedDocuments}
          setUploadedDocuments={setUploadedDocuments}
          notes={notes}
          setNotes={setNotes}
          activeField={activeField === 'Receipt' ? 'receipt' : undefined}
        />
        
        <ExpenseApproval />
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
      
      <PolicyViolationsModal
        open={showValidationWarnings}
        onClose={() => setShowValidationWarnings(false)}
        onReviewAndFix={handleReviewItem}
        onContinueAnyway={handleContinueAnyway}
        violations={policyViolations}
      />
      
      <ExpenseAIDrawer
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
        context="Expense report for business travel with meal expenses and hotel stays."
      />
    </div>
  );
};

export default NewExpense;
