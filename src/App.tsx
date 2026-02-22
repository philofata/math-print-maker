// App.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Printer, RefreshCw, Share2, X, Copy, Check, BookOpen } from 'lucide-react';
import { generateProblems, Problem } from './mathGenerator';
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
      // fallback
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
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">プリントを共有する</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* URL section */}
        <div className="mb-4">
          <div className="text-sm font-medium text-slate-600 mb-2">共有URL</div>
          <div className="flex gap-2">
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 truncate font-mono">
              {currentUrl}
            </div>
            <button
              onClick={() => copyText(currentUrl, setUrlCopied)}
              className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                urlCopied
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}>
              {urlCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {urlCopied ? 'コピー済' : 'コピー'}
            </button>
          </div>
        </div>

        {/* Message template section */}
        <div className="mb-5">
          <div className="text-sm font-medium text-slate-600 mb-2">メッセージテンプレート</div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-700 whitespace-pre-line leading-relaxed font-mono">
            {shareMessage}
          </div>
          <button
            onClick={() => copyText(shareMessage, setMsgCopied)}
            className={`mt-2 w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${
              msgCopied
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}>
            {msgCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {msgCopied ? 'コピー済！' : 'メッセージをコピー'}
          </button>
        </div>

        {/* Hint */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700">
          <div className="font-medium mb-0.5">使い方のヒント</div>
          LINEやSlackなどに貼り付けて共有できます。問題はアクセスするたびにランダムで変わります。
        </div>
      </div>
    </div>
  );
};

// ── Main App ──────────────────────────────────────────────────────────────

const App: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>(() => generateProblems());
  const [showShareModal, setShowShareModal] = useState(false);
  const [scale, setScale] = useState(1);
  const [regenerating, setRegenerating] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Responsive scaling
  const updateScale = useCallback(() => {
    if (!wrapperRef.current) return;
    const containerWidth = wrapperRef.current.offsetWidth - 32; // padding
    const a4Width = 794; // 210mm in px at 96dpi
    const newScale = Math.min(1, containerWidth / a4Width);
    setScale(newScale);
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [updateScale]);

  const handleRegenerate = () => {
    setRegenerating(true);
    setTimeout(() => {
      setProblems(generateProblems());
      setRegenerating(false);
    }, 300);
  };

  const handlePrint = () => {
    window.print();
  };

  // Calculate scaled height to prevent overlap
  const a4HeightPx = 297 * (96 / 25.4); // ~1123px per page
  const scaledHeight = a4HeightPx * 2 * scale + 48; // 2 pages + margin

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Header ── */}
      <header className="no-print sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Title */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="bg-indigo-600 text-white rounded-lg p-1.5 flex-shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base font-bold text-slate-900 leading-tight truncate">
                数学プリントメーカー
              </h1>
              <p className="text-xs text-slate-500 leading-none hidden sm:block">中1 数学 ・ 平面図形（作図と移動）</p>
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
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all disabled:opacity-60 ${regenerating ? 'cursor-wait' : ''}`}>
              <RefreshCw className={`w-4 h-4 ${regenerating ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">問題を再生成</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-slate-700 rounded-lg hover:bg-slate-800 transition-all">
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">PDF保存 / 印刷</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Worksheet area ── */}
      <main className="no-print px-4 py-8" ref={wrapperRef}>
        <div
          className="worksheet-wrapper mx-auto"
          style={{ height: `${scaledHeight}px` }}>
          <div
            ref={sheetRef}
            className="worksheet-scaler"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              width: '794px', // 210mm at 96dpi
            }}>
            <Worksheet problems={problems} />
          </div>
        </div>
      </main>

      {/* ── Print-only area (no transform, full size) ── */}
      <div className="print-container hidden">
        <Worksheet problems={problems} />
      </div>

      {/* ── Share Modal ── */}
      {showShareModal && <ShareModal onClose={() => setShowShareModal(false)} />}
    </div>
  );
};

export default App;
