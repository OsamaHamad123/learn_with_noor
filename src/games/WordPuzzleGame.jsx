import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from '../components/NoorAvatar';
import { playAudioTone } from '../services/speechService';

const PUZZLES = [
  { target: ["بِسْمِ", "اللَّهِ", "الرَّحْمَنِ", "الرَّحِيمِ"], title: "البسملة الكريمة" },
  { target: ["إِنَّمَا", "الأَعْمَالُ", "بِالنِّيَّاتِ"], title: "حديث النية" },
  { target: ["الخُلُقُ", "الحَسَنُ", "يَرْفَعُ", "الْمُسْلِمَ"], title: "أخلاق المسلم" }
];

export default function WordPuzzleGame() {
  const { addXpAndCoins, speak, setActiveScreen } = useGame();
  const [level, setLevel] = useState(0);
  const [scrambled, setScrambled] = useState([]);
  const [assembled, setAssembled] = useState([]);
  const [isLevelComplete, setIsLevelComplete] = useState(false);

  const currentPuzzle = PUZZLES[level];

  useEffect(() => {
    if (!currentPuzzle) return;
    const shuffled = [...currentPuzzle.target].sort(() => Math.random() - 0.5);
    setScrambled(shuffled);
    setAssembled([]);
    setIsLevelComplete(false);
    speak(`رتب كلمات الجملة التالية بالترتيب الصحيح: ${currentPuzzle.title}`);
  }, [level]);

  const handleWordClick = (word, index) => {
    speak(word);
    playAudioTone('success');
    const newAssembled = [...assembled, word];
    setAssembled(newAssembled);
    setScrambled(prev => prev.filter((_, i) => i !== index));

    // Check if finished
    if (newAssembled.length === currentPuzzle.target.length) {
      const isCorrect = newAssembled.every((val, idx) => val === currentPuzzle.target[idx]);
      if (isCorrect) {
        setIsLevelComplete(true);
        addXpAndCoins(30, 15);
        speak(`أحسنت! رتبت العبارة بشكل ممتاز: ${currentPuzzle.target.join(' ')}`);
      } else {
        setTimeout(() => {
          playAudioTone('fail');
          speak("تنسيق الكلمات غير صحيح، حاول مرة أخرى يا بطل!");
          const reshuffled = [...currentPuzzle.target].sort(() => Math.random() - 0.5);
          setScrambled(reshuffled);
          setAssembled([]);
        }, 1200);
      }
    }
  };

  const resetPuzzle = () => {
    const reshuffled = [...currentPuzzle.target].sort(() => Math.random() - 0.5);
    setScrambled(reshuffled);
    setAssembled([]);
  };

  return (
    <div className="glass-card bounce-in" style={{ width: '95%', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', padding: '6px 14px', margin: 0 }} onClick={() => setActiveScreen('classroom')}>
          🔙 عودة
        </button>
        <h2 style={{ color: 'var(--primary)', margin: 0 }}>🔤 لعبة تركيب العبارات</h2>
        <div style={{ width: '60px' }}></div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#DBEAFE', padding: '10px 15px', borderRadius: '16px', marginBottom: '20px' }}>
        <NoorAvatar expression={isLevelComplete ? 'happy' : 'thinking'} size={50} />
        <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          {isLevelComplete ? 'رائع جداً! أتقنت ترتيب العبارة! 🏆' : `تحدي (${level + 1}/${PUZZLES.length}): ${currentPuzzle.title}`}
        </div>
      </div>

      {/* Assembled Words Box */}
      <div
        style={{
          minHeight: '75px',
          background: '#FFF',
          border: '2px solid var(--primary)',
          borderRadius: '20px',
          padding: '12px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '25px',
          boxShadow: '0 6px 15px rgba(0,0,0,0.06)'
        }}
      >
        {assembled.length === 0 ? (
          <span style={{ color: '#94A3B8', fontWeight: 'bold' }}>اضغط على الكلمات بالترتيب الصحيح...</span>
        ) : (
          assembled.map((w, i) => (
            <span key={i} style={{ background: 'var(--primary)', color: 'white', padding: '8px 16px', borderRadius: '15px', fontWeight: 900, fontSize: '1.2rem' }}>
              {w}
            </span>
          ))
        )}
      </div>

      {/* Scrambled Word Choices */}
      {!isLevelComplete ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {scrambled.map((w, idx) => (
              <button
                key={idx}
                className="btn pulse"
                style={{ background: 'var(--btn-bg)', color: 'white', fontSize: '1.2rem', padding: '12px 22px' }}
                onClick={() => handleWordClick(w, idx)}
              >
                {w}
              </button>
            ))}
          </div>

          <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', padding: '8px 20px', margin: 0 }} onClick={resetPuzzle}>
            إعادة المحاولة 🔄
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          {level < PUZZLES.length - 1 ? (
            <button className="btn pulse" style={{ background: '#10B981', color: 'white', fontSize: '1.2rem' }} onClick={() => setLevel(prev => prev + 1)}>
              التحدي التالي ➡️
            </button>
          ) : (
            <button className="btn pulse" style={{ background: '#10B981', color: 'white', fontSize: '1.2rem' }} onClick={() => setActiveScreen('classroom')}>
              العودة للمسارات الصفية 🚀
            </button>
          )}
        </div>
      )}
    </div>
  );
}
