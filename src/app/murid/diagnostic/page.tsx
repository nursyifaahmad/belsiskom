'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { getDiagnosticQuestions, Question } from '@/data/questions';
import { usePersistentStudentState } from '@/hooks/usePersistentStudentState';

export default function DiagnosticPage() {
  const router = useRouter();
  const { studentData, isLoaded, saveState } = usePersistentStudentState();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Get diagnostic questions
  const allDiagQuestions = useMemo(() => getDiagnosticQuestions(), []);

  // Pseudo-randomize question order based on student absentNo to reduce peeking
  const questions: Question[] = useMemo(() => {
    if (!studentData?.absentNo) return allDiagQuestions;
    const shift = studentData.absentNo % allDiagQuestions.length;
    return [...allDiagQuestions.slice(shift), ...allDiagQuestions.slice(0, shift)];
  }, [allDiagQuestions, studentData?.absentNo]);

  // Load existing answers from state on mount
  useEffect(() => {
    if (isLoaded) {
      if (!studentData) {
        router.replace('/murid/register');
        return;
      }
      if (studentData.diagnosticAnswers) {
        setAnswers(studentData.diagnosticAnswers);
      }
      // If student already completed diagnostic, forward to learning
      if (studentData.status === 'LEARNING') {
        router.replace('/murid/materi');
      } else if (studentData.status === 'POSTTEST') {
        router.replace('/murid/post-test');
      } else if (studentData.status === 'COMPLETED') {
        router.replace('/murid/selesai');
      }
    }
  }, [isLoaded, studentData, router]);

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / totalQuestions) * 100;

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (!currentQ || !studentData) return;
    const newAnswers = { ...answers, [currentQ.id]: key };
    setAnswers(newAnswers);

    // Save persistent state immediately
    saveState({
      ...studentData,
      diagnosticAnswers: newAnswers,
      status: 'DIAGNOSTIC',
    });
  };

  const handleSubmit = async () => {
    if (!studentData) return;
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/student/submit-diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: studentData.studentId,
          answers,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrorMsg(data.message || 'Gagal mengirim jawaban.');
        setIsSubmitting(false);
        return;
      }

      // Update local state to LEARNING
      saveState({
        ...studentData,
        status: 'LEARNING',
        diagnosticScore: data.score,
        diagnosticCorrectCount: data.correctCount,
        currentLearningStep: 1,
      });

      // Proceed to learning material
      router.push('/murid/materi');
    } catch (err: any) {
      setErrorMsg('Gagal terhubung ke server: ' + err.message);
      setIsSubmitting(false);
    }
  };

  if (!isLoaded || !studentData || !currentQ) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center text-sm">
        Memuat lembar asesmen...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between py-5 px-3 md:px-6">
      {/* Top Header */}
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Tahap 2: Tes Diagnostik Awal
              </span>
              <span className="text-xs text-slate-400">
                {studentData.fullName} ({studentData.className} • Absen {studentData.absentNo})
              </span>
            </div>
            <h1 className="text-base md:text-lg font-bold text-white mt-1">
              Asesmen Pengetahuan Awal Siswa
            </h1>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 font-mono">Terjawab:</span>
            <div className="text-sm font-bold text-amber-400">
              {answeredCount} / {totalQuestions}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-yellow-400 h-2 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Palette Numbers (Horizontal scrollable or flex) */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-3 my-2 scrollbar-none">
          {questions.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-7 h-7 shrink-0 rounded-lg text-xs font-bold transition flex items-center justify-center ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400'
                    : isAnswered
                    ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Single Question Card */}
      <div className="max-w-2xl mx-auto w-full my-auto py-4">
        <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-5 md:p-8 shadow-2xl backdrop-blur-sm">
          {/* Question Meta */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-2 border-b border-slate-700/60">
            <span className="font-mono text-amber-400 font-bold">
              SOAL NO. {currentIndex + 1} DARI {totalQuestions}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-700/60 uppercase text-[10px] tracking-wider text-slate-300">
              Kategori: {currentQ.category}
            </span>
          </div>

          {/* Question Text */}
          <div className="text-base md:text-lg font-medium text-slate-100 leading-relaxed mb-4">
            {currentQ.question}
          </div>

          {/* Hardware Question Visual Stimulus Image */}
          {currentQ.image && (
            <div className="mb-6 rounded-2xl overflow-hidden border-2 border-slate-700/80 bg-slate-950/70 p-4 flex flex-col items-center justify-center shadow-inner group">
              <div className="relative w-full max-w-sm flex items-center justify-center">
                <img
                  src={currentQ.image}
                  alt={currentQ.question}
                  className="max-h-48 md:max-h-56 w-auto object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                  loading="eager"
                />
              </div>
              <div className="mt-2.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] text-amber-300 font-medium flex items-center gap-1.5">
                <span>🔍 Amati detail gambar perangkat di atas dengan teliti!</span>
              </div>
            </div>
          )}

          {/* Multiple Choice Options (A, B, C, D) */}
          <div className="space-y-3">
            {currentQ.options.map((opt) => {
              const isSelected = answers[currentQ.id] === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() => handleSelectOption(opt.key)}
                  className={`w-full p-3.5 md:p-4 rounded-2xl text-left transition-all border flex items-center gap-3.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-400 text-white shadow-lg shadow-blue-600/30 scale-[1.01]'
                      : 'bg-slate-900/70 border-slate-700 hover:border-slate-500 text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected
                        ? 'bg-white text-blue-700'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {opt.key}
                  </div>
                  <span className="text-xs md:text-sm font-medium leading-snug">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Friendly encouragement note */}
          <div className="mt-6 p-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-[11px] text-slate-400 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              Jangan takut salah! Tes diagnostik ini bertujuan memetakan pemahaman awalmu sebelum materi dimulai.
            </span>
          </div>
        </div>

        {/* Navigation Controls (Prev / Next / Finish) */}
        <div className="flex items-center justify-between gap-3 mt-6">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-40"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition"
            >
              <span>Selanjutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setShowConfirmModal(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 transition animate-pulse"
            >
              <Send className="w-4 h-4" />
              <span>Selesai & Kumpulkan</span>
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg">Kirim Tes Diagnostik?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Kamu telah menjawab <strong>{answeredCount}</strong> dari {totalQuestions} soal. Nilai akan tercatat di portal Pak Guru dan kamu akan langsung diarahkan ke Materi Terpandu.
            </p>

            {answeredCount < totalQuestions && (
              <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs text-left flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>Masih ada {totalQuestions - answeredCount} soal yang belum kamu jawab.</span>
              </div>
            )}

            {errorMsg && (
              <div className="text-xs text-rose-400 font-semibold">{errorMsg}</div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                disabled={isSubmitting}
                className="py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-semibold transition"
              >
                Cek Lagi
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-md shadow-emerald-600/30 flex items-center justify-center gap-1.5"
              >
                {isSubmitting ? 'Mengirim...' : 'Ya, Kirim!'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer info */}
      <div className="max-w-2xl mx-auto w-full text-center text-[11px] text-slate-500 pt-3">
        Jawaban kamu otomatis disimpan di smartphone ini setiap detik.
      </div>
    </div>
  );
}
