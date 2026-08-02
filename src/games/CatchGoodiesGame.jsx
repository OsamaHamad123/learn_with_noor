import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from '../components/NoorAvatar';
import { playAudioTone } from '../services/speechService';

const GOOD_ITEMS = ['💎', '🕌', '📖', '🌸', '⭐'];
const BAD_ITEMS = ['💣', '🗑️'];

export default function CatchGoodiesGame() {
  const { addXpAndCoins, speak, setActiveScreen } = useGame();
  const [basketX, setBasketX] = useState(40); // 0% to 80%
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    speak("حرك سلة نور لتلتقط النجوم والخيرات وتتجنب القمامة والقنابل!");

    const spawnInterval = setInterval(() => {
      if (isGameOver) return;
      const isGood = Math.random() > 0.3;
      const newItem = {
        id: Date.now() + Math.random(),
        x: Math.floor(Math.random() * 75) + 5,
        type: isGood ? 'good' : 'bad',
        icon: isGood ? GOOD_ITEMS[Math.floor(Math.random() * GOOD_ITEMS.length)] : BAD_ITEMS[Math.floor(Math.random() * BAD_ITEMS.length)]
      };
      setItems(prev => [...prev.slice(-8), newItem]);
    }, 1200);

    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(spawnInterval);
          clearInterval(timerInterval);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(timerInterval);
    };
  }, [isGameOver]);

  useEffect(() => {
    if (isGameOver) {
      addXpAndCoins(score * 5, Math.floor(score * 2));
      speak(`ممتاز جداً! جمعت ${score} قطعة خيّرة وحصلت على ${score * 5} نقطة!`);
    }
  }, [isGameOver]);

  const moveLeft = () => setBasketX(prev => Math.max(5, prev - 15));
  const moveRight = () => setBasketX(prev => Math.min(80, prev + 15));

  const catchItem = (item) => {
    if (isGameOver) return;
    setItems(prev => prev.filter(i => i.id !== item.id));
    if (item.type === 'good') {
      playAudioTone('success');
      setScore(prev => prev + 1);
    } else {
      playAudioTone('fail');
      setScore(prev => Math.max(0, prev - 1));
    }
  };

  return (
    <div className="glass-card bounce-in" style={{ width: '95%', maxWidth: '600px', margin: 'auto', textAlign: 'center', height: '520px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', padding: '6px 14px', margin: 0 }} onClick={() => setActiveScreen('classroom')}>
          🔙 عودة
        </button>
        <h2 style={{ color: 'var(--primary)', margin: 0 }}>🎯 لعبة صيد الخيرات</h2>
        <div style={{ fontWeight: 900, color: 'var(--danger)', fontSize: '1.1rem' }}>⏰ {timeLeft}ث</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#DBEAFE', padding: '8px 15px', borderRadius: '16px', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <NoorAvatar expression={isGameOver ? 'happy' : 'thinking'} size={40} />
          <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>النقاط: {score} ⭐️</span>
        </div>
      </div>

      {/* Catch Arena */}
      <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(to bottom, #E0F2FE, #FFF)', borderRadius: '20px', border: '2px dashed var(--primary)', overflow: 'hidden' }}>
        {!isGameOver ? (
          <>
            {items.map(item => (
              <div
                key={item.id}
                onClick={() => catchItem(item)}
                style={{
                  position: 'absolute',
                  left: `${item.x}%`,
                  top: '10px',
                  fontSize: '2.5rem',
                  cursor: 'pointer',
                  animation: 'fallDown 3.5s linear forwards'
                }}
              >
                {item.icon}
              </div>
            ))}

            {/* Noor Basket */}
            <div
              style={{
                position: 'absolute',
                bottom: '15px',
                left: `${basketX}%`,
                fontSize: '3rem',
                transition: 'left 0.2s ease-out'
              }}
            >
              🧺
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <h2 style={{ color: 'var(--primary)', marginBottom: '15px' }}>أحسنت يا بطل الصيد! 🏆</h2>
            <p style={{ fontSize: '1.2rem', color: '#334155', marginBottom: '20px' }}>جمعت {score} حسنة ونجمة جديدة!</p>
            <button className="btn pulse" style={{ background: '#10B981', color: 'white', fontSize: '1.2rem' }} onClick={() => setActiveScreen('classroom')}>
              العودة للمسارات الصفية 🚀
            </button>
          </div>
        )}
      </div>

      {/* Movement Controls */}
      {!isGameOver && (
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '12px' }}>
          <button className="btn" style={{ background: 'var(--primary)', color: 'white', padding: '10px 30px', fontSize: '1.2rem' }} onClick={moveRight}>
            تحريك لليسار ⬅️
          </button>
          <button className="btn" style={{ background: 'var(--primary)', color: 'white', padding: '10px 30px', fontSize: '1.2rem' }} onClick={moveLeft}>
            ➡️ تحريك لليمين
          </button>
        </div>
      )}

      <style>{`
        @keyframes fallDown {
          0% { top: -40px; }
          100% { top: 85%; }
        }
      `}</style>
    </div>
  );
}
