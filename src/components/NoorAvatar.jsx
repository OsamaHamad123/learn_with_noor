import React, { useEffect, useRef } from 'react';

export default function NoorAvatar({ avatar = 'noor3d', expression = 'happy', size = 160, className = '' }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!svgRef.current) return;
      const pupils = svgRef.current.querySelectorAll('.avatar-pupil');
      if (pupils.length === 0) return;

      const rect = svgRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.hypot(deltaX, deltaY) / 50, 4);

      const moveX = Math.cos(angle) * distance;
      const moveY = Math.sin(angle) * distance;

      pupils.forEach(pupil => {
        pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getMouthPath = () => {
    if (expression === 'happy') return "M 38 65 Q 50 78 62 65";
    if (expression === 'thinking') return "M 42 66 Q 50 62 58 66";
    if (expression === 'sad') return "M 40 70 Q 50 60 60 70";
    return "M 40 65 Q 50 72 60 65";
  };

  const getEyebrowTransform = () => {
    if (expression === 'happy') return "rotate(-5 32 36)";
    if (expression === 'thinking') return "rotate(10 32 36)";
    if (expression === 'sad') return "rotate(15 32 36)";
    return "none";
  };

  return (
    <div
      className={`noor-avatar-wrapper ${className}`}
      style={{ width: `${size}px`, height: `${size}px`, display: 'inline-block', position: 'relative' }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.15))', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE0BD" />
            <stop offset="100%" stopColor="#FAC698" />
          </linearGradient>
          <linearGradient id="hijabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="roseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F43F5E" />
            <stop offset="100%" stopColor="#BE123C" />
          </linearGradient>
        </defs>

        {/* Hijab Back */}
        <path d="M 12 45 C 8 85, 92 85, 88 45 C 88 15, 12 15, 12 45 Z" fill="url(#hijabGrad)" />

        {/* Face */}
        <ellipse cx="50" cy="52" rx="27" ry="29" fill="url(#skinGrad)" />

        {/* Hijab Inner Frame */}
        <path d="M 23 50 C 23 25, 77 25, 77 50 C 77 56, 70 79, 50 79 C 30 79, 23 56, 23 50 Z" fill="none" stroke="url(#hijabGrad)" strokeWidth="6" />

        {/* Eyes White */}
        <ellipse cx="36" cy="48" rx="7" ry="9" fill="#FFF" />
        <ellipse cx="64" cy="48" rx="7" ry="9" fill="#FFF" />

        {/* Pupils */}
        <g className="avatar-pupil" style={{ transition: 'transform 0.1s ease-out' }}>
          <circle cx="36" cy="49" r="4.5" fill="#1E293B" />
          <circle cx="64" cy="49" r="4.5" fill="#1E293B" />
          <circle cx="34.5" cy="47" r="1.5" fill="#FFF" />
          <circle cx="62.5" cy="47" r="1.5" fill="#FFF" />
        </g>

        {/* Eyebrows */}
        <path d="M 29 37 Q 36 33 42 37" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" transform={getEyebrowTransform()} />
        <path d="M 58 37 Q 64 33 71 37" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" transform={expression === 'thinking' ? "rotate(-10 68 36)" : "none"} />

        {/* Cheeks */}
        <circle cx="28" cy="57" r="4.5" fill="#F43F5E" opacity="0.35" />
        <circle cx="72" cy="57" r="4.5" fill="#F43F5E" opacity="0.35" />

        {/* Nose & Mouth */}
        <path d="M 50 53 Q 48 57 50 58" fill="none" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
        <path d={getMouthPath()} fill="none" stroke="#BE123C" strokeWidth="3.5" strokeLinecap="round" />

        {/* Flower Accessory */}
        <g transform="translate(22, 24)">
          <circle cx="0" cy="0" r="5" fill="url(#roseGrad)" />
          <circle cx="-4" cy="-4" r="3.5" fill="#FB7185" opacity="0.9" />
          <circle cx="4" cy="-4" r="3.5" fill="#FB7185" opacity="0.9" />
          <circle cx="-4" cy="4" r="3.5" fill="#FB7185" opacity="0.9" />
          <circle cx="4" cy="4" r="3.5" fill="#FB7185" opacity="0.9" />
          <circle cx="0" cy="0" r="2.5" fill="#FBBF24" />
        </g>
      </svg>
    </div>
  );
}
