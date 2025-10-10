'use client';

import Link from 'next/link';
import { ArrowLeft, Cookie, Shield, Settings } from 'lucide-react';

export default function CookiesPage() {
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
              <h1 className="text-2xl font-bold text-gray-800">Cookie Policy</h1>
              <p className="text-gray-600">How we use cookies on LearnDSA.me</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 text-gray-700">
        <div className="bg-white rounded-xl shadow-sm p-8 text-gray-700">
          <div className="flex items-center mb-6 text-gray-700">
            <Cookie className="w-8 h-8 text-orange-500 mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Cookie Policy</h2>
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
                This Cookie Policy explains how LearnDSA.me uses cookies and similar technologies 
                to recognize you when you visit our educational platform at learndsa.me.
              </p>
            </div>

            <h3>What are cookies?</h3>
            <p>
              Cookies are small text files that are stored on your computer or mobile device 
              when you visit a website. They help websites remember information about your 
              visit, which can make it easier to visit the site again and make the site 
              more useful to you.
            </p>

            <h3>How we use cookies</h3>
            <p>
              LearnDSA.me uses cookies to enhance your learning experience and provide 
              essential functionality. As a group of computer engineering students, we 
              prioritize minimal data collection while ensuring optimal educational experience:
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6 text-white">
              <h4 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-gray-700" />
                Essential Cookies
              </h4>
              <p className="text-blue-700">
                These cookies are necessary for the website to function properly. They enable 
                core functionality such as user authentication, progress tracking, and 
                bookmarking. These cookies cannot be disabled.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-6 text-gray-700">
              <h4 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-gray-700" />
                Functional Cookies
              </h4>
              <p className="text-green-700">
                These cookies remember your preferences and choices (like theme settings) 
                to provide you with a personalized experience.
              </p>
            </div>

            <h3>Types of cookies we use</h3>
            <p className="mb-4">We use the following categories of cookies on our platform:</p>
            
            <div className="space-y-4 mb-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">🔒 Strictly Necessary Cookies</h4>
                <ul className="text-red-700 space-y-1 ml-4">
                  <li><strong>Authentication cookies:</strong> Keep you logged in securely via Google OAuth</li>
                  <li><strong>Session cookies:</strong> Enable core website functionality and navigation</li>
                  <li><strong>Security cookies:</strong> Protect against cross-site request forgery</li>
                </ul>
                <p className="text-red-600 text-sm mt-2"><em>These cannot be disabled as they are essential for the platform to function.</em></p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">⚙️ Functional Cookies</h4>
                <ul className="text-blue-700 space-y-1 ml-4">
                  <li><strong>Progress tracking:</strong> Remember your learning progress through modules</li>
                  <li><strong>Preference cookies:</strong> Store your theme (dark/light mode) and display settings</li>
                  <li><strong>Language preferences:</strong> Remember your preferred language settings</li>
                  <li><strong>Bookmark cookies:</strong> Save your bookmarked lessons and topics</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">📊 Analytics Cookies (Future Implementation)</h4>
                <ul className="text-green-700 space-y-1 ml-4">
                  <li><strong>Google Analytics:</strong> Understand how users interact with our educational content</li>
                  <li><strong>Performance monitoring:</strong> Track page load times and platform performance</li>
                  <li><strong>Usage patterns:</strong> Analyze which learning paths are most effective</li>
                </ul>
                <p className="text-green-600 text-sm mt-2"><em>These will be implemented with your consent and can be disabled.</em></p>
              </div>
            </div>

            <h3>Third-party cookies and services</h3>
            <p className="mb-4">
              LearnDSA.me integrates with certain third-party services that may set their own cookies:
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-yellow-800 mb-2">🔐 Google OAuth (Currently Active)</h4>
              <ul className="text-yellow-700 space-y-1 ml-4">
                <li><strong>Purpose:</strong> Secure user authentication and login</li>
                <li><strong>Data collected:</strong> Profile picture and username only</li>
                <li><strong>Cookies set:</strong> Google authentication and session cookies</li>
                <li><strong>Privacy policy:</strong> <a href="https://policies.google.com/privacy" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
              </ul>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">📈 Google Analytics (Future Implementation)</h4>
              <ul className="text-gray-700 space-y-1 ml-4">
                <li><strong>Purpose:</strong> Understand user behavior and improve educational content</li>
                <li><strong>Data collected:</strong> Anonymized usage statistics, page views, session duration</li>
                <li><strong>Control:</strong> You will be able to opt-out when implemented</li>
                <li><strong>Privacy policy:</strong> <a href="https://policies.google.com/privacy" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">Google Analytics Privacy</a></li>
              </ul>
            </div>

            <h3>Managing cookies</h3>
            <p>
              Most web browsers allow you to control cookies through their settings. 
              However, please note that disabling cookies may affect the functionality 
              of LearnDSA.me, particularly:
            </p>
            <ul>
              <li>You may not be able to stay logged in</li>
              <li>Your learning progress may not be saved</li>
              <li>Your bookmarks and preferences may not persist</li>
            </ul>

            <h3>Browser settings</h3>
            <p>
              You can manage cookies in your browser settings:
            </p>
            <ul>
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
            </ul>

            <h3>Changes to this policy</h3>
            <p>
              We may update this Cookie Policy from time to time. Any changes will be 
              posted on this page with an updated revision date.
            </p>

            <h3>Local Storage and Data Persistence</h3>
            <p className="mb-4">
              In addition to cookies, we use browser local storage to enhance your experience:
            </p>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 mb-6">
              <li><strong>Learning Progress (Unauthenticated Users):</strong> If you use our platform without signing in, your progress through lessons is stored locally in your browser</li>
              <li><strong>Theme Preferences:</strong> Your chosen theme (dark/light mode) is saved locally</li>
              <li><strong>Interactive Settings:</strong> Preferences for visualizations and interactive elements</li>
              <li><strong>Temporary Data:</strong> Caching of educational content for faster loading</li>
            </ul>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-700">
                <strong>Note:</strong> Local storage data remains on your device and is not transmitted to our servers. 
                However, this data will be lost if you clear your browser data or use a different device.
              </p>
            </div>

            <h3>Your Cookie Choices and Control</h3>
            <p className="mb-4">You have several options to control cookies:</p>
            <div className="space-y-4 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">✅ Recommended Settings</h4>
                <ul className="text-green-700 space-y-1 ml-4">
                  <li>Allow essential cookies for full platform functionality</li>
                  <li>Allow functional cookies for personalized experience</li>
                  <li>Choose your preference for future analytics cookies</li>
                </ul>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-800 mb-2">⚠️ Impact of Disabling Cookies</h4>
                <ul className="text-orange-700 space-y-1 ml-4">
                  <li>You may not be able to stay logged in between sessions</li>
                  <li>Your learning progress may not be saved</li>
                  <li>Theme and display preferences will reset each visit</li>
                  <li>Some interactive features may not work properly</li>
                </ul>
              </div>
            </div>

            <h3>Contact us</h3>
            <p className="mb-4">
              If you have any questions about our Cookie Policy, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="text-gray-700">
                <strong>Cookie Questions:</strong> <a href="mailto:lamsalsatyam@gmail.com" className="text-blue-600 hover:text-blue-800">lamsalsatyam@gmail.com</a><br />
                <strong>Technical Support:</strong> <a href="mailto:lamsalsatyam@gmail.com" className="text-blue-600 hover:text-blue-800">lamsalsatyam@gmail.com</a><br />
                <strong>Address:</strong> Pepsi Planning, Kathmandu 44600, Nepal<br />
                <strong>Response Time:</strong> We aim to respond within 72 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}