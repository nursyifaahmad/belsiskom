import { 
  Keyboard, 
  Mouse, 
  Camera, 
  Cpu, 
  Tv, 
  HardDrive, 
  Wifi, 
  Layers, 
  Volume2, 
  Printer, 
  Globe, 
  Network,
  Disc,
  Zap,
  Activity
} from 'lucide-react';

export type HardwareCategory = 'input' | 'process' | 'storage' | 'output' | 'communication';

export interface HardwareSubItem {
  id: string;
  name: string;
  shortName: string;
  realProductName: string;
  realSpecs: string[];
  photoUrl: string;
  icon: any;
  badge: string;
  shortDesc: string;
  roleAnalogy: string;
  keyExamples: string[];
  physicalParts: { name: string; desc: string }[];
}

export interface HardwareCategoryMeta {
  id: HardwareCategory;
  title: string;
  categoryName: string;
  color: string;
  tagColor: string;
  items: HardwareSubItem[];
}

export const HARDWARE_CATEGORIES: Record<HardwareCategory, HardwareCategoryMeta> = {
  input: {
    id: 'input',
    title: 'Perangkat Masukan (Input)',
    categoryName: '1. Perangkat Masukan (Input Device)',
    color: 'from-blue-500 to-indigo-600',
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    items: [
      {
        id: 'keyboard',
        name: 'Papan Ketik (Keyboard USB)',
        shortName: 'Keyboard',
        realProductName: 'Logitech K120 Ergonomic USB Keyboard',
        realSpecs: [
          'Tata Letak: Standar QWERTY 104 Tombol Lengkap',
          'Konektivitas: Kabel USB 2.0 Plug-and-Play',
          'Ketahanan: 10 Juta Kali Ketukan dengan Desain Tahan Tumpahan Air',
          'Indikator: Lampu LED Hijau untuk CapsLock dan NumLock',
        ],
        photoUrl: '/images/hardware/keyboard.jpg',
        icon: Keyboard,
        badge: 'Input Teks & Perintah',
        shortDesc: 'Mengubah ketukan fisik jari menjadi deretan kode biner (0 dan 1) untuk mengetik dokumen, coding, dan mengontrol game.',
        roleAnalogy: '✍️ Ibarat Jari Tangan yang menulis huruf demi huruf pada selembar kertas putih.',
        keyExamples: ['Keyboard Mekanikal Gaming', 'Keyboard Membran Laptop', 'Keyboard Nirkabel Bluetooth'],
        physicalParts: [
          { name: 'Tombol Timbul (Keycaps QWERTY)', desc: 'Setiap tombol memiliki pegas membran yang mengirimkan kode biner unik saat ditekan.' },
          { name: 'Lampu LED Indikator', desc: 'Menandai status CapsLock (huruf besar) dan NumLock (angka).' },
          { name: 'Kabel Konektor USB Logam', desc: 'Menghantarkan arus sinyal data digital berkecepatan tinggi ke komputer.' },
        ],
      },
      {
        id: 'mouse',
        name: 'Tetikus Optik (Optical Mouse)',
        shortName: 'Mouse Optik',
        realProductName: 'Logitech G102 Lightsync Optical Gaming Mouse',
        realSpecs: [
          'Sensor: Optik HERO Kelas Gaming 8,000 DPI Presisi Tinggi',
          'Tombol: 6 Tombol Mikro (Klik Kiri, Kanan, Scroll, DPI Switch)',
          'Kecepatan Respon: 1,000 Hz (1 milidetik)',
          'Sensor Bawah: Lensa Optik Merah dengan 4 Bantalan Teflon PTFE',
        ],
        photoUrl: '/images/hardware/mouse.jpg',
        icon: Mouse,
        badge: 'Input Penunjuk & Klik',
        shortDesc: 'Menangkap gerakan tangan di atas meja menggunakan pantulan sensor cahaya LED merah untuk menggerakkan kursor di layar monitor.',
        roleAnalogy: '👉 Ibarat Jari Telunjuk yang menunjuk dan memilih benda yang ingin kamu pegang.',
        keyExamples: ['Mouse Optik Berkabel USB', 'Mouse Nirkabel Wireless 2.4GHz', 'Touchpad pada Laptop'],
        physicalParts: [
          { name: 'Tombol Klik Kiri & Kanan', desc: 'Klik kiri untuk memilih/membuka, klik kanan untuk menu opsi lanjutan.' },
          { name: 'Roda Gulir (Scroll Wheel)', desc: 'Roda karet bergerigi di tengah untuk menggulir halaman web ke atas dan bawah.' },
          { name: 'Sensor Optik LED Merah Bawah', desc: 'Putar 360° ke bawah untuk melihat lubang sensor pembaca pergerakan meja!' },
        ],
      },
      {
        id: 'webcam',
        name: 'Kamera Web (HD Webcam)',
        shortName: 'Webcam',
        realProductName: 'Logitech C920 HD Pro Webcam',
        realSpecs: [
          'Resolusi Video: Full HD 1080p pada 30 frame per detik',
          'Lensa: Optik Kaca Full HD dengan Autofocus Presisi',
          'Mikrofon: Dual Stereo Omni-directional dengan Noise Cancelling',
          'Dudukan: Universal Monitor Clip dengan Ulir Tripod 1/4 Inci',
        ],
        photoUrl: '/images/hardware/webcam.jpg',
        icon: Camera,
        badge: 'Input Visual & Video',
        shortDesc: 'Menangkap gelombang cahaya dari wajah atau ruangan di depan komputer, lalu mengubahnya menjadi sinyal video digital.',
        roleAnalogy: '👁️ Ibarat Mata Manusia yang melihat pemandangan dan mengirimkan gambarnya ke otak.',
        keyExamples: ['Webcam Eksternal USB', 'Kamera Depan Bawaan Laptop', 'Kamera HP Smartphone'],
        physicalParts: [
          { name: 'Lensa Kaca Melingkar', desc: 'Memfokuskan cahaya dari luar tepat ke sensor gambar digital CMOS di dalamnya.' },
          { name: 'Lampu LED Indikator Nyala', desc: 'Menyala hijau saat kamera sedang aktif merekam demi privasi dan keamanan.' },
          { name: 'Penjepit Klip Fleksibel', desc: 'Dudukan penyangga yang bisa dijepitkan dengan kokoh di atas bingkai monitor.' },
        ],
      },
    ],
  },

  process: {
    id: 'process',
    title: 'Perangkat Pemroses (Process)',
    categoryName: '2. Perangkat Pemroses (Processing Device)',
    color: 'from-amber-500 to-orange-600',
    tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    items: [
      {
        id: 'cpu',
        name: 'Processor Inti (CPU Chip)',
        shortName: 'CPU Processor',
        realProductName: 'Intel® Core™ i7-14700K Desktop Processor',
        realSpecs: [
          'Inti Komputasi: 20 Cores (8 Performance-Cores + 12 Efficient-Cores)',
          'Kecepatan Denyut: Hingga 5.60 GHz Max Turbo Frequency',
          'Arsitektur: Intel 7 (10nm Enhanced SuperFin) Miliaran Transistor',
          'Soket Dudukan: LGA1700 dengan 1700 Titik Pin Kontak Emas',
        ],
        photoUrl: '/images/hardware/cpu.jpg',
        icon: Cpu,
        badge: 'Otak Utama Komputer',
        shortDesc: 'Melakukan miliaran kalkulasi matematika (ALU) dan mengendalikan semua perintah software (Control Unit) setiap detiknya.',
        roleAnalogy: '🧠 Ibarat Otak Manusia yang berpikir keras, menghitung, dan mengambil keputusan cepat.',
        keyExamples: ['Intel Core i3 / i5 / i7 / i9', 'AMD Ryzen 3 / 5 / 7 / 9', 'Apple M-Series Silicon'],
        physicalParts: [
          { name: 'Pelindung Panas Logam (IHS Ukiran Laser)', desc: 'Tutup logam perak penyerap panas dengan ukiran laser spesifikasi resmi intel Core i7.' },
          { name: 'Papan Substrat Hijau (PCB)', desc: 'Papan sirkuit mikro multi-lapis tempat miliaran transistor terpasang rapi.' },
          { name: 'Ratusan Pin Emas (LGA1700)', desc: 'Putar 360° ke bawah untuk melihat 1700 titik emas penghantar sinyal listrik!' },
        ],
      },
      {
        id: 'gpu',
        name: 'Kartu Grafis (GPU / VGA Card)',
        shortName: 'Kartu Grafis (GPU)',
        realProductName: 'ASUS Dual GeForce RTX™ 4060 OC Edition 8GB',
        realSpecs: [
          'Memori VRAM: 8GB GDDR6 Berkecepatan 17 Gbps 128-Bit',
          'Inti Grafis: 3072 CUDA Cores dengan Tensor Cores Generasi ke-4',
          'Sistem Pendingin: 2x Kipas Axial-tech Fan dengan Bantalan Bola Ganda',
          'Port Keluaran: 1x HDMI 2.1a & 3x DisplayPort 1.4a',
        ],
        photoUrl: '/images/hardware/gpu.jpg',
        icon: Zap,
        badge: 'Pemroses Gambar & 3D',
        shortDesc: 'Komponen khusus dengan ribuan inti mikroprosesor yang bertugas merender grafik game 3D, animasi, dan video beresolusi tinggi.',
        roleAnalogy: '🎨 Ibarat Pelukis & Arsitek Cepat yang menggambar 60 hingga 144 lembar gambar bergerak per detik.',
        keyExamples: ['NVIDIA GeForce RTX Series', 'AMD Radeon RX Series', 'Intel Arc Graphics'],
        physicalParts: [
          { name: 'Dua Kipas Pendingin (Dual Fan)', desc: 'Kipas berputar kencang membuang panas dari chip grafis yang bekerja berat.' },
          { name: 'Konektor PCIe x16 Bus Emas', desc: 'Jalur tancap ke motherboard untuk transfer data visual ultra cepat.' },
          { name: 'Port HDMI & DisplayPort Belakang', desc: 'Colokan kabel keluaran visual yang langsung disambungkan ke monitor.' },
        ],
      },
      {
        id: 'motherboard',
        name: 'Papan Induk (Motherboard)',
        shortName: 'Motherboard',
        realProductName: 'ASUS TUF GAMING B760-PLUS WIFI ATX Motherboard',
        realSpecs: [
          'Soket CPU: LGA1700 Mendukung Processor Intel Core Gen 12, 13, 14',
          'Slot Memori: 4x Slot DDR5 Dual Channel Kapasitas Hingga 192GB',
          'Slot Ekspansi: 1x PCIe 5.0 x16 Logam SafeSlot untuk Kartu Grafis',
          'Penyimpanan: 3x Slot M.2 PCIe 4.0 NVMe dengan Heatsink Pendingin',
        ],
        photoUrl: '/images/hardware/motherboard.jpg',
        icon: Layers,
        badge: 'Papan Sirkuit Penghubung',
        shortDesc: 'Papan sirkuit sirkulasi utama tempat seluruh komponen (CPU, RAM, VGA, Penyimpanan, Kabel) dicolokkan dan saling terhubung.',
        roleAnalogy: '🦴 Ibarat Kerangka Tulang & Pembuluh Darah yang menyatukan seluruh organ tubuh manusia.',
        keyExamples: ['Motherboard ATX Komputer Meja', 'Motherboard Micro-ATX Ringkas', 'Mainboard Laptop Terpadu'],
        physicalParts: [
          { name: 'Soket Dudukan Processor (LGA Logam)', desc: 'Rumah tempat CPU dipasang dan dikunci dengan tuas pengait logam.' },
          { name: 'Dua Slot Memori RAM DDR4', desc: 'Dudukan kepingan RAM dengan kait pengunci plastik di kedua ujungnya.' },
          { name: 'Slot Panjang PCIe x16', desc: 'Tempat menancapkan kartu grafis GPU dengan jalur transfer data terluas.' },
        ],
      },
    ],
  },

  storage: {
    id: 'storage',
    title: 'Media Penyimpanan (Storage)',
    categoryName: '3. Media Penyimpanan (Storage Device)',
    color: 'from-emerald-500 to-teal-600',
    tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    items: [
      {
        id: 'ram',
        name: 'Kepingan RAM (DDR4 Stick)',
        shortName: 'RAM DDR4',
        realProductName: 'Kingston FURY™ Beast DDR4 16GB (3200MHz)',
        realSpecs: [
          'Kapasitas: 16 Gigabyte (Kepingan Tunggal atau Kit)',
          'Kecepatan Transfer: 3,200 MT/detik (Megatransfer per detik)',
          'Latensi & Tegangan: CL16-20-20 pada Daya Hemat 1.35V',
          'Pendingin: Heat Spreader Aluminium Hitam Asimetris Agresif',
        ],
        photoUrl: '/images/hardware/ram.jpg',
        icon: Activity,
        badge: 'Memori Primer (Sementara)',
        shortDesc: 'Menyimpan instruksi program yang sedang aktif dijalankan. Bersifat Volatile (data hilang otomatis begitu listrik padam).',
        roleAnalogy: '📖 Ibarat Meja Belajar: Buku tugas yang sedang aktif dibaca ditaruh di meja agar cepat dijangkau tangan.',
        keyExamples: ['RAM DDR4 8GB / 16GB', 'RAM DDR5 Kecepatan Tinggi', 'RAM SODIMM untuk Laptop'],
        physicalParts: [
          { name: 'Label Kingston FURY Ber-Barcode', desc: 'Stiker spesifikasi asli bertuliskan frekuensi 3200MHz dan nomor seri.' },
          { name: 'Lekukan Pengaman (Notch Celah)', desc: 'Celah di tengah baris pin yang mencegah RAM terpasang terbalik di motherboard.' },
          { name: 'Pin Kontak Emas Bus', desc: 'Ratusan jalur tembaga berlapis emas berkecepatan transfer ultra tinggi.' },
        ],
      },
      {
        id: 'ssd',
        name: 'Solid State Drive (SSD NVMe M.2)',
        shortName: 'SSD NVMe M.2',
        realProductName: 'Samsung 980 PRO PCIe® 4.0 NVMe™ M.2 SSD 1TB',
        realSpecs: [
          'Kecepatan Baca: Hingga 7,000 Megabyte per detik (Super Cepat)',
          'Kecepatan Tulis: Hingga 5,000 Megabyte per detik',
          'Teknologi Chip: Samsung V-NAND 3-bit MLC & Kontroler Elpida Nikel',
          'Faktor Bentuk: M.2 2280 Ramping Tanpa Kabel Langsung Tertancap',
        ],
        photoUrl: '/images/hardware/ssd.jpg',
        icon: HardDrive,
        badge: 'Gudang File Super Cepat',
        shortDesc: 'Penyimpanan non-volatile modern tanpa piringan bergerak, tahan guncangan, dan membaca data ribuan megabyte per detik.',
        roleAnalogy: '⚡ Ibarat Lemari Arsip Digital Otomatis yang dapat mengeluarkan berkas dalam waktu sekejap mata.',
        keyExamples: ['SSD NVMe M.2 512GB / 1TB', 'SSD SATA 2.5 Inci', 'SSD Portabel Eksternal'],
        physicalParts: [
          { name: 'Stiker Termal Samsung 980 PRO Asli', desc: 'Stiker pendingin tembaga dengan tulisan resmi Samsung, logo NVMe, dan barcode.' },
          { name: 'Chip Controller Utama', desc: 'Otak mikro berpelapis nikel yang mengatur pembacaan data flash NAND.' },
          { name: 'Pin Konektor Soket M.2 Emas', desc: 'Konektor ramping yang langsung tertancap pada slot motherboard.' },
        ],
      },
      {
        id: 'hdd',
        name: 'Hard Disk Drive (HDD Mekanis 3.5")',
        shortName: 'Harddisk (HDD)',
        realProductName: 'Seagate BarraCuda® 2TB 3.5" Desktop Hard Drive',
        realSpecs: [
          'Kapasitas Simpan: 2 Terabyte (Setara 500.000 Lagu atau Foto)',
          'Kecepatan Putaran: 7,200 RPM (Rotations Per Minute)',
          'Memori Cache: 256MB Multi-Tier Caching Technology',
          'Antarmuka Kabel: SATA 6Gb/s Kecepatan Transfer Standar Industri',
        ],
        photoUrl: '/images/hardware/hdd.jpg',
        icon: Disc,
        badge: 'Gudang Kapasitas Besar',
        shortDesc: 'Media penyimpan permanen tradisional yang menggunakan piringan magnetik berputar ribuan putaran per menit untuk menyimpan data kapasitas besar.',
        roleAnalogy: '📚 Ibarat Perpustakaan Arsip Raksasa dengan jutaan buku tebal yang tersimpan rapi selamanya.',
        keyExamples: ['Harddisk Internal PC 1TB / 2TB', 'Harddisk Eksternal USB', 'Harddisk Server Data'],
        physicalParts: [
          { name: 'Piringan Cakram Cermin (Platter)', desc: 'Putar 360° untuk melihat piringan magnetik berkilau seperti cermin tempat data tersimpan.' },
          { name: 'Lengan Jarum Pembaca (Actuator Arm)', desc: 'Jarum mikro yang melayang super tipis di atas piringan untuk membaca bit data.' },
          { name: 'Label Resmi Seagate BarraCuda 2TB', desc: 'Stiker penutup aluminium lengkap dengan logo hijau Seagate dan kode teknis.' },
        ],
      },
    ],
  },

  output: {
    id: 'output',
    title: 'Perangkat Keluaran (Output)',
    categoryName: '4. Perangkat Keluaran (Output Device)',
    color: 'from-purple-500 to-violet-600',
    tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    items: [
      {
        id: 'monitor',
        name: 'Monitor Layar Komputer (IPS Panel)',
        shortName: 'Monitor Layar',
        realProductName: 'LG 24MP400-B 24" Full HD IPS Desktop Monitor',
        realSpecs: [
          'Ukuran Layar: 23.8 Inci Panel IPS Sudut Pandang Luas 178 Derajat',
          'Resolusi Piksel: Full HD 1920 x 1080 pada Refresh Rate 75Hz',
          'Fitur Visual: AMD FreeSync™, Flicker Safe, Reader Mode Ramah Mata',
          'Desain Bingkai: 3-Side Virtually Borderless (Bezel Sangat Tipis)',
        ],
        photoUrl: '/images/hardware/monitor.jpg',
        icon: Tv,
        badge: 'Keluaran Visual Layar',
        shortDesc: 'Menerjemahkan jutaan piksel warna dari kartu grafis menjadi tampilan antarmuka visual, teks, foto, dan video yang jelas untuk mata.',
        roleAnalogy: '🖼️ Ibarat Papan Tulis Kelas tempat guru menggambar dan menulis materi pelajaran agar murid bisa melihatnya.',
        keyExamples: ['Monitor IPS Full HD 24 Inci', 'Layar Layar Laptop', 'Proyektor Ruang Kelas'],
        physicalParts: [
          { name: 'Layar Nyata Windows 11 Desktop', desc: 'Menampilkan wallpaper Windows 11 asli, jendela materi BELSISKOM, dan taskbar jam.' },
          { name: 'Bingkai Bezel Ultra Tipis', desc: 'Desain modern bezel tipis dengan dagu bawah bertuliskan logo LG.' },
          { name: 'Dudukan Meja Segi Empat Kokoh', desc: 'Pondasi kokoh yang menjaga monitor tetap stabil di atas meja belajar lab.' },
        ],
      },
      {
        id: 'speaker',
        name: 'Speaker Desktop Multimedia',
        shortName: 'Speaker Audio',
        realProductName: 'Edifier R1280T Powered Bookshelf Desktop Speakers',
        realSpecs: [
          'Driver Bass: 4 Inci Woofer Subwoofer Kerucut Karbon Berdaya 42W RMS',
          'Driver Treble: 13mm Silk Dome Tweeter untuk Vokal Jernih',
          'Pengatur Suara: Kenop Putar Volume, Bass, dan Treble di Sisi Samping',
          'Port Akustik: Lubang Bass Reflex Depan untuk Hentakan Suara Padat',
        ],
        photoUrl: '/images/hardware/speaker.jpg',
        icon: Volume2,
        badge: 'Keluaran Bunyi & Suara',
        shortDesc: 'Mengubah sinyal audio digital dari kartu suara (sound card) menjadi gelombang getaran suara mekanik yang dapat didengar telinga.',
        roleAnalogy: '🗣️ Ibarat Pita Suara & Mulut Manusia yang berbicara, bersiul, atau menyanyikan lagu.',
        keyExamples: ['Speaker Komputer Stereo 2.0', 'Headset / Headphone Lab', 'Soundbar TV'],
        physicalParts: [
          { name: 'Membran Kerucut Besar (Woofer)', desc: 'Bergetar maju-mundur untuk menghasilkan frekuensi suara bass rendah yang bertenaga.' },
          { name: 'Membran Kubah Kecil (Tweeter)', desc: 'Menghasilkan suara nada tinggi (treble), vokal guru, dan efek instrumen jernih.' },
          { name: 'Kenop Putar Pengatur Volume', desc: 'Tombol timbul di bagian depan untuk membesarkan atau mengecilkan suara.' },
        ],
      },
      {
        id: 'printer',
        name: 'Printer Dokumen Berwarna (Inkjet)',
        shortName: 'Printer Dokumen',
        realProductName: 'Epson EcoTank L3210 All-in-One Ink Tank Printer',
        realSpecs: [
          'Teknologi Cetak: On-demand Inkjet (Piezoelectric) Bebas Panas',
          'Resolusi Maksimal: 5760 x 1440 dpi Cetak Foto Tajam',
          'Kecepatan Cetak: Hingga 33 Halaman per Menit (Hitam-Putih)',
          'Sistem Tinta: 4 Tangki Transparan Terpadu (Cyan, Magenta, Yellow, Black)',
        ],
        photoUrl: '/images/hardware/printer.jpg',
        icon: Printer,
        badge: 'Cetak Fisik di Kertas',
        shortDesc: 'Menyemprotkan titik-titik tinta mikroskopis ke atas kertas untuk mengubah tugas digital menjadi lembaran fisik (hardcopy).',
        roleAnalogy: '🖨️ Ibarat Mesin Cetak Percetakan Buku yang menyalin tulisan ke ratusan lembar kertas nyata.',
        keyExamples: ['Printer Ink Tank Berwarna', 'Printer Laser Cetak Cepat', 'Printer Kasir Mini'],
        physicalParts: [
          { name: 'Baki Kertas Masuk & Keluar', desc: 'Tempat menaruh tumpukan kertas HVS kosong dan keluarnya lembaran tugas tercetak.' },
          { name: 'Jendela Tangki 4 Warna Tinta', desc: 'Memperlihatkan level isi cairan tinta Cyan, Magenta, Yellow, dan Black.' },
          { name: 'Panel Tombol Kontrol', desc: 'Tombol daya hijau, tombol lanjut cetak, dan lampu peringatan jika kertas habis.' },
        ],
      },
    ],
  },

  communication: {
    id: 'communication',
    title: 'Perangkat Jaringan (Communication)',
    categoryName: '5. Perangkat Komunikasi & Jaringan (Communication Device)',
    color: 'from-cyan-500 to-blue-600',
    tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    items: [
      {
        id: 'router',
        name: 'Wi-Fi Router 4 Antena (Dual-Band)',
        shortName: 'Wi-Fi Router',
        realProductName: 'TP-Link Archer AX55 AX3000 Gigabit Wi-Fi 6 Router',
        realSpecs: [
          'Standar Nirkabel: Generasi Wi-Fi 6 (802.11ax) Kecepatan 3 Gbps',
          'Antena: 4x Antena High-Gain Eksternal dengan Fitur Beamforming',
          'Port Kabel: 1x Gigabit WAN (Biru) + 4x Gigabit LAN (Kuning)',
          'Kapasitas Klien: Mampu Menghubungkan Hingga 128 HP & Laptop Sekaligus',
        ],
        photoUrl: '/images/hardware/router.svg',
        icon: Wifi,
        badge: 'Pemancar Nirkabel Wireless',
        shortDesc: 'Memancarkan gelombang radio frekuensi 2.4GHz dan 5GHz untuk menghubungkan puluhan HP, laptop, dan komputer ke jaringan internet.',
        roleAnalogy: '📡 Ibarat Menara Mercusuar yang memancarkan sinyal ke segala penjuru kapal di sekitarnya.',
        keyExamples: ['Wi-Fi Router Sekolah / Lab', 'Access Point Plafon', 'MiFi Modem Portabel'],
        physicalParts: [
          { name: 'Label TP-Link & Indikator LED', desc: 'Casing hitam bergaris pendingin dengan ikon LED (Power, Wi-Fi 2.4G/5G, Internet).' },
          { name: '4 Tiang Antena Omni-Directional', desc: 'Mengatur arah dan memperkuat jangkauan pancaran sinyal nirkabel di ruangan.' },
          { name: '4 Port Kuning Kabel LAN (RJ-45)', desc: 'Putar ke bagian belakang untuk melihat colokan kabel jaringan kabel Gigabit!' },
        ],
      },
      {
        id: 'modem',
        name: 'Modem Internet Fiber Optik (ONT)',
        shortName: 'Modem Provider',
        realProductName: 'Huawei EchoLife HG8245H5 GPON Optical Terminal',
        realSpecs: [
          'Konektor Serat Optik: Port SC/APC Warna Hijau Kecepatan Cahaya Gigabits',
          'Port Jaringan: 4x Port GE/FE Ethernet + 2x Port Telepon POTS RJ-11',
          'Status LED: Power, PON (Link Optik), LOS (Sinyal Putus), LAN, Internet',
          'Pendingin: Kisi-kisi Ventilasi Pasif Samping 24 Jam Nonstop Tanpa Kipas',
        ],
        photoUrl: '/images/hardware/modem.svg',
        icon: Globe,
        badge: 'Pengubah Sinyal Internet',
        shortDesc: 'Menerjemahkan pulsa cahaya dari kabel serat optik penyedia internet (ISP) menjadi sinyal data digital yang dimengerti router & komputer.',
        roleAnalogy: '🗣️➡️👂 Ibarat Penerjemah Bahasa yang mengubah bahasa asing menjadi bahasa Indonesia yang dimengerti semua orang.',
        keyExamples: ['Modem Fiber Optik IndiHome / FirstMedia', 'Modem USB Dongle 4G/5G', 'Modem Kabel Coaxial'],
        physicalParts: [
          { name: 'Kisi-kisi Ventilasi Pendingin Casing', desc: 'Celah ventilasi pada bodi tegak untuk membuang panas karena modem menyala 24 jam nonstop.' },
          { name: 'Deretan Lampu Status (PON / LOS)', desc: 'Menandakan status sambungan optik normal (PON hijau) atau putus (LOS merah).' },
          { name: 'Port Hijau Kabel Serat Optik SC/APC', desc: 'Colokan di bagian bawah tempat serat kaca kabel internet fiber ditancapkan.' },
        ],
      },
      {
        id: 'nic',
        name: 'Kartu Jaringan LAN (PCIe Gigabit NIC)',
        shortName: 'Kartu LAN (NIC)',
        realProductName: 'TP-Link TG-3468 Gigabit PCIe Network Adapter',
        realSpecs: [
          'Standar Kecepatan: 10/100/1000 Mbps Full Duplex (Gigabit Ethernet)',
          'Antarmuka Bus: PCI Express 1.0a x1 Ramping dengan Pin Emas',
          'Fitur: Wake-on-LAN, Auto-Negotiation & Auto MDI/MDIX',
          'Konektor: Soket Terlindung Logam RJ-45 dengan 2 LED Link/Activity',
        ],
        photoUrl: '/images/hardware/nic.svg',
        icon: Network,
        badge: 'Port Kabel Internet Komputer',
        shortDesc: 'Papan kartu sirkuit yang dicolokkan ke motherboard untuk menyediakan colokan kabel LAN (RJ-45) berkecepatan 1000 Mbps yang sangat stabil.',
        roleAnalogy: '🔌 Ibarat Pintu Gerbang Khusus di rumah yang langsung menyambungkan kita ke jalan tol bebas hambatan.',
        keyExamples: ['Kartu Jaringan PCIe Komputer Meja', 'Port LAN Bawaan Motherboard', 'USB to LAN Adapter'],
        physicalParts: [
          { name: 'Soket Port RJ-45 Logam Perak', desc: 'Lubang colokan kabel LAN dengan pengait plastik pengunci agar kabel tidak lepas.' },
          { name: 'Dua Lampu LED Link/Activity', desc: 'LED mini hijau dan oranye yang berkedip cepat saat aktivitas internet berjalan.' },
          { name: 'Braket Logam Casing Belakang', desc: 'Pelat perak penopang yang dibaut ke casing komputer bertuliskan Gigabit.' },
        ],
      },
    ],
  },
};
