'use client';

import { ModuleLayout } from '@/components/layouts/ModuleLayout';
import { 
  Link as LinkIcon,
  Plus,
  Clock,
  Target,
  CheckCircle,
  Award,
  Grid3X3,
  List,
  ArrowUpDown
} from 'lucide-react';

export default function Module5Page() {
  const sections = [
    { id: 'introduction', name: 'Linked Lists Intro', icon: LinkIcon },
    { id: 'operations', name: 'Basic Operations', icon: Plus },
    { id: 'types', name: 'List Types', icon: List },
    { id: 'advanced', name: 'Advanced Techniques', icon: ArrowUpDown }
  ];

  return (
    <ModuleLayout
      moduleId="module-4"
      moduleTitle="Module 4: Linked Lists"
      moduleDescription="Master dynamic data structures and pointer manipulation"
      sections={sections}
      estimatedTime="120 minutes"
      difficulty="Intermediate"
      totalSections={4}
    >
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-8 rounded-2xl">
          <div className="flex items-center space-x-4 mb-4">
            <LinkIcon className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Linked Lists</h1>
              <p className="text-orange-100 text-lg">Master dynamic data structures</p>
            </div>
          </div>
          <p className="text-orange-50">
            Learn how to work with dynamic data structures that grow and shrink at runtime.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Target className="w-7 h-7 mr-3 text-green-600" />
            What You&apos;ll Learn
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Dynamic Memory</h3>
                  <p className="text-gray-600 text-sm">Understanding pointers and dynamic allocation</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">List Operations</h3>
                  <p className="text-gray-600 text-sm">Insertion, deletion, and traversal techniques</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">List Variants</h3>
                  <p className="text-gray-600 text-sm">Singly, doubly, and circular linked lists</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Real Applications</h3>
                  <p className="text-gray-600 text-sm">Practical use cases in software development</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">4</div>
                <div className="text-green-100">Sections</div>
              </div>
              <Grid3X3 className="w-8 h-8 text-green-100" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">120</div>
                <div className="text-blue-100">Minutes</div>
              </div>
              <Clock className="w-8 h-8 text-blue-100" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold">Intermediate</div>
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