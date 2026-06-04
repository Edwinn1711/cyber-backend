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
    <div className="fixed inset-0 z-0 opacity-40">
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

const SmoothAnimatedText = ({ text }: { text: string }) => {
  const letters = Array.from(text);
  return (
    <div className="flex flex-wrap justify-center lg:justify-start">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)",
            // EFEK HIDUP: Hurufnya naik turun pelan secara bergantian
            translateY: [0, -5, 0] 
          }}
          transition={{
            duration: 2,
            delay: index * 0.08,
            translateY: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.1
            }
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
};

const CyberLetterReveal = ({ text, className }: { text: string, className: string }) => {
  // Fallback jika username belum load agar tidak kosong melompong
  const content = text || "OPERATIVE";
  const letters = Array.from(content);
  
  const container: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    }
  };

  const child: any = {
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { type: "spring" as const, damping: 12, stiffness: 200 } 
    },
    hidden: { opacity: 0, y: 15, filter: "blur(10px)" }
  };

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="visible" 
      className={`flex flex-wrap ${className}`}
    >
      {letters.map((letter, index) => (
        <motion.span 
          variants={child} 
          key={index}
          className="inline-block text-white drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// --- VARIANTS KHUSUS NEXUS (GANTI NAMA AGAR TIDAK BENTROK) ---
const nexusContainer: any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const nexusItem: any = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring" as const // Pastikan ada 'as const'
    }
  }
};


const CyberContinuousDecryption = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABC0123456789$#@&*";

  useEffect(() => {
    const interval = setInterval(() => {
      let iteration = 0;
      const decryptInterval = setInterval(() => {
        setDisplayText(prev =>
          prev.split("").map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );

        if (iteration >= text.length) clearInterval(decryptInterval);
        iteration += 1 / 3;
      }, 30);
    }, 5000); // Melakukan dekripsi ulang setiap 5 detik

    return () => clearInterval(interval);
  }, [text]);

  return <span className="font-mono tracking-tighter">{displayText}</span>;
};

export default function StudentPortal() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [theme, setTheme] = useState('dark');


  // States
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
    <div className="flex h-screen w-full bg-black text-slate-100 overflow-hidden font-sans relative">
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

      <motion.aside 
      initial={false} 
      animate={{ width: isSidebarCollapsed ? 80 : 260 }} 
      className={`h-screen border-r transition-all duration-700 flex flex-col z-[100] relative shadow-2xl ${theme === 'dark' ? 'bg-black/95 border-white/10' : 'bg-white border-slate-200'}`}
    >
      <div className={`h-20 px-6 flex items-center justify-between border-b ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'}`}>
        {!isSidebarCollapsed && (
          <div className="flex flex-col text-left">
            <span className={`font-black text-[11px] tracking-[0.2em] uppercase leading-none ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>CYBER READINESS</span>
            <span className="font-black text-fuchsia-500 text-[9px] tracking-[0.4em] mt-1 uppercase">INDEX</span>
          </div>
        )}
        <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 text-slate-400 hover:text-fuchsia-500 transition-all">
          {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigasi Sidebar */}
      <nav className="flex-1 px-4 py-10 space-y-3">
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
              className="w-full flex items-center p-4 rounded-2xl transition-all relative group outline-none"
            >
              {isActive && (
                <motion.div layoutId="sidebar-active" className={`absolute inset-0 rounded-2xl z-0 ${theme === 'dark' ? 'bg-fuchsia-600/20 border-l-4 border-fuchsia-500' : 'bg-blue-600/10 border-l-4 border-blue-600'}`} />
              )}
              <div className="relative z-10 flex items-center gap-4">
                <item.icon size={20} className={`${isActive ? (theme === 'dark' ? 'text-fuchsia-400' : 'text-blue-600') : 'text-slate-500'}`} />
                {!isSidebarCollapsed && <span className={`font-black text-[10px] tracking-widest uppercase ${isActive ? (theme === 'dark' ? 'text-white' : 'text-slate-900') : 'text-slate-500'}`}>{item.label}</span>}
              </div>
            </button>
          );
        })}
      </nav>

      <div className={`p-6 border-t ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'}`}>
        <button onClick={() => { localStorage.removeItem('user'); router.push('/'); }} className="w-full flex items-center p-4 text-red-500 hover:bg-red-500/10 rounded-2xl gap-4 font-black text-[10px] tracking-widest uppercase">
          <Power size={18} /> {!isSidebarCollapsed && "LOGOUT"}
        </button>
      </div>
    </motion.aside>

    <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
    <header className={`h-20 flex items-center justify-between px-10 border-b transition-all duration-700 ${theme === 'dark' ? 'bg-black/50 border-white/10 backdrop-blur-xl' : 'bg-white/80 border-slate-200 backdrop-blur-xl'}`}>
    <div className="flex items-center gap-6">
        <div className={`flex items-center gap-3 px-5 py-2 border rounded-full ${theme === 'dark' ? 'bg-white/5 border-white/20 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-900'}`}>
            <div className={`w-2 h-2 rounded-full animate-pulse ${theme === 'dark' ? 'bg-emerald-400' : 'bg-emerald-600'}`} />
            <span className="text-[9px] font-black uppercase tracking-widest">GATEWAY ACTIVE</span>
        </div>

        {/* TOMBOL THEME TANPA UNDERSCORE & ITALIC */}
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`px-6 py-2 rounded-xl border font-black text-[9px] tracking-[0.4em] transition-all duration-500 flex items-center gap-3 shadow-xl active:scale-95 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white hover:border-cyan-400' : 'bg-white border-slate-200 text-slate-900 hover:border-blue-600 shadow-slate-200'}`}
        >
           <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-blue-600 shadow-[0_0_10px_#2563eb]'}`} />
           {theme === 'dark' ? 'DARK PROTOCOL' : 'LIGHT PROTOCOL'}
        </button>
    </div>

        <div className="flex items-center gap-6 text-right text-left">
          <div className="hidden sm:block">
            <p className={`text-[11px] font-black tracking-widest uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{user.username}</p>
            <p className="text-[9px] font-black text-fuchsia-500 uppercase tracking-widest mt-1">OPERATIVE MODE</p>
          </div>
          <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center border border-white/20 shadow-lg text-white">
            <User size={18} />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-6 lg:px-14 py-10" ref={scrollRef}>
      <AnimatePresence mode="wait">
            
      {view === 'dashboard' && (
  <motion.div 
    key="dash-exhibition" 
    variants={nexusContainer} 
    initial="hidden" animate="show" exit={{ opacity: 0, y: -20 }}
    className="max-w-[1300px] mx-auto space-y-12 pb-20"
  >
    {/* --- BANNER UTAMA: THE COMMAND CENTER (REFINED & UNDERSTANDABLE) --- */}
    <motion.div 
      variants={nexusItem}
      className="relative p-10 lg:p-14 rounded-[3.5rem] bg-[#020308]/90 backdrop-blur-3xl border border-cyan-500/20 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] group"
    >
       <div className="absolute inset-0 bg-hud-grid opacity-[0.03] pointer-events-none" />
       
       {/* Scanner Beam (Cahaya Pindai Terus Menerus) */}
       <motion.div 
         animate={{ top: ['-100%', '200%'] }}
         transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
         className="absolute left-0 w-full h-[100px] bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none z-10"
       />

       <div className="relative z-20 space-y-10 text-left">
          {/* Header Status - Lebih Mudah Dimengerti */}
          <div className="flex flex-wrap gap-5 items-center">
             <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 text-[10px] font-black tracking-[0.4em] uppercase shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]"/> 
                Akses Masuk Berhasil
             </div>
             <div className="px-5 py-2.5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Sistem Terproteksi</span>
             </div>
          </div>
          
          {/* IDENTITY SECTION (CONTINUOUS ANIMATION) */}
          <div className="space-y-4 relative">
            <div className="h-8 lg:h-10 overflow-hidden">
              <CyberLetterReveal 
                text="SELAMAT DATANG," 
                className="text-2xl lg:text-4xl font-black text-white uppercase tracking-[0.4em] opacity-20" 
              />
            </div>

            <div className="relative inline-block">
              {/* Ukuran Nama Dikecilkan sedikit agar Elegant (text-7xl) */}
              <h2 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter leading-none relative z-10 text-white">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-600 bg-clip-text text-transparent animate-gradient-x drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]">
                  <CyberContinuousDecryption text={user.username} />
                </span>
              </h2>

              {/* Breathing Aura Background */}
              <motion.div 
                animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 z-0 blur-[50px] pointer-events-none rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.2) 0%, rgba(217,70,239,0.1) 100%)' }}
              />
            </div>
          </div>
          
          {/* INFO BAR - Gabungan Laguboti + Data Personal */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-14 pt-6">
             <div className="flex items-center gap-6 border-l-[8px] border-fuchsia-600 pl-8 h-14 transition-all group-hover:border-cyan-400">
                <div className="space-y-1">
                   <p className="text-white text-[13px] lg:text-[15px] font-black tracking-[0.4em] uppercase leading-none">
                      Cyber Readiness Index
                   </p>
                   <p className="text-slate-500 text-[9px] font-black tracking-[0.3em] uppercase">
                      Pusat Kendali - Laguboti, Indonesia
                   </p>
                </div>
             </div>
             
             <div className="flex gap-14 px-10 border-l border-white/10">
                {/* Data Lahir / Identitas Operasional */}
                <div className="flex flex-col gap-1.5">
                   <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em]">Node Operasional</span>
                   <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#22d3ee]" />
                      {/* Menampilkan Lokasi & Tanggal Lahir (Jika ada di user object) */}
                      <span className="text-[14px] font-black text-cyan-400 font-mono tracking-widest uppercase whitespace-nowrap">
                         LAGUBOTI {user.tanggal_lahir ? `· ${user.tanggal_lahir}` : "· TERVERIFIKASI"}
                      </span>
                   </div>
                </div>

                {/* Sektor Kelas */}
                <div className="flex flex-col gap-1.5">
                   <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em]">Sektor Pengguna</span>
                   <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shadow-[0_0_10px_#10b981]" />
                      <span className="text-[14px] font-black text-emerald-400 font-mono tracking-widest uppercase whitespace-nowrap">
                         {user.class_name || "UMUM"}
                      </span>
                   </div>
                </div>
             </div>
          </div>
       </div>

       {/* Siku Taktis (Tactical Corner HUD) */}
       <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-white/10 rounded-tl-[3.5rem] group-hover:border-cyan-500/50 transition-all duration-700" />
       <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-blue-500/20 rounded-tr-[3.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
       <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-white/10 rounded-bl-[3.5rem] group-hover:border-fuchsia-500/50 transition-all duration-700" />
       <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-white/10 rounded-br-[3.5rem] group-hover:border-fuchsia-500/50 transition-all duration-700" />
    </motion.div>

{/* --- VIEW DASHBOARD: THE TRINITY COMMAND CENTER (EXHIBITION MASTERPIECE) --- */}
{view === 'dashboard' && (
  <motion.div 
    key="dash-nexus" 
    variants={nexusContainer} 
    initial="hidden" animate="show" exit={{ opacity: 0, y: -20 }}
    className="max-w-[1350px] mx-auto space-y-12 pb-20"
  >
    {/* --- 1. BANNER UTAMA (VERSI BAHASA MUDAH & KEREN) --- */}
    <motion.div 
      variants={nexusItem}
      className="relative p-10 lg:p-14 rounded-[3.5rem] bg-[#020308]/90 backdrop-blur-3xl border border-cyan-500/20 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,1)] group"
    >
       <div className="absolute inset-0 bg-hud-grid opacity-[0.04] pointer-events-none" />
       <motion.div animate={{ top: ['-100%', '200%'] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute left-0 w-full h-[100px] bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none z-10" />

       <div className="relative z-20 space-y-10 text-left">
          <div className="flex flex-wrap gap-5 items-center">
             <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 text-[10px] font-black tracking-[0.5em] uppercase shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]"/> 
                Akses Sistem Berhasil
             </div>
             <div className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">Node Terverifikasi</span>
             </div>
          </div>
          
          <div className="space-y-6 relative group">
            <div className="h-10 lg:h-12 overflow-hidden">
              <CyberLetterReveal text="SELAMAT DATANG," className="text-2xl lg:text-4xl font-black text-white uppercase tracking-[0.5em] opacity-20" />
            </div>
            <div className="relative inline-block">
              <h2 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter leading-none relative z-10 text-white">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-600 bg-clip-text text-transparent animate-gradient-x drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]">
                  <CyberContinuousDecryption text={user.username} />
                </span>
              </h2>
              <motion.div animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.05, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 z-0 blur-[60px] pointer-events-none rounded-full" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.2) 0%, rgba(217,70,239,0.1) 100%)' }} />
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-14 pt-6">
             <div className="flex items-center gap-6 border-l-[8px] border-fuchsia-600 pl-8 h-14">
                <div className="space-y-1">
                   <p className="text-white text-[14px] lg:text-[16px] font-black tracking-[0.5em] uppercase leading-none">Cyber Readiness Index</p>
                   <p className="text-slate-500 text-[9px] font-black tracking-[0.3em] uppercase">Pusat Kendali - Laguboti, Indonesia</p>
                </div>
             </div>
             <div className="flex gap-16 px-12 border-l border-white/10">
                <div className="flex flex-col gap-2.5">
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">Node Operasional</span>
                   <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_12px_#22d3ee]" />
                      <span className="text-[15px] font-black text-cyan-400 font-mono tracking-widest uppercase whitespace-nowrap">LAGUBOTI {user.tanggal_lahir ? `· ${user.tanggal_lahir}` : "· AKTIF"}</span>
                   </div>
                </div>
                <div className="flex flex-col gap-2.5">
                   <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">Sektor Pengguna</span>
                   <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shadow-[0_0_12px_#10b981]" />
                      <span className="text-[15px] font-black text-emerald-400 font-mono tracking-widest uppercase whitespace-nowrap">{user.class_name || "UMUM"}</span>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </motion.div>

    {/* --- 2. DATA CLUSTERS (WIDGETS MEWAH & JUJUR) --- */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       
       {/* Widget 1: Identity (Jujur - Tanpa Sidik Jari) */}
       <motion.div variants={nexusItem} className="group relative p-10 rounded-[3rem] bg-[#0a0c14]/90 backdrop-blur-3xl border border-white/5 flex flex-col items-center text-center shadow-2xl transition-all duration-500 hover:border-cyan-500/40 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-500 shadow-[0_0_20px_#22d3ee] opacity-0 group-hover:opacity-100 group-hover:animate-scanner" />
          <div className="w-24 h-24 bg-slate-900 border border-white/10 rounded-[2.5rem] flex items-center justify-center text-white mb-10 shadow-3xl group-hover:scale-110 transition-transform duration-500">
             <ShieldCheck size={48} className="text-cyan-400 drop-shadow-[0_0_15px_#22d3ee]" />
          </div>
          <div className="space-y-4">
             <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.5em]">Identity Status</span>
             <h4 className="text-3xl font-black text-white tracking-widest uppercase leading-none drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{user.username}</h4>
             <div className="mt-8 flex items-center gap-3 px-6 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                <span className="text-[9px] font-black text-emerald-400 tracking-[0.4em] uppercase">Account Verified</span>
             </div>
          </div>
       </motion.div>

       {/* Widget 2: Readiness Index Status (The Centerpiece) */}
       <motion.div variants={nexusItem} className="group relative p-10 rounded-[3rem] bg-[#0a0c14]/90 backdrop-blur-3xl border border-white/10 flex flex-col items-center justify-center text-center shadow-2xl transition-all duration-500 hover:border-fuchsia-500/40 overflow-hidden">
          <div className="absolute inset-0 bg-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-[80px]" />
          <div className="relative mb-8 transform group-hover:scale-110 transition-all duration-700">
             <svg className="w-48 h-48 transform -rotate-90">
                <circle cx="96" cy="96" r="84" stroke="rgba(255,255,255,0.03)" strokeWidth="12" fill="none" />
                <motion.circle initial={{ strokeDasharray: "0 1000" }} animate={{ strokeDasharray: `${(score/100)*527} 1000` }} transition={{ duration: 3.5, ease: "circOut" }} cx="96" cy="96" r="84" stroke="#d946ef" strokeWidth="12" strokeLinecap="round" fill="none" style={{ filter: 'drop-shadow(0 0 20px #d946ef)' }} />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span key={score} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="text-6xl font-black text-white tracking-tighter drop-shadow-[0_0_20px_white]">{score}</motion.span>
                <span className="text-[10px] font-black text-slate-500 uppercase mt-1 tracking-widest">Percent</span>
             </div>
          </div>
          <div className="space-y-2">
             <h3 className="text-[11px] font-black text-fuchsia-400 tracking-[0.4em] uppercase">Readiness Index Status</h3>
             <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Global Security Metric</p>
          </div>
       </motion.div>

       {/* Widget 3: Live Analytical Matrix */}
       <motion.div variants={nexusItem} className="group relative p-12 rounded-[3.5rem] bg-[#0a0c14]/90 backdrop-blur-3xl border border-white/5 flex flex-col justify-between shadow-2xl transition-all duration-500 hover:border-blue-500/30 overflow-hidden text-left">
          <div className="space-y-10 relative z-10">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <Activity size={18} className="text-blue-500 animate-pulse" />
                   <h2 className="text-[11px] font-black text-slate-400 tracking-[0.5em] uppercase leading-none">Analytical Matrix</h2>
                </div>
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6] animate-pulse" />
             </div>
             <div className="space-y-8">
                {[
                  { label: "Architecture", val: "Stable", col: "text-white" },
                  { label: "Cyber Vault", val: "Active", col: "text-emerald-400" },
                  { label: "Latency Node", val: "Synced", col: "text-blue-400" }
                ].map((m, i) => (
                  <div key={i} className="flex justify-between items-center group/row">
                     <span className="text-slate-500 font-black text-[10px] tracking-[0.2em] uppercase">{m.label}</span>
                     <div className="flex items-center gap-4">
                        <span className={`text-[11px] font-black uppercase tracking-widest ${m.col} drop-shadow-[0_0_8px_currentColor]`}>{m.val}</span>
                        <div className="flex gap-1 h-3 items-end opacity-30">
                           {[1, 2, 3].map(b => (
                             <motion.div key={b} animate={{ height: ["20%", "100%", "20%"] }} transition={{ duration: 0.5 + Math.random(), repeat: Infinity }} className={`w-0.5 rounded-full ${m.col.replace('text', 'bg')}`} />
                           ))}
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
          <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center opacity-20 group-hover:opacity-100 transition-all duration-700">
             <span className="text-[7px] font-mono text-slate-500 tracking-[0.3em] uppercase">Auth Level Secure</span>
             <Network size={12} className="text-blue-500" />
          </div>
       </motion.div>
    </div>

    {/* --- 3. THE MISSION GATEWAY (COMPACT ELITE FINISHER) --- */}
    <motion.div 
      variants={nexusItem} 
      className="p-8 lg:p-10 rounded-[3rem] bg-[#050505]/80 backdrop-blur-3xl border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group"
    >
       <div className="absolute inset-0 bg-hud-grid opacity-[0.05] pointer-events-none" />
       <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-500/20 animate-scanner pointer-events-none" />
       <div className="flex flex-col lg:flex-row items-center gap-8 z-10 text-center lg:text-left">
          <div className="w-16 h-16 bg-black/80 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl group-hover:rotate-6 transition-all duration-500"><BellRing size={28} className="text-cyan-400 animate-pulse" /></div>
          <div className="space-y-2">
             <div className="flex items-center justify-center lg:justify-start gap-4"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-ping" /><span className="text-[9px] font-black tracking-[0.4em] text-emerald-400 uppercase">Operational Status Online</span></div>
             <h3 className="text-xl lg:text-2xl font-black text-white uppercase tracking-tight">Mission Deployment Hub</h3>
             <p className="text-[10px] font-bold text-slate-500 tracking-[0.3em] uppercase opacity-70 leading-relaxed max-w-xl">Validasi integritas pertahanan digital melalui protokol keamanan resmi.</p>
          </div>
       </div>
       <button onClick={handleStartMissionClick} className="relative overflow-hidden px-12 py-5 bg-white text-slate-950 rounded-2xl font-black text-[11px] tracking-[0.6em] hover:bg-cyan-500 hover:text-white transition-all duration-500 uppercase flex items-center justify-center gap-5 shadow-xl active:scale-95 group/btn">
          <span className="relative z-10">INITIALIZE</span>
          <Zap size={18} className="relative z-10 group-hover/btn:rotate-12 transition-transform" />
          <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:left-[100%] transition-all duration-1000" />
       </button>
    </motion.div>
  </motion.div>
)}

    {/* --- 3. THE MISSION GATEWAY (REFINED ELITE VERSION) --- */}
    <motion.div 
      variants={nexusItem} 
      className="p-8 lg:p-10 rounded-[3rem] bg-[#050505]/80 backdrop-blur-3xl border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group"
    >
       <div className="absolute inset-0 bg-hud-grid opacity-[0.05] pointer-events-none" />
       <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-500/20 animate-scanner pointer-events-none" />
       
       <div className="flex flex-col lg:flex-row items-center gap-8 z-10 text-center lg:text-left">
          <div className="relative">
             <div className="absolute inset-0 bg-cyan-500/10 blur-xl rounded-full" />
             <div className="w-16 h-16 bg-black/80 rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl group-hover:rotate-6 transition-all duration-500">
                <BellRing size={28} className="text-cyan-400 animate-pulse" />
             </div>
          </div>
          <div className="space-y-2">
             <div className="flex items-center justify-center lg:justify-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-ping" />
                <span className="text-[9px] font-black tracking-[0.4em] text-emerald-400 uppercase">Operational Status Online</span>
             </div>
             <h3 className="text-xl lg:text-2xl font-black text-white uppercase tracking-tight">Mission Deployment Hub</h3>
             <p className="text-[10px] font-bold text-slate-500 tracking-[0.3em] uppercase opacity-70 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Validasi integritas pertahanan digital dan profil operasional Anda melalui protokol keamanan resmi.
             </p>
          </div>
       </div>

       <button 
         onClick={handleStartMissionClick} 
         className="relative overflow-hidden px-12 py-5 bg-white text-slate-950 rounded-2xl font-black text-[11px] tracking-[0.6em] hover:bg-cyan-500 hover:text-white transition-all duration-500 uppercase flex items-center justify-center gap-5 shadow-xl active:scale-95 group/btn"
       >
          <span className="relative z-10">INITIALIZE</span>
          <Zap size={18} className="relative z-10 group-hover/btn:rotate-12 transition-transform" />
          <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover/btn:left-[100%] transition-all duration-1000" />
       </button>
    </motion.div>
  </motion.div>
)}


{/* --- VIEW ASSESSMENT: TACTICAL MISSION SELECTION (DOWNSIZED & ULTRA WAH) --- */}
{view === 'assessment' && (
  <motion.div 
    key="assess-hub" 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0 }} 
    className="max-w-[1200px] mx-auto space-y-12 py-8"
  >
    
    {/* 1. COMPACT HEADER SECTION */}
    <div className="text-center space-y-4 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[100px] pointer-events-none" />
      <motion.div 
        initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="inline-flex items-center gap-3 px-5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-cyan-400 text-[8px] font-black tracking-[0.5em] uppercase backdrop-blur-xl"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
        Tactical Deployment Hub
      </motion.div>
      <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-none">
        TARGET <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 animate-gradient-x">DOMAINS</span>
      </h2>
    </div>

    {/* 2. GRID MISSIONS (SMALLER, DENSER, MORE WAH) */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pb-20 px-4">
      {TACTICAL_DOMAINS.map((domain, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -10, scale: 1.02 }}
          onClick={() => { setSelectedDomain(domain.id); setView('briefing'); }}
          className="group relative bg-[#050811]/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[2.5rem] cursor-pointer overflow-hidden transition-all duration-500 shadow-2xl hover:border-cyan-500/40"
        >
          {/* --- HOLOGRAPHIC TECH LAYERS --- */}
          <div className="absolute inset-0 bg-hud-grid opacity-[0.03] group-hover:opacity-[0.08] transition-opacity" />
          
          {/* Laser Scanner Line (Horizontal) */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400 shadow-[0_0_20px_#22d3ee] animate-scanner opacity-0 group-hover:opacity-100" />

          {/* Crosshair Corners (Siku-siku Taktis) */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20 group-hover:border-cyan-500/50 transition-colors" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20 group-hover:border-cyan-500/50 transition-colors" />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-10">
               <div className="space-y-1">
                  <p className="text-[8px] font-black text-slate-500 tracking-[0.3em] uppercase">{domain.label}</p>
                  <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                     <span className="text-[7px] font-black text-emerald-400 tracking-[0.3em] uppercase">LINK ACTIVE</span>
                  </div>
               </div>
               <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-cyan-500 group-hover:text-black shadow-inner">
                  <domain.icon size={22} className="group-hover:drop-shadow-[0_0_8px_white]" />
               </div>
            </div>

            <div className="space-y-4 flex-1">
               <h3 className="text-xl lg:text-2xl font-black text-white leading-tight tracking-tighter uppercase group-hover:text-cyan-400 transition-colors">
                 {domain.title}
               </h3>
               <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] leading-relaxed opacity-80">
                 {domain.desc}
               </p>
            </div>

            {/* Micro-Data Readout (Detail Wah) */}
            <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center opacity-20 group-hover:opacity-100 transition-all duration-700">
               <div className="flex flex-col gap-1">
                  <span className="text-[6px] font-black text-slate-600 uppercase tracking-widest">Protocol Index</span>
                  <span className="text-[9px] font-black text-white font-mono uppercase">SEC ALPHA 01</span>
               </div>
               <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black text-cyan-400 tracking-widest uppercase">Select</span>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-cyan-500 group-hover:text-black transition-all shadow-lg">
                     <ArrowRight size={14} />
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
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
                   <span className="text-[7px] font-mono text-slate-500 tracking-[0.3em] uppercase">Security Protocol Authorized</span>
                   <Network size={12} className="text-blue-500" />
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
        .no-scrollbar::-webkit-scrollbar { display: none; }
        * { 
        border-bottom-style: none !important; 
        text-decoration: none !important; 
        font-style: normal !important; 
        }

        @keyframes scanner { 
        0% { top: -10%; opacity: 0; } 
        50% { opacity: 1; }
        100% { top: 110%; opacity: 0; } 
        }

       .animate-scanner { 
        animation: scanner 3s ease-in-out infinite; 
        }
        .bg-hud-grid { 
        background-image: linear-gradient(to right, rgba(34, 211, 238, 0.1) 1px, transparent 1px), 
        linear-gradient(to bottom, rgba(34, 211, 238, 0.1) 1px, transparent 1px); 
        background-size: 50px 50px; 
        * { 
        border-bottom-style: none !important; 
        text-decoration: none !important; 
        font-style: normal !important; 
        }
        input[type="date"] {
        color-scheme: ${theme === 'dark' ? 'dark' : 'light'};
        }
        
        .bg-clip-text {
          -webkit-background-clip: text;
          background-clip: text;
        }

        /* Pastikan animasi gradient-x terdaftar */
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
      `}} />
    </div>
  );
}