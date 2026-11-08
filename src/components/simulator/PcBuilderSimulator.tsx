'use client';

import React, { useState } from 'react';
import { 
  Cpu, 
  Fan, 
  MemoryStick, 
  HardDrive, 
  Tv, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  Power, 
  RotateCcw,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface ComponentItem {
  id: string;
  name: string;
  category: string;
  icon: any;
  color: string;
  description: string;
  funFact: string;
  targetSlot: string;
  dependsOn?: string; // Harusnya komponen ini dipasang setelah apa
}

const PC_COMPONENTS: ComponentItem[] = [
  {
    id: 'cpu',
    name: 'Processor (CPU)',
    category: 'Otak Pemroses',
    icon: Cpu,
    color: 'from-blue-500 to-indigo-600',
    description: 'Chip kecil dengan miliaran transistor mini yang menghitung dan memproses seluruh perintah aplikasi.',
    funFact: 'Berdenyut lebih dari 3 miliar kali setiap detik (3.0 GHz)!',
    targetSlot: 'slot-cpu',
  },
  {
    id: 'heatsink',
    name: 'Kipas Pendingin (Heatsink Fan)',
    category: 'Pendingin Otak',
    icon: Fan,
    color: 'from-cyan-500 to-blue-500',
    description: 'Menempel tepat di atas CPU dengan pasta termal untuk menyerap panas agar komputer tidak mati mendadak.',
    funFact: 'Tanpa pendingin, suhu CPU bisa mencapai 100°C hanya dalam hitungan detik!',
    targetSlot: 'slot-heatsink',
    dependsOn: 'cpu',
  },
  {
    id: 'ram',
    name: 'RAM DDR4 (Memory)',
    category: 'Meja Kerja Sementara',
    icon: MemoryStick,
    color: 'from-emerald-500 to-teal-600',
    description: 'Menyimpan data aplikasi yang sedang aktif kamu buka agar sistem berjalan mulus tanpa macet.',
    funFact: 'Data di RAM langsung bersih dan hilang saat komputer dimatikan (Volatile).',
    targetSlot: 'slot-ram',
  },
  {
    id: 'ssd',
    name: 'SSD NVMe M.2',
    category: 'Penyimpanan Permanen',
    icon: HardDrive,
    color: 'from-purple-500 to-violet-600',
    description: 'Media penyimpanan file, foto, game, dan sistem operasi dengan kecepatan baca hingga ribuan MB/detik.',
    funFact: 'SSD tidak memiliki piringan berputar, sehingga tahan guncangan dan jauh lebih cepat dari harddisk jadul.',
    targetSlot: 'slot-ssd',
  },
  {
    id: 'gpu',
    name: 'VGA Card (GPU Grafis)',
    category: 'Pengolah Gambar & Layar',
    icon: Tv,
    color: 'from-amber-500 to-orange-600',
    description: 'Kartu khusus yang mengolah grafis 3D resolusi tinggi untuk game, video editing, dan animasi.',
    funFact: 'Memiliki ratusan inti pemroses khusus untuk menggambar piksel di layarmu.',
    targetSlot: 'slot-gpu',
  },
  {
    id: 'psu',
    name: 'Power Supply (PSU)',
    category: 'Jantung Daya Listrik',
    icon: Zap,
    color: 'from-rose-500 to-red-600',
    description: 'Mengubah listrik AC bertegangan tinggi dari stopkontak menjadi arus DC aman (12V, 5V, 3.3V) ke seluruh suku cadang.',
    funFact: 'Dilengkapi pelindung lonjakan arus agar komputer tidak tersambar korsleting listrik.',
    targetSlot: 'slot-psu',
  },
];

interface PcBuilderSimulatorProps {
  onComplete: () => void;
  isAlreadyCompleted?: boolean;
}

export default function PcBuilderSimulator({ onComplete, isAlreadyCompleted = false }: PcBuilderSimulatorProps) {
  const [installed, setInstalled] = useState<Record<string, boolean>>(
    isAlreadyCompleted
      ? { cpu: true, heatsink: true, ram: true, ssd: true, gpu: true, psu: true }
      : {}
  );
  const [selectedCompId, setSelectedCompId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'info' | 'success' | 'error' }>({
    text: 'Pilih komponen di bawah, lalu klik slot target pada papan motherboard untuk memasangnya!',
    type: 'info',
  });
  const [isPoweredOn, setIsPoweredOn] = useState(isAlreadyCompleted);

  const selectedComp = PC_COMPONENTS.find((c) => c.id === selectedCompId);
  const totalCount = PC_COMPONENTS.length;
  const installedCount = Object.values(installed).filter(Boolean).length;
  const allInstalled = installedCount === totalCount;

  const handleSelectComponent = (comp: ComponentItem) => {
    if (installed[comp.id]) {
      setMessage({
        text: `${comp.name} sudah terpasang dengan kuat di motherboard!`,
        type: 'info',
      });
      setSelectedCompId(null);
      return;
    }
    setSelectedCompId(comp.id);
    setMessage({
      text: `Kamu memilih ${comp.name}. Sekarang ketuk slot yang sesuai di motherboard!`,
      type: 'info',
    });
  };

  const handleSlotClick = (slotId: string) => {
    if (!selectedComp) {
      // Find what belongs here
      const compForSlot = PC_COMPONENTS.find((c) => c.targetSlot === slotId);
      if (compForSlot && installed[compForSlot.id]) {
        setMessage({
          text: `Slot ini telah terisi ${compForSlot.name}.`,
          type: 'info',
        });
      } else if (compForSlot) {
        setMessage({
          text: `Slot ini membutuhkan ${compForSlot.name}. Pilih komponennya di daftar bawah terlebih dahulu!`,
          type: 'info',
        });
        setSelectedCompId(compForSlot.id);
      }
      return;
    }

    // Check if slot matches selected component
    if (selectedComp.targetSlot !== slotId) {
      setMessage({
        text: `Ups! ${selectedComp.name} tidak muat di slot ini. Cari slot yang sesuai!`,
        type: 'error',
      });
      return;
    }

    // Check dependency (e.g. heatsink requires cpu first)
    if (selectedComp.dependsOn && !installed[selectedComp.dependsOn]) {
      const depName = PC_COMPONENTS.find((c) => c.id === selectedComp.dependsOn)?.name;
      setMessage({
        text: `Perhatian: Kamu harus memasang ${depName} terlebih dahulu sebelum memasang ${selectedComp.name}!`,
        type: 'error',
      });
      return;
    }

    // Install component!
    const nextInstalled = { ...installed, [selectedComp.id]: true };
    setInstalled(nextInstalled);
    setSelectedCompId(null);
    setMessage({
      text: `Hebat! ${selectedComp.name} berhasil terpasang dan terkunci sempurna!`,
      type: 'success',
    });
  };

  const handlePowerOn = () => {
    if (!allInstalled) return;
    setIsPoweredOn(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    setMessage({
      text: 'BIP! Komputer BELSISKOM berhasil menyala! Kipas berputar dan sistem siap digunakan!',
      type: 'success',
    });
    onComplete();
  };

  const handleReset = () => {
    setInstalled({});
    setSelectedCompId(null);
    setIsPoweredOn(false);
    setMessage({
      text: 'Simulasi telah direset. Ayo pasang komponen dari awal!',
      type: 'info',
    });
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-4 md:p-6 shadow-xl border border-slate-800 my-6">
      {/* Header Simulator */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Lab Interaktif Kelas 7
            </span>
            <h3 className="text-lg md:text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Simulasi Merakit Komputer (PC Builder)
            </h3>
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Kemajuan Rakitan: <strong className="text-blue-400">{installedCount}</strong> dari {totalCount} Komponen Terpasang
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Rakit Ulang
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 rounded-full h-2 my-4 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-2 transition-all duration-500"
          style={{ width: `${(installedCount / totalCount) * 100}%` }}
        />
      </div>

      {/* Status Message Alert */}
      <div className={`p-3 rounded-xl mb-4 text-xs md:text-sm flex items-start gap-2.5 transition-all ${
        message.type === 'success' 
          ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-200' 
          : message.type === 'error'
          ? 'bg-rose-950/60 border border-rose-500/40 text-rose-200'
          : 'bg-blue-950/50 border border-blue-500/30 text-blue-200'
      }`}>
        {message.type === 'success' ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        ) : message.type === 'error' ? (
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
        ) : (
          <HelpCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
        )}
        <span>{message.text}</span>
      </div>

      {/* Main Board Simulation Area */}
      <div className="relative bg-slate-950 border-2 border-slate-700 rounded-2xl p-4 md:p-6 overflow-hidden min-h-[380px] shadow-inner">
        {/* Motherboard Grid Lines (Decorative) */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Board Title Label */}
        <div className="absolute top-3 left-4 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
          MOTHERBOARD ATX • BELSISKOM LAB REV 1.0
        </div>

        {/* Powered On Status Glow Effect */}
        {isPoweredOn && (
          <div className="absolute top-3 right-4 flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/40 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            POWER ON • 220V ACTIVE
          </div>
        )}

        {/* Motherboard Layout Slots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 pt-6">
          
          {/* Section 1: CPU & Heatsink (Kiri / Tengah Atas) */}
          <div className="space-y-4">
            {/* Slot CPU */}
            <div 
              onClick={() => handleSlotClick('slot-cpu')}
              className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                installed.cpu 
                  ? 'bg-blue-950/60 border-blue-500/80 shadow-[0_0_12px_rgba(59,130,246,0.3)]' 
                  : selectedCompId === 'cpu'
                  ? 'border-blue-400 border-dashed bg-blue-900/30 animate-pulse'
                  : 'border-slate-700 border-dashed hover:border-slate-500 bg-slate-900/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono text-slate-400">SOKET LGA CPU</span>
                {installed.cpu ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Cpu className="w-4 h-4 text-slate-500" />
                )}
              </div>
              <div className="text-xs font-bold">
                {installed.cpu ? 'Processor (CPU) Terpasang' : '+ Pasang CPU di Sini'}
              </div>
              {installed.cpu && (
                <div className="text-[10px] text-blue-300/80 mt-1">Transistor Siap Mengeksekusi Kode</div>
              )}
            </div>

            {/* Slot Heatsink Fan */}
            <div 
              onClick={() => handleSlotClick('slot-heatsink')}
              className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                installed.heatsink 
                  ? 'bg-cyan-950/60 border-cyan-500/80 shadow-[0_0_12px_rgba(6,182,212,0.3)]' 
                  : selectedCompId === 'heatsink'
                  ? 'border-cyan-400 border-dashed bg-cyan-900/30 animate-pulse'
                  : 'border-slate-700 border-dashed hover:border-slate-500 bg-slate-900/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono text-slate-400">BRACKET HEATSINK</span>
                {installed.heatsink ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Fan className={`w-4 h-4 text-slate-500 ${isPoweredOn ? 'animate-spin' : ''}`} />
                )}
              </div>
              <div className="text-xs font-bold">
                {installed.heatsink ? 'Kipas Pendingin Terkunci' : '+ Pasang Kipas Pendingin di Sini'}
              </div>
              {installed.heatsink && (
                <div className="text-[10px] text-cyan-300/80 mt-1">
                  {isPoweredOn ? 'Kipas Berputar Cepat (Dingin)' : 'Thermal Paste Terhubung ke CPU'}
                </div>
              )}
            </div>
          </div>

          {/* Section 2: RAM & SSD (Kanan Atas / Tengah) */}
          <div className="space-y-4">
            {/* Slot RAM */}
            <div 
              onClick={() => handleSlotClick('slot-ram')}
              className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                installed.ram 
                  ? 'bg-emerald-950/60 border-emerald-500/80 shadow-[0_0_12px_rgba(16,185,129,0.3)]' 
                  : selectedCompId === 'ram'
                  ? 'border-emerald-400 border-dashed bg-emerald-900/30 animate-pulse'
                  : 'border-slate-700 border-dashed hover:border-slate-500 bg-slate-900/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono text-slate-400">SLOT DDR4 DIMM</span>
                {installed.ram ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <MemoryStick className="w-4 h-4 text-slate-500" />
                )}
              </div>
              <div className="text-xs font-bold">
                {installed.ram ? 'RAM 16GB Terpasang (Klik!)' : '+ Pasang RAM di Sini'}
              </div>
              {installed.ram && (
                <div className="text-[10px] text-emerald-300/80 mt-1">Dual-Channel Siap Menampung Data</div>
              )}
            </div>

            {/* Slot SSD NVMe M.2 */}
            <div 
              onClick={() => handleSlotClick('slot-ssd')}
              className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                installed.ssd 
                  ? 'bg-purple-950/60 border-purple-500/80 shadow-[0_0_12px_rgba(168,85,247,0.3)]' 
                  : selectedCompId === 'ssd'
                  ? 'border-purple-400 border-dashed bg-purple-900/30 animate-pulse'
                  : 'border-slate-700 border-dashed hover:border-slate-500 bg-slate-900/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono text-slate-400">SLOT M.2 NVMe PCIE 4.0</span>
                {installed.ssd ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <HardDrive className="w-4 h-4 text-slate-500" />
                )}
              </div>
              <div className="text-xs font-bold">
                {installed.ssd ? 'SSD 512GB Terbaut Kencang' : '+ Pasang SSD NVMe di Sini'}
              </div>
              {installed.ssd && (
                <div className="text-[10px] text-purple-300/80 mt-1">Kecepatan Baca 3500 MB/s Siap</div>
              )}
            </div>
          </div>

          {/* Section 3: GPU & Power Supply (Bawah) */}
          <div className="space-y-4">
            {/* Slot GPU PCIe */}
            <div 
              onClick={() => handleSlotClick('slot-gpu')}
              className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                installed.gpu 
                  ? 'bg-amber-950/60 border-amber-500/80 shadow-[0_0_12px_rgba(245,158,11,0.3)]' 
                  : selectedCompId === 'gpu'
                  ? 'border-amber-400 border-dashed bg-amber-900/30 animate-pulse'
                  : 'border-slate-700 border-dashed hover:border-slate-500 bg-slate-900/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono text-slate-400">SLOT PCIE X16 GRAFIS</span>
                {installed.gpu ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Tv className="w-4 h-4 text-slate-500" />
                )}
              </div>
              <div className="text-xs font-bold">
                {installed.gpu ? 'VGA Card Terkunci di Slot PCIe' : '+ Pasang Kartu Grafis (VGA) di Sini'}
              </div>
              {installed.gpu && (
                <div className="text-[10px] text-amber-300/80 mt-1">Output HDMI & DisplayPort Aktif</div>
              )}
            </div>

            {/* Slot Power Supply (PSU) */}
            <div 
              onClick={() => handleSlotClick('slot-psu')}
              className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                installed.psu 
                  ? 'bg-rose-950/60 border-rose-500/80 shadow-[0_0_12px_rgba(244,63,94,0.3)]' 
                  : selectedCompId === 'psu'
                  ? 'border-rose-400 border-dashed bg-rose-900/30 animate-pulse'
                  : 'border-slate-700 border-dashed hover:border-slate-500 bg-slate-900/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono text-slate-400">KOMPARTEMEN DAYA PSU 500W</span>
                {installed.psu ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Zap className="w-4 h-4 text-slate-500" />
                )}
              </div>
              <div className="text-xs font-bold">
                {installed.psu ? 'Power Supply 500W Siap Mengalir Listrik' : '+ Pasang Power Supply di Sini'}
              </div>
              {installed.psu && (
                <div className="text-[10px] text-rose-300/80 mt-1">Kabel 24-Pin Terhubung ke Motherboard</div>
              )}
            </div>
          </div>

        </div>

        {/* Power On Button (Center overlay or bottom) */}
        {allInstalled && (
          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col items-center justify-center">
            {!isPoweredOn ? (
              <button
                onClick={handlePowerOn}
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm md:text-base shadow-lg shadow-emerald-500/30 transform hover:scale-105 active:scale-95 transition-all animate-bounce"
              >
                <Power className="w-5 h-5" />
                NYALAKAN KOMPUTER SEKARANG!
              </button>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  KOMPUTER BERJALAN SEMPURNA! SELAMAT KAMU LOLOS TAHAP RAKIT PC!
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Component Palette (Cards under motherboard) */}
      <div className="mt-5">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
          <span>Kotak Komponen Komputer (Ketuk untuk memilih):</span>
          {selectedComp && (
            <span className="text-blue-400 font-bold">Terpilih: {selectedComp.name}</span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {PC_COMPONENTS.map((comp) => {
            const isDone = !!installed[comp.id];
            const isSelected = selectedCompId === comp.id;
            const Icon = comp.icon;

            return (
              <button
                key={comp.id}
                onClick={() => handleSelectComponent(comp)}
                disabled={isDone}
                className={`p-3 rounded-xl text-left transition-all border flex flex-col justify-between ${
                  isDone
                    ? 'bg-slate-800/40 border-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                    : isSelected
                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/30 scale-105'
                    : 'bg-slate-800/80 border-slate-700 hover:border-slate-500 text-slate-200 hover:bg-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${comp.color} text-white`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div className="font-bold text-xs line-clamp-1">{comp.name}</div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">{comp.category}</div>
                </div>
                <div className="text-[9px] mt-2 text-slate-400 font-mono">
                  {isDone ? '✓ Terpasang' : 'Pilih Komponen'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Component Fact Card */}
        {selectedComp && (
          <div className="mt-3.5 p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs">
            <div className="font-bold text-blue-300 flex items-center gap-1.5">
              <span>{selectedComp.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-200">
                {selectedComp.category}
              </span>
            </div>
            <p className="text-slate-300 mt-1">{selectedComp.description}</p>
            <div className="mt-1.5 text-amber-300 font-medium text-[11px]">
              ⭐ Fakta Menarik: {selectedComp.funFact}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
