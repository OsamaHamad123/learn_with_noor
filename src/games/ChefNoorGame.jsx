import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from '../components/NoorAvatar';
import { playAudioTone } from '../services/speechService';

const INGREDIENTS = [
  { id: 1, name: 'تمر صحي 🌴', isHealthy: true },
  { id: 2, name: 'وجبات سريعة ضارة 🍟', isHealthy: false },
  { id: 3, name: 'حليب طازج 🥛', isHealthy: true },
  { id: 4, name: 'خضار وفواكه 🍎', isHealthy: true },
  { id: 5, name: 'مشروبات غازية 🥤', isHealthy: false }
];

export default function ChefNoorGame() {
  const { addXpAndCoins, speak, setActiveScreen } = useGame();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [potItems, setPotItems] = useState([]);
  const [isDone, setIsDone] = useState(false);

  const current = INGREDIENTS[currentIdx];

  useEffect(() => {
    if (!current) return;
    speak(`ساعد نور في تحضير الوجبة الصحية: هل (${current.name}) من المقادير المفيدة؟`);
  }, [currentIdx]);

  const handleChoice = (chooseAdd) => {
    if ((chooseAdd && current.isHealthy) || (!chooseAdd && !current.isHealthy)) {
      playAudioTone('success');
      speak("اختيار ممتاز وصحي في مطبخ نور!");
      if (chooseAdd) setPotItems(prev => [...prev, current.name]);
    } else {
      playAudioTone('fail');
      speak("انتبه يا بطل! الأطعمة غير الصحية تؤذي جسدنا!");
    }

    if (currentIdx < INGREDIENTS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsDone(true);
      addXpAndCoins(40, 20);
      speak("رائع جداً! حضرت وجبة طعام صحية ومباركة في مطبخ نور وحصلت على 40 نقطة و20 عملة!");
    }
  };

  return (
    <div className="glass-card bounce-in" style={{ width: '95%', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', padding: '6px 14px', margin: 0 }} onClick={() => setActiveScreen('classroom')}>
          🔙 عودة
        </button>
        <h2 style={{ color: 'var(--primary)', margin: 0 }}>🍳 لعبة مطبخ نور الصحي</h2>
        <div style={{ width: '60px' }}></div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#DBEAFE', padding: '10px 15px', borderRadius: '16px', marginBottom: '20px' }}>
        <NoorAvatar expression={isDone ? 'happy' : 'thinking'} size={50} />
        <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          {isDone ? 'أحسنت! أتممت تحضير الوجبة الصحية التامة! 🥗' : `العنصر المعروض (${currentIdx + 1}/${INGREDIENTS.length}): ${current.name}`}
        </div>
      </div>

      {!isDone ? (
        <div>
          <div
            style={{
              background: '#FFF',
              padding: '25px',
              borderRadius: '20px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
              fontSize: '1.6rem',
              fontWeight: 900,
              color: 'var(--primary)',
              marginBottom: '20px',
              border: '2px solid var(--primary)'
            }}
          >
            {current.name}
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button className="btn" style={{ background: '#10B981', color: 'white', flex: 1, padding: '14px', fontSize: '1.1rem' }} onClick={() => handleChoice(true)}>
              🟢 أضفه لوعاء الطعام الصحي
            </button>
            <button className="btn" style={{ background: '#EF4444', color: 'white', flex: 1, padding: '14px', fontSize: '1.1rem' }} onClick={() => handleChoice(false)}>
              🔴 استبعده (غير صحي)
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ background: '#FFF', padding: '15px', borderRadius: '16px', marginBottom: '20px', border: '2px dashed var(--accent)' }}>
            <h4 style={{ color: 'var(--primary)', marginBottom: '8px' }}>مكونات الوعاء الصحي المقبول:</h4>
            <div style={{ fontSize: '1.2rem', color: '#10B981', fontWeight: 'bold' }}>{potItems.join(' • ') || 'طعام صحي وخفيف'}</div>
          </div>
          <button className="btn pulse" style={{ background: '#10B981', color: 'white', fontSize: '1.2rem' }} onClick={() => setActiveScreen('classroom')}>
            العودة للمسارات الصفية 🚀
          </button>
        </div>
      )}
    </div>
  );
}
