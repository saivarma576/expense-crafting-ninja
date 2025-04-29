
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, ChevronDown, ChevronUp, FileText, Calendar 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface ComplianceInsight {
  category: string;
  count: number;
  trend: number;
  risk: string;
  impact: number;
  status: string;
  // Add the missing properties required by ReportV3
  id: string;
  name: string;
  description: string;
}

interface ModernPolicyViolationsProps {
  complianceData: ComplianceInsight[];
}

const getStatusColor = (status: 'high' | 'medium' | 'low') => {
  switch (status) {
    case 'high':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'medium':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'low':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const ModernPolicyViolations: React.FC<ModernPolicyViolationsProps> = ({ complianceData }) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  
  const toggleItem = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };
  
  // Sort by impact (highest to lowest)
  const sortedData = [...complianceData].sort((a, b) => b.impact - a.impact);
  
  return (
    <div className="space-y-4">
      {sortedData.map((item) => (
        <motion.div 
          key={item.id}
          layout
          className="border border-gray-100 rounded-xl overflow-hidden bg-white"
        >
          <div 
            className="p-4 flex items-center justify-between cursor-pointer"
            onClick={() => toggleItem(item.id)}
          >
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full ${item.risk === 'high' ? 'bg-red-100' : item.risk === 'medium' ? 'bg-amber-100' : 'bg-blue-100'} flex items-center justify-center mr-3`}>
                <AlertTriangle className={`h-4 w-4 ${item.risk === 'high' ? 'text-red-600' : item.risk === 'medium' ? 'text-amber-600' : 'text-blue-600'}`} />
              </div>
              <div>
                <h4 className="text-sm font-medium">{item.name}</h4>
                <p className="text-xs text-gray-500">{item.count} occurrences</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={getStatusColor(item.risk as 'high' | 'medium' | 'low')}>
                {item.risk === 'high' ? 'High Risk' : item.risk === 'medium' ? 'Medium Risk' : 'Low Risk'}
              </Badge>
              {expandedItem === item.id ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </div>
          </div>
          
          <AnimatePresence>
            {expandedItem === item.id && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <Separator />
                <div className="p-4 bg-gray-50">
                  <p className="text-sm text-gray-700 mb-4">{item.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-500 mr-1.5" />
                        <span className="text-gray-600">Example Report:</span>
                      </div>
                      <span className="font-medium">TRP-{3000 + parseInt(item.id)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-500 mr-1.5" />
                        <span className="text-gray-600">Last Occurrence:</span>
                      </div>
                      <span className="font-medium">April 12, 2025</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default ModernPolicyViolations;
