import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from '../components/NoorAvatar';
import { playAudioTone } from '../services/speechService';

const BLOCK_COLORS = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

export default function TowerBuilderGame() {
  const { addXpAndCoins, speak, setActiveScreen } = useGame();
  const [blocks, setBlocks] = useState([{ id: 1, color: '#1E3A8A', text: 'أساس العلم 🏛️' }]);
  const [swingX, setSwingX] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    speak("اضغط لتركيب مكعبات المعرفة وبناء أعلى برج سحري مع نور!");

    const swingInterval = setInterval(() => {
      setSwingX(prev => {
        if (prev > 70) setDirection(-1);
        if (prev < -70) setDirection(1);
        return prev + direction * 5;
      });
    }, 40);

    return () => clearInterval(swingInterval);
  }, [direction]);

  const dropBlock = () => {
    if (isGameOver) return;
    playAudioTone('success');
    const newBlock = {
      id: Date.now(),
      color: BLOCK_COLORS[blocks.length % BLOCK_COLORS.length],
      text: ['أدب 🌸', 'صدق ✨', 'علم 📖', 'حكمة 💎', 'بر ❤️'][blocks.length % 5]
    };
    const updated = [newBlock, ...blocks];
    setBlocks(updated);

    if (updated.length >= 7) {
      setIsGameOver(true);
      addXpAndCoins(50, 30);
      speak("بطل خارق! بنيت أعلى برج معرفة في خيمة نور وحصلت على 50 نقطة و30 عملة!");
    }
  };

  return (
    <div className="glass-card bounce-in" style={{ width: '95%', maxWidth: '600px', margin: 'auto', textAlign: 'center', height: '520px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', padding: '6px 14px', margin: 0 }} onClick={() => setActiveScreen('classroom')}>
          🔙 عودة
        </button>
        <h2 style={{ color: 'var(--primary)', margin: 0 }}>🏰 برج المعرفة السحري</h2>
        <div style={{ width: '60px' }}></div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#DBEAFE', padding: '8px 15px', borderRadius: '16px', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <NoorAvatar expression={isGameOver ? 'happy' : 'thinking'} size={40} />
          <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>ارتفاع البرج: {blocks.length} طوابق 🏢</span>
        </div>
      </div>

      {/* Tower Building Canvas Area */}
      <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(to bottom, #E0F2FE, #FFF)', borderRadius: '20px', border: '2px dashed var(--primary)', overflow: 'hidden', display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', paddingBottom: '10px' }}>
        {!isGameOver ? (
          <>
            {/* Swinging Dropper Block */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: `calc(50% + ${swingX}px)`,
                transform: 'translateX(-50%)',
                background: '#F59E0B',
                color: 'white',
                padding: '10px 30px',
                borderRadius: '12px',
                fontWeight: 900,
                boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
                cursor: 'pointer'
              }}
              onClick={dropBlock}
            >
              اسقط المكعب 🧱
            </div>

            {/* Stacked Blocks */}
            {blocks.map(b => (
              <div
                key={b.id}
                style={{
                  background: b.color,
                  color: 'white',
                  width: '180px',
                  padding: '10px 0',
                  borderRadius: '12px',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  margin: '2px 0'
                }}
              >
                {b.text}
              </div>
            ))}
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <h2 style={{ color: 'var(--primary)', marginBottom: '15px' }}>برج سحري مكتمل! 🏆</h2>
            <p style={{ fontSize: '1.2rem', color: '#334155', marginBottom: '20px' }}>بنيت برجاً شاهقاً بارتفاع 7 طوابق كاملة!</p>
            <button className="btn pulse" style={{ background: '#10B981', color: 'white', fontSize: '1.2rem' }} onClick={() => setActiveScreen('classroom')}>
              العودة للمسارات الصفية 🚀
            </button>
          </div>
        )}
      </div>

      {!isGameOver && (
        <button className="btn pulse" style={{ background: '#10B981', color: 'white', fontSize: '1.2rem', marginTop: '10px' }} onClick={dropBlock}>
          اسقط المكعب الآن! 🧱
        </button>
      )}
    </div>
  );
}
