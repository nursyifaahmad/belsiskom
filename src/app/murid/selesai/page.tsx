'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  Home, 
  RotateCcw, 
  Sparkles, 
  Share2, 
  Download,
  School
} from 'lucide-react';
import { usePersistentStudentState } from '@/hooks/usePersistentStudentState';
import { formatScore, getGainCategory } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function SelesaiPage() {
  const { studentData, isLoaded, clearSession } = usePersistentStudentState();

  useEffect(() => {
    // Fire celebratory confetti on page load
    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
      });
    } catch (e) {
      // ignore
    }
  }, []);

  if (!isLoaded || !studentData) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center text-sm">
        Memuat sertifikat kelulusan...
      </div>
    );
  }

  const diagScore = studentData.diagnosticScore ?? 0;
  const postScore = studentData.postTestScore ?? 0;
  const scoreDiff = postScore - diagScore;
  const nGain = studentData.nGainScore ?? 0;
  const gainInfo = getGainCategory(nGain);

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 text-white py-10 px-4 flex flex-col justify-between">
      <div className="max-w-2xl mx-auto w-full space-y-6">
        {/* Top Trophy Banner */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20 animate-bounce">
            <Award className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
            Selamat, Pembelajaran Tuntas!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Kamu telah menyelesaikan seluruh tahapan belajar Sistem Komputer (BELSISKOM).
          </p>
        </div>

        {/* Score Comparison Box */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 shadow-2xl backdrop-blur-md">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Perbandingan Capaian Belajar Kamu:</span>
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Skor Diagnostik */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700 text-center">
              <div className="text-[11px] text-slate-400 uppercase font-bold">
                Tes Diagnostik Awal
              </div>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 mt-1">
                {formatScore(diagScore)}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                (Sebelum Mempelajari Materi)
              </div>
            </div>

            {/* Skor Post-Test */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-900/60 to-indigo-900/60 border border-blue-500/40 text-center">
              <div className="text-[11px] text-blue-300 uppercase font-bold">
                Post-Test (Sumatif)
              </div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 mt-1">
                {formatScore(postScore)}
              </div>
              <div className="text-[10px] text-blue-300/80 mt-1">
                (Setelah Mempelajari Materi)
              </div>
            </div>
          </div>

          {/* Gain Assessment Card */}
          <div className="mt-4 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-300">
                  Peningkatan Skor (N-Gain: {nGain.toFixed(2)})
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  Selisih: <strong>+{scoreDiff > 0 ? scoreDiff : 0} Poin</strong> • {gainInfo.label}
                </div>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              TUNTAS
            </span>
          </div>
        </div>

        {/* Digital Certificate Card */}
        <div className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Certificate Header */}
          <div className="text-center pb-4 border-b border-slate-800">
            <div className="text-[10px] tracking-widest uppercase font-mono text-amber-400 font-bold">
              SERTIFIKAT KELULUSAN DIGITAL
            </div>
            <div className="text-sm font-semibold text-slate-300 mt-0.5 flex items-center justify-center gap-1.5">
              <School className="w-4 h-4 text-blue-400" />
              <span>SMP NEGERI 2 LEMAHABANG</span>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="text-center py-6 space-y-3">
            <p className="text-xs text-slate-400 italic">Diberikan dengan bangga kepada:</p>
            <div className="text-xl sm:text-2xl font-black text-white tracking-wide">
              {studentData.fullName}
            </div>
            <div className="inline-block px-3 py-1 rounded-full bg-slate-800 text-xs text-blue-300 font-mono border border-slate-700">
              Kelas {studentData.className} • Nomor Absen {studentData.absentNo}
            </div>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed pt-2">
              Telah berhasil menyelesaikan pembelajaran terpadu <strong>Sistem Komputer (Hardware, Software, Brainware)</strong> serta Simulasi Perakitan PC pada media belajar <strong>BELSISKOM</strong>.
            </p>
          </div>

          {/* Certificate Footer Signature */}
          <div className="pt-4 border-t border-slate-800 flex items-end justify-between text-xs">
            <div>
              <div className="text-[10px] text-slate-500">Tanggal Selesai:</div>
              <div className="font-semibold text-slate-300">{currentDate}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-500">Guru Mata Pelajaran:</div>
              <div className="font-bold text-white mt-0.5">Ahmad Nursyifa, S.Pd.</div>
              <div className="text-[10px] text-slate-400">NIP. 19930411 202221 1 007</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <button
            onClick={() => {
              if (confirm('Apakah kamu ingin keluar dan mengosongkan data lokal di HP ini? Pastikan nilai kamu sudah tercatat di guru ya!')) {
                clearSession();
                window.location.href = '/';
              }
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border border-slate-700 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ganti Akun / Keluar Sesi</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-[11px] text-slate-500 mt-10">
        BELSISKOM • SMPN 2 Lemahabang • Portal Murid
      </footer>
    </div>
  );
}
