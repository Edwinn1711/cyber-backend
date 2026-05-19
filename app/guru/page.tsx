"use client"
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, LogOut, ShieldAlert, Activity, 
  RefreshCcw, Search, LayoutDashboard, 
  Brain, Bug, MailWarning, 
  MessageSquare, Send, X, Hexagon, Sparkles, GraduationCap, Terminal,
  ChevronLeft, ChevronRight, Trash2, Database, Radar, Target, Lightbulb, User, Eye, Info, Zap, Globe, Cpu
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
          <motion.div key={p.id} initial={{ top: p.y - p.size / 2, left: p.x - p.size / 2, scale: 0, opacity: 1 }} animate={{ top: p.y - p.size / 2 + p.dy, left: p.x - p.size / 2 + p.dx, scale: [0, 1, 0.2], opacity:[1, 0.8, 0] }} transition={{ duration: 0.8, ease: "easeOut" }} className="absolute bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1),0_0_30px_rgba(217,70,239,0.8)] blur-[1px]" style={{ width: p.size, height: p.size }} />
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- 2. BACKGROUND ENGINE MEGAH ---
const CosmicEngine = React.memo(({ bgIdx }: { bgIdx: number }) => {
  const [stars, setStars] = useState<any[]>([]);
  useEffect(() => {
    setStars([...Array(70)].map((_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 2 + 0.5, duration: Math.random() * 4 + 2 })));
  }, []);
  return (
    <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden bg-[#020108]">
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[90vw] h-[80vh] bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.18),transparent_70%)] opacity-80 blur-3xl mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,70,239,0.1),transparent_60%)] opacity-50 blur-3xl mix-blend-screen" />
      <AnimatePresence mode="wait">
        <motion.img key={bgIdx} src={CYBER_ASSETS[bgIdx]} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 0.15, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 5, ease: "easeInOut" }} className="absolute inset-0 w-full h-full object-cover mix-blend-screen" />
      </AnimatePresence>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#020108_100%)]" />
    </div>
  );
});
CosmicEngine.displayName = 'CosmicEngine';

// --- HELPER: STATUS COLORS ---
const getScoreData = (score: number | null) => {
  if (score === null || score === undefined || isNaN(score)) return { color: "#475569", bg: "bg-slate-800", text: "text-slate-500", glow: "shadow-[0_0_0px_transparent]", label: "NO DATA", border: "border-slate-700/30" };
  if (score >= 80) return { color: "#10b981", bg: "bg-emerald-500", text: "text-emerald-400", glow: "shadow-[0_0_25px_rgba(16,185,129,0.5)]", label: "READY", border: "border-emerald-500/50" };
  if (score >= 50) return { color: "#eab308", bg: "bg-yellow-500", text: "text-yellow-400", glow: "shadow-[0_0_25px_rgba(234,179,8,0.5)]", label: "CAUTION", border: "border-yellow-500/50" };
  return { color: "#ef4444", bg: "bg-red-500", text: "text-red-400", glow: "shadow-[0_0_25px_rgba(239,68,68,0.5)]", label: "DANGER", border: "border-red-500/50" };
};

const portalTransition = { initial: { opacity: 0, scale: 0.98, y: 15 }, animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, type: "spring", bounce: 0.2 } }, exit: { opacity: 0, scale: 1.02 } };

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
  const [feedbackText, setFeedbackText] = useState("");
  const [appFeedbackModal, setAppFeedbackModal] = useState(false);
  const [appFeedbackForm, setAppFeedbackForm] = useState({ category: 'AI ENHANCEMENT', message: '' });
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

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
          if (!studentMap[uname]) { studentMap[uname] = { username: uname, class_name: className, scores: { social: null, malware: null, phish: null }, attempts: { social: 0, malware: 0, phish: 0 }, totalScore: 0, testCount: 0, history:[] }; }
          let parsedDomain = "UNKNOWN";
          if (dom.includes('soc')) parsedDomain = "SOCIAL ENGINEERING";
          else if (dom.includes('mal')) parsedDomain = "MALWARE ANALYSIS";
          else if (dom.includes('phis')) parsedDomain = "PHISHING DEFENSE";
          studentMap[uname].history.push({ ...item, dbId: item.id, parsedDomain, parsedScore: score });
          if (!isNaN(score)) {
             if (parsedDomain === "SOCIAL ENGINEERING") { studentMap[uname].scores.social = score; studentMap[uname].attempts.social += 1; }
             else if (parsedDomain === "MALWARE ANALYSIS") { studentMap[uname].scores.malware = score; studentMap[uname].attempts.malware += 1; }
             else if (parsedDomain === "PHISHING DEFENSE") { studentMap[uname].scores.phish = score; studentMap[uname].attempts.phish += 1; }
             studentMap[uname].totalScore += score; studentMap[uname].testCount += 1;
          }
        });
        setReports(Object.values(studentMap).map((s: any) => ({ ...s, avgScore: s.testCount > 0 ? Math.round(s.totalScore / s.testCount) : 0 })));
      } else { setReports([]); }
    } catch (e) { setReports([]); } 
    finally { setLoading(false); }
  };

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) { setUser(JSON.parse(saved)); }
    fetchData();
    const interval = setInterval(() => setBgIdx(p => (p + 1) % CYBER_ASSETS.length), 10000);
    return () => clearInterval(interval);
  }, []);

  const handleDeleteLog = async (logId: any) => {
    if (!window.confirm("Delete record?")) return;
    try {
      const res = await fetch(`https://cyber-backend-delta.vercel.app/guru/delete-log/${logId}`, { method: 'DELETE' });
      if (res.ok) { setFeedbackModal(null); fetchData(); } 
    } catch (e) { alert("Error."); }
  };

  const submitAppFeedback = async () => {
    if(!appFeedbackForm.message.trim()) return;
    setIsSendingFeedback(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/devinedwinsiahaan171105@gmail.com", {
        method: "POST", headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ _subject: `MEGAH FEEDBACK: ${appFeedbackForm.category}`, Operative: user.username, Message: appFeedbackForm.message })
      });
      if (response.ok) { alert(`Transmission successful. Check Gmail for activation.`); setAppFeedbackModal(false); setAppFeedbackForm({ category: 'AI ENHANCEMENT', message: '' }); } 
    } catch (e) { alert("Error."); } 
    finally { setIsSendingFeedback(false); }
  };

  // Logic Calculations
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
    if(r===0 && c===0 && d===0) return[{ name: 'NO DATA', value: 1, color: '#1e293b' }];
    return[{ name: 'READY', value: r, color: '#10b981' }, { name: 'CAUTION', value: c, color: '#eab308' }, { name: 'DANGER', value: d, color: '#ef4444' }].filter(x => x.value > 0);
  }, [filteredReports]);

  const domainAverages = useMemo(() => {
    let s=0, m=0, p=0, sc=0, mc=0, pc=0;
    filteredReports.forEach(r => { if(r.scores.social) {s+=r.scores.social; sc++} if(r.scores.malware) {m+=r.scores.malware; mc++} if(r.scores.phish) {p+=r.scores.phish; pc++} });
    return [{ domain: 'SOC', score: sc?Math.round(s/sc):0, color: '#d946ef' }, { domain: 'MAL', score: mc?Math.round(m/mc):0, color: '#ef4444' }, { domain: 'PHI', score: pc?Math.round(p/pc):0, color: '#3b82f6' }];
  }, [filteredReports]);

  const dynamicClasses = useMemo(() => ["ALL CLASSES", ...Array.from(new Set(reports.map(r => r.class_name))).sort()], [reports]);

  return (
    <div className="flex h-screen w-full bg-[#020108] text-slate-200 overflow-hidden font-sans text-sm selection:bg-fuchsia-500/30">
      <CosmicEngine bgIdx={bgIdx} />
      <ParticleBurstClickEffect />

      {/* --- SIDEBAR (PANAH KEMBALI) --- */}
      <motion.aside animate={{ width: isSidebarCollapsed ? 80 : 260 }} className="h-screen bg-[#05050A]/90 backdrop-blur-3xl border-r border-white/5 flex flex-col z-[100] shadow-2xl transition-all duration-500">
        <div className="h-20 px-6 flex items-center justify-between border-b border-white/5">
          {!isSidebarCollapsed && <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg"><LayoutDashboard size={18} className="text-white" /></div><span className="font-black text-white uppercase text-[10px] tracking-widest">INSTRUCTOR</span></div>}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2.5 bg-white/5 hover:bg-fuchsia-500/20 text-slate-400 hover:text-fuchsia-400 rounded-xl mx-auto transition-all border border-white/5">
             {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-3">
          <button onClick={() => setView('dashboard')} className={`w-full flex items-center p-3.5 rounded-xl transition-all gap-4 ${view === 'dashboard' ? 'bg-fuchsia-600/10 text-fuchsia-400 border border-fuchsia-500/20 shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}><Activity size={20} />{!isSidebarCollapsed && <span className="font-black text-[10px] tracking-widest">DASHBOARD</span>}</button>
          <button onClick={() => setAppFeedbackModal(true)} className="w-full flex items-center p-3.5 rounded-xl text-slate-500 hover:text-fuchsia-400 hover:bg-fuchsia-600/10 transition-all gap-4"><Lightbulb size={20} />{!isSidebarCollapsed && <span className="font-black text-[10px] tracking-widest uppercase">FEEDBACK</span>}</button>
        </nav>
        <div className="p-6 border-t border-white/5"><button onClick={() => { localStorage.removeItem('user'); router.push('/'); }} className="w-full flex items-center justify-center p-3 bg-red-500/10 text-red-400 rounded-xl gap-3 font-black text-[10px] tracking-widest uppercase hover:bg-red-500 hover:text-white transition-all"><LogOut size={16} /> {!isSidebarCollapsed && "SHUTDOWN"}</button></div>
      </motion.aside>

      {/* --- MAIN CONTENT (SKALA DIPERKECIL AGAR TIDAK NGEZOOM) --- */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-black/20 backdrop-blur-md">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full"><div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_#34d399]" /><span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">NETWORK: SECURE</span></div>
            <div className="flex items-center gap-5"><div className="text-right hidden sm:block"><p className="text-[10px] font-black text-white uppercase">{user.username}</p><p className="text-[8px] font-bold text-fuchsia-400 uppercase tracking-widest mt-1">MASTER ACCESS</p></div><div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center border border-white/20"><User size={18} /></div></div>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar px-8 lg:px-12 py-8" ref={scrollRef}>
          <AnimatePresence mode="wait">
            <motion.div key="analytics" {...(portalTransition as any)} className="max-w-[1300px] w-full mx-auto space-y-8 pb-20">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
                  <div><div className="text-fuchsia-400 font-black text-[10px] tracking-[0.4em] mb-2 uppercase flex items-center gap-2"><Globe size={14} /> LIVE MONITORING</div><h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight uppercase leading-tight">WELCOME, <span className="text-fuchsia-400">{user.username}</span>.</h1><p className="text-slate-500 font-medium text-xs tracking-wide">Real-time overview of operative readiness from secure databanks.</p></div>
                  <button onClick={fetchData} className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-full font-black text-[10px] tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-3 uppercase shadow-lg"><RefreshCcw size={14} className={loading ? "animate-spin" : ""}/> REFRESH</button>
                </div>

                {/* BENTO STATS (DIKECILKAN) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-[minmax(160px,auto)]">
                   <motion.div whileHover={{ y: -4 }} className="lg:col-span-4 lg:row-span-2 bg-[#0a0a0f]/60 border border-white/10 rounded-[2.5rem] p-8 shadow-xl flex flex-col justify-between backdrop-blur-2xl relative overflow-hidden group">
                      <p className="text-[10px] font-black text-slate-500 tracking-widest uppercase mb-4 flex items-center gap-2"><Target size={12}/> PARTICIPATION</p>
                      <div className="space-y-1"><p className="text-6xl font-black text-white tracking-tighter">{participationStats.percentage}%</p><p className="text-[9px] font-black text-fuchsia-400 uppercase tracking-widest">SYSTEM UPTIME</p></div>
                      <div className="w-full h-2.5 bg-black/50 rounded-full overflow-hidden border border-white/5 mt-8"><motion.div initial={{ width: 0 }} animate={{ width: `${participationStats.percentage}%` }} transition={{ duration: 1.5 }} className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-[0_0_10px_#d946ef]" /></div>
                   </motion.div>
                   <motion.div whileHover={{ y: -4 }} className="lg:col-span-4 lg:row-span-2 bg-[#0a0a0f]/60 border border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center shadow-xl backdrop-blur-2xl">
                      <p className="text-[10px] font-black text-slate-500 tracking-widest uppercase mb-4 w-full text-left flex items-center gap-2"><ShieldAlert size={12}/> FLEET STATUS</p>
                      <div className="relative w-full h-[160px]"><ResponsiveContainer><PieChart><Pie data={readinessDistribution} innerRadius={55} outerRadius={70} dataKey="value" stroke="none" paddingAngle={5}>{readinessDistribution.map((e, i) => (<Cell key={i} fill={e.color} />))}</Pie></PieChart></ResponsiveContainer><div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-4xl font-black text-white">{participationStats.active}</span><span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">ACTIVE</span></div></div>
                      <div className="flex gap-4 mt-4">{readinessDistribution.map((item, idx) => (<div key={idx} className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} /><span className="text-[9px] font-black text-slate-300 uppercase">{item.name}</span></div>))}</div>
                   </motion.div>
                   <motion.div whileHover={{ y: -4 }} className="lg:col-span-4 lg:row-span-2 bg-[#0a0a0f]/60 border border-white/10 rounded-[2.5rem] p-8 shadow-xl h-[280px] backdrop-blur-2xl">
                      <p className="text-[10px] font-black text-slate-500 tracking-widest uppercase mb-6 flex items-center gap-2"><Cpu size={12}/> DOMAIN MASTERY</p>
                      <ResponsiveContainer><BarChart data={domainAverages} margin={{ left: -30 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" /><XAxis dataKey="domain" tick={{ fontSize: 9, fontWeight: '900', fill: '#94a3b8' }} axisLine={false} tickLine={false}/><YAxis tick={{ fontSize: 9, fill: '#475569' }} domain={[0, 100]} axisLine={false} tickLine={false}/><Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={40}>{domainAverages.map((e, i) => (<Cell key={i} fill={e.color} />))}</Bar></BarChart></ResponsiveContainer>
                   </motion.div>
                </div>

                {/* OPERATIVE LIST (SKALA DIPERKECIL) */}
                <div className="mt-16 space-y-6 pb-20">
                   <div className="flex flex-col xl:flex-row justify-between items-end gap-6 mb-4">
                      <div className="space-y-2"><h2 className="text-3xl font-black text-white tracking-tighter uppercase flex items-center gap-4">OPERATIVE DOSSIERS <Database className="text-fuchsia-500" size={24} /></h2><p className="text-slate-600 font-black text-[9px] tracking-[0.4em] uppercase">ACCESSING PERSONNEL RECORDS</p></div>
                      <div className="flex gap-4 w-full xl:w-auto">
                         <div className="relative flex-1 xl:w-[320px] group"><Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-fuchsia-500" /><input type="text" placeholder="IDENTITY HASH..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-black/80 border border-white/10 rounded-full py-4 pl-14 pr-6 text-[10px] font-black text-white outline-none focus:border-fuchsia-500 transition-all" /></div>
                         <select value={activeClass} onChange={(e) => setActiveClass(e.target.value)} className="bg-black/80 border border-white/10 rounded-full px-8 text-[10px] font-black text-white outline-none cursor-pointer uppercase">{dynamicClasses.map(c => <option key={c} value={c} className="bg-black">{c}</option>)}</select>
                      </div>
                   </div>

                   <div className="flex flex-col gap-4">
                      <AnimatePresence>
                         {filteredReports.map((r, idx) => {
                            const status = getScoreData(r.avgScore);
                            return (
                               <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }} key={idx} className="flex items-center justify-between bg-[#07070B]/70 backdrop-blur-[50px] p-6 rounded-[2.5rem] border border-white/5 hover:border-fuchsia-500/20 transition-all group shadow-2xl relative overflow-hidden">
                                  <div className="absolute left-0 top-0 w-1.5 h-full opacity-20" style={{ backgroundColor: status.color }} />
                                  <div className="flex items-center gap-8 relative z-10"><div className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center relative shadow-2xl group-hover:rotate-3 transition-all"><User size={22} className="text-slate-600 group-hover:text-white" /><div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-[2px] border-[#07070B] ${status.bg}`} style={{ color: status.color }} /></div><div><p className="font-black text-xl text-white tracking-tighter uppercase group-hover:text-fuchsia-400 transition-all">{r.username}</p><p className="text-[9px] text-slate-500 font-black tracking-[0.3em] uppercase mt-1">{r.class_name}</p></div></div>
                                  <div className="flex items-center gap-10 relative z-10">
                                     <div className="hidden lg:grid grid-cols-3 gap-8">
                                        <div className="text-center group/score"><p className="text-[9px] font-black text-slate-600 uppercase mb-1 tracking-widest group-hover:text-fuchsia-400">SOC</p><p className="text-xl font-black text-fuchsia-400">{r.scores.social ?? '--'}</p></div>
                                        <div className="text-center group/score"><p className="text-[9px] font-black text-slate-600 uppercase mb-1 tracking-widest group-hover:text-red-400">MAL</p><p className="text-xl font-black text-red-500">{r.scores.malware ?? '--'}</p></div>
                                        <div className="text-center group/score"><p className="text-[9px] font-black text-slate-600 uppercase mb-1 tracking-widest group-hover:text-blue-400">PHI</p><p className="text-xl font-black text-blue-500">{r.scores.phish ?? '--'}</p></div>
                                     </div>
                                     <div className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-white/5 relative ml-2 transform group-hover:scale-105 transition-all"><svg className="w-full h-full absolute -rotate-90"><circle cx="50%" cy="50%" r="45%" stroke={status.color} strokeWidth="4" fill="transparent" strokeDasharray={`${r.avgScore * 2.2} 1000`} className="opacity-80" /></svg><span className={`text-xl font-black ${status.text}`}>{r.avgScore}</span></div>
                                     <button onClick={() => setFeedbackModal(r)} className="px-8 py-3.5 bg-white/5 border border-white/10 rounded-[1.5rem] hover:bg-white text-slate-400 hover:text-black font-black text-[10px] tracking-widest uppercase transition-all flex items-center gap-3"><Eye size={16} /> DOSSIER</button>
                                  </div>
                               </motion.div>
                            )
                         })}
                      </AnimatePresence>
                      {filteredReports.length === 0 && (
                         <div className="p-32 text-center border-2 border-dashed border-white/5 rounded-[3rem] bg-black/40"><Info size={40} className="mx-auto text-slate-800 mb-6" /><h3 className="text-xl font-black text-white uppercase tracking-widest">DATABASE STATUS: EMPTY</h3><p className="text-slate-700 font-black uppercase text-[10px] tracking-widest mt-2">NO RECORDS DETECTED IN THE SECTOR.</p></div>
                      )}
                   </div>
                </div>
          </motion.div>
        </main>
      </div>

      {/* --- MODAL SYSTEM FEEDBACK --- */}
      <AnimatePresence>
        {appFeedbackModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-[#020108]/95 backdrop-blur-[40px]">
             <motion.div initial={{ scale: 0.9, y: 30, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }} className="w-full max-w-2xl bg-[#0a0a0f]/80 border border-white/10 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden backdrop-blur-3xl">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600" />
                <div className="flex justify-between items-start mb-10 relative z-10">
                   <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center text-white shadow-lg"><Zap size={24} className="fill-current" /></div>
                      <div><h2 className="text-3xl font-black text-white uppercase tracking-tighter">PREMIUM FEEDBACK</h2><p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.4em] mt-1">GMAIL: devinedwinsiahaan171105@gmail.com</p></div>
                   </div>
                   <button onClick={() => setAppFeedbackModal(false)} className="p-3 bg-white/5 rounded-full text-slate-500 border border-white/5"><X size={18}/></button>
                </div>
                <div className="space-y-6 relative z-10">
                   <div><label className="text-[9px] font-black text-fuchsia-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Hexagon size={12}/> CATEGORY</label>
                      <select value={appFeedbackForm.category} onChange={(e) => setAppFeedbackForm({...appFeedbackForm, category: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-2xl p-4 text-xs font-black text-white uppercase outline-none focus:border-fuchsia-500 appearance-none cursor-pointer"><option value="AI ENHANCEMENT">🤖 AI SYSTEM</option><option value="UI/UX MODERNIZATION">🎨 UI / UX</option><option value="SECURITY EXPANSION">🛡️ SECURITY</option><option value="REAL-TIME ANALYTICS">📊 ANALYTICS</option><option value="SYSTEM PERFORMANCE">⚡ PERFORMANCE</option><option value="MOBILE INTEGRATION">📱 MOBILE</option><option value="BUG REPORT">⚠️ BUG REPORT</option><option value="OTHER">🌐 OTHER</option></select></div>
                   <div><label className="text-[9px] font-black text-fuchsia-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Terminal size={12}/> CONTENT</label>
                      <textarea value={appFeedbackForm.message} onChange={(e) => setAppFeedbackForm({...appFeedbackForm, message: e.target.value})} placeholder="INPUT RECOMMENDATIONS..." className="w-full h-40 bg-black/60 border border-white/10 rounded-3xl p-5 text-xs font-bold text-white focus:border-fuchsia-500 outline-none resize-none placeholder:text-slate-800 transition-all" /></div>
                   <button onClick={submitAppFeedback} disabled={isSendingFeedback} className="w-full py-4.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-[1.5rem] font-black text-[10px] tracking-[0.5em] uppercase hover:scale-[1.01] transition-all flex items-center justify-center gap-4 shadow-2xl py-4">{isSendingFeedback ? "TRANSMITTING..." : "EXECUTE TRANSMISSION"} <Send size={16}/></button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        ::-webkit-scrollbar { width: 0px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(217, 70, 239, 0.4); border-radius: 10px; }
        ::selection { background: #d946ef; color: white; }
        input, select, textarea { caret-color: #d946ef; }
      `}} />
    </div>
  );
}