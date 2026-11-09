import * as THREE from 'three';

// =========================================================================
// 15 PROCEDURAL THREE.JS HARDWARE MODEL BUILDERS (OFFLINE, FAST, INTERACTIVE)
// =========================================================================

// -------------------------------------------------------------
// 1. INPUT DEVICES (Keyboard, Mouse, Webcam)
// -------------------------------------------------------------

export function createKeyboardModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Body dasar keyboard
  const baseGeo = new THREE.BoxGeometry(4.4, 0.25, 2.0);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
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

  // Deretan Tombol Keycaps
  const keyGeo = new THREE.BoxGeometry(0.28, 0.16, 0.28);
  const keyMatDark = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.3, metalness: 0.1 });
  const keyMatBlue = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.3, metalness: 0.2 });

  const startX = -1.8;
  const startZ = -0.65;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 11; col++) {
      if (row === 3 && col >= 3 && col <= 7) continue; // Ruang spacebar
      const isSpecial = (row === 0 && col === 0) || (row === 2 && col === 10) || (row === 1 && col === 0);
      const keyMesh = new THREE.Mesh(keyGeo, isSpecial ? keyMatBlue : keyMatDark);
      keyMesh.position.set(startX + col * 0.36, 0.24, startZ + row * 0.42);
      group.add(keyMesh);
    }
  }

  // Tombol Spacebar
  const spaceGeo = new THREE.BoxGeometry(1.6, 0.16, 0.28);
  const spaceMesh = new THREE.Mesh(spaceGeo, keyMatDark);
  spaceMesh.position.set(startX + 5 * 0.36, 0.24, startZ + 3 * 0.42);
  group.add(spaceMesh);

  // Lampu LED Indikator kecil
  const ledGeo = new THREE.BoxGeometry(0.08, 0.04, 0.08);
  const ledMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
  for (let i = 0; i < 3; i++) {
    const led = new THREE.Mesh(ledGeo, ledMat);
    led.position.set(1.6 + i * 0.18, 0.2, -0.75);
    group.add(led);
  }

  // Kabel USB
  const cordGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.2, 12);
  const cordMat = new THREE.MeshStandardMaterial({ color: 0x0284c7 });
  const cordMesh = new THREE.Mesh(cordGeo, cordMat);
  cordMesh.rotation.x = Math.PI / 2;
  cordMesh.position.set(0, 0, -1.6);
  group.add(cordMesh);

  // Kepala Colokan USB Logam
  const usbHeadGeo = new THREE.BoxGeometry(0.22, 0.1, 0.35);
  const usbHeadMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
  const usbHead = new THREE.Mesh(usbHeadGeo, usbHeadMat);
  usbHead.position.set(0, 0, -2.25);
  group.add(usbHead);

  group.scale.set(1.1, 1.1, 1.1);
  return group;
}

export function createMouseModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Cangkang Utama Mouse (Ergonomis Melengkung)
  const bodyGeo = new THREE.SphereGeometry(1.3, 32, 24);
  bodyGeo.scale(1.0, 0.55, 1.7);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.3,
    metalness: 0.2,
  });
  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
  bodyMesh.position.set(0, 0, 0);
  group.add(bodyMesh);

  // 2. Garis Pemisah Tombol Klik Kiri & Kanan
  const splitGeo = new THREE.BoxGeometry(0.04, 0.12, 1.2);
  const splitMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
  const splitMesh = new THREE.Mesh(splitGeo, splitMat);
  splitMesh.position.set(0, 0.65, -0.6);
  group.add(splitMesh);

  // 3. Roda Gulir (Scroll Wheel) Biru
  const wheelGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.14, 20);
  const wheelMat = new THREE.MeshStandardMaterial({
    color: 0x2563eb,
    roughness: 0.2,
    metalness: 0.5,
  });
  const wheel = new THREE.Mesh(wheelGeo, wheelMat);
  wheel.rotation.z = Math.PI / 2;
  wheel.position.set(0, 0.65, -0.65);
  group.add(wheel);

  // 4. Grip Karet Samping
  const gripGeo = new THREE.BoxGeometry(0.08, 0.35, 1.4);
  const gripMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
  const leftGrip = new THREE.Mesh(gripGeo, gripMat);
  leftGrip.position.set(-1.18, 0.05, 0);
  group.add(leftGrip);
  const rightGrip = leftGrip.clone();
  rightGrip.position.x = 1.18;
  group.add(rightGrip);

  // 5. Sensor Optik Laser Merah di Bagian Bawah (Terlihat saat diputar 360)
  const sensorWellGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.1, 16);
  const sensorWellMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.8 });
  const sensorWell = new THREE.Mesh(sensorWellGeo, sensorWellMat);
  sensorWell.position.set(0, -0.68, 0);
  group.add(sensorWell);

  const laserDotGeo = new THREE.SphereGeometry(0.12, 16, 16);
  const laserDotMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const laserDot = new THREE.Mesh(laserDotGeo, laserDotMat);
  laserDot.position.set(0, -0.66, 0);
  group.add(laserDot);

  // 4 Bantalan Luncur Teflon Bawah
  const padGeo = new THREE.BoxGeometry(0.45, 0.03, 0.2);
  const padMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.2 });
  const pad1 = new THREE.Mesh(padGeo, padMat);
  pad1.position.set(-0.6, -0.68, -0.9);
  group.add(pad1);
  const pad2 = pad1.clone();
  pad2.position.x = 0.6;
  group.add(pad2);
  const pad3 = pad1.clone();
  pad3.position.set(-0.6, -0.68, 0.9);
  group.add(pad3);
  const pad4 = pad1.clone();
  pad4.position.set(0.6, -0.68, 0.9);
  group.add(pad4);

  // 6. Kabel USB Depan
  const cableGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.2, 12);
  const cableMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });
  const cable = new THREE.Mesh(cableGeo, cableMat);
  cable.rotation.x = Math.PI / 2;
  cable.position.set(0, 0.1, -2.0);
  group.add(cable);

  group.scale.set(1.2, 1.2, 1.2);
  return group;
}

export function createWebcamModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Kepala Kamera Utama (Silinder Bulat)
  const headGeo = new THREE.CylinderGeometry(0.85, 0.85, 1.8, 32);
  const headMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.3,
    metalness: 0.3,
  });
  const headMesh = new THREE.Mesh(headGeo, headMat);
  headMesh.rotation.z = Math.PI / 2;
  headMesh.position.set(0, 0.6, 0);
  group.add(headMesh);

  // Cincin Lensa Depan Logam
  const ringGeo = new THREE.TorusGeometry(0.55, 0.1, 16, 32);
  const ringMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.8, roughness: 0.2 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.position.set(0, 0.6, 0.92);
  group.add(ring);

  // Kaca Lensa Biru Tua Reflektif
  const lensGeo = new THREE.SphereGeometry(0.48, 32, 16);
  const lensMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.1,
    metalness: 0.9,
  });
  const lens = new THREE.Mesh(lensGeo, lensMat);
  lens.scale.set(1, 1, 0.3);
  lens.position.set(0, 0.6, 0.92);
  group.add(lens);

  // Lampu LED Indikator Hijau (Kamera Aktif)
  const ledGeo = new THREE.SphereGeometry(0.06, 12, 12);
  const ledMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
  const led = new THREE.Mesh(ledGeo, ledMat);
  led.position.set(0.65, 0.6, 0.88);
  group.add(led);

  // Lubang Mikrofon Stereo Kecil
  const micGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.1, 12);
  const micMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const mic1 = new THREE.Mesh(micGeo, micMat);
  mic1.rotation.x = Math.PI / 2;
  mic1.position.set(-0.65, 0.6, 0.88);
  group.add(mic1);

  // 2. Engsel Leher Putar
  const neckGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.5, 16);
  const neckMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8 });
  const neck = new THREE.Mesh(neckGeo, neckMat);
  neck.position.set(0, -0.3, 0);
  group.add(neck);

  // 3. Klem Penjepit Dudukan Monitor (Clamp Stand)
  const basePlatGeo = new THREE.BoxGeometry(1.4, 0.15, 1.2);
  const clampMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 });
  const basePlat = new THREE.Mesh(basePlatGeo, clampMat);
  basePlat.position.set(0, -0.55, 0);
  group.add(basePlat);

  const clampArmGeo = new THREE.BoxGeometry(1.2, 0.12, 1.0);
  const clampArm = new THREE.Mesh(clampArmGeo, clampMat);
  clampArm.rotation.x = -0.5;
  clampArm.position.set(0, -0.9, -0.5);
  group.add(clampArm);

  // Kabel USB
  const cordGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.0, 12);
  const cordMat = new THREE.MeshStandardMaterial({ color: 0x334155 });
  const cord = new THREE.Mesh(cordGeo, cordMat);
  cord.rotation.x = Math.PI / 2;
  cord.position.set(0, 0.4, -1.3);
  group.add(cord);

  group.scale.set(1.3, 1.3, 1.3);
  return group;
}

// -------------------------------------------------------------
// 2. PROCESSING DEVICES (CPU, GPU, Motherboard)
// -------------------------------------------------------------

export function createCpuModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Papan Substrat Hijau PCB
  const pcbGeo = new THREE.BoxGeometry(2.6, 0.1, 2.6);
  const pcbMat = new THREE.MeshStandardMaterial({
    color: 0x15803d,
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

  // 3. Pelindung Panas Logam (IHS - Integrated Heat Spreader)
  const ihsBaseGeo = new THREE.BoxGeometry(2.1, 0.18, 2.1);
  const ihsMat = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    metalness: 0.92,
    roughness: 0.18,
  });
  const ihsBase = new THREE.Mesh(ihsBaseGeo, ihsMat);
  ihsBase.position.y = 0.12;
  group.add(ihsBase);

  // Tonjolan Inti Processor di tengah IHS
  const ihsCoreGeo = new THREE.BoxGeometry(1.6, 0.06, 1.6);
  const ihsCore = new THREE.Mesh(ihsCoreGeo, ihsMat);
  ihsCore.position.y = 0.23;
  group.add(ihsCore);

  // Label Laser Silikon di Atas CPU
  const labelGeo = new THREE.BoxGeometry(1.1, 0.02, 0.7);
  const labelMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.7,
    roughness: 0.3,
  });
  const label = new THREE.Mesh(labelGeo, labelMat);
  label.position.set(0, 0.27, 0);
  group.add(label);

  // 4. Pin Kontak Emas (LGA Contacts) di Bagian Bawah
  const pinGeo = new THREE.BoxGeometry(0.08, 0.05, 0.08);
  const pinMat = new THREE.MeshStandardMaterial({
    color: 0xfbbf24,
    metalness: 0.95,
    roughness: 0.1,
  });

  const pinGroup = new THREE.Group();
  for (let x = -1.0; x <= 1.0; x += 0.22) {
    for (let z = -1.0; z <= 1.0; z += 0.22) {
      if (Math.abs(x) < 0.35 && Math.abs(z) < 0.35) continue; // Area tengah kapasitor
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.set(x, -0.07, z);
      pinGroup.add(pin);
    }
  }
  group.add(pinGroup);

  // Kapasitor SMD di Tengah Bawah
  const capGeo = new THREE.BoxGeometry(0.12, 0.06, 0.18);
  const capMat = new THREE.MeshStandardMaterial({ color: 0x78350f, metalness: 0.4 });
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(i * 0.18, -0.07, j * 0.18);
      group.add(cap);
    }
  }

  group.scale.set(1.4, 1.4, 1.4);
  return group;
}

export function createGpuModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Papan PCB Hitam Panjang
  const pcbGeo = new THREE.BoxGeometry(4.4, 0.1, 2.2);
  const pcbMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4, metalness: 0.2 });
  const pcb = new THREE.Mesh(pcbGeo, pcbMat);
  group.add(pcb);

  // 2. Blok Pendingin Heatsink Aluminium
  const sinkGeo = new THREE.BoxGeometry(4.0, 0.5, 2.0);
  const sinkMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.3 });
  const sink = new THREE.Mesh(sinkGeo, sinkMat);
  sink.position.y = 0.3;
  group.add(sink);

  // 3. Penutup Casing Shroud Hitam
  const shroudGeo = new THREE.BoxGeometry(4.2, 0.2, 2.1);
  const shroudMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.2 });
  const shroud = new THREE.Mesh(shroudGeo, shroudMat);
  shroud.position.y = 0.62;
  group.add(shroud);

  // 4. Dua Kipas Pendingin (Dual Cooling Fans)
  const fanHoleGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.15, 24);
  const fanHoleMat = new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.5 });
  const fanCenterGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.18, 16);
  const fanCenterMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.7 });

  [-1.0, 1.0].forEach((fanX) => {
    const fanWell = new THREE.Mesh(fanHoleGeo, fanHoleMat);
    fanWell.position.set(fanX, 0.65, 0);
    group.add(fanWell);

    const fanHub = new THREE.Mesh(fanCenterGeo, fanCenterMat);
    fanHub.position.set(fanX, 0.68, 0);
    group.add(fanHub);

    // Bilah kipas
    for (let b = 0; b < 6; b++) {
      const bladeGeo = new THREE.BoxGeometry(0.65, 0.04, 0.18);
      const bladeMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.3 });
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      blade.rotation.y = (b * Math.PI) / 3;
      blade.position.set(fanX, 0.67, 0);
      group.add(blade);
    }
  });

  // 5. Pin Konektor PCIe Emas di Sisi Bawah
  const pcieGeo = new THREE.BoxGeometry(2.4, 0.25, 0.08);
  const pcieMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.9, roughness: 0.1 });
  const pcie = new THREE.Mesh(pcieGeo, pcieMat);
  pcie.position.set(0.4, -0.16, 1.05);
  group.add(pcie);

  // 6. Pelat Braket Logam Belakang (Port HDMI/DP)
  const bracketGeo = new THREE.BoxGeometry(0.12, 1.2, 2.3);
  const bracketMat = new THREE.MeshStandardMaterial({ color: 0xcfd4dc, metalness: 0.9, roughness: 0.2 });
  const bracket = new THREE.Mesh(bracketGeo, bracketMat);
  bracket.position.set(-2.2, 0.25, 0);
  group.add(bracket);

  // Port HDMI & DP pada braket
  const portGeo = new THREE.BoxGeometry(0.14, 0.14, 0.35);
  const portMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
  for (let p = -0.5; p <= 0.5; p += 0.5) {
    const port = new THREE.Mesh(portGeo, portMat);
    port.position.set(-2.2, 0.2, p);
    group.add(port);
  }

  group.scale.set(1.1, 1.1, 1.1);
  return group;
}

export function createMotherboardModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Papan Sirkuit PCB Utama Biru/Hijau Gelap
  const boardGeo = new THREE.BoxGeometry(4.2, 0.1, 4.2);
  const boardMat = new THREE.MeshStandardMaterial({
    color: 0x0e3a5a,
    roughness: 0.4,
    metalness: 0.1,
  });
  const board = new THREE.Mesh(boardGeo, boardMat);
  group.add(board);

  // 2. Soket CPU Logam Perak di Bagian Tengah Atas
  const socketGeo = new THREE.BoxGeometry(1.6, 0.14, 1.6);
  const socketMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.8, roughness: 0.2 });
  const socket = new THREE.Mesh(socketGeo, socketMat);
  socket.position.set(-0.6, 0.1, -0.6);
  group.add(socket);

  // Tuas Pengunci Logam Soket CPU
  const leverGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.8, 8);
  const leverMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.95 });
  const lever = new THREE.Mesh(leverGeo, leverMat);
  lever.rotation.x = Math.PI / 2;
  lever.position.set(0.3, 0.16, -0.6);
  group.add(lever);

  // 3. Dua Slot RAM DDR4 Vertikal di Sisi Kanan CPU
  const ramSlotGeo = new THREE.BoxGeometry(0.2, 0.2, 2.4);
  const ramSlotMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
  [-0.1, 0.4].forEach((slotX) => {
    const slot = new THREE.Mesh(ramSlotGeo, ramSlotMat);
    slot.position.set(0.9 + slotX, 0.12, -0.6);
    group.add(slot);
  });

  // 4. Slot Panjang PCIe x16 untuk Kartu Grafis di Bawah
  const pcieSlotGeo = new THREE.BoxGeometry(2.8, 0.2, 0.22);
  const pcieSlotMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.4 });
  const pcieSlot = new THREE.Mesh(pcieSlotGeo, pcieSlotMat);
  pcieSlot.position.set(-0.2, 0.12, 1.0);
  group.add(pcieSlot);

  // 5. Heatsink Chipset dengan Sirip-sirip di Kanan Bawah
  const chipsetGeo = new THREE.BoxGeometry(1.1, 0.35, 1.1);
  const chipsetMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.85, roughness: 0.25 });
  const chipset = new THREE.Mesh(chipsetGeo, chipsetMat);
  chipset.position.set(1.2, 0.2, 1.2);
  group.add(chipset);

  // 6. Blok Port Belakang I/O Panel (USB, Audio, LAN)
  const ioBlockGeo = new THREE.BoxGeometry(0.5, 0.7, 2.6);
  const ioBlockMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.3 });
  const ioBlock = new THREE.Mesh(ioBlockGeo, ioBlockMat);
  ioBlock.position.set(-1.8, 0.38, -0.6);
  group.add(ioBlock);

  // 7. Deretan Kapasitor Silinder Perak
  const capGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.25, 12);
  const capMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9, roughness: 0.2 });
  for (let c = 0; c < 5; c++) {
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.set(-1.3, 0.18, -1.5 + c * 0.45);
    group.add(cap);
  }

  group.scale.set(1.05, 1.05, 1.05);
  return group;
}

// -------------------------------------------------------------
// 3. STORAGE DEVICES (RAM, SSD NVMe, Harddisk)
// -------------------------------------------------------------

export function createRamModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Papan PCB Ramping Hijau RAM
  const pcbGeo = new THREE.BoxGeometry(4.2, 0.9, 0.08);
  const pcbMat = new THREE.MeshStandardMaterial({
    color: 0x166534,
    roughness: 0.3,
    metalness: 0.1,
  });
  const pcb = new THREE.Mesh(pcbGeo, pcbMat);
  group.add(pcb);

  // 2. Chip Memori IC NAND Hitam (8 Keping)
  const chipGeo = new THREE.BoxGeometry(0.38, 0.45, 0.08);
  const chipMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.2 });

  for (let side = -1; side <= 1; side += 2) {
    for (let c = 0; c < 8; c++) {
      const chip = new THREE.Mesh(chipGeo, chipMat);
      chip.position.set(-1.6 + c * 0.45, 0.08, side * 0.06);
      group.add(chip);
    }
  }

  // 3. Pin Kontak Emas (DDR4 Gold Fingers) di Bagian Bawah
  const goldGeo = new THREE.BoxGeometry(4.1, 0.2, 0.09);
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.95, roughness: 0.1 });
  const goldStrip = new THREE.Mesh(goldGeo, goldMat);
  goldStrip.position.set(0, -0.4, 0);
  group.add(goldStrip);

  // 4. Lekukan Kunci Pengaman (Notch Celah Tengah)
  const notchCutGeo = new THREE.BoxGeometry(0.18, 0.25, 0.12);
  const notchCutMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
  const notchCut = new THREE.Mesh(notchCutGeo, notchCutMat);
  notchCut.position.set(0.15, -0.4, 0);
  group.add(notchCut);

  // Klip Sayap Pengunci di Ujung Kiri & Kanan
  const clipGeo = new THREE.BoxGeometry(0.1, 0.2, 0.1);
  const clipMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0 });
  const leftClip = new THREE.Mesh(clipGeo, clipMat);
  leftClip.position.set(-2.05, 0.35, 0);
  group.add(leftClip);
  const rightClip = leftClip.clone();
  rightClip.position.x = 2.05;
  group.add(rightClip);

  group.scale.set(1.2, 1.2, 1.2);
  return group;
}

export function createSsdModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. PCB Stick M.2 Ramping 2280
  const pcbGeo = new THREE.BoxGeometry(3.6, 0.08, 1.1);
  const pcbMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 });
  const pcb = new THREE.Mesh(pcbGeo, pcbMat);
  group.add(pcb);

  // 2. Label Pendingin Termal Abu-abu Gelap
  const heatLabelGeo = new THREE.BoxGeometry(2.4, 0.05, 0.98);
  const heatLabelMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.6, roughness: 0.3 });
  const heatLabel = new THREE.Mesh(heatLabelGeo, heatLabelMat);
  heatLabel.position.set(0.2, 0.06, 0);
  group.add(heatLabel);

  // 3. Chip Pengendali (Controller IC)
  const ctrlGeo = new THREE.BoxGeometry(0.45, 0.08, 0.45);
  const ctrlMat = new THREE.MeshStandardMaterial({ color: 0xcfd4dc, metalness: 0.9, roughness: 0.2 });
  const ctrl = new THREE.Mesh(ctrlGeo, ctrlMat);
  ctrl.position.set(-1.1, 0.06, 0);
  group.add(ctrl);

  // 4. Pin Konektor Soket M.2 Emas di Ujung Kiri
  const pinGeo = new THREE.BoxGeometry(0.35, 0.07, 0.9);
  const pinMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.95, roughness: 0.1 });
  const pin = new THREE.Mesh(pinGeo, pinMat);
  pin.position.set(-1.7, 0, 0);
  group.add(pin);

  // 5. Celah Sekrup Pengunci Setengah Lingkaran di Ujung Kanan
  const notchGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.12, 16);
  const notchMat = new THREE.MeshBasicMaterial({ color: 0x090d16 });
  const notch = new THREE.Mesh(notchGeo, notchMat);
  notch.position.set(1.78, 0, 0);
  group.add(notch);

  group.scale.set(1.35, 1.35, 1.35);
  return group;
}

export function createHddModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Casing Tebal Aluminium Harddisk 3.5 Inci
  const caseGeo = new THREE.BoxGeometry(3.6, 0.65, 2.6);
  const caseMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.6, roughness: 0.3 });
  const caseMesh = new THREE.Mesh(caseGeo, caseMat);
  group.add(caseMesh);

  // 2. Ruang Dalam Terbuka (Top Chamber Cutaway)
  const chamberGeo = new THREE.BoxGeometry(3.3, 0.2, 2.3);
  const chamberMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
  const chamber = new THREE.Mesh(chamberGeo, chamberMat);
  chamber.position.y = 0.26;
  group.add(chamber);

  // 3. Piringan Cakram Magnetik Perak Mengkilap (Platter)
  const platterGeo = new THREE.CylinderGeometry(0.95, 0.95, 0.06, 36);
  const platterMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.98,
    roughness: 0.05,
  });
  const platter = new THREE.Mesh(platterGeo, platterMat);
  platter.position.set(-0.4, 0.32, 0);
  group.add(platter);

  // Spindle Motor Tengah Cakram
  const spindleGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.1, 20);
  const spindleMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9 });
  const spindle = new THREE.Mesh(spindleGeo, spindleMat);
  spindle.position.set(-0.4, 0.34, 0);
  group.add(spindle);

  // 4. Lengan Jarum Pembaca (Actuator Arm & Head)
  const armPivotGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.15, 16);
  const armPivotMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8 });
  const armPivot = new THREE.Mesh(armPivotGeo, armPivotMat);
  armPivot.position.set(1.0, 0.32, 0.6);
  group.add(armPivot);

  const armGeo = new THREE.BoxGeometry(1.2, 0.04, 0.08);
  const armMat = new THREE.MeshStandardMaterial({ color: 0xcfd4dc, metalness: 0.9 });
  const arm = new THREE.Mesh(armGeo, armMat);
  arm.rotation.y = -0.55;
  arm.position.set(0.4, 0.34, 0.35);
  group.add(arm);

  // Jarum Pembaca Tipis di Ujung
  const headTipGeo = new THREE.BoxGeometry(0.12, 0.03, 0.05);
  const headTipMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const headTip = new THREE.Mesh(headTipGeo, headTipMat);
  headTip.position.set(-0.15, 0.34, 0.1);
  group.add(headTip);

  // 5. Port Soket SATA & Power di Belakang
  const sataGeo = new THREE.BoxGeometry(0.12, 0.25, 0.8);
  const sataMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.5 });
  const sata = new THREE.Mesh(sataGeo, sataMat);
  sata.position.set(-1.82, -0.1, 0.5);
  group.add(sata);

  const powerGeo = new THREE.BoxGeometry(0.12, 0.25, 0.5);
  const powerMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.5 });
  const power = new THREE.Mesh(powerGeo, powerMat);
  power.position.set(-1.82, -0.1, -0.5);
  group.add(power);

  group.scale.set(1.2, 1.2, 1.2);
  return group;
}

// -------------------------------------------------------------
// 4. OUTPUT DEVICES (Monitor, Speaker, Printer)
// -------------------------------------------------------------

export function createMonitorModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Bingkai Bezel Layar Depan
  const frameGeo = new THREE.BoxGeometry(4.2, 2.6, 0.16);
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3, metalness: 0.4 });
  const frame = new THREE.Mesh(frameGeo, frameMat);
  frame.position.set(0, 1.2, 0);
  group.add(frame);

  // 2. Kaca Panel Layar Aktif (Grafis Antarmuka Biner)
  const screenGeo = new THREE.BoxGeometry(3.9, 2.3, 0.04);
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.1,
    metalness: 0.5,
    emissive: 0x0369a1,
    emissiveIntensity: 0.3,
  });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.set(0, 1.2, 0.09);
  group.add(screen);

  // Ilustrasi Jendela Aplikasi di Layar
  const winGeo = new THREE.BoxGeometry(2.4, 1.4, 0.02);
  const winMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });
  const win = new THREE.Mesh(winGeo, winMat);
  win.position.set(0, 1.2, 0.12);
  group.add(win);

  // Garis Teks Kode Biru di dalam Jendela
  for (let l = 0; l < 4; l++) {
    const lineGeo = new THREE.BoxGeometry(1.6 - l * 0.25, 0.06, 0.02);
    const lineMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const line = new THREE.Mesh(lineGeo, lineMat);
    line.position.set(-0.2 + l * 0.05, 1.5 - l * 0.2, 0.14);
    group.add(line);
  }

  // 3. Tiang Penyangga Leher Logam
  const standPoleGeo = new THREE.CylinderGeometry(0.12, 0.15, 1.4, 16);
  const standMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8, roughness: 0.2 });
  const standPole = new THREE.Mesh(standPoleGeo, standMat);
  standPole.position.set(0, 0.3, -0.3);
  group.add(standPole);

  // 4. Kaki Dudukan Meja Kokoh
  const baseFootGeo = new THREE.BoxGeometry(2.0, 0.12, 1.4);
  const baseFoot = new THREE.Mesh(baseFootGeo, standMat);
  baseFoot.position.set(0, -0.4, 0.1);
  group.add(baseFoot);

  group.scale.set(1.05, 1.05, 1.05);
  return group;
}

export function createSpeakerModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Kotak Kabinet Kayu/Hitam Speaker
  const boxGeo = new THREE.BoxGeometry(2.2, 3.4, 2.0);
  const boxMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.4, metalness: 0.1 });
  const box = new THREE.Mesh(boxGeo, boxMat);
  group.add(box);

  // 2. Membran Kerucut Besar (Woofer Nada Rendah)
  const wooferConeGeo = new THREE.CylinderGeometry(0.68, 0.2, 0.3, 24);
  const coneMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.5 });
  const woofer = new THREE.Mesh(wooferConeGeo, coneMat);
  woofer.rotation.x = Math.PI / 2;
  woofer.position.set(0, -0.4, 1.0);
  group.add(woofer);

  // Dust Cap Tengah Woofer
  const capGeo = new THREE.SphereGeometry(0.24, 16, 16);
  const capMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.4 });
  const cap = new THREE.Mesh(capGeo, capMat);
  cap.position.set(0, -0.4, 1.15);
  group.add(cap);

  // 3. Membran Kubah Kecil (Tweeter Nada Tinggi)
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

  // 5. Lubang Angin Belakang (Bass Reflex Port)
  const portGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 20);
  const portMat = new THREE.MeshBasicMaterial({ color: 0x09090b });
  const port = new THREE.Mesh(portGeo, portMat);
  port.rotation.x = Math.PI / 2;
  port.position.set(0, 0.7, -1.0);
  group.add(port);

  group.scale.set(1.1, 1.1, 1.1);
  return group;
}

export function createPrinterModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Bodi Utama Printer
  const bodyGeo = new THREE.BoxGeometry(3.8, 1.6, 2.6);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4, metalness: 0.1 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  group.add(body);

  // Tutup Atas Scanner Hitam
  const lidGeo = new THREE.BoxGeometry(3.6, 0.1, 2.4);
  const lidMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 });
  const lid = new THREE.Mesh(lidGeo, lidMat);
  lid.position.set(0, 0.82, 0);
  group.add(lid);

  // 2. Baki Kertas Masuk Miring di Belakang Atas
  const feedTrayGeo = new THREE.BoxGeometry(2.4, 0.08, 1.4);
  const trayMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.5 });
  const feedTray = new THREE.Mesh(feedTrayGeo, trayMat);
  feedTray.rotation.x = -0.7;
  feedTray.position.set(0, 1.1, -1.1);
  group.add(feedTray);

  // Lembaran Kertas HVS Putih Kosong
  const paperGeo = new THREE.BoxGeometry(2.1, 0.02, 1.2);
  const paperMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const paper = new THREE.Mesh(paperGeo, paperMat);
  paper.rotation.x = -0.7;
  paper.position.set(0, 1.15, -1.1);
  group.add(paper);

  // 3. Baki Kertas Keluar di Depan Bawah
  const outTrayGeo = new THREE.BoxGeometry(2.4, 0.08, 1.2);
  const outTray = new THREE.Mesh(outTrayGeo, trayMat);
  outTray.position.set(0, -0.6, 1.6);
  group.add(outTray);

  // Kertas Hasil Cetak Tercetak Garis Warna
  const printedPaperGeo = new THREE.BoxGeometry(2.1, 0.02, 1.0);
  const printedPaper = new THREE.Mesh(printedPaperGeo, paperMat);
  printedPaper.position.set(0, -0.54, 1.5);
  group.add(printedPaper);

  const printLineGeo = new THREE.BoxGeometry(1.6, 0.03, 0.08);
  const printLineMat = new THREE.MeshBasicMaterial({ color: 0x2563eb });
  const printLine = new THREE.Mesh(printLineGeo, printLineMat);
  printLine.position.set(0, -0.52, 1.5);
  group.add(printLine);

  // 4. Panel Tombol & Lampu Indikator Tinta di Kanan Atas
  const pwrBtnGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.06, 16);
  const pwrBtnMat = new THREE.MeshStandardMaterial({ color: 0x22c55e });
  const pwrBtn = new THREE.Mesh(pwrBtnGeo, pwrBtnMat);
  pwrBtn.position.set(1.4, 0.85, 0.8);
  group.add(pwrBtn);

  const ledGeo = new THREE.SphereGeometry(0.05, 12, 12);
  const ledMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
  const led = new THREE.Mesh(ledGeo, ledMat);
  led.position.set(1.4, 0.85, 0.5);
  group.add(led);

  group.scale.set(1.05, 1.05, 1.05);
  return group;
}

// -------------------------------------------------------------
// 5. COMMUNICATION DEVICES (Router, Modem, NIC)
// -------------------------------------------------------------

export function createRouterModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Bodi Aerodinamis Router
  const baseGeo = new THREE.BoxGeometry(3.6, 0.45, 2.4);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.3, metalness: 0.2 });
  const base = new THREE.Mesh(baseGeo, baseMat);
  group.add(base);

  // Bezel Atas Bergaris
  const topCoverGeo = new THREE.BoxGeometry(3.4, 0.12, 2.2);
  const topCoverMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.4 });
  const topCover = new THREE.Mesh(topCoverGeo, topCoverMat);
  topCover.position.y = 0.25;
  group.add(topCover);

  // 2. 4 Tiang Antena Omni-Directional
  const antGeo = new THREE.CylinderGeometry(0.06, 0.08, 2.2, 16);
  const antMat = new THREE.MeshStandardMaterial({ color: 0x030712, roughness: 0.3 });

  [-1.4, -0.5, 0.5, 1.4].forEach((antX, idx) => {
    const ant = new THREE.Mesh(antGeo, antMat);
    ant.rotation.z = (idx === 0 ? 0.12 : idx === 3 ? -0.12 : 0);
    ant.position.set(antX, 1.1, -1.1);
    group.add(ant);
  });

  // 3. Lampu LED Status Indikator Hijau Menyala di Depan
  const ledGeo = new THREE.BoxGeometry(0.08, 0.04, 0.04);
  const ledMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
  for (let i = 0; i < 5; i++) {
    const led = new THREE.Mesh(ledGeo, ledMat);
    led.position.set(-0.8 + i * 0.4, 0.15, 1.21);
    group.add(led);
  }

  // 4. 4 Port Kuning Kabel LAN (RJ-45) di Belakang
  const lanPortGeo = new THREE.BoxGeometry(0.35, 0.25, 0.15);
  const lanPortMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 });
  for (let p = 0; p < 4; p++) {
    const port = new THREE.Mesh(lanPortGeo, lanPortMat);
    port.position.set(-0.7 + p * 0.45, 0, -1.22);
    group.add(port);
  }

  // 1 Port Biru WAN Internet di Samping Port LAN
  const wanPortMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.4 });
  const wanPort = new THREE.Mesh(lanPortGeo, wanPortMat);
  wanPort.position.set(1.1, 0, -1.22);
  group.add(wanPort);

  group.scale.set(1.15, 1.15, 1.15);
  return group;
}

export function createModemModel(): THREE.Group {
  const group = new THREE.Group();

  // 1. Casing Vertikal Berdiri Modem ONT
  const bodyGeo = new THREE.BoxGeometry(1.2, 3.4, 2.6);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3, metalness: 0.1 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  group.add(body);

  // Dudukan Kaki Lebar Bawah
  const footGeo = new THREE.BoxGeometry(1.8, 0.16, 2.8);
  const footMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.4 });
  const foot = new THREE.Mesh(footGeo, footMat);
  foot.position.set(0, -1.7, 0);
  group.add(foot);

  // 2. Kisi-kisi Ventilasi Pendingin Samping
  const ventMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8 });
  for (let v = -1.0; v <= 1.0; v += 0.3) {
    const ventGeo = new THREE.BoxGeometry(1.22, 0.05, 1.6);
    const vent = new THREE.Mesh(ventGeo, ventMat);
    vent.position.set(0, v, -0.2);
    group.add(vent);
  }

  // 3. Kolom Lampu LED Status di Depan (Power, PON, LOS, Internet, LAN)
  const ledNames = [0x22c55e, 0x22c55e, 0xef4444, 0x22c55e, 0x22c55e]; // Hijau, Hijau, Merah (LOS mati), Hijau, Hijau
  ledNames.forEach((col, lIdx) => {
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

  // 1. Papan PCB Ramping Kartu Jaringan
  const pcbGeo = new THREE.BoxGeometry(2.8, 1.8, 0.08);
  const pcbMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.3 });
  const pcb = new THREE.Mesh(pcbGeo, pcbMat);
  group.add(pcb);

  // 2. Chip Controller Jaringan Gigabit Hitam
  const chipGeo = new THREE.BoxGeometry(0.65, 0.65, 0.08);
  const chipMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.2 });
  const chip = new THREE.Mesh(chipGeo, chipMat);
  chip.position.set(0.2, 0.1, 0.06);
  group.add(chip);

  // 3. Pelat Braket Logam Casing Belakang
  const bracketGeo = new THREE.BoxGeometry(0.08, 3.2, 0.7);
  const bracketMat = new THREE.MeshStandardMaterial({ color: 0xcfd4dc, metalness: 0.95, roughness: 0.2 });
  const bracket = new THREE.Mesh(bracketGeo, bracketMat);
  bracket.position.set(-1.4, 0.3, 0);
  group.add(bracket);

  // 4. Soket Port RJ-45 Logam Perak
  const rj45Geo = new THREE.BoxGeometry(0.85, 0.65, 0.65);
  const rj45Mat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
  const rj45 = new THREE.Mesh(rj45Geo, rj45Mat);
  rj45.position.set(-1.0, 0.1, 0);
  group.add(rj45);

  // Dua Lampu LED Link Status (Hijau & Oranye) di Atas Port
  const ledGreen = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.06), new THREE.MeshBasicMaterial({ color: 0x22c55e }));
  ledGreen.position.set(-1.42, 0.35, 0.18);
  group.add(ledGreen);

  const ledAmber = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.06), new THREE.MeshBasicMaterial({ color: 0xf59e0b }));
  ledAmber.position.set(-1.42, 0.35, -0.18);
  group.add(ledAmber);

  // 5. Pin Konektor Bus PCIe x1 Emas di Bawah
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
    // Input
    case 'keyboard':
      return createKeyboardModel();
    case 'mouse':
      return createMouseModel();
    case 'webcam':
      return createWebcamModel();

    // Process
    case 'cpu':
      return createCpuModel();
    case 'gpu':
      return createGpuModel();
    case 'motherboard':
      return createMotherboardModel();

    // Storage
    case 'ram':
      return createRamModel();
    case 'ssd':
      return createSsdModel();
    case 'hdd':
      return createHddModel();

    // Output
    case 'monitor':
      return createMonitorModel();
    case 'speaker':
      return createSpeakerModel();
    case 'printer':
      return createPrinterModel();

    // Communication
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
