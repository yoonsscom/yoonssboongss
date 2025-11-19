# 🔒 Supabase Row Level Security (RLS) 정책 설정

## 오류 원인

`new row violates row-level security policy for table "stores"` 오류는 Supabase의 Row Level Security 정책 때문에 발생합니다.

## 해결 방법

### 방법 1: 모든 사용자가 읽기/쓰기 가능하도록 설정 (개인 프로젝트용) ⭐

개인 프로젝트이거나 모든 사용자가 가게를 추가할 수 있게 하려면:

#### SQL Editor에서 실행:

```sql
-- 기존 정책 삭제 (있다면)
DROP POLICY IF EXISTS "Anyone can read stores" ON stores;
DROP POLICY IF EXISTS "Authenticated users can insert" ON stores;
DROP POLICY IF EXISTS "Authenticated users can update" ON stores;
DROP POLICY IF EXISTS "Authenticated users can delete" ON stores;

-- 모든 사용자가 읽기 가능
CREATE POLICY "Anyone can read stores"
ON stores FOR SELECT
USING (true);

-- 모든 사용자가 추가 가능
CREATE POLICY "Anyone can insert stores"
ON stores FOR INSERT
WITH CHECK (true);

-- 모든 사용자가 수정 가능
CREATE POLICY "Anyone can update stores"
ON stores FOR UPDATE
USING (true)
WITH CHECK (true);

-- 모든 사용자가 삭제 가능
CREATE POLICY "Anyone can delete stores"
ON stores FOR DELETE
USING (true);
```

### 방법 2: 인증된 사용자만 쓰기 가능 (권장) ⭐⭐⭐

더 안전하게 하려면 인증된 사용자만 쓰기를 허용:

```sql
-- 기존 정책 삭제
DROP POLICY IF EXISTS "Anyone can read stores" ON stores;
DROP POLICY IF EXISTS "Authenticated users can insert" ON stores;
DROP POLICY IF EXISTS "Authenticated users can update" ON stores;
DROP POLICY IF EXISTS "Authenticated users can delete" ON stores;

-- 모든 사용자가 읽기 가능
CREATE POLICY "Anyone can read stores"
ON stores FOR SELECT
USING (true);

-- 인증된 사용자만 추가 가능
CREATE POLICY "Authenticated users can insert"
ON stores FOR INSERT
TO authenticated
WITH CHECK (true);

-- 인증된 사용자만 수정 가능
CREATE POLICY "Authenticated users can update"
ON stores FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 인증된 사용자만 삭제 가능
CREATE POLICY "Authenticated users can delete"
ON stores FOR DELETE
TO authenticated
USING (true);
```

**주의**: 이 방법을 사용하려면 Supabase 인증을 구현해야 합니다.

### 방법 3: RLS 비활성화 (개발/테스트용만) ⚠️

**주의**: 프로덕션에서는 권장하지 않습니다!

```sql
-- RLS 비활성화
ALTER TABLE stores DISABLE ROW LEVEL SECURITY;
```

---

## 단계별 해결

### 1단계: Supabase 대시보드 접속
1. https://supabase.com/dashboard 접속
2. 프로젝트 선택

### 2단계: SQL Editor 열기
1. 왼쪽 메뉴에서 **SQL Editor** 클릭
2. **New query** 클릭

### 3단계: 정책 설정 SQL 실행
- **방법 1** (모든 사용자 접근) 또는
- **방법 2** (인증된 사용자만) 중 선택

SQL을 복사하여 실행

### 4단계: 확인
1. **Table Editor** → **stores** 테이블 확인
2. 브라우저에서 다시 가게 추가 시도
3. 정상 작동하는지 확인

---

## 현재 정책 확인

현재 설정된 정책을 확인하려면:

```sql
-- 현재 정책 확인
SELECT * FROM pg_policies WHERE tablename = 'stores';
```

---

## 권장 설정

### 개인 프로젝트 / 테스트용
→ **방법 1** (모든 사용자 접근)

### 공개 서비스 / 프로덕션
→ **방법 2** (인증된 사용자만) + Supabase 인증 구현

---

## 문제 해결

### 여전히 오류가 발생한다면

1. **정책이 제대로 생성되었는지 확인**
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'stores';
   ```

2. **RLS가 활성화되어 있는지 확인**
   ```sql
   SELECT tablename, rowsecurity 
   FROM pg_tables 
   WHERE tablename = 'stores';
   ```

3. **테이블 권한 확인**
   ```sql
   SELECT grantee, privilege_type 
   FROM information_schema.role_table_grants 
   WHERE table_name = 'stores';
   ```

---

## 빠른 해결 (복사해서 실행)

개인 프로젝트라면 아래 SQL을 그대로 복사해서 실행하세요:

```sql
-- 기존 정책 모두 삭제
DROP POLICY IF EXISTS "Anyone can read stores" ON stores;
DROP POLICY IF EXISTS "Anyone can insert stores" ON stores;
DROP POLICY IF EXISTS "Anyone can update stores" ON stores;
DROP POLICY IF EXISTS "Anyone can delete stores" ON stores;
DROP POLICY IF EXISTS "Authenticated users can insert" ON stores;
DROP POLICY IF EXISTS "Authenticated users can update" ON stores;
DROP POLICY IF EXISTS "Authenticated users can delete" ON stores;

-- 모든 사용자가 읽기/쓰기 가능
CREATE POLICY "Anyone can read stores"
ON stores FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert stores"
ON stores FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update stores"
ON stores FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Anyone can delete stores"
ON stores FOR DELETE
USING (true);
```

이제 정상 작동할 것입니다! ✅

