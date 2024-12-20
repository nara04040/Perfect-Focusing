# Perfect Focusing 서비스 PRD (Product Requirements Document)

## 1. 프로젝트 개요

Perfect Focusing은 사용자들이 하루, 일주일, 한 달 단위로 목표를 설정하고 우선순위를 지정하여 하나의 작업에 집중할 수 있도록 도와주는 생산성 향상 서비스입니다. 작업 완료 시 다음 작업을 안내하여 규칙적인 생활을 도모하며, 작업 수행 시 최대한 집중할 수 있도록 지원하는 기능을 제공합니다.

- 목표: 사용자들의 생산성 향상과 목표 달성을 위한 직관적이고 집중력 강화된 TODO 서비스 제공
- 타겟 사용자: 목표 관리와 생산성 향상을 원하는 일반 사용자
- 핵심 가치: 직관적인 UI/UX, 집중력 강화, 우선순위 기반 작업 관리

## 2. 유저 플로우
### 앱 접속
사용자들은 별도의 회원가입이나 로그인 없이 바로 서비스 이용 가능

### 목표 설정
- 일간, 주간, 월간 목표 설정
- 각 목표에 대한 우선순위 지정

### 작업(Task) 관리
- 목표에 따른 세부 작업 생성
- 작업 우선순위 설정 및 수정
- 작업 세부 정보 입력 (마감일, 노트 등)

### 작업 집중 모드
- 선택된 작업에 집중할 수 있는 전용 화면 제공
- 작업 시간 타이머 및 방해 요소 최소화
- 작업 완료 및 다음 작업 안내

### 데이터 유지
- 로컬 스토리지를 이용하여 사용자의 작업 및 목표 데이터 유지

## 3. 핵심 기능

### 직관적인 UI/UX 디자인
- 반응형 디자인 적용: 다양한 디바이스(데스크탑, 태블릿, 모바일)에서 최적의 사용자 경험 제공
- 간결한 인터페이스: 복잡한 요소를 배제하고 사용성이 높은 UI 구성
- ShadCN 및 TailwindCSS 활용: 일관된 디자인 시스템 구축

### 목표 및 작업 관리
- 다중 기간 목표 설정: 일간, 주간, 월간 목표 설정 기능
- 우선순위 지정: 목표 및 작업에 대한 우선순위 설정으로 중요도 관리
- 작업 추가/수정/삭제: CRUD 기능 제공
- 데이터 저장: 로컬 스토리지를 이용한 데이터 저장으로 회원가입 없이도 지속적인 사용 가능

### 집중 모드 기능
- 작업 집중 화면 제공: 현재 작업에만 집중할 수 있는 전용 모드
- 방해 요소 최소화: 알림 차단 및 단순화된 UI로 집중력 향상
- 타이머 기능: 작업 시간 관리 및 Pomodoro 기법 적용 가능

### 작업 완료 및 다음 작업 안내
- 자동 다음 작업 안내: 현재 작업 완료 시 다음 우선순위 작업으로 자연스럽게 이동
- 진행률 표시: 목표 대비 현재 진행 상황 시각화

## 4. 1차 MVP 구현 내용

### 구현된 기능
1. **목표 관리 시스템**
   - 일간/주간/월간 목표 생성 및 관리
   - 목표별 우선순위 설정 (high/medium/low)
   - 목표 수정/삭제/완료 기능
   - 목표별 진행률 실시간 표시

2. **할 일(Task) 관리**
   - 목표별 할 일 추가/수정/삭제
   - 할 일 우선순위 설정
   - 할 일 완료 체크 기능
   - 할 일 진행 상황 표시

3. **페이지 구조 구현**
   - 메인 페이지('/'): 오늘의 목표 관리
   - 목표 페이지('/goals'): 전체 목표 관리
   - 포커스 페이지('/focus'): 집중 모드

4. **필터링 및 정렬 시스템**
   - 우선순위별 필터링
   - 우선순위 기준 정렬 (높은 순/낮은 순)
   - 기간별 목표 분류

5. **집중 모드**
   - 목표 클릭으로 집중 모드 진입
   - 우선순위 기반 작업 자동 정렬
   - 25분 타이머 (뽀모도로 기법)
   - 작업 건너뛰기 기능
   - 작업 완료 시 자동 다음 작업 전환
   - 모든 작업 완료 시 자동 목표 완료

6. **데이터 관리**
   - 로컬 스토리지 기반 데이터 영구 저장
   - Zustand 상태 관리 구현

### 사용된 기술 스택
- Next.js (App Router)
- TypeScript
- TailwindCSS
- ShadcN UI
- Zustand (상태 관리)
- date-fns (날짜 처리)

## 5. 향후 개발 계획

### 회원가입 및 로그인 기능
- 이메일 및 비밀번호를 통한 회원가입
- 소셜 로그인 지원: 구글, 페이스북 등 소셜 계정을 통한 간편 로그인
- 데이터 동기화: 로그인한 계정 간 작업 및 목표 데이터 동기화

### 계정 설정
- 프로필 수정: 사용자 이름, 프로필 이미지 변경
- 알림 설정: 푸시 알림 수신 여부 및 시간대 설정
- 비밀번호 변경 및 보안 설정

### 알림 및 리마인더 기능
- 작업 마감일 및 목표 기간에 따른 푸시 알림 제공
- 데일리 리마인더: 일일 목표 시작 시 알림

### 통계 및 리포트
- 주간/월간 생산성 통계 제공
- 목표 달성률 및 작업 패턴 분석

### 커뮤니티 및 공유 기능
- 목표 및 성과를 다른 사용자와 공유
- 팀 작업 기능 및 협업 도구 추가

### 다국어 지원
- 글로벌 사용자를 위한 다국어 인터페이스 제공

### 모바일 앱 출시
- iOS 및 안드로이드 앱 개발로 접근성 강화

## 6. 결론
Perfect Focusing은 1차 MVP를 통해 핵심 기능인 목표 관리, 할 일 관리, 집중 모드를 성공적으로 구현했습니다. 현재는 로컬 스토리지 기반으로 동작하며, 회원가입 없이도 모든 기능을 이용할 수 있도록 하여 진입 장벽을 낮췄습니다. 향후 사용자 피드백을 바탕으로 회원 기능과 추가 기능들을 단계적으로 개발할 예정입니다.