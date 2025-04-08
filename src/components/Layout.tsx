
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { Toaster } from '@/components/ui/sonner';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-6 md:px-6 lg:px-8 animate-fade-in">
        <Suspense fallback={
          <div className="flex items-center justify-center h-[60vh]">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </div>
        }>
          <Outlet />
        </Suspense>
      </main>
      <Toaster position="top-right" closeButton richColors />
    </div>
  );
};

export default Layout;
