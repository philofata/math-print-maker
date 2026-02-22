// Worksheet.tsx
// A4 print layout component

import React from 'react';
import { Problem } from './mathGenerator';
import { ProblemFigure } from './Figures';

interface WorksheetProps {
  problems: Problem[];
}

// ── Name input fields ─────────────────────────────────────────────────────

const NameFields: React.FC = () => (
  <div className="flex gap-4 mb-6 text-sm">
    {['年', '組', '番'].map((label) => (
      <div key={label} className="flex items-center gap-1">
        <div className="border-b-2 border-slate-700 w-10 h-5" />
        <span className="text-slate-700 font-medium">{label}</span>
      </div>
    ))}
    <div className="flex items-center gap-1 flex-1">
      <span className="text-slate-700 font-medium whitespace-nowrap">氏名</span>
      <div className="border-b-2 border-slate-700 flex-1 h-5" />
    </div>
    <div className="flex items-center gap-1">
      <span className="text-slate-700 font-medium whitespace-nowrap">点数</span>
      <div className="border-2 border-slate-700 w-14 h-8 flex items-end justify-center">
        <span className="text-[10px] text-slate-400 mb-0.5">/100</span>
      </div>
    </div>
  </div>
);

// ── Single problem card ───────────────────────────────────────────────────

const ProblemCard: React.FC<{ problem: Problem; index: number }> = ({ problem, index }) => {
  const isConstruction = ['perpendicular_bisector', 'midpoint_construction'].includes(problem.id);
  const subQuestions = problem.questionText.slice(1).filter(q => q.startsWith('('));

  return (
    <div className="mb-5 pb-4 border-b border-slate-200 last:border-b-0">
      {/* Top row: number badge + title */}
      <div className="flex items-center gap-2 mb-2">
        <div
          className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs"
          style={{ minWidth: '1.5rem' }}>
          {index + 1}
        </div>
        <div className="text-xs font-bold text-indigo-600 tracking-wide">
          {problem.title}
        </div>
      </div>

      {/* Content: text left, figure right */}
      <div className="flex gap-4 items-start ml-8">
        <div className="flex-1 min-w-0">
          {/* Question text */}
          <div className="text-sm text-slate-800 leading-relaxed mb-2">
            {problem.questionText.map((line, i) => (
              <div key={i} className={i === 0 ? 'font-medium' : 'text-slate-600 mt-0.5'}>
                {line}
              </div>
            ))}
          </div>
          {/* Answer lines */}
          {!isConstruction && subQuestions.length > 0 && (
            <div className="space-y-1.5 mt-2">
              {subQuestions.map((_, i) => (
                <div key={i} className="flex items-center gap-1.5 text-sm">
                  <span className="text-slate-500 text-xs whitespace-nowrap">({i + 1})の答え：</span>
                  <div className="border-b border-slate-400 flex-1" style={{ height: '1.25rem' }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Figure */}
        <div className="flex-shrink-0 border border-slate-200 rounded-lg bg-slate-50 p-1.5">
          <ProblemFigure problem={problem} isAnswer={false} />
        </div>
      </div>
    </div>
  );
};

// ── Answer card ───────────────────────────────────────────────────────────

const AnswerCard: React.FC<{ problem: Problem; index: number }> = ({ problem, index }) => (
  <div className="mb-4 pb-3 border-b border-slate-200 last:border-b-0">
    {/* Header row */}
    <div className="flex items-center gap-2 mb-2">
      <div
        className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs"
        style={{ minWidth: '1.5rem' }}>
        {index + 1}
      </div>
      <div className="text-xs font-bold text-emerald-600 tracking-wide">{problem.title}</div>
    </div>

    {/* Body: figure | answer+explanation */}
    <div className="flex gap-3 ml-8 items-start">
      {/* Figure */}
      <div className="flex-shrink-0 border border-emerald-200 rounded-lg bg-emerald-50 p-1">
        <ProblemFigure problem={problem} isAnswer={true} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0 grid grid-cols-2 gap-3">
        {/* Answer */}
        <div>
          <div className="text-xs font-bold text-slate-500 mb-1 bg-slate-100 px-2 py-0.5 rounded inline-block">解答</div>
          <div className="text-xs text-slate-800 space-y-0.5">
            {problem.answerText.map((line, i) => (
              <div key={i} className={`leading-snug ${line.startsWith('•') ? 'text-slate-500' : 'font-semibold text-indigo-700'}`}>
                {line}
              </div>
            ))}
          </div>
        </div>
        {/* Explanation */}
        <div>
          <div className="text-xs font-bold text-amber-700 mb-1 bg-amber-50 px-2 py-0.5 rounded inline-block">
            超わかりやすい解説
          </div>
          <div className="text-xs text-slate-700 space-y-0.5 leading-relaxed">
            {problem.explanationText.map((line, i) => (
              <div key={i} className={
                line.startsWith('①') || line.startsWith('②') || line.startsWith('③') || line.startsWith('④')
                  ? 'text-indigo-700 font-medium'
                  : 'text-slate-600'
              }>
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ── Main Worksheet component ───────────────────────────────────────────────

const Worksheet: React.FC<WorksheetProps> = ({ problems }) => {
  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

  return (
    <div id="worksheet-root">
      {/* ── Page 1: Question sheet ── */}
      <div className="worksheet-page">
        {/* Header */}
        <div className="border-b-2 border-indigo-600 pb-3 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs text-slate-500 font-medium tracking-widest mb-0.5">中1 数学</div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">数学の学習 テスト</h1>
              <div className="text-sm text-indigo-600 font-medium mt-0.5">平面図形（作図と移動）</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">{dateStr}</div>
              <div className="text-xs text-slate-400 mt-0.5">P94〜100</div>
            </div>
          </div>
        </div>

        {/* Name fields */}
        <NameFields />

        {/* Problems */}
        <div>
          {problems.map((problem, index) => (
            <ProblemCard key={problem.id} problem={problem} index={index} />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-4 pt-3 border-t border-slate-100 text-center text-xs text-slate-400">
          ※作図問題は定規とコンパスを使い、作図の跡を残すこと。
        </div>
      </div>

      {/* ── Page 2: Answer sheet ── */}
      <div className="worksheet-page">
        {/* Header */}
        <div className="border-b-2 border-emerald-600 pb-3 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs text-slate-500 font-medium tracking-widest mb-0.5">中1 数学</div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">解答・解説</h1>
              <div className="text-sm text-emerald-600 font-medium mt-0.5">平面図形（作図と移動）</div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1 text-xs text-emerald-700 font-medium">
              教科書 P94〜100 対応
            </div>
          </div>
        </div>

        {/* Answer cards */}
        <div>
          {problems.map((problem, index) => (
            <AnswerCard key={problem.id} problem={problem} index={index} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 text-center text-xs text-slate-400">
          まちがえた問題は、解説を読んで「なぜそうなるか」を確認しよう！
        </div>
      </div>
    </div>
  );
};

export default Worksheet;
