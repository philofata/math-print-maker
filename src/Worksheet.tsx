// Worksheet.tsx
// A4 print layout — supports both math and social studies subjects

import React from 'react';
import { Problem } from './types';
import { ProblemFigure } from './Figures';

interface WorksheetProps {
  problems: Problem[];
  subject: 'math' | 'social';
}

// ── Subject config ─────────────────────────────────────────────────────────

const SUBJECT_CONFIG = {
  math: {
    label: '中1 数学',
    questionTitle: '数学の学習 テスト',
    questionSubtitle: '平面図形・空間図形',
    answerSubtitle: '平面図形・空間図形',
    pageRef: 'P94〜',
    questionAccent: 'border-indigo-600',
    answerAccent: 'border-emerald-600',
    badgeColor: 'bg-indigo-600',
    answerBadgeColor: 'bg-emerald-600',
    titleColor: 'text-indigo-600',
    answerTitleColor: 'text-emerald-600',
    answerBg: 'bg-emerald-50 border-emerald-200',
    footerQ: '※作図問題は定規とコンパスを使い、作図の跡を残すこと。',
    footerA: 'まちがえた問題は、解説を読んで「なぜそうなるか」を確認しよう！',
  },
  social: {
    label: '中1 社会（歴史）',
    questionTitle: '社会の学習 テスト',
    questionSubtitle: '歴史①（古代までの日本）',
    answerSubtitle: '歴史①（古代までの日本）',
    pageRef: 'P2〜31',
    questionAccent: 'border-amber-500',
    answerAccent: 'border-orange-500',
    badgeColor: 'bg-amber-500',
    answerBadgeColor: 'bg-orange-500',
    titleColor: 'text-amber-600',
    answerTitleColor: 'text-orange-600',
    answerBg: 'bg-orange-50 border-orange-200',
    footerQ: '※キーワードはしっかり漢字で書くこと。人名・地名の漢字に注意！',
    footerA: '時代の流れを意識して、前後のつながりで覚えよう！',
  },
};

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

// ── Problem card (question sheet) ─────────────────────────────────────────

const ProblemCard: React.FC<{ problem: Problem; index: number; cfg: typeof SUBJECT_CONFIG['math'] }> = ({ problem, index, cfg }) => {
  const isConstruction = ['perpendicular_bisector', 'midpoint_construction'].includes(problem.id);
  const subQuestions = problem.questionText.slice(1).filter(q => q.startsWith('('));
  const hasFigure = !problem.noFigure;

  return (
    <div className="mb-5 pb-4 border-b border-slate-200 last:border-b-0">
      {/* Top row: number badge + title */}
      <div className="flex items-center gap-2 mb-2">
        <div
          className={`flex-shrink-0 w-6 h-6 rounded-full ${cfg.badgeColor} text-white flex items-center justify-center font-bold text-xs`}
          style={{ minWidth: '1.5rem' }}>
          {index + 1}
        </div>
        <div className={`text-xs font-bold ${cfg.titleColor} tracking-wide`}>
          {problem.title}
        </div>
      </div>

      {/* Content */}
      <div className={`${hasFigure ? 'flex gap-4' : ''} items-start ml-8`}>
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
          {/* Social: free-answer box */}
          {problem.subject === 'social' && subQuestions.length === 0 && (
            <div className="mt-2 border border-slate-300 rounded h-12 bg-white" />
          )}
        </div>

        {/* Figure (math only) */}
        {hasFigure && (
          <div className="flex-shrink-0 border border-slate-200 rounded-lg bg-slate-50 p-1.5">
            <ProblemFigure problem={problem} isAnswer={false} />
          </div>
        )}
      </div>
    </div>
  );
};

// ── Answer card (answer sheet) ────────────────────────────────────────────

const AnswerCard: React.FC<{ problem: Problem; index: number; cfg: typeof SUBJECT_CONFIG['math'] }> = ({ problem, index, cfg }) => {
  const hasFigure = !problem.noFigure;

  return (
    <div className="mb-4 pb-3 border-b border-slate-200 last:border-b-0">
      {/* Header row */}
      <div className="flex items-center gap-2 mb-2">
        <div
          className={`flex-shrink-0 w-6 h-6 rounded-full ${cfg.answerBadgeColor} text-white flex items-center justify-center font-bold text-xs`}
          style={{ minWidth: '1.5rem' }}>
          {index + 1}
        </div>
        <div className={`text-xs font-bold ${cfg.answerTitleColor} tracking-wide`}>{problem.title}</div>
      </div>

      {/* Body */}
      <div className={`${hasFigure ? 'flex gap-3' : ''} ml-8 items-start`}>
        {/* Figure (math only) */}
        {hasFigure && (
          <div className={`flex-shrink-0 border rounded-lg p-1 ${cfg.answerBg}`}>
            <ProblemFigure problem={problem} isAnswer={true} />
          </div>
        )}

        {/* Text columns */}
        <div className={`${hasFigure ? 'flex-1 min-w-0' : 'w-full'} grid grid-cols-2 gap-3`}>
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
};

// ── Main Worksheet ─────────────────────────────────────────────────────────

const Worksheet: React.FC<WorksheetProps> = ({ problems, subject }) => {
  const cfg = SUBJECT_CONFIG[subject];
  const today = new Date();
  const dateStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

  return (
    <div id="worksheet-root">
      {/* ── Page 1: Question sheet ── */}
      <div className="worksheet-page">
        <div className={`border-b-2 ${cfg.questionAccent} pb-3 mb-4`}>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs text-slate-500 font-medium tracking-widest mb-0.5">{cfg.label}</div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">{cfg.questionTitle}</h1>
              <div className={`text-sm ${cfg.titleColor} font-medium mt-0.5`}>{cfg.questionSubtitle}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">{dateStr}</div>
              <div className="text-xs text-slate-400 mt-0.5">{cfg.pageRef}</div>
            </div>
          </div>
        </div>

        <NameFields />

        <div>
          {problems.map((problem, index) => (
            <ProblemCard key={`${problem.id}-${index}`} problem={problem} index={index} cfg={cfg} />
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 text-center text-xs text-slate-400">
          {cfg.footerQ}
        </div>
      </div>

      {/* ── Page 2: Answer sheet ── */}
      <div className="worksheet-page">
        <div className={`border-b-2 ${cfg.answerAccent} pb-3 mb-4`}>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs text-slate-500 font-medium tracking-widest mb-0.5">{cfg.label}</div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">解答・解説</h1>
              <div className={`text-sm ${cfg.answerTitleColor} font-medium mt-0.5`}>{cfg.answerSubtitle}</div>
            </div>
            <div className={`border rounded-lg px-3 py-1 text-xs font-medium ${cfg.answerBg} ${cfg.answerTitleColor}`}>
              {cfg.pageRef} 対応
            </div>
          </div>
        </div>

        <div>
          {problems.map((problem, index) => (
            <AnswerCard key={`${problem.id}-${index}-ans`} problem={problem} index={index} cfg={cfg} />
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 text-center text-xs text-slate-400">
          {cfg.footerA}
        </div>
      </div>
    </div>
  );
};

export default Worksheet;
