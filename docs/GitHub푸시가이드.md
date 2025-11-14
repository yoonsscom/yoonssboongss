# 🚀 GitHub에 푸시하기 - 단계별 가이드

## 준비사항

- Git 설치 확인
- GitHub 계정 준비

## 1단계: Git 초기화 (아직 안 했다면)

프로젝트 폴더에서 다음 명령어 실행:

```bash
git init
```

## 2단계: 파일 추가

```bash
git add .
```

## 3단계: 첫 커밋

```bash
git commit -m "Initial commit: 붕세권 프로젝트"
```

## 4단계: GitHub Repository 생성

1. **GitHub 접속**: https://github.com
2. **우측 상단 "+" 버튼** → **"New repository"** 클릭
3. **Repository 정보 입력**:
   - Repository name: `boongseogwon` (또는 원하는 이름)
   - Description: "붕어빵 가게 정보 제공 모바일 웹앱"
   - Public 선택 (무료)
   - **"Initialize this repository with a README" 체크 해제** (이미 파일이 있으므로)
4. **"Create repository"** 클릭

## 5단계: 로컬과 GitHub 연결

GitHub에서 생성된 Repository 페이지에서 보이는 명령어를 사용하거나:

```bash
git remote add origin https://github.com/사용자명/저장소명.git
git branch -M main
git push -u origin main
```

**예시:**
```bash
git remote add origin https://github.com/yourusername/boongseogwon.git
git branch -M main
git push -u origin main
```

## 6단계: 확인

GitHub Repository 페이지에서 파일들이 업로드되었는지 확인!

## ⚠️ 문제 해결

### "fatal: not a git repository"
→ `git init` 먼저 실행

### "fatal: remote origin already exists"
→ 기존 원격 저장소 제거 후 다시 추가:
```bash
git remote remove origin
git remote add origin https://github.com/사용자명/저장소명.git
```

### "error: failed to push"
→ GitHub 인증 확인:
- Personal Access Token 필요할 수 있음
- GitHub Settings → Developer settings → Personal access tokens

### "Authentication failed"
→ GitHub 인증 방법:
1. Personal Access Token 생성
2. 또는 GitHub Desktop 사용
3. 또는 SSH 키 설정

## 💡 팁

### 이후 업데이트 방법

코드를 수정한 후:

```bash
git add .
git commit -m "변경 내용 설명"
git push
```

### 브랜치 확인

```bash
git branch
```

### 원격 저장소 확인

```bash
git remote -v
```

## 🎯 완료!

GitHub에 푸시가 완료되면:
- Netlify에서 GitHub 연동 가능
- 자동 배포 설정 가능
- 다른 사람과 협업 가능

