
import React from 'react';
import { Upload, Camera, Mail, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UploadButtonProps {
  onClick: () => void;
  onInboxClick?: () => void;
  onUploadClick?: () => void;
  onCaptureClick?: () => void;
  floating?: boolean;
  mode?: 'upload' | 'capture';
}

const UploadButton: React.FC<UploadButtonProps> = ({
  onClick,
  onInboxClick,
  onUploadClick,
  onCaptureClick,
  floating = false,
  mode = 'upload'
}) => {
  const isUploadMode = mode === 'upload';
  const Icon = isUploadMode ? Upload : Camera;
  const buttonText = isUploadMode ? 'Receipt Actions' : 'Capture Receipt';
  const tooltipText = isUploadMode ? 'Receipt Actions' : 'Capture Receipt';

  const handleOptionClick = (option: string) => {
    switch (option) {
      case 'inbox':
        onInboxClick?.();
        break;
      case 'upload':
        onUploadClick?.();
        break;
      case 'capture':
        onCaptureClick?.();
        break;
      default:
        onClick();
    }
  };

  if (floating) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg group"
              onClick={onClick}
            >
              <Plus className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span className="sr-only">{buttonText}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p className="text-xs">{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-sm group transition-all duration-300"
        >
          <Icon className="h-5 w-5 mr-1.5 group-hover:scale-110 transition-transform" />
          Receipt Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem 
          onClick={() => handleOptionClick('inbox')}
          className="cursor-pointer flex items-center"
        >
          <Mail className="h-4 w-4 mr-2" />
          Inbox
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleOptionClick('upload')}
          className="cursor-pointer flex items-center"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Receipt
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleOptionClick('capture')}
          className="cursor-pointer flex items-center"
        >
          <Camera className="h-4 w-4 mr-2" />
          Capture Receipt
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UploadButton;
