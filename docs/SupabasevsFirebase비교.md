# 🔥 Supabase vs Firebase 비교 가이드

## 📊 핵심 차이점

### 1. 데이터베이스 타입

#### Supabase
- **PostgreSQL** (관계형 데이터베이스)
- SQL 쿼리 사용 가능
- 테이블 간 관계 설정 가능
- 복잡한 쿼리에 강함

#### Firebase
- **Firestore** (NoSQL 문서 데이터베이스)
- 문서 기반 구조
- 유연한 스키마
- 간단한 데이터 구조에 적합

**이 프로젝트에 적합**: 둘 다 가능하지만, **Supabase가 더 적합** (가게 데이터는 구조화되어 있음)

---

### 2. 난이도

#### Supabase
- ⭐⭐ 보통
- SQL을 알면 더 쉬움
- REST API 자동 생성
- 직관적인 대시보드

#### Firebase
- ⭐⭐⭐ 어려움
- NoSQL 개념 이해 필요
- 복잡한 보안 규칙
- 학습 곡선이 가파름

**이 프로젝트에 적합**: **Supabase** (초보자에게 더 쉬움)

---

### 3. 무료 플랜

#### Supabase
- ✅ 500MB 데이터베이스
- ✅ 월 50,000명 활성 사용자
- ✅ 2GB 파일 스토리지
- ✅ 예측 가능한 가격 정책

#### Firebase
- ✅ 무료 플랜 제공
- ⚠️ 사용량 기반 과금
- ⚠️ 대규모 사용 시 비용 급증 가능
- ⚠️ 예측하기 어려운 비용

**이 프로젝트에 적합**: **Supabase** (무료 플랜이 더 관대함)

---

### 4. 실시간 기능

#### Supabase
- ✅ PostgreSQL LISTEN/NOTIFY
- ✅ 실시간 구독 가능
- ✅ 여러 사용자 동시 작업 지원

#### Firebase
- ✅ Realtime Database
- ✅ 강력한 실시간 동기화
- ✅ 오프라인 지원

**이 프로젝트에 적합**: **동일** (둘 다 실시간 지원)

---

### 5. 설정 및 사용

#### Supabase
```javascript
// 간단한 설정
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(url, key)

// 데이터 가져오기 (SQL처럼)
const { data } = await supabase
  .from('stores')
  .select('*')
```

#### Firebase
```javascript
// 복잡한 설정
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
const app = initializeApp(config)
const db = getFirestore(app)

// 데이터 가져오기
const snapshot = await getDocs(collection(db, 'stores'))
```

**이 프로젝트에 적합**: **Supabase** (더 간단함)

---

### 6. 오픈소스

#### Supabase
- ✅ 완전 오픈소스
- ✅ 자체 호스팅 가능
- ✅ 벤더 종속성 없음

#### Firebase
- ❌ 폐쇄형 (Google 소유)
- ❌ 자체 호스팅 불가
- ⚠️ Google에 종속

**이 프로젝트에 적합**: **Supabase** (더 유연함)

---

## 🎯 이 프로젝트에 추천: **Supabase** ⭐⭐⭐

### 추천 이유

1. **초보자에게 더 쉬움**
   - SQL 기반이라 이해하기 쉬움
   - 직관적인 대시보드

2. **데이터 구조에 적합**
   - 가게 정보는 구조화된 데이터
   - PostgreSQL이 더 적합

3. **무료 플랜이 관대함**
   - 500MB면 충분
   - 예측 가능한 비용

4. **설정이 간단함**
   - REST API 자동 생성
   - 코드가 더 간단

5. **오픈소스**
   - 나중에 자체 호스팅 가능
   - 벤더 종속성 없음

---

## 📋 비교표

| 항목 | Supabase | Firebase | 승자 |
|------|----------|----------|------|
| **난이도** | ⭐⭐ 쉬움 | ⭐⭐⭐ 어려움 | ✅ Supabase |
| **무료 플랜** | 500MB, 50K 사용자 | 사용량 기반 | ✅ Supabase |
| **데이터베이스** | PostgreSQL (SQL) | Firestore (NoSQL) | ✅ Supabase |
| **실시간** | ✅ 지원 | ✅ 지원 | 🤝 동일 |
| **설정** | 간단 | 복잡 | ✅ Supabase |
| **오픈소스** | ✅ 완전 오픈 | ❌ 폐쇄형 | ✅ Supabase |
| **커뮤니티** | 작지만 성장 중 | 방대함 | ✅ Firebase |
| **추가 기능** | 기본 기능 | 다양한 기능 | ✅ Firebase |

---

## 💡 최종 추천

### 이 프로젝트에는 **Supabase** 추천! ⭐⭐⭐

**이유:**
1. ✅ 초보자도 쉽게 사용 가능
2. ✅ 가게 데이터 구조에 적합
3. ✅ 무료 플랜이 충분
4. ✅ 설정이 간단
5. ✅ 나중에 확장 가능

### Firebase를 선택해야 하는 경우

- 이미 Firebase를 사용 중
- Google 생태계 활용 필요
- 복잡한 인증 기능 필요
- 푸시 알림 등 추가 기능 필요

---

## 🚀 Supabase 빠른 시작

### 1단계: Supabase 프로젝트 생성
1. https://supabase.com 접속
2. GitHub로 로그인
3. "New Project" 생성
4. 프로젝트 이름: `bongss-stores`
5. 데이터베이스 비밀번호 설정

### 2단계: 테이블 생성
SQL Editor에서 실행:
```sql
CREATE TABLE stores (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT,
  lat FLOAT NOT NULL,
  lng FLOAT NOT NULL,
  hours JSONB,
  menu JSONB,
  image TEXT,
  memo TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 3단계: Row Level Security 설정
```sql
-- 모든 사용자가 읽기 가능
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read stores"
ON stores FOR SELECT
USING (true);

-- 인증된 사용자만 쓰기 가능 (또는 관리자만)
CREATE POLICY "Authenticated users can insert"
ON stores FOR INSERT
TO authenticated
WITH CHECK (true);
```

### 4단계: JavaScript 코드 수정
```javascript
// Supabase 클라이언트 초기화
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
const supabase = createClient(supabaseUrl, supabaseKey)

// 가게 목록 가져오기
async function loadStores() {
  const { data, error } = await supabase
    .from('stores')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('오류:', error)
    return []
  }
  
  return data || []
}

// 가게 추가
async function addStore(storeData) {
  const { data, error } = await supabase
    .from('stores')
    .insert([storeData])
    .select()
  
  if (error) {
    console.error('오류:', error)
    return null
  }
  
  return data[0]
}

// 실시간 구독
supabase
  .channel('stores')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'stores' },
    (payload) => {
      console.log('변경사항:', payload)
      // UI 업데이트
      loadAllStores()
    }
  )
  .subscribe()
```

---

## 🎯 결론

**이 프로젝트에는 Supabase를 추천합니다!**

- 더 쉬움
- 더 적합한 데이터 구조
- 더 나은 무료 플랜
- 더 간단한 설정

Firebase는 이미 사용 중이거나 Google 생태계가 필요한 경우에만 고려하세요.

