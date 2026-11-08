'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Laptop, 
  Users, 
  Power, 
  Plus, 
  RotateCw, 
  FileText, 
  Table, 
  QrCode, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Sparkles, 
  LogOut,
  SlidersHorizontal,
  School
} from 'lucide-react';
import QRCodeLib from 'qrcode';
import { generateReportPdf } from '@/lib/exportPdf';
import { generateReportExcel } from '@/lib/exportExcel';
import { formatScore, getGainCategory } from '@/lib/utils';

export default function TeacherDashboard() {
  const router = useRouter();

  const [sessions, setSessions] = useState<any[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string>('');
  const [students, setStudents] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [selectedClass, setSelectedClass] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [showQrModal, setShowQrModal] = useState(false);

  // New Session Modal
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);
  const [newSessionTitle, setNewSessionTitle] = useState('');
  const [newSessionClass, setNewSessionClass] = useState('7-A');
  const [newSessionCustomCode, setNewSessionCustomCode] = useState('');

  const classOptions = ['ALL', '7-A', '7-B', '7-C', '7-D', '7-E', '7-F', '7-G'];

  // Check login
  useEffect(() => {
    const isAuth = localStorage.getItem('belsiskom_teacher_auth');
    if (!isAuth) {
      router.replace('/guru/login');
    }
  }, [router]);

  // Fetch teacher data
  const fetchData = async () => {
    try {
      let url = `/api/teacher/data?`;
      if (selectedSessionId) url += `sessionId=${selectedSessionId}&`;
      if (selectedClass && selectedClass !== 'ALL') url += `className=${selectedClass}&`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.ok) {
        setSessions(data.sessions || []);
        setStudents(data.students || []);
        setStats(data.stats || {});

        // Auto select first active session if none selected
        if (!selectedSessionId && data.sessions && data.sessions.length > 0) {
          const active = data.sessions.find((s: any) => s.isActive);
          if (active) {
            setSelectedSessionId(active.id);
          } else {
            setSelectedSessionId(data.sessions[0].id);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching teacher data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedSessionId, selectedClass]);

  // Auto refresh interval
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      fetchData();
    }, 4000);
    return () => clearInterval(interval);
  }, [autoRefresh, selectedSessionId, selectedClass]);

  const activeSession = sessions.find((s) => s.id === selectedSessionId) || sessions[0];

  // Generate QR code for active session
  useEffect(() => {
    if (activeSession) {
      const joinUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/murid/register?code=${activeSession.code}`
        : `https://belsiskom.an.my.id/murid/register?code=${activeSession.code}`;
      
      QRCodeLib.toDataURL(joinUrl, { width: 300, margin: 2 }, (err, url) => {
        if (!err && url) {
          setQrCodeDataUrl(url);
        }
      });
    }
  }, [activeSession]);

  // Handle Session Toggle (Active / Inactive)
  const handleToggleSession = async () => {
    if (!activeSession) return;
    try {
      const nextStatus = !activeSession.isActive;
      const res = await fetch('/api/session/manage', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: activeSession.id,
          isActive: nextStatus,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Handle Create New Session
  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/session/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newSessionTitle || `Pembelajaran Kelas ${newSessionClass}`,
          targetClass: newSessionClass,
          customCode: newSessionCustomCode || undefined,
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setShowNewSessionModal(false);
        setNewSessionTitle('');
        setSelectedSessionId(data.session.id);
        fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Export handlers
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

  const handleLogout = () => {
    localStorage.removeItem('belsiskom_teacher_auth');
    router.push('/guru/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Top Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Laptop className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-base flex items-center gap-2">
                <span>Portal Guru BELSISKOM</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                  LIVE MONITOR
                </span>
              </div>
              <div className="text-xs text-slate-400">
                Ahmad Nursyifa, S.Kom. • SMPN 2 Lemahabang
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/guru/rekap"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 text-xs font-semibold border border-blue-500/30 transition"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Analisis & Komparasi Nilai</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
              title="Keluar"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 py-6 w-full flex-1 space-y-6">
        
        {/* Session Controller Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-6 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Sesi Belajar Aktif:
                </span>
                {activeSession?.isActive ? (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    SESI DIBUKA (MURID BISA MASUK)
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40">
                    SESI DITUTUP (TERKUNCI)
                  </span>
                )}
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white mt-1">
                {activeSession ? activeSession.title : 'Belum Ada Sesi'}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
              <button
                onClick={handleToggleSession}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                  activeSession?.isActive
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
                }`}
              >
                <Power className="w-4 h-4" />
                <span>{activeSession?.isActive ? 'Tutup Sesi Ini' : 'Buka Sesi Ini'}</span>
              </button>

              <button
                onClick={() => setShowQrModal(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
              >
                <QrCode className="w-4 h-4 text-blue-400" />
                <span>Tampilkan QR Code Proyektor</span>
              </button>

              <button
                onClick={() => setShowNewSessionModal(true)}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Buat Sesi Baru</span>
              </button>
            </div>
          </div>

          {/* Session Details Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-1">
            <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Kode Sesi Murid:</div>
              <div className="text-lg md:text-xl font-black font-mono text-blue-400 mt-0.5">
                {activeSession ? activeSession.code : '-'}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Sasaran Kelas:</div>
              <div className="text-lg md:text-xl font-black text-amber-400 mt-0.5">
                {activeSession ? activeSession.targetClass : '-'}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Murid Bergabung:</div>
              <div className="text-lg md:text-xl font-black text-emerald-400 mt-0.5">
                {stats.totalStudents || 0} Siswa
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Tuntas Post-Test:</div>
              <div className="text-lg md:text-xl font-black text-purple-400 mt-0.5">
                {stats.postCompleted || 0} Siswa
              </div>
            </div>
          </div>
        </div>

        {/* Live Filter & Action Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Session */}
            <select
              value={selectedSessionId}
              onChange={(e) => setSelectedSessionId(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              {sessions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.code} - {s.targetClass})
                </option>
              ))}
            </select>

            {/* Filter Class */}
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              {classOptions.map((c) => (
                <option key={c} value={c}>
                  {c === 'ALL' ? 'Semua Kelas (7A - 7G)' : `Filter: Kelas ${c}`}
                </option>
              ))}
            </select>

            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                autoRefresh
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${autoRefresh ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
              <span>{autoRefresh ? 'Live Auto-Sync: Aktif' : 'Auto-Sync: Jeda'}</span>
            </button>
          </div>

          {/* Export Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleExportPdf}
              className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-rose-700/80 hover:bg-rose-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow"
            >
              <FileText className="w-4 h-4" />
              <span>Cetak PDF</span>
            </button>
            <button
              onClick={handleExportExcel}
              className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow"
            >
              <Table className="w-4 h-4" />
              <span>Ekspor Excel (.xlsx)</span>
            </button>
          </div>
        </div>

        {/* Live Student Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-4 md:p-5 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-sm md:text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span>Daftar Progres Murid Secara Realtime ({students.length} Siswa)</span>
            </h3>
            <div className="text-xs text-slate-400">
              Rata-rata Diag: <strong className="text-amber-400">{stats.avgDiag || 0}</strong> • Rata-rata Post: <strong className="text-emerald-400">{stats.avgPost || 0}</strong>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/80 text-slate-400 uppercase tracking-wider font-mono text-[11px]">
                <tr>
                  <th className="py-3 px-4">Absen</th>
                  <th className="py-3 px-4">Nama Lengkap Murid</th>
                  <th className="py-3 px-4">Kelas</th>
                  <th className="py-3 px-4">Status Progres</th>
                  <th className="py-3 px-4 text-center">Diagnostik (10)</th>
                  <th className="py-3 px-4 text-center">Rakit PC</th>
                  <th className="py-3 px-4 text-center">Post-Test (20)</th>
                  <th className="py-3 px-4 text-center">N-Gain</th>
                  <th className="py-3 px-4 text-right">Aktivitas Terakhir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {students.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-slate-500">
                      Belum ada murid yang bergabung di sesi ini. Bagikan kode <strong>{activeSession?.code}</strong> ke murid!
                    </td>
                  </tr>
                ) : (
                  students.map((student) => {
                    const diag = student.diagnosticResult;
                    const post = student.postTestResult;
                    const sim = student.learningProgress?.simulationCompleted;
                    const gain = post?.nGain !== undefined ? post.nGain : null;

                    return (
                      <tr key={student.id} className="hover:bg-slate-800/40 transition">
                        <td className="py-3 px-4 font-mono font-bold text-slate-300">
                          {student.absentNo}
                        </td>
                        <td className="py-3 px-4 font-semibold text-white">
                          {student.name}
                        </td>
                        <td className="py-3 px-4 text-slate-300">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono">
                            {student.className}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {student.status === 'COMPLETED' ? (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-[10px] inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> TUNTAS
                            </span>
                          ) : student.status === 'POSTTEST' ? (
                            <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold text-[10px]">
                              Ujian Post-Test
                            </span>
                          ) : student.status === 'LEARNING' ? (
                            <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold text-[10px]">
                              Materi Langkah {student.currentStep || 1}
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-[10px]">
                              Tes Diagnostik
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {diag ? (
                            <span className="font-bold text-amber-400 font-mono text-sm">
                              {formatScore(diag.score)}
                            </span>
                          ) : (
                            <span className="text-slate-600">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {sim ? (
                            <span className="text-emerald-400 text-xs font-bold">✓ Sukses</span>
                          ) : (
                            <span className="text-slate-600">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {post ? (
                            <span className="font-bold text-emerald-400 font-mono text-sm">
                              {formatScore(post.score)}
                            </span>
                          ) : (
                            <span className="text-slate-600">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {gain !== null ? (
                            <span className="font-bold font-mono text-xs text-blue-300">
                              {gain.toFixed(2)}
                            </span>
                          ) : (
                            <span className="text-slate-600">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right text-slate-500 text-[11px] font-mono">
                          {new Date(student.lastActiveAt).toLocaleTimeString('id-ID', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* QR Code Modal for Lab Projector */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 md:p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
            <h3 className="text-xl font-black text-white">Scan untuk Masuk BELSISKOM</h3>
            <p className="text-xs text-slate-400">
              Tampilkan di proyektor lab agar murid dapat langsung memindai dengan kamera smartphone!
            </p>

            {qrCodeDataUrl ? (
              <div className="bg-white p-4 rounded-2xl inline-block shadow-2xl border-4 border-blue-500">
                <img src={qrCodeDataUrl} alt="QR Code Sesi" className="w-56 h-56 mx-auto" />
              </div>
            ) : (
              <div className="w-56 h-56 bg-slate-800 rounded-2xl mx-auto flex items-center justify-center text-xs text-slate-500">
                Membuat QR Code...
              </div>
            )}

            <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700">
              <div className="text-[11px] text-slate-400">Kode Sesi Manual:</div>
              <div className="text-3xl font-black font-mono text-blue-400 tracking-widest mt-0.5">
                {activeSession?.code}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Laman: <strong>belsiskom.an.my.id</strong>
              </div>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
            >
              Tutup Layar QR
            </button>
          </div>
        </div>
      )}

      {/* New Session Modal */}
      {showNewSessionModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-lg text-white">Buat Sesi Belajar Baru</h3>
            <form onSubmit={handleCreateSession} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Judul Sesi:
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Belajar Sistem Komputer Kelas 7-B"
                  value={newSessionTitle}
                  onChange={(e) => setNewSessionTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Sasaran Kelas:
                </label>
                <select
                  value={newSessionClass}
                  onChange={(e) => setNewSessionClass(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                >
                  <option value="ALL">Semua Kelas 7 (7A - 7G)</option>
                  <option value="7-A">Kelas 7-A</option>
                  <option value="7-B">Kelas 7-B</option>
                  <option value="7-C">Kelas 7-C</option>
                  <option value="7-D">Kelas 7-D</option>
                  <option value="7-E">Kelas 7-E</option>
                  <option value="7-F">Kelas 7-F</option>
                  <option value="7-G">Kelas 7-G</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Kode Sesi Kustom (Opsional):
                </label>
                <input
                  type="text"
                  placeholder="Biarkan kosong untuk dibuatkan otomatis (e.g. BSK-7B8)"
                  value={newSessionCustomCode}
                  onChange={(e) => setNewSessionCustomCode(e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewSessionModal(false)}
                  className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-lg shadow-blue-600/30"
                >
                  Buat Sesi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
