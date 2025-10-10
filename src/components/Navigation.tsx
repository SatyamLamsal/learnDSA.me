'use client';

import Link from 'next/link';
import { TabletNavigation } from '@/components/navigation/TabletNavigation';

const Navigation = () => {

  return (
        <nav className="bg-slate-900 text-white shadow-lg text-gray-100 relative">
      <div className="container mx-auto px-4 text-gray-100">
        <div className="flex justify-between items-center py-4 text-gray-100 relative">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity text-gray-100">
            <span 
              className="text-2xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors"
              style={{ fontFamily: '"Script MT Bold", cursive, serif' }}
            >
              Learn DSA
            </span>
          </Link>
          
          {/* All Navigation - Using new TabletNavigation component */}
          <div className="relative">
            <TabletNavigation className="text-gray-100" />
          </div>
        </div>


      </div>
    </nav>
  );
};

export default Navigation;