'use client';

import { StandardModulePage } from '@/components/layouts/StandardModulePage';
import { EnhancedSection } from '@/components/layouts/EnhancedModuleLayout';
import { 
  Package,
  ArrowUp,
  ArrowDown,
  Target,
  RotateCcw,
  Settings,
  Code,
  Brain,
  ArrowRight
} from 'lucide-react';

export default function Module3Page() {
  const sections: EnhancedSection[] = [
    {
      id: 'stack-fundamentals',
      name: 'Stack Fundamentals',
      icon: Package,
      href: '/learning-path/module-3/stack-fundamentals',
      description: 'Learn LIFO principle and stack concepts',
      duration: '20 min',
      difficulty: 'Intermediate',
      type: 'lesson'
    },
    {
      id: 'stack-operations',
      name: 'Stack Operations',
      icon: ArrowUp,
      href: '/learning-path/module-3/stack-operations',
      description: 'Master push, pop, peek, and helper operations',
      duration: '25 min',
      difficulty: 'Intermediate',
      type: 'lesson'
    },
    {
      id: 'stack-applications',
      name: 'Stack Applications',
      icon: Brain,
      href: '/learning-path/module-3/stack-applications',
      description: 'Function calls, expression evaluation, and more',
      duration: '30 min',
      difficulty: 'Intermediate',
      type: 'practice'
    },
    {
      id: 'queue-fundamentals',
      name: 'Queue Fundamentals',
      icon: RotateCcw,
      href: '/learning-path/module-3/queue-fundamentals',
      description: 'Learn FIFO principle and queue concepts',
      duration: '20 min',
      difficulty: 'Intermediate',
      type: 'lesson'
    },
    {
      id: 'queue-types',
      name: 'Queue Types',
      icon: Settings,
      href: '/learning-path/module-3/queue-types',
      description: 'Circular, priority, and deque implementations',
      duration: '25 min',
      difficulty: 'Intermediate',
      type: 'lesson'
    },
    {
      id: 'queue-applications',
      name: 'Queue Applications',
      icon: Target,
      href: '/learning-path/module-3/queue-applications',
      description: 'BFS, task scheduling, and buffer management',
      duration: '30 min',
      difficulty: 'Intermediate',
      type: 'practice'
    },
    {
      id: 'comparison',
      name: 'Stacks vs Queues',
      icon: Code,
      href: '/learning-path/module-3/comparison',
      description: 'Compare characteristics and use cases',
      duration: '15 min',
      difficulty: 'Intermediate',
      type: 'lesson'
    },
    {
      id: 'practice-problems',
      name: 'Practice Problems',
      icon: Brain,
      href: '/learning-path/module-3/practice-problems',
      description: 'Solve real-world stack and queue problems',
      duration: '45 min',
      difficulty: 'Advanced',
      type: 'practice'
    }
  ];

  return (
    <StandardModulePage
      moduleId="module-3"
      moduleTitle="Module 3: Stacks & Queues"
      moduleDescription="Master LIFO and FIFO data structures with practical applications and advanced implementations."
      moduleIcon={Package}
      sections={sections}
      estimatedTime="3.5 hours"
      difficulty="Intermediate"
      prevModuleUrl="/learning-path/module-2"
      prevModuleTitle="Arrays & Memory Fundamentals"
      nextModuleUrl="/learning-path/module-4"
      nextModuleTitle="Linked Lists & Pointers"
    >
      {/* Course Overview Content */}
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg border">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ArrowRight className="w-7 h-7 mr-3 text-blue-600" />
            Stacks & Queues Topics
          </h2>
          <div className="grid gap-6">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group cursor-pointer"
                onClick={() => section.href && (window.location.href = section.href)}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <section.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-800">{section.name}</h3>
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
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StandardModulePage>
  );
}