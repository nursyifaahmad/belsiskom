import * as THREE from 'three';

// =========================================================================
// PROCEDURAL HIGH-RESOLUTION TEXTURE GENERATORS (PHOTOREALISTIC PBR DECALS)
// Generates crisp, realistic textures in browser memory without external assets
// =========================================================================

// Helper to create a CanvasTexture with proper color space and filtering
function canvasToTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  return texture;
}

// -------------------------------------------------------------
// 1. CPU IHS LASER-ETCHED TEXTURE (Intel Core i7-14700K Authentic)
// -------------------------------------------------------------
export function createCpuIhsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Brushed aluminum metallic background
  const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
  grad.addColorStop(0, '#e2e8f0');
  grad.addColorStop(0.5, '#cbd5e1');
  grad.addColorStop(1, '#94a3b8');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Brushed metal fine lines
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  for (let y = 0; y < 1024; y += 4) {
    ctx.fillRect(0, y, 1024, 2);
  }

  // Border chamfer
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 16;
  ctx.strokeRect(32, 32, 960, 960);

  // Laser etched text (dark gray / slightly sunken)
  ctx.fillStyle = '#334155';
  ctx.textAlign = 'center';

  // Intel logo
  ctx.font = 'bold 84px Arial, sans-serif';
  ctx.fillText('intel.', 512, 220);

  // Core i7 branding
  ctx.font = '900 110px "Segoe UI", Arial, sans-serif';
  ctx.fillText('CORE™ i7', 512, 360);

  // Model number
  ctx.font = 'bold 64px "Consolas", monospace';
  ctx.fillText('i7-14700K', 512, 460);

  // Spec lines
  ctx.font = 'bold 36px "Consolas", monospace';
  ctx.fillText('SRN0B  3.40GHZ', 512, 540);
  ctx.fillText('LGA1700  BATCH #X338F921', 512, 600);

  // 2D DataMatrix QR Code Simulation
  const qrX = 412;
  const qrY = 660;
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(qrX, qrY, 200, 200);
  ctx.fillStyle = '#cbd5e1';
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 10; c++) {
      if ((r + c * 3) % 2 === 0) {
        ctx.fillRect(qrX + c * 20, qrY + r * 20, 18, 18);
      }
    }
  }

  // Serial text at bottom
  ctx.fillStyle = '#475569';
  ctx.font = '28px "Consolas", monospace';
  ctx.fillText('MADE IN MALAYSIA • 001', 512, 920);

  return canvasToTexture(canvas);
}

// -------------------------------------------------------------
// 2. KEYBOARD QWERTY LAYOUT TEXTURE
// -------------------------------------------------------------
export function createKeyboardTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Keyboard top deck dark background
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 1024, 512);

  // Brand insignia
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 24px Arial, sans-serif';
  ctx.fillText('BELSISKOM PRO', 60, 40);

  // Status LEDs
  ctx.fillStyle = '#64748b';
  ctx.font = '16px monospace';
  ctx.fillText('NUM  CAPS  SCROLL', 820, 40);
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(840, 60, 6, 0, Math.PI * 2);
  ctx.arc(890, 60, 6, 0, Math.PI * 2);
  ctx.fill();

  // Keys representation (QWERTY layout)
  const rows = [
    ['ESC', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'DEL'],
    ['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'BKSP'],
    ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '\\'],
    ['CAPS', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', 'ENTER'],
    ['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'SHIFT'],
    ['CTRL', 'WIN', 'ALT', '               SPACEBAR               ', 'ALT', 'FN', 'CTRL']
  ];

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const startY = 85;
  const rowHeight = 65;

  rows.forEach((row, rIdx) => {
    const colWidth = 1024 / row.length;
    row.forEach((key, cIdx) => {
      const x = cIdx * colWidth + 4;
      const y = startY + rIdx * rowHeight;
      const w = colWidth - 8;
      const h = rowHeight - 8;

      // Keycap surface
      const isBlue = key === 'ESC' || key === 'ENTER' || key.includes('SPACE');
      ctx.fillStyle = isBlue ? '#1e40af' : '#1e293b';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 6);
      ctx.fill();
      ctx.stroke();

      // Key text
      ctx.fillStyle = isBlue ? '#ffffff' : '#e2e8f0';
      ctx.font = key.length > 3 ? 'bold 16px "Segoe UI", Arial' : 'bold 22px "Segoe UI", Arial';
      ctx.fillText(key, x + w / 2, y + h / 2);
    });
  });

  return canvasToTexture(canvas);
}

// -------------------------------------------------------------
// 3. MOUSE BOTTOM SENSOR & SPEC STICKER TEXTURE
// -------------------------------------------------------------
export function createMouseStickerTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#090d16';
  ctx.fillRect(0, 0, 512, 512);

  // Sticker outline
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 432, 432);

  // Product title
  ctx.fillStyle = '#f8fafc';
  ctx.textAlign = 'center';
  ctx.font = 'bold 32px Arial';
  ctx.fillText('OPTICAL GAMING MOUSE', 256, 100);

  ctx.font = '20px monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('MODEL: BSK-G102 • 8000 DPI', 256, 140);
  ctx.fillText('RATING: 5V === 100mA', 256, 175);

  // Laser aperture warning
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(256, 260, 50, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#ef4444';
  ctx.font = 'bold 16px Arial';
  ctx.fillText('INVISIBLE LASER / LED', 256, 335);
  ctx.fillText('DO NOT STARE INTO BEAM', 256, 360);

  // Certification symbols
  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 24px Arial';
  ctx.fillText('CE   FC   RoHS   UKCA', 256, 420);

  return canvasToTexture(canvas);
}

// -------------------------------------------------------------
// 4. SSD NVME M.2 SAMSUNG 980 PRO LABEL TEXTURE
// -------------------------------------------------------------
export function createSsdLabelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 340;
  const ctx = canvas.getContext('2d')!;

  // Matte black thermal sticker
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 1024, 340);

  // Copper / thermal line on top
  ctx.fillStyle = '#ea580c';
  ctx.fillRect(0, 0, 1024, 16);

  // Brand Name
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 68px Arial, sans-serif';
  ctx.fillText('SAMSUNG', 50, 95);

  ctx.font = 'bold 54px Arial, sans-serif';
  ctx.fillStyle = '#ef4444';
  ctx.fillText('980 PRO', 420, 95);

  ctx.font = 'bold 36px Arial, sans-serif';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText('PCIe 4.0 NVMe M.2 SSD • 1TB', 50, 155);

  // Specs & Serial
  ctx.font = '24px "Consolas", monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('SPEED: UP TO 7,000 MB/s READ', 50, 205);
  ctx.fillText('S/N: S5GXNX0T104829K • RATED DC+3.3V 2.9A', 50, 245);
  ctx.fillText('V-NAND ELPIDA CONTROLLER • MADE IN KOREA', 50, 285);

  // Barcode
  const barX = 720;
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 60; i++) {
    const w = ((i * 7) % 5 === 0) ? 6 : ((i % 2 === 0) ? 2 : 4);
    ctx.fillRect(barX + i * 4.5, 60, w, 160);
  }

  // QR Code Box
  ctx.fillStyle = '#38bdf8';
  ctx.font = '18px monospace';
  ctx.fillText('SEC-M2-2280', 760, 260);

  return canvasToTexture(canvas);
}

// -------------------------------------------------------------
// 5. RAM KINGSTON FURY DDR4 STICK LABEL TEXTURE
// -------------------------------------------------------------
export function createRamLabelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Black brushed heat spreader
  ctx.fillStyle = '#18181b';
  ctx.fillRect(0, 0, 1024, 256);

  // Red racing accent
  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.moveTo(30, 20);
  ctx.lineTo(180, 20);
  ctx.lineTo(140, 80);
  ctx.lineTo(30, 80);
  ctx.fill();

  // White FURY logo
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 72px "Arial Black", Impact, sans-serif';
  ctx.fillText('FURY', 200, 75);

  ctx.font = 'bold 38px Arial';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('BEAST DDR4', 440, 70);

  // Spec sticker section
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(50, 110, 924, 110);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 30px "Consolas", monospace';
  ctx.fillText('KF432C16BB/16', 70, 150);
  ctx.font = '24px "Consolas", monospace';
  ctx.fillText('16GB 2G x 64-Bit DDR4-3200 CL16 288-Pin DIMM 1.35V', 70, 190);

  // Barcode
  for (let i = 0; i < 50; i++) {
    const w = ((i * 3) % 4 === 0) ? 5 : 2;
    ctx.fillRect(680 + i * 5, 125, w, 70);
  }

  return canvasToTexture(canvas);
}

// -------------------------------------------------------------
// 6. HARDDISK SEAGATE BARRACUDA 3.5" DRIVE LABEL TEXTURE
// -------------------------------------------------------------
export function createHddLabelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 768;
  const ctx = canvas.getContext('2d')!;

  // White clean drive label
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 1024, 768);

  // Green Seagate top bar
  ctx.fillStyle = '#16a34a';
  ctx.fillRect(0, 0, 1024, 120);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 56px Arial, sans-serif';
  ctx.fillText('SEAGATE', 60, 82);

  ctx.font = '900 78px "Arial Black", Impact';
  ctx.fillStyle = '#0f172a';
  ctx.fillText('BarraCuda®', 60, 230);

  ctx.font = 'bold 96px Arial, sans-serif';
  ctx.fillStyle = '#16a34a';
  ctx.fillText('2 TB', 720, 230);

  ctx.fillStyle = '#334155';
  ctx.font = 'bold 36px "Consolas", monospace';
  ctx.fillText('DESKTOP HDD • 7200 RPM • 256MB CACHE', 60, 310);
  ctx.fillText('SATA 6Gb/s • MODEL: ST2000DM008', 60, 360);

  // Technical separator
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 3;
  ctx.strokeRect(60, 410, 904, 280);

  ctx.font = '24px "Consolas", monospace';
  ctx.fillStyle = '#475569';
  ctx.fillText('FIRMWARE: 0001 • DATE CODE: 2432 • SITE: TK', 90, 460);
  ctx.fillText('WWN: 5000C500B48A109F • LBA: 3907029168', 90, 505);
  ctx.fillText('RATED: +5V 0.55A, +12V 0.37A • MADE IN THAILAND', 90, 550);

  // Barcodes
  for (let i = 0; i < 70; i++) {
    const w = ((i * 5) % 3 === 0) ? 6 : 2;
    ctx.fillRect(90 + i * 5, 590, w, 70);
  }

  // Warning text
  ctx.fillStyle = '#dc2626';
  ctx.font = 'bold 22px Arial';
  ctx.fillText('DO NOT COVER DRIVE BREATHING HOLE • FRAGILE', 520, 640);

  return canvasToTexture(canvas);
}

// -------------------------------------------------------------
// 7. MONITOR SCREEN WINDOWS 11 DESKTOP TEXTURE
// -------------------------------------------------------------
export function createMonitorDesktopTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d')!;

  // Windows 11 Flow Wallpaper (Deep Royal Blue Gradient)
  const bgGrad = ctx.createLinearGradient(0, 0, 1920, 1080);
  bgGrad.addColorStop(0, '#0c1b33');
  bgGrad.addColorStop(0.4, '#0369a1');
  bgGrad.addColorStop(0.7, '#0284c7');
  bgGrad.addColorStop(1, '#082f49');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1920, 1080);

  // Elegant ribbon blooms (Windows 11 Bloom artwork)
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(960, 500, 480, 260, Math.PI / 4, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
  ctx.filter = 'blur(40px)';
  ctx.fill();
  ctx.restore();

  // Desktop Icons on the left
  const icons = [
    { name: 'This PC', color: '#38bdf8' },
    { name: 'Network', color: '#22c55e' },
    { name: 'Recycle Bin', color: '#f8fafc' },
    { name: 'BELSISKOM', color: '#f59e0b' },
  ];
  icons.forEach((ic, idx) => {
    const y = 80 + idx * 110;
    ctx.fillStyle = ic.color;
    ctx.beginPath();
    ctx.roundRect(60, y, 48, 48, 10);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '20px "Segoe UI", Arial';
    ctx.fillText(ic.name, 45, y + 74);
  });

  // Open Application Window: BELSISKOM Informatika
  const winX = 360;
  const winY = 160;
  const winW = 1200;
  const winH = 720;

  // Window Shadow & Frame
  ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(winX, winY, winW, winH, 16);
  ctx.fill();
  ctx.stroke();

  // Window Title Bar
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.roundRect(winX, winY, winW, 60, [16, 16, 0, 0]);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px "Segoe UI", Arial';
  ctx.fillText('💻 BELSISKOM — Portal Pembelajaran Informatika SMPN 2 Lemahabang', winX + 30, winY + 38);

  // Window Controls (Minimize, Maximize, Close)
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(winX + winW - 35, winY + 30, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(winX + winW - 65, winY + 30, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(winX + winW - 95, winY + 30, 9, 0, Math.PI * 2);
  ctx.fill();

  // Window Interior Content (Card Mockup)
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.roundRect(winX + 40, winY + 90, winW - 80, 240, 12);
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 36px "Segoe UI", Arial';
  ctx.fillText('Selamat Datang di Lab Sistem Komputer!', winX + 80, winY + 160);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '24px "Segoe UI", Arial';
  ctx.fillText('Guru Pengampu: Ahmad Nursyifa, S.Kom.', winX + 80, winY + 210);
  ctx.fillText('Materi: 5 Pilar Hardware (Input, Process, Storage, Output, Communication)', winX + 80, winY + 255);

  // Taskbar at the bottom (Windows 11 Centered)
  ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
  ctx.fillRect(0, 1080 - 64, 1920, 64);

  // Centered App Icons on Taskbar
  const taskIcons = ['#2563eb', '#38bdf8', '#22c55e', '#f59e0b', '#ec4899'];
  taskIcons.forEach((col, idx) => {
    const x = 960 - 120 + idx * 56;
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.roundRect(x, 1080 - 52, 38, 38, 8);
    ctx.fill();
  });

  // Time & Date on Right Taskbar
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px "Segoe UI", Arial';
  ctx.textAlign = 'right';
  ctx.fillText('08:00 AM', 1880, 1080 - 38);
  ctx.font = '14px "Segoe UI", Arial';
  ctx.fillText('09/11/2026', 1880, 1080 - 18);

  return canvasToTexture(canvas);
}

// -------------------------------------------------------------
// 8. ROUTER TOP CASING & LED STATUS TEXTURE
// -------------------------------------------------------------
export function createRouterTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Piano black with carbon texture
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 1024, 512);

  // Geometric cooling vents
  ctx.fillStyle = '#020617';
  for (let x = 80; x < 940; x += 40) {
    ctx.fillRect(x, 80, 16, 260);
  }

  // Brand logo
  ctx.fillStyle = '#38bdf8';
  ctx.font = '900 48px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('tp-link', 512, 60);

  ctx.font = 'bold 22px "Consolas", monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('ARCHER AX55 • WI-FI 6 GIGABIT ROUTER', 512, 390);

  // Front LED icons
  const leds = ['PWR', '2.4G', '5G', 'WAN', 'LAN1', 'LAN2', 'WPS'];
  const startX = 260;
  leds.forEach((name, idx) => {
    const x = startX + idx * 72;
    // Glowing green LED dot
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(x, 440, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 14px "Consolas", monospace';
    ctx.fillText(name, x, 470);
  });

  return canvasToTexture(canvas);
}

// -------------------------------------------------------------
// 9. PROCEDURAL STUDIO ENVIRONMENT MAP (METALLIC REFLECTION)
// -------------------------------------------------------------
export function createStudioEnvMap(renderer: THREE.WebGLRenderer): THREE.Texture {
  // Generate a smooth spherical studio gradient (soft overhead softbox light)
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#1e293b'); // Sky ambient
  grad.addColorStop(0.35, '#f8fafc'); // Overhead softbox light
  grad.addColorStop(0.5, '#94a3b8'); // Horizon
  grad.addColorStop(0.7, '#0f172a'); // Ground bounce
  grad.addColorStop(1, '#020617'); // Bottom dark
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);

  // Softbox highlights
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.beginPath();
  ctx.ellipse(256, 70, 160, 40, 0, 0, Math.PI * 2);
  ctx.filter = 'blur(10px)';
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
