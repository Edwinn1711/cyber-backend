"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
// --- IMPORT IKON AUDITED ---
import { 
  ShieldCheck, User, Lock, ScanLine, AlertTriangle, Fingerprint, 
  MapPin, Calendar, CheckCircle2, Zap, ShieldAlert, Globe 
} from 'lucide-react'

// --- ASSET GALAXY HD ---
const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

// --- BACKGROUND ENGINE (DEEP OBSIDIAN) ---
const PersistentUniverse = React.memo(({ bgIdx }: { bgIdx: number }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#020205]">
      <AnimatePresence mode="wait">
        <motion.img 
          key={bgIdx} 
          src={CYBER_ASSETS[bgIdx]} 
          initial={{ opacity: 0, scale: 1.1 }} 
          animate={{ opacity: 0.18, scale: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 4 }} 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-screen" 
        />
      </AnimatePresence>
      {/* Overlay Netral Mewah */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black opacity-80" />
      <div className="absolute inset-0 bg-grid-static opacity-[0.03]" />
    </div>
  );
});
PersistentUniverse.displayName = 'PersistentUniverse';

export default function CyberLoginGateway() {
  const router = useRouter();
  const [bgIdx, setBgIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  
  // State Form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [asal, setAsal] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [className, setClassName] = useState('X MIPA 1');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // ====================================================================
  // LOGIKA 3D PARALLAX (HALUS & PREMIUM)
  // ====================================================================
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => setBgIdx(p => (p + 1) % CYBER_ASSETS.length), 10000);
    return () => clearInterval(interval);
  }, []);

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) { setErrorMessage("Mandatory identity required."); setStatus('error'); return; }
    
    setStatus('loading');
    try {
      const endpoint = activeTab === 'LOGIN' ? 'https://cyber-backend-delta.vercel.app/login' : 'https://cyber-backend-delta.vercel.app/register';
      const bodyData = activeTab === 'LOGIN' 
        ? { username, password } 
        : { username, password, role: 'siswa', class_name: className, asal, tanggal_lahir: tanggalLahir };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });
      
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        setStatus('success');
        setTimeout(() => router.push(data.role === 'guru' || data.role === 'admin' ? '/guru' : '/siswa'), 1500);
      } else {
        setErrorMessage(data.detail || "Authentication Failed.");
        setStatus('error');
      }
    } catch (e) {
      setErrorMessage("Gateway Connection Failed.");
      setStatus('error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#020205] text-slate-100 overflow-hidden font-sans selection:bg-fuchsia-500/30 relative perspective-[1500px]">
      <PersistentUniverse bgIdx={bgIdx} />

      {/* FOOTER KIRI (CLEAN & PRO) */}
      <div className="absolute bottom-12 left-12 z-10 hidden md:block">
        <div className="flex items-center gap-4">
           <div className="w-1 h-8 bg-fuchsia-600 rounded-full" />
           <div>
             <p className="text-[10px] font-black text-fuchsia-500 tracking-[0.6em] uppercase leading-none">SECURE ACCESS</p>
             <p className="text-[11px] font-bold text-slate-500 tracking-[0.2em] uppercase mt-2">ENCRYPTED PROTOCOL ACTIVE</p>
           </div>
        </div>
      </div>

      {/* FOOTER KANAN */}
      <div className="absolute bottom-12 right-12 text-right z-10 hidden md:block">
        <p className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase flex items-center justify-end gap-3">
          <Globe size={12} className="text-fuchsia-500 animate-pulse" /> NETWORK STATUS: OPTIMAL
        </p>
      </div>

      {/* KARTU UTAMA - KOTAK PERSEGI MEWAH DI TENGAH */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 w-full max-w-[420px] mx-4 bg-[#0a0a0f]/60 backdrop-blur-[40px] border border-white/10 rounded-[2.5rem] p-12 shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden group"
      >
        {/* Glow di bawah kartu agar terlihat melayang */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-2 bg-fuchsia-500/20 blur-2xl rounded-full" />

        <div className="mx-auto w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-10 shadow-[0_0_30px_rgba(217,70,239,0.2)]">
          <ShieldCheck className="text-fuchsia-400" size={28} />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
            CYBER <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-indigo-400">READINESS</span>
          </h1>
          <p className="text-[11px] font-black text-slate-500 tracking-[0.6em] uppercase mt-4">PLATFORM</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/5 mb-10 relative">
          <button onClick={() => setActiveTab('LOGIN')} className={`flex-1 pb-4 text-[11px] font-black tracking-[0.3em] transition-all uppercase ${activeTab === 'LOGIN' ? 'text-white' : 'text-slate-600 hover:text-slate-400'}`}>Login</button>
          <button onClick={() => setActiveTab('REGISTER')} className={`flex-1 pb-4 text-[11px] font-black tracking-[0.3em] transition-all uppercase ${activeTab === 'REGISTER' ? 'text-white' : 'text-slate-600 hover:text-slate-400'}`}>Register</button>
          <motion.div 
            animate={{ x: activeTab === 'LOGIN' ? '0%' : '100%' }}
            className="absolute bottom-[-1px] h-[2px] w-1/2 bg-gradient-to-r from-fuchsia-600 to-indigo-500 shadow-[0_0_15px_rgba(217,70,239,0.8)]" 
          />
        </div>

        <form onSubmit={handleAuthenticate} className="space-y-6">
          
          <div className="relative group">
            <User size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-fuchsia-500 transition-colors" />
            <input 
              type="text" 
              placeholder="IDENTIFIER" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-16 pr-6 text-[12px] font-black text-white outline-none focus:border-fuchsia-500/50 transition-all placeholder:text-slate-800" 
            />
          </div>

          <div className="relative group">
            <Lock size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-fuchsia-500 transition-colors" />
            <input 
              type="password" 
              placeholder="PASSKEY" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-16 pr-6 text-[12px] font-black text-white outline-none focus:border-fuchsia-500/50 transition-all placeholder:text-slate-800" 
            />
          </div>

          <AnimatePresence>
            {activeTab === 'REGISTER' && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-5 pt-2 overflow-hidden">
                <input type="text" placeholder="ORIGIN CITY" value={asal} onChange={(e) => setAsal(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 px-8 text-[11px] font-black text-white outline-none focus:border-fuchsia-500/50 uppercase placeholder:text-slate-800" />
                <input type="date" value={tanggalLahir} onChange={(e) => setTanggalLahir(e.target.value)} style={{ colorScheme: 'dark' }} className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 px-8 text-[11px] font-black text-white outline-none focus:border-fuchsia-500" />
                <select value={className} onChange={(e) => setClassName(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 px-8 text-[11px] font-black text-slate-400 outline-none focus:border-fuchsia-500 appearance-none uppercase cursor-pointer">
                  {AVAILABLE_CLASSES.map(cls => <option key={cls} value={cls}>{cls}</option>)}
                </select>
              </motion.div>
            )}
          </AnimatePresence>

          {status === 'error' && (
            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black tracking-widest uppercase">
              <AlertTriangle size={14} /> {errorMessage}
            </div>
          )}

          <button type="submit" disabled={status === 'loading'} className="w-full mt-10 py-6 bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white rounded-3xl font-black text-[11px] tracking-[0.6em] shadow-[0_15px_40px_rgba(217,70,239,0.3)] hover:shadow-[0_20px_50px_rgba(217,70,239,0.5)] transition-all uppercase flex items-center justify-center gap-4 disabled:opacity-50 group">
             {status === 'loading' ? 'VERIFYING...' : 'AUTHENTICATE'} <ScanLine size={18} className="group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </form>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .bg-grid-static {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        ::selection { background: #d946ef; color: white; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.6; cursor: pointer; }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 30px #0a0a0f inset !important; -webkit-text-fill-color: white !important; }
      `}} />
    </div>
  );
}