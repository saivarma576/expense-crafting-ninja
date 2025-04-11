
import { useState } from 'react';

export const useYearState = (initialYear: number = 2023) => {
  const [selectedYear, setSelectedYear] = useState(initialYear);

  const handleYearChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedYear(prev => prev - 1);
    } else {
      setSelectedYear(prev => prev + 1);
    }
  };

  return { selectedYear, handleYearChange };
};
