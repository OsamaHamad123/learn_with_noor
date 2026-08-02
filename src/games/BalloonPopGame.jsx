import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from '../components/NoorAvatar';
import { playAudioTone } from '../services/speechService';

const BALLOON_COLORS = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

export default function BalloonPopGame() {
  const { addXpAndCoins, speak, setActiveScreen } = useGame();
  const [balloons, setBalloons] = useState([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameActive, setGameActive] = useState(true);

  useEffect(() => {
    speak("فرقع أكبر عدد من البالونات السحرية قبل انتهاء الوقت!");

    // Spawn balloons interval
    const spawnInterval = setInterval(() => {
      if (!gameActive) return;
      const newBalloon = {
        id: Date.now() + Math.random(),
        x: Math.floor(Math.random() * 75) + 5, // 5% to 80% width
        color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
        text: ['⭐', '🎈', '✨', '🏆', '🌸'][Math.floor(Math.random() * 5)]
      };
      setBalloons(prev => [...prev.slice(-10), newBalloon]);
    }, 1000);

    // Timer interval
    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(spawnInterval);
          clearInterval(timerInterval);
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(timerInterval);
    };
  }, [gameActive]);

  useEffect(() => {
    if (!gameActive && timeLeft === 0) {
      addXpAndCoins(poppedCount * 5, Math.floor(poppedCount * 2));
      speak(`انتهى الوقت! فرقعت ${poppedCount} بالوناً وحصلت على ${poppedCount * 5} نقطة!`);
    }
  }, [gameActive, timeLeft]);

  const popBalloon = (id) => {
    if (!gameActive) return;
    playAudioTone('success');
    setPoppedCount(prev => prev + 1);
    setBalloons(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="glass-card bounce-in" style={{ width: '95%', maxWidth: '600px', margin: 'auto', textAlign: 'center', position: 'relative', overflow: 'hidden', height: '520px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', padding: '6px 14px', margin: 0 }} onClick={() => setActiveScreen('classroom')}>
          🔙 عودة
        </button>
        <h2 style={{ color: 'var(--primary)', margin: 0 }}>🎈 لعبة فرقعة البالونات</h2>
        <div style={{ fontWeight: 900, color: 'var(--danger)', fontSize: '1.1rem' }}>⏰ {timeLeft}ث</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#DBEAFE', padding: '8px 15px', borderRadius: '16px', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <NoorAvatar expression={gameActive ? 'happy' : 'thinking'} size={40} />
          <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>البالونات المفرقعة: {poppedCount} 💥</span>
        </div>
      </div>

      {/* Game Area */}
      <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(to bottom, #E0F2FE, #FFF)', borderRadius: '20px', border: '2px dashed var(--primary)', overflow: 'hidden' }}>
        {gameActive ? (
          balloons.map(b => (
            <div
              key={b.id}
              onClick={() => popBalloon(b.id)}
              style={{
                position: 'absolute',
                left: `${b.x}%`,
                bottom: '10px',
                width: '65px',
                height: '80px',
                background: b.color,
                borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.8rem',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                animation: 'floatUp 4s linear forwards'
              }}
            >
              {b.text}
              <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: '2px', height: '15px', background: '#94A3B8' }}></div>
            </div>
          ))
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <h2 style={{ color: 'var(--primary)', marginBottom: '15px' }}>انتهت التحديات يا بطل! 🏆</h2>
            <p style={{ fontSize: '1.2rem', color: '#334155', marginBottom: '20px' }}>فرقعت {poppedCount} بالوناً رائعاً!</p>
            <button className="btn pulse" style={{ background: '#10B981', color: 'white', fontSize: '1.2rem' }} onClick={() => setActiveScreen('classroom')}>
              العودة للمسارات الصفية 🚀
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes floatUp {
          0% { bottom: -90px; }
          100% { bottom: 105%; }
        }
      `}</style>
    </div>
  );
}
