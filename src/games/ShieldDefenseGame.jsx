import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from '../components/NoorAvatar';
import { playAudioTone } from '../services/speechService';

export default function ShieldDefenseGame() {
  const { addXpAndCoins, speak, setActiveScreen } = useGame();
  const [shieldActive, setShieldActive] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    speak("فعّل درع نور لحماية حصن القيم والأخلاق من التأثيرات الضارة!");
  }, []);

  const toggleShield = () => {
    setShieldActive(prev => !prev);
    playAudioTone('success');
    setScore(prev => prev + 1);

    if (score >= 4) {
      setIsDone(true);
      addXpAndCoins(45, 20);
      speak("حامي رائع! حميت حصن القيم بالدرع السحري بنجاح وحصلت على 45 نقطة!");
    }
  };

  return (
    <div className="glass-card bounce-in" style={{ width: '95%', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', padding: '6px 14px', margin: 0 }} onClick={() => setActiveScreen('classroom')}>
          🔙 عودة
        </button>
        <h2 style={{ color: 'var(--primary)', margin: 0 }}>🛡️ درع نور وحصن القيم</h2>
        <div style={{ width: '60px' }}></div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#DBEAFE', padding: '8px 15px', borderRadius: '16px', marginBottom: '15px' }}>
        <NoorAvatar expression={isDone ? 'happy' : 'thinking'} size={45} />
        <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          {isDone ? 'حفظت الحصن بنجاح! 🏆' : `قوة الحصن: ${score}/5 🛡️ | فعّل الدرع للحماية!`}
        </div>
      </div>

      <div style={{ height: '240px', background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)', borderRadius: '20px', border: '3px solid #F59E0B', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
        <div style={{ fontSize: '5rem', filter: shieldActive ? 'drop-shadow(0 0 25px #F59E0B)' : 'none', transition: 'all 0.3s' }}>
          {shieldActive ? '🛡️✨' : '🏰'}
        </div>
      </div>

      {!isDone ? (
        <button className="btn pulse" style={{ background: shieldActive ? '#10B981' : '#F59E0B', color: 'white', fontSize: '1.2rem' }} onClick={toggleShield}>
          {shieldActive ? 'الدرع مفعّل ويدافع! 🛡️' : 'تفعيل الدرع السحري ⚡'}
        </button>
      ) : (
        <button className="btn pulse" style={{ background: '#10B981', color: 'white', fontSize: '1.2rem' }} onClick={() => setActiveScreen('classroom')}>العودة للمسارات 🚀</button>
      )}
    </div>
  );
}
