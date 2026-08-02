import React from 'react';
import { useGame } from '../../context/GameContext';
import NoorAvatar from '../NoorAvatar';
import { playAudioTone } from '../../services/speechService';

const STORE_ITEMS = [
  { id: 'badge_crown', name: 'وسام التاج الملكي', price: 15, icon: '👑' },
  { id: 'badge_diamond', name: 'وسام الألماس السحري', price: 25, icon: '💎' },
  { id: 'badge_fire', name: 'وسام الشعلة الحماسية', price: 35, icon: '🔥' },
  { id: 'badge_star', name: 'وسام النجمة الذهبية', price: 50, icon: '⭐' }
];

export default function StoreModal() {
  const { coins, setCoins, inventory, setInventory, activeModal, setActiveModal, saveState, speak } = useGame();

  if (activeModal !== 'store') return null;

  const buyItem = (item) => {
    if (inventory.includes(item.id)) return;
    if (coins < item.price) {
      playAudioTone('fail');
      speak("عفواً يا بطل! ليس لديك عملات كافية، العب لجمع المزيد!");
      return;
    }

    const newCoins = coins - item.price;
    const newInv = [...inventory, item.id];
    setCoins(newCoins);
    setInventory(newInv);
    saveState({ coins: newCoins, inventory: newInv });
    playAudioTone('success');
    speak(`مبروك! اشتريت ${item.name}!`);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '15px' }}>
      <div className="glass-card bounce-in" style={{ width: '90%', maxWidth: '480px', background: '#FFF' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ color: 'var(--primary)', margin: 0 }}>🛒 متجر الأوسمة والمكافآت</h3>
          <button className="btn" style={{ padding: '4px 10px', background: '#EF4444', color: '#FFF', margin: 0 }} onClick={() => setActiveModal(null)}>
            ✖
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#DBEAFE', padding: '10px', borderRadius: '15px', marginBottom: '15px' }}>
          <NoorAvatar expression="happy" size={50} />
          <div>
            <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>عملاتك الحالية: 🪙 {coins}</div>
            <small style={{ color: '#64748B' }}>استبدل عملاتك بأوسمة تتزين بها في التطبيق!</small>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {STORE_ITEMS.map(item => {
            const owned = inventory.includes(item.id);
            return (
              <div key={item.id} style={{ background: '#F8FAFC', padding: '12px', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '5px' }}>{item.icon}</div>
                <h4 style={{ fontSize: '0.9rem', color: '#1E293B', marginBottom: '5px' }}>{item.name}</h4>
                <div style={{ fontWeight: 'bold', color: '#D97706', fontSize: '0.85rem', marginBottom: '8px' }}>🪙 {item.price}</div>
                <button
                  className="btn"
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.8rem',
                    width: '100%',
                    margin: 0,
                    background: owned ? '#CBD5E1' : 'var(--btn-bg)',
                    color: owned ? '#475569' : '#FFF'
                  }}
                  onClick={() => buyItem(item)}
                  disabled={owned}
                >
                  {owned ? 'تم الشراء ✔' : 'شراء 🛒'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
