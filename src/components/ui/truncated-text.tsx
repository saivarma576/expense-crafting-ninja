
import React, { useState, useRef, useEffect } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TruncatedTextProps {
  text: string;
  maxLength?: number;
  className?: string;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({ 
  text, 
  maxLength = 150,
  className = "" 
}) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        const element = textRef.current;
        setIsTruncated(text.length > maxLength);
      }
    };

    checkTruncation();
    window.addEventListener('resize', checkTruncation);
    
    return () => {
      window.removeEventListener('resize', checkTruncation);
    };
  }, [text, maxLength]);

  const truncatedText = text.length > maxLength 
    ? `${text.substring(0, maxLength).trim()}...` 
    : text;

  if (!isTruncated) {
    return <p ref={textRef} className={className}>{text}</p>;
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <p ref={textRef} className={`${className} cursor-help`}>{truncatedText}</p>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-md p-4 text-sm">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TruncatedText;
