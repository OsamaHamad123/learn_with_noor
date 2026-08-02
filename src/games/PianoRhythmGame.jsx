import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from '../components/NoorAvatar';
import { playAudioTone } from '../services/speechService';

const KEYS = [
  { id: 1, note: 'دو 🎵', color: '#EF4444' },
  { id: 2, note: 'ري 🎶', color: '#F59E0B' },
  { id: 3, note: 'مي ✨', color: '#10B981' },
  { id: 4, note: 'فا 🌸', color: '#3B82F6' },
  { id: 5, note: 'صول 🌟', color: '#8B5CF6' }
];

export default function PianoRhythmGame() {
  const { addXpAndCoins, speak, setActiveScreen } = useGame();
  const [playedCount, setPlayedCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    speak("اعزف على بيانو نور السحري واستمتع بالأصوات الجرسية التشجيعية!");
  }, []);

  const pressKey = (key) => {
    playAudioTone('success');
    const newCount = playedCount + 1;
    setPlayedCount(newCount);

    if (newCount >= 6) {
      setIsDone(true);
      addXpAndCoins(40, 20);
      speak("عازف مبدع! أنجزت معزوفة الأمل في بيانو نور وحصلت على 40 نقطة!");
    }
  };

  return (
    <div className="glass-card bounce-in" style={{ width: '95%', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', padding: '6px 14px', margin: 0 }} onClick={() => setActiveScreen('classroom')}>
          🔙 عودة
        </button>
        <h2 style={{ color: 'var(--primary)', margin: 0 }}>🎵 بيانو الألحان والأناشيد</h2>
        <div style={{ width: '60px' }}></div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#DBEAFE', padding: '8px 15px', borderRadius: '16px', marginBottom: '15px' }}>
        <NoorAvatar expression={isDone ? 'happy' : 'thinking'} size={45} />
        <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          {isDone ? 'أبدعت معزوفة الفرح والأمل! 🏆' : `المقطوعة الموسيقية: ${playedCount}/6 نغمات 🎹`}
        </div>
      </div>

      {/* Piano Keys */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', height: '180px', marginBottom: '20px', padding: '10px', background: '#1E293B', borderRadius: '20px' }}>
        {KEYS.map(k => (
          <div
            key={k.id}
            onClick={() => pressKey(k)}
            style={{
              flex: 1,
              background: k.color,
              borderRadius: '0 0 16px 16px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: '15px',
              color: 'white',
              fontWeight: 900,
              fontSize: '1.1rem',
              cursor: 'pointer',
              boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
              transition: 'transform 0.1s'
            }}
          >
            {k.note}
          </div>
        ))}
      </div>

      {isDone && (
        <button className="btn pulse" style={{ background: '#10B981', color: 'white', fontSize: '1.2rem' }} onClick={() => setActiveScreen('classroom')}>العودة للمسارات 🚀</button>
      )}
    </div>
  );
}
