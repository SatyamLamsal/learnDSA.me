'use client';

import Link from 'next/link';
import { ArrowLeft, Shield, AlertTriangle, Mail, FileText } from 'lucide-react';

export default function DMCAPage() {
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
              <h1 className="text-2xl font-bold text-gray-800">DMCA Policy</h1>
              <p className="text-gray-600">Digital Millennium Copyright Act compliance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center mb-6">
            <Shield className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">DMCA Notice & Policy</h2>
              <p className="text-gray-600">Last updated: September 29, 2025</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h3>Our Commitment to Copyright</h3>
            <p>
              LearnDSA.me respects the intellectual property rights of others and expects 
              our users to do the same. We comply with the Digital Millennium Copyright 
              Act (DMCA) and will respond promptly to clear notices of alleged copyright 
              infringement.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-6">
              <div className="flex items-center mb-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                <h4 className="text-lg font-semibold text-yellow-800">Important Notice</h4>
              </div>
              <p className="text-yellow-700">
                All content on LearnDSA.me is either original material created by our team 
                or properly attributed educational content used under fair use principles.
              </p>
            </div>

            <h3>Filing a DMCA Notice</h3>
            <p>
              If you believe that material on LearnDSA.me infringes your copyright, 
              you may submit a DMCA takedown notice. Your notice must include:
            </p>

            <ol>
              <li>Your physical or electronic signature</li>
              <li>Identification of the copyrighted work you claim has been infringed</li>
              <li>Identification of the material you claim is infringing and where it is located on our site</li>
              <li>Your address, telephone number, and email address</li>
              <li>A statement that you have a good faith belief that the use is not authorized</li>
              <li>A statement that the information in your notice is accurate and that you are authorized to act on behalf of the copyright owner</li>
            </ol>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6">
              <div className="flex items-center mb-3">
                <Mail className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="text-lg font-semibold text-blue-800">DMCA Agent Contact</h4>
              </div>
              <p className="text-blue-700 mb-2">
                Send your DMCA notice to our designated agent:
              </p>
              <div className="text-blue-700">
                <strong>Email:</strong>{' '}
                <a href="mailto:dmca@learndsa.me" className="underline">
                  dmca@learndsa.me
                </a>
              </div>
            </div>

            <h3>Counter-Notification</h3>
            <p>
              If you believe your content was removed in error, you may submit a 
              counter-notification that includes:
            </p>

            <ul>
              <li>Your physical or electronic signature</li>
              <li>Identification of the material that was removed</li>
              <li>A statement under penalty of perjury that you have a good faith belief the material was removed in error</li>
              <li>Your name, address, and telephone number</li>
              <li>A statement consenting to jurisdiction of federal court in your district</li>
            </ul>

            <h3>Repeat Infringers</h3>
            <p>
              We will terminate the accounts of users who are repeat infringers of 
              copyrighted material when appropriate and in our sole discretion.
            </p>

            <h3>Educational Fair Use</h3>
            <p>
              As an educational platform, LearnDSA.me operates under educational fair use 
              principles when using copyrighted material for:
            </p>
            <ul>
              <li>Teaching and learning purposes</li>
              <li>Commentary and criticism</li>
              <li>Research and scholarship</li>
              <li>Transformative educational content</li>
            </ul>

            <h3>Our Original Content</h3>
            <p>
              All original algorithms explanations, interactive visualizations, practice 
              problems, and course materials created by LearnDSA.me are our intellectual 
              property and are protected by copyright law.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-6">
              <div className="flex items-center mb-3">
                <FileText className="w-5 h-5 text-green-600 mr-2" />
                <h4 className="text-lg font-semibold text-green-800">Open Source</h4>
              </div>
              <p className="text-green-700">
                Our platform is open source, and our original educational content is 
                available for educational use under appropriate attribution.
              </p>
            </div>

            <h3>Contact Information</h3>
            <p>
              For questions about this DMCA policy or copyright concerns:
            </p>
            <ul>
              <li><strong>General inquiries:</strong> hello@learndsa.me</li>
              <li><strong>DMCA notices:</strong> dmca@learndsa.me</li>
            </ul>

            <p>
              <strong>Note:</strong> This policy applies only to claims of copyright 
              infringement. For other legal matters, please contact us through our 
              general contact information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}