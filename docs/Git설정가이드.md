# 🔧 Git 설정 가이드

## 1단계: Git 초기화

프로젝트 폴더에서 다음 명령어 실행:

```bash
git init
```

## 2단계: .gitignore 확인

`.gitignore` 파일이 생성되었는지 확인합니다.
이 파일은 Git에 포함하지 않을 파일들을 지정합니다.

## 3단계: 파일 추가

모든 파일을 Git에 추가:

```bash
git add .
```

## 4단계: 첫 커밋

```bash
git commit -m "Initial commit: 붕세권 프로젝트 시작"
```

## 5단계: GitHub에 업로드 (선택사항)

### GitHub Repository 생성

1. **GitHub 접속**: https://github.com
2. **"New repository"** 클릭
3. **Repository 이름**: `boongseogwon` (또는 원하는 이름)
4. **Public** 선택 (무료)
5. **"Create repository"** 클릭

### 로컬과 GitHub 연결

GitHub에서 제공하는 명령어를 사용하거나:

```bash
git remote add origin https://github.com/사용자명/저장소명.git
git branch -M main
git push -u origin main
```

## 6단계: Git 사용자 정보 설정 (처음만)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 📝 자주 사용하는 Git 명령어

### 파일 변경사항 확인
```bash
git status
```

### 변경사항 커밋
```bash
git add .
git commit -m "변경 내용 설명"
```

### GitHub에 업로드
```bash
git push
```

### GitHub에서 최신 버전 가져오기
```bash
git pull
```

### 변경 이력 확인
```bash
git log
```

## ⚠️ 주의사항

### .gitignore에 포함된 파일
- `.env` 파일 (API 키 등 민감한 정보)
- `node_modules/` (의존성 패키지)
- 임시 파일들

### API 키 보안
- `index.html`에 API 키가 하드코딩되어 있으면 주의!
- 실제 배포 시 환경 변수 사용 권장

## 🚀 Netlify와 연동

GitHub에 업로드한 후:
1. Netlify에서 "Import an existing project" 선택
2. GitHub Repository 선택
3. 자동 배포 설정 완료!

## 💡 팁

- 커밋 메시지는 명확하게 작성
- 자주 커밋하기 (작은 단위로)
- 의미 있는 커밋 메시지 사용

