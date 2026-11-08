'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Laptop, 
  Cpu, 
  Layers, 
  Users, 
  Wrench, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Lock, 
  HelpCircle,
  AlertCircle,
  Lightbulb,
  Award
} from 'lucide-react';
import { LEARNING_STEPS, LearningStep } from '@/data/learningContent';
import PcBuilderSimulator from '@/components/simulator/PcBuilderSimulator';
import { usePersistentStudentState } from '@/hooks/usePersistentStudentState';
import confetti from 'canvas-confetti';

const ICON_MAP: Record<string, any> = {
  Laptop,
  Cpu,
  Layers,
  Users,
  Wrench,
};

export default function LearningMaterialPage() {
  const router = useRouter();
  const { studentData, isLoaded, saveState } = usePersistentStudentState();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([]);
  const [pcSimulatorDone, setPcSimulatorDone] = useState(false);
  const [validationQuizAnswers, setValidationQuizAnswers] = useState<Record<string, number>>({});

  // Validation modal state
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<{ isCorrect: boolean; feedback: string } | null>(null);

  // Load from persistent state
  useEffect(() => {
    if (isLoaded) {
      if (!studentData) {
        router.replace('/murid/register');
        return;
      }
      if (studentData.currentLearningStep) {
        setCurrentStepIndex(Math.max(0, Math.min(LEARNING_STEPS.length - 1, studentData.currentLearningStep - 1)));
      }
      if (studentData.completedSteps) {
        setCompletedStepIds(studentData.completedSteps);
      }
      if (studentData.pcSimulatorDone) {
        setPcSimulatorDone(true);
      }
      if (studentData.validationQuizAnswers) {
        setValidationQuizAnswers(studentData.validationQuizAnswers);
      }
      // If student is at post-test already
      if (studentData.status === 'POSTTEST') {
        router.replace('/murid/post-test');
      } else if (studentData.status === 'COMPLETED') {
        router.replace('/murid/selesai');
      }
    }
  }, [isLoaded, studentData, router]);

  const currentStep = LEARNING_STEPS[currentStepIndex];
  const StepIcon = currentStep ? ICON_MAP[currentStep.iconName] || Laptop : Laptop;
  const isCurrentStepCompleted = completedStepIds.includes(currentStep?.id);
  const isFinalStep = currentStepIndex === LEARNING_STEPS.length - 1;

  const handleOpenValidationModal = () => {
    // If Step 3 (PC Builder), ensure simulation is done first
    if (currentStep.id === 'pc-assembly-simulator' && !pcSimulatorDone) {
      alert('Kamu harus menyelesaikan pemasangan seluruh komponen komputer dan menyalakan PC terlebih dahulu!');
      return;
    }
    setSelectedQuizOption(null);
    setQuizResult(null);
    setShowValidationModal(true);
  };

  const handleCheckQuizAnswer = () => {
    if (selectedQuizOption === null) return;
    const isCorrect = selectedQuizOption === currentStep.validationQuiz.correctIndex;

    if (isCorrect) {
      setQuizResult({
        isCorrect: true,
        feedback: currentStep.validationQuiz.explanation,
      });

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });

      const nextCompleted = Array.from(new Set([...completedStepIds, currentStep.id]));
      setCompletedStepIds(nextCompleted);

      const nextQuizAnswers = { ...validationQuizAnswers, [currentStep.id]: selectedQuizOption };
      setValidationQuizAnswers(nextQuizAnswers);

      if (studentData) {
        saveState({
          ...studentData,
          status: 'LEARNING',
          currentLearningStep: currentStepIndex + 1,
          completedSteps: nextCompleted,
          pcSimulatorDone,
          validationQuizAnswers: nextQuizAnswers,
        });
      }
    } else {
      setQuizResult({
        isCorrect: false,
        feedback: 'Jawabanmu belum tepat. Coba baca kembali materi di langkah ini dan pilih jawaban yang benar ya!',
      });
    }
  };

  const handleNextStep = () => {
    setShowValidationModal(false);
    if (currentStepIndex < LEARNING_STEPS.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (studentData) {
        saveState({
          ...studentData,
          currentLearningStep: nextIndex + 1,
        });
      }
    } else {
      // Proceed to Post-Test
      if (studentData) {
        saveState({
          ...studentData,
          status: 'POSTTEST',
        });
      }
      router.push('/murid/post-test');
    }
  };

  if (!isLoaded || !studentData || !currentStep) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center text-sm">
        Memuat materi BELSISKOM...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between py-6 px-3 md:px-6">
      {/* Header & Step Navigation Pills */}
      <div className="max-w-3xl mx-auto w-full mb-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Tahap 3: Materi Terpandu
              </span>
              <span className="text-xs text-slate-400">
                {studentData.fullName} ({studentData.className})
              </span>
            </div>
            <h1 className="text-lg md:text-xl font-bold mt-1 text-white">
              Sistem Komputer (Hardware, Software, Brainware)
            </h1>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-slate-400">Langkah:</span>
            <div className="text-sm font-bold text-blue-400">
              {currentStepIndex + 1} / {LEARNING_STEPS.length}
            </div>
          </div>
        </div>

        {/* Step Tabs / Breadcrumbs */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none">
          {LEARNING_STEPS.map((step, idx) => {
            const isCompleted = completedStepIds.includes(step.id);
            const isCurrent = idx === currentStepIndex;
            const isLocked = idx > 0 && !completedStepIds.includes(LEARNING_STEPS[idx - 1].id);

            return (
              <button
                key={step.id}
                onClick={() => {
                  if (!isLocked) {
                    setCurrentStepIndex(idx);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                disabled={isLocked}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-400'
                    : isCompleted
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40'
                    : isLocked
                    ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : isLocked ? (
                  <Lock className="w-3.5 h-3.5" />
                ) : (
                  <span>{step.stepNumber}.</span>
                )}
                <span>{step.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Material Card */}
      <main className="max-w-3xl mx-auto w-full flex-1">
        <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-5 md:p-8 shadow-2xl backdrop-blur-sm">
          {/* Step Header Title */}
          <div className="flex items-start gap-4 pb-6 border-b border-slate-700/80">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
              <StepIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-blue-400 tracking-wider uppercase">
                LANGKAH {currentStep.stepNumber} DARI {LEARNING_STEPS.length}
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white mt-0.5">
                {currentStep.title}
              </h2>
              <p className="text-xs md:text-sm text-slate-300 mt-1">
                {currentStep.subtitle}
              </p>
            </div>
          </div>

          {/* Step Content Sections */}
          <div className="py-6 space-y-6">
            {currentStep.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-base md:text-lg font-bold text-blue-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  {sec.heading}
                </h3>
                {sec.subheading && (
                  <h4 className="text-xs md:text-sm font-semibold text-slate-400 italic">
                    {sec.subheading}
                  </h4>
                )}

                {/* Paragraphs */}
                <div className="space-y-2 text-xs md:text-sm text-slate-200 leading-relaxed">
                  {sec.bodyParagraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* Key Points list */}
                {sec.keyPoints && (
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700 space-y-2 my-3">
                    {sec.keyPoints.map((kp, kpIdx) => (
                      <div key={kpIdx} className="text-xs md:text-sm text-slate-200 flex items-start gap-2">
                        <span className="text-blue-400 font-bold shrink-0">•</span>
                        <span>{kp}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Analogy Box */}
                {sec.analogyBox && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-100 my-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                      <Lightbulb className="w-4 h-4" />
                      <span>{sec.analogyBox.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                        {sec.analogyBox.badgeText}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-amber-200/90 leading-relaxed whitespace-pre-line">
                      {sec.analogyBox.content}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Embedded PC Builder Simulator on Step 3 */}
            {currentStep.id === 'pc-assembly-simulator' && (
              <div className="mt-4">
                <PcBuilderSimulator
                  isAlreadyCompleted={pcSimulatorDone}
                  onComplete={() => {
                    setPcSimulatorDone(true);
                    if (studentData) {
                      saveState({
                        ...studentData,
                        pcSimulatorDone: true,
                      });
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* Bottom Action: Pop-up Validation Button */}
          <div className="pt-6 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              {isCurrentStepCompleted ? (
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Langkah ini telah tervalidasi!</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-amber-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Selesaikan kuis validasi langkah untuk membuka materi selanjutnya.</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {currentStepIndex > 0 && (
                <button
                  onClick={() => {
                    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Materi Sebelumnya</span>
                </button>
              )}

              {isCurrentStepCompleted ? (
                <button
                  onClick={handleNextStep}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs md:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition"
                >
                  <span>{isFinalStep ? 'Lanjut ke Post-Test (Asesmen Akhir)' : 'Lanjut ke Langkah Berikutnya'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleOpenValidationModal}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 text-xs md:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 transition animate-pulse"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Validasi Langkah Ini (Kuis Kilat)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Pop-up Validation Quiz Modal */}
      {showValidationModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-800 border-2 border-slate-700 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Validasi Pemahaman Langkah {currentStep.stepNumber}</h3>
                  <div className="text-[10px] text-slate-400">Jawab kuis kilat ini untuk melanjutkan belajar</div>
                </div>
              </div>
            </div>

            {/* Quiz Question */}
            <div className="text-sm font-medium text-slate-100 leading-relaxed">
              {currentStep.validationQuiz.question}
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {currentStep.validationQuiz.options.map((opt, oIdx) => {
                const isSelected = selectedQuizOption === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => {
                      if (!quizResult?.isCorrect) {
                        setSelectedQuizOption(oIdx);
                        setQuizResult(null);
                      }
                    }}
                    className={`w-full p-3 rounded-xl text-left text-xs transition border flex items-center gap-2.5 ${
                      isSelected
                        ? 'bg-blue-600 border-blue-400 text-white font-semibold'
                        : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:border-slate-500'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-md bg-slate-800 text-center leading-5 font-bold shrink-0 text-[10px]">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Feedback Message */}
            {quizResult && (
              <div className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                quizResult.isCorrect
                  ? 'bg-emerald-950/70 border border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/70 border border-rose-500/40 text-rose-200'
              }`}>
                {quizResult.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-bold">{quizResult.isCorrect ? 'Jawaban Benar!' : 'Belum Tepat'}</div>
                  <p className="mt-0.5">{quizResult.feedback}</p>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              {!quizResult?.isCorrect ? (
                <>
                  <button
                    onClick={() => setShowValidationModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-semibold transition"
                  >
                    Tutup & Baca Lagi
                  </button>
                  <button
                    onClick={handleCheckQuizAnswer}
                    disabled={selectedQuizOption === null}
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition disabled:opacity-50"
                  >
                    Periksa Jawaban
                  </button>
                </>
              ) : (
                <button
                  onClick={handleNextStep}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
                >
                  <span>{isFinalStep ? 'Hebat! Lanjut ke Post-Test' : 'Hebat! Buka Langkah Berikutnya'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="max-w-3xl mx-auto w-full text-center text-[11px] text-slate-500 mt-6">
        Progres materi tersimpan otomatis di perangkat smartphone kamu.
      </div>
    </div>
  );
}
