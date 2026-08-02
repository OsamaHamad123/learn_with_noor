import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from './NoorAvatar';
import { playAudioTone } from '../services/speechService';

export default function ClassroomSuite() {
  const { speak, setActiveScreen, setActiveModal, addXpAndCoins } = useGame();
  const [activeTrack, setActiveTrack] = useState(1);

  // Ask Noor AI Chat State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'noor', text: 'مرحباً بكم يا أبطال الخيمة الصفية! أنا جاهزة للإجابة عن أسئلة مجموعاتكم بذكاء! 💡' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const tracks = [
    { id: 1, title: '📖 تعلم (5د)', icon: '📖' },
    { id: 2, title: '🎮 العب (10د)', icon: '🎮' },
    { id: 3, title: '🔍 اكتشف (5د)', icon: '🔍' },
    { id: 4, title: '🤖 اسأل (5د)', icon: '🤖' },
    { id: 5, title: '📚 احكِ (5د)', icon: '📚' },
    { id: 6, title: '🎨 ارسم (10د)', icon: '🎨' },
    { id: 7, title: '⚡ تحدَّ (5د)', icon: '⚡' }
  ];

  const handleTrackChange = (id) => {
    setActiveTrack(id);
    playAudioTone('success');
  };

  const handleSendChat = (textToSend = chatInput) => {
    const q = textToSend.trim();
    if (!q) return;

    const newMsgs = [...chatMessages, { sender: 'user', text: q }];
    setChatMessages(newMsgs);
    setChatInput('');

    setTimeout(() => {
      let aiAns = "سؤال رائع! الذكاء الاصطناعي بنور يجيب: التعلم وحسن الخلق يمنحان الطفل القوة والمحبة من الجميع!";
      if (q.includes('طعام')) aiAns = "نور تجيب: نتعلم آداب الطعام لنشكر الله على نعمه ونحافظ على صحتنا وبركة طعامنا!";
      if (q.includes('صديق')) aiAns = "نور تجيب: الصديق الصالح هو من يساعدك على الخير، ويشجعك في دراستك وتكونان سنداً لبعضكما!";

      setChatMessages(prev => [...prev, { sender: 'noor', text: aiAns }]);
      speak(aiAns);
      playAudioTone('success');
    }, 600);
  };

  return (
    <div className="glass-card bounce-in" style={{ width: '95%', maxWidth: '750px', margin: 'auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', padding: '6px 14px', margin: 0 }} onClick={() => setActiveScreen('universe')}>
          🔙 المجرة
        </button>
        <h2 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.4rem' }}>⛺ نموذج الخيمة الصفية (7 مسارات)</h2>
        <div style={{ width: '60px' }}></div>
      </div>

      {/* Track Tabs Bar */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '15px', scrollbarWidth: 'none' }}>
        {tracks.map(t => (
          <button
            key={t.id}
            className="btn"
            style={{
              padding: '8px 14px',
              fontSize: '0.9rem',
              whiteSpace: 'nowrap',
              margin: 0,
              background: activeTrack === t.id ? 'var(--primary)' : '#FFF',
              color: activeTrack === t.id ? '#FFF' : 'var(--text-color)',
              borderColor: activeTrack === t.id ? 'var(--primary-light)' : '#E2E8F0'
            }}
            onClick={() => handleTrackChange(t.id)}
          >
            {t.title}
          </button>
        ))}
      </div>

      {/* Track 1: Learn */}
      {activeTrack === 1 && (
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <NoorAvatar expression="happy" size={140} />
          <div className="speech-bubble" style={{ marginTop: '15px', marginBottom: '20px', maxWidth: '500px' }}>
            أهلاً بكم يا أبطال في درس اليوم! سنكتشف معاً مفآهيم سحرية وقيمة جديدة عن آداب الطعام وحسن الخلق!
          </div>
          <button className="btn pulse" style={{ background: '#10B981', color: 'white' }} onClick={() => speak("أهلاً بكم يا أبطال في درس اليوم! سنكتشف معاً مفآهيم سحرية وقيمة جديدة!")}>
            استمع إلى الشرح بصوت نور 🔊
          </button>
        </div>
      )}

      {/* Track 2: Play Mini-Games Hub */}
      {activeTrack === 2 && (
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '15px' }}>🎮 مركز الألعاب التفاعلية الخمس</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div className="glass-card" style={{ cursor: 'pointer', background: '#FFF' }} onClick={() => setActiveScreen('game_memory')}>
              <div style={{ fontSize: '2.5rem' }}>🎴</div>
              <h4 style={{ color: 'var(--primary)', margin: '8px 0' }}>لعبة الذاكرة</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>طابق الصور والبطاقات الإسلامية</p>
            </div>
            <div className="glass-card" style={{ cursor: 'pointer', background: '#FFF' }} onClick={() => setActiveScreen('game_dragdrop')}>
              <div style={{ fontSize: '2.5rem' }}>🧩</div>
              <h4 style={{ color: 'var(--primary)', margin: '8px 0' }}>تصنيف السلوكيات</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>سحب وإفلات السلوكيات</p>
            </div>
            <div className="glass-card" style={{ cursor: 'pointer', background: '#FFF' }} onClick={() => setActiveScreen('game_balloon')}>
              <div style={{ fontSize: '2.5rem' }}>🎈</div>
              <h4 style={{ color: 'var(--primary)', margin: '8px 0' }}>فرقعة البالونات</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>فرقعة البالونات السريعة</p>
            </div>
            <div className="glass-card" style={{ cursor: 'pointer', background: '#FFF' }} onClick={() => setActiveScreen('game_drawing')}>
              <div style={{ fontSize: '2.5rem' }}>🎨</div>
              <h4 style={{ color: 'var(--primary)', margin: '8px 0' }}>لوحة الرسم</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>رسم وتلوين وملصقات</p>
            </div>
            <div className="glass-card" style={{ cursor: 'pointer', background: '#FFF' }} onClick={() => setActiveScreen('game_wheel')}>
              <div style={{ fontSize: '2.5rem' }}>🎡</div>
              <h4 style={{ color: 'var(--primary)', margin: '8px 0' }}>عجلة الحظ</h4>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>تدوير عجلة التحديات</p>
            </div>
          </div>
        </div>
      )}

      {/* Track 3: Discover Spot the Error */}
      {activeTrack === 3 && (
        <div style={{ textAlign: 'center' }}>
          <NoorAvatar expression="thinking" size={110} />
          <h3 style={{ color: 'var(--primary)', margin: '10px 0' }}>🔍 اكتشف الخطأ مع نور!</h3>
          <p style={{ color: '#475569', marginBottom: '15px' }}>
            تعرض نور الموقف التالي: <strong>"يقوم أحمد بالأكل باليد اليسرى ودون أن يذكر اسم الله"</strong>
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '450px', margin: 'auto' }}>
            <button
              className="btn"
              style={{ background: '#EF4444', color: 'white' }}
              onClick={() => {
                addXpAndCoins(15, 10);
                speak("أحسنت واكتشفت الخطأ بنجاح! الأكل باليد اليسرى خطأ ويجب الأكل باليمين!");
              }}
            >
              ❌ الخطأ: الأكل باليد اليسرى (يجب باليمين)
            </button>
            <button
              className="btn"
              style={{ background: '#EF4444', color: 'white' }}
              onClick={() => {
                addXpAndCoins(15, 10);
                speak("ممتاز! عدم التسمية خطأ ويجب القول: بسم الله!");
              }}
            >
              ❌ الخطأ: عدم التسمية قبل الأكل (يجب القول: بسم الله)
            </button>
          </div>
        </div>
      )}

      {/* Track 4: Ask AI Chatbot */}
      {activeTrack === 4 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <NoorAvatar expression="happy" size={55} />
            <div>
              <h3 style={{ color: 'var(--primary)', margin: 0 }}>🤖 اسأل نور بالذكاء الاصطناعي</h3>
              <small style={{ color: '#64748B' }}>اطرح سؤال مجموعتك ونور ستجيب فوراً!</small>
            </div>
          </div>

          <div style={{ height: '180px', overflowY: 'auto', background: '#F8FAFC', borderRadius: '16px', padding: '12px', marginBottom: '12px', border: '1px solid #E2E8F0' }}>
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                style={{
                  background: msg.sender === 'user' ? '#E2E8F0' : '#DBEAFE',
                  color: msg.sender === 'user' ? '#1E293B' : 'var(--primary)',
                  padding: '8px 14px',
                  borderRadius: '12px',
                  marginBottom: '8px',
                  maxWidth: '85%',
                  marginLeft: msg.sender === 'user' ? 'auto' : '0',
                  fontWeight: 'bold'
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="اكتب سؤال مجموعتك هنا..."
              style={{ flex: 1, padding: '10px 14px', borderRadius: '15px', border: '2px solid var(--primary)', fontSize: '0.95rem' }}
            />
            <button className="btn" style={{ background: 'var(--primary)', color: 'white', padding: '10px 20px', margin: 0 }} onClick={() => handleSendChat()}>
              إرسال 🚀
            </button>
          </div>
        </div>
      )}

      {/* Track 5: Storyteller */}
      {activeTrack === 5 && (
        <div style={{ textAlign: 'center' }}>
          <NoorAvatar expression="happy" size={120} />
          <h3 style={{ color: 'var(--primary)', margin: '10px 0' }}>📚 احكِ مع نور</h3>
          <p style={{ fontSize: '1.1rem', color: '#334155', lineHeight: 1.6, background: '#FFF', padding: '15px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            "في يوم من الأيام، كان عليّ يجلس مع عائلته على الوجبة، وتذكر نصيحة نور بأن يقول 'بسم الله' ويأكل بيمينه، فابتسم والداه وفرحا ببطولته!"
          </p>
          <button className="btn" style={{ background: '#8B5CF6', color: 'white', marginTop: '15px' }} onClick={() => speak("في يوم من الأيام، كان عليّ يجلس مع عائلته على الوجبة، وتذكر نصيحة نور بأن يقول بسم الله ويأكل بيمينه!")}>
            استمع للقصة 🔊
          </button>
        </div>
      )}

      {/* Track 6: Draw Shortcut */}
      {activeTrack === 6 && (
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '15px' }}>🎨 ارسم ولون مع نور</h3>
          <p style={{ color: '#64748B', marginBottom: '20px' }}>انتقل إلى لوحة الرسم الفنية للتعبير والتلوين المباشر!</p>
          <button className="btn pulse" style={{ background: '#10B981', color: 'white', fontSize: '1.2rem' }} onClick={() => setActiveScreen('game_drawing')}>
            افتح لوحة الرسم 🚀
          </button>
        </div>
      )}

      {/* Track 7: Challenge & Cert */}
      {activeTrack === 7 && (
        <div style={{ textAlign: 'center' }}>
          <NoorAvatar expression="happy" size={130} />
          <h3 style={{ color: 'var(--primary)', margin: '10px 0' }}>⚡ تحدَّ مع نور (الاختبار الشهادي)</h3>
          <p style={{ color: '#64748B', marginBottom: '20px' }}>احصل على التغذية الراجعة الفورية وشهادة المجموعة!</p>
          <button className="btn pulse" style={{ background: '#F59E0B', color: 'white', fontSize: '1.2rem' }} onClick={() => setActiveModal('cert')}>
            استلم شهادة التميّز 🏆
          </button>
        </div>
      )}
    </div>
  );
}
