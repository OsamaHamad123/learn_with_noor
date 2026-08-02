import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from '../components/NoorAvatar';
import { playAudioTone } from '../services/speechService';

export default function RacingGame() {
  const { addXpAndCoins, speak, setActiveScreen } = useGame();
  const [lane, setLane] = useState(1); // 0: Left, 1: Center, 2: Right
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    speak("وجه سيارة نور إلى الطريق الصحيح لتجمع النجوم والحسنات!");
  }, []);

  const handleDrive = (chosenLane) => {
    setLane(chosenLane);
    if (chosenLane === 1) {
      playAudioTone('success');
      setScore(prev => prev + 1);
      speak("ممتاز! قيادة آمنة وإجابة صحيحة في السباق!");
    } else {
      playAudioTone('fail');
      speak("احذر العقبات! قد بحذر على مضمار المعرفة!");
    }

    if (score >= 4) {
      setIsDone(true);
      addXpAndCoins(40, 20);
      speak("فوز ساحق! وصلت لخط النهاية بالمركز الأول وحصلت على 40 نقطة!");
    }
  };

  return (
    <div className="glass-card bounce-in" style={{ width: '95%', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', padding: '6px 14px', margin: 0 }} onClick={() => setActiveScreen('classroom')}>
          🔙 عودة
        </button>
        <h2 style={{ color: 'var(--primary)', margin: 0 }}>🏎️ سباق سيارات نور السريع</h2>
        <div style={{ width: '60px' }}></div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#DBEAFE', padding: '8px 15px', borderRadius: '16px', marginBottom: '15px' }}>
        <NoorAvatar expression={isDone ? 'happy' : 'thinking'} size={45} />
        <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          {isDone ? 'فوز بالمركز الأول على مضمار المعرفة! 🏆' : `النقاط: ${score}/5 ⭐️ | اختر المسار الصحيح!`}
        </div>
      </div>

      {/* Racetrack View */}
      <div style={{ height: '260px', background: 'linear-gradient(180deg, #334155 0%, #0F172A 100%)', borderRadius: '20px', border: '3px solid #F59E0B', position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', paddingBottom: '20px', marginBottom: '15px' }}>
        {/* Road Dividers */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '33%', width: '2px', background: '#FFF', opacity: 0.3 }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '66%', width: '2px', background: '#FFF', opacity: 0.3 }} />

        {/* Car */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: lane === 0 ? '16%' : lane === 1 ? '50%' : '83%',
            transform: 'translateX(-50%)',
            fontSize: '3rem',
            transition: 'left 0.2s ease-out'
          }}
        >
          🏎️
        </div>
      </div>

      {!isDone ? (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button className="btn" style={{ background: '#3B82F6', color: 'white', flex: 1 }} onClick={() => handleDrive(0)}>⬅️ طريق اليسار</button>
          <button className="btn" style={{ background: '#10B981', color: 'white', flex: 1 }} onClick={() => handleDrive(1)}>🟢 المسار الصحيح</button>
          <button className="btn" style={{ background: '#3B82F6', color: 'white', flex: 1 }} onClick={() => handleDrive(2)}>➡️ طريق اليمين</button>
        </div>
      ) : (
        <button className="btn pulse" style={{ background: '#10B981', color: 'white', fontSize: '1.2rem' }} onClick={() => setActiveScreen('classroom')}>العودة للمسارات 🚀</button>
      )}
    </div>
  );
}
