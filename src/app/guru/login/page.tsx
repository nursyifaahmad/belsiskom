'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowRight, ArrowLeft, Laptop, ShieldCheck, UserCheck } from 'lucide-react';

export default function TeacherLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/teacher/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        localStorage.setItem('belsiskom_teacher_auth', 'true');
        router.push('/guru/dashboard');
      } else {
        setErrorMsg(data.message || 'Password salah! Silakan coba lagi.');
        setLoading(false);
      }
    } catch (err: any) {
      setErrorMsg('Gagal terhubung ke server: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 text-white flex flex-col justify-between py-8 px-4">
      {/* Top back button */}
      <div className="max-w-md mx-auto w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda Murid</span>
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md mx-auto w-full bg-slate-800/80 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/30 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/20">
            <UserCheck className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold">Portal Guru Informatika</h2>
          <div className="text-xs text-blue-300 font-semibold mt-1">
            Ahmad Nursyifa, S.Pd.
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            SMP Negeri 2 Lemahabang • Kelas 7-A s/d 7-G
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2">
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Kata Sandi Guru (Password):
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi guru..."
                className="w-full px-4 py-3 pl-11 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
            </div>
            <div className="text-[11px] text-slate-400 mt-1.5 flex items-center justify-between">
              <span>Password standar: <code className="bg-slate-700 px-1 py-0.5 rounded text-slate-300">guru123</code></span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? (
              <span>Memeriksa Akses...</span>
            ) : (
              <>
                <span>Masuk ke Dashboard Guru</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="text-center text-[11px] text-slate-500">
        BELSISKOM • Sistem Pembelajaran Terpadu • Guru Pengampu: Ahmad Nursyifa, S.Pd.
      </footer>
    </div>
  );
}
