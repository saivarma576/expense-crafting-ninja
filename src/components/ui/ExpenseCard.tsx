
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Plane, Hotel, UtensilsCrossed, Car, Taxi, FileQuestion,
  ChevronRight 
} from 'lucide-react';

type ExpenseType = 'airfare' | 'hotel' | 'meals' | 'rental' | 'transport' | 'other';

interface ExpenseCardProps {
  id: string;
  title: string;
  date: string;
  amount: number;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  expenseTypes: ExpenseType[];
  description?: string;
  onClick?: () => void;
}

const getExpenseTypeIcon = (type: ExpenseType) => {
  switch (type) {
    case 'airfare': return <Plane className="h-4 w-4" />;
    case 'hotel': return <Hotel className="h-4 w-4" />;
    case 'meals': return <UtensilsCrossed className="h-4 w-4" />;
    case 'rental': return <Car className="h-4 w-4" />;
    case 'transport': return <Taxi className="h-4 w-4" />;
    case 'other': 
    default: 
      return <FileQuestion className="h-4 w-4" />;
  }
};

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'draft':
      return 'bg-muted text-muted-foreground';
    case 'submitted':
      return 'bg-blue-100 text-blue-700';
    case 'approved':
      return 'bg-green-100 text-green-700';
    case 'rejected':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const ExpenseCard: React.FC<ExpenseCardProps> = ({
  id,
  title,
  date,
  amount,
  status,
  expenseTypes,
  description,
  onClick,
}) => {
  return (
    <div 
      className="glass-card rounded-xl p-5 cursor-pointer hover:translate-y-[-2px] transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
        <div className={cn(
          "px-2.5 py-1 text-xs font-medium rounded-full capitalize",
          getStatusStyles(status)
        )}>
          {status}
        </div>
      </div>
      
      {description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
      )}
      
      <div className="flex justify-between items-end">
        <div className="flex space-x-2">
          {expenseTypes.slice(0, 3).map((type, index) => (
            <div 
              key={`${id}-${type}-${index}`}
              className={cn(
                "flex items-center justify-center rounded-full p-1.5",
                `text-expense-${type}`,
                "bg-muted"
              )}
            >
              {getExpenseTypeIcon(type)}
            </div>
          ))}
          {expenseTypes.length > 3 && (
            <div className="flex items-center justify-center rounded-full w-6 h-6 bg-muted text-xs">
              +{expenseTypes.length - 3}
            </div>
          )}
        </div>
        
        <div className="flex items-center">
          <span className="font-semibold mr-1">${amount.toFixed(2)}</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
