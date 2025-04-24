
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles } from 'lucide-react';

interface VersionSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectV1: () => void;
  onSelectV2: () => void;
}

const VersionSelectionDialog: React.FC<VersionSelectionDialogProps> = ({
  isOpen,
  onClose,
  onSelectV1,
  onSelectV2
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Choose Expense Report Version</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 pt-4">
          <Button
            onClick={onSelectV1}
            variant="outline"
            className="flex flex-col items-center gap-4 h-auto p-6 hover:border-primary/50 hover:bg-primary/5"
          >
            <FileText className="h-8 w-8" />
            <div className="space-y-1 text-center">
              <h3 className="font-medium">Classic Version</h3>
              <p className="text-sm text-muted-foreground">Traditional form layout</p>
            </div>
          </Button>
          
          <Button
            onClick={onSelectV2}
            variant="outline"
            className="flex flex-col items-center gap-4 h-auto p-6 hover:border-primary/50 hover:bg-primary/5 relative"
          >
            <Sparkles className="h-8 w-8" />
            <div className="space-y-1 text-center">
              <h3 className="font-medium">Modern Version</h3>
              <p className="text-sm text-muted-foreground">Enhanced UI experience</p>
            </div>
            <span className="absolute top-2 right-2 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
              New
            </span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VersionSelectionDialog;
