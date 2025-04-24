import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { TravelPurpose, Meal, FormValues } from '@/components/Expenses/CreateExpense/types';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface TravelInfoContextType {
  isTravelExpense: boolean;
  travelPurpose: TravelPurpose | undefined;
  fromDate: Date | undefined;
  toDate: Date | undefined;
  mealsProvided: string;
  meals: Meal[];
  travelComments: string;
  title: string;
  dateRange: string;
  showTravelDialog: boolean;
  expenseNo: string;
  setIsTravelExpense: React.Dispatch<React.SetStateAction<boolean>>;
  setTravelPurpose: React.Dispatch<React.SetStateAction<TravelPurpose | undefined>>;
  setFromDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setToDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setMealsProvided: React.Dispatch<React.SetStateAction<string>>;
  setMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
  setTravelComments: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDateRange: React.Dispatch<React.SetStateAction<string>>;
  setShowTravelDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenTravelDialog: () => void;
  handleTravelDialogSave: (data: FormValues) => void;
  handleRemoveTravelExpense: () => void;
  formattedDateRange: () => string;
  isSameDayTravel: boolean;
  setIsSameDayTravel: React.Dispatch<React.SetStateAction<boolean>>;
}

const TravelInfoContext = createContext<TravelInfoContextType | undefined>(undefined);

function formatDateInfo(data?: FormValues): string {
  if (data?.fromDate && data?.toDate) {
    const fromDateStr = format(data.fromDate, 'MMM dd, yyyy');
    const toDateStr = format(data.toDate, 'MMM dd, yyyy');
    return `${fromDateStr} - ${toDateStr}`;
  }
  return 'Dec 14, 2021';
}

export const TravelInfoProvider: React.FC<{ 
  children: ReactNode;
  initialData?: FormValues;
}> = ({ children, initialData }) => {
  const [isTravelExpense, setIsTravelExpense] = useState<boolean>(true);
  const [showTravelDialog, setShowTravelDialog] = useState<boolean>(false);
  
  const [fromDate, setFromDate] = useState<Date | undefined>(initialData?.fromDate);
  const [toDate, setToDate] = useState<Date | undefined>(initialData?.toDate);
  const [mealsProvided, setMealsProvided] = useState<string>(initialData?.mealsProvided || 'no');
  const [meals, setMeals] = useState<Meal[]>(initialData?.meals || []);
  const [travelPurpose, setTravelPurpose] = useState<TravelPurpose | undefined>(initialData?.travelPurpose);
  const [travelComments, setTravelComments] = useState<string>(initialData?.travelComments || '');
  
  const [title, setTitle] = useState(initialData?.travelPurpose ? 
    `${initialData.travelPurpose.charAt(0).toUpperCase() + initialData.travelPurpose.slice(1)} Trip` : 
    'Trip to Europe');
    
  const [dateRange, setDateRange] = useState(formatDateInfo(initialData));
  const [expenseNo] = useState('Ref-154264');
  const [isSameDayTravel, setIsSameDayTravel] = useState<boolean>(initialData?.isSameDayTravel || false);

  useEffect(() => {
    if (initialData) {
      console.log("Expense data received:", initialData);
      
      setIsTravelExpense(initialData.isBusinessTravel === 'yes');
      setFromDate(initialData.fromDate);
      setToDate(initialData.toDate);
      setMealsProvided(initialData.mealsProvided || 'no');
      setMeals(initialData.meals || []);
      setTravelPurpose(initialData.travelPurpose);
      setTravelComments(initialData.travelComments || '');
      setIsSameDayTravel(initialData.isSameDayTravel || false);
    }
  }, [initialData]);
  
  const handleOpenTravelDialog = () => {
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
    
    setIsSameDayTravel(data.isSameDayTravel || false);
    
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
    <TravelInfoContext.Provider
      value={{
        isTravelExpense,
        travelPurpose,
        fromDate,
        toDate,
        mealsProvided,
        meals,
        travelComments,
        title,
        dateRange,
        showTravelDialog,
        expenseNo,
        setIsTravelExpense,
        setTravelPurpose,
        setFromDate,
        setToDate,
        setMealsProvided,
        setMeals,
        setTravelComments,
        setTitle,
        setDateRange,
        setShowTravelDialog,
        handleOpenTravelDialog,
        handleTravelDialogSave,
        handleRemoveTravelExpense,
        formattedDateRange,
        isSameDayTravel,
        setIsSameDayTravel
      }}
    >
      {children}
    </TravelInfoContext.Provider>
  );
};

export const useTravelInfo = () => {
  const context = useContext(TravelInfoContext);
  if (context === undefined) {
    throw new Error('useTravelInfo must be used within a TravelInfoProvider');
  }
  return context;
};
