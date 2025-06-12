
import React from 'react';
import { Card } from '@/components/ui/card';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  title?: string;
}

const Layout = ({ children, showHeader = true, title }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-50 via-background to-forest-100">
      {showHeader && (
        <header className="bg-white/80 backdrop-blur-md border-b border-forest-200 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-forest-500 to-forest-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🌿</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-forest-800">Verde Vigilante</h1>
                  {title && <p className="text-sm text-forest-600">{title}</p>}
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
      
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
