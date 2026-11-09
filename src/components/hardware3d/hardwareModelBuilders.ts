import * as THREE from 'three';
import {
  createCpuIhsTexture,
  createKeyboardTexture,
  createMouseStickerTexture,
  createSsdLabelTexture,
  createRamLabelTexture,
  createHddLabelTexture,
  createMonitorDesktopTexture,
  createRouterTexture,
} from './hardwareTextureGenerators';

// =========================================================================
// 15 PHOTOREALISTIC PROCEDURAL THREE.JS HARDWARE MODELS
// High-fidelity PBR materials, authentic branded decals, and true-to-life details
// =========================================================================

// -------------------------------------------------------------
// 1. INPUT DEVICES (Keyboard, Mouse, Webcam)
// -------------------------------------------------------------

export function createKeyboardModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Bodi dasar keyboard ergonomis
  const baseGeo = new THREE.BoxGeometry(4.4, 0.25, 2.2);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.5,
    metalness: 0.1,
  });
  const baseMesh = new THREE.Mesh(baseGeo, baseMat);
  baseMesh.castShadow = true;
  group.add(baseMesh);

  // 2. Dek Atas dengan Tekstur QWERTY Layout Fotorealistik
  const deckTexture = createKeyboardTexture();
  const deckGeo = new THREE.PlaneGeometry(4.2, 2.0);
  const deckMat = new THREE.MeshStandardMaterial({
    map: deckTexture,
    roughness: 0.35,
    metalness: 0.1,
  });
  const deck = new THREE.Mesh(deckGeo, deckMat);
  deck.rotation.x = -Math.PI / 2;
  deck.position.set(0, 0.14, 0);
  group.add(deck);

  // Bezel pembatas sekeliling
  const bezelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 });
  const frontLipGeo = new THREE.BoxGeometry(4.4, 0.08, 0.1);
  const frontLip = new THREE.Mesh(frontLipGeo, bezelMat);
  frontLip.position.set(0, 0.16, 1.05);
  group.add(frontLip);

  // 3. Tombol Spacebar Timbul Realistis
  const spaceGeo = new THREE.BoxGeometry(1.6, 0.12, 0.24);
  const spaceMat = new THREE.MeshStandardMaterial({ color: 0x1e40af, roughness: 0.3 });
  const space = new THREE.Mesh(spaceGeo, spaceMat);
  space.position.set(0, 0.19, 0.65);
  group.add(space);

  // 4. Kabel USB Berkualitas Tinggi
  const cordGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.2, 16);
  const cordMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.4 });
  const cordMesh = new THREE.Mesh(cordGeo, cordMat);
  cordMesh.rotation.x = Math.PI / 2;
  cordMesh.position.set(0, 0.05, -1.7);
  group.add(cordMesh);

  // Kepala Colokan USB Logam
  const usbHeadGeo = new THREE.BoxGeometry(0.24, 0.12, 0.4);
  const usbHeadMat = new THREE.MeshStandardMaterial({ color: 0xcfd4dc, metalness: 0.95, roughness: 0.15 });
  const usbHead = new THREE.Mesh(usbHeadGeo, usbHeadMat);
  usbHead.position.set(0, 0.05, -2.4);
  group.add(usbHead);

  group.scale.set(1.1, 1.1, 1.1);
  return group;
}

export function createMouseModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Cangkang Atas Mouse Matte Hitam (Logitech G102 Style)
  const bodyGeo = new THREE.SphereGeometry(1.25, 36, 28);
  bodyGeo.scale(1.0, 0.58, 1.65);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.25,
    metalness: 0.1,
  });
  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
  group.add(bodyMesh);

  // Garis Pemisah Tombol Klik Kiri & Kanan
  const splitGeo = new THREE.BoxGeometry(0.03, 0.15, 1.1);
  const splitMat = new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.9 });
  const splitMesh = new THREE.Mesh(splitGeo, splitMat);
  splitMesh.position.set(0, 0.68, -0.6);
  group.add(splitMesh);

  // 2. Roda Scroll Wheel Karet Bergerigi Biru
  const wheelGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.14, 24);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.2, metalness: 0.4 });
  const wheel = new THREE.Mesh(wheelGeo, wheelMat);
  wheel.rotation.z = Math.PI / 2;
  wheel.position.set(0, 0.68, -0.65);
  group.add(wheel);

  // Tombol DPI Switcher di Belakang Scroll
  const dpiGeo = new THREE.BoxGeometry(0.18, 0.08, 0.22);
  const dpiMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.3 });
  const dpi = new THREE.Mesh(dpiGeo, dpiMat);
  dpi.position.set(0, 0.69, -0.15);
  group.add(dpi);

  // Strip Lampu RGB Samping Melengkung
  const rgbGeo = new THREE.TorusGeometry(1.15, 0.03, 12, 32, Math.PI);
  const rgbMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
  const rgbStrip = new THREE.Mesh(rgbGeo, rgbMat);
  rgbStrip.rotation.x = Math.PI / 2;
  rgbStrip.rotation.z = Math.PI;
  rgbStrip.position.set(0, 0.15, 0.3);
  group.add(rgbStrip);

  // 3. Stiker Spesifikasi & Lensa Sensor Optik Bawah Fotorealistik (Terlihat saat diputar 360°)
  const bottomStickerTexture = createMouseStickerTexture();
  const bottomStickerGeo = new THREE.PlaneGeometry(1.4, 1.4);
  const bottomStickerMat = new THREE.MeshStandardMaterial({
    map: bottomStickerTexture,
    roughness: 0.4,
    metalness: 0.1,
  });
  const bottomSticker = new THREE.Mesh(bottomStickerGeo, bottomStickerMat);
  bottomSticker.rotation.x = Math.PI / 2;
  bottomSticker.position.set(0, -0.71, 0);
  group.add(bottomSticker);

  // Lensa Sensor Merah Bersinar di Tengah Bawah
  const redSensorGeo = new THREE.SphereGeometry(0.1, 16, 16);
  const redSensorMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const redSensor = new THREE.Mesh(redSensorGeo, redSensorMat);
  redSensor.position.set(0, -0.7, 0);
  group.add(redSensor);

  // 4. Kabel USB Depan
  const cableGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.2, 12);
  const cableMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });
  const cable = new THREE.Mesh(cableGeo, cableMat);
  cable.rotation.x = Math.PI / 2;
  cable.position.set(0, 0.1, -1.9);
  group.add(cable);

  group.scale.set(1.2, 1.2, 1.2);
  return group;
}

export function createWebcamModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Kepala Kamera Utama (Logitech C920 Style)
  const headGeo = new THREE.CylinderGeometry(0.85, 0.85, 2.4, 32);
  const headMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.25, metalness: 0.3 });
  const head = new THREE.Mesh(headGeo, headMat);
  head.rotation.z = Math.PI / 2;
  head.position.set(0, 0.6, 0);
  group.add(head);

  // Bezel Depan Kaca Hitam
  const frontGlassGeo = new THREE.BoxGeometry(2.3, 0.8, 0.06);
  const frontGlassMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.1, metalness: 0.8 });
  const frontGlass = new THREE.Mesh(frontGlassGeo, frontGlassMat);
  frontGlass.position.set(0, 0.6, 0.86);
  group.add(frontGlass);

  // Cincin Lensa Optik Logam Perak (Full HD 1080p Engraved)
  const ringGeo = new THREE.TorusGeometry(0.5, 0.08, 16, 32);
  const ringMat = new THREE.MeshStandardMaterial({ color: 0xcfd4dc, metalness: 0.95, roughness: 0.15 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.position.set(0, 0.6, 0.92);
  group.add(ring);

  // Lensa Optik Kaca Biru Tua Reflektif (Multi-Coated Glass)
  const lensGeo = new THREE.SphereGeometry(0.42, 32, 16);
  const lensMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.05,
    metalness: 0.95,
  });
  const lens = new THREE.Mesh(lensGeo, lensMat);
  lens.scale.set(1, 1, 0.3);
  lens.position.set(0, 0.6, 0.92);
  group.add(lens);

  // Lampu LED Indikator Aktivitas Biru
  const ledGeo = new THREE.SphereGeometry(0.06, 12, 12);
  const ledMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
  const led = new THREE.Mesh(ledGeo, ledMat);
  led.position.set(0.85, 0.6, 0.9);
  group.add(led);

  // Kisi-kisi Mikrofon Stereo Kiri & Kanan
  const micGeo = new THREE.BoxGeometry(0.25, 0.45, 0.04);
  const micMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 });
  const leftMic = new THREE.Mesh(micGeo, micMat);
  leftMic.position.set(-0.85, 0.6, 0.9);
  group.add(leftMic);

  // 2. Klem Penjepit Layar Monitor Fleksibel
  const neckGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.4, 16);
  const neckMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8 });
  const neck = new THREE.Mesh(neckGeo, neckMat);
  neck.position.set(0, -0.1, 0);
  group.add(neck);

  const basePlatGeo = new THREE.BoxGeometry(1.6, 0.14, 1.4);
  const clampMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
  const basePlat = new THREE.Mesh(basePlatGeo, clampMat);
  basePlat.position.set(0, -0.35, 0.2);
  group.add(basePlat);

  const clampFootGeo = new THREE.BoxGeometry(1.4, 0.12, 1.2);
  const clampFoot = new THREE.Mesh(clampFootGeo, clampMat);
  clampFoot.rotation.x = -0.6;
  clampFoot.position.set(0, -0.75, -0.4);
  group.add(clampFoot);

  group.scale.set(1.2, 1.2, 1.2);
  return group;
}

// -------------------------------------------------------------
// 2. PROCESSING DEVICES (CPU, GPU, Motherboard)
// -------------------------------------------------------------

export function createCpuModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Papan Substrat Hijau PCB Multi-Lapis
  const pcbGeo = new THREE.BoxGeometry(2.8, 0.1, 2.8);
  const pcbMat = new THREE.MeshStandardMaterial({
    color: 0x15803d,
    roughness: 0.35,
    metalness: 0.2,
  });
  const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
  group.add(pcbMesh);

  // Sudut Segitiga Emas Penanda Kaki 1 (Notch Pin 1)
  const notchGeo = new THREE.BoxGeometry(0.24, 0.11, 0.24);
  const notchMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.95, roughness: 0.1 });
  const notchMesh = new THREE.Mesh(notchGeo, notchMat);
  notchMesh.position.set(-1.26, 0.01, -1.26);
  group.add(notchMesh);

  // 2. Pelindung Panas Logam (IHS) dengan Tekstur Ukiran Laser Intel Asli
  const ihsTexture = createCpuIhsTexture();
  const ihsBaseGeo = new THREE.BoxGeometry(2.2, 0.2, 2.2);
  const ihsBaseMat = new THREE.MeshStandardMaterial({
    color: 0xd1d5db,
    metalness: 0.9,
    roughness: 0.2,
  });
  const ihsBase = new THREE.Mesh(ihsBaseGeo, ihsBaseMat);
  ihsBase.position.y = 0.13;
  group.add(ihsBase);

  // Pelat Atas dengan Tekstur Laser Etching
  const ihsPlateGeo = new THREE.PlaneGeometry(2.0, 2.0);
  const ihsPlateMat = new THREE.MeshStandardMaterial({
    map: ihsTexture,
    metalness: 0.85,
    roughness: 0.25,
  });
  const ihsPlate = new THREE.Mesh(ihsPlateGeo, ihsPlateMat);
  ihsPlate.rotation.x = -Math.PI / 2;
  ihsPlate.position.y = 0.24;
  group.add(ihsPlate);

  // 3. Pin Kontak Emas (LGA1700 Grid) di Sisi Bawah
  const pinGeo = new THREE.BoxGeometry(0.08, 0.06, 0.08);
  const pinMat = new THREE.MeshStandardMaterial({
    color: 0xfbbf24,
    metalness: 0.95,
    roughness: 0.1,
  });

  const pinGroup = new THREE.Group();
  for (let x = -1.1; x <= 1.1; x += 0.22) {
    for (let z = -1.1; z <= 1.1; z += 0.22) {
      if (Math.abs(x) < 0.45 && Math.abs(z) < 0.45) continue; // Area tengah kapasitor
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.set(x, -0.07, z);
      pinGroup.add(pin);
    }
  }
  group.add(pinGroup);

  // Kapasitor SMD di Bagian Tengah Bawah
  const capGeo = new THREE.BoxGeometry(0.14, 0.06, 0.2);
  const capMat = new THREE.MeshStandardMaterial({ color: 0x78350f, metalness: 0.5 });
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(i * 0.22, -0.07, j * 0.22);
      group.add(cap);
    }
  }

  group.scale.set(1.4, 1.4, 1.4);
  return group;
}

export function createGpuModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Papan PCB Hitam Panjang
  const pcbGeo = new THREE.BoxGeometry(4.6, 0.1, 2.3);
  const pcbMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 });
  const pcb = new THREE.Mesh(pcbGeo, pcbMat);
  group.add(pcb);

  // 2. Blok Pendingin Heatsink Aluminium Tebal
  const sinkGeo = new THREE.BoxGeometry(4.2, 0.55, 2.1);
  const sinkMat = new THREE.MeshStandardMaterial({ color: 0xcfd4dc, metalness: 0.9, roughness: 0.2 });
  const sink = new THREE.Mesh(sinkGeo, sinkMat);
  sink.position.y = 0.32;
  group.add(sink);

  // 3. Pipa Tembaga Pendingin (Heatpipes Emas/Tembaga)
  const pipeGeo = new THREE.CylinderGeometry(0.08, 0.08, 4.0, 16);
  const pipeMat = new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.95, roughness: 0.1 });
  const pipe1 = new THREE.Mesh(pipeGeo, pipeMat);
  pipe1.rotation.z = Math.PI / 2;
  pipe1.position.set(0, 0.35, 0.6);
  group.add(pipe1);
  const pipe2 = pipe1.clone();
  pipe2.position.z = -0.6;
  group.add(pipe2);

  // 4. Shroud Casing Hitam dengan Motif Garis Gaming
  const shroudGeo = new THREE.BoxGeometry(4.4, 0.2, 2.2);
  const shroudMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 });
  const shroud = new THREE.Mesh(shroudGeo, shroudMat);
  shroud.position.y = 0.68;
  group.add(shroud);

  // 5. Dua Kipas Axial-tech Pendingin Ganda
  const fanHoleGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.16, 28);
  const fanHoleMat = new THREE.MeshStandardMaterial({ color: 0x020617 });
  const fanCenterGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.2, 20);
  const fanCenterMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, metalness: 0.8 });

  [-1.1, 1.1].forEach((fanX) => {
    const fanWell = new THREE.Mesh(fanHoleGeo, fanHoleMat);
    fanWell.position.set(fanX, 0.72, 0);
    group.add(fanWell);

    const fanHub = new THREE.Mesh(fanCenterGeo, fanCenterMat);
    fanHub.position.set(fanX, 0.76, 0);
    group.add(fanHub);

    // Bilah kipas berulir
    for (let b = 0; b < 7; b++) {
      const bladeGeo = new THREE.BoxGeometry(0.68, 0.04, 0.2);
      const bladeMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.25 });
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      blade.rotation.y = (b * Math.PI * 2) / 7;
      blade.position.set(fanX, 0.74, 0);
      group.add(blade);
    }
  });

  // 6. Konektor PCIe x16 Bus Emas di Bawah
  const pcieGeo = new THREE.BoxGeometry(2.6, 0.28, 0.08);
  const pcieMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.95, roughness: 0.1 });
  const pcie = new THREE.Mesh(pcieGeo, pcieMat);
  pcie.position.set(0.4, -0.18, 1.1);
  group.add(pcie);

  // 7. Braket Belakang Logam (HDMI & DisplayPort)
  const bracketGeo = new THREE.BoxGeometry(0.12, 1.3, 2.4);
  const bracketMat = new THREE.MeshStandardMaterial({ color: 0xcfd4dc, metalness: 0.95, roughness: 0.15 });
  const bracket = new THREE.Mesh(bracketGeo, bracketMat);
  bracket.position.set(-2.3, 0.28, 0);
  group.add(bracket);

  group.scale.set(1.1, 1.1, 1.1);
  return group;
}

export function createMotherboardModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Papan Sirkuit PCB Utama Biru/Hitam
  const boardGeo = new THREE.BoxGeometry(4.4, 0.1, 4.4);
  const boardMat = new THREE.MeshStandardMaterial({ color: 0x091e3a, roughness: 0.4, metalness: 0.1 });
  const board = new THREE.Mesh(boardGeo, boardMat);
  group.add(board);

  // 2. Soket CPU Logam Perak LGA1700 dengan Tuas
  const socketGeo = new THREE.BoxGeometry(1.6, 0.15, 1.6);
  const socketMat = new THREE.MeshStandardMaterial({ color: 0xcfd4dc, metalness: 0.85, roughness: 0.2 });
  const socket = new THREE.Mesh(socketGeo, socketMat);
  socket.position.set(-0.6, 0.1, -0.6);
  group.add(socket);

  const leverGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.8, 12);
  const leverMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.95 });
  const lever = new THREE.Mesh(leverGeo, leverMat);
  lever.rotation.x = Math.PI / 2;
  lever.position.set(0.3, 0.18, -0.6);
  group.add(lever);

  // 3. Dua Slot RAM DDR4 Vertikal di Samping Kanan
  const ramSlotGeo = new THREE.BoxGeometry(0.2, 0.2, 2.4);
  const ramSlotMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
  [-0.1, 0.4].forEach((slotX) => {
    const slot = new THREE.Mesh(ramSlotGeo, ramSlotMat);
    slot.position.set(0.9 + slotX, 0.12, -0.6);
    group.add(slot);
  });

  // 4. Slot Panjang Logam PCIe 5.0 x16
  const pcieSlotGeo = new THREE.BoxGeometry(2.8, 0.2, 0.24);
  const pcieSlotMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.3 });
  const pcieSlot = new THREE.Mesh(pcieSlotGeo, pcieSlotMat);
  pcieSlot.position.set(-0.2, 0.12, 1.0);
  group.add(pcieSlot);

  // 5. Heatsink Chipset VRM Aluminium Bersirip
  const chipsetGeo = new THREE.BoxGeometry(1.2, 0.4, 1.2);
  const chipsetMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.85, roughness: 0.2 });
  const chipset = new THREE.Mesh(chipsetGeo, chipsetMat);
  chipset.position.set(1.3, 0.22, 1.3);
  group.add(chipset);

  // 6. Blok Panel Port Belakang I/O
  const ioBlockGeo = new THREE.BoxGeometry(0.5, 0.75, 2.8);
  const ioBlockMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.25 });
  const ioBlock = new THREE.Mesh(ioBlockGeo, ioBlockMat);
  ioBlock.position.set(-1.9, 0.4, -0.6);
  group.add(ioBlock);

  group.scale.set(1.05, 1.05, 1.05);
  return group;
}

// -------------------------------------------------------------
// 3. STORAGE DEVICES (RAM, SSD NVMe, Harddisk)
// -------------------------------------------------------------

export function createRamModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Papan PCB Ramping Hijau RAM
  const pcbGeo = new THREE.BoxGeometry(4.2, 0.95, 0.08);
  const pcbMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.3 });
  const pcb = new THREE.Mesh(pcbGeo, pcbMat);
  group.add(pcb);

  // 2. Heat Spreader Aluminium Hitam Agresif
  const spreaderGeo = new THREE.BoxGeometry(4.25, 0.75, 0.14);
  const spreaderMat = new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.8, roughness: 0.3 });
  const spreader = new THREE.Mesh(spreaderGeo, spreaderMat);
  spreader.position.set(0, 0.12, 0);
  group.add(spreader);

  // 3. Stiker Spesifikasi Kingston FURY Beast Fotorealistik
  const ramLabelTexture = createRamLabelTexture();
  const labelGeo = new THREE.PlaneGeometry(3.8, 0.6);
  const labelMat = new THREE.MeshStandardMaterial({ map: ramLabelTexture, roughness: 0.4 });
  const labelFront = new THREE.Mesh(labelGeo, labelMat);
  labelFront.position.set(0, 0.12, 0.08);
  group.add(labelFront);

  const labelBack = labelFront.clone();
  labelBack.rotation.y = Math.PI;
  labelBack.position.z = -0.08;
  group.add(labelBack);

  // 4. Pin Kontak Emas (DDR4 Gold Fingers) di Sisi Bawah
  const goldGeo = new THREE.BoxGeometry(4.1, 0.2, 0.09);
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.95, roughness: 0.1 });
  const goldStrip = new THREE.Mesh(goldGeo, goldMat);
  goldStrip.position.set(0, -0.42, 0);
  group.add(goldStrip);

  // Lekukan Kunci Pengaman Notch
  const notchCutGeo = new THREE.BoxGeometry(0.18, 0.25, 0.12);
  const notchCutMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
  const notchCut = new THREE.Mesh(notchCutGeo, notchCutMat);
  notchCut.position.set(0.15, -0.42, 0);
  group.add(notchCut);

  group.scale.set(1.2, 1.2, 1.2);
  return group;
}

export function createSsdModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. PCB Stick M.2 Ramping 2280 Hitam Matte
  const pcbGeo = new THREE.BoxGeometry(3.8, 0.08, 1.15);
  const pcbMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.4 });
  const pcb = new THREE.Mesh(pcbGeo, pcbMat);
  group.add(pcb);

  // 2. Stiker Termal Samsung 980 PRO Fotorealistik Ber-Barcode
  const ssdLabelTexture = createSsdLabelTexture();
  const labelGeo = new THREE.PlaneGeometry(3.0, 1.05);
  const labelMat = new THREE.MeshStandardMaterial({ map: ssdLabelTexture, roughness: 0.35 });
  const label = new THREE.Mesh(labelGeo, labelMat);
  label.rotation.x = -Math.PI / 2;
  label.position.set(0.2, 0.05, 0);
  group.add(label);

  // 3. Chip Pengendali Elpida Berlapis Nikel
  const ctrlGeo = new THREE.BoxGeometry(0.5, 0.09, 0.5);
  const ctrlMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.95, roughness: 0.15 });
  const ctrl = new THREE.Mesh(ctrlGeo, ctrlMat);
  ctrl.position.set(-1.15, 0.06, 0);
  group.add(ctrl);

  // 4. Pin Konektor Soket M.2 Emas di Ujung Kiri
  const pinGeo = new THREE.BoxGeometry(0.38, 0.07, 0.95);
  const pinMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.95, roughness: 0.1 });
  const pin = new THREE.Mesh(pinGeo, pinMat);
  pin.position.set(-1.8, 0, 0);
  group.add(pin);

  // 5. Celah Sekrup Pengunci Setengah Lingkaran di Ujung Kanan
  const notchGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.12, 16);
  const notchMat = new THREE.MeshBasicMaterial({ color: 0x090d16 });
  const notch = new THREE.Mesh(notchGeo, notchMat);
  notch.position.set(1.88, 0, 0);
  group.add(notch);

  group.scale.set(1.35, 1.35, 1.35);
  return group;
}

export function createHddModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Casing Tebal Aluminium Harddisk 3.5 Inci
  const caseGeo = new THREE.BoxGeometry(3.8, 0.7, 2.7);
  const caseMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.3 });
  const caseMesh = new THREE.Mesh(caseGeo, caseMat);
  group.add(caseMesh);

  // 2. Ruang Dalam Terbuka (Cutaway Chamber)
  const chamberGeo = new THREE.BoxGeometry(3.4, 0.22, 2.4);
  const chamberMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
  const chamber = new THREE.Mesh(chamberGeo, chamberMat);
  chamber.position.y = 0.28;
  group.add(chamber);

  // 3. Piringan Cakram Cermin Mengkilap (Mirror-Finish Platter)
  const platterGeo = new THREE.CylinderGeometry(1.0, 1.0, 0.06, 48);
  const platterMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.98,
    roughness: 0.05,
  });
  const platter = new THREE.Mesh(platterGeo, platterMat);
  platter.position.set(-0.45, 0.34, 0);
  group.add(platter);

  // Motor Spindle Tengah Cakram
  const spindleGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.1, 24);
  const spindleMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9 });
  const spindle = new THREE.Mesh(spindleGeo, spindleMat);
  spindle.position.set(-0.45, 0.36, 0);
  group.add(spindle);

  // 4. Lengan Jarum Pembaca (Actuator Arm & Head Tip)
  const armPivotGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.16, 20);
  const armPivotMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.85 });
  const armPivot = new THREE.Mesh(armPivotGeo, armPivotMat);
  armPivot.position.set(1.05, 0.34, 0.65);
  group.add(armPivot);

  const armGeo = new THREE.BoxGeometry(1.25, 0.04, 0.08);
  const armMat = new THREE.MeshStandardMaterial({ color: 0xcfd4dc, metalness: 0.95 });
  const arm = new THREE.Mesh(armGeo, armMat);
  arm.rotation.y = -0.55;
  arm.position.set(0.42, 0.36, 0.38);
  group.add(arm);

  // 5. Stiker Resmi Seagate BarraCuda 2TB di Tutup Luar Bawah (Terlihat saat diputar 360°)
  const hddLabelTexture = createHddLabelTexture();
  const labelGeo = new THREE.PlaneGeometry(3.2, 2.2);
  const labelMat = new THREE.MeshStandardMaterial({ map: hddLabelTexture, roughness: 0.4 });
  const label = new THREE.Mesh(labelGeo, labelMat);
  label.rotation.x = Math.PI / 2;
  label.position.set(0, -0.36, 0);
  group.add(label);

  group.scale.set(1.2, 1.2, 1.2);
  return group;
}

// -------------------------------------------------------------
// 4. OUTPUT DEVICES (Monitor, Speaker, Printer)
// -------------------------------------------------------------

export function createMonitorModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Bingkai Bezel Layar Depan Ultra-Tipis
  const frameGeo = new THREE.BoxGeometry(4.4, 2.6, 0.16);
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3, metalness: 0.4 });
  const frame = new THREE.Mesh(frameGeo, frameMat);
  frame.position.set(0, 1.2, 0);
  group.add(frame);

  // 2. Panel Layar Menampilkan Desktop Windows 11 Fotorealistik
  const screenTexture = createMonitorDesktopTexture();
  const screenGeo = new THREE.PlaneGeometry(4.2, 2.4);
  const screenMat = new THREE.MeshStandardMaterial({
    map: screenTexture,
    roughness: 0.15,
    metalness: 0.2,
  });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.set(0, 1.2, 0.09);
  group.add(screen);

  // 3. Tiang Penyangga Leher Logam
  const standPoleGeo = new THREE.CylinderGeometry(0.12, 0.15, 1.4, 16);
  const standMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.85, roughness: 0.2 });
  const standPole = new THREE.Mesh(standPoleGeo, standMat);
  standPole.position.set(0, 0.3, -0.3);
  group.add(standPole);

  // 4. Kaki Dudukan Meja Segi Empat Kokoh
  const baseFootGeo = new THREE.BoxGeometry(2.0, 0.12, 1.4);
  const baseFoot = new THREE.Mesh(baseFootGeo, standMat);
  baseFoot.position.set(0, -0.4, 0.1);
  group.add(baseFoot);

  group.scale.set(1.05, 1.05, 1.05);
  return group;
}

export function createSpeakerModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Kotak Kabinet Kayu/Hitam Matte
  const boxGeo = new THREE.BoxGeometry(2.2, 3.4, 2.0);
  const boxMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.4, metalness: 0.1 });
  const box = new THREE.Mesh(boxGeo, boxMat);
  group.add(box);

  // 2. Membran Kerucut Besar Woofer Bass
  const wooferConeGeo = new THREE.CylinderGeometry(0.7, 0.22, 0.3, 28);
  const coneMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.5 });
  const woofer = new THREE.Mesh(wooferConeGeo, coneMat);
  woofer.rotation.x = Math.PI / 2;
  woofer.position.set(0, -0.4, 1.0);
  group.add(woofer);

  // Dust Cap Logam Biru di Tengah Woofer
  const capGeo = new THREE.SphereGeometry(0.24, 20, 20);
  const capMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, metalness: 0.7, roughness: 0.2 });
  const cap = new THREE.Mesh(capGeo, capMat);
  cap.position.set(0, -0.4, 1.15);
  group.add(cap);

  // 3. Membran Kubah Kecil Tweeter Nada Tinggi
  const tweeterGeo = new THREE.SphereGeometry(0.32, 20, 20);
  const tweeterMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.7, roughness: 0.2 });
  const tweeter = new THREE.Mesh(tweeterGeo, tweeterMat);
  tweeter.position.set(0, 0.8, 1.0);
  group.add(tweeter);

  // 4. Kenop Putar Volume Depan
  const knobGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.16, 20);
  const knobMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
  const knob = new THREE.Mesh(knobGeo, knobMat);
  knob.rotation.x = Math.PI / 2;
  knob.position.set(0, -1.2, 1.05);
  group.add(knob);

  group.scale.set(1.1, 1.1, 1.1);
  return group;
}

export function createPrinterModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Bodi Utama Printer Modern
  const bodyGeo = new THREE.BoxGeometry(3.8, 1.6, 2.6);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  group.add(body);

  // Tutup Atas Scanner Hitam
  const lidGeo = new THREE.BoxGeometry(3.6, 0.1, 2.4);
  const lidMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3 });
  const lid = new THREE.Mesh(lidGeo, lidMat);
  lid.position.set(0, 0.82, 0);
  group.add(lid);

  // 2. Jendela 4 Tangki Tinta (Cyan, Magenta, Yellow, Black) di Kanan Depan
  const tankColors = [0x0284c7, 0xec4899, 0xfacc15, 0x020617];
  tankColors.forEach((col, idx) => {
    const tankGeo = new THREE.BoxGeometry(0.14, 0.45, 0.04);
    const tankMat = new THREE.MeshBasicMaterial({ color: col });
    const tank = new THREE.Mesh(tankGeo, tankMat);
    tank.position.set(1.1 + idx * 0.18, -0.3, 1.32);
    group.add(tank);
  });

  // 3. Baki Kertas Masuk & Keluar dengan Kertas Tercetak
  const feedTrayGeo = new THREE.BoxGeometry(2.4, 0.08, 1.4);
  const trayMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.5 });
  const feedTray = new THREE.Mesh(feedTrayGeo, trayMat);
  feedTray.rotation.x = -0.7;
  feedTray.position.set(0, 1.1, -1.1);
  group.add(feedTray);

  const paperGeo = new THREE.BoxGeometry(2.1, 0.02, 1.2);
  const paperMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const paper = new THREE.Mesh(paperGeo, paperMat);
  paper.rotation.x = -0.7;
  paper.position.set(0, 1.15, -1.1);
  group.add(paper);

  const outTrayGeo = new THREE.BoxGeometry(2.4, 0.08, 1.2);
  const outTray = new THREE.Mesh(outTrayGeo, trayMat);
  outTray.position.set(0, -0.6, 1.6);
  group.add(outTray);

  const printedPaper = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.02, 1.0), paperMat);
  printedPaper.position.set(0, -0.54, 1.5);
  group.add(printedPaper);

  group.scale.set(1.05, 1.05, 1.05);
  return group;
}

// -------------------------------------------------------------
// 5. COMMUNICATION DEVICES (Router, Modem, NIC)
// -------------------------------------------------------------

export function createRouterModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Bodi Utama Router
  const baseGeo = new THREE.BoxGeometry(3.8, 0.45, 2.5);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3 });
  const base = new THREE.Mesh(baseGeo, baseMat);
  group.add(base);

  // 2. Dek Atas dengan Tekstur Kisi & Ikon LED TP-Link Archer Fotorealistik
  const routerTexture = createRouterTexture();
  const topPlateGeo = new THREE.PlaneGeometry(3.6, 2.3);
  const topPlateMat = new THREE.MeshStandardMaterial({
    map: routerTexture,
    roughness: 0.3,
  });
  const topPlate = new THREE.Mesh(topPlateGeo, topPlateMat);
  topPlate.rotation.x = -Math.PI / 2;
  topPlate.position.y = 0.24;
  group.add(topPlate);

  // 3. 4 Tiang Antena Omni-Directional Panjang
  const antGeo = new THREE.CylinderGeometry(0.06, 0.08, 2.4, 16);
  const antMat = new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.3 });

  [-1.5, -0.5, 0.5, 1.5].forEach((antX, idx) => {
    const ant = new THREE.Mesh(antGeo, antMat);
    ant.rotation.z = (idx === 0 ? 0.12 : idx === 3 ? -0.12 : 0);
    ant.position.set(antX, 1.2, -1.2);
    group.add(ant);
  });

  // 4. 4 Port Kuning Gigabit LAN (RJ-45) di Belakang
  const lanPortGeo = new THREE.BoxGeometry(0.36, 0.26, 0.15);
  const lanPortMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 });
  for (let p = 0; p < 4; p++) {
    const port = new THREE.Mesh(lanPortGeo, lanPortMat);
    port.position.set(-0.7 + p * 0.45, 0, -1.27);
    group.add(port);
  }

  // 1 Port Biru WAN Internet
  const wanPort = new THREE.Mesh(lanPortGeo, new THREE.MeshStandardMaterial({ color: 0x2563eb }));
  wanPort.position.set(1.15, 0, -1.27);
  group.add(wanPort);

  group.scale.set(1.15, 1.15, 1.15);
  return group;
}

export function createModemModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Casing Vertikal Berdiri Modem ONT Putih
  const bodyGeo = new THREE.BoxGeometry(1.2, 3.4, 2.6);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  group.add(body);

  // 2. Dudukan Kaki Lebar
  const footGeo = new THREE.BoxGeometry(1.8, 0.16, 2.8);
  const footMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.4 });
  const foot = new THREE.Mesh(footGeo, footMat);
  foot.position.set(0, -1.7, 0);
  group.add(foot);

  // 3. Kolom Lampu LED Status di Depan (Power, PON, LOS, LAN, Internet)
  const ledColors = [0x22c55e, 0x22c55e, 0xef4444, 0x22c55e, 0x22c55e];
  ledColors.forEach((col, lIdx) => {
    const ledGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const led = new THREE.Mesh(ledGeo, new THREE.MeshBasicMaterial({ color: col }));
    led.position.set(0, 1.1 - lIdx * 0.45, 1.31);
    group.add(led);
  });

  // 4. Port Hijau SC/APC Serat Optik di Bawah Belakang
  const fiberPortGeo = new THREE.BoxGeometry(0.24, 0.3, 0.3);
  const fiberPortMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.3 });
  const fiberPort = new THREE.Mesh(fiberPortGeo, fiberPortMat);
  fiberPort.position.set(0, -1.3, -1.31);
  group.add(fiberPort);

  group.scale.set(1.15, 1.15, 1.15);
  return group;
}

export function createNicModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Papan PCB Ramping Hijau Kartu Jaringan
  const pcbGeo = new THREE.BoxGeometry(2.8, 1.8, 0.08);
  const pcbMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.3 });
  const pcb = new THREE.Mesh(pcbGeo, pcbMat);
  group.add(pcb);

  // 2. Chip Controller Gigabit Hitam
  const chipGeo = new THREE.BoxGeometry(0.65, 0.65, 0.08);
  const chipMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.2 });
  const chip = new THREE.Mesh(chipGeo, chipMat);
  chip.position.set(0.2, 0.1, 0.06);
  group.add(chip);

  // 3. Pelat Braket Logam Casing Belakang Perak
  const bracketGeo = new THREE.BoxGeometry(0.08, 3.2, 0.7);
  const bracketMat = new THREE.MeshStandardMaterial({ color: 0xcfd4dc, metalness: 0.95, roughness: 0.15 });
  const bracket = new THREE.Mesh(bracketGeo, bracketMat);
  bracket.position.set(-1.4, 0.3, 0);
  group.add(bracket);

  // 4. Soket Port RJ-45 Logam Terlindung
  const rj45Geo = new THREE.BoxGeometry(0.85, 0.65, 0.65);
  const rj45Mat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
  const rj45 = new THREE.Mesh(rj45Geo, rj45Mat);
  rj45.position.set(-1.0, 0.1, 0);
  group.add(rj45);

  // Dua Lampu LED Status Link Hijau & Oranye
  const ledGreen = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.06), new THREE.MeshBasicMaterial({ color: 0x22c55e }));
  ledGreen.position.set(-1.42, 0.35, 0.18);
  group.add(ledGreen);

  const ledAmber = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.06), new THREE.MeshBasicMaterial({ color: 0xf59e0b }));
  ledAmber.position.set(-1.42, 0.35, -0.18);
  group.add(ledAmber);

  // 5. Pin Konektor PCIe x1 Emas di Bawah
  const pcieGeo = new THREE.BoxGeometry(1.2, 0.3, 0.08);
  const pcieMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.95, roughness: 0.1 });
  const pcie = new THREE.Mesh(pcieGeo, pcieMat);
  pcie.position.set(0.4, -1.0, 0);
  group.add(pcie);

  group.scale.set(1.3, 1.3, 1.3);
  return group;
}

// -------------------------------------------------------------
// MODEL FACTORY DISPATCHER
// -------------------------------------------------------------

export function buildHardwareModel(subItemId: string): THREE.Group {
  switch (subItemId) {
    case 'keyboard':
      return createKeyboardModel();
    case 'mouse':
      return createMouseModel();
    case 'webcam':
      return createWebcamModel();
    case 'cpu':
      return createCpuModel();
    case 'gpu':
      return createGpuModel();
    case 'motherboard':
      return createMotherboardModel();
    case 'ram':
      return createRamModel();
    case 'ssd':
      return createSsdModel();
    case 'hdd':
      return createHddModel();
    case 'monitor':
      return createMonitorModel();
    case 'speaker':
      return createSpeakerModel();
    case 'printer':
      return createPrinterModel();
    case 'router':
      return createRouterModel();
    case 'modem':
      return createModemModel();
    case 'nic':
      return createNicModel();
    default:
      return createKeyboardModel();
  }
}
