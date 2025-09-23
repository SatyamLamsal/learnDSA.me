'use client';

export default function GlobalLoading() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <div className="flex items-center gap-3 text-slate-600">
        <div className="h-3 w-3 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.2s]"></div>
        <div className="h-3 w-3 rounded-full bg-emerald-500 animate-bounce [animation-delay:0s]"></div>
        <div className="h-3 w-3 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]"></div>
        <span className="ml-2">Loading...</span>
      </div>
    </div>
  );
}
