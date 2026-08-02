import React from 'react';
import { useGame } from '../../context/GameContext';
import NoorAvatar from '../NoorAvatar';
import { playAudioTone } from '../../services/speechService';

export default function QuestsModal() {
  const { questProgress, lootOpened, setLootOpened, activeModal, setActiveModal, addXpAndCoins, speak } = useGame();

  if (activeModal !== 'quests') return null;

  const claimLoot = () => {
    if (questProgress < 3 || lootOpened) return;
    setLootOpened(true);
    addXpAndCoins(50, 30);
    playAudioTone('success');
    speak("مبروك! فتحت الصندوق اليومي وحصلت على 50 نقطة و30 عملة!");
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '15px' }}>
      <div className="glass-card bounce-in" style={{ width: '90%', maxWidth: '450px', background: '#FFF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ color: 'var(--primary)', margin: 0 }}>🎁 المهام اليومية والصندوق السحري</h3>
          <button className="btn" style={{ padding: '4px 10px', background: '#EF4444', color: '#FFF', margin: 0 }} onClick={() => setActiveModal(null)}>
            ✖
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#DBEAFE', padding: '10px', borderRadius: '15px', marginBottom: '15px' }}>
          <NoorAvatar expression="happy" size={50} />
          <div>
            <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>إنجاز المهام: ({questProgress}/3)</div>
            <small style={{ color: '#64748B' }}>أكمل 3 ألعاب/تحديات لفتح صندوق المكافآت!</small>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>🎴 إنهاء لعبة واحدة</span>
            <span>{questProgress >= 1 ? '✅' : '⏳'}</span>
          </div>
          <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>🔍 اكتشاف خطأ مع نور</span>
            <span>{questProgress >= 2 ? '✅' : '⏳'}</span>
          </div>
          <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>🤖 سؤال نور بالذكاء الاصطناعي</span>
            <span>{questProgress >= 3 ? '✅' : '⏳'}</span>
          </div>
        </div>

        {/* Loot Box Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            className="btn pulse"
            style={{
              padding: '12px 24px',
              fontSize: '1.1rem',
              background: questProgress >= 3 && !lootOpened ? '#10B981' : '#CBD5E1',
              color: questProgress >= 3 && !lootOpened ? '#FFF' : '#475569'
            }}
            onClick={claimLoot}
            disabled={questProgress < 3 || lootOpened}
          >
            {lootOpened ? 'تم فتح الصندوق 🎁' : 'افتح الصندوق السحري 📦'}
          </button>
        </div>
      </div>
    </div>
  );
}
