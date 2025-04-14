
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
        { id: 'checkInDate', label: 'Check-in Date', type: 'date', required: true },
        { id: 'checkOutDate', label: 'Check-out Date', type: 'date', required: true },
        { id: 'numberOfNights', label: 'Number of Nights', type: 'number', required: true },
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
    case 'transport':
      fields.push(
        { id: 'glAccount', label: 'GL Account', type: 'text', required: true },
        { id: 'location', label: 'Departure Location', type: 'text', required: true },
        { id: 'cityName', label: 'Destination', type: 'text', required: true },
      );
      break;
    default:
      // For all other expense types that require GL Account
      if (['auditing', 'baggage', 'business_meals', 'subscriptions', 'gasoline', 
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
  other: 'Others',
  professional_fees: 'Professional Fees',
  hotel: 'Hotel/Lodging',
  parking: 'Parking/Tolls',
  transport: 'Air/Taxi/Uber',
  business_meals: 'Business Meals',
  registration: 'Registration Fees',
  baggage: 'Baggage Fees',
  subscriptions: 'Dues Subscriptions',
  postage: 'Postage & Freight',
  gasoline: 'Gasoline',
  office_supplies: 'Office Supplies',
  rental: 'Rental Car',
  auditing: 'Auditing Serv Fees',
};
