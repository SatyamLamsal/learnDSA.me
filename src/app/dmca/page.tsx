'use client';

import Link from 'next/link';
import { ArrowLeft, Shield, AlertTriangle, Mail, FileText } from 'lucide-react';

export default function DMCAPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-white">
      {/* Header */}
      <div className="bg-white shadow-sm text-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 text-gray-700">
          <div className="flex items-center space-x-4 text-gray-700">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">DMCA Policy</h1>
              <p className="text-gray-600">Digital Millennium Copyright Act compliance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 text-gray-700">
        <div className="bg-white rounded-xl shadow-sm p-8 text-gray-700">
          <div className="flex items-center mb-6 text-gray-700">
            <Shield className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">DMCA Notice & Policy</h2>
              <p className="text-gray-600">Last updated: September 29, 2025</p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700">
            <div className="border-b pb-6 mb-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                <strong>Effective Date:</strong> October 10, 2025<br />
                <strong>Last Updated:</strong> October 10, 2025
              </p>
              <p className="text-gray-600 mt-4">
                LearnDSA.me is operated by a group of computer engineering students committed 
                to providing quality educational content while respecting intellectual property rights.
              </p>
            </div>

            <h3>Our Commitment to Copyright</h3>
            <p className="mb-4">
              LearnDSA.me respects the intellectual property rights of others and expects 
              our users to do the same. We comply with the Digital Millennium Copyright 
              Act (DMCA) and will respond promptly to clear notices of alleged copyright 
              infringement.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border mb-6">
              <p className="text-blue-700">
                <strong>Educational Mission:</strong> As students ourselves, we understand the importance 
                of both respecting copyright and promoting educational access. We strive to balance 
                these interests through fair use and proper attribution practices.
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-6 text-gray-700">
              <div className="flex items-center mb-3 text-gray-700">
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

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6 text-white">
              <div className="flex items-center mb-3 text-gray-700">
                <Mail className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="text-lg font-semibold text-blue-800">DMCA Agent Contact</h4>
              </div>
              <p className="text-blue-700 mb-4">
                Send your DMCA notice to our designated agent:
              </p>
              <div className="text-blue-700 space-y-2">
                <div><strong>Email:</strong> <a href="mailto:lamsalsatyam@gmail.com" className="underline text-blue-600">lamsalsatyam@gmail.com</a></div>
                <div><strong>Subject Line:</strong> "DMCA Takedown Notice - LearnDSA.me"</div>
                <div><strong>Physical Address:</strong> Pepsi Planning, Kathmandu 44600, Nepal</div>
                <div><strong>Response Time:</strong> We aim to respond within 48 hours</div>
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

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-6 text-gray-700">
              <div className="flex items-center mb-3 text-gray-700">
                <FileText className="w-5 h-5 text-green-600 mr-2" />
                <h4 className="text-lg font-semibold text-green-800">Open Source</h4>
              </div>
              <p className="text-green-700">
                Our platform is open source, and our original educational content is 
                available for educational use under appropriate attribution.
              </p>
            </div>

            <h3>Our Content Creation Process</h3>
            <p className="mb-4">
              As computer engineering students, we follow strict guidelines for content creation:
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-6">
              <li><strong>Original Development:</strong> All interactive visualizations and educational tools are developed by our team</li>
              <li><strong>Academic Sources:</strong> Algorithm explanations are based on standard computer science textbooks and academic papers</li>
              <li><strong>Fair Use Assessment:</strong> Any third-party content is evaluated for educational fair use compliance</li>
              <li><strong>Attribution Practice:</strong> We provide proper citations and references where applicable</li>
              <li><strong>Peer Review:</strong> Content is reviewed by our student team for accuracy and originality</li>
            </ul>

            <h3>Contact Information</h3>
            <p className="mb-4">
              For questions about this DMCA policy or copyright concerns:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border space-y-2">
              <div><strong>DMCA Agent:</strong> <a href="mailto:lamsalsatyam@gmail.com" className="text-blue-600 hover:underline">lamsalsatyam@gmail.com</a></div>
              <div><strong>General Inquiries:</strong> <a href="mailto:lamsalsatyam@gmail.com" className="text-blue-600 hover:underline">lamsalsatyam@gmail.com</a></div>
              <div><strong>Legal Matters:</strong> <a href="mailto:lamsalsatyam@gmail.com" className="text-blue-600 hover:underline">lamsalsatyam@gmail.com</a></div>
              <div><strong>Physical Address:</strong> Pepsi Planning, Kathmandu 44600, Nepal</div>
              <div><strong>Business Hours:</strong> We respond within 48 hours for DMCA notices</div>
            </div>

            <p className="mt-6 text-gray-600">
              <strong>Note:</strong> This policy applies only to claims of copyright 
              infringement. For other legal matters, please contact us through our 
              general contact information. As a student-operated educational platform, 
              we appreciate your patience and understanding in our response times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}