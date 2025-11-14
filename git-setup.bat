@echo off
echo ====================================
echo    Git 초기화 및 설정
echo ====================================
echo.

echo [1/4] Git 초기화 중...
git init
if %errorlevel% neq 0 (
    echo 오류: Git이 설치되어 있지 않습니다.
    echo Git을 설치해주세요: https://git-scm.com/
    pause
    exit /b 1
)

echo.
echo [2/4] 파일 추가 중...
git add .

echo.
echo [3/4] 첫 커밋 생성 중...
git commit -m "Initial commit: 붕세권 프로젝트 시작"

echo.
echo [4/4] Git 상태 확인...
git status

echo.
echo ====================================
echo    Git 설정 완료!
echo ====================================
echo.
echo 다음 단계:
echo 1. GitHub에 Repository 생성
echo 2. git remote add origin [GitHub URL]
echo 3. git push -u origin main
echo.
echo 자세한 내용은 Git설정가이드.md를 참고하세요.
echo.
pause

