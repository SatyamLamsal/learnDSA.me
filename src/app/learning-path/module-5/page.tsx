'use client';

import { ModuleLayout } from '@/components/layouts/ModuleLayout';
import { 
  ArrowUpDown,
  Layers,
  Users,
  Zap
} from 'lucide-react';

export default function Module5Page() {
  const sections = [
    { id: 'stacks', name: 'Stacks (LIFO)', icon: ArrowUpDown },
    { id: 'queues', name: 'Queues (FIFO)', icon: Layers },
    { id: 'applications', name: 'Applications', icon: Users },
    { id: 'advanced', name: 'Advanced Topics', icon: Zap }
  ];

  return (
    <ModuleLayout
      moduleId="module-5"
      moduleTitle="Module 5: Stacks & Queues"
      moduleDescription="Master LIFO and FIFO data structures"
      sections={sections}
      estimatedTime="120 minutes"
      difficulty="Intermediate"
      totalSections={4}
    >
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-2xl">
          <div className="flex items-center space-x-4 mb-4">
            <ArrowUpDown className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Stacks & Queues</h1>
              <p className="text-purple-100 text-lg">Master LIFO and FIFO data structures</p>
            </div>
          </div>
          <p className="text-purple-50">
            Learn fundamental linear data structures with restricted access patterns.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Users className="w-7 h-7 mr-3 text-green-600" />
            What You&apos;ll Master
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <ArrowUpDown className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Stack Operations</h3>
                  <p className="text-gray-600 text-sm">Push, pop, and peek operations with LIFO principle</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Layers className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Queue Operations</h3>
                  <p className="text-gray-600 text-sm">Enqueue and dequeue with FIFO principle</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Users className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Real Applications</h3>
                  <p className="text-gray-600 text-sm">Function calls, expression evaluation, and scheduling</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Zap className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Implementation</h3>
                  <p className="text-gray-600 text-sm">Array and linked list based implementations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}