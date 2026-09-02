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

function HealthRing() {
  return <div className="health-ring" aria-label="Overall crop health 87 percent"><div className="health-center"><Leaf /><strong>87%</strong><span>Healthy</span></div></div>;
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'मराठी'>('EN');
  const [active, setActive] = useState('Overview');
  const date = useMemo(() => new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date()), []);
  const navItems = [{ label: 'Overview', icon: Home }, { label: 'My crops', icon: Sprout }, { label: 'Schedule', icon: CalendarDays }, { label: 'Ask Mitra', icon: MessageCircle }];
  return <main className="dashboard-shell">
    <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-top"><div className="brand"><span className="brand-mark"><Sprout /></span><span>Shetkari<br />Mitra</span></div><button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button></div>
      <nav aria-label="Main navigation">{navItems.map(({ label, icon: Icon }) => <button key={label} onClick={() => { setActive(label); setMenuOpen(false); }} className={active === label ? 'active' : ''}><Icon /><span>{label}</span></button>)}</nav>
      <div className="sidebar-bottom"><div className="farmer-card"><div className="avatar">RM</div><div><strong>Ramesh More</strong><span>Pune, Maharashtra</span></div></div><button onClick={onLogout}><LogOut /><span>Sign out</span></button></div>
    </aside>
    {menuOpen && <button className="scrim" onClick={() => setMenuOpen(false)} aria-label="Close navigation" />}
    <section className="main-panel">
      <header className="topbar"><div className="topbar-left"><button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></button><div><span className="mobile-date">{date}</span><h1>Good morning, Ramesh! <span>🌱</span></h1></div></div><div className="top-actions"><button className="language" onClick={() => setLanguage(language === 'EN' ? 'मराठी' : 'EN')}>{language}</button><button className="icon-button" aria-label="Search"><Search /></button><button className="icon-button notification" aria-label="Notifications"><Bell /><i /></button><div className="avatar top-avatar">RM</div></div></header>
      <div className="content">
        <div className="welcome-row"><div><p>{date}</p><h2>Here&apos;s how your farm is doing today.</h2></div><button className="weather-pill"><CloudSun /><span><strong>28°C</strong>Pune · Partly cloudy</span><ChevronRight /></button></div>
        <section className="hero-grid">
          <article className="health-card"><div className="card-title"><span className="icon-tile green"><Leaf /></span><div><span>Overall crop health</span><strong>Everything looks good</strong></div><span className="live-dot">Live</span></div><div className="health-content"><HealthRing /><div className="health-message"><div className="happy-face">☺</div><div><strong>Your plants are happy!</strong><p>All vital readings are in the healthy range. Keep up the good work.</p></div></div></div><div className="health-footer"><span><i className="good" /> 3 crops healthy</span><span><i className="watch" /> 1 needs attention</span><button>View all crops <ChevronRight /></button></div></article>
          <article className="weather-card"><div className="weather-main"><div><span>Today&apos;s weather</span><strong>28°</strong><p>Feels like 30° · Partly cloudy</p></div><Sun className="sun-icon" /></div><div className="weather-stats"><div><Droplets /><span>Humidity<strong>68%</strong></span></div><div><Wind /><span>Wind<strong>9 km/h</strong></span></div></div><div className="rain-note"><CloudSun /><p><strong>Light rain expected tomorrow</strong><span>Good news for your wheat field.</span></p></div></article>
        </section>
        <section className="metrics" aria-label="Farm readings">
          <article><span className="icon-tile blue"><Droplets /></span><div><p>Soil moisture</p><strong>72%</strong><span className="trend"><TrendingUp /> 4% today</span></div><div className="mini-bar"><i style={{ width: '72%' }} /></div></article>
          <article><span className="icon-tile amber"><ThermometerSun /></span><div><p>Soil temperature</p><strong>24°C</strong><span>Ideal range</span></div><div className="mini-bar amber-bar"><i style={{ width: '64%' }} /></div></article>
          <article><span className="icon-tile lime"><Sun /></span><div><p>Light exposure</p><strong>6.8 hrs</strong><span>Great sunlight</span></div><div className="mini-bar lime-bar"><i style={{ width: '82%' }} /></div></article>
          <article><span className="icon-tile purple"><Sprout /></span><div><p>Active fields</p><strong>4</strong><span>12.6 acres</span></div><div className="crop-dots"><i>🍅</i><i>🌾</i><i>🌿</i><i>+1</i></div></article>
        </section>
        <section className="detail-grid">
          <article className="panel crop-panel"><div className="panel-heading"><div><span>My crops</span><p>Health across your fields</p></div><button>View all <ChevronRight /></button></div><div className="crop-list">{crops.map((crop) => <div className="crop-row" key={crop.name}><span className="crop-icon" style={{ backgroundColor: `${crop.color}16` }}>{crop.icon}</span><div className="crop-name"><strong>{crop.name}</strong><span>{crop.field}</span></div><div className="crop-score"><span>{crop.status}</span><div><i style={{ width: `${crop.health}%`, backgroundColor: crop.color }} /></div></div><strong className="score" style={{ color: crop.color }}>{crop.health}%</strong><ChevronRight /></div>)}</div></article>
          <article className="panel trend-panel"><div className="panel-heading"><div><span>Moisture trend</span><p>Last 7 days · North Field</p></div><button className="more-button">•••</button></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={moistureData} margin={{ top: 12, right: 6, left: -24, bottom: 0 }}><defs><linearGradient id="moistureFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3f8b67" stopOpacity={0.25}/><stop offset="100%" stopColor="#3f8b67" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="#e7eadf" vertical={false} strokeDasharray="4 4" /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#788275', fontSize: 11 }} /><Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #dfe5d9', boxShadow: '0 8px 24px rgba(36,55,40,.1)' }} formatter={(value) => [`${value}%`, 'Moisture']} /><Area type="monotone" dataKey="value" stroke="#3f8b67" strokeWidth={3} fill="url(#moistureFill)" dot={{ r: 3, fill: '#fff', stroke: '#3f8b67', strokeWidth: 2 }} /></AreaChart></ResponsiveContainer></div></article>
        </section>
        <section className="bottom-grid"><article className="task-card"><div className="task-icon"><Droplets /></div><div><span>Today&apos;s task</span><strong>Water the cotton field</strong><p>South Field · Best before 6:30 PM</p></div><button>Mark done</button></article><article className="mitra-card"><div><span><MessageCircle /> Ask Mitra</span><strong>“Should I water the wheat today?”</strong><p>Get simple farming guidance based on your field data.</p></div><button aria-label="Ask Mitra"><ChevronRight /></button><Sprout className="mitra-plant" /></article></section>
      </div>
      <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map(({ label, icon: Icon }) => <button key={label} onClick={() => setActive(label)} className={active === label ? 'active' : ''}><Icon /><span>{label === 'My crops' ? 'Crops' : label === 'Ask Mitra' ? 'Mitra' : label}</span></button>)}<button><UserRound /><span>Profile</span></button></nav>
    </section>
  </main>;
}

export default function HomePage() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => setLoggedIn(sessionStorage.getItem('shetkari-demo') === 'true'), []);
  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;
  return <Dashboard onLogout={() => { sessionStorage.removeItem('shetkari-demo'); setLoggedIn(false); }} />;
}
