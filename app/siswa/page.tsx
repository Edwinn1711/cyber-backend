"use client"
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  ShieldCheck, Brain, Target, ChevronRight, ChevronLeft, Zap, ArrowLeft, ArrowRight,
  Fingerprint, Power, Activity, ShieldAlert, Cpu, Globe, Lock, 
  Radar as RadarIcon, Terminal, Database, Server, Search, Radio, Bug, MailWarning, 
  Sparkles, AlertTriangle, Eye, CheckCircle2, XCircle, X, User, Info, 
  ShieldQuestion, LayoutGrid, Check, BellRing, Bot, ScanLine, Laptop, Workflow, 
  FileText, TrendingUp, Lightbulb, Hexagon, Send, Clock, Wifi, Share2
} from 'lucide-react'

// --- ASSETS ---
const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

// --- 1. BACKGROUND ENGINE ---
const PersistentUniverse = React.memo(({ bgIdx }: { bgIdx: number }) => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-black">
    <AnimatePresence mode="wait">
      <motion.img 
        key={bgIdx} 
        src={CYBER_ASSETS[bgIdx]} 
        initial={{ opacity: 0, scale: 1.1 }} 
        animate={{ opacity: 0.15, scale: 1 }} 
        exit={{ opacity: 0 }} 
        transition={{ duration: 3 }} 
        className="absolute inset-0 w-full h-full object-cover mix-blend-screen pointer-events-none" 
      />
    </AnimatePresence>
    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)]" />
  </div>
));
PersistentUniverse.displayName = 'PersistentUniverse';

// --- 2. DECORATIVE ELEMENTS ---
const GlowOrb = ({ className = "" }: { className?: string }) => (
  <div className={`absolute rounded-full blur-[120px] pointer-events-none ${className}`} />
);

export default function StudentDashboard() {
  const router = useRouter();
  const [view, setView] = useState('dashboard');
  const [bgIdx, setBgIdx] = useState(0);
  const [score, setScore] = useState(43); // Contoh score awal
  const [user, setUser] = useState({ username: 'USER', class_name: 'X MIPA 1' });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) setUser(JSON.parse(saved));
    else router.push('/');

    const interval = setInterval(() => setBgIdx(p => (p + 1) % CYBER_ASSETS.length), 8000);
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="flex h-screen w-full bg-[#010103] text-slate-300 overflow-hidden font-sans selection:bg-cyan-500/30">
      <PersistentUniverse bgIdx={bgIdx} />
      
      {/* --- AMBIENT LIGHTING --- */}
      <GlowOrb className="top-[-10%] left-[-10%] w-[40vw] h-[40vh] bg-cyan-500/10" />
      <GlowOrb className="bottom-[-10%] right-[-10%] w-[50vw] h-[50vh] bg-fuchsia-600/10" />

      {/* --- SIDEBAR SLEEK --- */}
      <motion.aside 
        animate={{ width: isSidebarCollapsed ? 80 : 260 }}
        className="relative z-50 h-screen bg-black/60 backdrop-blur-3xl border-r border-white/5 flex flex-col transition-all duration-700"
      >
        <div className="h-24 px-8 flex items-center justify-between">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-3 group">
              <ShieldCheck size={20} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
              <span className="font-black text-white text-[11px] tracking-[0.4em] uppercase">READINESS</span>
            </div>
          )}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-2 hover:bg-white/5 rounded-xl transition-all">
            <LayoutGrid size={18} className="text-slate-500 hover:text-cyan-400" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {[
            { id: 'dashboard', label: 'DASHBOARD', icon: Laptop },
            { id: 'assessment', label: 'MISSIONS', icon: Target },
            { id: 'reports', label: 'ANALYSIS', icon: Activity }
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => setView(item.id)}
              className={`w-full flex items-center p-4 rounded-2xl transition-all gap-4 group ${view === item.id ? 'bg-white/[0.03] text-cyan-400' : 'text-slate-500 hover:text-white hover:bg-white/[0.02]'}`}
            >
              <item.icon size={18} className={view === item.id ? 'text-cyan-400' : 'group-hover:text-cyan-400'} />
              {!isSidebarCollapsed && <span className="font-black text-[10px] tracking-[0.3em] uppercase">{item.label}</span>}
              {view === item.id && <div className="ml-auto w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />}
            </button>
          ))}
        </nav>

        <div className="p-6">
          <button onClick={() => router.push('/')} className="w-full flex items-center p-4 text-red-500 hover:bg-red-500/10 rounded-2xl gap-4 font-black text-[10px] tracking-[0.3em] transition-all">
            <Power size={18} /> {!isSidebarCollapsed && "ABORT SESSION"}
          </button>
        </div>
      </motion.aside>

      {/* --- MAIN INTERFACE --- */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* HEADER HUD */}
        <header className="h-24 flex items-center justify-between px-12 border-b border-white/5 bg-black/20 backdrop-blur-md relative z-40">
           <div className="flex items-center gap-10">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                 <span className="text-[10px] font-mono text-emerald-500 tracking-[0.2em] uppercase">System Stable</span>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-3 text-slate-500">
                 <Clock size={14} />
                 <span className="text-[10px] font-mono tracking-widest uppercase">{currentTime}</span>
              </div>
           </div>

           <div className="flex items-center gap-6">
              <div className="text-right hidden sm:block">
                 <p className="text-xs font-black text-white tracking-widest uppercase">{user.username}</p>
                 <p className="text-[9px] font-bold text-cyan-500/50 tracking-[0.2em] uppercase mt-1">Verified Account</p>
              </div>
              <div className="w-11 h-11 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-center shadow-inner">
                 <User size={20} className="text-slate-400" />
              </div>
           </div>
        </header>

        {/* CONTENT AREA */}
        <main className="flex-1 overflow-y-auto no-scrollbar p-10 lg:p-14 relative">
          <AnimatePresence mode="wait">
            
            {view === 'dashboard' && (
              <motion.div 
                key="dash" 
                initial={{ opacity:0, y:20 }} 
                animate={{ opacity:1, y:0 }} 
                exit={{ opacity:0, scale:0.98 }}
                className="max-w-[1500px] mx-auto space-y-12"
              >
                
                {/* WELCOME BANNER LUXURY */}
                <div className="relative p-12 lg:p-20 rounded-[4rem] bg-gradient-to-br from-white/[0.03] via-transparent to-transparent border border-white/5 overflow-hidden shadow-2xl group">
                   <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
                      <Globe size={240} className="text-white" />
                   </div>
                   
                   <div className="relative z-10 space-y-8 text-left">
                      <div className="inline-flex items-center gap-4 px-5 py-2 rounded-full bg-cyan-500/5 border border-cyan-500/10 text-cyan-400 text-[9px] font-black tracking-[0.5em] uppercase">
                         Authentication Confirmed
                      </div>
                      
                      <h1 className="text-5xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                         WELCOME, <br/>
                         <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 animate-gradient-x">
                           {user.username}
                         </span>
                      </h1>
                      
                      <p className="text-slate-400 text-sm lg:text-lg max-w-2xl font-medium tracking-wide leading-relaxed opacity-80">
                         Selamat datang di pusat kendali keamanan siber sekolah. Pantau setiap pergerakan data dan pastikan pertahanan digital Anda selalu dalam kondisi prima.
                      </p>
                   </div>
                </div>

                {/* GRID CARDS (SIMETRIS & RAPI) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* CARD 1: USER */}
                  <div className="bg-white/[0.01] border border-white/5 p-12 rounded-[3.5rem] backdrop-blur-3xl flex flex-col items-center justify-center text-center group hover:border-cyan-500/20 transition-all duration-500">
                    <div className="relative w-24 h-24 mb-8">
                       <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                       <div className="relative w-full h-full bg-[#050505] rounded-3xl flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform duration-500">
                          <Fingerprint size={40} className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                       </div>
                    </div>
                    <h4 className="text-2xl font-black text-white uppercase tracking-widest">{user.username}</h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mt-3">{user.class_name}</p>
                  </div>

                  {/* CARD 2: SCORE */}
                  <div className="bg-white/[0.01] border border-white/5 p-12 rounded-[3.5rem] backdrop-blur-3xl flex flex-col items-center justify-center group hover:border-fuchsia-500/20 transition-all duration-500">
                    <div className="relative mb-8">
                      <svg className="w-44 h-44 transform -rotate-90">
                        <circle cx="88" cy="88" r="82" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="transparent" />
                        <motion.circle 
                          initial={{ strokeDasharray: "0 1000" }} 
                          animate={{ strokeDasharray: `${(score / 100) * 515} 1000` }} 
                          transition={{ duration: 2.5, ease: "circOut" }} 
                          cx="88" cy="88" r="82" stroke="#d946ef" strokeWidth="8" strokeLinecap="round" fill="transparent" 
                          style={{ filter: 'drop-shadow(0 0 15px rgba(217,70,239,0.7))' }} 
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-6xl font-black text-white tracking-tighter">{score}</span>
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">READINESS</span>
                      </div>
                    </div>
                    <div className="px-8 py-2 rounded-full bg-fuchsia-500/5 border border-fuchsia-500/10 text-fuchsia-400 text-[10px] font-black tracking-[0.3em] uppercase">SYSTEM COMPLIANT</div>
                  </div>

                  {/* CARD 3: ANALYTICS */}
                  <div className="bg-white/[0.01] border border-white/5 p-12 rounded-[3.5rem] backdrop-blur-3xl group hover:border-cyan-500/20 transition-all duration-500">
                    <div className="flex items-center justify-between mb-12">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">LIVE ANALYTICS</span>
                       <Activity size={18} className="text-cyan-500 animate-pulse" />
                    </div>
                    <div className="space-y-6 font-mono text-[11px] tracking-wider text-slate-400">
                       <div className="flex justify-between border-b border-white/5 pb-4"><span>DATA ENCRYPTION</span><span className="text-cyan-400 font-bold">AES 256</span></div>
                       <div className="flex justify-between border-b border-white/5 pb-4"><span>GATEWAY STATUS</span><span className="text-emerald-500 font-bold">ACTIVE</span></div>
                       <div className="flex justify-between"><span>GLOBAL UPTIME</span><span className="text-white opacity-80">99.98%</span></div>
                    </div>
                  </div>

                  {/* LARGE CTA: START PROTOCOL */}
                  <div className="lg:col-span-3 mt-4 relative overflow-hidden p-12 lg:p-16 rounded-[4rem] bg-[#050505] border border-white/5 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-12 group hover:border-cyan-500/20 transition-all duration-700">
                     <div className="absolute inset-0 bg-hud-grid opacity-[0.03] group-hover:opacity-[0.06] transition-opacity" />
                     <div className="flex items-center gap-10 z-10 text-left">
                        <div className="w-20 h-20 bg-white/[0.02] border border-white/10 rounded-[2rem] flex items-center justify-center text-cyan-400 shadow-inner group-hover:scale-110 transition-transform duration-500">
                           <Zap size={36} className="fill-current" />
                        </div>
                        <div className="space-y-3">
                           <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-[10px] font-black text-emerald-400 tracking-[0.5em] uppercase">MISSION READY</span>
                           </div>
                           <h2 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tighter">Assessment Gateway Online</h2>
                           <p className="text-slate-500 text-sm font-medium tracking-wide">Inisiasi protokol validasi untuk mengukur tingkat ketahanan digital pribadi Anda.</p>
                        </div>
                     </div>
                     <button 
                        className="w-full lg:w-auto px-16 py-7 bg-white text-black rounded-3xl font-black text-[12px] tracking-[0.5em] uppercase hover:bg-cyan-400 hover:text-white hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] transition-all z-10 flex items-center justify-center gap-6"
                     >
                        START MISSION <ArrowRight size={20} />
                     </button>
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .bg-hud-grid { background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px); background-size: 80px 80px; }
        ::-webkit-scrollbar { width: 0px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        ::selection { background: #22d3ee; color: white; }
        @keyframes gradient-x { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 5s ease infinite; }
      `}} />
    </div>
  );
}