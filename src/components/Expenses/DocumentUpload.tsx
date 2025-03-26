
import React from 'react';
import { Upload, FileText, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface DocumentUploadProps {
  uploadedDocuments: {name: string, size: string}[];
  setUploadedDocuments: React.Dispatch<React.SetStateAction<{name: string, size: string}[]>>;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ 
  uploadedDocuments, 
  setUploadedDocuments 
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    toast.success(`Uploading ${files.length} file(s)`);
    // Process the files
    const newDocs = Array.from(files).map(file => ({
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`
    }));
    setUploadedDocuments(prev => [...prev, ...newDocs]);
  };

  const handleDeleteDocument = (index: number) => {
    setUploadedDocuments(prevDocs => prevDocs.filter((_, i) => i !== index));
    toast.success("Document removed");
  };

  return (
    <div>
      <h3 className="text-base font-medium text-gray-800 mb-3">Documents</h3>
      
      <div 
        className="border rounded-lg bg-gray-50 mb-4"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="border border-dashed rounded-lg m-2 p-6 text-center">
          <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
            <Upload className="h-5 w-5 text-blue-500" />
          </div>
          
          <p className="text-sm font-medium text-gray-700 mb-1">Drag and drop files here</p>
          <p className="text-xs text-gray-500 mb-4">Support for receipt images and PDFs</p>
          
          <label htmlFor="file-upload" className="cursor-pointer">
            <input
              id="file-upload"
              type="file"
              className="hidden"
              multiple
              onChange={handleFileInput}
            />
            <Button 
              variant="outline" 
              size="sm" 
              type="button"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Upload className="h-3.5 w-3.5 mr-1.5" />
              Browse Files
            </Button>
          </label>
        </div>
      </div>
      
      {uploadedDocuments.length > 0 && (
        <div className="space-y-2 max-h-[250px] overflow-y-auto">
          {uploadedDocuments.map((doc, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between bg-white border rounded-md p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="h-8 w-8 bg-blue-50 rounded-md flex items-center justify-center flex-shrink-0">
                  <FileText className="h-4 w-4 text-blue-500" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-sm font-medium text-gray-800 truncate max-w-[180px]">
                    {doc.name}
                  </div>
                  <div className="text-xs text-gray-500">{doc.size}</div>
                </div>
              </div>
              
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-500 hover:text-gray-700">
                  <Download className="h-3.5 w-3.5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteDocument(index)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
