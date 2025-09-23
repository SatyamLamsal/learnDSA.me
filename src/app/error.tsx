'use client';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void; }) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-red-50">
          <div className="bg-white border border-red-200 rounded-lg p-6 shadow max-w-md text-center">
            <h1 className="text-2xl font-bold text-red-700 mb-2">Something went wrong</h1>
            <p className="text-sm text-red-600 mb-4">{error.message}</p>
            <button onClick={() => reset()} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Try again</button>
          </div>
        </div>
      </body>
    </html>
  );
}
