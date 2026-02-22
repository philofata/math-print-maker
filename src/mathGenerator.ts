// mathGenerator.ts
// Problem data generator — 9 patterns (A〜I) + original 5 patterns

export type ProblemType =
  // 既存パターン
  | 'perpendicular_bisector'
  | 'parallel_translation'
  | 'rotation'
  | 'symmetric'
  | 'midpoint_construction'
  // 新規パターン A〜I
  | 'parallel_coord'        // A: 平行移動の座標
  | 'rotation_angle'        // B: 回転角度を読む
  | 'sector_arc_area'       // C: おうぎ形の弧・面積
  | 'sector_angle_reverse'  // D: おうぎ形の中心角逆算
  | 'skew_lines'            // E: ねじれの位置
  | 'polyhedra_knowledge'   // F: 正多面体の知識
  | 'prism_volume'          // G: 柱の表面積・体積
  | 'cone_volume'           // H: 錐の表面積・体積
  | 'sphere_volume';        // I: 球の表面積・体積

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

// ═══════════════════════════════════════════════════════════════
// 既存の5パターン（変更なし）
// ═══════════════════════════════════════════════════════════════

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
      '• 対応する頂点を結ぶ線分（AP、BQ、CR）はすべて等しく平行（＝KLと同じ）',
      '• △ABCの辺と△PQRの辺はそれぞれ平行で長さも等しい',
      `(1) ${targetSeg}と長さが等しいのはKLと他の対応線分（AP・BQ・CRはすべて等しい）`,
      `(2) ${parallelSeg}と平行なのはKL（移動方向）と他の対応線分も平行`,
    ],
    figureParams: { dx, dy, targetSeg, parallelSeg },
  };
}

function generateRotation(): Problem {
  const angle = pickFrom([60, 90, 120, 180]);
  const dir = pickFrom(['反時計回り', '時計回り']);
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
      '• (2) 回転では中心Oから各頂点までの距離は変わらない',
      `• (3) 回転の角度がそのまま∠AOPになる。答えは${angle}°`,
    ],
    figureParams: { angle, dir },
  };
}

function generateSymmetric(): Problem {
  const dist = pickFrom([2, 3, 4]);
  const targetPair = pickFrom(['AP', 'BQ', 'CR'] as const);
  return {
    id: 'symmetric',
    title: '対称移動',
    questionText: [
      '右の図の△ABCを、直線ℓを対称軸として対称移動した△PQRについて、次の問いに答えなさい。',
      `(1) 線分${targetPair}と直線ℓの関係を答えなさい。`,
      `(2) 点Aから直線ℓに下ろした垂線の足をMとします。AMの長さが${dist}cmならばAPの長さは何cmですか。`,
    ],
    answerText: [
      `(1) 線分${targetPair}は直線ℓに垂直（⊥）で、直線ℓによって二等分される`,
      `(2) AP ＝ AM × 2 ＝ ${dist} × 2 ＝ ${dist * 2}cm`,
    ],
    explanationText: [
      '対称移動では：',
      `• 対応する頂点を結ぶ線分（${targetPair}など）は対称軸ℓに垂直（⊥）`,
      '• その線分は対称軸ℓによってちょうど半分に分けられる',
      `(1) ${targetPair}⊥ℓ　かつ　ℓが${targetPair}の中点を通る`,
      `(2) AM = ${dist}cm、MP = ${dist}cm（対称なので等しい）`,
      `　　よってAP = ${dist} + ${dist} = ${dist * 2}cm`,
    ],
    figureParams: { dist, targetPair },
  };
}

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
      `辺${sideLabel}の中点を求めるには${sideLabel}の垂直二等分線を作図する！`,
      `① コンパスの針を点${sideLabel[0]}に刺し、${sideLabel[1]}までの距離より長い半径で円弧を描く`,
      `② 同じ半径でコンパスの針を点${sideLabel[1]}に刺し、同様に円弧を描く`,
      '③ 2つの円弧が交わる点をP, Qとして、PQを定規で結ぶ',
      `④ PQと辺${sideLabel}が交わる点が中点${midLabel}`,
    ],
    figureParams: { sideLabel, midLabel },
  };
}

// ═══════════════════════════════════════════════════════════════
// 新規パターン A〜I
// ═══════════════════════════════════════════════════════════════

// ── A: 平行移動の座標 ────────────────────────────────────────────
function generateParallelCoord(): Problem {
  const ax = pickFrom([1, 2]);
  const ay = pickFrom([3, 4, 5]);
  const bx = pickFrom([3, 4, 5]);
  const by = pickFrom([1, 2]);
  const cx = pickFrom([4, 5]);
  const cy = pickFrom([4, 5]);
  const right = pickFrom([2, 3, 4]);
  const down = pickFrom([1, 2, 3]);
  // P = A shifted
  const px = ax + right, py = ay + down;
  return {
    id: 'parallel_coord',
    title: '平行移動と座標',
    questionText: [
      `右の方眼上の△ABCを、右に${right}マス、下に${down}マス平行移動して△PQRを作りました。`,
      `(1) 点A(${ax}, ${ay})に対応する点Pの座標を求めなさい。`,
      `(2) 点B(${bx}, ${by})に対応する点Qの座標を求めなさい。`,
    ],
    answerText: [
      `(1) P(${px}, ${py - down * 2 < 0 ? py : py})　→　P(${ax + right}, ${ay - down})`,
      `(2) Q(${bx + right}, ${by - down})`,
    ],
    explanationText: [
      `平行移動では すべての点が同じ量だけずれる`,
      `右に${right}マス＝x座標に${right}を足す`,
      `下に${down}マス＝y座標から${down}を引く`,
      `(1) A(${ax}, ${ay}) → P(${ax}+${right}, ${ay}−${down}) = P(${ax + right}, ${ay - down})`,
      `(2) B(${bx}, ${by}) → Q(${bx}+${right}, ${by}−${down}) = Q(${bx + right}, ${by - down})`,
    ],
    figureParams: {
      ax, ay, bx, by, cx, cy,
      right, down,
      px: ax + right, py: ay - down,
      qx: bx + right, qy: by - down,
      rx: cx + right, ry: cy - down,
    },
  };
}

// ── B: 回転角度を読む ────────────────────────────────────────────
function generateRotationAngle(): Problem {
  const angle = pickFrom([90, 180]);
  const dir = pickFrom(['反時計回り', '時計回り']);
  return {
    id: 'rotation_angle',
    title: '回転移動の角度',
    questionText: [
      '右の図は、△ABCを点Oを中心に回転移動して△PQRを得たものです。',
      '(1) 点Oを中心として何度回転移動させたか答えなさい。',
      '(2) 回転の向きは時計回りですか、反時計回りですか。',
    ],
    answerText: [
      `(1) ${angle}°`,
      `(2) ${dir}`,
    ],
    explanationText: [
      '回転移動では、中心Oから各頂点までの距離が等しい',
      '① OAとOPを結ぶ → ∠AOPが回転角',
      `② 図から∠AOP = ${angle}°`,
      `③ 向きは図を見て${dir}と判断する`,
      '• OA = OP、OB = OQ、OC = OR（距離は変わらない）',
    ],
    figureParams: { angle, dir },
  };
}

// ── C: おうぎ形の弧と面積 ────────────────────────────────────────
function generateSectorArcArea(): Problem {
  const r = pickFrom([4, 6, 8, 10, 12]);
  const a = pickFrom([30, 45, 60, 90, 120, 180]);
  // 弧の長さ = 2πr × (a/360)
  // 面積 = πr² × (a/360)
  const arcNum = 2 * r * a;
  const arcDen = 360;
  const areaNum = r * r * a;
  const areaDen = 360;
  function simplify(n: number, d: number): [number, number] {
    const g = gcd(n, d);
    return [n / g, d / g];
  }
  function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b); }
  const [an, ad] = simplify(arcNum, arcDen);
  const [sn, sd] = simplify(areaNum, areaDen);
  const arcStr = ad === 1 ? `${an}π cm` : `${an}/${ad}π cm`;
  const areaStr = sd === 1 ? `${sn}π cm²` : `${sn}/${sd}π cm²`;
  return {
    id: 'sector_arc_area',
    title: 'おうぎ形の弧と面積',
    questionText: [
      `半径 ${r}cm、中心角 ${a}° のおうぎ形について、次を求めなさい（円周率はπとする）。`,
      '(1) 弧の長さ',
      '(2) 面積',
    ],
    answerText: [
      `(1) 弧の長さ ＝ ${arcStr}`,
      `(2) 面積 ＝ ${areaStr}`,
    ],
    explanationText: [
      `おうぎ形は円全体の ${a}/360 の部分`,
      `(1) 弧の長さ ＝ 2πr × (中心角/360)`,
      `　 ＝ 2π×${r} × (${a}/360) ＝ ${arcStr}`,
      `(2) 面積 ＝ πr² × (中心角/360)`,
      `　 ＝ π×${r}² × (${a}/360) ＝ ${areaStr}`,
    ],
    figureParams: { r, a, arcStr, areaStr },
  };
}

// ── D: おうぎ形の中心角逆算 ─────────────────────────────────────
function generateSectorAngleReverse(): Problem {
  const r = pickFrom([4, 6, 8, 10]);
  const a = pickFrom([60, 90, 120, 180]);
  function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b); }
  function simplify(n: number, d: number): [number, number] {
    const g = gcd(n, d);
    return [n / g, d / g];
  }
  // 弧の長さ = 2πr*(a/360) → 整数比で表現
  const arcNum = 2 * r * a;
  const arcDen = 360;
  const [an, ad] = simplify(arcNum, arcDen);
  const arcStr = ad === 1 ? `${an}π` : `${an}/${ad}π`;
  return {
    id: 'sector_angle_reverse',
    title: 'おうぎ形の中心角',
    questionText: [
      `半径 ${r}cm のおうぎ形の弧の長さが ${arcStr}cm のとき、中心角を求めなさい。`,
    ],
    answerText: [
      `中心角 ＝ ${a}°`,
    ],
    explanationText: [
      `弧の長さ ＝ 2πr × (中心角/360)`,
      `${arcStr} ＝ 2π×${r} × (中心角/360)`,
      `中心角/360 ＝ ${arcStr} ÷ (2π×${r})`,
      `中心角/360 ＝ ${a}/360`,
      `∴ 中心角 ＝ ${a}°`,
    ],
    figureParams: { r, a, arcStr },
  };
}

// ── E: ねじれの位置 ──────────────────────────────────────────────
function generateSkewLines(): Problem {
  // 直方体の辺のラベル固定（ABCD-EFGH）
  // ねじれの位置の辺を問う
  const edges = ['AB', 'BC', 'CD', 'DA', 'EF', 'FG', 'GH', 'HE', 'AE', 'BF', 'CG', 'DH'];
  const targets = ['AB', 'BF', 'CG'];
  const target = pickFrom(targets);
  // ねじれの位置にある辺（直方体の定番）
  const skewMap: Record<string, string[]> = {
    'AB': ['DH', 'CG', 'EH', 'FG'],
    'BF': ['AD', 'CD', 'GH', 'EH'],
    'CG': ['AB', 'EF', 'AE', 'DH'],
  };
  const skewEdges = skewMap[target];
  return {
    id: 'skew_lines',
    title: 'ねじれの位置',
    questionText: [
      '右の図は直方体ABCD-EFGHです。次の問いに答えなさい。',
      `(1) 辺${target}とねじれの位置にある辺をすべて答えなさい。`,
      `(2) 辺${target}と平行な辺をすべて答えなさい。`,
    ],
    answerText: [
      `(1) ${skewEdges.join('、')}`,
      `(2) ${getParallelEdges(target, edges).join('、')}`,
    ],
    explanationText: [
      'ねじれの位置 ＝ 平行でなく、交わってもいない2辺',
      `辺${target}と：`,
      '• 同じ平面上にある辺 → 平行か交わるどちらか',
      '• 同じ平面上にない辺 → ねじれの位置',
      `(1) ねじれ：${skewEdges.join('、')}`,
      `(2) 平行：${getParallelEdges(target, edges).join('、')}`,
    ],
    figureParams: { target, skewEdges, parallelEdges: getParallelEdges(target, edges) },
  };
}

function getParallelEdges(target: string, _edges: string[]): string[] {
  const parallelMap: Record<string, string[]> = {
    'AB': ['DC', 'EF', 'HG'],
    'BC': ['AD', 'FG', 'EH'],
    'CD': ['BA', 'GH', 'EF'],
    'DA': ['CB', 'HE', 'GF'],
    'EF': ['AB', 'DC', 'HG'],
    'FG': ['BC', 'AD', 'EH'],
    'GH': ['CD', 'AB', 'EF'],
    'HE': ['DA', 'CB', 'FG'],
    'AE': ['BF', 'CG', 'DH'],
    'BF': ['AE', 'CG', 'DH'],
    'CG': ['AE', 'BF', 'DH'],
    'DH': ['AE', 'BF', 'CG'],
  };
  return parallelMap[target] ?? [];
}

// ── F: 正多面体の知識 ────────────────────────────────────────────
function generatePolyhedraKnowledge(): Problem {
  type QSet = { q: string; a: string[]; exp: string[] };
  const qsets: QSet[] = [
    {
      q: '面がすべて合同な正三角形でできている正多面体をすべて答えなさい。',
      a: ['正四面体、正八面体、正二十面体'],
      exp: [
        '正多面体は全部で5種類',
        '• 正四面体：面は正三角形×4',
        '• 正六面体（立方体）：面は正方形×6',
        '• 正八面体：面は正三角形×8',
        '• 正十二面体：面は正五角形×12',
        '• 正二十面体：面は正三角形×20',
        '→ 正三角形のもの：正四面体、正八面体、正二十面体',
      ],
    },
    {
      q: '正多面体は全部で何種類あるか答えなさい。また、面の数が最も多い正多面体の名前を答えなさい。',
      a: ['5種類', '正二十面体（面の数20）'],
      exp: [
        '正多面体は全部で5種類',
        '① 正四面体（正三角形×4）',
        '② 正六面体＝立方体（正方形×6）',
        '③ 正八面体（正三角形×8）',
        '④ 正十二面体（正五角形×12）',
        '⑤ 正二十面体（正三角形×20）← 面の数が最も多い',
      ],
    },
    {
      q: '正六面体（立方体）の頂点の数と辺の数を答えなさい。',
      a: ['頂点の数：8個', '辺の数：12本'],
      exp: [
        '立方体を数えてみよう',
        '• 頂点：8個（角が8つ）',
        '• 辺：12本（縦4本＋横4本＋高さ4本）',
        '• 面：6面（上下・前後・左右）',
        'オイラーの多面体定理：頂点−辺+面＝2',
        '→ 8 − 12 + 6 ＝ 2 ✓',
      ],
    },
  ];
  const chosen = pickFrom(qsets);
  return {
    id: 'polyhedra_knowledge',
    title: '正多面体',
    questionText: [chosen.q],
    answerText: chosen.a,
    explanationText: chosen.exp,
    figureParams: {},
  };
}

// ── G: 柱の表面積・体積 ──────────────────────────────────────────
function generatePrismVolume(): Problem {
  const type = pickFrom(['cylinder', 'rectangular'] as const);
  if (type === 'cylinder') {
    const r = pickFrom([2, 3, 4, 5]);
    const h = pickFrom([5, 6, 8, 10]);
    // 表面積 = 2πr² + 2πrh
    // 体積 = πr²h
    const surfaceArea = `2π×${r}²＋2π×${r}×${h} ＝ ${2 * r * r}π＋${2 * r * h}π ＝ ${2 * r * r + 2 * r * h}π cm²`;
    const volume = `π×${r}²×${h} ＝ ${r * r * h}π cm³`;
    return {
      id: 'prism_volume',
      title: '円柱の表面積と体積',
      questionText: [
        `底面の半径が${r}cm、高さが${h}cmの円柱について、次を求めなさい（円周率はπとする）。`,
        '(1) 表面積',
        '(2) 体積',
      ],
      answerText: [
        `(1) ${2 * r * r + 2 * r * h}π cm²`,
        `(2) ${r * r * h}π cm³`,
      ],
      explanationText: [
        '円柱の表面積 ＝ 底面積×2 ＋ 側面積',
        `底面積 ＝ π×${r}² ＝ ${r * r}π`,
        `側面積 ＝ 2π×${r}×${h} ＝ ${2 * r * h}π（展開すると長方形）`,
        `(1) 表面積 ＝ ${surfaceArea}`,
        `(2) 体積 ＝ ${volume}`,
      ],
      figureParams: { type: 'cylinder', r, h },
    };
  } else {
    // 直方体
    const a = pickFrom([3, 4, 5]);
    const b = pickFrom([3, 4, 6]);
    const h = pickFrom([5, 6, 8]);
    const surface = 2 * (a * b + b * h + a * h);
    const vol = a * b * h;
    return {
      id: 'prism_volume',
      title: '直方体の表面積と体積',
      questionText: [
        `縦${a}cm、横${b}cm、高さ${h}cmの直方体について、次を求めなさい。`,
        '(1) 表面積',
        '(2) 体積',
      ],
      answerText: [
        `(1) ${surface} cm²`,
        `(2) ${vol} cm³`,
      ],
      explanationText: [
        '直方体の表面積 ＝ （縦×横 + 横×高さ + 縦×高さ）×2',
        `＝ (${a}×${b} + ${b}×${h} + ${a}×${h}) × 2`,
        `＝ (${a * b} + ${b * h} + ${a * h}) × 2 ＝ ${a * b + b * h + a * h} × 2 ＝ ${surface} cm²`,
        `(2) 体積 ＝ ${a}×${b}×${h} ＝ ${vol} cm³`,
      ],
      figureParams: { type: 'rectangular', a, b, h },
    };
  }
}

// ── H: 錐の表面積・体積 ──────────────────────────────────────────
function generateConeVolume(): Problem {
  // ピタゴラス数セット (r, h, l=母線)
  const sets = [
    { r: 3, h: 4, l: 5 },
    { r: 6, h: 8, l: 10 },
    { r: 5, h: 12, l: 13 },
    { r: 9, h: 12, l: 15 },
  ];
  const { r, h, l } = pickFrom(sets);
  // 表面積 = πr² + πrl
  const surfNum = r * r + r * l;
  const surfStr = `${surfNum}π cm²`;
  // 体積 = (1/3)πr²h
  const volNum = r * r * h;
  const volSimple = volNum % 3 === 0 ? `${volNum / 3}π cm³` : `${volNum}/3 π cm³`;
  return {
    id: 'cone_volume',
    title: '円錐の表面積と体積',
    questionText: [
      `底面の半径が${r}cm、高さが${h}cm、母線の長さが${l}cmの円錐について、次を求めなさい（π使用）。`,
      '(1) 表面積',
      '(2) 体積',
    ],
    answerText: [
      `(1) ${surfStr}`,
      `(2) ${volSimple}`,
    ],
    explanationText: [
      '円錐の表面積 ＝ 底面積 ＋ 側面積（おうぎ形）',
      `底面積 ＝ π×${r}² ＝ ${r * r}π`,
      `側面積 ＝ π×r×l ＝ π×${r}×${l} ＝ ${r * l}π`,
      `(1) 表面積 ＝ ${r * r}π ＋ ${r * l}π ＝ ${surfStr}`,
      `(2) 体積 ＝ (1/3)×π×${r}²×${h}`,
      `　　＝ (1/3)×${r * r * h}π ＝ ${volSimple}`,
    ],
    figureParams: { r, h, l, surfStr, volSimple },
  };
}

// ── I: 球の表面積・体積 ──────────────────────────────────────────
function generateSphereVolume(): Problem {
  const r = pickFrom([2, 3, 4, 6]);
  // 表面積 = 4πr²
  const surfNum = 4 * r * r;
  // 体積 = (4/3)πr³
  const volNum = 4 * r * r * r;
  const volSimple = volNum % 3 === 0 ? `${volNum / 3}π cm³` : `${volNum}/3 π cm³`;
  return {
    id: 'sphere_volume',
    title: '球の表面積と体積',
    questionText: [
      `半径${r}cmの球について、次を求めなさい（π使用）。`,
      '(1) 表面積',
      '(2) 体積',
    ],
    answerText: [
      `(1) ${surfNum}π cm²`,
      `(2) ${volSimple}`,
    ],
    explanationText: [
      '球の公式（必ず覚えよう！）',
      '• 表面積 ＝ 4πr²',
      '• 体積 ＝ (4/3)πr³',
      `(1) 表面積 ＝ 4π×${r}² ＝ 4π×${r * r} ＝ ${surfNum}π cm²`,
      `(2) 体積 ＝ (4/3)π×${r}³ ＝ (4/3)π×${r * r * r} ＝ ${volSimple}`,
    ],
    figureParams: { r, surfNum, volSimple },
  };
}

// ═══════════════════════════════════════════════════════════════
// 全パターンのプール & ランダム抽選
// ═══════════════════════════════════════════════════════════════

// 全生成関数を配列で管理
const ALL_GENERATORS: (() => Problem)[] = [
  generatePerpendicularBisector,
  generateParallelTranslation,
  generateRotation,
  generateSymmetric,
  generateMidpointConstruction,
  generateParallelCoord,
  generateRotationAngle,
  generateSectorArcArea,
  generateSectorAngleReverse,
  generateSkewLines,
  generatePolyhedraKnowledge,
  generatePrismVolume,
  generateConeVolume,
  generateSphereVolume,
];

/**
 * 全パターンから重複なしで5問をランダム抽選して返す
 */
export function generateProblems(): Problem[] {
  const shuffled = [...ALL_GENERATORS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5).map(gen => gen());
}
