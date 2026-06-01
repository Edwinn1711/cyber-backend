"use client"
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  ShieldCheck, Brain, Target, ChevronRight, ChevronLeft, Zap, ArrowLeft, ArrowRight,
  Fingerprint, Power, BarChart3, Activity, ShieldAlert, Cpu, Globe, Lock, 
  Radar as RadarIcon, Terminal, Database, Server, Search, Radio, Bug, MailWarning, 
  Sparkles, AlertTriangle, Eye, CheckCircle2, XCircle, X, User, Info, 
  ShieldQuestion, LayoutGrid, Check, BellRing, Bot, ScanLine, Laptop, Workflow, 
  FileText, TrendingUp, Lightbulb, Hexagon, Send, Clock, Wifi, Share2
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis
} from 'recharts'

const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

const TACTICAL_DOMAINS = [
  { id: "Social Engineering", title: "SOCIAL ENGINEERING", icon: Brain, color: "#22d3ee", desc: "Psychological Defense Operations" },
  { id: "Malware", title: "MALWARE ANALYSIS", icon: Bug, color: "#f472b6", desc: "Malicious Code Detection" },
  { id: "Phishing", title: "PHISHING DEFENSE", icon: MailWarning, color: "#818cf8", desc: "Credential Security Audit" },
  { id: "Network", title: "NETWORK SECURITY", icon: Globe, color: "#34d399", desc: "Traffic Encryption Control" },
  { id: "Privilege", title: "ACCESS CONTROL", icon: Lock, color: "#a78bfa", desc: "Privilege Escalation Defense" },
  { id: "Threat", title: "THREAT HUNTING", icon: RadarIcon, color: "#fb923c", desc: "Proactive Breach Search" },
];

const PersistentUniverse = React.memo(({ bgIdx }: { bgIdx: number }) => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-black">
    <AnimatePresence mode="wait">
      <motion.img key={bgIdx} src={CYBER_ASSETS[bgIdx]} initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} exit={{ opacity: 0 }} transition={{ duration: 3 }} className="absolute inset-0 w-full h-full object-cover mix-blend-screen pointer-events-none" />
    </AnimatePresence>
    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)]" />
  </div>
));
PersistentUniverse.displayName = 'PersistentUniverse';

export default function StudentPortal() {
  const router = useRouter();
  const [view, setView] = useState('dashboard'); 
  const [currentStep, setCurrentStep] = useState(1); 
  const [selectedDomain, setSelectedDomain] = useState("SOCIAL ENGINEERING");
  const [allQs, setAllQs] = useState<any[]>([]);
  const [ans, setAns] = useState<Record<number, {score: number, text: string}>>({});
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<any[]>([]);
  const [user, setUser] = useState({ username: 'OPERATIVE', class_name: 'UNASSIGNED' });
  const [loading, setLoading] = useState(false);
  const [bgIdx, setBgIdx] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showClassSelector, setShowClassSelector] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
      const parsed = JSON.parse(saved); 
      setUser(parsed); 
      fetchScores(parsed.username);
    } else { router.push('/'); }
    const interval = setInterval(() => setBgIdx(p => (p + 1) % CYBER_ASSETS.length), 10000);
    return () => clearInterval(interval);
  }, [router, fetchScores]);

  const handleStartMission = () => {
    if (!user.class_name || user.class_name === "UNASSIGNED") setShowClassSelector(true);
    else { setView('assessment'); }
  };

  const radarData = useMemo(() => ["Social", "Malware", "Phishing", "Network", "Threat", "Access"].map(d => {
    const entry = history.find(h => String(h.domain_id).toLowerCase().includes(d.toLowerCase()));
    return { subject: d.toUpperCase(), A: entry ? entry.score : 0 };
  }), [history]);

  return (
    <div className="flex h-screen w-full bg-[#020105] text-slate-200 overflow-hidden font-sans">
      <PersistentUniverse bgIdx={bgIdx} />

      {/* --- SIDEBAR DEWA --- */}
      <motion.aside 
        animate={{ width: isSidebarCollapsed ? 80 : 280 }}
        className="relative z-50 h-screen bg-black/40 backdrop-blur-3xl border-r border-white/5 flex flex-col transition-all"
      >
        <div className="h-24 px-6 flex items-center justify-between border-b border-white/5">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center border border-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <ShieldCheck size={18} className="text-cyan-400" />
              </div>
              <span className="font-black text-white text-xs tracking-[0.3em] uppercase">COMMAND_HUB</span>
            </div>
          )}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 hover:bg-white/5 rounded-xl transition-all">
            <LayoutGrid size={20} className="text-slate-500 hover:text-cyan-400" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-10 space-y-4">
          {[
            { id: 'dashboard', label: 'DASHBOARD', icon: Laptop },
            { id: 'assessment', label: 'MISSIONS', icon: Target },
            { id: 'reports', label: 'INTELLIGENCE', icon: Activity }
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => setView(item.id)}
              className={`w-full flex items-center p-4 rounded-2xl transition-all gap-4 group ${view === item.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
            >
              <item.icon size={20} className={view === item.id ? 'text-cyan-400' : 'group-hover:text-cyan-400'} />
              {!isSidebarCollapsed && <span className="font-black text-[10px] tracking-[0.3em] uppercase">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button onClick={() => router.push('/')} className="w-full flex items-center p-4 text-red-500 hover:bg-red-500/10 rounded-2xl gap-4 font-black text-[10px] tracking-[0.3em] transition-all">
            <Power size={20} /> {!isSidebarCollapsed && "ABORT_SESSION"}
          </button>
        </div>
      </motion.aside>

      {/* --- MAIN INTERFACE --- */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* HEADER HUD */}
        <header className="h-24 flex items-center justify-between px-10 border-b border-white/5 bg-black/20 backdrop-blur-md relative z-40">
           <div className="flex items-center gap-10">
              <div className="flex items-center gap-3">
                 <Wifi size={14} className="text-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-mono text-emerald-500 tracking-widest uppercase">Link_Stable: 24ms</span>
              </div>
              <div className="hidden md:flex items-center gap-3">
                 <Clock size={14} className="text-cyan-400" />
                 <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">{currentTime}</span>
              </div>
           </div>

           <div className="flex items-center gap-6">
              <div className="text-right hidden sm:block">
                 <p className="text-xs font-black text-white tracking-widest uppercase">{user.username}</p>
                 <p className="text-[9px] font-bold text-cyan-500/70 tracking-[0.2em] uppercase mt-1">LEVEL: OPERATIVE_ALPHA</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                 <Fingerprint size={24} className="text-white" />
              </div>
           </div>
        </header>

        {/* CONTENT AREA */}
        <main className="flex-1 overflow-y-auto no-scrollbar p-10 lg:p-14 relative">
          <AnimatePresence mode="wait">
            
            {view === 'dashboard' && (
              <motion.div key="dash" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} className="max-w-[1500px] mx-auto space-y-10">
                
                {/* GREETING BANNER */}
                <div className="relative p-12 lg:p-16 rounded-[3.5rem] bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/5 border border-white/5 overflow-hidden group shadow-2xl">
                   <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity"><Radio size={200} className="text-white" /></div>
                   <div className="relative z-10 space-y-6">
                      <div className="flex items-center gap-4">
                         <div className="px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[9px] font-black tracking-[0.4em] uppercase">Access_Authorized</div>
                         <div className="h-px w-20 bg-white/10" />
                      </div>
                      <h1 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                         WELCOME, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{user.username}</span>
                      </h1>
                      <p className="text-slate-400 text-sm lg:text-base max-w-2xl font-medium tracking-wide">Pusat komando siber terintegrasi. Pantau metrik pertahanan Anda dan inisiasi protokol validasi keamanan di bawah ini.</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* CARD: OPERATIVE INFO */}
                  <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[3rem] backdrop-blur-xl flex flex-col items-center justify-center text-center group hover:border-cyan-500/30 transition-all shadow-xl">
                    <div className="w-20 h-20 bg-cyan-500/10 rounded-3xl flex items-center justify-center border border-cyan-500/20 mb-6 group-hover:scale-110 transition-transform">
                      <User size={36} className="text-cyan-400" />
                    </div>
                    <h4 className="text-2xl font-black text-white uppercase tracking-widest">{user.username}</h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em] mt-2">{user.class_name}</p>
                    <div className="mt-8 flex gap-2">
                       {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-500/40 animate-pulse" />)}
                    </div>
                  </div>

                  {/* CARD: READINESS SCORE (NEON CIRCLE) */}
                  <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[3rem] backdrop-blur-xl flex flex-col items-center justify-center group hover:border-fuchsia-500/30 transition-all shadow-xl">
                    <div className="relative mb-6">
                      <svg className="w-40 h-40 transform -rotate-90">
                        <circle cx="80" cy="80" r="74" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="transparent" />
                        <motion.circle 
                          initial={{ strokeDasharray: "0 1000" }} 
                          animate={{ strokeDasharray: `${(score / 100) * 465} 1000` }} 
                          transition={{ duration: 2, ease: "easeOut" }} 
                          cx="80" cy="80" r="74" stroke="#d946ef" strokeWidth="8" strokeLinecap="round" fill="transparent" 
                          style={{ filter: 'drop-shadow(0 0 15px rgba(217,70,239,0.6))' }} 
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-black text-white tracking-tighter">{score}</span>
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">READINESS</span>
                      </div>
                    </div>
                    <div className="px-6 py-2 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-[10px] font-black tracking-widest uppercase">LEVEL: COMPLIANT</div>
                  </div>

                  {/* CARD: SYSTEM LOGS */}
                  <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[3rem] backdrop-blur-xl group hover:border-cyan-500/30 transition-all shadow-xl">
                    <div className="flex items-center justify-between mb-8">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">SYSTEM_ANALYTICS</span>
                       <Terminal size={16} className="text-cyan-500" />
                    </div>
                    <div className="space-y-4 font-mono text-[10px] lg:text-[11px] tracking-wider text-slate-300">
                       <div className="flex justify-between border-b border-white/5 pb-3"><span>ACCESS_NODE</span><span className="text-cyan-400 font-bold">LAGUBOTI_01</span></div>
                       <div className="flex justify-between border-b border-white/5 pb-3"><span>PROTOCOL</span><span className="text-blue-400 font-bold">UDP/SECURE</span></div>
                       <div className="flex justify-between border-b border-white/5 pb-3"><span>FIREWALL</span><span className="text-emerald-400 font-bold">ACTIVE</span></div>
                       <div className="flex justify-between"><span>UPTIME</span><span className="text-white opacity-80">99.98%</span></div>
                    </div>
                  </div>

                  {/* MISSION CONTROL BAR */}
                  <div className="lg:col-span-3 mt-4 relative overflow-hidden p-10 lg:p-14 rounded-[3.5rem] bg-[#050505] border border-white/5 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-12 group hover:border-cyan-500/20 transition-all duration-700">
                     <div className="absolute inset-0 bg-hud-grid opacity-[0.05]" />
                     <div className="flex items-center gap-10 z-10">
                        <div className="w-20 h-20 bg-cyan-500/10 border border-cyan-500/20 rounded-[2rem] flex items-center justify-center text-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.1)] animate-pulse">
                           <Zap size={32} fill="currentColor" />
                        </div>
                        <div className="space-y-3">
                           <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                              <span className="text-[10px] font-black text-emerald-400 tracking-[0.5em] uppercase">Mission Status: Ready</span>
                           </div>
                           <h2 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tighter">Assessment Gateway Online</h2>
                           <p className="text-slate-500 text-sm font-medium tracking-wide">Inisiasi protokol validasi untuk mengukur pertahanan digital Anda.</p>
                        </div>
                     </div>
                     <button 
                        onClick={handleStartMission}
                        className="w-full lg:w-auto px-16 py-6 bg-white text-black rounded-3xl font-black text-[11px] tracking-[0.5em] uppercase hover:bg-cyan-400 hover:text-white hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-all z-10 flex items-center justify-center gap-4"
                     >
                        START MISSION <ChevronRight size={18} />
                     </button>
                  </div>
                </div>

              </motion.div>
            )}

            {/* Assessment & Reports View (Dipertahankan Logikanya tapi diupdate styling-nya agar sinkron) */}
            {view === 'assessment' && (
               <motion.div key="assess" initial={{opacity:0}} animate={{opacity:1}} className="max-w-[1300px] mx-auto">
                  <div className="text-center mb-16 space-y-4">
                     <h2 className="text-5xl font-black text-white uppercase tracking-widest">TACTICAL_MODULES</h2>
                     <p className="text-cyan-400 text-[10px] font-black tracking-[0.6em] uppercase">Select Sector for Diagnostic Protocol</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {TACTICAL_DOMAINS.map((domain, i) => (
                        <div key={i} onClick={() => { setSelectedDomain(domain.id); setView('dashboard'); }} className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] hover:border-cyan-400/40 cursor-pointer transition-all hover:-translate-y-2 group shadow-xl">
                           <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                              <domain.icon size={26} style={{ color: domain.color }} />
                           </div>
                           <h4 className="text-xl font-black text-white uppercase mb-2">{domain.title}</h4>
                           <p className="text-slate-500 text-[11px] tracking-widest">{domain.desc}</p>
                        </div>
                     ))}
                  </div>
               </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .bg-hud-grid { background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px); background-size: 60px 60px; }
        ::-webkit-scrollbar { width: 0px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        ::selection { background: #22d3ee; color: white; }
        @keyframes scan { 0% { top: 0%; } 100% { top: 100%; } }
        .animate-scan { animation: scan 4s linear infinite; }
      `}} />
    </div>
  );
}