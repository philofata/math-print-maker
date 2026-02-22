// Figures.tsx
// SVG figure components for each problem type

import React from 'react';
import { Problem } from './mathGenerator';

interface FigureProps {
  problem: Problem;
  isAnswer?: boolean;
}

// ── Helper components ──────────────────────────────────────────────────────

const Label: React.FC<{ x: number; y: number; text: string; fontSize?: number; color?: string; fontWeight?: string }> = ({
  x, y, text, fontSize = 12, color = '#1e293b', fontWeight = 'normal'
}) => (
  <text x={x} y={y} fontSize={fontSize} fill={color} fontFamily="serif" fontWeight={fontWeight} textAnchor="middle" dominantBaseline="central">
    {text}
  </text>
);

const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; color?: string }> = ({
  x1, y1, x2, y2, color = '#4f46e5'
}) => {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const arrowSize = 8;
  const ax = x2 - arrowSize * Math.cos(angle - 0.4);
  const ay = y2 - arrowSize * Math.sin(angle - 0.4);
  const bx = x2 - arrowSize * Math.cos(angle + 0.4);
  const by = y2 - arrowSize * Math.sin(angle + 0.4);
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1.5} />
      <polygon points={`${x2},${y2} ${ax},${ay} ${bx},${by}`} fill={color} />
    </g>
  );
};

// ── 1. 垂直二等分線 ────────────────────────────────────────────────────────

export const PerpendicularBisectorFigure: React.FC<FigureProps> = ({ problem, isAnswer }) => {
  const params = problem.figureParams as { lengthLabel: string };
  const ax = 30, ay = 90, bx = 170, by = 90;
  const mx = (ax + bx) / 2, my = (ay + by) / 2;

  return (
    <svg viewBox="0 0 200 180" width="200" height="180" style={{ display: 'block', margin: '0 auto' }}>
      {/* Construction arcs (answer only) */}
      {isAnswer && (
        <g className="construction">
          <circle cx={ax} cy={ay} r={80} stroke="#93c5fd" strokeWidth={1} fill="none" strokeDasharray="4 3" />
          <circle cx={bx} cy={by} r={80} stroke="#93c5fd" strokeWidth={1} fill="none" strokeDasharray="4 3" />
          {/* Perpendicular bisector line */}
          <line x1={mx} y1={10} x2={mx} y2={170} stroke="#4f46e5" strokeWidth={1.5} strokeDasharray="5 3" />
          {/* Right angle mark */}
          <rect x={mx} y={my - 6} width={6} height={6} fill="none" stroke="#4f46e5" strokeWidth={1} />
          {/* Intersection points */}
          <circle cx={mx} cy={10} r={2} fill="#4f46e5" />
          <circle cx={mx} cy={170} r={2} fill="#4f46e5" />
          <Label x={mx + 10} y={15} text="P" fontSize={11} color="#4f46e5" />
          <Label x={mx + 10} y={168} text="Q" fontSize={11} color="#4f46e5" />
          {/* Tick marks showing equal halves */}
          <line x1={mx - 5} y1={my - 3} x2={mx - 5} y2={my + 3} stroke="#6366f1" strokeWidth={1.5} />
          <line x1={mx + 5} y1={my - 3} x2={mx + 5} y2={my + 3} stroke="#6366f1" strokeWidth={1.5} />
        </g>
      )}
      {/* Line segment AB */}
      <line x1={ax} y1={ay} x2={bx} y2={by} stroke="#1e293b" strokeWidth={2} />
      {/* Endpoints */}
      <circle cx={ax} cy={ay} r={3} fill="#1e293b" />
      <circle cx={bx} cy={by} r={3} fill="#1e293b" />
      {/* Labels */}
      <Label x={ax - 12} y={ay} text="A" fontSize={13} fontWeight="bold" />
      <Label x={bx + 12} y={by} text="B" fontSize={13} fontWeight="bold" />
      {/* Length label */}
      <Label x={mx} y={ay + 16} text={params.lengthLabel} fontSize={10} color="#64748b" />
    </svg>
  );
};

// ── 2. 平行移動 ────────────────────────────────────────────────────────────

export const ParallelTranslationFigure: React.FC<FigureProps> = ({ problem, isAnswer }) => {
  const params = problem.figureParams as { dx: number; dy: number };
  // Triangle ABC (original)
  const A = { x: 30, y: 140 };
  const B = { x: 80, y: 50 };
  const C = { x: 110, y: 140 };
  // Translation vector (scaled for SVG)
  const scale = 18;
  const tx = (params.dx > 0 ? 2 : -2) * scale;
  const ty = (params.dy > 0 ? 1 : -1) * scale;
  // Triangle PQR (translated)
  const P = { x: A.x + tx, y: A.y + ty };
  const Q = { x: B.x + tx, y: B.y + ty };
  const R = { x: C.x + tx, y: C.y + ty };
  // Arrow KL
  const Kx = 15, Ky = 170, Lx = Kx + tx, Ly = Ky + ty;

  return (
    <svg viewBox="0 0 230 200" width="220" height="190" style={{ display: 'block', margin: '0 auto' }}>
      {/* Answer: connection lines */}
      {isAnswer && (
        <g>
          <line x1={A.x} y1={A.y} x2={P.x} y2={P.y} stroke="#93c5fd" strokeWidth={1} strokeDasharray="3 2" />
          <line x1={B.x} y1={B.y} x2={Q.x} y2={Q.y} stroke="#93c5fd" strokeWidth={1} strokeDasharray="3 2" />
          <line x1={C.x} y1={C.y} x2={R.x} y2={R.y} stroke="#93c5fd" strokeWidth={1} strokeDasharray="3 2" />
        </g>
      )}
      {/* Original triangle ABC */}
      <polygon
        points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
        fill="rgba(99,102,241,0.08)" stroke="#4f46e5" strokeWidth={2} />
      <Label x={A.x - 12} y={A.y + 3} text="A" fontSize={12} fontWeight="bold" color="#4f46e5" />
      <Label x={B.x - 3} y={B.y - 12} text="B" fontSize={12} fontWeight="bold" color="#4f46e5" />
      <Label x={C.x + 12} y={C.y + 3} text="C" fontSize={12} fontWeight="bold" color="#4f46e5" />

      {/* Translated triangle PQR */}
      <polygon
        points={`${P.x},${P.y} ${Q.x},${Q.y} ${R.x},${R.y}`}
        fill="rgba(239,68,68,0.06)" stroke="#dc2626" strokeWidth={2} />
      <Label x={P.x - 12} y={P.y + 3} text="P" fontSize={12} fontWeight="bold" color="#dc2626" />
      <Label x={Q.x - 3} y={Q.y - 12} text="Q" fontSize={12} fontWeight="bold" color="#dc2626" />
      <Label x={R.x + 12} y={R.y + 3} text="R" fontSize={12} fontWeight="bold" color="#dc2626" />

      {/* Arrow KL */}
      <Arrow x1={Kx} y1={Ky} x2={Lx} y2={Ly} color="#059669" />
      <Label x={Kx - 8} y={Ky} text="K" fontSize={11} color="#059669" fontWeight="bold" />
      <Label x={Lx + 8} y={Ly} text="L" fontSize={11} color="#059669" fontWeight="bold" />
    </svg>
  );
};

// ── 3. 回転移動 ────────────────────────────────────────────────────────────

export const RotationFigure: React.FC<FigureProps> = ({ problem, isAnswer }) => {
  const params = problem.figureParams as { angle: number; dir: string };
  const rad = (params.angle * Math.PI) / 180 * (params.dir === '反時計回り' ? 1 : -1);
  const Ox = 110, Oy = 110;

  // Original triangle vertices (relative to O)
  const rA = 70, angA = -Math.PI / 2 - 0.2;
  const rB = 55, angB = Math.PI + 0.3;
  const rC = 65, angC = -0.15;

  const A = { x: Ox + rA * Math.cos(angA), y: Oy + rA * Math.sin(angA) };
  const B = { x: Ox + rB * Math.cos(angB), y: Oy + rB * Math.sin(angB) };
  const C = { x: Ox + rC * Math.cos(angC), y: Oy + rC * Math.sin(angC) };

  const rotate = (pt: { x: number; y: number }) => ({
    x: Ox + (pt.x - Ox) * Math.cos(rad) - (pt.y - Oy) * Math.sin(rad),
    y: Oy + (pt.x - Ox) * Math.sin(rad) + (pt.y - Oy) * Math.cos(rad),
  });

  const P = rotate(A), Q = rotate(B), R = rotate(C);

  // Arc for rotation angle
  const arcRad = 35;
  const startAngle = angA;
  const endAngle = startAngle + rad;
  const arcX1 = Ox + arcRad * Math.cos(startAngle);
  const arcY1 = Oy + arcRad * Math.sin(startAngle);
  const arcX2 = Ox + arcRad * Math.cos(endAngle);
  const arcY2 = Oy + arcRad * Math.sin(endAngle);
  const largeArc = Math.abs(params.angle) > 180 ? 1 : 0;
  const sweep = params.dir === '反時計回り' ? 1 : 0;

  return (
    <svg viewBox="0 0 220 220" width="210" height="210" style={{ display: 'block', margin: '0 auto' }}>
      {/* Rotation arc (answer) */}
      {isAnswer && (
        <g>
          <path
            d={`M ${arcX1} ${arcY1} A ${arcRad} ${arcRad} 0 ${largeArc} ${sweep} ${arcX2} ${arcY2}`}
            stroke="#f59e0b" strokeWidth={1.5} fill="none" strokeDasharray="4 2" />
          <line x1={Ox} y1={Oy} x2={A.x} y2={A.y} stroke="#93c5fd" strokeWidth={1} strokeDasharray="3 2" />
          <line x1={Ox} y1={Oy} x2={B.x} y2={B.y} stroke="#93c5fd" strokeWidth={1} strokeDasharray="3 2" />
          <line x1={Ox} y1={Oy} x2={C.x} y2={C.y} stroke="#93c5fd" strokeWidth={1} strokeDasharray="3 2" />
          <line x1={Ox} y1={Oy} x2={P.x} y2={P.y} stroke="#93c5fd" strokeWidth={1} strokeDasharray="3 2" />
          <line x1={Ox} y1={Oy} x2={Q.x} y2={Q.y} stroke="#93c5fd" strokeWidth={1} strokeDasharray="3 2" />
          <line x1={Ox} y1={Oy} x2={R.x} y2={R.y} stroke="#93c5fd" strokeWidth={1} strokeDasharray="3 2" />
          <text x={Ox + arcRad * 0.6 * Math.cos((startAngle + endAngle) / 2) + 4}
            y={Oy + arcRad * 0.6 * Math.sin((startAngle + endAngle) / 2)}
            fontSize={9} fill="#d97706">{params.angle}°</text>
        </g>
      )}
      {/* Center O */}
      <circle cx={Ox} cy={Oy} r={3} fill="#374151" />
      <Label x={Ox + 10} y={Oy + 5} text="O" fontSize={11} fontWeight="bold" />

      {/* Original triangle ABC */}
      <polygon
        points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
        fill="rgba(99,102,241,0.08)" stroke="#4f46e5" strokeWidth={2} />
      <Label x={A.x} y={A.y - 12} text="A" fontSize={12} fontWeight="bold" color="#4f46e5" />
      <Label x={B.x - 13} y={B.y} text="B" fontSize={12} fontWeight="bold" color="#4f46e5" />
      <Label x={C.x + 10} y={C.y} text="C" fontSize={12} fontWeight="bold" color="#4f46e5" />

      {/* Rotated triangle PQR */}
      <polygon
        points={`${P.x},${P.y} ${Q.x},${Q.y} ${R.x},${R.y}`}
        fill="rgba(239,68,68,0.06)" stroke="#dc2626" strokeWidth={2} />
      <Label x={P.x} y={P.y - 12} text="P" fontSize={12} fontWeight="bold" color="#dc2626" />
      <Label x={Q.x - 13} y={Q.y} text="Q" fontSize={12} fontWeight="bold" color="#dc2626" />
      <Label x={R.x + 10} y={R.y} text="R" fontSize={12} fontWeight="bold" color="#dc2626" />
    </svg>
  );
};

// ── 4. 対称移動 ────────────────────────────────────────────────────────────

export const SymmetricFigure: React.FC<FigureProps> = ({ problem, isAnswer }) => {
  const params = problem.figureParams as { dist: number; targetPair: string };
  // Symmetric axis ℓ (vertical line at x=115)
  const axisX = 115;

  // Triangle ABC (left of axis)
  const A = { x: 55, y: 60 };
  const B = { x: 30, y: 140 };
  const C = { x: 95, y: 140 };

  // Reflected (mirrored across vertical axis at axisX)
  const reflect = (pt: { x: number; y: number }) => ({ x: 2 * axisX - pt.x, y: pt.y });
  const P = reflect(A), Q = reflect(B), R = reflect(C);

  // Midpoints on axis
  const MA = { x: axisX, y: A.y };

  return (
    <svg viewBox="0 0 230 200" width="220" height="190" style={{ display: 'block', margin: '0 auto' }}>
      {/* Symmetric axis */}
      <line x1={axisX} y1={10} x2={axisX} y2={190} stroke="#374151" strokeWidth={1.5} />
      <Label x={axisX + 8} y={18} text="ℓ" fontSize={14} fontWeight="bold" />

      {/* Answer: perpendicular lines and midpoints */}
      {isAnswer && (
        <g>
          {/* AP perpendicular line with midpoint */}
          <line x1={A.x} y1={A.y} x2={P.x} y2={P.y} stroke="#93c5fd" strokeWidth={1} strokeDasharray="3 2" />
          <line x1={B.x} y1={B.y} x2={Q.x} y2={Q.y} stroke="#93c5fd" strokeWidth={1} strokeDasharray="3 2" />
          <line x1={C.x} y1={C.y} x2={R.x} y2={R.y} stroke="#93c5fd" strokeWidth={1} strokeDasharray="3 2" />
          {/* Midpoint M on axis */}
          <circle cx={MA.x} cy={MA.y} r={2.5} fill="#f59e0b" />
          <Label x={MA.x + 8} y={MA.y} text="M" fontSize={10} color="#d97706" />
          {/* Right angle marks */}
          <rect x={axisX} y={A.y - 6} width={6} height={6} fill="none" stroke="#6366f1" strokeWidth={1} />
          {/* Tick marks */}
          <line x1={(A.x + MA.x) / 2} y1={A.y - 4} x2={(A.x + MA.x) / 2} y2={A.y + 4} stroke="#6366f1" strokeWidth={1.5} />
          <line x1={(MA.x + P.x) / 2} y1={A.y - 4} x2={(MA.x + P.x) / 2} y2={A.y + 4} stroke="#6366f1" strokeWidth={1.5} />
          <text x={axisX - 25} y={A.y - 10} fontSize={8} fill="#6366f1">{params.dist}cm</text>
          <text x={axisX + 8} y={A.y - 10} fontSize={8} fill="#6366f1">{params.dist}cm</text>
        </g>
      )}

      {/* Triangle ABC */}
      <polygon
        points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
        fill="rgba(99,102,241,0.08)" stroke="#4f46e5" strokeWidth={2} />
      <Label x={A.x - 12} y={A.y} text="A" fontSize={12} fontWeight="bold" color="#4f46e5" />
      <Label x={B.x - 12} y={B.y} text="B" fontSize={12} fontWeight="bold" color="#4f46e5" />
      <Label x={C.x - 10} y={C.y + 13} text="C" fontSize={12} fontWeight="bold" color="#4f46e5" />

      {/* Reflected triangle PQR */}
      <polygon
        points={`${P.x},${P.y} ${Q.x},${Q.y} ${R.x},${R.y}`}
        fill="rgba(239,68,68,0.06)" stroke="#dc2626" strokeWidth={2} />
      <Label x={P.x + 12} y={P.y} text="P" fontSize={12} fontWeight="bold" color="#dc2626" />
      <Label x={Q.x + 12} y={Q.y} text="Q" fontSize={12} fontWeight="bold" color="#dc2626" />
      <Label x={R.x + 10} y={R.y + 13} text="R" fontSize={12} fontWeight="bold" color="#dc2626" />
    </svg>
  );
};

// ── 5. 中点の作図 ─────────────────────────────────────────────────────────

export const MidpointConstructionFigure: React.FC<FigureProps> = ({ problem, isAnswer }) => {
  const params = problem.figureParams as { sideLabel: string; midLabel: string };
  // Triangle ABC
  const A = { x: 100, y: 30 };
  const B = { x: 30, y: 155 };
  const C = { x: 175, y: 155 };
  // Midpoint of target side
  const getMidpoint = () => {
    if (params.sideLabel === 'BC') return { x: (B.x + C.x) / 2, y: (B.y + C.y) / 2, p1: B, p2: C };
    if (params.sideLabel === 'AC') return { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2, p1: A, p2: C };
    return { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2, p1: A, p2: B };
  };
  const mid = getMidpoint();
  const Mx = mid.x, My = mid.y;
  const p1 = mid.p1, p2 = mid.p2;

  // Perpendicular bisector direction
  const dx = p2.x - p1.x, dy = p2.y - p1.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = -dy / len, ny = dx / len;
  const ext = 60;

  return (
    <svg viewBox="0 0 210 200" width="200" height="190" style={{ display: 'block', margin: '0 auto' }}>
      {/* Answer: construction arcs and perpendicular bisector */}
      {isAnswer && (
        <g>
          <circle cx={p1.x} cy={p1.y} r={70} stroke="#93c5fd" strokeWidth={1} fill="none" strokeDasharray="4 3" />
          <circle cx={p2.x} cy={p2.y} r={70} stroke="#93c5fd" strokeWidth={1} fill="none" strokeDasharray="4 3" />
          {/* Perpendicular bisector */}
          <line
            x1={Mx - nx * ext} y1={My - ny * ext}
            x2={Mx + nx * ext} y2={My + ny * ext}
            stroke="#4f46e5" strokeWidth={1.5} strokeDasharray="5 3" />
          {/* Midpoint */}
          <circle cx={Mx} cy={My} r={3} fill="#dc2626" />
          <Label x={Mx + (ny > 0 ? 12 : -12)} y={My + (nx > 0 ? -12 : 12)} text={params.midLabel} fontSize={12} color="#dc2626" fontWeight="bold" />
          {/* Right angle mark */}
          <rect x={Mx - 5} y={My - 5} width={6} height={6} fill="none" stroke="#4f46e5" strokeWidth={1}
            transform={`rotate(${Math.atan2(dy, dx) * 180 / Math.PI}, ${Mx}, ${My})`} />
          {/* Tick marks */}
          <line
            x1={(p1.x + Mx) / 2 + nx * 4} y1={(p1.y + My) / 2 + ny * 4}
            x2={(p1.x + Mx) / 2 - nx * 4} y2={(p1.y + My) / 2 - ny * 4}
            stroke="#6366f1" strokeWidth={1.5} />
          <line
            x1={(Mx + p2.x) / 2 + nx * 4} y1={(My + p2.y) / 2 + ny * 4}
            x2={(Mx + p2.x) / 2 - nx * 4} y2={(My + p2.y) / 2 - ny * 4}
            stroke="#6366f1" strokeWidth={1.5} />
        </g>
      )}
      {/* Triangle ABC */}
      <polygon
        points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
        fill="rgba(99,102,241,0.06)" stroke="#1e293b" strokeWidth={2} />
      <Label x={A.x} y={A.y - 12} text="A" fontSize={13} fontWeight="bold" color="#1e293b" />
      <Label x={B.x - 13} y={B.y + 5} text="B" fontSize={13} fontWeight="bold" color="#1e293b" />
      <Label x={C.x + 13} y={C.y + 5} text="C" fontSize={13} fontWeight="bold" color="#1e293b" />

      {/* Target side highlight */}
      {!isAnswer && (
        <line
          x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
          stroke="#dc2626" strokeWidth={2.5} opacity={0.5} />
      )}
    </svg>
  );
};

// ── Figure dispatcher ──────────────────────────────────────────────────────

export const ProblemFigure: React.FC<FigureProps> = ({ problem, isAnswer = false }) => {
  switch (problem.id) {
    case 'perpendicular_bisector':
      return <PerpendicularBisectorFigure problem={problem} isAnswer={isAnswer} />;
    case 'parallel_translation':
      return <ParallelTranslationFigure problem={problem} isAnswer={isAnswer} />;
    case 'rotation':
      return <RotationFigure problem={problem} isAnswer={isAnswer} />;
    case 'symmetric':
      return <SymmetricFigure problem={problem} isAnswer={isAnswer} />;
    case 'midpoint_construction':
      return <MidpointConstructionFigure problem={problem} isAnswer={isAnswer} />;
    default:
      return null;
  }
};
