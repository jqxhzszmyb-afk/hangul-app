# Phase 2: Planning - 기본 글자표(가~히) 탭 추가

**Impact Score (1-10): 4**
- 위험도 중간 이하. 기존 기능에 영향을 주지 않는 독립적인 화면(Tab)과 레이아웃 추가.

**작업 분류**: [STRATEGIC] (다중 파일 수정: HTML, CSS, JS)

## Step-by-Step Logic

### Step 1: `index.html` 수정
- `<nav class="tabs">` 내에 자모 조합과 단어 읽기 사이에 `<button class="tab" data-tab="chart">가나다 표</button>` 삽입.
- `<main>` 내에 `<section id="chart" class="screen">...</section>` 뼈대 삽입.

### Step 2: `style.css` 수정
- `.chart-container`: 아이패드 화면에서 표가 잘리지 않도록 가로 스크롤 허용 (`overflow-x: auto`).
- `.chart-grid`: `display: grid; grid-template-columns: repeat(10, 1fr);` (모음 10개 기준 10열).
- `.chart-cell`: 글자 크기(2rem), 여백, 둥근 모서리, 터치 시 시각적 효과 부여.

### Step 3: `app.js` 수정
- `renderChart()` 함수 생성:
  - `consonants` (14개)와 `vowels` (10개)를 순회하며 `syllableMap[c + v]`를 참조하여 '가' ~ '히' 글자를 뽑아냄.
  - `<button class="chart-cell">` 요소 140개를 동적으로 생성하여 `#chartGrid`에 `appendChild`.
  - 각 버튼에 `click` 이벤트 리스너를 달아 `speak(글자)` 실행.
- 파일 로드 시 1회 호출.

**Pause**: 사용자에게 [실행] 승인 대기.
