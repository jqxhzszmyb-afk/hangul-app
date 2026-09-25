# Phase 2: Planning - 단어 앞뒤 이동 및 구글 시트 연동

**Impact Score (1-10): 6**
- 기존 데이터 구조와 이벤트 리스너를 수정하고, 외부 네트워크(Fetch API) 연동이 추가되므로 주의 깊은 작업이 필요함.
- **작업 분류**: [STRATEGIC]

## Step-by-Step Logic

### 1. 단어 앞/뒤 이동 버튼 추가
*   **HTML**: 기존 `<button id="nextWord">다른 단어</button>`를 `<div class="word-nav"><button id="prevWord">◀ 이전</button> <button id="nextWord">다음 ▶</button></div>` 형태로 분할.
*   **CSS**: 두 버튼이 나란히 예쁘게 배치되도록 Flexbox 스타일 추가.
*   **JS**: `wordIndex`를 1씩 빼거나(음수일 경우 배열의 끝으로), 더하는 방향으로 이동하는 로직 2개로 분리.

### 2. 구글 시트를 활용한 '나만의 단어장' 연동
부모님이 코딩을 몰라도 **구글 스프레드시트**에 단어만 입력하면 앱에 자동으로 뜨게 만드는 기능입니다.
*   **방식**: 구글 시트를 '웹에 게시(CSV)' 상태로 만들고, 앱(`app.js`)이 켜질 때 해당 CSV 주소를 읽어와서 기존 단어 리스트(`words` 배열)에 동적으로 추가.
*   **JS**: `fetch(GOOGLE_SHEET_CSV_URL)`를 통해 데이터를 가져오고 텍스트를 파싱하여 배열에 삽입하는 `loadCustomWords()` 함수 추가.
*   **예외 처리**: 인터넷이 안 될 경우(오프라인) 기존 기본 단어들만 나오도록 에러 핸들링.

**Pause**: 사용자에게 [실행] 승인 및 구글 시트 주소 공유 대기.
