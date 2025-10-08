'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Github, 
  Twitter, 
  Mail, 
  Heart,
  BookOpen,
  Code,
  Users,
  Zap
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Data Structures', href: '/data-structures' },
    { name: 'Algorithms', href: '/algorithms' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const dataStructures = [
    { name: 'Arrays', href: '/data-structures/arrays' },
    { name: 'Linked Lists', href: '/data-structures/linked-lists' },
    { name: 'Stacks', href: '/data-structures/stacks' },
    { name: 'Queues', href: '/data-structures/queues' },
    { name: 'Trees', href: '/data-structures/trees' },
    { name: 'Graphs', href: '/data-structures/graphs' },
  ];

  const algorithms = [
    { name: 'Sorting', href: '/algorithms/sorting' },
    { name: 'Searching', href: '/algorithms/searching' },
    { name: 'Graph Algorithms', href: '/algorithms/graph' },
    { name: 'Dynamic Programming', href: '/algorithms/dynamic-programming' },
    { name: 'Greedy', href: '/algorithms/greedy' },
    { name: 'Divide & Conquer', href: '/algorithms/divide-and-conquer' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'DMCA', href: '/dmca' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8 text-gray-700">
          {/* Brand Section */}
          <div className="lg:col-span-2 text-gray-700">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-4 text-gray-700">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3 text-white">
                  <Code className="h-5 w-5 text-white text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-white text-gray-800">Learn DSA</h3>
              </div>
              <p className="text-gray-400 mb-4 max-w-sm" style={{ color: '#9ca3af' }}>
                Master Data Structures and Algorithms with interactive theory, 
                visualizations, and hands-on simulations. Build your coding skills 
                with comprehensive learning resources.
              </p>
              <div className="flex space-x-4 text-gray-700">
                <a
                  href="https://github.com/SatyamLamsal/learnDSA.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-blue-300"
                  aria-label="GitHub Repository"
                 style={{ color: '#ffffff' }}>
                  <Github className="h-5 w-5 text-gray-700" />
                </a>
                <a
                  href="https://twitter.com/learndsa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-blue-300"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5 text-gray-700" />
                </a>
                <a
                  href="mailto:contact@learndsa.me"
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-blue-300"
                  aria-label="Email Contact"
                >
                  <Mail className="h-5 w-5 text-gray-700" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-white font-semibold mb-4 flex items-center text-gray-800">
                <BookOpen className="h-4 w-4 mr-2 text-gray-700" />
                Quick Links
              </h4>
              <ul className="space-y-2 text-gray-400">
                {quickLinks.map((link) => (
                  <li key={link.name} style={{ color: '#ffffff' }}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors text-gray-700"
                      style={{ color: '#ffffff' }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Data Structures */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-white font-semibold mb-4 flex items-center text-gray-800">
                <Users className="h-4 w-4 mr-2 text-gray-700" />
                Data Structures
              </h4>
              <ul className="space-y-2 text-gray-700">
                {dataStructures.map((structure) => (
                  <li key={structure.name} style={{ color: '#ffffff' }}>
                    <Link
                      href={structure.href}
                      className="hover:text-white transition-colors text-sm text-gray-600"
                      style={{ color: '#ffffff' }}
                    >
                      {structure.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Algorithms */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-white font-semibold mb-4 flex items-center text-gray-800">
                <Zap className="h-4 w-4 mr-2 text-gray-700" />
                Algorithms
              </h4>
              <ul className="space-y-2 text-gray-700">
                {algorithms.map((algorithm) => (
                  <li key={algorithm.name} style={{ color: '#ffffff' }}>
                    <Link
                      href={algorithm.href}
                      className="hover:text-white transition-colors text-sm text-gray-600"
                      style={{ color: '#ffffff' }}
                    >
                      {algorithm.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Features Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-6 mb-8 border border-blue-800/30 text-gray-100"
        >
          <div className="grid md:grid-cols-3 gap-6 text-center text-gray-700">
            <div>
              <BookOpen className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h5 className="text-white font-semibold mb-1 text-gray-800">Interactive Theory</h5>
              <p className="text-gray-400 text-sm">
                Comprehensive explanations with examples
              </p>
            </div>
            <div>
              <Code className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <h5 className="text-white font-semibold mb-1 text-gray-800">Visual Learning</h5>
              <p className="text-gray-400 text-sm">
                Dynamic visualizations and animations
              </p>
            </div>
            <div>
              <Zap className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h5 className="text-white font-semibold mb-1 text-gray-800">Hands-on Practice</h5>
              <p className="text-gray-400 text-sm">
                Interactive simulations and exercises
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-8 border-t border-gray-800 text-gray-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-gray-700">
            {/* Copyright */}
            <div className="flex items-center text-sm text-gray-400">
              <span>© {currentYear} Learn DSA. All rights reserved.</span>
              <Heart className="h-4 w-4 text-red-500 mx-2" />
              <span>Made with passion for learning</span>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm text-gray-600">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 pt-4 border-t border-gray-400 text-xs text-gray-400 text-center" style={{ color: '#ffffff' }}>
            <p>
              Learn DSA is an educational platform designed to help students and professionals 
              master data structures and algorithms. All content is provided for educational 
              purposes only. We are not affiliated with any specific company or institution.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;