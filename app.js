
// --- State ---
const state = { picked: [] };
const readState = { picked: [] };
let wordIndex = 0;

// --- Initialize DOM ---
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

// --- Drag & Drop ---
function startDrag(e) {
  const char = e.currentTarget.dataset.char;
  const type = e.currentTarget.dataset.type;
  e.preventDefault();

  const ghost = document.createElement("div");
  ghost.textContent = char;
  ghost.className = "jamo ghost";
  ghost.style.cssText = `
    position:fixed; left:${e.clientX}px; top:${e.clientY}px;
    transform:translate(-50%,-50%); 
    z-index:9999; pointer-events:none;
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
  if (targetState.picked.length >= 3) return; // 최대 초/중/종성
  targetState.picked.push({ char, type });
  renderPlaced(targetState, placedSelector);
  updateResult(targetState, resultSelector);
  
  // 시각적 애니메이션 피드백
  const resultEl = document.querySelector(resultSelector);
  resultEl.classList.remove('pop');
  void resultEl.offsetWidth; // trigger reflow
  resultEl.classList.add('pop');
}

function renderPlaced(s, selector) {
  // UI 통합으로 인해 사용하지 않음
}

function updateResult(s, selector) {
  const result = document.querySelector(selector);
  const chars = s.picked.map(x => x.char);
  const c = chars.find(x => consonants.some(y => y[0] === x));
  const v = chars.find(x => vowels.some(y => y[0] === x));
  const final = chars.filter(x => consonants.some(y => y[0] === x))[1];

  let word = "";
  if (c && v) {
    word = syllableMap[c + v] || "";
    if (final && word) word = composeFinal(word, final);
  } else if (c) {
    word = c;
  } else if (v) {
    word = v;
  }
  
  result.textContent = word;
  const listenBtn = selector === "#result" ? document.querySelector("#listen") : document.querySelector("#readListen");
  if(listenBtn) listenBtn.disabled = !word;
}

// --- Event Listeners ---
const listenBtn = document.querySelector("#listen");
if(listenBtn) {
  listenBtn.addEventListener("click", () => {
    const res = document.querySelector("#result").textContent;
    if(res) speak(res);
  });
}

const clearBtn = document.querySelector("#clear");
if(clearBtn) {
  clearBtn.addEventListener("click", () => {
    state.picked = [];
    renderPlaced(state, "#placed");
    updateResult(state, "#result");
  });
}

// --- Read Words ---
function renderWord() {
  const item = words[wordIndex];
  const wordEl = document.querySelector("#word");
  if(!wordEl) return;
  wordEl.textContent = item.word;
  
  const emojiEl = document.querySelector("#wordEmoji");
  if (item.image) {
    emojiEl.innerHTML = `<img src="${item.image}" alt="${item.word}" style="max-height: 150px; border-radius: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">`;
  } else {
    emojiEl.textContent = item.emoji;
  }
  
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

const wordEl = document.querySelector("#word");
if(wordEl) {
  wordEl.style.cursor = "pointer";
  wordEl.addEventListener("click", () => {
    speak(wordEl.textContent);
  });
}

const nextBtn = document.querySelector("#nextWord");
if(nextBtn) {
  nextBtn.addEventListener("click", () => {
    wordIndex = (wordIndex + 1) % words.length;
    renderWord();
  });
}

const readListenBtn = document.querySelector("#readListen");
if(readListenBtn) {
  readListenBtn.addEventListener("click", () => {
    const t = document.querySelector("#readResult").textContent;
    if (t) speak(t);
  });
}

// --- Syllable Chart ---
function renderChart() {
  const grid = document.querySelector("#chartGrid");
  if (!grid) return;
  grid.replaceChildren();

  consonants.forEach(c => {
    vowels.forEach(v => {
      const char = syllableMap[c[0] + v[0]];
      if (char) {
        const btn = document.createElement("button");
        btn.className = "chart-cell";
        btn.textContent = char;
        btn.addEventListener("click", () => {
          speak(char);
          btn.classList.add("pressed");
          setTimeout(() => btn.classList.remove("pressed"), 300);
        });
        grid.appendChild(btn);
      }
    });
  });
}
renderChart();

// --- Tabs ---
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(x => x.classList.remove("active"));
    document.querySelectorAll(".screen").forEach(x => x.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector("#" + tab.dataset.tab).classList.add("active");
  });
});

// --- Canvas Drawing (직접 쓰기) ---
const canvas = document.getElementById("drawCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let isDrawing = false;

  const resize = () => {
    if (canvas.parentElement.clientWidth === 0) return;
    if (canvas.width !== canvas.parentElement.clientWidth || canvas.height !== canvas.parentElement.clientHeight) {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = 15;
      ctx.strokeStyle = "#413b35";
    }
  };
  window.addEventListener('resize', resize);
  const ro = new ResizeObserver(resize);
  ro.observe(canvas.parentElement);
  resize();

  const getPos = (e) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const start = (e) => {
    isDrawing = true;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    e.preventDefault();
  };
  const move = (e) => {
    if (!isDrawing) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    e.preventDefault();
  };
  const end = () => {
    isDrawing = false;
  };

  canvas.addEventListener("pointerdown", start);
  canvas.addEventListener("pointermove", move);
  window.addEventListener("pointerup", end);
  canvas.addEventListener("touchstart", start, { passive: false });
  canvas.addEventListener("touchmove", move, { passive: false });
  window.addEventListener("touchend", end);

  document.querySelector("#clearCanvas").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
}
