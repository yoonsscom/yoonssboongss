@echo off
echo ====================================
echo    붕세권 웹 서버 시작
echo ====================================
echo.
echo Python 웹 서버를 시작합니다...
echo 브라우저에서 http://localhost:8000 을 열어주세요
echo.
echo 서버를 종료하려면 Ctrl+C를 누르세요
echo.
echo ====================================
echo.

python -m http.server 8000

pause

