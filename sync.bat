@echo off
echo ==========================================================
echo    BELSISKOM - Sinkronisasi Otomatis ke GitHub
echo    Guru Pengampu: Ahmad Nursyifa, S.Pd.
echo ==========================================================
git add .
set /p commit_msg="Masukkan pesan pembaruan (tekan Enter untuk pesan otomatis): "
if "%commit_msg%"=="" (
  node scripts/auto-sync.js
) else (
  node scripts/auto-sync.js "%commit_msg%"
)
echo.
pause
