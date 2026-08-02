export function speakText(text, audioEnabled = true) {
  if (!audioEnabled || !text) return;

  // Phonetic correction for Arabic Tashkeel
  const spokenText = text
    .replace(/رتب/g, "رَتِّب")
    .replace(/بأي/g, "بِأَيِّ")
    .replace(/كم مرة/g, "كَمْ مَرَّة")
    .replace(/ندخل/g, "نَدْخُل")
    .replace(/نخرج/g, "نَخْرُج")
    .replace(/نغسل/g, "نَغْسِل")
    .replace(/الصلاة/g, "الصَّلَاة")
    .replace(/الوضوء/g, "الوُضُوء")
    .replace(/الفجر/g, "الفَجْر")
    .replace(/الظهر/g, "الظُّهْر");

  if (typeof window !== 'undefined' && window.responsiveVoice) {
    window.responsiveVoice.speak(spokenText, "Arabic Female", { rate: 0.9, pitch: 1 });
  } else if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = 'ar-SA';
    utterance.pitch = 1.4;
    window.speechSynthesis.speak(utterance);
  }
}

export function playAudioTone(type = 'success') {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'success') {
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } else {
      osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
      osc.frequency.setValueAtTime(196, ctx.currentTime + 0.15); // G3
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
    }
  } catch (e) {
    // Audio Context fallback
  }
}
