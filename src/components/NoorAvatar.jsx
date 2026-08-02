import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { playAudioTone } from '../services/speechService';

// Import Noor Official Character Images
import noorHappyImg from '../assets/Gemini_Generated_Image_bjlj13bjlj13bjlj-removebg-preview.png';
import noorThinkingImg from '../assets/Gemini_Generated_Image_hds9enhds9enhds9-removebg-preview.png';
import noorWavingImg from '../assets/Gemini_Generated_Image_kcy1t7kcy1t7kcy1-removebg-preview.png';
import noorReadingImg from '../assets/Gemini_Generated_Image_mrkmoomrkmoomrkm-removebg-preview.png';
import noorCelebratingImg from '../assets/Gemini_Generated_Image_of61shof61shof61-removebg-preview.png';
import noorPointingImg from '../assets/Gemini_Generated_Image_ursfhbursfhbursf-removebg-preview.png';

export default function NoorAvatar({ expression = 'happy', size = 160, className = '', onClick = null }) {
  const { isSpeaking, speak } = useGame();
  const avatarRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState([]);

  // Map expression to character image
  const getNoorImage = () => {
    switch (expression) {
      case 'thinking':
        return noorThinkingImg;
      case 'waving':
      case 'welcome':
        return noorWavingImg;
      case 'reading':
        return noorReadingImg;
      case 'celebrating':
      case 'win':
        return noorCelebratingImg;
      case 'pointing':
        return noorPointingImg;
      case 'happy':
      case 'idle':
      default:
        return noorHappyImg;
    }
  };

  // 3D Parallax Tilt on Mouse Move
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!avatarRef.current) return;
      const rect = avatarRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / 25;
      const deltaY = (e.clientY - centerY) / 25;

      setTilt({
        x: Math.max(-10, Math.min(10, -deltaY)),
        y: Math.max(-10, Math.min(10, deltaX))
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleTap = (e) => {
    playAudioTone('success');
    // Sparkle effect
    const newSparkle = { id: Date.now(), x: Math.random() * 60 - 30, y: Math.random() * 60 - 30 };
    setSparkles(prev => [...prev.slice(-3), newSparkle]);

    speak("أهلاً بك يا بطل! أنا صديقتك نور، جاهزة لمساعدتك واللعب معك كلياً!");

    if (onClick) onClick(e);
  };

  return (
    <div
      ref={avatarRef}
      className={`noor-official-avatar ${className}`}
      onClick={handleTap}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        perspective: '1000px',
        userSelect: 'none'
      }}
    >
      {/* Speaking Soundwave Glow Ring */}
      {isSpeaking && (
        <div
          style={{
            position: 'absolute',
            inset: '-10px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.4) 0%, rgba(255,255,255,0) 70%)',
            animation: 'speakingPulse 1s infinite alternate ease-in-out',
            zIndex: 1
          }}
        />
      )}

      {/* Official 3D Character Image */}
      <img
        src={getNoorImage()}
        alt="شخصية نور الرسمية"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter: 'drop-shadow(0 12px 20px rgba(30, 58, 138, 0.2))',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out',
          animation: isSpeaking ? 'noorTalkingBounce 0.4s infinite alternate ease-in-out' : 'noorFloat 3s infinite ease-in-out',
          position: 'relative',
          zIndex: 2
        }}
      />

      {/* Tap Sparkles */}
      {sparkles.map(s => (
        <span
          key={s.id}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(${s.x}px, ${s.y}px)`,
            fontSize: '1.8rem',
            animation: 'sparkleFade 0.8s ease-out forwards',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        >
          ✨
        </span>
      ))}

      <style>{`
        @keyframes noorFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes noorTalkingBounce {
          0% { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-6px) scale(1.04); }
        }
        @keyframes speakingPulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          100% { transform: scale(1.15); opacity: 0.9; }
        }
        @keyframes sparkleFade {
          0% { opacity: 1; transform: translate(0, 0) scale(0.5); }
          100% { opacity: 0; transform: translate(${Math.random() * 40 - 20}px, -40px) scale(1.3); }
        }
      `}</style>
    </div>
  );
}
