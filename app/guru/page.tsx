"use client"
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, LogOut, ShieldAlert, Activity, 
  RefreshCcw, Search, LayoutDashboard, 
  Brain, Bug, MailWarning, 
  MessageSquare, Send, X, Hexagon, Sparkles, GraduationCap, Terminal,
  ChevronLeft, ChevronRight, Trash2, Database, Radar, Target, Lightbulb, User, Eye, Info, Zap, Globe, Cpu, Radio, ShieldCheck,
  CheckCircle2, XCircle, ChevronDown
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid,
  PieChart, Pie
} from 'recharts'

// --- ASSET GALAXY HD ---
const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

// --- 1. CLICK EFFECT ---
const ParticleBurstClickEffect = () => {
  const [particles, setParticles] = useState<any[]>([]);
  useEffect(() => {
    const handleInteraction = (e: any) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      const numParticles = 12; 
      const newParticles = Array.from({ length: numParticles }).map(() => {
        const angle = Math.random() * Math.PI * 2; 
        const velocity = Math.random() * 60 + 20;  
        const size = Math.random() * 6 + 3;       
        return { id: Math.random(), x, y, dx: Math.cos(angle) * velocity, dy: Math.sin(angle) * velocity, size };
      });
      setParticles((prev) => [...prev, ...newParticles]);
      setTimeout(() => setParticles((p) => p.filter((x) => !newParticles.find((n) => n.id === x.id))), 800);
    };
    window.addEventListener('mousedown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    return () => {
      window.removeEventListener('mousedown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  },[]);
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div key={p.id} initial={{ top: p.y - p.size / 2, left: p.x - p.size / 2, scale: 0, opacity: 1 }} animate={{ top: p.y - p.size / 2 + p.dy, left: p.x - p.size / 2 + p.dx, scale: [0, 1, 0.2], opacity:[1, 0.8, 0] }} transition={{ duration: 0.8, ease: "easeOut" }} className="absolute bg-white rounded-full shadow-[0_0_15px_rgba(217,70,239,1)] blur-[1px]" style={{ width: p.size, height: p.size }} />
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- 2. BACKGROUND ENGINE ---
const CosmicEngine = React.memo(({ bgIdx }: { bgIdx: number }) => {
  const [stars, setStars] = useState<any[]>([]);
  useEffect(() => {
    setStars([...Array(70)].map((_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 2 + 0.5, duration: Math.random() * 4 + 2 })));
  }, []);
  return (
    <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden bg-black">
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vh] bg-fuchsia-600/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vh] bg-indigo-600/20 blur-[120px] rounded-full" />
      <div className="absolute inset-0 bg-grid-hologram opacity-[0.08]" />
      <AnimatePresence mode="wait">
        <motion.img 
          key={bgIdx} 
          src={CYBER_ASSETS[bgIdx]} 
          initial={{ opacity: 0, scale: 1.05 }} 
          animate={{ opacity: 0.45, scale: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 1.5, ease: "easeInOut" }} 
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen" 
        />
      </AnimatePresence>
      {stars.map((s) => (
        <motion.div key={s.id} animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.5, 1] }} transition={{ duration: s.duration, repeat: Infinity }} className="absolute bg-white rounded-full shadow-[0_0_8px_white]" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#020108]/95" />
    </div>
  );
});
CosmicEngine.displayName = 'CosmicEngine';

// --- HELPER: STATUS COLORS ---
const getScoreData = (score: number | null) => {
  if (score === null || score === undefined || isNaN(score)) return { color: "#475569", bg: "bg-slate-800", text: "text-slate-500", glow: "shadow-[0_0_0px_transparent]", label: "NO DATA" };
  if (score >= 80) return { color: "#10b981", bg: "bg-emerald-500", text: "text-emerald-400", glow: "shadow-[0_0_20px_rgba(16,185,129,0.6)]", label: "READY" };
  if (score >= 50) return { color: "#eab308", bg: "bg-yellow-500", text: "text-yellow-400", glow: "shadow-[0_0_20px_rgba(234,179,8,0.6)]", label: "CAUTION" };
  return { color: "#ef4444", bg: "bg-red-500", text: "text-red-400", glow: "shadow-[0_0_20px_rgba(239,68,68,0.6)]", label: "DANGER" };
};

const portalTransition = { initial: { opacity: 0, scale: 0.98, y: 15 }, animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, type: "spring", stiffness: 100 } }, exit: { opacity: 0, scale: 1.02 } };

export default function DashboardGuruZenith() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  // States
  const [view, setView] = useState<'dashboard'>('dashboard'); 
  const [reports, setReports] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [bgIdx, setBgIdx] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, setUser] = useState({ username: 'INSTRUCTOR' });
  const [activeClass, setActiveClass] = useState("ALL CLASSES"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackModal, setFeedbackModal] = useState<any>(null); 
  const [expandedLog, setExpandedLog] = useState<number | null>(null);
  const [appFeedbackModal, setAppFeedbackModal] = useState(false);
  const [appFeedbackForm, setAppFeedbackForm] = useState({ category: 'AI ENHANCEMENT', message: '' });
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [profileModal, setProfileModal] = useState(false); 

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "GOOD MORNING";
    if (hour < 17) return "GOOD AFTERNOON";
    return "GOOD EVENING";
  };

  // Fetch Data 
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://cyber-backend-delta.vercel.app/guru/reports');
      const rawData = await res.json();
      const dataArray = Array.isArray(rawData) ? rawData : (rawData.data || rawData.reports || []);
      if (dataArray.length > 0) {
        const studentMap: Record<string, any> = {};
        dataArray.forEach((item: any, i: number) => {
          const uname = item.username || `STUDENT_${i}`;
          const className = item.class_name ? String(item.class_name).toUpperCase() : "UNASSIGNED";
          const score = Number(item.score) || 0;
          const dom = String(item.domain_id || '').toLowerCase();
          
          if (!studentMap[uname]) { 
            studentMap[uname] = { username: uname, class_name: className, scores: { social: null, malware: null, phish: null }, attempts: { social: 0, malware: 0, phish: 0 }, totalScore: 0, testCount: 0, history:[] }; 
          }
          
          let pD = "UNKNOWN";
          if (dom.includes('soc')) pD = "SOCIAL ENGINEERING";
          else if (dom.includes('mal')) pD = "MALWARE ANALYSIS";
          else if (dom.includes('phis')) pD = "PHISHING DEFENSE";

          let parsedDetails = [];
          try {
             if (typeof item.details === 'string') parsedDetails = JSON.parse(item.details);
             else if (Array.isArray(item.details)) parsedDetails = item.details;
          } catch(e) {}

          studentMap[uname].history.push({ 
             ...item, 
             dbId: item.id, 
             parsedDomain: pD, 
             parsedScore: score,
             details: parsedDetails 
          });

          if (!isNaN(score)) {
             if (pD === "SOCIAL ENGINEERING") { studentMap[uname].scores.social = score; studentMap[uname].attempts.social += 1; }
             else if (pD === "MALWARE ANALYSIS") { studentMap[uname].scores.malware = score; studentMap[uname].attempts.malware += 1; }
             else if (pD === "PHISHING DEFENSE") { studentMap[uname].scores.phish = score; studentMap[uname].attempts.phish += 1; }
             studentMap[uname].totalScore += score;
             studentMap[uname].testCount += 1;
          }
        });
        setReports(Object.values(studentMap).map((s: any) => ({ ...s, avgScore: s.testCount > 0 ? Math.round(s.totalScore / s.testCount) : 0 })));
      } else { setReports([]); }
    } catch (e) { setReports([]); } 
    finally { setLoading(false); }
  };

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) setUser(JSON.parse(saved));
    fetchData();
    const interval = setInterval(() => setBgIdx(p => (p + 1) % CYBER_ASSETS.length), 4000);
    return () => clearInterval(interval);
  }, []);

  const handleDeleteLog = async (logId: any) => {
    if (!logId || !window.confirm("Purge record from system?")) return;
    try {
      const res = await fetch(`https://cyber-backend-delta.vercel.app/guru/delete-log/${logId}`, { method: 'DELETE' });
      if (res.ok) { setFeedbackModal(null); fetchData(); } 
    } catch (e) { console.error(e); }
  };

  const submitAppFeedback = async () => {
    if(!appFeedbackForm.message.trim()) return;
    setIsSendingFeedback(true);
    try {
      await fetch("https://formsubmit.co/ajax/devinedwinsiahaan171105@gmail.com", {
        method: "POST", headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ _subject: `MEGAH FEEDBACK: ${appFeedbackForm.category}`, Operative: user.username, Message: appFeedbackForm.message })
      });
      alert(`Transmission successful.`); setAppFeedbackModal(false); setAppFeedbackForm({ category: 'AI ENHANCEMENT', message: '' });
    } catch (e) { alert("Error."); } 
    finally { setIsSendingFeedback(false); }
  };

  const filteredReports = useMemo(() => {
    let result = reports;
    if (activeClass !== "ALL CLASSES") result = result.filter(r => r.class_name === activeClass);
    if (searchQuery) result = result.filter(r => String(r.username || "").toLowerCase().includes(searchQuery.toLowerCase()));
    return result;
  }, [reports, activeClass, searchQuery]);

  const participationStats = useMemo(() => {
    const total = filteredReports.length;
    const active = filteredReports.filter(r => r.testCount > 0).length;
    return { total, active, percentage: total === 0 ? 0 : Math.round((active / total) * 100) };
  }, [filteredReports]);

  const readinessDistribution = useMemo(() => {
    let r=0, c=0, d=0;
    filteredReports.forEach(x => { if(x.testCount === 0) return; if(x.avgScore >= 80) r++; else if(x.avgScore >= 50) c++; else d++; });
    if(r===0 && c===0 && d===0) return[{ name: 'VOID', value: 1, color: '#1e293b' }];
    return[{ name: 'READY', value: r, color: '#10b981' }, { name: 'CAUTION', value: c, color: '#eab308' }, { name: 'DANGER', value: d, color: '#ef4444' }].filter(x => x.value > 0);
  }, [filteredReports]);

  const domainAverages = useMemo(() => {
    let s=0, m=0, p=0, sc=0, mc=0, pc=0;
    filteredReports.forEach(r => { if(r.scores.social) {s+=r.scores.social; sc++} if(r.scores.malware) {m+=r.scores.malware; mc++} if(r.scores.phish) {p+=r.scores.phish; pc++} });
    return [{ domain: 'SOC', score: sc?Math.round(s/sc):0, color: '#d946ef' }, { domain: 'MAL', score: mc?Math.round(m/mc):0, color: '#ef4444' }, { domain: 'PHI', score: pc?Math.round(p/pc):0, color: '#3b82f6' }];
  }, [filteredReports]);

  const dynamicClasses = useMemo(() => ["ALL CLASSES", ...Array.from(new Set(reports.map(r => r.class_name))).sort()], [reports]);

  // Total Audit Calculator
  const totalAudits = useMemo(() => reports.reduce((acc, curr) => acc + curr.testCount, 0), [reports]);

  return (
    <div className="flex h-screen w-full bg-[#020108] text-slate-200 overflow-hidden font-sans text-xs selection:bg-fuchsia-500/30">
      <CosmicEngine bgIdx={bgIdx} />
      <ParticleBurstClickEffect />

      {/* --- SIDEBAR --- */}
      <motion.aside animate={{ width: isSidebarCollapsed ? 70 : 220 }} className="h-screen bg-[#05050A]/80 backdrop-blur-3xl border-r border-white/10 flex flex-col z-[100] shadow-[15px_0_40px_rgba(0,0,0,0.8)] transition-all duration-500">
        <div className="h-16 px-5 flex items-center justify-between border-b border-white/5">
          {!isSidebarCollapsed && <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]"><ShieldCheck size={14} className="text-white" /></div><span className="font-black text-white uppercase text-[8px] tracking-widest">CENTRAL COMMS</span></div>}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-1.5 bg-white/5 hover:bg-fuchsia-500/20 text-slate-400 hover:text-fuchsia-400 rounded-md mx-auto transition-all">
             {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>
        <nav className="flex-1 px-3 py-6 space-y-3">
          <button onClick={() => setView('dashboard')} className={`w-full flex items-center p-3 rounded-xl transition-all gap-3 ${view === 'dashboard' ? 'bg-fuchsia-600/10 text-fuchsia-400 border border-fuchsia-500/20 shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}><Activity size={16} />{!isSidebarCollapsed && <span className="font-black text-[9px] tracking-widest uppercase">TACTICAL VIEW</span>}</button>
          <button onClick={() => setAppFeedbackModal(true)} className="w-full flex items-center p-3 rounded-xl text-slate-500 hover:text-fuchsia-400 hover:bg-fuchsia-600/10 transition-all gap-3 group"><Lightbulb size={16} className="group-hover:animate-pulse" />{!isSidebarCollapsed && <span className="font-black text-[9px] tracking-widest uppercase">FEEDBACK</span>}</button>
        </nav>
        <div className="p-4 border-t border-white/5"><button onClick={() => { localStorage.removeItem('user'); router.push('/'); }} className="w-full flex items-center justify-center p-2.5 bg-red-950/20 text-red-500 border border-red-500/20 rounded-xl gap-2 font-black text-[9px] tracking-[0.2em] uppercase hover:bg-red-600 hover:text-white transition-all"><LogOut size={14} /> {!isSidebarCollapsed && "SHUTDOWN"}</button></div>
      </motion.aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-16 flex items-center justify-between px-6 lg:px-8 border-b border-white/5 bg-black/40 backdrop-blur-xl">
            <div className="flex items-center gap-2.5 px-4 py-1.5 bg-white/5 border border-white/10 rounded-lg shadow-inner"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_#34d399]" /><span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">NETWORK: SECURE CLOUD</span></div>
            
            {/* INSTRUCTOR DOSSIER CLICKABLE AREA */}
            <button onClick={() => setProfileModal(true)} className="flex items-center gap-4 text-left group hover:opacity-80 transition-all">
                <div className="text-right hidden sm:block">
                  <p className="text-[11px] font-black text-white tracking-widest uppercase group-hover:text-fuchsia-400 transition-colors">{user.username}</p>
                  <p className="text-[8px] font-bold text-fuchsia-400 uppercase tracking-[0.3em] mt-0.5 flex items-center justify-end gap-1.5"><Radio size={10} className="animate-pulse"/> INSTRUCTOR NODE</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(217,70,239,0.3)] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(217,70,239,0.6)] transition-all">
                  <User size={18} />
                </div>
            </button>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar px-8 lg:px-10 py-8" ref={scrollRef}>
          <AnimatePresence mode="wait">
            {view === 'dashboard' && (
              <motion.div key="analytics" {...(portalTransition as any)} className="max-w-[1350px] w-full mx-auto space-y-8 pb-24">
                
                {/* HEADER */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
                  <div className="space-y-2"><div className="text-fuchsia-400 font-black text-[10px] tracking-[0.4em] uppercase flex items-center gap-2"><Globe size={14} className="animate-spin-slow" /> PLANETARY MONITORING ACTIVE</div><h1 className="text-3xl lg:text-4xl font-black text-white tracking-tighter uppercase leading-tight">{getGreeting()}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-500 to-indigo-400">{user.username}</span>.</h1><p className="text-slate-400 font-medium text-[11px] tracking-wide max-w-xl">Accessing encrypted dossiers and fleet readiness metrics from the secure network.</p></div>
                  <button onClick={fetchData} className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-full font-black text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all flex items-center gap-3 uppercase"><RefreshCcw size={14} className={loading ? "animate-spin text-fuchsia-400" : ""}/> REFRESH DATASET</button>
                </div>

                {/* BENTO STATS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-[minmax(160px,auto)]">
                   <motion.div whileHover={{ y: -4 }} className="lg:col-span-4 lg:row-span-2 bg-[#0a0a0f]/80 border border-white/10 rounded-[2.5rem] p-8 shadow-xl flex flex-col justify-between backdrop-blur-3xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-600/10 blur-[80px]" />
                      <p className="text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase mb-6 flex items-center gap-2"><Target size={14} className="text-fuchsia-400"/> PARTICIPATION</p>
                      <div className="space-y-2"><p className="text-5xl font-black text-white tracking-tighter">{participationStats.percentage}%</p><p className="text-[9px] font-black text-fuchsia-400 tracking-[0.2em] uppercase">SYSTEM UPTIME REACHED</p></div>
                      <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10 mt-8"><motion.div initial={{ width: 0 }} animate={{ width: `${participationStats.percentage}%` }} transition={{ duration: 1.8 }} className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-[0_0_15px_#d946ef]" /></div>
                   </motion.div>

                   <motion.div whileHover={{ y: -4 }} className="lg:col-span-4 lg:row-span-2 bg-[#0a0a0f]/80 border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center shadow-xl backdrop-blur-2xl relative overflow-hidden group">
                      <p className="text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase mb-6 w-full text-left flex items-center gap-2"><ShieldAlert size={14} className="text-indigo-400"/> FLEET STATUS</p>
                      <div className="relative w-full h-[160px]"><ResponsiveContainer><PieChart><Pie data={readinessDistribution} innerRadius={60} outerRadius={75} dataKey="value" stroke="none" paddingAngle={8}>{readinessDistribution.map((e, i) => (<Cell key={i} fill={e.color} style={{filter:`drop-shadow(0 0 10px ${e.color}50)`}} />))}</Pie></PieChart></ResponsiveContainer><div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-4xl font-black text-white">{participationStats.active}</span><span className="text-[8px] font-black text-slate-500 tracking-widest uppercase mt-1">ACTIVE</span></div></div>
                      <div className="flex gap-4 mt-6">{readinessDistribution.map((item, idx) => (<div key={idx} className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color, boxShadow:`0 0 8px ${item.color}` }} /><span className="text-[9px] font-black text-slate-300 uppercase">{item.name}</span></div>))}</div>
                   </motion.div>

                   <motion.div whileHover={{ y: -4 }} className="lg:col-span-4 lg:row-span-2 bg-[#0a0a0f]/80 border border-white/10 rounded-[2.5rem] p-8 shadow-xl h-[280px] backdrop-blur-2xl relative overflow-hidden group">
                      <p className="text-[10px] font-black text-slate-500 tracking-[0.3em] uppercase mb-6 flex items-center gap-2"><Cpu size={14} className="text-blue-400"/> DOMAIN MASTERY</p>
                      <ResponsiveContainer>
                        <BarChart data={domainAverages} margin={{ left: -35 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                          <XAxis dataKey="domain" tick={{ fontSize: 9, fontWeight: '900', fill: '#94a3b8' }} axisLine={false} tickLine={false}/>
                          <YAxis tick={{ fontSize: 9, fill: '#475569' }} domain={[0, 100]} axisLine={false} tickLine={false}/>
                          
                          {/* FITUR TOOLTIP UNTUK MUNCUL SAAT DIHOVER */}
                          <Tooltip 
                            cursor={{ fill: 'rgba(217,70,239,0.1)' }}
                            contentStyle={{ 
                              backgroundColor: 'rgba(0,0,0,0.8)', 
                              border: '1px solid rgba(255,255,255,0.1)', 
                              borderRadius: '16px', 
                              backdropFilter: 'blur(10px)',
                              color: '#fff',
                              fontWeight: '900',
                              fontSize: '11px',
                              textTransform: 'uppercase',
                              boxShadow: '0 0 20px rgba(0,0,0,0.8)'
                            }}
                            itemStyle={{ color: '#d946ef', fontWeight: '900' }}
                          />

                          <Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={35}>
                            {domainAverages.map((e, i) => (<Cell key={i} fill={`url(#barGradient-${i})`} />))}
                            <defs>
                              {domainAverages.map((e, i) => (
                                <linearGradient id={`barGradient-${i}`} key={i} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor={e.color} />
                                  <stop offset="100%" stopColor={e.color} stopOpacity={0.1} />
                                </linearGradient>
                              ))}
                            </defs>
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                   </motion.div>
                </div>

                {/* ROSTER DATA */}
                <div className="mt-16 space-y-8 pb-20">
                   <div className="flex flex-col xl:flex-row justify-between items-end gap-6">
                      <div className="space-y-2"><h2 className="text-3xl font-black text-white tracking-tighter uppercase flex items-center gap-4">OPERATIVE DOSSIERS <Database className="text-fuchsia-500" size={24} /></h2><p className="text-slate-500 font-black text-[10px] tracking-[0.3em] uppercase">ACCESSING SECURE PERSONNEL RECORD LOGS</p></div>
                      <div className="flex gap-4 w-full xl:w-auto">
                         <div className="relative flex-1 xl:w-[350px] group"><Search size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-fuchsia-500 transition-all" /><input type="text" placeholder="IDENTITY HASH..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-black/80 border border-white/10 rounded-full py-4 pl-14 pr-6 text-[11px] font-black text-white outline-none focus:border-fuchsia-500 transition-all placeholder:text-slate-800" /></div>
                         <select value={activeClass} onChange={(e) => setActiveClass(e.target.value)} className="bg-black/80 border border-white/10 rounded-full px-8 text-[10px] font-black text-white outline-none cursor-pointer uppercase hover:border-fuchsia-500 transition-all">{dynamicClasses.map(c => <option key={c} value={c} className="bg-black">{c}</option>)}</select>
                      </div>
                   </div>

                   <div className="flex flex-col gap-5">
                      <AnimatePresence>
                         {filteredReports.map((r, idx) => {
                            const status = getScoreData(r.avgScore);
                            return (
                               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }} key={idx} className="flex items-center justify-between bg-[#07070B]/60 backdrop-blur-[50px] p-6 lg:p-7 rounded-[2.5rem] border border-white/5 hover:border-fuchsia-500/20 transition-all group shadow-2xl relative overflow-hidden">
                                  <div className="absolute left-0 top-0 w-2 h-full opacity-30 shadow-[0_0_20px_currentColor]" style={{ backgroundColor: status.color, color: status.color }} />
                                  
                                  <div className="flex items-center gap-6 relative z-10">
                                     <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center relative shadow-xl group-hover:scale-105 transition-all">
                                        <User size={24} className="text-slate-600 group-hover:text-white transition-all" />
                                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-[2.5px] border-[#07070B] ${status.bg} shadow-[0_0_12px_currentColor] animate-pulse`} style={{ color: status.color }} />
                                     </div>
                                     <div>
                                        <p className="font-black text-xl text-white tracking-tighter uppercase group-hover:text-fuchsia-400 transition-all">{r.username}</p>
                                        <p className="text-[10px] text-slate-500 font-black tracking-[0.3em] uppercase mt-1 flex items-center gap-2"><Terminal size={12}/> {r.class_name}</p>
                                     </div>
                                  </div>

                                  <div className="flex items-center gap-10 relative z-10">
                                     <div className="hidden lg:grid grid-cols-3 gap-8 text-center">
                                        <div className="group/score"><p className="text-[9px] font-black text-slate-600 uppercase mb-1">SOC</p><p className="text-xl font-black text-fuchsia-400">{r.scores.social ?? '--'}</p></div>
                                        <div className="group/score"><p className="text-[9px] font-black text-slate-600 uppercase mb-1">MAL</p><p className="text-xl font-black text-red-500">{r.scores.malware ?? '--'}</p></div>
                                        <div className="group/score"><p className="text-[9px] font-black text-slate-600 uppercase mb-1">PHI</p><p className="text-xl font-black text-blue-500">{r.scores.phish ?? '--'}</p></div>
                                     </div>
                                     
                                     <div className="flex items-center justify-center w-14 h-14 rounded-full border-[3px] border-white/5 relative ml-2 transform group-hover:scale-110 transition-all">
                                        <svg className="w-full h-full absolute -rotate-90">
                                           <circle cx="50%" cy="50%" r="42%" stroke={status.color} strokeWidth="4" fill="transparent" strokeDasharray={`${r.avgScore * 2.6} 1000`} className="opacity-80" />
                                        </svg>
                                        <span className={`text-base font-black ${status.text}`}>{r.avgScore}</span>
                                     </div>
                                     
                                     <button onClick={() => { setFeedbackModal(r); setExpandedLog(null); }} className="px-8 py-3.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white text-slate-300 hover:text-black font-black text-[10px] tracking-[0.3em] uppercase transition-all flex items-center gap-3 group/btn shadow-md"><Eye size={16} className="group-hover/btn:animate-pulse" /> VIEW DOSSIER</button>
                                  </div>
                               </motion.div>
                            )
                         })}
                      </AnimatePresence>
                      {filteredReports.length === 0 && (
                         <div className="p-24 text-center border-[3px] border-dashed border-white/5 rounded-[3rem] bg-black/50 backdrop-blur-3xl"><Info size={48} className="mx-auto text-slate-800 mb-6 animate-pulse" /><h3 className="text-2xl font-black text-white uppercase tracking-tighter">DATABASE STATUS: VOID</h3><p className="text-slate-600 font-black uppercase text-[11px] tracking-[0.3em] mt-3">NO COMPATIBLE OPERATIVE DATA DETECTED IN THIS SECTOR.</p></div>
                      )}
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* --- PROFILE MODAL (INSTRUCTOR DOSSIER - CLEANED) --- */}
      <AnimatePresence>
        {profileModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }} className="relative w-full max-w-2xl bg-[#0a0a0f]/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 shadow-2xl flex flex-col overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 via-fuchsia-500 to-indigo-500" />
               
               <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[1.2rem] flex items-center justify-center text-white shadow-[0_0_30px_rgba(217,70,239,0.4)] border border-white/10"><User size={32} /></div>
                     <div>
                       <p className="text-[10px] font-black text-fuchsia-400 tracking-[0.4em] uppercase mb-1">INSTRUCTOR DOSSIER</p>
                       <h2 className="text-3xl font-black text-white tracking-tighter uppercase">{user.username}</h2>
                       <p className="text-[10px] font-black text-slate-400 uppercase mt-1 tracking-[0.2em]">ROLE: SYSTEM INSTRUCTOR</p>
                     </div>
                  </div>
                  <button onClick={() => setProfileModal(false)} className="p-3 bg-white/5 rounded-full text-slate-500 hover:bg-white/10 transition-all border border-white/5"><X size={18} /></button>
               </div>

               <div className="grid grid-cols-2 gap-5 relative z-10">
                  <div className="bg-black/40 border border-white/5 p-6 rounded-3xl shadow-inner">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">SUPERVISED FLEET</p>
                    <p className="text-4xl font-black text-white">{reports.length} <span className="text-sm text-slate-500 tracking-widest">CADETS</span></p>
                  </div>
                  <div className="bg-black/40 border border-white/5 p-6 rounded-3xl shadow-inner">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">PROCESSED AUDITS</p>
                    <p className="text-4xl font-black text-fuchsia-400">{totalAudits} <span className="text-sm text-slate-500 tracking-widest">LOGS</span></p>
                  </div>
               </div>

               <div className="mt-8 relative z-10">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-3"><Globe size={14}/> ASSIGNED SECTORS</p>
                 <div className="flex flex-wrap gap-3">
                   {AVAILABLE_CLASSES.map(cls => (
                     <span key={cls} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-slate-300 tracking-widest uppercase shadow-md">{cls}</span>
                   ))}
                 </div>
               </div>
               
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- APP FEEDBACK MODAL --- */}
      <AnimatePresence>
        {appFeedbackModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
             <div className="absolute w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[140px] -z-10 animate-pulse" />
             <motion.div initial={{ scale: 0.9, y: 40, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }} transition={{ type: 'spring', damping: 25 }} className="w-full max-w-2xl bg-[#0a0a0f]/80 border border-white/10 rounded-[3rem] p-10 shadow-[0_0_80px_rgba(217,70,239,0.2)] relative overflow-hidden backdrop-blur-3xl">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600" />
                <div className="flex justify-between items-start mb-12 relative z-10">
                   <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-[0_0_30px_rgba(217,70,239,0.5)] border border-white/10"><Zap size={28} className="fill-current" /></div>
                      <div><h2 className="text-3xl font-black text-white uppercase tracking-tighter">PREMIUM FEEDBACK</h2><p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.5em] mt-1">TRANSMITTING TO: devinedwinsiahaan171105@gmail.com</p></div>
                   </div>
                   <button onClick={() => setAppFeedbackModal(false)} className="p-3 bg-white/5 rounded-full text-slate-500 hover:bg-red-500/20 hover:text-red-400 border border-white/5 transition-all"><X size={18}/></button>
                </div>
                <div className="space-y-8 relative z-10">
                   <div>
                      <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-widest mb-3 flex items-center gap-3"><Hexagon size={12}/> SELECT CATEGORY</label>
                      <select value={appFeedbackForm.category} onChange={(e) => setAppFeedbackForm({...appFeedbackForm, category: e.target.value})} className="w-full bg-black/70 border border-white/10 rounded-[1.5rem] p-4 text-[11px] font-black text-white uppercase outline-none focus:border-fuchsia-500 transition-all appearance-none cursor-pointer">
                        <option value="AI ENHANCEMENT">🤖 AI SYSTEM ENHANCEMENT</option>
                        <option value="UI/UX MODERNIZATION">🎨 UI / UX MODERNIZATION</option>
                        <option value="SECURITY EXPANSION">🛡️ NEW SECURITY DOMAINS</option>
                        <option value="REAL-TIME ANALYTICS">📊 ADVANCED ANALYTICS</option>
                        <option value="SYSTEM PERFORMANCE">⚡ PERFORMANCE OPTIMIZATION</option>
                        <option value="MOBILE INTEGRATION">📱 MOBILE APP SUGGESTION</option>
                        <option value="BUG REPORT">⚠️ CRITICAL BUG / ERROR</option>
                        <option value="OTHER">🌐 OTHER / MISCELLANEOUS</option>
                      </select>
                   </div>
                   <div>
                      <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-widest mb-3 flex items-center gap-3"><Terminal size={12}/> TRANSMISSION DATA</label>
                      <textarea value={appFeedbackForm.message} onChange={(e) => setAppFeedbackForm({...appFeedbackForm, message: e.target.value})} placeholder="INPUT RECOMMENDATIONS..." className="w-full h-44 bg-black/70 border border-white/10 rounded-[2rem] p-6 text-[12px] font-bold text-white focus:border-fuchsia-500 outline-none resize-none placeholder:text-slate-800 transition-all" />
                   </div>
                   <button onClick={submitAppFeedback} disabled={isSendingFeedback} className="w-full py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-[1.8rem] font-black text-[11px] tracking-[0.5em] uppercase hover:scale-[1.02] transition-all flex items-center justify-center gap-6 shadow-2xl disabled:opacity-50">{isSendingFeedback ? "TRANSMITTING DATA..." : "EXECUTE TRANSMISSION"} <Send size={18}/></button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DOSSIER MODAL (STUDENT DOSSIER) --- */}
      <AnimatePresence>
        {feedbackModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }} className="relative w-full max-w-3xl bg-[#0a0a0f]/90 border border-white/10 rounded-[3rem] p-10 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden backdrop-blur-3xl">
               <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-fuchsia-400 via-violet-500 to-blue-500" />
               <div className="flex justify-between items-start mb-8 shrink-0 relative z-10">
                  <div className="flex items-center gap-6">
                     <div className="w-14 h-14 bg-gradient-to-br from-fuchsia-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl border border-white/10"><User size={28} /></div>
                     <div><p className="text-[10px] font-black text-fuchsia-400 tracking-[0.4em] uppercase mb-1">PERSONNEL DOSSIER ACCESS</p><h2 className="text-3xl font-black text-white tracking-tighter uppercase">{feedbackModal.username}</h2><p className="text-[10px] font-black text-slate-400 uppercase mt-1 tracking-[0.2em]">{feedbackModal.class_name} • {feedbackModal.testCount} SESSIONS</p></div>
                  </div>
                  <button onClick={() => { setFeedbackModal(null); setExpandedLog(null); }} className="p-3 bg-white/5 rounded-full text-slate-500 hover:bg-white/10 transition-all border border-white/5"><X size={18} /></button>
               </div>
               
               <div className="flex-1 overflow-y-auto pr-3 custom-scrollbar relative z-10 space-y-6">
                  {/* Top Scores */}
                  <div className="grid grid-cols-3 gap-5">
                    {Object.entries(feedbackModal.scores).map(([k, v]: any, idx) => {
                       const st = getScoreData(v);
                       return (
                          <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center shadow-inner relative overflow-hidden">
                             <div className={`absolute bottom-0 left-0 h-1.5 transition-all duration-1000 ${st.bg}`} style={{ width: `${v || 0}%` }} />
                             <p className="text-[10px] text-slate-400 font-black uppercase mb-2 tracking-[0.3em]">{k}</p>
                             <p className={`text-4xl font-black ${st.text}`} style={{textShadow:`0 0 15px ${st.color}50`}}>{v !== null ? v : '--'}</p>
                          </div>
                       )
                    })}
                  </div>

                  {/* Detailed Historical Logs (Expandable) */}
                  <div className="space-y-4 pt-4">
                    <h3 className="text-[11px] font-black text-slate-400 flex items-center gap-3 uppercase tracking-[0.3em]"><Database size={16} className="text-indigo-400"/> HISTORICAL AUDIT LOGS</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {feedbackModal.history.map((log: any, i: number) => {
                          const st = getScoreData(log.parsedScore);
                          const isExpanded = expandedLog === i;
                          const detailsArray = log.details || [];
                          const totalQs = detailsArray.length;
                          const correctQs = detailsArray.filter((d:any) => d.is_correct).length;
                          const wrongQs = totalQs - correctQs;

                          return (
                            <div key={i} className={`flex flex-col p-5 bg-black/40 border transition-all rounded-3xl ${isExpanded ? 'border-white/20 shadow-lg bg-black/60' : 'border-white/5 hover:border-white/10'}`}>
                              {/* Header Session List */}
                              <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedLog(isExpanded ? null : i)}>
                                <div className="flex items-center gap-5">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono text-[11px] font-black border transition-all ${isExpanded ? 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30' : 'bg-white/5 text-slate-500 border-white/10'}`}>0{i+1}</div>
                                    <div className="flex flex-col">
                                        <p className="text-[12px] font-black text-white uppercase tracking-wider">{log.parsedDomain}</p>
                                        <p className="text-[10px] text-slate-500 uppercase mt-1 tracking-widest flex items-center gap-2">SCORE: <span className={`font-black ${st.text}`}>{log.parsedScore}</span></p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5">
                                    {totalQs > 0 && (
                                        <div className="hidden sm:flex items-center gap-4 px-4 py-2 bg-black/60 rounded-full border border-white/5 text-[10px] font-black tracking-widest uppercase">
                                            <span className="text-emerald-400">{correctQs} BENAR</span>
                                            <span className="text-red-400">{wrongQs} SALAH</span>
                                        </div>
                                    )}
                                    <button onClick={(e) => { e.stopPropagation(); handleDeleteLog(log.dbId); }} className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={16} /></button>
                                    <div className={`text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}><ChevronDown size={20} /></div>
                                </div>
                              </div>

                              {/* Expanded Details Content */}
                              <AnimatePresence>
                                {isExpanded && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                        <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
                                            {totalQs === 0 ? (
                                                <p className="text-[11px] text-center text-slate-500 uppercase tracking-widest py-6">NO DETAILED DATA RECORDED FOR THIS SESSION.</p>
                                            ) : (
                                                detailsArray.map((d: any, j: number) => (
                                                    <div key={j} className={`p-5 rounded-2xl border flex gap-5 ${d.is_correct ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
                                                        <div className="mt-0.5">
                                                            {d.is_correct ? <CheckCircle2 size={20} className="text-emerald-500"/> : <XCircle size={20} className="text-red-500"/>}
                                                        </div>
                                                        <div className="flex-1 space-y-3">
                                                            <p className="text-[12px] font-medium text-slate-200 leading-relaxed">"{d.question}"</p>
                                                            <div className="bg-black/50 p-3.5 rounded-xl border border-white/5 inline-block">
                                                                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1.5">PERSONNEL RESPONSE:</p>
                                                                <p className={`text-[11px] font-black uppercase tracking-wider ${d.is_correct ? 'text-emerald-400' : 'text-red-400'}`}>{d.answer || "N/A"}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )
                      })}
                    </div>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 25s linear infinite; }
        ::-webkit-scrollbar { width: 0px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(217, 70, 239, 0.3); border-radius: 20px; }
        .bg-grid-hologram { background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 50px 50px; }
        ::selection { background: #d946ef; color: white; }
        input, select, textarea { caret-color: #d946ef; }
        option { background-color: #05050A; color: white; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.5; cursor: pointer; }
      `}} />
    </div>
  );
}