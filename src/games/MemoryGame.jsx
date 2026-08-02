import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from '../components/NoorAvatar';
import { playAudioTone } from '../services/speechService';

const INITIAL_CARDS = [
  { id: 1, symbol: '🕌', name: 'الكعبة المشرفة' },
  { id: 2, symbol: '📖', name: 'القرآن الكريم' },
  { id: 3, symbol: '🤲', name: 'الدعاء المستجاب' },
  { id: 4, symbol: '🌙', name: 'هلال رمضان' },
];

export default function MemoryGame() {
  const { addXpAndCoins, speak, setActiveScreen } = useGame();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Generate pairs and shuffle
    const deck = [...INITIAL_CARDS, ...INITIAL_CARDS].map((item, index) => ({
      ...item,
      uniqueId: index
    }));
    deck.sort(() => Math.random() - 0.5);
    setCards(deck);
    speak("طابق البطاقات المتشابهة لتكتشف الصور الإسلامية والتعليمية!");
  }, []);

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(cards[index].uniqueId)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    playAudioTone('success');

    if (newFlipped.length === 2) {
      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx].id === cards[secondIdx].id) {
        // Match found
        const newMatched = [...matched, cards[firstIdx].uniqueId, cards[secondIdx].uniqueId];
        setMatched(newMatched);
        setFlipped([]);
        playAudioTone('success');
        speak(`أحسنت! طابقت ${cards[firstIdx].name}!`);

        if (newMatched.length === cards.length) {
          setIsCompleted(true);
          addXpAndCoins(30, 15);
          speak("عظيم جداً! أنهيت لعبة الذاكرة بنجاح وحصلت على 30 نقطة و15 عملة!");
        }
      } else {
        // No match
        setTimeout(() => {
          setFlipped([]);
          playAudioTone('fail');
        }, 1000);
      }
    }
  };

  return (
    <div className="glass-card bounce-in" style={{ width: '95%', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', padding: '6px 14px', margin: 0 }} onClick={() => setActiveScreen('classroom')}>
          🔙 عودة
        </button>
        <h2 style={{ color: 'var(--primary)', margin: 0 }}>🎴 لعبة طابق البطاقات</h2>
        <div style={{ width: '60px' }}></div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#DBEAFE', padding: '10px 15px', borderRadius: '16px', marginBottom: '15px' }}>
        <NoorAvatar expression={isCompleted ? 'happy' : 'thinking'} size={50} />
        <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          {isCompleted ? 'رائع جداً! أنهيت المطابقة بنجاح! 🏆' : 'انقر على البطاقات واكتشف المتشابه منها!'}
        </div>
      </div>

      {/* Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(card.uniqueId);
          return (
            <div
              key={idx}
              onClick={() => handleCardClick(idx)}
              style={{
                height: '90px',
                borderRadius: '16px',
                background: isFlipped ? '#FFF' : 'linear-gradient(135deg, #3B82F6 0%, #1E3A8A 100%)',
                border: isFlipped ? '3px solid #3B82F6' : '3px solid #FFF',
                boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: isFlipped ? '2.2rem' : '1.8rem',
                color: isFlipped ? '#1E293B' : '#FFF',
                transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {isFlipped ? (
                <>
                  <span style={{ transform: 'rotateY(180deg)' }}>{card.symbol}</span>
                </>
              ) : (
                '🌸'
              )}
            </div>
          );
        })}
      </div>

      {isCompleted && (
        <button className="btn pulse" style={{ background: '#10B981', color: 'white', fontSize: '1.2rem' }} onClick={() => setActiveScreen('classroom')}>
          استمر في مسارات الخيمة الصفية 🚀
        </button>
      )}
    </div>
  );
}
