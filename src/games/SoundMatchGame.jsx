import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from '../components/NoorAvatar';
import { playAudioTone } from '../services/speechService';

const SOUND_QUESTIONS = [
  { id: 1, prompt: "استمع إلى الصوت واكتشف الصورة: صوت قطرات المطر النظيفة!", options: [{ icon: '🌧️', text: 'المطر' }, { icon: '☀️', text: 'الشمس' }, { icon: '🌙', text: 'القمر' }], correctIndex: 0 },
  { id: 2, prompt: "استمع إلى الصوت واكتشف الصورة: صوت فتح كتاب القراءة السحري!", options: [{ icon: '🎨', text: 'الرسم' }, { icon: '📖', text: 'الكتاب' }, { icon: '⚽', text: 'الكرة' }], correctIndex: 1 },
  { id: 3, prompt: "استمع إلى الصوت واكتشف الصورة: صوت بيت الله الحرام والكعبة المشرفة!", options: [{ icon: '🕌', text: 'الكعبة' }, { icon: '🚀', text: 'الصاروخ' }, { icon: '🚗', text: 'السيارة' }], correctIndex: 0 }
];

export default function SoundMatchGame() {
  const { addXpAndCoins, speak, setActiveScreen } = useGame();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const q = SOUND_QUESTIONS[currentIdx];

  useEffect(() => {
    if (!q) return;
    speak(q.prompt);
  }, [currentIdx]);

  const handleOptionClick = (index) => {
    if (index === q.correctIndex) {
      playAudioTone('success');
      speak("ممتاز جداً! طابقت الصوت مع الصورة الصحيحة!");
      if (currentIdx < SOUND_QUESTIONS.length - 1) {
        setCurrentIdx(prev => prev + 1);
      } else {
        setIsDone(true);
        addXpAndCoins(35, 15);
        speak("رائع جداً! أتممت لعبة تمييز الأصوات وحصلت على 35 نقطة و15 عملة!");
      }
    } else {
      playAudioTone('fail');
      speak("حاول مرة أخرى يا بطل واستمع جيداً للصوت!");
    }
  };

  return (
    <div className="glass-card bounce-in" style={{ width: '95%', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', padding: '6px 14px', margin: 0 }} onClick={() => setActiveScreen('classroom')}>
          🔙 عودة
        </button>
        <h2 style={{ color: 'var(--primary)', margin: 0 }}>🔊 لعبة تمييز الأصوات</h2>
        <div style={{ width: '60px' }}></div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#DBEAFE', padding: '10px 15px', borderRadius: '16px', marginBottom: '20px' }}>
        <NoorAvatar expression={isDone ? 'happy' : 'thinking'} size={50} />
        <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          {isDone ? 'رائع جداً! طابقت جميع الأصوات بنجاح! 🏆' : `السؤال (${currentIdx + 1}/${SOUND_QUESTIONS.length}): اضغط للاستماع واختيار الصورة`}
        </div>
      </div>

      {!isDone ? (
        <div>
          <button className="btn pulse" style={{ background: '#8B5CF6', color: 'white', fontSize: '1.2rem', marginBottom: '25px', padding: '15px 30px' }} onClick={() => speak(q.prompt)}>
            تشغيل الصوت التفاعلي 🔊
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '20px' }}>
            {q.options.map((opt, i) => (
              <div
                key={i}
                onClick={() => handleOptionClick(i)}
                style={{
                  background: '#FFF',
                  padding: '20px',
                  borderRadius: '20px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  border: '2px solid var(--primary)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <div style={{ fontSize: '3rem' }}>{opt.icon}</div>
                <div style={{ fontWeight: 900, color: 'var(--primary)', fontSize: '1.1rem' }}>{opt.text}</div>
              </div>
            ))}
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
