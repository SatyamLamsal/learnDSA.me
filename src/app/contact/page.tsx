'use client';

import Link from 'next/link';
import { ArrowLeft, Mail, Github, Bug, Lightbulb, Heart } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Contact Us</h1>
              <p className="text-gray-600">Get in touch with the LearnDSA.me team</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Contact Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Mail className="w-8 h-8 text-blue-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Email Us</h2>
            </div>
            <p className="text-gray-600 mb-4">
              For general inquiries, feedback, or support questions.
            </p>
            <a 
              href="mailto:hello@learndsa.me" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              hello@learndsa.me
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Github className="w-8 h-8 text-gray-700 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">GitHub</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Report bugs, request features, or contribute to the project.
            </p>
            <a 
              href="https://github.com/SatyamLamsal/learnDSA.me" 
              className="text-blue-600 hover:text-blue-800 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </div>
        </div>

        {/* Contact Types */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">What can we help you with?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <Bug className="w-8 h-8 text-red-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Bug Reports</h3>
              <p className="text-sm text-gray-600">Found an issue? Let us know!</p>
            </div>
            
            <div className="text-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <Lightbulb className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Feature Requests</h3>
              <p className="text-sm text-gray-600">Have an idea for improvement?</p>
            </div>
            
            <div className="text-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <Heart className="w-8 h-8 text-pink-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">General Feedback</h3>
              <p className="text-sm text-gray-600">Share your learning experience!</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Is LearnDSA.me really free?</h3>
              <p className="text-gray-600">
                Yes! All our core learning content is completely free. We believe quality 
                education should be accessible to everyone.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How can I contribute to the project?</h3>
              <p className="text-gray-600">
                We&apos;re open source! You can contribute by improving content, fixing bugs, 
                adding new features, or helping other learners in our community.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Do you provide certificates?</h3>
              <p className="text-gray-600">
                We&apos;re working on a certificate system for completed learning paths. 
                Stay tuned for updates!
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How often is content updated?</h3>
              <p className="text-gray-600">
                We regularly update and expand our content based on community feedback 
                and industry best practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}