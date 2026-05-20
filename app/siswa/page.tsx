"use client"
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShieldCheck, Brain, Target, ChevronRight, ChevronLeft, Zap, ArrowLeft, ArrowRight,
  Fingerprint, Power, BarChart3, Activity, ShieldAlert, Cpu, Globe, Lock, 
  Radar, Terminal, Database, Server, Search, Radio, Bug, MailWarning, 
  Sparkles, AlertTriangle, Eye, CheckCircle2, XCircle, X, User, Info, 
  ShieldQuestion, LayoutGrid, Check, BellRing, Bot, ScanLine
} from 'lucide-react'

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
    window.addEventListener('touchstart', handleInteraction);
    return () => { window.removeEventListener('mousedown', handleInteraction); window.removeEventListener('touchstart', handleInteraction); };
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

// --- 2. BACKGROUND COMPONENT ---
const PersistentUniverse = React.memo(({ bgIdx }: { bgIdx: number }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.img key={bgIdx} src={CYBER_ASSETS[bgIdx]} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 0.35, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 4 }} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/70 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-3d opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#000000_100%)] pointer-events-none" />
    </div>
  );
});
PersistentUniverse.displayName = 'PersistentUniverse';

// --- 3. ROBOT AI INTERAKTIF ---
const RobotFace = ({ size = 24, ringSize = "w-40 h-40", coreSize = "w-24 h-24" }) => {
  const faceRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!faceRef.current) return;
      const rect = faceRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      const moveX = ((clientX - centerX) / window.innerWidth) * 40;
      const moveY = ((clientY - centerY) / window.innerHeight) * 40;
      setOffset({ x: Math.max(-15, Math.min(15, moveX)), y: Math.max(-15, Math.min(15, moveY)) });
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
    return () => { window.removeEventListener('mousemove', handleMove); window.removeEventListener('touchmove', handleMove); };
  }, []);
  return (
    <div className="relative flex items-center justify-center" ref={faceRef}>
      <div className={`absolute ${ringSize} border-[1px] border-dashed border-fuchsia-500/40 rounded-full animate-[spin_10s_linear_infinite]`} style={{ transform: 'scale(1.2)' }} />
      <div className={`relative ${coreSize} bg-[#050505] border-2 border-fuchsia-500 rounded-full shadow-[0_0_50px_rgba(217,70,239,0.6)] flex flex-col items-center justify-center z-10 overflow-hidden`}>
         <motion.div animate={{ x: offset.x, y: offset.y }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="flex flex-col items-center justify-center z-20">
           <div className="flex gap-4 mb-2">
             <div className="w-2.5 h-4 bg-fuchsia-400 rounded-full animate-pulse shadow-[0_0_10px_#d946ef]" />
             <div className="w-2.5 h-4 bg-fuchsia-400 rounded-full animate-pulse shadow-[0_0_10px_#d946ef]" />
           </div>
           <svg viewBox="0 0 24 24" width={size} height={size} className="text-fuchsia-400 drop-shadow-[0_0_8px_#d946ef]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
             <path d="M7 14s2 2 5 2 5-2 5-2" />
           </svg>
         </motion.div>
      </div>
    </div>
  );
};

// --- 4. DATA HELPER ---
const getReadinessData = (score: number) => {
  if (score >= 80) return { label: "EXCELLENT", color: "#d946ef", bg: "bg-fuchsia-600" };
  if (score >= 50) return { label: "AVERAGE", color: "#eab308", bg: "bg-yellow-600" };
  return { label: "POOR", color: "#ef4444", bg: "bg-red-600" };
};

const portalTransition = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }, exit: { opacity: 0, scale: 1.02 } };

export default function StudentGodTierDashboard() {
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
  const [submitStatus, setSubmitStatus] = useState('KIRIM JAWABAN');

  // State Modals
  const [detailModal, setDetailModal] = useState<any>(null);
  const [showRetakeWarning, setShowRetakeWarning] = useState(false);
  const [pendingDomain, setPendingDomain] = useState("");
  const [showClassSelector, setShowClassSelector] = useState(false);
  const [showCheatModal, setShowCheatModal] = useState(false);
  const [navWarning, setNavWarning] = useState<{active: boolean, target: string | null}>({ active: false, target: null });

  const readiness = useMemo(() => getReadinessData(score), [score]);
  const TACTICAL_DOMAINS = [
    { id: "Social Engineering", title: "Social Engineering", icon: Brain, color: "#d946ef", desc: "Psychological Defense" },
    { id: "Malware", title: "Malware", icon: Bug, color: "#F87171", desc: "Detection & Analysis" },
    { id: "Phishing", title: "Phishing", icon: MailWarning, color: "#818CF8", desc: "Credential Protection" },
    { id: "Network", title: "Network Security", icon: Globe, color: "#34D399", desc: "Traffic Control" },
    { id: "Privilege", title: "Privilege Escalation", icon: Lock, color: "#d8b4fe", desc: "Access Management" },
    { id: "Threat", title: "Threat Hunting", icon: Radar, color: "#FB923C", desc: "Proactive Search" },
  ];

  // Logic: Dynamic Greeting
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
    if (!user.class_name || user.class_name === "UNASSIGNED") { setShowClassSelector(true); } 
    else { setView('mission'); setCurrentStep(1); }
  };

  const assignClassAndStartMission = (className: string) => {
    const updatedUser = { ...user, class_name: className };
    setUser(updatedUser); localStorage.setItem('user', JSON.stringify(updatedUser)); 
    setShowClassSelector(false); setView('mission'); setCurrentStep(1);
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

  const handleSafeViewChange = (targetView: string) => {
    if (view === 'mission' && !['mission', 'logout'].includes(targetView)) { setNavWarning({ active: true, target: targetView }); return; }
    if (targetView === 'logout') { localStorage.removeItem('user'); router.push('/'); } else { setView(targetView); }
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

      {/* --- SIDEBAR (LABELS UPDATED: Readiness Test & Result) --- */}
      <motion.aside initial={false} animate={{ width: isSidebarCollapsed ? 80 : 280 }} className="h-screen bg-[#050505]/90 backdrop-blur-3xl border-r border-white/5 flex flex-col z-[100] transition-all duration-500 relative">
        <div className="h-20 px-6 flex items-center justify-between border-b border-white/5">
          {!isSidebarCollapsed && <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-600 to-purple-800 flex items-center justify-center shadow-lg"><ShieldCheck size={18} className="text-white" /></div><span className="font-black tracking-widest text-sm text-white uppercase tracking-[0.2em]">CYBER EDU</span></div>}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 hover:bg-white/5 rounded-lg mx-auto transition-all text-slate-500"><ChevronLeft className={isSidebarCollapsed ? "rotate-180" : ""} /></button>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-2">
          <button onClick={() => handleSafeViewChange('dashboard')} className={`w-full flex items-center p-4 rounded-xl transition-all gap-4 ${view === 'dashboard' ? 'bg-fuchsia-600/10 text-fuchsia-400 border border-fuchsia-500/20 shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
            <LayoutGrid size={20} /> {!isSidebarCollapsed && <span className="font-bold text-[10px] tracking-[0.2em] uppercase">BERANDA</span>}
          </button>
          <button onClick={() => handleSafeViewChange('assessment')} className={`w-full flex items-center p-4 rounded-xl transition-all gap-4 ${view === 'assessment' || view === 'mission' || view === 'briefing' ? 'bg-fuchsia-600/10 text-fuchsia-400 border border-fuchsia-500/20 shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
            <Target size={20} /> {!isSidebarCollapsed && <span className="font-bold text-[10px] tracking-[0.2em] uppercase">READINESS TEST</span>}
          </button>
          <button onClick={() => handleSafeViewChange('reports')} className={`w-full flex items-center p-4 rounded-xl transition-all gap-4 ${view === 'reports' ? 'bg-fuchsia-600/10 text-fuchsia-400 border border-fuchsia-500/20 shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
            <BarChart3 size={20} /> {!isSidebarCollapsed && <span className="font-bold text-[10px] tracking-[0.2em] uppercase">RESULT</span>}
          </button>
        </nav>
        <div className="p-6 border-t border-white/5"><button onClick={() => handleSafeViewChange('logout')} className="w-full flex items-center p-3 text-red-500 hover:bg-red-500/10 rounded-xl gap-4 font-bold text-[10px] tracking-[0.2em] uppercase transition-colors"><Power size={18} /> {!isSidebarCollapsed && "KELUAR SESI"}</button></div>
      </motion.aside>

      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-12 border-b border-white/5 bg-[#050505]/60 backdrop-blur-md">
            <div className="flex items-center gap-3 px-4 py-1.5 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-full"><div className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full animate-pulse shadow-[0_0_10px_#d946ef]" /><span className="text-[9px] font-black text-fuchsia-400 tracking-[0.2em] uppercase">KONEKSI AMAN</span></div>
            <div className="flex items-center gap-6">
                <div className="text-right">
                    <p className="text-[11px] font-black text-white tracking-[0.1em] uppercase">{user.username}</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase">{user.class_name || "UNASSIGNED"}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-600 to-purple-800 rounded-full flex items-center justify-center text-white border border-white/10 shadow-lg shadow-fuchsia-500/20"><User size={18} /></div>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar px-12 py-10" ref={scrollRef}>
          <AnimatePresence mode="wait">
            
            {/* VIEW DASHBOARD (FIXED SPREAD PORTALTRANSITION AS ANY) */}
            {view === 'dashboard' && (
              <motion.div key="dash" {...(portalTransition as any)} className="max-w-6xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                  <div className="font-mono text-[10px] text-slate-500 tracking-[0.4em] uppercase opacity-70">STATUS: AKTIF • {getGreeting()} <span className="text-fuchsia-400 animate-pulse">SIAP EVALUASI</span></div>
                  <h1 className="text-6xl font-black text-white tracking-tighter leading-none uppercase">{getGreeting()}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-600">{user.username}.</span></h1>
                  <p className="text-slate-500 text-[11px] font-bold tracking-[0.3em] uppercase max-w-lg mx-auto">Sistem Evaluasi Siber Terpadu • Monitoring Kompetensi Keamanan Informasi</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
                   <div className="bg-[#09090b]/80 backdrop-blur-xl border border-white/5 p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center hover:border-fuchsia-500/30 transition-all shadow-2xl relative overflow-hidden group"><div className="w-20 h-20 bg-gradient-to-b from-fuchsia-600 to-purple-900 rounded-3xl flex items-center justify-center text-white border border-fuchsia-500/50 mb-8 shadow-xl"><Fingerprint size={40} /></div><h4 className="text-3xl font-black text-white tracking-widest uppercase">{user.username}</h4><p className="text-[11px] text-fuchsia-400 font-bold tracking-[0.3em] uppercase mt-4">{user.class_name}</p></div>
                   <div className="bg-[#09090b]/80 backdrop-blur-xl border border-white/5 p-10 rounded-[2.5rem] flex flex-col items-center justify-center hover:border-fuchsia-500/30 transition-all shadow-2xl group"><div className="relative mb-6 flex justify-center w-full transform group-hover:scale-105 transition-all"><svg className="w-40 h-40 transform -rotate-90"><circle cx="80" cy="80" r="72" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="transparent" /><motion.circle initial={{ strokeDasharray: "0 1000" }} animate={{ strokeDasharray: `${(score / 100) * 452} 1000` }} transition={{ duration: 2.5, ease: "easeOut" }} cx="80" cy="80" r="72" stroke="#d946ef" strokeWidth="6" strokeLinecap="round" fill="transparent" style={{ filter: 'drop-shadow(0 0 15px rgba(217,70,239,0.7))' }} /></svg><div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-6xl font-black text-white tracking-tighter">{score}</span><span className="text-[9px] font-bold text-slate-500 uppercase mt-1 tracking-widest">Rata-rata</span></div></div><div className="px-8 py-2 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400 font-black text-[10px] tracking-[0.4em] uppercase shadow-lg">{readiness.label}</div></div>
                   <div className="bg-[#09090b]/80 backdrop-blur-xl border border-white/5 p-10 rounded-[2.5rem] hover:border-fuchsia-500/30 transition-all shadow-2xl flex flex-col items-center justify-center text-center group"><p className="text-[10px] font-black text-slate-600 tracking-[0.4em] mb-10 uppercase flex items-center gap-3"><Activity size={14} className="text-fuchsia-500"/> SISTEM STATUS</p><div className="space-y-6 font-mono text-[10px] tracking-[0.2em] text-slate-400 w-full px-4"><div className="flex justify-between border-b border-white/5 pb-3"><span>SERVER</span><span className="text-fuchsia-400 font-bold uppercase">Online</span></div><div className="flex justify-between border-b border-white/5 pb-3"><span>ENKRIPSI</span><span className="text-emerald-500 font-bold uppercase">AES-256</span></div><div className="flex justify-between"><span>DATABASE</span><span className="text-white font-bold opacity-80 uppercase">SINKRON</span></div></div></div>
                   
                   {/* BROADCAST CENTER - BOTTOM PANEL */}
                   <div className="lg:col-span-3 bg-gradient-to-br from-[#09090b] to-[#050505] border border-white/5 p-10 rounded-[3rem] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl group hover:border-fuchsia-500/30 transition-all mt-6">
                      <div className="flex items-center gap-10 z-10 text-center lg:text-left"><div className="w-20 h-20 bg-[#070707] rounded-3xl flex items-center justify-center border border-white/5 shadow-2xl"><BellRing size={32} className="text-fuchsia-500 animate-bounce" /></div><div className="space-y-4"><div className="flex items-center justify-center lg:justify-start gap-4"><div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-ping" /><span className="text-[10px] font-black tracking-[0.5em] text-fuchsia-500 uppercase">Notifikasi Pusat</span></div><div className="space-y-2"><p className="text-2xl font-black text-white uppercase tracking-wider">Sistem Readiness Test Telah Siap.</p><p className="text-xs font-medium text-slate-500 tracking-widest max-w-2xl leading-relaxed uppercase opacity-80">Silakan inisiasi protokol evaluasi untuk mengukur pertahanan siber Anda.</p></div></div></div>
                      <button onClick={handleStartMissionClick} className="px-14 py-6 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-2xl font-black text-[12px] tracking-[0.5em] hover:scale-[1.05] transition-all shadow-[0_15px_40px_rgba(217,70,239,0.4)] flex items-center gap-5 uppercase z-10">PROSES READINESS TEST <Zap size={20} /></button>
                   </div>
                </div>
              </motion.div>
            )}

            {/* VIEW REPORTS - RESULT (CENTER ALIGNED) */}
            {view === 'reports' && (
              <motion.div key="reports" {...(portalTransition as any)} className="max-w-6xl mx-auto space-y-12">
                 <div className="space-y-3 text-center">
                    <h2 className="text-5xl font-black text-white tracking-widest uppercase">Evaluation Result.</h2>
                    <p className="text-slate-500 text-[11px] font-bold tracking-[0.4em] uppercase">Rekapitulasi Hasil Pengerjaan Sektor Keamanan</p>
                 </div>
                 <div className="bg-[#09090b]/90 backdrop-blur-2xl border border-white/5 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden text-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 relative z-10">
                        <div className="bg-[#050505]/60 rounded-3xl p-8 border border-white/5 flex flex-col items-center group hover:border-fuchsia-500/20 transition-all"><p className="text-[10px] text-slate-500 font-black tracking-[0.4em] mb-4 uppercase">TOTAL UJIAN</p><p className="text-5xl text-white font-black font-mono tracking-tighter">{history.length}</p></div>
                        <div className="bg-[#050505]/60 rounded-3xl p-8 border border-white/5 flex flex-col items-center group hover:border-fuchsia-500/20 transition-all"><p className="text-[10px] text-slate-500 font-black tracking-[0.4em] mb-4 uppercase">NILAI RATA-RATA</p><p className="text-5xl text-fuchsia-400 font-black font-mono tracking-tighter">{score}%</p></div>
                        <div className="bg-[#050505]/60 rounded-3xl p-8 border border-white/5 flex flex-col items-center group hover:border-fuchsia-500/20 transition-all"><p className="text-[10px] text-slate-500 font-black tracking-[0.4em] mb-4 uppercase">PREDIKAT</p><p className={`text-2xl font-black tracking-[0.2em] uppercase mt-2 ${readiness.color === '#ef4444' ? 'text-red-500' : readiness.color === '#eab308' ? 'text-yellow-500' : 'text-fuchsia-400'}`}>{readiness.label}</p></div>
                    </div>
                    <div className="relative z-10 bg-[#050505]/40 border border-white/5 rounded-3xl overflow-hidden shadow-inner">
                      <div className="p-8 border-b border-white/5 bg-white/[0.01] text-center"><p className="text-[12px] font-black text-white tracking-[0.5em] uppercase">TABEL RIWAYAT DOMAIN</p></div>
                      <div className="overflow-x-auto"><table className="w-full text-center border-collapse"><thead><tr className="border-b border-white/5 bg-white/[0.03]"><th className="py-6 text-[9px] font-black tracking-[0.4em] text-slate-500 uppercase">Sesi</th><th className="py-6 text-[9px] font-black tracking-[0.4em] text-slate-500 uppercase">Sektor Target</th><th className="py-6 text-[9px] font-black tracking-[0.4em] text-slate-500 uppercase">Akurasi</th><th className="py-6 text-[9px] font-black tracking-[0.4em] text-slate-500 uppercase">Keterangan</th><th className="py-6 text-[9px] font-black tracking-[0.4em] text-slate-500 uppercase">Detail</th></tr></thead><tbody>{history.length === 0 ? (<tr><td colSpan={5} className="py-20 text-slate-600 font-black text-xs uppercase tracking-widest">RIWAYAT KOSONG</td></tr>) : (history.map((h, i) => { const rd = getReadinessData(h.score); return (<tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"><td className="py-7"><span className="text-[11px] font-black text-white font-mono">0{history.length - i}</span></td><td className="py-7 text-[11px] font-bold text-slate-300 uppercase tracking-widest">{h.domain_id}</td><td className="py-7 font-black text-white font-mono text-lg tracking-tighter">{h.score}%</td><td className="py-7"><span className="px-4 py-1.5 rounded-full text-[9px] font-black border border-white/10" style={{ color: rd.color, backgroundColor: `${rd.color}10` }}>{rd.label}</span></td><td className="py-7"><button onClick={() => setDetailModal(h.details || [])} className="mx-auto flex items-center gap-2 px-6 py-2.5 bg-[#0a0a0f] border border-white/10 hover:border-fuchsia-500/50 text-slate-400 hover:text-white rounded-xl text-[9px] font-black tracking-[0.3em] transition-all uppercase"><ScanLine size={14} /> Buka</button></td></tr>)}))}</tbody></table></div></div>
                 </div>
              </motion.div>
            )}

            {/* VIEW ASSESSMENT */}
            {view === 'assessment' && (
              <motion.div key="assess-hub" {...(portalTransition as any)} className="max-w-6xl mx-auto space-y-12">
                <div className="space-y-4 text-center"><h2 className="text-4xl font-black text-white tracking-widest uppercase">Readiness Test Modules.</h2><p className="text-[9px] font-bold text-slate-500 tracking-[0.5em] uppercase">Pilih sektor keamanan siber untuk dievaluasi</p></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {TACTICAL_DOMAINS.map((domain, i) => {
                    const done = history.some(h => String(h.domain_id).toLowerCase().includes(domain.id.split(' ')[0].toLowerCase()));
                    return (
                      <motion.div key={i} whileHover={{ y: -8 }} onClick={() => { if(done) { setPendingDomain(domain.id); setShowRetakeWarning(true); } else { setSelectedDomain(domain.id); setView('briefing'); } }} className={`bg-[#09090b]/90 border ${done ? 'border-fuchsia-500/40 shadow-lg' : 'border-white/5'} p-8 rounded-[2rem] cursor-pointer group flex flex-col transition-all hover:border-fuchsia-500/30 overflow-hidden`}><div className="flex justify-between items-start mb-8"><div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl" style={{ backgroundColor: `${domain.color}10`, border: `1px solid ${domain.color}30` }}><domain.icon size={24} style={{ color: domain.color }} /></div>{done && <div className="bg-fuchsia-500/10 px-3 py-1 rounded-full border border-fuchsia-500/20"><span className="text-[8px] font-black text-fuchsia-400 tracking-widest uppercase">Tuntas</span></div>}</div><h3 className="text-lg font-black text-white mb-2 uppercase tracking-widest">{domain.title}</h3><p className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase mb-8 line-clamp-2">{domain.desc}</p><div className="mt-auto pt-5 border-t border-white/5 flex justify-end items-center"><span className="text-[9px] font-black tracking-widest text-slate-400 group-hover:text-fuchsia-400 transition-all uppercase">Inisiasi Tes <ArrowRight size={12} className="inline ml-2" /></span></div></motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* VIEW MISSION */}
            {view === 'mission' && (
              <motion.div key="mission" {...(portalTransition as any)} className="max-w-4xl mx-auto space-y-10 pb-40 text-center lg:text-left">
                <header className="flex justify-between items-end border-b border-white/5 pb-8"><div className="space-y-4"><button onClick={() => handleSafeViewChange('assessment')} className="text-[9px] font-black text-slate-500 hover:text-fuchsia-400 flex items-center gap-3 tracking-[0.3em] uppercase"><ArrowLeft size={12} /> BATAL</button><h2 className="text-4xl font-black text-white tracking-widest uppercase">FASE 0{currentStep}</h2><p className="text-fuchsia-500 font-black tracking-[0.5em] text-[9px] uppercase text-center w-full">EVALUASI {selectedDomain}</p></div><div className="text-[100px] font-black text-white/5 font-mono leading-none tracking-tighter">0{currentStep}</div></header>
                <div className="space-y-6">
                   {currentStepQs.length > 0 ? currentStepQs.map((q) => (<div key={q.id} className="p-10 rounded-[2rem] bg-[#09090b]/90 border border-white/5 space-y-8 shadow-2xl relative overflow-hidden text-center"><div className="absolute top-0 left-0 w-1 h-full bg-fuchsia-500" /><h4 className="text-lg font-medium text-slate-200 leading-relaxed tracking-wide">"{q.text}"</h4><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{q.options.slice(0, 4).map((opt: any, i: number) => (<button key={i} onClick={() => setAns({...ans, [q.id]: {score: opt.score, text: opt.text}})} className={`p-6 rounded-2xl text-left transition-all border text-[10px] font-bold tracking-widest uppercase flex items-center gap-5 ${ans[q.id]?.text === opt.text ? 'bg-fuchsia-600/10 border-fuchsia-500 text-white shadow-xl' : 'bg-[#050505] border-white/5 text-slate-400 hover:border-white/20'}`}><div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${ans[q.id]?.text === opt.text ? 'border-fuchsia-400' : 'border-slate-700'}`}>{ans[q.id]?.text === opt.text && <div className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full shadow-[0_0_5px_#d946ef]" />}</div><span>{opt.text}</span></button>))}</div></div>)) : <div className="text-center py-20 border border-dashed border-white/5 rounded-3xl uppercase text-slate-600">DATA SOAL TIDAK DITEMUKAN.</div>}
                </div>
                <div className="flex gap-4 pt-4">{currentStep > 1 && <button onClick={() => setCurrentStep(p => p - 1)} className="px-10 py-5 bg-[#050505] border border-white/10 text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-widest">SEBELUMNYA</button>}{currentStep < maxStep ? <button disabled={!isStepComplete} onClick={() => setCurrentStep(p => p + 1)} className={`flex-1 py-5 rounded-xl font-black text-[10px] tracking-widest transition-all uppercase ${isStepComplete ? 'bg-fuchsia-600 text-white shadow-xl' : 'bg-white/5 text-slate-700 cursor-not-allowed'}`}>FASE SELANJUTNYA</button> : <button disabled={!isStepComplete || loading} onClick={executeUplink} className={`flex-1 py-5 rounded-xl font-black text-[10px] tracking-widest transition-all uppercase flex items-center justify-center gap-3 ${isStepComplete ? 'bg-fuchsia-600 text-white shadow-xl' : 'bg-[#050505] text-slate-700 border border-white/5 cursor-not-allowed'}`}>{submitStatus} {isStepComplete && submitStatus !== 'SINKRONISASI...' && <Zap size={14}/>}</button>}</div>
              </motion.div>
            )}

            {/* BRIEFING VIEW */}
            {view === 'briefing' && (
              <motion.div key="briefing" {...(portalTransition as any)} className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[75vh]">
                 <div className="mb-14 cursor-pointer"><RobotFace size={28} ringSize="w-44 h-44" coreSize="w-28 h-28" /></div>
                 <motion.div className="flex flex-col items-center text-center space-y-6"><h2 className="text-4xl md:text-5xl font-black text-white tracking-[0.2em] uppercase">TRANSMISI DITERIMA</h2><p className="text-[11px] font-bold text-slate-300 leading-relaxed tracking-[0.2em] uppercase">HALO <span className="text-fuchsia-400">{user.username}</span>, APAKAH ANDA SIAP UNTUK<br/>MENGERJAKAN KUIS PADA TOPIK <span className="text-fuchsia-400">{selectedDomain}</span>?</p></motion.div>
                 <div className="flex gap-6 mt-12"><button onClick={() => setView('assessment')} className="px-10 py-4 border border-white/20 text-slate-300 rounded-full font-black text-[10px] tracking-widest uppercase">BATAL</button><button onClick={handleStartMissionClick} className="px-10 py-4 bg-fuchsia-600 text-white rounded-full font-black text-[10px] tracking-widest shadow-xl hover:scale-105 transition-all uppercase flex items-center gap-3">MULAI KUIS <Zap size={14} /></button></div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* MODAL DETAIL (CENTERED) */}
      <AnimatePresence>
        {detailModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[3000] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }} className="relative w-full max-w-4xl max-h-[85vh] bg-[#09090b] border border-white/10 rounded-[3rem] p-12 shadow-2xl flex flex-col overflow-hidden text-center text-center">
               <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-fuchsia-500" />
               <div className="flex justify-between items-center mb-8"><h2 className="text-lg font-black text-white tracking-widest uppercase">DETAIL ANALISIS JAWABAN</h2><button onClick={() => setDetailModal(null)} className="p-2 bg-[#050505] rounded-xl text-slate-500 hover:text-red-500 transition-all"><X size={18} /></button></div>
               <div className="flex-1 overflow-y-auto pr-4 space-y-4 custom-scrollbar text-center">
                 {detailModal.map((d: any, i: number) => (
                    <div key={i} className={`p-8 rounded-[2rem] border bg-[#050505]/40 flex flex-col items-center ${d.is_correct ? 'border-emerald-500/20' : 'border-red-500/20'}`}>
                          <div className={`p-3 rounded-2xl mb-6 ${d.is_correct ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>{d.is_correct ? <CheckCircle2 size={24} /> : <XCircle size={24} />}</div>
                          <div className="w-full text-center"><p className="text-slate-200 font-medium text-[14px] mb-6 leading-relaxed">"{d.question}"</p><div className="bg-[#09090b] p-5 rounded-2xl border border-white/5"><p className="text-[9px] font-black text-slate-600 tracking-[0.3em] mb-2 uppercase">JAWABAN SISWA</p><p className={`font-bold text-[12px] tracking-widest ${d.is_correct ? 'text-emerald-500' : 'text-red-500'}`}>{d.answer || "TIDAK TERDETEKSI"}</p></div></div>
                    </div>
                 ))}
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes grid-move { 0% { background-position: 0 0; } 100% { background-position: 0 60px; } }
        .bg-grid-3d {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 60px 60px; transform: perspective(600px) rotateX(60deg) scale(2.5); transform-origin: top; animation: grid-move 4s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(217, 70, 239, 0.3); border-radius: 10px; }
        ::-webkit-scrollbar { width: 0px; }
      `}} />
    </div>
  );
}