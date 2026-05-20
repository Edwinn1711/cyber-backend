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

// --- CONFIG & ASSETS ---
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

// --- 1. SMOOTH PARTICLE BURST ---
const ParticleBurstClickEffect = () => {
  const [particles, setParticles] = useState<any[]>([]);
  useEffect(() => {
    const handleInteraction = (e: MouseEvent) => {
      const newParticles = Array.from({ length: 8 }).map((_, i) => ({
        id: Math.random(), x: e.clientX, y: e.clientY, angle: (Math.PI * 2 / 8) * i, velocity: Math.random() * 40 + 20
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
          <motion.div key={p.id} initial={{ scale: 0, opacity: 1, x: p.x, y: p.y }} animate={{ scale: [0, 1, 0], opacity: [1, 0.4, 0], x: p.x + Math.cos(p.angle) * p.velocity, y: p.y + Math.sin(p.angle) * p.velocity }} transition={{ duration: 0.8 }} className="absolute rounded-full bg-fuchsia-400 shadow-[0_0_10px_#d946ef]" style={{ width: '3px', height: '3px' }} />
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- 2. AMBIENT BACKGROUND ENGINE ---
const PersistentUniverse = React.memo(({ bgIdx }: { bgIdx: number }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#020205]">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.05),transparent_50%)]" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(217,70,239,0.05),transparent_50%)]" />
      <AnimatePresence mode="wait">
        <motion.img key={bgIdx} src={CYBER_ASSETS[bgIdx]} initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} exit={{ opacity: 0 }} transition={{ duration: 4 }} className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-screen" />
      </AnimatePresence>
      <div className="absolute inset-0 bg-hud-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
    </div>
  );
});
PersistentUniverse.displayName = 'PersistentUniverse';

// --- 3. ANIMATION VARIANTS (STAGGERED) ---
const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } } as any;
const itemVariants = { hidden: { opacity: 0, y: 15, scale: 0.98 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } } } as any;
const pageTransition = { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 10 }, transition: { duration: 0.4, ease: "easeInOut" } } as any;

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
  const [submitStatus, setSubmitStatus] = useState('EXECUTE PROTOCOL');
  const [detailModal, setDetailModal] = useState<any>(null);
  const [showClassSelector, setShowClassSelector] = useState(false);

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
    } catch (e) { console.error(e); }
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
      setTimeout(() => { setView('reports'); setAns({}); setCurrentStep(1); setLoading(false); setSubmitStatus('EXECUTE PROTOCOL'); }, 1500);
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
      <motion.aside initial={false} animate={{ width: isSidebarCollapsed ? 80 : 250 }} className="h-screen bg-[#05050A]/90 backdrop-blur-3xl border-r border-white/5 flex flex-col z-[100] transition-all duration-500 shadow-2xl">
        <div className="h-20 px-6 flex items-center justify-between border-b border-white/5">
          {!isSidebarCollapsed && <div className="flex flex-col"><span className="font-black text-white text-[11px] tracking-widest uppercase">CYBER READINESS</span><span className="font-bold text-fuchsia-500 text-[9px] tracking-widest mt-0.5">INDEX PLATFORM</span></div>}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 text-slate-500 hover:text-fuchsia-400 border border-white/5 rounded-lg transition-all">
             {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-4">
          {[ { id: 'dashboard', label: 'HOME', icon: LayoutGrid }, { id: 'assessment', label: 'ASSESSMENT', icon: Target }, { id: 'reports', label: 'REPORT', icon: FileText } ].map((item) => (
            <button key={item.id} onClick={() => setView(item.id)} className={`w-full flex items-center p-3.5 rounded-xl transition-all gap-4 ${view === item.id ? 'bg-fuchsia-600/15 text-fuchsia-400 border border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.1)]' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
              <item.icon size={18} /> {!isSidebarCollapsed && <span className="font-bold text-[9px] tracking-[0.2em] uppercase">{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-white/5"><button onClick={() => router.push('/')} className="w-full flex items-center justify-center p-3 bg-red-950/20 text-red-500 border border-red-500/10 rounded-xl gap-4 font-bold text-[9px] tracking-widest uppercase hover:bg-red-600 hover:text-white transition-all"><Power size={16} /> {!isSidebarCollapsed && "SHUTDOWN"}</button></div>
      </motion.aside>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-10 border-b border-white/5 bg-black/20 backdrop-blur-md">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full"><div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_#34d399]" /><span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">GATEWAY SECURED</span></div>
            <div className="flex items-center gap-6"><div className="text-right hidden sm:block"><p className="text-[11px] font-black text-white tracking-widest uppercase">{user.username}</p><p className="text-[9px] font-bold text-fuchsia-400 uppercase tracking-widest mt-1">OPERATIVE MODE</p></div><div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center border border-white/20"><User size={18} /></div></div>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar px-10 py-10" ref={scrollRef}>
          <AnimatePresence mode="wait">
            
            {/* VIEW DASHBOARD (STAGGERED SMOOTH) */}
            {view === 'dashboard' && (
              <motion.div key="dash" variants={containerVariants} initial="hidden" animate="show" exit={{ opacity: 0, y: -20 }} className="max-w-6xl mx-auto space-y-12">
                <motion.div variants={itemVariants} className="text-center space-y-3 pt-4">
                  <div className="text-fuchsia-400 font-black text-[10px] tracking-[0.5em] uppercase">{getGreeting()} OPERATIVE</div>
                  <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase leading-tight">WELCOME BACK, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">{user.username}.</span></h1>
                  <p className="text-slate-500 font-medium text-xs tracking-widest max-w-xl mx-auto uppercase opacity-80">Accessing secure personnel terminal gateway v2.1</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
                   <motion.div variants={itemVariants} className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center hover:border-fuchsia-500/40 transition-all shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-fuchsia-500/30 animate-scan opacity-0 group-hover:opacity-100" />
                        <div className="w-16 h-16 bg-gradient-to-b from-fuchsia-600 to-indigo-900 rounded-2xl flex items-center justify-center text-white border border-white/10 mb-8 shadow-2xl transform group-hover:scale-110 transition-all duration-500"><Fingerprint size={32} /></div>
                        <h4 className="text-2xl font-black text-white tracking-widest uppercase">{user.username}</h4>
                        <p className="text-[10px] text-fuchsia-400 font-black tracking-[0.3em] uppercase mt-3">{user.class_name || "UNASSIGNED"}</p>
                   </motion.div>

                   <motion.div variants={itemVariants} className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center justify-center hover:border-fuchsia-500/40 transition-all shadow-2xl group relative overflow-hidden">
                      <div className="relative mb-4 flex justify-center w-full transform group-hover:scale-105 transition-all">
                        <svg className="w-32 h-32 transform -rotate-90">
                          <circle cx="64" cy="64" r="58" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="transparent" />
                          <motion.circle initial={{ strokeDasharray: "0 1000" }} animate={{ strokeDasharray: `${(score / 100) * 365} 1000` }} transition={{ duration: 2.5, ease: "easeOut" }} cx="64" cy="64" r="58" stroke="#d946ef" strokeWidth="6" strokeLinecap="round" fill="transparent" style={{ filter: 'drop-shadow(0 0 10px rgba(217,70,239,0.8))' }} />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-5xl font-black text-white tracking-tighter">{score}</span><span className="text-[7px] font-bold text-slate-500 uppercase mt-1">READINESS</span></div>
                      </div>
                      <div className={`px-6 py-1.5 rounded-full border border-white/5 text-[9px] font-black tracking-widest uppercase bg-black/40 ${getReadinessData(score).text}`}>{getReadinessData(score).label}</div>
                   </motion.div>

                   <motion.div variants={itemVariants} className="bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/5 p-8 rounded-[2.5rem] hover:border-fuchsia-500/40 transition-all shadow-2xl flex flex-col items-center justify-center text-center group"><p className="text-[9px] font-black text-slate-600 tracking-[0.4em] mb-10 uppercase flex items-center gap-3"><Activity size={14} className="text-fuchsia-500 animate-pulse"/> SYSTEM ANALYTICS</p>
                      <div className="space-y-6 font-mono text-[9px] tracking-[0.2em] text-slate-400 w-full px-4">
                        <div className="flex justify-between border-b border-white/5 pb-3"><span>SERVER</span><span className="text-fuchsia-400 font-bold uppercase">READY</span></div>
                        <div className="flex justify-between border-b border-white/5 pb-3"><span>SECURITY</span><span className="text-emerald-500 font-bold uppercase">AES-256</span></div>
                        <div className="flex justify-between"><span>DATABASE</span><span className="text-white font-bold opacity-80 uppercase">SYNC</span></div>
                      </div>
                   </motion.div>

                   {/* BROADCAST CENTER (SMOOTH RESTORED) */}
                   <motion.div variants={itemVariants} className="lg:col-span-3 bg-gradient-to-br from-[#0a0a14] to-[#020202] border border-white/5 p-10 rounded-[3rem] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl group hover:border-fuchsia-500/30 transition-all duration-700">
                      <div className="absolute inset-0 bg-dots-grid opacity-10" />
                      <div className="flex items-center gap-10 z-10 text-center lg:text-left">
                        <div className="w-16 h-16 bg-black/80 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"><BellRing size={28} className="text-fuchsia-500 animate-bounce" /></div>
                        <div className="space-y-3"><div className="flex items-center justify-center lg:justify-start gap-4"><div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-ping" /><span className="text-[10px] font-black tracking-[0.5em] text-emerald-400 uppercase">Gateway Online</span></div><h3 className="text-2xl font-black text-white uppercase tracking-tighter">Readiness Test Protocol Activated.</h3><p className="text-[11px] font-medium text-slate-500 tracking-widest max-w-2xl uppercase opacity-80 leading-relaxed">Initiate your tactical assessment now to validate info-security compliance.</p></div>
                      </div>
                      <button onClick={handleStartMissionClick} className="px-14 py-6 bg-white text-black rounded-2xl font-black text-[12px] tracking-[0.4em] hover:bg-fuchsia-600 hover:text-white transition-all duration-500 shadow-2xl flex items-center gap-5 uppercase z-10 group/btn">INITIALIZE <Zap size={18} className="group-hover/btn:scale-125 transition-transform" /></button>
                   </motion.div>
                </div>
              </motion.div>
            )}

            {/* VIEW ASSESSMENT (STAGGERED GRID) */}
            {view === 'assessment' && (
              <motion.div key="assess" variants={containerVariants} initial="hidden" animate="show" exit={{ opacity: 0 }} className="max-w-6xl mx-auto space-y-12">
                 <motion.div variants={itemVariants} className="text-center space-y-3 pt-6"><h2 className="text-5xl font-black text-white tracking-widest uppercase">Target Modules.</h2><p className="text-fuchsia-400 text-[10px] font-black tracking-[0.6em] uppercase">Select strategic sector for diagnostic protocol</p></motion.div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {TACTICAL_DOMAINS.map((domain, i) => {
                      const done = history.some(h => String(h.domain_id).toLowerCase().includes(domain.id.split(' ')[0].toLowerCase()));
                      return (
                        <motion.div key={i} variants={itemVariants} whileHover={{ y: -10, scale: 1.02 }} onClick={() => { setSelectedDomain(domain.id); setView('briefing'); }} className={`bg-[#0a0a14]/90 border-2 ${done ? 'border-fuchsia-500/50 shadow-[0_0_20px_rgba(217,70,239,0.1)]' : 'border-white/5'} p-10 rounded-[3.5rem] cursor-pointer group transition-all duration-500 relative overflow-hidden`}><div className="flex justify-between items-start mb-10"><div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl" style={{ backgroundColor: `${domain.color}15`, border: `1px solid ${domain.color}40` }}><domain.icon size={26} style={{ color: domain.color }} /></div>{done && <div className="bg-fuchsia-600/20 px-4 py-1.5 rounded-full border border-fuchsia-500/30 shadow-lg"><span className="text-[9px] font-black text-fuchsia-400 tracking-widest uppercase">Tuntas</span></div>}</div><h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tighter leading-none">{domain.title}</h3><p className="text-[11px] text-slate-500 font-medium tracking-widest uppercase mb-10 leading-relaxed opacity-80">{domain.desc}</p><div className="mt-auto pt-6 border-t border-white/5 flex justify-end items-center"><span className="text-[10px] font-black tracking-widest text-slate-400 group-hover:text-fuchsia-400 transition-all uppercase">INITIALIZE <ArrowRight size={14} className="inline ml-3" /></span></div></motion.div>
                      );
                   })}
                 </div>
              </motion.div>
            )}

            {/* VIEW REPORTS (SYMMETRICAL) */}
            {view === 'reports' && (
              <motion.div key="reports" variants={containerVariants} initial="hidden" animate="show" className="max-w-6xl mx-auto space-y-12">
                 <motion.div variants={itemVariants} className="space-y-4 text-center pt-6"><h2 className="text-5xl font-black text-white tracking-widest uppercase">Evaluation Result.</h2><p className="text-fuchsia-400 text-[11px] font-bold tracking-[0.5em] uppercase">Historical Performance Summary</p></motion.div>
                 <motion.div variants={itemVariants} className="bg-[#0a0a0f]/90 backdrop-blur-3xl border border-white/5 rounded-[4rem] p-16 shadow-2xl relative overflow-hidden text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 relative z-10">
                        <div className="bg-black/50 border border-white/10 rounded-[3rem] p-10 flex flex-col items-center hover:scale-105 transition-all shadow-inner"><p className="text-[10px] text-slate-500 font-black tracking-[0.5em] mb-4 uppercase">COMPLETED</p><p className="text-6xl text-white font-black font-mono tracking-tighter">{history.length}</p></div>
                        <div className="bg-black/50 border border-white/10 rounded-[3rem] p-10 flex flex-col items-center hover:scale-105 transition-all shadow-inner"><p className="text-[10px] text-slate-500 font-black tracking-[0.5em] mb-4 uppercase">ACCURACY</p><p className="text-6xl text-fuchsia-400 font-black font-mono tracking-tighter">{score}%</p></div>
                        <div className="bg-black/50 border border-white/10 rounded-[3rem] p-10 flex flex-col items-center hover:scale-105 transition-all shadow-inner"><p className="text-[10px] text-slate-500 font-black tracking-[0.5em] mb-4 uppercase">STATUS</p><p className={`text-2xl font-black tracking-[0.3em] uppercase mt-2 ${getReadinessData(score).text}`}>{getReadinessData(score).label}</p></div>
                    </div>
                    <div className="relative z-10 bg-black/60 border border-white/10 rounded-[3rem] overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]"><table className="w-full text-center border-collapse"><thead><tr className="border-b-2 border-white/10 bg-white/[0.04]"><th className="py-8 text-[10px] font-black tracking-[0.6em] text-white uppercase">ID</th><th className="py-8 text-[10px] font-black tracking-[0.6em] text-white uppercase">Operational Sector</th><th className="py-8 text-[10px] font-black tracking-[0.6em] text-white uppercase">Metric</th><th className="py-8 text-[10px] font-black tracking-[0.6em] text-white uppercase">Action</th></tr></thead><tbody className="text-white font-bold">{history.map((h, i) => (<tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-all group"><td className="py-10 text-[13px] font-black font-mono text-fuchsia-400 opacity-80 group-hover:opacity-100">#0{history.length - i}</td><td className="py-10 text-[13px] font-black uppercase tracking-widest">{h.domain_id}</td><td className="py-10 font-black font-mono text-xl tracking-tighter">{h.score}%</td><td className="py-10"><button onClick={() => setDetailModal(h.details || [])} className="mx-auto flex items-center gap-4 px-10 py-4 bg-[#0a0a0f] border border-white/10 hover:border-fuchsia-500/60 text-white rounded-3xl text-[10px] font-black tracking-[0.4em] transition-all uppercase shadow-xl"><Eye size={18} /> OPEN ANALYZE</button></td></tr>))}</tbody></table></div>
                 </motion.div>
              </motion.div>
            )}

            {/* BRIEFING VIEW (ROBOT) */}
            {view === 'briefing' && (
              <motion.div key="brief" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[75vh]">
                 <div className="mb-20"><RobotFace size={36} ringSize="w-56 h-56" coreSize="w-32 h-32" /></div>
                 <motion.div className="flex flex-col items-center text-center space-y-8"><div className="px-6 py-2 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-400 text-[11px] font-black tracking-[0.7em] mb-4 uppercase animate-pulse">Uplink Stable</div><h2 className="text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-2xl">Transmission Received.</h2><p className="text-[14px] font-black text-white leading-relaxed tracking-[0.2em] uppercase max-w-2xl opacity-100">Halo <span className="text-fuchsia-400">{user.username}</span>, inisiasi kuis untuk topik <span className="text-fuchsia-400">{selectedDomain}</span> sekarang?</p></motion.div>
                 <div className="flex gap-8 mt-24"><button onClick={() => setView('assessment')} className="px-14 py-6 border-2 border-white/10 text-slate-500 rounded-3xl font-black text-[12px] tracking-[0.5em] uppercase hover:border-white/30 hover:text-white transition-all">Cancel</button><button onClick={handleStartMissionClick} className="px-14 py-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-3xl font-black text-[12px] tracking-[0.5em] shadow-[0_20px_60px_rgba(217,70,239,0.3)] hover:scale-105 transition-all uppercase flex items-center gap-6">Begin Protocol <Zap size={22} /></button></div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } }
        .animate-scan { animation: scan 6s linear infinite; }
        .bg-hud-grid { background-image: linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px); background-size: 50px 50px; transform: perspective(800px) rotateX(45deg) scale(2.5); transform-origin: top; }
        ::-webkit-scrollbar { width: 0px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
}