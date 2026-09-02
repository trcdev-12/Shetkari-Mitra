'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Bell, CalendarDays, ChevronRight, CloudSun, Droplets, Home, Leaf, LogOut, Menu, MessageCircle, Search, Sprout, Sun, ThermometerSun, TrendingUp, UserRound, Wind, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const moistureData = [
  { day: 'Mon', value: 56 }, { day: 'Tue', value: 62 }, { day: 'Wed', value: 59 },
  { day: 'Thu', value: 68 }, { day: 'Fri', value: 73 }, { day: 'Sat', value: 69 }, { day: 'Sun', value: 72 },
];

const crops = [
  { name: 'Tomato', field: 'North Field', health: 94, icon: '🍅', color: '#e9683b', status: 'Excellent' },
  { name: 'Wheat', field: 'East Field', health: 88, icon: '🌾', color: '#d9a43a', status: 'Healthy' },
  { name: 'Cotton', field: 'South Field', health: 76, icon: '🌿', color: '#5f9b67', status: 'Needs care' },
];

function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('user1@trc.in');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (email.trim().toLowerCase() === 'user1@trc.in' && password === '123456') {
      sessionStorage.setItem('shetkari-demo', 'true'); onLogin(); return;
    }
    setError('Please check your email and password.');
  }
  return <main className="login-shell">
    <section className="login-story" aria-label="Welcome to Shetkari Mitra">
      <div className="brand brand-light"><span className="brand-mark"><Sprout /></span><span>Shetkari Mitra</span></div>
      <div className="story-copy"><span className="eyebrow light">Your farm. Always within reach.</span><h1>Healthy crops.<br />Peaceful mornings.</h1><p>Simple, timely insights that help you care for every plant, every day.</p><div className="field-pulse"><span /><span /><span /></div></div>
      <div className="farm-lines" aria-hidden="true"><i /><i /><i /><i /></div>
    </section>
    <section className="login-panel">
      <div className="mobile-login-brand brand"><span className="brand-mark"><Sprout /></span><span>Shetkari Mitra</span></div>
      <div className="login-box"><div className="login-leaf"><Leaf /></div><span className="eyebrow">Welcome back, farmer</span><h2>Let&apos;s check your fields</h2><p className="login-subtitle">Sign in to see today&apos;s crop health and farm activity.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label>Email address<Input aria-label="Email address" value={email} onChange={(event) => { setEmail(event.target.value); setError(''); }} type="email" autoComplete="username" /></label>
          <label>Password<Input aria-label="Password" value={password} onChange={(event) => { setPassword(event.target.value); setError(''); }} type="password" autoComplete="current-password" /></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <Button type="submit" className="login-button">Open my dashboard <ChevronRight /></Button>
        </form>
        <div className="demo-note"><span>Demo access</span><code>user1@trc.in</code><i>•</i><code>123456</code></div><p className="secure-note">This is a preview dashboard. No real farm data is stored.</p>
      </div>
    </section>
  </main>;
}

function HealthRing({ mr }: { mr: boolean }) {
  return <div className="health-ring" aria-label={mr ? 'एकूण पीक आरोग्य ८७ टक्के' : 'Overall crop health 87 percent'}><div className="health-center"><Leaf /><strong>87%</strong><span>{mr ? 'निरोगी' : 'Healthy'}</span></div></div>;
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'मराठी'>('मराठी');
  const [active, setActive] = useState('overview');
  const mr = language === 'मराठी';
  useEffect(() => {
    const saved = localStorage.getItem('shetkari-language');
    if (saved === 'EN' || saved === 'मराठी') setLanguage(saved);
  }, []);
  const changeLanguage = () => {
    const next = language === 'EN' ? 'मराठी' : 'EN';
    setLanguage(next); localStorage.setItem('shetkari-language', next);
  };
  const date = useMemo(() => new Intl.DateTimeFormat(mr ? 'mr-IN' : 'en-IN', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date()), [mr]);
  const navItems = [
    { id: 'overview', label: mr ? 'आढावा' : 'Overview', mobile: mr ? 'आढावा' : 'Overview', icon: Home },
    { id: 'crops', label: mr ? 'माझी पिके' : 'My crops', mobile: mr ? 'पिके' : 'Crops', icon: Sprout },
    { id: 'schedule', label: mr ? 'नियोजन' : 'Schedule', mobile: mr ? 'नियोजन' : 'Schedule', icon: CalendarDays },
    { id: 'mitra', label: mr ? 'मित्राला विचारा' : 'Ask Mitra', mobile: mr ? 'मित्र' : 'Mitra', icon: MessageCircle },
  ];
  const displayCrops = crops.map((crop, index) => ({
    ...crop,
    name: mr ? ['टोमॅटो', 'गहू', 'कापूस'][index] : crop.name,
    field: mr ? ['उत्तर शेत', 'पूर्व शेत', 'दक्षिण शेत'][index] : crop.field,
    status: mr ? ['उत्कृष्ट', 'निरोगी', 'काळजी घ्या'][index] : crop.status,
  }));
  return <main className="dashboard-shell">
    <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-top"><div className="brand"><span className="brand-mark"><Sprout /></span><span>Shetkari<br />Mitra</span></div><button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button></div>
      <nav aria-label={mr ? 'मुख्य नेव्हिगेशन' : 'Main navigation'}>{navItems.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => { setActive(id); setMenuOpen(false); }} className={active === id ? 'active' : ''}><Icon /><span>{label}</span></button>)}</nav>
      <div className="sidebar-bottom"><div className="farmer-card"><div className="avatar">RM</div><div><strong>{mr ? 'रमेश मोरे' : 'Ramesh More'}</strong><span>{mr ? 'पुणे, महाराष्ट्र' : 'Pune, Maharashtra'}</span></div></div><button onClick={onLogout}><LogOut /><span>{mr ? 'बाहेर पडा' : 'Sign out'}</span></button></div>
    </aside>
    {menuOpen && <button className="scrim" onClick={() => setMenuOpen(false)} aria-label="Close navigation" />}
    <section className="main-panel">
      <header className="topbar"><div className="topbar-left"><button className="menu-button" onClick={() => setMenuOpen(true)} aria-label={mr ? 'मेनू उघडा' : 'Open menu'}><Menu /></button><div><span className="mobile-date">{date}</span><h1>{mr ? 'शुभ सकाळ, रमेश!' : 'Good morning, Ramesh!'} <span>🌱</span></h1></div></div><div className="top-actions"><button className="language" onClick={changeLanguage} aria-label={mr ? 'Switch to English' : 'मराठीमध्ये बदला'}>{mr ? 'EN' : 'मराठी'}</button><button className="icon-button" aria-label={mr ? 'शोधा' : 'Search'}><Search /></button><button className="icon-button notification" aria-label={mr ? 'सूचना' : 'Notifications'}><Bell /><i /></button><div className="avatar top-avatar">RM</div></div></header>
      <div className="content">
        <div className="welcome-row"><div><p>{date}</p><h2>{mr ? 'आज तुमच्या शेताची स्थिती अशी आहे.' : 'Here\'s how your farm is doing today.'}</h2></div><button className="weather-pill"><CloudSun /><span><strong>28°C</strong>{mr ? 'पुणे · अंशतः ढगाळ' : 'Pune · Partly cloudy'}</span><ChevronRight /></button></div>
        <section className="hero-grid">
          <article className="health-card"><div className="card-title"><span className="icon-tile green"><Leaf /></span><div><span>{mr ? 'एकूण पीक आरोग्य' : 'Overall crop health'}</span><strong>{mr ? 'सर्व काही चांगले दिसत आहे' : 'Everything looks good'}</strong></div><span className="live-dot">{mr ? 'थेट' : 'Live'}</span></div><div className="health-content"><HealthRing mr={mr} /><div className="health-message"><div className="happy-face">☺</div><div><strong>{mr ? 'तुमची झाडे आनंदी आहेत!' : 'Your plants are happy!'}</strong><p>{mr ? 'सर्व महत्त्वाचे मापदंड योग्य मर्यादेत आहेत. अशीच काळजी घेत राहा.' : 'All vital readings are in the healthy range. Keep up the good work.'}</p></div></div></div><div className="health-footer"><span><i className="good" /> {mr ? '३ पिके निरोगी' : '3 crops healthy'}</span><span><i className="watch" /> {mr ? '१ पिकाकडे लक्ष द्या' : '1 needs attention'}</span><button>{mr ? 'सर्व पिके पहा' : 'View all crops'} <ChevronRight /></button></div></article>
          <article className="weather-card"><div className="weather-main"><div><span>{mr ? 'आजचे हवामान' : 'Today\'s weather'}</span><strong>28°</strong><p>{mr ? 'जाणवते ३०° · अंशतः ढगाळ' : 'Feels like 30° · Partly cloudy'}</p></div><Sun className="sun-icon" /></div><div className="weather-stats"><div><Droplets /><span>{mr ? 'आर्द्रता' : 'Humidity'}<strong>68%</strong></span></div><div><Wind /><span>{mr ? 'वारा' : 'Wind'}<strong>9 km/h</strong></span></div></div><div className="rain-note"><CloudSun /><p><strong>{mr ? 'उद्या हलक्या पावसाची शक्यता' : 'Light rain expected tomorrow'}</strong><span>{mr ? 'तुमच्या गव्हाच्या शेतासाठी चांगली बातमी.' : 'Good news for your wheat field.'}</span></p></div></article>
        </section>
        <section className="metrics" aria-label="Farm readings">
          <article><span className="icon-tile blue"><Droplets /></span><div><p>{mr ? 'जमिनीतील ओलावा' : 'Soil moisture'}</p><strong>72%</strong><span className="trend"><TrendingUp /> {mr ? 'आज ४% वाढ' : '4% today'}</span></div><div className="mini-bar"><i style={{ width: '72%' }} /></div></article>
          <article><span className="icon-tile amber"><ThermometerSun /></span><div><p>{mr ? 'जमिनीचे तापमान' : 'Soil temperature'}</p><strong>24°C</strong><span>{mr ? 'योग्य मर्यादा' : 'Ideal range'}</span></div><div className="mini-bar amber-bar"><i style={{ width: '64%' }} /></div></article>
          <article><span className="icon-tile lime"><Sun /></span><div><p>{mr ? 'सूर्यप्रकाश' : 'Light exposure'}</p><strong>{mr ? '६.८ तास' : '6.8 hrs'}</strong><span>{mr ? 'उत्तम सूर्यप्रकाश' : 'Great sunlight'}</span></div><div className="mini-bar lime-bar"><i style={{ width: '82%' }} /></div></article>
          <article><span className="icon-tile purple"><Sprout /></span><div><p>{mr ? 'सक्रिय शेते' : 'Active fields'}</p><strong>4</strong><span>{mr ? '१२.६ एकर' : '12.6 acres'}</span></div><div className="crop-dots"><i>🍅</i><i>🌾</i><i>🌿</i><i>+1</i></div></article>
        </section>
        <section className="detail-grid">
          <article className="panel crop-panel"><div className="panel-heading"><div><span>{mr ? 'माझी पिके' : 'My crops'}</span><p>{mr ? 'सर्व शेतांमधील पिकांचे आरोग्य' : 'Health across your fields'}</p></div><button>{mr ? 'सर्व पहा' : 'View all'} <ChevronRight /></button></div><div className="crop-list">{displayCrops.map((crop) => <div className="crop-row" key={crop.name}><span className="crop-icon" style={{ backgroundColor: `${crop.color}16` }}>{crop.icon}</span><div className="crop-name"><strong>{crop.name}</strong><span>{crop.field}</span></div><div className="crop-score"><span>{crop.status}</span><div><i style={{ width: `${crop.health}%`, backgroundColor: crop.color }} /></div></div><strong className="score" style={{ color: crop.color }}>{crop.health}%</strong><ChevronRight /></div>)}</div></article>
          <article className="panel trend-panel"><div className="panel-heading"><div><span>{mr ? 'ओलाव्याचा कल' : 'Moisture trend'}</span><p>{mr ? 'मागील ७ दिवस · उत्तर शेत' : 'Last 7 days · North Field'}</p></div><button className="more-button">•••</button></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={moistureData} margin={{ top: 12, right: 6, left: -24, bottom: 0 }}><defs><linearGradient id="moistureFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3f8b67" stopOpacity={0.25}/><stop offset="100%" stopColor="#3f8b67" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="#e7eadf" vertical={false} strokeDasharray="4 4" /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#788275', fontSize: 11 }} /><Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #dfe5d9', boxShadow: '0 8px 24px rgba(36,55,40,.1)' }} formatter={(value) => [`${value}%`, mr ? 'ओलावा' : 'Moisture']} /><Area type="monotone" dataKey="value" stroke="#3f8b67" strokeWidth={3} fill="url(#moistureFill)" dot={{ r: 3, fill: '#fff', stroke: '#3f8b67', strokeWidth: 2 }} /></AreaChart></ResponsiveContainer></div></article>
        </section>
        <section className="bottom-grid"><article className="task-card"><div className="task-icon"><Droplets /></div><div><span>{mr ? 'आजचे काम' : 'Today\'s task'}</span><strong>{mr ? 'कापसाच्या शेताला पाणी द्या' : 'Water the cotton field'}</strong><p>{mr ? 'दक्षिण शेत · संध्याकाळी ६:३० पूर्वी' : 'South Field · Best before 6:30 PM'}</p></div><button>{mr ? 'पूर्ण झाले' : 'Mark done'}</button></article><article className="mitra-card"><div><span><MessageCircle /> {mr ? 'मित्राला विचारा' : 'Ask Mitra'}</span><strong>{mr ? '“आज गव्हाला पाणी द्यावे का?”' : '“Should I water the wheat today?”'}</strong><p>{mr ? 'तुमच्या शेताच्या माहितीनुसार सोपा शेती सल्ला मिळवा.' : 'Get simple farming guidance based on your field data.'}</p></div><button aria-label={mr ? 'मित्राला विचारा' : 'Ask Mitra'}><ChevronRight /></button><Sprout className="mitra-plant" /></article></section>
      </div>
      <nav className="mobile-nav" aria-label={mr ? 'मोबाईल नेव्हिगेशन' : 'Mobile navigation'}>{navItems.map(({ id, mobile, icon: Icon }) => <button key={id} onClick={() => setActive(id)} className={active === id ? 'active' : ''}><Icon /><span>{mobile}</span></button>)}<button><UserRound /><span>{mr ? 'प्रोफाइल' : 'Profile'}</span></button></nav>
    </section>
  </main>;
}

export default function HomePage() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => setLoggedIn(sessionStorage.getItem('shetkari-demo') === 'true'), []);
  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;
  return <Dashboard onLogout={() => { sessionStorage.removeItem('shetkari-demo'); setLoggedIn(false); }} />;
}
