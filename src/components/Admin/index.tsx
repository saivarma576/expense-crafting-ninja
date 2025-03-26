
import React from 'react';
import { 
  Users, Settings, Shield, CreditCard, ArrowUpDown, 
  UploadCloud, FileText, Plus, Edit
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const AdminCard: React.FC<AdminCardProps> = ({ 
  title, 
  description, 
  icon,
  actions,
  className 
}) => {
  return (
    <div className={cn(
      "glass-card rounded-xl p-6 transition-all hover:shadow-card-hover",
      className
    )}>
      <div className="flex justify-between">
        <div className="flex items-start">
          <div className="p-3 rounded-md bg-muted mr-4">
            {icon}
          </div>
          <div>
            <h3 className="font-medium text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
      </div>
      {actions && (
        <div className="mt-4 pt-4 border-t flex space-x-2 justify-end">
          {actions}
        </div>
      )}
    </div>
  );
};

const Admin: React.FC = () => {
  const adminCards = [
    {
      title: 'User Management',
      description: 'Manage user accounts, roles, and permissions',
      icon: <Users className="h-6 w-6 text-blue-500" />,
      actions: (
        <button className="px-3 py-1.5 rounded-md text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
          Manage Users
        </button>
      )
    },
    {
      title: 'Approval Workflows',
      description: 'Configure expense approval rules and workflows',
      icon: <ArrowUpDown className="h-6 w-6 text-purple-500" />,
      actions: (
        <button className="px-3 py-1.5 rounded-md text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
          Edit Workflows
        </button>
      )
    },
    {
      title: 'Receipt Processing',
      description: 'Set up email scanning and OCR configuration',
      icon: <UploadCloud className="h-6 w-6 text-green-500" />,
      actions: (
        <button className="px-3 py-1.5 rounded-md text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
          Configure
        </button>
      )
    },
    {
      title: 'Payment Methods',
      description: 'Manage payment methods and reimbursement details',
      icon: <CreditCard className="h-6 w-6 text-red-500" />,
      actions: (
        <button className="px-3 py-1.5 rounded-md text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
          Manage Payments
        </button>
      )
    },
    {
      title: 'Security Settings',
      description: 'Configure security policies and authentication',
      icon: <Shield className="h-6 w-6 text-amber-500" />,
      actions: (
        <button className="px-3 py-1.5 rounded-md text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
          Security Settings
        </button>
      )
    },
    {
      title: 'Expense Categories',
      description: 'Customize expense types and categories',
      icon: <FileText className="h-6 w-6 text-indigo-500" />,
      actions: (
        <button className="px-3 py-1.5 rounded-md text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
          Edit Categories
        </button>
      )
    }
  ];
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Admin Panel</h1>
        <p className="text-muted-foreground">
          Manage your expense system settings and configurations
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {adminCards.map((card, i) => (
          <AdminCard
            key={i}
            title={card.title}
            description={card.description}
            icon={card.icon}
            actions={card.actions}
          />
        ))}
      </div>
      
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-lg font-medium mb-4">Email Receipt Processing Rules</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Configure how email receipts are processed and categorized
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border hover:border-primary/30 transition-all">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-blue-100 text-blue-700 mr-3">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Expense Receipt Inbox</h4>
                <p className="text-sm text-muted-foreground">
                  receipts@xpense.company.com
                </p>
              </div>
            </div>
            <button className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Edit className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg border hover:border-primary/30 transition-all">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-green-100 text-green-700 mr-3">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Subject Line Format</h4>
                <p className="text-sm text-muted-foreground">
                  Trip Name: [Name] - Expense: [Category]
                </p>
              </div>
            </div>
            <button className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Edit className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg border hover:border-primary/30 transition-all">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-purple-100 text-purple-700 mr-3">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.0004 5C7.52281 5 3.73253 7.94288 2.45825 12C3.73251 16.0571 7.52281 19 12.0005 19C16.4781 19 20.2684 16.0571 21.5426 12C20.2684 7.94291 16.4781 5 12.0004 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h4 className="font-medium">OCR Configuration</h4>
                <p className="text-sm text-muted-foreground">
                  Enhanced receipt scanning with vendor recognition
                </p>
              </div>
            </div>
            <button className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Edit className="h-4 w-4" />
            </button>
          </div>
          
          <button className="w-full mt-4 py-3 border-2 border-dashed border-muted rounded-lg hover:border-primary/30 transition-colors flex items-center justify-center text-muted-foreground hover:text-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Processing Rule
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
