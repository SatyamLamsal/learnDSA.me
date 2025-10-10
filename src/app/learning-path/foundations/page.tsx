'use client';

import { StandardModulePage } from '@/components/layouts/StandardModulePage';
import { EnhancedSection } from '@/components/layouts/EnhancedModuleLayout';
import { 
  BookOpen,
  Database,
  Code,
  BarChart3,
  Brain,
  ArrowRight
} from 'lucide-react';

export default function FoundationsPage() {
  const sections: EnhancedSection[] = [
    { 
      id: 'introduction', 
      name: 'Introduction to DSA', 
      icon: BookOpen,
      href: '/learning-path/foundations/introduction',
      description: 'Why are data structures and algorithms important?',
      duration: '10 min',
      difficulty: 'Beginner',
      type: 'lesson'
    },
    { 
      id: 'data-structures', 
      name: 'Data Structures', 
      icon: Database,
      href: '/learning-path/foundations/data-structures',
      description: 'How data is organized and stored in computer memory',
      duration: '15 min',
      difficulty: 'Beginner',
      type: 'lesson'
    },
    { 
      id: 'algorithms', 
      name: 'Algorithms', 
      icon: Code,
      href: '/learning-path/foundations/algorithms',
      description: 'Step-by-step procedures for solving problems',
      duration: '20 min',
      difficulty: 'Beginner',
      type: 'lesson'
    },
    { 
      id: 'complexity', 
      name: 'Complexity Analysis', 
      icon: BarChart3,
      href: '/learning-path/foundations/complexity',
      description: 'Time and space complexity, Big O notation',
      duration: '25 min',
      difficulty: 'Intermediate',
      type: 'lesson'
    },
    { 
      id: 'adt', 
      name: 'Abstract Data Types', 
      icon: Brain,
      href: '/learning-path/foundations/adt',
      description: 'Mathematical models for data types',
      duration: '20 min',
      difficulty: 'Intermediate',
      type: 'lesson'
    }
  ];

  return (
    <StandardModulePage
      moduleId="foundations"
      moduleTitle="Foundations of DSA"
      moduleDescription="Build your algorithmic thinking foundation"
      moduleIcon={Brain}
      sections={sections}
      estimatedTime="90 minutes"
      difficulty="Beginner"
      nextModuleUrl="/learning-path/module-1"
      nextModuleTitle="Memory & Efficiency"
    >
      {/* Course Overview Content */}
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg border">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ArrowRight className="w-7 h-7 mr-3 text-blue-600" />
            Foundation Topics
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
                      section.difficulty === 'Beginner' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
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