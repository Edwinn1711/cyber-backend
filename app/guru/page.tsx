"use client"
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, LogOut, ShieldAlert, Activity, 
  RefreshCcw, Search, LayoutDashboard, 
  Brain, Bug, MailWarning, 
  MessageSquare, Send, X, Hexagon, Sparkles, GraduationCap, Terminal,
  ChevronLeft, ChevronRight, Trash2, Database, Radar, Target, Lightbulb, User, Eye, Info, Zap, Globe, Cpu, Radio, ShieldCheck
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid,
  PieChart, Pie
} from 'recharts'

// --- ASSET GALAXY HD ---
const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

// --- 1. CLICK EFFECT (HOLOGRAPHIC BURST) ---
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

// --- 2. ADVANCED BACKGROUND ENGINE ---
const CosmicEngine = React.memo(({ bgIdx }: { bgIdx: number }) => {
  const [stars, setStars] = useState<any[]>([]);
  useEffect(() => {
    setStars([...Array(70)].map((_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 2 + 0.5, duration: Math.random() * 4 + 2 })));
  }, []);
  return (
    <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden bg-[#020108]">
      {/* Dynamic Lighting Overlays */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vh] bg-fuchsia-600/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vh] bg-indigo-600/10 blur-[120px] rounded-full" />
      
      <div className="absolute inset-0 bg-grid-hologram opacity-[0.05]" />
      
      <AnimatePresence mode="wait">
        <motion.img key={bgIdx} src={CYBER_ASSETS[bgIdx]} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 0.25, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 6, ease: "easeInOut" }} className="absolute inset-0 w-full h-full object-cover mix-blend-lighten" />
      </AnimatePresence>
      
      {stars.map((s) => (
        <motion.div key={s.id} animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 1.5, 1] }} transition={{ duration: s.duration, repeat: Infinity }} className="absolute bg-white rounded-full shadow-[0_0_8px_white]" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020108]" />
    </div>
  );
});
CosmicEngine.displayName = 'CosmicEngine';

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
  const [view, setView] = useState<'dashboard'>('dashboard'); 
  const [reports, setReports] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [bgIdx, setBgIdx] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, setUser] = useState({ username: 'INSTRUCTOR' });
  const [activeClass, setActiveClass] = useState("ALL CLASSES"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [feedbackModal, setFeedbackModal] = useState<any>(null); 
  const [feedbackText, setFeedbackText] = useState("");
  const [appFeedbackModal, setAppFeedbackModal] = useState(false);
  const [appFeedbackForm, setAppFeedbackForm] = useState({ category: 'AI ENHANCEMENT', message: '' });
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "GOOD MORNING";
    if (hour < 18) return "GOOD AFTERNOON";
    return "GOOD EVENING";
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://cyber-backend-delta.vercel.app/guru/reports');
      const dataArray = await res.json();
      if (Array.isArray(dataArray) && dataArray.length > 0) {
        const studentMap: Record<string, any> = {};
        dataArray.forEach((item: any, i: number) => {
          const uname = item.username || `STUDENT_${i}`;
          const className = item.class_name ? String(item.class_name).toUpperCase() : "UNASSIGNED";
          const score = Number(item.score) || 0;
          const dom = String(item.domain_id || '').toLowerCase();
          if (!studentMap[uname]) { studentMap[uname] = { username: uname, class_name: className, scores: { social: null, malware: null, phish: null }, attempts: { social: 0, malware: 0, phish: 0 }, totalScore: 0, testCount: 0, history:[] }; }
          let pD = "UNKNOWN";
          if (dom.includes('soc')) pD = "SOCIAL ENGINEERING";
          else if (dom.includes('mal')) pD = "MALWARE ANALYSIS";
          else if (dom.includes('phis')) pD = "PHISHING DEFENSE";
          studentMap[uname].history.push({ ...item, dbId: item.id, parsedDomain: pD, parsedScore: score });
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
    const interval = setInterval(() => setBgIdx(p => (p + 1) % CYBER_ASSETS.length), 8000);
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
      const response = await fetch("https://formsubmit.co/ajax/devinedwinsiahaan171105@gmail.com", {
        method: "POST", headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ _subject: `MEGAH FEEDBACK: ${appFeedbackForm.category}`, Operative: user.username, Message: appFeedbackForm.message })
      });
      if (response.ok) { alert(`Transmission successful.`); setAppFeedbackModal(false); setAppFeedbackForm({ category: 'AI ENHANCEMENT', message: '' }); } 
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

  return (
    <div className="flex h-screen w-full bg-[#020108] text-slate-200 overflow-hidden font-sans selection:bg-fuchsia-500/30">
      <CosmicEngine bgIdx={bgIdx} />
      <ParticleBurstClickEffect />

      {/* --- SIDEBAR (TACTICAL GLASS) --- */}
      <motion.aside animate={{ width: isSidebarCollapsed ? 80 : 260 }} className="h-screen bg-[#05050A]/70 backdrop-blur-3xl border-r border-white/10 flex flex-col z-[100] shadow-[15px_0_40px_rgba(0,0,0,0.8)] transition-all duration-500">
        <div className="h-24 px-6 flex items-center justify-between border-b border-white/5">
          {!isSidebarCollapsed && <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.4)] border border-white/10"><ShieldCheck size={20} className="text-white" /></div><span className="font-black text-white uppercase text-[11px] tracking-widest">CENTRAL COMMS</span></div>}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2.5 bg-white/5 hover:bg-fuchsia-500/20 text-slate-400 hover:text-fuchsia-400 rounded-xl mx-auto border border-white/5 transition-all">
             {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        <nav className="flex-1 px-4 py-10 space-y-5">
          <button onClick={() => setView('dashboard')} className={`w-full flex items-center p-4 rounded-2xl transition-all gap-4 ${view === 'dashboard' ? 'bg-fuchsia-600/10 text-fuchsia-400 border border-fuchsia-500/20 shadow-[0_0_15px_rgba(217,70,239,0.2)]' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}><Activity size={22} />{!isSidebarCollapsed && <span className="font-black text-[10px] tracking-widest uppercase">TACTICAL VIEW</span>}</button>
          <button onClick={() => setAppFeedbackModal(true)} className="w-full flex items-center p-4 rounded-2xl text-slate-500 hover:text-fuchsia-400 hover:bg-fuchsia-600/10 transition-all gap-4 group"><Lightbulb size={22} className="group-hover:animate-pulse" />{!isSidebarCollapsed && <span className="font-black text-[10px] tracking-widest uppercase">FEEDBACK</span>}</button>
        </nav>
        <div className="p-6 border-t border-white/5"><button onClick={() => { localStorage.removeItem('user'); router.push('/'); }} className="w-full flex items-center justify-center p-4 bg-red-950/20 text-red-500 border border-red-500/20 rounded-2xl gap-3 font-black text-[10px] tracking-[0.3em] uppercase hover:bg-red-600 hover:text-white transition-all"><LogOut size={18} /> {!isSidebarCollapsed && "SHUTDOWN"}</button></div>
      </motion.aside>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-24 flex items-center justify-between px-10 border-b border-white/5 bg-black/40 backdrop-blur-xl">
            <div className="flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl shadow-inner"><div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_15px_#34d399]" /><span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">CONNECTION: SECURE CLOUD GATEWAY</span></div>
            <div className="flex items-center gap-6"><div className="text-right hidden sm:block"><p className="text-[12px] font-black text-white tracking-widest uppercase">{user.username}</p><p className="text-[9px] font-bold text-fuchsia-400 uppercase tracking-[0.3em] mt-1 flex items-center justify-end gap-2"><Radio size={10} className="animate-pulse"/> INSTRUCTOR NODE</p></div><div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_20px_rgba(217,70,239,0.3)]"><User size={22} /></div></div>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar px-10 lg:px-14 py-10" ref={scrollRef}>
          <AnimatePresence mode="wait">
            {view === 'dashboard' && (
              <motion.div key="analytics" {...(portalTransition as any)} className="max-w-[1400px] w-full mx-auto space-y-10 pb-20">
                
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
                  <div className="space-y-4"><div className="text-fuchsia-400 font-black text-[12px] tracking-[0.5em] uppercase flex items-center gap-4"><Globe size={18} className="animate-spin-slow" /> PLANETARY MONITORING ACTIVE</div><h1 className="text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-tight">{getGreeting()}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-500 to-indigo-400">{user.username}</span>.</h1><p className="text-slate-500 font-medium text-[13px] tracking-wide max-w-2xl">Accessing encrypted dossiers and fleet readiness metrics from the secure distributed cloud network.</p></div>
                  <button onClick={fetchData} className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-black text-[11px] tracking-[0.3em] hover:bg-white hover:text-black transition-all flex items-center gap-4 uppercase shadow-[0_0_30px_rgba(255,255,255,0.05)]"><RefreshCcw size={16} className={loading ? "animate-spin text-fuchsia-400" : ""}/> REFRESH DATASET</button>
                </div>

                {/* BENTO STATS (PREMIUM GLOW) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 auto-rows-[minmax(200px,auto)]">
                   <motion.div whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(217,70,239,0.1)" }} className="lg:col-span-4 lg:row-span-2 bg-[#0a0a0f]/80 border border-white/10 rounded-[3rem] p-10 shadow-2xl flex flex-col justify-between backdrop-blur-3xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-600/10 blur-[80px]" />
                      <p className="text-[11px] font-black text-slate-500 tracking-[0.4em] uppercase mb-8 flex items-center gap-3"><Target size={16} className="text-fuchsia-400"/> PARTICIPATION</p>
                      <div className="space-y-2"><p className="text-7xl font-black text-white tracking-tighter">{participationStats.percentage}%</p><p className="text-[10px] font-black text-fuchsia-400 tracking-[0.3em] uppercase">SYSTEM UPTIME REACHED</p></div>
                      <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-white/10 mt-12"><motion.div initial={{ width: 0 }} animate={{ width: `${participationStats.percentage}%` }} transition={{ duration: 2 }} className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-[0_0_20px_#d946ef]" /></div>
                   </motion.div>

                   <motion.div whileHover={{ y: -6 }} className="lg:col-span-4 lg:row-span-2 bg-[#0a0a0f]/80 border border-white/10 rounded-[3rem] p-10 flex flex-col items-center shadow-2xl backdrop-blur-3xl relative overflow-hidden group">
                      <p className="text-[11px] font-black text-slate-500 tracking-[0.4em] uppercase mb-8 w-full text-left flex items-center gap-3"><ShieldAlert size={16} className="text-indigo-400"/> FLEET STATUS</p>
                      <div className="relative w-full h-[220px]"><ResponsiveContainer><PieChart><Pie data={readinessDistribution} innerRadius={80} outerRadius={100} dataKey="value" stroke="none" paddingAngle={10}>{readinessDistribution.map((e, i) => (<Cell key={i} fill={e.color} style={{filter:`drop-shadow(0 0 10px ${e.color}60)`}} />))}</Pie></PieChart></ResponsiveContainer><div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-5xl font-black text-white">{participationStats.active}</span><span className="text-[9px] font-black text-slate-500 tracking-widest uppercase">ACTIVE</span></div></div>
                      <div className="flex gap-6 mt-8">{readinessDistribution.map((item, idx) => (<div key={idx} className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color, boxShadow:`0 0 10px ${item.color}` }} /><span className="text-[10px] font-black text-slate-300 uppercase">{item.name}</span></div>))}</div>
                   </motion.div>

                   <motion.div whileHover={{ y: -6 }} className="lg:col-span-4 lg:row-span-2 bg-[#0a0a0f]/80 border border-white/10 rounded-[3rem] p-10 shadow-2xl h-[340px] backdrop-blur-3xl relative overflow-hidden group">
                      <p className="text-[11px] font-black text-slate-500 tracking-[0.4em] uppercase mb-10 flex items-center gap-3"><Cpu size={16} className="text-blue-400"/> DOMAIN MASTERY</p>
                      <ResponsiveContainer><BarChart data={domainAverages} margin={{ left: -40 }}><CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(255,255,255,0.03)" /><XAxis dataKey="domain" tick={{ fontSize: 10, fontWeight: '900', fill: '#94a3b8' }} axisLine={false} tickLine={false}/><YAxis tick={{ fontSize: 10, fill: '#475569' }} domain={[0, 100]} axisLine={false} tickLine={false}/><Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={50}>{domainAverages.map((e, i) => (<Cell key={i} fill={`url(#barGradient-${i})`} />))}<defs>{domainAverages.map((e, i) => (<linearGradient id={`barGradient-${i}`} key={i} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={e.color} /><stop offset="100%" stopColor={e.color} stopOpacity={0.1} /></linearGradient>))}</defs></Bar></BarChart></ResponsiveContainer>
                   </motion.div>
                </div>

                {/* ROSTER DATA (TACTICAL ROW) */}
                <div className="mt-24 space-y-10 pb-40">
                   <div className="flex flex-col xl:flex-row justify-between items-end gap-10">
                      <div className="space-y-3"><h2 className="text-4xl font-black text-white tracking-tighter uppercase flex items-center gap-5">OPERATIVE DOSSIERS <Database className="text-fuchsia-500" size={28} /></h2><p className="text-slate-600 font-black text-[12px] tracking-[0.5em] uppercase">ACCESSING SECURE PERSONNEL RECORD LOGS</p></div>
                      <div className="flex gap-6 w-full xl:w-auto">
                         <div className="relative flex-1 xl:w-[400px] group"><Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-fuchsia-500 transition-all" /><input type="text" placeholder="IDENTITY HASH..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-black/90 border border-white/10 rounded-[2.5rem] py-5 pl-16 pr-8 text-[12px] font-black text-white outline-none focus:border-fuchsia-500 focus:shadow-[0_0_30px_rgba(217,70,239,0.15)] transition-all placeholder:text-slate-800 shadow-inner" /></div>
                         <select value={activeClass} onChange={(e) => setActiveClass(e.target.value)} className="bg-black/90 border border-white/10 rounded-[2.5rem] px-10 text-[11px] font-black text-white outline-none cursor-pointer uppercase hover:border-fuchsia-500 transition-all shadow-inner">{dynamicClasses.map(c => <option key={c} value={c} className="bg-black">{c}</option>)}</select>
                      </div>
                   </div>

                   <div className="flex flex-col gap-8">
                      <AnimatePresence>
                         {filteredReports.map((r, idx) => {
                            const status = getScoreData(r.avgScore);
                            return (
                               <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} key={idx} className="flex items-center justify-between bg-[#07070B]/70 backdrop-blur-[60px] p-8 rounded-[4rem] border border-white/5 hover:border-fuchsia-500/30 transition-all group shadow-2xl relative overflow-hidden">
                                  <div className="absolute left-0 top-0 w-2.5 h-full opacity-40 shadow-[0_0_20px_currentColor]" style={{ backgroundColor: status.color, color: status.color }} />
                                  
                                  <div className="flex items-center gap-12 relative z-10">
                                     <div className="w-24 h-24 rounded-[2.5rem] bg-black border border-white/10 flex items-center justify-center relative shadow-2xl group-hover:scale-105 group-hover:-rotate-3 transition-all duration-500"><User size={34} className="text-slate-600 group-hover:text-white transition-colors" /><div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full border-[4px] border-[#07070B] ${status.bg} shadow-[0_0_15px_currentColor] animate-pulse`} style={{ color: status.color }} /></div>
                                     <div><p className="font-black text-3xl text-white tracking-tighter uppercase group-hover:text-fuchsia-400 transition-all">{r.username}</p><p className="text-[12px] text-slate-500 font-black tracking-[0.4em] uppercase mt-2 flex items-center gap-3"><Terminal size={14}/> {r.class_name}</p></div>
                                  </div>

                                  <div className="flex items-center gap-16 relative z-10">
                                     <div className="hidden lg:grid grid-cols-3 gap-12">
                                        <div className="text-center group/score"><p className="text-[11px] font-black text-slate-600 uppercase mb-3 tracking-widest">SOC</p><p className="text-3xl font-black text-fuchsia-400" style={{textShadow:'0 0 15px #d946ef80'}}>{r.scores.social ?? '--'}</p></div>
                                        <div className="text-center group/score"><p className="text-[11px] font-black text-slate-600 uppercase mb-3 tracking-widest">MAL</p><p className="text-3xl font-black text-red-500" style={{textShadow:'0 0 15px #ef444480'}}>{r.scores.malware ?? '--'}</p></div>
                                        <div className="text-center group/score"><p className="text-[11px] font-black text-slate-600 uppercase mb-3 tracking-widest">PHI</p><p className="text-3xl font-black text-blue-500" style={{textShadow:'0 0 15px #3b82f680'}}>{r.scores.phish ?? '--'}</p></div>
                                     </div>
                                     <div className="flex items-center justify-center w-24 h-24 rounded-full border-[3px] border-white/5 relative ml-6 transform group-hover:scale-110 transition-all duration-700 shadow-inner"><svg className="w-full h-full absolute -rotate-90"><circle cx="50%" cy="50%" r="44%" stroke={status.color} strokeWidth="6" fill="transparent" strokeDasharray={`${r.avgScore * 2.8} 1000`} className="opacity-80" style={{transition:'stroke-dasharray 1.2s ease-out'}}/></svg><span className={`text-3xl font-black ${status.text}`} style={{textShadow:`0 0 20px ${status.color}80`}}>{r.avgScore}</span></div>
                                     <button onClick={() => setFeedbackModal(r)} className="px-12 py-5 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white text-slate-300 hover:text-black font-black text-[12px] tracking-[0.4em] uppercase transition-all flex items-center gap-4 group/btn shadow-2xl"><Eye size={20} className="group-hover/btn:animate-pulse" /> DOSSIER</button>
                                  </div>
                               </motion.div>
                            )
                         })}
                      </AnimatePresence>
                      {filteredReports.length === 0 && (
                         <div className="p-48 text-center border-[4px] border-dashed border-white/5 rounded-[5rem] bg-black/40 backdrop-blur-3xl"><Info size={80} className="mx-auto text-slate-900 mb-8 animate-pulse" /><h3 className="text-4xl font-black text-white uppercase tracking-tighter">DATABASE STATUS: VOID</h3><p className="text-slate-800 font-black uppercase text-[13px] tracking-[0.5em] mt-6">NO COMPATIBLE OPERATIVE DATA DETECTED IN THIS SECTOR.</p></div>
                      )}
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* --- MODAL SYSTEM FEEDBACK (ULTRA-LUXURY VIOLET) --- */}
      <AnimatePresence>
        {appFeedbackModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-[#020108]/96 backdrop-blur-[50px]">
             <div className="absolute w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[140px] -z-10 animate-pulse" />
             <motion.div initial={{ scale: 0.9, y: 40, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }} transition={{ type: 'spring', damping: 25 }} className="w-full max-w-2xl bg-[#0a0a0f]/80 border border-white/10 rounded-[4rem] p-12 shadow-[0_0_80px_rgba(217,70,239,0.2)] relative overflow-hidden backdrop-blur-[100px]">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600" />
                <div className="flex justify-between items-start mb-14 relative z-10">
                   <div className="flex items-center gap-7">
                      <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[1.8rem] flex items-center justify-center text-white shadow-[0_0_30px_rgba(217,70,239,0.5)] border border-white/10"><Zap size={32} className="fill-current" /></div>
                      <div><h2 className="text-4xl font-black text-white uppercase tracking-tighter">PREMIUM FEEDBACK</h2><p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] mt-2">TRANSMITTING TO: devinedwinsiahaan171105@gmail.com</p></div>
                   </div>
                   <button onClick={() => setAppFeedbackModal(false)} className="p-3 bg-white/5 rounded-full text-slate-500 hover:bg-red-500/20 hover:text-red-400 border border-white/5 transition-all"><X size={20}/></button>
                </div>
                <div className="space-y-10 relative z-10">
                   <div>
                      <label className="text-[11px] font-black text-fuchsia-400 uppercase tracking-widest mb-4 flex items-center gap-3"><Hexagon size={14}/> SELECT COMMAND CATEGORY</label>
                      <select value={appFeedbackForm.category} onChange={(e) => setAppFeedbackForm({...appFeedbackForm, category: e.target.value})} className="w-full bg-black/70 border border-white/10 rounded-[2rem] p-5 text-[12px] font-black text-white uppercase outline-none focus:border-fuchsia-500 focus:shadow-[0_0_30px_rgba(217,70,239,0.2)] transition-all appearance-none cursor-pointer">
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
                      <label className="text-[11px] font-black text-fuchsia-400 uppercase tracking-widest mb-4 flex items-center gap-3"><Terminal size={14}/> TRANSMISSION DATA</label>
                      <textarea value={appFeedbackForm.message} onChange={(e) => setAppFeedbackForm({...appFeedbackForm, message: e.target.value})} placeholder="INPUT YOUR SYSTEM RECOMMENDATIONS OR REPORT ANOMALIES HERE..." className="w-full h-48 bg-black/70 border border-white/10 rounded-[2.5rem] p-8 text-[13px] font-bold text-white focus:border-fuchsia-500 focus:shadow-[0_0_30px_rgba(217,70,239,0.15)] outline-none resize-none placeholder:text-slate-800 transition-all shadow-inner" />
                   </div>
                   <button onClick={submitAppFeedback} disabled={isSendingFeedback} className="w-full py-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-[2.2rem] font-black text-[12px] tracking-[0.6em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-6 shadow-[0_20px_50px_rgba(217,70,239,0.3)] disabled:opacity-50">{isSendingFeedback ? "TRANSMITTING DATA..." : "EXECUTE TRANSMISSION"} <Send size={20}/></button>
                </div>
                <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-600/5 rounded-full blur-[100px] -z-10" />
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {feedbackModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-[60px]">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }} className="relative w-full max-w-5xl bg-[#0a0a0f]/95 border border-white/10 rounded-[4rem] p-12 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-fuchsia-400 via-violet-500 to-blue-500" />
               <div className="flex justify-between items-start mb-10 shrink-0 relative z-10">
                  <div className="flex items-center gap-8">
                     <div className="w-20 h-20 bg-gradient-to-br from-fuchsia-600 to-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl border border-white/10"><User size={40} /></div>
                     <div><p className="text-[12px] font-black text-fuchsia-400 tracking-[0.5em] uppercase mb-2">PERSONNEL DOSSIER ACCESS</p><h2 className="text-4xl font-black text-white tracking-tighter uppercase">{feedbackModal.username}</h2><p className="text-[12px] font-black text-slate-500 uppercase mt-2 tracking-[0.2em]">{feedbackModal.class_name} • {feedbackModal.testCount} ACTIVE SESSIONS</p></div>
                  </div>
                  <button onClick={() => setFeedbackModal(null)} className="p-3 bg-white/5 rounded-full text-slate-500 hover:bg-white/10 transition-all border border-white/5"><X size={24} /></button>
               </div>
               <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar relative z-10 space-y-10">
                  <div className="grid grid-cols-3 gap-8">
                    {Object.entries(feedbackModal.scores).map(([k, v]: any, idx) => {
                       const st = getScoreData(v);
                       return (
                          <div key={idx} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center shadow-inner relative overflow-hidden group">
                             <div className={`absolute bottom-0 left-0 h-1.5 transition-all duration-1000 ${st.bg} ${st.glow}`} style={{ width: `${v || 0}%` }} />
                             <p className="text-[11px] text-slate-500 font-black uppercase mb-4 tracking-[0.3em]">{k}</p>
                             <p className={`text-6xl font-black ${st.text}`} style={{textShadow:`0 0 20px ${st.color}50`}}>{v !== null ? v : '--'}</p>
                          </div>
                       )
                    })}
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-sm font-black text-slate-400 flex items-center gap-4 uppercase tracking-[0.4em]"><Database size={20} className="text-indigo-400"/> HISTORICAL AUDIT LOGS</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {feedbackModal.history.map((log: any, i: number) => {
                          const st = getScoreData(log.parsedScore);
                          return (
                            <div key={i} className="flex items-center justify-between p-6 bg-black/40 border border-white/5 rounded-[2rem] group hover:border-white/20 transition-all">
                              <div className="flex items-center gap-8"><div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center font-mono text-[13px] font-black text-slate-500 border border-white/10">0{i+1}</div><div className="flex flex-col"><p className="text-[13px] font-black text-white uppercase tracking-wider">SESSION AUDIT {i+1}</p><p className="text-[11px] text-slate-500 uppercase mt-1 tracking-widest">{log.parsedDomain} | SCORE: <span className={`font-black ${st.text}`}>{log.parsedScore}</span></p></div></div>
                              <button onClick={() => handleDeleteLog(log.dbId)} className="p-3.5 bg-red-500/10 text-red-400 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-lg"><Trash2 size={20} /></button>
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
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
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