
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { Toaster } from '@/components/ui/sonner';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-6 md:px-6 lg:px-8 animate-fade-in">
        <Outlet />
      </main>
      <Toaster position="top-right" closeButton richColors />
    </div>
  );
};

export default Layout;
