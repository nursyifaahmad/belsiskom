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
    subtitle: 'Pengertian, Karakteristik Fisik, & 5 Pilar Utama: Input, Process, Storage, Output, dan Communication',
    iconName: 'Cpu',
    estimatedMinutes: 9,
    sections: [
      {
        heading: '1. Apa Itu Hardware (Perangkat Keras)?',
        subheading: 'Mengenal Raga Fisik Komputer dari Dekat',
        bodyParagraphs: [
          'Hardware (Perangkat Keras) adalah seluruh komponen fisik nyata dari sistem komputer yang dapat dilihat dengan mata telanjang, dapat diraba atau disentuh langsung dengan tangan, dan memerlukan aliran arus listrik searah (DC) untuk beroperasi.',
          'Jika komputer diibaratkan seperti manusia, Hardware adalah raga fisik tubuh kita: tulang, tangan, mata, telinga, dan organ otak fisik. Tanpa Software (jiwa dan pikiran), Hardware hanyalah sekumpulan benda mati yang terbuat dari logam, tembaga, dan plastik.',
          'Sebagian besar komponen pemroses modern dibuat dari bahan semikonduktor silikon (berasal dari pemurnian pasir kuarsa) yang dirangkai menjadi jutaan hingga miliaran sakelar super mikroskopis bernama transistor.',
        ],
        keyPoints: [
          '👁️ Berwujud Fisik Nyata: Memiliki bentuk, dimensi ruang (panjang x lebar x tinggi), serta massa/berat yang bisa dipegang.',
          '⚡ Membutuhkan Arus Listrik: Bekerja menggunakan daya listrik DC tegangan aman yang dialirkan dan distabilkan oleh Power Supply (PSU).',
          '🛡️ Perawatan Fisik Wajib: Rentan terhadap debu kotor, suhu panas berlebih (overheating), tumpahan cairan, dan benturan fisik.',
        ],
      },
      {
        heading: '2. 5 Pilar Jenis Hardware Komputer',
        subheading: 'Klasifikasi Komponen Berdasarkan Peran & Fungsinya',
        bodyParagraphs: [
          'Untuk menyelesaikan tugas dan membantu pekerjaan manusia, perangkat keras komputer diklasifikasikan ke dalam 5 pilar fungsional utama:',
        ],
        keyPoints: [
          '📥 1. Perangkat Masukan (Input Device): Alat untuk menangkap dan memasukkan data mentah, teks, suara, gambar, atau perintah gerak dari manusia ke dalam format biner digital (0 dan 1). Contoh: Keyboard (ketik teks & pintasan), Mouse / Touchpad (penunjuk kursor), Mikrofon (suara), Scanner (pindai dokumen cetak), Webcam (kamera video).',
          '⚙️ 2. Perangkat Pemroses (Processing Device): Otak inti komputer yang mengolah data, menghitung kalkulasi logika matematika (ALU - Arithmetic Logic Unit), dan mengendalikan alur instruksi (CU - Control Unit). Terdiri dari CPU (Central Processing Unit), GPU (Kartu Grafis untuk visual game/animasi), dan Motherboard (Papan Induk penghubung semua sirkuit).',
          '💾 3. Media Penyimpanan (Storage Device): Tempat menyimpan instruksi program dan berkas digital pengguna. Terbagi menjadi: Memori Primer (RAM yang bersifat Volatile / sementara; ROM untuk booting awal) dan Memori Sekunder (SSD, Harddisk HDD, dan Flashdisk USB yang bersifat Non-Volatile / permanen selamanya).',
          '📤 4. Perangkat Keluaran (Output Device): Menerjemahkan data digital yang telah diproses oleh komputer kembali menjadi informasi yang bisa dilihat, didengar, atau dirasakan manusia. Contoh: Monitor (layar tampilan visual antarmuka), Speaker & Headset (audio & suara), Printer (mencetak teks ke kertas fisik), Proyektor (sorotan layar besar di ruang kelas).',
          '📡 5. Perangkat Komunikasi & Jaringan (Communication Device): Perangkat keras yang memungkinkan satu komputer terhubung, bertukar berkas, dan berkomunikasi dengan komputer lain atau ke jaringan internet global. Contoh: Wi-Fi Router (pemancar internet nirkabel), Modem (pengubah sinyal internet ISP), Kartu Jaringan NIC / LAN Card (port kabel Ethernet RJ-45), dan Switch.',
        ],
      },
      {
        heading: '3. Siklus Terpadu I-P-O-S-C',
        subheading: 'Harmoni Kerja Kelima Pilar Hardware dalam Kehidupan Nyata',
        bodyParagraphs: [
          'Setiap kali kamu menggunakan HP atau komputer di sekolah, kelima pilar hardware selalu bekerja dalam sebuah siklus berantai yang disebut I-P-O-S-C (Input - Process - Output - Storage - Communication):',
          'Contoh Nyata di Kelas: (1) Jarimu mengetik jawaban tugas di Keyboard (Input) ➔ (2) Processor mengolah kode huruf dan rumus dalam nanodetik (Process) ➔ (3) Huruf dan gambar langsung tampak jelas di Layar Monitor (Output) ➔ (4) File tugas disimpan aman di SSD (Storage) ➔ (5) Terakhir, tugas tersebut dikirimkan ke portal guru Ahmad Nursyifa melalui gelombang nirkabel Wi-Fi Router (Communication).',
        ],
        analogyBox: {
          badgeText: '💡 Analogi Tiga Serangkai Simpan & Kirim',
          title: 'Meja Belajar vs Lemari Buku vs Kurir Paket',
          content: '• RAM ibarat Meja Belajar: Buku tugas yang sedang aktif kamu baca ditaruh di atas meja agar cepat dijangkau tangan. Saat lampu mati atau selesai belajar, meja dibersihkan (data RAM hilang).\n• SSD / Harddisk ibarat Lemari Buku: Tempat menyimpan seluruh dokumen tugasmu selamanya secara permanen dan aman meski kamu tidur berminggu-minggu.\n• Router Komunikasi ibarat Kurir Paket / Kantor Pos: Mengantarkan surat tugasmu dari mejamu menyeberangi kota hingga sampai ke komputer guru di internet!',
        },
      },
      {
        heading: '4. Laboratorium Interaktif 3D 360°',
        subheading: 'Sentuh, Putar, dan Bedah Anatomi Fisik Kelima Hardware',
        bodyParagraphs: [
          'Di bawah ini, Pak Ahmad telah menyiapkan model 3 dimensi (3D) interaktif untuk kelima kategori hardware.',
          'Gunakan sentuhan jarimu di smartphone (atau geser klik mouse di komputer) untuk memutar perangkat 360 derajat ke segala sudut! Gunakan tombol perbesar (zoom) untuk mengamati detail pin konektor emas, sirkuit microchip, tombol fisik, hingga antena pemancar sinyal.',
        ],
      },
    ],
    validationQuiz: {
      question: 'Pak Ahmad menugaskan murid kelas 7 mencari materi Sistem Komputer di internet menggunakan laptop laboratorium sekolah. Agar laptop tersebut dapat menangkap sinyal internet sekolah tanpa menggunakan kabel (nirkabel), perangkat keras kategori manakah yang bertugas menjalankan fungsi tersebut?',
      options: [
        'Processing Device (contoh: CPU Processor)',
        'Storage Device (contoh: Harddisk HDD)',
        'Communication Device (contoh: Wi-Fi Card / Wireless Adapter)',
        'Output Device (contoh: Layar Monitor)',
      ],
      correctIndex: 2,
      explanation: 'Tepat sekali! Communication Device (Perangkat Komunikasi & Jaringan) seperti Wi-Fi Adapter, Router, dan Modem bertugas menghubungkan komputer ke jaringan internet nirkabel maupun kabel.',
      encouragement: 'Luar biasa! Pemahamanmu tentang 5 Pilar Hardware dan fungsinya sudah sangat matang!',
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
