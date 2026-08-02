import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from '../components/NoorAvatar';
import { playAudioTone } from '../services/speechService';

const STAGES = [
  { question: "كم عدد الصلوات الخمس في اليوم؟", correct: "5 صلوات 🕌", wrong: "3 صلوات ❌" },
  { question: "ما هي أول سورة في القرآن الكريم؟", correct: "الفاتحة 📖", wrong: "الكهف ❌" },
  { question: "ماذا نقول قبل البدء بالأكل؟", correct: "بسم الله ✨", wrong: "الحمد لله ❌" }
];

export default function SpaceRocketGame() {
  const { addXpAndCoins, speak, setActiveScreen } = useGame();
  const [stageIdx, setStageIdx] = useState(0);
  const [rocketY, setRocketY] = useState(50); // 10% to 80%
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const stage = STAGES[stageIdx];

  useEffect(() => {
    if (!stage) return;
    speak(stage.question);
  }, [stageIdx]);

  const moveUp = () => setRocketY(prev => Math.max(15, prev - 25));
  const moveDown = () => setRocketY(prev => Math.min(75, prev + 25));

  const handleAnswerChoice = (isCorrect) => {
    if (isCorrect) {
      playAudioTone('success');
      setScore(prev => prev + 1);
      speak("انطلاق ممتاز! اخترت البوابة الصحيحة في الفضاء!");
      if (stageIdx < STAGES.length - 1) {
        setStageIdx(prev => prev + 1);
      } else {
        setIsDone(true);
        addXpAndCoins(45, 25);
        speak("عظيم جداً! وصلت بصاروخ نور إلى كوكب المعرفة وحصلت على 45 نقطة و25 عملة!");
      }
    } else {
      playAudioTone('fail');
      speak("انتبه يا بطل! هذه البوابة الخاطئة، حاول مرة أخرى!");
    }
  };

  return (
    <div className="glass-card bounce-in" style={{ width: '95%', maxWidth: '650px', margin: 'auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', padding: '6px 14px', margin: 0 }} onClick={() => setActiveScreen('classroom')}>
          🔙 عودة
        </button>
        <h2 style={{ color: 'var(--primary)', margin: 0 }}>🚀 صاروخ المعرفة في الفضاء</h2>
        <div style={{ width: '60px' }}></div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#DBEAFE', padding: '10px 15px', borderRadius: '16px', marginBottom: '15px' }}>
        <NoorAvatar expression={isDone ? 'happy' : 'thinking'} size={50} />
        <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          {isDone ? 'تهانينا! حط صاروخك على كوكب الفضاء بنجاح! 🏆' : `السؤال (${stageIdx + 1}/${STAGES.length}): ${stage.question}`}
        </div>
      </div>

      {/* Space Canvas */}
      <div
        style={{
          height: '300px',
          background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)',
          borderRadius: '20px',
          border: '3px solid #8B5CF6',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '15px'
        }}
      >
        {/* Stars */}
        <div style={{ position: 'absolute', top: '20px', left: '15%', color: '#FFF', opacity: 0.8 }}>✨</div>
        <div style={{ position: 'absolute', top: '150px', left: '60%', color: '#FFF', opacity: 0.6 }}>⭐</div>
        <div style={{ position: 'absolute', top: '70px', right: '20%', color: '#FFF', opacity: 0.9 }}>🌟</div>

        {/* Rocket */}
        <div
          style={{
            position: 'absolute',
            left: '10%',
            top: `${rocketY}%`,
            fontSize: '3.2rem',
            transition: 'top 0.3s ease-out',
            filter: 'drop-shadow(0 0 10px #F59E0B)'
          }}
        >
          🚀
        </div>

        {/* Space Gates */}
        {!isDone && (
          <div style={{ position: 'absolute', right: '10%', top: '20px', bottom: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
            <button
              className="btn pulse"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)', color: 'white', padding: '12px 20px', fontSize: '1.1rem' }}
              onClick={() => handleAnswerChoice(true)}
            >
              🌌 {stage.correct}
            </button>
            <button
              className="btn"
              style={{ background: 'linear-gradient(135deg, #EF4444, #B91C1C)', color: 'white', padding: '12px 20px', fontSize: '1.1rem' }}
              onClick={() => handleAnswerChoice(false)}
            >
              ☄️ {stage.wrong}
            </button>
          </div>
        )}
      </div>

      {/* Movement Buttons */}
      {!isDone ? (
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <button className="btn" style={{ background: '#8B5CF6', color: 'white', padding: '10px 30px', fontSize: '1.2rem' }} onClick={moveUp}>
            توجيه للأعلى ⬆️
          </button>
          <button className="btn" style={{ background: '#8B5CF6', color: 'white', padding: '10px 30px', fontSize: '1.2rem' }} onClick={moveDown}>
            توجيه للأسفل ⬇️
          </button>
        </div>
      ) : (
        <button className="btn pulse" style={{ background: '#10B981', color: 'white', fontSize: '1.2rem' }} onClick={() => setActiveScreen('classroom')}>
          العودة للمسارات الصفية 🚀
        </button>
      )}
    </div>
  );
}
