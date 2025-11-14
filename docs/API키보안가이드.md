# 🔐 API 키 보안 가이드

## 개요

이 프로젝트는 API 키를 안전하게 관리하기 위해 다음과 같은 방법을 사용합니다:

1. **API 키 공개**: `config.js` 파일에 API 키 포함 (GitHub에 업로드됨)
2. **도메인 제한**: 네이버 클라우드 플랫폼에서 특정 도메인만 허용하도록 설정
3. **보안**: 다른 도메인에서는 API 키가 작동하지 않도록 제한

## 보안 구조

### 1. config.js 파일 (로컬 개발용)

- **위치**: 프로젝트 루트의 `config.js`
- **상태**: `.gitignore`에 포함되어 GitHub에 업로드되지 않음
- **용도**: 로컬 개발 시 API 키 저장

```javascript
const CONFIG = {
    NAVER_MAP_API_KEY: 'YOUR_API_KEY_HERE'
};
```

### 2. config.js.example (템플릿)

- **위치**: 프로젝트 루트의 `config.js.example`
- **상태**: GitHub에 업로드됨 (템플릿 파일)
- **용도**: 다른 개발자가 참고할 수 있는 예시 파일

### 3. 도메인 제한 보안 (GitHub Pages)

- **방식**: 네이버 클라우드 플랫폼에서 Web 서비스 URL 제한 설정
- **작동**: 지정된 도메인에서만 API 키 작동
- **장점**: API 키가 공개되어도 다른 도메인에서는 사용 불가

## 설정 방법

### 로컬 개발 환경

1. `config.js.example` 파일을 복사:
   ```bash
   cp config.js.example config.js
   ```

2. `config.js` 파일을 열고 실제 API 키 입력:
   ```javascript
   const CONFIG = {
       NAVER_MAP_API_KEY: '9ajf9p6dfh'  // 실제 API 키
   };
   ```

3. 이제 로컬에서 실행하면 자동으로 API 키가 로드됩니다.

### GitHub Pages 배포

1. **네이버 클라우드 플랫폼 설정** (중요!)
   - 네이버 클라우드 플랫폼 콘솔 접속
   - AI·NAVER API > Application 메뉴
   - 해당 Application 선택
   - "Web 서비스 URL"에 GitHub Pages URL 등록
   - 예: `https://yourusername.github.io` 또는 `https://yourusername.github.io/repository-name`
   - 여러 URL 등록 가능 (로컬 개발용: `http://localhost:8000`, `http://127.0.0.1:5500` 등)

2. **GitHub에 코드 푸시**
   - `config.js` 파일도 함께 업로드됨 (API 키 포함)
   - 도메인 제한으로 보안 유지

3. **GitHub Pages 활성화**
   - Repository Settings → Pages
   - Source를 "main branch" 선택
   - 배포 완료!

4. **사용자 경험**
   - 사용자는 API 키 입력 없이 바로 사용 가능
   - 자동으로 지도가 로드됨

## .gitignore 확인

다음 파일들이 Git에서 제외되어 있는지 확인하세요:

```
config.js          # 실제 API 키가 있는 파일
.env               # 환경 변수 파일
.env.local         # 로컬 환경 변수
```

## 주의사항

### ⚠️ 절대 하지 말아야 할 것

1. ❌ 도메인 제한 없이 API 키를 공개하지 마세요
2. ❌ `index.html`에 API 키를 하드코딩하지 마세요 (유지보수 어려움)
3. ❌ 모든 도메인을 허용하지 마세요

### ✅ 안전한 방법

1. ✅ 네이버 클라우드 플랫폼에서 Web 서비스 URL 제한 설정 (필수!)
2. ✅ `config.js`에 API 키 저장 (GitHub에 포함됨)
3. ✅ 지정된 도메인에서만 작동하도록 설정

## 문제 해결

### "네이버 지도 API를 불러오는데 실패했습니다" 오류가 발생하는 경우

1. **API 키 확인**:
   - `config.js` 파일에 올바른 API 키가 있는지 확인
   - 네이버 클라우드 플랫폼에서 API 키 상태 확인

2. **Web 서비스 URL 확인**:
   - 네이버 클라우드 플랫폼 콘솔에서 Web 서비스 URL 등록 확인
   - 현재 접속 중인 URL이 등록되어 있는지 확인
   - 예: `https://yourusername.github.io/repository-name`

3. **로컬 개발**:
   - 로컬 개발용 URL도 등록되어 있는지 확인
   - 예: `http://localhost:8000`, `http://127.0.0.1:5500`

### API 키를 변경하고 싶은 경우

1. **config.js 파일 수정**:
   - `config.js` 파일에서 API 키 변경
   - GitHub에 커밋 및 푸시
   - GitHub Pages 자동 재배포

## 추가 보안 권장사항

### 네이버 클라우드 플랫폼 설정

1. **Web 서비스 URL 제한**:
   - 네이버 클라우드 플랫폼 콘솔에서 API 키 설정
   - 허용된 도메인만 등록 (예: `https://yourusername.github.io`)
   - 로컬 개발용: `http://localhost:8000`, `http://127.0.0.1:5500` 등

2. **API 사용량 모니터링**:
   - 정기적으로 API 사용량 확인
   - 비정상적인 사용량 발견 시 즉시 키 재발급

3. **키 재발급**:
   - 키가 노출되었다고 의심되면 즉시 재발급
   - 기존 키는 비활성화

## 참고

- [네이버 클라우드 플랫폼 보안 가이드](https://www.ncloud.com/)
- [Git 보안 모범 사례](https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-%EC%84%9C%EB%B8%8C%EB%AA%A8%EB%93%88)

