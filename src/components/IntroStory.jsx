import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from './NoorAvatar';
import { playAudioTone } from '../services/speechService';

export default function IntroStory() {
  const { playerName, setPlayerName, setActiveScreen, speak, saveState } = useGame();
  const [started, setStarted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [highFived, setHighFived] = useState(false);
  const [discoveredItems, setDiscoveredItems] = useState({ book: false, glass: false, star: false });
  const [tempName, setTempName] = useState(playerName || '');

  const slides = [
    { id: 'intro', text: "مرحبًا! أنا نور.. وهذا كتاب المعرفة السحري مقفل، ولن يفتح إلا باسم بطل ذكي!", expression: "happy", input: true },
    { id: 'high_five', text: `أهلاً بك يا ${tempName || 'بطل'}! لقد فتحت الكتاب! أعطني 'كف' (High Five) لننطلق!`, expression: "happy", action: 'high_five' },
    { id: 'discover', text: "هذه أدواتي السحرية.. اضغط عليها لتكتشف سرها!", expression: "thinking", action: 'discover' },
    { id: 'branching', text: "لدي خريطتان سحريتان اليوم، إلى أين تريد أن نذهب؟", expression: "idle", action: 'branching' }
  ];

  const slide = slides[currentSlide];

  const handleStart = () => {
    setStarted(true);
    speak(slide.text);
  };

  const handleNext = () => {
    if (slide.input && tempName.trim()) {
      setPlayerName(tempName.trim());
      saveState({ playerName: tempName.trim() });
    }

    if (currentSlide < slides.length - 1) {
      const nextIdx = currentSlide + 1;
      setCurrentSlide(nextIdx);
      speak(slides[nextIdx].text);
      playAudioTone('success');
    } else {
      setActiveScreen('universe');
    }
  };

  const handleHighFive = () => {
    setHighFived(true);
    playAudioTone('success');
    speak("كف ممتاز! أحييك على طاقاتك الحماسية!");
  };

  const handleDiscover = (item) => {
    const updated = { ...discoveredItems, [item]: true };
    setDiscoveredItems(updated);
    playAudioTone('success');
    if (item === 'book') speak("في هذا الكتاب، سنقرأ أجمل القصص والحكايات!");
    if (item === 'glass') speak("بالعدسة السحرية، سنبحث عن الأجوبة والحلول الذكية!");
    if (item === 'star') speak("بالنجمة، سنجمع أوسمة ومكافآت التفوق!");
  };

  const handleChoosePath = (path) => {
    playAudioTone('success');
    if (path === 'space') {
      speak("اختيار رائع! هيا نحلق معاً بين كواكب المعرفة ونكتشف الفضاء!");
    } else {
      speak("ممتاز! هيا نكتشف أسرار غابة المعرفة والألغاز الممتعة!");
    }
    setTimeout(() => {
      setActiveScreen('universe');
    }, 1200);
  };

  if (!started) {
    return (
      <div className="glass-card bounce-in" style={{ textAlign: 'center', width: '90%', maxWidth: '500px', margin: 'auto', marginTop: '40px' }}>
        <div style={{ margin: '0 auto 20px auto' }}>
          <NoorAvatar expression="happy" size={180} />
        </div>
        <h1 style={{ color: 'var(--primary)', fontSize: '2.2rem', marginBottom: '20px' }}>مستعد للمغامرة مع نور؟ ✨</h1>
        <button className="btn pulse" style={{ fontSize: '1.4rem', padding: '16px 40px', borderRadius: '30px' }} onClick={handleStart}>
          ابدأ القصة 🚀
        </button>
      </div>
    );
  }

  const allDiscovered = discoveredItems.book && discoveredItems.glass && discoveredItems.star;

  return (
    <div className="glass-card bounce-in" style={{ width: '90%', maxWidth: '550px', margin: 'auto', marginTop: '30px', textAlign: 'center' }}>
      <div style={{ margin: '0 auto 15px auto' }}>
        <NoorAvatar expression={slide.expression} size={170} />
      </div>

      <div className="speech-bubble" style={{ marginBottom: '20px' }}>
        {slide.text}
      </div>

      {/* Interactive Controls per slide */}
      {slide.input && (
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            className="input-name"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="اكتب اسمك هنا يا بطل..."
            style={{ width: '90%', padding: '12px', borderRadius: '15px', border: '2px solid var(--primary)', fontSize: '1.1rem', textAlign: 'center' }}
          />
        </div>
      )}

      {slide.action === 'high_five' && (
        <div style={{ marginBottom: '20px' }}>
          <div
            onClick={handleHighFive}
            style={{
              fontSize: '4.5rem',
              cursor: 'pointer',
              display: 'inline-block',
              transform: highFived ? 'scale(1.3)' : 'scale(1)',
              transition: 'transform 0.3s'
            }}
            className={!highFived ? 'pulse' : ''}
          >
            {highFived ? '✨👏✨' : '🖐️'}
          </div>
          {highFived && <p style={{ color: 'var(--accent)', fontWeight: 700, marginTop: '8px' }}>تم إعطاء الكف بنجاح! اضغط التالي ➡️</p>}
        </div>
      )}

      {slide.action === 'discover' && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
          <div
            onClick={() => handleDiscover('book')}
            style={{
              fontSize: '3rem',
              cursor: 'pointer',
              padding: '12px',
              background: discoveredItems.book ? '#DBEAFE' : '#FFF',
              borderRadius: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              opacity: discoveredItems.book ? 0.6 : 1
            }}
          >
            📚
          </div>
          <div
            onClick={() => handleDiscover('glass')}
            style={{
              fontSize: '3rem',
              cursor: 'pointer',
              padding: '12px',
              background: discoveredItems.glass ? '#DBEAFE' : '#FFF',
              borderRadius: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              opacity: discoveredItems.glass ? 0.6 : 1
            }}
          >
            🔍
          </div>
          <div
            onClick={() => handleDiscover('star')}
            style={{
              fontSize: '3rem',
              cursor: 'pointer',
              padding: '12px',
              background: discoveredItems.star ? '#DBEAFE' : '#FFF',
              borderRadius: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              opacity: discoveredItems.star ? 0.6 : 1
            }}
          >
            ⭐
          </div>
        </div>
      )}

      {slide.action === 'branching' && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button className="btn" style={{ background: '#3B82F6', color: 'white' }} onClick={() => handleChoosePath('space')}>
            الفضاء السحيق 🪐
          </button>
          <button className="btn" style={{ background: '#10B981', color: 'white' }} onClick={() => handleChoosePath('forest')}>
            غابة المعرفة 🌲
          </button>
        </div>
      )}

      {/* Navigation Buttons */}
      {(!slide.action || (slide.action === 'high_five' && highFived) || (slide.action === 'discover' && allDiscovered)) && (
        <button
          className="btn"
          style={{ background: slide.input ? 'var(--accent)' : 'var(--btn-bg)', fontSize: '1.2rem', padding: '12px 30px' }}
          onClick={handleNext}
        >
          {slide.input ? 'افتح الكتاب 🔓' : 'التالي ➡️'}
        </button>
      )}
    </div>
  );
}
