'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Laptop, 
  Cpu, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCw, 
  BookOpen, 
  Layers, 
  Users,
  Lock
} from 'lucide-react';
import { usePersistentStudentState } from '@/hooks/usePersistentStudentState';

export default function HomePage() {
  const router = useRouter();
  const { studentData, isLoaded } = usePersistentStudentState();

  const [activeSession, setActiveSession] = useState<any>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Check active session on mount & auto-poll
  const checkSessionStatus = async () => {
    try {
      const res = await fetch('/api/session/check');
      const data = await res.json();
      if (res.ok && data.ok && data.isActive) {
        setActiveSession(data.session);
      } else {
        setActiveSession(null);
      }
    } catch (err) {
      console.error(err);
      setActiveSession(null);
    } finally {
      setCheckingSession(false);
    }
  };

  useEffect(() => {
    checkSessionStatus();
    // Auto-polling setiap 4 detik agar status sesi langsung aktif saat guru mengaktifkan sesi
    const interval = setInterval(checkSessionStatus, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleStartLearning = () => {
    setErrorMsg('');
    if (activeSession && activeSession.isActive) {
      router.push(`/murid/register?code=${encodeURIComponent(activeSession.code)}`);
    } else {
      setErrorMsg('Sesi pembelajaran belum dibuka oleh Pak Guru Ahmad Nursyifa.');
    }
  };

  const handleResumeSavedSession = () => {
    if (!studentData) return;
    if (studentData.status === 'DIAGNOSTIC') {
      router.push('/murid/diagnostic');
    } else if (studentData.status === 'LEARNING') {
      router.push('/murid/materi');
    } else if (studentData.status === 'POSTTEST') {
      router.push('/murid/post-test');
    } else if (studentData.status === 'COMPLETED') {
      router.push('/murid/selesai');
    } else {
      router.push('/murid/register');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-slate-950 text-white flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="border-b border-white/10 backdrop-blur-md bg-white/5 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Laptop className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-lg md:text-xl tracking-tight flex items-center gap-1.5">
                <span>BELSISKOM</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-300 font-mono">
                  SMP KELAS 7
                </span>
              </div>
              <div className="text-[11px] text-blue-200/70">
                SMP Negeri 2 Lemahabang • Kab. Cirebon
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12 w-full flex-1 flex flex-col justify-center">
        
        {/* Crash Recovery Notification (if student has saved progress in local storage) */}
        {isLoaded && studentData && studentData.status !== 'COMPLETED' && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-500/20 border-2 border-amber-400/50 backdrop-blur-sm animate-pulse-subtle">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <RotateCw className="w-6 h-6 text-amber-400 shrink-0 mt-0.5 animate-spin" style={{ animationDuration: '8s' }} />
                <div>
                  <h4 className="font-bold text-amber-300 text-sm md:text-base">
                    Sesi Belajar Ditemukan Kembali!
                  </h4>
                  <p className="text-xs md:text-sm text-slate-200 mt-0.5">
                    Halo <strong>{studentData.fullName}</strong> ({studentData.className}, No. {studentData.absentNo})! HP kamu menyimpan progres belajar terakhir ({studentData.status === 'DIAGNOSTIC' ? 'Tes Diagnostik' : studentData.status === 'LEARNING' ? 'Materi Terpandu' : 'Post-Test'}).
                  </p>
                </div>
              </div>
              <button
                onClick={handleResumeSavedSession}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/30 transition shrink-0"
              >
                Lanjutkan Belajar ➔
              </button>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            Media Pembelajaran Interaktif Informatika
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Belajar Sistem Komputer <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
              Lebih Mudah & Menyenangkan!
            </span>
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
            Didesain khusus untuk murid kelas 7-A sampai 7-G yang baru mulai mengenal Informatika. Pahami <strong>Hardware</strong>, <strong>Software</strong>, dan <strong>Brainware</strong> lewat materi visual & simulasi rakit PC interaktif!
          </p>
        </div>

        {/* Session Card / Access Gate */}
        <div className="bg-slate-900/80 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md max-w-xl mx-auto w-full">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-base md:text-lg">Status Sesi Pembelajaran</h3>
            </div>
            <button
              onClick={checkSessionStatus}
              disabled={checkingSession}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
            >
              <RotateCw className={`w-3.5 h-3.5 ${checkingSession ? 'animate-spin' : ''}`} />
              Segarkan
            </button>
          </div>

          <div className="my-6">
            {checkingSession && !activeSession ? (
              <div className="p-4 rounded-xl bg-slate-800/50 text-center text-sm text-slate-400 flex items-center justify-center gap-2">
                <RotateCw className="w-4 h-4 animate-spin text-blue-400" />
                <span>Memeriksa status sesi pembelajaran...</span>
              </div>
            ) : activeSession ? (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-sm">Sesi Belajar Aktif!</div>
                    <div className="text-xs text-emerald-300/80 mt-0.5">
                      Dibuka oleh: <strong>Pak Ahmad Nursyifa</strong> • Untuk: <strong>{activeSession.targetClass === 'ALL' ? 'Semua Kelas 7 (7A - 7G)' : `Kelas ${activeSession.targetClass}`}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-rose-950/50 border border-rose-500/40 text-rose-200">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                  <div>
                    <div className="font-bold text-sm">Sesi Belum Dibuka</div>
                    <div className="text-xs text-rose-300/80 mt-0.5">
                      Pak Guru Ahmad Nursyifa belum mengaktifkan sesi kelas. Tombol mulai belajar akan aktif otomatis ketika guru membuka sesi pembelajaran.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {errorMsg && (
              <p className="text-xs text-rose-400 font-medium text-center">{errorMsg}</p>
            )}

            {checkingSession && !activeSession ? (
              <button
                disabled
                className="w-full py-3.5 px-6 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 font-bold text-sm md:text-base flex items-center justify-center gap-2 cursor-wait opacity-80"
              >
                <RotateCw className="w-4 h-4 animate-spin text-slate-400" />
                <span>Memeriksa Sesi Pembelajaran...</span>
              </button>
            ) : activeSession ? (
              <button
                onClick={handleStartLearning}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm md:text-base shadow-lg shadow-blue-600/40 flex items-center justify-center gap-2 transition active:scale-[0.98] cursor-pointer animate-pulse-subtle"
              >
                <span>Mulai Belajar BELSISKOM</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                disabled
                className="w-full py-3.5 px-6 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-400 font-bold text-sm md:text-base flex items-center justify-center gap-2 cursor-not-allowed opacity-75 shadow-none"
              >
                <Lock className="w-4 h-4 text-slate-500" />
                <span>Menunggu Guru Mengaktifkan Sesi...</span>
              </button>
            )}
          </div>
        </div>

        {/* Feature Highlights (3 Pillars) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white">1. Hardware (Perangkat Keras)</h4>
            <p className="text-xs text-slate-300 mt-1">
              Pelajari input, CPU, RAM, storage, dan rakit komputermu sendiri lewat simulator interaktif!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white">2. Software (Perangkat Lunak)</h4>
            <p className="text-xs text-slate-300 mt-1">
              Kenali sistem operasi seperti Windows & Android serta berbagai aplikasi produktivitas.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-white">3. Brainware (Pengguna)</h4>
            <p className="text-xs text-slate-300 mt-1">
              Menjadi pengguna komputer yang cerdas, beretika, dan memahami profesi programmer masa depan.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        <p>BELSISKOM © 2026 • Dirancang oleh <strong>Ahmad Nursyifa, S.Kom.</strong> untuk Informatika Kelas 7 SMPN 2 Lemahabang</p>
      </footer>
    </div>
  );
}
