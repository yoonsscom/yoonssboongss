# ✅ Supabase 설정 완료 가이드

## 4단계: config.js 설정

Supabase 프로젝트를 생성하고 테이블을 만들었다면, 이제 `config.js` 파일에 Supabase 정보를 입력해야 합니다.

### 1. Supabase 프로젝트에서 정보 가져오기

1. **Supabase 대시보드 접속**: https://supabase.com/dashboard
2. **프로젝트 선택**
3. **Settings** (왼쪽 메뉴) → **API** 클릭
4. **Project URL** 복사
5. **anon public** 키 복사

### 2. config.js 파일 수정

`config.js` 파일을 열고 다음 정보를 입력하세요:

```javascript
const CONFIG = {
    NAVER_MAP_API_KEY: 'YOUR_NAVER_API_KEY',
    
    // Supabase 설정
    SUPABASE_URL: 'https://your-project-id.supabase.co',  // Project URL
    SUPABASE_ANON_KEY: 'your-anon-key-here'  // anon public 키
};
```

**예시:**
```javascript
const CONFIG = {
    NAVER_MAP_API_KEY: 'abc123def456',
    SUPABASE_URL: 'https://abcdefghijklmnop.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
};
```

### 3. 저장 및 테스트

1. `config.js` 파일 저장
2. 브라우저에서 페이지 새로고침 (F5)
3. 브라우저 콘솔 (F12) 확인
   - `✅ Supabase 연결 성공` 메시지가 보이면 성공!
   - `✅ Supabase 실시간 구독 활성화` 메시지도 확인

---

## 확인 사항

### ✅ 정상 작동 시
- 브라우저 콘솔에 `✅ Supabase 연결 성공` 표시
- 관리자 모드에서 가게 추가/수정/삭제 가능
- 다른 사용자도 추가한 가게를 볼 수 있음
- 실시간으로 변경사항 반영

### ❌ 오류 발생 시

#### "Supabase 연결 실패"
- `SUPABASE_URL`과 `SUPABASE_ANON_KEY` 확인
- Supabase 프로젝트가 활성화되어 있는지 확인

#### "permission denied"
- Supabase 대시보드 → **Authentication** → **Policies** 확인
- Row Level Security 정책이 올바르게 설정되었는지 확인

#### "relation 'stores' does not exist"
- 테이블 이름이 `stores`인지 확인
- SQL Editor에서 테이블 생성 확인

---

## 실시간 기능 확인

1. **두 개의 브라우저 창 열기**
   - 같은 URL로 접속
2. **한 창에서 가게 추가**
3. **다른 창에서 자동으로 반영되는지 확인**
   - 실시간으로 가게가 나타나면 성공!

---

## 다음 단계

이제 Supabase가 정상 작동합니다!

- ✅ 모든 사용자가 공유하는 데이터베이스
- ✅ 실시간 동기화
- ✅ 브라우저 데이터 삭제해도 안전

**축하합니다!** 🎉

