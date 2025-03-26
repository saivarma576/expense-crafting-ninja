
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  LayoutDashboard, 
  FileText, 
  ReceiptText, 
  BarChart4, 
  Settings, 
  Menu, 
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Expenses', path: '/expenses', icon: FileText },
  { name: 'Receipts', path: '/receipts', icon: ReceiptText },
  { name: 'Reports', path: '/reports', icon: BarChart4 },
  { name: 'Admin', path: '/admin', icon: Settings }
];

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when navigating
  const handleNavigation = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground font-bold text-xl">X</div>
              <span className="font-medium text-xl hidden md:inline-block">Xpense</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="ml-6 hidden md:flex items-center space-x-1 flex-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavigation}
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors hover:text-primary relative py-2 px-3 rounded-md",
                    isActive ? "text-primary bg-primary/10" : "text-foreground/70"
                  )}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="flex items-center space-x-3 ml-auto md:ml-0">
            <button className="hidden md:flex items-center justify-center rounded-full p-1.5">
              <span className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full">
                <span className="flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground">
                  JD
                </span>
              </span>
              <span className="ml-2 text-sm font-medium hidden lg:block">John Doe</span>
              <ChevronDown className="ml-1 h-4 w-4 text-muted-foreground hidden lg:block" />
            </button>

            {/* Mobile menu toggle */}
            <button 
              className="md:hidden flex items-center justify-center h-10 w-10 rounded-md" 
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <div className="md:hidden h-[calc(100vh-4rem)] bg-background/95 backdrop-blur-md animate-fade-in">
          <div className="container px-4 py-6 space-y-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavigation}
                  className={cn(
                    "flex items-center py-3 px-2 text-base font-medium rounded-md transition-colors",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-foreground/70 hover:text-foreground hover:bg-accent"
                  )}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
