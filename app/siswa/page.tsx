"use client"
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
// --- IMPORT SEMUA IKON (AUDITED) ---
import { 
  ShieldCheck, Brain, Target, ChevronRight, ChevronLeft, Zap, ArrowLeft, ArrowRight,
  Fingerprint, Power, BarChart3, Activity, ShieldAlert, Cpu, Globe, Lock, 
  Radar as RadarIcon, Terminal, Database, Server, Search, Radio, Bug, MailWarning, 
  Sparkles, AlertTriangle, Eye, CheckCircle2, XCircle, X, User, Info, 
  ShieldQuestion, LayoutGrid, Check, BellRing, Bot, ScanLine, Laptop, Workflow, 
  FileText, TrendingUp, Lightbulb, Hexagon, Send 
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

// --- 0. HELPER: STATUS COLORS ---
const getReadinessData = (score: number) => {
  if (score >= 80) return { label: "EXCELLENT", color: "#d946ef", bg: "bg-fuchsia-600", text: "text-fuchsia-400" };
  if (score >= 50) return { label: "AVERAGE", color: "#eab308", bg: "bg-yellow-600", text: "text-yellow-400" };
  return { label: "POOR", color: "#ef4444", bg: "bg-red-600", text: "text-red-400" };
};

// --- 1. EFEK KLIK ---
const ParticleBurstClickEffect = () => {
  const [particles, setParticles] = useState<any[]>([]);
  useEffect(() => {
    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
      const newParticles = Array.from({ length: 8 }).map((_, i) => ({
        id: Math.random(), x: clientX, y: clientY, angle: (Math.PI * 2 / 8) * i, velocity: Math.random() * 50 + 20
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

// --- 2. BACKGROUND COMPONENT (PURE BLACK BASE) ---
const PersistentUniverse = React.memo(({ bgIdx }: { bgIdx: number }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#000000]">
      <AnimatePresence mode="wait">
        <motion.img key={bgIdx} src={CYBER_ASSETS[bgIdx]} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 0.2, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 5 }} className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-lighten" />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/95 pointer-events-none" />
      <div className="absolute inset-0 bg-hud-grid opacity-[0.15] pointer-events-none" />
    </div>
  );
});
PersistentUniverse.displayName = 'PersistentUniverse';

// --- 3. ROBOT AI ---
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
      <div className={`relative ${coreSize} bg-[#020202] border-2 border-fuchsia-500/60 rounded-full shadow-[0_0_40px_rgba(217,70,239,0.4)] flex items-center justify-center z-10 overflow-hidden`}>
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

// --- ANIMATION VARIANTS ---
const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } } as any;
const itemVariants = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } } as any;
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
  const [showClassSelector, setShowClassSelector] = useState(false);
  const [appFeedbackModal, setAppFeedbackModal] = useState(false);
  const [appFeedbackForm, setAppFeedbackForm] = useState({ category: 'AI ENHANCEMENT', message: '' });
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  // Greeting Logic
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
      setTimeout(() => { setView('reports'); setAns({}); setCurrentStep(1); setLoading(false); setSubmitStatus('SUBMIT ASSESSMENT'); }, 1500);
    }
  };

  const submitAppFeedback = async () => {
    if(!appFeedbackForm.message.trim()) { alert("Please input content."); return; }
    setIsSendingFeedback(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/devinedwinsiahaan171105@gmail.com", {
        method: "POST", headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
           _subject: `MEGAH FEEDBACK: ${appFeedbackForm.category}`,
           _captcha: "false",
           Operative: user.username,
           Category: appFeedbackForm.category,
           Message: appFeedbackForm.message
        })
      });
      if (response.ok) { alert(`Sent! Check Gmail.`); setAppFeedbackModal(false); setAppFeedbackForm({ category: 'AI ENHANCEMENT', message: '' }); } 
    } catch (e) { alert("Error."); } 
    finally { setIsSendingFeedback(false); }
  };

  const currentStepQs = useMemo(() => {
    return allQs.filter(q => q.main_domain.toLowerCase().trim() === selectedDomain.toLowerCase().trim() && q.type === `step${currentStep}`);
  }, [allQs, currentStep, selectedDomain]);

  const maxStep = useMemo(() => {
    const domainQs = allQs.filter(q => q.main_domain.toLowerCase().trim() === selectedDomain.toLowerCase().trim());
    return domainQs.length === 0 ? 0 : Math.max(...domainQs.map(q => parseInt(q.type.replace('step', ''))));
  }, [allQs, selectedDomain]);

  const isStepComplete = useMemo(() => currentStepQs.length > 0 && currentStepQs.every(q => ans[q.id] !== undefined), [currentStepQs, ans]);

  const radarData = useMemo(() => ["Social", "Malware", "Phishing", "Network", "Threat", "Access"].map(d => {
    const entry = history.find(h => String(h.domain_id).toLowerCase().includes(d.toLowerCase()));
    return { subject: d.toUpperCase(), A: entry ? entry.score : 0, fullMark: 100 };
  }), [history]);

  if (!isAuthorized) return null;

  return (
    <div className="flex h-screen w-full text-slate-100 overflow-hidden font-sans selection:bg-fuchsia-500/30">
      <PersistentUniverse bgIdx={bgIdx} />
      <ParticleBurstClickEffect />

      {/* --- SIDEBAR --- */}
      <motion.aside initial={false} animate={{ width: isSidebarCollapsed ? 80 : 250 }} className="h-screen bg-black/95 backdrop-blur-3xl border-r border-white/10 flex flex-col z-[100] transition-all duration-500 shadow-2xl">
        <div className="h-20 px-6 flex items-center justify-between border-b border-white/10">
          {!isSidebarCollapsed && <div className="flex flex-col"><span className="font-black text-white uppercase text-[11px] tracking-widest leading-none">CYBER READINESS</span><span className="font-bold text-fuchsia-500 text-[9px] tracking-widest mt-0.5 uppercase">INDEX</span></div>}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 text-slate-400 hover:text-fuchsia-400 border border-white/5 rounded-lg transition-all">{isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}</button>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-3">
          {[ { id: 'dashboard', label: 'BERANDA', icon: LayoutGrid }, { id: 'assessment', label: 'ASSESSMENT', icon: Target }, { id: 'reports', label: 'REPORT', icon: FileText } ].map((item) => (
            <button key={item.id} onClick={() => setView(item.id)} className={`w-full flex items-center p-3.5 rounded-2xl transition-all gap-4 ${view === item.id ? 'bg-fuchsia-600/15 text-fuchsia-400 border border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.1)]' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
              <item.icon size={18} /> {!isSidebarCollapsed && <span className="font-bold text-[10px] tracking-widest uppercase">{item.label}</span>}
            </button>
          ))}
          <button onClick={() => setAppFeedbackModal(true)} className="w-full flex items-center p-3.5 rounded-2xl text-slate-500 hover:text-fuchsia-400 hover:bg-white/5 transition-all gap-4 group">
            <Lightbulb size={18} className="group-hover:animate-pulse" /> {!isSidebarCollapsed && <span className="font-bold text-[10px] tracking-widest uppercase">FEEDBACK</span>}
          </button>
        </nav>
        <div className="p-6 border-t border-white/10"><button onClick={() => router.push('/')} className="w-full flex items-center p-3 text-red-500 hover:bg-red-500/10 rounded-2xl gap-4 font-bold text-[10px] tracking-widest uppercase hover:bg-red-600 hover:text-white transition-all"><Power size={18} /> {!isSidebarCollapsed && "SHUTDOWN"}</button></div>
      </motion.aside>

      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-10 border-b border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/20 rounded-full shadow-inner"><div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_#34d399]" /><span className="text-[9px] font-black text-slate-200 uppercase tracking-widest">GATEWAY ACTIVE</span></div>
            <div className="flex items-center gap-6 text-right"><div className="hidden sm:block"><p className="text-[11px] font-black text-white tracking-widest uppercase">{user.username}</p><p className="text-[9px] font-bold text-fuchsia-400 uppercase tracking-widest mt-1">OPERATIVE MODE</p></div><div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-fuchsia-600 rounded-full flex items-center justify-center border border-white/20 shadow-lg shadow-fuchsia-500/20"><User size={18} /></div></div>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar px-6 lg:px-14 py-10" ref={scrollRef}>
          <AnimatePresence mode="wait">
            
            {/* VIEW DASHBOARD */}
            {view === 'dashboard' && (
              <motion.div key="dash" variants={containerVariants} initial="hidden" animate="show" exit={{opacity:0, y:-10}} className="max-w-[1300px] mx-auto space-y-12">
                <motion.div variants={itemVariants} className="text-center space-y-4 pt-4">
                  <div className="text-fuchsia-400 font-black text-[11px] tracking-[0.6em] uppercase mb-2 flex items-center justify-center gap-3">{getGreeting()} OPERATIVE</div>
                  <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-none uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">{getGreeting()}, <span className="text-fuchsia-500">{user.username}.</span></h1>
                  <p className="text-slate-400 text-[11px] lg:text-[12px] font-bold tracking-[0.3em] uppercase max-w-xl mx-auto opacity-100">Cyber Readiness Index Protocol Gateway v2.1</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   <motion.div variants={itemVariants} className="bg-black/80 backdrop-blur-2xl border border-white/10 p-10 rounded-[3rem] flex flex-col items-center justify-center text-center hover:border-fuchsia-500/40 transition-all shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-fuchsia-500 shadow-[0_0_15px_#d946ef] animate-scan opacity-0 group-hover:opacity-100" />
                        <div className="w-16 h-16 bg-gradient-to-b from-fuchsia-600 to-indigo-900 rounded-3xl flex items-center justify-center text-white border border-white/10 mb-8 shadow-2xl transform group-hover:scale-110 transition-all duration-500"><Fingerprint size={32} /></div>
                        <h4 className="text-xl font-black text-white tracking-widest uppercase leading-none">{user.username}</h4>
                        <p className="text-[10px] text-fuchsia-400 font-black tracking-[0.4em] uppercase mt-4">{user.class_name || "NOT ASSIGNED"}</p>
                   </motion.div>
                   <motion.div variants={itemVariants} className="bg-black/80 backdrop-blur-2xl border border-white/10 p-10 rounded-[3rem] flex flex-col items-center justify-center hover:border-fuchsia-500/40 transition-all shadow-2xl group text-center">
                      <div className="relative mb-6 flex justify-center w-full transform group-hover:scale-105 transition-all">
                        <svg className="w-36 h-36 transform -rotate-90">
                          <circle cx="72" cy="72" r="66" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="transparent" />
                          <motion.circle initial={{ strokeDasharray: "0 1000" }} animate={{ strokeDasharray: `${(score / 100) * 414} 1000` }} transition={{ duration: 2.5, ease: "easeOut" }} cx="72" cy="72" r="66" stroke="#d946ef" strokeWidth="6" strokeLinecap="round" fill="transparent" style={{ filter: 'drop-shadow(0 0 10px rgba(217,70,239,0.8))' }} />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-5xl font-black text-white tracking-tighter">{score}</span><span className="text-[8px] font-black text-slate-500 uppercase mt-1">AVG SCORE</span></div>
                      </div>
                      <div className={`px-8 py-1.5 rounded-full border border-fuchsia-500/30 text-[9px] font-black tracking-widest uppercase bg-black/40 ${getReadinessData(score).text} shadow-lg shadow-black/50`}>{getReadinessData(score).label}</div>
                   </motion.div>
                   <motion.div variants={itemVariants} className="bg-black/80 backdrop-blur-2xl border border-white/10 p-10 rounded-[3rem] hover:border-fuchsia-500/40 transition-all shadow-2xl flex flex-col justify-between group text-center"><p className="text-[10px] font-black text-slate-500 tracking-[0.5em] mb-10 uppercase flex items-center justify-center gap-3"><Activity size={16} className="text-fuchsia-500 animate-pulse"/> SYSTEM ANALYTICS</p>
                      <div className="space-y-6 font-mono text-[9px] lg:text-[10px] tracking-[0.2em] text-slate-300 w-full px-4">
                        <div className="flex justify-between border-b border-white/5 pb-3"><span>HOST</span><span className="text-fuchsia-400 font-bold uppercase">VERCEL</span></div>
                        <div className="flex justify-between border-b border-white/5 pb-3"><span>SECURITY</span><span className="text-emerald-500 font-bold uppercase">AES-256</span></div>
                        <div className="flex justify-between"><span>DATABASE</span><span className="text-white font-bold uppercase opacity-80">SINKRON</span></div>
                      </div>
                   </motion.div>
                   
                   {/* BROADCAST CENTER */}
                   <motion.div variants={itemVariants} className="lg:col-span-3 bg-gradient-to-br from-black to-[#050505] border border-white/10 p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[4rem] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)] group hover:border-fuchsia-500/40 transition-all duration-700">
                      <div className="absolute inset-0 bg-hud-grid opacity-20" />
                      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 blur-[100px] rounded-full -z-10" />
                      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 z-10 text-center lg:text-left">
                        <div className="w-16 lg:w-20 h-16 lg:h-20 bg-black/80 rounded-3xl flex items-center justify-center shrink-0 border border-white/10 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"><BellRing size={32} className="text-fuchsia-500 fill-current animate-bounce" /></div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-center lg:justify-start gap-4"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981] animate-ping" /><span className="text-[10px] lg:text-[11px] font-black tracking-[0.6em] text-emerald-400 uppercase">Mission Status: Active</span></div>
                          <h3 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tighter leading-tight">Assessment Gateway Online.</h3>
                          <p className="text-[10px] lg:text-[11px] font-bold text-slate-400 tracking-widest max-w-2xl uppercase opacity-90 leading-relaxed mx-auto lg:mx-0">Initiate your cyber defense validation protocols now to validate personnel security.</p>
                        </div>
                      </div>
                      <button onClick={handleStartMissionClick} className="w-full lg:w-auto px-10 lg:px-14 py-5 lg:py-7 bg-white text-black rounded-3xl font-black text-[11px] lg:text-[12px] tracking-[0.5em] hover:bg-fuchsia-600 hover:text-white transition-all duration-500 shadow-2xl flex items-center justify-center gap-5 uppercase z-10">START PROTOCOL <Zap size={20} /></button>
                   </motion.div>
                </div>
              </motion.div>
            )}

            {/* VIEW REPORTS - RESULTS */}
            {view === 'reports' && (
              <motion.div key="reports" variants={containerVariants} initial="hidden" animate="show" exit={{opacity:0, x:20}} className="max-w-[1400px] mx-auto space-y-10">
                 <motion.div variants={itemVariants} className="text-center space-y-4 pt-4"><div className="text-fuchsia-400 font-black text-[12px] tracking-[0.6em] uppercase flex items-center justify-center gap-3"><TrendingUp size={16}/> PERFORMANCE ANALYTICS</div><h2 className="text-4xl lg:text-5xl font-black text-white tracking-widest uppercase drop-shadow-2xl">Mission Intelligence.</h2><p className="text-slate-500 text-[11px] font-bold tracking-[0.4em] uppercase max-w-xl mx-auto opacity-100">Historical operative data records summary from secure cloud vaults.</p></motion.div>
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <motion.div variants={itemVariants} className="lg:col-span-7 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden group"><div className="flex-1 text-center md:text-left space-y-6"><p className="text-[11px] font-black text-slate-500 uppercase tracking-widest flex items-center justify-center md:justify-start gap-3"><RadarIcon size={14} className="text-fuchsia-400"/> READINESS BALANCE</p><div className="grid grid-cols-2 gap-4 pt-4">{[ {l:'OPERATIONS', v:history.length}, {l:'GLOBAL SCORE', v:score+'%'} ].map((x,i)=>(<div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/5 shadow-inner hover:border-fuchsia-500/30 transition-all"><p className="text-[9px] font-black text-slate-500 mb-2 uppercase">{x.l}</p><p className="text-3xl lg:text-4xl font-black text-white font-mono tracking-tighter">{x.v}</p></div>))}</div></div><div className="w-full md:w-[320px] h-[300px] mt-10 md:mt-0"><ResponsiveContainer width="100%" height="100%"><RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}><PolarGrid stroke="rgba(255,255,255,0.05)" /><PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} /><Radar name="Score" dataKey="A" stroke="#d946ef" fill="#d946ef" fillOpacity={0.4} /><Tooltip contentStyle={{ backgroundColor: '#000', borderRadius: '12px', border: '1px solid #333' }} /></RadarChart></ResponsiveContainer></div></motion.div>
                    <motion.div variants={itemVariants} className="lg:col-span-5 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 lg:p-10 flex flex-col items-center justify-center text-center shadow-2xl relative group overflow-hidden"><div className={`p-8 rounded-[2.5rem] mb-6 border-2 shadow-2xl transform group-hover:scale-110 transition-all duration-700`} style={{ borderColor: `${getReadinessData(score).color}30`, backgroundColor: `${getReadinessData(score).color}05` }}><ShieldAlert size={60} style={{ color: getReadinessData(score).color }} className="animate-pulse" /></div><p className="text-[11px] font-black text-slate-500 tracking-widest mb-2 uppercase">CLASSIFICATION</p><h3 className={`text-4xl lg:text-5xl font-black tracking-widest uppercase ${getReadinessData(score).text}`} style={{ textShadow: `0 0 20px ${getReadinessData(score).color}60` }}>{getReadinessData(score).label}</h3></motion.div>
                 </div>
                 <motion.div variants={itemVariants} className="bg-black/80 border border-white/10 rounded-[2.5rem] lg:rounded-[3rem] p-6 lg:p-8 shadow-2xl relative overflow-hidden backdrop-blur-3xl"><div className="relative z-10 bg-black/40 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-inner"><table className="w-full text-center border-collapse"><thead><tr className="border-b border-white/10 bg-white/[0.04]"><th className="py-7 text-[10px] font-black tracking-[0.6em] text-slate-400 uppercase">SESSION</th><th className="py-7 text-[10px] font-black tracking-[0.6em] text-slate-400 uppercase">OPERATIONAL SECTOR</th><th className="py-7 text-[10px] font-black tracking-[0.6em] text-slate-400 uppercase">ACCURACY</th><th className="py-7 text-[10px] font-black tracking-[0.6em] text-slate-400 uppercase">ACTION</th></tr></thead><tbody className="text-white font-bold">{history.map((h, i) => { const st = getReadinessData(h.score); return (<tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-all group"><td className="py-10 text-[13px] font-black font-mono text-fuchsia-400 opacity-60 group-hover:opacity-100">#0{history.length - i}</td><td className="py-10 text-[11px] lg:text-[13px] font-black uppercase tracking-widest">{h.domain_id}</td><td className="py-10"><div className="flex flex-col items-center gap-3"><span className="text-2xl font-black font-mono tracking-tighter text-white">{h.score}%</span><div className="w-24 h-1.5 bg-black rounded-full overflow-hidden border border-white/5"><div className={`h-full ${st.bg} shadow-[0_0_10px_currentColor] transition-all duration-1000`} style={{ width: `${h.score}%`, color: st.color }} /></div></div></td><td className="py-10"><button onClick={() => setDetailModal(h.details || [])} className="mx-auto flex items-center gap-4 px-8 py-3 bg-white/5 border border-white/10 hover:border-fuchsia-500/60 text-white rounded-3xl text-[10px] font-black tracking-[0.4em] transition-all uppercase shadow-xl hover:shadow-fuchsia-500/20"><Eye size={16} /> ANALYZE</button></td></tr>)})}</tbody></table></div></motion.div>
              </motion.div>
            )}

            {/* VIEW ASSESSMENT (DEEP BLACK GLASS) */}
            {view === 'assessment' && (
              <motion.div key="assess-hub" variants={containerVariants} initial="hidden" animate="show" exit={{opacity:0, scale:0.9}} className="max-w-6xl mx-auto space-y-12">
                <motion.div variants={itemVariants} className="text-center space-y-4 pt-6"><h2 className="text-5xl font-black text-white tracking-widest uppercase leading-none drop-shadow-2xl">Target Modules.</h2><p className="text-fuchsia-400 text-[11px] font-black tracking-[0.6em] uppercase text-center">Select strategic sector for diagnostic protocol</p></motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                  {TACTICAL_DOMAINS.map((domain, i) => {
                    const done = history.some(h => String(h.domain_id).toLowerCase().includes(domain.id.split(' ')[0].toLowerCase()));
                    return (
                      <motion.div 
                        key={i} variants={itemVariants} whileHover={{ y: -8, scale: 1.02 }} onClick={() => { setSelectedDomain(domain.id); setView('briefing'); }} 
                        className={`bg-black/80 backdrop-blur-2xl border ${done ? 'border-fuchsia-500/50 shadow-[0_0_30px_rgba(217,70,239,0.15)]' : 'border-white/10 hover:border-white/20'} p-8 rounded-[2.5rem] cursor-pointer group transition-all duration-300 shadow-2xl relative overflow-hidden`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br from-${domain.color.replace('#', '')}/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500`} style={{ background: `linear-gradient(to bottom right, ${domain.color}15, transparent)` }} />
                        
                        <div className="flex justify-between items-start mb-8 relative z-10">
                          <div className="w-14 h-14 rounded-[1.2rem] flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-xl transition-all" style={{ backgroundColor: `${domain.color}10`, border: `1px solid ${domain.color}30` }}>
                             <domain.icon size={26} style={{ color: domain.color }} />
                          </div>
                          {done && <div className="bg-fuchsia-600/20 px-3 py-1.5 rounded-full border border-fuchsia-500/30 shadow-lg"><span className="text-[9px] font-black text-fuchsia-400 tracking-widest uppercase">Verified</span></div>}
                        </div>
                        
                        <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tighter leading-none relative z-10 group-hover:text-fuchsia-100 transition-colors">{domain.title}</h3>
                        <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mb-8 leading-relaxed opacity-90 relative z-10">{domain.desc}</p>
                        
                        <div className="mt-auto pt-6 border-t border-white/10 flex justify-end items-center relative z-10">
                           <span className="text-[10px] font-black tracking-[0.4em] text-slate-500 group-hover:text-fuchsia-400 group-hover:translate-x-2 transition-all uppercase">
                             INITIALIZE <ArrowRight size={14} className="inline ml-3" />
                           </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* VIEW MISSION */}
            {view === 'mission' && (
              <motion.div key="mission" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-12 pb-44 text-center lg:text-left">
                <header className="flex justify-between items-end border-b border-white/10 pb-10 pt-6"><div className="space-y-4"><button onClick={() => setView('assessment')} className="text-[11px] font-black text-slate-400 hover:text-red-400 flex items-center gap-4 tracking-widest uppercase transition-all"><ArrowLeft size={20} /> ABORT SESSION</button><h2 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">PHASE 0{currentStep}</h2><p className="text-fuchsia-500 font-black tracking-[0.6em] text-[11px] uppercase">PROTOCOL: {selectedDomain}</p></div><div className="text-[100px] lg:text-[120px] font-black text-white/5 font-mono leading-none tracking-tighter">0{currentStep}</div></header>
                <div className="space-y-10">{currentStepQs.map((q) => (<div key={q.id} className="p-10 lg:p-12 rounded-[3rem] bg-black/80 border border-white/10 space-y-12 shadow-2xl relative overflow-hidden transition-all hover:border-fuchsia-500/40"><div className="absolute top-0 left-0 w-2 h-full bg-fuchsia-600 shadow-[0_0_20px_#d946ef]" /><h4 className="text-2xl lg:text-3xl font-medium text-white leading-snug tracking-tight">"{q.text}"</h4><div className="grid grid-cols-1 gap-5">{q.options.slice(0, 4).map((opt: any, i: number) => (<button key={i} onClick={() => setAns({...ans, [q.id]: {score: opt.score, text: opt.text}})} className={`p-8 rounded-[2rem] text-left transition-all border-2 text-[11px] lg:text-[12px] font-black tracking-[0.1em] uppercase flex items-center gap-8 ${ans[q.id]?.text === opt.text ? 'bg-fuchsia-600/20 border-fuchsia-500 text-white shadow-2xl' : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'}`}><div className={`w-5 h-5 rounded-full border-[3px] flex items-center justify-center shrink-0 ${ans[q.id]?.text === opt.text ? 'border-fuchsia-400 shadow-[0_0_10px_#d946ef]' : 'border-slate-700'}`}>{ans[q.id]?.text === opt.text && <div className="w-2 h-2 bg-fuchsia-400 rounded-full shadow-[0_0_15px_#d946ef]" />}</div><span>{opt.text}</span></button>))}</div></div>))}</div>
                <div className="flex gap-6 pt-12">{currentStep > 1 && <button onClick={() => setCurrentStep(p => p - 1)} className="px-12 py-6 bg-black border border-white/10 text-slate-400 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-white/5 transition-all">PREVIOUS</button>}{currentStep < maxStep ? <button disabled={!isStepComplete} onClick={() => setCurrentStep(p => p + 1)} className={`flex-1 py-6 rounded-full font-black text-[11px] tracking-widest transition-all uppercase ${isStepComplete ? 'bg-fuchsia-600 text-white shadow-2xl' : 'bg-white/5 text-slate-800 cursor-not-allowed'}`}>CONTINUE</button> : <button disabled={!isStepComplete || loading} onClick={executeUplink} className={`flex-1 py-6 rounded-full font-black text-[11px] tracking-widest transition-all uppercase flex items-center justify-center gap-6 ${isStepComplete ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-2xl' : 'bg-white/5 text-slate-800 cursor-not-allowed'}`}>{submitStatus} <Zap size={20}/></button>}</div>
              </motion.div>
            )}

            {/* VIEW BRIEFING */}
            {view === 'briefing' && (
              <motion.div key="briefing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{opacity:0, scale:1.1}} className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[75vh]">
                 <div className="mb-20"><RobotFace size={36} ringSize="w-56 h-56" coreSize="w-36 h-36" /></div>
                 <motion.div className="flex flex-col items-center text-center space-y-8"><div className="px-6 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-400/50 text-emerald-400 text-[11px] font-black tracking-[0.7em] uppercase shadow-[0_0_30px_rgba(52,211,153,0.2)] animate-pulse">Uplink Confirmed</div><h2 className="text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-2xl text-center">Transmission Received.</h2><p className="text-[13px] font-black text-white leading-relaxed tracking-[0.2em] uppercase max-w-2xl opacity-100 mx-auto text-center">Halo <span className="text-fuchsia-400">{user.username}</span>, inisiasi kuis untuk topik <span className="text-fuchsia-400">{selectedDomain}</span> sekarang?</p></motion.div>
                 <div className="flex flex-col lg:flex-row gap-8 mt-20 w-full lg:w-auto px-10 lg:px-0"><button onClick={() => setView('assessment')} className="w-full lg:w-auto px-14 py-5 border-2 border-white/10 text-slate-400 rounded-full font-black text-[11px] tracking-[0.5em] uppercase hover:border-white/30 hover:text-white transition-all">Cancel</button><button onClick={handleStartMissionClick} className="w-full lg:w-auto px-14 py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full font-black text-[11px] tracking-[0.5em] shadow-[0_20px_60px_rgba(217,70,239,0.5)] hover:scale-105 transition-all uppercase flex items-center justify-center gap-6">Execute Protocol <Zap size={20} /></button></div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      {/* --- MODAL SYSTEM FEEDBACK --- */}
      <AnimatePresence>
        {appFeedbackModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-[#020108]/96 backdrop-blur-[50px]">
             <div className="absolute w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[140px] -z-10 animate-pulse" />
             <motion.div initial={{ scale: 0.9, y: 40, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }} transition={{ type: 'spring', damping: 25 }} className="w-full max-w-2xl bg-black/90 border border-white/10 rounded-[3rem] p-12 shadow-[0_0_80px_rgba(217,70,239,0.2)] relative overflow-hidden backdrop-blur-3xl">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600" />
                <div className="flex justify-between items-start mb-12 relative z-10">
                   <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_30px_rgba(217,70,239,0.5)] border border-white/10"><Zap size={24} className="fill-current" /></div>
                      <div><h2 className="text-3xl font-black text-white uppercase tracking-tighter">PREMIUM FEEDBACK</h2><p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.5em] mt-2">TRANSMITTING TO: devinedwinsiahaan171105@gmail.com</p></div>
                   </div>
                   <button onClick={() => setAppFeedbackModal(false)} className="p-3 bg-white/5 rounded-xl text-slate-500 hover:bg-red-500/20 hover:text-red-400 border border-white/5 transition-all"><X size={20}/></button>
                </div>
                <div className="space-y-8 relative z-10">
                   <div>
                      <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-widest mb-3 flex items-center gap-3"><Hexagon size={12}/> SELECT COMMAND CATEGORY</label>
                      <select value={appFeedbackForm.category} onChange={(e) => setAppFeedbackForm({...appFeedbackForm, category: e.target.value})} className="w-full bg-black border border-white/10 rounded-[1.5rem] p-5 text-[11px] font-black text-white uppercase outline-none focus:border-fuchsia-500 appearance-none cursor-pointer"><option value="AI ENHANCEMENT">🤖 AI SYSTEM</option><option value="UI/UX MODERNIZATION">🎨 UI / UX</option><option value="SECURITY EXPANSION">🛡️ SECURITY</option><option value="REAL-TIME ANALYTICS">📊 ANALYTICS</option><option value="SYSTEM PERFORMANCE">⚡ PERFORMANCE</option><option value="MOBILE INTEGRATION">📱 MOBILE</option><option value="BUG REPORT">⚠️ BUG REPORT</option><option value="OTHER">🌐 OTHER</option></select>
                   </div>
                   <textarea value={appFeedbackForm.message} onChange={(e) => setAppFeedbackForm({...appFeedbackForm, message: e.target.value})} placeholder="INPUT RECOMMENDATIONS..." className="w-full h-40 bg-black border border-white/10 rounded-[2rem] p-6 text-[12px] font-bold text-white focus:border-fuchsia-500 outline-none resize-none placeholder:text-slate-800 transition-all shadow-inner" />
                   <button onClick={submitAppFeedback} disabled={isSendingFeedback} className="w-full py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-[1.5rem] font-black text-[11px] tracking-[0.5em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-5 shadow-2xl disabled:opacity-50">{isSendingFeedback ? "TRANSMITTING DATA..." : "EXECUTE TRANSMISSION"} <Send size={18}/></button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DETAIL MODAL --- */}
      <AnimatePresence>
        {detailModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[3000] flex items-center justify-center p-6 bg-black/98 backdrop-blur-3xl text-center">
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-4xl max-h-[85vh] bg-black border border-white/10 rounded-[3rem] p-10 shadow-2xl flex flex-col overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 shadow-[0_0_30px_rgba(217,70,239,0.5)]" />
               <div className="flex justify-between items-center mb-8 shrink-0">
                  <div><h2 className="text-xl font-black text-white tracking-widest uppercase flex items-center gap-4"><Laptop size={24} className="text-fuchsia-500"/> POST-MISSION ANALYSIS</h2></div>
                  <button onClick={() => setDetailModal(null)} className="p-3 bg-white/5 rounded-xl text-slate-500 hover:text-red-500 border border-white/5"><X size={20} /></button>
               </div>
               <div className="flex-1 overflow-y-auto pr-4 space-y-4 custom-scrollbar text-center">
                 {detailModal.map((d: any, i: number) => (
                    <div key={i} className={`p-8 rounded-[2rem] border bg-black/60 flex flex-col items-center ${d.is_correct ? 'border-emerald-500/20' : 'border-red-500/20'}`}>
                          <div className={`p-3 rounded-2xl mb-6 ${d.is_correct ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>{d.is_correct ? <CheckCircle2 size={28} /> : <XCircle size={28} />}</div>
                          <div className="w-full text-center space-y-6"><p className="text-slate-100 font-medium text-[15px] leading-relaxed tracking-tight">"{d.question}"</p><div className="bg-[#050505] p-6 rounded-2xl border border-white/5"><p className="text-[9px] font-black text-slate-600 tracking-[0.5em] mb-3 uppercase text-center">Personnel Response</p><p className={`font-black text-[13px] tracking-widest ${d.is_correct ? 'text-emerald-500' : 'text-red-500'}`}>{d.answer || "N/A"}</p></div></div>
                    </div>
                 ))}
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CLASS SELECTOR MODAL */}
      <AnimatePresence>
        {showClassSelector && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/98 backdrop-blur-3xl text-center">
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-3xl bg-black border border-white/10 rounded-[3rem] p-12 shadow-2xl overflow-hidden">
               <div className="w-16 h-16 bg-indigo-500/10 border-2 border-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl"><Workflow size={32} className="text-indigo-400" /></div>
               <h2 className="text-3xl font-black mb-3 text-white tracking-widest uppercase">CLASSIFICATION <span className="text-fuchsia-500">REQUIRED.</span></h2>
               <p className="text-slate-400 mb-10 text-[11px] font-black uppercase tracking-[0.4em]">Please select your primary operational sector to continue.</p>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                 {AVAILABLE_CLASSES.map(cls => (
                    <button key={cls} onClick={() => assignClassAndStartMission(cls)} className="p-6 bg-black/60 border border-white/10 rounded-2xl font-black text-[11px] tracking-widest text-slate-500 hover:text-white hover:border-fuchsia-500 hover:bg-fuchsia-500/10 transition-all uppercase shadow-inner">{cls}</button>
                 ))}
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } }
        .animate-scan { animation: scan 6s linear infinite; position: absolute; z-index: 10; }
        .bg-hud-grid { background-image: linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px); background-size: 50px 50px; transform: perspective(800px) rotateX(45deg) scale(2.5); transform-origin: top; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(217, 70, 239, 0.5); border-radius: 20px; }
        ::-webkit-scrollbar { width: 0px; }
        ::selection { background: #d946ef; color: white; }
      `}} />
    </div>
  );
}