import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Structures - Learn DSA",
  description: "Master all data structures with interactive theory, visualizations, and simulations. Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Hash Tables with comprehensive examples.",
  keywords: "data structures, arrays, linked lists, stacks, queues, trees, graphs, hash tables, computer science, programming",
  openGraph: {
    title: "Data Structures - Learn DSA",
    description: "Master all data structures with interactive theory, visualizations, and simulations",
    url: "https://learndsa.me/data-structures",
    type: "website",
  },
};

export default function DataStructuresPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Data Structures</h1>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Explore comprehensive guides to all fundamental data structures with interactive 
          theory, dynamic visualizations, and hands-on simulations.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* This will be expanded with actual data structure cards */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Choose a Data Structure</h2>
            <p className="text-gray-600">
              Select any data structure from the navigation menu to begin learning 
              with interactive content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}