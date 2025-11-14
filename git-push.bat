@echo off
chcp 65001 >nul
echo ====================================
echo    GitHub 푸시 가이드
echo ====================================
echo.

echo [1/5] Git 상태 확인...
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo Git이 초기화되지 않았습니다. 초기화 중...
    git init
    if %errorlevel% neq 0 (
        echo 오류: Git이 설치되어 있지 않습니다.
        echo Git을 설치해주세요: https://git-scm.com/
        pause
        exit /b 1
    )
)

echo.
echo [2/5] 파일 추가 중...
git add .

echo.
echo [3/5] 커밋 중...
git commit -m "Initial commit: 붕세권 프로젝트" 2>nul
if %errorlevel% neq 0 (
    echo 이미 커밋된 파일이 있거나 변경사항이 없습니다.
)

echo.
echo [4/5] 원격 저장소 확인...
git remote -v >nul 2>&1
if %errorlevel% neq 0 (
    echo 원격 저장소가 설정되지 않았습니다.
    echo.
    echo 다음 단계를 진행하세요:
    echo 1. GitHub에서 Repository 생성
    echo 2. 아래 명령어 실행:
    echo    git remote add origin https://github.com/사용자명/저장소명.git
    echo    git branch -M main
    echo    git push -u origin main
    echo.
    pause
    exit /b 0
)

echo.
echo [5/5] GitHub에 푸시 중...
echo GitHub 사용자명과 비밀번호(또는 토큰)를 입력하세요.
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ====================================
    echo    푸시 완료!
    echo ====================================
) else (
    echo.
    echo ====================================
    echo    푸시 실패
    echo ====================================
    echo.
    echo 확인 사항:
    echo 1. GitHub Repository가 생성되었는지
    echo 2. 원격 저장소 URL이 올바른지
    echo 3. GitHub 인증 정보가 올바른지
    echo.
    echo 자세한 내용은 GitHub푸시가이드.md를 참고하세요.
)

echo.
pause

