const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const { execSync } = require('child_process');

async function main() {
  console.log('Menyiapkan pembuatan Panduan_Website_BelSisKom.PDF...');

  // 1. Path logo
  const logoSmpPath = 'D:/Antigravity Project/Web SMPN 2 Lemahabang/public/assets/img/logo.png';
  const logoPemdaPath = 'D:/Antigravity Project/Web SMPN 2 Lemahabang/public/assets/img/logo-pemda.png';

  let logoSmpBase64 = '';
  let logoPemdaBase64 = '';

  if (fs.existsSync(logoSmpPath)) {
    logoSmpBase64 = `data:image/png;base64,${fs.readFileSync(logoSmpPath).toString('base64')}`;
  }
  if (fs.existsSync(logoPemdaPath)) {
    logoPemdaBase64 = `data:image/png;base64,${fs.readFileSync(logoPemdaPath).toString('base64')}`;
  }

  // 2. Buat QR Code High-Res
  const qrDataUrl = await QRCode.toDataURL('https://belsiskom.an.my.id', {
    errorCorrectionLevel: 'H',
    margin: 1,
    width: 360,
    color: {
      dark: '#1e3a8a', // Deep Navy Blue
      light: '#ffffff'
    }
  });

  // 3. Bangun Dokumen HTML
  const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Panduan BelSisKom - SMP Negeri 2 Lemahabang</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 8mm 11mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background-color: #ffffff;
      line-height: 1.45;
      font-size: 11px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .page {
      width: 100%;
      height: 278mm;
      max-height: 278mm;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .page:last-child {
      page-break-after: avoid;
    }

    /* KOP SURAT */
    .kop-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2.5px solid #1e3a8a;
      padding-bottom: 7px;
      margin-bottom: 8px;
      position: relative;
    }
    .kop-container::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      border-bottom: 0.8px solid #1e3a8a;
    }
    .kop-logo {
      width: 56px;
      height: 56px;
      object-fit: contain;
    }
    .kop-text {
      text-align: center;
      flex: 1;
      padding: 0 10px;
    }
    .kop-text h3 {
      font-size: 11.5px;
      font-weight: 700;
      color: #334155;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .kop-text h2 {
      font-size: 15px;
      font-weight: 900;
      color: #1e3a8a;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin: 1px 0;
    }
    .kop-text p {
      font-size: 9.2px;
      color: #64748b;
    }

    /* TITLE BANNER */
    .banner-title {
      background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
      color: #ffffff;
      padding: 9px 14px;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 9px;
      box-shadow: 0 2px 4px rgba(37, 99, 235, 0.15);
    }
    .banner-title h1 {
      font-size: 14px;
      font-weight: 900;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .banner-title .subtitle {
      font-size: 11px;
      font-weight: 500;
      opacity: 0.95;
      margin-top: 2px;
    }

    /* INFO STRIP */
    .info-strip {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 7px;
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 7px 11px;
      margin-bottom: 9px;
    }
    .info-item {
      font-size: 10.5px;
    }
    .info-item .label {
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      font-size: 8.5px;
      display: block;
      margin-bottom: 2px;
    }
    .info-item .val {
      font-weight: 800;
      color: #1e293b;
    }

    /* TEACHER NOTE */
    .teacher-note {
      background: #eff6ff;
      border-left: 4px solid #2563eb;
      border-radius: 0 8px 8px 0;
      padding: 8px 13px;
      margin-bottom: 9px;
    }
    .teacher-note-header {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 900;
      font-size: 11px;
      color: #1d4ed8;
      margin-bottom: 3px;
    }
    .teacher-note p {
      font-size: 10.2px;
      color: #1e3a8a;
      line-height: 1.45;
    }

    /* ACCESS BOX (QR & URL) */
    .access-card {
      display: flex;
      align-items: center;
      gap: 15px;
      background: #ffffff;
      border: 1.8px dashed #2563eb;
      border-radius: 9px;
      padding: 10px 15px;
      margin-bottom: 9px;
      background-color: #f8fafc;
    }
    .access-qr {
      width: 96px;
      height: 96px;
      border-radius: 8px;
      border: 1.5px solid #cbd5e1;
      padding: 3px;
      background: #ffffff;
      flex-shrink: 0;
    }
    .access-details {
      flex: 1;
    }
    .access-badge {
      display: inline-block;
      background: #dbeafe;
      color: #1e40af;
      font-weight: 900;
      font-size: 9.5px;
      padding: 3px 9px;
      border-radius: 20px;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .access-url {
      font-size: 16px;
      font-weight: 900;
      color: #2563eb;
      font-family: monospace;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .access-instructions {
      font-size: 10.2px;
      color: #334155;
      line-height: 1.45;
    }

    /* PREP BOX */
    .prep-box {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 8px;
      padding: 7px 13px;
      margin-bottom: 9px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .prep-tag {
      font-weight: 900;
      font-size: 9.5px;
      color: #15803d;
      text-transform: uppercase;
      background: #dcfce7;
      padding: 3.5px 8px;
      border-radius: 5px;
      white-space: nowrap;
    }
    .prep-items {
      font-size: 9.8px;
      color: #166534;
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      font-weight: 600;
    }

    /* MISSION CARDS */
    .mission-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 14px;
      margin-bottom: 9px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    }
    .mission-header {
      display: flex;
      align-items: center;
      gap: 9px;
      margin-bottom: 6px;
    }
    .mission-badge {
      background: #1e3a8a;
      color: #ffffff;
      font-weight: 900;
      font-size: 10px;
      padding: 3px 9px;
      border-radius: 5px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .mission-title {
      font-size: 12px;
      font-weight: 900;
      color: #0f172a;
    }
    .mission-badge.green { background: #059669; }
    .mission-badge.amber { background: #d97706; }
    .mission-badge.purple { background: #7c3aed; }
    .mission-badge.teal { background: #0d9488; }

    .step-list {
      list-style: none;
      padding-left: 0;
    }
    .step-list li {
      font-size: 10.3px;
      color: #334155;
      margin-bottom: 4px;
      display: flex;
      align-items: flex-start;
      gap: 8px;
      line-height: 1.4;
    }
    .step-list li:last-child {
      margin-bottom: 0;
    }
    .step-num {
      background: #e2e8f0;
      color: #1e293b;
      font-weight: 900;
      font-size: 9px;
      min-width: 17px;
      height: 17px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-top: 1px;
      flex-shrink: 0;
    }

    /* TARGET STRIP */
    .target-strip {
      background: #fffbeb;
      border: 1px solid #fef3c7;
      border-radius: 7px;
      padding: 6px 12px;
      margin-top: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 9.8px;
      color: #92400e;
      font-weight: 700;
    }

    /* PILAR GRID */
    .pilar-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 6px;
      margin: 6px 0 8px 0;
    }
    .pilar-item {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 7px;
      padding: 7px 5px;
      text-align: center;
    }
    .pilar-icon {
      font-size: 16px;
      margin-bottom: 2px;
    }
    .pilar-title {
      font-size: 9.5px;
      font-weight: 900;
      color: #1e3a8a;
      margin-bottom: 2px;
      text-transform: uppercase;
    }
    .pilar-desc {
      font-size: 8.3px;
      color: #475569;
      line-height: 1.25;
    }

    /* RULES & FAQ */
    .box-container-2col {
      display: grid;
      grid-template-columns: 1.25fr 0.75fr;
      gap: 9px;
      margin-bottom: 8px;
    }
    .rules-card {
      background: #fffbeb;
      border: 1px solid #fde68a;
      border-radius: 8px;
      padding: 8px 12px;
    }
    .rules-title {
      font-size: 11px;
      font-weight: 900;
      color: #b45309;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .rules-list {
      font-size: 9.2px;
      color: #78350f;
      padding-left: 14px;
      line-height: 1.45;
    }

    .faq-card {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 8px;
      padding: 8px 12px;
    }
    .faq-title {
      font-size: 11px;
      font-weight: 900;
      color: #15803d;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .faq-text {
      font-size: 9.2px;
      color: #166534;
      line-height: 1.4;
    }

    /* CERTIFICATE PREVIEW BOX */
    .cert-preview-box {
      background: #f8fafc;
      border: 1px dashed #3b82f6;
      border-radius: 6px;
      padding: 5px 8px;
      margin-top: 5px;
      font-size: 8.8px;
      color: #1e40af;
      line-height: 1.35;
    }

    /* FOOTER SIGNATURE */
    .signature-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-top: 1px solid #cbd5e1;
      padding-top: 8px;
      margin-top: 5px;
    }
    .sign-box {
      text-align: center;
      width: 190px;
      font-size: 10.5px;
    }
    .sign-role {
      color: #64748b;
      margin-bottom: 42px;
      line-height: 1.35;
    }
    .sign-name {
      font-weight: 900;
      color: #0f172a;
      text-decoration: underline;
    }
    .sign-desc {
      font-size: 9px;
      color: #64748b;
      margin-top: 1px;
    }

    .page-footer {
      text-align: center;
      font-size: 8.8px;
      color: #94a3b8;
      border-top: 1px solid #f1f5f9;
      padding-top: 4px;
      margin-top: 4px;
    }
  </style>
</head>
<body>

  <!-- ==================== HALAMAN 1 ==================== -->
  <div class="page">
    <div>
      <!-- KOP RESMI -->
      <div class="kop-container">
        <img src="${logoPemdaBase64}" class="kop-logo" alt="Logo Pemda Cirebon">
        <div class="kop-text">
          <h3>Pemerintah Daerah Kabupaten Cirebon • Dinas Pendidikan</h3>
          <h2>SMP NEGERI 2 LEMAHABANG</h2>
          <p>Jl. KH. Hasyim Asy'ari Sindanglaut, Lemahabang, Cirebon, Jawa Barat 45183 • NPSN: 20214811 • Akreditasi A</p>
        </div>
        <img src="${logoSmpBase64}" class="kop-logo" alt="Logo SMPN 2 Lemahabang">
      </div>

      <!-- TITLE BANNER -->
      <div class="banner-title">
        <h1>Panduan Pembelajaran & Tugas Mandiri Berbasis Web</h1>
        <div class="subtitle">Media Pembelajaran Digital Informatika: Sistem Komputer (BELSISKOM)</div>
      </div>

      <!-- INFO STRIP -->
      <div class="info-strip">
        <div class="info-item">
          <span class="label">Mata Pelajaran</span>
          <span class="val">Informatika (Sistem Komputer)</span>
        </div>
        <div class="info-item">
          <span class="label">Sasaran Murid</span>
          <span class="val">Kelas VII (7-A s.d 7-G)</span>
        </div>
        <div class="info-item">
          <span class="label">Guru Pengampu</span>
          <span class="val">Ahmad Nursyifa, S.Kom.</span>
        </div>
        <div class="info-item">
          <span class="label">Perangkat & Media</span>
          <span class="val">Smartphone (HP) di Kelas</span>
        </div>
      </div>

      <!-- TEACHER NOTE -->
      <div class="teacher-note">
        <div class="teacher-note-header">
          📢 INSTRUKSI GURU (TUGAS MANDIRI SAAT GURU TIDAK HADIR)
        </div>
        <p>
          <strong>Assalamu’alaikum Wr. Wb. & Salam Semangat untuk Seluruh Siswa-Siswi Hebat Kelas 7!</strong><br>
          Pada pertemuan hari ini, Pak Guru Ahmad Nursyifa, S.Kom. berhalangan hadir tatap muka di ruang kelas karena sedang menjalankan tugas kedinasan sekolah. Agar jam pelajaran tetap bermakna, aktif, dan menyenangkan, kamu diberikan <strong>Misi Belajar Mandiri Terbimbing</strong> menggunakan Smartphone (HP) masing-masing melalui web <strong>BELSISKOM</strong>. Ikuti setiap langkah di panduan ini secara berurutan, tertib, dan junjung tinggi kejujuran!
        </p>
      </div>

      <!-- ACCESS BOX (QR & URL) -->
      <div class="access-card">
        <img src="${qrDataUrl}" class="access-qr" alt="QR Code BelSisKom">
        <div class="access-details">
          <span class="access-badge">Pintu Masuk Belajar (Scan Kamera / Ketik URL)</span>
          <div class="access-url">https://belsiskom.an.my.id</div>
          <div class="access-instructions">
            <strong>Cara Cepat Membuka Website BELSISKOM:</strong><br>
            1. Buka aplikasi <strong>Kamera</strong> atau <strong>Pemindai QR (Scanner)</strong> di HP, arahkan ke QR Code di samping hingga muncul tautan, lalu sentuh tautan tersebut.<br>
            2. <em>Atau</em> buka peramban <strong>Google Chrome</strong> di HP, ketik di kolom alamat: <code>https://belsiskom.an.my.id</code> kemudian tekan Masuk/Enter.<br>
            3. Pastikan HP terhubung dengan kuota data internet aktif atau Wi-Fi sekolah yang tersedia.
          </div>
        </div>
      </div>

      <!-- PREP BOX -->
      <div class="prep-box">
        <span class="prep-tag">Persiapan Awal</span>
        <div class="prep-items">
          <span>📱 Baterai HP minimal 30%</span>
          <span>🌐 Paket data / Wi-Fi stabil</span>
          <span>🎧 Headset/Earphone (opsional)</span>
          <span>✍️ Buku catatan Informatika & pulpen</span>
        </div>
      </div>

      <!-- MISI 1 -->
      <div class="mission-card">
        <div class="mission-header">
          <span class="mission-badge">Misi 1</span>
          <span class="mission-title">Pendaftaran Biodata & Presensi Kehadiran Siswa</span>
        </div>
        <ul class="step-list">
          <li>
            <span class="step-num">1</span>
            <span>Di halaman beranda BELSISKOM, tekan tombol besar berwarna biru <strong>"Mulai Belajar Sekarang"</strong>.</span>
          </li>
          <li>
            <span class="step-num">2</span>
            <span><strong>Pilih Kelas:</strong> Pilih rombel kelasmu dengan tepat (misal: <strong>7-A, 7-B, 7-C, 7-D, 7-E, 7-F, atau 7-G</strong>).</span>
          </li>
          <li>
            <span class="step-num">3</span>
            <span><strong>Nama Lengkap:</strong> Ketik nama lengkapmu sesuai daftar hadir resmi sekolah. <em>(Gunakan huruf kapital rapi, dilarang memakai nama samaran/singkatan lucu!)</em></span>
          </li>
          <li>
            <span class="step-num">4</span>
            <span><strong>Nomor Absen:</strong> Masukkan nomor presensimu (angka 1 sampai 36). Setelah lengkap, klik tombol <strong>"Lanjut ke Asesmen Diagnostik"</strong>.</span>
          </li>
        </ul>
      </div>

      <!-- MISI 2 -->
      <div class="mission-card">
        <div class="mission-header">
          <span class="mission-badge green">Misi 2</span>
          <span class="mission-title">Mengerjakan Asesmen Diagnostik Kognitif Awal (10 Soal)</span>
        </div>
        <ul class="step-list">
          <li>
            <span class="step-num">1</span>
            <span>Sistem akan menampilkan <strong>10 butir soal asesmen awal</strong> secara bergantian (satu per satu) di layar HP.</span>
          </li>
          <li>
            <span class="step-num">2</span>
            <span><strong>Prinsip Kejujuran:</strong> Jawablah sesuai pemahaman awalmu saat ini. Asesmen ini bertujuan mendeteksi kesiapan belajarmu, <strong>tidak perlu takut salah</strong> dan jangan berdiskusi/mencontek jawaban teman!</span>
          </li>
          <li>
            <span class="step-num">3</span>
            <span>Setelah pertanyaan ke-10 selesai, tekan tombol <strong>"Kirim Jawaban & Buka Materi Belajar"</strong> untuk memulai petualangan 5 pilar hardware.</span>
          </li>
        </ul>
      </div>

      <!-- TARGET STRIP -->
      <div class="target-strip">
        <span>🎯 <strong>Target Capaian Hari Ini:</strong> Menguasai 5 Pilar Hardware & Meraih Skor Post-Test Lebih Tinggi dari Diagnostik!</span>
        <span>⏱️ Waktu Pengerjaan: ± 60 - 80 Menit</span>
      </div>
    </div>

    <!-- HALAMAN 1 FOOTER -->
    <div>
      <div class="page-footer">
        Halaman 1 dari 2 — Panduan Siswa Tugas Mandiri BelSisKom Kelas 7 • SMP Negeri 2 Lemahabang (Tahun Ajaran 2026/2027)
      </div>
    </div>
  </div>


  <!-- ==================== HALAMAN 2 ==================== -->
  <div class="page">
    <div>
      <!-- HEADER RINGKAS HALAMAN 2 -->
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.8px solid #1e3a8a; padding-bottom:5px; margin-bottom:8px;">
        <span style="font-weight:900; font-size:11px; color:#1e3a8a; text-transform:uppercase;">SMP Negeri 2 Lemahabang • Informatika Kelas VII</span>
        <span style="font-weight:700; font-size:10px; color:#64748b;">Misi Belajar Mandiri Terbimbing (Lanjutan)</span>
      </div>

      <!-- MISI 3 -->
      <div class="mission-card">
        <div class="mission-header">
          <span class="mission-badge amber">Misi 3</span>
          <span class="mission-title">Petualangan 5 Pilar Sistem Komputer & Laboratorium Mini Rakit PC</span>
        </div>
        <div style="font-size:9.8px; color:#475569; margin-bottom:6px;">
          Jelajahi dan pelajari secara berurutan 5 pilar perangkat keras komputer. Amati wujud fisik asli komponen, dengarkan suara penjelasannya, dan selesaikan tantangan interaktifnya:
        </div>

        <div class="pilar-grid">
          <div class="pilar-item">
            <div class="pilar-icon">⌨️</div>
            <div class="pilar-title">1. INPUT</div>
            <div class="pilar-desc">Keyboard, Mouse Optik, Webcam HD (Memasukkan perintah)</div>
          </div>
          <div class="pilar-item">
            <div class="pilar-icon">⚙️</div>
            <div class="pilar-title">2. PEMROSES</div>
            <div class="pilar-desc">Processor CPU, Motherboard, VGA Card (Otak pengolah)</div>
          </div>
          <div class="pilar-item">
            <div class="pilar-icon">💾</div>
            <div class="pilar-title">3. STORAGE</div>
            <div class="pilar-desc">SSD NVMe Kencang, RAM DDR4, Harddisk HDD (Penyimpan data)</div>
          </div>
          <div class="pilar-item">
            <div class="pilar-icon">🖥️</div>
            <div class="pilar-title">4. OUTPUT</div>
            <div class="pilar-desc">Monitor Layar, Speaker Audio, Printer (Penampil hasil)</div>
          </div>
          <div class="pilar-item">
            <div class="pilar-icon">🌐</div>
            <div class="pilar-title">5. JARINGAN</div>
            <div class="pilar-desc">Router Wi-Fi 6, Modem Fiber, LAN Card (Koneksi data)</div>
          </div>
        </div>

        <ul class="step-list">
          <li>
            <span class="step-num">A</span>
            <span><strong>Audio Penjelasan Suara Guru:</strong> Tekan tombol audio <em>"Dengarkan Penjelasan"</em> untuk mendengarkan ulasan materi jika kamu lebih suka belajar lewat suara.</span>
          </li>
          <li>
            <span class="step-num">B</span>
            <span><strong>Foto Produk Studio Nyata:</strong> Amati foto fisik asli setiap komponen (lihat soket CPU LGA1700, pin emas SSD M.2, heatsink motherboard, dan lampu RGB mouse).</span>
          </li>
          <li>
            <span class="step-num">C</span>
            <span><strong>Simulasi Mini Lab Rakit PC:</strong> Pasang komponen Processor, RAM, Fan, dan GPU ke slot motherboard yang sesuai hingga PC menyala!</span>
          </li>
          <li>
            <span class="step-num">D</span>
            <span><strong>Validasi Kuis Kilat:</strong> Di setiap akhir materi pilar, jawab 1 pertanyaan kilat untuk membuka kunci materi pilar berikutnya.</span>
          </li>
        </ul>
      </div>

      <!-- MISI 4 & 5 GRID -->
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; margin-bottom:8px;">
        <!-- MISI 4 -->
        <div class="mission-card" style="margin-bottom:0;">
          <div class="mission-header">
            <span class="mission-badge purple">Misi 4</span>
            <span class="mission-title">Asesmen Post-Test</span>
          </div>
          <ul class="step-list">
            <li>
              <span class="step-num">1</span>
              <span>Setelah seluruh 5 pilar tuntas dipelajari, tombol <strong>"Lanjut ke Post-Test"</strong> akan menyala biru terang.</span>
            </li>
            <li>
              <span class="step-num">2</span>
              <span>Jawab <strong>20 butir soal evaluasi akhir</strong> dengan cermat dan teliti. Soal dilengkapi foto fisik komponen nyata.</span>
            </li>
            <li>
              <span class="step-num">3</span>
              <span>Buktikan bahwa skor akhirmu meningkat tajam dibandingkan nilai asesmen awal!</span>
            </li>
          </ul>
        </div>

        <!-- MISI 5 -->
        <div class="mission-card" style="margin-bottom:0;">
          <div class="mission-header">
            <span class="mission-badge teal">Misi 5</span>
            <span class="mission-title">Sertifikat & Pelaporan</span>
          </div>
          <ul class="step-list">
            <li>
              <span class="step-num">1</span>
              <span><strong>Nilai Otomatis Tersimpan:</strong> Nilaimu langsung terekam realtime di portal nilai Pak Guru Ahmad Nursyifa.</span>
            </li>
            <li>
              <span class="step-num">2</span>
              <span><strong>Wajib Screenshot:</strong> Tangkap layar (screenshot) tampilan <strong>Kartu Sertifikat Kelulusan BelSisKom</strong> di HP-mu.</span>
            </li>
            <li>
              <span class="step-num">3</span>
              <span>Kirimkan bukti screenshot tersebut ke <strong>Grup WhatsApp Kelas</strong> atau tunjukkan ke <strong>Ketua Kelas</strong> sebagai bukti tugas tuntas.</span>
            </li>
          </ul>
          <div class="cert-preview-box">
            📸 <strong>Bukti Screenshot:</strong> Pastikan memuat Nama Siswa, Rombel Kelas, Skor Nilai, dan Status: <strong>TUNTAS</strong>.
          </div>
        </div>
      </div>

      <!-- RULES & FAQ -->
      <div class="box-container-2col">
        <div class="rules-card">
          <div class="rules-title">
            ⭐ 5 ATURAN EMAS BELAJAR MANDIRI DI KELAS
          </div>
          <ol class="rules-list">
            <li><strong>Tetap Tertib di Kelas:</strong> Dilarang keluar kelas atau berkeliaran di lingkungan sekolah tanpa izin guru piket.</li>
            <li><strong>Fokus Penuh pada BELSISKOM:</strong> HP HANYA dipakai untuk belajar. Dilarang keras bermain game online, TikTok, YouTube hiburan, atau sosmed!</li>
            <li><strong>Jaga Ketenangan Belajar:</strong> Gunakan headset saat mendengar audio, atau atur volume pelan agar tidak mengganggu teman sebelah.</li>
            <li><strong>Budaya Gotong Royong:</strong> Jika ada teman yang kehabisan kuota atau baterai lemah, bantu berbagi tethering / charger secara tertib.</li>
            <li><strong>Tepat Waktu:</strong> Selesaikan 5 Misi sebelum bel tanda pergantian jam pelajaran Informatika berbunyi.</li>
          </ol>
        </div>

        <div class="faq-card">
          <div class="faq-title">
            💡 BANTUAN CEPAT (FAQ)
          </div>
          <div class="faq-text">
            <strong>HP Mati / Browser Tidak Sengaja Tertutup?</strong><br>
            Tenang! BELSISKOM memiliki sistem <em>Auto-Save</em> ganda. Buka kembali Chrome dan masuk ke web, maka progres dan jawabanmu akan otomatis pulih!<br><br>
            <strong>Muncul Tulisan "Sesi Belajar Ditutup"?</strong><br>
            Beritahu Ketua Kelas agar melapor kepada Guru Piket untuk memastikan sesi belajar kelasmu sudah aktif.
          </div>
        </div>
      </div>

      <!-- SIGNATURE SECTION -->
      <div class="signature-section">
        <div class="sign-box">
          <div class="sign-role">Mengetahui & Memvalidasi,<br><strong>Ketua Kelas VII</strong></div>
          <div class="sign-name">( .................................................... )</div>
          <div class="sign-desc">Nama Lengkap & Rombel Kelas</div>
        </div>

        <div style="text-align:center; font-size:9.5px; color:#475569; max-width: 250px; line-height:1.4;">
          <em>"Membentuk Generasi Pelajar Pancasila yang Gotong Royong, Inovatif, Aktif, dan Taqwa (GIAT) Menuju Generasi Indonesia Emas."</em>
        </div>

        <div class="sign-box">
          <div class="sign-role">Lemahabang, Tahun Ajaran 2026/2027<br>Guru Mata Pelajaran Informatika,</div>
          <div class="sign-name">Ahmad Nursyifa, S.Kom.</div>
          <div class="sign-desc">SMP Negeri 2 Lemahabang</div>
        </div>
      </div>
    </div>

    <!-- HALAMAN 2 FOOTER -->
    <div>
      <div class="page-footer">
        Halaman 2 dari 2 — Panduan Siswa Tugas Mandiri BelSisKom Kelas 7 • SMP Negeri 2 Lemahabang (Tahun Ajaran 2026/2027)
      </div>
    </div>
  </div>

</body>
</html>`;

  // Simpan juga salinan HTML di direktori artifact untuk dokumentasi dan inspeksi
  const artifactDir = 'C:/Users/ahmad/.gemini/antigravity/brain/b34b0a0b-55a8-4db5-88fe-9c909f2e72f5';
  const previewHtmlPath = path.join(artifactDir, 'Panduan_Website_BelSisKom_preview.html');
  fs.writeFileSync(previewHtmlPath, htmlContent, 'utf8');

  // 4. Tulis file sementara HTML
  const tempHtmlPath = path.join(__dirname, 'temp_panduan.html');
  fs.writeFileSync(tempHtmlPath, htmlContent, 'utf8');
  console.log('Berkas HTML sementara berhasil dibuat di:', tempHtmlPath);

  // 5. Output PDF
  const targetPdfDir = 'D:/SMPN 2 LEMAHABANG/2026-2027';
  if (!fs.existsSync(targetPdfDir)) {
    fs.mkdirSync(targetPdfDir, { recursive: true });
  }
  const targetPdfPath = path.join(targetPdfDir, 'Panduan_Website_BelSisKom.PDF');

  // Gunakan Microsoft Edge headless untuk render PDF
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browserPath = fs.existsSync(edgePath) ? edgePath : chromePath;

  console.log('Mengonversi HTML ke PDF menggunakan:', browserPath);
  const cmd = `"${browserPath}" --headless --disable-gpu --no-sandbox --print-to-pdf="${targetPdfPath}" --no-pdf-header-footer "${tempHtmlPath}"`;

  execSync(cmd, { stdio: 'inherit' });

  // Bersihkan file sementara
  if (fs.existsSync(tempHtmlPath)) {
    fs.unlinkSync(tempHtmlPath);
  }

  if (fs.existsSync(targetPdfPath)) {
    const stats = fs.statSync(targetPdfPath);
    console.log('==========================================================');
    console.log('✅ SUKSES! Panduan_Website_BelSisKom.PDF berhasil dibuat!');
    console.log('📁 Lokasi:', targetPdfPath);
    console.log('📊 Ukuran:', stats.size, 'bytes');
    console.log('==========================================================');
  } else {
    throw new Error('Gagal menghasilkan file PDF!');
  }
}

main().catch(err => {
  console.error('Terjadi kesalahan:', err);
  process.exit(1);
});
