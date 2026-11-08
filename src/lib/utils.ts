import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatScore(score: number): string {
  return Number.isInteger(score) ? score.toString() : score.toFixed(1);
}

// Menghitung Normalized Gain (Hake) untuk perbandingan pre/post test
// g = (post - pre) / (100 - pre)
export function calculateNGain(pre: number, post: number): number {
  if (pre >= 100) return post >= 100 ? 1 : 0;
  const gain = (post - pre) / (100 - pre);
  return Math.max(0, Math.min(1, parseFloat(gain.toFixed(2))));
}

export function getGainCategory(nGain: number): { label: string; color: string } {
  if (nGain >= 0.7) return { label: 'Tinggi (Efektif Sekali)', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
  if (nGain >= 0.3) return { label: 'Sedang (Cukup Efektif)', color: 'text-blue-600 bg-blue-50 border-blue-200' };
  return { label: 'Rendah (Perlu Bimbingan)', color: 'text-amber-600 bg-amber-50 border-amber-200' };
}
