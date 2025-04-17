
import { DynamicField, ExpenseType } from '@/types/expense';

export const generateTypeSpecificFields = (type: ExpenseType): DynamicField[] => {
  const fields: DynamicField[] = [
    { id: 'merchantName', label: 'Merchant Name', type: 'text', placeholder: 'Enter merchant name', required: true },
  ];

  switch (type) {
    case 'hotel':
      fields.push(
        { id: 'location', label: 'Lodging Location', type: 'text', placeholder: 'Address or hotel name', required: true },
        { id: 'checkInDate', label: 'Check-in Date', type: 'date', required: true },
        { id: 'checkOutDate', label: 'Check-out Date', type: 'date', required: true },
        { id: 'numberOfNights', label: 'Number of Nights', type: 'number', required: true },
        { id: 'cityName', label: 'City', type: 'text', required: true },
        { id: 'zipCode', label: 'ZIP Code', type: 'text', required: true },
      );
      break;
    case 'transport':
      fields.push(
        { id: 'location', label: 'Departure Location', type: 'text', required: true },
        { id: 'cityName', label: 'Destination', type: 'text', required: true },
        { id: 'checkInDate', label: 'Departure Date', type: 'date', required: true },
        { id: 'checkOutDate', label: 'Return Date', type: 'date', required: false },
      );
      break;
    case 'meals':
      fields.push(
        { id: 'cityName', label: 'City', type: 'text', required: true },
      );
      break;
    case 'rental':
      fields.push(
        { id: 'location', label: 'Pickup Location', type: 'text', required: true },
        { id: 'checkInDate', label: 'Pickup Date', type: 'date', required: true },
        { id: 'checkOutDate', label: 'Return Date', type: 'date', required: true },
        { id: 'cityName', label: 'City', type: 'text', required: true },
      );
      break;
    default:
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
];

export const costCenters = [
  { id: '1', code: '1000', name: 'Purchasing' },
  { id: '2', code: '2000', name: 'Marketing' },
  { id: '3', code: '3000', name: 'Finance' },
  { id: '4', code: '4000', name: 'IT Department' },
];
