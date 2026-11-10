const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const { execSync } = require('child_process');

async function main() {
  console.log('Menyiapkan pembaruan Panduan_Website_BelSisKom.PDF...');

  // 1. Path logo sekolah & pemda
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

  // 3. Bangun Dokumen HTML yang telah diperbaiki
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
      line-height: 1.42;
      font-size: 10.8px;
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
      padding-bottom: 6px;
      margin-bottom: 7px;
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
      width: 55px;
      height: 55px;
      object-fit: contain;
    }
    .kop-text {
      text-align: center;
      flex: 1;
      padding: 0 10px;
    }
    .kop-text h3 {
      font-size: 11.2px;
      font-weight: 700;
      color: #334155;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .kop-text h2 {
      font-size: 14.5px;
      font-weight: 900;
      color: #1e3a8a;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin: 1px 0;
    }
    .kop-text p {
      font-size: 9px;
      color: #64748b;
    }

    /* TITLE BANNER */
    .banner-title {
      background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
      color: #ffffff;
      padding: 8px 14px;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 8px;
      box-shadow: 0 2px 4px rgba(37, 99, 235, 0.15);
    }
    .banner-title h1 {
      font-size: 13.8px;
      font-weight: 900;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .banner-title .subtitle {
      font-size: 10.8px;
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
      padding: 6px 10px;
      margin-bottom: 8px;
    }
    .info-item {
      font-size: 10.2px;
    }
    .info-item .label {
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      font-size: 8.2px;
      display: block;
      margin-bottom: 1px;
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
      padding: 7px 12px;
      margin-bottom: 8px;
    }
    .teacher-note-header {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 900;
      font-size: 10.8px;
      color: #1d4ed8;
      margin-bottom: 2px;
    }
    .teacher-note p {
      font-size: 10px;
      color: #1e3a8a;
      line-height: 1.42;
    }

    /* ACCESS BOX (QR & URL) */
    .access-card {
      display: flex;
      align-items: center;
      gap: 15px;
      background: #ffffff;
      border: 1.8px dashed #2563eb;
      border-radius: 9px;
      padding: 9px 14px;
      margin-bottom: 8px;
      background-color: #f8fafc;
    }
    .access-qr {
      width: 94px;
      height: 94px;
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
      font-size: 9.2px;
      padding: 2.5px 8px;
      border-radius: 20px;
      text-transform: uppercase;
      margin-bottom: 3px;
    }
    .access-url {
      font-size: 15.5px;
      font-weight: 900;
      color: #2563eb;
      font-family: monospace;
      letter-spacing: 0.5px;
      margin-bottom: 3px;
    }
    .access-instructions {
      font-size: 9.8px;
      color: #334155;
      line-height: 1.4;
    }

    /* PREP BOX */
    .prep-box {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 8px;
      padding: 6px 12px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .prep-tag {
      font-weight: 900;
      font-size: 9.2px;
      color: #15803d;
      text-transform: uppercase;
      background: #dcfce7;
      padding: 3px 8px;
      border-radius: 5px;
      white-space: nowrap;
    }
    .prep-items {
      font-size: 9.5px;
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
      padding: 9px 13px;
      margin-bottom: 8px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    }
    .mission-header {
      display: flex;
      align-items: center;
      gap: 9px;
      margin-bottom: 5px;
    }
    .mission-badge {
      background: #1e3a8a;
      color: #ffffff;
      font-weight: 900;
      font-size: 9.8px;
      padding: 2.5px 8.5px;
      border-radius: 5px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .mission-title {
      font-size: 11.8px;
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
      font-size: 10px;
      color: #334155;
      margin-bottom: 3.5px;
      display: flex;
      align-items: flex-start;
      gap: 7px;
      line-height: 1.38;
    }
    .step-list li:last-child {
      margin-bottom: 0;
    }
    .step-num {
      background: #e2e8f0;
      color: #1e293b;
      font-weight: 900;
      font-size: 8.8px;
      min-width: 16px;
      height: 16px;
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
      font-size: 9.6px;
      color: #92400e;
      font-weight: 700;
    }

    /* TAHAP MATERI GRID (5 LANGKAH UTAMA BELSISKOM) */
    .tahap-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 5px;
      margin: 5px 0 7px 0;
    }
    .tahap-item {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 7px;
      padding: 6px 5px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .tahap-badge {
      font-size: 7.8px;
      font-weight: 900;
      color: #1e40af;
      background: #dbeafe;
      padding: 1.5px 5px;
      border-radius: 4px;
      display: inline-block;
      margin: 0 auto 3px auto;
      text-transform: uppercase;
    }
    .tahap-title {
      font-size: 9.2px;
      font-weight: 900;
      color: #0f172a;
      margin-bottom: 3px;
      line-height: 1.2;
    }
    .tahap-desc {
      font-size: 8px;
      color: #475569;
      line-height: 1.25;
    }

    /* RULES & FAQ */
    .box-container-2col {
      display: grid;
      grid-template-columns: 1.3fr 0.7fr;
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
      font-size: 10.8px;
      font-weight: 900;
      color: #b45309;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .rules-list {
      font-size: 9px;
      color: #78350f;
      padding-left: 14px;
      line-height: 1.42;
    }

    .faq-card {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 8px;
      padding: 8px 12px;
    }
    .faq-title {
      font-size: 10.8px;
      font-weight: 900;
      color: #15803d;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .faq-text {
      font-size: 9px;
      color: #166534;
      line-height: 1.38;
    }

    /* CERTIFICATE PREVIEW BOX */
    .cert-preview-box {
      background: #f8fafc;
      border: 1px dashed #3b82f6;
      border-radius: 6px;
      padding: 5px 8px;
      margin-top: 5px;
      font-size: 8.6px;
      color: #1e40af;
      line-height: 1.35;
    }

    /* FOOTER SIGNATURE */
    .signature-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-top: 1px solid #cbd5e1;
      padding-top: 7px;
      margin-top: 4px;
    }
    .sign-box {
      text-align: center;
      width: 190px;
      font-size: 10.2px;
    }
    .sign-role {
      color: #64748b;
      margin-bottom: 40px;
      line-height: 1.35;
    }
    .sign-name {
      font-weight: 900;
      color: #0f172a;
      text-decoration: underline;
    }
    .sign-desc {
      font-size: 8.8px;
      color: #64748b;
      margin-top: 1px;
    }

    .page-footer {
      text-align: center;
      font-size: 8.6px;
      color: #94a3b8;
      border-top: 1px solid #f1f5f9;
      padding-top: 3px;
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
          <span class="label">Koneksi Internet</span>
          <span class="val">Paket Data / Berbagi Hotspot</span>
        </div>
      </div>

      <!-- TEACHER NOTE -->
      <div class="teacher-note">
        <div class="teacher-note-header">
          📢 INSTRUKSI GURU (TUGAS MANDIRI SAAT GURU TIDAK HADIR)
        </div>
        <p>
          <strong>Assalamu’alaikum Wr. Wb. & Salam Semangat untuk Seluruh Siswa-Siswi Hebat Kelas 7!</strong><br>
          Pada pertemuan hari ini, Pak Guru Ahmad Nursyifa, S.Kom. berhalangan hadir tatap muka di ruang kelas karena sedang menjalankan tugas kedinasan sekolah. Agar jam pelajaran tetap produktif dan bermakna, kamu diberikan <strong>Misi Belajar Mandiri Terbimbing</strong> menggunakan Smartphone (HP) masing-masing melalui web <strong>BELSISKOM</strong>. Ikuti setiap langkah di panduan ini secara berurutan, tertib, dan junjung tinggi kejujuran!
        </p>
      </div>

      <!-- ACCESS BOX (QR & URL) -->
      <div class="access-card">
        <img src="${qrDataUrl}" class="access-qr" alt="QR Code BelSisKom">
        <div class="access-details">
          <span class="access-badge">Pintu Masuk Belajar (Scan Kamera / Ketik URL)</span>
          <div class="access-url">https://belsiskom.an.my.id</div>
          <div class="access-instructions">
            <strong>Petunjuk Masuk ke Website BELSISKOM:</strong><br>
            1. Buka aplikasi <strong>Kamera</strong> atau <strong>Pemindai QR</strong> di HP, arahkan ke QR Code di samping hingga muncul tautan, lalu sentuh tautan tersebut.<br>
            2. <em>Atau</em> buka peramban <strong>Google Chrome</strong> di HP, ketik di kolom alamat: <code>https://belsiskom.an.my.id</code> kemudian tekan Masuk.<br>
            3. <strong>Penting:</strong> Sekolah <u>tidak menyediakan akses Wi-Fi</u>. Murid menggunakan kuota data internet masing-masing. Jika kuotamu habis, silakan <strong>berbagi hotspot (tethering) secara tertib dengan teman sekelas</strong>.
          </div>
        </div>
      </div>

      <!-- PREP BOX -->
      <div class="prep-box">
        <span class="prep-tag">Persiapan Awal</span>
        <div class="prep-items">
          <span>📱 Baterai HP minimal 30%</span>
          <span>📶 Kuota data pribadi / Berbagi hotspot teman</span>
          <span>🚫 Sekolah tidak ada Wi-Fi</span>
          <span>✍️ Buku catatan & pulpen</span>
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
            <span>Di halaman beranda BELSISKOM, tombol <strong>"Mulai Belajar BELSISKOM"</strong> akan otomatis aktif menyala saat sesi dibuka guru. Sentuh tombol tersebut <em>(tidak perlu memasukkan kode sesi apa pun)</em>.</span>
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
            <span><strong>Nomor Absen:</strong> Masukkan nomor presensi absenmu (angka <strong>1 sampai 40</strong>). Setelah lengkap, klik tombol <strong>"Lanjut ke Asesmen Diagnostik"</strong>.</span>
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
            <span>Setelah soal ke-10 selesai dijawab, tekan tombol <strong>"Kirim Jawaban & Buka Materi Belajar"</strong> untuk memulai petualangan 5 tahap pembelajaran.</span>
          </li>
        </ul>
      </div>

      <!-- TARGET STRIP -->
      <div class="target-strip">
        <span>🎯 <strong>Target Capaian Hari Ini:</strong> Menuntaskan 5 Tahap Pembelajaran & Meraih Skor Post-Test Lebih Tinggi!</span>
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
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.8px solid #1e3a8a; padding-bottom:5px; margin-bottom:7px;">
        <span style="font-weight:900; font-size:10.8px; color:#1e3a8a; text-transform:uppercase;">SMP Negeri 2 Lemahabang • Informatika Kelas VII</span>
        <span style="font-weight:700; font-size:9.8px; color:#64748b;">Misi Belajar Mandiri Terbimbing (Lanjutan)</span>
      </div>

      <!-- MISI 3 -->
      <div class="mission-card">
        <div class="mission-header">
          <span class="mission-badge amber">Misi 3</span>
          <span class="mission-title">Menuntaskan 5 Tahap Pembelajaran Terpadu & Mini Lab Rakit PC</span>
        </div>
        <div style="font-size:9.5px; color:#475569; margin-bottom:5px;">
          Pelajari secara berurutan <strong>5 Tahapan Materi BelSisKom</strong> di bawah ini. Selesaikan bacaan konsep dan jawab <strong>Kuis Kilat</strong> di setiap akhir langkah untuk membuka tahap selanjutnya:
        </div>

        <!-- 5 TAHAPAN MATERI BELSISKOM -->
        <div class="tahap-grid">
          <div class="tahap-item">
            <span class="tahap-badge">Tahap 1</span>
            <div class="tahap-title">Mengenal Sistem Komputer</div>
            <div class="tahap-desc">Trinitas Tiga Serangkai: Hardware, Software, & Brainware (Analogi Tubuh Manusia).</div>
          </div>
          <div class="tahap-item">
            <span class="tahap-badge">Tahap 2</span>
            <div class="tahap-title">Menjelajahi Dunia Hardware</div>
            <div class="tahap-desc">5 Pilar (Input, Process, Storage, Output, Jaringan) + Foto Fisik Produk Asli Studio HD & 3D.</div>
          </div>
          <div class="tahap-item">
            <span class="tahap-badge">Tahap 3</span>
            <div class="tahap-title">Lab Mini: Rakit Komputer</div>
            <div class="tahap-desc">Simulasi pasang CPU, Fan, RAM DDR4, SSD NVMe, & VGA ke Motherboard sampai PC menyala!</div>
          </div>
          <div class="tahap-item">
            <span class="tahap-badge">Tahap 4</span>
            <div class="tahap-title">Menjelajahi Dunia Software</div>
            <div class="tahap-desc">Hierarki Sistem Operasi (OS Windows/Android), Software Aplikasi, & Program Utilitas.</div>
          </div>
          <div class="tahap-item">
            <span class="tahap-badge">Tahap 5</span>
            <div class="tahap-title">Brainware & Etika Digital</div>
            <div class="tahap-desc">Peran Manusia (User, Programmer, Admin) + Karakter Pelajar Pancasila & Etika Lab.</div>
          </div>
        </div>

        <ul class="step-list">
          <li>
            <span class="step-num">A</span>
            <span><strong>Foto Produk Studio Asli:</strong> Pada Tahap 2, amati detail wujud fisik asli prosesor LGA1700, soket motherboard ASUS TUF, stik SSD NVMe Samsung, RAM Kingston Fury, hingga kabel LAN.</span>
          </li>
          <li>
            <span class="step-num">B</span>
            <span><strong>Simulasi Interaktif Rakit PC:</strong> Pada Tahap 3, pasang komponen ke slot motherboard yang tepat dengan sentuhan jarimu di layar HP sampai komputer menyala normal!</span>
          </li>
          <li>
            <span class="step-num">C</span>
            <span><strong>Validasi Kuis Kilat Pembuka Gembok:</strong> Di setiap akhir materi tahap 1 sampai 5, jawab 1 pertanyaan cek pemahaman untuk membuka kunci tahap berikutnya.</span>
          </li>
        </ul>
      </div>

      <!-- MISI 4 & 5 GRID -->
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; margin-bottom:7px;">
        <!-- MISI 4 -->
        <div class="mission-card" style="margin-bottom:0;">
          <div class="mission-header">
            <span class="mission-badge purple">Misi 4</span>
            <span class="mission-title">Asesmen Post-Test</span>
          </div>
          <ul class="step-list">
            <li>
              <span class="step-num">1</span>
              <span>Setelah Tahap 1 sampai 5 tuntas dipelajari, tombol <strong>"Lanjut ke Post-Test"</strong> akan menyala biru terang.</span>
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
            <li><strong>Jaga Ketenangan Belajar:</strong> Membaca dan memahami materi secara tertib, dilarang bersuara gaduh yang mengganggu teman sekelas.</li>
            <li><strong>Budaya Gotong Royong (Berbagi Hotspot):</strong> Sekolah tidak menyediakan Wi-Fi. Siswa yang memiliki kuota data diharapkan berbagi tethering hotspot secara bijak kepada teman yang kuotanya habis.</li>
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
            Beritahu Ketua Kelas agar melapor kepada Guru Piket untuk memastikan sesi belajar kelasmu sudah diaktifkan.
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

        <div style="text-align:center; font-size:9.2px; color:#475569; max-width: 250px; line-height:1.35;">
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
    console.log('✅ SUKSES! Panduan_Website_BelSisKom.PDF berhasil diperbarui!');
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
