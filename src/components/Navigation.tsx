'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Home, BookOpen, Play } from 'lucide-react';
import { SignInButton } from '@/components/auth/SignInButton';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dataStructures = [
    { name: 'Arrays', path: '/data-structures/arrays' },
    { name: 'Linked Lists', path: '/data-structures/linked-lists' },
    { name: 'Stacks', path: '/data-structures/stacks' },
    { name: 'Queues', path: '/data-structures/queues' },
    { name: 'Trees', path: '/data-structures/trees' },
    { name: 'Graphs', path: '/data-structures/graphs' },
    { name: 'Hash Tables', path: '/data-structures/hash-tables' },
  ];

  return (
        <nav className="bg-slate-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
            Learn DSA
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
              <Home size={18} />
              <span>Home</span>
            </Link>
            
            <div className="relative group">
              <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                <BookOpen size={18} />
                <span>Data Structures</span>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  {dataStructures.map((ds) => (
                    <Link
                      key={ds.path}
                      href={ds.path}
                      className="block px-4 py-2 rounded hover:bg-slate-700 transition-colors"
                    >
                      {ds.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <Link href="/algorithms" className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
              <Play size={18} />
              <span>Algorithms</span>
            </Link>
            
            <SignInButton />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-slate-800 rounded-lg mb-4 p-4">
            <Link href="/" className="block py-2 hover:text-blue-400 transition-colors">
              Home
            </Link>
            <div className="py-2">
              <span className="text-gray-100 font-semibold">Data Structures</span>
              {dataStructures.map((ds) => (
                <Link
                  key={ds.path}
                  href={ds.path}
                  className="block py-1 pl-4 hover:text-blue-400 transition-colors"
                >
                  {ds.name}
                </Link>
              ))}
            </div>
            <Link href="/algorithms" className="block py-2 hover:text-blue-400 transition-colors">
              Algorithms
            </Link>
            <div className="pt-4 border-t border-slate-700">
              <SignInButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;