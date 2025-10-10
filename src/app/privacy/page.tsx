import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Learn DSA",
  description: "Privacy Policy for Learn DSA platform. Learn how we collect, use, and protect your personal information.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 text-gray-700">
      <div className="container mx-auto px-4 max-w-4xl text-gray-700">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8 text-gray-700">
          
          <div className="border-b pb-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              <strong>Effective Date:</strong> October 10, 2025<br />
              <strong>Last Updated:</strong> October 10, 2025
            </p>
            <p className="text-gray-600 mt-4">
              LearnDSA.me (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you visit our educational platform at learndsa.me.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-gray-800 mb-3">1.1 Personal Information We Collect</h3>
            <p className="text-gray-600 mb-4">
              We collect minimal personal information to provide our educational services:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li><strong>Profile Information:</strong> When you sign in with Google, we collect your Google profile picture and username only.</li>
              <li><strong>Contact Information:</strong> Your email address (lamsalsatyam@gmail.com) for service-related communications.</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">1.2 Automatically Collected Information</h3>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li><strong>Learning Progress:</strong> Your progress through lessons and modules (stored locally if not signed in)</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on lessons, interaction with content</li>
              <li><strong>Device Information:</strong> Browser type, operating system, screen resolution</li>
              <li><strong>Log Data:</strong> IP address, access times, referring URLs</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">1.3 Cookies and Local Storage</h3>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>Essential cookies for authentication and core functionality</li>
              <li>Local storage for learning progress when not signed in</li>
              <li>Preference cookies for theme and display settings</li>
              <li>Future analytics cookies (Google Analytics) when implemented</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use collected information for the following purposes:</p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li><strong>Educational Services:</strong> Provide access to learning materials and track progress</li>
              <li><strong>Personalization:</strong> Customize your learning experience and remember preferences</li>
              <li><strong>Authentication:</strong> Verify your identity and maintain secure sessions</li>
              <li><strong>Communication:</strong> Send important service updates or respond to inquiries</li>
              <li><strong>Improvement:</strong> Analyze usage patterns to enhance our educational content</li>
              <li><strong>Legal Compliance:</strong> Comply with applicable laws and protect our rights</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Information Sharing and Disclosure</h2>
            <p className="text-gray-600 mb-4">
              We do not sell, trade, or rent your personal information to third parties. 
              We may share information only in the following circumstances:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li><strong>Google Services:</strong> Authentication data is processed by Google OAuth</li>
              <li><strong>Analytics (Future):</strong> Anonymized usage data may be shared with Google Analytics</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Service Providers:</strong> Trusted partners who assist in operating our platform</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>Secure HTTPS encryption for all data transmission</li>
              <li>Regular security assessments and updates</li>
              <li>Limited access to personal information by authorized personnel only</li>
              <li>Secure hosting infrastructure with industry-standard protections</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Your Rights and Control</h2>
            <p className="text-gray-600 mb-4">You have the following rights regarding your personal information:</p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
              <li><strong>Opt-out:</strong> Opt-out of non-essential data collection</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. International Data Transfers</h2>
            <p className="text-gray-600">
              As we serve students globally, your information may be transferred to and processed 
              in countries other than your own. We ensure appropriate safeguards are in place 
              for such transfers in compliance with applicable data protection laws.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Children&apos;s Privacy</h2>
            <p className="text-gray-600">
              While our platform is designed for computer science students and does not contain 
              age-restricted content, we do not knowingly collect personal information from 
              children under 13. If we become aware that we have collected such information, 
              we will take steps to delete it promptly.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Future Changes</h2>
            <p className="text-gray-600">
              As our platform evolves, we may introduce new features such as:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>Google Analytics for usage insights</li>
              <li>Advertising partnerships (with appropriate disclosures)</li>
              <li>Additional authentication methods</li>
              <li>Enhanced personalization features</li>
            </ul>
            <p className="text-gray-600 mt-4">
              We will update this Privacy Policy accordingly and notify users of significant changes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have questions, concerns, or requests regarding this Privacy Policy or 
              your personal information, please contact us:
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border">
              <p className="text-gray-700">
                <strong>Email:</strong> <a href="mailto:lamsalsatyam@gmail.com" className="text-blue-600 hover:underline">lamsalsatyam@gmail.com</a><br />
                <strong>Address:</strong> Pepsi Planning, Kathmandu 44600, Nepal<br />
                <strong>Response Time:</strong> We aim to respond within 72 hours
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. About LearnDSA.me</h2>
            <p className="text-gray-600">
              LearnDSA.me is a personal educational project created by a group of computer 
              engineering students to provide free, high-quality learning resources for 
              data structures and algorithms. We are committed to maintaining the privacy 
              and security of our users while providing excellent educational content.
            </p>
          </div>
          
          <div className="text-sm text-gray-500 pt-6 border-t">
            <p><strong>Last updated:</strong> October 10, 2025</p>
            <p><strong>Effective date:</strong> October 10, 2025</p>
            <p><strong>Version:</strong> 1.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}