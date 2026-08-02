import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import NoorAvatar from './NoorAvatar';
import { playAudioTone } from '../services/speechService';

const STORIES = [
  {
    id: 1,
    title: "🌸 قصة الأمانة والدرهم المفقود",
    value: "الأمانة وإعادة الحقوق",
    text: "كان يوسف يلعب في الحديقة، فوجد صرة صغيرة فيها دراهم وسواراً براقاً. تذكر نصيحة صديقته نور: 'الأمانة هي قوة المسلم وسر محبة الله له'. أسرع يوسف وسلمها لحارس الحديقة، وبعد قليل جاءت عجوز تبحث عنها وتدعو ليوسف بالبركة والتوفيق!"
  },
  {
    id: 2,
    title: "❤️ قصة العصفور الجائع والسندويش المقسوم",
    value: "الرحمة والإيثار",
    text: "في يوم شتاء بارد، كانت سارة تأكل سندويشها الدافئ، فرأت عصفوراً صغيراً يرتجف من البرد. تذكرت كلام نور عن الرحمة، ففتت جزءاً من طعامها وقدمته للعصفور، فصار العصفور يرفرف حولها بسعادة وشكر!"
  },
  {
    id: 3,
    title: "🤲 قصة بركة بسم الله",
    value: "التسمية وشكر النعم",
    text: "كان عمر يستعجل دائماً في الأكل وينسى أن يذكر اسم الله. جلست معه نور وقالت له: 'التسمية تجعل الطعام مباركاً ويحميك من الشياطين'. من يومها، أصبح عمر يبتسم ويقول بسم الله قبل كل لقيمة، وصار يشعر بالنشاط والصحة!"
  },
  {
    id: 4,
    title: "🧹 قصة بطل النظافة ونبض الشارع",
    value: "إماطة الأذى ونظافة البيئة",
    text: "شاهد خالد قشرة موز ملقاة على الرصيف، وكان يمر بها الناس دون اهتمام. تذكر قول النبي ونور: 'إماطة الأذى عن الطريق صدقة'. انحنى خالد وشال القشرة ووضعها في سلة المهملات، فمنع بسلوكه البسيط سقوط طفل صغير!"
  },
  {
    id: 5,
    title: "🤝 قصة اعتذار الشجعان",
    value: "الشجاعة والاعتذار",
    text: "كسر بدر لعبة صديقه أحمد بالخطأ أثناء اللعب. خاف بدر في البداية، لكن نور قالت له: 'الاعتذار الصادق من صفات الأبطال الأقوياء'. ذهب بدر لأحمد وقال له بشجاعة: 'أنا آسف يا صديقي وسأساعدك في إصلاحها'. فابتسم أحمد وعانقه!"
  },
  {
    id: 6,
    title: "👴 قصة مساعدة الجد اللطيف",
    value: "احترام الكبار ومساعدتهم",
    text: "رأت مريم جارهما المسن يحمل أكياساً ثقيلة ويصعد السلم بصعوبة. أسرعت مريم وقالت: 'دعني أساعدك يا جدي!'. فرح الجد ودعا لها بالخير. تذكرت مريم كلام نور: 'احترام الكبير يملأ حياتنا بالبركة والتوفيق'!"
  }
];

export default function ClassroomSuite() {
  const { speak, setActiveScreen, setActiveModal, addXpAndCoins } = useGame();
  const [activeTrack, setActiveTrack] = useState(1);
  const [currentStoryIdx, setCurrentStoryIdx] = useState(0);

  const [chatMessages, setChatMessages] = useState([
    { sender: 'noor', text: 'مرحباً بكم يا أبطال الخيمة الصفية! أنا جاهزة للإجابة عن أسئلة مجموعاتكم بذكاء! 💡' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const currentStory = STORIES[currentStoryIdx];

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

  const gamesList = [
    { id: 'game_racing', icon: '🏎️', title: 'سباق السيارات', desc: 'سرعة القيادة المعرفية' },
    { id: 'game_whack', icon: '🔨', title: 'ضرب السلوكيات', desc: 'القضاء على الأخطاء' },
    { id: 'game_shield', icon: '🛡️', title: 'درع نور وحصن القيم', desc: 'الدفاع عن الأخلاق' },
    { id: 'game_brick', icon: '🧱', title: 'كاسر المكعبات', desc: 'تكسير مكعبات المعرفة' },
    { id: 'game_wordsearch', icon: '🔤', title: 'شبكة الكلمات', desc: 'الحروف والكلمات المخفية' },
    { id: 'game_mizan', icon: '⚖️', title: 'ميزان الأعمال', desc: 'ثقل كفة الحسنات' },
    { id: 'game_science', icon: '🧪', title: 'مختبر العلوم', desc: 'تجارب التلوين والمزج' },
    { id: 'game_piano', icon: '🎵', title: 'بيانو الأناشيد', desc: 'عزف ألحان الأمل' },
    { id: 'game_space', icon: '🚀', title: 'صاروخ الفضاء', desc: 'مغامرة الفضاء' },
    { id: 'game_tower', icon: '🏰', title: 'برج المعرفة', desc: 'بناء البرج السحري' },
    { id: 'game_chef', icon: '🍳', title: 'مطبخ نور', desc: 'المقادير الصحية' },
    { id: 'game_catch', icon: '🎯', title: 'صيد الخيرات', desc: 'سلة نور السحرية' },
    { id: 'game_memory', icon: '🎴', title: 'طابق البطاقات', desc: 'الذاكرة والصور' },
    { id: 'game_dragdrop', icon: '🧩', title: 'تصنيف السلوكيات', desc: 'الصادق والخاطئ' },
    { id: 'game_balloon', icon: '🎈', title: 'فرقعة البالونات', desc: 'السرعة والتركيز' },
    { id: 'game_wordpuzzle', icon: '🔤', title: 'تركيب العبارات', desc: 'ترتيب الكلمات' },
    { id: 'game_hidden', icon: '🔍', title: 'العدسة السحرية', desc: 'البحث عن الأشياء' },
    { id: 'game_sound', icon: '🔊', title: 'تمييز الأصوات', desc: 'الاستماع والمطابقة' },
    { id: 'game_drawing', icon: '🎨', title: 'لوحة الرسم', desc: 'رسم وتلوين وملصقات' },
    { id: 'game_wheel', icon: '🎡', title: 'عجلة الحظ', desc: 'التحدي والتنافس' }
  ];

  return (
    <div className="glass-card bounce-in" style={{ width: '95%', maxWidth: '750px', margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <button className="btn" style={{ background: '#CBD5E1', color: '#1E293B', padding: '6px 14px', margin: 0 }} onClick={() => setActiveScreen('universe')}>
          🔙 المجرة
        </button>
        <h2 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.4rem' }}>⛺ نموذج الخيمة الصفية (7 مسارات)</h2>
        <div style={{ width: '60px' }}></div>
      </div>

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

      {activeTrack === 2 && (
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '15px' }}>🎮 مركز الألعاب التفاعلية الـ 20</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
            {gamesList.map(g => (
              <div key={g.id} className="glass-card" style={{ cursor: 'pointer', background: '#FFF', padding: '10px' }} onClick={() => setActiveScreen(g.id)}>
                <div style={{ fontSize: '2rem' }}>{g.icon}</div>
                <h4 style={{ color: 'var(--primary)', margin: '4px 0', fontSize: '0.85rem' }}>{g.title}</h4>
                <p style={{ fontSize: '0.7rem', color: '#64748B', margin: 0 }}>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTrack === 3 && (
        <div style={{ textAlign: 'center' }}>
          <NoorAvatar expression="thinking" size={110} />
          <h3 style={{ color: 'var(--primary)', margin: '10px 0' }}>🔍 اكتشف الخطأ مع نور!</h3>
          <p style={{ color: '#475569', marginBottom: '15px' }}>
            تعرض نور الموقف التالي: <strong>"يقوم أحمد بالأكل باليد اليسرى ودون أن يذكر اسم الله"</strong>
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '450px', margin: 'auto' }}>
            <button className="btn" style={{ background: '#EF4444', color: 'white' }} onClick={() => { addXpAndCoins(15, 10); speak("أحسنت واكتشفت الخطأ بنجاح! الأكل باليد اليسرى خطأ ويجب الأكل باليمين!"); }}>
              ❌ الخطأ: الأكل باليد اليسرى (يجب باليمين)
            </button>
            <button className="btn" style={{ background: '#EF4444', color: 'white' }} onClick={() => { addXpAndCoins(15, 10); speak("ممتاز! عدم التسمية خطأ ويجب القول: بسم الله!"); }}>
              ❌ الخطأ: عدم التسمية قبل الأكل (يجب القول: بسم الله)
            </button>
          </div>
        </div>
      )}

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
              <div key={i} style={{ background: msg.sender === 'user' ? '#E2E8F0' : '#DBEAFE', color: msg.sender === 'user' ? '#1E293B' : 'var(--primary)', padding: '8px 14px', borderRadius: '12px', marginBottom: '8px', maxWidth: '85%', marginLeft: msg.sender === 'user' ? 'auto' : '0', fontWeight: 'bold' }}>
                {msg.text}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="اكتب سؤال مجموعتك هنا..." style={{ flex: 1, padding: '10px 14px', borderRadius: '15px', border: '2px solid var(--primary)', fontSize: '0.95rem' }} />
            <button className="btn" style={{ background: 'var(--primary)', color: 'white', padding: '10px 20px', margin: 0 }} onClick={() => handleSendChat()}>إرسال 🚀</button>
          </div>
        </div>
      )}

      {activeTrack === 5 && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <NoorAvatar expression="reading" size={130} />
          </div>
          <span style={{ background: '#FEF3C7', color: '#D97706', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>
            ✨ القيمة: {currentStory.value}
          </span>
          <h3 style={{ color: 'var(--primary)', margin: '8px 0 12px 0', fontSize: '1.3rem' }}>{currentStory.title}</h3>
          <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.7, background: '#FFF', padding: '16px', borderRadius: '20px', border: '2px solid #DBEAFE', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', marginBottom: '15px' }}>
            "{currentStory.text}"
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn pulse" style={{ background: '#8B5CF6', color: 'white', padding: '10px 24px' }} onClick={() => speak(currentStory.text)}>
              استمع للقصة بصوت نور 🔊
            </button>
            <button className="btn" style={{ background: '#3B82F6', color: 'white', padding: '10px 20px' }} onClick={() => { setCurrentStoryIdx((prev) => (prev + 1) % STORIES.length); playAudioTone('success'); }}>
              القصة التالية ➡️ ({currentStoryIdx + 1}/{STORIES.length})
            </button>
          </div>
        </div>
      )}

      {activeTrack === 6 && (
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '15px' }}>🎨 ارسم ولون مع نور</h3>
          <p style={{ color: '#64748B', marginBottom: '20px' }}>انتقل إلى لوحة الرسم الفنية للتعبير والتلوين المباشر!</p>
          <button className="btn pulse" style={{ background: '#10B981', color: 'white', fontSize: '1.2rem' }} onClick={() => setActiveScreen('game_drawing')}>
            افتح لوحة الرسم 🚀
          </button>
        </div>
      )}

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
