import React from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from './NoorAvatar';

export default function UniverseGalaxy() {
  const { setActiveScreen, xp } = useGame();

  return (
    <div className="glass-card bounce-in" style={{ width: '95%', maxWidth: '800px', margin: 'auto', textAlign: 'center' }}>
      <h2 style={{ color: 'var(--primary)', fontSize: '2rem', marginBottom: '15px' }}>مجرة المعرفة 🪐</h2>

      {/* Noor Banner */}
      <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.9)', padding: '12px 18px', borderRadius: '20px', marginBottom: '20px', gap: '15px', border: '2px solid #8B5CF6' }}>
        <NoorAvatar expression="happy" size={60} />
        <div style={{ textAlign: 'right' }}>
          <h4 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.1rem' }}>أهلاً بك في مجرة المعرفة! 🪐</h4>
          <p style={{ color: '#64748B', fontSize: '0.9rem', margin: 0 }}>انطلق مع نور للاكتشاف والتعلم كل يوم!</p>
        </div>
      </div>

      {/* Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
        {/* Classroom Card */}
        <div
          className="glass-card bounce-in"
          style={{ cursor: 'pointer', background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)', color: 'white' }}
          onClick={() => setActiveScreen('classroom')}
        >
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>⛺</div>
          <h3 style={{ color: 'white', marginBottom: '5px' }}>مسارات الخيمة الصفية 🎪</h3>
          <p style={{ color: '#DBEAFE', fontSize: '0.85rem' }}>نموذج الحصة التفاعلية (7 مسارات)</p>
        </div>

        {/* Mini-Games Suite Card */}
        <div
          className="glass-card bounce-in"
          style={{ cursor: 'pointer', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: 'white' }}
          onClick={() => setActiveScreen('classroom')}
        >
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🎮</div>
          <h3 style={{ color: 'white', marginBottom: '5px' }}>الألعاب التفاعلية 🧩</h3>
          <p style={{ color: '#D1FAE5', fontSize: '0.85rem' }}>الذاكرة، الفرقعة، التصنيف، الرسم، والعجلة</p>
        </div>

        {/* Islamic Knowledge Doors Card */}
        <div
          className="glass-card bounce-in"
          style={{ cursor: 'pointer', background: '#FFF' }}
          onClick={() => setActiveScreen('classroom')}
        >
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🕌</div>
          <h3 style={{ color: 'var(--primary)', marginBottom: '5px' }}>أبواب الإسلام 📖</h3>
          <p style={{ color: '#64748B', fontSize: '0.85rem' }}>السيرة، الأخلاق، وآداب الطفل</p>
        </div>
      </div>
    </div>
  );
}
