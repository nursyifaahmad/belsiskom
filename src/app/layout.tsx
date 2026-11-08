import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BELSISKOM - Belajar Sistem Komputer SMP',
  description: 'Media Pembelajaran Terpadu Sistem Komputer (Hardware, Software, Brainware) untuk Murid SMP Kelas 7 - Guru: Ahmad Nursyifa, S.Pd.',
  keywords: ['BELSISKOM', 'Sistem Komputer', 'Informatika SMP', 'Hardware', 'Software', 'Brainware', 'SMPN 2 Lemahabang'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-100 text-slate-900 antialiased selection:bg-blue-200">
        {children}
      </body>
    </html>
  );
}
