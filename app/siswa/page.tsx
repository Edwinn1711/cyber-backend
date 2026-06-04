"use client"
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  ShieldCheck, Brain, Target, ChevronRight, ChevronLeft, Zap, ArrowLeft, ArrowRight,
  Power, Activity, ShieldAlert, Globe, Lock, Radar as RadarIcon, Terminal, Database, 
  Bug, MailWarning, Sparkles, CheckCircle2, XCircle, X, User, LayoutGrid, Check, 
  BellRing, Laptop, Workflow, FileText, TrendingUp, Lightbulb, Hexagon, Send, Network
} from 'lucide-react'
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, Tooltip, ResponsiveContainer
} from 'recharts'

// --- CONFIG & ASSETS ---
const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

const TACTICAL_DOMAINS = [
  { id: "Social Engineering", title: "SOCIAL ENGINEERING", icon: Brain, color: "#22d3ee", desc: "Cyber Psychological Defense Operations", label: "DOMAIN ALPHA" },
  { id: "Malware", title: "MALWARE ANALYSIS", icon: Bug, color: "#f472b6", desc: "Neural Malware Scrutiny Protocol", label: "DOMAIN BRAVO" },
  { id: "Phishing", title: "PHISHING DEFENSE", icon: MailWarning, color: "#818cf8", desc: "Credential Integrity Security Audit", label: "DOMAIN CHARLIE" },
];

const getReadinessData = (score: number) => {
  if (score >= 80) return { label: "EXCELLENT", color: "#d946ef", bg: "bg-fuchsia-600", text: "text-fuchsia-400" };
  if (score >= 50) return { label: "AVERAGE", color: "#eab308", bg: "bg-yellow-600", text: "text-yellow-400" };
  return { label: "POOR", color: "#ef4444", bg: "bg-red-600", text: "text-red-400" };
};

// --- GLOBAL COMPONENTS ---
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
          <motion.div key={p.id} initial={{ scale: 0, opacity: 1, x: p.x, y: p.y }} animate={{ scale: [0, 1.2, 0], opacity: [1, 0.5, 0], x: p.x + Math.cos(p.angle) * p.velocity, y: p.y + Math.sin(p.angle) * p.velocity }} transition={{ duration: 0.8 }} className="absolute rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" style={{ width: '4px', height: '4px' }} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const PersistentUniverse = React.memo(({ bgIdx }: { bgIdx: number }) => (
  <div className="fixed inset-0 z-0 opacity-40">
    <AnimatePresence mode="wait">
      <motion.img key={bgIdx} src={CYBER_ASSETS[bgIdx]} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 0.2, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 5 }} className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-lighten" />
    </AnimatePresence>
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/95 pointer-events-none" />
    <div className="absolute inset-0 bg-hud-grid opacity-[0.15] pointer-events-none" />
  </div>
));
PersistentUniverse.displayName = 'PersistentUniverse';

const NeonCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <motion.div animate={{ x: pos.x - 12, y: pos.y - 12 }} transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.5 }} className="fixed top-0 left-0 w-6 h-6 border border-cyan-400 rounded-full z-[99999] pointer-events-none flex items-center justify-center">
      <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
    </motion.div>
  );
};

const CRTOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-[99998] opacity-[0.03]">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
  </div>
);

const CyberBootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const bootTasks = ["INITIALIZING_CORE_SYSTEM...", "LOADING_ENCRYPTION_LAYER_AES256...", "ESTABLISHING_NEURAL_UPLINK...", "SCANNING_LOCAL_NETWORK_INFRASTRUCTURE...", "AUTHORIZING_PERSONNEL_ACCESS...", "SYSTEM_READY_OPERATIVE"];
  useEffect(() => {
    let currentTask = 0;
    const interval = setInterval(() => {
      if (currentTask < bootTasks.length) { setLogs(prev => [...prev, `> ${bootTasks[currentTask]}`]); currentTask++; } 
      else { clearInterval(interval); setTimeout(onComplete, 1000); }
    }, 400);
    return () => clearInterval(interval);
  }, []);
  return (
    <motion.div exit={{ opacity: 0, scale: 1.1 }} className="fixed inset-0 z-[20000] bg-black flex flex-col items-center justify-center p-6 font-mono">
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-center gap-4 mb-8"><ShieldCheck size={40} className="text-cyan-400 animate-pulse" /><div className="h-px flex-1 bg-cyan-500/20" /></div>
        <div className="space-y-2">{logs.map((log, i) => (<motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className={`text-xs tracking-[0.2em] ${i === logs.length - 1 ? 'text-cyan-400' : 'text-slate-600'}`}>{log}</motion.p>))}</div>
        <div className="pt-10"><div className="h-1 w-full bg-white/5 rounded-full overflow-hidden"><motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2.5 }} className="h-full bg-cyan-500 shadow-[0_0_15px_#22d3ee]" /></div></div>
      </div>
    </motion.div>
  );
};

const CyberCalculationFinale = ({ score, onFinish }: { score: number, onFinish: () => void }) => {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState("MENGEKSTRAK RESPONS TAKTIS...");
  useEffect(() => {
    const duration = 3500; const end = score; let startTime: number;
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animateCount);
    };
    requestAnimationFrame(animateCount);
    [ { t: 0, msg: "MENGANALISIS POLA PERTAHANAN..." }, { t: 1000, msg: "MENGKALIBRASI INDEKS KERENTANAN..." }, { t: 2000, msg: "MENYINKRONKAN DENGAN PUSAT DATA..." }, { t: 3000, msg: "ANALISIS SELESAI" } ].forEach(step => setTimeout(() => setStatus(step.msg), step.t));
    setTimeout(onFinish, 4000);
  }, [score, onFinish]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[50000] bg-[#020108] flex flex-col items-center justify-center font-black overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">{[...Array(15)].map((_, i) => (<motion.div key={i} animate={{ x: [-200, 200], opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }} className="absolute w-full h-[2px] bg-cyan-500 shadow-[0_0_15px_#22d3ee]" style={{ top: `${i * 7}%` }} />))}</div>
      <div className="relative z-10 flex flex-col items-center space-y-10">
        <div className="relative w-72 h-72 flex items-center justify-center">
           <svg className="w-full h-full rotate-[-90deg]"><circle cx="144" cy="144" r="130" stroke="rgba(34,211,238,0.05)" strokeWidth="4" fill="none" /><motion.circle initial={{ strokeDasharray: "0 1000" }} animate={{ strokeDasharray: "816 1000" }} transition={{ duration: 3.5, ease: "easeInOut" }} cx="144" cy="144" r="130" stroke="#22d3ee" strokeWidth="12" strokeLinecap="round" fill="none" style={{ filter: 'drop-shadow(0 0 25px #22d3ee)' }} /></svg>
           <div className="absolute inset-0 flex flex-col items-center justify-center"><motion.span key={count} className="text-9xl font-black text-white tracking-tighter">{count}</motion.span><span className="text-[10px] font-black text-cyan-400 tracking-[0.5em] mt-4 uppercase">Level Kesiapan</span></div>
        </div>
        <div className="text-center space-y-6">
           <div className="flex items-center justify-center gap-4"><div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" /><p className="text-lg font-black text-cyan-400 tracking-[0.3em] uppercase">{status}</p></div>
           <div className="flex gap-2 justify-center">{[...Array(12)].map((_, i) => (<motion.div key={i} animate={{ scaleY: [1, 2, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.05 }} className="w-1.5 h-6 bg-cyan-500/40 rounded-full" />))}</div>
        </div>
      </div>
    </motion.div>
  );
};

const CyberLetterReveal = ({ text, className }: { text: string, className: string }) => {
  const letters = Array.from(text || "OPERATIVE");
  return (
    <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }} className={`flex flex-wrap ${className}`}>
      {letters.map((letter, index) => (<motion.span key={index} variants={{ visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" } }, hidden: { opacity: 0, y: 15, filter: "blur(10px)" } }} className="inline-block text-white drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">{letter === " " ? "\u00A0" : letter}</motion.span>))}
    </motion.div>
  );
};

const CyberContinuousDecryption = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  useEffect(() => {
    const chars = "ABC0123456789$#@&*";
    const interval = setInterval(() => {
      let iteration = 0;
      const decryptInterval = setInterval(() => {
        setDisplayText(prev => prev.split("").map((_, index) => index < iteration ? text[index] : chars[Math.floor(Math.random() * chars.length)]).join(""));
        if (iteration >= text.length) clearInterval(decryptInterval);
        iteration += 1 / 3;
      }, 30);
    }, 5000);
    return () => clearInterval(interval);
  }, [text]);
  return <span className="font-mono tracking-tighter">{displayText}</span>;
};

const CyberSentinel = ({ username = "OPERATIVE" }) => {
  const [message, setMessage] = useState("");
  const mouseX = useMotionValue(0); const mouseY = useMotionValue(0);
  const headX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 25 });
  const headY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 25 });
  const bodyX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 100, damping: 30 });
  useEffect(() => {
    const messages = [`READY ${username.toUpperCase()}`, "SCANNING NODES", "QUANTUM ACTIVE", "ALL SYSTEMS OPTIMAL"];
    let msgIdx = 0;
    const cycle = () => {
      const target = messages[msgIdx]; let iteration = 0;
      const interval = setInterval(() => {
        setMessage(target.split("").map((_, i) => i < iteration ? target[i] : "01"[Math.floor(Math.random() * 2)]).join(""));
        if (iteration >= target.length) clearInterval(interval);
        iteration += 0.5;
      }, 40);
      msgIdx = (msgIdx + 1) % messages.length;
    };
    const mainInterval = setInterval(cycle, 4000); cycle();
    return () => clearInterval(mainInterval);
  }, [username]);
  useEffect(() => {
    const handleMove = (e: MouseEvent) => { mouseX.set((e.clientX / window.innerWidth) - 0.5); mouseY.set((e.clientY / window.innerHeight) - 0.5); };
    window.addEventListener("mousemove", handleMove); return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);
  return (
    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative flex flex-col items-center justify-center h-[380px] w-full select-none" style={{ perspective: '1200px' }}>
      <motion.div className="absolute top-2 z-50 bg-[#020308]/80 backdrop-blur-3xl border border-cyan-400/30 px-6 py-2.5 rounded-2xl shadow-[0_0_40px_rgba(34,211,238,0.2)] flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" /><span className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase font-mono">{message}</span>
      </motion.div>
      <motion.div style={{ x: bodyX }} className="relative flex flex-col items-center mt-12">
        <motion.div style={{ x: headX, y: headY }} className="relative w-14 h-16 bg-[#080a12] border-2 border-cyan-400/60 rounded-t-[2.2rem] rounded-b-xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.3)] z-30">
          <div className="flex gap-3">{[0, 1].map(i => (<div key={i} className="relative w-2.5 h-2.5"><motion.div animate={{ scaleY: [1, 1, 0.1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.92, 1] }} className="w-full h-full bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee]" /></div>))}</div>
        </motion.div>
        <div className="relative w-24 h-32 bg-[#080a12] border-2 border-cyan-400/50 rounded-[2.8rem] flex flex-col items-center p-4 z-20 mt-1"><Zap size={22} className="text-cyan-400 mt-4 animate-pulse" /></div>
        <div className="flex gap-10 -mt-4 relative z-10">{[0, 1].map((i) => (<motion.div key={i} animate={{ height: [10, 45, 10], opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.12, repeat: Infinity }} className="w-4 bg-cyan-400 blur-md rounded-full mt-1" />))}</div>
      </motion.div>
    </motion.div>
  );
};

// --- MAIN PORTAL COMPONENT ---
export default function StudentPortal() {
  const router = useRouter();

  // 1. STATE
  const [mounted, setMounted] = useState(false);
  const [bootDone, setBootDone] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [view, setView] = useState('dashboard'); 
  const [currentStep, setCurrentStep] = useState(1); 
  const [selectedDomain, setSelectedDomain] = useState("SOCIAL ENGINEERING");
  const [allQs, setAllQs] = useState<any[]>([]);
  const [ans, setAns] = useState<Record<number, {score: number, text: string}>>({});
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<any[]>([]);
  const [user, setUser] = useState({ username: 'STUDENT', class_name: '', tanggal_lahir: '' });
  const [loading, setLoading] = useState(false);
  const [bgIdx, setBgIdx] = useState(0);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [detailModal, setDetailModal] = useState<any>(null);
  const [showClassSelector, setShowClassSelector] = useState(false);
  const [appFeedbackModal, setAppFeedbackModal] = useState(false);
  const [appFeedbackForm, setAppFeedbackForm] = useState({ category: 'AI ENHANCEMENT', message: '' });
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 2. DATA FETCH & MEMO
  const fetchScores = useCallback(async (username: string) => {
    try {
      const res = await fetch(`https://cyber-backend-delta.vercel.app/siswa/scores/${username}`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setScore(Math.round(data.reduce((acc, curr: any) => acc + curr.score, 0) / data.length));
        setHistory(data);
      }
    } catch (e) {}
  }, []);

  const radarData = useMemo(() => {
    const sectors = [{ key: "Social", label: "PSYCHOLOGY" }, { key: "Malware", label: "MALWARE" }, { key: "Phishing", label: "CREDENTIAL" }, { key: "Network", label: "NETWORK" }, { key: "Threat", label: "INTEL" }, { key: "Access", label: "ACCESS" }];
    return sectors.map(s => {
      const entry = (history || []).find((h: any) => String(h.domain_id || "").toLowerCase().includes(s.key.toLowerCase()));
      return { subject: s.label, A: entry ? entry.score : 0, fullMark: 100 };
    });
  }, [history]);

  const currentStepQs = useMemo(() => {
    if (!allQs || allQs.length === 0) return [];
    const targetDomain = selectedDomain.toLowerCase().trim().replace(/\s/g, '');
    const targetStep = `step${currentStep}`.toLowerCase().trim();
    return allQs.filter(q => (q.main_domain || "").toLowerCase().trim().replace(/\s/g, '') === targetDomain && (q.type || "").toLowerCase().trim().replace(/\s/g, '') === targetStep);
  }, [allQs, currentStep, selectedDomain]);

  const maxStep = useMemo(() => {
    if (!allQs || allQs.length === 0 || !selectedDomain) return 1;
    const domainQs = allQs.filter(q => (q.main_domain || "").toLowerCase().trim().replace(/\s/g, '') === selectedDomain.toLowerCase().trim().replace(/\s/g, ''));
    if (domainQs.length === 0) return 1;
    const steps = domainQs.map(q => { const num = parseInt((q.type || "").replace(/\D/g, '')); return isNaN(num) ? 1 : num; });
    return Math.max(...steps, 1);
  }, [allQs, selectedDomain]);

  const isStepComplete = useMemo(() => currentStepQs.length > 0 && currentStepQs.every(q => ans[q.id] !== undefined), [currentStepQs, ans]);

  // 3. EFFECTS
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('user');
    if (saved) {
      try { const parsed = JSON.parse(saved); setUser(parsed); setIsAuthorized(true); if (parsed.username) fetchScores(parsed.username); } catch (e) { router.push('/'); }
    } else { router.push('/'); }
  }, [router, fetchScores]);

  useEffect(() => {
    if (isAuthorized) {
      fetch('https://cyber-backend-delta.vercel.app/questions')
        .then(res => res.json())
        .then((data: any[]) => setAllQs(data.map((q: any) => ({ ...q, options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options }))))
        .catch(err => console.error("Uplink Error:", err));
    }
  }, [isAuthorized]);

  // 4. HANDLERS
  const handleStartMissionClick = () => {
    if (!user.class_name || user.class_name === "UNASSIGNED") setShowClassSelector(true);
    else setView('assessment');
  };

  const assignClassAndStartMission = (className: string) => {
    const updatedUser = { ...user, class_name: className };
    setUser(updatedUser); localStorage.setItem('user', JSON.stringify(updatedUser)); 
    setShowClassSelector(false); setView('assessment');
  };

  const executeUplink = async () => {
    setLoading(true);
    const totalQs = Object.keys(ans).length; const totalSc = Object.values(ans).reduce((acc, curr) => acc + curr.score, 0);
    const finalSc = totalQs > 0 ? Math.round((totalSc / (totalQs * 10)) * 100) : 0;
    setScore(finalSc); setIsCalculating(true); 
    try {
      await fetch('https://cyber-backend-delta.vercel.app/siswa/submit', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username, class_name: user.class_name, domain_id: selectedDomain, score: finalSc, answers: Object.keys(ans).map(id => ({ id: parseInt(id), value: ans[parseInt(id) as any].score.toString(), text: ans[parseInt(id) as any].text })) })
      });
    } catch (e) {} finally { setLoading(false); }
  };

  // 5. EARLY RETURNS
  if (!mounted) return <div className="bg-black h-screen w-full" />;
  if (!isAuthorized) return null;
  if (!bootDone) return <AnimatePresence><CyberBootSequence onComplete={() => setBootDone(true)} /></AnimatePresence>;

  // 6. RENDER UTAMA
  return (
    <div className="flex h-screen w-full bg-[#020105] text-slate-100 overflow-hidden font-sans relative selection:bg-cyan-500/30">
      <NeonCursor />
      <CRTOverlay />
      <PersistentUniverse bgIdx={bgIdx} />
      <ParticleBurstClickEffect />

      <AnimatePresence>
        {isCalculating && <CyberCalculationFinale score={score} onFinish={() => { setIsCalculating(false); setView('reports'); }} />}
      </AnimatePresence>

      {/* --- SIDEBAR KIRI --- */}
      <motion.aside initial={false} animate={{ width: isSidebarCollapsed ? 80 : 260 }} className="h-screen border-r border-white/10 bg-black/95 transition-all duration-700 flex flex-col z-[100] relative shadow-2xl">
        <div className="h-20 px-6 flex items-center justify-between border-b border-white/10">
          {!isSidebarCollapsed && (
            <div className="flex flex-col text-left">
              <span className="font-black text-[11px] tracking-[0.2em] uppercase leading-none text-white">CYBER READINESS</span>
              <span className="font-black text-cyan-500 text-[9px] tracking-[0.4em] mt-1 uppercase">INDEX</span>
            </div>
          )}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 text-slate-400 hover:text-cyan-500 transition-all">
            {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        <nav className="flex-1 px-4 py-10 space-y-3">
          {[{ id: 'dashboard', label: 'DASHBOARD', icon: LayoutGrid }, { id: 'assessment', label: 'ASSESSMENT', icon: Target }, { id: 'reports', label: 'REPORT', icon: FileText }].map((item) => {
            const isActive = view === item.id;
            return (
              <button key={item.id} onClick={() => setView(item.id)} className="w-full flex items-center p-4 rounded-2xl transition-all relative group outline-none">
                {isActive && <motion.div layoutId="sidebar-active" className="absolute inset-0 rounded-2xl z-0 bg-cyan-600/20 border-l-4 border-cyan-500" />}
                <div className="relative z-10 flex items-center gap-4">
                  <item.icon size={20} className={isActive ? 'text-cyan-400' : 'text-slate-500'} />
                  {!isSidebarCollapsed && <span className={`font-black text-[10px] tracking-widest uppercase ${isActive ? 'text-white' : 'text-slate-500'}`}>{item.label}</span>}
                </div>
              </button>
            );
          })}
        </nav>
        <div className="p-6 border-t border-white/10">
          <button onClick={() => { localStorage.removeItem('user'); router.push('/'); }} className="w-full flex items-center p-4 text-red-500 hover:bg-red-500/10 rounded-2xl gap-4 font-black text-[10px] tracking-widest uppercase">
            <Power size={18} /> {!isSidebarCollapsed && "LOGOUT"}
          </button>
        </div>
      </motion.aside>

      {/* --- AREA KONTEN KANAN --- */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-10 border-b bg-black/50 border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-5 py-2 border rounded-full bg-white/5 border-white/20 text-slate-300">
              <div className="w-2 h-2 rounded-full animate-pulse bg-emerald-400" />
              <span className="text-[9px] font-black uppercase tracking-widest">GATEWAY ACTIVE</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-right text-left">
            <div className="hidden sm:block">
              <p className="text-[11px] font-black tracking-widest uppercase text-white">{user.username}</p>
              <p className="text-[9px] font-black text-cyan-500 uppercase tracking-widest mt-1">OPERATIVE MODE</p>
            </div>
            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center border border-white/20 shadow-lg text-white"><User size={18} /></div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar px-6 lg:px-14 py-10" ref={scrollRef}>
          <AnimatePresence mode="wait">

           {/* --- 1. DASHBOARD MEWAH (WAH FACTOR) --- */}
          {view === 'dashboard' && (
            <motion.div 
              key="dash-final-exhibition" 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, y: -20 }}
              className="max-w-[1350px] mx-auto space-y-12 pb-20"
            >
              {/* Banner Utama */}
              <motion.div className="relative p-10 rounded-[2.5rem] bg-[#020308]/90 backdrop-blur-3xl border border-cyan-500/20 overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] group">
                <div className="absolute inset-0 bg-hud-grid opacity-[0.06]" />
                <motion.div animate={{ top: ['-100%', '200%'] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute left-0 w-full h-[60px] bg-gradient-to-b from-transparent via-cyan-500/15 to-transparent z-10" />

                <div className="relative z-20 space-y-8 text-left">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-lg bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 text-[8px] font-black tracking-[0.4em] uppercase shadow-inner">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"/> AKSES SISTEM BERHASIL
                    </div>
                    
                    <div className="space-y-2">
                      <h2 className="text-6xl font-black uppercase tracking-tighter text-white">
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-600 bg-clip-text text-transparent animate-gradient-x">
                          {user.username}
                        </span>
                      </h2>
                      <p className="text-[12px] font-black tracking-[0.4em] uppercase text-slate-500">Cyber Readiness Index - {user.class_name}</p>
                    </div>
                    
                    <button onClick={handleStartMissionClick} className="px-12 py-5 bg-white text-black rounded-2xl font-black text-[11px] tracking-[0.6em] hover:bg-cyan-500 hover:text-white transition-all uppercase flex items-center gap-5 shadow-xl">
                      INITIALIZE <Zap size={18} />
                    </button>
                </div>
              </motion.div>

              {/* Trinity Widgets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Widget 1 */}
                <div className="p-8 rounded-[2.5rem] bg-[#0a0c14]/90 border border-white/5 flex flex-col items-center text-center shadow-2xl">
                    <ShieldCheck size={36} className="text-cyan-400 mb-6" />
                    <h4 className="text-2xl font-black text-white">{user.username}</h4>
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em]">Identity Profile</span>
                </div>
                
                {/* Widget 2 */}
                <div className="p-8 rounded-[2.5rem] bg-[#0a0c14]/90 border border-white/5 flex flex-col items-center justify-center text-center">
                    <div className="text-4xl font-black text-white mb-2">{score}</div>
                    <span className="text-[8px] font-black text-fuchsia-400 uppercase tracking-[0.3em]">Readiness Index</span>
                </div>

                {/* Widget 3 */}
                <div className="p-8 rounded-[2.5rem] bg-[#0a0c14]/90 border border-white/5 flex flex-col justify-center text-left">
                    <h2 className="text-[10px] font-black text-slate-400 tracking-[0.4em] uppercase mb-6">Analytical Matrix</h2>
                    <div className="space-y-4">
                      {["Architecture", "Cyber Vault", "Latency Node"].map((m, i) => (
                        <div key={i} className="flex justify-between items-center text-[10px] font-black text-white">
                          {m} <span className="text-cyan-400">STABLE</span>
                        </div>
                      ))}
                    </div>
                </div>
              </div>
            </motion.div>
          )}

            {/* --- 2. ASSESSMENT (PILIH DOMAIN) --- */}
            {view === 'assessment' && (
              <motion.div key="assess" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-[1100px] mx-auto space-y-10 py-6">
                <div className="text-center space-y-3">
                  <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tighter uppercase drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">TARGET DOMAINS</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pb-20">
                  {TACTICAL_DOMAINS.map((domain, i) => (
                    <motion.div key={i} onClick={() => { setSelectedDomain(domain.title); setView('briefing'); }} className="group relative bg-[#05060b]/80 backdrop-blur-3xl border border-white/5 p-7 rounded-[2.5rem] cursor-pointer overflow-hidden transition-all duration-500 hover:border-cyan-500/40 text-left">
                      <div className="relative z-10 flex flex-col h-full space-y-8">
                        <div className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all">
                           <domain.icon size={20} />
                        </div>
                        <div className="space-y-3">
                           <h3 className="text-xl font-black text-white tracking-tighter uppercase">{domain.title}</h3>
                           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">{domain.desc}</p>
                        </div>
                        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                           <span className="text-[9px] font-black text-cyan-400 tracking-[0.4em] uppercase">SYSTEM READY</span>
                           <ArrowRight size={14} className="text-white/40 group-hover:text-cyan-400" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* --- 3. BRIEFING ROBOT --- */}
            {view === 'briefing' && (
              <motion.div key="briefing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[85vh] relative">
                 <CyberSentinel username={user.username} />
                 <div className="flex flex-col items-center text-center space-y-6 relative z-10 -mt-6">
                    <div className="px-5 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-[8px] font-black tracking-[0.5em] uppercase animate-pulse">Uplink Verified</div>
                    <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter leading-none">TRANSMISSION RECEIVED</h2>
                    <p className="text-[11px] lg:text-[13px] font-bold text-slate-300 tracking-[0.2em] uppercase max-w-2xl mx-auto">
                       Sistem siap melakukan validasi pertahanan pada domain <span className="text-cyan-400 font-black">{selectedDomain}</span>. 
                    </p>
                    <div className="flex gap-6 mt-10 relative z-[9999] pointer-events-auto">
                       <button onClick={() => setView('assessment')} className="px-12 py-4 border-2 border-white/5 text-slate-500 rounded-2xl font-black text-[9px] tracking-[0.4em] uppercase hover:text-white">ABORT</button>
                       <button onClick={() => { setView('mission'); setCurrentStep(1); }} className="px-14 py-4 bg-white text-slate-950 rounded-2xl font-black text-[10px] tracking-[0.4em] uppercase hover:bg-cyan-500 hover:text-white transition-all flex items-center gap-4">
                          INITIATE ASSESSMENT <Zap size={16} />
                       </button>
                    </div>
                 </div>
              </motion.div>
            )}

{/* --- 4. MISSION (WARNA NEON & SOAL DIJAMIN MUNCUL) --- */}
{view === 'mission' && (
              <motion.div key="mission-root" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative w-full">
                
                {/* A. DAFTAR SOAL */}
                <div className="max-w-3xl mx-auto space-y-12 pb-48 pt-4">
                  {/* HEADER FASE - NEON FUCHSIA GLOW */}
                  <div className="border-l-4 border-fuchsia-500 pl-8 py-4 bg-fuchsia-900/5 rounded-r-[2rem] shadow-[0_0_30px_rgba(217,70,239,0.1)] text-left relative overflow-hidden">
                     <div className="absolute inset-0 bg-hud-grid opacity-10" />
                     <div className="relative z-10">
                       <h2 className="text-4xl font-black text-white uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]">PHASE 0{currentStep}</h2>
                       <p className="text-[10px] font-black text-fuchsia-400 tracking-[0.5em] uppercase mt-2 drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]">SECTOR: {selectedDomain}</p>
                     </div>
                  </div>

                  <div className="space-y-10">
                    {currentStepQs.length > 0 ? (
                      currentStepQs.map((q, idx) => (
                        <motion.div key={q.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="p-10 rounded-[3.5rem] bg-[#05060b]/90 backdrop-blur-3xl border border-fuchsia-500/20 shadow-[0_20px_50px_rgba(217,70,239,0.05)] relative overflow-hidden group">
                          
                          {/* Garis Neon Kiri */}
                          <div className="absolute top-0 left-0 w-2 h-full bg-fuchsia-500/20 group-hover:bg-fuchsia-500 transition-all duration-500 shadow-[0_0_20px_#d946ef]" />
                          
                          <div className="relative z-10 text-left">
                            <span className="text-[10px] font-black text-fuchsia-500 uppercase tracking-[0.4em] block mb-8 drop-shadow-[0_0_8px_rgba(217,70,239,0.4)]">
                               QUESTION {selectedDomain} {idx + 1}
                            </span>
                            
                            {/* --- KOTAK STUDI KASUS (ANTI-HILANG) --- */}
                            <div className="bg-fuchsia-500/5 border border-fuchsia-500/20 p-8 rounded-3xl mb-10 shadow-[inset_0_0_20px_rgba(217,70,239,0.05)]">
                               <p className="text-xl lg:text-2xl font-bold text-white leading-relaxed tracking-tight">
                                 {/* SAYA MASUKKAN SEMUA KEMUNGKINAN NAMA KOLOM DATABASE DI SINI */}
                                 {q.question || q.case_study || q.studi_kasus || q.deskripsi || q.text || q.soal || "Error: Data Teks Soal kosong di Database. Cek nama kolom API-mu!"}
                               </p>
                            </div>

                            {/* --- OPSI JAWABAN NEON --- */}
                            <div className="grid grid-cols-1 gap-4">
                              {q.options && q.options.map((opt: any, i: number) => (
                                <button
                                  key={i}
                                  onClick={() => setAns({ ...ans, [q.id]: { score: opt.score, text: opt.text } })}
                                  className={`relative p-6 rounded-[2.2rem] border text-left text-[13px] font-bold transition-all duration-300 flex items-center justify-between ${
                                    ans[q.id]?.text === opt.text 
                                    ? 'bg-fuchsia-600 border-fuchsia-400 text-white shadow-[0_0_30px_rgba(217,70,239,0.5)] scale-[1.01]' 
                                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-fuchsia-500/10 hover:border-fuchsia-500/30 hover:text-fuchsia-100'
                                  }`}
                                >
                                  <span className="relative z-10 pr-10">{opt.text}</span>
                                  {ans[q.id]?.text === opt.text && <Check size={18} className="relative z-10 drop-shadow-[0_0_8px_white]" />}
                                </button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="py-24 text-center border-2 border-dashed border-fuchsia-500/20 rounded-[3.5rem] opacity-50 font-mono text-[11px] tracking-widest uppercase text-fuchsia-400 shadow-[inset_0_0_30px_rgba(217,70,239,0.1)]">
                         Mencari Data Neural... Kosong.
                      </div>
                    )}
                  </div>
                </div>

                {/* B. NAVIGASI BAWAH (GLOWING NEON) */}
                <div className="fixed bottom-0 left-0 lg:left-[260px] right-0 z-[5000] p-6 lg:p-10 pointer-events-none">
                   <div className="max-w-4xl mx-auto bg-[#050508]/95 backdrop-blur-3xl border border-fuchsia-500/20 p-6 rounded-[2.8rem] shadow-[0_-20px_80px_rgba(217,70,239,0.15)] flex items-center justify-between pointer-events-auto">
                      
                      <div className="hidden md:flex flex-col gap-2 pl-6 border-r border-white/10 pr-12 text-left">
                         <span className="text-[8px] font-black text-fuchsia-500 uppercase tracking-[0.5em] drop-shadow-[0_0_5px_rgba(217,70,239,0.5)]">Progress</span>
                         <div className="flex items-center gap-4">
                            <span className="text-2xl font-black text-white font-mono leading-none">0{currentStep}</span>
                            <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                               <motion.div animate={{ width: `${(currentStep / maxStep) * 100}%` }} className="h-full bg-fuchsia-500 shadow-[0_0_15px_#d946ef]" />
                            </div>
                            <span className="text-[10px] font-black text-slate-500 font-mono leading-none">0{maxStep}</span>
                         </div>
                      </div>

                      <div className="flex items-center gap-5 flex-1 justify-end">
                         {currentStep > 1 && (
                           <button onClick={() => { setCurrentStep(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="px-10 py-5 bg-white/5 border border-white/10 text-slate-400 rounded-2xl font-black text-[10px] tracking-widest uppercase hover:text-fuchsia-400 hover:border-fuchsia-500/30 transition-all">BACK</button>
                         )}
                         <button 
                           disabled={!isStepComplete} 
                           onClick={() => currentStep < maxStep ? setCurrentStep(p => p + 1) : executeUplink()} 
                           className={`px-14 py-5 rounded-2xl font-black text-[11px] tracking-[0.5em] uppercase flex items-center gap-4 transition-all duration-500 ${isStepComplete ? 'bg-fuchsia-600 text-white shadow-[0_0_30px_rgba(217,70,239,0.5)] hover:bg-fuchsia-500 hover:scale-105' : 'bg-white/5 text-slate-700 opacity-30 cursor-not-allowed'}`}
                         >
                            {currentStep < maxStep ? 'NEXT PHASE' : 'FINAL UPLINK'} <ChevronRight size={18} className={isStepComplete ? 'animate-pulse' : ''} />
                         </button>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {/* --- 5. REPORTS --- */}
            {view === 'reports' && <div className="text-white text-center py-20 font-black text-4xl">REPORT VIEW IS UNDER CONSTRUCTION</div>}

          </AnimatePresence>
        </main>
      </div>

      {/* --- MODAL PILIH KELAS --- */}
      <AnimatePresence>
        {showClassSelector && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/98 backdrop-blur-3xl text-center">
            <div className="relative w-full max-w-3xl bg-black border border-white/10 rounded-[3rem] p-12 shadow-2xl">
               <h2 className="text-3xl font-black mb-10 text-white tracking-widest uppercase">CLASSIFICATION REQUIRED</h2>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                 {AVAILABLE_CLASSES.map(cls => (
                    <button key={cls} onClick={() => assignClassAndStartMission(cls)} className="p-6 bg-white/5 border border-white/10 rounded-2xl font-black text-[11px] tracking-widest text-slate-500 hover:text-cyan-400 hover:border-cyan-500 transition-all uppercase">{cls}</button>
                 ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- STYLE GLOBAL ANTI-JELEK --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        * { text-decoration: none !important; font-style: normal !important; border-bottom: none !important; outline: none !important; }
        a, button, span, p, h1, h2, h3, div { text-decoration: none !important; font-style: normal !important; }
        .bg-hud-grid { background-image: linear-gradient(to right, rgba(34, 211, 238, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 211, 238, 0.05) 1px, transparent 1px); background-size: 50px 50px; }
        ::-webkit-scrollbar { width: 0px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      ` }} />
    </div>
  );
}