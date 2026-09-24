const consonants = [
  ["ㄱ","기역"],["ㄴ","니은"],["ㄷ","디귿"],["ㄹ","리을"],["ㅁ","미음"],["ㅂ","비읍"],["ㅅ","시옷"],
  ["ㅇ","이응"],["ㅈ","지읒"],["ㅊ","치읓"],["ㅋ","키읔"],["ㅌ","티읕"],["ㅍ","피읖"],["ㅎ","히읗"]
];
const vowels = [
  ["ㅏ","아"],["ㅑ","야"],["ㅓ","어"],["ㅕ","여"],["ㅗ","오"],
  ["ㅛ","요"],["ㅜ","우"],["ㅠ","유"],["ㅡ","으"],["ㅣ","이"]
];

const syllableMap = {
  "ㄱㅏ":"가","ㄱㅑ":"갸","ㄱㅓ":"거","ㄱㅕ":"겨","ㄱㅗ":"고","ㄱㅛ":"교","ㄱㅜ":"구","ㄱㅠ":"규","ㄱㅡ":"그","ㄱㅣ":"기",
  "ㄴㅏ":"나","ㄴㅑ":"냐","ㄴㅓ":"너","ㄴㅕ":"녀","ㄴㅗ":"노","ㄴㅛ":"뇨","ㄴㅜ":"누","ㄴㅠ":"뉴","ㄴㅡ":"느","ㄴㅣ":"니",
  "ㄷㅏ":"다","ㄷㅑ":"댜","ㄷㅓ":"더","ㄷㅕ":"뎌","ㄷㅗ":"도","ㄷㅛ":"됴","ㄷㅜ":"두","ㄷㅠ":"듀","ㄷㅡ":"드","ㄷㅣ":"디",
  "ㄹㅏ":"라","ㄹㅑ":"랴","ㄹㅓ":"러","ㄹㅕ":"려","ㄹㅗ":"로","ㄹㅛ":"료","ㄹㅜ":"루","ㄹㅠ":"류","ㄹㅡ":"르","ㄹㅣ":"리",
  "ㅁㅏ":"마","ㅁㅑ":"먀","ㅁㅓ":"머","ㅁㅕ":"며","ㅁㅗ":"모","ㅁㅛ":"묘","ㅁㅜ":"무","ㅁㅠ":"뮤","ㅁㅡ":"므","ㅁㅣ":"미",
  "ㅂㅏ":"바","ㅂㅑ":"뱌","ㅂㅓ":"버","ㅂㅕ":"벼","ㅂㅗ":"보","ㅂㅛ":"뵤","ㅂㅜ":"부","ㅂㅠ":"뷰","ㅂㅡ":"브","ㅂㅣ":"비",
  "ㅅㅏ":"사","ㅅㅑ":"샤","ㅅㅓ":"서","ㅅㅕ":"셔","ㅅㅗ":"소","ㅅㅛ":"쇼","ㅅㅜ":"수","ㅅㅠ":"슈","ㅅㅡ":"스","ㅅㅣ":"시",
  "ㅇㅏ":"아","ㅇㅑ":"야","ㅇㅓ":"어","ㅇㅕ":"여","ㅇㅗ":"오","ㅇㅛ":"요","ㅇㅜ":"우","ㅇㅠ":"유","ㅇㅡ":"으","ㅇㅣ":"이",
  "ㅈㅏ":"자","ㅈㅑ":"쟈","ㅈㅓ":"저","ㅈㅕ":"져","ㅈㅗ":"조","ㅈㅛ":"죠","ㅈㅜ":"주","ㅈㅠ":"쥬","ㅈㅡ":"즈","ㅈㅣ":"지",
  "ㅊㅏ":"차","ㅊㅑ":"챠","ㅊㅓ":"처","ㅊㅕ":"쳐","ㅊㅗ":"초","ㅊㅛ":"쵸","ㅊㅜ":"추","ㅊㅠ":"츄","ㅊㅡ":"츠","ㅊㅣ":"치",
  "ㅋㅏ":"카","ㅋㅑ":"캬","ㅋㅓ":"커","ㅋㅕ":"켜","ㅋㅗ":"코","ㅋㅛ":"쿄","ㅋㅜ":"쿠","ㅋㅠ":"큐","ㅋㅡ":"크","ㅋㅣ":"키",
  "ㅌㅏ":"타","ㅌㅑ":"탸","ㅌㅓ":"터","ㅌㅕ":"텨","ㅌㅗ":"토","ㅌㅛ":"툐","ㅌㅜ":"투","ㅌㅠ":"튜","ㅌㅡ":"트","ㅌㅣ":"티",
  "ㅍㅏ":"파","ㅍㅑ":"퍄","ㅍㅓ":"퍼","ㅍㅕ":"펴","ㅍㅗ":"포","ㅍㅛ":"표","ㅍㅜ":"푸","ㅍㅠ":"퓨","ㅍㅡ":"프","ㅍㅣ":"피",
  "ㅎㅏ":"하","ㅎㅑ":"햐","ㅎㅓ":"허","ㅎㅕ":"혀","ㅎㅗ":"호","ㅎㅛ":"효","ㅎㅜ":"후","ㅎㅠ":"휴","ㅎㅡ":"흐","ㅎㅣ":"히"
};

const state = { picked: [] };
const readState = { picked: [] };

function makeJamoButton([char, name], type) {
  const b = document.createElement("button");
  b.className = "jamo";
  b.textContent = char;
  b.dataset.char = char;
  b.dataset.type = type;
  b.title = name;
  b.addEventListener("click", () => speak(name));
  b.addEventListener("pointerdown", startDrag);
  return b;
}

document.querySelector("#consonants").replaceChildren(...consonants.map(x => makeJamoButton(x, "consonant")));
document.querySelector("#vowels").replaceChildren(...vowels.map(x => makeJamoButton(x, "vowel")));

function startDrag(e) {
  const char = e.currentTarget.dataset.char;
  const type = e.currentTarget.dataset.type;
  e.preventDefault();

  const ghost = document.createElement("div");
  ghost.textContent = char;
  ghost.style.cssText = `
    position:fixed; left:${e.clientX}px; top:${e.clientY}px;
    transform:translate(-50%,-50%); font-size:64px; font-weight:600;
    z-index:9999; pointer-events:none; color:var(--ink);
  `;
  document.body.appendChild(ghost);

  const move = ev => {
    ghost.style.left = `${ev.clientX}px`;
    ghost.style.top = `${ev.clientY}px`;
    const zone = document.querySelector("#dropZone");
    const r = zone.getBoundingClientRect();
    zone.classList.toggle("over", ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom);
  };

  const up = ev => {
    ghost.remove();
    document.removeEventListener("pointermove", move);
    document.removeEventListener("pointerup", up);
    const zone = document.querySelector("#dropZone");
    zone.classList.remove("over");
    const r = zone.getBoundingClientRect();
    if (ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom) {
      addJamo(char, type, state, "#placed", "#result");
    }
  };

  document.addEventListener("pointermove", move);
  document.addEventListener("pointerup", up, { once: true });
}

function addJamo(char, type, targetState, placedSelector, resultSelector) {
  if (targetState.picked.length >= 3) return;
  targetState.picked.push({ char, type });
  renderPlaced(targetState, placedSelector);
  updateResult(targetState, resultSelector);
}

function renderPlaced(s, selector) {
  const zone = document.querySelector(selector);
  zone.replaceChildren();

  // 아이가 놓은 순서를 그대로 보여준다.
  // 예: ㅋ + ㅏ + ㅁ → [ ㅋㅏㅁ ]
  if (s.picked.length) {
    const sequence = document.createElement("div");
    sequence.className = "jamo-sequence";
    sequence.textContent = s.picked.map(item => item.char).join("");
    zone.appendChild(sequence);
  }
}

function updateResult(s, selector) {
  const result = document.querySelector(selector);
  const chars = s.picked.map(x => x.char);
  const c = chars.find(x => consonants.some(y => y[0] === x));
  const v = chars.find(x => vowels.some(y => y[0] === x));
  const final = chars.filter(x => consonants.some(y => y[0] === x))[1];

  let word = "";
  if (c && v) word = syllableMap[c + v] || "";
  if (c && v && final && word) {
    word = composeFinal(word, final);
  }
  result.textContent = word;
  const listen = selector === "#result" ? document.querySelector("#listen") : document.querySelector("#readListen");
  listen.disabled = !word;
}

const finalIndex = {"ㄱ":1,"ㄲ":2,"ㄳ":3,"ㄴ":4,"ㄵ":5,"ㄶ":6,"ㄷ":7,"ㄹ":8,"ㄺ":9,"ㄻ":10,"ㄼ":11,"ㄽ":12,"ㄾ":13,"ㄿ":14,"ㅀ":15,"ㅁ":16,"ㅂ":17,"ㅄ":18,"ㅅ":19,"ㅆ":20,"ㅇ":21,"ㅈ":22,"ㅊ":23,"ㅋ":24,"ㅌ":25,"ㅍ":26,"ㅎ":27};
const cho = {"ㄱ":0,"ㄲ":1,"ㄴ":2,"ㄷ":3,"ㄸ":4,"ㄹ":5,"ㅁ":6,"ㅂ":7,"ㅃ":8,"ㅅ":9,"ㅆ":10,"ㅇ":11,"ㅈ":12,"ㅉ":13,"ㅊ":14,"ㅋ":15,"ㅌ":16,"ㅍ":17,"ㅎ":18};
const jung = {"ㅏ":0,"ㅐ":1,"ㅑ":2,"ㅒ":3,"ㅓ":4,"ㅔ":5,"ㅕ":6,"ㅖ":7,"ㅗ":8,"ㅘ":9,"ㅙ":10,"ㅚ":11,"ㅛ":12,"ㅜ":13,"ㅝ":14,"ㅞ":15,"ㅟ":16,"ㅠ":17,"ㅡ":18,"ㅢ":19,"ㅣ":20};

function composeFinal(base, finalChar) {
  const f = finalIndex[finalChar];
  if (!f) return base;
  const code = base.codePointAt(0) - 0xAC00;
  if (code < 0 || code > 11171) return base;
  const l = Math.floor(code / 588);
  const v = Math.floor((code % 588) / 28);
  return String.fromCodePoint(0xAC00 + l*588 + v*28 + f);
}

function speak(text) {
  if (!("speechSynthesis" in window)) {
    alert("이 기기에서 음성 기능을 사용할 수 없습니다.");
    return;
  }

  speechSynthesis.cancel();

  const voices = speechSynthesis.getVoices();
  const koVoices = voices.filter(v =>
    v.lang && (v.lang.toLowerCase() === "ko-kr" || v.lang.toLowerCase().startsWith("ko"))
  );

  // 브라우저마다 고립된 모음의 발음이 달라질 수 있다.
  // 특히 ㅛ → "여"처럼 들리는 엔진이 있어, 우선 '요.' 형태로 요청한다.
  // 그래도 엔진 자체가 잘못 읽으면 녹음 음원이 가장 정확한 해결책이다.
  const speechText = text === "요" ? "요." : text;

  const u = new SpeechSynthesisUtterance(speechText);
  u.lang = "ko-KR";
  u.rate = .72;
  u.pitch = 1.0;

  // 한국어 음성이 여러 개 있으면 첫 번째 한국어 음성을 사용한다.
  if (koVoices.length) u.voice = koVoices[0];

  speechSynthesis.speak(u);
}

document.querySelector("#listen").addEventListener("click", () => {
  document.querySelector("#result").textContent && speak(document.querySelector("#result").textContent);
});
document.querySelector("#clear").addEventListener("click", () => {
  state.picked = [];
  renderPlaced(state, "#placed");
  updateResult(state, "#result");
});

const words = [
  {word:"기차", emoji:"🚂"},
  {word:"가방", emoji:"🎒"},
  {word:"나비", emoji:"🦋"},
  {word:"고기", emoji:"🍖"}
];
let wordIndex = 0;

function renderWord() {
  const item = words[wordIndex];
  document.querySelector("#word").textContent = item.word;
  document.querySelector("#wordEmoji").textContent = item.emoji;
  const parts = document.querySelector("#wordParts");
  parts.replaceChildren();
  [...item.word].forEach(ch => {
    const b = document.createElement("button");
    b.className = "part";
    b.textContent = ch;
    b.addEventListener("click", () => speak(ch));
    parts.appendChild(b);
  });
}
renderWord();

document.querySelector("#nextWord").addEventListener("click", () => {
  wordIndex = (wordIndex + 1) % words.length;
  readState.picked = [];
  document.querySelector("#readPlaced").replaceChildren();
  document.querySelector("#readResult").textContent = "";
  document.querySelector("#readListen").disabled = true;
  renderWord();
});

document.querySelector("#readListen").addEventListener("click", () => {
  const t = document.querySelector("#readResult").textContent;
  if (t) speak(t);
});

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(x => x.classList.remove("active"));
    document.querySelectorAll(".screen").forEach(x => x.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector("#" + tab.dataset.tab).classList.add("active");
  });
});
