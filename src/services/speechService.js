let currentUtterance = null;
let currentSubtitleCallback = null;

// Register Subtitle Listener
export function setSubtitleCallback(cb) {
  currentSubtitleCallback = cb;
}

// Advanced Phonetic Diacritics Mapper for Ultra-Clear Arabic TTS
function applyDiacritics(text) {
  if (!text) return "";
  return text
    .replace(/مرحبا/g, "مَرْحَبًا")
    .replace(/مرحباً/g, "مَرْحَبًا")
    .replace(/نور/g, "نُور")
    .replace(/رحلة/g, "رِحْلَة")
    .replace(/الخيمة الصفية/g, "الخَيْمَة الصَّفِيَّة")
    .replace(/رتب/g, "رَتِّب")
    .replace(/بأي/g, "بِأَيِّ")
    .replace(/كم مرة/g, "كَمْ مَرَّة")
    .replace(/ندخل/g, "نَدْخُل")
    .replace(/نخرج/g, "نَخْرُج")
    .replace(/نغسل/g, "نَغْسِل")
    .replace(/الصلاة/g, "الصَّلَاة")
    .replace(/الوضوء/g, "الوُضُوء")
    .replace(/الفجر/g, "الفَجْر")
    .replace(/الظهر/g, "الظُّهْر")
    .replace(/بسم الله/g, "بِسْمِ اللهِ")
    .replace(/الحمد لله/g, "الحَمْدُ لِلَّهِ")
    .replace(/أمانة/g, "أَمَانَة")
    .replace(/صدق/g, "صِدْق")
    .replace(/طعام/g, "طَعَام");
}

export function speakText(text, audioEnabled = true, onStart = null, onEnd = null) {
  if (!audioEnabled || !text) {
    if (onEnd) onEnd();
    return;
  }

  const spokenText = applyDiacritics(text);

  // Trigger Subtitle Update
  if (currentSubtitleCallback) {
    currentSubtitleCallback(spokenText);
  }

  // Web Speech API HD Voices - Strictly Female / Child Pitch Filter
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.92;
    utterance.pitch = 1.55; // Cute young girl pitch

    const voices = window.speechSynthesis.getVoices();

    // EXCLUDE MALE VOICES (Naayf, Male, etc.)
    const femaleChildVoice = voices.find(v =>
      v.lang.startsWith('ar') &&
      !v.name.includes('Naayf') &&
      !v.name.includes('Male') &&
      (v.name.includes('Zariyah') || v.name.includes('Salma') || v.name.includes('Laila') || v.name.includes('Female') || v.name.includes('Google') || v.name.includes('Hoda'))
    ) || voices.find(v => v.lang.startsWith('ar') && !v.name.includes('Naayf'));

    if (femaleChildVoice) utterance.voice = femaleChildVoice;

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      if (onEnd) onEnd();
      if (currentSubtitleCallback) currentSubtitleCallback(null);
    };

    utterance.onerror = () => {
      if (onEnd) onEnd();
      if (currentSubtitleCallback) currentSubtitleCallback(null);
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    return;
  }

  // ResponsiveVoice Fallback with Female Child Pitch
  if (typeof window !== 'undefined' && window.responsiveVoice) {
    if (onStart) onStart();
    window.responsiveVoice.speak(spokenText, "Arabic Female", {
      rate: 0.9,
      pitch: 1.3, // High female pitch
      onend: () => {
        if (onEnd) onEnd();
        if (currentSubtitleCallback) currentSubtitleCallback(null);
      }
    });
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
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } else {
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.setValueAtTime(196, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
    }
  } catch (e) {
    // Audio Context Fallback
  }
}
