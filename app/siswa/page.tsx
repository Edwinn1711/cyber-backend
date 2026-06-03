"use client"
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
// --- IMPORT SEMUA IKON (AUDITED) ---
import { 
  ShieldCheck, Brain, Target, ChevronRight, ChevronLeft, Zap, ArrowLeft, ArrowRight,
  Fingerprint, Power, BarChart3, Activity, ShieldAlert, Cpu, Globe, Lock, 
  Radar as RadarIcon, Terminal, Database, Server, Search, Radio, Bug, MailWarning, 
  Sparkles, AlertTriangle, Eye, CheckCircle2, XCircle, X, User, Info, 
  ShieldQuestion, LayoutGrid, Check, BellRing, Bot, ScanLine, Laptop, Workflow, 
  FileText, TrendingUp, Lightbulb, Hexagon, Send, MessageSquare 
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts'

// --- CONFIG & ASSETS ---
const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

const TACTICAL_DOMAINS = [
  { id: "Social Engineering", title: "SOCIAL ENGINEERING", icon: Brain, color: "#22d3ee", desc: "Cyber Psychological Defense Operations", label: "DOMAIN ALPHA" },
  { id: "Malware", title: "MALWARE ANALYSIS", icon: Bug, color: "#f472b6", desc: "Neural Malware Scrutiny Protocol", label: "DOMAIN BRAVO" },
  { id: "Phishing", title: "PHISHING DEFENSE", icon: MailWarning, color: "#818cf8", desc: "Credential Integrity Security Audit", label: "DOMAIN CHARLIE" },
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

const CyberBootSequence = ({ onComplete }: { onScroll?: any, onComplete: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const bootTasks = [
    "INITIALIZING_CORE_SYSTEM...",
    "LOADING_ENCRYPTION_LAYER_AES256...",
    "ESTABLISHING_NEURAL_UPLINK...",
    "SCANNING_LOCAL_NETWORK_INFRASTRUCTURE...",
    "AUTHORIZING_PERSONNEL_ACCESS...",
    "ACCESS_GRANTED_BY_COMMAND_CENTRE",
    "SYSTEM_READY_OPERATIVE_DEVIN"
  ];

  useEffect(() => {
    let currentTask = 0;
    const interval = setInterval(() => {
      if (currentTask < bootTasks.length) {
        setLogs(prev => [...prev, `> ${bootTasks[currentTask]}`]);
        currentTask++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-[20000] bg-black flex flex-col items-center justify-center p-6 font-mono"
    >
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-center gap-4 mb-8">
          <ShieldCheck size={40} className="text-cyan-400 animate-pulse" />
          <div className="h-px flex-1 bg-cyan-500/20" />
        </div>
        <div className="space-y-2">
          {logs.map((log, i) => (
            <motion.p 
              key={i} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              className={`text-xs tracking-[0.2em] ${i === logs.length - 1 ? 'text-cyan-400' : 'text-slate-600'}`}
            >
              {log}
            </motion.p>
          ))}
        </div>
        <div className="pt-10">
           <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }} 
                animate={{ width: "100%" }} 
                transition={{ duration: 3 }}
                className="h-full bg-cyan-500 shadow-[0_0_15px_#22d3ee]" 
              />
           </div>
        </div>
      </div>
    </motion.div>
  );
};

const CyberCalculationFinale = ({ score, onFinish }: { score: number, onFinish: () => void }) => {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState("EXTRACTING_DATA_PACKETS");

  useEffect(() => {
    // 1. Animasi angka menghitung (Count Up)
    const duration = 3000; // 3 detik
    const start = 0;
    const end = score;
    let startTime: number;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) requestAnimationFrame(animateCount);
    };

    requestAnimationFrame(animateCount);

    // 2. Simulasi Teks Log Intelijen
    const sequence = [
      { t: 0, msg: "ANALYZING_TACTICAL_RESPONSES..." },
      { t: 800, msg: "DECRYPTING_VULNERABILITY_INDEX..." },
      { t: 1600, msg: "SYNCING_WITH_CENTRAL_COMMAND..." },
      { t: 2400, msg: "GENERATING_INTELLIGENCE_REPORT..." },
      { t: 3000, msg: "CALCULATION_COMPLETE" }
    ];

    sequence.forEach(step => {
      setTimeout(() => setStatus(step.msg), step.t);
    });

    // Selesai dan pindah ke Report
    setTimeout(onFinish, 4500);
  }, [score, onFinish]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[40000] bg-[#020108] flex flex-col items-center justify-center font-mono overflow-hidden"
    >
      {/* Efek Garis Saraf (Neural Lines) */}
      <div className="absolute inset-0 opacity-20">
         {[...Array(10)].map((_, i) => (
           <motion.div 
             key={i}
             animate={{ 
               x: [-100, 100], 
               opacity: [0, 1, 0],
               scaleY: [1, 2, 1] 
             }}
             transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
             className="absolute w-full h-px bg-cyan-500"
             style={{ top: `${i * 10}%` }}
           />
         ))}
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-12">
        {/* Ring Pemuat Raksasa */}
        <div className="relative w-64 h-64 flex items-center justify-center">
           <svg className="w-full h-full rotate-[-90deg]">
              <circle cx="128" cy="128" r="120" stroke="rgba(34, 211, 238, 0.05)" strokeWidth="4" fill="transparent" />
              <motion.circle 
                initial={{ strokeDasharray: "0 1000" }}
                animate={{ strokeDasharray: "754 1000" }}
                transition={{ duration: 3, ease: "easeInOut" }}
                cx="128" cy="128" r="120" stroke="#22d3ee" strokeWidth="8" strokeLinecap="round" fill="transparent"
                style={{ filter: 'drop-shadow(0 0 20px #22d3ee)' }}
              />
           </svg>
           <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span 
                key={count}
                initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="text-8xl font-black text-white tracking-tighter"
              >
                {count}
              </motion.span>
              <span className="text-[10px] font-black text-cyan-400 tracking-[0.5em] mt-2">READINESS_LEVEL</span>
           </div>
        </div>

        {/* Teks Status Terminal */}
        <div className="text-center space-y-4">
           <div className="flex items-center justify-center gap-4">
              <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-ping" />
              <p className="text-sm font-bold text-fuchsia-500 tracking-[0.3em] uppercase">{status}</p>
           </div>
           <div className="flex gap-1 justify-center">
              {[...Array(20)].map((_, i) => (
                <motion.div 
                  key={i} 
                  animate={{ opacity: [0.1, 1, 0.1] }} 
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                  className="w-1 h-3 bg-cyan-500/30" 
                />
              ))}
           </div>
        </div>
      </div>

      {/* Overlay Scanline Glitch */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none" />
    </motion.div>
  );
};

export default function StudentPortal() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isCalculating, setIsCalculating] = useState(false);

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
    if (!user.class_name || user.class_name === "UNASSIGNED") {
      setShowClassSelector(true);
    } else {
      setView('assessment');
    }
  };

  const assignClassAndStartMission = (className: string) => {
    const updatedUser = { ...user, class_name: className };
    setUser(updatedUser); localStorage.setItem('user', JSON.stringify(updatedUser)); 
    setShowClassSelector(false); setView('mission'); setCurrentStep(1);
  };

  const executeUplink = async () => {
    setLoading(true);
    
    // 1. Hitung skor (Contoh logika: rata-rata jawaban)
    const totalQuestions = Object.keys(ans).length;
    const totalScore = Object.values(ans).reduce((acc, curr) => acc + curr.score, 0);
    const finalCalculatedScore = Math.round((totalScore / (totalQuestions * 10)) * 100);
    
    setScore(finalCalculatedScore);

    // 2. TRIGGER LAYAR PERHITUNGAN DEWA
    setIsCalculating(true); 

    try {
      // Kirim ke database di background
      await fetch('https://cyber-backend-delta.vercel.app/siswa/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user.username,
          class_name: user.class_name,
          domain_id: selectedDomain,
          score: finalCalculatedScore,
          answers: Object.keys(ans).map(id => ({
            id: parseInt(id),
            value: ans[parseInt(id) as any].score.toString(),
            text: ans[parseInt(id) as any].text
          }))
        })
      });
    } catch (e) {
      console.error("Uplink Failed", e);
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


  const CyberSentinel = ({ username = "OPERATIVE" }) => {
    const [message, setMessage] = useState("SYSTEM_ONLINE");
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
  
    // Fisika halus untuk kepala mengikuti mouse (seperti robot melihat kita)
    const headX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 20 });
    const headY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 20 });
  
    useEffect(() => {
      const messages = [
        `READY, ${username.toUpperCase()}`,
        "SCANNING NODES...",
        "DATABASE SECURED",
        "ALL SYSTEMS GO",
        "LINK ESTABLISHED"
      ];
      let i = 0;
      const interval = setInterval(() => {
        setMessage(messages[i]);
        i = (i + 1) % messages.length;
      }, 4500);
  
      const handleMove = (e: MouseEvent) => {
        mouseX.set((e.clientX / window.innerWidth) - 0.5);
        mouseY.set((e.clientY / window.innerHeight) - 0.5);
      };
      window.addEventListener("mousemove", handleMove);
      return () => { clearInterval(interval); window.removeEventListener("mousemove", handleMove); };
    }, [username]);
  
    return (
      <div className="relative flex flex-col items-center justify-center h-[500px] w-full select-none" style={{ perspective: '1000px' }}>
        
        {/* --- 1. HOLOGRAPHIC CHAT BUBBLE --- */}
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-0 z-50 bg-cyan-500/10 backdrop-blur-xl border border-cyan-400/40 px-6 py-2.5 rounded-2xl shadow-[0_0_25px_rgba(34,211,238,0.2)] flex items-center gap-3"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[10px] font-mono text-cyan-400 font-black tracking-widest uppercase">{message}</span>
        </motion.div>
  
        {/* --- 2. THE HUMANOID ASSEMBLY --- */}
        <div className="relative flex flex-col items-center mt-10">
          
          {/* KEPALA (HEAD) - Mengikuti Mouse secara Smooth */}
          <motion.div 
            style={{ x: headX, y: headY }}
            className="relative w-20 h-24 bg-[#080a12] border-2 border-cyan-400/50 rounded-t-[2.5rem] rounded-b-xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.2)] z-30"
          >
            <div className="flex gap-4 mb-2">
              <motion.div animate={{ scaleY: [1, 1, 0, 1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.8, 0.82, 0.9, 1] }} className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee]" />
              <motion.div animate={{ scaleY: [1, 1, 0, 1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.8, 0.82, 0.9, 1] }} className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee]" />
            </div>
            <div className="w-10 h-0.5 bg-cyan-500/30 rounded-full mt-4" />
            {/* Antena Top */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-cyan-400/50" />
          </motion.div>
  
          {/* LEHER (NECK) */}
          <div className="w-5 h-4 bg-slate-900 border-x-2 border-cyan-500/30 z-20" />
  
          {/* TUBUH (TORSO) - Inti Mesin */}
          <div className="relative w-36 h-44 bg-[#080a12] border-2 border-cyan-400/50 rounded-[3rem] flex flex-col items-center p-6 shadow-2xl z-20 overflow-hidden">
             {/* REAKTOR DADA (POWER CORE) */}
             <div className="relative w-16 h-16 rounded-full border-2 border-cyan-500/20 flex items-center justify-center mt-2">
                <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40 animate-[spin_10s_linear_infinite]" />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-8 h-8 bg-cyan-400/20 rounded-full blur-md" 
                />
                <Zap size={24} className="text-cyan-400 fill-current relative z-10 drop-shadow-[0_0_10px_#22d3ee]" />
             </div>
             {/* Detail Dekorasi Tulang Rusuk Digital */}
             <div className="mt-8 space-y-2 w-full px-2 opacity-20">
                <div className="h-0.5 w-full bg-cyan-400" />
                <div className="h-0.5 w-full bg-cyan-400" />
             </div>
          </div>
  
          {/* TANGAN (ARMS) - Terkunci pada Bahu */}
          <div className="absolute top-28 w-[180px] flex justify-between px-2">
             {/* Tangan Kiri */}
             <motion.div animate={{ rotate: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity }} className="w-8 h-24 bg-[#080a12] border-2 border-cyan-500/30 rounded-full shadow-lg origin-top" />
             {/* Tangan Kanan */}
             <motion.div animate={{ rotate: [2, -2, 2] }} transition={{ duration: 4, repeat: Infinity }} className="w-8 h-24 bg-[#080a12] border-2 border-cyan-500/30 rounded-full shadow-lg origin-top" />
          </div>
  
          {/* KAKI (LEGS) - Kokoh dengan Pendorong Api */}
          <div className="flex gap-10 -mt-4 relative z-10">
            {[0, 1].map((i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Paha ke Betis */}
                <div className="w-8 h-24 bg-[#080a12] border-2 border-cyan-500/30 rounded-b-[2rem] shadow-xl" />
                {/* API PLASMA (THRUSTER STABIL) */}
                <motion.div 
                  animate={{ 
                    height: [15, 45, 15],
                    opacity: [0.4, 0.9, 0.4],
                    scaleX: [1, 1.3, 1]
                  }}
                  transition={{ duration: 0.15, repeat: Infinity }}
                  className="w-5 bg-gradient-to-b from-cyan-400 via-blue-600/50 to-transparent blur-md rounded-full mt-1"
                />
              </div>
            ))}
          </div>
        </div>
  
        {/* --- HUD RINGS DECORATION --- */}
        <div className="absolute w-[450px] h-[450px] border border-cyan-500/5 rounded-full animate-[spin_40s_linear_infinite] pointer-events-none" />
        <div className="absolute w-[550px] h-[550px] border border-dashed border-white/5 rounded-full animate-[spin_60s_linear_infinite_reverse] pointer-events-none" />
      </div>
    );
  };


  return (
    <div className="flex flex-col min-h-screen w-full bg-black text-slate-200 overflow-x-hidden selection:bg-cyan-500/30 relative lg:[zoom:0.9] transform-gpu origin-top">
      <PersistentUniverse bgIdx={bgIdx} />
      <ParticleBurstClickEffect />
      <AnimatePresence>
        {isCalculating && (
          <CyberCalculationFinale 
            score={score} 
            onFinish={() => {
              setIsCalculating(false);
              setView('reports'); 
            }} 
          />
        )}
      </AnimatePresence>

      {/* --- SIDEBAR --- */}
      <motion.aside initial={false} animate={{ width: isSidebarCollapsed ? 80 : 250 }} className="h-screen bg-black/95 backdrop-blur-3xl border-r border-white/10 flex flex-col z-[100] transition-all duration-500 shadow-2xl">
        <div className="h-20 px-6 flex items-center justify-between border-b border-white/10">
          {!isSidebarCollapsed && <div className="flex flex-col"><span className="font-black text-white uppercase text-[11px] tracking-widest leading-none">CYBER READINESS</span><span className="font-bold text-fuchsia-500 text-[9px] tracking-widest mt-0.5 uppercase">INDEX</span></div>}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 text-slate-400 hover:text-fuchsia-400 border border-white/5 rounded-lg transition-all">{isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}</button>
        </div>
        <nav className="flex-1 px-4 py-10 space-y-2 relative">
          {[
            { id: 'dashboard', label: 'DASHBOARD', icon: LayoutGrid },
            { id: 'assessment', label: 'ASSESSMENT', icon: Target },
            { id: 'reports', label: 'REPORT', icon: FileText },
            { id: 'feedback', label: 'FEEDBACK', icon: Lightbulb }
          ].map((item) => {
            const isActive = view === item.id;
            
            return (
              <button 
                key={item.id} 
                onClick={() => setView(item.id)}
                className={`w-full flex items-center p-4 rounded-2xl transition-colors duration-500 relative group outline-none`}
              >
                {/* 1. KAPSUL CAHAYA BERJALAN (INI KUNCI SMOOTH NYA) */}
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active-pill"
                    className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/20 to-transparent border-l-4 border-fuchsia-500 rounded-2xl z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* 2. KONTEN MENU (DI ATAS KAPSUL) */}
                <div className="relative z-10 flex items-center gap-4 w-full">
                  <item.icon 
                    size={20} 
                    className={`transition-all duration-500 ${isActive ? 'text-fuchsia-400 scale-110 drop-shadow-[0_0_8px_#d946ef]' : 'text-slate-500 group-hover:text-slate-300'}`} 
                  />
                  
                  {!isSidebarCollapsed && (
                    <span className={`font-black text-[10px] tracking-[0.3em] uppercase transition-all duration-500 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`}>
                      {item.label}
                    </span>
                  )}

                  {/* Indikator titik kecil di ujung kanan jika aktif */}
                  {isActive && !isSidebarCollapsed && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-fuchsia-500 shadow-[0_0_10px_#d946ef]"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        {/* --- AREA LOGOUT (REVISI: TANPA SHUTDOWN) --- */}
        <div className="p-6 border-t border-white/5">
          <button 
            onClick={() => {
              localStorage.removeItem('user'); // Menghapus data login
              router.push('/'); // Kembali ke landing page
            }} 
            className="w-full flex items-center p-4 text-red-500 hover:bg-red-500/10 rounded-2xl gap-4 font-black text-[10px] tracking-[0.3em] transition-all uppercase group"
          >
            <Power size={18} className="group-hover:scale-110 group-hover:rotate-12 transition-transform" /> 
            {!isSidebarCollapsed && "LOGOUT SESSION"}
          </button>
        </div>

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
                {/* --- WELCOME BANNER LUXURY (REVISI DEWA: NO V2.1 & NO UNDERSCORES) --- */}
                <motion.div variants={itemVariants} className="relative p-10 lg:p-20 rounded-[3.5rem] lg:rounded-[5rem] bg-gradient-to-br from-white/[0.04] via-transparent to-transparent border border-white/5 overflow-hidden shadow-2xl group mb-12">
                   {/* Dekorasi Globe di Latar Belakang */}
                   <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
                      <Globe size={300} className="text-white" />
                   </div>
                   
                   <div className="relative z-10 space-y-8 text-left">
                      <div className="inline-flex items-center gap-4 px-5 py-2 rounded-full bg-cyan-500/5 border border-cyan-500/15 text-cyan-400 text-[9px] font-black tracking-[0.5em] uppercase backdrop-blur-md">
                         <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#22d3ee]"/> 
                         Authentication Confirmed
                      </div>
                      
                      <h1 className="text-4xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.95]">
                         WELCOME, <br/>
                         <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 animate-gradient-x">
                           {user.username}
                         </span>
                      </h1>
                      
                      <p className="text-slate-400 text-[10px] lg:text-[13px] font-bold tracking-[0.4em] uppercase opacity-80 leading-relaxed max-w-xl">
                         Integrated Cyber Readiness Control Interface
                      </p>
                      
                      <div className="h-px w-full max-w-md bg-gradient-to-r from-white/10 to-transparent" />
                   </div>
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

{/* VIEW ASSESSMENT (ULTRA-LUXURY HUD INTERFACE) */}
{view === 'assessment' && (
              <motion.div 
                key="assess-hub" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="max-w-[1600px] mx-auto space-y-20 py-12"
              >
                
                {/* Header Page */}
                <div className="text-center space-y-6 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
                  <motion.div 
                    initial={{ y: -20, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-[10px] font-black tracking-[0.5em] uppercase backdrop-blur-xl"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#22d3ee]" />
                    Tactical Deployment Hub
                  </motion.div>
                  <h2 className="text-5xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-2xl">
                    TARGET <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 animate-gradient-x">DOMAINS.</span>
                  </h2>
                </div>

                {/* Grid 3 Kartu Dewa */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 pb-32">
                  {TACTICAL_DOMAINS.map((domain, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30, delay: i * 0.1 }}
                      whileHover={{ y: -20, scale: 1.02 }}
                      onClick={() => { setSelectedDomain(domain.id); setView('briefing'); }}
                      className="group relative bg-[#050811]/40 backdrop-blur-3xl border border-white/5 p-12 rounded-[4rem] cursor-pointer overflow-hidden transition-all duration-700 shadow-2xl hover:border-cyan-500/40"
                    >
                      {/* --- HOLOGRAPHIC LAYERS --- */}
                      <div className="absolute inset-0 bg-grid-static opacity-[0.02] group-hover:opacity-[0.06] transition-opacity duration-500" />
                      
                      {/* Laser Beam Scanner */}
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 animate-scanner z-20" />

                      {/* Content HUD */}
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-16">
                           <div className="space-y-2 text-left">
                              <p className="text-[10px] font-mono text-slate-500 tracking-[0.4em] uppercase">{domain.label}</p>
                              <div className="flex items-center gap-2">
                                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                                 <span className="text-[8px] font-black text-emerald-400 tracking-[0.5em] uppercase">SYSTEM ONLINE</span>
                              </div>
                           </div>
                           <div className="w-16 h-16 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-700 group-hover:bg-black group-hover:rotate-12 group-hover:scale-110 shadow-inner">
                              <domain.icon size={32} style={{ color: domain.color }} className="drop-shadow-[0_0_12px_currentColor]" />
                           </div>
                        </div>

                        <div className="space-y-6 text-left flex-1">
                           {/* PENYELESAIAN OVERFLOW: text-2xl lg:text-3xl & leading-tight */}
                           <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight tracking-tighter uppercase group-hover:text-cyan-400 transition-colors duration-500">
                             {domain.title.split(' ')[0]} <br/> 
                             <span className="opacity-40">{domain.title.split(' ').slice(1).join(' ')}</span>
                           </h3>
                           <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.3em] leading-relaxed max-w-[90%]">
                             {domain.desc}
                           </p>
                        </div>

                        {/* Footer Card - Rapi & Tanpa Underscore */}
                        <div className="mt-20 pt-10 border-t border-white/5 flex items-end justify-between">
                           <div className="flex flex-col text-left space-y-1">
                              <span className="text-[8px] font-mono text-slate-700 tracking-[0.5em] uppercase">Access Level</span>
                              <span className="text-[10px] font-black text-white tracking-[0.3em] uppercase">ENCRYPTED</span>
                           </div>
                           <div className="flex items-center gap-5 text-cyan-400 group-hover:text-white transition-all duration-300">
                              <span className="text-[11px] font-black tracking-[0.5em] uppercase">Initialize</span>
                              <div className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.03] group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300 shadow-xl">
                                 <ArrowRight size={18} />
                              </div>
                           </div>
                        </div>
                      </div>

                      {/* Hover Aura Background */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 pointer-events-none" style={{ background: `radial-gradient(circle at 70% 30%, ${domain.color}, transparent 70%)` }} />
                    </motion.div>
                  ))}
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

{view === 'briefing' && (
  <motion.div 
    key="briefing" 
    initial={{ opacity: 0, scale: 0.95 }} 
    animate={{ opacity: 1, scale: 1 }} 
    className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[85vh] py-10"
  >
     {/* PANGGIL ROBOT SENTINEL DEWA */}
     <div className="w-full mb-6">
        <CyberSentinel username={user.username} />
     </div>

     {/* TEXT CONTENT */}
     <div className="flex flex-col items-center text-center space-y-8 relative z-10">
        <div className="px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-[10px] font-black tracking-[0.5em] uppercase animate-pulse shadow-[0_0_20px_rgba(16,185,129,0.2)]">Uplink Confirmed</div>
        <h2 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">TRANSMISSION RECEIVED</h2>
        <p className="text-[13px] font-bold text-white leading-relaxed tracking-[0.2em] uppercase max-w-2xl opacity-90 mx-auto">
           Sistem siap melakukan validasi pada domain <span className="text-fuchsia-400 font-black">{selectedDomain}</span>. Lanjutkan prosedur, Operative?
        </p>
     </div>

     {/* BUTTONS */}
     <div className="flex flex-col sm:flex-row gap-8 mt-16 w-full lg:w-auto px-10">
        <button onClick={() => setView('assessment')} className="w-full lg:w-auto px-14 py-5 border-2 border-white/10 text-slate-500 rounded-full font-black text-[10px] tracking-[0.4em] uppercase hover:text-white transition-all">ABORT MISSION</button>
        <button onClick={handleStartMissionClick} className="w-full lg:w-auto px-16 py-5 bg-white text-black rounded-full font-black text-[10px] tracking-[0.4em] shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:bg-cyan-400 hover:text-white transition-all uppercase flex items-center justify-center gap-4 group">
           EXECUTE PROTOCOL <Zap size={16} className="group-hover:rotate-12 transition-transform" />
        </button>
     </div>
  </motion.div>
)}

          </AnimatePresence>
        </main>
      </div>

{/* --- MODAL NEXUS INTELLIGENCE (ULTRA LUXURY HUD) --- */}
<AnimatePresence>
        {appFeedbackModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-[40px]"
          >
             {/* Efek Cahaya Latar Ambient */}
             <div className="absolute w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
             
             <motion.div 
                initial={{ scale: 0.9, y: 30, opacity: 0 }} 
                animate={{ scale: 1, y: 0, opacity: 1 }} 
                exit={{ scale: 0.9, y: 20, opacity: 0 }} 
                className="w-full max-w-2xl bg-[#050811]/60 border border-white/10 rounded-[3.5rem] p-10 lg:p-12 shadow-[0_0_100px_rgba(0,0,0,1)] relative overflow-hidden"
             >
                {/* Scanner Top Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

                {/* Header Modal */}
                <div className="flex justify-between items-start mb-12 relative z-10">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-transform group-hover:scale-110">
                         <Zap size={28} className="fill-current" />
                      </div>
                      <div className="text-left">
                         <h2 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-[0.2em] leading-none">NEXUS INTELLIGENCE</h2>
                         <div className="flex items-center gap-2 mt-3 text-slate-500 font-mono text-[10px] tracking-widest">
                            <span className="opacity-50 uppercase">Transmitting To:</span>
                            <span className="text-cyan-500/80 lowercase font-bold">devinedwinsiahaan171105@gmail.com</span>
                         </div>
                      </div>
                   </div>
                   <button 
                     onClick={() => setAppFeedbackModal(false)} 
                     className="p-3 bg-white/5 rounded-2xl text-slate-500 hover:text-white transition-all border border-white/5"
                   >
                      <X size={20}/>
                   </button>
                </div>

                {/* Form Content */}
                <div className="space-y-10 relative z-10 text-left">
                   {/* Kategori Command */}
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em] flex items-center gap-3">
                         <Hexagon size={12} className="animate-spin" style={{ animationDuration: '4s' }}/> Select Command Category
                      </label>
                      <div className="relative group">
                         <select 
                            value={appFeedbackForm.category} 
                            onChange={(e) => setAppFeedbackForm({...appFeedbackForm, category: e.target.value})} 
                            className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-[11px] font-black text-white uppercase outline-none focus:border-cyan-500/50 appearance-none cursor-pointer transition-all shadow-inner group-hover:border-white/20"
                         >
                            <option value="AI ENHANCEMENT">AI System Upgrade</option>
                            <option value="UI/UX MODERNIZATION">UI UX Refinement</option>
                            <option value="SECURITY EXPANSION">Security Protocol</option>
                            <option value="SYSTEM PERFORMANCE">Core Performance</option>
                            <option value="BUG REPORT">Critical Bug Report</option>
                         </select>
                      </div>
                   </div>

                   {/* Input Rekomendasi */}
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em] flex items-center gap-3">
                         <Terminal size={12}/> Input Data Recommendation
                      </label>
                      <textarea 
                         value={appFeedbackForm.message} 
                         onChange={(e) => setAppFeedbackForm({...appFeedbackForm, message: e.target.value})} 
                         placeholder="TYPE YOUR INTELLIGENCE REPORT HERE..." 
                         className="w-full h-44 bg-black/40 border border-white/10 rounded-[2.5rem] p-8 text-[13px] font-medium text-white placeholder:text-slate-800 outline-none focus:border-cyan-500/50 transition-all shadow-inner resize-none" 
                      />
                   </div>

                   {/* Execute Button */}
                   <div className="pt-4">
                      <button 
                         onClick={submitAppFeedback} 
                         disabled={isSendingFeedback} 
                         className="w-full py-6 bg-white text-black rounded-3xl font-black text-[11px] tracking-[0.6em] uppercase hover:bg-cyan-400 hover:text-white transition-all duration-500 flex items-center justify-center gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group disabled:opacity-50"
                      >
                         {isSendingFeedback ? "ENCRYPTING DATA..." : "EXECUTE TRANSMISSION"} 
                         <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
                      </button>
                   </div>
                </div>

                {/* Bottom Bar HUD */}
                <div className="mt-12 flex justify-between items-center opacity-30">
                   <div className="flex gap-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                      ))}
                   </div>
                   <span className="text-[7px] font-mono text-slate-500 tracking-[0.8em] uppercase">Secured Uplink Channel Enabled</span>
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