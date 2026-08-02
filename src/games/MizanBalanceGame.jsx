import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from '../components/NoorAvatar';
import { playAudioTone } from '../services/speechService';

export default function MizanBalanceGame() {
  const { addXpAndCoins, speak, setActiveScreen } = useGame();
  const [balance, setBalance] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    speak("أضف الأعمال الصالحة إلى الميزان وشاهد كيف تزن الحسنات بمشاعر الخير والرقي!");
  }, []);

  const addGoodDeed = () => {
    playAudioTone('success');
    const newBal = balance + 1;
    setBalance(newBal);
    speak("عمل صالح يثقل الميزان بالحسنات!");

    if (newBal >= 5) {
      setIsDone(true);
      addXpAndCoins(45, 20);
      speak("مبارك! ملأت كفة الحسنات بالبركة وحصلت على 45 نقطة و20 عملة!");
    }
  };

  return (
    <div className="glass-card bounce-in" style={{ width: '95%', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', padding: '6px 14px', margin: 0 }} onClick={() => setActiveScreen('classroom')}>
          🔙 عودة
        </button>
        <h2 style={{ color: 'var(--primary)', margin: 0 }}>⚖️ ميزان الأعمال والحسنات</h2>
        <div style={{ width: '60px' }}></div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#DBEAFE', padding: '8px 15px', borderRadius: '16px', marginBottom: '15px' }}>
        <NoorAvatar expression={isDone ? 'happy' : 'thinking'} size={45} />
        <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          {isDone ? 'كفة الحسنات مليئة بالنور والبركة! 🏆' : `ثقل الميزان: ${balance}/5 ⚖️`}
        </div>
      </div>

      <div style={{ height: '200px', background: '#FFF', borderRadius: '20px', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', marginBottom: '20px' }}>
        ⚖️ ✨ {balance} حسنة
      </div>

      {!isDone ? (
        <button className="btn pulse" style={{ background: '#10B981', color: 'white', fontSize: '1.2rem', padding: '14px 30px' }} onClick={addGoodDeed}>
          أضف عملاً صالحاً للميزان 🌸
        </button>
      ) : (
        <button className="btn pulse" style={{ background: '#10B981', color: 'white', fontSize: '1.2rem' }} onClick={() => setActiveScreen('classroom')}>العودة للمسارات 🚀</button>
      )}
    </div>
  );
}
