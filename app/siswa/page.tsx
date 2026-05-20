"use client"
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShieldCheck, Brain, Target, ChevronRight, ChevronLeft, Zap, ArrowLeft, ArrowRight,
  Fingerprint, Power, BarChart3, Activity, ShieldAlert, Cpu, Globe, Lock, 
  Radar, Terminal, Database, Server, Search, Radio, Bug, MailWarning, 
  Sparkles, AlertTriangle, Eye, CheckCircle2, XCircle, X, User, Info, 
  ShieldQuestion, LayoutGrid, Check, BellRing, Bot, ScanLine, Laptop, Workflow
} from 'lucide-react'

const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

// --- 1. SMOOTH PARTICLE BURST ---
const ParticleBurstClickEffect = () => {
  const [particles, setParticles] = useState<any[]>([]);
  useEffect(() => {
    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      const newParticles = Array.from({ length: 10 }).map((_, i) => ({
        id: Math.random(), x: clientX, y: clientY, angle: (Math.PI * 2 / 10) * i, velocity: Math.random() * 50 + 20
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
          <motion.div key={p.id} initial={{ scale: 0, opacity: 1, x: p.x, y: p.y }} animate={{ scale: [0, 1.2, 0], opacity: [1, 0.5, 0], x: p.x + Math.cos(p.angle) * p.velocity, y: p.y + Math.sin(p.angle) * p.velocity }} transition={{ duration: 0.8 }} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500 shadow-[0_0_15px_#d946ef]" style={{ width: '4px', height: '4px' }} />
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- 2. PERSISTENT UNIVERSE (MOVING GRID) ---
const PersistentUniverse = React.memo(({ bgIdx }: { bgIdx: number }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#020106]">
      <AnimatePresence mode="wait">
        <motion.img key={bgIdx} src={CYBER_ASSETS[bgIdx]} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 0.2, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 5 }} className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-lighten" />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-hud-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] pointer-events-none" />
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
      <div className={`absolute ${ringSize} border-[1px] border-dashed border-fuchsia-500/30 rounded-full animate-[spin_20s_linear_infinite]`} />
      <div className={`relative ${coreSize} bg-[#050505] border border-fuchsia-500/50 rounded-full shadow-[0_0_30px_rgba(217,70,239,0.3)] flex items-center justify-center z-10`}>
         <motion.div animate={{ x: offset.x, y: offset.y }} transition={{ type: "spring", stiffness: 150 }} className="flex flex-col items-center">
           <div className="flex gap-3 mb-2">
             <div className="w-2 h-3 bg-fuchsia-400 rounded-full shadow-[0_0_8px_#d946ef]" />
             <div className="w-2 h-3 bg-fuchsia-400 rounded-full shadow-[0_0_8px_#d946ef]" />
           </div>
           <div className="w-6 h-1 bg-fuchsia-400 rounded-full opacity-60" />
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

// Animasi Staggered
const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } };

export default function StudentGodTierDashboard() {
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
  const [submitStatus, setSubmitStatus] = useState('KIRIM JAWABAN');
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
        setScore(Math.round(data.reduce((acc, curr) => acc + curr.score, 0) / data.length));
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

  const executeUplink = async () => {
    setLoading(true); setSubmitStatus('SINKRONISASI...');
    const formattedAnswers = Object.keys(ans).map(id => ({ id: parseInt(id), value: ans[parseInt(id)].score.toString(), text: ans[parseInt(id)].text }));
    try {
      await fetch('https://cyber-backend-delta.vercel.app/siswa/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username, class_name: user.class_name, domain_id: selectedDomain, answers: formattedAnswers })
      });
      await fetchScores(user.username);
    } finally {
      setSubmitStatus('SELESAI');
      setTimeout(() => { setView('reports'); setAns({}); setCurrentStep(1); setLoading(false); setSubmitStatus('KIRIM JAWABAN'); }, 1500);
    }
  };

  const currentStepQs = useMemo(() => allQs.filter(q => q.main_domain.toLowerCase().trim() === selectedDomain.toLowerCase().trim() && q.type === `step${currentStep}`), [allQs, currentStep, selectedDomain]);
  const maxStep = useMemo(() => {
    const domainQs = allQs.filter(q => q.main_domain.toLowerCase().trim() === selectedDomain.toLowerCase().trim());
    return domainQs.length === 0 ? 0 : Math.max(...domainQs.map(q => parseInt(q.type.replace('step', ''))));
  }, [allQs, selectedDomain]);
  const isStepComplete = useMemo(() => currentStepQs.length > 0 && currentStepQs.every(q => ans[q.id] !== undefined), [currentStepQs, ans]);

  if (!isAuthorized) return null;

  return (
    <div className="flex h-screen w-full text-slate-200 overflow-hidden font-sans selection:bg-fuchsia-500/30">
      <PersistentUniverse bgIdx={bgIdx} />
      <ParticleBurstClickEffect />

      {/* --- SIDEBAR --- */}
      <motion.aside initial={false} animate={{ width: isSidebarCollapsed ? 80 : 260 }} className="h-screen bg-[#050505]/95 backdrop-blur-3xl border-r border-white/5 flex flex-col z-[100] transition-all duration-500">
        <div className="h-20 px-6 flex items-center justify-between border-b border-white/5">
          {!isSidebarCollapsed && <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-600 to-indigo-800 flex items-center justify-center shadow-lg"><ShieldCheck size={18} className="text-white" /></div><span className="font-black tracking-widest text-[10px] text-white uppercase">CYBER CORE</span></div>}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 text-slate-500 hover:text-fuchsia-400 mx-auto transition-all"><ChevronLeft className={isSidebarCollapsed ? "rotate-180" : ""} /></button>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-3">
          {[ { id: 'dashboard', label: 'BERANDA', icon: LayoutGrid }, { id: 'assessment', label: 'READINESS TEST', icon: Target }, { id: 'reports', label: 'RESULT', icon: BarChart3 } ].map((item) => (
            <button key={item.id} onClick={() => setView(item.id)} className={`w-full flex items-center p-3.5 rounded-xl transition-all gap-4 ${view === item.id ? 'bg-fuchsia-600/10 text-fuchsia-400 border border-fuchsia-500/20' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
              <item.icon size={18} /> {!isSidebarCollapsed && <span className="font-bold text-[9px] tracking-[0.2em] uppercase">{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-white/5"><button onClick={() => router.push('/')} className="w-full flex items-center p-3 text-red-500 hover:bg-red-500/10 rounded-xl gap-4 font-bold text-[9px] tracking-[0.2em] uppercase"><Power size={18} /> {!isSidebarCollapsed && "KELUAR"}</button></div>
      </motion.aside>

      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-10 border-b border-white/5 bg-black/40 backdrop-blur-xl">
            <div className="flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 rounded-full"><div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_#34d399]" /><span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">SECURE LINK</span></div>
            <div className="flex items-center gap-5 text-right"><div className="hidden sm:block"><p className="text-[11px] font-black text-white uppercase">{user.username}</p><p className="text-[9px] font-bold text-fuchsia-500 uppercase">{user.class_name}</p></div><div className="w-10 h-10 bg-fuchsia-600 rounded-full flex items-center justify-center border border-white/10"><User size={18} /></div></div>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar px-10 py-10" ref={scrollRef}>
          <AnimatePresence mode="wait">
            
            {/* VIEW DASHBOARD (ULTRA SMOOTH) */}
            {view === 'dashboard' && (
              <motion.div key="dash" variants={containerVariants} initial="hidden" animate="show" className="max-w-6xl mx-auto space-y-12">
                
                <motion.div variants={itemVariants} className="text-center space-y-4">
                  <div className="font-mono text-[9px] text-slate-500 tracking-[0.4em] uppercase opacity-70">SYSTEM STATUS: NOMINAL • {getGreeting()}</div>
                  <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none uppercase">{getGreeting()}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-500 to-indigo-400">{user.username}.</span></h1>
                  <p className="text-slate-500 text-[10px] font-bold tracking-[0.4em] uppercase max-w-lg mx-auto">Accessing student portal terminal gateway v2.1</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   {/* Profile Card with Scanning Effect */}
                   <motion.div variants={itemVariants} className="bg-[#09090b]/80 backdrop-blur-2xl border border-white/5 p-10 rounded-[3rem] flex flex-col items-center justify-center text-center hover:border-fuchsia-500/40 transition-all shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-fuchsia-500/40 animate-scan opacity-0 group-hover:opacity-100" />
                        <div className="w-20 h-20 bg-gradient-to-b from-fuchsia-600 to-indigo-900 rounded-3xl flex items-center justify-center text-white border border-fuchsia-500/50 mb-8 shadow-[0_0_40px_rgba(217,70,239,0.3)] transform group-hover:scale-110 transition-all duration-500"><Fingerprint size={40} /></div>
                        <h4 className="text-3xl font-black text-white tracking-widest uppercase">{user.username}</h4>
                        <p className="text-[10px] text-fuchsia-400 font-bold tracking-[0.4em] uppercase mt-4">{user.class_name}</p>
                   </motion.div>

                   {/* Average Score (Circular HUD) */}
                   <motion.div variants={itemVariants} className="bg-[#09090b]/80 backdrop-blur-2xl border border-white/5 p-10 rounded-[3rem] flex flex-col items-center justify-center hover:border-fuchsia-500/40 transition-all shadow-2xl group">
                      <div className="relative mb-6 flex justify-center w-full">
                        <div className="absolute inset-0 rounded-full bg-fuchsia-500/5 blur-2xl group-hover:bg-fuchsia-500/10" />
                        <svg className="w-40 h-40 transform -rotate-90">
                          <circle cx="80" cy="80" r="72" stroke="rgba(255,255,255,0.03)" strokeWidth="8" fill="transparent" />
                          <motion.circle initial={{ strokeDasharray: "0 1000" }} animate={{ strokeDasharray: `${(score / 100) * 452} 1000` }} transition={{ duration: 2.5, ease: "circOut" }} cx="80" cy="80" r="72" stroke="#d946ef" strokeWidth="8" strokeLinecap="round" fill="transparent" style={{ filter: 'drop-shadow(0 0 15px rgba(217,70,239,0.8))' }} />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-6xl font-black text-white tracking-tighter">{score}</span>
                          <span className="text-[8px] font-bold text-slate-500 uppercase mt-1 tracking-widest">AVG SCORE</span>
                        </div>
                      </div>
                      <div className={`px-8 py-2 rounded-full border border-fuchsia-500/30 text-[10px] font-black tracking-widest uppercase bg-black/40 ${readiness.text} shadow-lg`}>{readiness.label}</div>
                   </motion.div>

                   {/* System Status (Futuristic List) */}
                   <motion.div variants={itemVariants} className="bg-[#09090b]/80 backdrop-blur-2xl border border-white/5 p-10 rounded-[3rem] hover:border-fuchsia-500/40 transition-all shadow-2xl flex flex-col items-center justify-center text-center group">
                      <p className="text-[10px] font-black text-slate-600 tracking-[0.5em] mb-10 uppercase flex items-center gap-3"><Activity size={14} className="text-fuchsia-500 animate-pulse"/> SYSTEM ANALYTICS</p>
                      <div className="space-y-6 font-mono text-[9px] tracking-[0.2em] text-slate-400 w-full px-2">
                        {[ {l:'HOST', v:'VERCEL', c:'text-fuchsia-400'}, {l:'CRYPT', v:'AES-256', c:'text-emerald-500'}, {l:'DATA', v:'AIVEN CLOUD', c:'text-white'} ].map((x,i)=>(
                           <div key={i} className="flex justify-between border-b border-white/5 pb-3"><span>{x.l}</span><span className={`${x.c} font-bold`}>{x.v}</span></div>
                        ))}
                      </div>
                   </motion.div>

                   {/* --- BROADCAST CENTER (MEGAH & SMOOTH) --- */}
                   <motion.div variants={itemVariants} className="lg:col-span-3 bg-gradient-to-br from-[#09090b] to-[#040404] border border-white/10 p-10 rounded-[4rem] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl group hover:border-fuchsia-500/30 transition-all duration-700">
                      <div className="absolute inset-0 bg-dots-grid opacity-10" />
                      <div className="absolute top-[-50%] right-[-10%] w-80 h-80 bg-violet-600/10 blur-[100px] rounded-full animate-pulse" />
                      
                      <div className="flex items-center gap-10 z-10 text-center lg:text-left">
                        <div className="w-24 h-24 bg-black/80 rounded-[2.5rem] flex items-center justify-center shrink-0 border border-white/10 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                          <Zap size={40} className="text-fuchsia-500 fill-current" />
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-center lg:justify-start gap-4">
                             <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-ping" />
                             <span className="text-[11px] font-black tracking-[0.6em] text-emerald-400 uppercase">Mission Ready</span>
                          </div>
                          <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight">Protokol Readiness Test Telah Aktif.</h3>
                          <p className="text-[11px] font-medium text-slate-500 tracking-widest max-w-2xl uppercase opacity-80">Lakukan inisiasi kuis sekarang untuk memvalidasi pertahanan siber anda pada lingkungan cloud.</p>
                        </div>
                      </div>
                      
                      <button onClick={handleStartMissionClick} className="px-16 py-7 bg-white text-black rounded-3xl font-black text-[13px] tracking-[0.4em] hover:bg-fuchsia-600 hover:text-white transition-all duration-500 shadow-[0_20px_50px_rgba(255,255,255,0.1)] flex items-center gap-5 uppercase z-10 group/btn">
                        INITIALIZE <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                      </button>
                   </motion.div>
                </div>
              </motion.div>
            )}

            {/* VIEW REPORTS - RESULT (CENTER ALIGNED & SMOOTH) */}
            {view === 'reports' && (
              <motion.div key="reports" variants={containerVariants} initial="hidden" animate="show" className="max-w-6xl mx-auto space-y-12">
                 <motion.div variants={itemVariants} className="space-y-3 text-center">
                    <h2 className="text-5xl font-black text-white tracking-widest uppercase">Evaluation Result.</h2>
                    <p className="text-slate-500 text-[11px] font-bold tracking-[0.5em] uppercase">Historical Dossier Personnel</p>
                 </motion.div>

                 <motion.div variants={itemVariants} className="bg-[#09090b]/80 backdrop-blur-2xl border border-white/5 rounded-[4rem] p-14 shadow-2xl relative overflow-hidden text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 relative z-10">
                        <div className="bg-white/5 rounded-[2.5rem] p-10 border border-white/5 flex flex-col items-center hover:scale-105 transition-all"><p className="text-[10px] text-slate-500 font-black tracking-[0.5em] mb-4 uppercase">SESSIONS</p><p className="text-6xl text-white font-black font-mono tracking-tighter">{history.length}</p></div>
                        <div className="bg-white/5 rounded-[2.5rem] p-10 border border-white/5 flex flex-col items-center hover:scale-105 transition-all"><p className="text-[10px] text-slate-500 font-black tracking-[0.5em] mb-4 uppercase">ACCURACY</p><p className="text-6xl text-fuchsia-400 font-black font-mono tracking-tighter">{score}%</p></div>
                        <div className="bg-white/5 rounded-[2.5rem] p-10 border border-white/5 flex flex-col items-center hover:scale-105 transition-all"><p className="text-[10px] text-slate-500 font-black tracking-[0.5em] mb-4 uppercase">RATING</p><p className={`text-3xl font-black tracking-[0.3em] uppercase mt-2 ${readiness.text}`}>{readiness.label}</p></div>
                    </div>

                    <div className="relative z-10 bg-black/40 border border-white/10 rounded-[3rem] overflow-hidden shadow-inner">
                      <table className="w-full text-center border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 bg-white/[0.02]">
                            <th className="py-7 text-[10px] font-black tracking-[0.5em] text-slate-500 uppercase">Session</th>
                            <th className="py-7 text-[10px] font-black tracking-[0.5em] text-slate-500 uppercase">Target Domain</th>
                            <th className="py-7 text-[10px] font-black tracking-[0.5em] text-slate-500 uppercase">Accuracy</th>
                            <th className="py-7 text-[10px] font-black tracking-[0.5em] text-slate-500 uppercase">Detail Analysis</th>
                          </tr>
                        </thead>
                        <tbody>
                           {history.length === 0 ? (
                              <tr><td colSpan={4} className="py-24 text-slate-600 font-black text-xs uppercase tracking-[1em] animate-pulse">NO DATA RECORDED</td></tr>
                           ) : (
                              history.map((h, i) => (
                                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.01] transition-all group">
                                  <td className="py-8"><span className="text-[12px] font-black text-white font-mono opacity-50 group-hover:opacity-100 transition-all">#0{history.length - i}</span></td>
                                  <td className="py-8 text-[12px] font-black text-slate-300 uppercase tracking-widest">{h.domain_id}</td>
                                  <td className="py-8 font-black text-white font-mono text-xl tracking-tighter">{h.score}%</td>
                                  <td className="py-8"><button onClick={() => setDetailModal(h.details || [])} className="mx-auto flex items-center gap-3 px-8 py-3 bg-[#0a0a0f] border border-white/10 hover:border-fuchsia-500/50 text-slate-400 hover:text-white rounded-2xl text-[10px] font-black tracking-widest transition-all uppercase"><ScanLine size={16} /> Open Dossier</button></td>
                                </tr>
                              ))
                           )}
                        </tbody>
                      </table>
                    </div>
                 </motion.div>
              </motion.div>
            )}

            {/* VIEW ASSESSMENT & MISSION (FULL 900+ LINES RE-SCALE) */}
            {view === 'assessment' && (
              <motion.div key="assess-hub" variants={containerVariants} initial="hidden" animate="show" className="max-w-6xl mx-auto space-y-12">
                <motion.div variants={itemVariants} className="text-center space-y-4"><h2 className="text-5xl font-black text-white tracking-widest uppercase">Readiness Test.</h2><p className="text-[10px] font-bold text-slate-500 tracking-[0.5em] uppercase">Select target sector for evaluation</p></motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {TACTICAL_DOMAINS.map((domain, i) => {
                    const done = history.some(h => String(h.domain_id).toLowerCase().includes(domain.id.split(' ')[0].toLowerCase()));
                    return (
                      <motion.div key={i} variants={itemVariants} whileHover={{ y: -10, scale: 1.02 }} onClick={() => { if(done) { setPendingDomain(domain.id); setShowRetakeWarning(true); } else { setSelectedDomain(domain.id); setView('briefing'); } }} className={`bg-[#09090b]/80 border ${done ? 'border-fuchsia-500/40 shadow-2xl shadow-fuchsia-500/10' : 'border-white/5'} p-10 rounded-[3.5rem] cursor-pointer group transition-all duration-500 relative overflow-hidden`}><div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" /><div className="flex justify-between items-start mb-10"><div className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl" style={{ backgroundColor: `${domain.color}15`, border: `1px solid ${domain.color}40` }}><domain.icon size={28} style={{ color: domain.color }} /></div>{done && <div className="bg-fuchsia-500/10 px-4 py-1.5 rounded-full border border-fuchsia-500/20"><span className="text-[9px] font-black text-fuchsia-400 tracking-widest uppercase">Completed</span></div>}</div><h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tighter">{domain.title}</h3><p className="text-[11px] text-slate-500 font-medium tracking-widest uppercase mb-10 leading-relaxed">{domain.desc}</p><div className="mt-auto pt-6 border-t border-white/5 flex justify-end"><span className="text-[10px] font-black tracking-widest text-slate-400 group-hover:text-fuchsia-400 transition-all uppercase">Access Sector <ArrowRight size={14} className="inline ml-3" /></span></div></motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {view === 'mission' && (
              <motion.div key="mission" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-12 pb-44 text-center lg:text-left">
                <header className="flex justify-between items-end border-b border-white/10 pb-10"><div className="space-y-4"><button onClick={() => setView('assessment')} className="text-[10px] font-black text-slate-500 hover:text-red-400 flex items-center gap-4 tracking-widest uppercase transition-all"><ArrowLeft size={16} /> Abort Mission</button><h2 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">Phase 0{currentStep}</h2><p className="text-fuchsia-400 font-black tracking-[0.5em] text-[11px] uppercase">SECURE PROTOCOL: {selectedDomain}</p></div><div className="text-[120px] font-black text-white/5 font-mono leading-none tracking-tighter">0{currentStep}</div></header>
                <div className="space-y-10">{currentStepQs.map((q) => (<div key={q.id} className="p-12 rounded-[3.5rem] bg-[#09090b]/90 border border-white/10 space-y-10 shadow-2xl relative overflow-hidden transition-all hover:border-fuchsia-500/30"><div className="absolute top-0 left-0 w-2 h-full bg-fuchsia-600" /><h4 className="text-2xl font-medium text-slate-100 leading-snug tracking-tight">"{q.text}"</h4><div className="grid grid-cols-1 gap-5">{q.options.slice(0, 4).map((opt: any, i: number) => (<button key={i} onClick={() => setAns({...ans, [q.id]: {score: opt.score, text: opt.text}})} className={`p-8 rounded-[2rem] text-left transition-all border text-[11px] font-black tracking-widest uppercase flex items-center gap-6 ${ans[q.id]?.text === opt.text ? 'bg-fuchsia-600/10 border-fuchsia-500 text-white shadow-2xl' : 'bg-black/50 border-white/5 text-slate-500 hover:border-white/20'}`}><div className={`w-4 h-4 rounded-full border-[3px] flex items-center justify-center shrink-0 ${ans[q.id]?.text === opt.text ? 'border-fuchsia-400' : 'border-slate-800'}`}>{ans[q.id]?.text === opt.text && <div className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full shadow-[0_0_10px_#d946ef]" />}</div><span>{opt.text}</span></button>))}</div></div>))}</div>
                <div className="flex gap-6 pt-10">{currentStep > 1 && <button onClick={() => setCurrentStep(p => p - 1)} className="px-12 py-6 bg-black border border-white/10 text-slate-400 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-white/5">Previous</button>}{currentStep < maxStep ? <button disabled={!isStepComplete} onClick={() => setCurrentStep(p => p + 1)} className={`flex-1 py-6 rounded-2xl font-black text-[11px] tracking-widest transition-all uppercase ${isStepComplete ? 'bg-fuchsia-600 text-white shadow-2xl shadow-fuchsia-500/30' : 'bg-white/5 text-slate-800 cursor-not-allowed'}`}>Next Phase</button> : <button disabled={!isStepComplete || loading} onClick={executeUplink} className={`flex-1 py-6 rounded-2xl font-black text-[11px] tracking-widest transition-all uppercase flex items-center justify-center gap-4 ${isStepComplete ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-2xl' : 'bg-white/5 text-slate-800 cursor-not-allowed'}`}>{submitStatus} {isStepComplete && submitStatus !== 'SINKRONISASI...' && <Zap size={18}/>}</button>}</div>
              </motion.div>
            )}

            {view === 'briefing' && (
              <motion.div key="briefing" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
                 <div className="mb-20"><RobotFace size={32} ringSize="w-56 h-56" coreSize="w-36 h-36" /></div>
                 <motion.div className="flex flex-col items-center text-center space-y-6"><div className="px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black tracking-[0.5em] mb-4 uppercase">Uplink Stable</div><h2 className="text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-none">Transmisi Diterima.</h2><p className="text-[12px] font-bold text-slate-400 leading-relaxed tracking-[0.2em] uppercase max-w-2xl">Identity confirmed: <span className="text-fuchsia-400">{user.username}</span>.<br/>Initialize assessment protocols for <span className="text-fuchsia-400">{selectedDomain}</span> sector?</p></motion.div>
                 <div className="flex gap-8 mt-20"><button onClick={() => setView('assessment')} className="px-14 py-5 border-2 border-white/10 text-slate-500 rounded-3xl font-black text-[11px] tracking-[0.3em] uppercase hover:border-white/30 hover:text-white transition-all">Cancel</button><button onClick={handleStartMissionClick} className="px-14 py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-3xl font-black text-[11px] tracking-[0.3em] shadow-[0_20px_60px_rgba(217,70,239,0.3)] hover:scale-105 transition-all uppercase flex items-center gap-4">Start Protocol <Zap size={18} /></button></div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      {/* --- MODAL DETAIL (CENTERED) --- */}
      <AnimatePresence>
        {detailModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[3000] flex items-center justify-center p-6 bg-black/98 backdrop-blur-3xl">
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-4xl max-h-[85vh] bg-[#070707] border border-white/10 rounded-[4rem] p-16 shadow-2xl flex flex-col overflow-hidden text-center">
               <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 shadow-[0_0_30px_rgba(217,70,239,0.5)]" />
               <div className="flex justify-between items-center mb-12"><h2 className="text-2xl font-black text-white tracking-widest uppercase">Post-Mission Analysis</h2><button onClick={() => setDetailModal(null)} className="p-3 bg-white/5 rounded-2xl text-slate-500 hover:text-red-500 transition-all border border-white/10"><X size={24} /></button></div>
               <div className="flex-1 overflow-y-auto pr-6 space-y-6 custom-scrollbar">
                 {detailModal.map((d: any, i: number) => (
                    <div key={i} className={`p-10 rounded-[3rem] border bg-black/60 flex flex-col items-center ${d.is_correct ? 'border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.05)]' : 'border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.05)]'}`}>
                          <div className={`p-4 rounded-2xl mb-8 ${d.is_correct ? 'bg-emerald-500/10 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-red-500/10 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]'}`}>{d.is_correct ? <CheckCircle2 size={32} /> : <XCircle size={32} />}</div>
                          <div className="w-full text-center space-y-8"><p className="text-slate-100 font-medium text-[16px] leading-relaxed tracking-tight">"{d.question}"</p><div className="bg-[#0a0a0f] p-8 rounded-[2rem] border border-white/5"><p className="text-[10px] font-black text-slate-600 tracking-[0.5em] mb-4 uppercase">Personnel Response</p><p className={`font-black text-[14px] tracking-widest ${d.is_correct ? 'text-emerald-500' : 'text-red-500'}`}>{d.answer || "N/A"}</p></div></div>
                    </div>
                 ))}
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes grid-move { 0% { background-position: 0 0; } 100% { background-position: 0 40px; } }
        @keyframes scan { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } }
        .bg-hud-grid {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 40px 40px; transform: perspective(800px) rotateX(45deg) scale(2); transform-origin: top; animation: grid-move 10s linear infinite;
        }
        .animate-scan { animation: scan 4s linear infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(217, 70, 239, 0.2); border-radius: 10px; }
        ::-webkit-scrollbar { width: 0px; }
      `}} />
    </div>
  );
}