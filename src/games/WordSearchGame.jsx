import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from '../components/NoorAvatar';
import { playAudioTone } from '../services/speechService';

const TARGET_WORDS = ['نور', 'صدق', 'بر'];

export default function WordSearchGame() {
  const { addXpAndCoins, speak, setActiveScreen } = useGame();
  const [foundWords, setFoundWords] = useState([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    speak("ابحث عن الكلمات المخفية التالية في شبكة الحروف: نور، صدق، بر!");
  }, []);

  const handleSelectWord = (word) => {
    if (foundWords.includes(word)) return;
    playAudioTone('success');
    speak(`أحسنت! وجدت كلمة: ${word}!`);
    const updated = [...foundWords, word];
    setFoundWords(updated);

    if (updated.length === TARGET_WORDS.length) {
      setIsDone(true);
      addXpAndCoins(40, 20);
      speak("رائع جداً! وجدت جميع الكلمات المخفية في الشبكة وحصلت على 40 نقطة!");
    }
  };

  return (
    <div className="glass-card bounce-in" style={{ width: '95%', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', padding: '6px 14px', margin: 0 }} onClick={() => setActiveScreen('classroom')}>
          🔙 عودة
        </button>
        <h2 style={{ color: 'var(--primary)', margin: 0 }}>🔤 شبكة الكلمات المخفية</h2>
        <div style={{ width: '60px' }}></div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#DBEAFE', padding: '8px 15px', borderRadius: '16px', marginBottom: '15px' }}>
        <NoorAvatar expression={isDone ? 'happy' : 'thinking'} size={45} />
        <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          {isDone ? 'وجدت الكلمات كاملة! 🏆' : `الكلمات المكتشفة: (${foundWords.length}/${TARGET_WORDS.length})`}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '20px' }}>
        {TARGET_WORDS.map(w => (
          <button
            key={w}
            className="btn"
            style={{
              background: foundWords.includes(w) ? '#10B981' : '#FFF',
              color: foundWords.includes(w) ? '#FFF' : '#1E293B',
              border: '2px solid var(--primary)',
              fontSize: '1.2rem',
              padding: '12px 24px'
            }}
            onClick={() => handleSelectWord(w)}
          >
            {w} {foundWords.includes(w) ? '✅' : '🔍'}
          </button>
        ))}
      </div>

      {isDone && (
        <button className="btn pulse" style={{ background: '#10B981', color: 'white', fontSize: '1.2rem' }} onClick={() => setActiveScreen('classroom')}>العودة للمسارات 🚀</button>
      )}
    </div>
  );
}
