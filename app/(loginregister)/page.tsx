"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
// --- IMPORT SEMUA IKON (FIXED & LENGKAP) ---
import { 
  ShieldCheck, User, Lock, ScanLine, AlertTriangle, Fingerprint, 
  MapPin, Calendar, CheckCircle2, Zap, ShieldAlert, Globe, Send, XCircle 
} from 'lucide-react'

// --- ASSET GALAXY HD ---
const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

// --- BACKGROUND COMPONENT (DEEP OBSIDIAN) ---
const PersistentUniverse = React.memo(({ bgIdx }: { bgIdx: number }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#020205]">
      <AnimatePresence mode="wait">
        <motion.img 
          key={bgIdx} 
          src={CYBER_ASSETS[bgIdx]} 
          initial={{ opacity: 0, scale: 1.1 }} 
          animate={{ opacity: 0.2, scale: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 4, ease: "easeInOut" }} 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-screen" 
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-static opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] pointer-events-none" />
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
  // LOGIKA 3D PARALLAX (SMOOTH & TACTICAL)
  // ====================================================================
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 25 });

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

  // ====================================================================
  // FUNGSI AUTHENTICATE KE BACKEND
  // ====================================================================
  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) { setErrorMessage("Mandatory fields missing."); setStatus('error'); return; }
    
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
        const role = data.role || 'siswa';
        setTimeout(() => router.push(role === 'guru' || role === 'admin' ? '/guru' : '/siswa'), 1500);
      } else {
        setErrorMessage(data.detail || "Authentication Failed.");
        setStatus('error');
      }
    } catch (e) {
      setErrorMessage("Secure Gateway Connection Error.");
      setStatus('error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#020205] text-slate-100 overflow-hidden font-sans selection:bg-fuchsia-500/30 relative perspective-[1500px]">
      <PersistentUniverse bgIdx={bgIdx} />

      {/* FOOTER ORNAMENTS */}
      <div className="absolute bottom-10 left-10 z-10 hidden md:flex items-center gap-5">
        <div className="w-1.5 h-10 bg-fuchsia-600 rounded-full shadow-[0_0_15px_#d946ef]" />
        <div>
          <p className="text-[10px] font-black text-fuchsia-500 tracking-[0.6em] uppercase leading-none">SECURE ENCRYPTED ACCESS</p>
          <p className="text-[11px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-2">CYBER READINESS PLATFORM</p>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 text-right z-10 hidden md:block">
        <p className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase flex items-center justify-end gap-3">
          <Globe size={14} className="text-fuchsia-500 animate-pulse" /> NETWORK STATUS: OPTIMAL
        </p>
      </div>

      {/* --- MAIN CARD --- */}
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative z-10 w-full ${activeTab === 'REGISTER' ? 'max-w-[500px]' : 'max-w-[420px]'} mx-4 bg-[#0a0a0f]/80 backdrop-blur-[60px] border border-white/10 rounded-[3rem] p-10 lg:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-500`}
      >
        <div className="mx-auto w-16 h-16 bg-black border border-white/10 rounded-[1.5rem] flex items-center justify-center mb-10 shadow-2xl">
          <ShieldCheck className="text-fuchsia-400" size={32} />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
            CYBER <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-indigo-400">READINESS</span>
          </h1>
          <p className="text-[11px] font-black text-slate-500 tracking-[0.6em] uppercase mt-4">PLATFORM</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/5 mb-10 relative">
          <button type="button" onClick={() => setActiveTab('LOGIN')} className={`flex-1 pb-4 text-[11px] font-black tracking-[0.4em] transition-all uppercase ${activeTab === 'LOGIN' ? 'text-white' : 'text-slate-600 hover:text-slate-400'}`}>Login</button>
          <button type="button" onClick={() => setActiveTab('REGISTER')} className={`flex-1 pb-4 text-[11px] font-black tracking-[0.4em] transition-all uppercase ${activeTab === 'REGISTER' ? 'text-white' : 'text-slate-600 hover:text-slate-400'}`}>Register</button>
          <motion.div 
            animate={{ x: activeTab === 'LOGIN' ? '0%' : '100%' }}
            className="absolute bottom-[-1px] h-[3px] w-1/2 bg-gradient-to-r from-fuchsia-600 to-indigo-500 shadow-[0_0_20px_#d946ef]" 
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
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-6 pt-2 overflow-hidden">
                {/* GRID 2 KOLOM UNTUK DATA REGISTRASI (Origin & Date) */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <MapPin size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" />
                    <input 
                      type="text" 
                      placeholder="ORIGIN" 
                      value={asal} 
                      onChange={(e) => setAsal(e.target.value)} 
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-14 pr-4 text-[11px] font-black text-white outline-none focus:border-fuchsia-500/50 uppercase placeholder:text-slate-800" 
                    />
                  </div>
                  <div className="relative">
                    <Calendar size={14} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" />
                    <input 
                      type="date" 
                      value={tanggalLahir} 
                      onChange={(e) => setTanggalLahir(e.target.value)} 
                      style={{ colorScheme: 'dark' }} 
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-14 pr-4 text-[11px] font-black text-white outline-none focus:border-fuchsia-500/50" 
                    />
                  </div>
                </div>

                <div className="relative">
                   <ShieldAlert size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" />
                   <select 
                      value={className} 
                      onChange={(e) => setClassName(e.target.value)} 
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-16 pr-6 text-[11px] font-black text-slate-300 outline-none focus:border-fuchsia-500 appearance-none uppercase cursor-pointer"
                   >
                     {AVAILABLE_CLASSES.map(cls => <option key={cls} value={cls} className="bg-[#05050A]">{cls}</option>)}
                   </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {status === 'error' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black tracking-widest uppercase">
              <AlertTriangle size={14} /> {errorMessage}
            </motion.div>
          )}

          <button 
            type="submit" 
            disabled={status === 'loading'} 
            className="w-full mt-8 py-6 bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white rounded-[2rem] font-black text-[12px] tracking-[0.6em] shadow-[0_20px_50px_rgba(217,70,239,0.3)] transition-all uppercase flex items-center justify-center gap-5 disabled:opacity-50"
          >
             {status === 'loading' ? 'VERIFYING...' : 'AUTHENTICATE'} <Send size={20} />
          </button>
        </form>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        .bg-grid-static { background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px); background-size: 60px 60px; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.6; cursor: pointer; }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 40px #0a0a0f inset !important; -webkit-text-fill-color: white !important; }
      `}} />
    </div>
  );
}