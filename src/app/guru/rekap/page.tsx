'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Laptop, 
  ArrowLeft, 
  TrendingUp, 
  FileText, 
  Table, 
  RotateCw, 
  CheckCircle2, 
  AlertTriangle,
  Award,
  BarChart3,
  HelpCircle
} from 'lucide-react';
import { QUESTIONS } from '@/data/questions';
import { generateReportPdf } from '@/lib/exportPdf';
import { generateReportExcel } from '@/lib/exportExcel';
import { formatScore, getGainCategory } from '@/lib/utils';

export default function TeacherRekapPage() {
  const router = useRouter();

  const [students, setStudents] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [itemAnalysis, setItemAnalysis] = useState<Record<number, any>>({});
  const [selectedClass, setSelectedClass] = useState<string>('ALL');
  const [selectedSessionId, setSelectedSessionId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const classOptions = ['ALL', '7-A', '7-B', '7-C', '7-D', '7-E', '7-F', '7-G'];

  const fetchData = async () => {
    try {
      let url = `/api/teacher/data?`;
      if (selectedSessionId) url += `sessionId=${selectedSessionId}&`;
      if (selectedClass && selectedClass !== 'ALL') url += `className=${selectedClass}&`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.ok) {
        setStudents(data.students || []);
        setSessions(data.sessions || []);
        setStats(data.stats || {});
        setItemAnalysis(data.itemAnalysis || {});
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isAuth = localStorage.getItem('belsiskom_teacher_auth');
    if (!isAuth) {
      router.replace('/guru/login');
      return;
    }
    fetchData();
  }, [selectedClass, selectedSessionId]);

  const activeSession = sessions.find((s) => s.id === selectedSessionId) || sessions[0];

  const handleExportPdf = () => {
    const rows = students.map((s) => ({
      absentNo: s.absentNo,
      name: s.name,
      className: s.className,
      diagScore: s.diagnosticResult ? s.diagnosticResult.score : null,
      postScore: s.postTestResult ? s.postTestResult.score : null,
      nGain: s.postTestResult ? s.postTestResult.nGain : null,
      status: s.status,
    }));
    generateReportPdf(rows, selectedClass === 'ALL' ? 'Semua Kelas 7' : `Kelas ${selectedClass}`, activeSession?.code);
  };

  const handleExportExcel = () => {
    const rows = students.map((s) => ({
      absentNo: s.absentNo,
      name: s.name,
      className: s.className,
      diagScore: s.diagnosticResult ? s.diagnosticResult.score : null,
      postScore: s.postTestResult ? s.postTestResult.score : null,
      nGain: s.postTestResult ? s.postTestResult.nGain : null,
      status: s.status,
    }));
    generateReportExcel(rows, selectedClass === 'ALL' ? 'Semua Kelas 7' : `Kelas ${selectedClass}`, activeSession?.code);
  };

  const diffAvg = (stats.avgPost || 0) - (stats.avgDiag || 0);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/guru/dashboard"
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-bold text-base flex items-center gap-2">
                <span>Rekapitulasi & Komparasi Asesmen</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                  DIAGNOSTIK VS POST-TEST
                </span>
              </h1>
              <div className="text-xs text-slate-400">
                Ahmad Nursyifa, S.Pd. • SMPN 2 Lemahabang
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportPdf}
              className="px-3.5 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-1.5 transition shadow"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Cetak PDF</span>
            </button>
            <button
              onClick={handleExportExcel}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 transition shadow"
            >
              <Table className="w-4 h-4" />
              <span className="hidden sm:inline">Ekspor Excel</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 w-full flex-1 space-y-6">
        
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Filter:</span>
            <select
              value={selectedSessionId}
              onChange={(e) => setSelectedSessionId(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
            >
              <option value="">Semua Sesi</option>
              {sessions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.code})
                </option>
              ))}
            </select>

            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
            >
              {classOptions.map((c) => (
                <option key={c} value={c}>
                  {c === 'ALL' ? 'Semua Kelas (7A - 7G)' : `Kelas ${c}`}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={fetchData}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Segarkan Data</span>
          </button>
        </div>

        {/* 4 Statistical Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase">Rata-rata Diagnostik</div>
            <div className="text-3xl font-black text-amber-400 mt-2">
              {stats.avgDiag || 0}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Dari {stats.diagCompleted || 0} murid yang mengerjakan
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase">Rata-rata Post-Test</div>
            <div className="text-3xl font-black text-emerald-400 mt-2">
              {stats.avgPost || 0}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Dari {stats.postCompleted || 0} murid yang menyelesaikan
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase">Peningkatan Nilai (Delta)</div>
            <div className="text-3xl font-black text-blue-400 mt-2">
              +{diffAvg > 0 ? diffAvg.toFixed(1) : 0}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Rata-rata kenaikan poin pemahaman
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase">Rata-rata N-Gain (Hake)</div>
            <div className="text-3xl font-black text-purple-400 mt-2">
              {stats.avgNGain || 0}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Efektivitas: <strong>{getGainCategory(stats.avgNGain || 0).label.split(' ')[0]}</strong>
            </div>
          </div>
        </div>

        {/* Detailed Table: Pre vs Post per Student */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-4 md:p-5 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-sm md:text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Daftar Nilai Siswa & Analisis Peningkatan</span>
            </h3>
            <span className="text-xs text-slate-400">{students.length} Siswa Terdaftar</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/80 text-slate-400 uppercase font-mono text-[11px]">
                <tr>
                  <th className="py-3 px-4">No</th>
                  <th className="py-3 px-4">Abs</th>
                  <th className="py-3 px-4">Nama Siswa</th>
                  <th className="py-3 px-4">Kelas</th>
                  <th className="py-3 px-4 text-center">Diagnostik (Pre)</th>
                  <th className="py-3 px-4 text-center">Post-Test (Post)</th>
                  <th className="py-3 px-4 text-center">Selisih (Delta)</th>
                  <th className="py-3 px-4 text-center">N-Gain</th>
                  <th className="py-3 px-4 text-center">Kategori Efektivitas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {students.map((student, idx) => {
                  const diag = student.diagnosticResult ? student.diagnosticResult.score : null;
                  const post = student.postTestResult ? student.postTestResult.score : null;
                  const diff = diag !== null && post !== null ? post - diag : null;
                  const nGain = student.postTestResult ? student.postTestResult.nGain : null;
                  const gainCat = nGain !== null ? getGainCategory(nGain) : null;

                  return (
                    <tr key={student.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4 text-slate-500 font-mono">{idx + 1}</td>
                      <td className="py-3 px-4 font-bold text-slate-300 font-mono">{student.absentNo}</td>
                      <td className="py-3 px-4 font-semibold text-white">{student.name}</td>
                      <td className="py-3 px-4 text-slate-400 font-mono">{student.className}</td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-amber-400">
                        {diag !== null ? formatScore(diag) : '-'}
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-emerald-400">
                        {post !== null ? formatScore(post) : '-'}
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-blue-300">
                        {diff !== null ? `+${diff > 0 ? diff : 0}` : '-'}
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-xs text-purple-300">
                        {nGain !== null ? nGain.toFixed(2) : '-'}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {gainCat ? (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${gainCat.color}`}>
                            {gainCat.label}
                          </span>
                        ) : (
                          <span className="text-slate-600 text-[11px]">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Item Analysis (Analisis Butir Soal) */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="font-bold text-base flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-400" />
                <span>Analisis Butir Soal (Tingkat Kesulitan Siswa)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Membantu Pak Guru Ahmad mengetahui materi mana yang perlu penguatan/remedial di kelas.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {QUESTIONS.map((q) => {
              const stat = itemAnalysis[q.id] || { wrongCount: 0, correctCount: 0 };
              const totalAttempted = stat.wrongCount + stat.correctCount;
              const wrongRate = totalAttempted > 0 ? (stat.wrongCount / totalAttempted) * 100 : 0;

              return (
                <div key={q.id} className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">
                    {q.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-slate-300 uppercase">
                        {q.category}
                      </span>
                      {wrongRate > 40 && (
                        <span className="text-[10px] text-rose-400 font-bold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Perlu Review Kelas
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                      {q.question}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Kunci: <strong className="text-white">({q.correctAnswer})</strong></span>
                      <span>
                        Salah: <strong className="text-rose-400">{stat.wrongCount} Siswa</strong> ({wrongRate.toFixed(0)}%)
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
}
