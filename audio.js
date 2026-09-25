function speak(text) {
  if (!("speechSynthesis" in window)) {
    console.warn("이 기기에서 음성 기능을 사용할 수 없습니다.");
    return;
  }

  speechSynthesis.cancel();

  const voices = speechSynthesis.getVoices();
  const koVoices = voices.filter(v =>
    v.lang && (v.lang.toLowerCase() === "ko-kr" || v.lang.toLowerCase().startsWith("ko"))
  );

  let speechText = text;
  
  // 1글자 단독 발음 시 파닉스 튜닝 (이중모음 소리 구분)
  if (text.length === 1) {
    const phonicMap = {
      "요": "요오", "갓": "갇",
      "쟈": "지야", "져": "지여", "죠": "지요", "쥬": "지유",
      "챠": "치야", "쳐": "치여", "쵸": "치요", "츄": "치유",
      "샤": "시야", "셔": "시여", "쇼": "시요", "슈": "시유"
    };
    if (phonicMap[text]) speechText = phonicMap[text];
  } else {
    // 단어일 경우의 예외 처리
    if (text === "갓") speechText = "갇";
  }

  const u = new SpeechSynthesisUtterance(speechText);
  u.lang = "ko-KR";
  u.rate = 0.72;
  u.pitch = 1.0;

  if (koVoices.length) u.voice = koVoices[0];

  speechSynthesis.speak(u);
}
