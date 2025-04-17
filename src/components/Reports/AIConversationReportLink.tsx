
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from 'lucide-react';

const AIConversationReportLink: React.FC = () => {
  return (
    <Link to="/reports/ai-conversations">
      <Button 
        variant="outline" 
        className="flex items-center gap-1.5 border-dashed"
      >
        <Sparkles className="h-4 w-4 text-amber-500" />
        AI Conversation Analytics
        <Badge variant="secondary" className="ml-2 text-xs">New</Badge>
      </Button>
    </Link>
  );
};

export default AIConversationReportLink;
