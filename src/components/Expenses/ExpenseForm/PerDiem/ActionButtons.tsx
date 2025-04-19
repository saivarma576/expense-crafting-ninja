
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ActionButtonsProps {
  onSave: () => void;
  onClose: () => void;
  onDownloadPDF: () => void;
  onRecalculate: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onSave,
  onClose,
  onDownloadPDF,
  onRecalculate
}) => {
  const { toast } = useToast();

  const handleSave = () => {
    onSave();
    toast({
      title: "Per diem calculation saved",
      description: "Your per diem calculation has been successfully saved.",
    });
  };

  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="outline" onClick={onRecalculate} className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Recalculate
      </Button>
      <Button variant="outline" onClick={onDownloadPDF} className="gap-2">
        <Download className="h-4 w-4" />
        Download PDF
      </Button>
      <Button onClick={handleSave}>
        Submit
      </Button>
    </div>
  );
};

export default ActionButtons;
