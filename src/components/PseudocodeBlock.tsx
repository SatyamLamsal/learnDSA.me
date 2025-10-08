'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Copy, Pause, Play, RotateCcw, SkipBack, SkipForward } from 'lucide-react';

type PseudocodeBlockProps = {
  title?: string;
  languageLabel?: string;
  code: string;
  autoPlay?: boolean;
  highlight?: number; // externally control highlighted line (1-based)
  loop?: boolean;
  intervalMs?: number; // autoplay interval
};

export default function PseudocodeBlock({ title, languageLabel = 'Pseudocode', code, autoPlay = false, highlight, loop = false, intervalMs = 900 }: PseudocodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [cursor, setCursor] = useState<number>(highlight ?? 0); // 1-based line index, 0 means none
  const [playing, setPlaying] = useState<boolean>(autoPlay);
  const [speed, setSpeed] = useState<number>(1);
  const timerRef = useRef<number | null>(null);

  const lines = useMemo(() => code.replace(/\n$/, '').split('\n'), [code]);

  // keep internal cursor in sync if external highlight provided
  useEffect(() => {
    if (typeof highlight === 'number') {
      setCursor(Math.max(0, Math.min(lines.length, highlight)));
    }
  }, [highlight, lines.length]);

  useEffect(() => {
    if (!playing) {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    const nextTick = () => {
      setCursor(prev => {
        const next = prev + 1;
        if (next <= lines.length) return next;
        if (loop) return 1;
        // stop at end
        setPlaying(false);
        return lines.length;
      });
    };
    const delay = Math.max(150, intervalMs / speed);
    timerRef.current = window.setTimeout(nextTick, delay);
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [playing, speed, intervalMs, lines.length, loop]);

  const onPlayPause = () => setPlaying(p => !p);
  const onPrev = () => setCursor(c => Math.max(1, (c || 1) - 1));
  const onNext = () => setCursor(c => Math.min(lines.length, (c || 0) + 1));
  const onReset = () => {
    setCursor(0);
    setPlaying(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // no-op
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden text-gray-700">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50 text-gray-700">
        <div className="text-sm font-semibold text-gray-700">{title ?? 'Pseudocode'}</div>
        <div className="flex items-center gap-2 text-gray-700">
          <div className="hidden sm:flex items-center gap-1 mr-2 text-gray-700">
            <button onClick={onPrev} className="p-1 rounded hover:bg-gray-100 text-gray-800" aria-label="Previous line"><SkipBack className="h-4 w-4 text-gray-600" /></button>
            <button onClick={onPlayPause} className="p-1 rounded hover:bg-gray-100 text-gray-800" aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? <Pause className="h-4 w-4 text-gray-600" /> : <Play className="h-4 w-4 text-gray-600" />}
            </button>
            <button onClick={onNext} className="p-1 rounded hover:bg-gray-100 text-gray-800" aria-label="Next line"><SkipForward className="h-4 w-4 text-gray-600" /></button>
            <button onClick={onReset} className="p-1 rounded hover:bg-gray-100 text-gray-800" aria-label="Reset"><RotateCcw className="h-4 w-4 text-gray-600" /></button>
            <select
              aria-label="Playback speed"
              className="ml-1 text-xs border border-gray-200 rounded px-1 py-0.5 text-gray-600 bg-white"
              value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </div>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{languageLabel}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 px-2 py-1 rounded hover:bg-gray-100"
            aria-label="Copy pseudocode"
          >
            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4 text-gray-700" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
      <div className="relative text-gray-700">
        {/* Animated highlight bar */}
        <div
          className="pointer-events-none absolute left-0 right-0 h-6 transition-all duration-300 ease-out text-gray-700"
          style={{
            top: cursor > 0 ? `${(cursor - 1) * 24}px` : '-9999px',
            background:
              'linear-gradient(90deg, rgba(236,72,153,0.10) 0%, rgba(236,72,153,0.06) 30%, rgba(236,72,153,0.03) 100%)',
          }}
        />
        <pre className="m-0 p-0 overflow-auto text-gray-700">
          <code className="grid grid-cols-[auto_1fr] text-sm leading-6 text-gray-600">
            {lines.map((ln, i) => (
              <div key={i} className="contents text-gray-700">
                <span className={`select-none text-right pr-3 pl-4 border-r border-gray-200 bg-gray-50 ${cursor === i + 1 ? 'text-pink-600 font-semibold' : 'text-gray-400'}`}>
                  {i + 1}
                </span>
                <span className={`whitespace-pre pl-4 pr-4 font-mono ${cursor === i + 1 ? 'text-gray-900' : 'text-gray-800'}`}>
                  {ln.length ? ln : ' '}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
