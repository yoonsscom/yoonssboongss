# 🔗 GitHub 연결 단계별 가이드

## 현재 위치에서 바로 시작하기

### 1단계: Git 초기화

**Cursor에서:**
1. `Ctrl + Shift + G` (소스 제어 패널 열기)
2. "Initialize Repository" 버튼 클릭
   - 또는 터미널에서: `git init`

### 2단계: 파일 추가 및 커밋

**Cursor에서:**
1. 소스 제어 패널에서 "Stage All Changes" 클릭
   - 또는 터미널에서: `git add .`
2. 커밋 메시지 입력: `Initial commit: 붕세권 프로젝트`
3. `Ctrl + Enter` (커밋)
   - 또는 터미널에서: `git commit -m "Initial commit: 붕세권 프로젝트"`

### 3단계: GitHub Repository 생성

1. **브라우저에서 GitHub 접속**: https://github.com
2. **우측 상단 "+" 버튼** → **"New repository"** 클릭
3. **Repository 정보 입력**:
   - Repository name: `boongseogwon` (또는 원하는 이름)
   - Description: "붕어빵 가게 정보 제공 모바일 웹앱"
   - Public 선택
   - **"Initialize this repository with a README" 체크 해제**
4. **"Create repository"** 클릭

### 4단계: 원격 저장소 연결

**Cursor에서:**
1. `Ctrl + Shift + P` (명령 팔레트)
2. "Git: Add Remote" 입력
3. Remote name: `origin`
4. Remote URL: `https://github.com/사용자명/저장소명.git`
   - 예: `https://github.com/yourusername/boongseogwon.git`

**또는 터미널에서:**
```bash
git remote add origin https://github.com/사용자명/저장소명.git
```

### 5단계: 푸시

**Cursor에서:**
1. 소스 제어 패널에서 "..." 메뉴 클릭
2. "Push" 선택
   - 또는 `Ctrl + Shift + P` → "Git: Push"

**또는 터미널에서:**
```bash
git branch -M main
git push -u origin main
```

## ⚠️ GitHub 인증

푸시 시 인증이 필요합니다:

### Personal Access Token 사용

1. **GitHub에서 토큰 생성**:
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - "Generate new token (classic)" 클릭
   - Note: "붕세권 프로젝트"
   - 권한: `repo` 체크
   - "Generate token" 클릭
   - **토큰 복사** (한 번만 보여줌!)

2. **푸시 시 사용**:
   - Username: GitHub 사용자명
   - Password: 생성한 토큰 (비밀번호 아님!)

## 🎯 빠른 체크리스트

- [ ] Git 초기화 (`git init` 또는 Cursor에서 "Initialize Repository")
- [ ] 파일 추가 (`git add .` 또는 "Stage All Changes")
- [ ] 첫 커밋 (`git commit -m "..."` 또는 Cursor에서 커밋)
- [ ] GitHub에서 Repository 생성
- [ ] 원격 저장소 추가 (`git remote add origin ...`)
- [ ] 푸시 (`git push -u origin main`)

## 💡 Cursor에서 더 쉽게

1. **소스 제어 패널**: `Ctrl + Shift + G`
2. **모든 변경사항 자동 감지**
3. **시각적으로 파일 확인 가능**
4. **원클릭으로 스테이징 및 커밋**

## 문제 해결

### "fatal: not a git repository"
→ `git init` 먼저 실행

### "Authentication failed"
→ Personal Access Token 사용

### "remote origin already exists"
→ `git remote remove origin` 후 다시 추가



