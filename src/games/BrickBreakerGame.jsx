import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from '../components/NoorAvatar';
import { playAudioTone } from '../services/speechService';

export default function BrickBreakerGame() {
  const { addXpAndCoins, speak, setActiveScreen } = useGame();
  const [bricks, setBricks] = useState([
    { id: 1, text: 'أدب 🌸', hit: false },
    { id: 2, text: 'علم 📖', hit: false },
    { id: 3, text: 'صدق ✨', hit: false },
    { id: 4, text: 'بر ❤️', hit: false }
  ]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    speak("حرك المضرب واكسر مكعبات المعرفة لتحصل على الجواهر والنجوم!");
  }, []);

  const hitBrick = (id) => {
    playAudioTone('success');
    const updated = bricks.map(b => b.id === id ? { ...b, hit: true } : b);
    setBricks(updated);

    if (updated.every(b => b.hit)) {
      setIsDone(true);
      addXpAndCoins(40, 20);
      speak("ممتاز! كسرت جميع مكعبات المعرفة بنجاح وحصلت على 40 نقطة!");
    }
  };

  return (
    <div className="glass-card bounce-in" style={{ width: '95%', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', padding: '6px 14px', margin: 0 }} onClick={() => setActiveScreen('classroom')}>
          🔙 عودة
        </button>
        <h2 style={{ color: 'var(--primary)', margin: 0 }}>🧱 لعبة كاسر المكعبات</h2>
        <div style={{ width: '60px' }}></div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#DBEAFE', padding: '8px 15px', borderRadius: '16px', marginBottom: '15px' }}>
        <NoorAvatar expression={isDone ? 'happy' : 'thinking'} size={45} />
        <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          {isDone ? 'أحسنت كسر جميع المكعبات! 🏆' : 'انقر على المكعبات لكسرها وتجميع النجوم!'}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '20px' }}>
        {bricks.map(b => (
          <div
            key={b.id}
            onClick={() => !b.hit && hitBrick(b.id)}
            style={{
              height: '80px',
              background: b.hit ? '#CBD5E1' : 'linear-gradient(135deg, #10B981, #059669)',
              color: 'white',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontWeight: 900,
              cursor: 'pointer',
              opacity: b.hit ? 0.4 : 1
            }}
          >
            {b.hit ? '✨ مكسور' : b.text}
          </div>
        ))}
      </div>

      {isDone && (
        <button className="btn pulse" style={{ background: '#10B981', color: 'white', fontSize: '1.2rem' }} onClick={() => setActiveScreen('classroom')}>العودة للمسارات 🚀</button>
      )}
    </div>
  );
}
