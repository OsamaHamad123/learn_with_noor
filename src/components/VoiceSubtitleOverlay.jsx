import React, { useState, useEffect } from 'react';
import { setSubtitleCallback } from '../services/speechService';
import NoorAvatar from './NoorAvatar';

export default function VoiceSubtitleOverlay() {
  const [spokenText, setSpokenText] = useState(null);

  useEffect(() => {
    setSubtitleCallback((txt) => {
      setSpokenText(txt);
    });
  }, []);

  if (!spokenText) return null;

  return (
    <div
      className="bounce-in"
      style={{
        position: 'fixed',
        bottom: '25px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 99999,
        width: '90%',
        maxWidth: '650px',
        background: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(16px)',
        color: '#FFF',
        padding: '12px 20px',
        borderRadius: '25px',
        border: '2px solid #F59E0B',
        boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
      }}
    >
      <NoorAvatar expression="happy" size={50} />
      <div style={{ flex: 1, textAlign: 'right' }}>
        <div style={{ fontSize: '0.75rem', color: '#F59E0B', fontWeight: 800, marginBottom: '2px' }}>
          🔊 نطق نور التفاعلي المباشر:
        </div>
        <div style={{ fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.5, color: '#F8FAFC' }}>
          {spokenText}
        </div>
      </div>
    </div>
  );
}
