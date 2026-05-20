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

// --- ASSETS ---
const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

// --- 1. EFEK KLIK (PARTICLE BURST) ---
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
          <motion.div key={p.id} initial={{ scale: 0, opacity: 1, x: p.x, y: p.y }} animate={{ scale: [0, 1.5, 0], opacity: [1, 0.8, 0], x: p.x + Math.cos(p.angle) * p.velocity, y: p.y + Math.sin(p.angle) * p.velocity }} transition={{ duration: 0.8 }} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500 shadow-[0_0_20px_#d946ef]" style={{ width: '4px', height: '4px' }} />
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- 2. BACKGROUND COMPONENT (FIXED: NO WHITISH OVEREXPOSURE) ---
const PersistentUniverse = React.memo(({ bgIdx }: { bgIdx: number }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#020106]">
      <AnimatePresence mode="wait">
        <motion.img 
          key={bgIdx} 
          src={CYBER_ASSETS[bgIdx]} 
          initial={{ opacity: 0, scale: 1.1 }} 
          animate={{ opacity: 0.15, scale: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 5 }} 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-lighten" 
        />
      </AnimatePresence>
      
      {/* Deep black gradients to remove the "whitish" feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020106]/40 via-transparent to-[#020106]/95 pointer-events-none" />
      <div className="absolute inset-0 bg-hud-grid opacity-20 pointer-events-none" />
      
      {/* Very subtle glow only in the center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(217,70,239,0.03)_0%,transparent_70%)] pointer-events-none" />
    </div>
  );
});
PersistentUniverse.displayName = 'PersistentUniverse';

// --- 3. ROBOT AI INTERAKTIF ---
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
      <div className={`absolute ${ringSize} border-[1px] border-dashed border-fuchsia-500/30 rounded-full animate-[spin_15s_linear_infinite]`} />
      <div className={`relative ${coreSize} bg-[#050508] border-2 border-fuchsia-500/60 rounded-full shadow-[0_0_40px_rgba(217,70,239,0.4)] flex items-center justify-center z-10 overflow-hidden`}>
         <motion.div animate={{ x: offset.x, y: offset.y }} transition={{ type: "spring", stiffness: 150 }} className="flex flex-col items-center">
           <div className="flex gap-4 mb-2">
             <div className="w-2.5 h-4 bg-fuchsia-400 rounded-full shadow-[0_0_10px_#d946ef] animate-pulse" />
             <div className="w-2.5 h-4 bg-fuchsia-400 rounded-full shadow-[0_0_10px_#d946ef] animate-pulse" />
           </div>
           <svg viewBox="0 0 24 24" width={size} height={size} className="text-fuchsia-400 drop-shadow-[0_0_8px_#d946ef]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M7 14s2 2 5 2 5-2 5-2" /></svg>
         </motion.div>
      </div>
    </div>
  );
};

// --- 4. DATA HELPER ---
const getReadinessData = (score: number) => {
  if (score >= 80) return { label: "EXCELLENT", color: "#d946ef", bg: "bg-fuchsia-600", text: "text-fuchsia-400" };
  if (score >= 50) return { label: "AVERAGE", color: "#eab308", bg: "bg-yellow-600", text: "text-yellow-400" };
  return { label: "POOR", color: "#ef4444", bg: "bg-red-600", text: "text-red-400" };
};

const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } } as any;
const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } } as any;
const portalTransition = { initial: { opacity: 0, scale: 0.98, y: 15 }, animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, type: "spring" } }, exit: { opacity: 0, scale: 1.02 } } as any;

export default function StudentPortal() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  // States
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
    const interval = setInterval(() => setBgIdx(p => (p + 1) % CYBER_ASSETS.length), 8000);
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

      {/* --- SIDEBAR (DEEP CONTRAST) --- */}
      <motion.aside initial={false} animate={{ width: isSidebarCollapsed ? 80 : 260 }} className="h-screen bg-[#05050A]/95 backdrop-blur-3xl border-r border-white/5 flex flex-col z-[100] transition-all duration-500 shadow-[20px_0_60px_rgba(0,0,0,0.8)]">
        <div className="h-20 px-6 flex items-center justify-between border-b border-white/5">
          {!isSidebarCollapsed && <div className="flex flex-col"><span className="font-black text-white uppercase text-[11px] tracking-widest leading-none">CYBER READINESS</span><span className="font-bold text-fuchsia-500 text-[9px] tracking-widest mt-1 uppercase">INDEX PLATFORM</span></div>}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 text-slate-400 hover:text-fuchsia-400 transition-all border border-white/5 rounded-lg">
             {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-3">
          <button onClick={() => setView('dashboard')} className={`w-full flex items-center p-3.5 rounded-xl transition-all gap-4 ${view === 'dashboard' ? 'bg-fuchsia-600/10 text-fuchsia-400 border border-fuchsia-500/20 shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}><LayoutGrid size={20} />{!isSidebarCollapsed && <span className="font-bold text-[9px] tracking-[0.2em] uppercase">BERANDA</span>}</button>
          <button onClick={() => setView('assessment')} className={`w-full flex items-center p-3.5 rounded-xl transition-all gap-4 ${view === 'assessment' || view === 'mission' || view === 'briefing' ? 'bg-fuchsia-600/10 text-fuchsia-400 border border-fuchsia-500/20 shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}><Target size={20} />{!isSidebarCollapsed && <span className="font-bold text-[9px] tracking-widest uppercase">ASSESSMENT</span>}</button>
          <button onClick={() => setView('reports')} className={`w-full flex items-center p-3.5 rounded-xl transition-all gap-4 ${view === 'reports' ? 'bg-fuchsia-600/10 text-fuchsia-400 border border-fuchsia-500/20 shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}><BarChart3 size={20} />{!isSidebarCollapsed && <span className="font-bold text-[9px] tracking-widest uppercase">REPORT</span>}</button>
        </nav>
        <div className="p-6 border-t border-white/5"><button onClick={() => router.push('/')} className="w-full flex items-center justify-center p-3 bg-red-950/20 text-red-500 border border-red-500/20 rounded-xl gap-4 font-bold text-[9px] tracking-widest uppercase hover:bg-red-600 hover:text-white transition-all"><Power size={18} /> {!isSidebarCollapsed && "SHUTDOWN"}</button></div>
      </motion.aside>

      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-10 border-b border-white/5 bg-black/40 backdrop-blur-xl">
            <div className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full shadow-inner"><div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_15px_#34d399]" /><span className="text-[9px] font-black text-slate-200 uppercase tracking-widest">SECURE LINK ENCRYPTED</span></div>
            <div className="flex items-center gap-6 text-right"><div className="hidden sm:block"><p className="text-[11px] font-black text-white tracking-widest uppercase">{user.username}</p><p className="text-[9px] font-bold text-fuchsia-400 uppercase tracking-[0.2em] mt-1">OPERATIVE MODE</p></div><div className="w-11 h-11 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_20px_rgba(217,70,239,0.3)]"><User size={20} /></div></div>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar px-10 lg:px-12 py-8" ref={scrollRef}>
          <AnimatePresence mode="wait">
            
            {/* VIEW DASHBOARD (HIGH CONTRAST & CLEAN) */}
            {view === 'dashboard' && (
              <motion.div key="dash" variants={containerVariants} initial="hidden" animate="show" className="max-w-[1300px] mx-auto space-y-12">
                
                <motion.div variants={itemVariants} className="text-center space-y-4 pt-4">
                  <div className="text-fuchsia-400 font-black text-[11px] tracking-[0.6em] uppercase mb-2 flex items-center justify-center gap-3"><Zap size={14} className="fill-current"/> {getGreeting()} OPERATIVE</div>
                  <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">{getGreeting()}, <span className="text-fuchsia-500">{user.username}.</span></h1>
                  <p className="text-slate-400 text-[12px] font-bold tracking-[0.3em] uppercase max-w-xl mx-auto opacity-100">Accessing secure personnel dossier and system analytics v2.1</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   {/* Profile Card (Centered & Glossy) */}
                   <motion.div variants={itemVariants} className="bg-[#0a0a0f]/90 border border-white/5 p-10 rounded-[3rem] flex flex-col items-center justify-center text-center hover:border-fuchsia-500/40 transition-all shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-fuchsia-500 shadow-[0_0_15px_#d946ef] animate-scan opacity-0 group-hover:opacity-100" />
                        <div className="w-20 h-20 bg-gradient-to-b from-fuchsia-600 to-indigo-900 rounded-[1.8rem] flex items-center justify-center text-white border border-white/10 mb-8 shadow-2xl transform group-hover:scale-110 transition-all duration-500"><Fingerprint size={36} /></div>
                        <h4 className="text-2xl font-black text-white tracking-widest uppercase">{user.username}</h4>
                        <p className="text-[10px] text-fuchsia-400 font-black tracking-[0.4em] uppercase mt-4 opacity-100">{user.class_name || "NOT ASSIGNED"}</p>
                   </motion.div>

                   {/* Average Score (HUD Ring) */}
                   <motion.div variants={itemVariants} className="bg-[#0a0a0f]/90 border border-white/5 p-10 rounded-[3rem] flex flex-col items-center justify-center hover:border-fuchsia-500/40 transition-all shadow-2xl group">
                      <div className="relative mb-6 flex justify-center w-full">
                        <div className="absolute inset-0 rounded-full bg-fuchsia-500/5 blur-2xl group-hover:bg-fuchsia-500/10 transition-all" />
                        <svg className="w-40 h-40 transform -rotate-90">
                          <circle cx="80" cy="80" r="72" stroke="rgba(255,255,255,0.03)" strokeWidth="8" fill="transparent" />
                          <motion.circle initial={{ strokeDasharray: "0 1000" }} animate={{ strokeDasharray: `${(score / 100) * 452} 1000` }} transition={{ duration: 2.5, ease: "circOut" }} cx="80" cy="80" r="72" stroke="#d946ef" strokeWidth="8" strokeLinecap="round" fill="transparent" style={{ filter: 'drop-shadow(0 0 15px rgba(217,70,239,0.8))' }} />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-6xl font-black text-white tracking-tighter">{score}</span>
                          <span className="text-[8px] font-black text-slate-500 uppercase mt-1 tracking-widest">AVG SCORE</span>
                        </div>
                      </div>
                      <div className={`px-8 py-2 rounded-full border border-white/10 text-[10px] font-black tracking-widest uppercase bg-black/40 ${readiness.text} shadow-lg shadow-black/50`}>{readiness.label}</div>
                   </motion.div>

                   {/* System Metrics (Detailed) */}
                   <motion.div variants={itemVariants} className="bg-[#0a0a0f]/90 border border-white/5 p-10 rounded-[3rem] hover:border-fuchsia-500/40 transition-all shadow-2xl flex flex-col items-center justify-center text-center group">
                      <p className="text-[10px] font-black text-slate-500 tracking-[0.5em] mb-12 uppercase flex items-center gap-3"><Activity size={16} className="text-fuchsia-500 animate-pulse"/> SYSTEM METRICS</p>
                      <div className="space-y-6 font-mono text-[10px] tracking-[0.2em] text-slate-300 w-full px-4">
                        {[ {l:'HOST', v:'VERCEL', c:'text-fuchsia-400'}, {l:'CRYPT', v:'AES-256', c:'text-emerald-500'}, {l:'DATA', v:'AIVEN CLOUD', c:'text-white'} ].map((x,i)=>(
                           <div key={i} className="flex justify-between border-b border-white/5 pb-3"><span>{x.l}</span><span className={`${x.c} font-black`}>{x.v}</span></div>
                        ))}
                      </div>
                   </motion.div>

                   {/* --- BROADCAST CENTER (THE MISSING BOX FIXED) --- */}
                   <motion.div variants={itemVariants} className="lg:col-span-3 bg-gradient-to-br from-[#0a0a14] to-[#020202] border border-white/10 p-10 rounded-[4rem] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] group hover:border-fuchsia-500/40 transition-all duration-700">
                      <div className="absolute inset-0 bg-hud-grid opacity-30" />
                      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 blur-[100px] rounded-full -z-10" />
                      
                      <div className="flex items-center gap-10 z-10 text-center lg:text-left">
                        <div className="w-20 h-20 bg-black/80 rounded-3xl flex items-center justify-center shrink-0 border border-white/10 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                          <BellRing size={36} className="text-fuchsia-500 fill-current animate-bounce" />
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-center lg:justify-start gap-4">
                             <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-ping" />
                             <span className="text-[11px] font-black tracking-[0.6em] text-emerald-400 uppercase">Protocol: Active</span>
                          </div>
                          <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight">Readiness Test Protocol Initiated.</h3>
                          <p className="text-[11px] font-bold text-slate-400 tracking-widest max-w-2xl uppercase opacity-90 leading-relaxed">Launch diagnostic assessment now to validate personnel info-security compliance.</p>
                        </div>
                      </div>
                      
                      <button onClick={handleStartMissionClick} className="px-14 py-7 bg-white text-black rounded-3xl font-black text-[12px] tracking-[0.5em] hover:bg-fuchsia-600 hover:text-white transition-all duration-500 shadow-2xl flex items-center gap-6 uppercase z-10 group/btn">
                        INITIALIZE TEST <Zap size={20} className="group-hover/btn:translate-y-[-2px] transition-transform" />
                      </button>
                   </motion.div>
                </div>
              </motion.div>
            )}

            {/* VIEW REPORTS - RESULTS (HIGH CONTRAST) */}
            {view === 'reports' && (
              <motion.div key="reports" variants={containerVariants} initial="hidden" animate="show" className="max-w-6xl mx-auto space-y-12">
                 <motion.div variants={itemVariants} className="space-y-4 text-center">
                    <h2 className="text-6xl font-black text-white tracking-widest uppercase drop-shadow-xl">Evaluation Reports.</h2>
                    <p className="text-fuchsia-400 text-[12px] font-black tracking-[0.6em] uppercase">Historical Performance Summary</p>
                 </motion.div>

                 <motion.div variants={itemVariants} className="bg-[#0a0a0f]/95 backdrop-blur-3xl border border-white/5 rounded-[4rem] p-16 shadow-2xl relative overflow-hidden text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 relative z-10">
                        <div className="bg-black border border-white/5 rounded-[3rem] p-10 flex flex-col items-center hover:scale-105 transition-all shadow-inner"><p className="text-[10px] text-slate-500 font-black tracking-[0.5em] mb-4 uppercase">MODULES</p><p className="text-6xl text-white font-black font-mono tracking-tighter">{history.length}</p></div>
                        <div className="bg-black border border-white/5 rounded-[3rem] p-10 flex flex-col items-center hover:scale-105 transition-all shadow-inner"><p className="text-[10px] text-slate-500 font-black tracking-[0.5em] mb-4 uppercase">PRECISION</p><p className="text-6xl text-fuchsia-400 font-black font-mono tracking-tighter">{score}%</p></div>
                        <div className="bg-black border border-white/5 rounded-[3rem] p-10 flex flex-col items-center hover:scale-105 transition-all shadow-inner"><p className="text-[10px] text-slate-500 font-black tracking-[0.5em] mb-4 uppercase">RATING</p><p className={`text-2xl font-black tracking-[0.3em] uppercase mt-2 ${readiness.text}`}>{readiness.label}</p></div>
                    </div>

                    <div className="relative z-10 bg-black/60 border border-white/10 rounded-[3rem] overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
                      <table className="w-full text-center border-collapse">
                        <thead>
                          <tr className="border-b-2 border-white/10 bg-white/[0.04]">
                            <th className="py-8 text-[11px] font-black tracking-[0.6em] text-white uppercase">ID</th>
                            <th className="py-8 text-[11px] font-black tracking-[0.6em] text-white uppercase">Target Sector</th>
                            <th className="py-8 text-[11px] font-black tracking-[0.6em] text-white uppercase">Result Metric</th>
                            <th className="py-8 text-[11px] font-black tracking-[0.6em] text-white uppercase">Detailed Dossier</th>
                          </tr>
                        </thead>
                        <tbody className="text-white">
                           {history.length === 0 ? (
                              <tr><td colSpan={4} className="py-32 text-slate-700 font-black text-sm uppercase tracking-[0.8em] animate-pulse">NO SYSTEM RECORDS FOUND</td></tr>
                           ) : (
                              history.map((h, i) => (
                                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.03] transition-all group">
                                  <td className="py-10 text-[14px] font-black font-mono text-fuchsia-500 opacity-60 group-hover:opacity-100">#0{history.length - i}</td>
                                  <td className="py-10 text-[14px] font-black uppercase tracking-widest">{h.domain_id}</td>
                                  <td className="py-10 font-black font-mono text-2xl tracking-tighter text-white">{h.score}%</td>
                                  <td className="py-10"><button onClick={() => setDetailModal(h.details || [])} className="mx-auto flex items-center gap-4 px-10 py-4 bg-[#0a0a0f] border border-white/10 hover:border-fuchsia-500/60 text-white rounded-3xl text-[11px] font-black tracking-[0.4em] transition-all uppercase shadow-2xl"><Eye size={18} /> OPEN ANALYTICS</button></td>
                                </tr>
                              ))
                           )}
                        </tbody>
                      </table>
                    </div>
                 </motion.div>
              </motion.div>
            )}

            {/* Assessment View (Centered Modules) */}
            {view === 'assessment' && (
              <motion.div key="assess-hub" variants={containerVariants} initial="hidden" animate="show" className="max-w-6xl mx-auto space-y-16">
                <motion.div variants={itemVariants} className="text-center space-y-4"><h2 className="text-6xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-2xl">Assessment Portal.</h2><p className="text-fuchsia-400 text-[12px] font-black tracking-[0.6em] uppercase">Select strategic sector for diagnostics</p></motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {TACTICAL_DOMAINS.map((domain, i) => {
                    const done = history.some(h => String(h.domain_id).toLowerCase().includes(domain.id.split(' ')[0].toLowerCase()));
                    return (
                      <motion.div key={i} variants={itemVariants} whileHover={{ y: -12, scale: 1.02 }} onClick={() => { if(done) { setPendingDomain(domain.id); setShowRetakeWarning(true); } else { setSelectedDomain(domain.id); setView('briefing'); } }} className={`bg-[#0a0a14]/90 border-2 ${done ? 'border-fuchsia-500/50 shadow-[0_0_30px_rgba(217,70,239,0.1)]' : 'border-white/10'} p-12 rounded-[4rem] cursor-pointer group transition-all duration-500 shadow-2xl relative overflow-hidden`}><div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" /><div className="flex justify-between items-start mb-12"><div className="w-18 h-18 rounded-[2rem] flex items-center justify-center shadow-2xl" style={{ backgroundColor: `${domain.color}15`, border: `1px solid ${domain.color}40` }}><domain.icon size={32} style={{ color: domain.color }} /></div>{done && <div className="bg-fuchsia-600 px-4 py-1.5 rounded-full border border-white/10 shadow-lg"><span className="text-[10px] font-black text-white tracking-widest uppercase">Verified</span></div>}</div><h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter leading-none">{domain.title}</h3><p className="text-[12px] text-slate-500 font-medium tracking-widest uppercase mb-12 leading-relaxed opacity-80">{domain.desc}</p><div className="mt-auto pt-8 border-t-2 border-white/5 flex justify-end items-center"><span className="text-[11px] font-black tracking-[0.5em] text-fuchsia-400 group-hover:translate-x-3 transition-all uppercase">INITIALIZE <ArrowRight size={18} className="inline ml-4" /></span></div></motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Mission & Briefing (High Contrast) */}
            {view === 'briefing' && (
              <motion.div key="briefing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[75vh]">
                 <div className="mb-24"><RobotFace size={40} ringSize="w-64 h-64" coreSize="w-40 h-40" /></div>
                 <motion.div className="flex flex-col items-center text-center space-y-10"><div className="px-8 py-3 rounded-full bg-emerald-500/10 border-2 border-emerald-400 text-emerald-400 text-[12px] font-black tracking-[0.7em] uppercase shadow-[0_0_30px_rgba(52,211,153,0.2)] animate-pulse">Uplink Confirmed</div><h2 className="text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-2xl">Transmission Received.</h2><p className="text-[16px] font-black text-white leading-relaxed tracking-[0.3em] uppercase max-w-2xl">Halo <span className="text-fuchsia-400">{user.username}</span>, inisiasi protokol evaluasi untuk sektor <span className="text-fuchsia-400">{selectedDomain}</span> sekarang?</p></motion.div>
                 <div className="flex gap-10 mt-24"><button onClick={() => setView('assessment')} className="px-16 py-6 border-4 border-white/10 text-slate-400 rounded-[2.5rem] font-black text-[13px] tracking-[0.5em] uppercase hover:border-white/30 hover:text-white transition-all">Abort Mission</button><button onClick={handleStartMissionClick} className="px-16 py-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-[2.5rem] font-black text-[13px] tracking-[0.5em] shadow-[0_20px_60px_rgba(217,70,239,0.5)] hover:scale-105 transition-all uppercase flex items-center gap-6">Begin Protocol <Zap size={24} /></button></div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } }
        .animate-scan { animation: scan 6s linear infinite; }
        .bg-hud-grid { background-image: linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px); background-size: 60px 60px; transform: perspective(800px) rotateX(45deg) scale(2.5); transform-origin: top; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(217, 70, 239, 0.4); border-radius: 20px; }
        ::-webkit-scrollbar { width: 0px; }
        ::selection { background: #d946ef; color: white; }
      `}} />
    </div>
  );
}