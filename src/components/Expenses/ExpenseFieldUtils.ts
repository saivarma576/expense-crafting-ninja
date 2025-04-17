
import { DynamicField, ExpenseType } from '@/types/expense';

export const generateTypeSpecificFields = (type: ExpenseType): DynamicField[] => {
  const fields: DynamicField[] = [];

  // Common field for all types
  fields.push(
    { id: 'merchantName', label: 'Merchant Name', type: 'text', placeholder: 'Enter merchant name', required: true },
  );

  // Type-specific fields
  switch (type) {
    case 'hotel':
      fields.push(
        { id: 'zipCode', label: 'Zip Code', type: 'text', placeholder: 'Enter zip code', required: true },
        { id: 'city', label: 'City', type: 'text', required: true },
        { id: 'hotelRate', label: 'Hotel Rate', type: 'number', required: true },
        { id: 'throughDate', label: 'Through Date', type: 'date', required: true },
      );
      break;
    case 'meals':
      fields.push(
        { id: 'zipCode', label: 'Zip Code', type: 'text', required: true },
        { id: 'city', label: 'City', type: 'text', required: true },
        { id: 'mealsRate', label: 'Meals Rate', type: 'number', required: true },
        { id: 'departureTime', label: 'Departure Time', type: 'text', required: true },
        { id: 'returnTime', label: 'Return Time', type: 'text', required: false },
      );
      break;
    case 'mileage':
      fields.push(
        { id: 'miles', label: 'Miles', type: 'number', required: true },
        { id: 'mileageRate', label: 'Mileage Rate', type: 'number', required: true },
        { id: 'throughDate', label: 'Through Date', type: 'date', required: true },
      );
      break;
    default:
      // For all other expense types that require GL Account
      if (['transport', 'auditing', 'baggage', 'business_meals', 'subscriptions', 'gasoline', 
           'office_supplies', 'other', 'parking', 'postage', 'professional_fees', 
           'registration', 'rental'].includes(type)) {
        fields.push(
          { id: 'glAccount', label: 'GL Account', type: 'text', placeholder: 'E.g., 50600140', required: true },
        );
      }
      break;
  }

  return fields;
};

// Mock data - In a real app, these would come from an API
export const glAccounts = [
  { id: '1', code: '420000', name: 'Travel Expenses' },
  { id: '2', code: '420100', name: 'Meals & Entertainment' },
  { id: '3', code: '420200', name: 'Lodging Expenses' },
  { id: '4', code: '420300', name: 'Transportation' },
  { id: '5', code: '50600140', name: 'Office Supplies' },
];

export const costCenters = [
  { id: '1', code: '1000', name: 'Purchasing' },
  { id: '2', code: '2000', name: 'Marketing' },
  { id: '3', code: '3000', name: 'Finance' },
  { id: '4', code: '4000', name: 'IT Department' },
  { id: '5', code: '5000', name: 'Research & Development' },
];

// Standard rates
export const STANDARD_RATES = {
  HOTEL_RATE: 159,
  MEALS_RATE: 80,
  MILEAGE_RATE: 0.7
};

// Expense type map for display - ordered according to priority
export const EXPENSE_TYPE_DISPLAY = {
  mileage: 'Mileage',
  meals: 'Meals',
  hotel: 'Hotel/Lodging',
  transport: 'Air/Taxi/Uber',
  auditing: 'Auditing Serv Fees',
  baggage: 'Baggage Fees',
  business_meals: 'Business Meals',
  subscriptions: 'Dues Subscriptions',
  gasoline: 'Gasoline',
  office_supplies: 'Office Supplies',
  other: 'Others',
  parking: 'Parking/Tolls',
  postage: 'Postage & Freight',
  professional_fees: 'Professional Fees',
  registration: 'Registration Fees',
  rental: 'Rental Car',
};

// Group expense types by their field requirements
export const GL_ACCOUNT_REQUIRED_TYPES = [
  'transport',
  'auditing',
  'baggage',
  'business_meals',
  'subscriptions',
  'gasoline',
  'office_supplies',
  'other',
  'parking',
  'postage',
  'professional_fees',
  'registration',
  'rental'
];

export const HOTEL_LODGING_TYPES = ['hotel'];
export const MEALS_TYPES = ['meals', 'business_meals'];
export const MILEAGE_TYPES = ['mileage'];

