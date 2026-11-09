'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Sparkles, 
  Info, 
  Check, 
  Cpu, 
  Keyboard, 
  HardDrive, 
  Tv, 
  Wifi,
  Hand,
  Layers,
  Pause,
  Play,
  Camera,
  Box,
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { 
  HARDWARE_CATEGORIES, 
  HardwareCategory, 
  HardwareSubItem 
} from './hardwareData';
import { buildHardwareModel } from './hardwareModelBuilders';
import { createStudioEnvMap } from './hardwareTextureGenerators';

const CATEGORY_ICONS: Record<HardwareCategory, any> = {
  input: Keyboard,
  process: Cpu,
  storage: HardDrive,
  output: Tv,
  communication: Wifi,
};

type ViewMode = '3d' | 'photo';

export default function Hardware3DViewer() {
  const [activeCategory, setActiveCategory] = useState<HardwareCategory>('input');
  const [activeSubItemId, setActiveSubItemId] = useState<string>('keyboard');
  const [viewMode, setViewMode] = useState<ViewMode>('3d');
  
  // Bug fix: use mutable ref for autoRotate so requestAnimationFrame closure is never stale
  const [autoRotate, setAutoRotate] = useState(false);
  const autoRotateRef = useRef(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const currentModelGroup = useRef<THREE.Group | null>(null);

  // Rotation & Drag state refs
  const isPointerDown = useRef(false);
  const previousPointerPosition = useRef({ x: 0, y: 0 });

  // Get active category meta & active sub-item
  const categoryMeta = HARDWARE_CATEGORIES[activeCategory];
  const activeSubItem = categoryMeta.items.find((item) => item.id === activeSubItemId) || categoryMeta.items[0];

  // ==========================================
  // MODEL LOADER & DISPOSAL
  // ==========================================
  const loadModel = useCallback((subItemId: string) => {
    if (!sceneRef.current) return;

    // 1. Remove and dispose previous model
    if (currentModelGroup.current) {
      sceneRef.current.remove(currentModelGroup.current);
      currentModelGroup.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material?.dispose();
          }
        }
      });
      currentModelGroup.current = null;
    }

    // 2. Build high-fidelity procedural model with authentic decals
    const newGroup = buildHardwareModel(subItemId);
    newGroup.rotation.set(0.35, -0.45, 0); // Optimal initial 3D perspective
    sceneRef.current.add(newGroup);
    currentModelGroup.current = newGroup;

    // Reset camera to standard distance
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 1.2, 5.2);
      cameraRef.current.lookAt(0, 0, 0);
    }
  }, []);

  // ==========================================
  // THREE.JS INITIALIZATION (Only in 3D Mode)
  // ==========================================
  useEffect(() => {
    if (viewMode !== '3d' || !containerRef.current) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 380;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.2);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;

    containerRef.current.replaceChildren(renderer.domElement);

    // 4. Studio Environment Lighting (Realistic Metallic Reflections)
    const envMap = createStudioEnvMap(renderer);
    scene.environment = envMap;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.2);
    mainLight.position.set(5, 8, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    fillLight.position.set(-6, -2, -4);
    scene.add(fillLight);

    const bottomGlow = new THREE.PointLight(0x6366f1, 0.9, 10);
    bottomGlow.position.set(0, -3, 2);
    scene.add(bottomGlow);

    // Load initial model
    loadModel(activeSubItemId);

    // 5. Animation loop (uses autoRotateRef to avoid stale closure bug!)
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (currentModelGroup.current && autoRotateRef.current && !isPointerDown.current) {
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
      envMap.dispose();
      renderer.dispose();
    };
  }, [viewMode, loadModel, activeSubItemId]);

  // Handle switching category pilar
  const handleCategoryChange = (category: HardwareCategory) => {
    setActiveCategory(category);
    const firstSubItem = HARDWARE_CATEGORIES[category].items[0];
    setActiveSubItemId(firstSubItem.id);
    if (viewMode === '3d') {
      loadModel(firstSubItem.id);
    }
  };

  // Handle switching sub-item
  const handleSubItemChange = (subItemId: string) => {
    setActiveSubItemId(subItemId);
    if (viewMode === '3d') {
      loadModel(subItemId);
    }
  };

  // Toggle Auto-Rotate: updates BOTH state and ref
  const handleToggleAutoRotate = () => {
    const nextVal = !autoRotate;
    setAutoRotate(nextVal);
    autoRotateRef.current = nextVal;
  };

  // ==========================================
  // 360° TOUCH & MOUSE ROTATION CONTROLS
  // ==========================================
  const handlePointerDown = (e: React.PointerEvent) => {
    isPointerDown.current = true;
    previousPointerPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDown.current || !currentModelGroup.current) return;

    const deltaX = e.clientX - previousPointerPosition.current.x;
    const deltaY = e.clientY - previousPointerPosition.current.y;

    currentModelGroup.current.rotation.y += deltaX * 0.012;
    currentModelGroup.current.rotation.x += deltaY * 0.012;

    previousPointerPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isPointerDown.current = false;
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
    currentModelGroup.current.rotation.set(0.35, -0.45, 0);
    cameraRef.current.position.set(0, 1.2, 5.2);
  };

  return (
    <div className="bg-slate-900 border-2 border-slate-700/80 rounded-3xl p-4 md:p-6 shadow-2xl my-8 overflow-hidden text-white">
      
      {/* Header Penampil 3D */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono">
              LAB 3D FOTOREALISTIK (PRODUK ASLI PERSIS)
            </span>
            <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Detail Tekstur Asli!
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-black mt-1 text-white">
            Eksplorasi 5 Pilar Hardware Komputer
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Model 3D dilengkapi teks ukiran laser resmi, barcode, dan detail fisik persis seperti barang aslinya di toko/laboratorium.
          </p>
        </div>

        {/* Dual Mode Switcher: 3D 360° vs Real Photo */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-800/90 border border-slate-700 shrink-0">
          <button
            onClick={() => setViewMode('3d')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
              viewMode === '3d'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Model 3D 360°</span>
          </button>

          <button
            onClick={() => setViewMode('photo')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
              viewMode === 'photo'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Foto Produk Asli HD</span>
          </button>
        </div>
      </div>

      {/* 5 Hardware Main Tabs Navigation Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-4">
        {(Object.keys(HARDWARE_CATEGORIES) as HardwareCategory[]).map((categoryKey) => {
          const category = HARDWARE_CATEGORIES[categoryKey];
          const isSelected = activeCategory === categoryKey;
          const Icon = CATEGORY_ICONS[categoryKey];

          return (
            <button
              key={categoryKey}
              onClick={() => handleCategoryChange(categoryKey)}
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
                {category.title.split(' ')[0]} {category.title.split(' ')[1]}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                3 Model Nyata
              </div>
            </button>
          );
        })}
      </div>

      {/* SUB-ITEM SELECTOR (3 DEVICES PER PILLAR) */}
      <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 mb-4">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span>Pilih Perangkat ({categoryMeta.categoryName}):</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {categoryMeta.items.map((subItem) => {
            const isSubSelected = activeSubItemId === subItem.id;
            const SubIcon = subItem.icon;

            return (
              <button
                key={subItem.id}
                onClick={() => handleSubItemChange(subItem.id)}
                className={`px-3 py-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                  isSubSelected
                    ? 'bg-blue-500/20 border-blue-400 text-white shadow-md shadow-blue-500/20 ring-1 ring-blue-400'
                    : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-800/80'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isSubSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  <SubIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold truncate">
                    {subItem.shortName}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {subItem.badge}
                  </div>
                </div>
                {isSubSelected && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN VIEWPORT: 3D WEBGL CANVAS OR REAL PHOTO HD */}
      {viewMode === '3d' ? (
        /* MODE 1: 3D WEBGL CANVAS VIEWPORT */
        <div className="relative rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800 overflow-hidden shadow-inner">
          
          {/* Active Item Title & Real Product Badge Overlay */}
          <div className="absolute top-3 left-3 z-10 pointer-events-none max-w-[65%]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-md ${categoryMeta.tagColor}`}>
                {categoryMeta.categoryName.split('.')[1]}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800/90 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                ⭐ Produk Asli: {activeSubItem.realProductName}
              </span>
            </div>
            <h4 className="text-base md:text-xl font-black text-white mt-1 drop-shadow-md">
              {activeSubItem.name}
            </h4>
          </div>

          {/* Floating Action Controls on Top Right */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-slate-900/80 border border-slate-700/80 rounded-2xl p-1.5 backdrop-blur-md shadow-lg">
            <button
              onClick={handleToggleAutoRotate}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                autoRotate
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
              title={autoRotate ? 'Matikan Auto-Putar' : 'Nyalakan Auto-Putar'}
            >
              {autoRotate ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-white" />
                  <span className="hidden sm:inline">Auto Putar: Aktif</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Auto Putar: Mati</span>
                </>
              )}
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
            className="w-full h-[380px] md:h-[440px] cursor-grab active:cursor-grabbing touch-none select-none"
          />

          {/* Bottom Touch Indicator Hint */}
          <div className="absolute bottom-3 inset-x-0 flex items-center justify-center pointer-events-none">
            <div className="px-3.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-sm text-[11px] text-slate-300 flex items-center gap-1.5 shadow-md">
              <Hand className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>Usap layar sentuh atau geser mouse untuk memutar 360° ke segala arah!</span>
            </div>
          </div>
        </div>
      ) : (
        /* MODE 2: FOTO PRODUK ASLI NYATA (STUDIO HD SHOWCASE) */
        <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl p-5 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Foto Produk Asli Nyata */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl bg-slate-950 group">
              <img
                src={activeSubItem.photoUrl}
                alt={activeSubItem.realProductName}
                className="w-full h-[280px] md:h-[340px] object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 inline-flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Foto Fisik Produk Asli
                </span>
                <div className="text-sm md:text-base font-bold text-white mt-1">
                  {activeSubItem.realProductName}
                </div>
              </div>
            </div>

            {/* Spesifikasi Teknis Produk Nyata */}
            <div className="space-y-4">
              <div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Spesifikasi Komersial di Dunia Nyata:</span>
                </div>
                <h4 className="text-lg md:text-2xl font-black text-white">
                  {activeSubItem.realProductName}
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Komponen ini digunakan di komputer laboratorium SMP Negeri 2 Lemahabang dan komputer modern saat ini.
                </p>
              </div>

              {/* Rincian Spesifikasi Nyata */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                {activeSubItem.realSpecs.map((spec, sIdx) => (
                  <div key={sIdx} className="text-xs text-slate-200 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-200 flex items-center justify-between">
                <span>Ingin melihat komponen ini dalam bentuk 3D interaktif?</span>
                <button
                  onClick={() => setViewMode('3d')}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 transition"
                >
                  Buka Model 3D ➔
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Detailed Anatomical Callouts & Explanations under 3D model */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Box 1: Deskripsi & Fungsi Utama */}
        <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/80">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400 mb-1.5">
            <Info className="w-4 h-4" />
            <span>Fungsi & Konsep Utama</span>
          </div>
          <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
            {activeSubItem.shortDesc}
          </p>
          <div className="mt-3 p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/20 text-xs text-blue-200">
            {activeSubItem.roleAnalogy}
          </div>
        </div>

        {/* Box 2: Bedah Komponen Fisik (Anatomi 3D) */}
        <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/80">
          <div className="text-xs font-bold text-amber-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Bagian Fisik yang Terlihat di Model 3D:</span>
          </div>
          <div className="space-y-2">
            {activeSubItem.physicalParts.map((part, pIdx) => (
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
            {activeSubItem.keyExamples.map((ex, exIdx) => (
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
