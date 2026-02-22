// mathGenerator.ts
// Problem data generator for 中1数学「平面図形（作図と移動）」

export type ProblemType =
  | 'perpendicular_bisector'
  | 'parallel_translation'
  | 'rotation'
  | 'symmetric'
  | 'midpoint_construction';

export interface Problem {
  id: ProblemType;
  title: string;
  questionText: string[];
  answerText: string[];
  explanationText: string[];
  figureParams: Record<string, unknown>;
}

function pickFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── 1. 垂直二等分線の作図 ──────────────────────────────────────────────
function generatePerpendicularBisector(): Problem {
  const lengthLabel = pickFrom(['6cm', '8cm', '10cm', '7cm', '9cm']);
  return {
    id: 'perpendicular_bisector',
    title: '垂直二等分線の作図',
    questionText: [
      `右の図の線分ABの垂直二等分線を作図しなさい。`,
      `（定規とコンパスを使うこと）`,
      `なお、線分ABの長さは ${lengthLabel} です。`,
    ],
    answerText: [
      '線分ABの垂直二等分線（作図）',
      '• 点AとBを中心とする等しい半径の円弧を描く',
      '• 2つの交点を結んだ直線が垂直二等分線',
    ],
    explanationText: [
      '① コンパスの針をAに刺し、ABの半分より少し長い半径で円弧を描く',
      '② 同じ半径でコンパスの針をBに刺し、同様に円弧を描く',
      '③ 2つの円弧が交わる点をP, Qとして、PQを定規で結ぶ',
      '④ この直線PQが線分ABの垂直二等分線で、ABの中点Mを通る',
    ],
    figureParams: { lengthLabel },
  };
}

// ── 2. 平行移動 ─────────────────────────────────────────────────────────
function generateParallelTranslation(): Problem {
  const dx = pickFrom([2, 3, 4]);
  const dy = pickFrom([-3, -2, 2, 3]);
  const labelPairs: [string, string][] = [
    ['AP', 'BQ'],
    ['BQ', 'CR'],
    ['AP', 'CR'],
  ];
  const [targetSeg, parallelSeg] = pickFrom(labelPairs);

  return {
    id: 'parallel_translation',
    title: '平行移動',
    questionText: [
      '右の図の△ABCを、矢印KLの方向に矢印の長さだけ平行移動した△PQRについて、次の問いに答えなさい。',
      `(1) 線分${targetSeg}と長さが等しい線分をすべて答えなさい。`,
      `(2) 線分${parallelSeg}と平行な線分をすべて答えなさい。`,
    ],
    answerText: [
      `(1) ${targetSeg}と長さが等しい線分：KL、${labelPairs.map(([a]) => a).filter(a => a !== targetSeg).join('、')}`,
      `(2) ${parallelSeg}と平行な線分：KL`,
    ],
    explanationText: [
      '平行移動では：',
      '• 対応する頂点を結ぶ線分（AP、BQ、CR）はすべて等しく平行（＝矢印KLと同じ）',
      '• △ABCの辺と対応する△PQRの辺はそれぞれ平行で長さも等しい',
      `(1) ${targetSeg}と長さが等しいのは、移動量を表すKLと他の対応線分（AP・BQ・CRはすべて等しい）`,
      `(2) ${parallelSeg}と平行なのはKL（移動方向）と対応する他の線分も平行`,
    ],
    figureParams: { dx, dy, targetSeg, parallelSeg },
  };
}

// ── 3. 回転移動 ─────────────────────────────────────────────────────────
function generateRotation(): Problem {
  const angles = [60, 90, 120, 180];
  const angle = pickFrom(angles);
  const dirLabels = ['反時計回り', '時計回り'];
  const dir = pickFrom(dirLabels);

  return {
    id: 'rotation',
    title: '回転移動',
    questionText: [
      `右の図の△ABCを、点Oを中心として${dir}に${angle}°回転移動した△PQRについて、次の問いに答えなさい。`,
      '(1) 点Cに対応する点はどれですか。',
      '(2) 線分OAと長さが等しい線分をすべて答えなさい。',
      '(3) ∠AOPの大きさは何度ですか。',
    ],
    answerText: [
      '(1) 点R',
      '(2) OB、OC、OP、OQ、OR',
      `(3) ${angle}°`,
    ],
    explanationText: [
      '回転移動では：',
      '• AはPに、BはQに、CはRに対応する',
      '• (1) CはRに対応するため、答えは点R',
      '• (2) 回転移動では中心Oから各頂点までの距離は変わらない',
      '　　OA＝OB＝OC（元の三角形）、OP＝OQ＝OR（移動後）、かつ元と同じ長さ',
      `• (3) 回転の角度がそのまま∠AOPになる。答えは${angle}°`,
    ],
    figureParams: { angle, dir },
  };
}

// ── 4. 対称移動 ─────────────────────────────────────────────────────────
function generateSymmetric(): Problem {
  const distOptions = [2, 3, 4];
  const dist = pickFrom(distOptions);
  const targetPair = pickFrom(['AP', 'BQ', 'CR'] as const);

  return {
    id: 'symmetric',
    title: '対称移動',
    questionText: [
      '右の図の△ABCを、直線ℓを対称軸として対称移動した△PQRについて、次の問いに答えなさい。',
      `(1) 線分${targetPair}と直線ℓの関係を答えなさい。`,
      `(2) 点Aから直線ℓに下ろした垂線の足をMとします。AMの長さがMPの長さと等しいとき、AMの長さが${dist}cmならばAPの長さは何cmですか。`,
    ],
    answerText: [
      `(1) 線分${targetPair}は直線ℓに垂直（⊥）で、直線ℓによって二等分される`,
      `(2) AP ＝ AM × 2 ＝ ${dist} × 2 ＝ ${dist * 2}cm`,
    ],
    explanationText: [
      '対称移動では：',
      `• 対応する頂点を結ぶ線分（${targetPair}など）は対称軸ℓに垂直（⊥）`,
      '• その線分は対称軸ℓによってちょうど半分に分けられる',
      `(1) ${targetPair}⊥ℓ　かつ　ℓがAPの中点を通る`,
      `(2) AM = ${dist}cm、MP = ${dist}cm（対称なので等しい）`,
      `　　よってAP = AM + MP = ${dist} + ${dist} = ${dist * 2}cm`,
    ],
    figureParams: { dist, targetPair },
  };
}

// ── 5. 辺の中点の作図 ──────────────────────────────────────────────────
function generateMidpointConstruction(): Problem {
  const sideLabel = pickFrom(['BC', 'AC', 'AB'] as const);
  const midLabel = sideLabel === 'BC' ? 'M' : sideLabel === 'AC' ? 'N' : 'L';

  return {
    id: 'midpoint_construction',
    title: '辺の中点の作図',
    questionText: [
      `右の図の△ABCについて、辺${sideLabel}の中点${midLabel}を、定規とコンパスを用いて作図しなさい。`,
      `（作図の線は残すこと）`,
    ],
    answerText: [
      `辺${sideLabel}の中点${midLabel}（作図）`,
      `• 辺${sideLabel}の垂直二等分線を引く`,
      `• ${sideLabel}と垂直二等分線の交点が中点${midLabel}`,
    ],
    explanationText: [
      `辺${sideLabel}の中点を求めるには、${sideLabel}の垂直二等分線を作図する！`,
      `① コンパスの針を点${sideLabel[0]}に刺し、${sideLabel[1]}までの距離より少し長い半径で円弧を描く`,
      `② 同じ半径でコンパスの針を点${sideLabel[1]}に刺し、同様に円弧を描く`,
      '③ 2つの円弧が交わる点をP, Qとして、PQを定規で結ぶ',
      `④ PQと辺${sideLabel}が交わる点が中点${midLabel}`,
      `• 垂直二等分線は線分を等分するので、${sideLabel[0]}${midLabel} = ${midLabel}${sideLabel[1]} となる`,
    ],
    figureParams: { sideLabel, midLabel },
  };
}

// ── メイン生成関数 ───────────────────────────────────────────────────────
export function generateProblems(): Problem[] {
  return [
    generatePerpendicularBisector(),
    generateParallelTranslation(),
    generateRotation(),
    generateSymmetric(),
    generateMidpointConstruction(),
  ];
}
