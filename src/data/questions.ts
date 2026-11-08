export interface Question {
  id: number;
  category: 'hardware' | 'software' | 'brainware' | 'general';
  question: string;
  image?: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  isDiagnostic: boolean; // true = 10 soal awal (diagnostik & post-test)
}

export const QUESTIONS: Question[] = [
  // ==========================================
  // 10 SOAL DIAGNOSTIK (Juga masuk di Post-Test)
  // ==========================================
  {
    id: 1,
    category: 'hardware',
    isDiagnostic: true,
    question: 'Perangkat komputer yang digunakan untuk mengetik huruf, angka, dan simbol ke dalam komputer adalah...',
    options: [
      { key: 'A', text: 'Monitor' },
      { key: 'B', text: 'Keyboard (Papan Ketik)' },
      { key: 'C', text: 'Speaker' },
      { key: 'D', text: 'Mouse' },
    ],
    correctAnswer: 'B',
    explanation: 'Keyboard adalah perangkat masukan (input) yang berisi susunan tombol huruf, angka, dan simbol untuk mengetik pesan atau perintah ke komputer.',
  },
  {
    id: 2,
    category: 'hardware',
    isDiagnostic: true,
    question: 'Perangkat yang berfungsi menampilkan hasil kerja komputer berupa gambar, teks, atau video di layar dinamakan...',
    options: [
      { key: 'A', text: 'Monitor (Layar Tampilan)' },
      { key: 'B', text: 'Printer' },
      { key: 'C', text: 'CPU' },
      { key: 'D', text: 'Microphone' },
    ],
    correctAnswer: 'A',
    explanation: 'Monitor adalah perangkat keluaran (output) utama yang menampilkan visual antarmuka pengguna, gambar, dan video sehingga dapat dilihat oleh mata manusia.',
  },
  {
    id: 3,
    category: 'hardware',
    isDiagnostic: true,
    question: 'Alat penunjuk kecil yang digerakkan dengan tangan untuk mengarahkan kursor dan melakukan klik di layar komputer adalah...',
    options: [
      { key: 'A', text: 'Flashdisk' },
      { key: 'B', text: 'Scanner' },
      { key: 'C', text: 'Mouse (Tetikus)' },
      { key: 'D', text: 'Proyektor' },
    ],
    correctAnswer: 'C',
    explanation: 'Mouse dinamakan tetikus karena bentuknya menyerupai tikus kecil, berfungsi menggerakkan tanda panah (kursor) dan memilih tombol di layar.',
  },
  {
    id: 4,
    category: 'general',
    isDiagnostic: true,
    question: 'Komponen komputer yang memiliki bentuk fisik nyata, dapat dilihat dengan mata dan diraba dengan tangan disebut...',
    options: [
      { key: 'A', text: 'Hardware (Perangkat Keras)' },
      { key: 'B', text: 'Software (Perangkat Lunak)' },
      { key: 'C', text: 'Brainware (Pengguna)' },
      { key: 'D', text: 'Malware (Virus Komputer)' },
    ],
    correctAnswer: 'A',
    explanation: 'Hardware (perangkat keras) adalah semua bagian fisik komputer seperti monitor, keyboard, kabel, dan mesin di dalam casing.',
  },
  {
    id: 5,
    category: 'software',
    isDiagnostic: true,
    question: 'Program atau aplikasi di dalam komputer yang tidak memiliki wujud fisik tetapi dapat dijalankan untuk membantu tugas manusia disebut...',
    options: [
      { key: 'A', text: 'Hardware' },
      { key: 'B', text: 'Software (Perangkat Lunak)' },
      { key: 'C', text: 'Flashdisk' },
      { key: 'D', text: 'Casing' },
    ],
    correctAnswer: 'B',
    explanation: 'Software adalah kumpulan instruksi, data, atau program digital yang menggerakkan komputer. Contohnya game, browser web, dan aplikasi ketik.',
  },
  {
    id: 6,
    category: 'hardware',
    isDiagnostic: true,
    question: 'Jika kamu ingin mendengarkan lagu atau penjelasan suara guru dari komputer tanpa mengganggu teman di sampingmu, perangkat yang tepat digunakan adalah...',
    options: [
      { key: 'A', text: 'Webcam' },
      { key: 'B', text: 'Earphone / Headphone' },
      { key: 'C', text: 'Printer' },
      { key: 'D', text: 'Harddisk' },
    ],
    correctAnswer: 'B',
    explanation: 'Headphone atau earphone adalah perangkat output suara yang dipasang di telinga untuk mendengarkan audio secara pribadi.',
  },
  {
    id: 7,
    category: 'general',
    isDiagnostic: true,
    question: 'Langkah pertama yang benar untuk menyalakan komputer yang sudah terhubung listrik adalah...',
    options: [
      { key: 'A', text: 'Mencabut kabel listrik' },
      { key: 'B', text: 'Menekan tombol Power pada casing komputer' },
      { key: 'C', text: 'Memukul-mukul keyboard' },
      { key: 'D', text: 'Menggoyang-goyangkan monitor' },
    ],
    correctAnswer: 'B',
    explanation: 'Tombol Power berfungsi mengalirkan daya dan memulai proses booting (menyalakan sistem komputer).',
  },
  {
    id: 8,
    category: 'hardware',
    isDiagnostic: true,
    question: 'Benda kecil portabel yang sering dicolokkan ke lubang USB komputer untuk menyimpan dan memindahkan tugas sekolah adalah...',
    options: [
      { key: 'A', text: 'Flashdisk (USB Drive)' },
      { key: 'B', text: 'Kipas Komputer' },
      { key: 'C', text: 'Kabel VGA' },
      { key: 'D', text: 'Mousepad' },
    ],
    correctAnswer: 'A',
    explanation: 'Flashdisk adalah media penyimpanan data eksternal yang praktis dibawa kemana-mana dan menggunakan port USB.',
  },
  {
    id: 9,
    category: 'brainware',
    isDiagnostic: true,
    question: 'Dalam sebuah sistem komputer, manusia yang mengoperasikan, menggunakan, atau mengendalikan komputer disebut...',
    options: [
      { key: 'A', text: 'Hardware' },
      { key: 'B', text: 'Software' },
      { key: 'C', text: 'Brainware' },
      { key: 'D', text: 'Spyware' },
    ],
    correctAnswer: 'C',
    explanation: 'Brainware adalah unsur manusia yang menjadi pemikir, pengoperasi, dan pengendali sistem komputer.',
  },
  {
    id: 10,
    category: 'software',
    isDiagnostic: true,
    question: 'Sistem operasi yang paling banyak digunakan di smartphone yang kamu gunakan sehari-hari umumnya berbasis...',
    options: [
      { key: 'A', text: 'Android atau iOS' },
      { key: 'B', text: 'Microsoft Excel' },
      { key: 'C', text: 'Adobe Photoshop' },
      { key: 'D', text: 'Google Chrome' },
    ],
    correctAnswer: 'A',
    explanation: 'Android dan iOS adalah sistem operasi (Operating System) khusus perangkat bergerak (smartphone/tablet).',
  },

  // ==========================================
  // 10 SOAL TAMBAHAN KHUSUS POST-TEST (No. 11 - 20)
  // Menguji pendalaman konsep setelah belajar materi
  // ==========================================
  {
    id: 11,
    category: 'hardware',
    isDiagnostic: false,
    question: 'Komponen yang sering dijuluki sebagai "Otak Komputer" karena bertugas memproses semua instruksi dan logika perhitungan adalah...',
    options: [
      { key: 'A', text: 'RAM' },
      { key: 'B', text: 'CPU (Processor)' },
      { key: 'C', text: 'Power Supply' },
      { key: 'D', text: 'Heatsink Fan' },
    ],
    correctAnswer: 'B',
    explanation: 'CPU (Central Processing Unit) atau prosesor adalah inti utama komputer yang bertindak seperti otak manusia, memproses dan mengeksekusi perintah.',
  },
  {
    id: 12,
    category: 'hardware',
    isDiagnostic: false,
    question: 'Memori komputer yang bersifat sementara (volatile), artinya data di dalamnya akan hilang saat komputer dimatikan atau listrik mati, adalah...',
    options: [
      { key: 'A', text: 'SSD / Harddisk' },
      { key: 'B', text: 'Flashdisk' },
      { key: 'C', text: 'RAM (Random Access Memory)' },
      { key: 'D', text: 'CD-ROM' },
    ],
    correctAnswer: 'C',
    explanation: 'RAM menyimpan data dan instruksi yang sedang aktif dijalankan aplikasi. Sifatnya sementara (volatile), berbeda dengan SSD yang permanen.',
  },
  {
    id: 13,
    category: 'hardware',
    isDiagnostic: false,
    question: 'Perhatikan daftar perangkat berikut: (1) Keyboard, (2) Mouse, (3) Scanner, (4) Mikrofon. Keempat perangkat tersebut termasuk ke dalam kelompok...',
    options: [
      { key: 'A', text: 'Input Device (Perangkat Masukan)' },
      { key: 'B', text: 'Output Device (Perangkat Keluaran)' },
      { key: 'C', text: 'Storage Device (Media Penyimpanan)' },
      { key: 'D', text: 'Processing Device (Perangkat Pemroses)' },
    ],
    correctAnswer: 'A',
    explanation: 'Semua perangkat tersebut berfungsi memasukkan data luar (teks, gerakan, dokumen cetak, dan gelombang suara) ke dalam komputer.',
  },
  {
    id: 14,
    category: 'hardware',
    isDiagnostic: false,
    question: 'Papan sirkuit elektronik utama yang menjadi tempat bertemunya dan terhubungnya seluruh komponen (CPU, RAM, VGA, Penyimpanan) dinamakan...',
    options: [
      { key: 'A', text: 'Motherboard (Papan Induk)' },
      { key: 'B', text: 'Keyboard' },
      { key: 'C', text: 'Monitor' },
      { key: 'D', text: 'Stabilizer' },
    ],
    correctAnswer: 'A',
    explanation: 'Motherboard (atau Mainboard) adalah sirkuit induk yang menyediakan jalur komunikasi data antar seluruh komponen komputer.',
  },
  {
    id: 15,
    category: 'hardware',
    isDiagnostic: false,
    question: 'Perangkat keras yang bertugas mengalirkan dan membagi daya listrik tegangan aman ke semua komponen komputer di dalam casing adalah...',
    options: [
      { key: 'A', text: 'GPU / Kartu Grafis' },
      { key: 'B', text: 'PSU (Power Supply Unit)' },
      { key: 'C', text: 'Sound Card' },
      { key: 'D', text: 'Modem' },
    ],
    correctAnswer: 'B',
    explanation: 'PSU (Power Supply) mengubah arus listrik bolak-balik (AC) dari colokan dinding menjadi arus searah (DC) dengan tegangan sesuai kebutuhan komputer.',
  },
  {
    id: 16,
    category: 'software',
    isDiagnostic: false,
    question: 'Sistem Operasi (seperti Windows 11 atau Linux) memiliki peran utama yang sangat krusial, yaitu...',
    options: [
      { key: 'A', text: 'Hanya untuk memutar musik dan video' },
      { key: 'B', text: 'Menjadi jembatan pengelola antara perangkat keras dengan aplikasi dan pengguna' },
      { key: 'C', text: 'Membuat casing komputer menjadi lebih dingin' },
      { key: 'D', text: 'Mencetak dokumen ke atas kertas' },
    ],
    correctAnswer: 'B',
    explanation: 'Tanpa Sistem Operasi, aplikasi seperti Word atau Game tidak akan bisa memerintahkan hardware komputer untuk bekerja.',
  },
  {
    id: 17,
    category: 'software',
    isDiagnostic: false,
    question: 'Aplikasi seperti Microsoft Word, Canva, Google Dokumen, dan Roblox dikelompokkan ke dalam jenis perangkat lunak...',
    options: [
      { key: 'A', text: 'Sistem Operasi' },
      { key: 'B', text: 'Perangkat Lunak Aplikasi (Application Software)' },
      { key: 'C', text: 'Driver Komponen' },
      { key: 'D', text: 'Firmware BIOS' },
    ],
    correctAnswer: 'B',
    explanation: 'Perangkat Lunak Aplikasi dibuat khusus untuk membantu menyelesaikan pekerjaan spesifik pengguna seperti mengetik, menggambar, berselancar web, atau hiburan.',
  },
  {
    id: 18,
    category: 'brainware',
    isDiagnostic: false,
    question: 'Seseorang yang memiliki keahlian menulis instruksi dan membuat kode logika bahasa pemrograman agar komputer dapat menjalankan tugas baru disebut...',
    options: [
      { key: 'A', text: 'Programmer / Pengembang Perangkat Lunak' },
      { key: 'B', text: 'Operator Rental' },
      { key: 'C', text: 'Teknisi Listrik' },
      { key: 'D', text: 'Gamer' },
    ],
    correctAnswer: 'A',
    explanation: 'Programmer adalah bagian dari Brainware yang menguasai sintaks bahasa pemrograman (seperti Python, JavaScript, C++) untuk menciptakan aplikasi.',
  },
  {
    id: 20, // Keep numbering clear
    category: 'general',
    isDiagnostic: false,
    question: 'Mengapa Sistem Komputer disebut sebagai "Sebuah Sistem yang Terpadu"?',
    options: [
      { key: 'A', text: 'Karena hanya membutuhkan perangkat keras yang mahal agar bisa bekerja sendiri' },
      { key: 'B', text: 'Karena Hardware, Software, dan Brainware harus saling bekerja sama dan tidak dapat dipisahkan' },
      { key: 'C', text: 'Karena komputer bisa mengetik tugas tanpa bantuan manusia' },
      { key: 'D', text: 'Karena bentuknya menyerupai TV' },
    ],
    correctAnswer: 'B',
    explanation: 'Sistem komputer terdiri dari 3 pilar: Hardware (mesin), Software (program), dan Brainware (manusia). Jika salah satu unsur tidak ada, komputer tidak akan berfungsi.',
  },
  {
    id: 19,
    category: 'brainware',
    isDiagnostic: false,
    question: 'Sikap yang bijak dan beretika sebagai seorang murid saat menggunakan komputer di laboratorium sekolah adalah...',
    options: [
      { key: 'A', text: 'Membawa makanan dan minuman ke atas keyboard komputer' },
      { key: 'B', text: 'Mengubah password komputer teman tanpa izin' },
      { key: 'C', text: 'Menjaga kebersihan perangkat, tidak merusak fasilitas, dan mematikan (shutdown) komputer sesuai prosedur' },
      { key: 'D', text: 'Mencabut kabel saat komputer sedang aktif menyimpan file' },
    ],
    correctAnswer: 'C',
    explanation: 'Etika digital dan perawatan perangkat laboratorium merupakan wujud tanggung jawab Brainware yang baik dan berintegritas.',
  },
];

// Helper untuk mengambil 10 soal diagnostik
export function getDiagnosticQuestions(): Question[] {
  return QUESTIONS.filter((q) => q.isDiagnostic);
}

// Helper untuk mengambil 20 soal post-test
export function getPostTestQuestions(): Question[] {
  return [...QUESTIONS].sort((a, b) => a.id - b.id);
}
