
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LineItemSliderProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const LineItemSlider: React.FC<LineItemSliderProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Prevent body scrolling when the slider is open
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Re-enable body scrolling when the slider is closed
        document.body.style.overflow = '';
      }, 300);
      return () => clearTimeout(timer);
    }
    
    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isVisible && !isOpen) {
    return null;
  }

  return (
    <div className={cn(
      "fixed inset-0 z-50 bg-black/25 backdrop-blur-sm",
      isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
      "transition-opacity duration-300"
    )}>
      <div 
        className={cn(
          "fixed inset-y-0 right-0 w-full max-w-[700px] bg-white shadow-lg flex flex-col h-full",
          "transform transition-transform duration-300 ease-in-out rounded-l-2xl",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-base font-medium text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <ScrollArea className="flex-1 h-[calc(100vh-65px)] overflow-x-hidden relative">
          <div className="relative p-4">
            {children}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LineItemSlider;
