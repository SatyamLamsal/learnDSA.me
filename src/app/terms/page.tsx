import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Learn DSA",
  description: "Terms of Service for Learn DSA educational platform. Learn about usage guidelines and terms.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 text-gray-700">
      <div className="container mx-auto px-4 max-w-4xl text-gray-700">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8 text-gray-700">
          
          <div className="border-b pb-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              <strong>Effective Date:</strong> October 10, 2025<br />
              <strong>Last Updated:</strong> October 10, 2025
            </p>
            <p className="text-gray-600 mt-4">
              Welcome to LearnDSA.me! These Terms of Service (&quot;Terms&quot;) govern your use of 
              our educational platform located at learndsa.me. By accessing or using our 
              service, you agree to be bound by these Terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. About LearnDSA.me</h2>
            <p className="text-gray-600 mb-4">
              LearnDSA.me is an educational platform created by a group of computer engineering 
              students to provide free, interactive learning resources for data structures and 
              algorithms. Our mission is to make computer science education accessible to 
              students worldwide.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border">
              <p className="text-gray-700">
                <strong>Platform Operator:</strong> Computer Engineering Student Group<br />
                <strong>Contact:</strong> lamsalsatyam@gmail.com<br />
                <strong>Address:</strong> Pepsi Planning, Kathmandu 44600, Nepal
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using LearnDSA.me, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms and our Privacy Policy. 
              If you do not agree to these Terms, please do not use our platform.
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>These Terms apply to all users of the platform</li>
              <li>You must be capable of entering into a legally binding agreement</li>
              <li>Use of the platform constitutes acceptance of these Terms</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Educational Purpose and Target Audience</h2>
            <p className="text-gray-600 mb-4">
              LearnDSA.me is designed specifically for computer science students and education:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li><strong>Primary Audience:</strong> Computer science students, programmers, and educators</li>
              <li><strong>Content Focus:</strong> Data structures, algorithms, and related computer science topics</li>
              <li><strong>Educational Use:</strong> All content is intended for educational and learning purposes</li>
              <li><strong>Age Appropriateness:</strong> Content is suitable for all ages with no restricted material</li>
              <li><strong>Global Accessibility:</strong> Platform is designed to serve international students</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. User Accounts and Authentication</h2>
            <h3 className="text-xl font-medium text-gray-800 mb-3">4.1 Account Creation</h3>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>Accounts are created through Google OAuth authentication only</li>
              <li>We collect only your Google profile picture and username</li>
              <li>You are responsible for maintaining the security of your Google account</li>
              <li>One person may not maintain multiple accounts</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">4.2 Account Responsibilities</h3>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>Provide accurate and current information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Acceptable Use Policy</h2>
            <h3 className="text-xl font-medium text-gray-800 mb-3">5.1 Permitted Uses</h3>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>Learning data structures and algorithms concepts</li>
              <li>Using interactive visualizations and educational tools</li>
              <li>Tracking your personal learning progress</li>
              <li>Sharing knowledge with fellow students (following academic integrity)</li>
              <li>Using content for personal educational advancement</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">5.2 Prohibited Uses</h3>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>Violating any applicable laws or regulations</li>
              <li>Attempting to gain unauthorized access to the platform or other users&apos; accounts</li>
              <li>Distributing malware, viruses, or other harmful code</li>
              <li>Using automated tools to scrape or download content en masse</li>
              <li>Interfering with the proper functioning of the platform</li>
              <li>Impersonating other users or entities</li>
              <li>Using the platform for commercial purposes without permission</li>
              <li>Attempting to reverse engineer or copy our educational algorithms</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Content and Intellectual Property</h2>
            <h3 className="text-xl font-medium text-gray-800 mb-3">6.1 Our Content</h3>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>All original content, including lessons, visualizations, and interactive tools, is owned by LearnDSA.me</li>
              <li>Content is protected by copyright and other intellectual property laws</li>
              <li>We grant you a limited, non-exclusive license to access and use content for educational purposes</li>
              <li>You may not redistribute, modify, or create derivative works without permission</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">6.2 Third-Party Content</h3>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>Some content may reference or include third-party educational materials</li>
              <li>Such content is used under fair use principles for educational purposes</li>
              <li>Third-party content remains the property of its respective owners</li>
              <li>We respect intellectual property rights and respond to DMCA notices</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">6.3 User Data</h3>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>Your learning progress and preferences remain your data</li>
              <li>We do not claim ownership of your personal information</li>
              <li>You retain rights to your data subject to our Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Service Availability and Modifications</h2>
            <p className="text-gray-600 mb-4">
              We strive to provide consistent access to our educational platform:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>The service is provided &quot;as is&quot; without warranties of availability</li>
              <li>We may modify, suspend, or discontinue services with reasonable notice</li>
              <li>Maintenance and updates may temporarily interrupt service</li>
              <li>We reserve the right to impose reasonable usage limits</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Privacy and Data Protection</h2>
            <p className="text-gray-600 mb-4">
              Your privacy is important to us. Our data practices include:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>Minimal data collection (profile picture and username only)</li>
              <li>Local storage of progress for unauthenticated users</li>
              <li>Secure handling of all personal information</li>
              <li>No sale or unauthorized sharing of personal data</li>
              <li>Compliance with applicable privacy laws</li>
            </ul>
            <p className="text-gray-600 mt-4">
              For detailed information, please review our <strong>Privacy Policy</strong>.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Future Developments</h2>
            <p className="text-gray-600 mb-4">
              As our platform evolves, we may introduce new features:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li><strong>Analytics:</strong> Google Analytics for improving user experience</li>
              <li><strong>Monetization:</strong> Potential advertising partnerships in the future</li>
              <li><strong>Enhanced Features:</strong> Advanced learning tools and personalization</li>
              <li><strong>Community Features:</strong> Discussion forums or study groups</li>
            </ul>
            <p className="text-gray-600 mt-4">
              Users will be notified of significant changes to terms or services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Disclaimers and Limitations</h2>
            <h3 className="text-xl font-medium text-gray-800 mb-3">10.1 Educational Disclaimer</h3>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>Content is for educational purposes and may not be completely comprehensive</li>
              <li>We recommend supplementing with other educational resources</li>
              <li>Academic success depends on individual effort and institution requirements</li>
              <li>We are not responsible for academic outcomes or decisions based on our content</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">10.2 Technical Disclaimer</h3>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>The platform is provided &quot;as is&quot; without warranties</li>
              <li>We do not guarantee error-free or uninterrupted service</li>
              <li>Users are responsible for backing up their progress data</li>
              <li>Technical issues may occasionally affect platform functionality</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Termination</h2>
            <p className="text-gray-600 mb-4">
              Either party may terminate the use of services:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li><strong>By You:</strong> Stop using the platform at any time</li>
              <li><strong>By Us:</strong> Suspend or terminate access for violations of these Terms</li>
              <li><strong>Effect:</strong> Upon termination, your right to use the platform ceases</li>
              <li><strong>Data:</strong> You may export your progress data before termination</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We may modify these Terms to reflect changes in our services or legal requirements:
            </p>
            <ul className="list-disc ml-6 text-gray-600 space-y-2">
              <li>Notice of material changes will be provided through the platform</li>
              <li>Continued use constitutes acceptance of modified Terms</li>
              <li>Users who disagree with changes should discontinue use</li>
              <li>Version history will be maintained for transparency</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              For questions, concerns, or reports regarding these Terms:
            </p>
            <div className="bg-green-50 p-4 rounded-lg border">
              <p className="text-gray-700">
                <strong>General Inquiries:</strong> <a href="mailto:lamsalsatyam@gmail.com" className="text-blue-600 hover:underline">lamsalsatyam@gmail.com</a><br />
                <strong>Technical Support:</strong> <a href="mailto:lamsalsatyam@gmail.com" className="text-blue-600 hover:underline">lamsalsatyam@gmail.com</a><br />
                <strong>Legal Matters:</strong> <a href="mailto:lamsalsatyam@gmail.com" className="text-blue-600 hover:underline">lamsalsatyam@gmail.com</a><br />
                <strong>Address:</strong> Pepsi Planning, Kathmandu 44600, Nepal<br />
                <strong>Response Time:</strong> We aim to respond within 72 hours
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">14. Governing Law</h2>
            <p className="text-gray-600">
              These Terms are governed by the laws of Nepal. Any disputes will be resolved 
              through good faith negotiation, with jurisdiction in the courts of Kathmandu, Nepal 
              for matters that cannot be resolved amicably.
            </p>
          </div>
          
          <div className="text-sm text-gray-500 pt-6 border-t">
            <p><strong>Last updated:</strong> October 10, 2025</p>
            <p><strong>Effective date:</strong> October 10, 2025</p>
            <p><strong>Version:</strong> 1.0</p>
            <p><strong>Next review:</strong> April 10, 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}