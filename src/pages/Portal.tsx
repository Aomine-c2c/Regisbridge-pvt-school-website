import React from 'react';
import StudentPortal from '@/components/StudentPortal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const Portal: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <Header />
        <StudentPortal />
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default Portal;