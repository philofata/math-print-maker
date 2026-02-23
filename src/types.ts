// types.ts — shared Problem interface used by both subjects

export type Subject = 'math' | 'social';

export interface Problem {
  id: string;
  subject: Subject;
  title: string;
  questionText: string[];
  answerText: string[];
  explanationText: string[];
  figureParams: Record<string, unknown>;
  // Optional: for problems with no figure (text-only)
  noFigure?: boolean;
}
