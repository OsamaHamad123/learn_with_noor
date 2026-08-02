import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from '../components/NoorAvatar';
import { playAudioTone } from '../services/speechService';

const TARGET_ITEMS = [
  { id: 'quran', name: 'المصحف الشريف 📖', icon: '📖', x: 20, y: 35 },
  { id: 'kaaba', name: 'الكعبة المشرفة 🕌', icon: '🕌', x: 75, y: 25 },
  { id: 'carpet', name: 'سجادة الصلاة 🤲', icon: '🤲', x: 45, y: 70 },
  { id: 'moon', name: 'هلال رمضان 🌙', icon: '🌙', x: 80, y: 75 }
];

export default function HiddenObjectGame() {
  const { addXpAndCoins, speak, setActiveScreen } = useGame();
  const [currentTargetIndex, setCurrentTargetIndex] = useState(0);
  const [foundItems, setFoundItems] = useState([]);
  const [isDone, setIsDone] = useState(false);

  const currentTarget = TARGET_ITEMS[currentTargetIndex];

  useEffect(() => {
    if (!currentTarget) return;
    speak(`استخدم عدستك السحرية وابحث عن: ${currentTarget.name}!`);
  }, [currentTargetIndex]);

  const handleItemClick = (item) => {
    if (item.id === currentTarget.id) {
      playAudioTone('success');
      const updatedFound = [...foundItems, item.id];
      setFoundItems(updatedFound);
      speak(`أحسنت! وجدت ${item.name}!`);

      if (currentTargetIndex < TARGET_ITEMS.length - 1) {
        setCurrentTargetIndex(prev => prev + 1);
      } else {
        setIsDone(true);
        addXpAndCoins(40, 20);
        speak("عظيم جداً! عثرت على جميع العناصر بالعدسة السحرية وحصلت على 40 نقطة و20 عملة!");
      }
    } else {
      playAudioTone('fail');
      speak("هذا ليس العنصر المطلوب، واصل البحث!");
    }
  };

  return (
    <div className="glass-card bounce-in" style={{ width: '95%', maxWidth: '650px', margin: 'auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', padding: '6px 14px', margin: 0 }} onClick={() => setActiveScreen('classroom')}>
          🔙 عودة
        </button>
        <h2 style={{ color: 'var(--primary)', margin: 0 }}>🔍 لعبة العدسة السحرية</h2>
        <div style={{ width: '60px' }}></div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#DBEAFE', padding: '10px 15px', borderRadius: '16px', marginBottom: '15px' }}>
        <NoorAvatar expression={isDone ? 'happy' : 'thinking'} size={50} />
        <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          {isDone ? 'رائع جداً! وجدت جميع العناصر المخفية! 🏆' : `العنصر المطلوب (${currentTargetIndex + 1}/${TARGET_ITEMS.length}): ابحث عن ${currentTarget.name}`}
        </div>
      </div>

      {/* Hidden Objects Scene Canvas */}
      <div
        style={{
          height: '320px',
          background: 'linear-gradient(135deg, #FEF3C7 0%, #E0F2FE 100%)',
          borderRadius: '20px',
          border: '3px solid var(--primary)',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '20px',
          cursor: 'crosshair'
        }}
      >
        {/* Decorative Scene Elements */}
        <div style={{ position: 'absolute', top: '15px', left: '15px', fontSize: '3rem', opacity: 0.2 }}>☁️</div>
        <div style={{ position: 'absolute', top: '20px', right: '30px', fontSize: '3.5rem', opacity: 0.2 }}>🌴</div>

        {/* Interactive Hidden Items */}
        {TARGET_ITEMS.map(item => {
          const isFound = foundItems.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              style={{
                position: 'absolute',
                left: `${item.x}%`,
                top: `${item.y}%`,
                fontSize: '3rem',
                cursor: 'pointer',
                transition: 'transform 0.3s',
                transform: isFound ? 'scale(1.3) rotate(10deg)' : 'scale(1)',
                filter: isFound ? 'drop-shadow(0 0 15px #F59E0B)' : 'none',
                opacity: isFound ? 0.6 : 1
              }}
              className={item.id === currentTarget.id ? 'pulse' : ''}
            >
              {item.icon}
            </div>
          );
        })}
      </div>

      {isDone && (
        <button className="btn pulse" style={{ background: '#10B981', color: 'white', fontSize: '1.2rem' }} onClick={() => setActiveScreen('classroom')}>
          العودة للمسارات الصفية 🚀
        </button>
      )}
    </div>
  );
}
