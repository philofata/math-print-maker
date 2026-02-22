// Figures.tsx
// SVG figure components for all problem types

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
  const s = 8;
  const ax = x2 - s * Math.cos(angle - 0.4);
  const ay = y2 - s * Math.sin(angle - 0.4);
  const bx = x2 - s * Math.cos(angle + 0.4);
  const by = y2 - s * Math.sin(angle + 0.4);
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
      {isAnswer && (
        <g>
          <circle cx={ax} cy={ay} r={80} stroke="#93c5fd" strokeWidth={1} fill="none" strokeDasharray="4 3" />
          <circle cx={bx} cy={by} r={80} stroke="#93c5fd" strokeWidth={1} fill="none" strokeDasharray="4 3" />
          <line x1={mx} y1={10} x2={mx} y2={170} stroke="#4f46e5" strokeWidth={1.5} strokeDasharray="5 3" />
          <rect x={mx} y={my - 6} width={6} height={6} fill="none" stroke="#4f46e5" strokeWidth={1} />
          <circle cx={mx} cy={10} r={2} fill="#4f46e5" />
          <circle cx={mx} cy={170} r={2} fill="#4f46e5" />
          <Label x={mx + 10} y={15} text="P" fontSize={11} color="#4f46e5" />
          <Label x={mx + 10} y={168} text="Q" fontSize={11} color="#4f46e5" />
          <line x1={mx - 5} y1={my - 3} x2={mx - 5} y2={my + 3} stroke="#6366f1" strokeWidth={1.5} />
          <line x1={mx + 5} y1={my - 3} x2={mx + 5} y2={my + 3} stroke="#6366f1" strokeWidth={1.5} />
        </g>
      )}
      <line x1={ax} y1={ay} x2={bx} y2={by} stroke="#1e293b" strokeWidth={2} />
      <circle cx={ax} cy={ay} r={3} fill="#1e293b" />
      <circle cx={bx} cy={by} r={3} fill="#1e293b" />
      <Label x={ax - 12} y={ay} text="A" fontSize={13} fontWeight="bold" />
      <Label x={bx + 12} y={by} text="B" fontSize={13} fontWeight="bold" />
      <Label x={mx} y={ay + 16} text={params.lengthLabel} fontSize={10} color="#64748b" />
    </svg>
  );
};

// ── 2. 平行移動 ────────────────────────────────────────────────────────────

export const ParallelTranslationFigure: React.FC<FigureProps> = ({ problem, isAnswer }) => {
  const params = problem.figureParams as { dx: number; dy: number };
  const A = { x: 30, y: 140 }, B = { x: 80, y: 50 }, C = { x: 110, y: 140 };
  const scale = 18;
  const tx = (params.dx > 0 ? 2 : -2) * scale;
  const ty = (params.dy > 0 ? 1 : -1) * scale;
  const P = { x: A.x + tx, y: A.y + ty };
  const Q = { x: B.x + tx, y: B.y + ty };
  const R = { x: C.x + tx, y: C.y + ty };
  const Kx = 15, Ky = 170, Lx = Kx + tx, Ly = Ky + ty;
  return (
    <svg viewBox="0 0 230 200" width="220" height="190" style={{ display: 'block', margin: '0 auto' }}>
      {isAnswer && (
        <g>
          <line x1={A.x} y1={A.y} x2={P.x} y2={P.y} stroke="#93c5fd" strokeWidth={1} strokeDasharray="3 2" />
          <line x1={B.x} y1={B.y} x2={Q.x} y2={Q.y} stroke="#93c5fd" strokeWidth={1} strokeDasharray="3 2" />
          <line x1={C.x} y1={C.y} x2={R.x} y2={R.y} stroke="#93c5fd" strokeWidth={1} strokeDasharray="3 2" />
        </g>
      )}
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="rgba(99,102,241,0.08)" stroke="#4f46e5" strokeWidth={2} />
      <Label x={A.x - 12} y={A.y + 3} text="A" fontSize={12} fontWeight="bold" color="#4f46e5" />
      <Label x={B.x - 3} y={B.y - 12} text="B" fontSize={12} fontWeight="bold" color="#4f46e5" />
      <Label x={C.x + 12} y={C.y + 3} text="C" fontSize={12} fontWeight="bold" color="#4f46e5" />
      <polygon points={`${P.x},${P.y} ${Q.x},${Q.y} ${R.x},${R.y}`} fill="rgba(239,68,68,0.06)" stroke="#dc2626" strokeWidth={2} />
      <Label x={P.x - 12} y={P.y + 3} text="P" fontSize={12} fontWeight="bold" color="#dc2626" />
      <Label x={Q.x - 3} y={Q.y - 12} text="Q" fontSize={12} fontWeight="bold" color="#dc2626" />
      <Label x={R.x + 12} y={R.y + 3} text="R" fontSize={12} fontWeight="bold" color="#dc2626" />
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
  const rA = 70, angA = -Math.PI / 2 - 0.2;
  const rB = 55, angB = Math.PI + 0.3;
  const rC = 65, angC = -0.15;
  const A = { x: Ox + rA * Math.cos(angA), y: Oy + rA * Math.sin(angA) };
  const B = { x: Ox + rB * Math.cos(angB), y: Oy + rB * Math.sin(angB) };
  const C = { x: Ox + rC * Math.cos(angC), y: Oy + rC * Math.sin(angC) };
  const rot = (pt: { x: number; y: number }) => ({
    x: Ox + (pt.x - Ox) * Math.cos(rad) - (pt.y - Oy) * Math.sin(rad),
    y: Oy + (pt.x - Ox) * Math.sin(rad) + (pt.y - Oy) * Math.cos(rad),
  });
  const P = rot(A), Q = rot(B), R = rot(C);
  const arcRad = 35;
  const startAngle = angA, endAngle = startAngle + rad;
  const arcX1 = Ox + arcRad * Math.cos(startAngle), arcY1 = Oy + arcRad * Math.sin(startAngle);
  const arcX2 = Ox + arcRad * Math.cos(endAngle), arcY2 = Oy + arcRad * Math.sin(endAngle);
  const largeArc = Math.abs(params.angle) > 180 ? 1 : 0;
  const sweep = params.dir === '反時計回り' ? 1 : 0;
  return (
    <svg viewBox="0 0 220 220" width="210" height="210" style={{ display: 'block', margin: '0 auto' }}>
      {isAnswer && (
        <g>
          <path d={`M ${arcX1} ${arcY1} A ${arcRad} ${arcRad} 0 ${largeArc} ${sweep} ${arcX2} ${arcY2}`} stroke="#f59e0b" strokeWidth={1.5} fill="none" strokeDasharray="4 2" />
          {[A, B, C, P, Q, R].map((pt, i) => (
            <line key={i} x1={Ox} y1={Oy} x2={pt.x} y2={pt.y} stroke="#93c5fd" strokeWidth={1} strokeDasharray="3 2" />
          ))}
          <text x={Ox + arcRad * 0.6 * Math.cos((startAngle + endAngle) / 2) + 4} y={Oy + arcRad * 0.6 * Math.sin((startAngle + endAngle) / 2)} fontSize={9} fill="#d97706">{params.angle}°</text>
        </g>
      )}
      <circle cx={Ox} cy={Oy} r={3} fill="#374151" />
      <Label x={Ox + 10} y={Oy + 5} text="O" fontSize={11} fontWeight="bold" />
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="rgba(99,102,241,0.08)" stroke="#4f46e5" strokeWidth={2} />
      <Label x={A.x} y={A.y - 12} text="A" fontSize={12} fontWeight="bold" color="#4f46e5" />
      <Label x={B.x - 13} y={B.y} text="B" fontSize={12} fontWeight="bold" color="#4f46e5" />
      <Label x={C.x + 10} y={C.y} text="C" fontSize={12} fontWeight="bold" color="#4f46e5" />
      <polygon points={`${P.x},${P.y} ${Q.x},${Q.y} ${R.x},${R.y}`} fill="rgba(239,68,68,0.06)" stroke="#dc2626" strokeWidth={2} />
      <Label x={P.x} y={P.y - 12} text="P" fontSize={12} fontWeight="bold" color="#dc2626" />
      <Label x={Q.x - 13} y={Q.y} text="Q" fontSize={12} fontWeight="bold" color="#dc2626" />
      <Label x={R.x + 10} y={R.y} text="R" fontSize={12} fontWeight="bold" color="#dc2626" />
    </svg>
  );
};

// ── 4. 対称移動 ────────────────────────────────────────────────────────────

export const SymmetricFigure: React.FC<FigureProps> = ({ problem, isAnswer }) => {
  const params = problem.figureParams as { dist: number; targetPair: string };
  const axisX = 115;
  const A = { x: 55, y: 60 }, B = { x: 30, y: 140 }, C = { x: 95, y: 140 };
  const ref = (pt: { x: number; y: number }) => ({ x: 2 * axisX - pt.x, y: pt.y });
  const P = ref(A), Q = ref(B), R = ref(C);
  const MA = { x: axisX, y: A.y };
  return (
    <svg viewBox="0 0 230 200" width="220" height="190" style={{ display: 'block', margin: '0 auto' }}>
      <line x1={axisX} y1={10} x2={axisX} y2={190} stroke="#374151" strokeWidth={1.5} />
      <Label x={axisX + 8} y={18} text="ℓ" fontSize={14} fontWeight="bold" />
      {isAnswer && (
        <g>
          <line x1={A.x} y1={A.y} x2={P.x} y2={P.y} stroke="#93c5fd" strokeWidth={1} strokeDasharray="3 2" />
          <line x1={B.x} y1={B.y} x2={Q.x} y2={Q.y} stroke="#93c5fd" strokeWidth={1} strokeDasharray="3 2" />
          <line x1={C.x} y1={C.y} x2={R.x} y2={R.y} stroke="#93c5fd" strokeWidth={1} strokeDasharray="3 2" />
          <circle cx={MA.x} cy={MA.y} r={2.5} fill="#f59e0b" />
          <Label x={MA.x + 8} y={MA.y} text="M" fontSize={10} color="#d97706" />
          <rect x={axisX} y={A.y - 6} width={6} height={6} fill="none" stroke="#6366f1" strokeWidth={1} />
          <line x1={(A.x + MA.x) / 2} y1={A.y - 4} x2={(A.x + MA.x) / 2} y2={A.y + 4} stroke="#6366f1" strokeWidth={1.5} />
          <line x1={(MA.x + P.x) / 2} y1={A.y - 4} x2={(MA.x + P.x) / 2} y2={A.y + 4} stroke="#6366f1" strokeWidth={1.5} />
          <text x={axisX - 25} y={A.y - 10} fontSize={8} fill="#6366f1">{params.dist}cm</text>
          <text x={axisX + 8} y={A.y - 10} fontSize={8} fill="#6366f1">{params.dist}cm</text>
        </g>
      )}
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="rgba(99,102,241,0.08)" stroke="#4f46e5" strokeWidth={2} />
      <Label x={A.x - 12} y={A.y} text="A" fontSize={12} fontWeight="bold" color="#4f46e5" />
      <Label x={B.x - 12} y={B.y} text="B" fontSize={12} fontWeight="bold" color="#4f46e5" />
      <Label x={C.x - 10} y={C.y + 13} text="C" fontSize={12} fontWeight="bold" color="#4f46e5" />
      <polygon points={`${P.x},${P.y} ${Q.x},${Q.y} ${R.x},${R.y}`} fill="rgba(239,68,68,0.06)" stroke="#dc2626" strokeWidth={2} />
      <Label x={P.x + 12} y={P.y} text="P" fontSize={12} fontWeight="bold" color="#dc2626" />
      <Label x={Q.x + 12} y={Q.y} text="Q" fontSize={12} fontWeight="bold" color="#dc2626" />
      <Label x={R.x + 10} y={R.y + 13} text="R" fontSize={12} fontWeight="bold" color="#dc2626" />
    </svg>
  );
};

// ── 5. 中点の作図 ─────────────────────────────────────────────────────────

export const MidpointConstructionFigure: React.FC<FigureProps> = ({ problem, isAnswer }) => {
  const params = problem.figureParams as { sideLabel: string; midLabel: string };
  const A = { x: 100, y: 30 }, B = { x: 30, y: 155 }, C = { x: 175, y: 155 };
  const getMid = () => {
    if (params.sideLabel === 'BC') return { x: (B.x + C.x) / 2, y: (B.y + C.y) / 2, p1: B, p2: C };
    if (params.sideLabel === 'AC') return { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2, p1: A, p2: C };
    return { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2, p1: A, p2: B };
  };
  const mid = getMid();
  const Mx = mid.x, My = mid.y, p1 = mid.p1, p2 = mid.p2;
  const ddx = p2.x - p1.x, ddy = p2.y - p1.y;
  const len = Math.sqrt(ddx * ddx + ddy * ddy);
  const nx = -ddy / len, ny = ddx / len;
  const ext = 60;
  return (
    <svg viewBox="0 0 210 200" width="200" height="190" style={{ display: 'block', margin: '0 auto' }}>
      {isAnswer && (
        <g>
          <circle cx={p1.x} cy={p1.y} r={70} stroke="#93c5fd" strokeWidth={1} fill="none" strokeDasharray="4 3" />
          <circle cx={p2.x} cy={p2.y} r={70} stroke="#93c5fd" strokeWidth={1} fill="none" strokeDasharray="4 3" />
          <line x1={Mx - nx * ext} y1={My - ny * ext} x2={Mx + nx * ext} y2={My + ny * ext} stroke="#4f46e5" strokeWidth={1.5} strokeDasharray="5 3" />
          <circle cx={Mx} cy={My} r={3} fill="#dc2626" />
          <Label x={Mx + (ny > 0 ? 12 : -12)} y={My + (nx > 0 ? -12 : 12)} text={params.midLabel} fontSize={12} color="#dc2626" fontWeight="bold" />
          <rect x={Mx - 5} y={My - 5} width={6} height={6} fill="none" stroke="#4f46e5" strokeWidth={1} transform={`rotate(${Math.atan2(ddy, ddx) * 180 / Math.PI}, ${Mx}, ${My})`} />
          <line x1={(p1.x + Mx) / 2 + nx * 4} y1={(p1.y + My) / 2 + ny * 4} x2={(p1.x + Mx) / 2 - nx * 4} y2={(p1.y + My) / 2 - ny * 4} stroke="#6366f1" strokeWidth={1.5} />
          <line x1={(Mx + p2.x) / 2 + nx * 4} y1={(My + p2.y) / 2 + ny * 4} x2={(Mx + p2.x) / 2 - nx * 4} y2={(My + p2.y) / 2 - ny * 4} stroke="#6366f1" strokeWidth={1.5} />
        </g>
      )}
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="rgba(99,102,241,0.06)" stroke="#1e293b" strokeWidth={2} />
      <Label x={A.x} y={A.y - 12} text="A" fontSize={13} fontWeight="bold" color="#1e293b" />
      <Label x={B.x - 13} y={B.y + 5} text="B" fontSize={13} fontWeight="bold" color="#1e293b" />
      <Label x={C.x + 13} y={C.y + 5} text="C" fontSize={13} fontWeight="bold" color="#1e293b" />
      {!isAnswer && (
        <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#dc2626" strokeWidth={2.5} opacity={0.5} />
      )}
    </svg>
  );
};

// ── A. 平行移動と座標（方眼紙） ────────────────────────────────────────────

export const ParallelCoordFigure: React.FC<FigureProps> = ({ problem, isAnswer }) => {
  const p = problem.figureParams as {
    ax: number; ay: number; bx: number; by: number; cx: number; cy: number;
    right: number; down: number;
    px: number; py: number; qx: number; qy: number; rx: number; ry: number;
  };
  const GRID = 22, OX = 15, OY = 15, COLS = 9, ROWS = 8;
  const gx = (v: number) => OX + v * GRID;
  const gy = (v: number) => OY + v * GRID;

  const origPts = `${gx(p.ax)},${gy(p.ay)} ${gx(p.bx)},${gy(p.by)} ${gx(p.cx)},${gy(p.cy)}`;
  const movPts  = `${gx(p.px)},${gy(p.py)} ${gx(p.qx)},${gy(p.qy)} ${gx(p.rx)},${gy(p.ry)}`;

  return (
    <svg viewBox={`0 0 ${OX * 2 + COLS * GRID} ${OY * 2 + ROWS * GRID}`}
      width="215" height="195" style={{ display: 'block', margin: '0 auto' }}>
      {/* Grid */}
      {Array.from({ length: COLS + 1 }, (_, i) => (
        <line key={`v${i}`} x1={OX + i * GRID} y1={OY} x2={OX + i * GRID} y2={OY + ROWS * GRID} stroke="#e2e8f0" strokeWidth={0.8} />
      ))}
      {Array.from({ length: ROWS + 1 }, (_, i) => (
        <line key={`h${i}`} x1={OX} y1={OY + i * GRID} x2={OX + COLS * GRID} y2={OY + i * GRID} stroke="#e2e8f0" strokeWidth={0.8} />
      ))}
      {/* Axes */}
      <line x1={OX} y1={OY} x2={OX} y2={OY + ROWS * GRID} stroke="#94a3b8" strokeWidth={1} />
      <line x1={OX} y1={OY + ROWS * GRID} x2={OX + COLS * GRID} y2={OY + ROWS * GRID} stroke="#94a3b8" strokeWidth={1} />

      {/* Original △ABC */}
      <polygon points={origPts} fill="rgba(99,102,241,0.10)" stroke="#4f46e5" strokeWidth={2} />
      <Label x={gx(p.ax) - 10} y={gy(p.ay) - 8} text="A" fontSize={10} fontWeight="bold" color="#4f46e5" />
      <Label x={gx(p.bx)} y={gy(p.by) - 10} text="B" fontSize={10} fontWeight="bold" color="#4f46e5" />
      <Label x={gx(p.cx) + 10} y={gy(p.cy) - 8} text="C" fontSize={10} fontWeight="bold" color="#4f46e5" />

      {/* Translation arrow */}
      <Arrow x1={gx(p.ax)} y1={gy(p.ay)} x2={gx(p.px)} y2={gy(p.py)} color="#059669" />

      {/* Moved △PQR (answer only) */}
      {isAnswer && (
        <g>
          <polygon points={movPts} fill="rgba(239,68,68,0.08)" stroke="#dc2626" strokeWidth={2} strokeDasharray="4 2" />
          <circle cx={gx(p.px)} cy={gy(p.py)} r={3} fill="#dc2626" />
          <Label x={gx(p.px) - 10} y={gy(p.py) - 8} text="P" fontSize={10} fontWeight="bold" color="#dc2626" />
          <Label x={gx(p.qx)} y={gy(p.qy) - 10} text="Q" fontSize={10} fontWeight="bold" color="#dc2626" />
          <Label x={gx(p.rx) + 10} y={gy(p.ry) - 8} text="R" fontSize={10} fontWeight="bold" color="#dc2626" />
        </g>
      )}

      {/* Coord labels on axes */}
      {Array.from({ length: COLS }, (_, i) => (
        <text key={`xl${i}`} x={OX + (i + 1) * GRID} y={OY + ROWS * GRID + 12} fontSize={8} fill="#94a3b8" textAnchor="middle">{i + 1}</text>
      ))}
      {Array.from({ length: ROWS }, (_, i) => (
        <text key={`yl${i}`} x={OX - 8} y={OY + (i + 1) * GRID} fontSize={8} fill="#94a3b8" textAnchor="middle">{i + 1}</text>
      ))}
    </svg>
  );
};

// ── B. 回転角度を読む ────────────────────────────────────────────────────

// Reuses RotationFigure (same SVG layout, same figureParams shape)
export const RotationAngleFigure: React.FC<FigureProps> = (props) => <RotationFigure {...props} />;

// ── C. おうぎ形の弧と面積 ───────────────────────────────────────────────

export const SectorArcAreaFigure: React.FC<FigureProps> = ({ problem }) => {
  const p = problem.figureParams as { r: number; a: number };
  const CX = 110, CY = 130, R = 80;
  const rad = (p.a * Math.PI) / 180;
  // Draw sector starting from right (0°), counter-clockwise
  const startAng = -Math.PI / 2; // top
  const endAng = startAng + rad;
  const x1 = CX + R * Math.cos(startAng), y1 = CY + R * Math.sin(startAng);
  const x2 = CX + R * Math.cos(endAng), y2 = CY + R * Math.sin(endAng);
  const largeArc = p.a > 180 ? 1 : 0;
  return (
    <svg viewBox="0 0 220 200" width="210" height="190" style={{ display: 'block', margin: '0 auto' }}>
      {/* Sector fill */}
      <path
        d={`M ${CX} ${CY} L ${x1} ${y1} A ${R} ${R} 0 ${largeArc} 1 ${x2} ${y2} Z`}
        fill="rgba(99,102,241,0.10)" stroke="#4f46e5" strokeWidth={2} />
      {/* Center dot */}
      <circle cx={CX} cy={CY} r={3} fill="#374151" />
      {/* Radius labels */}
      <line x1={CX} y1={CY} x2={x1} y2={y1} stroke="#6366f1" strokeWidth={1.5} strokeDasharray="4 2" />
      <Label x={(CX + x1) / 2 + 10} y={(CY + y1) / 2} text={`${p.r}cm`} fontSize={10} color="#4f46e5" />
      {/* Angle arc */}
      <path
        d={`M ${CX + 28 * Math.cos(startAng)} ${CY + 28 * Math.sin(startAng)} A 28 28 0 ${largeArc} 1 ${CX + 28 * Math.cos(endAng)} ${CY + 28 * Math.sin(endAng)}`}
        fill="none" stroke="#f59e0b" strokeWidth={1.5} />
      <text
        x={CX + 40 * Math.cos(startAng + rad / 2)}
        y={CY + 40 * Math.sin(startAng + rad / 2)}
        fontSize={10} fill="#d97706" textAnchor="middle">{p.a}°</text>
    </svg>
  );
};

// ── D. おうぎ形の中心角逆算 ─────────────────────────────────────────────

export const SectorAngleReverseFigure: React.FC<FigureProps> = (props) => <SectorArcAreaFigure {...props} />;

// ── E. ねじれの位置（直方体） ──────────────────────────────────────────────

export const SkewLinesFigure: React.FC<FigureProps> = ({ problem }) => {
  const p = problem.figureParams as { target: string; skewEdges: string[] };
  // 直方体ABCD-EFGH の斜視図（等角投影）
  const W = 90, H = 60, D = 35;
  const OX = 30, OY = 60;
  // Front face ABCD: A=左下前, B=右下前, C=右上前, D=左上前
  // Back face EFGH: E=左下後, F=右下後, G=右上後, H=左上後
  const A = { x: OX,     y: OY + H };
  const B = { x: OX + W, y: OY + H };
  const C = { x: OX + W, y: OY };
  const Dv = { x: OX,    y: OY };
  const E = { x: OX + D,     y: OY + H - D };
  const F = { x: OX + W + D, y: OY + H - D };
  const G = { x: OX + W + D, y: OY - D };
  const Hv = { x: OX + D,    y: OY - D };

  const edgeColor = (name: string) =>
    p.target === name ? '#dc2626' : p.skewEdges.includes(name) ? '#059669' : '#475569';
  const edgeW = (name: string) => p.target === name || p.skewEdges.includes(name) ? 2.5 : 1.2;

  const Edge: React.FC<{ name: string; x1: number; y1: number; x2: number; y2: number; dashed?: boolean }> = ({ name, x1, y1, x2, y2, dashed }) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={edgeColor(name)} strokeWidth={edgeW(name)} strokeDasharray={dashed ? '4 3' : undefined} />
  );

  return (
    <svg viewBox="0 0 220 160" width="210" height="155" style={{ display: 'block', margin: '0 auto' }}>
      {/* Hidden edges */}
      <Edge name="AE" x1={A.x} y1={A.y} x2={E.x} y2={E.y} dashed />
      <Edge name="DA" x1={Dv.x} y1={Dv.y} x2={A.x} y2={A.y} dashed />
      <Edge name="EH" x1={E.x} y1={E.y} x2={Hv.x} y2={Hv.y} dashed />
      <Edge name="HE" x1={Hv.x} y1={Hv.y} x2={E.x} y2={E.y} dashed />
      <Edge name="DH" x1={Dv.x} y1={Dv.y} x2={Hv.x} y2={Hv.y} dashed />
      <Edge name="AD" x1={A.x} y1={A.y} x2={Dv.x} y2={Dv.y} dashed />
      {/* Visible edges */}
      <Edge name="AB" x1={A.x} y1={A.y} x2={B.x} y2={B.y} />
      <Edge name="BC" x1={B.x} y1={B.y} x2={C.x} y2={C.y} />
      <Edge name="CD" x1={C.x} y1={C.y} x2={Dv.x} y2={Dv.y} />
      <Edge name="BF" x1={B.x} y1={B.y} x2={F.x} y2={F.y} />
      <Edge name="EF" x1={E.x} y1={E.y} x2={F.x} y2={F.y} />
      <Edge name="FG" x1={F.x} y1={F.y} x2={G.x} y2={G.y} />
      <Edge name="GH" x1={G.x} y1={G.y} x2={Hv.x} y2={Hv.y} />
      <Edge name="CG" x1={C.x} y1={C.y} x2={G.x} y2={G.y} />
      <Edge name="HG" x1={Hv.x} y1={Hv.y} x2={G.x} y2={G.y} />
      {/* Labels */}
      <Label x={A.x - 8} y={A.y + 8} text="A" fontSize={11} fontWeight="bold" />
      <Label x={B.x + 8} y={B.y + 8} text="B" fontSize={11} fontWeight="bold" />
      <Label x={C.x + 8} y={C.y - 5} text="C" fontSize={11} fontWeight="bold" />
      <Label x={Dv.x - 8} y={Dv.y - 5} text="D" fontSize={11} fontWeight="bold" />
      <Label x={E.x - 8} y={E.y + 8} text="E" fontSize={11} fontWeight="bold" color="#475569" />
      <Label x={F.x + 8} y={F.y + 8} text="F" fontSize={11} fontWeight="bold" />
      <Label x={G.x + 8} y={G.y - 5} text="G" fontSize={11} fontWeight="bold" />
      <Label x={Hv.x - 8} y={Hv.y - 5} text="H" fontSize={11} fontWeight="bold" color="#475569" />
      {/* Legend */}
      <line x1={10} y1={148} x2={25} y2={148} stroke="#dc2626" strokeWidth={2.5} />
      <text x={28} y={152} fontSize={8} fill="#dc2626">問題の辺</text>
      <line x1={75} y1={148} x2={90} y2={148} stroke="#059669" strokeWidth={2.5} />
      <text x={93} y={152} fontSize={8} fill="#059669">ねじれの辺</text>
    </svg>
  );
};

// ── F. 正多面体（テキストのみ → シンプルなアイコン図） ──────────────────

export const PolyhedraKnowledgeFigure: React.FC<FigureProps> = () => {
  return (
    <svg viewBox="0 0 220 180" width="210" height="170" style={{ display: 'block', margin: '0 auto' }}>
      {/* 正四面体 */}
      <polygon points="45,130 85,130 65,90" fill="rgba(99,102,241,0.10)" stroke="#4f46e5" strokeWidth={2} />
      <line x1={65} y1={90} x2={65} y2={130} stroke="#4f46e5" strokeWidth={1} strokeDasharray="3 2" />
      <text x={65} y={145} fontSize={8} fill="#475569" textAnchor="middle">正四面体</text>
      <text x={65} y={155} fontSize={7} fill="#94a3b8" textAnchor="middle">4面</text>

      {/* 正六面体（立方体） */}
      <rect x={97} y={88} width={40} height={40} fill="rgba(16,185,129,0.10)" stroke="#059669" strokeWidth={2} />
      <polygon points="97,88 117,75 157,75 137,88" fill="rgba(16,185,129,0.06)" stroke="#059669" strokeWidth={1.5} />
      <line x1={137} y1={88} x2={137} y2={128} stroke="#059669" strokeWidth={1.5} />
      <line x1={157} y1={75} x2={157} y2={115} stroke="#059669" strokeWidth={1.5} />
      <line x1={137} y1={128} x2={157} y2={115} stroke="#059669" strokeWidth={1.5} />
      <text x={117} y={145} fontSize={8} fill="#475569" textAnchor="middle">正六面体</text>
      <text x={117} y={155} fontSize={7} fill="#94a3b8" textAnchor="middle">6面</text>

      {/* 正八面体 */}
      <polygon points="183,90 203,110 183,130 163,110" fill="rgba(245,158,11,0.10)" stroke="#f59e0b" strokeWidth={2} />
      <line x1={183} y1={90} x2={183} y2={130} stroke="#f59e0b" strokeWidth={1} strokeDasharray="3 2" />
      <line x1={163} y1={110} x2={203} y2={110} stroke="#f59e0b" strokeWidth={1} strokeDasharray="3 2" />
      <text x={183} y={145} fontSize={8} fill="#475569" textAnchor="middle">正八面体</text>
      <text x={183} y={155} fontSize={7} fill="#94a3b8" textAnchor="middle">8面</text>

      {/* Title */}
      <text x={110} y={25} fontSize={11} fill="#1e293b" textAnchor="middle" fontWeight="bold">正多面体は全部で5種類</text>
      <text x={110} y={42} fontSize={9} fill="#64748b" textAnchor="middle">正四・正六・正八・正十二・正二十面体</text>
      <line x1={20} y1={55} x2={200} y2={55} stroke="#e2e8f0" strokeWidth={1} />
    </svg>
  );
};

// ── G. 柱の表面積・体積 ─────────────────────────────────────────────────

export const PrismVolumeFigure: React.FC<FigureProps> = ({ problem }) => {
  const p = problem.figureParams as { type: string; r?: number; h?: number; a?: number; b?: number };
  const CX = 110, CY = 100;

  if (p.type === 'cylinder') {
    const r = p.r ?? 4, h = p.h ?? 8;
    const RX = Math.min(55, r * 10), RY = RX * 0.35;
    const HH = Math.min(100, h * 8);
    return (
      <svg viewBox="0 0 220 190" width="210" height="180" style={{ display: 'block', margin: '0 auto' }}>
        {/* Bottom ellipse */}
        <ellipse cx={CX} cy={CY + HH / 2} rx={RX} ry={RY} fill="rgba(99,102,241,0.08)" stroke="#4f46e5" strokeWidth={1.5} />
        {/* Side rectangle */}
        <rect x={CX - RX} y={CY - HH / 2} width={RX * 2} height={HH} fill="rgba(99,102,241,0.05)" stroke="#4f46e5" strokeWidth={1.5} />
        {/* Top ellipse */}
        <ellipse cx={CX} cy={CY - HH / 2} rx={RX} ry={RY} fill="rgba(99,102,241,0.12)" stroke="#4f46e5" strokeWidth={1.5} />
        {/* Radius label */}
        <line x1={CX} y1={CY - HH / 2} x2={CX + RX} y2={CY - HH / 2} stroke="#6366f1" strokeWidth={1.5} strokeDasharray="3 2" />
        <Label x={CX + RX / 2} y={CY - HH / 2 - 10} text={`r=${r}cm`} fontSize={10} color="#4f46e5" />
        {/* Height label */}
        <line x1={CX + RX + 8} y1={CY - HH / 2} x2={CX + RX + 8} y2={CY + HH / 2} stroke="#94a3b8" strokeWidth={1} />
        <Label x={CX + RX + 22} y={CY} text={`h=${h}cm`} fontSize={10} color="#475569" />
      </svg>
    );
  } else {
    const a = p.a ?? 3, b = p.b ?? 4, h = p.h ?? 5;
    const W = 70, H = 60, D = 25;
    return (
      <svg viewBox="0 0 220 190" width="210" height="180" style={{ display: 'block', margin: '0 auto' }}>
        {/* Front face */}
        <rect x={CX - W / 2} y={CY - H / 2} width={W} height={H} fill="rgba(99,102,241,0.08)" stroke="#4f46e5" strokeWidth={2} />
        {/* Top face */}
        <polygon points={`${CX - W / 2},${CY - H / 2} ${CX - W / 2 + D},${CY - H / 2 - D} ${CX + W / 2 + D},${CY - H / 2 - D} ${CX + W / 2},${CY - H / 2}`} fill="rgba(99,102,241,0.12)" stroke="#4f46e5" strokeWidth={2} />
        {/* Right face */}
        <polygon points={`${CX + W / 2},${CY - H / 2} ${CX + W / 2 + D},${CY - H / 2 - D} ${CX + W / 2 + D},${CY + H / 2 - D} ${CX + W / 2},${CY + H / 2}`} fill="rgba(99,102,241,0.06)" stroke="#4f46e5" strokeWidth={2} />
        {/* Labels */}
        <Label x={CX} y={CY + H / 2 + 12} text={`縦${a}cm`} fontSize={9} color="#475569" />
        <Label x={CX + W / 2 + D / 2 + 14} y={CY - H / 2 - D / 2} text={`横${b}cm`} fontSize={9} color="#475569" />
        <Label x={CX + W / 2 + 10} y={CY} text={`高${h}cm`} fontSize={9} color="#475569" />
      </svg>
    );
  }
};

// ── H. 円錐の表面積・体積 ──────────────────────────────────────────────

export const ConeVolumeFigure: React.FC<FigureProps> = ({ problem }) => {
  const p = problem.figureParams as { r: number; h: number; l: number };
  const CX = 110, BaseY = 160;
  const RX = Math.min(60, p.r * 10), RY = RX * 0.3;
  const apexY = BaseY - Math.min(120, p.h * 9);
  return (
    <svg viewBox="0 0 220 200" width="210" height="190" style={{ display: 'block', margin: '0 auto' }}>
      {/* Slant lines */}
      <line x1={CX} y1={apexY} x2={CX - RX} y2={BaseY} stroke="#4f46e5" strokeWidth={2} />
      <line x1={CX} y1={apexY} x2={CX + RX} y2={BaseY} stroke="#4f46e5" strokeWidth={2} />
      {/* Base ellipse */}
      <ellipse cx={CX} cy={BaseY} rx={RX} ry={RY} fill="rgba(99,102,241,0.08)" stroke="#4f46e5" strokeWidth={1.5} />
      {/* Height dashed */}
      <line x1={CX} y1={apexY} x2={CX} y2={BaseY} stroke="#94a3b8" strokeWidth={1} strokeDasharray="4 2" />
      {/* Radius */}
      <line x1={CX} y1={BaseY} x2={CX + RX} y2={BaseY} stroke="#6366f1" strokeWidth={1.5} />
      {/* Labels */}
      <Label x={CX + RX / 2} y={BaseY + 12} text={`r=${p.r}cm`} fontSize={10} color="#4f46e5" />
      <Label x={CX - 18} y={(apexY + BaseY) / 2} text={`h=${p.h}cm`} fontSize={10} color="#475569" />
      <Label x={CX + RX + 20} y={(apexY + BaseY) / 2} text={`l=${p.l}cm`} fontSize={10} color="#059669" />
      {/* Apex dot */}
      <circle cx={CX} cy={apexY} r={3} fill="#4f46e5" />
    </svg>
  );
};

// ── I. 球の表面積・体積 ────────────────────────────────────────────────

export const SphereVolumeFigure: React.FC<FigureProps> = ({ problem }) => {
  const p = problem.figureParams as { r: number };
  const CX = 110, R = Math.min(70, p.r * 14);
  const CY = 100;
  return (
    <svg viewBox="0 0 220 200" width="210" height="190" style={{ display: 'block', margin: '0 auto' }}>
      {/* Sphere circle */}
      <circle cx={CX} cy={CY} r={R} fill="rgba(99,102,241,0.08)" stroke="#4f46e5" strokeWidth={2} />
      {/* Equator ellipse */}
      <ellipse cx={CX} cy={CY} rx={R} ry={R * 0.3} fill="none" stroke="#6366f1" strokeWidth={1} strokeDasharray="4 3" />
      {/* Radius line */}
      <line x1={CX} y1={CY} x2={CX + R} y2={CY} stroke="#dc2626" strokeWidth={1.5} />
      <circle cx={CX} cy={CY} r={3} fill="#374151" />
      <Label x={CX + R / 2} y={CY - 12} text={`r = ${p.r}cm`} fontSize={11} color="#dc2626" fontWeight="bold" />
    </svg>
  );
};

// ── Figure dispatcher ──────────────────────────────────────────────────────

export const ProblemFigure: React.FC<FigureProps> = ({ problem, isAnswer = false }) => {
  switch (problem.id) {
    case 'perpendicular_bisector':  return <PerpendicularBisectorFigure problem={problem} isAnswer={isAnswer} />;
    case 'parallel_translation':    return <ParallelTranslationFigure problem={problem} isAnswer={isAnswer} />;
    case 'rotation':                return <RotationFigure problem={problem} isAnswer={isAnswer} />;
    case 'symmetric':               return <SymmetricFigure problem={problem} isAnswer={isAnswer} />;
    case 'midpoint_construction':   return <MidpointConstructionFigure problem={problem} isAnswer={isAnswer} />;
    case 'parallel_coord':          return <ParallelCoordFigure problem={problem} isAnswer={isAnswer} />;
    case 'rotation_angle':          return <RotationAngleFigure problem={problem} isAnswer={isAnswer} />;
    case 'sector_arc_area':         return <SectorArcAreaFigure problem={problem} isAnswer={isAnswer} />;
    case 'sector_angle_reverse':    return <SectorAngleReverseFigure problem={problem} isAnswer={isAnswer} />;
    case 'skew_lines':              return <SkewLinesFigure problem={problem} isAnswer={isAnswer} />;
    case 'polyhedra_knowledge':     return <PolyhedraKnowledgeFigure problem={problem} isAnswer={isAnswer} />;
    case 'prism_volume':            return <PrismVolumeFigure problem={problem} isAnswer={isAnswer} />;
    case 'cone_volume':             return <ConeVolumeFigure problem={problem} isAnswer={isAnswer} />;
    case 'sphere_volume':           return <SphereVolumeFigure problem={problem} isAnswer={isAnswer} />;
    default:                        return null;
  }
};
