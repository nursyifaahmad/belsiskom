export interface LearningStep {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  iconName: string;
  estimatedMinutes: number;
  sections: {
    heading: string;
    subheading?: string;
    bodyParagraphs: string[];
    analogyBox?: {
      title: string;
      content: string;
      badgeText: string;
    };
    keyPoints?: string[];
    diagramType?: 'trinity' | 'hardware_flow' | 'software_tree' | 'brainware_roles';
  }[];
  validationQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    encouragement: string;
  };
}

export const LEARNING_STEPS: LearningStep[] = [
  // ==========================================
  // LANGKAH 1: KONSEP & TRINITAS SISTEM KOMPUTER
  // ==========================================
  {
    id: 'intro-trinity',
    stepNumber: 1,
    title: 'Mengenal Sistem Komputer',
    subtitle: 'Tiga Sahabat Karib: Hardware, Software, & Brainware',
    iconName: 'Laptop',
    estimatedMinutes: 5,
    sections: [
      {
        heading: 'Halo Calon Ahli Informatika SMP!',
        bodyParagraphs: [
          'Selamat datang di mata pelajaran Informatika! Mungkin sewaktu di SD kamu belum pernah belajar tentang apa itu komputer secara mendalam. Jangan khawatir, kita akan belajar bersama langkah demi langkah dari nol!',
          'Tahukah kamu, kata "Komputer" berasal dari bahasa Latin "Computare" yang artinya "Menghitung". Dahulu komputer berukuran sebesar satu ruangan kelas hanya untuk menghitung rumus matematika. Sekarang, komputer sudah sangat ringkas dan ada di meja belajar bahkan di genggaman tanganmu!',
        ],
      },
      {
        heading: 'Tiga Serangkai: Trinitas Sistem Komputer',
        subheading: 'Mengapa komputer disebut sebuah "Sistem"?',
        bodyParagraphs: [
          'Sebuah komputer tidak bisa bekerja sendirian hanya dengan mesinnya saja. Komputer disebut "Sistem" karena dibangun oleh tiga pilar utama yang saling melengkapi:',
        ],
        diagramType: 'trinity',
        keyPoints: [
          '1. Hardware (Perangkat Keras): Fisik mesin komputer yang bisa kamu lihat, sentuh, dan raba.',
          '2. Software (Perangkat Lunak): Program digital dan instruksi yang tidak berwujud fisik, tapi menjalankan fungsi tertentu.',
          '3. Brainware (Pengguna/Manusia): Manusia berakal sehat yang mengoperasikan dan mengendalikan komputer.',
        ],
        analogyBox: {
          badgeText: '💡 Analogi Sahabat',
          title: 'Ibarat Tubuh Manusia',
          content: 'Bayangkan dirimu sendiri: Tubuh, tangan, mata, dan otak fisikmu adalah Hardware. Pengetahuan, bahasa, dan aturan sopan santun di kepalamu adalah Software. Dan Jiwa atau kemauanmu yang menggerakkan tubuh adalah Brainware! Jika salah satu hilang, manusia tidak bisa beraktivitas. Begitu pula komputer!',
        },
      },
    ],
    validationQuiz: {
      question: 'Jika kamu membeli sebuah laptop paling mahal di dunia yang sudah lengkap terpasang Windows dan game canggih, namun tidak ada satu pun manusia yang menyalakan dan memainkannya, apa yang terjadi?',
      options: [
        'Laptop akan bermain sendiri secara otomatis',
        'Laptop tetap tidak berguna karena tidak ada Brainware (manusia) yang mengendalikannya',
        'Laptop berubah menjadi robot',
        'Software akan hilang dengan sendirinya',
      ],
      correctIndex: 1,
      explanation: 'Benar sekali! Komputer secanggih apa pun hanyalah benda mati tanpa kehadiran Brainware (manusia) yang memberikan perintah.',
      encouragement: 'Hebat! Pemahaman awalmu tentang Sistem Komputer sudah sangat tepat!',
    },
  },

  // ==========================================
  // LANGKAH 2: PERANGKAT KERAS (HARDWARE)
  // ==========================================
  {
    id: 'hardware-deep-dive',
    stepNumber: 2,
    title: 'Menjelajahi Dunia Hardware',
    subtitle: '4 Pilar Komponen Fisik: Masukan, Pemroses, Penyimpan, & Keluaran',
    iconName: 'Cpu',
    estimatedMinutes: 8,
    sections: [
      {
        heading: 'Siklus I-P-O-S (Input - Process - Output - Storage)',
        bodyParagraphs: [
          'Setiap kali kamu mengetik pesan atau bermain game, komputer selalu bekerja dalam pola 4 tahap utama yang berputar terus-menerus:',
        ],
        diagramType: 'hardware_flow',
        keyPoints: [
          '📥 1. Input Device (Perangkat Masukan): Alat untuk memasukkan perintah/data. Contoh: Keyboard (ketik teks), Mouse (klik/kursor), Mikrofon (suara), Webcam (gambar).',
          '⚙️ 2. Processing Device (Perangkat Pemroses): Otak yang mengolah data. Contoh: CPU (Central Processing Unit) dan GPU (Kartu Grafis).',
          '💾 3. Storage Device (Media Penyimpanan): Tempat menyimpan data. Terdiri dari RAM (memori kerja sementara) dan SSD/Harddisk (gudang file permanen).',
          '📤 4. Output Device (Perangkat Keluaran): Alat menampilkan hasil olahan data kepada kita. Contoh: Monitor (visual), Speaker/Headset (audio), Printer (cetakan kertas).',
        ],
        analogyBox: {
          badgeText: '💡 Perbedaan RAM vs SSD',
          title: 'Meja Belajar vs Lemari Arsip',
          content: 'RAM itu seperti "Meja Belajar": buku tugas yang sedang kamu buka ditaruh di atas meja agar cepat dibaca. Kalau meja penuh, kamu pusing (komputer lemot). Saat tidur/lampu mati, meja dibersihkan (RAM hilang). Sedangkan SSD/Harddisk adalah "Lemari Buku": tempat menyimpan buku tugas selamanya meski kamu sudah tidur berminggu-minggu!',
        },
      },
    ],
    validationQuiz: {
      question: 'Seorang murid ingin merekam suaranya saat bernyanyi ke dalam komputer, lalu mendengarkan kembali suaranya melalui headphone. Perangkat Input dan Output yang digunakan berturut-turut adalah...',
      options: [
        'Monitor dan Keyboard',
        'Mikrofon (Input) dan Headphone (Output)',
        'Mouse dan Printer',
        'Speaker dan Webcam',
      ],
      correctIndex: 1,
      explanation: 'Tepat! Mikrofon bertindak sebagai Input pengambil gelombang suara, sedangkan Headphone menjadi Output penghasil suara ke telinga.',
      encouragement: 'Keren! Kamu sudah bisa membedakan perangkat Masukan (Input) dan Keluaran (Output)!',
    },
  },

  // ==========================================
  // LANGKAH 3: SIMULASI PERAKITAN PC
  // ==========================================
  {
    id: 'pc-assembly-simulator',
    stepNumber: 3,
    title: 'Laboratorium Mini: Rakit Komputer',
    subtitle: 'Pasang Komponen ke Papan Induk (Motherboard) secara Mandiri!',
    iconName: 'Wrench',
    estimatedMinutes: 7,
    sections: [
      {
        heading: 'Saatnya Menjadi Teknisi Komputer Cilik!',
        bodyParagraphs: [
          'Sekarang kamu sudah mengenal komponen fisik komputer. Tapi bagaimana cara mereka bersatu di dalam sebuah casing komputer?',
          'Papan sirkuit paling besar di dalam komputer disebut Motherboard (Papan Induk). Di papan inilah semua komponen penting dicolokkan agar bisa saling berkomunikasi!',
          'Gunakan simulasi interaktif di bawah ini untuk memasang CPU, Kipas Heatsink, RAM, SSD, VGA, dan Power Supply ke tempatnya yang benar!',
        ],
      },
    ],
    validationQuiz: {
      question: 'Mengapa Kipas Pendingin (Heatsink Fan) harus dipasang tepat menempel di atas Processor (CPU)?',
      options: [
        'Agar komputer mengeluarkan wewangian',
        'Karena CPU bekerja sangat cepat sehingga menghasilkan panas tinggi dan perlu didinginkan agar tidak rusak',
        'Hanya sebagai hiasan lampu kelap-kelip',
        'Supaya keyboard bisa mengetik lebih cepat',
      ],
      correctIndex: 1,
      explanation: 'Betul! Processor memiliki miliaran transistor mini yang berdenyut miliaran kali per detik, menghasilkan panas tinggi yang wajib dibuang oleh pendingin.',
      encouragement: 'Luar biasa! Simulasi perakitan PC telah berhasil kamu kuasai!',
    },
  },

  // ==========================================
  // LANGKAH 4: PERANGKAT LUNAK (SOFTWARE)
  // ==========================================
  {
    id: 'software-deep-dive',
    stepNumber: 4,
    title: 'Menjelajahi Dunia Software',
    subtitle: 'Dari Sistem Operasi Pengatur Nyawa hingga Aplikasi Sehari-hari',
    iconName: 'Layers',
    estimatedMinutes: 6,
    sections: [
      {
        heading: 'Software: Nyawa dan Perintah Komputer',
        bodyParagraphs: [
          'Tanpa software, monitor komputermu hanya akan menampilkan layar hitam kosong tanpa arti. Software terbagi menjadi 3 jenis utama:',
        ],
        diagramType: 'software_tree',
        keyPoints: [
          '🛡️ 1. Sistem Operasi (Operating System / OS): Komandan tertinggi yang menghubungkan hardware dengan pengguna. Contoh di PC: Windows 10/11, macOS, Linux. Contoh di HP: Android, iOS.',
          '📱 2. Perangkat Lunak Aplikasi (Application Software): Program untuk melakukan tugas spesifik manusia. Contoh: Microsoft Word (mengetik surat), Google Chrome (internet), Canva (desain poster), CapCut (edit video).',
          '🧹 3. Perangkat Lunak Utilitas (Utility Software): Aplikasi pembantu pemeliharaan komputer. Contoh: Antivirus (Windows Defender, Smadav), WinRAR (pemampat file).',
        ],
        analogyBox: {
          badgeText: '💡 Lisensi Software',
          title: 'Open Source vs Komersial Berbayar',
          content: 'Ada software gratis yang kodenya terbuka untuk dipelajari semua orang (disebut Open Source, contohnya sistem operasi Linux, browser Firefox). Ada juga yang berbayar dan berhak cipta ketat (Proprietary / Komersial, seperti Windows dan Microsoft Office). Sebagai murid berintegritas, kita tidak boleh menggunakan software bajakan!',
        },
      },
    ],
    validationQuiz: {
      question: 'Manakah di bawah ini pasangan Sistem Operasi dan Aplikasi yang benar?',
      options: [
        'Sistem Operasi: Microsoft Excel, Aplikasi: Windows 11',
        'Sistem Operasi: Android, Aplikasi: WhatsApp',
        'Sistem Operasi: Mouse, Aplikasi: Keyboard',
        'Sistem Operasi: Speaker, Aplikasi: Monitor',
      ],
      correctIndex: 1,
      explanation: 'Tepat sekali! Android adalah Sistem Operasi yang mengelola smartphone, sedangkan WhatsApp adalah Aplikasi pesan yang berjalan di atas Android.',
      encouragement: 'Mantap! Sekarang kamu paham hierarki Sistem Operasi dan Aplikasi!',
    },
  },

  // ==========================================
  // LANGKAH 5: PENGGUNA (BRAINWARE) & ETIKA
  // ==========================================
  {
    id: 'brainware-and-ethics',
    stepNumber: 5,
    title: 'Pengguna Komputer (Brainware) & Etika Digital',
    subtitle: 'Mengenal Peran Manusia dan Menjadi Warga Digital yang Bijak',
    iconName: 'Users',
    estimatedMinutes: 5,
    sections: [
      {
        heading: 'Brainware: Sang Pengendali Utama',
        bodyParagraphs: [
          'Komputer sehebat apapun tidak memiliki akal dan perasaan. Manusia-lah yang menjadi penentu apakah teknologi ini menghasilkan kebaikan atau keburukan.',
        ],
        diagramType: 'brainware_roles',
        keyPoints: [
          '👤 1. User / Operator: Orang yang menggunakan komputer untuk tugas sehari-hari (seperti murid belajar online, kasir toko mencatat barang).',
          '💻 2. Programmer: Orang yang menulis kode dan merancang aplikasi baru menggunakan bahasa komputer.',
          '🌐 3. Network Administrator: Orang yang menjaga agar internet dan jaringan kabel di sekolah tetap lancar dan aman.',
          '🔍 4. System Analyst: Orang yang merancang dan menganalisis kebutuhan sistem sebelum dibuat oleh programmer.',
        ],
        analogyBox: {
          badgeText: '⭐ Karakter Pelajar Pancasila',
          title: 'Etika di Laboratorium Komputer SMP',
          content: '1. Tidak membawa makanan dan minuman di dekat keyboard.\n2. Menjaga kerahasiaan kata sandi (password) pribadi.\n3. Mematikan (Shut Down) komputer sesuai prosedur yang benar sebelum keluar lab.\n4. Menggunakan internet secara bijak untuk belajar dan berkarya, bukan menyebar hoax atau merugikan teman.',
        },
      },
    ],
    validationQuiz: {
      question: 'Setelah selesai pelajaran Informatika di lab komputer sekolah, tindakan seorang murid yang mencerminkan Brainware beretika baik adalah...',
      options: [
        'Langsung mencabut colokan listrik dari tembok saat komputer masih menyala',
        'Menyimpan file tugas, menutup semua aplikasi, melakukan Shut Down secara resmi, dan merapikan kursi',
        'Mengubah wallpaper komputer lab dengan foto yang tidak pantas',
        'Meninggalkan sampah plastik minuman di samping CPU',
      ],
      correctIndex: 1,
      explanation: 'Sempurna! Mematikan komputer melalui tombol Shut Down pada menu Windows menjaga agar harddisk/SSD tidak rusak dan sistem tetap awet.',
      encouragement: 'Selamat! Kamu telah menyelesaikan seluruh materi pembelajaran BELSISKOM dan siap untuk Post-Test!',
    },
  },
];
