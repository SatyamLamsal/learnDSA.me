'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, BookOpen, Play, Home, ArrowLeft, Code } from 'lucide-react';
import { useDataStructureColor, useAlgorithmColor } from '@/contexts/ThemeContext';

interface NavigationItem {
  name: string;
  path: string;
  type: 'theory' | 'simulation' | 'pseudocode';
}

interface Section {
  name: string;
  path: string;
  items: NavigationItem[];
  color?: string;
}

export interface PageNavigationProps {
  currentSection: 'data-structures' | 'algorithms';
  currentTopic: string;
  currentPage?: 'theory' | 'simulation' | 'overview';
  sections: Section[];
  backPath?: string;
  nextPath?: string;
  backLabel?: string;
  nextLabel?: string;
}

const PageNavigation: React.FC<PageNavigationProps> = ({
  currentSection,
  currentTopic,
  currentPage = 'overview',
  sections,
  backPath,
  nextPath,
  backLabel = 'Previous',
  nextLabel = 'Next',
}) => {
  const pathname = usePathname();
  
  // Get all necessary colors at the component level (not in a function)
  const arraysColor = useDataStructureColor('arrays');
  const linkedListsColor = useDataStructureColor('linkedLists');
  const stacksColor = useDataStructureColor('stacks');
  const queuesColor = useDataStructureColor('queues');
  const treesColor = useDataStructureColor('trees');
  const graphsColor = useDataStructureColor('graphs');
  const hashTablesColor = useDataStructureColor('hashTables');
  
  const sortingColor = useAlgorithmColor('sorting');
  const searchingColor = useAlgorithmColor('searching');
  const graphAlgoColor = useAlgorithmColor('graph');
  const dynamicProgrammingColor = useAlgorithmColor('dynamicProgramming');
  const greedyColor = useAlgorithmColor('greedy');
  const divideAndConquerColor = useAlgorithmColor('divideAndConquer');
  
  // Find current section and topic
  const currentSectionData = sections.find(section => 
    section.path.includes(currentTopic)
  );

  // Get topic-specific color using the pre-fetched colors
  const getTopicColor = (topic: string) => {
    if (currentSection === 'data-structures') {
      switch (topic) {
        case 'arrays': return arraysColor;
        case 'linked-lists': return linkedListsColor;
        case 'stacks': return stacksColor;
        case 'queues': return queuesColor;
        case 'trees': return treesColor;
        case 'graphs': return graphsColor;
        case 'hash-tables': return hashTablesColor;
        default: return '#3b82f6';
      }
    } else {
      switch (topic) {
        case 'sorting': return sortingColor;
        case 'searching': return searchingColor;
        case 'graph': return graphAlgoColor;
        case 'dynamic-programming': return dynamicProgrammingColor;
        case 'greedy': return greedyColor;
        case 'divide-and-conquer': return divideAndConquerColor;
        default: return '#3b82f6';
      }
    }
  };

  const topicColor = getTopicColor(currentTopic);

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center py-3 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-700 flex items-center">
            <Home className="h-4 w-4 mr-1" />
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <Link 
            href={`/${currentSection}`} 
            className="text-gray-500 hover:text-gray-700 capitalize"
          >
            {currentSection.replace('-', ' ')}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <Link 
            href={`/${currentSection}/${currentTopic}`} 
            className="text-gray-700 font-medium capitalize"
            style={{ color: topicColor }}
          >
            {currentTopic.replace('-', ' ')}
          </Link>
          {currentPage !== 'overview' && (
            <>
              <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
              <span className="text-gray-700 capitalize">{currentPage}</span>
            </>
          )}
        </div>

        {/* Topic Navigation */}
        {currentSectionData && (
          <div className="flex items-center justify-between py-3 border-t border-gray-100">
            <div className="flex items-center space-x-6">
              <Link
                href={currentSectionData.path}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 'overview'
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                style={{
                  backgroundColor: currentPage === 'overview' ? topicColor : undefined,
                }}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Overview
              </Link>

              {currentSectionData.items.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    pathname === item.path
                      ? 'text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  style={{
                    backgroundColor: pathname === item.path ? topicColor : undefined,
                  }}
                >
                  {item.type === 'theory' && <BookOpen className="h-4 w-4 mr-2" />}
                  {item.type === 'simulation' && <Play className="h-4 w-4 mr-2" />}
                  {item.type === 'pseudocode' && <Code className="h-4 w-4 mr-2" />}
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Previous/Next Navigation */}
            <div className="flex items-center space-x-3">
              {backPath && (
                <Link
                  href={backPath}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  {backLabel}
                </Link>
              )}
              {nextPath && (
                <Link
                  href={nextPath}
                  className="flex items-center px-4 py-2 text-white rounded-lg transition-colors hover:opacity-90"
                  style={{ backgroundColor: topicColor }}
                >
                  {nextLabel}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Predefined sections for data structures
export const dataStructureSections: Section[] = [
  {
    name: 'Arrays',
    path: '/data-structures/arrays',
    items: [
      { name: 'Theory', path: '/data-structures/arrays/theory', type: 'theory' },
      { name: 'Simulation', path: '/data-structures/arrays/simulation', type: 'simulation' },
      { name: 'Pseudocode', path: '/data-structures/arrays/pseudocode', type: 'pseudocode' },
    ],
  },
  {
    name: 'Linked Lists',
    path: '/data-structures/linked-lists',
    items: [
      { name: 'Theory', path: '/data-structures/linked-lists/theory', type: 'theory' },
      { name: 'Simulation', path: '/data-structures/linked-lists/simulation', type: 'simulation' },
      { name: 'Pseudocode', path: '/data-structures/linked-lists/pseudocode', type: 'pseudocode' },
    ],
  },
  {
    name: 'Stacks',
    path: '/data-structures/stacks',
    items: [
      { name: 'Theory', path: '/data-structures/stacks/theory', type: 'theory' },
      { name: 'Simulation', path: '/data-structures/stacks/simulation', type: 'simulation' },
      { name: 'Pseudocode', path: '/data-structures/stacks/pseudocode', type: 'pseudocode' },
    ],
  },
  {
    name: 'Queues',
    path: '/data-structures/queues',
    items: [
      { name: 'Theory', path: '/data-structures/queues/theory', type: 'theory' },
      { name: 'Simulation', path: '/data-structures/queues/simulation', type: 'simulation' },
      { name: 'Pseudocode', path: '/data-structures/queues/pseudocode', type: 'pseudocode' },
    ],
  },
  {
    name: 'Trees',
    path: '/data-structures/trees',
    items: [
      { name: 'Theory', path: '/data-structures/trees/theory', type: 'theory' },
      { name: 'Simulation', path: '/data-structures/trees/simulation', type: 'simulation' },
      { name: 'Pseudocode', path: '/data-structures/trees/pseudocode', type: 'pseudocode' },
    ],
  },
  {
    name: 'Graphs',
    path: '/data-structures/graphs',
    items: [
      { name: 'Theory', path: '/data-structures/graphs/theory', type: 'theory' },
      { name: 'Simulation', path: '/data-structures/graphs/simulation', type: 'simulation' },
      { name: 'Pseudocode', path: '/data-structures/graphs/pseudocode', type: 'pseudocode' },
    ],
  },
  {
    name: 'Hash Tables',
    path: '/data-structures/hash-tables',
    items: [
      { name: 'Theory', path: '/data-structures/hash-tables/theory', type: 'theory' },
      { name: 'Simulation', path: '/data-structures/hash-tables/simulation', type: 'simulation' },
      { name: 'Pseudocode', path: '/data-structures/hash-tables/pseudocode', type: 'pseudocode' },
    ],
  },
];

// Predefined sections for algorithms
export const algorithmSections: Section[] = [
  {
    name: 'Sorting',
    path: '/algorithms/sorting',
    items: [
      { name: 'Theory', path: '/algorithms/sorting/theory', type: 'theory' },
      { name: 'Visualizer', path: '/algorithms/sorting/visualizer', type: 'simulation' },
    ],
  },
  {
    name: 'Searching',
    path: '/algorithms/searching',
    items: [
      { name: 'Theory', path: '/algorithms/searching/theory', type: 'theory' },
      { name: 'Visualizer', path: '/algorithms/searching/visualizer', type: 'simulation' },
    ],
  },
  {
    name: 'Graph Algorithms',
    path: '/algorithms/graph',
    items: [
      { name: 'Theory', path: '/algorithms/graph/theory', type: 'theory' },
      { name: 'Simulation', path: '/algorithms/graph/simulation', type: 'simulation' },
    ],
  },
  {
    name: 'Dynamic Programming',
    path: '/algorithms/dynamic-programming',
    items: [
      { name: 'Theory', path: '/algorithms/dynamic-programming/theory', type: 'theory' },
      { name: 'Simulation', path: '/algorithms/dynamic-programming/simulation', type: 'simulation' },
    ],
  },
  {
    name: 'Greedy Algorithms',
    path: '/algorithms/greedy',
    items: [
      { name: 'Theory', path: '/algorithms/greedy/theory', type: 'theory' },
      { name: 'Simulation', path: '/algorithms/greedy/simulation', type: 'simulation' },
    ],
  },
  {
    name: 'Divide and Conquer',
    path: '/algorithms/divide-and-conquer',
    items: [
      { name: 'Theory', path: '/algorithms/divide-and-conquer/theory', type: 'theory' },
      { name: 'Simulation', path: '/algorithms/divide-and-conquer/simulation', type: 'simulation' },
    ],
  },
];

export default PageNavigation;