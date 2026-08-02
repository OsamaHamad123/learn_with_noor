import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from '../components/NoorAvatar';
import { playAudioTone } from '../services/speechService';

const SECTORS = [
  '⭐ تحدي الذكاء',
  '📖 سؤال السيرة',
  '🎨 تحدي الرسم',
  '🤲 اذكر دعاءً',
  '🎈 فرقعة البالون',
  '🏆 50 نقطة هدية'
];

export default function SpinningWheel() {
  const { addXpAndCoins, speak, setActiveScreen } = useGame();
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedResult, setSelectedResult] = useState('');

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedResult('');
    playAudioTone('success');

    const randomDegrees = Math.floor(3600 + Math.random() * 360);
    const newRot = rotation + randomDegrees;
    setRotation(newRot);

    setTimeout(() => {
      setIsSpinning(false);
      const actualDeg = newRot % 360;
      const sectorIndex = Math.floor((360 - (actualDeg % 360)) / (360 / SECTORS.length)) % SECTORS.length;
      const result = SECTORS[sectorIndex];
      setSelectedResult(result);
      addXpAndCoins(25, 10);
      speak(`رائع جداً! وقفت العجلة على: ${result}!`);
    }, 4000);
  };

  return (
    <div className="glass-card bounce-in" style={{ width: '95%', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', padding: '6px 14px', margin: 0 }} onClick={() => setActiveScreen('classroom')}>
          🔙 عودة
        </button>
        <h2 style={{ color: 'var(--primary)', margin: 0 }}>🎡 عجلة التحديات التفاعلية</h2>
        <div style={{ width: '60px' }}></div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#DBEAFE', padding: '10px 15px', borderRadius: '16px', marginBottom: '20px' }}>
        <NoorAvatar expression={selectedResult ? 'happy' : 'thinking'} size={50} />
        <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          {selectedResult ? `التحدي المختار: ${selectedResult}! 🏆` : 'ادور العجلة لاختيار التحدي الصفّي القادم!'}
        </div>
      </div>

      {/* Wheel Container */}
      <div style={{ position: 'relative', width: '260px', height: '260px', margin: '0 auto 20px auto' }}>
        {/* Pointer Indicator */}
        <div
          style={{
            position: 'absolute',
            top: '-15px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '15px solid transparent',
            borderRight: '15px solid transparent',
            borderTop: '25px solid #EF4444',
            zIndex: 10,
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))'
          }}
        />

        {/* Wheel SVG */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            transition: 'transform 4s cubic-bezier(0.15, 0.9, 0.2, 1)',
            transform: `rotate(${rotation}deg)`
          }}
        >
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <g transform="translate(50,50)">
              {SECTORS.map((sec, i) => {
                const angle = 360 / SECTORS.length;
                const rotateAngle = i * angle;
                const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#EC4899'];
                return (
                  <g key={i} transform={`rotate(${rotateAngle})`}>
                    <path d="M 0 0 L 50 0 A 50 50 0 0 1 25 43.3 Z" fill={colors[i]} stroke="#FFF" strokeWidth="1" />
                    <text x="25" y="15" fill="#FFF" fontSize="6" fontWeight="bold" textAnchor="middle" transform="rotate(30 25 15)">
                      {sec.substring(0, 8)}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>

      <button className="btn pulse" style={{ background: 'var(--btn-bg)', fontSize: '1.3rem', padding: '14px 40px' }} onClick={spin} disabled={isSpinning}>
        {isSpinning ? 'تأتيكم النتيجة...' : 'ادور العجلة 🚀'}
      </button>
    </div>
  );
}
