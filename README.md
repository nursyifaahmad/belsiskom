# BELSISKOM (Belajar Sistem Komputer)
### Media Pembelajaran Terpadu Informatika SMP Kelas 7 (7-A s/d 7-G)
**Guru Pengampu**: Ahmad Nursyifa, S.Pd. — **SMP Negeri 2 Lemahabang, Kab. Cirebon**

---

## 🌟 Tentang BELSISKOM

**BELSISKOM** adalah aplikasi web media pembelajaran Informatika interaktif yang dirancang khusus untuk siswa kelas 7 SMP yang baru mulai belajar komputer dari nol (mengingat kurikulum SD belum memuat mata pelajaran Informatika).

Aplikasi ini mengusung alur pembelajaran pedagogis Kurikulum Merdeka dengan materi inti **Sistem Komputer (Hardware, Software, dan Brainware)**, dilengkapi dengan simulasi interaktif perakitan PC, tes diagnostik kognitif awal, materi terpandu dengan validasi pop-up kuis kilat di setiap langkah, asesmen sumatif post-test komprehensif, serta portal guru lengkap dengan analisis N-Gain dan ekspor nilai ke PDF dan Excel.

---

## 🚀 Fitur Unggulan

### 1. Portal Murid
- **Gerbang Akses Sesi Guru**: Murid hanya dapat memulai belajar jika sesi telah dibuka secara resmi oleh guru pengampu (Ahmad Nursyifa).
- **Pendaftaran Biodata Mudah**: Pengisian Nama Lengkap, Nomor Absen, dan Pilihan Rombel Kelas (**7-A, 7-B, 7-C, 7-D, 7-E, 7-F, 7-G**).
- **Tes Diagnostik 10 Soal Acak (Satu per Satu)**: Soal pilihan ganda A-D disajikan satu per satu dengan pengacakan urutan agar tidak saling mencontek.
- **Materi Terpandu Bertahap (5 Langkah)**:
  1. *Konsep Sistem Komputer & Trinitas (Hardware, Software, Brainware)*
  2. *Bedah Perangkat Keras: Siklus I-P-O-S (Input, Process, Storage, Output)*
  3. *Laboratorium Mini: Simulasi Interaktif Perakitan PC (Hardware Builder)*
  4. *Menjelajahi Perangkat Lunak: Sistem Operasi, Aplikasi, dan Utilitas*
  5. *Pengguna (Brainware) & Karakter Pelajar Pancasila (Etika Lab Komputer)*
- **Simulasi Interaktif Perakitan PC**: Siswa memasang Processor (CPU), Kipas Pendingin (Heatsink Fan), RAM DDR4, SSD NVMe, Kartu Grafis (VGA), dan Power Supply (PSU) ke slot Motherboard yang tepat dengan validasi logis.
- **Validasi Pop-up Kuis Kilat**: Tombol langkah berikutnya hanya akan terbuka jika siswa telah berhasil memvalidasi kuis pemahaman di setiap langkah materi.
- **Post-Test (Asesmen Sumatif 20 Soal)**: Terdiri dari 10 soal yang sama persis dengan diagnostik (mengukur delta pemahaman) ditambah 10 soal baru pendalaman materi.
- **Sertifikat Digital & Perbandingan Nilai**: Menampilkan nilai Pre-Test vs Post-Test, persentase peningkatan skor, dan sertifikat kelulusan digital atas nama Ahmad Nursyifa, S.Pd.
- **Tahan Crash / HP Restart**: Berkat sistem penyimpanan ganda (`localStorage` + background auto-sync), pengerjaan ujian atau materi tidak akan hilang sekalipun HP murid tiba-tiba restart, kehabisan baterai, atau tertutup browser.

### 2. Portal Guru (Ahmad Nursyifa, S.Pd.)
- **Akses Aman Password Guru**: Terproteksi kata sandi khusus (default: `guru123`).
- **Manajemen Sesi Belajar Realtime**:
  - Buka/Tutup sesi belajar dengan satu klik.
  - Sasaran sesi per kelas spesifik (7-A s/d 7-G) atau Semua Kelas.
  - Tampilan **QR Code Proyektor** berukuran besar untuk dipindai murid di depan kelas.
- **Live Student Monitoring**: Tabel pemantauan aktivitas siswa realtime (status diagnostik, nomor langkah materi yang sedang dibaca, status rakit PC, dan status ujian).
- **Analisis Komparasi Nilai (N-Gain Hake)**: Menghitung secara otomatis rata-rata kelas, delta peningkatan poin, dan efektivitas pembelajaran (kategori Tinggi, Sedang, Rendah).
- **Analisis Butir Soal (Item Analysis)**: Mengetahui nomor soal mana yang paling banyak salah dijawab siswa sebagai bahan evaluasi/remedial tatap muka.
- **Ekspor Dokumen Resmi**:
  - **Cetak PDF**: Dilengkapi Kop Resmi SMP Negeri 2 Lemahabang, tabel rekapitulasi, dan titimangsa tanda tangan guru pengampu.
  - **Ekspor Excel (.xlsx)**: File spreadsheet siap olah untuk buku nilai guru.

---

## 🛠️ Arsitektur & Teknologi

| Komponen | Teknologi |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router, Standalone Output) |
| **Bahasa** | TypeScript & React 19 |
| **Styling** | Tailwind CSS v4, Lucide React Icons |
| **Efek Visual** | Canvas Confetti, CSS Micro-interactions |
| **Basis Data** | SQLite (WAL Mode) via Prisma ORM |
| **Cetak & Ekspor** | jsPDF, jsPDF-AutoTable, XLSX (SheetJS), QRCode |
| **Container** | Docker & Docker Compose (Multi-stage build) |
| **Jaringan & Domain** | Cloudflare Tunnel -> `belsiskom.an.my.id` |

---

## 💻 Panduan Menjalankan di Lokal (Windows)

1. **Jalankan Skrip Pengembang**:
   ```cmd
   dev.bat
   ```
   Atau via terminal:
   ```bash
   npm run dev -- -p 4020
   ```
2. Buka browser di:
   - Portal Murid: `http://localhost:4020/`
   - Portal Guru: `http://localhost:4020/guru/dashboard` (Password: `guru123`)

---

## 🔄 Sinkronisasi Otomatis ke GitHub

Untuk mengunggah setiap pembaruan kode ke repositori GitHub (`https://github.com/nursyifaahmad/belsiskom`):

Cukup klik dua kali file:
```cmd
sync.bat
```
Atau jalankan:
```bash
npm run sync
```
Skrip ini secara otomatis menambahkan berkas (`git add .`), membuat commit berstempel waktu, dan melakukan push ke cabang `main`.

---

## 🐳 Panduan Deployment Docker di Mini PC Server

Aplikasi ini dikonfigurasi khusus untuk berjalan di atas Mini PC server pribadi Anda pada folder `/mnt/storage2/belsiskom/` dan port host **4020**.

### 1. Kloning Repositori di Mini PC
Masuk ke terminal Mini PC Anda (melalui SSH atau langsung):
```bash
cd /mnt/storage2
git clone https://github.com/nursyifaahmad/belsiskom.git belsiskom
cd /mnt/storage2/belsiskom
```

### 2. Buat Folder Data Persisten
```bash
mkdir -p /mnt/storage2/belsiskom/data
chmod -R 777 /mnt/storage2/belsiskom/data
```

### 3. Jalankan Container dengan Docker Compose
```bash
docker compose up -d --build
```

Container `belsiskom-app` akan aktif dan berjalan di port **4020**.

### 4. Skrip Pembaruan Otomatis (1-Click Update di Mini PC)
Setiap kali Anda selesai melakukan push kode dari laptop, cukup jalankan skrip berikut di terminal Mini PC:
```bash
chmod +x update.sh
./update.sh
```

---

## 🌐 Konfigurasi Cloudflare Tunnel (`belsiskom.an.my.id`)

Agar website dapat diakses dari internet oleh smartphone murid di sekolah tanpa memerlukan IP publik statis:

1. **Buka Dashboard Cloudflare Zero Trust**:
   - Masuk ke **Networks** -> **Tunnels**.
   - Pilih Tunnel yang sudah aktif pada Mini PC Anda (atau buat tunnel baru).
2. **Tambahkan Public Hostname**:
   - **Subdomain**: `belsiskom`
   - **Domain**: `an.my.id`
   - **Type**: `HTTP`
   - **URL**: `localhost:4020` (atau IP lokal Mini PC port 4020)
3. **Simpan (Save Hostname)**.
4. Website kini dapat diakses langsung oleh murid dan guru di seluruh dunia melalui URL:
   👉 **`https://belsiskom.an.my.id`**

---

*Hak Cipta © 2026 Ahmad Nursyifa, S.Pd. — SMP Negeri 2 Lemahabang. Seluruh hak cipta dilindungi.*
