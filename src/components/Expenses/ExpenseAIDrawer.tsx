
import React from 'react';
import AIChatDrawer from './AIChatDrawer';

interface ExpenseAIDrawerProps extends React.ComponentProps<typeof AIChatDrawer> {
  isLineItemSliderOpen?: boolean;
}

// Policy AI drawer that adjusts its positioning when the LineItemSlider is open
const ExpenseAIDrawer: React.FC<ExpenseAIDrawerProps> = ({ 
  isLineItemSliderOpen,
  ...props 
}) => {
  return (
    <AIChatDrawer 
      {...props}
      className={isLineItemSliderOpen ? "mr-[1000px] transition-all duration-300" : ""}
    />
  );
};

export default ExpenseAIDrawer;
