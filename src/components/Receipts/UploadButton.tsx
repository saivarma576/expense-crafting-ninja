
import React from 'react';
import { Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface UploadButtonProps {
  onClick: () => void;
  floating?: boolean;
}

const UploadButton: React.FC<UploadButtonProps> = ({
  onClick,
  floating = false
}) => {
  if (floating) {
    return (
      <Button 
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg group"
        onClick={onClick}
      >
        <Upload className="h-6 w-6 group-hover:scale-110 transition-transform" />
        <span className="sr-only">Upload Receipt</span>
      </Button>
    );
  }
  
  return (
    <Button 
      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-sm group transition-all duration-300"
      onClick={onClick}
    >
      <Upload className="h-5 w-5 mr-1.5 group-hover:scale-110 transition-transform" />
      Upload Receipt
    </Button>
  );
};

export default UploadButton;
