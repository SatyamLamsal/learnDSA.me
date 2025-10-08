'use client';

import Link from 'next/link';
import { ArrowLeft, Users, Target, Award, Heart, Mail, Github } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-gray-700">
      {/* Header */}
      <div className="bg-white shadow-sm text-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 text-gray-700">
          <div className="flex items-center space-x-4 text-gray-700">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">About LearnDSA.me</h1>
              <p className="text-gray-600">Our mission to make DSA accessible to everyone</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 text-gray-700">
        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 text-gray-700">
          <div className="text-center mb-8 text-gray-700">
            <Target className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To democratize computer science education by providing high-quality, 
              interactive Data Structures and Algorithms learning experiences that 
              prepare students for technical interviews and software engineering careers.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 text-gray-700">
          <div className="bg-white rounded-xl shadow-sm p-6 text-center text-gray-700">
            <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Accessibility</h3>
            <p className="text-gray-600">
              Quality education should be available to everyone, regardless of background or financial situation.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 text-center text-gray-700">
            <Award className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Excellence</h3>
            <p className="text-gray-600">
              We maintain high standards in content quality, accuracy, and pedagogical effectiveness.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 text-center text-gray-700">
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Community</h3>
            <p className="text-gray-600">
              Building a supportive learning community where students help each other succeed.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 text-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Story</h2>
          <div className="prose max-w-none text-gray-700">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              LearnDSA.me was born from the recognition that many talented students struggle 
              with Data Structures and Algorithms not because they lack ability, but because 
              traditional teaching methods don&apos;t match how people actually learn complex topics.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              We believe in learning through visualization, interaction, and incremental 
              complexity building. Our platform combines academic rigor with engaging, 
              practical exercises that prepare students for both academic success and 
              industry challenges.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Started in 2024, we&apos;ve already helped thousands of students master DSA 
              concepts and land their dream jobs at top tech companies.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 text-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-8 text-gray-700">
            <div>
              <p className="text-gray-700 mb-6">
                Have questions, suggestions, or want to contribute? We&apos;d love to hear from you!
              </p>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-center text-gray-700">
                  <Mail className="w-5 h-5 text-blue-500 mr-3" />
                  <a href="mailto:hello@learndsa.me" className="text-blue-600 hover:text-blue-800">
                    hello@learndsa.me
                  </a>
                </div>
                <div className="flex items-center text-gray-700">
                  <Github className="w-5 h-5 text-gray-700 mr-3" />
                  <a 
                    href="https://github.com/SatyamLamsal/learnDSA.me" 
                    className="text-blue-600 hover:text-blue-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Repository
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 text-gray-700">
              <h3 className="font-semibold text-gray-800 mb-3">Open Source</h3>
              <p className="text-gray-700 text-sm">
                LearnDSA.me is open source! Contribute to our mission by improving 
                content, fixing bugs, or suggesting new features on our GitHub repository.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}