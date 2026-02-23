// App.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Printer, RefreshCw, Share2, X, Copy, Check, BookOpen, Calculator, Globe } from 'lucide-react';
import { Problem, Subject } from './types';
import { generateProblems } from './mathGenerator';
import { generateSocialProblems } from './socialGenerator';
import Worksheet from './Worksheet';

// ── Share Modal ───────────────────────────────────────────────────────────

interface ShareModalProps {
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ onClose }) => {
  const [urlCopied, setUrlCopied] = useState(false);
  const [msgCopied, setMsgCopied] = useState(false);
  const currentUrl = window.location.href;
  const shareMessage = `パソコンでGoogleログインすれば使えると思います\n${currentUrl}`;

  const copyText = async (text: string, setter: (v: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setter(true);
      setTimeout(() => setter(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">プリントを共有する</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <div className="text-sm font-medium text-slate-600 mb-2">共有URL</div>
          <div className="flex gap-2">
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 truncate font-mono">
              {currentUrl}
            </div>
            <button
              onClick={() => copyText(currentUrl, setUrlCopied)}
              className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${urlCopied ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
              {urlCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {urlCopied ? 'コピー済' : 'コピー'}
            </button>
          </div>
        </div>

        <div className="mb-5">
          <div className="text-sm font-medium text-slate-600 mb-2">メッセージテンプレート</div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-700 whitespace-pre-line leading-relaxed font-mono">
            {shareMessage}
          </div>
          <button
            onClick={() => copyText(shareMessage, setMsgCopied)}
            className={`mt-2 w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${msgCopied ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
            {msgCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {msgCopied ? 'コピー済！' : 'メッセージをコピー'}
          </button>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700">
          <div className="font-medium mb-0.5">使い方のヒント</div>
          LINEやSlackなどに貼り付けて共有できます。問題はアクセスするたびにランダムで変わります。
        </div>
      </div>
    </div>
  );
};

// ── Subject Selector Tab ─────────────────────────────────────────────────

interface SubjectTabProps {
  subject: Subject;
  current: Subject;
  label: string;
  icon: React.ReactNode;
  activeClass: string;
  onClick: () => void;
}

const SubjectTab: React.FC<SubjectTabProps> = ({ subject, current, label, icon, activeClass, onClick }) => {
  const isActive = subject === current;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
        isActive
          ? `${activeClass} text-white shadow-sm`
          : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300 hover:text-slate-700'
      }`}>
      {icon}
      {label}
    </button>
  );
};

// ── Main App ──────────────────────────────────────────────────────────────

const App: React.FC = () => {
  const [subject, setSubject] = useState<Subject>('math');
  const [problems, setProblems] = useState<Problem[]>(() => generateProblems());
  const [showShareModal, setShowShareModal] = useState(false);
  const [scale, setScale] = useState(1);
  const [regenerating, setRegenerating] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const A4_W = 794;
  const A4_H = 1123;

  const updateScale = useCallback(() => {
    const available = window.innerWidth - 32;
    setScale(Math.min(1, available / A4_W));
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [updateScale]);

  // Generate problems when subject changes
  const handleSubjectChange = (newSubject: Subject) => {
    if (newSubject === subject) return;
    setRegenerating(true);
    setTimeout(() => {
      setSubject(newSubject);
      setProblems(newSubject === 'math' ? generateProblems() : generateSocialProblems());
      setRegenerating(false);
    }, 250);
  };

  const handleRegenerate = () => {
    setRegenerating(true);
    setTimeout(() => {
      setProblems(subject === 'math' ? generateProblems() : generateSocialProblems());
      setRegenerating(false);
    }, 300);
  };

  const scaledW = A4_W * scale;
  const scaledH = (A4_H * 2 + 24) * scale;

  // Subject-specific accent colors
  const accentBtn = subject === 'math'
    ? 'bg-indigo-600 hover:bg-indigo-700'
    : 'bg-amber-500 hover:bg-amber-600';

  return (
    <div className="min-h-screen bg-slate-100">
      {/* ── Header ── */}
      <header className="no-print sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          {/* Row 1: Title + Actions */}
          <div className="flex items-center justify-between gap-3">
            {/* Title */}
            <div className="flex items-center gap-2 min-w-0">
              <div className={`text-white rounded-lg p-1.5 flex-shrink-0 transition-colors ${subject === 'math' ? 'bg-indigo-600' : 'bg-amber-500'}`}>
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h1 className="text-base font-bold text-slate-900 leading-tight truncate">
                  まなびプリントメーカー
                </h1>
                <p className="text-xs text-slate-500 leading-none hidden sm:block">
                  {subject === 'math' ? '中1 数学 ・ 平面図形・空間図形' : '中1 社会（歴史） ・ 古代までの日本'}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">共有する</span>
              </button>

              <button
                onClick={handleRegenerate}
                disabled={regenerating}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white rounded-lg transition-all disabled:opacity-60 ${accentBtn}`}>
                <RefreshCw className={`w-4 h-4 ${regenerating ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">問題を再生成</span>
              </button>

              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-slate-700 rounded-lg hover:bg-slate-800 transition-all">
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">PDF保存 / 印刷</span>
              </button>
            </div>
          </div>

          {/* Row 2: Subject selector tabs */}
          <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t border-slate-100">
            <span className="text-xs text-slate-400 font-medium mr-1 hidden sm:inline">教科を選ぶ：</span>
            <SubjectTab
              subject="math"
              current={subject}
              label="数学"
              icon={<Calculator className="w-3.5 h-3.5" />}
              activeClass="bg-indigo-600"
              onClick={() => handleSubjectChange('math')}
            />
            <SubjectTab
              subject="social"
              current={subject}
              label="社会（歴史）"
              icon={<Globe className="w-3.5 h-3.5" />}
              activeClass="bg-amber-500"
              onClick={() => handleSubjectChange('social')}
            />
            <span className="text-xs text-slate-400 ml-auto hidden sm:inline">
              ボタンを押すたびに新しい問題が生成されます
            </span>
          </div>
        </div>
      </header>

      {/* ── Worksheet area ── */}
      <main className="no-print py-8 flex justify-center" ref={wrapperRef}>
        <div style={{ width: scaledW, height: scaledH, position: 'relative' }}>
          <div
            ref={sheetRef}
            style={{
              width: A4_W,
              transformOrigin: 'top left',
              transform: `scale(${scale})`,
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: regenerating ? 0.4 : 1,
              transition: 'opacity 0.25s',
            }}>
            <Worksheet problems={problems} subject={subject} />
          </div>
        </div>
      </main>

      {/* ── Print-only area ── */}
      <div className="print-container hidden">
        <Worksheet problems={problems} subject={subject} />
      </div>

      {/* ── Share Modal ── */}
      {showShareModal && <ShareModal onClose={() => setShowShareModal(false)} />}
    </div>
  );
};

export default App;
