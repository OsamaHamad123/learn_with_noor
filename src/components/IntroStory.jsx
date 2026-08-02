import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from './NoorAvatar';
import { playAudioTone } from '../services/speechService';

export default function IntroStory() {
  const { playerName, setPlayerName, setActiveScreen, speak, saveState } = useGame();
  const [step, setStep] = useState(0); // 0: Landing Welcome, 1: Role Selection, 2: Name Input & HighFive, 3: Interactive Tour
  const [userRole, setUserRole] = useState('student'); // 'student', 'teacher', 'parent'
  const [tempName, setTempName] = useState(playerName || '');
  const [highFived, setHighFived] = useState(false);

  useEffect(() => {
    speak("أهلاً ومرحباً بكم في رحلة نور! المبادرة التعليمية الرقمية والتفاعلية الأحدث للأطفال والمدارس!");
  }, []);

  const handleSelectRole = (role) => {
    setUserRole(role);
    playAudioTone('success');
    if (role === 'teacher') {
      speak("أهلاً بك يا معلمنا الفاضل! سأرافقك لتوظيف الخيمة الصفية والـ 7 مسارات داخل الحصة الصفية!");
    } else if (role === 'parent') {
      speak("أهلاً بكم يا أولياء الأمور! رحلة نور تضمن لابنكم التعلم واللعب الهادف والقيم الإسلامية الأصيلة!");
    } else {
      speak("أهلاً بك يا مستكشفنا البطل! استعد لحصد الجواهر والأوسمة والدخول في 20 لعبة سحرية!");
    }
    setStep(2);
  };

  const handleHighFive = () => {
    setHighFived(true);
    playAudioTone('success');
    speak("كف ممتاز! أحييك على طاقتك الحماسية العالية!");
  };

  const handleFinishOnboarding = () => {
    if (tempName.trim()) {
      setPlayerName(tempName.trim());
      saveState({ playerName: tempName.trim() });
    }
    playAudioTone('success');
    speak(`جاهزون للانطلاق يا ${tempName || 'أبطال'}! هيا بنا نكتشف مجرة المعرفة الخيالية!`);
    setActiveScreen('universe');
  };

  return (
    <div
      className="glass-card bounce-in"
      style={{
        width: '95%',
        maxWidth: '700px',
        margin: 'auto',
        marginTop: '20px',
        padding: '30px 20px',
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(16px)',
        border: '3px solid rgba(245, 158, 11, 0.4)',
        boxShadow: '0 20px 40px rgba(30, 58, 138, 0.15)'
      }}
    >
      {/* Top Header Badge */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)', color: '#D97706', padding: '6px 18px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 800, marginBottom: '15px' }}>
        ✨ المبادرة التفاعلية الأولى لربط الحصة الصفية بالذكاء الاصطناعي ✨
      </div>

      {/* Step 0: Hero Welcome */}
      {step === 0 && (
        <div>
          <div style={{ margin: '0 auto 15px auto', display: 'flex', justifyContent: 'center' }}>
            <NoorAvatar expression="waving" size={190} />
          </div>

          <h1 style={{ color: 'var(--primary)', fontSize: '2.2rem', margin: '0 0 10px 0', fontWeight: 900 }}>
            مرحباً بكم في رحلة نور 🌸
          </h1>

          <p style={{ fontSize: '1.15rem', color: '#475569', maxWidth: '540px', margin: '0 auto 25px auto', lineHeight: 1.7 }}>
            منصة تفاعلية متكاملة تجمع بين <strong>الخيمة الصفية للمعلمين (7 مسارات)</strong>، و <strong>20 لعبة تعليمية فخمة</strong>، و <strong>الذكاء الاصطناعي الصوتي المتكلم!</strong>
          </p>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn pulse" style={{ background: 'var(--primary)', color: '#FFF', fontSize: '1.25rem', padding: '14px 36px', borderRadius: '30px' }} onClick={() => setStep(1)}>
              ابدأ الجولة التفاعلية 🚀
            </button>
            <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', fontSize: '1.1rem', padding: '14px 24px', borderRadius: '30px' }} onClick={() => setActiveScreen('classroom')}>
              انتقال مباشر للخيمة الصفية ⛺
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Role Selection */}
      {step === 1 && (
        <div>
          <div style={{ margin: '0 auto 10px auto', display: 'flex', justifyContent: 'center' }}>
            <NoorAvatar expression="thinking" size={150} />
          </div>

          <h2 style={{ color: 'var(--primary)', marginBottom: '8px' }}>من يحضر معنا الرحلة اليوم؟ 🙋‍♂️</h2>
          <p style={{ color: '#64748B', marginBottom: '20px' }}>اختر دورك لتكيف نور الشرح والإرشادات حسب احتياجك:</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginBottom: '25px' }}>
            <div
              className="glass-card"
              style={{ cursor: 'pointer', background: userRole === 'student' ? '#DBEAFE' : '#FFF', border: userRole === 'student' ? '3px solid #3B82F6' : '1px solid #E2E8F0', padding: '16px' }}
              onClick={() => handleSelectRole('student')}
            >
              <div style={{ fontSize: '2.5rem' }}>🎒</div>
              <h3 style={{ color: 'var(--primary)', margin: '8px 0 4px 0' }}>طالب مستكشف</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>جمع النجوم، فتح الأوسمة، واللعب في 20 لعبة ممتعة!</p>
            </div>

            <div
              className="glass-card"
              style={{ cursor: 'pointer', background: userRole === 'teacher' ? '#FEF3C7' : '#FFF', border: userRole === 'teacher' ? '3px solid #F59E0B' : '1px solid #E2E8F0', padding: '16px' }}
              onClick={() => handleSelectRole('teacher')}
            >
              <div style={{ fontSize: '2.5rem' }}>👨‍🏫</div>
              <h3 style={{ color: '#D97706', margin: '8px 0 4px 0' }}>معلم الحصة الصفية</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>تطبيق نموذج 5-10-5 دقائق التفاعلي داخل الصف!</p>
            </div>

            <div
              className="glass-card"
              style={{ cursor: 'pointer', background: userRole === 'parent' ? '#D1FAE5' : '#FFF', border: userRole === 'parent' ? '3px solid #10B981' : '1px solid #E2E8F0', padding: '16px' }}
              onClick={() => handleSelectRole('parent')}
            >
              <div style={{ fontSize: '2.5rem' }}>🏠</div>
              <h3 style={{ color: '#059669', margin: '8px 0 4px 0' }}>ولي أمر</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>متابعة القيم والقصص والآداب المنزلية المباركة!</p>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Name Input & High-Five */}
      {step === 2 && (
        <div>
          <div style={{ margin: '0 auto 10px auto', display: 'flex', justifyContent: 'center' }}>
            <NoorAvatar expression="happy" size={150} />
          </div>

          <h2 style={{ color: 'var(--primary)', marginBottom: '10px' }}>ما هو اسمك يا بطل؟ ✨</h2>

          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="اكتب اسمك ليظهر على الشهادة والملف الشخصي..."
            style={{ width: '85%', maxWidth: '400px', padding: '14px', borderRadius: '16px', border: '2px solid var(--primary)', fontSize: '1.15rem', textAlign: 'center', marginBottom: '20px', outline: 'none' }}
          />

          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#475569', fontWeight: 700, marginBottom: '8px' }}>اعطِ نور 'كف' الحماس (High Five) لتأكيد الانطلاق! 🖐️</p>
            <div
              onClick={handleHighFive}
              style={{ fontSize: '4rem', cursor: 'pointer', display: 'inline-block', transform: highFived ? 'scale(1.3)' : 'scale(1)', transition: 'transform 0.3s' }}
              className={!highFived ? 'pulse' : ''}
            >
              {highFived ? '✨👏✨' : '🖐️'}
            </div>
          </div>

          <button className="btn pulse" style={{ background: '#10B981', color: 'white', fontSize: '1.2rem', padding: '12px 36px' }} onClick={() => setStep(3)}>
            متابعة الشرح والتفاعل ➡️
          </button>
        </div>
      )}

      {/* Step 3: Interactive System Explanation Tour */}
      {step === 3 && (
        <div>
          <div style={{ margin: '0 auto 10px auto', display: 'flex', justifyContent: 'center' }}>
            <NoorAvatar expression="pointing" size={140} />
          </div>

          <h2 style={{ color: 'var(--primary)', marginBottom: '10px' }}>دليل محطات رحلة نور 🗺️</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', textAlign: 'right', marginBottom: '20px' }}>
            <div style={{ background: '#FFF', padding: '12px 15px', borderRadius: '16px', borderRight: '5px solid #F59E0B', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <h4 style={{ color: '#D97706', margin: '0 0 4px 0' }}>⛺ الخيمة الصفية (7 مسارات)</h4>
              <p style={{ fontSize: '0.8rem', color: '#475569', margin: 0 }}>تعلم (5د)، العب (10د)، اكتشف (5د)، اسأل الذكاء الاصطناعي (5د)، احك، ارسم وتحدّ!</p>
            </div>

            <div style={{ background: '#FFF', padding: '12px 15px', borderRadius: '16px', borderRight: '5px solid #3B82F6', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <h4 style={{ color: '#1D4ED8', margin: '0 0 4px 0' }}>🎮 مركز الألعاب الـ 20</h4>
              <p style={{ fontSize: '0.8rem', color: '#475569', margin: 0 }}>سباق السيارات، ضرب الأخطاء، درع القيم، الفضاء، الميزان، والبيانو التفاعلي!</p>
            </div>

            <div style={{ background: '#FFF', padding: '12px 15px', borderRadius: '16px', borderRight: '5px solid #10B981', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <h4 style={{ color: '#047857', margin: '0 0 4px 0' }}>🏆 الشهادات والأوسمة</h4>
              <p style={{ fontSize: '0.8rem', color: '#475569', margin: 0 }}>تجميع النقاط XP والعملات الذهبية واكتساب أوسمة التميز المعتمدة!</p>
            </div>
          </div>

          <button className="btn pulse" style={{ background: 'var(--primary)', color: 'white', fontSize: '1.25rem', padding: '14px 40px', borderRadius: '30px' }} onClick={handleFinishOnboarding}>
            انطلق للرحلة الآن! 🚀
          </button>
        </div>
      )}
    </div>
  );
}
