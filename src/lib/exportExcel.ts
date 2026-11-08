import * as XLSX from 'xlsx';
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

export function generateReportExcel(
  students: StudentExportRow[],
  targetClass: string = 'Kelas 7',
  sessionCode: string = ''
) {
  // Format Data Rows
  const rows = students.map((s, idx) => ({
    'No': idx + 1,
    'No. Absen': s.absentNo,
    'Nama Lengkap Siswa': s.name,
    'Kelas': s.className,
    'Nilai Diagnostik (10 Soal)': s.diagScore !== null ? s.diagScore : 0,
    'Nilai Post-Test (20 Soal)': s.postScore !== null ? s.postScore : 0,
    'Skor N-Gain (Peningkatan)': s.nGain !== null ? s.nGain : 0,
    'Kategori Peningkatan': s.nGain !== null ? getGainCategory(s.nGain).label : 'Belum Selesai',
    'Status Pengerjaan': s.status,
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Set column widths
  worksheet['!cols'] = [
    { wch: 6 },  // No
    { wch: 10 }, // Absen
    { wch: 30 }, // Nama
    { wch: 10 }, // Kelas
    { wch: 25 }, // Diag
    { wch: 25 }, // Post
    { wch: 24 }, // N-Gain
    { wch: 24 }, // Kategori
    { wch: 18 }, // Status
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, `Rekap_${targetClass}`);

  const fileName = `BELSISKOM_Nilai_${targetClass.replace(/\s+/g, '_')}_${Date.now()}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}
