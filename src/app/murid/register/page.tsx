'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Laptop, ArrowLeft, ArrowRight, User, Hash, School, AlertCircle } from 'lucide-react';
import { usePersistentStudentState } from '@/hooks/usePersistentStudentState';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryCode = searchParams.get('code') || '';

  const { saveState, studentData } = usePersistentStudentState();

  const [sessionCode, setSessionCode] = useState(queryCode);
  const [fullName, setFullName] = useState(studentData?.fullName || '');
  const [className, setClassName] = useState(studentData?.className || '7-A');
  const [absentNo, setAbsentNo] = useState(studentData?.absentNo ? studentData.absentNo.toString() : '');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const classOptions = ['7-A', '7-B', '7-C', '7-D', '7-E', '7-F', '7-G'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Nama lengkap wajib diisi!');
      return;
    }

    const absentNumber = parseInt(absentNo, 10);
    if (isNaN(absentNumber) || absentNumber < 1 || absentNumber > 45) {
      setErrorMsg('Nomor absen harus antara 1 sampai 45!');
      return;
    }

    setLoading(true);

    try {
      // Generate or retrieve persistent device token
      let deviceToken = localStorage.getItem('belsiskom_device_token');
      if (!deviceToken) {
        deviceToken = 'dev_' + Math.random().toString(36).substring(2, 12);
        localStorage.setItem('belsiskom_device_token', deviceToken);
      }

      const res = await fetch('/api/student/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionCode: sessionCode.trim().toUpperCase(),
          name: fullName.trim(),
          absentNo: absentNumber,
          className,
          deviceToken,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrorMsg(data.message || 'Pendaftaran gagal.');
        setLoading(false);
        return;
      }

      // Initialize persistent student state
      saveState({
        studentId: data.student.id,
        sessionId: data.session.id,
        sessionCode: data.session.code,
        fullName: data.student.name,
        className: data.student.className,
        absentNo: data.student.absentNo,
        status: data.student.status || 'DIAGNOSTIC',
        diagnosticAnswers: {},
        currentLearningStep: data.student.currentStep || 1,
        completedSteps: [],
        pcSimulatorDone: false,
        validationQuizAnswers: {},
        postTestAnswers: {},
        lastUpdated: Date.now(),
      });

      // Route to next step based on status
      if (data.student.status === 'LEARNING') {
        router.push('/murid/materi');
      } else if (data.student.status === 'POSTTEST') {
        router.push('/murid/post-test');
      } else if (data.student.status === 'COMPLETED') {
        router.push('/murid/selesai');
      } else {
        router.push('/murid/diagnostic');
      }
    } catch (err: any) {
      setErrorMsg('Terjadi kesalahan jaringan saat mendaftar: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between py-6 px-4">
      {/* Top Bar */}
      <div className="max-w-md mx-auto w-full flex items-center justify-between mb-4">
        <Link
          href="/"
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </Link>
        <span className="text-xs font-mono text-blue-400">Tahap 1 / 4: Biodata</span>
      </div>

      {/* Main Registration Card */}
      <div className="max-w-md mx-auto w-full bg-slate-800/80 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/30 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto mb-3">
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold">Biodata Murid</h2>
          <p className="text-xs text-slate-300 mt-1">
            Isi identitas diri kamu untuk memulai pembelajaran Informatika Sistem Komputer.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Kode Sesi */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Kode Sesi Guru:
            </label>
            <input
              type="text"
              value={sessionCode}
              onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
              placeholder="Contoh: BSK-7A1 (Kosongkan jika auto)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm tracking-wider focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Nama Lengkap */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Nama Lengkap:
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Contoh: Muhammad Rizky Pratama"
                className="w-full px-3.5 py-2.5 pl-10 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
          </div>

          {/* Kelas & No Absen (Grid 2 Kolom) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Kelas:
              </label>
              <div className="relative">
                <select
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition appearance-none"
                >
                  {classOptions.map((c) => (
                    <option key={c} value={c}>
                      Kelas {c}
                    </option>
                  ))}
                </select>
                <School className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nomor Absen:
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="45"
                  required
                  value={absentNo}
                  onChange={(e) => setAbsentNo(e.target.value)}
                  placeholder="1 - 40"
                  className="w-full px-3.5 py-2.5 pl-9 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition"
                />
                <Hash className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? (
              <span>Menghubungkan Sesi...</span>
            ) : (
              <>
                <span>Masuk & Mulai Tes Diagnostik</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Note footer */}
      <div className="text-center text-[11px] text-slate-500 mt-4">
        Data kamu akan otomatis tersimpan di HP ini jika terjadi kendala teknis atau baterai habis.
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 text-white flex items-center justify-center text-sm">Memuat pendaftaran...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
