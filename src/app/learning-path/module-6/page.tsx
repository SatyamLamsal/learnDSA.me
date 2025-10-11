'use client';

import { StandardModulePage } from '@/components/layouts/StandardModulePage';
import { EnhancedSection } from '@/components/layouts/EnhancedModuleLayout';
import { 
  Network,
  MapPin,
  Route,
  GitBranch,
  ArrowRight,
  BookOpen,
  Code,
  Target,
  Zap
} from 'lucide-react';

export default function Module6Page() {
  const sections: EnhancedSection[] = [
    {
      id: 'fundamentals',
      name: 'Graph Fundamentals',
      icon: Network,
      href: '/learning-path/module-6/fundamentals',
      description: 'Graph terminology, representations, and basic concepts',
      duration: '45 min',
      difficulty: 'Intermediate',
      type: 'lesson'
    },
    {
      id: 'traversal',
      name: 'Graph Traversal',
      icon: MapPin,
      href: '/learning-path/module-6/traversal',
      description: 'DFS, BFS, and graph exploration algorithms',
      duration: '60 min',
      difficulty: 'Intermediate',
      type: 'lesson'
    },
    {
      id: 'shortest-paths',
      name: 'Shortest Paths',
      icon: Route,
      href: '/learning-path/module-6/shortest-paths',
      description: 'Dijkstra\'s, Bellman-Ford, and pathfinding',
      duration: '75 min',
      difficulty: 'Advanced',
      type: 'lesson'
    },
    {
      id: 'applications',
      name: 'Graph Applications',
      icon: GitBranch,
      href: '/learning-path/module-6/applications',
      description: 'Real-world graph problems and solutions',
      duration: '90 min',
      difficulty: 'Advanced',
      type: 'practice'
    }
  ];

  return (
    <StandardModulePage
      moduleId="module-6"
      moduleTitle="Module 6: Graph Theory & Algorithms"
      moduleDescription="Master graph structures and algorithms - the foundation of networks"
      moduleIcon={Network}
      sections={sections}
      estimatedTime="4.5 hours"
      difficulty="Advanced"
      prevModuleUrl="/learning-path/module-5"
      prevModuleTitle="Trees & Hierarchical Structures"
      nextModuleUrl="/learning-path/module-7"
      nextModuleTitle="Hash Tables & Hashing"
    >
      {/* Course Overview Content */}
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg border">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ArrowRight className="w-7 h-7 mr-3 text-indigo-600" />
            Graph Topics
          </h2>
          <div className="grid gap-6">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-all group cursor-pointer"
                onClick={() => section.href && (window.location.href = section.href)}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                    <section.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 group-hover:text-indigo-800">{section.name}</h3>
                    <p className="text-gray-600 text-sm">{section.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{section.duration}</div>
                    <div className={`text-xs px-2 py-1 rounded mt-1 ${
                      section.difficulty === 'Intermediate' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : section.difficulty === 'Advanced'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {section.difficulty}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Graph Overview */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-lg border border-indigo-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Network className="w-7 h-7 mr-3 text-indigo-600" />
            What You'll Learn
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <BookOpen className="w-6 h-6 text-indigo-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Graph Theory</h3>
                  <p className="text-gray-700 text-sm">Master vertices, edges, and graph representations.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Code className="w-6 h-6 text-indigo-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Algorithms</h3>
                  <p className="text-gray-700 text-sm">Implement DFS, BFS, and shortest path algorithms.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Target className="w-6 h-6 text-indigo-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Problem Solving</h3>
                  <p className="text-gray-700 text-sm">Solve complex graph problems and optimize solutions.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Zap className="w-6 h-6 text-indigo-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Applications</h3>
                  <p className="text-gray-700 text-sm">Apply graphs to networks, social media, and navigation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StandardModulePage>
  );
}