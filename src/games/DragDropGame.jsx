import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from '../components/NoorAvatar';
import { playAudioTone } from '../services/speechService';

const ITEMS = [
  { id: 1, text: 'الأكل باليد اليمين والتسمية 🍱', category: 'good' },
  { id: 2, text: 'رمي الأوراق على الأرض 🗑️', category: 'bad' },
  { id: 3, text: 'بر الوالدين ومساعدتهما ❤️', category: 'good' },
  { id: 4, text: 'التحدث بصوت مرتفع جداً 🔊', category: 'bad' },
  { id: 5, text: 'قول بسم الله قبل الأكل ✨', category: 'good' },
];

export default function DragDropGame() {
  const { addXpAndCoins, speak, setActiveScreen } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const currentItem = ITEMS[currentIndex];

  useEffect(() => {
    speak("صنّف السلوك التالي: هل هو سلوك صحيح أم سلوك خاطئ؟");
  }, [currentIndex]);

  const handleChoice = (chosenCategory) => {
    if (chosenCategory === currentItem.category) {
      playAudioTone('success');
      setScore(prev => prev + 1);
      speak("إجابة ممتازة وسلوك صحيح!");
    } else {
      playAudioTone('fail');
      speak("انتبه يا بطل، هذا ليس التصنيف المناسب!");
    }

    if (currentIndex < ITEMS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsDone(true);
      addXpAndCoins(35, 20);
      speak("رائع جداً! أتممت لعبة تصنيف السلوكيات وحصلت على 35 نقطة و20 عملة!");
    }
  };

  return (
    <div className="glass-card bounce-in" style={{ width: '95%', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', padding: '6px 14px', margin: 0 }} onClick={() => setActiveScreen('classroom')}>
          🔙 عودة
        </button>
        <h2 style={{ color: 'var(--primary)', margin: 0 }}>🧩 لعبة تصنيف السلوكيات</h2>
        <div style={{ width: '60px' }}></div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#DBEAFE', padding: '10px 15px', borderRadius: '16px', marginBottom: '15px' }}>
        <NoorAvatar expression={isDone ? 'happy' : 'thinking'} size={50} />
        <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          {isDone ? `ممتاز! حققت ${score} من ${ITEMS.length} إجابات صحيحة! 🏆` : `السلوك (${currentIndex + 1}/${ITEMS.length}): ضع كل بطاقة في مكانها المناسب!`}
        </div>
      </div>

      {!isDone ? (
        <div>
          <div
            style={{
              background: '#FFF',
              padding: '25px',
              borderRadius: '20px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
              border: '2px solid var(--primary)',
              fontSize: '1.3rem',
              fontWeight: 900,
              color: 'var(--primary)',
              marginBottom: '25px'
            }}
          >
            {currentItem.text}
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button
              className="btn"
              style={{ background: '#10B981', color: 'white', flex: 1, padding: '15px', fontSize: '1.1rem' }}
              onClick={() => handleChoice('good')}
            >
              🟢 سلوك صحيح
            </button>
            <button
              className="btn"
              style={{ background: '#EF4444', color: 'white', flex: 1, padding: '15px', fontSize: '1.1rem' }}
              onClick={() => handleChoice('bad')}
            >
              🔴 سلوك خاطئ
            </button>
          </div>
        </div>
      ) : (
        <button className="btn pulse" style={{ background: '#10B981', color: 'white', fontSize: '1.2rem' }} onClick={() => setActiveScreen('classroom')}>
          العودة للمسارات الصفية 🚀
        </button>
      )}
    </div>
  );
}
