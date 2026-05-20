"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
// --- IMPORT IKON AUDITED & LENGKAP ---
import { 
  ShieldCheck, User, Lock, ScanLine, AlertTriangle, Fingerprint, 
  MapPin, Calendar, CheckCircle2, Zap, ShieldAlert, Globe, Send 
} from 'lucide-react'

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
          animate={{ opacity: 0.2, scale: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 4, ease: "easeInOut" }} 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-screen" 
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
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

  // --- LOGIKA 3D PARALLAX TILT ---
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

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) { setErrorMessage("Identity hash required."); setStatus('error'); return; }
    setStatus('loading');
    try {
      const endpoint = activeTab === 'LOGIN' ? 'https://cyber-backend-delta.vercel.app/login' : 'https://cyber-backend-delta.vercel.app/register';
      const bodyData = activeTab === 'LOGIN' 
        ? { username, password } 
        : { username, password, role: 'siswa', class_name: className, asal, tanggal_lahir: tanggalLahir };
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bodyData) });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        setStatus('success');
        setTimeout(() => router.push(data.role === 'guru' || data.role === 'admin' ? '/guru' : '/siswa'), 1500);
      } else { setErrorMessage(data.detail || "Access Denied."); setStatus('error'); }
    } catch (e) { setErrorMessage("Gateway Offline."); setStatus('error'); }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#020205] text-slate-100 overflow-hidden font-sans relative perspective-[1500px]">
      <PersistentUniverse bgIdx={bgIdx} />

      {/* --- KOTAK UTAMA (WIDTH DINAMIS AGAR TIDAK HANCUR) --- */}
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative z-10 w-full ${activeTab === 'REGISTER' ? 'max-w-[550px]' : 'max-w-[400px]'} mx-4 bg-[#0a0a0f]/90 backdrop-blur-[60px] border border-white/10 rounded-[3rem] p-10 lg:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.8)] transition-all duration-500 overflow-hidden`}
      >
        <div className="mx-auto w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-2xl">
          <ShieldCheck className="text-fuchsia-400" size={28} />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">CYBER <span className="text-fuchsia-500">READINESS</span></h1>
          <p className="text-[10px] font-black text-slate-500 tracking-[0.6em] uppercase mt-4">PLATFORM</p>
        </div>

        <div className="flex border-b border-white/5 mb-10 relative">
          <button onClick={() => setActiveTab('LOGIN')} className={`flex-1 pb-4 text-[11px] font-black tracking-[0.4em] transition-all uppercase ${activeTab === 'LOGIN' ? 'text-white' : 'text-slate-600'}`}>LOGIN</button>
          <button onClick={() => setActiveTab('REGISTER')} className={`flex-1 pb-4 text-[11px] font-black tracking-[0.4em] transition-all uppercase ${activeTab === 'REGISTER' ? 'text-white' : 'text-slate-600'}`}>REGISTER</button>
          <motion.div animate={{ x: activeTab === 'LOGIN' ? '0%' : '100%' }} className="absolute bottom-[-1px] h-[2px] w-1/2 bg-fuchsia-500 shadow-[0_0_20px_#d946ef]" />
        </div>

        <form onSubmit={handleAuthenticate} className="space-y-5">
          <div className="relative group">
            <User size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-fuchsia-500" />
            <input type="text" placeholder="IDENTIFIER" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-16 pr-6 text-[12px] font-black text-white outline-none focus:border-fuchsia-500 transition-all placeholder:text-slate-800" />
          </div>

          <div className="relative group">
            <Lock size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-fuchsia-500" />
            <input type="password" placeholder="PASSKEY" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-16 pr-6 text-[12px] font-black text-white outline-none focus:border-fuchsia-500 transition-all placeholder:text-slate-800" />
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'REGISTER' && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-5 pt-2">
                {/* --- TACTICAL GRID: 2 KOLOM UNTUK DATA REGISTRASI --- */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <MapPin size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" />
                    <input type="text" placeholder="CITY" value={asal} onChange={(e) => setAsal(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-14 pr-4 text-[11px] font-black text-white outline-none focus:border-fuchsia-500 uppercase placeholder:text-slate-800" />
                  </div>
                  <div className="relative">
                    <Calendar size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" />
                    <input type="date" value={tanggalLahir} onChange={(e) => setTanggalLahir(e.target.value)} style={{ colorScheme: 'dark' }} className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-14 pr-4 text-[11px] font-black text-white outline-none focus:border-fuchsia-500" />
                  </div>
                </div>

                <div className="relative">
                   <ShieldAlert size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" />
                   <select value={className} onChange={(e) => setClassName(e.target.value)} className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-16 pr-6 text-[11px] font-black text-slate-300 outline-none focus:border-fuchsia-500 appearance-none uppercase cursor-pointer">
                     {AVAILABLE_CLASSES.map(cls => <option key={cls} value={cls} className="bg-[#05050A]">{cls}</option>)}
                   </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {status === 'error' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black tracking-widest uppercase text-center flex items-center justify-center gap-3">
              <AlertTriangle size={14} /> {errorMessage}
            </motion.div>
          )}

          <button type="submit" disabled={status === 'loading'} className="w-full mt-8 py-6 bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white rounded-[2rem] font-black text-[12px] tracking-[0.6em] shadow-[0_20px_50px_rgba(217,70,239,0.3)] transition-all uppercase flex items-center justify-center gap-5 disabled:opacity-50 group">
             {status === 'loading' ? 'VERIFYING...' : 'AUTHENTICATE'} <Send size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </motion.div>

      {/* FOOTER INFO */}
      <div className="absolute bottom-10 left-10 hidden md:block"><p className="text-[10px] font-black text-fuchsia-500 tracking-[0.5em] uppercase opacity-60">SECURE LINK ACTIVE</p></div>
      <div className="absolute bottom-10 right-10 hidden md:block text-right"><p className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase opacity-60">PROTOCOL: AES-256</p></div>

      <style dangerouslySetInnerHTML={{ __html: `
        .bg-grid-static { background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px); background-size: 60px 60px; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.6; cursor: pointer; }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 30px #0a0a0f inset !important; -webkit-text-fill-color: white !important; }
      `}} />
    </div>
  );
}