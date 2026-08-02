import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from '../components/NoorAvatar';
import { playAudioTone } from '../services/speechService';

export default function ScienceLabGame() {
  const { addXpAndCoins, speak, setActiveScreen } = useGame();
  const [mixResult, setMixResult] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    speak("امزج أنابيب الاكتشاف لتصنع قوس قزح في مختبر علوم نور!");
  }, []);

  const mixColors = (resText) => {
    playAudioTone('success');
    setMixResult(resText);
    setIsDone(true);
    addXpAndCoins(40, 20);
    speak(`مذهل! نتج عن التجربة: ${resText}! حصلت على 40 نقطة!`);
  };

  return (
    <div className="glass-card bounce-in" style={{ width: '95%', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', padding: '6px 14px', margin: 0 }} onClick={() => setActiveScreen('classroom')}>
          🔙 عودة
        </button>
        <h2 style={{ color: 'var(--primary)', margin: 0 }}>🧪 مختبر علوم نور والتجارب</h2>
        <div style={{ width: '60px' }}></div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#DBEAFE', padding: '8px 15px', borderRadius: '16px', marginBottom: '15px' }}>
        <NoorAvatar expression={isDone ? 'happy' : 'thinking'} size={45} />
        <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          {isDone ? `نتيجة التجربة: ${mixResult}! 🏆` : 'اختر التجربة الكيميائية للدمج والتلوين!'}
        </div>
      </div>

      <div style={{ height: '180px', background: '#FFF', borderRadius: '20px', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', marginBottom: '20px' }}>
        {mixResult ? mixResult : '🧪 💧 ⚡'}
      </div>

      {!isDone ? (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button className="btn" style={{ background: '#3B82F6', color: 'white', flex: 1 }} onClick={() => mixColors('اللون الأخضر 🟢')}>مزج (أزرق + أصفر)</button>
          <button className="btn" style={{ background: '#F59E0B', color: 'white', flex: 1 }} onClick={() => mixColors('قوس قزح السحري 🌈')}>مزج (ماء + شمس)</button>
        </div>
      ) : (
        <button className="btn pulse" style={{ background: '#10B981', color: 'white', fontSize: '1.2rem' }} onClick={() => setActiveScreen('classroom')}>العودة للمسارات 🚀</button>
      )}
    </div>
  );
}
