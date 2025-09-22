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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
            <p className="text-gray-600">
              Learn DSA is committed to protecting your privacy. We collect minimal information 
              necessary to provide our educational services, including theme preferences stored 
              locally in your browser.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Information</h2>
            <p className="text-gray-600">
              Any information collected is used solely to enhance your learning experience 
              on our platform. We do not sell or share personal data with third parties.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have questions about this Privacy Policy, please contact us at 
              <a href="mailto:privacy@learndsa.me" className="text-blue-600 hover:underline ml-1">
                privacy@learndsa.me
              </a>
            </p>
          </div>
          
          <div className="text-sm text-gray-500 pt-4 border-t">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}