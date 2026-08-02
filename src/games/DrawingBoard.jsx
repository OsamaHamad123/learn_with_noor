import React, { useRef, useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { playAudioTone } from '../services/speechService';

const COLORS = ['#EF4444', '#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#1E293B'];

export default function DrawingBoard() {
  const { addXpAndCoins, speak, setActiveScreen } = useGame();
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#EF4444');
  const [lineWidth, setLineWidth] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEraser, setIsEraser] = useState(false);

  useEffect(() => {
    speak("ارسم ولون واضف لمساتك الفنية الرائعة في هذه اللوحة!");
    const cvs = canvasRef.current;
    if (cvs) {
      const ctx = cvs.getContext('2d');
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, cvs.width, cvs.height);
    }
  }, []);

  const getPos = (e) => {
    const cvs = canvasRef.current;
    const rect = cvs.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (cvs.width / rect.width),
      y: (clientY - rect.top) * (cvs.height / rect.height)
    };
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const cvs = canvasRef.current;
    const ctx = cvs.getContext('2d');
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const cvs = canvasRef.current;
    const ctx = cvs.getContext('2d');
    const pos = getPos(e);
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isEraser ? '#FFFFFF' : color;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const addStamp = (emoji) => {
    const cvs = canvasRef.current;
    const ctx = cvs.getContext('2d');
    ctx.font = '36px Cairo';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, cvs.width / 2 + (Math.random() * 80 - 40), cvs.height / 2 + (Math.random() * 80 - 40));
    playAudioTone('success');
  };

  const clearCanvas = () => {
    const cvs = canvasRef.current;
    const ctx = cvs.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    playAudioTone('fail');
  };

  const downloadDrawing = () => {
    const cvs = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'noor_drawing.png';
    link.href = cvs.toDataURL('image/png');
    link.click();
    addXpAndCoins(20, 10);
    speak("تم حفظ لوحتك الفنية الرائعة! حصلت على 20 نقطة و10 عملات!");
  };

  return (
    <div className="glass-card bounce-in" style={{ width: '95%', maxWidth: '650px', margin: 'auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', padding: '6px 14px', margin: 0 }} onClick={() => setActiveScreen('classroom')}>
          🔙 عودة
        </button>
        <h2 style={{ color: 'var(--primary)', margin: 0 }}>🎨 لوحة الرسم والملصقات السحرية</h2>
        <div style={{ width: '60px' }}></div>
      </div>

      <div style={{ background: '#FFF', padding: '10px', borderRadius: '20px', border: '2px dashed var(--primary)', marginBottom: '15px', position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width={550}
          height={300}
          style={{ width: '100%', height: '280px', borderRadius: '12px', cursor: isEraser ? 'cell' : 'crosshair', touchAction: 'none' }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      {/* Palette & Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Colors */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
          {COLORS.map(c => (
            <div
              key={c}
              onClick={() => { setColor(c); setIsEraser(false); }}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: c,
                cursor: 'pointer',
                border: color === c && !isEraser ? '3px solid #1E293B' : '2px solid #FFF',
                transform: color === c && !isEraser ? 'scale(1.15)' : 'scale(1)'
              }}
            />
          ))}
          <button
            className="btn"
            style={{ padding: '6px 12px', fontSize: '0.85rem', background: isEraser ? '#CBD5E1' : '#FFF', color: '#1E293B', margin: 0 }}
            onClick={() => setIsEraser(!isEraser)}
          >
            🧹 ممحاة
          </button>
        </div>

        {/* Stamps */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary)' }}>ملصقات:</span>
          {['⭐', '🌸', '👑', '🕌', '☀️', '🎈'].map(emoji => (
            <button
              key={emoji}
              className="btn"
              style={{ padding: '4px 8px', fontSize: '1.2rem', background: '#FFF', border: '1px solid #E2E8F0', margin: 0 }}
              onClick={() => addStamp(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '5px' }}>
          <button className="btn" style={{ background: '#EF4444', color: 'white', padding: '10px 20px' }} onClick={clearCanvas}>
            مسح اللوحة 🗑️
          </button>
          <button className="btn" style={{ background: '#10B981', color: 'white', padding: '10px 20px' }} onClick={downloadDrawing}>
            حفظ صورتي 💾
          </button>
        </div>
      </div>
    </div>
  );
}
