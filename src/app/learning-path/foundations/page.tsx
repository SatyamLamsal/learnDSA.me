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

  const sectionDetails = [
    {
      id: 'introduction',
      title: 'Introduction to DSA',
      description: 'What are data structures and algorithms? Why are they important?',
      icon: BookOpen,
      href: '/learning-path/foundations/introduction',
      difficulty: 'Beginner' as const,
      timeEstimate: '10 min'
    },
    {
      id: 'data-structures',
      title: 'Data Structures',
      description: 'Understanding how data is organized and stored in computer memory',
      icon: Database,
      href: '/learning-path/foundations/data-structures',
      difficulty: 'Beginner' as const,
      timeEstimate: '15 min'
    },
    {
      id: 'algorithms',
      title: 'Algorithms',
      description: 'Step-by-step procedures for solving computational problems',
      icon: Code,
      href: '/learning-path/foundations/algorithms',
      difficulty: 'Beginner' as const,
      timeEstimate: '20 min'
    },
    {
      id: 'complexity',
      title: 'Complexity Analysis',
      description: 'Time and space complexity, Big O notation, and algorithm efficiency',
      icon: BarChart3,
      href: '/learning-path/foundations/complexity',
      difficulty: 'Intermediate' as const,
      timeEstimate: '25 min'
    },
    {
      id: 'adt',
      title: 'Abstract Data Types',
      description: 'Mathematical models for data types and their operations',
      icon: Brain,
      href: '/learning-path/foundations/adt',
      difficulty: 'Intermediate' as const,
      timeEstimate: '20 min'
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
      <div className="space-y-8 text-gray-700">
       

        <div className="bg-white p-8 rounded-2xl shadow-lg border text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ArrowRight className="w-7 h-7 mr-3 text-blue-600" />
            Learning Path
          </h2>
          <div className="grid gap-6 text-gray-700">
            {sectionDetails.map((section, index) => (
              <div
                key={section.id}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group cursor-pointer text-white"
                onClick={() => window.location.href = section.href}
              >
                <div className="flex items-center space-x-4 flex-1 text-gray-700">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors text-white">
                    <section.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 text-gray-700">
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-800">{section.title}</h3>
                    <p className="text-gray-600 text-sm">{section.description}</p>
                  </div>
                  <div className="text-right text-gray-700">
                    <div className="text-sm text-gray-500">{section.timeEstimate}</div>
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
        
        {/* Next Module Navigation */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl text-white">
          <h2 className="text-2xl font-bold mb-4 text-white">Ready for the Next Step?</h2>
          <p className="text-blue-100 mb-6">
            Now that you understand the fundamentals, let&apos;s explore why data structures exist by diving into computer memory systems.
          </p>
          <a 
            href="/learning-path/module-1"
            className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Continue to Module 1: Memory & Efficiency
            <ArrowRight className="w-5 h-5 ml-2 text-gray-700" />
          </a>
        </div>
      </div>
    </StandardModulePage>
  );
}