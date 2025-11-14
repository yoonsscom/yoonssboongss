# 🍞 붕세권 - 붕어빵 가게 찾기

붕어빵 가게 정보를 쉽게 찾을 수 있는 모바일 웹앱입니다.

## 🚀 시작하기

### 1. 네이버 지도 API 키 발급

1. [네이버 클라우드 플랫폼](https://www.ncloud.com/)에 가입
2. 콘솔에서 "AI·NAVER API" > "Application" 메뉴로 이동
3. "Application 등록" 클릭
4. 서비스 선택: "Web Dynamic Map v3"
5. Client ID 발급

### 2. API 키 설정

#### 로컬 개발용 (선택사항)

1. `config.js.example` 파일을 복사하여 `config.js` 파일 생성:
   ```bash
   cp config.js.example config.js
   ```

2. `config.js` 파일을 열고 실제 API 키 입력:
   ```javascript
   const CONFIG = {
       NAVER_MAP_API_KEY: 'YOUR_API_KEY_HERE'  // 여기에 실제 API 키 입력
   };
   ```

**⚠️ 주의**: `config.js` 파일은 `.gitignore`에 포함되어 있어 GitHub에 업로드되지 않습니다.

#### GitHub Pages 배포용

1. **네이버 클라우드 플랫폼에서 도메인 제한 설정** (필수!)
   - 네이버 클라우드 플랫폼 콘솔 접속
   - AI·NAVER API > Application 메뉴
   - 해당 Application 선택
   - "Web 서비스 URL"에 GitHub Pages URL 등록
   - 예: `https://yourusername.github.io` 또는 `https://yourusername.github.io/repository-name`

2. **GitHub에 코드 푸시**
   - `config.js` 파일도 함께 업로드됨
   - 도메인 제한으로 보안 유지

3. **사용자 경험**
   - 사용자는 API 키 입력 없이 바로 사용 가능
   - 자동으로 지도가 로드됨

**⚠️ 중요**: 도메인 제한을 설정하지 않으면 다른 사람이 API 키를 복사하여 사용할 수 있습니다. 반드시 네이버 클라우드 플랫폼에서 Web 서비스 URL 제한을 설정하세요!

### 3. 실행

1. 파일들을 웹 서버에 업로드하거나
2. 로컬에서 실행하려면:
   - Python이 설치되어 있다면: `python -m http.server 8000`
   - Node.js가 설치되어 있다면: `npx http-server`
   - 브라우저에서 `http://localhost:8000` 접속

## 📱 주요 기능

- ✅ 지도 기반 가게 찾기
- ✅ 가게 목록 보기
- ✅ 가게 상세 정보 (주소, 전화번호, 영업시간, 메뉴)
- ✅ 검색 기능 (지역명, 가게명)
- ✅ 현재 위치 기반 검색
- ✅ 거리순/이름순 정렬
- ✅ 모바일 최적화 디자인

## 📂 파일 구조

```
붕세권/
├── index.html      # 메인 HTML 파일
├── styles.css      # 스타일시트
├── app.js          # 메인 JavaScript 로직
├── data.js         # 가게 데이터
├── 기획서.md        # 프로젝트 기획서
└── README.md       # 이 파일
```

## 🛠 기술 스택

- HTML5
- CSS3
- JavaScript (Vanilla)
- 네이버 지도 API v3

## 📝 데이터 추가하기

`data.js` 파일에 가게 정보를 추가하면 됩니다:

```javascript
{
    id: 7,
    name: "가게 이름",
    address: "주소",
    phone: "전화번호",
    lat: 37.1234,  // 위도
    lng: 127.5678, // 경도
    hours: {
        open: "10:00",
        close: "22:00"
    },
    menu: [
        { name: "메뉴명", price: 1000 }
    ],
    image: "이미지 URL"
}
```

## 🌐 무료 배포하기

인터넷에서 누구나 접근할 수 있게 무료로 배포할 수 있습니다!

### 추천: Netlify (가장 쉬움)

1. **Netlify 접속**: https://www.netlify.com
2. **회원가입** (GitHub, Google, Email 중 선택)
3. **"Add new site" → "Deploy manually"** 클릭
4. **프로젝트 폴더 드래그 앤 드롭**
5. **배포 완료!** URL 자동 생성
6. **네이버 지도 API 설정**: 배포된 URL을 Web 서비스 URL에 등록

**상세 가이드**: [무료배포가이드.md](무료배포가이드.md)

### 다른 옵션
- **Vercel**: https://vercel.com
- **GitHub Pages**: GitHub Repository → Settings → Pages
- **Firebase Hosting**: https://firebase.google.com

## 🔮 향후 계획

- [ ] 리뷰 및 평점 시스템
- [ ] 즐겨찾기 기능
- [ ] 가게 등록 기능
- [ ] PWA 지원 (앱처럼 설치 가능)
- [ ] 실시간 영업 상태

## 📄 라이선스

이 프로젝트는 개인 학습 목적으로 제작되었습니다.

