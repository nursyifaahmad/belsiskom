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
        icon: Keyboard,
        badge: 'Input Teks & Perintah',
        shortDesc: 'Mengubah ketukan fisik jari menjadi deretan kode biner (0 dan 1) untuk mengetik dokumen, coding, dan mengontrol game.',
        roleAnalogy: '✍️ Ibarat Jari Tangan yang menulis huruf demi huruf pada selembar kertas putih.',
        keyExamples: ['Keyboard Mekanikal (Gaming)', 'Keyboard Membran Laptop', 'Keyboard Nirkabel Bluetooth'],
        physicalParts: [
          { name: 'Tombol Timbul (Keycaps)', desc: 'Setiap tombol memiliki sakelar yang mengirim kode sinyal unik saat ditekan.' },
          { name: 'Lampu LED Indikator', desc: 'Menandai status CapsLock (huruf besar) dan NumLock (angka).' },
          { name: 'Kabel Konektor USB', desc: 'Menghantarkan arus sinyal data digital berkecepatan tinggi ke komputer.' },
        ],
      },
      {
        id: 'mouse',
        name: 'Tetikus Optik (Optical Mouse)',
        shortName: 'Mouse Optik',
        icon: Mouse,
        badge: 'Input Penunjuk & Klik',
        shortDesc: 'Menangkap gerakan tangan di atas meja menggunakan pantulan sensor cahaya LED merah untuk menggerakkan kursor di layar monitor.',
        roleAnalogy: '👉 Ibarat Jari Telunjuk yang menunjuk dan memilih benda yang ingin kamu pegang.',
        keyExamples: ['Mouse Optik Berkabel USB', 'Mouse Nirkabel Wireless 2.4GHz', 'Touchpad pada Laptop'],
        physicalParts: [
          { name: 'Tombol Klik Kiri & Kanan', desc: 'Klik kiri untuk memilih/membuka, klik kanan untuk menu opsi lanjutan.' },
          { name: 'Roda Gulir (Scroll Wheel)', desc: 'Roda karet bergerigi di tengah untuk menggulir halaman web ke atas dan bawah.' },
          { name: 'Sensor Optik LED Merah', desc: 'Putar 360° ke bawah untuk melihat lubang sensor pembaca pergerakan meja!' },
        ],
      },
      {
        id: 'webcam',
        name: 'Kamera Web (HD Webcam)',
        shortName: 'Webcam',
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
        icon: Cpu,
        badge: 'Otak Utama Komputer',
        shortDesc: 'Melakukan miliaran kalkulasi matematika (ALU) dan mengendalikan semua perintah software (Control Unit) setiap detiknya.',
        roleAnalogy: '🧠 Ibarat Otak Manusia yang berpikir keras, menghitung, dan mengambil keputusan cepat.',
        keyExamples: ['Intel Core i3 / i5 / i7 / i9', 'AMD Ryzen 3 / 5 / 7 / 9', 'Apple M-Series Silicon'],
        physicalParts: [
          { name: 'Pelindung Panas Logam (IHS)', desc: 'Tutup logam perak penyerap panas dari inti silikon mikroprosesor di dalamnya.' },
          { name: 'Papan Substrat Hijau (PCB)', desc: 'Papan sirkuit mikro multi-lapis tempat miliaran transistor terpasang rapi.' },
          { name: 'Ratusan Pin Emas (LGA/PGA)', desc: 'Putar 360° ke bawah untuk melihat titik-titik emas penghantar sinyal listrik berkecepatan Gigahertz!' },
        ],
      },
      {
        id: 'gpu',
        name: 'Kartu Grafis (GPU / VGA Card)',
        shortName: 'Kartu Grafis (GPU)',
        icon: Zap,
        badge: 'Pemroses Gambar & 3D',
        shortDesc: 'Komponen khusus dengan ribuan inti mikroprosesor yang bertugas merender grafik game 3D, animasi, dan video beresolusi tinggi.',
        roleAnalogy: '🎨 Ibarat Pelukis & Arsitek Cepat yang menggambar 60 hingga 144 lembar gambar bergerak per detik.',
        keyExamples: ['NVIDIA GeForce RTX', 'AMD Radeon RX', 'Intel Arc Graphics'],
        physicalParts: [
          { name: 'Dua Kipas Pendingin (Dual Fan)', desc: 'Kipas berputar kencang membuang panas dari chip grafis yang bekerja berat.' },
          { name: 'Konektor PCIe Bus Emas', desc: 'Jalur tancap ke motherboard untuk transfer data visual ultra cepat.' },
          { name: 'Port HDMI & DisplayPort Belakang', desc: 'Colokan kabel keluaran visual yang langsung disambungkan ke monitor.' },
        ],
      },
      {
        id: 'motherboard',
        name: 'Papan Induk (Motherboard)',
        shortName: 'Motherboard',
        icon: Layers,
        badge: 'Papan Sirkuit Penghubung',
        shortDesc: 'Papan sirkuit sirkulasi utama tempat seluruh komponen (CPU, RAM, VGA, Penyimpanan, Kabel) dicolokkan dan saling terhubung.',
        roleAnalogy: '🦴 Ibarat Kerangka Tulang & Pembuluh Darah yang menyatukan seluruh organ tubuh manusia.',
        keyExamples: ['Motherboard ATX (Komputer Meja)', 'Motherboard Micro-ATX Ringkas', 'Mainboard Laptop Terpadu'],
        physicalParts: [
          { name: 'Soket Dudukan Processor (LGA)', desc: 'Rumah tempat CPU dipasang dan dikunci dengan tuas pengait logam.' },
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
        icon: Activity,
        badge: 'Memori Primer (Sementara)',
        shortDesc: 'Menyimpan instruksi program yang sedang aktif dijalankan. Bersifat Volatile (data hilang otomatis begitu listrik padam).',
        roleAnalogy: '📖 Ibarat Meja Belajar: Buku tugas yang sedang aktif dibaca ditaruh di meja agar cepat dijangkau tangan.',
        keyExamples: ['RAM DDR4 8GB / 16GB', 'RAM DDR5 Kecepatan Tinggi', 'RAM SODIMM untuk Laptop'],
        physicalParts: [
          { name: 'Deretan Chip Memori Hitam (IC)', desc: 'Blok silikon mikro tempat bit-bit data aplikasi aktif disimpan sementara.' },
          { name: 'Lekukan Pengaman (Notch)', desc: 'Celah di tengah baris pin yang mencegah RAM terpasang terbalik di slot motherboard.' },
          { name: 'Pin Kontak Emas Bus', desc: 'Ratusan jalur tembaga berlapis emas berkecepatan transfer hingga 3200 MT/detik.' },
        ],
      },
      {
        id: 'ssd',
        name: 'Solid State Drive (SSD NVMe M.2)',
        shortName: 'SSD NVMe M.2',
        icon: HardDrive,
        badge: 'Gudang File Super Cepat',
        shortDesc: 'Penyimpanan non-volatile modern tanpa piringan bergerak, tahan guncangan, dan membaca data ribuan megabyte per detik.',
        roleAnalogy: '⚡ Ibarat Lemari Arsip Digital Otomatis yang dapat mengeluarkan berkas dalam waktu sekejap mata.',
        keyExamples: ['SSD NVMe M.2 512GB / 1TB', 'SSD SATA 2.5 Inci', 'SSD Portabel Eksternal'],
        physicalParts: [
          { name: 'Chip Controller Utama', desc: 'Otak mikro yang mengatur pembacaan dan penulisan blok data flash NAND.' },
          { name: 'Konektor Soket M.2 Emas', desc: 'Konektor ramping yang langsung tertancap pada slot motherboard tanpa kabel.' },
          { name: 'Lubang Baut Pengunci', desc: 'Lubang di ujung kartu untuk mengunci SSD dengan sekrup ke motherboard.' },
        ],
      },
      {
        id: 'hdd',
        name: 'Hard Disk Drive (HDD Mekanis 3.5")',
        shortName: 'Harddisk (HDD)',
        icon: Disc,
        badge: 'Gudang Kapasitas Besar',
        shortDesc: 'Media penyimpan permanen tradisional yang menggunakan piringan magnetik berputar ribuan putaran per menit untuk menyimpan data kapasitas besar.',
        roleAnalogy: '📚 Ibarat Perpustakaan Arsip Raksasa dengan jutaan buku tebal yang tersimpan rapi selamanya.',
        keyExamples: ['Harddisk Internal PC 1TB / 2TB', 'Harddisk Eksternal USB', 'Harddisk Server Data'],
        physicalParts: [
          { name: 'Piringan Cakram Perak (Platter)', desc: 'Putar 360° untuk melihat piringan magnetik berkilau tempat data disimpan secara magnetik.' },
          { name: 'Lengan Jarum Pembaca (Actuator Arm)', desc: 'Jarum mikro yang melayang super tipis di atas piringan untuk membaca bit data.' },
          { name: 'Port Soket Kabel SATA & Daya', desc: 'Colokan di bagian belakang untuk kabel data merah SATA dan arus dari PSU.' },
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
        icon: Tv,
        badge: 'Keluaran Visual Layar',
        shortDesc: 'Menerjemahkan jutaan piksel warna dari kartu grafis menjadi tampilan antarmuka visual, teks, foto, dan video yang jelas untuk mata.',
        roleAnalogy: '🖼️ Ibarat Papan Tulis Kelas tempat guru menggambar dan menulis materi pelajaran agar murid bisa melihatnya.',
        keyExamples: ['Monitor IPS Full HD 24 Inci', 'Layar Layar Laptop', 'Proyektor Ruang Kelas'],
        physicalParts: [
          { name: 'Panel Kaca Layar Tipis', desc: 'Menampilkan jutaan titik cahaya sub-piksel warna Merah, Hijau, dan Biru (RGB).' },
          { name: 'Tiang Leher Logam Ergonomis', desc: 'Menahan bobot layar dan memungkinkan kemiringan sudut pandang diatur.' },
          { name: 'Dudukan Kaki Meja', desc: 'Pondasi kokoh segi empat yang menjaga monitor tetap stabil di atas meja belajar.' },
        ],
      },
      {
        id: 'speaker',
        name: 'Speaker Desktop Multimedia',
        shortName: 'Speaker Audio',
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
        icon: Printer,
        badge: 'Cetak Fisik di Kertas',
        shortDesc: 'Menyemprotkan titik-titik tinta mikroskopis ke atas kertas untuk mengubah tugas digital menjadi lembaran fisik (hardcopy).',
        roleAnalogy: '🖨️ Ibarat Mesin Cetak Percetakan Buku yang menyalin tulisan ke ratusan lembar kertas nyata.',
        keyExamples: ['Printer Ink Tank Berwarna', 'Printer Laser Cetak Cepat', 'Printer Kasir Mini'],
        physicalParts: [
          { name: 'Baki Kertas Masuk (Paper Tray)', desc: 'Tempat menaruh tumpukan kertas HVS kosong sebelum ditarik ke dalam mesin.' },
          { name: 'Baki Kertas Keluar Depan', desc: 'Tempat keluarnya lembaran tugas yang telah tercetak rapi dengan teks dan warna.' },
          { name: 'Panel Tombol & Lampu Indikator', desc: 'Tombol daya, tombol lanjut cetak, dan lampu peringatan jika tinta habis.' },
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
        icon: Wifi,
        badge: 'Pemancar Nirkabel Wireless',
        shortDesc: 'Memancarkan gelombang radio frekuensi 2.4GHz dan 5GHz untuk menghubungkan puluhan HP, laptop, dan komputer ke jaringan internet.',
        roleAnalogy: '📡 Ibarat Menara Mercusuar yang memancarkan sinyal ke segala penjuru kapal di sekitarnya.',
        keyExamples: ['Wi-Fi Router Sekolah / Lab', 'Access Point Plafon', 'MiFi Modem Portabel'],
        physicalParts: [
          { name: '4 Tiang Antena Omni-Directional', desc: 'Mengatur arah dan memperkuat jangkauan pancaran sinyal nirkabel di ruangan.' },
          { name: 'Lampu LED Status Hijau', desc: 'Berkedip menandakan aliran paket data internet sedang berlangsung lancar.' },
          { name: '4 Port Kuning Kabel LAN (RJ-45)', desc: 'Putar ke bagian belakang untuk melihat colokan kabel jaringan kabel Gigabit!' },
        ],
      },
      {
        id: 'modem',
        name: 'Modem Internet Fiber Optik (ONT)',
        shortName: 'Modem Provider',
        icon: Globe,
        badge: 'Pengubah Sinyal Internet',
        shortDesc: 'Menerjemahkan pulsa cahaya dari kabel serat optik penyedia internet (ISP) menjadi sinyal data digital yang dimengerti router & komputer.',
        roleAnalogy: '🗣️➡️👂 Ibarat Penerjemah Bahasa yang mengubah bahasa asing menjadi bahasa Indonesia yang dimengerti semua orang.',
        keyExamples: ['Modem Fiber Optik IndiHome / FirstMedia', 'Modem USB Dongle 4G/5G', 'Modem Kabel Coaxial'],
        physicalParts: [
          { name: 'Kisi-kisi Ventilasi Pendingin', desc: 'Celah ventilasi pada bodi tegak untuk membuang panas karena modem menyala 24 jam nonstop.' },
          { name: 'Deretan Lampu Status (PON / LOS / INT)', desc: 'Menandakan status sambungan optik normal (PON hijau) atau putus (LOS merah).' },
          { name: 'Port Hijau Kabel Serat Optik', desc: 'Colokan di bagian bawah tempat serat kaca kabel internet fiber ditancapkan.' },
        ],
      },
      {
        id: 'nic',
        name: 'Kartu Jaringan LAN (PCIe Gigabit NIC)',
        shortName: 'Kartu LAN (NIC)',
        icon: Network,
        badge: 'Port Kabel Internet Komputer',
        shortDesc: 'Papan kartu sirkuit yang dicolokkan ke motherboard untuk menyediakan colokan kabel LAN (RJ-45) berkecepatan 1000 Mbps yang sangat stabil.',
        roleAnalogy: '🔌 Ibarat Pintu Gerbang Khusus di rumah yang langsung menyambungkan kita ke jalan tol bebas hambatan.',
        keyExamples: ['Kartu Jaringan PCIe Komputer Meja', 'Port LAN Bawaan Motherboard', 'USB to LAN Adapter'],
        physicalParts: [
          { name: 'Soket Port RJ-45 Logam', desc: 'Lubang colokan kabel LAN dengan pengait plastik pengunci agar kabel tidak lepas.' },
          { name: 'Lampu LED Indikator Koneksi', desc: 'Dua LED mini hijau dan oranye yang berkedip cepat saat aktivitas internet berjalan.' },
          { name: 'Braket Logam Casing Belakang', desc: 'Pelat perak penopang yang dibaut ke casing komputer agar kartu terpasang kokoh.' },
        ],
      },
    ],
  },
};
