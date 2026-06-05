"use client"
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
// --- IMPORT SEMUA IKON ---
import { 
  ShieldCheck, Brain, Target, ChevronRight, ChevronLeft, Zap, ArrowLeft, ArrowRight,
  Fingerprint, Power, BarChart3, Activity, ShieldAlert, Cpu, Globe, Lock, 
  Radar as RadarIcon, Terminal, Database, Server, Search, Radio, Bug, MailWarning, 
  Sparkles, AlertTriangle, Eye, CheckCircle2, XCircle, X, User, Info, 
  ShieldQuestion, LayoutGrid, Check, BellRing, Bot, ScanLine, Laptop, Workflow, 
  FileText, TrendingUp, Lightbulb, Hexagon, Send, MessageSquare,
  Monitor, Network, RefreshCw, Shield,
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell as RechartsCell, CartesianGrid,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
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

// --- OPTIMIZED COMPONENTS ---

const PersistentUniverse = React.memo(({ bgIdx }: { bgIdx: number }) => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <AnimatePresence mode="wait">
      <motion.img 
        key={bgIdx} src={CYBER_ASSETS[bgIdx]} 
        initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} exit={{ opacity: 0 }}
        transition={{ duration: 2 }} className="absolute inset-0 w-full h-full object-cover" 
      />
    </AnimatePresence>
    <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f1a]/90 via-[#0b0f1a]/60 to-[#0b0f1a]" />
    <div className="absolute inset-0 bg-hud-grid opacity-[0.15]" />
  </div>
));
PersistentUniverse.displayName = 'PersistentUniverse';

const NeonCursor = React.memo(() => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  useEffect(() => {
    const move = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);
  return (
    <motion.div 
      style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
      className="fixed top-0 left-0 w-8 h-8 border border-fuchsia-500 rounded-full z-[99999] pointer-events-none flex items-center justify-center shadow-[0_0_15px_#d946ef]"
    >
      <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]" />
    </motion.div>
  );
});
NeonCursor.displayName = 'NeonCursor';

const CyberSentinel = ({ username = "OPERATIVE" }) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const msgs = [`READY ${username}`, "SCANNING NODES", "NEURAL LINK ACTIVE", "ENCRYPTED"];
    let i = 0;
    const interval = setInterval(() => {
      setMessage(msgs[i]);
      i = (i + 1) % msgs.length;
    }, 4000);
    setMessage(msgs[0]);
    return () => clearInterval(interval);
  }, [username]);

  return (
    <div className="relative flex flex-col items-center justify-center h-[300px] w-full py-10">
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="relative">
        <div className="w-16 h-20 bg-slate-900 border-2 border-fuchsia-500 rounded-t-full rounded-b-2xl shadow-[0_0_30px_rgba(217,70,239,0.3)] flex items-center justify-center gap-2">
          <div className="w-2 h-3 bg-fuchsia-400 rounded-full animate-pulse shadow-[0_0_10px_#d946ef]" />
          <div className="w-2 h-3 bg-fuchsia-400 rounded-full animate-pulse shadow-[0_0_10px_#d946ef]" />
        </div>
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 border border-white/10 px-4 py-1 rounded-full whitespace-nowrap">
          <span className="text-[9px] font-black text-fuchsia-400 tracking-widest uppercase font-mono">{message}</span>
        </div>
      </motion.div>
      <div className="w-32 h-2 bg-fuchsia-500/20 blur-md rounded-full mt-4" />
    </div>
  );
};

const CyberBootSequence = ({ onComplete, username }: { onComplete: () => void, username: string }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const tasks = ["CORE INITIALIZATION", "UPLINK ESTABLISHED", "AUTH VERIFIED", "WELCOME OPERATIVE"];
  useEffect(() => {
    let cur = 0;
    const timer = setInterval(() => {
      if (cur < tasks.length) { setLogs(p => [...p, `> ${tasks[cur]}`]); cur++; }
      else { clearInterval(timer); setTimeout(onComplete, 1000); }
    }, 300);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="fixed inset-0 z-[100000] bg-[#0b0f1a] flex items-center justify-center">
      <div className="max-w-xs w-full space-y-6">
        <div className="flex flex-col items-center gap-4">
          <ShieldCheck size={48} className="text-fuchsia-500 animate-pulse" />
          <h1 className="text-white font-black tracking-[0.5em] text-xs">BOOTING SYSTEM</h1>
        </div>
        <div className="space-y-1 font-mono">
          {logs.map((l, i) => <div key={i} className="text-[10px] text-fuchsia-400/60 uppercase">{l}</div>)}
        </div>
      </div>
    </div>
  );
};

const CyberCalculationFinale = ({ score, onFinish }: { score: number, onFinish: () => void }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      if (start < score) { start++; setCount(start); }
      else { clearInterval(interval); setTimeout(onFinish, 2000); }
    }, 30);
    return () => clearInterval(interval);
  }, [score, onFinish]);

  return (
    <div className="fixed inset-0 z-[100000] bg-black/95 flex flex-col items-center justify-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center space-y-4">
        <h2 className="text-fuchsia-500 font-black tracking-widest text-xs uppercase">Calculation Complete</h2>
        <div className="text-8xl font-black text-white drop-shadow-[0_0_20px_#d946ef]">{count}%</div>
        <div className="text-slate-500 text-[10px] font-bold tracking-[0.4em] uppercase">Tactical Readiness Score</div>
      </motion.div>
    </div>
  );
};

// --- MAIN PORTAL ---
export default function StudentPortal() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [bootDone, setBootDone] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [view, setView] = useState('dashboard'); 
  const [currentStep, setCurrentStep] = useState(1); 
  const [selectedDomain, setSelectedDomain] = useState("SOCIAL ENGINEERING");
  const [allQs, setAllQs] = useState<any[]>([]);
  const [ans, setAns] = useState<Record<number, {score: number, text: string}>>({});
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<any[]>([]);
  const [user, setUser] = useState<any>({ username: 'STUDENT', class_name: '', full_name: '', tanggal_lahir: '', place_of_birth: '', gender: '' });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showClassSelector, setShowClassSelector] = useState(false);
  const [detailModal, setDetailModal] = useState<any>(null);
  const [appFeedbackForm, setAppFeedbackForm] = useState({ category: 'AI ENHANCEMENT', message: '' });
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // --- LOGIC ---
  const fetchScores = useCallback(async (username: string) => {
    try {
      const res = await fetch(`https://cyber-backend-delta.vercel.app/siswa/scores/${username}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setHistory(data);
        if (data.length > 0) {
          const total = data.reduce((acc, curr: any) => acc + curr.score, 0);
          setScore(Math.round(total / data.length));
        }
      }
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
        fetchScores(parsed.username);
      } catch (e) { router.push('/'); }
    } else { router.push('/'); }
  }, [router, fetchScores]);

  useEffect(() => {
    fetch('https://cyber-backend-delta.vercel.app/questions')
      .then(res => res.json())
      .then((data: any[]) => {
        setAllQs(data.map(q => ({ ...q, options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options })));
      }).catch(err => console.error(err));
  }, []);

  const radarData = useMemo(() => {
    const sectors = ["Social", "Malware", "Phishing", "Network", "Threat", "Access"];
    return sectors.map(s => {
      const h = history.find(item => item.domain_id.toLowerCase().includes(s.toLowerCase()));
      return { subject: s.toUpperCase(), A: h ? h.score : 0, fullMark: 100 };
    });
  }, [history]);

  const currentStepQs = useMemo(() => {
    const targetDomain = selectedDomain.toLowerCase().replace(/\s/g, '');
    const targetStep = `step${currentStep}`.toLowerCase();
    return allQs.filter(q => (q.main_domain || "").toLowerCase().replace(/\s/g, '') === targetDomain && (q.type || "").toLowerCase() === targetStep);
  }, [allQs, currentStep, selectedDomain]);

  const maxStep = useMemo(() => {
    const domainQs = allQs.filter(q => (q.main_domain || "").toLowerCase() === selectedDomain.toLowerCase());
    const steps = domainQs.map(q => parseInt((q.type || "").replace(/\D/g, '')) || 1);
    return steps.length > 0 ? Math.max(...steps) : 1;
  }, [allQs, selectedDomain]);

  const executeUplink = async () => {
    setIsCalculating(true);
    const totalQuestions = Object.keys(ans).length;
    const totalScore = Object.values(ans).reduce((acc, curr) => acc + curr.score, 0);
    const finalScore = Math.round((totalScore / (totalQuestions * 10)) * 100);

    try {
      await fetch('https://cyber-backend-delta.vercel.app/siswa/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user.username, 
          class_name: user.class_name, 
          domain_id: selectedDomain,
          score: finalScore,
          answers: Object.keys(ans).map(id => ({ id: parseInt(id), value: ans[parseInt(id) as any].score.toString(), text: ans[parseInt(id) as any].text }))
        })
      });
      fetchScores(user.username);
    } catch (e) { console.error(e); }
  };

  const submitFeedback = async () => {
    if (!appFeedbackForm.message.trim()) return;
    setIsSendingFeedback(true);
    try {
      await fetch("https://formsubmit.co/ajax/devinedwinsiahaan171105@gmail.com", {
        method: "POST", headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Operative: user.username, Message: appFeedbackForm.message })
      });
      setAppFeedbackForm({ category: 'AI', message: '' });
      alert("Transmission Sent.");
    } catch (e) { console.error(e); } finally { setIsSendingFeedback(false); }
  };

  if (!mounted) return <div className="bg-[#0b0f1a] h-screen" />;
  if (!bootDone) return <CyberBootSequence onComplete={() => setBootDone(true)} username={user.username} />;

  return (
    <div className="flex h-screen w-full bg-[#0b0f1a] text-slate-100 overflow-hidden font-sans relative selection:bg-fuchsia-500/30">
      <NeonCursor />
      <PersistentUniverse bgIdx={0} />

      <AnimatePresence>
        {isCalculating && <CyberCalculationFinale score={score} onFinish={() => { setIsCalculating(false); setView('reports'); }} />}
      </AnimatePresence>

      {/* --- SIDEBAR --- */}
      <aside className={`h-screen border-r border-white/10 bg-[#0d121f]/95 backdrop-blur-md transition-all duration-300 z-50 flex flex-col ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
          {!isSidebarCollapsed && <div className="flex flex-col"><span className="text-[10px] font-black tracking-widest text-white">CYBER NEXUS</span></div>}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 text-slate-500 hover:text-fuchsia-500 transition-all">
            {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-2">
          {[
            { id: 'dashboard', label: 'DASHBOARD', icon: LayoutGrid },
            { id: 'assessment', label: 'MISSIONS', icon: Target },
            { id: 'reports', label: 'REPORTS', icon: FileText },
            { id: 'feedback', label: 'FEEDBACK', icon: MessageSquare }
          ].map(item => (
            <button key={item.id} onClick={() => setView(item.id)} className={`w-full flex items-center p-4 rounded-xl gap-4 transition-all ${view === item.id ? 'bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
              <item.icon size={20} />
              {!isSidebarCollapsed && <span className="text-[10px] font-black tracking-widest">{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button onClick={() => { localStorage.removeItem('user'); router.push('/'); }} className="w-full flex items-center p-4 text-red-400 hover:bg-red-500/10 rounded-xl gap-4 font-black text-[10px] tracking-widest">
            <Power size={18} /> {!isSidebarCollapsed && "LOGOUT"}
          </button>
        </div>
      </aside>

      {/* --- MAIN AREA --- */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-10 border-b border-white/5 bg-[#0d121f]/80 backdrop-blur-md">
          <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
            <span className="text-[9px] font-black text-slate-400 tracking-widest">UPLINK ACTIVE</span>
          </div>
          <div className="flex items-center gap-6 cursor-pointer group" onClick={() => setShowProfileModal(true)}>
            <div className="text-right">
              <p className="text-[11px] font-black text-white tracking-widest uppercase group-hover:text-fuchsia-400 transition-colors">{user.username}</p>
              <p className="text-[9px] font-black text-fuchsia-500/80 uppercase tracking-widest">{user.class_name || 'OPERATIVE'}</p>
            </div>
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-white/10 text-white shadow-xl group-hover:border-fuchsia-500 transition-all"><User size={18} /></div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-10 lg:px-12 will-change-transform scroll-smooth" ref={scrollRef}>
          <AnimatePresence mode="wait">
            
            {/* DASHBOARD VIEW */}
            {view === 'dashboard' && (
              <motion.div key="dash" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-6xl mx-auto space-y-10">
                <div className="relative p-10 rounded-[3rem] bg-gradient-to-br from-[#1a202c] to-[#0d121f] border border-white/10 shadow-2xl overflow-hidden">
                   <div className="relative z-10 space-y-6">
                      <div className="inline-block px-4 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-[10px] font-black tracking-widest uppercase">Personnel Access Verified</div>
                      <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none">SELAMAT DATANG,<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-500">{user.username}</span></h1>
                      <div className="flex flex-wrap gap-10 pt-4 border-t border-white/5 items-center">
                         <div className="space-y-1">
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Readiness Level</p>
                            <p className="text-2xl font-black text-white font-mono">{score}%</p>
                         </div>
                         <div className="space-y-1">
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Sector Deployment</p>
                            <p className="text-2xl font-black text-fuchsia-400 font-mono">{user.class_name || 'N/A'}</p>
                         </div>
                      </div>
                   </div>
                   <div className="absolute top-0 right-0 w-1/3 h-full bg-fuchsia-500/10 blur-[100px] pointer-events-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="p-8 bg-white/5 border border-white/5 rounded-3xl space-y-4">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-fuchsia-400"><ShieldCheck size={24}/></div>
                      <h3 className="text-sm font-black tracking-widest text-white uppercase">ID Profile</h3>
                      <p className="text-xs text-slate-400 font-medium">Data diri terverifikasi secara enkripsi di node pusat.</p>
                   </div>
                   <div className="p-8 bg-white/5 border border-white/5 rounded-3xl space-y-4">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-400"><Target size={24}/></div>
                      <h3 className="text-sm font-black tracking-widest text-white uppercase">Ready Mission</h3>
                      <p className="text-xs text-slate-400 font-medium">3 Modul simulasi pertahanan tersedia untuk dianalisis.</p>
                   </div>
                   <div className="p-8 bg-white/5 border border-white/5 rounded-3xl space-y-4">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-400"><Activity size={24}/></div>
                      <h3 className="text-sm font-black tracking-widest text-white uppercase">Performance</h3>
                      <p className="text-xs text-slate-400 font-medium">Grafik radar menunjukkan peningkatan ketajaman kognitif.</p>
                   </div>
                </div>

                <div className="p-10 rounded-[3rem] bg-white text-black flex flex-col md:flex-row items-center justify-between gap-10">
                   <div className="space-y-2">
                      <h2 className="text-4xl font-black tracking-tighter uppercase">Initial Deployment?</h2>
                      <p className="font-bold opacity-60 uppercase text-xs tracking-widest">Mulai sesi penilaian untuk memverifikasi integritas Anda.</p>
                   </div>
                   <button onClick={() => user.class_name ? setView('assessment') : setShowClassSelector(true)} className="px-12 py-5 bg-fuchsia-600 text-white rounded-2xl font-black text-xs tracking-widest hover:scale-105 transition-all shadow-xl uppercase">Start Mission</button>
                </div>
              </motion.div>
            )}

            {/* ASSESSMENT VIEW */}
            {view === 'assessment' && (
              <motion.div key="assess" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-12">
                 <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black text-white tracking-tighter uppercase">TARGET DOMAINS</h2>
                    <p className="text-slate-500 text-xs font-black tracking-[0.4em] uppercase">Pilih sektor simulasi taktis</p>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TACTICAL_DOMAINS.map((domain, i) => (
                      <div key={i} onClick={() => { setSelectedDomain(domain.title); setView('briefing'); }} className="group relative p-8 bg-white/5 border border-white/10 rounded-[2.5rem] cursor-pointer hover:border-fuchsia-500/50 transition-all hover:bg-white/[0.08]">
                         <div className="w-14 h-14 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-2xl flex items-center justify-center text-fuchsia-400 mb-8 group-hover:scale-110 transition-all"><domain.icon size={28}/></div>
                         <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{domain.title}</h3>
                         <p className="text-xs text-slate-400 leading-relaxed mb-8">{domain.desc}</p>
                         <div className="flex items-center gap-2 text-[10px] font-black text-fuchsia-400 tracking-widest uppercase">Deploy Phase <ArrowRight size={14}/></div>
                      </div>
                    ))}
                 </div>
              </motion.div>
            )}

            {/* BRIEFING VIEW */}
            {view === 'briefing' && (
              <motion.div key="brief" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-3xl mx-auto flex flex-col items-center justify-center py-20 text-center">
                 <CyberSentinel username={user.username} />
                 <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-4">UPLINK ESTABLISHED</h2>
                 <p className="text-slate-400 text-sm max-w-lg mb-10 leading-relaxed">Sektor <span className="text-fuchsia-400 font-black">{selectedDomain}</span> siap dianalisis. Pastikan fokus penuh saat menjawab setiap parameter taktis yang muncul.</p>
                 <div className="flex gap-4">
                    <button onClick={() => setView('assessment')} className="px-8 py-4 border border-white/10 text-slate-500 rounded-2xl font-black text-[10px] tracking-widest hover:text-white uppercase transition-all">Abort Mission</button>
                    <button onClick={() => { setView('mission'); setCurrentStep(1); }} className="px-12 py-4 bg-fuchsia-600 text-white rounded-2xl font-black text-[10px] tracking-widest shadow-2xl hover:scale-105 transition-all uppercase">Enter Field</button>
                 </div>
              </motion.div>
            )}

            {/* MISSION VIEW */}
            {view === 'mission' && (
              <motion.div key="mission" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto pb-40">
                 <div className="flex items-center justify-between mb-12 border-l-4 border-fuchsia-500 pl-6 py-2">
                    <div className="text-left">
                       <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">PHASE 0{currentStep}</h2>
                       <p className="text-[10px] font-black text-fuchsia-400 tracking-widest uppercase mt-2">SECTOR: {selectedDomain}</p>
                    </div>
                    <div className="text-right font-mono text-2xl font-black text-white/20">{(currentStep/maxStep*100).toFixed(0)}%</div>
                 </div>
                 <div className="space-y-10">
                    {currentStepQs.map((q, idx) => (
                      <div key={q.id} className="p-10 rounded-[3rem] bg-white/5 border border-white/10 shadow-2xl space-y-8">
                         <p className="text-xl lg:text-2xl font-black text-white leading-tight uppercase tracking-tight text-left">
                            {q.question || q.studi_kasus || q.soal || "DATA QUESTION NOT FOUND"}
                         </p>
                         <div className="grid grid-cols-1 gap-4">
                            {q.options?.map((opt: any, i: number) => (
                              <button key={i} onClick={() => setAns({ ...ans, [q.id]: { score: opt.score, text: opt.text } })} className={`p-6 rounded-2xl border-2 text-left text-sm font-black transition-all flex justify-between items-center ${ans[q.id]?.text === opt.text ? 'bg-fuchsia-600 border-fuchsia-400 text-white shadow-xl' : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'}`}>
                                 <span className="uppercase tracking-wide">{opt.text}</span>
                                 {ans[q.id]?.text === opt.text && <Check size={18} />}
                              </button>
                            ))}
                         </div>
                      </div>
                    ))}
                 </div>
                 <div className="fixed bottom-0 left-0 right-0 p-8 z-[60] pointer-events-none">
                    <div className="max-w-2xl mx-auto bg-[#0d121f]/95 border border-white/10 p-6 rounded-[2.5rem] flex items-center justify-between pointer-events-auto shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                       <div className="w-1/2 h-2 bg-white/5 rounded-full overflow-hidden ml-4">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${(currentStep/maxStep)*100}%` }} className="h-full bg-fuchsia-500 shadow-[0_0_15px_#d946ef]" />
                       </div>
                       <button 
                         disabled={currentStepQs.length > 0 && !currentStepQs.every(q => ans[q.id])} 
                         onClick={() => currentStep < maxStep ? setCurrentStep(p => p+1) : executeUplink()} 
                         className="px-10 py-4 bg-white text-black rounded-2xl font-black text-[10px] tracking-widest uppercase disabled:opacity-20 hover:scale-105 transition-all"
                       >
                          {currentStep < maxStep ? "NEXT PHASE" : "FINALIZE"}
                       </button>
                    </div>
                 </div>
              </motion.div>
            )}

            {/* REPORTS VIEW */}
            {view === 'reports' && (
              <motion.div key="reports" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-12">
                 <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">ANALYTIC REPORTS</h2>
                    <p className="text-slate-500 text-xs font-black tracking-[0.4em] uppercase">Arsip intelijen performa taktis</p>
                 </div>
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[3rem] p-8 h-[450px] relative overflow-hidden">
                       <div className="flex items-center gap-4 mb-6">
                          <RadarIcon className="text-fuchsia-500" size={20}/>
                          <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Neuro-Kognitif Radar</span>
                       </div>
                       <ResponsiveContainer width="100%" height="90%">
                          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                             <PolarGrid stroke="rgba(255,255,255,0.05)" />
                             <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9, fontWeight: 900 }} />
                             <Radar name="Score" dataKey="A" stroke="#d946ef" fill="#d946ef" fillOpacity={0.6} />
                          </RadarChart>
                       </ResponsiveContainer>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center">
                       <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center mb-6 shadow-2xl ${getReadinessData(score).text}`} style={{ borderColor: 'currentColor' }}>
                          <ShieldAlert size={50} />
                       </div>
                       <h3 className={`text-4xl font-black uppercase tracking-tighter ${getReadinessData(score).text}`}>{getReadinessData(score).label}</h3>
                       <p className="text-slate-500 text-[10px] font-black tracking-widest mt-2 uppercase">Classification Level</p>
                    </div>
                 </div>
                 <div className="bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="border-b border-white/5 text-[10px] font-black text-slate-500 tracking-widest uppercase">
                             <th className="p-8">Domain</th>
                             <th className="p-8">Accuracy</th>
                             <th className="p-8 text-center">Analysis</th>
                          </tr>
                       </thead>
                       <tbody className="text-white">
                          {history.map((h, i) => (
                            <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-all group">
                               <td className="p-8 font-black uppercase tracking-widest text-xs">{h.domain_id}</td>
                               <td className="p-8"><span className="text-2xl font-black font-mono text-fuchsia-500">{h.score}%</span></td>
                               <td className="p-8 text-center"><button onClick={() => setDetailModal(h.details)} className="px-6 py-2 border border-white/10 rounded-xl text-[9px] font-black tracking-widest hover:border-fuchsia-500 transition-all uppercase">View Intel</button></td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </motion.div>
            )}

            {/* FEEDBACK VIEW */}
            {view === 'feedback' && (
               <motion.div key="feed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-10 py-10">
                  <div className="text-center space-y-4">
                     <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">SYSTEM FEEDBACK</h2>
                     <p className="text-slate-500 text-xs font-black tracking-[0.4em] uppercase">Kirim intelijen balik ke pusat</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] space-y-8">
                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-widest">Select Category</label>
                        <div className="grid grid-cols-2 gap-3">
                           {['UI/UX', 'AI LOGIC', 'PERFORMANCE', 'SECURITY'].map(cat => (
                             <button key={cat} onClick={() => setAppFeedbackForm({...appFeedbackForm, category: cat})} className={`py-4 px-6 rounded-2xl border font-black text-[10px] tracking-widest uppercase transition-all ${appFeedbackForm.category === cat ? 'bg-fuchsia-600 border-fuchsia-400 text-white' : 'bg-white/5 border-white/5 text-slate-500'}`}>{cat}</button>
                           ))}
                        </div>
                     </div>
                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-fuchsia-400 uppercase tracking-widest">Description</label>
                        <textarea value={appFeedbackForm.message} onChange={(e) => setAppFeedbackForm({...appFeedbackForm, message: e.target.value})} placeholder="ENTER INTELLIGENCE DATA..." className="w-full h-40 bg-black/40 border border-white/10 rounded-2xl p-6 text-sm text-white focus:border-fuchsia-500 outline-none resize-none" />
                     </div>
                     <button onClick={submitFeedback} disabled={isSendingFeedback} className="w-full py-5 bg-white text-black rounded-2xl font-black text-[10px] tracking-[0.5em] uppercase hover:bg-fuchsia-600 hover:text-white transition-all">
                        {isSendingFeedback ? "Transmitting..." : "Execute Transmission"}
                     </button>
                  </div>
               </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      {/* --- MODALS --- */}
      
      {/* PROFILE MODAL */}
      <AnimatePresence>
        {showProfileModal && (
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full bg-[#0d121f] border border-fuchsia-500/30 rounded-[3rem] p-10 relative shadow-2xl">
                <div className="flex flex-col items-center text-center">
                   <div className="w-20 h-20 bg-slate-800 border-2 border-fuchsia-500 rounded-3xl flex items-center justify-center text-fuchsia-400 mb-6 shadow-[0_0_20px_rgba(217,70,239,0.3)]"><User size={40}/></div>
                   <h2 className="text-xl font-black text-white tracking-widest uppercase mb-1">OPERATIVE DOSSIER</h2>
                   <p className="text-[9px] font-black text-fuchsia-500 tracking-[0.4em] uppercase mb-8">System Access Level: Alpha</p>
                   <div className="w-full space-y-3 mb-10 text-left">
                      {[
                        { label: "Operative ID", val: user.username },
                        { label: "Full Name", val: user.full_name || 'NOT SET' },
                        { label: "Birth Sector", val: user.place_of_birth || 'NOT SET' },
                        { label: "Sector Sync", val: user.class_name || 'N/A' },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                           <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
                           <span className="text-[10px] font-black text-white uppercase tracking-widest">{item.val}</span>
                        </div>
                      ))}
                   </div>
                   <button onClick={() => setShowProfileModal(false)} className="w-full py-4 bg-white text-black rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all hover:bg-fuchsia-600 hover:text-white">Close Dossier</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CLASS SELECTOR */}
      <AnimatePresence>
        {showClassSelector && (
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl text-center">
             <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-xl w-full bg-[#0d121f] border border-white/10 rounded-[3rem] p-12">
                <Workflow className="mx-auto text-fuchsia-500 mb-6" size={48}/>
                <h2 className="text-3xl font-black text-white tracking-tight uppercase mb-4">SECTOR CLASSIFICATION</h2>
                <p className="text-slate-400 text-xs font-black tracking-widest uppercase mb-10">Pilih sektor operasi primer Anda</p>
                <div className="grid grid-cols-2 gap-4">
                   {AVAILABLE_CLASSES.map(cls => (
                     <button key={cls} onClick={() => { 
                       const u = { ...user, class_name: cls }; 
                       setUser(u); localStorage.setItem('user', JSON.stringify(u)); 
                       setShowClassSelector(false); setView('assessment'); 
                     }} className="p-5 border border-white/10 rounded-2xl text-[10px] font-black text-slate-400 hover:text-white hover:border-fuchsia-500 hover:bg-fuchsia-500/10 transition-all uppercase tracking-widest">{cls}</button>
                   ))}
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DETAIL ANALYSIS MODAL */}
      <AnimatePresence>
        {detailModal && (
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl">
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-3xl w-full max-h-[80vh] bg-[#0d121f] border border-white/10 rounded-[3rem] p-10 flex flex-col">
                <div className="flex justify-between items-center mb-8 shrink-0">
                   <h2 className="text-xl font-black text-white tracking-widest uppercase">INTEL ANALYSIS</h2>
                   <button onClick={() => setDetailModal(null)} className="p-3 text-slate-500 hover:text-white transition-all"><X size={24}/></button>
                </div>
                <div className="flex-1 overflow-y-auto pr-4 space-y-4 custom-scrollbar">
                   {detailModal.map((d: any, i: number) => (
                     <div key={i} className={`p-6 rounded-3xl border ${d.is_correct ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
                        <p className="text-slate-300 font-bold text-sm mb-4">"{d.question}"</p>
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Respon: {d.answer}</span>
                           {d.is_correct ? <CheckCircle2 className="text-emerald-500" size={18}/> : <XCircle className="text-red-500" size={18}/>}
                        </div>
                     </div>
                   ))}
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .bg-hud-grid { 
          background-image: linear-gradient(to right, rgba(217, 70, 239, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(217, 70, 239, 0.05) 1px, transparent 1px); 
          background-size: 50px 50px; 
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(217, 70, 239, 0.3); border-radius: 10px; }
        body { background: #0b0f1a; overflow: hidden; -webkit-font-smoothing: antialiased; }
        main { scroll-behavior: smooth; -webkit-overflow-scrolling: touch; }
      `}} />
    </div>
  );
}