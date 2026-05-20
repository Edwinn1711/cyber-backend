"use client"
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShieldCheck, Brain, Target, ChevronRight, ChevronLeft, Zap, ArrowLeft, ArrowRight,
  Fingerprint, Power, BarChart3, Activity, ShieldAlert, Cpu, Globe, Lock, 
  Radar as RadarIcon, Terminal, Database, Server, Search, Radio, Bug, MailWarning, 
  Sparkles, AlertTriangle, Eye, CheckCircle2, XCircle, X, User, Info, 
  ShieldQuestion, LayoutGrid, Check, BellRing, Bot, ScanLine, Laptop, Workflow, FileText, TrendingUp
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts'

// --- ASSET & CONFIG ---
const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

const TACTICAL_DOMAINS = [
  { id: "Social Engineering", title: "SOCIAL ENGINEERING", icon: Brain, color: "#d946ef", desc: "Psychological Defense Operations" },
  { id: "Malware", title: "MALWARE ANALYSIS", icon: Bug, color: "#F87171", desc: "Malicious Code Detection" },
  { id: "Phishing", title: "PHISHING DEFENSE", icon: MailWarning, color: "#818CF8", desc: "Credential Security Audit" },
  { id: "Network", title: "NETWORK SECURITY", icon: Globe, color: "#34D399", desc: "Traffic Encryption Control" },
  { id: "Privilege", title: "ACCESS CONTROL", icon: Lock, color: "#d8b4fe", desc: "Privilege Escalation Defense" },
  { id: "Threat", title: "THREAT HUNTING", icon: RadarIcon, color: "#FB923C", desc: "Proactive Breach Search" },
];

// --- HELPER: STATUS COLORS ---
const getReadinessData = (score: number) => {
  if (score >= 80) return { label: "EXCELLENT", color: "#d946ef", bg: "bg-fuchsia-600", text: "text-fuchsia-400" };
  if (score >= 50) return { label: "AVERAGE", color: "#eab308", bg: "bg-yellow-600", text: "text-yellow-400" };
  return { label: "POOR", color: "#ef4444", bg: "bg-red-600", text: "text-red-400" };
};

// --- 1. CLICK EFFECT (HOLOGRAPHIC BURST) ---
const ParticleBurstClickEffect = () => {
  const [particles, setParticles] = useState<any[]>([]);
  useEffect(() => {
    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
      const newParticles = Array.from({ length: 8 }).map((_, i) => ({
        id: Math.random(), x: clientX, y: clientY, angle: (Math.PI * 2 / 8) * i, velocity: Math.random() * 60 + 20
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
          <motion.div key={p.id} initial={{ scale: 0, opacity: 1, x: p.x, y: p.y }} animate={{ scale: [0, 1.2, 0], opacity: [1, 0.5, 0], x: p.x + Math.cos(p.angle) * p.velocity, y: p.y + Math.sin(p.angle) * p.velocity }} transition={{ duration: 0.8 }} className="absolute rounded-full bg-fuchsia-400 shadow-[0_0_15px_#d946ef]" style={{ width: '4px', height: '4px' }} />
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- 2. BACKGROUND COMPONENT ---
const PersistentUniverse = React.memo(({ bgIdx }: { bgIdx: number }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#020106]">
      <AnimatePresence mode="wait">
        <motion.img key={bgIdx} src={CYBER_ASSETS[bgIdx]} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 0.15, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 5 }} className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-lighten" />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020106]/40 via-transparent to-[#020106]/98 pointer-events-none" />
      <div className="absolute inset-0 bg-hud-grid opacity-20 pointer-events-none" />
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
      const moveX = ((e.clientX - (rect.left + rect.width / 2)) / window.innerWidth) * 30;
      const moveY = ((e.clientY - (rect.top + rect.height / 2)) / window.innerHeight) * 30;
      setOffset({ x: moveX, y: moveY });
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

// --- 4. ANIMATION CONFIG (PRECISION FOCUS) ---
const containerVariants = { 
  hidden: { opacity: 0 }, 
  show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } } 
} as any;

const itemVariants = { 
  hidden: { opacity: 0, y: 15 }, 
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } } 
} as any;

const portalTransition = { 
  initial: { opacity: 0, scale: 0.98, y: 15 }, 
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }, 
  exit: { opacity: 0, scale: 1.02, transition: { duration: 0.2 } } 
} as any;

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
  const [showClassSelector, setShowClassSelector] = useState(false);

  const readiness = useMemo(() => getReadinessData(score), [score]);
  
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
    setUser(updatedUser); 
    localStorage.setItem('user', JSON.stringify(updatedUser)); 
    setShowClassSelector(false); 
    setView('mission'); 
    setCurrentStep(1);
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

  const currentStepQs = useMemo(() => {
    return allQs.filter(q => q.main_domain.toLowerCase().trim() === selectedDomain.toLowerCase().trim() && q.type === `step${currentStep}`);
  }, [allQs, currentStep, selectedDomain]);

  const maxStep = useMemo(() => {
    const domainQs = allQs.filter(q => q.main_domain.toLowerCase().trim() === selectedDomain.toLowerCase().trim());
    return domainQs.length === 0 ? 0 : Math.max(...domainQs.map(q => parseInt(q.type.replace('step', ''))));
  }, [allQs, selectedDomain]);

  const isStepComplete = useMemo(() => currentStepQs.length > 0 && currentStepQs.every(q => ans[q.id] !== undefined), [currentStepQs, ans]);

  const radarData = useMemo(() => {
    const domains = ["Social", "Malware", "Phishing", "Network", "Threat", "Access"];
    return domains.map(d => {
      const entry = history.find(h => String(h.domain_id).toLowerCase().includes(d.toLowerCase()));
      return { subject: d.toUpperCase(), A: entry ? entry.score : 0, fullMark: 100 };
    });
  }, [history]);

  const submitAppFeedback = async () => {
    alert("Function active. Gmail connected.");
  };

  if (!isAuthorized) return null;

  return (
    <div className="flex h-screen w-full text-slate-100 overflow-hidden font-sans selection:bg-fuchsia-500/30">
      <PersistentUniverse bgIdx={bgIdx} />
      <ParticleBurstClickEffect />

      {/* --- SIDEBAR --- */}
      <motion.aside initial={false} animate={{ width: isSidebarCollapsed ? 80 : 240 }} className="h-screen bg-[#05050A]/95 backdrop-blur-3xl border-r border-white/10 flex flex-col z-[100] transition-all duration-500 shadow-2xl">
        <div className="h-20 px-6 flex items-center justify-between border-b border-white/10">
          {!isSidebarCollapsed && <div className="flex flex-col"><span className="font-black text-white uppercase text-[11px] tracking-widest leading-none">CYBER READINESS</span><span className="font-bold text-fuchsia-500 text-[9px] tracking-widest mt-1 uppercase">INDEX</span></div>}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 text-slate-400 hover:text-fuchsia-400 transition-all border border-white/5 rounded-lg">
             {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-3">
          {[ { id: 'dashboard', label: 'BERANDA', icon: LayoutGrid }, { id: 'assessment', label: 'ASSESSMENT', icon: Target }, { id: 'reports', label: 'REPORT', icon: FileText } ].map((item) => (
            <button key={item.id} onClick={() => setView(item.id)} className={`w-full flex items-center p-3.5 rounded-xl transition-all gap-4 ${view === item.id ? 'bg-fuchsia-600/20 text-white border border-fuchsia-500/40 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <item.icon size={18} /> {!isSidebarCollapsed && <span className="font-bold text-[10px] tracking-widest uppercase">{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-white/10"><button onClick={() => router.push('/')} className="w-full flex items-center p-3 text-red-500 hover:bg-red-500/10 rounded-xl gap-4 font-bold text-[9px] tracking-widest uppercase hover:bg-red-600 hover:text-white transition-all"><Power size={18} /> {!isSidebarCollapsed && "SHUTDOWN"}</button></div>
      </motion.aside>

      {/* --- CONTENT --- */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-10 border-b border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/20 rounded-full shadow-inner"><div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_15px_#34d399]" /><span className="text-[9px] font-black text-slate-200 uppercase tracking-widest">GATEWAY ACTIVE</span></div>
            <div className="flex items-center gap-6 text-right"><div className="hidden sm:block"><p className="text-[12px] font-black text-white tracking-widest uppercase">{user.username}</p><p className="text-[10px] font-bold text-fuchsia-400 uppercase tracking-[0.2em] mt-1">OPERATIVE MODE</p></div><div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-fuchsia-600 rounded-full flex items-center justify-center border border-white/20 shadow-lg"><User size={20} /></div></div>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar px-10 lg:px-14 py-10" ref={scrollRef}>
          <AnimatePresence mode="wait">
            
            {/* VIEW DASHBOARD */}
            {view === 'dashboard' && (
              <motion.div key="dash" variants={containerVariants} initial="hidden" animate="show" exit={{opacity:0, y:-10}} className="max-w-[1300px] mx-auto space-y-12">
                <motion.div variants={itemVariants} className="text-center space-y-4 pt-4">
                  <div className="text-fuchsia-400 font-black text-[11px] tracking-[0.6em] uppercase mb-2 flex items-center justify-center gap-3">{getGreeting()} OPERATIVE</div>
                  <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">{getGreeting()}, <span className="text-fuchsia-500">{user.username}.</span></h1>
                  <p className="text-slate-400 text-[12px] font-bold tracking-[0.3em] uppercase max-w-xl mx-auto opacity-100">Cyber Readiness Index Protocol Gateway v2.1</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   <motion.div variants={itemVariants} whileHover={{y:-5}} transition={{type:'spring',stiffness:400,damping:20}} className="bg-[#0a0a0f]/90 border border-white/5 p-10 rounded-[3rem] flex flex-col items-center justify-center text-center hover:border-fuchsia-500/40 transition-all shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-fuchsia-500 shadow-[0_0_15px_#d946ef] animate-scan opacity-0 group-hover:opacity-100" />
                        <div className="w-20 h-20 bg-gradient-to-b from-fuchsia-600 to-indigo-900 rounded-3xl flex items-center justify-center text-white border border-white/10 mb-8 transform group-hover:scale-110 transition-all duration-500"><Fingerprint size={36} /></div>
                        <h4 className="text-2xl font-black text-white tracking-widest uppercase leading-none">{user.username}</h4>
                        <p className="text-[10px] text-fuchsia-400 font-black tracking-[0.4em] uppercase mt-4">{user.class_name || "NOT ASSIGNED"}</p>
                   </motion.div>
                   <motion.div variants={itemVariants} whileHover={{y:-5}} transition={{type:'spring',stiffness:400,damping:20}} className="bg-[#0a0a0f]/90 border border-white/5 p-10 rounded-[3rem] flex flex-col items-center justify-center hover:border-fuchsia-500/40 transition-all shadow-2xl group">
                      <div className="relative mb-6 flex justify-center w-full transform group-hover:scale-105 transition-all">
                        <svg className="w-40 h-40 transform -rotate-90">
                          <circle cx="80" cy="80" r="72" stroke="rgba(255,255,255,0.03)" strokeWidth="8" fill="transparent" />
                          <motion.circle initial={{ strokeDasharray: "0 1000" }} animate={{ strokeDasharray: `${(score / 100) * 452} 1000` }} transition={{ duration: 2.5, ease: "circOut" }} cx="80" cy="80" r="72" stroke="#d946ef" strokeWidth="8" strokeLinecap="round" fill="transparent" style={{ filter: 'drop-shadow(0 0 15px rgba(217,70,239,0.8))' }} />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-6xl font-black text-white tracking-tighter">{score}</span>
                          <span className="text-[8px] font-black text-slate-500 uppercase mt-1">AVG SCORE</span>
                        </div>
                      </div>
                      <div className={`px-8 py-2 rounded-full border border-white/10 text-[10px] font-black tracking-widest uppercase bg-black/40 ${readiness.text} shadow-lg shadow-black/50`}>{readiness.label}</div>
                   </motion.div>
                   <motion.div variants={itemVariants} whileHover={{y:-5}} transition={{type:'spring',stiffness:400,damping:20}} className="bg-[#0a0a0f]/90 border border-white/5 p-10 rounded-[3rem] hover:border-fuchsia-500/40 transition-all shadow-2xl flex flex-col justify-between group text-center"><p className="text-[10px] font-black text-slate-500 tracking-[0.5em] mb-10 uppercase flex items-center justify-center gap-3"><Activity size={16} className="text-fuchsia-500 animate-pulse"/> SYSTEM ANALYTICS</p>
                      <div className="space-y-6 font-mono text-[10px] tracking-[0.2em] text-slate-300 w-full px-4">
                        <div className="flex justify-between border-b border-white/5 pb-3"><span>HOST</span><span className="text-fuchsia-400 font-bold uppercase">VERCEL</span></div>
                        <div className="flex justify-between border-b border-white/5 pb-3"><span>SECURITY</span><span className="text-emerald-500 font-bold uppercase">AES-256</span></div>
                        <div className="flex justify-between"><span>DATABASE</span><span className="text-white font-bold uppercase opacity-80">SINKRON</span></div>
                      </div>
                   </motion.div>
                   <motion.div variants={itemVariants} className="lg:col-span-3 bg-gradient-to-br from-[#0a0a14] to-[#020202] border border-white/10 p-10 rounded-[4rem] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] group hover:border-fuchsia-500/40 transition-all duration-700">
                      <div className="flex items-center gap-10 z-10 text-center lg:text-left"><div className="w-20 h-20 bg-black/80 rounded-3xl flex items-center justify-center shrink-0 border border-white/10 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"><BellRing size={36} className="text-fuchsia-500 animate-bounce" /></div><div className="space-y-3"><div className="flex items-center justify-center lg:justify-start gap-4"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-ping" /><span className="text-[10px] font-black tracking-[0.6em] text-emerald-400 uppercase">Mission Status: Active</span></div><h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight">Assessment Gateway Online.</h3><p className="text-[11px] font-bold text-slate-400 tracking-widest max-w-2xl uppercase opacity-90 leading-relaxed">Initiate your cyber defense validation protocols now to validate personnel security.</p></div></div>
                      <button onClick={handleStartMissionClick} className="px-14 py-7 bg-white text-black rounded-3xl font-black text-[12px] tracking-[0.5em] hover:bg-fuchsia-600 hover:text-white transition-all shadow-2xl flex items-center gap-6 uppercase z-10">START PROTOCOL <Zap size={20} /></button>
                   </motion.div>
                </div>
              </motion.div>
            )}

            {/* VIEW REPORTS - RESULTS */}
            {view === 'reports' && (
              <motion.div key="reports" variants={containerVariants} initial="hidden" animate="show" exit={{opacity:0, x:20}} className="max-w-[1400px] mx-auto space-y-10">
                 <motion.div variants={itemVariants} className="text-center space-y-4 pt-4"><div className="text-fuchsia-400 font-black text-[12px] tracking-[0.6em] uppercase flex items-center justify-center gap-3"><TrendingUp size={16}/> PERFORMANCE ANALYTICS</div><h2 className="text-5xl lg:text-6xl font-black text-white tracking-widest uppercase drop-shadow-2xl">Mission Intelligence.</h2><p className="text-slate-500 text-[11px] font-bold tracking-[0.4em] uppercase max-w-xl mx-auto opacity-100">Historical operative data records summary from secure cloud vaults.</p></motion.div>
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <motion.div variants={itemVariants} className="lg:col-span-7 bg-[#0a0a0f]/90 border border-white/10 rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden backdrop-blur-3xl group"><div className="flex-1 text-center md:text-left space-y-6"><p className="text-[11px] font-black text-slate-500 uppercase tracking-widest flex items-center justify-center md:justify-start gap-3"><RadarIcon size={14} className="text-fuchsia-400"/> READINESS BALANCE</p><div className="grid grid-cols-2 gap-4 pt-4">{[ {l:'OPERATIONS', v:history.length}, {l:'GLOBAL SCORE', v:score+'%'} ].map((x,i)=>(<div key={i} className="bg-black/50 p-6 rounded-3xl border border-white/5 shadow-inner hover:border-fuchsia-500/30 transition-all"><p className="text-[9px] font-black text-slate-500 mb-2 uppercase">{x.l}</p><p className="text-4xl font-black text-white font-mono tracking-tighter">{x.v}</p></div>))}</div></div><div className="w-full md:w-[320px] h-[300px] mt-10 md:mt-0"><ResponsiveContainer width="100%" height="100%"><RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}><PolarGrid stroke="rgba(255,255,255,0.05)" /><PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} /><Radar name="Score" dataKey="A" stroke="#d946ef" fill="#d946ef" fillOpacity={0.4} /><Tooltip contentStyle={{ backgroundColor: '#000', borderRadius: '12px', border: '1px solid #333' }} /></RadarChart></ResponsiveContainer></div></motion.div>
                    <motion.div variants={itemVariants} className="lg:col-span-5 bg-[#0a0a0f]/90 border border-white/10 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center shadow-2xl relative backdrop-blur-3xl group overflow-hidden"><div className={`p-10 rounded-[2.5rem] mb-8 border-2 shadow-2xl transform group-hover:scale-110 transition-all duration-700`} style={{ borderColor: `${readiness.color}30`, backgroundColor: `${readiness.color}05` }}><ShieldAlert size={80} style={{ color: readiness.color }} className="animate-pulse" /></div><p className="text-[11px] font-black text-slate-500 tracking-widest mb-2 uppercase">CLASSIFICATION</p><h3 className={`text-5xl font-black tracking-widest uppercase ${readiness.text}`} style={{ textShadow: `0 0 20px ${readiness.color}60` }}>{readiness.label}</h3></motion.div>
                 </div>
                 <motion.div variants={itemVariants} className="bg-[#0a0a0f]/80 border border-white/5 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden backdrop-blur-3xl"><div className="relative z-10 bg-black/40 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-inner"><table className="w-full text-center border-collapse"><thead><tr className="border-b-2 border-white/10 bg-white/[0.04]"><th className="py-7 text-[10px] font-black tracking-[0.6em] text-slate-400 uppercase">SESSION</th><th className="py-7 text-[10px] font-black tracking-[0.6em] text-slate-400 uppercase">OPERATIONAL SECTOR</th><th className="py-7 text-[10px] font-black tracking-[0.6em] text-slate-400 uppercase">ACCURACY</th><th className="py-7 text-[10px] font-black tracking-[0.6em] text-slate-400 uppercase">ACTION</th></tr></thead><tbody className="text-white font-bold">{history.map((h, i) => { const st = getReadinessData(h.score); return (<tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-all group"><td className="py-10 text-[13px] font-black font-mono text-fuchsia-400 opacity-60 group-hover:opacity-100">#0{history.length - i}</td><td className="py-10 text-[13px] font-black uppercase tracking-widest">{h.domain_id}</td><td className="py-10"><div className="flex flex-col items-center gap-3"><span className="text-2xl font-black font-mono tracking-tighter text-white">{h.score}%</span><div className="w-24 h-1.5 bg-black rounded-full overflow-hidden border border-white/5"><div className={`h-full ${st.bg} shadow-[0_0_10px_currentColor] transition-all duration-1000`} style={{ width: `${h.score}%`, color: st.color }} /></div></div></td><td className="py-10"><button onClick={() => setDetailModal(h.details || [])} className="mx-auto flex items-center gap-4 px-10 py-4 bg-[#0a0a0f] border-2 border-white/10 hover:border-fuchsia-500/60 text-white rounded-3xl text-[11px] font-black tracking-[0.4em] transition-all uppercase shadow-xl hover:shadow-fuchsia-500/20"><Eye size={20} /> ANALYZE</button></td></tr>)}))}</tbody></table></div></motion.div>
              </motion.div>
            )}

            {/* VIEW ASSESSMENT */}
            {view === 'assessment' && (
              <motion.div key="assess-hub" variants={containerVariants} initial="hidden" animate="show" exit={{opacity:0, scale:0.9}} className="max-w-6xl mx-auto space-y-16">
                <motion.div variants={itemVariants} className="text-center space-y-4 pt-6"><h2 className="text-6xl font-black text-white tracking-widest uppercase leading-none drop-shadow-2xl">Target Modules.</h2><p className="text-fuchsia-400 text-[12px] font-black tracking-[0.6em] uppercase">Select strategic sector for diagnostic protocol</p></motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {TACTICAL_DOMAINS.map((domain, i) => {
                    const done = history.some(h => String(h.domain_id).toLowerCase().includes(domain.id.split(' ')[0].toLowerCase()));
                    return (<motion.div key={i} variants={itemVariants} whileHover={{ y: -8, scale: 1.02 }} transition={{type:'spring',stiffness:400,damping:15}} onClick={() => { setSelectedDomain(domain.id); setView('briefing'); }} className={`bg-[#0a0a14]/90 border-2 ${done ? 'border-fuchsia-500/50 shadow-[0_0_30px_rgba(217,70,239,0.2)]' : 'border-white/10'} p-12 rounded-[4rem] cursor-pointer group transition-all duration-500 relative overflow-hidden`}><div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" /><div className="flex justify-between items-start mb-12"><div className="w-18 h-18 rounded-[2rem] flex items-center justify-center shadow-2xl" style={{ backgroundColor: `${domain.color}25`, border: `2px solid ${domain.color}50` }}><domain.icon size={32} style={{ color: domain.color }} /></div>{done && <div className="bg-fuchsia-600 px-5 py-2 rounded-full border border-white/20 shadow-lg"><span className="text-[10px] font-black text-white tracking-widest uppercase">Verified</span></div>}</div><h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter leading-none">{domain.title}</h3><p className="text-[12px] text-slate-300 font-bold tracking-widest uppercase mb-12 leading-relaxed opacity-90">{domain.desc}</p><div className="mt-auto pt-8 border-t-2 border-white/5 flex justify-end items-center"><span className="text-[11px] font-black tracking-[0.5em] text-fuchsia-400 group-hover:translate-x-3 transition-all uppercase">INITIALIZE <ArrowRight size={18} className="inline ml-4" /></span></div></motion.div>);
                  })}
                </div>
              </motion.div>
            )}

            {/* VIEW MISSION */}
            {view === 'mission' && (
              <motion.div key="mission" {...(portalTransition as any)} className="max-w-4xl mx-auto space-y-12 pb-44 text-center lg:text-left">
                <header className="flex justify-between items-end border-b-2 border-white/10 pb-10 pt-6"><div className="space-y-4"><button onClick={() => setView('assessment')} className="text-[11px] font-black text-slate-400 hover:text-red-400 flex items-center gap-4 tracking-widest uppercase transition-all"><ArrowLeft size={20} /> ABORT SESSION</button><h2 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">PHASE 0{currentStep}</h2><p className="text-fuchsia-500 font-black tracking-[0.6em] text-[12px] uppercase">PROTOCOL: {selectedDomain}</p></div><div className="text-[140px] font-black text-white/5 font-mono leading-none tracking-tighter">0{currentStep}</div></header>
                <div className="space-y-10">{currentStepQs.map((q) => (<div key={q.id} className="p-14 rounded-[4rem] bg-[#1a1a2e]/90 border-2 border-white/10 space-y-12 shadow-2xl relative overflow-hidden transition-all hover:border-fuchsia-500/40"><div className="absolute top-0 left-0 w-2.5 h-full bg-fuchsia-600 shadow-[0_0_20px_#d946ef]" /><h4 className="text-3xl font-medium text-white leading-snug tracking-tight">"{q.text}"</h4><div className="grid grid-cols-1 gap-6">{q.options.slice(0, 4).map((opt: any, i: number) => (<button key={i} onClick={() => setAns({...ans, [q.id]: {score: opt.score, text: opt.text}})} className={`p-10 rounded-[2.5rem] text-left transition-all border-2 text-[12px] font-black tracking-[0.1em] uppercase flex items-center gap-8 ${ans[q.id]?.text === opt.text ? 'bg-fuchsia-600/20 border-fuchsia-500 text-white shadow-2xl' : 'bg-black/60 border-white/10 text-slate-400 hover:border-white/30'}`}><div className={`w-6 h-6 rounded-full border-[4px] flex items-center justify-center shrink-0 ${ans[q.id]?.text === opt.text ? 'border-fuchsia-400 shadow-[0_0_10px_#d946ef]' : 'border-slate-800'}`}>{ans[q.id]?.text === opt.text && <div className="w-2.5 h-2.5 bg-fuchsia-400 rounded-full shadow-[0_0_15px_#d946ef]" />}</div><span>{opt.text}</span></button>))}</div></div>))}</div>
                <div className="flex gap-8 pt-12">{currentStep > 1 && <button onClick={() => setCurrentStep(p => p - 1)} className="px-14 py-7 bg-black border-2 border-white/10 text-slate-400 rounded-[2rem] font-black text-[12px] uppercase tracking-widest hover:bg-white/5 transition-all">PREVIOUS</button>}{currentStep < maxStep ? <button disabled={!isStepComplete} onClick={() => setCurrentStep(p => p + 1)} className={`flex-1 py-7 rounded-[2rem] font-black text-[12px] tracking-widest transition-all uppercase ${isStepComplete ? 'bg-fuchsia-600 text-white shadow-2xl' : 'bg-white/5 text-slate-800 cursor-not-allowed'}`}>CONTINUE</button> : <button disabled={!isStepComplete || loading} onClick={executeUplink} className={`flex-1 py-7 rounded-[2rem] font-black text-[12px] tracking-widest transition-all uppercase flex items-center justify-center gap-6 ${isStepComplete ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-2xl' : 'bg-white/5 text-slate-800 cursor-not-allowed'}`}>{submitStatus} <Zap size={22}/></button>}</div>
              </motion.div>
            )}

            {/* VIEW BRIEFING */}
            {view === 'briefing' && (
              <motion.div key="briefing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{opacity:0, scale:1.1}} className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[75vh]">
                 <div className="mb-24"><RobotFace size={40} ringSize="w-64 h-64" coreSize="w-40 h-40" /></div>
                 <motion.div className="flex flex-col items-center text-center space-y-10"><div className="px-8 py-3 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 text-[12px] font-black tracking-[0.7em] uppercase shadow-[0_0_30px_rgba(52,211,153,0.2)] animate-pulse">Uplink Confirmed</div><h2 className="text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-2xl">Transmission Received.</h2><p className="text-[16px] font-black text-white leading-relaxed tracking-[0.3em] uppercase max-w-2xl opacity-100">Halo <span className="text-fuchsia-400">{user.username}</span>, inisiasi kuis untuk topik <span className="text-fuchsia-400">{selectedDomain}</span> sekarang?</p></motion.div>
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
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(217, 70, 239, 0.5); border-radius: 20px; }
        ::-webkit-scrollbar { width: 0px; }
      `}} />
    </div>
  );
}