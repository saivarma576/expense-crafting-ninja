
import React from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface AIChatDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

const AIChatDrawer: React.FC<AIChatDrawerProps> = ({ 
  open, 
  onClose, 
  title = "AI Expense Assistant"
}) => {
  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="h-[90vh]">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
          <DrawerDescription>
            Ask questions about your expense reports and analytics
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {/* AI Chat content would go here */}
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm">Hello! I'm your AI assistant. How can I help you with your expense reports today?</p>
            </div>
          </div>
        </div>
        
        <DrawerFooter className="border-t">
          <div className="flex items-center w-full gap-2">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            />
            <Button>Send</Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AIChatDrawer;
