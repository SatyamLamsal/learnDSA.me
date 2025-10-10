'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Map, 
  BookOpen, 
  Play, 
  ChevronDown,
  User,
  Menu,
  X,
  Database,
  Code,
  Search,
  Bookmark
} from 'lucide-react';
import { SignInButton } from '@/components/auth/SignInButton';

interface TabletNavigationProps {
  className?: string;
}

export const TabletNavigation: React.FC<TabletNavigationProps> = ({ className }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Close mobile menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isMobileMenuOpen]);

  // Based on research from Khan Academy, Coursera, and GitHub
  const dataStructures = [
    { name: 'Arrays', path: '/data-structures/arrays' },
    { name: 'Linked Lists', path: '/data-structures/linked-lists' },
    { name: 'Stacks', path: '/data-structures/stacks' },
    { name: 'Queues', path: '/data-structures/queues' },
    { name: 'Trees', path: '/data-structures/trees' },
    { name: 'Graphs', path: '/data-structures/graphs' },
    { name: 'Hash Tables', path: '/data-structures/hash-tables' },
  ];

  const algorithms = [
    { name: 'Sorting', path: '/algorithms/sorting' },
    { name: 'Searching', path: '/algorithms/searching' },
    { name: 'Dynamic Programming', path: '/algorithms/dynamic-programming' },
    { name: 'Divide & Conquer', path: '/algorithms/divide-and-conquer' },
    { name: 'Greedy', path: '/algorithms/greedy' },
    { name: 'Graph Algorithms', path: '/algorithms/graph' },
  ];

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      {/* Desktop Navigation (1024px+) */}
      <div className={`hidden lg:flex items-center space-x-8 ${className}`}>
        <Link 
          href="/" 
          className="flex items-center space-x-2 text-gray-100 hover:text-blue-400 transition-colors"
          onClick={closeDropdowns}
        >
          <Home size={18} />
          <span>Home</span>
        </Link>
        
        <Link 
          href="/learning-path" 
          className="flex items-center space-x-2 text-gray-100 hover:text-blue-400 transition-colors"
          onClick={closeDropdowns}
        >
          <Map size={18} />
          <span>Learning Path</span>
        </Link>
        
        {/* Data Structures Dropdown */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('data-structures')}
            className="flex items-center space-x-2 text-gray-100 hover:text-blue-400 transition-colors"
          >
            <Database size={18} />
            <span>Data Structures</span>
            <ChevronDown size={16} className={`transition-transform ${activeDropdown === 'data-structures' ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {activeDropdown === 'data-structures' && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 w-56 bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-2 z-50"
              >
                {dataStructures.map((ds) => (
                  <Link
                    key={ds.path}
                    href={ds.path}
                    onClick={closeDropdowns}
                    className="block px-4 py-2 text-gray-100 hover:bg-slate-700 transition-colors text-sm"
                  >
                    {ds.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Algorithms Dropdown */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('algorithms')}
            className="flex items-center space-x-2 text-gray-100 hover:text-blue-400 transition-colors"
          >
            <Code size={18} />
            <span>Algorithms</span>
            <ChevronDown size={16} className={`transition-transform ${activeDropdown === 'algorithms' ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {activeDropdown === 'algorithms' && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 w-56 bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-2 z-50"
              >
                {algorithms.map((alg) => (
                  <Link
                    key={alg.path}
                    href={alg.path}
                    onClick={closeDropdowns}
                    className="block px-4 py-2 text-gray-100 hover:bg-slate-700 transition-colors text-sm"
                  >
                    {alg.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <SignInButton />
      </div>

      {/* Tablet Navigation (768px - 1023px) - Inspired by Khan Academy's approach */}
      <div className="hidden md:flex lg:hidden items-center space-x-3">
        {/* Icon-only navigation with tooltips */}
        <div className="flex items-center space-x-1 bg-slate-700/30 rounded-lg p-1">
          <Link 
            href="/" 
            className="p-2 text-gray-100 hover:text-blue-400 hover:bg-slate-600/50 rounded-md transition-colors relative group"
            title="Home"
          >
            <Home size={18} />
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Home
            </div>
          </Link>
          
          <Link 
            href="/learning-path" 
            className="p-2 text-gray-100 hover:text-blue-400 hover:bg-slate-600/50 rounded-md transition-colors relative group"
            title="Learning Path"
          >
            <Map size={18} />
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Learning Path
            </div>
          </Link>
          
          {/* Compact Data Structures */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown('tablet-ds')}
              className="p-2 text-gray-100 hover:text-blue-400 hover:bg-slate-600/50 rounded-md transition-colors relative group"
              title="Data Structures"
            >
              <Database size={18} />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Data Structures
              </div>
            </button>
            
            <AnimatePresence>
              {activeDropdown === 'tablet-ds' && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-2 z-50"
                >
                  <div className="px-3 py-1 text-xs font-semibold text-gray-400 border-b border-slate-700 mb-1">
                    Data Structures
                  </div>
                  {dataStructures.slice(0, 5).map((ds) => (
                    <Link
                      key={ds.path}
                      href={ds.path}
                      onClick={closeDropdowns}
                      className="block px-3 py-2 text-gray-100 hover:bg-slate-700 transition-colors text-sm"
                    >
                      {ds.name}
                    </Link>
                  ))}
                  <Link
                    href="/data-structures"
                    onClick={closeDropdowns}
                    className="block px-3 py-1 text-blue-400 hover:bg-slate-700 transition-colors text-xs border-t border-slate-700 mt-1"
                  >
                    View All →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Compact Algorithms */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown('tablet-alg')}
              className="p-2 text-gray-100 hover:text-blue-400 hover:bg-slate-600/50 rounded-md transition-colors relative group"
              title="Algorithms"
            >
              <Code size={18} />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                Algorithms
              </div>
            </button>
            
            <AnimatePresence>
              {activeDropdown === 'tablet-alg' && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-2 z-50"
                >
                  <div className="px-3 py-1 text-xs font-semibold text-gray-400 border-b border-slate-700 mb-1">
                    Algorithms
                  </div>
                  {algorithms.slice(0, 4).map((alg) => (
                    <Link
                      key={alg.path}
                      href={alg.path}
                      onClick={closeDropdowns}
                      className="block px-3 py-2 text-gray-100 hover:bg-slate-700 transition-colors text-sm"
                    >
                      {alg.name}
                    </Link>
                  ))}
                  <Link
                    href="/algorithms"
                    onClick={closeDropdowns}
                    className="block px-3 py-1 text-blue-400 hover:bg-slate-700 transition-colors text-xs border-t border-slate-700 mt-1"
                  >
                    View All →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Quick access buttons - Following Coursera's pattern */}
        <div className="flex items-center space-x-2 ml-4">
          <Link 
            href="/bookmarks" 
            className="p-2 text-gray-100 hover:text-blue-400 hover:bg-slate-600/30 rounded-md transition-colors"
            title="Bookmarks"
          >
            <Bookmark size={16} />
          </Link>
          
          <SignInButton className="w-8 h-8" />
        </div>
      </div>

      {/* Mobile Navigation (< 768px) */}
      <div className="md:hidden flex items-center space-x-3">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-100 hover:text-blue-400 transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <SignInButton className="w-8 h-8" />
      </div>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed left-0 right-0 top-[72px] bg-slate-800 border-t border-slate-700 shadow-xl z-50 min-h-[200px]"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
          >
            <div className="p-4 space-y-3 w-full">
              <Link 
                href="/" 
                className="flex items-center space-x-3 text-gray-100 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-slate-700 w-full"
                onClick={closeMobileMenu}
              >
                <Home size={20} />
                <span>Home</span>
              </Link>
              
              <Link 
                href="/learning-path" 
                className="flex items-center space-x-3 text-gray-100 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-slate-700 w-full"
                onClick={closeMobileMenu}
              >
                <Map size={20} />
                <span>Learning Path</span>
              </Link>
              
              {/* Data Structures with expandable submenu */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Link 
                    href="/data-structures" 
                    className="flex items-center space-x-3 text-gray-100 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-slate-700 flex-1"
                    onClick={closeMobileMenu}
                  >
                    <Database size={20} />
                    <span>Data Structures</span>
                  </Link>
                  <button
                    onClick={() => toggleDropdown('mobile-ds')}
                    className="p-2 text-gray-100 hover:text-blue-400 transition-colors"
                  >
                    <ChevronDown size={16} className={`transition-transform ${activeDropdown === 'mobile-ds' ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                
                <AnimatePresence>
                  {activeDropdown === 'mobile-ds' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-6 space-y-1"
                    >
                      {dataStructures.map((ds) => (
                        <Link
                          key={ds.path}
                          href={ds.path}
                          className="block text-gray-300 hover:text-blue-400 transition-colors p-2 rounded text-sm"
                          onClick={closeMobileMenu}
                        >
                          {ds.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Algorithms with expandable submenu */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Link 
                    href="/algorithms" 
                    className="flex items-center space-x-3 text-gray-100 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-slate-700 flex-1"
                    onClick={closeMobileMenu}
                  >
                    <Code size={20} />
                    <span>Algorithms</span>
                  </Link>
                  <button
                    onClick={() => toggleDropdown('mobile-alg')}
                    className="p-2 text-gray-100 hover:text-blue-400 transition-colors"
                  >
                    <ChevronDown size={16} className={`transition-transform ${activeDropdown === 'mobile-alg' ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                
                <AnimatePresence>
                  {activeDropdown === 'mobile-alg' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-6 space-y-1"
                    >
                      {algorithms.map((alg) => (
                        <Link
                          key={alg.path}
                          href={alg.path}
                          className="block text-gray-300 hover:text-blue-400 transition-colors p-2 rounded text-sm"
                          onClick={closeMobileMenu}
                        >
                          {alg.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <Link 
                href="/bookmarks" 
                className="flex items-center space-x-3 text-gray-100 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-slate-700 w-full"
                onClick={closeMobileMenu}
              >
                <Bookmark size={20} />
                <span>Bookmarks</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};