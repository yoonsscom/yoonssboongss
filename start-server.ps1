Write-Host "====================================" -ForegroundColor Cyan
Write-Host "   붕세권 웹 서버 시작" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Python 웹 서버를 시작합니다..." -ForegroundColor Yellow
Write-Host "브라우저에서 http://localhost:8000 을 열어주세요" -ForegroundColor Green
Write-Host ""
Write-Host "서버를 종료하려면 Ctrl+C를 누르세요" -ForegroundColor Yellow
Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

python -m http.server 8000

