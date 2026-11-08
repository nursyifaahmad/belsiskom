const { execSync } = require('child_process');

function run(cmd) {
  try {
    return execSync(cmd, { stdio: 'inherit', encoding: 'utf-8' });
  } catch (err) {
    console.error(`Gagal menjalankan: ${cmd}`);
    throw err;
  }
}

try {
  console.log('==========================================================');
  console.log('🚀 Memulai sinkronisasi otomatis BELSISKOM ke GitHub...');
  console.log('==========================================================');

  // Check git status
  const status = execSync('git status --porcelain', { encoding: 'utf-8' }).trim();
  
  if (!status) {
    console.log('ℹ️ Tidak ada perubahan berkas baru. Repositori sudah mutakhir.');
    process.exit(0);
  }

  const customMsg = process.argv.slice(2).join(' ').trim();
  const timestamp = new Date().toLocaleString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const commitMsg = customMsg || `feat(belsiskom): pembaruan aplikasi dan materi [${timestamp}]`;

  console.log('📦 Menambahkan seluruh perubahan berkas (git add .)...');
  run('git add .');

  console.log(`📝 Membuat commit: "${commitMsg}"...`);
  run(`git commit -m "${commitMsg}"`);

  console.log('🌐 Mengunggah perubahan ke GitHub (git push origin main)...');
  run('git push origin main');

  console.log('==========================================================');
  console.log('✅ SUKSES! Kode BELSISKOM berhasil di-push ke GitHub!');
  console.log('🔗 URL: https://github.com/nursyifaahmad/belsiskom');
  console.log('==========================================================');
} catch (e) {
  console.error('❌ Terjadi kesalahan saat sinkronisasi:', e.message);
  process.exit(1);
}
