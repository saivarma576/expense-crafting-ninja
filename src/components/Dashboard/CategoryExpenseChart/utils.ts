
export const formatYAxis = (value: number): string => {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};

// More vibrant colors for better visibility
export const categoryColors = [
  '#6366F1', // Indigo
  '#10B981', // Emerald
  '#F43F5E', // Rose
  '#F59E0B', // Amber
  '#8B5CF6', // Violet
  '#14B8A6', // Teal
  '#3B82F6', // Blue
  '#EC4899', // Pink
  '#8D8D8D', // Gray
  '#F97316', // Orange
  '#84CC16', // Lime
  '#06B6D4', // Cyan
  '#EF4444', // Red
  '#22C55E', // Green
  '#A855F7', // Purple
  '#0EA5E9', // Sky
];

// Updated category names to match the user's specified list
export const expenseCategories = [
  'Mileage',
  'Dues Subscriptions',
  'Auditing Serv Fees',
  'Hotel/Lodging',
  'Meals',
  'Others',
  'Professional Fees',
  'Gasoline',
  'Office Supplies',
  'Business Meals',
  'Postage & Freight',
  'Registration Fees',
  'Parking/Tolls',
  'Air/Taxi/Uber',
  'Baggage Fees',
  'Rental Car'
];

// Map categories to their colors
export const getCategoryColorMap = () => {
  return expenseCategories.reduce((map, category, index) => {
    map[category] = categoryColors[index % categoryColors.length];
    return map;
  }, {} as Record<string, string>);
};
