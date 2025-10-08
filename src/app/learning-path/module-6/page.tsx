'use client';

import { ModuleLayout } from '@/components/layouts/ModuleLayout';
import { 
  TreePine,
  Network,
  Search,
  RotateCcw,
  Clock,
  Target,
  CheckCircle,
  Award,
  Grid3X3
} from 'lucide-react';

export default function Module6Page() {
  const sections = [
    { id: 'basics', name: 'Tree Basics', icon: TreePine },
    { id: 'binary-trees', name: 'Binary Trees', icon: Network },
    { id: 'traversal', name: 'Tree Traversal', icon: Search },
    { id: 'applications', name: 'Applications', icon: RotateCcw }
  ];

  return (
    <ModuleLayout
      moduleId="module-6"
      moduleTitle="Module 6: Trees"
      moduleDescription="Master hierarchical data structures and tree algorithms"
      sections={sections}
      estimatedTime="150 minutes"
      difficulty="Advanced"
      totalSections={4}
    >
      <div className="space-y-8 text-gray-700">
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-8 rounded-2xl text-gray-700">
          <div className="flex items-center space-x-4 mb-4 text-gray-700">
            <TreePine className="w-12 h-12 text-gray-700" />
            <div>
              <h1 className="text-4xl font-bold text-slate-800">Trees</h1>
              <p className="text-emerald-100 text-lg">Master hierarchical data structures</p>
            </div>
          </div>
          <p className="text-emerald-50">
            Explore powerful hierarchical data structures used in databases, file systems, and more.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Target className="w-7 h-7 mr-3 text-green-600" />
            What You&apos;ll Master
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start space-x-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Tree Fundamentals</h3>
                  <p className="text-gray-600 text-sm">Nodes, edges, roots, leaves, and tree properties</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Binary Trees</h3>
                  <p className="text-gray-600 text-sm">Binary search trees, AVL trees, and balancing</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start space-x-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Tree Traversal</h3>
                  <p className="text-gray-600 text-sm">In-order, pre-order, post-order, and level-order</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Advanced Topics</h3>
                  <p className="text-gray-600 text-sm">Heaps, tries, and tree-based algorithms</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-gray-700">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl text-gray-700">
            <div className="flex items-center justify-between text-gray-700">
              <div>
                <div className="text-3xl font-bold text-gray-800">4</div>
                <div className="text-green-100">Sections</div>
              </div>
              <Grid3X3 className="w-8 h-8 text-green-100" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-xl text-gray-700">
            <div className="flex items-center justify-between text-gray-700">
              <div>
                <div className="text-3xl font-bold text-gray-800">150</div>
                <div className="text-blue-100">Minutes</div>
              </div>
              <Clock className="w-8 h-8 text-blue-100" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl text-gray-700">
            <div className="flex items-center justify-between text-gray-700">
              <div>
                <div className="text-xl font-bold text-gray-800">Advanced</div>
                <div className="text-purple-100">Level</div>
              </div>
              <Award className="w-8 h-8 text-purple-100" />
            </div>
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}