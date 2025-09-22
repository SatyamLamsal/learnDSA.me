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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Educational Use</h2>
            <p className="text-gray-600">
              Learn DSA is provided as an educational resource for learning data structures 
              and algorithms. All content is intended for educational purposes only.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acceptable Use</h2>
            <p className="text-gray-600">
              Users agree to use this platform responsibly and in accordance with 
              applicable laws and regulations. Misuse of the platform is prohibited.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact</h2>
            <p className="text-gray-600">
              For questions about these terms, contact us at 
              <a href="mailto:legal@learndsa.me" className="text-blue-600 hover:underline ml-1">
                legal@learndsa.me
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