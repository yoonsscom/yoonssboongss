# 🔧 네이버 지도 API 인증 오류 해결

## 현재 상황
- **오류**: "네이버 지도 Open API 인증이 실패하였습니다"
- **현재 URI**: `http://127.0.0.1:5500/index.html` (VS Code Live Server 사용 중)
- **문제**: Web 서비스 URL이 등록되지 않음

## 해결 방법

### 방법 1: Web 서비스 URL 등록 (가장 간단) ⭐

1. **네이버 클라우드 플랫폼 접속**
   - https://www.ncloud.com/ 접속
   - 로그인

2. **Application 수정**
   - 콘솔 → AI·NAVER API → Application
   - 등록한 Application 클릭
   - "수정" 버튼 클릭

3. **Web 서비스 URL 추가**
   - "서비스 환경 등록" 섹션으로 스크롤
   - "Web 서비스 URL" 필드에 다음 중 하나 입력:
     - `http://127.0.0.1:5500` (현재 사용 중인 주소)
     - `http://localhost:5500`
     - 또는 개발 편의를 위해: `http://127.0.0.1` (포트 번호 없이)
   
4. **"+ 추가" 버튼 클릭**

5. **저장**
   - 하단의 "수정" 또는 "저장" 버튼 클릭

6. **브라우저 새로고침**
   - `Ctrl + Shift + R` (강력 새로고침)
   - 또는 `F5`

### 방법 2: 포트 번호 변경

VS Code Live Server의 포트를 8000으로 변경:

1. VS Code 설정 열기 (`Ctrl + ,`)
2. "Live Server" 검색
3. "Live Server: Port" 설정을 8000으로 변경
4. 네이버 클라우드 플랫폼에서 `http://localhost:8000` 등록

### 방법 3: 여러 URL 등록 (권장)

개발 편의를 위해 여러 URL을 등록:

- `http://localhost`
- `http://localhost:5500`
- `http://localhost:8000`
- `http://127.0.0.1`
- `http://127.0.0.1:5500`
- `http://127.0.0.1:8000`

이렇게 하면 어떤 포트를 사용해도 작동합니다!

---

## 신규 Maps API 전환 안내

네이버에서 신규 Maps API로 전환을 권장하고 있습니다. 하지만 기존 API도 계속 작동하므로, 지금은 Web 서비스 URL만 등록하면 됩니다.

나중에 신규 API로 전환하려면:
- 공지사항: https://www.ncloud.com/support/notice/all/1930
- 가이드: https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Getting-Started.html

---

## 빠른 체크리스트

- [ ] 네이버 클라우드 플랫폼 접속
- [ ] Application 수정
- [ ] Web 서비스 URL에 `http://127.0.0.1:5500` 추가
- [ ] 저장
- [ ] 브라우저 강력 새로고침 (`Ctrl + Shift + R`)

---

## 여전히 안 되나요?

1. Application이 "활성" 상태인지 확인
2. Client ID가 정확한지 확인 (공백 없이)
3. 브라우저 캐시 삭제 후 다시 시도
4. 다른 브라우저에서 테스트

