
import React from 'react';
import { Calendar, Download } from 'lucide-react';

const ReportsHeader: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 className="text-2xl font-semibold">Reports</h1>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 px-3 py-2 rounded-md border border-input hover:bg-accent transition-colors">
          <Calendar className="h-4 w-4" />
          <span>Q4 2023</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
};

export default ReportsHeader;
