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
  if (text === "요") speechText = "요오";
  // 애플/맥 TTS 엔진이 '갓'을 영어나 약어(카스 등)로 오인식하는 버그 방지 (발음이 같은 '갇'으로 대체)
  if (text === "갓") speechText = "갇";

  const u = new SpeechSynthesisUtterance(speechText);
  u.lang = "ko-KR";
  u.rate = 0.72;
  u.pitch = 1.0;

  if (koVoices.length) u.voice = koVoices[0];

  speechSynthesis.speak(u);
}
