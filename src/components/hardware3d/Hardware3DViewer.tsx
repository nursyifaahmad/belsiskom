'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Sparkles, 
  MousePointer, 
  Info, 
  Check, 
  Cpu, 
  Keyboard, 
  HardDrive, 
  Tv, 
  Wifi,
  Hand
} from 'lucide-react';

export type HardwareType = 'input' | 'process' | 'storage' | 'output' | 'communication';

interface HardwareMeta {
  id: HardwareType;
  title: string;
  categoryName: string;
  icon: any;
  color: string;
  tagColor: string;
  badge: string;
  shortDesc: string;
  roleAnalogy: string;
  keyExamples: string[];
  physicalParts: { name: string; desc: string }[];
}

export const HARDWARE_DETAILS: Record<HardwareType, HardwareMeta> = {
  input: {
    id: 'input',
    title: 'Keyboard Komputer 3D',
    categoryName: '1. Perangkat Masukan (Input Device)',
    icon: Keyboard,
    color: 'from-blue-500 to-indigo-600',
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    badge: 'Input Data & Perintah',
    shortDesc: 'Mengubah ketukan fisik jari menjadi sinyal digital biner (0 dan 1) yang dimengerti oleh komputer.',
    roleAnalogy: '👁️👂 Ibarat Panca Indera (Mata, Telinga, Indera Peraba) manusia yang menangkap rangsangan dari luar.',
    keyExamples: ['Keyboard (Ketik Teks)', 'Mouse / Touchpad (Penunjuk)', 'Mikrofon (Suara)', 'Scanner & Webcam (Visual)'],
    physicalParts: [
      { name: 'Tombol Timbul (Keycaps)', desc: 'Setiap tombol memiliki sakelar mekanik/membran yang mengirim kode biner saat ditekan.' },
      { name: 'Kabel Konektor USB', desc: 'Menghubungkan data arus sinyal ke port motherboard dengan kecepatan tinggi.' },
      { name: 'Lampu LED Indikator', desc: 'Menandakan status tombol aktif seperti Caps Lock dan Num Lock.' },
    ],
  },
  process: {
    id: 'process',
    title: 'Processor CPU Chip 3D',
    categoryName: '2. Perangkat Pemroses (Processing Device)',
    icon: Cpu,
    color: 'from-amber-500 to-orange-600',
    tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    badge: 'Otak Komputasi Inti',
    shortDesc: 'Melakukan miliaran kalkulasi matematika (ALU) dan mengendalikan semua perintah software (Control Unit).',
    roleAnalogy: '🧠 Ibarat Otak Manusia yang berpikir, menghitung, dan mengambil keputusan setiap detik.',
    keyExamples: ['CPU / Processor (Otak Utama)', 'GPU / Kartu Grafis (Pemroses Gambar)', 'Motherboard (Sirkuit Penghubung)'],
    physicalParts: [
      { name: 'Pelindung Panas (IHS Logam)', desc: 'Tutup logam perak penyerap panas dari silikon mikroprosesor di dalamnya.' },
      { name: 'Papan Substrat Hijau (PCB)', desc: 'Papan sirkuit mikro multi-lapis tempat miliaran transistor terpasang.' },
      { name: 'Pin Kontak Emas (LGA/PGA)', desc: 'Putar 360° ke bawah untuk melihat ratusan titik kontak emas penghantar sinyal listrik!' },
    ],
  },
  storage: {
    id: 'storage',
    title: 'RAM Stick & SSD NVMe 3D',
    categoryName: '3. Media Penyimpanan (Storage Device)',
    icon: HardDrive,
    color: 'from-emerald-500 to-teal-600',
    tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    badge: 'Memori Primer & Sekunder',
    shortDesc: 'Menyimpan instruksi sistem secara sementara (RAM) dan menyimpan dokumen/file selamanya (SSD/Harddisk).',
    roleAnalogy: '📚 RAM ibarat Meja Belajar kerja cepat, sedangkan SSD ibarat Lemari Arsip penyimpan buku permanen.',
    keyExamples: ['RAM (Memori Kerja Volatile)', 'SSD NVMe M.2 (Gudang Cepat)', 'Harddisk (HDD Kapasitas Besar)', 'Flashdisk USB'],
    physicalParts: [
      { name: 'Keping Chip Memori Hitam (IC NAND)', desc: 'Blok silikon mikroskopis tempat milyaran data biner disimpan.' },
      { name: 'Konektor Pin Emas DDR4/PCIe', desc: 'Jalur transfer data ultra cepat berkecepatan ribuan Megabyte per detik.' },
      { name: 'Lekukan Kunci Pengaman (Notch)', desc: 'Mencegah RAM dipasang terbalik pada slot motherboard.' },
    ],
  },
  output: {
    id: 'output',
    title: 'Monitor Layar Komputer 3D',
    categoryName: '4. Perangkat Keluaran (Output Device)',
    icon: Tv,
    color: 'from-purple-500 to-violet-600',
    tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    badge: 'Tampilan Visual Manusia',
    shortDesc: 'Menerjemahkan data digital hasil olahan komputer kembali ke bentuk gambar, teks, dan video yang bisa dilihat mata.',
    roleAnalogy: '🗣️ Ibarat Mulut dan Gerakan Tangan manusia yang menyampaikan pesan dan jawaban keluar.',
    keyExamples: ['Monitor (Layar Visual LED/IPS)', 'Speaker & Headset (Keluaran Audio)', 'Printer (Cetakan Kertas)', 'Proyektor'],
    physicalParts: [
      { name: 'Panel Layar IPS Bercahaya', desc: 'Menampilkan jutaan warna piksel dengan sudut pandang lebar dan tajam.' },
      { name: 'Bingkai Tipis (Ultra-Slim Bezel)', desc: 'Desain modern pelindung tepi layar kaca komputer.' },
      { name: 'Kaki Penyangga Logam Ergonomis', desc: 'Menahan beban monitor dan memungkinkan pengaturan sudut kemiringan.' },
    ],
  },
  communication: {
    id: 'communication',
    title: 'Wi-Fi Router & Modem 3D',
    categoryName: '5. Perangkat Jaringan (Communication Device)',
    icon: Wifi,
    color: 'from-cyan-500 to-blue-600',
    tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    badge: 'Jaringan & Internet Global',
    shortDesc: 'Menghubungkan komputer dengan komputer lain di dunia atau jaringan internet nirkabel (Wi-Fi / LAN).',
    roleAnalogy: '📱 Ibarat Saluran Telepon & Surat yang memungkinkan kita mengobrol dengan orang di kota atau negara lain.',
    keyExamples: ['Wi-Fi Router (Pemancar Sinyal)', 'Modem (Pengubah Sinyal ISP)', 'Kartu LAN RJ-45 (NIC)', 'Bluetooth Adapter'],
    physicalParts: [
      { name: '4 Antena Pemancar Omni-Directional', desc: 'Menyebarkan gelombang radio frekuensi 2.4GHz dan 5GHz ke perangkat murid.' },
      { name: 'Lampu LED Status Hijau', desc: 'Berkedip menandakan aliran paket data internet sedang berlangsung lancar.' },
      { name: 'Port Kuning Kabel LAN (RJ-45)', desc: 'Putar ke bagian belakang untuk melihat 4 colokan kabel jaringan kabel berkecepatan Gigabit!' },
    ],
  },
};

export default function Hardware3DViewer() {
  const [activeTab, setActiveTab] = useState<HardwareType>('input');
  const [autoRotate, setAutoRotate] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const currentModelGroup = useRef<THREE.Group | null>(null);

  // Rotation & Drag state refs
  const isPointerDown = useRef(false);
  const previousPointerPosition = useRef({ x: 0, y: 0 });
  const zoomLevel = useRef(1);

  // ==========================================
  // 3D MODEL BUILDERS (Procedural & Offline)
  // ==========================================

  // 1. INPUT: Keyboard 3D
  const createKeyboardModel = (): THREE.Group => {
    const group = new THREE.Group();

    // Body keyboard utama
    const baseGeo = new THREE.BoxGeometry(4.4, 0.25, 2.0);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b, // slate-800
      roughness: 0.4,
      metalness: 0.2,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    group.add(baseMesh);

    // Bezel miring atas
    const topSlopeGeo = new THREE.BoxGeometry(4.3, 0.08, 1.9);
    const topSlopeMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.5,
    });
    const topSlopeMesh = new THREE.Mesh(topSlopeGeo, topSlopeMat);
    topSlopeMesh.position.y = 0.14;
    group.add(topSlopeMesh);

    // Keycaps deretan tombol (Grid 4 baris x 10 kolom)
    const keyGeo = new THREE.BoxGeometry(0.28, 0.16, 0.28);
    const keyMatDark = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.3,
      metalness: 0.1,
    });
    const keyMatBlue = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      roughness: 0.3,
      metalness: 0.2,
    });

    const startX = -1.8;
    const startZ = -0.65;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 11; col++) {
        // Skip some slots for spacebar on bottom row
        if (row === 3 && col >= 3 && col <= 7) continue;

        const isSpecialKey = (row === 0 && col === 0) || (row === 2 && col === 10) || (row === 1 && col === 0);
        const keyMesh = new THREE.Mesh(keyGeo, isSpecialKey ? keyMatBlue : keyMatDark);
        keyMesh.position.set(startX + col * 0.36, 0.24, startZ + row * 0.42);
        group.add(keyMesh);
      }
    }

    // Tombol Spacebar lebar
    const spaceGeo = new THREE.BoxGeometry(1.6, 0.16, 0.28);
    const spaceMesh = new THREE.Mesh(spaceGeo, keyMatDark);
    spaceMesh.position.set(startX + 5 * 0.36, 0.24, startZ + 3 * 0.42);
    group.add(spaceMesh);

    // Lampu LED Indikator kecil (Numlock/Capslock)
    const ledGeo = new THREE.BoxGeometry(0.08, 0.04, 0.08);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    for (let i = 0; i < 3; i++) {
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(1.6 + i * 0.18, 0.2, -0.75);
      group.add(led);
    }

    // Kabel USB di belakang
    const cordGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.2, 12);
    const cordMat = new THREE.MeshStandardMaterial({ color: 0x0284c7 });
    const cordMesh = new THREE.Mesh(cordGeo, cordMat);
    cordMesh.rotation.x = Math.PI / 2;
    cordMesh.position.set(0, 0, -1.6);
    group.add(cordMesh);

    // USB Head logam
    const usbHeadGeo = new THREE.BoxGeometry(0.2, 0.1, 0.35);
    const usbHeadMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
    const usbHead = new THREE.Mesh(usbHeadGeo, usbHeadMat);
    usbHead.position.set(0, 0, -2.3);
    group.add(usbHead);

    group.scale.set(1.1, 1.1, 1.1);
    group.position.y = -0.1;
    return group;
  };

  // 2. PROCESS: CPU Processor Chip 3D
  const createCpuModel = (): THREE.Group => {
    const group = new THREE.Group();

    // 1. Papan Substrat Hijau PCB (Dasar)
    const pcbGeo = new THREE.BoxGeometry(2.6, 0.1, 2.6);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x15803d, // PCB Green
      roughness: 0.3,
      metalness: 0.2,
    });
    const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
    group.add(pcbMesh);

    // 2. Sudut Penanda Emas (Kaki 1 Notch)
    const notchGeo = new THREE.BoxGeometry(0.2, 0.11, 0.2);
    const notchMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9, roughness: 0.1 });
    const notchMesh = new THREE.Mesh(notchGeo, notchMat);
    notchMesh.position.set(-1.18, 0.01, -1.18);
    group.add(notchMesh);

    // 3. IHS (Integrated Heat Spreader) Logam Perak di Atas
    const ihsGeo = new THREE.BoxGeometry(2.1, 0.16, 2.1);
    const ihsMat = new THREE.MeshStandardMaterial({
      color: 0xd1d5db, // Metalik Perak
      metalness: 0.92,
      roughness: 0.15,
    });
    const ihsMesh = new THREE.Mesh(ihsGeo, ihsMat);
    ihsMesh.position.y = 0.12;
    group.add(ihsMesh);

    // Label timbul di atas IHS "BELSISKOM CORE"
    const labelGeo = new THREE.BoxGeometry(1.5, 0.02, 1.1);
    const labelMat = new THREE.MeshStandardMaterial({ color: 0x374151, roughness: 0.6 });
    const labelMesh = new THREE.Mesh(labelGeo, labelMat);
    labelMesh.position.y = 0.21;
    group.add(labelMesh);

    // 4. Pin Kontak Emas (LGA Array) di Bagian BAWAH (Terlihat saat diputar 360!)
    const pinGridGeo = new THREE.BoxGeometry(2.2, 0.02, 2.2);
    const pinGridMat = new THREE.MeshStandardMaterial({
      color: 0xeab308, // Gold
      metalness: 0.95,
      roughness: 0.1,
    });
    const pinGridMesh = new THREE.Mesh(pinGridGeo, pinGridMat);
    pinGridMesh.position.y = -0.06;
    group.add(pinGridMesh);

    // Kapasitor mini di tengah pin bawah
    const capGeo = new THREE.BoxGeometry(0.7, 0.06, 0.7);
    const capMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.5 });
    const capMesh = new THREE.Mesh(capGeo, capMat);
    capMesh.position.y = -0.07;
    group.add(capMesh);

    group.scale.set(1.5, 1.5, 1.5);
    return group;
  };

  // 3. STORAGE: RAM Stick DDR4 & SSD NVMe 3D
  const createStorageModel = (): THREE.Group => {
    const group = new THREE.Group();

    // === KOMPONEN A: RAM DDR4 (Di Depan) ===
    const ramGroup = new THREE.Group();

    // Papan PCB RAM
    const pcbGeo = new THREE.BoxGeometry(4.2, 1.1, 0.08);
    const pcbMat = new THREE.MeshStandardMaterial({ color: 0x047857, roughness: 0.3 }); // Emerald PCB
    const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
    ramGroup.add(pcbMesh);

    // Heatsink Pelindung Aluminium Hitam
    const heatsinkGeo = new THREE.BoxGeometry(4.0, 0.85, 0.14);
    const heatsinkMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25,
    });
    const heatsinkMesh = new THREE.Mesh(heatsinkGeo, heatsinkMat);
    heatsinkMesh.position.y = 0.12;
    ramGroup.add(heatsinkMesh);

    // Garis Aksen Emas pada Heatsink RAM
    const accentGeo = new THREE.BoxGeometry(3.6, 0.06, 0.16);
    const accentMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9 });
    const accentMesh = new THREE.Mesh(accentGeo, accentMat);
    accentMesh.position.y = 0.28;
    ramGroup.add(accentMesh);

    // Deretan Pin Emas Kontak Bawah (dengan coakan Notch di tengah)
    const pinPartGeo = new THREE.BoxGeometry(1.85, 0.16, 0.09);
    const pinMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.95, roughness: 0.1 });
    
    // Pin sisi kiri
    const pinLeft = new THREE.Mesh(pinPartGeo, pinMat);
    pinLeft.position.set(-1.05, -0.56, 0);
    ramGroup.add(pinLeft);

    // Pin sisi kanan
    const pinRight = new THREE.Mesh(pinPartGeo, pinMat);
    pinRight.position.set(1.05, -0.56, 0);
    ramGroup.add(pinRight);

    ramGroup.position.set(0, 0.3, 0.4);
    group.add(ramGroup);

    // === KOMPONEN B: SSD NVMe M.2 (Di Belakang agak rebah) ===
    const ssdGroup = new THREE.Group();

    // Papan PCB SSD M.2
    const ssdPcbGeo = new THREE.BoxGeometry(2.8, 0.8, 0.06);
    const ssdPcbMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 });
    const ssdPcb = new THREE.Mesh(ssdPcbGeo, ssdPcbMat);
    ssdGroup.add(ssdPcb);

    // Chip Kontroler & NAND Flash Memori Hitam (4 Chip)
    const chipGeo = new THREE.BoxGeometry(0.5, 0.5, 0.08);
    const chipMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.2 });
    for (let c = 0; c < 3; c++) {
      const chip = new THREE.Mesh(chipGeo, chipMat);
      chip.position.set(-0.6 + c * 0.65, 0, 0.04);
      ssdGroup.add(chip);
    }

    // Pin Emas M.2 Key-M
    const ssdPinGeo = new THREE.BoxGeometry(0.18, 0.7, 0.08);
    const ssdPin = new THREE.Mesh(ssdPinGeo, pinMat);
    ssdPin.position.set(-1.38, 0, 0);
    ssdGroup.add(ssdPin);

    // Lubang Baut M.2 di Ujung Kanan
    const holeGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.1, 16);
    const holeMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9 });
    const hole = new THREE.Mesh(holeGeo, holeMat);
    hole.rotation.x = Math.PI / 2;
    hole.position.set(1.28, 0, 0);
    ssdGroup.add(hole);

    ssdGroup.position.set(0, -0.5, -0.4);
    ssdGroup.rotation.x = Math.PI / 4; // Miring estetik
    group.add(ssdGroup);

    group.scale.set(1.1, 1.1, 1.1);
    return group;
  };

  // 4. OUTPUT: Monitor Layar Komputer Modern 3D
  const createMonitorModel = (): THREE.Group => {
    const group = new THREE.Group();

    // Bingkai / Bezel Belakang Monitor
    const frameGeo = new THREE.BoxGeometry(4.0, 2.5, 0.18);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.35,
      metalness: 0.4,
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    group.add(frameMesh);

    // Panel Layar Aktif (Depan) - Mengeluarkan Cahaya Biru Keren
    const screenGeo = new THREE.BoxGeometry(3.85, 2.35, 0.04);
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b, // Deep indigo screen
      emissive: 0x312e81,
      emissiveIntensity: 0.4,
      roughness: 0.1,
      metalness: 0.6,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = 0.08;
    group.add(screenMesh);

    // Konten Visual Layar (Simulasi Grafik Desktop BELSISKOM)
    const winBarGeo = new THREE.BoxGeometry(3.6, 0.18, 0.02);
    const winBarMat = new THREE.MeshBasicMaterial({ color: 0x6366f1 });
    const winBar = new THREE.Mesh(winBarGeo, winBarMat);
    winBar.position.set(0, 0.95, 0.11);
    group.add(winBar);

    // Jendela Aplikasi di Layar
    const winAppGeo = new THREE.BoxGeometry(1.6, 1.1, 0.02);
    const winAppMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const winApp = new THREE.Mesh(winAppGeo, winAppMat);
    winApp.position.set(-0.8, 0.2, 0.11);
    group.add(winApp);

    // Logo LED di bawah layar
    const logoLedGeo = new THREE.SphereGeometry(0.04, 12, 12);
    const logoLedMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
    const logoLed = new THREE.Mesh(logoLedGeo, logoLedMat);
    logoLed.position.set(0, -1.2, 0.1);
    group.add(logoLed);

    // Leher Penyangga Monitor (Stand Leg)
    const legGeo = new THREE.CylinderGeometry(0.12, 0.14, 1.4, 16);
    const legMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.9,
      roughness: 0.2,
    });
    const legMesh = new THREE.Mesh(legGeo, legMat);
    legMesh.position.set(0, -1.3, -0.3);
    legMesh.rotation.x = -0.15;
    group.add(legMesh);

    // Kaki / Alas Penyangga Meja (Base)
    const baseGeo = new THREE.BoxGeometry(1.8, 0.08, 1.2);
    const baseMesh = new THREE.Mesh(baseGeo, legMat);
    baseMesh.position.set(0, -1.95, -0.1);
    group.add(baseMesh);

    group.scale.set(0.95, 0.95, 0.95);
    group.position.y = 0.4;
    return group;
  };

  // 5. COMMUNICATION: Wi-Fi Router / Modem 3D
  const createCommunicationModel = (): THREE.Group => {
    const group = new THREE.Group();

    // Badan Utama Router
    const bodyGeo = new THREE.BoxGeometry(3.4, 0.45, 2.2);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.3,
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    group.add(bodyMesh);

    // Plat Ventilasi Atas Aerodinamis
    const plateGeo = new THREE.BoxGeometry(3.1, 0.08, 1.9);
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.5,
    });
    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    plateMesh.position.y = 0.24;
    group.add(plateMesh);

    // 4 Antena Wi-Fi Tegak/Miring
    const antGeo = new THREE.CylinderGeometry(0.06, 0.08, 2.0, 16);
    const antMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.4,
      metalness: 0.5,
    });

    const antPositions = [
      { x: -1.4, z: -1.0, rotZ: 0.15 },
      { x: -0.5, z: -1.1, rotZ: 0.05 },
      { x: 0.5, z: -1.1, rotZ: -0.05 },
      { x: 1.4, z: -1.0, rotZ: -0.15 },
    ];

    antPositions.forEach((pos) => {
      const ant = new THREE.Mesh(antGeo, antMat);
      ant.position.set(pos.x, 1.0, pos.z);
      ant.rotation.z = pos.rotZ;
      ant.rotation.x = -0.1;
      group.add(ant);
    });

    // Lampu LED Status Sinyal Depan (Hijau & Biru Berkedip)
    const ledGeo = new THREE.SphereGeometry(0.05, 12, 12);
    const ledColors = [0x22c55e, 0x22c55e, 0x38bdf8, 0x22c55e, 0x38bdf8];
    ledColors.forEach((col, idx) => {
      const ledMat = new THREE.MeshBasicMaterial({ color: col });
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(-0.8 + idx * 0.4, 0.05, 1.12);
      group.add(led);
    });

    // Port Kuning RJ-45 LAN di Belakang (Terlihat saat diputar 360!)
    const portGeo = new THREE.BoxGeometry(0.25, 0.2, 0.08);
    const portMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 }); // Yellow LAN
    for (let p = 0; p < 4; p++) {
      const port = new THREE.Mesh(portGeo, portMat);
      port.position.set(-0.6 + p * 0.4, 0.02, -1.11);
      group.add(port);
    }

    // Port WAN Biru untuk Internet Modem
    const wanPortMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.4 });
    const wanPort = new THREE.Mesh(portGeo, wanPortMat);
    wanPort.position.set(1.0, 0.02, -1.11);
    group.add(wanPort);

    group.scale.set(1.15, 1.15, 1.15);
    group.position.y = -0.2;
    return group;
  };

  // Switch active 3D model
  const loadModel = useCallback((type: HardwareType) => {
    if (!sceneRef.current) return;

    // Remove existing model
    if (currentModelGroup.current) {
      sceneRef.current.remove(currentModelGroup.current);
    }

    let newModel: THREE.Group;
    switch (type) {
      case 'input':
        newModel = createKeyboardModel();
        break;
      case 'process':
        newModel = createCpuModel();
        break;
      case 'storage':
        newModel = createStorageModel();
        break;
      case 'output':
        newModel = createMonitorModel();
        break;
      case 'communication':
        newModel = createCommunicationModel();
        break;
      default:
        newModel = createKeyboardModel();
    }

    // Initial slight isometric angle
    newModel.rotation.x = 0.35;
    newModel.rotation.y = -0.5;

    currentModelGroup.current = newModel;
    sceneRef.current.add(newModel);
  }, []);

  // Initialize Three.js Scene
  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 380;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.2);
    cameraRef.current = camera;

    // 3. Renderer with antialias and alpha background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.8);
    mainLight.position.set(5, 8, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.0); // Soft cyan rim light
    fillLight.position.set(-6, -2, -4);
    scene.add(fillLight);

    const bottomGlow = new THREE.PointLight(0x6366f1, 0.8, 10);
    bottomGlow.position.set(0, -3, 2);
    scene.add(bottomGlow);

    // Load initial model
    loadModel(activeTab);

    // 5. Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (currentModelGroup.current && autoRotate && !isPointerDown.current) {
        currentModelGroup.current.rotation.y += 0.008;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 6. Resize listener
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight || 380;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [loadModel]);

  // Handle switching tabs
  const handleTabChange = (type: HardwareType) => {
    setActiveTab(type);
    loadModel(type);
  };

  // ==========================================
  // 360° TOUCH & MOUSE ROTATION LOGIC
  // ==========================================
  const handlePointerDown = (e: React.PointerEvent) => {
    isPointerDown.current = true;
    setIsInteracting(true);
    previousPointerPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDown.current || !currentModelGroup.current) return;

    const deltaX = e.clientX - previousPointerPosition.current.x;
    const deltaY = e.clientY - previousPointerPosition.current.y;

    // Full 360° arbitrary rotation
    currentModelGroup.current.rotation.y += deltaX * 0.012;
    currentModelGroup.current.rotation.x += deltaY * 0.012;

    previousPointerPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isPointerDown.current = false;
    setTimeout(() => setIsInteracting(false), 800);
  };

  // Zoom controls
  const handleZoom = (direction: 'in' | 'out') => {
    if (!cameraRef.current) return;
    const delta = direction === 'in' ? -0.4 : 0.4;
    cameraRef.current.position.z = Math.max(2.5, Math.min(8.0, cameraRef.current.position.z + delta));
  };

  // Reset view angle
  const handleResetView = () => {
    if (!currentModelGroup.current || !cameraRef.current) return;
    currentModelGroup.current.rotation.set(0.35, -0.5, 0);
    cameraRef.current.position.set(0, 1.2, 5.2);
  };

  const currentMeta = HARDWARE_DETAILS[activeTab];

  return (
    <div className="bg-slate-900 border-2 border-slate-700/80 rounded-3xl p-4 md:p-6 shadow-2xl my-8 overflow-hidden text-white">
      
      {/* Header Penampil 3D */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono">
              LAB 3D INTERAKTIF 360°
            </span>
            <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Bisa Diputar Segala Arah!
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-black mt-1 text-white">
            Eksplorasi 5 Pilar Hardware Komputer
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Pilih jenis hardware di bawah, lalu <strong>usap/tarik layar</strong> untuk memutar model 3D 360 derajat!
          </p>
        </div>

        {/* Quick Rotation Helper Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
          <Hand className="w-4 h-4 text-blue-400 animate-pulse" />
          <span>Geser mouse / usap layar untuk memutar</span>
        </div>
      </div>

      {/* 5 Hardware Tabs Navigation Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-4">
        {(Object.keys(HARDWARE_DETAILS) as HardwareType[]).map((type) => {
          const item = HARDWARE_DETAILS[type];
          const isSelected = activeTab === type;
          const Icon = item.icon;

          return (
            <button
              key={type}
              onClick={() => handleTabChange(type)}
              className={`p-2.5 md:p-3 rounded-2xl text-left transition-all border flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30 scale-[1.02]'
                  : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isSelected ? 'bg-white text-blue-600' : 'bg-slate-700 text-slate-300'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
              </div>
              <div className="font-bold text-xs leading-tight line-clamp-1">
                {type === 'input' && '1. Input'}
                {type === 'process' && '2. Process'}
                {type === 'storage' && '3. Storage'}
                {type === 'output' && '4. Output'}
                {type === 'communication' && '5. Network'}
              </div>
              <div className="text-[10px] text-slate-300/80 mt-0.5 line-clamp-1">
                {item.title.split(' ')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main 3D Canvas Stage & Controls */}
      <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-2 border-slate-700/80 rounded-3xl overflow-hidden shadow-inner">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        {/* Current Active Hardware Badge (Overlay Top Left) */}
        <div className="absolute top-4 left-4 z-10 space-y-1">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${currentMeta.tagColor}`}>
              {currentMeta.badge}
            </span>
            <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
              WebGL 3D Engine • 60 FPS
            </span>
          </div>
          <div className="text-base sm:text-lg font-black text-white drop-shadow">
            {currentMeta.title}
          </div>
        </div>

        {/* Floating 3D Interaction Control Buttons (Overlay Top Right) */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/80 shadow-lg">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition ${
              autoRotate ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Putar Otomatis 360 Derajat"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span className="text-[10px] hidden sm:inline">{autoRotate ? 'Auto: ON' : 'Auto: OFF'}</span>
          </button>

          <button
            onClick={() => handleZoom('in')}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
            title="Perbesar Model"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => handleZoom('out')}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
            title="Perkecil Model"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleResetView}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
            title="Kembalikan Sudut Pandang"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3D WebGL Canvas Container */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="w-full h-[360px] md:h-[420px] cursor-grab active:cursor-grabbing touch-none select-none"
        />

        {/* Bottom Touch Indicator Hint */}
        <div className="absolute bottom-3 inset-x-0 flex items-center justify-center pointer-events-none">
          <div className="px-3.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-sm text-[11px] text-slate-300 flex items-center gap-1.5 shadow-md">
            <Hand className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>Usap atau geser layar untuk memutar 360° ke segala arah!</span>
          </div>
        </div>
      </div>

      {/* Detailed Anatomical Callouts & Explanations under 3D model */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Box 1: Deskripsi & Fungsi Utama */}
        <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/80">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400 mb-1.5">
            <Info className="w-4 h-4" />
            <span>Fungsi & Konsep Utama</span>
          </div>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
            {currentMeta.shortDesc}
          </p>
          <div className="mt-3 p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/20 text-xs text-blue-200">
            {currentMeta.roleAnalogy}
          </div>
        </div>

        {/* Box 2: Bedah Komponen Fisik (Anatomi 3D) */}
        <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/80">
          <div className="text-xs font-bold text-amber-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Bagian Fisik yang Terlihat di Model 3D:</span>
          </div>
          <div className="space-y-2">
            {currentMeta.physicalParts.map((part, pIdx) => (
              <div key={pIdx} className="text-xs">
                <span className="font-bold text-white text-[11px]">• {part.name}: </span>
                <span className="text-slate-300 text-[11px]">{part.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Box 3: Contoh Perangkat Sehari-hari */}
        <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/80">
          <div className="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
            <Check className="w-4 h-4" />
            <span>Contoh Perangkat Sehari-hari:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5">
            {currentMeta.keyExamples.map((ex, exIdx) => (
              <div key={exIdx} className="px-2.5 py-1.5 rounded-lg bg-slate-900/60 border border-slate-700/60 text-xs text-slate-200 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>{ex}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
