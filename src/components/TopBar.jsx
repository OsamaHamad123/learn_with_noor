import React from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from './NoorAvatar';

export default function TopBar() {
  const {
    playerName,
    avatar,
    xp,
    coins,
    streak,
    inventory,
    audioEnabled,
    setAudioEnabled,
    activeScreen,
    setActiveScreen,
    setActiveModal,
    getRank
  } = useGame();

  if (activeScreen === 'story') return null;

  const rank = getRank();
  const getBadgeIcon = () => {
    if (inventory.includes('badge_crown')) return ' 👑';
    if (inventory.includes('badge_diamond')) return ' 💎';
    if (inventory.includes('badge_fire')) return ' 🔥';
    if (inventory.includes('badge_star')) return ' ⭐';
    return '';
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '950px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        padding: '10px 16px',
        borderRadius: '24px',
        marginBottom: '15px',
        boxShadow: '0 8px 25px rgba(30, 58, 138, 0.08)',
        border: '1px solid rgba(255,255,255,0.9)',
        flexWrap: 'wrap',
        gap: '10px'
      }}
    >
      {/* Player info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '45px', height: '45px', cursor: 'pointer' }} onClick={() => setActiveModal('quests')}>
          <NoorAvatar avatar={avatar} expression="happy" size={45} />
        </div>
        <div>
          <div style={{ fontWeight: 900, color: 'var(--primary)', fontSize: '1rem' }}>
            {playerName || 'أيها البطل'} {getBadgeIcon()}
          </div>
          <div style={{ fontSize: '0.8rem', color: rank.color, fontWeight: 700 }}>
            {rank.title} | {xp} XP
          </div>
        </div>
      </div>

      {/* Stats & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Daily Quests / Coins */}
        <div
          onClick={() => setActiveModal('quests')}
          style={{
            cursor: 'pointer',
            background: '#FFF',
            padding: '6px 14px',
            borderRadius: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            fontWeight: 900,
            color: '#D97706',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          🎁 <span>🪙 {coins}</span>
        </div>

        {/* Streak */}
        {streak > 0 && (
          <div
            style={{
              background: 'linear-gradient(135deg, #EF4444 0%, #F59E0B 100%)',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '20px',
              fontWeight: 900,
              fontSize: '0.85rem'
            }}
          >
            🔥 {streak} أيام
          </div>
        )}

        {/* Audio Toggle */}
        <button
          className="btn"
          style={{ padding: '6px 12px', fontSize: '1rem', background: '#E2E8F0', color: '#334155', borderColor: '#CBD5E1', margin: 0 }}
          onClick={() => setAudioEnabled(!audioEnabled)}
          title="تشغيل/إيقاف الصوت"
        >
          {audioEnabled ? '🔊' : '🔇'}
        </button>

        {/* Nav Shortcuts */}
        <button
          className="btn"
          style={{ padding: '6px 12px', fontSize: '0.9rem', background: 'var(--primary)', color: 'white', margin: 0 }}
          onClick={() => setActiveScreen('classroom')}
        >
          🎪 الخيمة الصفية
        </button>

        <button
          className="btn"
          style={{ padding: '6px 12px', fontSize: '0.9rem', background: 'var(--btn-bg)', color: 'white', margin: 0 }}
          onClick={() => setActiveModal('store')}
        >
          🛒 المتجر
        </button>
      </div>
    </div>
  );
}
