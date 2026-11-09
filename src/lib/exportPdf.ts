import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatScore, getGainCategory } from './utils';

interface StudentExportRow {
  absentNo: number;
  name: string;
  className: string;
  diagScore: number | null;
  postScore: number | null;
  nGain: number | null;
  status: string;
}

export function generateReportPdf(
  students: StudentExportRow[],
  targetClass: string = 'Kelas 7',
  sessionCode: string = ''
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // 1. KOP SURAT RESMI
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.text('PEMERINTAH KABUPATEN CIREBON', pageWidth / 2, 16, { align: 'center' });
  doc.setFontSize(16);
  doc.text('SMP NEGERI 2 LEMAHABANG', pageWidth / 2, 23, { align: 'center' });
  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  doc.text('Jl. Raya Leuwidingding No. 02 Lemahabang, Cirebon - Jawa Barat', pageWidth / 2, 28, { align: 'center' });
  doc.text('Laman: belsiskom.an.my.id | Surel: smpn2lemahabang@gmail.com', pageWidth / 2, 32, { align: 'center' });

  // Garis Pembatas Kop
  doc.setLineWidth(0.8);
  doc.line(15, 35, pageWidth - 15, 35);
  doc.setLineWidth(0.2);
  doc.line(15, 36, pageWidth - 15, 36);

  // 2. JUDUL DOKUMEN
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('REKAPITULASI HASIL ASESMEN DIAGNOSTIK & SUMATIF', pageWidth / 2, 43, { align: 'center' });
  doc.setFontSize(11);
  doc.text('MEDIA PEMBELAJARAN BELSISKOM (SISTEM KOMPUTER)', pageWidth / 2, 48, { align: 'center' });

  // 3. INFORMASI KELAS & GURU
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const leftX = 15;
  doc.text(`Mata Pelajaran  : Informatika`, leftX, 56);
  doc.text(`Materi Pokok    : Sistem Komputer (HW, SW, Brainware)`, leftX, 61);
  doc.text(`Kelas / Rombel : ${targetClass}`, leftX, 66);

  const rightX = 120;
  doc.text(`Guru Pengampu  : Ahmad Nursyifa, S.Kom.`, rightX, 56);
  doc.text(`Tahun Ajaran     : 2026/2027`, rightX, 61);
  doc.text(`Kode Sesi Web   : ${sessionCode || 'Semua Sesi'}`, rightX, 66);

  // 4. TABEL NILAI
  const tableData = students.map((s, index) => {
    const diag = s.diagScore !== null ? formatScore(s.diagScore) : '-';
    const post = s.postScore !== null ? formatScore(s.postScore) : '-';
    const gain = s.nGain !== null ? s.nGain.toFixed(2) : '-';
    const category = s.nGain !== null ? getGainCategory(s.nGain).label.split(' ')[0] : '-';

    return [
      (index + 1).toString(),
      s.absentNo.toString(),
      s.name,
      s.className,
      diag,
      post,
      gain,
      category,
    ];
  });

  autoTable(doc, {
    startY: 72,
    head: [['No', 'Abs', 'Nama Siswa', 'Kelas', 'Diagnostik (10)', 'Post-Test (20)', 'N-Gain', 'Kategori']],
    body: tableData,
    theme: 'grid',
    styles: {
      fontSize: 8.5,
      cellPadding: 2,
      font: 'helvetica',
    },
    headStyles: {
      fillColor: [37, 99, 235], // Primary blue
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'center',
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 10 },
      1: { halign: 'center', cellWidth: 12 },
      2: { cellWidth: 'auto' },
      3: { halign: 'center', cellWidth: 15 },
      4: { halign: 'center', cellWidth: 26 },
      5: { halign: 'center', cellWidth: 26 },
      6: { halign: 'center', cellWidth: 18 },
      7: { halign: 'center', cellWidth: 24 },
    },
    margin: { left: 15, right: 15 },
  });

  // 5. STATISTIK RINGKASAN
  const validPost = students.filter((s) => s.postScore !== null);
  const avgPost = validPost.length > 0
    ? (validPost.reduce((acc, cur) => acc + (cur.postScore || 0), 0) / validPost.length).toFixed(1)
    : '0';

  const validDiag = students.filter((s) => s.diagScore !== null);
  const avgDiag = validDiag.length > 0
    ? (validDiag.reduce((acc, cur) => acc + (cur.diagScore || 0), 0) / validDiag.length).toFixed(1)
    : '0';

  let finalY = (doc as any).lastAutoTable.finalY + 8;
  if (finalY > 240) {
    doc.addPage();
    finalY = 20;
  }

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(`Total Siswa: ${students.length} Orang | Rata-rata Diagnostik: ${avgDiag} | Rata-rata Post-Test: ${avgPost}`, 15, finalY);

  // 6. TANDA TANGAN GURU
  finalY += 12;
  if (finalY > 250) {
    doc.addPage();
    finalY = 20;
  }

  const dateStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  doc.setFont('helvetica', 'normal');
  doc.text(`Lemahabang, ${dateStr}`, pageWidth - 70, finalY);
  doc.text('Guru Mata Pelajaran Informatika,', pageWidth - 70, finalY + 5);

  doc.setFont('helvetica', 'bold');
  doc.text('Ahmad Nursyifa, S.Kom.', pageWidth - 70, finalY + 28);

  // Simpan/Unduh file
  doc.save(`BELSISKOM_Nilai_${targetClass.replace(/\s+/g, '_')}_${Date.now()}.pdf`);
}
