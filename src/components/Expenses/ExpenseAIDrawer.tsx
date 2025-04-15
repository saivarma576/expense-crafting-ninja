
import React from 'react';
import AIChatDrawer from '../Reports/AIChatDrawer';

// Simple wrapper that redirects to AIChatDrawer - kept for backwards compatibility
const ExpenseAIDrawer: React.FC<React.ComponentProps<typeof AIChatDrawer>> = (props) => {
  return <AIChatDrawer {...props} />;
};

export default ExpenseAIDrawer;
