import React, { useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { playAudioTone } from '../../services/speechService';

export default function CertificateModal() {
  const { playerName, activeModal, setActiveModal, speak } = useGame();
  const certCanvasRef = useRef(null);

  useEffect(() => {
    if (activeModal === 'cert') {
      speak("مبارك يا بطل! استلم شهادة التميز والتقدير المعتمدة من منصة رحلة نور!");
      drawCertificate();
    }
  }, [activeModal]);

  const drawCertificate = () => {
    const cvs = certCanvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');

    // Background Gradient
    const grad = ctx.createLinearGradient(0, 0, cvs.width, cvs.height);
    grad.addColorStop(0, '#FFFBEB');
    grad.addColorStop(1, '#FEF3C7');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    // Gold Frame Border
    ctx.strokeStyle = '#D97706';
    ctx.lineWidth = 8;
    ctx.strokeRect(15, 15, cvs.width - 30, cvs.height - 30);

    // Inner Line
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 2;
    ctx.strokeRect(22, 22, cvs.width - 44, cvs.height - 44);

    // Header Title
    ctx.font = '900 24px Cairo';
    ctx.fillStyle = '#1E3A8A';
    ctx.textAlign = 'center';
    ctx.fillText('🏆 شهادة تميّز وتفوق صفّي 🏆', cvs.width / 2, 60);

    // Subtitle
    ctx.font = '600 14px Cairo';
    ctx.fillStyle = '#475569';
    ctx.fillText('تشهد منصة "رحلة نور" بأن البطل المبدع:', cvs.width / 2, 95);

    // Student Name
    ctx.font = '900 28px Cairo';
    ctx.fillStyle = '#D97706';
    ctx.fillText(playerName || 'بطل المعرفة', cvs.width / 2, 140);

    // Description
    ctx.font = '600 13px Cairo';
    ctx.fillStyle = '#334155';
    ctx.fillText('قد اجتاز جميع مسارات الخيمة الصفية والألعاب التفاعلية بنجاح وباهر!', cvs.width / 2, 180);

    // Signature
    ctx.font = '700 14px Cairo';
    ctx.fillStyle = '#1E3A8A';
    ctx.fillText('توقيع صديقتكم: نور 🌸', cvs.width / 2, 225);
  };

  if (activeModal !== 'cert') return null;

  const downloadCert = () => {
    const cvs = certCanvasRef.current;
    const link = document.createElement('a');
    link.download = `certificate_${playerName || 'hero'}.png`;
    link.href = cvs.toDataURL('image/png');
    link.click();
    playAudioTone('success');
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '15px' }}>
      <div className="glass-card bounce-in" style={{ width: '90%', maxWidth: '500px', background: '#FFF', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ color: 'var(--primary)', margin: 0 }}>🏆 شهادة التميّز الخاصة بك</h3>
          <button className="btn" style={{ padding: '4px 10px', background: '#EF4444', color: '#FFF', margin: 0 }} onClick={() => setActiveModal(null)}>
            ✖
          </button>
        </div>

        <div style={{ background: '#FFF', borderRadius: '16px', overflow: 'hidden', marginBottom: '15px', border: '1px solid #E2E8F0' }}>
          <canvas ref={certCanvasRef} width={450} height={260} style={{ width: '100%', height: 'auto' }} />
        </div>

        <button className="btn pulse" style={{ background: '#10B981', color: '#FFF', fontSize: '1.1rem' }} onClick={downloadCert}>
          تحميل الشهادة PNG 💾
        </button>
      </div>
    </div>
  );
}
