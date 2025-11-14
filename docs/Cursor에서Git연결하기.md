# 🔗 Cursor에서 Git 연결하기

## Cursor의 Git 기능

Cursor는 VS Code 기반이므로 Git이 내장되어 있습니다. 터미널 없이도 Git을 사용할 수 있습니다!

## 방법 1: Cursor 내장 Git 사용 (가장 쉬움) ⭐⭐⭐

### 1단계: Git 초기화

1. **Cursor에서 프로젝트 폴더 열기**
   - File → Open Folder → "붕세권" 폴더 선택

2. **소스 제어 패널 열기**
   - 왼쪽 사이드바에서 **소스 제어 아이콘** 클릭 (또는 `Ctrl + Shift + G`)
   - 또는 상단 메뉴: View → Source Control

3. **"Initialize Repository" 클릭**
   - 소스 제어 패널에서 "Initialize Repository" 버튼 클릭
   - 또는 터미널에서 `git init` 실행

### 2단계: 파일 스테이징 (추가)

1. **소스 제어 패널에서 변경된 파일 확인**
   - 모든 파일이 "Changes" 섹션에 표시됨

2. **파일 추가**
   - 각 파일 옆의 **"+" 버튼** 클릭하여 스테이징
   - 또는 **"Stage All Changes"** 클릭하여 모든 파일 추가

### 3단계: 첫 커밋

1. **커밋 메시지 입력**
   - 상단의 메시지 입력창에: `Initial commit: 붕세권 프로젝트`

2. **커밋 버튼 클릭**
   - `Ctrl + Enter` 또는 커밋 버튼 클릭

### 4단계: GitHub와 연결

#### GitHub Repository 생성

1. **GitHub 접속**: https://github.com
2. **"New repository"** 클릭
3. **Repository 정보 입력**:
   - Repository name: `boongseogwon` (또는 원하는 이름)
   - Public 선택
   - **"Initialize this repository with a README" 체크 해제**
4. **"Create repository"** 클릭

#### Cursor에서 원격 저장소 연결

1. **소스 제어 패널에서 "..." 메뉴 클릭**
   - 또는 `Ctrl + Shift + P` → "Git: Add Remote" 입력

2. **원격 저장소 추가**
   - Remote name: `origin`
   - Remote URL: `https://github.com/사용자명/저장소명.git`
   - 예: `https://github.com/yourusername/boongseogwon.git`

3. **푸시**
   - 소스 제어 패널에서 **"..." 메뉴** → **"Push"** 선택
   - 또는 `Ctrl + Shift + P` → "Git: Push" 입력

## 방법 2: Cursor 터미널 사용

### 1단계: 터미널 열기

- `Ctrl + `` (백틱) 또는
- Terminal → New Terminal

### 2단계: Git 명령어 실행

```bash
# Git 초기화
git init

# 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: 붕세권 프로젝트"

# GitHub와 연결
git remote add origin https://github.com/사용자명/저장소명.git

# 브랜치 이름 변경 (필요시)
git branch -M main

# 푸시
git push -u origin main
```

## 방법 3: Git 설정 (처음만)

### Git 사용자 정보 설정

터미널에서:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

또는 Cursor 설정에서:
- `Ctrl + ,` (설정 열기)
- "git" 검색
- "Git: User Name", "Git: User Email" 설정

## 🔐 GitHub 인증

### Personal Access Token 사용 (권장)

1. **GitHub에서 토큰 생성**
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - "Generate new token" 클릭
   - 권한: `repo` 체크
   - 토큰 생성 및 복사

2. **푸시 시 사용**
   - Username: GitHub 사용자명
   - Password: 생성한 토큰 (비밀번호 아님!)

### GitHub Desktop 사용 (더 쉬움)

1. **GitHub Desktop 설치**: https://desktop.github.com/
2. **GitHub Desktop에서 Repository 생성**
3. **Cursor에서 작업 후 GitHub Desktop에서 커밋/푸시**

## 📝 Cursor Git 단축키

- `Ctrl + Shift + G`: 소스 제어 패널 열기
- `Ctrl + Enter`: 커밋
- `Ctrl + Shift + P`: 명령 팔레트 (Git 명령어 검색)

## 💡 팁

### 자동 커밋

Cursor에서 파일을 저장하면 자동으로 변경사항이 감지됩니다.

### 변경사항 확인

- 소스 제어 패널에서 변경된 파일 확인
- 파일을 클릭하면 변경 내용(diff) 확인 가능

### 브랜치 관리

- 소스 제어 패널 하단에서 브랜치 확인 및 전환 가능

## ⚠️ 주의사항

### .gitignore 확인

`.gitignore` 파일이 있어야 불필요한 파일이 커밋되지 않습니다.
프로젝트에 이미 `.gitignore` 파일이 있습니다.

### API 키 보안

`index.html`에 API 키가 포함되어 있습니다.
공개 저장소에 올릴 경우 주의하세요!

## 🎯 빠른 시작

1. **Cursor에서 소스 제어 패널 열기** (`Ctrl + Shift + G`)
2. **"Initialize Repository" 클릭**
3. **"Stage All Changes" 클릭**
4. **커밋 메시지 입력 후 커밋**
5. **GitHub에서 Repository 생성**
6. **원격 저장소 추가 및 푸시**

## 문제 해결

### "Git: command not found"
→ Git이 설치되지 않았습니다. https://git-scm.com/ 에서 설치하세요.

### "Authentication failed"
→ Personal Access Token을 사용하거나 GitHub Desktop을 사용하세요.

### "fatal: remote origin already exists"
→ 기존 원격 저장소 제거:
```bash
git remote remove origin
git remote add origin https://github.com/사용자명/저장소명.git
```

