'use client';

import Link from 'next/link';
import { ArrowLeft, Cookie, Shield, Settings } from 'lucide-react';

export default function CookiesPage() {
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
              essential functionality:
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-6 text-gray-700">
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
            <ul>
              <li><strong>Authentication cookies:</strong> Keep you logged in securely</li>
              <li><strong>Progress tracking cookies:</strong> Remember your learning progress</li>
              <li><strong>Preference cookies:</strong> Store your theme and display preferences</li>
              <li><strong>Session cookies:</strong> Enable core website functionality</li>
            </ul>

            <h3>Third-party cookies</h3>
            <p>
              We use Google OAuth for authentication, which may set its own cookies. 
              These cookies are governed by Google&apos;s privacy policy.
            </p>

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

            <h3>Contact us</h3>
            <p>
              If you have any questions about our Cookie Policy, please contact us at{' '}
              <a href="mailto:hello@learndsa.me" className="text-blue-600 hover:text-blue-800">
                hello@learndsa.me
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}