'use client';

export default function GlobalLoading() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center text-gray-700">
      <div className="flex items-center gap-3 text-slate-600">
        <div className="h-3 w-3 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.2s] text-gray-700"></div>
        <div className="h-3 w-3 rounded-full bg-emerald-500 animate-bounce [animation-delay:0s] text-gray-700"></div>
        <div className="h-3 w-3 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s] text-gray-700"></div>
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    </div>
  );
}
