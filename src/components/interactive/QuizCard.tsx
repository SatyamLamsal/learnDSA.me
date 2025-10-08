"use client";
import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface QuizOption {
  id: string;
  label: string;
  correct?: boolean;
  explanation?: string;
}

interface QuizCardProps {
  question: string;
  options: QuizOption[];
  onResult?: (correct: boolean) => void;
  difficulty?: 'easy' | 'medium' | 'hard';
  compact?: boolean;
}

export const QuizCard: React.FC<QuizCardProps> = ({ question, options, onResult, difficulty='medium', compact=false }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);

  const choose = (id: string) => {
    if (submitted) return;
    setSelected(id);
  };

  const submit = () => {
    if (!selected) return;
    const isCorrect = !!options.find(o => o.id === selected && o.correct);
    setCorrect(isCorrect);
    setSubmitted(true);
    onResult?.(isCorrect);
  };

  const reset = () => {
    setSelected(null); setSubmitted(false); setCorrect(null);
  };

  const diffColor = difficulty === 'easy' ? 'bg-green-100 text-green-700' : difficulty === 'hard' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border p-5 bg-white shadow-sm ${compact ? 'text-sm' : ''}`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <h4 className={`font-semibold ${compact ? 'text-sm' : 'text-base'} text-gray-800 leading-snug`}>{question}</h4>
        <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${diffColor}`}>{difficulty.toUpperCase()}</span>
      </div>
      <div className="space-y-2 mb-4">
        {options.map(opt => {
          const isChosen = selected === opt.id;
          const isAnswer = submitted && opt.correct;
          const isWrongChoice = submitted && isChosen && !opt.correct;
          return (
            <button
              key={opt.id}
              disabled={submitted}
              onClick={() => choose(opt.id)}
              className={`w-full text-left px-4 py-3 rounded-lg border flex items-center gap-3 transition group ${
                isAnswer ? 'border-green-400 bg-green-50' : isWrongChoice ? 'border-red-400 bg-red-50' : isChosen ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <span className={`w-6 h-6 flex items-center justify-center text-xs font-semibold rounded-full border ${
                isAnswer ? 'bg-green-500 text-white border-green-500' : isWrongChoice ? 'bg-red-500 text-white border-red-500' : isChosen ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-gray-100 text-gray-600 border-gray-300'
              }`}>{opt.id}</span>
              <span className={`flex-1 ${isAnswer ? 'text-green-800' : isWrongChoice ? 'text-red-800' : 'text-gray-700'}`}>{opt.label}</span>
              {submitted && isAnswer && <CheckCircle2 className="w-5 h-5 text-green-600" />}
              {submitted && isWrongChoice && <XCircle className="w-5 h-5 text-red-600" />}
              {!submitted && <HelpCircle className="w-5 h-5 text-gray-300 group-hover:text-indigo-400" />}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        {!submitted && (
          <button
            disabled={!selected}
            onClick={submit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium disabled:opacity-40 hover:bg-indigo-700"
          >
            Submit
          </button>
        )}
        {submitted && (
          <>
            <span className={`text-sm font-medium ${correct ? 'text-green-600' : 'text-red-600'}`}>{correct ? 'Correct!' : 'Try again'}</span>
            <button onClick={reset} className="ml-auto flex items-center gap-1 px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded">
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </>
        )}
      </div>
      <AnimatePresence>
        {submitted && options.filter(o=>o.correct).map(o => o.explanation && (
          <motion.div
            key={o.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 text-xs bg-gray-50 border border-gray-200 p-3 rounded"
          >
            <strong className="block mb-1 text-gray-700">Explanation:</strong>
            <span className="text-gray-600 leading-relaxed">{o.explanation}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
