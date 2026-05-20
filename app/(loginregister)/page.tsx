"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
// --- IMPORT IKON LENGKAP & STABIL ---
import { 
  ShieldCheck, User, Lock, ScanLine, AlertTriangle, Fingerprint, 
  MapPin, Calendar, CheckCircle2, Zap, ShieldAlert, Globe, Send
} from 'lucide-react'

// --- ASSET GALAXY ---
const CYBER_ASSETS = ["/bg/cyber1.jpg", "/bg/cyber2.jpg", "/bg/cyber3.jpg", "/bg/cyber4.jpg", "/bg/cyber5.jpg"];
const AVAILABLE_CLASSES = ["X MIPA 1", "X IPS 1", "XI TKJ 1", "XI RPL 1", "XII MIPA 2", "XII DKV 1"];

const PersistentUniverse = React.memo(({ bgIdx }: { bgIdx: number }) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.img 
          key={bgIdx} 
          src={CYBER_ASSETS[bgIdx]} 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 0.3 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 2 }} 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-static opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)] pointer-events-none" />
    </div>
  );
});
PersistentUniverse.displayName = 'PersistentUniverse';

export default function CyberLoginGateway() {
  const router = useRouter();
  const [bgIdx, setBgIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [asal, setAsal] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [className, setClassName] = useState('X MIPA 1');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => setBgIdx(p => (p + 1) % CYBER_ASSETS.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) { setErrorMessage("Data wajib diisi."); setStatus('error'); return; }
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
        setTimeout(() => router.push(data.role === 'guru' || data.role === 'admin' ? '/guru' : '/siswa'), 1000);
      } else {
        setErrorMessage(data.detail || "Gagal masuk.");
        setStatus('error');
      }
    } catch (error) {
      setErrorMessage("Koneksi terputus.");
      setStatus('error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-black text-slate-200 overflow-hidden font-sans relative perspective-[1200px]">
      <PersistentUniverse bgIdx={bgIdx} />

      {/* --- KOTAK LOGIN TENGAH --- */}
      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 w-full max-w-sm mx-4 bg-[#050505]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl my-8"
      >
        <div className="mx-auto w-12 h-12 border border-fuchsia-500/50 rounded-2xl flex items-center justify-center mb-6">
          <ShieldCheck className="text-fuchsia-400" size={24} />
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-white tracking-widest uppercase">
            CYBER<span className="text-fuchsia-500"> READINESS</span>
          </h1>
          <p className="text-[9px] font-bold text-slate-500 tracking-[0.4em] uppercase mt-2">
            PLATFORM
          </p>
        </div>

        <div className="flex border-b border-white/10 mb-8 relative">
          <button onClick={() => setActiveTab('LOGIN')} className={`flex-1 pb-3 text-[10px] font-black tracking-widest uppercase ${activeTab === 'LOGIN' ? 'text-fuchsia-400' : 'text-slate-600'}`}>MASUK</button>
          <button onClick={() => setActiveTab('REGISTER')} className={`flex-1 pb-3 text-[10px] font-black tracking-widest uppercase ${activeTab === 'REGISTER' ? 'text-fuchsia-400' : 'text-slate-600'}`}>DAFTAR</button>
          <div className={`absolute bottom-0 h-[2px] w-1/2 bg-fuchsia-500 transition-transform ${activeTab === 'LOGIN' ? 'translate-x-0' : 'translate-x-full'}`} />
        </div>

        <form onSubmit={handleAuthenticate} className="space-y-4">
          <div className="relative group">
            <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="NAMA PENGGUNA" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-black/60 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-[11px] font-bold text-white outline-none focus:border-fuchsia-500" />
          </div>

          <div className="relative group">
            <Lock size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="password" placeholder="KATA SANDI" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/60 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-[11px] font-bold text-white outline-none focus:border-fuchsia-500" />
          </div>

          <AnimatePresence>
            {activeTab === 'REGISTER' && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-4 pt-2 overflow-hidden">
                <div className="relative"><MapPin size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" /><input type="text" placeholder="ASAL / KOTA" value={asal} onChange={(e) => setAsal(e.target.value)} className="w-full bg-black/60 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-[11px] font-bold text-white outline-none focus:border-fuchsia-500 uppercase" /></div>
                <div className="relative"><Calendar size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" /><input type="date" value={tanggalLahir} onChange={(e) => setTanggalLahir(e.target.value)} style={{ colorScheme: 'dark' }} className="w-full bg-black/60 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-[11px] font-bold text-white outline-none focus:border-fuchsia-500" /></div>
                <div className="relative"><ShieldAlert size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" />
                   <select value={className} onChange={(e) => setClassName(e.target.value)} className="w-full bg-black/60 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-[11px] font-bold text-slate-300 outline-none focus:border-fuchsia-500 appearance-none uppercase cursor-pointer">
                     {AVAILABLE_CLASSES.map(cls => <option key={cls} value={cls}>{cls}</option>)}
                   </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {status === 'error' && <div className="text-red-400 text-[10px] font-bold uppercase tracking-widest text-center">{errorMessage}</div>}

          <button type="submit" disabled={status === 'loading'} className="w-full mt-6 py-4 bg-fuchsia-600 hover:bg-fuchsia-500 rounded-2xl font-black text-[10px] tracking-[0.4em] text-white shadow-lg transition-all uppercase">
             {status === 'loading' ? 'VERIFIKASI...' : 'OTENTIKASI'}
          </button>
        </form>
      </motion.div>

      {/* FOOTER */}
      <div className="absolute bottom-8 left-8 hidden md:block opacity-40">
          <p className="text-[9px] font-black text-fuchsia-500 tracking-[0.4em] uppercase">KONEKSI AMAN AKTIF</p>
          <p className="text-[10px] font-bold text-slate-500 tracking-[0.3em] uppercase mt-1">CYBER READINESS PLATFORM</p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .bg-grid-static { background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px); background-size: 60px 60px; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.5; cursor: pointer; }
      `}} />
    </div>
  );
}