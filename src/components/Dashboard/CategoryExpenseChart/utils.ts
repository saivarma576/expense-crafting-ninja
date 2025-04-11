
export const formatYAxis = (value: number): string => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toString();
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
  '#6B7280', // Gray
  '#D946EF', // Fuchsia
  '#FBBF24', // Yellow
  '#0284C7', // Dark Blue
  '#9333EA', // Purple
  '#71717A', // Zinc
  '#2DD4BF'  // Light Teal
];

// Updated category names to match the image
export const expenseCategories = [
  'Relocation Reimbursement',
  'Standard Category',
  'Expense - Other',
  'Travel - Intercity-Personal Vehicle',
  'Travel - International',
  'Per-Diem - Domestic',
  'Per-Diem - International',
  'Expense - Internet',
  'Expense - Mobile',
  'Expense-Medical',
  'Travel-Intercity-Cab/Bus/Auto',
  'Travel-Intercity-Cab/Bus/Flight',
  'Health and Wellness',
  'Lodging & Accommodation',
  'Meals & Entertainment',
  'Miscellaneous Business Expenses',
  'Office Supplies & Equipment',
  'Professional Development',
  'Cash',
  'Remote Work Setup',
  'IT & Software',
  'Travel & Transportation',
  'Travel (Personal Vehicle)'
];

// Map categories to their colors
export const getCategoryColorMap = () => {
  return expenseCategories.reduce((map, category, index) => {
    map[category] = categoryColors[index % categoryColors.length];
    return map;
  }, {} as Record<string, string>);
};
