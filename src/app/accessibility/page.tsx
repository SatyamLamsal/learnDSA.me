import type { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Accessibility Statement - Learn DSA",
  description: "LearnDSA.me accessibility statement. Learn about our commitment to inclusive education and accessibility features for all students.",
  robots: {
    index: true,
    follow: true,
  },
};
import { ArrowLeft, Eye, Ear, Hand, Brain, Monitor, Smartphone } from 'lucide-react';

export default function AccessibilityPage() {
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
              <h1 className="text-2xl font-bold text-gray-800">Accessibility Statement</h1>
              <p className="text-gray-600">Our commitment to inclusive education</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 text-gray-700">
        <div className="bg-white rounded-xl shadow-sm p-8 text-gray-700">
          <div className="flex items-center mb-6 text-gray-700">
            <Eye className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Accessibility Statement</h2>
              <p className="text-gray-600">Last updated: October 10, 2025</p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700">
            <div className="border-b pb-6 mb-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                <strong>Effective Date:</strong> October 10, 2025<br />
                <strong>Last Updated:</strong> October 10, 2025
              </p>
              <p className="text-gray-600 mt-4">
                LearnDSA.me is committed to ensuring that our educational platform is accessible 
                to all students, including those with disabilities. We believe that quality 
                computer science education should be available to everyone, regardless of their 
                physical or cognitive abilities.
              </p>
            </div>

            <h3>Our Commitment</h3>
            <p className="mb-4">
              As a group of computer engineering students, we understand the importance of 
              inclusive design in technology. We are actively working to improve the 
              accessibility of LearnDSA.me to ensure compliance with:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-6">
              <li>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</li>
              <li>Section 508 of the Rehabilitation Act</li>
              <li>Americans with Disabilities Act (ADA) requirements</li>
              <li>International accessibility best practices</li>
            </ul>

            <h3>Accessibility Features</h3>
            <p className="mb-4">Our platform includes the following accessibility features:</p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Eye className="w-5 h-5 text-blue-600 mr-2" />
                  <h4 className="text-lg font-semibold text-blue-800">Visual Accessibility</h4>
                </div>
                <ul className="text-blue-700 space-y-1 text-sm">
                  <li>• High contrast color schemes</li>
                  <li>• Dark and light theme options</li>
                  <li>• Scalable fonts and UI elements</li>
                  <li>• Alternative text for images and diagrams</li>
                  <li>• Clear visual hierarchy and focus indicators</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Hand className="w-5 h-5 text-green-600 mr-2" />
                  <h4 className="text-lg font-semibold text-green-800">Motor Accessibility</h4>
                </div>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• Full keyboard navigation support</li>
                  <li>• Large clickable areas for interactive elements</li>
                  <li>• No time-based interactions required</li>
                  <li>• Skip navigation links</li>
                  <li>• Mouse-free operation capabilities</li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Brain className="w-5 h-5 text-purple-600 mr-2" />
                  <h4 className="text-lg font-semibold text-purple-800">Cognitive Accessibility</h4>
                </div>
                <ul className="text-purple-700 space-y-1 text-sm">
                  <li>• Clear, simple language in explanations</li>
                  <li>• Consistent navigation structure</li>
                  <li>• Progress indicators and clear feedback</li>
                  <li>• Ability to pause and review content</li>
                  <li>• Multiple learning modalities supported</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Monitor className="w-5 h-5 text-orange-600 mr-2" />
                  <h4 className="text-lg font-semibold text-orange-800">Technical Accessibility</h4>
                </div>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• Screen reader compatibility</li>
                  <li>• Semantic HTML markup</li>
                  <li>• ARIA labels and descriptions</li>
                  <li>• Responsive design for all devices</li>
                  <li>• Fast loading times and performance</li>
                </ul>
              </div>
            </div>

            <h3>Interactive Elements</h3>
            <p className="mb-4">
              Our educational visualizations and interactive elements are designed with accessibility in mind:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-6">
              <li><strong>Algorithm Visualizations:</strong> Include text descriptions and step-by-step explanations</li>
              <li><strong>Interactive Demos:</strong> Can be operated via keyboard and include audio cues</li>
              <li><strong>Progress Tracking:</strong> Provides clear feedback on completion status</li>
              <li><strong>Code Examples:</strong> Include proper syntax highlighting and can be copied to screen readers</li>
            </ul>

            <h3>Assistive Technology Support</h3>
            <p className="mb-4">
              LearnDSA.me is compatible with common assistive technologies:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <ul className="text-gray-700 space-y-2">
                <li><strong>Screen Readers:</strong> NVDA, JAWS, VoiceOver, TalkBack</li>
                <li><strong>Voice Control:</strong> Dragon NaturallySpeaking, Voice Control</li>
                <li><strong>Keyboard Navigation:</strong> Full site navigation without mouse</li>
                <li><strong>Browser Zoom:</strong> Up to 200% zoom without horizontal scrolling</li>
                <li><strong>High Contrast:</strong> Windows High Contrast mode support</li>
              </ul>
            </div>

            <h3>Known Limitations and Ongoing Improvements</h3>
            <p className="mb-4">
              We are continuously working to improve accessibility. Current known limitations include:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-6">
              <li>Some complex algorithm visualizations may require additional description</li>
              <li>Audio alternatives for visual content are still being developed</li>
              <li>Mobile accessibility testing is ongoing</li>
              <li>Some third-party embedded content may have accessibility limitations</li>
            </ul>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-800">
                <strong>Development Priority:</strong> As computer engineering students, we are 
                actively learning about accessibility best practices and implementing improvements 
                with each platform update. Your feedback helps us prioritize these enhancements.
              </p>
            </div>

            <h3>Alternative Formats</h3>
            <p className="mb-4">
              If you need content in an alternative format, we can provide:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-6">
              <li>Text-only versions of visual algorithm explanations</li>
              <li>Downloadable PDF versions of lessons</li>
              <li>Audio descriptions of visual content (upon request)</li>
              <li>Simplified versions of complex interactive elements</li>
            </ul>

            <h3>Feedback and Support</h3>
            <p className="mb-4">
              We welcome your feedback on the accessibility of LearnDSA.me. If you encounter 
              accessibility barriers or have suggestions for improvement, please contact us:
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-semibold text-green-800 mb-3">Contact Information</h4>
              <div className="text-green-700 space-y-2">
                <div><strong>Accessibility Coordinator:</strong> <a href="mailto:lamsalsatyam@gmail.com" className="text-blue-600 hover:underline">lamsalsatyam@gmail.com</a></div>
                <div><strong>Subject Line:</strong> "Accessibility Feedback - LearnDSA.me"</div>
                <div><strong>Phone:</strong> Available upon request</div>
                <div><strong>Address:</strong> Pepsi Planning, Kathmandu 44600, Nepal</div>
                <div><strong>Response Time:</strong> We aim to respond within 48 hours</div>
              </div>
            </div>

            <h3>Third-Party Content</h3>
            <p className="mb-4">
              Some content on our platform may include third-party elements (such as Google OAuth). 
              While we cannot control the accessibility of these external services, we:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-6">
              <li>Choose third-party services based partly on their accessibility features</li>
              <li>Provide alternative methods when possible</li>
              <li>Work with vendors to improve accessibility</li>
              <li>Clearly identify external content and its accessibility status</li>
            </ul>

            <h3>Regular Review and Updates</h3>
            <p className="mb-4">
              This accessibility statement is reviewed and updated regularly:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-6">
              <li><strong>Quarterly Reviews:</strong> We assess accessibility improvements every 3 months</li>
              <li><strong>User Testing:</strong> Regular testing with assistive technology users</li>
              <li><strong>Technical Audits:</strong> Automated and manual accessibility testing</li>
              <li><strong>Student Feedback:</strong> Continuous feedback collection from our user community</li>
            </ul>

            <h3>Legal Compliance</h3>
            <p className="mb-4">
              We are committed to meeting legal accessibility requirements:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2 mb-6">
              <li>Ongoing WCAG 2.1 Level AA compliance efforts</li>
              <li>Regular accessibility audits and remediation</li>
              <li>Documentation of accessibility improvements</li>
              <li>Staff training on accessibility best practices</li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Our Promise</h4>
              <p className="text-blue-700">
                As future engineers and developers, we understand that accessibility is not just 
                a legal requirement but a fundamental aspect of good design. We are committed to 
                making LearnDSA.me a platform where every student can learn effectively, regardless 
                of their abilities or the technologies they use to access our content.
              </p>
            </div>
          </div>

          <div className="text-sm text-gray-500 pt-6 border-t mt-8">
            <p><strong>Last updated:</strong> October 10, 2025</p>
            <p><strong>Next review:</strong> January 10, 2026</p>
            <p><strong>Version:</strong> 1.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}