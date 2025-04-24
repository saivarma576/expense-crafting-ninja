
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles, Plane } from 'lucide-react';

interface VersionSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectV1: () => void;
  onSelectV2: () => void;
  onSelectV3: () => void;
}

const VersionSelectionDialog: React.FC<VersionSelectionDialogProps> = ({
  isOpen,
  onClose,
  onSelectV1,
  onSelectV2,
  onSelectV3
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-medium mb-4">Choose Your Experience</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Button
            onClick={onSelectV1}
            variant="outline"
            className="flex flex-col items-center gap-4 h-auto p-6 hover:border-primary/50 hover:bg-primary/5 group transition-all"
          >
            <FileText className="h-8 w-8 text-gray-600 group-hover:text-primary transition-colors" />
            <div className="space-y-1 text-center">
              <h3 className="font-medium">Classic Version</h3>
              <p className="text-sm text-muted-foreground">Traditional form layout for quick entries</p>
            </div>
          </Button>
          
          <Button
            onClick={onSelectV2}
            variant="outline"
            className="flex flex-col items-center gap-4 h-auto p-6 hover:border-primary/50 hover:bg-primary/5 group transition-all"
          >
            <Sparkles className="h-8 w-8 text-gray-600 group-hover:text-primary transition-colors" />
            <div className="space-y-1 text-center">
              <h3 className="font-medium">Modern Version</h3>
              <p className="text-sm text-muted-foreground">Enhanced UI with intuitive workflow</p>
            </div>
          </Button>

          <Button
            onClick={onSelectV3}
            variant="outline"
            className="flex flex-col items-center gap-4 h-auto p-6 hover:border-primary/50 hover:bg-primary/5 group transition-all relative bg-gradient-to-br from-blue-50 to-indigo-50"
          >
            <Plane className="h-8 w-8 text-primary transition-colors" />
            <div className="space-y-1 text-center">
              <h3 className="font-medium">Travel Journey</h3>
              <p className="text-sm text-muted-foreground">Streamlined travel expense workflow</p>
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
