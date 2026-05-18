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
      const newParticles = Array.from({ length: 8 }).map((_, i) => ({
        id: Math.random(), x: clientX, y: clientY, angle: (Math.PI * 2 / 8) * i, velocity: Math.random() * 60 + 30
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
          <motion.div key={p.id} initial={{ scale: 0, opacity: 1, x: p.x, y: p.y }} animate={{ scale: [0, 1, 0], opacity: [1, 0.8, 0], x: p.x + Math.cos(p.angle) * p.velocity, y: p.y + Math.sin(p.angle) * p.velocity }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-400 shadow-[0_0_15px_#d946ef]" style={{ width: '6px', height: '6px' }} />
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- 2. BACKGROUND COMPONENT (SUPER CLEAN OBSIDIAN) ---
const PersistentUniverse = React.memo(({ bgIdx }: { bgIdx: number }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      {/* Gambar Asli Cyber - Tanpa mix-blend aneh agar warna asli terlihat */}
      <AnimatePresence mode="wait">
        <motion.img 
          key={bgIdx} 
          src={CYBER_ASSETS[bgIdx]} 
          initial={{ opacity: 0, scale: 1.05 }} 
          animate={{ opacity: 0.3, scale: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 4 }} 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
        />
      </AnimatePresence>
      
      {/* Overlay Netral (Hitam) agar teks terbaca, tanpa embel-embel ungu */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      
      {/* Animasi Grid 3D Halus (Putih transparan) */}
      <div className="absolute inset-0 bg-grid-3d opacity-20 pointer-events-none" />
    </div>
  );
});
PersistentUniverse.displayName = 'PersistentUniverse';

// --- 3. KOMPONEN WAJAH ROBOT AI INTERAKTIF (MENGIKUTI KURSOR/TOUCH) ---
const RobotFace = ({ size = 24, ringSize = "w-40 h-40", coreSize = "w-24 h-24" }) => {
  const faceRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!faceRef.current) return;
      
      const rect = faceRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Deteksi posisi kursor atau sentuhan jari
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      
      // Batas maksimal pergerakan wajah (dalam pixel)
      const maxMove = 12; 
      
      const moveX = (deltaX / window.innerWidth) * maxMove * 3;
      const moveY = (deltaY / window.innerHeight) * maxMove * 3;
      
      // Membatasi gerakan agar mata tidak keluar dari frame wajah
      const clampedX = Math.max(-maxMove, Math.min(maxMove, moveX));
      const clampedY = Math.max(-maxMove, Math.min(maxMove, moveY));

      setOffset({ x: clampedX, y: clampedY });
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center" ref={faceRef}>
      {/* Outer Dashed Rings */}
      <div className={`absolute ${ringSize} border-[1px] border-dashed border-fuchsia-500/40 rounded-full animate-[spin_10s_linear_infinite]`} style={{ transform: 'scale(1.2)' }} />
      <div className={`absolute ${ringSize} border-[1px] border-dashed border-fuchsia-400/50 rounded-full animate-[spin_7s_linear_infinite_reverse]`} style={{ transform: 'scale(0.95)' }} />
      
      {/* Wajah Robot Base */}
      <div className={`relative ${coreSize} bg-[#050505] border-2 border-fuchsia-500 rounded-full shadow-[0_0_40px_rgba(217,70,239,0.5)] flex flex-col items-center justify-center z-10 overflow-hidden`}>
         <div className="absolute inset-0 bg-fuchsia-500/20 blur-md" />
         
         {/* Elemen Wajah (Mata & Mulut) yang Mengikuti Kursor dengan Mulus */}
         <motion.div 
           animate={{ x: offset.x, y: offset.y }}
           transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
           className="flex flex-col items-center justify-center z-20"
         >
           {/* Mata */}
           <div className="flex gap-4 mb-2">
             <div className="w-2.5 h-4 bg-fuchsia-400 rounded-full shadow-[0_0_10px_#d946ef] animate-pulse" />
             <div className="w-2.5 h-4 bg-fuchsia-400 rounded-full shadow-[0_0_10px_#d946ef] animate-pulse" />
           </div>
           {/* Mulut Senyum */}
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
  if (score >= 80) return { label: "EXCELLENT", color: "#d946ef", bg: "bg-fuchsia-600", glow: "shadow-[0_0_40px_rgba(217,70,239,0.4)]" };
  if (score >= 50) return { label: "AVERAGE", color: "#eab308", bg: "bg-yellow-600", glow: "shadow-[0_0_40px_rgba(234,179,8,0.4)]" };
  return { label: "POOR", color: "#ef4444", bg: "bg-red-600", glow: "shadow-[0_0_40px_rgba(239,68,68,0.4)]" };
};

const portalTransition = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }, exit: { opacity: 0, scale: 1.05 } };

const modalScale = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } }
};

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
  
  // TACTICAL DOMAINS (DENGAN NAMA LENGKAP)
  const TACTICAL_DOMAINS = [
    { id: "Social Engineering", title: "Social Engineering", icon: Brain, color: "#d946ef", desc: "Psychological Defense" },
    { id: "Malware", title: "Malware", icon: Bug, color: "#F87171", desc: "Detection & Analysis" },
    { id: "Phishing", title: "Phishing", icon: MailWarning, color: "#818CF8", desc: "Credential Protection" },
    { id: "Network", title: "Network Security", icon: Globe, color: "#34D399", desc: "Traffic Control" },
    { id: "Privilege", title: "Privilege Escalation", icon: Lock, color: "#d8b4fe", desc: "Access Management" },
    { id: "Threat", title: "Threat Hunting", icon: Radar, color: "#FB923C", desc: "Proactive Search" },
  ];

  const fetchScores = useCallback(async (username: string) => {
    try {
      const res = await fetch(`https://cyber-backend-delta.vercel.app/siswa/scores/${username}`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const total = data.reduce((acc, curr) => acc + curr.score, 0);
        setScore(Math.round(total / data.length));
        setHistory(data);
      }
    } catch (e) { console.error("OFFLINE"); }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      setIsAuthorized(true);
      fetchScores(parsed.username);
    } else { router.push('/'); }
    const interval = setInterval(() => setBgIdx(p => (p + 1) % CYBER_ASSETS.length), 10000);
    return () => clearInterval(interval);
  }, [router, fetchScores]);

  useEffect(() => {
    if (isAuthorized) {
      fetch('https://cyber-backend-delta.vercel.app/questions').then(r => r.json()).then(d => {
        const parsedData = d.map((q: any) => ({ ...q, options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options }));
        setAllQs(parsedData);
      });
    }
  }, [isAuthorized]);

  // Anti-Cheat (Pindah Tab)
  useEffect(() => {
    const handleVisibilityChange = () => { if (document.hidden && view === 'mission') setShowCheatModal(true); };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [view]);

  const handleStartMissionClick = () => {
    if (!user.class_name || user.class_name === "UNASSIGNED") { setShowClassSelector(true); } 
    else { setView('mission'); setCurrentStep(1); }
  };

  const assignClassAndStartMission = (className: string) => {
    const updatedUser = { ...user, class_name: className };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser)); 
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
    if (view === 'mission' && !['mission', 'logout'].includes(targetView)) {
      setNavWarning({ active: true, target: targetView }); return;
    }
    if (targetView === 'logout') { localStorage.removeItem('user'); router.push('/'); } else { setView(targetView); }
  };

  const confirmNavigation = () => {
    const target = navWarning.target; setNavWarning({ active: false, target: null });
    if (target) setView(target);
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

      {/* --- SIDEBAR (OBSIDIAN DARK) --- */}
      <motion.aside initial={false} animate={{ width: isSidebarCollapsed ? 80 : 280 }} className="h-screen bg-[#050505]/90 backdrop-blur-2xl border-r border-white/5 flex flex-col z-[100] transition-all duration-500 relative">
        <div className="h-20 px-6 flex items-center justify-between border-b border-white/5">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-600 to-purple-800 flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                <ShieldCheck size={18} className="text-white" />
              </div>
              <span className="font-bold tracking-widest text-sm text-white uppercase">CYBER EDU</span>
            </div>
          )}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 hover:bg-white/5 rounded-lg mx-auto transition-all text-slate-500"><ChevronLeft className={isSidebarCollapsed ? "rotate-180" : ""} /></button>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-2">
          {[ 
            { id: 'dashboard', label: 'BERANDA', icon: LayoutGrid },
            { id: 'assessment', label: 'UJIAN SIBER', icon: Target }, 
            { id: 'reports', label: 'KESIMPULAN', icon: BarChart3 } 
          ].map((item) => (
            <button key={item.id} onClick={() => handleSafeViewChange(item.id)} className={`w-full flex items-center p-4 rounded-xl transition-all gap-4 ${view === item.id ? 'bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 shadow-[0_0_20px_rgba(217,70,239,0.05)]' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
              <item.icon size={20} strokeWidth={view === item.id ? 2.5 : 2} />
              {!isSidebarCollapsed && <span className="font-bold text-[10px] tracking-[0.2em] uppercase">{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-white/5">
          <button onClick={() => handleSafeViewChange('logout')} className="w-full flex items-center p-3 text-red-500 hover:bg-red-500/10 rounded-xl gap-4 font-bold text-[10px] tracking-[0.2em] uppercase transition-colors">
            <Power size={18} /> {!isSidebarCollapsed && "KELUAR SESI"}
          </button>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-12 border-b border-white/5 bg-[#050505]/60 backdrop-blur-md">
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-3 px-4 py-1.5 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-full">
                 <div className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full animate-pulse shadow-[0_0_10px_#d946ef]" />
                 <span className="text-[9px] font-black text-fuchsia-400 tracking-[0.2em] uppercase">KONEKSI AMAN</span>
               </div>
            </div>
            <div className="flex items-center gap-6">
                <div className="text-right">
                    <p className="text-[11px] font-black text-white tracking-[0.1em] uppercase">{user.username}</p>
                    <p className="text-[9px] font-bold text-slate-500 tracking-[0.2em] uppercase">{user.class_name || "KELAS BELUM DITENTUKAN"}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-600 to-purple-800 rounded-full flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(217,70,239,0.3)] border border-white/10">
                  <User size={18} />
                </div>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar px-12 py-10" ref={scrollRef}>
          <AnimatePresence mode="wait">
            
            {/* ========================================================= */}
            {/* VIEW: DASHBOARD (OVERVIEW) */}
            {/* ========================================================= */}
            {view === 'dashboard' && (
              <motion.div key="dash" {...portalTransition} className="max-w-6xl mx-auto space-y-8">
                
                <div className="font-mono text-[9px] text-slate-500 tracking-[0.3em] uppercase leading-relaxed mb-8 opacity-60">
                   <div>STATUS AKADEMIK: AKTIF</div>
                   <div>PROTOKOL UJIAN: STANDAR NASIONAL V2.1</div>
                   <div className="text-fuchsia-400">MENUNGGU INISIASI EVALUASI...</div>
                </div>

                <div className="space-y-2">
                  <h1 className="text-5xl font-black text-white tracking-tighter leading-none uppercase">
                    PORTAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-600">SISWA.</span>
                  </h1>
                  <p className="text-slate-500 text-[11px] font-bold tracking-[0.2em] uppercase">Sistem Evaluasi & Pembelajaran Siber Terpadu</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
                   <div className="bg-[#09090b]/80 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] flex flex-col justify-between group hover:border-fuchsia-500/30 transition-all shadow-2xl">
                      <div>
                        <p className="text-[9px] font-black text-slate-600 tracking-[0.3em] mb-6 uppercase">Profil Siswa</p>
                        <div className="flex items-center gap-5 mb-8">
                          <div className="w-16 h-16 bg-gradient-to-b from-fuchsia-600 to-purple-900 rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(217,70,239,0.3)] relative overflow-hidden border border-fuchsia-500/50">
                            <Fingerprint size={32} className="opacity-80" />
                          </div>
                          <div>
                            <h4 className="text-2xl font-black text-white tracking-widest uppercase">{user.username}</h4>
                            <p className="text-[10px] text-fuchsia-400 font-bold tracking-widest uppercase mt-1">{user.class_name || "Belum Ada Kelas"}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#050505] p-4 rounded-xl border border-white/5 flex justify-between items-center">
                        <span className="text-[9px] font-bold text-slate-500 tracking-[0.2em] uppercase">Status Akun</span>
                        <span className="text-fuchsia-400 text-[10px] tracking-widest font-black uppercase flex items-center gap-2">
                           <div className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full animate-pulse" /> Terverifikasi
                        </span>
                      </div>
                   </div>

                   <div className="bg-[#09090b]/80 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] flex flex-col items-center justify-center relative shadow-2xl group hover:border-fuchsia-500/30 transition-all">
                      <div className="relative mb-6 flex justify-center w-full">
                        <svg className="w-36 h-36 transform -rotate-90">
                          <circle cx="72" cy="72" r="64" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="transparent" />
                          <motion.circle initial={{ strokeDasharray: "0 1000" }} animate={{ strokeDasharray: `${(score / 100) * 402} 1000` }} transition={{ duration: 2 }} cx="72" cy="72" r="64" stroke="#d946ef" strokeWidth="6" strokeLinecap="round" fill="transparent" style={{ filter: 'drop-shadow(0 0 10px rgba(217,70,239,0.6))' }} />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-5xl font-black text-white tracking-tighter">{score}</span>
                          <span className="text-[8px] font-bold text-slate-500 tracking-[0.3em] uppercase mt-1">Nilai Rata-rata</span>
                        </div>
                      </div>
                      <div className="px-6 py-2 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400 font-black text-[9px] tracking-[0.3em] uppercase shadow-[0_0_15px_rgba(217,70,239,0.15)]">{readiness.label}</div>
                   </div>

                   <div className="bg-[#09090b]/80 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] flex flex-col justify-between shadow-2xl group hover:border-fuchsia-500/30 transition-all">
                      <p className="text-[9px] font-black text-slate-600 tracking-[0.3em] mb-6 uppercase">Sistem Info</p>
                      <div className="space-y-5 font-mono text-[10px] tracking-[0.1em] text-slate-400">
                        <div className="flex justify-between items-center border-b border-white/5 pb-3">
                          <span className="flex items-center gap-3 uppercase"><Cpu size={14} className="text-fuchsia-500"/> Server Utama</span>
                          <span className="text-fuchsia-400">AKTIF</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/5 pb-3">
                          <span className="flex items-center gap-3 uppercase"><Server size={14} className="text-fuchsia-500"/> Enkripsi</span>
                          <span className="text-emerald-500">AES-256</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/5 pb-3">
                          <span className="flex items-center gap-3 uppercase"><Globe size={14} className="text-fuchsia-500"/> Jaringan</span>
                          <span className="text-white">STABIL</span>
                        </div>
                        <div className="flex justify-between items-center pb-2">
                          <span className="flex items-center gap-3 uppercase"><Activity size={14} className="text-fuchsia-500"/> Database</span>
                          <span className="text-slate-500">SINKRON</span>
                        </div>
                      </div>
                   </div>

                   {/* BROADCAST CENTER */}
                   <div className="lg:col-span-3 bg-[#09090b]/90 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] relative overflow-hidden flex items-center shadow-2xl">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-600/10 blur-[80px] rounded-full pointer-events-none" />
                      
                      <div className="flex items-center gap-8 w-full z-10">
                        <div className="w-16 h-16 bg-[#050505] rounded-2xl flex items-center justify-center shrink-0 border border-white/5 shadow-inner">
                          <BellRing size={24} className="text-fuchsia-500" />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                             <div className="flex gap-1">
                               <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse" />
                             </div>
                             <span className="text-[9px] font-black tracking-[0.4em] text-fuchsia-500 uppercase">Notifikasi Sistem</span>
                          </div>
                          <div className="space-y-1.5">
                             <p className="text-[13px] font-bold text-white uppercase tracking-widest">Sistem Ujian Telah Siap.</p>
                             <p className="text-[11px] font-medium text-slate-500 tracking-wider">Silakan pilih menu Ujian Siber untuk memulai evaluasi kompetensi keamanan Anda.</p>
                          </div>
                        </div>
                        <button onClick={() => setView('assessment')} className="px-10 py-5 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-xl font-black text-[11px] tracking-[0.3em] hover:scale-105 transition-all shadow-[0_0_30px_rgba(217,70,239,0.4)] flex items-center gap-3 uppercase">
                          MULAI UJIAN <Zap size={16} />
                        </button>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {/* VIEW ASSESSMENT (DENSE 3-COLUMN LAYOUT NAMA LENGKAP) */}
            {view === 'assessment' && (
              <motion.div key="assess-hub" {...portalTransition} className="max-w-6xl mx-auto space-y-12">
                <div className="space-y-4 text-center">
                   <h2 className="text-4xl font-black text-white tracking-widest uppercase">Materi Ujian.</h2>
                   <p className="text-[9px] font-bold text-slate-500 tracking-[0.5em] uppercase">Pilih sektor keamanan siber untuk dievaluasi</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {TACTICAL_DOMAINS.map((domain, i) => {
                    const alreadyDone = history.some(h => String(h.domain_id).toLowerCase().includes(domain.id.split(' ')[0].toLowerCase()));
                    return (
                      <motion.div key={i} whileHover={{ y: -8 }}
                         onClick={() => { 
                            if(alreadyDone) { setPendingDomain(domain.id); setShowRetakeWarning(true); } 
                            else { setSelectedDomain(domain.id); setView('briefing'); }
                         }} 
                         className={`relative bg-[#09090b]/90 backdrop-blur-md border ${alreadyDone ? 'border-fuchsia-500/50 shadow-[0_0_15px_rgba(217,70,239,0.1)]' : 'border-white/5'} p-8 rounded-[2rem] cursor-pointer group flex flex-col transition-all hover:bg-[#0c0c0f] hover:border-fuchsia-500/30 overflow-hidden`}
                      >
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-fuchsia-500/10 transition-colors" />
                        
                        <div className="flex justify-between items-start mb-8 relative z-10">
                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl" style={{ backgroundColor: `${domain.color}10`, border: `1px solid ${domain.color}30` }}>
                             <domain.icon size={24} style={{ color: domain.color }} />
                          </div>
                          {alreadyDone && (
                            <div className="flex items-center gap-2 bg-fuchsia-500/10 px-3 py-1.5 rounded-full border border-fuchsia-500/20">
                              <CheckCircle2 size={12} className="text-fuchsia-400" />
                              <span className="text-[8px] font-black text-fuchsia-400 tracking-widest uppercase">Tuntas</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="relative z-10">
                          <h3 className="text-lg font-black text-white mb-2 leading-tight uppercase tracking-widest">{domain.title}</h3>
                          <p className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase mb-8 line-clamp-2">{domain.desc}</p>
                        </div>

                        <div className="mt-auto pt-5 w-full border-t border-white/5 flex justify-between items-center relative z-10">
                           <div className="flex gap-1.5">
                             {[1,2,3,4].map(idx => <div key={idx} className={`w-1.5 h-1.5 rounded-full ${alreadyDone ? 'bg-fuchsia-500' : 'bg-slate-700'}`} />)}
                           </div>
                           <span className={`text-[9px] font-black tracking-[0.3em] flex items-center gap-2 ${alreadyDone ? 'text-fuchsia-400' : 'text-slate-400 group-hover:text-fuchsia-400 group-hover:translate-x-1'} transition-all uppercase`}>
                             {alreadyDone ? 'Ulangi' : 'Pilih Sektor'} <ArrowRight size={12} />
                           </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* VIEW MISSION / THE QUESTIONS (TANPA ROBOT AGAR RAPI & FOKUS) */}
            {view === 'mission' && (
              <motion.div key="mission" {...portalTransition} className="max-w-4xl mx-auto space-y-10 pb-40">
                <header className="flex justify-between items-end border-b border-white/5 pb-8">
                   <div className="space-y-4">
                      <button onClick={() => handleSafeViewChange('assessment')} className="text-[9px] font-black text-slate-500 hover:text-fuchsia-400 flex items-center gap-3 tracking-[0.3em] transition-all uppercase"><ArrowLeft size={12} /> BATALKAN SESI</button>
                      <h2 className="text-4xl font-black text-white tracking-widest uppercase">FASE 0{currentStep}</h2>
                      <p className="text-fuchsia-500 font-black tracking-[0.5em] text-[9px] uppercase">EVALUASI {selectedDomain}</p>
                   </div>
                   <div className="text-[100px] font-black text-white/5 font-mono leading-none tracking-tighter">0{currentStep}</div>
                </header>
                
                <div className="space-y-6">
                   {currentStepQs.length > 0 ? currentStepQs.map((q) => (
                     <div key={q.id} className="p-10 rounded-[2rem] bg-[#09090b]/90 border border-white/5 space-y-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-fuchsia-500" />
                        
                        <h4 className="text-lg font-medium text-slate-200 leading-relaxed tracking-wide">"{q.text}"</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {q.options.slice(0, 4).map((opt: any, i: number) => (
                             <button key={i} onClick={() => setAns({...ans, [q.id]: {score: opt.score, text: opt.text}})} 
                                className={`p-6 rounded-2xl text-left transition-all border text-[10px] font-bold leading-relaxed tracking-widest uppercase flex items-center gap-5 ${ans[q.id]?.text === opt.text ? 'bg-fuchsia-600/10 border-fuchsia-500 text-white shadow-[0_0_20px_rgba(217,70,239,0.15)]' : 'bg-[#050505] border-white/5 text-slate-400 hover:border-white/20'}`}>
                               <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${ans[q.id]?.text === opt.text ? 'border-fuchsia-400' : 'border-slate-700'}`}>
                                 {ans[q.id]?.text === opt.text && <div className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full shadow-[0_0_5px_#d946ef]" />}
                               </div>
                               <span>{opt.text}</span>
                             </button>
                           ))}
                        </div>
                     </div>
                   )) : (
                     <div className="text-center py-20 text-slate-600 font-black tracking-[0.3em] text-[10px] border border-dashed border-white/5 rounded-3xl uppercase">DATA SOAL TIDAK DITEMUKAN.</div>
                   )}
                </div>

                <div className="flex gap-4 pt-4">
                  {currentStep > 1 && <button onClick={() => setCurrentStep(p => p - 1)} className="px-10 py-5 bg-[#050505] border border-white/10 text-slate-400 rounded-xl font-black text-[10px] tracking-[0.3em] hover:bg-white/5 transition-all uppercase">SEBELUMNYA</button>}
                  {currentStep < maxStep ? (
                    <button disabled={!isStepComplete} onClick={() => setCurrentStep(p => p + 1)} className={`flex-1 py-5 rounded-xl font-black text-[10px] tracking-[0.3em] transition-all uppercase ${isStepComplete ? 'bg-fuchsia-600 text-white shadow-[0_0_20px_rgba(217,70,239,0.3)]' : 'bg-white/5 text-slate-700 cursor-not-allowed'}`}>FASE SELANJUTNYA</button>
                  ) : (
                    <button disabled={!isStepComplete || loading} onClick={executeUplink} className={`flex-1 py-5 rounded-xl font-black text-[10px] tracking-[0.4em] transition-all uppercase flex items-center justify-center gap-3 ${isStepComplete ? 'bg-fuchsia-600 text-white shadow-[0_0_30px_rgba(217,70,239,0.4)]' : 'bg-[#050505] text-slate-700 border border-white/5 cursor-not-allowed'}`}>
                       {submitStatus} {isStepComplete && submitStatus !== 'SINKRONISASI...' && <Zap size={14}/>}
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* VIEW REPORTS (TABEL KESIMPULAN) */}
            {view === 'reports' && (
              <motion.div key="reports" {...portalTransition} className="max-w-6xl mx-auto space-y-8">
                 <div className="space-y-2">
                    <h2 className="text-4xl font-black text-white tracking-widest uppercase">Kesimpulan Evaluasi.</h2>
                    <p className="text-slate-500 text-[9px] font-bold tracking-[0.3em] uppercase">Rekapitulasi Hasil Pengerjaan Modul</p>
                 </div>

                 <div className="bg-[#09090b]/90 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.02] text-7xl font-black tracking-tighter pointer-events-none uppercase">ARSIP</div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 relative z-10">
                        <div className="bg-[#050505] rounded-2xl p-6 border border-white/5">
                           <p className="text-[8px] text-slate-500 font-black tracking-[0.3em] mb-2 uppercase">TOTAL UJIAN</p>
                           <p className="text-3xl text-white font-black font-mono tracking-widest">{history.length}</p>
                        </div>
                        <div className="bg-[#050505] rounded-2xl p-6 border border-white/5">
                           <p className="text-[8px] text-slate-500 font-black tracking-[0.3em] mb-2 uppercase">NILAI RATA-RATA</p>
                           <p className="text-3xl text-fuchsia-400 font-black font-mono tracking-widest">{score}%</p>
                        </div>
                        <div className="bg-[#050505] rounded-2xl p-6 border border-white/5">
                           <p className="text-[8px] text-slate-500 font-black tracking-[0.3em] mb-2 uppercase">PREDIKAT</p>
                           <p className={`text-lg font-black tracking-widest uppercase mt-2 ${readiness.color === '#ef4444' ? 'text-red-500' : readiness.color === '#eab308' ? 'text-yellow-500' : 'text-fuchsia-400'}`}>
                              {readiness.label}
                           </p>
                        </div>
                    </div>

                    <div className="relative z-10 bg-[#050505] border border-white/5 rounded-2xl overflow-hidden">
                      <div className="p-6 border-b border-white/5 bg-[#030005]">
                         <p className="text-[10px] font-black text-white tracking-[0.2em] uppercase">Tabel Riwayat Domain</p>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-white/5 bg-white/[0.02]">
                              <th className="py-5 pl-8 text-[8px] font-black tracking-[0.3em] text-slate-500 uppercase">Sesi Ujian</th>
                              <th className="py-5 text-[8px] font-black tracking-[0.3em] text-slate-500 uppercase">Sektor Target</th>
                              <th className="py-5 text-[8px] font-black tracking-[0.3em] text-slate-500 uppercase">Skor Akurasi</th>
                              <th className="py-5 text-[8px] font-black tracking-[0.3em] text-slate-500 uppercase">Keterangan</th>
                              <th className="py-5 pr-8 text-[8px] font-black tracking-[0.3em] text-slate-500 uppercase text-right">Detail</th>
                            </tr>
                          </thead>
                          <tbody>
                             {history.length === 0 ? (
                                <tr>
                                  <td colSpan={5} className="py-16 text-center text-slate-600 font-black text-[9px] uppercase tracking-[0.3em]">
                                     BELUM ADA RIWAYAT UJIAN YANG TERSEDIA.
                                  </td>
                                </tr>
                             ) : (
                                history.map((h, i) => {
                                   const rd = getReadinessData(h.score);
                                   return (
                                     <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                       <td className="py-6 pl-8">
                                          <div className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
                                            <span className="text-[10px] font-black text-white tracking-widest font-mono">0{history.length - i}</span>
                                          </div>
                                       </td>
                                       <td className="py-6 text-[10px] font-bold text-slate-300 tracking-[0.1em] uppercase">
                                          {h.domain_id}
                                       </td>
                                       <td className="py-6">
                                          <span className="text-sm font-black text-white font-mono tracking-widest">{h.score}%</span>
                                       </td>
                                       <td className="py-6">
                                          <span className={`px-3 py-1 rounded-full text-[8px] font-black tracking-widest uppercase border ${rd.bg.replace('bg-', 'border-').replace('600', '500/30')} bg-transparent`} style={{ color: rd.color }}>
                                            {rd.label}
                                          </span>
                                       </td>
                                       <td className="py-6 pr-8 text-right">
                                          <button onClick={() => setDetailModal(h.details || [])} className="inline-flex items-center gap-2 px-4 py-2 bg-[#09090b] border border-white/10 hover:border-fuchsia-500/50 text-slate-400 hover:text-white rounded-lg text-[8px] font-black tracking-[0.3em] transition-all uppercase">
                                             <ScanLine size={12} /> Buka
                                          </button>
                                       </td>
                                     </tr>
                                   )
                                })
                             )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                 </div>
              </motion.div>
            )}

            {/* BRIEFING VIEW (ROBOT UI INTERAKTIF SESUAI GAMBAR) */}
            {view === 'briefing' && (
              <motion.div key="briefing" {...portalTransition} className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[75vh]">
                 <div className="mb-14 cursor-pointer">
                   {/* Komponen Wajah Robot yang akan mengikuti Kursor/Sentuhan Jari */}
                   <RobotFace size={28} ringSize="w-44 h-44" coreSize="w-28 h-28" />
                 </div>
                 
                 <motion.div className="flex flex-col items-center text-center space-y-6">
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-[0.2em] uppercase drop-shadow-lg">
                      TRANSMISI DITERIMA
                    </h2>
                    <p className="text-[11px] font-bold text-slate-300 leading-relaxed max-w-2xl tracking-[0.2em] uppercase">
                       HALO <span className="text-fuchsia-400">{user.username}</span>, APAKAH ANDA SUDAH SIAP UNTUK<br/>
                       MENGERJAKAN KUIS PADA TOPIK <span className="text-fuchsia-400">{selectedDomain}</span>?
                    </p>
                 </motion.div>
                 
                 <div className="flex gap-6 mt-12">
                    <button onClick={() => setView('assessment')} className="px-10 py-4 border border-white/20 text-slate-300 rounded-full font-black text-[10px] tracking-[0.2em] hover:bg-white/5 hover:border-white/40 transition-all uppercase">
                      BATALKAN
                    </button>
                    <button onClick={handleStartMissionClick} className="px-10 py-4 bg-fuchsia-600 text-white rounded-full font-black text-[10px] tracking-[0.2em] shadow-[0_0_30px_rgba(217,70,239,0.5)] hover:scale-105 hover:bg-fuchsia-500 transition-all flex items-center gap-3 uppercase">
                      MULAI KUIS <Zap size={14} />
                    </button>
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      {/* --- MODAL DETAIL JAWABAN (OBSIDIAN) --- */}
      <AnimatePresence>
        {detailModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[3000] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95, y: 15 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-4xl max-h-[85vh] bg-[#09090b] border border-white/10 rounded-[2rem] p-10 shadow-2xl flex flex-col overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-[0_0_15px_#d946ef]" />
               <div className="flex justify-between items-center mb-8 shrink-0">
                  <div>
                    <h2 className="text-lg font-black text-white tracking-widest flex items-center gap-3 uppercase"><Terminal size={18} className="text-fuchsia-500"/> DETAIL JAWABAN</h2>
                  </div>
                  <button onClick={() => setDetailModal(null)} className="p-2 bg-[#050505] border border-white/5 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all text-slate-500"><X size={16} /></button>
               </div>
               <div className="flex-1 overflow-y-auto pr-4 space-y-4 custom-scrollbar">
                 {detailModal.length > 0 ? detailModal.map((d: any, i: number) => (
                    <div key={i} className={`p-6 rounded-2xl border flex flex-col gap-4 items-start bg-[#050505] ${d.is_correct ? 'border-emerald-500/20' : 'border-red-500/20'}`}>
                       <div className="flex gap-6 w-full">
                          <div className={`p-2.5 h-fit rounded-xl mt-1 shrink-0 ${d.is_correct ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                             {d.is_correct ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                          </div>
                          <div className="flex-1">
                             <p className="text-slate-200 font-medium text-[13px] mb-4 leading-relaxed tracking-wide">"{d.question}"</p>
                             <div className="bg-[#09090b] p-4 rounded-xl border border-white/5">
                                <p className="text-[8px] font-black text-slate-600 tracking-[0.3em] mb-1.5 uppercase">JAWABAN ANDA:</p>
                                <p className={`font-bold text-[11px] tracking-wide ${d.is_correct ? 'text-emerald-500' : 'text-red-500'}`}>{d.answer || "KOSONG"}</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 )) : (
                   <div className="py-20 text-center text-slate-600 font-black tracking-[0.3em] text-[10px] border border-dashed border-white/5 rounded-2xl uppercase">DETAIL DATA RUSAK/KOSONG.</div>
                 )}
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODAL RETAKE --- */}
      <AnimatePresence>
        {showRetakeWarning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-xl bg-[#09090b] border border-fuchsia-500/30 rounded-[2rem] p-10 shadow-[0_0_50px_rgba(217,70,239,0.1)] text-center overflow-hidden">
               <AlertTriangle size={48} className="text-fuchsia-500 mx-auto mb-6 animate-pulse" />
               <h2 className="text-2xl font-black mb-3 text-white tracking-widest uppercase">PERINGATAN <span className="text-fuchsia-500">MENGULANG.</span></h2>
               <p className="text-slate-400 mb-10 text-[11px] leading-relaxed font-bold tracking-widest uppercase">
                 SEKTOR INI SUDAH DIKERJAKAN. JIKA DIULANG, DATA SEBELUMNYA AKAN <span className="text-red-500">DIHAPUS</span>. LANJUTKAN?
               </p>
               <div className="flex gap-4">
                 <button onClick={() => setShowRetakeWarning(false)} className="flex-1 py-4 bg-[#050505] border border-white/10 text-slate-400 rounded-xl font-black text-[9px] tracking-[0.3em] hover:bg-white/5 transition-all uppercase">BATAL</button>
                 <button onClick={() => { setShowRetakeWarning(false); setSelectedDomain(pendingDomain); setView('briefing'); }} className="flex-1 py-4 bg-fuchsia-600 text-white rounded-xl font-black text-[9px] tracking-[0.3em] hover:bg-fuchsia-500 transition-all shadow-[0_0_20px_rgba(217,70,239,0.3)] uppercase">KONFIRMASI ULANG</button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODAL PEMILIHAN KELAS --- */}
      <AnimatePresence>
        {showClassSelector && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-3xl bg-[#09090b] border border-white/10 rounded-[2rem] p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] text-center overflow-hidden">
               <button onClick={() => setShowClassSelector(false)} className="absolute top-8 left-8 text-slate-500 hover:text-white flex items-center gap-2 font-black text-[9px] tracking-[0.3em] transition-all z-50 bg-[#050505] px-4 py-2 rounded-xl border border-white/5 hover:border-red-500/50 uppercase"><ArrowLeft size={12} /> BATAL</button>
               
               <div className="p-4 bg-[#050505] rounded-2xl w-fit mx-auto mb-6 border border-white/5"><ShieldCheck size={32} className="text-fuchsia-500" /></div>
               <h2 className="text-2xl font-black mb-2 text-white tracking-widest uppercase">PILIH <span className="text-fuchsia-500">KELAS.</span></h2>
               <p className="text-slate-500 mb-10 text-[9px] tracking-[0.3em] font-bold uppercase">Tentukan kelas Anda sebelum melanjutkan ke dalam ujian.</p>
               
               <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
                 {AVAILABLE_CLASSES.map(cls => (
                    <button key={cls} onClick={() => assignClassAndStartMission(cls)} className="p-5 bg-[#050505] border border-white/5 rounded-xl font-black text-[11px] tracking-widest text-slate-400 hover:text-white hover:border-fuchsia-500/50 transition-all hover:shadow-[0_0_15px_rgba(217,70,239,0.15)] uppercase">{cls}</button>
                 ))}
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODAL ANTI CHEAT --- */}
      <AnimatePresence>
        {(showCheatModal || navWarning.active) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
            <motion.div variants={modalScale} initial="hidden" animate="visible" exit="exit" className="relative w-full max-w-xl bg-[#09090b] border border-red-500/30 rounded-[2rem] p-10 shadow-[0_0_50px_rgba(239,68,68,0.15)] text-center">
               <ShieldAlert size={48} className="text-red-500 mx-auto mb-6 animate-pulse" />
               <h2 className="text-xl font-black mb-3 text-white tracking-widest uppercase">{showCheatModal ? "PELANGGARAN TERDETEKSI" : "PERINGATAN KELUAR"}</h2>
               <p className="text-slate-400 mb-8 text-[10px] leading-relaxed font-bold uppercase tracking-[0.2em]">{showCheatModal ? "BROWSER KEHILANGAN FOKUS. KEMBALI KE HALAMAN UJIAN UNTUK MENGHINDARI SANKSI." : "KELUAR DARI HALAMAN INI AKAN MENGHAPUS SEMUA JAWABAN SEMENTARA ANDA."}</p>
               <div className="flex gap-4">
                 <button onClick={() => { setShowCheatModal(false); setNavWarning({ active: false, target: null }); }} className="flex-1 py-4 bg-white text-black rounded-xl font-black text-[9px] tracking-[0.3em] hover:bg-slate-200 transition-colors uppercase">KEMBALI KE UJIAN</button>
                 {navWarning.active && <button onClick={confirmNavigation} className="flex-1 py-4 bg-[#050505] border border-red-500/30 text-red-500 rounded-xl font-black text-[9px] tracking-[0.3em] hover:bg-red-500/10 transition-colors uppercase">KELUAR</button>}
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        @keyframes grid-move { 0% { background-position: 0 0; } 100% { background-position: 0 60px; } }
        .bg-grid-3d {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 60px 60px;
          transform: perspective(600px) rotateX(60deg) scale(2.5);
          transform-origin: top;
          animation: grid-move 4s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(217, 70, 239, 0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(217, 70, 239, 0.6); }
        ::-webkit-scrollbar { width: 0px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        body { background-color: #000000; cursor: crosshair; }
        ::selection { background: rgba(217,70,239,0.3); color: white; }
      `}} />
    </div>
  );
}