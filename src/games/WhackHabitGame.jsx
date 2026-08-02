import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from '../components/NoorAvatar';
import { playAudioTone } from '../services/speechService';

const HOLES = [
  { id: 1, text: 'الكذب 🤥', isBad: true },
  { id: 2, text: 'الصدق ✨', isBad: false },
  { id: 3, text: 'رمي المهملات 🗑️', isBad: true },
  { id: 4, text: 'السرقة ❌', isBad: true },
  { id: 5, text: 'بر الوالدين ❤️', isBad: false },
  { id: 6, text: 'الغضب 😡', isBad: true }
];

export default function WhackHabitGame() {
  const { addXpAndCoins, speak, setActiveScreen } = useGame();
  const [activeHole, setActiveHole] = useState(0);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    speak("اضرب السلوكيات الخاطئة واجعل السلوكيات الطيبة تبنى في المجتمع!");
    const interval = setInterval(() => {
      if (isDone) return;
      setActiveHole(Math.floor(Math.random() * HOLES.length));
    }, 1200);

    return () => clearInterval(interval);
  }, [isDone]);

  const handleWhack = (hole) => {
    if (hole.isBad) {
      playAudioTone('success');
      setScore(prev => prev + 1);
      speak("أحسنت! قضيت على السلوك الخاطئ!");
    } else {
      playAudioTone('fail');
      speak("انتبه! هذا سلوك طيب حسن!");
    }

    if (score >= 5) {
      setIsDone(true);
      addXpAndCoins(40, 20);
      speak("بطل خارق! تخلصت من جميع السلوكيات السيئة بنجاح وحصلت على 40 نقطة!");
    }
  };

  return (
    <div className="glass-card bounce-in" style={{ width: '95%', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', padding: '6px 14px', margin: 0 }} onClick={() => setActiveScreen('classroom')}>
          🔙 عودة
        </button>
        <h2 style={{ color: 'var(--primary)', margin: 0 }}>🔨 لعبة ضرب السلوكيات الخاطئة</h2>
        <div style={{ width: '60px' }}></div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#DBEAFE', padding: '8px 15px', borderRadius: '16px', marginBottom: '15px' }}>
        <NoorAvatar expression={isDone ? 'happy' : 'thinking'} size={45} />
        <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          {isDone ? 'أحسنت القضاء على السلوكيات السيئة! 🏆' : `النقاط: ${score}/6 🎯 | اضغط على الأخطاء لضربها!`}
        </div>
      </div>

      {/* Whack Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '15px' }}>
        {HOLES.map((h, i) => (
          <div
            key={h.id}
            onClick={() => handleWhack(h)}
            style={{
              height: '100px',
              background: activeHole === i ? '#FEE2E2' : '#F1F5F9',
              border: activeHole === i ? '3px solid #EF4444' : '2px dashed #CBD5E1',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: '0 6px 15px rgba(0,0,0,0.06)'
            }}
          >
            {activeHole === i ? h.text : '🕳️'}
          </div>
        ))}
      </div>

      {isDone && (
        <button className="btn pulse" style={{ background: '#10B981', color: 'white', fontSize: '1.2rem' }} onClick={() => setActiveScreen('classroom')}>العودة للمسارات 🚀</button>
      )}
    </div>
  );
}
