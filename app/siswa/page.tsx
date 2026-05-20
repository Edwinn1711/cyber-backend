"use client"
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShieldCheck, Brain, Target, ChevronRight, ChevronLeft, Zap, ArrowLeft, ArrowRight,
  Fingerprint, Power, BarChart3, Activity, ShieldAlert, Cpu, Globe, Lock, 
  Radar, Terminal, Database, Server, Search, Radio, Bug, MailWarning, 
  Sparkles, AlertTriangle, Eye, CheckCircle2, XCircle, X, User, Info, 
  ShieldQuestion, LayoutGrid, Check, BellRing, Bot, ScanLine, Laptop, Workflow, FileText
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid
} from 'recharts'

// --- ASSETS & CONFIG ---
const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

// --- 1. CLICK EFFECT (HOLOGRAPHIC PARTICLES) ---
const ParticleBurstClickEffect = () => {
  const [particles, setParticles] = useState<any[]>([]);
  useEffect(() => {
    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      const newParticles = Array.from({ length: 12 }).map((_, i) => ({
        id: Math.random(), x: clientX, y: clientY, angle: (Math.PI * 2 / 12) * i, velocity: Math.random() * 70 + 40
      }));
      setParticles(prev => [...prev, ...newParticles]);
      setTimeout(() => setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id))), 800);
    };
    window.addEventListener('mousedown', handleInteraction);
    return () => window.removeEventListener('mousedown', handleInteraction);
  }, []);
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div key={p.id} initial={{ scale: 0, opacity: 1, x: p.x, y: p.y }} animate={{ scale: [0, 1.5, 0], opacity: [1, 0.8, 0], x: p.x + Math.cos(p.angle) * p.velocity, y: p.y + Math.sin(p.angle) * p.velocity }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-400 shadow-[0_0_20px_#d946ef]" style={{ width: '5px', height: '5px' }} />
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- 2. DYNAMIC BACKGROUND (BRIGHTER CONTRAST) ---
const PersistentUniverse = React.memo(({ bgIdx }: { bgIdx: number }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#050510]">
      <AnimatePresence mode="wait">
        <motion.img key={bgIdx} src={CYBER_ASSETS[bgIdx]} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 0.4, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 5 }} className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-screen" />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a]/70 via-transparent to-[#050505]/95 pointer-events-none" />
      <div className="absolute inset-0 bg-hud-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(217,70,239,0.05)_0%,transparent_70%)] pointer-events-none" />
    </div>
  );
});
PersistentUniverse.displayName = 'PersistentUniverse';

// --- 3. INTERACTIVE AI ROBOT ---
const RobotFace = ({ size = 24, ringSize = "w-40 h-40", coreSize = "w-24 h-24" }) => {
  const faceRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!faceRef.current) return;
      const rect = faceRef.current.getBoundingClientRect();
      const moveX = ((e.clientX - (rect.left + rect.width / 2)) / window.innerWidth) * 40;
      const moveY = ((e.clientY - (rect.top + rect.height / 2)) / window.innerHeight) * 40;
      setOffset({ x: Math.max(-15, Math.min(15, moveX)), y: Math.max(-15, Math.min(15, moveY)) });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  return (
    <div className="relative flex items-center justify-center" ref={faceRef}>
      <div className={`absolute ${ringSize} border-[2px] border-dashed border-fuchsia-500/40 rounded-full animate-[spin_15s_linear_infinite]`} />
      <div className={`relative ${coreSize} bg-[#0a0a1a] border-2 border-fuchsia-500/80 rounded-full shadow-[0_0_40px_rgba(217,70,239,0.4)] flex items-center justify-center z-10 overflow-hidden`}>
         <motion.div animate={{ x: offset.x, y: offset.y }} transition={{ type: "spring", stiffness: 150 }} className="flex flex-col items-center">
           <div className="flex gap-4 mb-2">
             <div className="w-3 h-5 bg-fuchsia-400 rounded-full shadow-[0_0_10px_#d946ef] animate-pulse" />
             <div className="w-3 h-5 bg-fuchsia-400 rounded-full shadow-[0_0_10px_#d946ef] animate-pulse" />
           </div>
           <svg viewBox="0 0 24 24" width={size} height={size} className="text-fuchsia-400 drop-shadow-[0_0_8px_#d946ef]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M7 14s2 2 5 2 5-2 5-2" /></svg>
         </motion.div>
      </div>
    </div>
  );
};

// --- 4. ANALYTICS HELPER ---
const getReadinessData = (score: number) => {
  if (score >= 80) return { label: "EXCELLENT", color: "#d946ef", bg: "bg-fuchsia-600", text: "text-fuchsia-400" };
  if (score >= 50) return { label: "AVERAGE", color: "#eab308", bg: "bg-yellow-600", text: "text-yellow-400" };
  return { label: "POOR", color: "#ef4444", bg: "bg-red-600", text: "text-red-400" };
};

// Variants with Fix Type Error (as any)
const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } } as any;
const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } } as any;
const portalTransition = { initial: { opacity: 0, scale: 0.98, y: 15 }, animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, type: "spring" } }, exit: { opacity: 0, scale: 1.02 } } as any;

export default function StudentPortal() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  // States Utama
  const [view, setView] = useState('dashboard'); 
  const [currentStep, setCurrentStep] = useState(1); 
  const [selectedDomain, setSelectedDomain] = useState("SOCIAL ENGINEERING");
  const [allQs, setAllQs] = useState<any[]>([]);
  const [ans, setAns] = useState<Record<number, {score: number, text: string}>>({});
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<any[]>([]);
  const [user, setUser] = useState({ username: 'STUDENT', class_name: '' });
  const [loading, setLoading] = useState(false);
  const [bgIdx, setBgIdx] = useState(0);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('SUBMIT ASSESSMENT');
  const [detailModal, setDetailModal] = useState<any>(null);
  const [showRetakeWarning, setShowRetakeWarning] = useState(false);
  const [pendingDomain, setPendingDomain] = useState("");
  const [showClassSelector, setShowClassSelector] = useState(false);

  const readiness = useMemo(() => getReadinessData(score), [score]);
  const TACTICAL_DOMAINS = [
    { id: "Social Engineering", title: "Social Engineering", icon: Brain, color: "#d946ef", desc: "Psychological Defense" },
    { id: "Malware", title: "Malware", icon: Bug, color: "#F87171", desc: "Detection & Analysis" },
    { id: "Phishing", title: "Phishing", icon: MailWarning, color: "#818CF8", desc: "Credential Protection" },
    { id: "Network", title: "Network Security", icon: Globe, color: "#34D399", desc: "Traffic Control" },
    { id: "Privilege", title: "Privilege Escalation", icon: Lock, color: "#d8b4fe", desc: "Access Management" },
    { id: "Threat", title: "Threat Hunting", icon: Radar, color: "#FB923C", desc: "Proactive Search" },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "GOOD MORNING";
    if (hour < 17) return "GOOD AFTERNOON";
    return "GOOD EVENING";
  };

  const fetchScores = useCallback(async (username: string) => {
    try {
      const res = await fetch(`https://cyber-backend-delta.vercel.app/siswa/scores/${username}`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setScore(Math.round(data.reduce((acc, curr: any) => acc + curr.score, 0) / data.length));
        setHistory(data);
      }
    } catch (e) { console.error("OFFLINE"); }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      const parsed = JSON.parse(saved); setUser(parsed); setIsAuthorized(true); fetchScores(parsed.username);
    } else { router.push('/'); }
    const interval = setInterval(() => setBgIdx(p => (p + 1) % CYBER_ASSETS.length), 10000);
    return () => clearInterval(interval);
  }, [router, fetchScores]);

  useEffect(() => {
    if (isAuthorized) {
      fetch('https://cyber-backend-delta.vercel.app/questions').then(r => r.json()).then(d => {
        setAllQs(d.map((q: any) => ({ ...q, options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options })));
      });
    }
  }, [isAuthorized]);

  const handleStartMissionClick = () => {
    if (!user.class_name || user.class_name === "UNASSIGNED") setShowClassSelector(true); 
    else { setView('mission'); setCurrentStep(1); }
  };

  const assignClassAndStartMission = (className: string) => {
    const updatedUser = { ...user, class_name: className };
    setUser(updatedUser); localStorage.setItem('user', JSON.stringify(updatedUser)); 
    setShowClassSelector(false); setView('mission'); setCurrentStep(1);
  };

  const executeUplink = async () => {
    setLoading(true); setSubmitStatus('SYNCING...');
    const formattedAnswers = Object.keys(ans).map(id => ({ id: parseInt(id), value: ans[parseInt(id) as any].score.toString(), text: ans[parseInt(id) as any].text }));
    try {
      await fetch('https://cyber-backend-delta.vercel.app/siswa/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username, class_name: user.class_name, domain_id: selectedDomain, answers: formattedAnswers })
      });
      await fetchScores(user.username);
    } finally {
      setSubmitStatus('COMPLETE');
      setTimeout(() => { setView('reports'); setAns({}); setCurrentStep(1); setLoading(false); setSubmitStatus('SUBMIT ASSESSMENT'); }, 1500);
    }
  };

  if (!isAuthorized) return null;

  return (
    <div className="flex h-screen w-full text-slate-100 overflow-hidden font-sans selection:bg-fuchsia-500/30">
      <PersistentUniverse bgIdx={bgIdx} />
      <ParticleBurstClickEffect />

      {/* --- SIDEBAR (NEW LABELS) --- */}
      <motion.aside initial={false} animate={{ width: isSidebarCollapsed ? 80 : 260 }} className="h-screen bg-[#0a0a1a]/95 backdrop-blur-3xl border-r border-white/10 flex flex-col z-[100] transition-all duration-500 shadow-2xl">
        <div className="h-20 px-6 flex items-center justify-between border-b border-white/10">
          {!isSidebarCollapsed && <div className="flex flex-col"><span className="font-black text-white uppercase text-[11px] tracking-widest leading-none">CYBER READINESS</span><span className="font-bold text-fuchsia-500 text-[10px] tracking-widest mt-1">INDEX</span></div>}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 text-slate-400 hover:text-fuchsia-400 transition-all border border-white/5 rounded-lg">
             {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-4">
          <button onClick={() => setView('dashboard')} className={`w-full flex items-center p-3.5 rounded-xl transition-all gap-4 ${view === 'dashboard' ? 'bg-fuchsia-600/20 text-white border border-fuchsia-500/40 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}><LayoutGrid size={20} />{!isSidebarCollapsed && <span className="font-bold text-[10px] tracking-widest uppercase">BERANDA</span>}</button>
          <button onClick={() => setView('assessment')} className={`w-full flex items-center p-3.5 rounded-xl transition-all gap-4 ${view === 'assessment' || view === 'mission' || view === 'briefing' ? 'bg-fuchsia-600/20 text-white border border-fuchsia-500/40 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}><Target size={20} />{!isSidebarCollapsed && <span className="font-bold text-[10px] tracking-widest uppercase">ASSESSMENT</span>}</button>
          <button onClick={() => setView('reports')} className={`w-full flex items-center p-3.5 rounded-xl transition-all gap-4 ${view === 'reports' ? 'bg-fuchsia-600/20 text-white border border-fuchsia-500/40 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}><BarChart3 size={20} />{!isSidebarCollapsed && <span className="font-bold text-[10px] tracking-widest uppercase">REPORT</span>}</button>
        </nav>
        <div className="p-6 border-t border-white/10"><button onClick={() => router.push('/')} className="w-full flex items-center justify-center p-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl gap-4 font-bold text-[10px] tracking-widest uppercase hover:bg-red-500 hover:text-white transition-all"><Power size={18} /> {!isSidebarCollapsed && "LOGOUT"}</button></div>
      </motion.aside>

      {/* --- MAIN CONTENT (HIGH CONTRAST) --- */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-10 border-b border-white/10 bg-[#0f0f1f]/60 backdrop-blur-xl">
            <div className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/20 rounded-full shadow-inner"><div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_15px_#34d399]" /><span className="text-[9px] font-black text-white uppercase tracking-widest">GATEWAY ACTIVE</span></div>
            <div className="flex items-center gap-6 text-right">
                <div className="hidden sm:block"><p className="text-[12px] font-black text-white tracking-widest uppercase">{user.username}</p><p className="text-[10px] font-bold text-fuchsia-400 uppercase tracking-widest mt-1">OPERATIVE MODE</p></div>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-fuchsia-600 rounded-full flex items-center justify-center border border-white/20 shadow-lg shadow-fuchsia-500/20"><User size={22} /></div>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar px-10 lg:px-14 py-10" ref={scrollRef}>
          <AnimatePresence mode="wait">
            
            {/* VIEW DASHBOARD (CENTERED & BRIGHTER) */}
            {view === 'dashboard' && (
              <motion.div key="dash" variants={containerVariants} initial="hidden" animate="show" className="max-w-[1300px] mx-auto space-y-12">
                
                <motion.div variants={itemVariants} className="text-center space-y-4 pt-4">
                  <div className="font-mono text-[10px] text-fuchsia-400 font-black tracking-[0.5em] uppercase">SYSTEM ANALYSIS • {getGreeting()}</div>
                  <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none uppercase drop-shadow-2xl">{getGreeting()}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-400 to-indigo-300">{user.username}.</span></h1>
                  <p className="text-slate-300 text-[12px] font-bold tracking-[0.3em] uppercase max-w-2xl mx-auto opacity-90 leading-relaxed">Cyber Readiness Index Protocol Gateway v2.1 • Accessing secure personnel dossiers and fleet metrics.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   {/* Profile Card */}
                   <motion.div variants={itemVariants} className="bg-[#1a1a2e]/90 backdrop-blur-3xl border-2 border-white/10 p-10 rounded-[3rem] flex flex-col items-center justify-center text-center hover:border-fuchsia-500/60 transition-all shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-fuchsia-400 shadow-[0_0_20px_#d946ef] animate-scan" />
                        <div className="w-20 h-20 bg-gradient-to-b from-indigo-500 to-fuchsia-600 rounded-3xl flex items-center justify-center text-white border border-white/20 mb-8 shadow-2xl transform group-hover:scale-110 transition-all"><Fingerprint size={40} /></div>
                        <h4 className="text-3xl font-black text-white tracking-widest uppercase">{user.username}</h4>
                        <p className="text-[11px] text-fuchsia-400 font-black tracking-[0.4em] uppercase mt-4">{user.class_name || "UNASSIGNED"}</p>
                   </motion.div>

                   {/* Average Score */}
                   <motion.div variants={itemVariants} className="bg-[#1a1a2e]/90 backdrop-blur-3xl border-2 border-white/10 p-10 rounded-[3rem] flex flex-col items-center justify-center hover:border-fuchsia-500/60 transition-all shadow-2xl group">
                      <div className="relative mb-6 flex justify-center w-full">
                        <div className="absolute inset-0 rounded-full bg-fuchsia-500/10 blur-3xl group-hover:bg-fuchsia-500/20" />
                        <svg className="w-40 h-40 transform -rotate-90">
                          <circle cx="80" cy="80" r="72" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="transparent" />
                          <motion.circle initial={{ strokeDasharray: "0 1000" }} animate={{ strokeDasharray: `${(score / 100) * 452} 1000` }} transition={{ duration: 2.5, ease: "easeOut" }} cx="80" cy="80" r="72" stroke="#d946ef" strokeWidth="8" strokeLinecap="round" fill="transparent" style={{ filter: 'drop-shadow(0 0 15px rgba(217,70,239,0.8))' }} />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-6xl font-black text-white tracking-tighter drop-shadow-lg">{score}</span>
                          <span className="text-[9px] font-black text-slate-400 uppercase mt-1 tracking-widest">AVG READINESS</span>
                        </div>
                      </div>
                      <div className={`px-10 py-2.5 rounded-full border-2 border-white/10 text-[11px] font-black tracking-widest uppercase bg-black/40 ${readiness.text} shadow-2xl`}>{readiness.label}</div>
                   </motion.div>

                   {/* System Analytics */}
                   <motion.div variants={itemVariants} className="bg-[#1a1a2e]/90 backdrop-blur-3xl border-2 border-white/10 p-10 rounded-[3rem] hover:border-fuchsia-500/60 transition-all shadow-2xl flex flex-col items-center justify-center text-center group">
                      <p className="text-[11px] font-black text-white tracking-[0.5em] mb-12 uppercase flex items-center gap-3"><Activity size={16} className="text-fuchsia-500 animate-pulse"/> SYSTEM ANALYTICS</p>
                      <div className="space-y-8 font-mono text-[10px] tracking-[0.2em] text-white w-full px-4">
                        {[ {l:'SERVER', v:'READY', c:'text-fuchsia-400'}, {l:'CRYPT', v:'AES-256', c:'text-emerald-500'}, {l:'DATA', v:'SINKRON', c:'text-white'} ].map((x,i)=>(
                           <div key={i} className="flex justify-between border-b-2 border-white/5 pb-4"><span>{x.l}</span><span className={`${x.c} font-black`}>{x.v}</span></div>
                        ))}
                      </div>
                   </motion.div>

                   {/* BROADCAST CENTER - THE MISSING SECTION */}
                   <motion.div variants={itemVariants} className="lg:col-span-3 bg-gradient-to-br from-[#1a1a2e] to-[#0a0a1a] border-2 border-white/15 p-12 rounded-[4rem] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl group hover:border-fuchsia-500/50 transition-all duration-700">
                      <div className="absolute inset-0 bg-hud-grid opacity-30" />
                      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full -z-10" />
                      
                      <div className="flex items-center gap-10 z-10 text-center lg:text-left">
                        <div className="w-24 h-24 bg-black/60 rounded-[2.5rem] flex items-center justify-center shrink-0 border-2 border-white/10 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                          <BellRing size={48} className="text-fuchsia-500 fill-current animate-bounce" />
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-center lg:justify-start gap-4">
                             <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_15px_#34d399] animate-ping" />
                             <span className="text-[12px] font-black tracking-[0.6em] text-emerald-400 uppercase">Mission Status: Active</span>
                          </div>
                          <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-tight drop-shadow-md">The Assessment Gateway is Online.</h3>
                          <p className="text-[12px] font-bold text-slate-300 tracking-widest max-w-2xl uppercase opacity-100 leading-relaxed">Initiate your cyber defense validation protocols immediately through the secure cloud environment.</p>
                        </div>
                      </div>
                      
                      <button onClick={handleStartMissionClick} className="px-16 py-8 bg-white text-black rounded-[2.2rem] font-black text-[14px] tracking-[0.5em] hover:bg-fuchsia-600 hover:text-white transition-all duration-500 shadow-[0_20px_50px_rgba(255,255,255,0.2)] flex items-center gap-6 uppercase z-10 group/btn">
                        START PROTOCOL <ArrowRight size={24} className="group-hover/btn:translate-x-3 transition-transform" />
                      </button>
                   </motion.div>
                </div>
              </motion.div>
            )}

            {/* VIEW REPORTS - REPORT (CENTER ALIGNED) */}
            {view === 'reports' && (
              <motion.div key="reports" variants={containerVariants} initial="hidden" animate="show" className="max-w-6xl mx-auto space-y-12">
                 <motion.div variants={itemVariants} className="space-y-4 text-center pt-6">
                    <h2 className="text-6xl font-black text-white tracking-widest uppercase drop-shadow-xl">Evaluation Reports.</h2>
                    <p className="text-fuchsia-400 text-[12px] font-black tracking-[0.6em] uppercase">Comprehensive Operational History</p>
                 </motion.div>

                 <motion.div variants={itemVariants} className="bg-[#1a1a2e]/95 backdrop-blur-3xl border-2 border-white/10 rounded-[4rem] p-16 shadow-2xl relative overflow-hidden text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 relative z-10">
                        <div className="bg-black/50 rounded-[3rem] p-12 border-2 border-white/5 flex flex-col items-center hover:scale-105 hover:border-fuchsia-500/20 transition-all">
                           <p className="text-[11px] text-slate-400 font-black tracking-[0.5em] mb-4 uppercase">COMPLETED</p>
                           <p className="text-7xl text-white font-black font-mono tracking-tighter">{history.length}</p>
                        </div>
                        <div className="bg-black/50 rounded-[3rem] p-12 border-2 border-white/5 flex flex-col items-center hover:scale-105 hover:border-fuchsia-500/20 transition-all">
                           <p className="text-[11px] text-slate-400 font-black tracking-[0.5em] mb-4 uppercase">ACCURACY</p>
                           <p className="text-7xl text-fuchsia-400 font-black font-mono tracking-tighter">{score}%</p>
                        </div>
                        <div className="bg-black/50 rounded-[3rem] p-12 border-2 border-white/5 flex flex-col items-center hover:scale-105 hover:border-fuchsia-500/20 transition-all">
                           <p className="text-[11px] text-slate-400 font-black tracking-[0.5em] mb-4 uppercase">RATING</p>
                           <p className={`text-4xl font-black tracking-[0.3em] uppercase mt-2 ${readiness.text} drop-shadow-md`}>{readiness.label}</p>
                        </div>
                    </div>

                    <div className="relative z-10 bg-black/60 border-2 border-white/10 rounded-[4rem] overflow-hidden shadow-inner">
                      <table className="w-full text-center border-collapse">
                        <thead>
                          <tr className="border-b-2 border-white/10 bg-white/[0.04]">
                            <th className="py-8 text-[11px] font-black tracking-[0.5em] text-white uppercase">SESS_ID</th>
                            <th className="py-8 text-[11px] font-black tracking-[0.5em] text-white uppercase">Operational Sector</th>
                            <th className="py-8 text-[11px] font-black tracking-[0.5em] text-white uppercase">Accuracy</th>
                            <th className="py-8 text-[11px] font-black tracking-[0.5em] text-white uppercase">Analysis</th>
                          </tr>
                        </thead>
                        <tbody className="text-white font-bold">
                           {history.length === 0 ? (
                              <tr><td colSpan={4} className="py-32 text-slate-600 font-black text-sm uppercase tracking-[0.5em]">NO DATA FOUND</td></tr>
                           ) : (
                              history.map((h, i) => (
                                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-all group">
                                  <td className="py-10 text-[14px] font-black font-mono text-fuchsia-400 opacity-100">#0{history.length - i}</td>
                                  <td className="py-10 text-[14px] uppercase tracking-widest">{h.domain_id}</td>
                                  <td className="py-10 font-black font-mono text-2xl tracking-tighter">{h.score}%</td>
                                  <td className="py-10"><button onClick={() => setDetailModal(h.details || [])} className="mx-auto flex items-center gap-4 px-10 py-4 bg-[#0a0a0f] border-2 border-white/10 hover:border-fuchsia-500/60 text-white rounded-3xl text-[11px] font-black tracking-[0.4em] transition-all uppercase shadow-xl hover:shadow-fuchsia-500/20"><Eye size={20} /> ANALYZE</button></td>
                                </tr>
                              ))
                           )}
                        </tbody>
                      </table>
                    </div>
                 </motion.div>
              </motion.div>
            )}

            {/* Assessment View */}
            {view === 'assessment' && (
              <motion.div key="assess-hub" variants={containerVariants} initial="hidden" animate="show" className="max-w-6xl mx-auto space-y-16 pt-6">
                <motion.div variants={itemVariants} className="text-center space-y-4"><h2 className="text-6xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-2xl">Assessment Modules.</h2><p className="text-fuchsia-400 text-[12px] font-black tracking-[0.6em] uppercase">Select target sector for evaluation</p></motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {TACTICAL_DOMAINS.map((domain, i) => {
                    const done = history.some(h => String(h.domain_id).toLowerCase().includes(domain.id.split(' ')[0].toLowerCase()));
                    return (
                      <motion.div key={i} variants={itemVariants} whileHover={{ y: -15, scale: 1.03 }} onClick={() => { if(done) { setPendingDomain(domain.id); setShowRetakeWarning(true); } else { setSelectedDomain(domain.id); setView('briefing'); } }} className={`bg-[#1a1a2e]/90 border-2 ${done ? 'border-fuchsia-500/50 shadow-[0_0_30px_rgba(217,70,239,0.2)]' : 'border-white/10'} p-12 rounded-[4rem] cursor-pointer group transition-all duration-500 shadow-2xl relative overflow-hidden`}><div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" /><div className="flex justify-between items-start mb-12"><div className="w-18 h-18 rounded-[2rem] flex items-center justify-center shadow-2xl" style={{ backgroundColor: `${domain.color}25`, border: `2px solid ${domain.color}50` }}><domain.icon size={32} style={{ color: domain.color }} /></div>{done && <div className="bg-fuchsia-600 px-5 py-2 rounded-full border border-white/20"><span className="text-[10px] font-black text-white tracking-widest uppercase">Verified</span></div>}</div><h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">{domain.title}</h3><p className="text-[12px] text-slate-300 font-bold tracking-widest uppercase mb-12 leading-relaxed">{domain.desc}</p><div className="mt-auto pt-8 border-t-2 border-white/5 flex justify-end items-center"><span className="text-[11px] font-black tracking-[0.5em] text-fuchsia-400 group-hover:translate-x-3 transition-all uppercase">INITIALIZE PROTOCOL <ArrowRight size={16} className="inline ml-4" /></span></div></motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Mission & Briefing */}
            {view === 'mission' && (
              <motion.div key="mission" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-12 pb-44 text-center lg:text-left">
                <header className="flex justify-between items-end border-b-2 border-white/10 pb-10"><div className="space-y-4 pt-6"><button onClick={() => setView('assessment')} className="text-[11px] font-black text-slate-400 hover:text-red-400 flex items-center gap-4 tracking-widest uppercase transition-all"><ArrowLeft size={20} /> ABORT SESSION</button><h2 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">PHASE 0{currentStep}</h2><p className="text-fuchsia-500 font-black tracking-[0.6em] text-[12px] uppercase">PROTOCOL: {selectedDomain}</p></div><div className="text-[140px] font-black text-white/5 font-mono leading-none tracking-tighter">0{currentStep}</div></header>
                <div className="space-y-10">{currentStepQs.map((q) => (<div key={q.id} className="p-14 rounded-[4rem] bg-[#1a1a2e]/90 border-2 border-white/10 space-y-12 shadow-2xl relative overflow-hidden transition-all hover:border-fuchsia-500/40"><div className="absolute top-0 left-0 w-2.5 h-full bg-fuchsia-600 shadow-[0_0_20px_#d946ef]" /><h4 className="text-3xl font-medium text-white leading-snug tracking-tight">"{q.text}"</h4><div className="grid grid-cols-1 gap-6">{q.options.slice(0, 4).map((opt: any, i: number) => (<button key={i} onClick={() => setAns({...ans, [q.id]: {score: opt.score, text: opt.text}})} className={`p-10 rounded-[2.5rem] text-left transition-all border-2 text-[12px] font-black tracking-[0.1em] uppercase flex items-center gap-8 ${ans[q.id]?.text === opt.text ? 'bg-fuchsia-600/20 border-fuchsia-500 text-white shadow-2xl' : 'bg-black/60 border-white/10 text-slate-400 hover:border-white/30'}`}><div className={`w-6 h-6 rounded-full border-[4px] flex items-center justify-center shrink-0 ${ans[q.id]?.text === opt.text ? 'border-fuchsia-400 shadow-[0_0_10px_#d946ef]' : 'border-slate-800'}`}>{ans[q.id]?.text === opt.text && <div className="w-2.5 h-2.5 bg-fuchsia-400 rounded-full shadow-[0_0_15px_#d946ef]" />}</div><span>{opt.text}</span></button>))}</div></div>))}</div>
                <div className="flex gap-8 pt-12">{currentStep > 1 && <button onClick={() => setCurrentStep(p => p - 1)} className="px-14 py-7 bg-black border-2 border-white/10 text-slate-400 rounded-[2rem] font-black text-[12px] uppercase tracking-widest hover:bg-white/5 transition-all">PREVIOUS</button>}{currentStep < maxStep ? <button disabled={!isStepComplete} onClick={() => setCurrentStep(p => p + 1)} className={`flex-1 py-7 rounded-[2rem] font-black text-[12px] tracking-widest transition-all uppercase ${isStepComplete ? 'bg-fuchsia-600 text-white shadow-2xl' : 'bg-white/5 text-slate-800 cursor-not-allowed'}`}>CONTINUE</button> : <button disabled={!isStepComplete || loading} onClick={executeUplink} className={`flex-1 py-7 rounded-[2rem] font-black text-[12px] tracking-widest transition-all uppercase flex items-center justify-center gap-6 ${isStepComplete ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-2xl' : 'bg-white/5 text-slate-800 cursor-not-allowed'}`}>{submitStatus} <Zap size={22}/></button>}</div>
              </motion.div>
            )}

            {view === 'briefing' && (
              <motion.div key="briefing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[75vh]">
                 <div className="mb-24"><RobotFace size={40} ringSize="w-64 h-64" coreSize="w-40 h-40" /></div>
                 <motion.div className="flex flex-col items-center text-center space-y-10"><div className="px-8 py-3 rounded-full bg-emerald-500/20 border-2 border-emerald-400/50 text-emerald-400 text-[12px] font-black tracking-[0.7em] uppercase shadow-[0_0_30px_rgba(52,211,153,0.2)] animate-pulse">Uplink Confirmed</div><h2 className="text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-2xl">Transmission Received.</h2><p className="text-[16px] font-black text-white leading-relaxed tracking-[0.3em] uppercase max-w-2xl opacity-100">Halo <span className="text-fuchsia-400">{user.username}</span>, inisiasi kuis untuk topik <span className="text-fuchsia-400">{selectedDomain}</span> sekarang?</p></motion.div>
                 <div className="flex gap-10 mt-24"><button onClick={() => setView('assessment')} className="px-16 py-6 border-4 border-white/10 text-slate-400 rounded-[2.5rem] font-black text-[13px] tracking-[0.5em] uppercase hover:border-white/30 hover:text-white transition-all">Cancel</button><button onClick={handleStartMissionClick} className="px-16 py-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-[2.5rem] font-black text-[13px] tracking-[0.5em] shadow-[0_20px_60px_rgba(217,70,239,0.5)] hover:scale-105 transition-all uppercase flex items-center gap-6">Execute Protocol <Zap size={24} /></button></div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } }
        .animate-scan { animation: scan 6s linear infinite; position: absolute; z-index: 10; }
        .bg-hud-grid { background-image: linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px); background-size: 50px 50px; transform: perspective(800px) rotateX(45deg) scale(2.5); transform-origin: top; }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(217, 70, 239, 0.4); border-radius: 20px; border: 2px solid #000; }
        ::-webkit-scrollbar { width: 0px; }
        ::selection { background: #d946ef; color: white; }
      `}} />
    </div>
  );
}